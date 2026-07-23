<?php
require_once __DIR__ . '/security.php';
require_once __DIR__ . '/backup.php';
function resolveStorageDir() {
    return appStorageDir();
}

function normalizeFamilySlug($value) {
    $clean = strtolower(trim((string) $value));
    $clean = preg_replace('/[^a-z0-9._-]+/', '-', $clean);
    $clean = trim($clean, '-');
    return $clean;
}

function normalizeUserSlug($value) {
    $clean = strtolower(trim((string) $value));
    $clean = preg_replace('/[^a-z0-9._-]+/', '_', $clean);
    $clean = trim($clean, '_');
    return $clean;
}

function readJsonFile($path, $default) {
    if (!file_exists($path)) {
        return $default;
    }

    $raw = file_get_contents($path);
    if ($raw === false) {
        return null;
    }

    $decoded = json_decode($raw, true);
    return is_array($decoded) ? $decoded : $default;
}

function writeJsonFile($path, $payload) {
    appBackupBeforeMutation('products');
    return appAtomicWrite($path, json_encode($payload, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
}

function wrapResponse($data, $source, $airtableEnabled, $airtableSynced = false, $family = '') {
    return [
        'success' => true,
        'source' => $source,
        'airtable_enabled' => $airtableEnabled,
        'airtable_synced' => $airtableSynced,
        'family' => $family,
        'revision' => hash('sha256', json_encode($data, JSON_UNESCAPED_UNICODE)),
        'data' => $data,
    ];
}

function jsonError($status, $message) {
    http_response_code($status);
    echo json_encode(['success' => false, 'error' => $message], JSON_UNESCAPED_UNICODE);
    exit;
}

$storageDir = resolveStorageDir();
$method = $_SERVER['REQUEST_METHOD'];
$familySlug = normalizeFamilySlug($_GET['family'] ?? '');
$user = isset($_GET['user']) ? trim((string) $_GET['user']) : '';
$userSlug = normalizeUserSlug($user);
$userKey = $userSlug !== '' ? $userSlug : 'guest';

header('Content-Type: application/json; charset=utf-8');
if ($method === 'OPTIONS') {
    http_response_code(204);
    exit;
}

function sendPayloadResponse($data, $source, $airtableEnabled, $airtableSynced, $family) {
    $response = wrapResponse($data, $source, $airtableEnabled, $airtableSynced, $family);
    $revision = $response['revision'];
    $etag = '"' . $revision . '"';
    header('Cache-Control: private, no-cache, must-revalidate');
    header('ETag: ' . $etag);
    header('Vary: Cookie');
    header('X-App-Items: ' . count(extractItemsFromPayload($data)));
    header('X-App-Payload-Bytes: ' . strlen(json_encode($data, JSON_UNESCAPED_UNICODE)));
    $ifNoneMatch = trim((string) ($_SERVER['HTTP_IF_NONE_MATCH'] ?? ''));
    if ($ifNoneMatch !== '' && hash_equals($etag, $ifNoneMatch)) {
        http_response_code(304);
        exit;
    }
    echo json_encode($response, JSON_UNESCAPED_UNICODE);
    exit;
}
appRequireSameOriginForWrite();

if ($familySlug === '') {
    jsonError(400, 'Wybierz rodzinę.');
}

$familiesIndexFile = $storageDir . '/families/families.json';
$familiesIndex = readJsonFile($familiesIndexFile, ['families' => []]);
if (!is_array($familiesIndex) || !isset($familiesIndex['families']) || !is_array($familiesIndex['families'])) {
    $familiesIndex = ['families' => []];
}

$familyExists = false;
foreach ($familiesIndex['families'] as $family) {
    if (($family['slug'] ?? '') === $familySlug) {
        $familyExists = true;
        break;
    }
}
if (!$familyExists) {
    jsonError(404, 'Nie znaleziono wybranej rodziny.');
}

appRequireLogin($familySlug);
if ($userKey !== 'shared') {
    $user = (string) $_SESSION['user'];
    $userSlug = normalizeUserSlug($user);
    $userKey = $userSlug !== '' ? $userSlug : 'guest';
}

$familyDir = $storageDir . '/families/' . $familySlug;
$dataDir = $familyDir . '/data';
if (!is_dir($dataDir) && !@mkdir($dataDir, 0777, true)) {
    jsonError(500, 'Nie udało się przygotować katalogu danych rodziny.');
}

$storageFile = $dataDir . '/' . $userKey . '.json';

$airtableApiKey = (string) (getenv('AIRTABLE_API_KEY') ?: '');
$airtableBaseId = (string) (getenv('AIRTABLE_BASE_ID') ?: '');
$airtableTableName = (string) (getenv('AIRTABLE_TABLE_NAME') ?: 'shopping_list');
$airtableUserField = (string) (getenv('AIRTABLE_USER_FIELD') ?: 'user');
$airtableDataField = (string) (getenv('AIRTABLE_DATA_FIELD') ?: 'data');
$airtableUpdatedAtField = (string) (getenv('AIRTABLE_UPDATED_FIELD') ?: 'updated_at');

function isAirtableConfigured($apiKey, $baseId, $tableName) {
    return $apiKey !== '' && $baseId !== '' && $tableName !== '';
}

function airtableRequest($method, $url, $apiKey, $body = null) {
    $headers = [
        'Authorization: Bearer ' . $apiKey,
        'Content-Type: application/json',
    ];

    if (function_exists('curl_init')) {
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_TIMEOUT, 25);
        if ($body !== null) {
            curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($body));
        }
        $responseBody = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $ok = $responseBody !== false;
        curl_close($ch);
        if (!$ok) {
            return ['ok' => false, 'status' => 0, 'body' => null];
        }
        $decoded = json_decode($responseBody, true);
        return ['ok' => true, 'status' => $httpCode, 'body' => $decoded];
    }

    $contextOptions = [
        'http' => [
            'method' => $method,
            'header' => implode("\r\n", $headers),
            'timeout' => 25,
            'ignore_errors' => true,
        ],
    ];
    if ($body !== null) {
        $contextOptions['http']['content'] = json_encode($body);
    }

    $context = stream_context_create($contextOptions);
    $responseBody = @file_get_contents($url, false, $context);
    if ($responseBody === false) {
        return ['ok' => false, 'status' => 0, 'body' => null];
    }

    $status = 0;
    if (isset($http_response_header) && is_array($http_response_header) && isset($http_response_header[0])) {
        if (preg_match('/\s(\d{3})\s/', $http_response_header[0], $matches)) {
            $status = (int) $matches[1];
        }
    }

    $decoded = json_decode($responseBody, true);
    return ['ok' => true, 'status' => $status, 'body' => $decoded];
}

