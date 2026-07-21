<?php
require_once __DIR__ . '/security.php';
require_once __DIR__ . '/backup.php';
header('Content-Type: application/json; charset=utf-8');

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
    return strlen($password) >= 12;
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
$accounts = readJsonFile($accountsFile, []);
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
        if (($account['username'] ?? '') !== $username || !appVerifyPassword($password, $account['password'] ?? '')) continue;
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
    foreach ($accounts as $account) if (($account['username'] ?? '') === $_SESSION['user']) { echo json_encode(['success' => true, 'account' => publicAccountView($account), 'family' => $familySlug], JSON_UNESCAPED_UNICODE); exit; }
    appJsonError(401, 'Konto nie istnieje.');
}

appRequireFamilyAdmin($familySlug);
if ($method === 'GET') { echo json_encode(['success' => true, 'accounts' => array_map('publicAccountView', $accounts), 'family' => $familySlug], JSON_UNESCAPED_UNICODE); exit; }
if ($method !== 'POST') appJsonError(405, 'Method not allowed');

$username = normalizeAccountUsername($payload['username'] ?? '');
$password = (string) ($payload['password'] ?? '');
$displayName = trim((string) ($payload['displayName'] ?? ''));
$note = trim((string) ($payload['note'] ?? ''));
if ($action === 'set_password') {
    if ($username === '' || !validNewPassword($password)) appJsonError(400, 'Hasło musi mieć co najmniej 12 znaków.');
    foreach ($accounts as $i => $account) if (($account['username'] ?? '') === $username) { $accounts[$i]['password'] = appPasswordHash($password); writeJsonFile($accountsFile, $accounts); echo json_encode(['success'=>true,'accounts'=>array_map('publicAccountView',$accounts)], JSON_UNESCAPED_UNICODE); exit; }
    appJsonError(404, 'Nie znaleziono konta.');
}
if ($action === 'edit_account' || $action === 'set_admin' || $action === 'delete_account') {
    foreach ($accounts as $i => $account) if (($account['username'] ?? '') === $username) {
        if ($action === 'edit_account') { $accounts[$i]['displayName'] = $displayName; $accounts[$i]['note'] = $note; }
        if ($action === 'set_admin') $accounts[$i]['isAdmin'] = ($payload['isAdmin'] ?? false) === true;
        if ($action === 'delete_account') array_splice($accounts, $i, 1);
        $admins = array_filter($accounts, fn($a) => ($a['isAdmin'] ?? false) === true);
        if (!$admins) appJsonError(400, 'Rodzina musi mieć co najmniej jednego administratora.');
        writeJsonFile($accountsFile, $accounts); echo json_encode(['success'=>true,'accounts'=>array_map('publicAccountView',$accounts)], JSON_UNESCAPED_UNICODE); exit;
    }
    appJsonError(404, 'Nie znaleziono konta.');
}
if ($username === '' || !validNewPassword($password)) appJsonError(400, 'Login i hasło (minimum 12 znaków) są wymagane.');
foreach ($accounts as $account) if (($account['username'] ?? '') === $username) appJsonError(409, 'Konto o tym loginie już istnieje.');
$accounts[] = ['username'=>$username, 'password'=>appPasswordHash($password), 'displayName'=>$displayName, 'note'=>$note, 'isAdmin'=>($payload['isAdmin'] ?? false) === true, 'createdAt'=>gmdate('c')];
writeJsonFile($accountsFile, $accounts);
echo json_encode(['success'=>true,'accounts'=>array_map('publicAccountView',$accounts)], JSON_UNESCAPED_UNICODE);
