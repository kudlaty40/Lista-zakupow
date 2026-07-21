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

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    appJsonError(405, 'Konfiguracja Airtable jest tylko do odczytu. Zmieniaj ją w zmiennych środowiskowych serwera.');
}

echo json_encode([
    'success' => true,
    'configured' => getenv('AIRTABLE_API_KEY') !== '' && getenv('AIRTABLE_BASE_ID') !== '',
], JSON_UNESCAPED_UNICODE);