function getAirtableRecordByUser($userKey, $apiKey, $baseId, $tableName, $userField) {
    $encodedTable = rawurlencode($tableName);
    $formula = sprintf("{%s}='%s'", $userField, str_replace("'", "\\'", $userKey));
    $url = "https://api.airtable.com/v0/{$baseId}/{$encodedTable}?maxRecords=1&filterByFormula=" . rawurlencode($formula);
    $response = airtableRequest('GET', $url, $apiKey);
    if (!$response['ok'] || $response['status'] < 200 || $response['status'] >= 300) {
        return null;
    }
    $records = $response['body']['records'] ?? [];
    return count($records) > 0 ? $records[0] : [];
}

function getAirtableChunkRecords($userKey, $apiKey, $baseId, $tableName, $userField) {
    $encodedTable = rawurlencode($tableName);
    $prefix = str_replace("'", "\\'", $userKey . ':chunk:');
    $url = "https://api.airtable.com/v0/{$baseId}/{$encodedTable}?pageSize=100&filterByFormula=" . rawurlencode("FIND('{$prefix}', {{$userField}})=1");
    $records = [];

    do {
        $response = airtableRequest('GET', $url, $apiKey);
        if (!$response['ok'] || $response['status'] < 200 || $response['status'] >= 300) {
            return null;
        }
        $records = array_merge($records, $response['body']['records'] ?? []);
        $offset = $response['body']['offset'] ?? '';
        $url = $offset === '' ? '' : "https://api.airtable.com/v0/{$baseId}/{$encodedTable}?pageSize=100&filterByFormula=" . rawurlencode("FIND('{$prefix}', {{$userField}})=1") . '&offset=' . rawurlencode($offset);
    } while ($url !== '');

    usort($records, fn($a, $b) => strcmp((string) ($a['fields'][$userField] ?? ''), (string) ($b['fields'][$userField] ?? '')));
    return $records;
}

