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

function appStorageDir() {
    $configured = trim((string) (getenv('APP_STORAGE_DIR') ?: ''));
    $storageDir = $configured !== '' ? $configured : dirname(__DIR__) . '/storage';
    if (!is_dir($storageDir) || !is_writable($storageDir)) {
        appJsonError(500, 'Katalog danych aplikacji jest niedostępny.');
    }
    return rtrim($storageDir, '/\\');
}

function appIsHttps() {
    return (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off')
        || (($_SERVER['HTTP_X_FORWARDED_PROTO'] ?? '') === 'https');
}

function appStartSession() {
    if (session_status() === PHP_SESSION_ACTIVE) {
        return;
    }

    $lifetime = 14 * 24 * 60 * 60;
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
}

function appPasswordAlgorithm() {
    $algorithms = function_exists('password_algos') ? password_algos() : [];
    return in_array('argon2id', $algorithms, true) ? PASSWORD_ARGON2ID : PASSWORD_BCRYPT;
}

function appPasswordHash($password) {
    $algorithm = appPasswordAlgorithm();
    return $algorithm === PASSWORD_BCRYPT
        ? password_hash($password, $algorithm, ['cost' => 12])
        : password_hash($password, $algorithm);
}

function appVerifyPassword($password, $stored) {
    if ($password === '' || !is_string($stored) || $stored === '') {
        return false;
    }
    return str_starts_with($stored, '$') ? password_verify($password, $stored) : hash_equals($stored, $password);
}

function appPasswordNeedsMigration($stored) {
    return !is_string($stored) || !str_starts_with($stored, '$') || password_needs_rehash($stored, appPasswordAlgorithm());
}
