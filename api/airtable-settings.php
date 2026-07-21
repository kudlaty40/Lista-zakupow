<?php
require_once __DIR__ . '/security.php';
require_once __DIR__ . '/backup.php';
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}
appRequireSameOriginForWrite();

function normalizeUser($value) {
    $clean = strtolower(preg_replace('/[^a-z0-9._-]+/', '_', trim((string) $value)));
    return $clean !== '' ? $clean : 'guest';
}

function appRequireAirtableConfigManager($family) {
    appRequireFamilyAdmin($family);
    if (!hash_equals('polak', (string) ($_SESSION['family'] ?? '')) || !hash_equals('bartek', (string) ($_SESSION['user'] ?? ''))) {
        appJsonError(403, 'Konfiguracją Airtable może zarządzać wyłącznie konto Bartek w rodzinie Polak.');
    }
}

appRequireAirtableConfigManager((string) ($_GET['family'] ?? ''));

$configFile = __DIR__ . '/airtable-config.php';

$defaults = [
    'api_key' => '',
    'base_id' => '',
    'table_name' => 'shopping_list',
    'user_field' => 'user',
    'data_field' => 'data',
    'updated_field' => 'updated_at',
];

$currentConfig = $defaults;
if (file_exists($configFile)) {
    $loaded = require $configFile;
    if (is_array($loaded)) {
        $currentConfig = array_merge($defaults, $loaded);
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $publicConfig = $currentConfig;
    $publicConfig['api_key'] = '';
    $publicConfig['has_api_key'] = $currentConfig['api_key'] !== '';
    echo json_encode([
        'success' => true,
        'config' => $publicConfig,
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $raw = file_get_contents('php://input');
    $payload = json_decode($raw, true);

    if (!is_array($payload)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Nieprawidłowe dane JSON']);
        exit;
    }

    $nextConfig = [
        'api_key' => trim((string) ($payload['api_key'] ?? '')) ?: $currentConfig['api_key'],
        'base_id' => trim((string) ($payload['base_id'] ?? $currentConfig['base_id'])),
        'table_name' => trim((string) ($payload['table_name'] ?? $currentConfig['table_name'])) ?: 'shopping_list',
        'user_field' => trim((string) ($payload['user_field'] ?? $currentConfig['user_field'])) ?: 'user',
        'data_field' => trim((string) ($payload['data_field'] ?? $currentConfig['data_field'])) ?: 'data',
        'updated_field' => trim((string) ($payload['updated_field'] ?? $currentConfig['updated_field'])) ?: 'updated_at',
    ];

    $php = "<?php\nreturn " . var_export($nextConfig, true) . ";\n";
    appBackupBeforeMutation('airtable-config');
    $saved = appAtomicWrite($configFile, $php);

    if ($saved === false) {
        http_response_code(500);
        echo json_encode(['success' => false, 'error' => 'Nie udało się zapisać konfiguracji']);
        exit;
    }

    $publicConfig = $nextConfig;
    $publicConfig['api_key'] = '';
    $publicConfig['has_api_key'] = $nextConfig['api_key'] !== '';
    echo json_encode([
        'success' => true,
        'config' => $publicConfig,
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

http_response_code(405);
echo json_encode(['success' => false, 'error' => 'Method not allowed']);