function upsertAirtableData($userKey, $data, $apiKey, $baseId, $tableName, $userField, $dataField, $updatedAtField) {
    $record = getAirtableRecordByUser($userKey, $apiKey, $baseId, $tableName, $userField);
    if ($record === null) {
        return false;
    }

    $fields = [
        $userField => $userKey,
        $dataField => json_encode($data, JSON_UNESCAPED_UNICODE),
        // The current Airtable field is a date-only field. Do not send a value
        // here; this avoids rejecting otherwise valid writes when its type changes.
    ];

    $encodedTable = rawurlencode($tableName);
    if (!empty($record) && isset($record['id'])) {
        $recordId = rawurlencode($record['id']);
        $url = "https://api.airtable.com/v0/{$baseId}/{$encodedTable}/{$recordId}";
        $response = airtableRequest('PATCH', $url, $apiKey, ['fields' => $fields]);
        return $response['ok'] && $response['status'] >= 200 && $response['status'] < 300;
    }

    $url = "https://api.airtable.com/v0/{$baseId}/{$encodedTable}";
    $payload = ['records' => [['fields' => $fields]]];
    $response = airtableRequest('POST', $url, $apiKey, $payload);
    return $response['ok'] && $response['status'] >= 200 && $response['status'] < 300;
}

function readAirtableData($userKey, $apiKey, $baseId, $tableName, $userField, $dataField) {
    $record = getAirtableRecordByUser($userKey, $apiKey, $baseId, $tableName, $userField);
    if ($record === null) {
        return null;
    }
    if (empty($record)) {
        return [];
    }

    $payload = $record['fields'][$dataField] ?? null;
    if (!is_string($payload) || $payload === '') {
        return [];
    }

    $decoded = json_decode($payload, true);
    if (is_array($decoded) && ($decoded['storage'] ?? '') === 'chunked-v1') {
        $parts = (int) ($decoded['parts'] ?? 0);
        if ($parts < 1 || $parts > 1000) {
            return null;
        }
        $chunks = getAirtableChunkRecords($userKey, $apiKey, $baseId, $tableName, $userField);
        if ($chunks === null || count($chunks) !== $parts) {
            return null;
        }
        $payload = implode('', array_map(fn($chunk) => (string) ($chunk['fields'][$dataField] ?? ''), $chunks));
        $decoded = json_decode($payload, true);
    }
    return is_array($decoded) ? $decoded : [];
}

function extractItemsFromPayload($payload) {
    if (is_array($payload) && array_key_exists('items', $payload)) {
        return is_array($payload['items']) ? $payload['items'] : [];
    }
    if (is_array($payload) && array_key_exists('data', $payload) && is_array($payload['data'])) {
        return $payload['data'];
    }
    return is_array($payload) ? $payload : [];
}

function extractDiaryFromPayload($payload) {
    if (is_array($payload) && array_key_exists('diaryEntries', $payload)) {
        return is_array($payload['diaryEntries']) ? $payload['diaryEntries'] : [];
    }
    if (is_array($payload) && array_key_exists('data', $payload) && is_array($payload['data'])) {
        return $payload['data'];
    }
    return [];
}

function normalizeOperationTimestamp($value) {
    $timestamp = strtotime((string) $value);
    return $timestamp === false ? 0 : $timestamp;
}

