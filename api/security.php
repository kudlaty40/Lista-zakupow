<?php
/* Shared security helpers. This file is intentionally safe to deploy inside api/. */

ini_set('display_errors', '0');
ini_set('log_errors', '1');

function appSendJsonFailure($status, $message) {
    if (!headers_sent()) {
        header('Content-Type: application/json; charset=utf-8');
        http_response_code($status);
    }
    echo json_encode(['success' => false, 'error' => $message], JSON_UNESCAPED_UNICODE);
}

set_exception_handler(function ($exception) {
    error_log('Unhandled application exception: ' . $exception->getMessage());
    appSendJsonFailure(500, 'Wystąpił błąd serwera. Spróbuj ponownie.');
});

register_shutdown_function(function () {
    $error = error_get_last();
    if ($error === null || !in_array($error['type'], [E_ERROR, E_PARSE, E_CORE_ERROR, E_COMPILE_ERROR], true) || headers_sent()) {
        return;
    }
    error_log('Fatal application error: ' . $error['message']);
    appSendJsonFailure(500, 'Wystąpił błąd serwera. Spróbuj ponownie.');
});

function appPrivateConfig() {
    static $config = null;
    if (is_array($config)) return $config;
    $path = dirname(__DIR__, 2) . '/app-private/config.php';
    if (!is_file($path)) appJsonError(500, 'Brakuje prywatnej konfiguracji aplikacji.');
    $loaded = require $path;
    if (!is_array($loaded)) appJsonError(500, 'Nieprawidłowa prywatna konfiguracja aplikacji.');
    return $config = $loaded;
}

function appAirtableConfig() {
    $config = appPrivateConfig();
    return is_array($config['airtable'] ?? null) ? $config['airtable'] : [];
}

function appStorageDir() {
    $configured = trim((string) (appPrivateConfig()['storage_dir'] ?? ''));
    if ($configured === '' || !is_dir($configured) || !is_writable($configured)) {
        appJsonError(500, 'Katalog danych aplikacji jest niedostępny.');
    }
    return rtrim($configured, '/\\');
}

function appIsHttps() {
    return (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off')
        || (($_SERVER['HTTP_X_FORWARDED_PROTO'] ?? '') === 'https');
}

function appStartSession() {
    if (session_status() === PHP_SESSION_ACTIVE) {
        return;
    }

    $lifetime = 8 * 60 * 60;
    ini_set('session.use_strict_mode', '1');
    ini_set('session.gc_maxlifetime', (string) $lifetime);
    ini_set('session.cookie_lifetime', (string) $lifetime);
    session_name('grilujmy_session');
    session_set_cookie_params([
        'lifetime' => $lifetime,
        'path' => '/',
        'secure' => appIsHttps(),
        'httponly' => true,
        'samesite' => 'Lax',
    ]);
    session_start();
    if (!empty($_SESSION['_last_activity']) && (time() - (int) $_SESSION['_last_activity']) > $lifetime) {
        $_SESSION = [];
        session_destroy();
        appClearSessionCookie();
        session_start();
    }
}

function appClearSessionCookie() {
    if (session_name() === '') return;
    setcookie(session_name(), '', [
        'expires' => time() - 3600,
        'path' => '/',
        'secure' => appIsHttps(),
        'httponly' => true,
        'samesite' => 'Lax',
    ]);
}

function appEndSession() {
    appStartSession();
    $_SESSION = [];
    session_destroy();
    appClearSessionCookie();
}

function appTouchSession() {
    $_SESSION['_last_activity'] = time();
}

function appJsonError($status, $message) {
    appSendJsonFailure($status, $message);
    exit;
}

function appRequireSameOriginForWrite() {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        return;
    }

    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    if ($origin === '') {
        return; // Allows non-browser maintenance tools; session authorization still applies.
    }
    $host = $_SERVER['HTTP_HOST'] ?? '';
    $expected = (appIsHttps() ? 'https://' : 'http://') . $host;
    if (!hash_equals($expected, $origin)) {
        appJsonError(403, 'Niedozwolone źródło żądania.');
    }
}

