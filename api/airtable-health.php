<?php
require_once __DIR__ . '/security.php';
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

function isAirtableConfigured($apiKey, $baseId, $tableName) {
    return $apiKey !== '' && $baseId !== '' && $tableName !== '';
}

function appRequireAirtableConfigManager($family) {
    appRequireFamilyAdmin($family);
    if (!hash_equals('polak', (string) ($_SESSION['family'] ?? '')) || !hash_equals('bartek', (string) ($_SESSION['user'] ?? ''))) {
        appJsonError(403, 'Konfiguracją Airtable może zarządzać wyłącznie konto Bartek w rodzinie Polak.');
    }
}

appRequireAirtableConfigManager((string) ($_GET['family'] ?? ''));

$airtableApiKey = (string) (getenv('AIRTABLE_API_KEY') ?: '');
$airtableBaseId = (string) (getenv('AIRTABLE_BASE_ID') ?: '');
$airtableTableName = (string) (getenv('AIRTABLE_TABLE_NAME') ?: 'shopping_list');
$airtableUserField = (string) (getenv('AIRTABLE_USER_FIELD') ?: 'user');

if (!isAirtableConfigured($airtableApiKey, $airtableBaseId, $airtableTableName)) {
    echo json_encode(['success' => true, 'connected' => false, 'configured' => false]);
    exit;
}

function airtableRequest($url, $apiKey) {
    if (function_exists('curl_init')) {
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_TIMEOUT, 20);
        curl_setopt($ch, CURLOPT_HTTPHEADER, ['Authorization: Bearer ' . $apiKey, 'Content-Type: application/json']);
        $body = curl_exec($ch);
        $status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $error = curl_error($ch);
        curl_close($ch);
        return ['status' => $status, 'body' => $body, 'error' => $error];
    }

    $context = stream_context_create([
        'http' => [
            'method' => 'GET',
            'header' => "Authorization: Bearer {$apiKey}\r\nContent-Type: application/json\r\n",
            'timeout' => 20,
            'ignore_errors' => true,
        ],
    ]);
    $body = @file_get_contents($url, false, $context);
    $status = 0;
        $error = $body === false ? 'Nie udało się wykonać żądania HTTP.' : '';
    if (isset($http_response_header[0]) && preg_match('/\s(\d{3})\s/', $http_response_header[0], $matches)) {
        $status = (int) $matches[1];
    }
        return ['status' => $status, 'body' => $body, 'error' => $error];
}

$table = rawurlencode($airtableTableName);
$formula = rawurlencode(sprintf("{%s}='shared'", $airtableUserField));
$url = "https://api.airtable.com/v0/{$airtableBaseId}/{$table}?maxRecords=1&filterByFormula={$formula}";
$response = airtableRequest($url, $airtableApiKey);

$connected = $response['status'] >= 200 && $response['status'] < 300;
$reason = '';
if (!$connected) {
    if ($response['status'] === 0) {
        $reason = $response['error'] !== '' ? $response['error'] : 'Brak odpowiedzi z Airtable lub zablokowane wyjście HTTPS.';
    } elseif ($response['status'] === 401 || $response['status'] === 403) {
        $reason = 'Nieprawidłowy API key lub brak uprawnień do bazy.';
    } elseif ($response['status'] === 404) {
        $reason = 'Nieprawidłowy Base ID, nazwa tabeli lub brak dostępu do tabeli.';
    } else {
        $reason = 'Airtable zwrócił kod HTTP ' . $response['status'] . '.';
    }
}

echo json_encode([
    'success' => true,
    'connected' => $connected,
    'configured' => true,
    'status' => $response['status'],
    'reason' => $reason,
], JSON_UNESCAPED_UNICODE);
