<?php
// Shared, server-side Airtable writer. This file never exposes credentials.

function photoAirtableRequest($method, $url, $apiKey, $body = null) {
    $headers = ['Authorization: Bearer ' . $apiKey, 'Content-Type: application/json'];
    if (function_exists('curl_init')) {
        $ch = curl_init($url);
        curl_setopt_array($ch, [
            CURLOPT_CUSTOMREQUEST => $method,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_HTTPHEADER => $headers,
            CURLOPT_TIMEOUT => 25,
        ]);
        if ($body !== null) curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($body));
        $responseBody = curl_exec($ch);
        $status = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        return ['ok' => $responseBody !== false, 'status' => $status, 'body' => json_decode((string) $responseBody, true)];
    }
    $options = ['http' => ['method' => $method, 'header' => implode("\r\n", $headers), 'timeout' => 25, 'ignore_errors' => true]];
    if ($body !== null) $options['http']['content'] = json_encode($body);
    $responseBody = @file_get_contents($url, false, stream_context_create($options));
    $status = 0;
    if (isset($http_response_header[0]) && preg_match('/\s(\d{3})\s/', $http_response_header[0], $m)) $status = (int) $m[1];
    return ['ok' => $responseBody !== false, 'status' => $status, 'body' => json_decode((string) $responseBody, true)];
}

function photoAirtableConfig() {
    $config = appAirtableConfig();
    return [
        'apiKey' => (string) ($config['api_key'] ?? ''),
        'baseId' => (string) ($config['base_id'] ?? ''),
        'table' => (string) ($config['table_name'] ?? ''),
        'userField' => (string) ($config['user_field'] ?? 'user'),
        'dataField' => (string) ($config['data_field'] ?? 'data'),
    ];
}

function photoAirtableUpsert($userKey, $payload) {
    $config = photoAirtableConfig();
    if ($config['apiKey'] === '' || $config['baseId'] === '' || $config['table'] === '') return false;
    $table = rawurlencode($config['table']);
    $formula = sprintf("{%s}='%s'", $config['userField'], str_replace("'", "\\'", $userKey));
    $url = "https://api.airtable.com/v0/{$config['baseId']}/{$table}?maxRecords=1&filterByFormula=" . rawurlencode($formula);
    $lookup = photoAirtableRequest('GET', $url, $config['apiKey']);
    if (!$lookup['ok'] || $lookup['status'] < 200 || $lookup['status'] >= 300) return false;
    $record = $lookup['body']['records'][0] ?? null;
    $fields = [$config['userField'] => $userKey, $config['dataField'] => json_encode($payload, JSON_UNESCAPED_UNICODE)];
    if (is_array($record) && isset($record['id'])) {
        $url .= '/' . rawurlencode($record['id']);
        $result = photoAirtableRequest('PATCH', $url, $config['apiKey'], ['fields' => $fields]);
    } else {
        $result = photoAirtableRequest('POST', "https://api.airtable.com/v0/{$config['baseId']}/{$table}", $config['apiKey'], ['records' => [['fields' => $fields]]]);
    }
    return $result['ok'] && $result['status'] >= 200 && $result['status'] < 300;
}
