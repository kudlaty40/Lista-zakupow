<?php
require_once __DIR__ . '/security.php';
require_once __DIR__ . '/backup.php';
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, private');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}
appRequireSameOriginForWrite();

function jsonError($status, $message) {
    http_response_code($status);
    echo json_encode(['success' => false, 'error' => $message], JSON_UNESCAPED_UNICODE);
    exit;
}

function jsonErrorCode($status, $code, $message) {
    http_response_code($status);
    echo json_encode([
        'success' => false,
        'error' => $message,
        'errorCode' => $code,
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

function normalizeFamilySlug($value) {
    $clean = strtolower(trim((string) $value));
    $clean = preg_replace('/[^a-z0-9._-]+/', '-', $clean);
    $clean = trim($clean, '-');
    return $clean;
}

function normalizeUsername($value) {
    $clean = strtolower(trim((string) $value));
    $clean = preg_replace('/[^a-z0-9._-]+/', '-', $clean);
    $clean = trim($clean, '-');
    return $clean;
}

function resolveStorageDir() {
    return appStorageDir();
}

function readJsonFile($path, $default) {
    if (!file_exists($path)) {
        return $default;
    }

    $raw = file_get_contents($path);
    if ($raw === false) {
        return $default;
    }

    $decoded = json_decode($raw, true);
    return is_array($decoded) ? $decoded : $default;
}

function writeJsonFile($path, $payload) {
    appBackupBeforeMutation('families');
    return appAtomicWrite($path, json_encode($payload, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
}

function readFamilyAccounts($storageDir, $familySlug) {
    $path = $storageDir . '/families/' . $familySlug . '/user-accounts.json';
    $accounts = readJsonFile($path, []);
    return is_array($accounts) ? $accounts : [];
}

function ensureFamiliesIndex($storageDir) {
    $familiesDir = $storageDir . '/families';
    if (!is_dir($familiesDir) && !@mkdir($familiesDir, 0777, true)) {
        jsonError(500, 'Nie udało się utworzyć katalogu rodzin.');
    }

    $indexFile = $familiesDir . '/families.json';
    if (!file_exists($indexFile)) {
        $defaultPassword = (string) (getenv('SUPER_ADMIN_PASSWORD_HASH') ?: '');
        if (!str_starts_with($defaultPassword, '$')) {
            jsonError(500, 'Skonfiguruj zmienną środowiskową SUPER_ADMIN_PASSWORD_HASH.');
        }
        $seed = [
            'superAdminPassword' => $defaultPassword,
            'lastSelectedFamily' => '',
            'families' => [],
        ];
        if (!writeJsonFile($indexFile, $seed)) {
            jsonError(500, 'Nie udało się utworzyć rejestru rodzin.');
        }
    }

    $index = readJsonFile($indexFile, ['superAdminPassword' => '', 'lastSelectedFamily' => '', 'families' => []]);
    if (!isset($index['superAdminPassword']) || !is_string($index['superAdminPassword'])) {
        jsonError(500, 'Brakuje konfiguracji administratora globalnego.');
    }
    if (!isset($index['lastSelectedFamily']) || !is_string($index['lastSelectedFamily'])) {
      $index['lastSelectedFamily'] = '';
    }
    if (!isset($index['families']) || !is_array($index['families'])) {
        $index['families'] = [];
    }

    return [$indexFile, $index];
}

function migrateLegacyDataIfNeeded($storageDir, $indexFile, &$index) {
    if (!empty($index['families'])) {
        return;
    }

    $legacyAccountsFile = $storageDir . '/user-accounts.json';
    $legacySharedFile = $storageDir . '/shared.json';
    if (!file_exists($legacyAccountsFile) && !file_exists($legacySharedFile)) {
        return;
    }

    $familySlug = 'migracja';
    $familyDir = $storageDir . '/families/' . $familySlug;
    $dataDir = $familyDir . '/data';
    if (!is_dir($dataDir) && !@mkdir($dataDir, 0777, true)) {
        return;
    }

    $migratedAccounts = [];
    if (file_exists($legacyAccountsFile)) {
        @copy($legacyAccountsFile, $familyDir . '/user-accounts.json');
        $migratedAccounts = readJsonFile($familyDir . '/user-accounts.json', []);
    } else {
        writeJsonFile($familyDir . '/user-accounts.json', []);
    }

    // Keep the existing login exactly as stored. This is only metadata for
    // the family index; it must never invent or normalize an account name.
    $adminUsername = '';
    foreach ($migratedAccounts as $account) {
        if (($account['isAdmin'] ?? false) === true && isset($account['username'])) {
            $adminUsername = (string) $account['username'];
            break;
        }
    }

    $rootJsonFiles = glob($storageDir . '/*.json');
    if (is_array($rootJsonFiles)) {
        foreach ($rootJsonFiles as $jsonFile) {
            $base = basename($jsonFile);
            if ($base === 'user-accounts.json' || $base === 'families.json') {
                continue;
            }
            @copy($jsonFile, $dataDir . '/' . $base);
        }
    }

    $index['families'][] = [
        'name' => 'Migracja',
        'slug' => $familySlug,
        'createdAt' => gmdate('c'),
        'adminUsername' => $adminUsername,
    ];
    writeJsonFile($indexFile, $index);
}

function validateSuperAdminPassword($index, $providedPassword) {
    return appVerifyPassword($providedPassword, (string) ($index['superAdminPassword'] ?? ''));
}

$storageDir = resolveStorageDir();
[$indexFile, $index] = ensureFamiliesIndex($storageDir);
migrateLegacyDataIfNeeded($storageDir, $indexFile, $index);

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $families = array_values(array_map(function ($family) use ($storageDir) {
        $adminDisplayName = $family['adminDisplayName'] ?? '';
        if ($adminDisplayName === '' && isset($family['slug']) && isset($family['adminUsername'])) {
            $accounts = readFamilyAccounts($storageDir, (string) $family['slug']);
            foreach ($accounts as $account) {
                if (($account['username'] ?? '') === ($family['adminUsername'] ?? '')) {
                    $adminDisplayName = (string) ($account['displayName'] ?? '');
                    break;
                }
            }
        }

        return [
            'name' => $family['name'] ?? '',
            'slug' => $family['slug'] ?? '',
            'createdAt' => $family['createdAt'] ?? '',
            'adminUsername' => $family['adminUsername'] ?? '',
            'adminDisplayName' => $adminDisplayName,
        ];
    }, $index['families']));

    echo json_encode([
        'success' => true,
        'families' => $families,
        'lastSelectedFamily' => normalizeFamilySlug($index['lastSelectedFamily'] ?? ''),
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonError(405, 'Method not allowed');
}

$raw = file_get_contents('php://input');
$payload = json_decode($raw ?: '', true);
if (!is_array($payload)) {
    jsonError(400, 'Nieprawidłowe dane JSON');
}

$action = trim((string) ($payload['action'] ?? ''));

if ($action === 'super_admin_login') {
    $password = trim((string) ($payload['password'] ?? ''));
    $accountRateKey = 'super-admin';
    $ipRateKey = 'super-admin:' . appClientIp();
    appRequireLoginRateLimit('account-login', $accountRateKey);
    appRequireLoginRateLimit('ip-login', $ipRateKey);
    if (!validateSuperAdminPassword($index, $password)) {
        appRecordRateLimitAttempt('account-login', $accountRateKey, 5);
        appRecordRateLimitAttempt('ip-login', $ipRateKey, 10);
        jsonError(401, 'Nieprawidłowe hasło administratora globalnego.');
    }

    if (appPasswordNeedsMigration($index['superAdminPassword'] ?? '')) {
        $index['superAdminPassword'] = appPasswordHash($password);
        writeJsonFile($indexFile, $index);
    }
    appStartSession();
    session_regenerate_id(true);
    $_SESSION = [];
    $_SESSION['super_admin'] = true;
    appTouchSession();
    appClearRateLimit('account-login', $accountRateKey);
    appClearRateLimit('ip-login', $ipRateKey);

    echo json_encode(['success' => true], JSON_UNESCAPED_UNICODE);
    exit;
}

if ($action === 'set_last_selected_family') {
    $familySlug = normalizeFamilySlug($payload['familySlug'] ?? '');
    if ($familySlug === '') {
        jsonError(400, 'Wybierz rodzinę.');
    }

    $familyExists = false;
    foreach ($index['families'] as $family) {
        if (($family['slug'] ?? '') === $familySlug) {
            $familyExists = true;
            break;
        }
    }
    if (!$familyExists) {
        jsonError(404, 'Nie znaleziono wybranej rodziny.');
    }

    $index['lastSelectedFamily'] = $familySlug;
    if (!writeJsonFile($indexFile, $index)) {
        jsonError(500, 'Nie udało się zapisać ostatnio wybranej rodziny.');
    }

    echo json_encode([
        'success' => true,
        'lastSelectedFamily' => $familySlug,
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

function validAccountPassword($password) {
    return appValidatePassword($password);
}

if ($action === 'super_admin_logout') {
    appStartSession();
    $_SESSION = [];
    if (ini_get('session.use_cookies')) {
        $params = session_get_cookie_params();
        setcookie(session_name(), '', time() - 42000, $params['path'], $params['domain'], (bool) $params['secure'], (bool) $params['httponly']);
    }
    if (session_status() === PHP_SESSION_ACTIVE) {
        session_destroy();
    }
    echo json_encode(['success' => true], JSON_UNESCAPED_UNICODE);
    exit;
}

appRequireSuperAdmin();

if ($action === 'super_admin_status') {
    echo json_encode([
        'success' => true,
        'authenticated' => true,
        'role' => 'super_admin',
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

if ($action === 'get_family_admins') {
    $familySlug = normalizeFamilySlug($payload['familySlug'] ?? '');
    if ($familySlug === '') {
        jsonError(400, 'Wybierz rodzinę.');
    }

    $familyExists = false;
    foreach ($index['families'] as $family) {
        if (($family['slug'] ?? '') === $familySlug) {
            $familyExists = true;
            break;
        }
    }
    if (!$familyExists) {
        jsonError(404, 'Nie znaleziono wybranej rodziny.');
    }

    $accountsFile = $storageDir . '/families/' . $familySlug . '/user-accounts.json';
    if (!is_file($accountsFile)) {
        jsonError(404, 'Nie znaleziono kont wybranej rodziny.');
    }
    $accounts = readJsonFile($accountsFile, []);
    $admins = [];
    foreach ($accounts as $account) {
        if (($account['isAdmin'] ?? false) !== true) continue;
        $admins[] = [
            'username' => (string) ($account['username'] ?? ''),
            'displayName' => (string) ($account['displayName'] ?? ''),
        ];
    }
    if (!$admins) {
        jsonError(404, 'Rodzina nie ma administratorów.');
    }

    echo json_encode(['success' => true, 'family' => $familySlug, 'admins' => $admins], JSON_UNESCAPED_UNICODE);
    exit;
}

if ($action === 'set_family_admin_password') {
    $requestId = bin2hex(random_bytes(8));
    $resetError = static function ($status, $code, $stage, $message) use ($requestId) {
        http_response_code($status);
        echo json_encode([
            'success' => false,
            'error' => $message,
            'errorCode' => $code,
            'stage' => $stage,
            'requestId' => $requestId,
        ], JSON_UNESCAPED_UNICODE);
        exit;
    };
    $familySlug = normalizeFamilySlug($payload['familySlug'] ?? '');
    $username = normalizeUsername($payload['username'] ?? '');
    $newPassword = trim((string) ($payload['password'] ?? ''));
    if ($familySlug === '' || $username === '') {
        $resetError(400, 'missing_target', 'target', 'Wybierz rodzinę i administratora.');
    }
    if (!validAccountPassword($newPassword)) {
        $resetError(400, 'invalid_password', 'validation', 'Hasło musi mieć co najmniej 8 znaków, cyfrę i znak specjalny.');
    }
    $familyExists = false;
    foreach ($index['families'] as $family) {
        if (($family['slug'] ?? '') === $familySlug) {
            $familyExists = true;
            break;
        }
    }
    if (!$familyExists) {
        $resetError(404, 'family_not_found', 'family', 'Nie znaleziono wybranej rodziny.');
    }

    $familyDir = $storageDir . '/families/' . $familySlug;
    if (!is_dir($familyDir)) {
        $resetError(404, 'family_storage_missing', 'storage', 'Brak katalogu danych wybranej rodziny.');
    }
    $accountsFile = $familyDir . '/user-accounts.json';
    $rawAccounts = @file_get_contents($accountsFile);
    $accounts = is_string($rawAccounts) ? json_decode($rawAccounts, true) : null;
    if (!is_array($accounts) || !array_is_list($accounts) || !$accounts || json_last_error() !== JSON_ERROR_NONE) {
        $resetError(500, 'invalid_accounts_file', 'accounts', 'Plik kont rodziny ma nieprawidłowy format.');
    }
    $position = -1;
    foreach ($accounts as $i => $account) {
        if (normalizeUsername($account['username'] ?? '') === $username && ($account['isAdmin'] ?? false) === true) {
            $position = $i;
            break;
        }
    }
    if ($position < 0) $resetError(404, 'admin_not_found', 'target', 'Nie znaleziono administratora o podanym loginie w tej rodzinie.');
    appBackupBeforeMutation('family-admin-password');
    $accounts[$position]['password'] = appPasswordHash($newPassword);
    $encodedAccounts = json_encode(array_values($accounts), JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    if (!is_string($encodedAccounts) || !appAtomicWrite($accountsFile, $encodedAccounts)) {
        $resetError(500, 'write_failed', 'write', 'Nie udało się zapisać nowego hasła.');
    }
    $verifiedAccounts = readJsonFile($accountsFile, []);
    if (!is_array($verifiedAccounts) || !array_is_list($verifiedAccounts)) {
        $resetError(500, 'verify_format_failed', 'verify', 'Nie udało się potwierdzić formatu pliku kont po zapisie.');
    }
    $verifiedUsername = normalizeUsername($verifiedAccounts[$position]['username'] ?? '');
    $verifiedHash = $verifiedAccounts[$position]['password'] ?? '';
    $verifiedAlgorithm = is_string($verifiedHash) ? password_get_info($verifiedHash)['algoName'] : '';
    if ($verifiedUsername !== $username || !is_string($verifiedHash) || !password_verify($newPassword, $verifiedHash) || $verifiedAlgorithm !== 'bcrypt') {
        $resetError(500, 'verify_hash_failed', 'verify', 'Nie udało się potwierdzić zapisu nowego hasła.');
    }
    appClearRateLimit('account-login', $familySlug . ':' . $username);
    echo json_encode([
        'success' => true,
        'family' => $familySlug,
        'username' => $accounts[$position]['username'] ?? '',
        'passwordVerified' => true,
        'accountRateLimitCleared' => true,
        'stage' => 'verified',
        'requestId' => $requestId,
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

if ($action === 'change_super_admin_password') {
    $oldPassword = trim((string) ($payload['oldPassword'] ?? ''));
    $newPassword = trim((string) ($payload['newPassword'] ?? ''));

    if (!validateSuperAdminPassword($index, $oldPassword)) {
        jsonError(401, 'Nieprawidłowe obecne hasło administratora globalnego.');
    }
    if (!validAccountPassword($newPassword)) {
        jsonError(400, 'Nowe hasło musi mieć co najmniej 8 znaków, cyfrę i znak specjalny.');
    }

    $index['superAdminPassword'] = appPasswordHash($newPassword);
    if (!writeJsonFile($indexFile, $index)) {
        jsonError(500, 'Nie udało się zapisać nowego hasła administratora globalnego.');
    }

    echo json_encode(['success' => true], JSON_UNESCAPED_UNICODE);
    exit;
}

if ($action === 'create_family') {
    $familyName = trim((string) ($payload['familyName'] ?? ''));
    $familySlug = normalizeFamilySlug($familyName);
    $adminUsername = normalizeUsername($payload['adminUsername'] ?? '');
    $adminPassword = trim((string) ($payload['adminPassword'] ?? ''));
    $adminDisplayName = trim((string) ($payload['adminDisplayName'] ?? ''));

    if ($familyName === '' || $familySlug === '') {
        jsonError(400, 'Nazwa rodziny jest wymagana.');
    }
    if ($adminUsername === '') {
        jsonError(400, 'Login pierwszego administratora rodziny jest wymagany.');
    }
    if (!validAccountPassword($adminPassword)) {
        jsonError(400, 'Hasło pierwszego administratora musi mieć co najmniej 8 znaków, cyfrę i znak specjalny.');
    }

    foreach ($index['families'] as $family) {
        if (($family['slug'] ?? '') === $familySlug) {
            jsonError(409, 'Rodzina o tej nazwie już istnieje.');
        }
    }

    $familyDir = $storageDir . '/families/' . $familySlug;
    $dataDir = $familyDir . '/data';
    if (!is_dir($dataDir) && !@mkdir($dataDir, 0777, true)) {
        jsonError(500, 'Nie udało się utworzyć katalogu danych rodziny.');
    }

    $accountsFile = $familyDir . '/user-accounts.json';
    $accounts = [[
        'username' => $adminUsername,
        'password' => appPasswordHash($adminPassword),
        'displayName' => $adminDisplayName,
        'note' => 'Pierwsze konto rodziny',
        'isAdmin' => true,
        'createdAt' => gmdate('c'),
    ]];
    if (!writeJsonFile($accountsFile, $accounts)) {
        jsonError(500, 'Nie udało się zapisać pierwszego konta rodziny.');
    }

    $sharedFile = $dataDir . '/shared.json';
    writeJsonFile($sharedFile, [
        'items' => [],
        'settings' => [
            'macroDisplayMode' => 'per100g',
            'showMacroProducts' => false,
            'showMacroDiary' => true,
            'showShoppingOwnerInfo' => true,
            'syncMode' => 'manual',
            'syncWeeks' => 0,
            'syncDays' => 0,
            'syncHours' => 0,
            'syncMinutes' => 30,
        ],
    ]);

    $index['families'][] = [
        'name' => $familyName,
        'slug' => $familySlug,
        'createdAt' => gmdate('c'),
        'adminUsername' => $adminUsername,
        'adminDisplayName' => $adminDisplayName,
    ];

    if (!writeJsonFile($indexFile, $index)) {
        jsonError(500, 'Nie udało się dodać rodziny.');
    }

    echo json_encode([
        'success' => true,
        'family' => [
            'name' => $familyName,
            'slug' => $familySlug,
            'adminUsername' => $adminUsername,
        ],
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

if ($action === 'update_family') {
    $sourceFamilySlug = normalizeFamilySlug($payload['familySlug'] ?? '');
    $familyName = trim((string) ($payload['familyName'] ?? ''));
    $targetFamilySlug = normalizeFamilySlug($familyName);
    $adminUsername = normalizeUsername($payload['adminUsername'] ?? '');
    $adminDisplayName = trim((string) ($payload['adminDisplayName'] ?? ''));

    if ($sourceFamilySlug === '') {
        jsonError(400, 'Wybierz rodzinę do edycji.');
    }
    if ($familyName === '' || $targetFamilySlug === '') {
        jsonError(400, 'Nazwa rodziny jest wymagana.');
    }
    if ($adminUsername === '') {
        jsonError(400, 'Login administratora rodziny jest wymagany.');
    }

    $familyIndex = -1;
    foreach ($index['families'] as $idx => $family) {
        if (($family['slug'] ?? '') === $sourceFamilySlug) {
            $familyIndex = $idx;
            break;
        }
    }
    if ($familyIndex < 0) {
        jsonError(404, 'Nie znaleziono wybranej rodziny.');
    }

    if ($targetFamilySlug !== $sourceFamilySlug) {
        foreach ($index['families'] as $idx => $family) {
            if ($idx === $familyIndex) {
                continue;
            }
            if (($family['slug'] ?? '') === $targetFamilySlug) {
                jsonError(409, 'Rodzina o tej nazwie już istnieje.');
            }
        }
    }

    $sourceFamilyDir = $storageDir . '/families/' . $sourceFamilySlug;
    $targetFamilyDir = $storageDir . '/families/' . $targetFamilySlug;
    if (!is_dir($sourceFamilyDir)) {
        jsonError(404, 'Brak katalogu danych wybranej rodziny.');
    }
    if ($targetFamilySlug !== $sourceFamilySlug && is_dir($targetFamilyDir)) {
        jsonError(409, 'Docelowy identyfikator rodziny już istnieje.');
    }

    $accountsFile = $sourceFamilyDir . '/user-accounts.json';
    $accounts = readJsonFile($accountsFile, []);
    if (!is_array($accounts) || count($accounts) === 0) {
        jsonError(400, 'Rodzina nie ma kont użytkowników do aktualizacji.');
    }

    $previousAdminUsername = (string) ($index['families'][$familyIndex]['adminUsername'] ?? '');
    $adminAccountIndex = -1;
    foreach ($accounts as $idx => $account) {
        if (($account['username'] ?? '') === $previousAdminUsername) {
            $adminAccountIndex = $idx;
            break;
        }
    }
    if ($adminAccountIndex < 0) {
        foreach ($accounts as $idx => $account) {
            if (($account['isAdmin'] ?? false) === true) {
                $adminAccountIndex = $idx;
                break;
            }
        }
    }
    if ($adminAccountIndex < 0) {
        $adminAccountIndex = 0;
    }

    if ($adminUsername !== ($accounts[$adminAccountIndex]['username'] ?? '')) {
        foreach ($accounts as $idx => $account) {
            if ($idx === $adminAccountIndex) {
                continue;
            }
            if (($account['username'] ?? '') === $adminUsername) {
                jsonError(409, 'Podany login administratora jest już zajęty w tej rodzinie.');
            }
        }
    }

    $accounts[$adminAccountIndex]['username'] = $adminUsername;
    $accounts[$adminAccountIndex]['isAdmin'] = true;
    $accounts[$adminAccountIndex]['displayName'] = $adminDisplayName;

    if (!writeJsonFile($accountsFile, $accounts)) {
        jsonError(500, 'Nie udało się zaktualizować konta administratora rodziny.');
    }

    if ($targetFamilySlug !== $sourceFamilySlug) {
        if (!@rename($sourceFamilyDir, $targetFamilyDir)) {
            jsonError(500, 'Nie udało się zmienić identyfikatora rodziny.');
        }
    }

    $index['families'][$familyIndex]['name'] = $familyName;
    $index['families'][$familyIndex]['slug'] = $targetFamilySlug;
    $index['families'][$familyIndex]['adminUsername'] = $adminUsername;
    $index['families'][$familyIndex]['adminDisplayName'] = $adminDisplayName;

    if (!writeJsonFile($indexFile, $index)) {
        jsonError(500, 'Nie udało się zapisać zmian rodziny.');
    }

    echo json_encode([
        'success' => true,
        'family' => [
            'name' => $familyName,
            'slug' => $targetFamilySlug,
            'adminUsername' => $adminUsername,
            'adminDisplayName' => $adminDisplayName,
        ],
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

jsonError(400, 'Nieznana akcja.');
