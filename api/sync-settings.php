<?php
require_once __DIR__ . '/security.php';
require_once __DIR__ . '/backup.php';
header('Content-Type: application/json; charset=utf-8');
appRequireSameOriginForWrite();

function syncSettingsDefaults() {
    return ['mode' => 'manual', 'weeks' => 0, 'days' => 0, 'hours' => 0, 'minutes' => 30];
}

function syncSettingsNormalize($input) {
    $defaults = syncSettingsDefaults();
    $mode = (($input['mode'] ?? 'manual') === 'auto') ? 'auto' : 'manual';
    $result = ['mode' => $mode];
    foreach (['weeks' => 52, 'days' => 31, 'hours' => 23, 'minutes' => 59] as $key => $max) {
        $value = filter_var($input[$key] ?? $defaults[$key], FILTER_VALIDATE_INT);
        if ($value === false || $value < 0 || $value > $max) appJsonError(400, 'Nieprawidłowy interwał synchronizacji.');
        $result[$key] = $value;
    }
    if ($result['weeks'] + $result['days'] + $result['hours'] + $result['minutes'] === 0) {
        appJsonError(400, 'Interwał synchronizacji musi być większy od zera.');
    }
    return $result;
}

appStartSession();
if (empty($_SESSION['super_admin'])) appRequireLogin();
$config = appPrivateConfig();
$settings = array_merge(syncSettingsDefaults(), is_array($config['sync'] ?? null) ? $config['sync'] : []);

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    echo json_encode(['success' => true, 'settings' => syncSettingsNormalize($settings)], JSON_UNESCAPED_UNICODE);
    exit;
}

appRequireSuperAdmin();
$payload = json_decode(file_get_contents('php://input') ?: '', true);
if (!is_array($payload)) appJsonError(400, 'Nieprawidłowe dane JSON.');
$next = syncSettingsNormalize($payload);
$config['sync'] = $next;
appBackupBeforeMutation('global-sync-settings');
$path = dirname(__DIR__, 2) . '/app-private/config.php';
$php = "<?php\nreturn " . var_export($config, true) . ";\n";
if (!appAtomicWrite($path, $php)) appJsonError(500, 'Nie udało się zapisać ustawień synchronizacji.');
echo json_encode(['success' => true, 'settings' => $next], JSON_UNESCAPED_UNICODE);
