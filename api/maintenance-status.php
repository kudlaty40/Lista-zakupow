<?php
define('APP_MAINTENANCE_STATUS_ENDPOINT', true);
require_once __DIR__ . '/security.php';

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, private');

echo json_encode([
    'success' => true,
    'maintenance' => appIsMaintenanceMode(),
], JSON_UNESCAPED_UNICODE);