function applySharedOperations($payload, $operations) {
    $payload = is_array($payload) ? $payload : [];
    $payload['items'] = is_array($payload['items'] ?? null) ? array_values($payload['items']) : [];
    $payload['settings'] = is_array($payload['settings'] ?? null) ? $payload['settings'] : [];
    $meta = is_array($payload['_offlineSync'] ?? null) ? $payload['_offlineSync'] : [];
    $tombstones = is_array($meta['tombstones'] ?? null) ? $meta['tombstones'] : [];
    $applied = is_array($meta['applied'] ?? null) ? $meta['applied'] : [];
    $itemsById = [];
    foreach ($payload['items'] as $item) {
        if (is_array($item) && isset($item['id'])) {
            $itemsById[(string) $item['id']] = $item;
        }
    }

    foreach ($operations as $operation) {
        if (!is_array($operation)) continue;
        $operationId = substr((string) ($operation['id'] ?? ''), 0, 100);
        if ($operationId === '' || isset($applied[$operationId])) continue;
        $type = (string) ($operation['type'] ?? '');
        $updatedAt = normalizeOperationTimestamp($operation['updatedAt'] ?? '');
        if ($updatedAt <= 0) continue;

        if ($type === 'upsert-item' && is_array($operation['item'] ?? null)) {
            $item = $operation['item'];
            $itemId = substr((string) ($item['id'] ?? ''), 0, 100);
            if ($itemId !== '') {
                $existingAt = normalizeOperationTimestamp($itemsById[$itemId]['_offlineUpdatedAt'] ?? '');
                $deletedAt = normalizeOperationTimestamp($tombstones[$itemId] ?? '');
                if ($updatedAt >= $existingAt && $updatedAt > $deletedAt) {
                    $item['_offlineUpdatedAt'] = (string) $operation['updatedAt'];
                    $itemsById[$itemId] = $item;
                    unset($tombstones[$itemId]);
                }
            }
        } elseif ($type === 'delete-item') {
            $itemId = substr((string) ($operation['itemId'] ?? ''), 0, 100);
            if ($itemId !== '') {
                $existingAt = normalizeOperationTimestamp($itemsById[$itemId]['_offlineUpdatedAt'] ?? '');
                $deletedAt = normalizeOperationTimestamp($tombstones[$itemId] ?? '');
                if ($updatedAt >= $existingAt && $updatedAt >= $deletedAt) {
                    unset($itemsById[$itemId]);
                    $tombstones[$itemId] = (string) $operation['updatedAt'];
                }
            }
        } elseif ($type === 'replace-settings' && is_array($operation['settings'] ?? null)) {
            $settingsAt = normalizeOperationTimestamp($meta['settingsUpdatedAt'] ?? '');
            if ($updatedAt >= $settingsAt) {
                $payload['settings'] = $operation['settings'];
                $meta['settingsUpdatedAt'] = (string) $operation['updatedAt'];
            }
        }
        $applied[$operationId] = (string) $operation['updatedAt'];
    }

    arsort($tombstones);
    arsort($applied);
    $meta['tombstones'] = array_slice($tombstones, 0, 500, true);
    $meta['applied'] = array_slice($applied, 0, 1000, true);
    $payload['_offlineSync'] = $meta;
    $payload['items'] = array_values($itemsById);
    return $payload;
}

// Airtable is a global integration managed by the superadmin. Family users
// always use the local family-scoped store; the superadmin sync endpoint is
// responsible for sending all families to Airtable.
$airtableEnabled = !empty($_SESSION['super_admin'])
    && isAirtableConfigured($airtableApiKey, $airtableBaseId, $airtableTableName);
$shouldSync = isset($_GET['sync']) && (string) $_GET['sync'] === '1';
$airtableUserKey = $familySlug . ':' . $userKey;

