<?php
require_once __DIR__ . '/security.php';
header('Content-Type: application/json; charset=utf-8');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }
appRequireSuperAdmin();
$config = appAirtableConfig();
$key = (string) ($config['api_key'] ?? '');
$base = (string) ($config['base_id'] ?? '');
$table = (string) ($config['table_name'] ?? '');
$userField = (string) ($config['user_field'] ?? 'user');
if ($key === '' || $base === '' || $table === '') { echo json_encode(['success'=>true,'connected'=>false,'configured'=>false]); exit; }
$url = 'https://api.airtable.com/v0/' . rawurlencode($base) . '/' . rawurlencode($table) . '?maxRecords=1';
$ch = curl_init($url); curl_setopt_array($ch, [CURLOPT_RETURNTRANSFER=>true, CURLOPT_TIMEOUT=>20, CURLOPT_HTTPHEADER=>['Authorization: Bearer '.$key,'Accept: application/json']]);
$body = curl_exec($ch); $status = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE); $error = curl_error($ch); curl_close($ch);
$connected = $status >= 200 && $status < 300;
$reason = $connected ? '' : ($status === 401 || $status === 403 ? 'Brak dostępu do Airtable.' : ($status === 404 ? 'Nieprawidłowa baza lub tabela.' : ($error ?: 'Airtable nie odpowiada.')));
echo json_encode(['success'=>true,'connected'=>$connected,'configured'=>true,'status'=>$status,'reason'=>$reason], JSON_UNESCAPED_UNICODE);