function appRequireLogin($family = '') {
    appStartSession();
    if (empty($_SESSION['user']) || empty($_SESSION['family'])) {
        appJsonError(401, 'Sesja wygasła. Zaloguj się ponownie.');
    }
    if ($family !== '' && !hash_equals((string) $_SESSION['family'], (string) $family)) {
        appJsonError(403, 'Brak dostępu do tej rodziny.');
    }
    appTouchSession();
}

function appRequireFamilyAdmin($family) {
    appRequireLogin($family);
    if (empty($_SESSION['is_admin'])) {
        appJsonError(403, 'Wymagane są uprawnienia administratora rodziny.');
    }
}

function appRequireSuperAdmin() {
    appStartSession();
    if (empty($_SESSION['super_admin'])) {
        appJsonError(403, 'Wymagane są uprawnienia administratora globalnego.');
    }
    appTouchSession();
}

function appClientIp() {
    $ip = trim((string) ($_SERVER['REMOTE_ADDR'] ?? 'unknown'));
    return filter_var($ip, FILTER_VALIDATE_IP) ? $ip : 'unknown';
}

function appRateLimitFile($scope, $identifier) {
    $safeScope = preg_replace('/[^a-z0-9_-]/i', '-', $scope);
    $key = hash('sha256', $safeScope . '|' . $identifier);
    $directory = appStorageDir() . '/rate-limits';
    if (!is_dir($directory) && !mkdir($directory, 0700, true) && !is_dir($directory)) {
        appJsonError(500, 'Nie można przygotować ochrony logowania.');
    }
    return $directory . '/' . $safeScope . '-' . $key . '.json';
}

function appRateLimitRead($path) {
    $raw = @file_get_contents($path);
    $data = is_string($raw) ? json_decode($raw, true) : null;
    return is_array($data) ? $data : ['count' => 0, 'window_started' => time(), 'blocked_until' => 0];
}

function appRequireLoginRateLimit($scope, $identifier, $message = 'Zbyt wiele prób logowania. Spróbuj ponownie za kilka minut.') {
    $data = appRateLimitRead(appRateLimitFile($scope, $identifier));
    $blockedUntil = (int) ($data['blocked_until'] ?? 0);
    if ($blockedUntil > time()) {
        if (!headers_sent()) {
            header('Retry-After: ' . max(1, $blockedUntil - time()));
        }
        appJsonError(429, $message);
    }
}

function appRecordRateLimitAttempt($scope, $identifier, $limit, $windowSeconds = 900) {
    $path = appRateLimitFile($scope, $identifier);
    $data = appRateLimitRead($path);
    $now = time();
    if ($now - (int) ($data['window_started'] ?? 0) >= $windowSeconds) {
        $data = ['count' => 0, 'window_started' => $now, 'blocked_until' => 0];
    }
    $data['count'] = (int) ($data['count'] ?? 0) + 1;
    if ($data['count'] >= $limit) $data['blocked_until'] = $now + $windowSeconds;
    file_put_contents($path, json_encode($data), LOCK_EX);
    @chmod($path, 0600);
}

function appClearRateLimit($scope, $identifier) {
    $path = appRateLimitFile($scope, $identifier);
    if (is_file($path)) @unlink($path);
}

function appPasswordAlgorithm() {
    // Keep every active account on the same portable bcrypt cost level.
    return PASSWORD_BCRYPT;
}

function appPasswordHash($password) {
    return password_hash($password, PASSWORD_BCRYPT, ['cost' => 12]);
}

function appValidatePassword($password) {
    $value = (string) $password;
    return strlen($value) >= 8
        && preg_match('/\d/', $value)
        && preg_match('/[^A-Za-z0-9]/', $value);
}

function appVerifyPassword($password, $stored) {
    if ($password === '' || !is_string($stored) || $stored === '') {
        return false;
    }
    if (str_starts_with($stored, '$')) {
        return password_verify($password, $stored);
    }

    // Legacy deployments may contain a plaintext password. Accept it only
    // for the one successful login needed to migrate it immediately below.
    return hash_equals($stored, (string) $password);
}

function appPasswordNeedsMigration($stored) {
    return !is_string($stored) || !str_starts_with($stored, '$') || password_needs_rehash($stored, appPasswordAlgorithm());
}