if ($method === 'POST' && ($_GET['action'] ?? '') === 'operations') {
    if ($userKey !== 'shared') {
        jsonError(400, 'Kolejka operacji jest dostępna wyłącznie dla wspólnej listy.');
    }
    $input = file_get_contents('php://input');
    $requestData = $input === false ? null : json_decode($input, true);
    $operations = is_array($requestData['operations'] ?? null) ? $requestData['operations'] : [];
    $baseRevision = (string) ($requestData['baseRevision'] ?? '');
    if ($baseRevision === '' || count($operations) === 0 || count($operations) > 500) {
        jsonError(400, 'Nieprawidłowa kolejka synchronizacji. Odśwież listę i spróbuj ponownie.');
    }

    $lockHandle = @fopen($dataDir . '/.shared-sync.lock', 'c');
    if (!$lockHandle || !flock($lockHandle, LOCK_EX)) {
        jsonError(503, 'Nie można teraz zsynchronizować listy. Spróbuj ponownie.');
    }
    try {
        // The local, atomically-written mirror is the fast source of truth for
        // application reads and offline-operation merges. Airtable is a synced
        // replica and must never put the interactive path behind a remote read.
        $currentPayload = readJsonFile($storageFile, []);
        if (!is_array($currentPayload)) {
            $currentPayload = [];
        }
        if (empty($currentPayload) && is_array($requestData['fallback'] ?? null)) {
            $currentPayload = $requestData['fallback'];
        }

        $mergedPayload = applySharedOperations($currentPayload, $operations);
        if (writeJsonFile($storageFile, $mergedPayload) === false) {
            jsonError(500, 'Nie udało się zapisać lokalnej kopii listy.');
        }
        $airtableSynced = !$airtableEnabled || upsertAirtableData(
            $airtableUserKey, $mergedPayload, $airtableApiKey, $airtableBaseId, $airtableTableName,
            $airtableUserField, $airtableDataField, $airtableUpdatedAtField
        );
        if (!$airtableSynced) {
            jsonError(503, 'Nie udało się zapisać zmian w Airtable.');
        }
        sendPayloadResponse($mergedPayload, 'local', $airtableEnabled, $airtableSynced, $familySlug);
    } finally {
        flock($lockHandle, LOCK_UN);
        fclose($lockHandle);
    }
}

if ($method === 'GET') {
    if (file_exists($storageFile)) {
        $localData = readJsonFile($storageFile, []);
        if ($localData === null) {
            jsonError(500, 'Cannot read storage file');
        }
        sendPayloadResponse($localData, 'local', $airtableEnabled, false, $familySlug);
    }
    sendPayloadResponse([], 'local', $airtableEnabled, false, $familySlug);
}

if ($method === 'POST') {
    $input = file_get_contents('php://input');
    if ($input === false) {
        jsonError(400, 'No request body');
    }

    $data = json_decode($input, true);
    if (!is_array($data)) {
        jsonError(400, 'Invalid JSON');
    }

    if ($userKey === 'shared' && array_key_exists('items', $data) && is_array($data['items']) && count($data['items']) === 0) {
        $existingSharedPayload = readJsonFile($storageFile, []);
        if (is_array($existingSharedPayload) && count(extractItemsFromPayload($existingSharedPayload)) > 0) {
            jsonError(409, 'Odrzucono pusty zapis wspólnej listy. Odśwież aplikację i spróbuj ponownie.');
        }
    }

    $syncPayload = $data;
    if (array_key_exists('items', $data) || array_key_exists('settings', $data)) {
        $syncPayload = $data;
    }

    $localPayload = $syncPayload;
    if (array_key_exists('diaryEntries', $data) || array_key_exists('data', $data)) {
        $localPayload = $data;
    }

    $localSaved = writeJsonFile($storageFile, $localPayload);
    if ($localSaved === false) {
        jsonError(500, 'Failed to save local backup');
    }

    $airtableSynced = false;
    if ($airtableEnabled && $shouldSync) {
        if ($userKey === 'shared') {
            $syncPayload = [
                'items' => extractItemsFromPayload($data),
                'settings' => is_array($data['settings'] ?? null) ? $data['settings'] : ($data['settings'] ?? []),
            ];
        } else {
            $syncPayload = [
                'diaryEntries' => extractDiaryFromPayload($data),
            ];
        }

        $airtableSynced = upsertAirtableData(
            $airtableUserKey,
            $syncPayload,
            $airtableApiKey,
            $airtableBaseId,
            $airtableTableName,
            $airtableUserField,
            $airtableDataField,
            $airtableUpdatedAtField
        );
    }

    echo json_encode([
        'success' => true,
        'source' => 'local',
        'airtable_enabled' => $airtableEnabled,
        'airtable_synced' => $airtableSynced,
        'family' => $familySlug,
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

http_response_code(405);
echo json_encode(['error' => 'Method not allowed']);
