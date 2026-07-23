<?php
require_once __DIR__ . '/security.php';
require_once __DIR__ . '/backup.php';
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, private');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }
appRequireSameOriginForWrite();

function normalizeAccountUsername($value) {
    $clean = strtolower(trim((string) $value));
    $clean = preg_replace('/[^a-z0-9._-]+/', '-', $clean);
    return trim($clean, '-');
}
function normalizeFamilySlug($value) { return normalizeAccountUsername($value); }
function readJsonFile($path, $default) {
    if (!file_exists($path)) return $default;
    $decoded = json_decode(file_get_contents($path) ?: '', true);
    return is_array($decoded) ? $decoded : $default;
}
function readAccountsFile($path) {
    if (!is_file($path)) return [];
    $raw = @file_get_contents($path);
    $decoded = is_string($raw) ? json_decode($raw, true) : null;
    if (!is_array($decoded) || !array_is_list($decoded) || json_last_error() !== JSON_ERROR_NONE) {
        appJsonError(500, 'Plik kont rodziny ma nieprawidłowy format.');
    }
    return $decoded;
}
function writeJsonFile($path, $payload) {
    appBackupBeforeMutation('accounts');
    return appAtomicWrite($path, json_encode($payload, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
}
function resolveStorageDir() {
    return appStorageDir();
    $configured = trim((string) (getenv('APP_STORAGE_DIR') ?: ''));
    $candidates = array_filter([$configured, dirname(__DIR__) . '/storage', __DIR__ . '/storage']);
    foreach ($candidates as $candidate) {
        if ((is_dir($candidate) || @mkdir($candidate, 0700, true)) && is_writable($candidate)) return $candidate;
    }
    appJsonError(500, 'Nie można przygotować bezpiecznego katalogu danych.');
}
function publicAccountView($account) {
    return ['username' => $account['username'] ?? '', 'displayName' => $account['displayName'] ?? '', 'note' => $account['note'] ?? '', 'isAdmin' => ($account['isAdmin'] ?? false) === true, 'createdAt' => $account['createdAt'] ?? ''];
}
function validNewPassword($password) {
    return appValidatePassword($password);
}

$storageDir = resolveStorageDir();
$familySlug = normalizeFamilySlug($_GET['family'] ?? '');
$method = $_SERVER['REQUEST_METHOD'];
$requestedAction = $method === 'GET' ? trim((string) ($_GET['action'] ?? '')) : '';
if ($method === 'GET' && $requestedAction === 'session' && $familySlug === '') {
    appRequireLogin();
    $familySlug = normalizeFamilySlug($_SESSION['family'] ?? '');
}
if ($familySlug === '') appJsonError(400, 'Wybierz rodzinę.');
$index = readJsonFile($storageDir . '/families/families.json', ['families' => []]);
$exists = false;
foreach (($index['families'] ?? []) as $family) if (($family['slug'] ?? '') === $familySlug) $exists = true;
if (!$exists) appJsonError(404, 'Nie znaleziono wybranej rodziny.');
$familyDir = $storageDir . '/families/' . $familySlug;
if (!is_dir($familyDir) && !@mkdir($familyDir, 0700, true)) appJsonError(500, 'Nie można przygotować danych rodziny.');
$accountsFile = $familyDir . '/user-accounts.json';
if (!file_exists($accountsFile)) writeJsonFile($accountsFile, []);
$accounts = readAccountsFile($accountsFile);
$payload = $method === 'POST' ? json_decode(file_get_contents('php://input') ?: '', true) : [];
if (!is_array($payload)) appJsonError(400, 'Nieprawidłowe dane JSON.');
$action = trim((string) ($payload['action'] ?? ''));

if ($method === 'POST' && $action === 'login') {
    appStartSession();
    $username = normalizeAccountUsername($payload['username'] ?? '');
    $password = (string) ($payload['password'] ?? '');
    $accountRateKey = $familySlug . ':' . ($username !== '' ? $username : 'unknown');
    $ipRateKey = $familySlug . ':' . appClientIp();
    appRequireLoginRateLimit('account-login', $accountRateKey);
    appRequireLoginRateLimit('ip-login', $ipRateKey);
    foreach ($accounts as $position => $account) {
        if (normalizeAccountUsername($account['username'] ?? '') !== $username || !appVerifyPassword($password, $account['password'] ?? '')) continue;
        if (appPasswordNeedsMigration($account['password'] ?? '')) {
            $accounts[$position]['password'] = appPasswordHash($password);
            writeJsonFile($accountsFile, $accounts);
        }
        session_regenerate_id(true);
        $_SESSION['user'] = $username;
        $_SESSION['family'] = $familySlug;
        $_SESSION['is_admin'] = ($account['isAdmin'] ?? false) === true;
        appTouchSession();
        appClearRateLimit('account-login', $accountRateKey);
        appClearRateLimit('ip-login', $ipRateKey);
        echo json_encode(['success' => true, 'account' => publicAccountView($accounts[$position]), 'family' => $familySlug], JSON_UNESCAPED_UNICODE); exit;
    }
    appRecordRateLimitAttempt('account-login', $accountRateKey, 5);
    appRecordRateLimitAttempt('ip-login', $ipRateKey, 10);
    appJsonError(401, 'Nieprawidłowy login lub hasło.');
}
if ($method === 'POST' && $action === 'logout') {
    appRequireLogin($familySlug); appEndSession(); echo json_encode(['success' => true]); exit;
}
if ($method === 'GET' && ($_GET['action'] ?? '') === 'session') {
    appRequireLogin($familySlug);
    foreach ($accounts as $account) if (normalizeAccountUsername($account['username'] ?? '') === normalizeAccountUsername($_SESSION['user'] ?? '')) { echo json_encode(['success' => true, 'account' => publicAccountView($account), 'family' => $familySlug], JSON_UNESCAPED_UNICODE); exit; }
    appJsonError(401, 'Konto nie istnieje.');
}

if ($method === 'POST' && $action === 'change_own_password') {
    appRequireLogin($familySlug);
    $currentPassword = (string) ($payload['currentPassword'] ?? '');
    $newPassword = (string) ($payload['password'] ?? '');
    if (!validNewPassword($newPassword)) appJsonError(400, 'Nowe hasło musi mieć co najmniej 8 znaków, cyfrę i znak specjalny.');
    $username = normalizeAccountUsername($_SESSION['user'] ?? '');
    foreach ($accounts as $i => $account) {
        if (normalizeAccountUsername($account['username'] ?? '') !== $username) continue;
        if (!appVerifyPassword($currentPassword, $account['password'] ?? '')) appJsonError(401, 'Nieprawidłowe obecne hasło.');
        $accounts[$i]['password'] = appPasswordHash($newPassword);
        if (!writeJsonFile($accountsFile, $accounts)) appJsonError(500, 'Nie udało się zmienić hasła.');
        session_regenerate_id(true);
        $_SESSION['user'] = $username;
        $_SESSION['family'] = $familySlug;
        $_SESSION['is_admin'] = ($accounts[$i]['isAdmin'] ?? false) === true;
        appTouchSession();
        echo json_encode(['success' => true], JSON_UNESCAPED_UNICODE);
        exit;
    }
    appJsonError(404, 'Nie znaleziono konta.');
}

appRequireFamilyAdmin($familySlug);
$primaryAdminUsername = '';
foreach (($index['families'] ?? []) as $family) {
    if (($family['slug'] ?? '') === $familySlug) {
        $primaryAdminUsername = (string) ($family['adminUsername'] ?? '');
        break;
    }
}
$isPrimaryAdmin = $primaryAdminUsername !== ''
    && hash_equals(normalizeAccountUsername($primaryAdminUsername), normalizeAccountUsername((string) ($_SESSION['user'] ?? '')));

if ($method === 'GET') {
    echo json_encode([
        'success' => true,
        'accounts' => array_map('publicAccountView', $accounts),
        'family' => $familySlug,
        'primaryAdminUsername' => $primaryAdminUsername,
        'canManageAdmins' => $isPrimaryAdmin,
    ], JSON_UNESCAPED_UNICODE);
    exit;
}
if ($method !== 'POST') appJsonError(405, 'Method not allowed');

$username = normalizeAccountUsername($payload['username'] ?? '');
$password = (string) ($payload['password'] ?? '');
$displayName = trim((string) ($payload['displayName'] ?? ''));
$note = trim((string) ($payload['note'] ?? ''));
if ($action === 'set_password') {
    if ($username === '' || !validNewPassword($password)) appJsonError(400, 'Hasło musi mieć co najmniej 8 znaków, cyfrę i znak specjalny.');
    foreach ($accounts as $i => $account) if (normalizeAccountUsername($account['username'] ?? '') === $username) { $accounts[$i]['password'] = appPasswordHash($password); writeJsonFile($accountsFile, $accounts); echo json_encode(['success'=>true,'accounts'=>array_map('publicAccountView',$accounts)], JSON_UNESCAPED_UNICODE); exit; }
    appJsonError(404, 'Nie znaleziono konta.');
}
if ($action === 'edit_account' || $action === 'set_admin' || $action === 'delete_account') {
    foreach ($accounts as $i => $account) if (normalizeAccountUsername($account['username'] ?? '') === $username) {
        if ($action === 'edit_account') {
            $nextIsAdmin = array_key_exists('isAdmin', $payload) ? ($payload['isAdmin'] ?? false) === true : (($account['isAdmin'] ?? false) === true);
            if ($username === ($_SESSION['user'] ?? '') && !$nextIsAdmin) appJsonError(400, 'Nie możesz odebrać sobie roli administratora.');
            if ($username === $primaryAdminUsername && !$nextIsAdmin) appJsonError(400, 'Nie można zdegradować pierwszego administratora rodziny.');
            if ($nextIsAdmin !== (($account['isAdmin'] ?? false) === true) && !$isPrimaryAdmin) appJsonError(403, 'Tylko pierwszy administrator rodziny może nadawać uprawnienia.');
            $accounts[$i]['displayName'] = $displayName;
            $accounts[$i]['note'] = $note;
            $accounts[$i]['isAdmin'] = $nextIsAdmin;
            if ($password !== '') {
                if (!validNewPassword($password)) appJsonError(400, 'Hasło musi mieć co najmniej 8 znaków, cyfrę i znak specjalny.');
                $accounts[$i]['password'] = appPasswordHash($password);
            }
        }
        if ($action === 'set_admin') {
            $nextIsAdmin = ($payload['isAdmin'] ?? false) === true;
            if ($username === $primaryAdminUsername && !$nextIsAdmin) appJsonError(400, 'Nie można zdegradować pierwszego administratora rodziny.');
            if (!$isPrimaryAdmin) appJsonError(403, 'Tylko pierwszy administrator rodziny może nadawać uprawnienia.');
            $accounts[$i]['isAdmin'] = $nextIsAdmin;
        }
        if ($action === 'delete_account') {
            if ($username === $primaryAdminUsername) appJsonError(400, 'Nie można usunąć pierwszego administratora rodziny.');
            array_splice($accounts, $i, 1);
        }
        $admins = array_filter($accounts, fn($a) => ($a['isAdmin'] ?? false) === true);
        if (!$admins) appJsonError(400, 'Rodzina musi mieć co najmniej jednego administratora.');
        writeJsonFile($accountsFile, $accounts); echo json_encode(['success'=>true,'accounts'=>array_map('publicAccountView',$accounts)], JSON_UNESCAPED_UNICODE); exit;
    }
    appJsonError(404, 'Nie znaleziono konta.');
}
if ($username === '' || !validNewPassword($password)) appJsonError(400, 'Login i hasło (minimum 12 znaków) są wymagane.');
    foreach ($accounts as $account) if (normalizeAccountUsername($account['username'] ?? '') === $username) appJsonError(409, 'Konto o tym loginie już istnieje.');
if (($payload['isAdmin'] ?? false) === true && !$isPrimaryAdmin) {
    appJsonError(403, 'Tylko pierwszy administrator rodziny może nadawać uprawnienia.');
}
$accounts[] = ['username'=>$username, 'password'=>appPasswordHash($password), 'displayName'=>$displayName, 'note'=>$note, 'isAdmin'=>($payload['isAdmin'] ?? false) === true, 'createdAt'=>gmdate('c')];
writeJsonFile($accountsFile, $accounts);
echo json_encode(['success'=>true,'accounts'=>array_map('publicAccountView',$accounts)], JSON_UNESCAPED_UNICODE);
