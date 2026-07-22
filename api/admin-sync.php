<?php
require_once __DIR__ . '/security.php';
require_once __DIR__ . '/backup.php';
header('Content-Type: application/json; charset=utf-8');
appRequireSameOriginForWrite();
appRequireSuperAdmin();
if ($_SERVER['REQUEST_METHOD'] !== 'POST') appJsonError(405, 'Dozwolony jest wyłącznie POST.');
function normalizeFamilySlug($value) { return trim(preg_replace('/[^a-z0-9._-]+/i', '-', strtolower((string) $value)), '-'); }

$payload = json_decode(file_get_contents('php://input') ?: '', true);
$family = normalizeFamilySlug($payload['family'] ?? '');
if ($family === '') appJsonError(400, 'Wybierz rodzinę.');
$config = appAirtableConfig();
$key = (string) ($config['api_key'] ?? '');
$base = (string) ($config['base_id'] ?? '');
$table = (string) ($config['table_name'] ?? '');
$userField = (string) ($config['user_field'] ?? 'user');
$dataField = (string) ($config['data_field'] ?? 'data');
$updatedField = (string) ($config['updated_field'] ?? 'updated_at');
if ($key === '' || $base === '' || $table === '') appJsonError(503, 'Airtable nie jest skonfigurowany.');

function adminSyncRequest($method, $url, $key, $body = null) {
    $ch = curl_init($url);
    curl_setopt_array($ch, [CURLOPT_CUSTOMREQUEST => $method, CURLOPT_RETURNTRANSFER => true, CURLOPT_TIMEOUT => 30, CURLOPT_HTTPHEADER => ['Authorization: Bearer ' . $key, 'Content-Type: application/json']]);
    if ($body !== null) curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($body, JSON_UNESCAPED_UNICODE));
    $raw = curl_exec($ch); $status = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE); curl_close($ch);
    return ['status' => $status, 'body' => is_string($raw) ? json_decode($raw, true) : null];
}

$storage = appStorageDir() . '/families/' . $family . '/data';
if (!is_dir($storage)) appJsonError(404, 'Nie znaleziono rodziny.');
$files = glob($storage . '/*.json') ?: [];
$encodedTable = rawurlencode($table); $records = 0;
foreach ($files as $file) {
    $user = pathinfo($file, PATHINFO_FILENAME);
    $data = json_decode(file_get_contents($file) ?: '', true);
    if (!is_array($data)) continue;
    $userKey = $family . ':' . $user;
    $formula = rawurlencode("{$userField}='{$userKey}'");
    $url = "https://api.airtable.com/v0/{$base}/{$encodedTable}?maxRecords=1&filterByFormula=" . $formula;
    $found = adminSyncRequest('GET', $url, $key);
    if ($found['status'] < 200 || $found['status'] >= 300) appJsonError(502, 'Airtable odrzucił odczyt podczas synchronizacji.');
    $record = $found['body']['records'][0] ?? null;
    $fields = [$userField => $userKey, $dataField => json_encode($data, JSON_UNESCAPED_UNICODE), $updatedField => gmdate('c')];
    if ($record && !empty($record['id'])) $result = adminSyncRequest('PATCH', "https://api.airtable.com/v0/{$base}/{$encodedTable}/{$record['id']}", $key, ['fields' => $fields]);
    else $result = adminSyncRequest('POST', "https://api.airtable.com/v0/{$base}/{$encodedTable}", $key, ['fields' => $fields]);
    if ($result['status'] < 200 || $result['status'] >= 300) appJsonError(502, 'Airtable odrzucił zapis podczas synchronizacji.');
    $records++;
}
echo json_encode(['success' => true, 'family' => $family, 'records' => $records], JSON_UNESCAPED_UNICODE);
