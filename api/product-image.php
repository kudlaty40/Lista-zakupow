<?php
require_once __DIR__ . '/security.php';
require_once __DIR__ . '/backup.php';

function imageJsonError($status, $message) {
    header('Content-Type: application/json; charset=utf-8');
    http_response_code($status);
    echo json_encode(['success' => false, 'error' => $message], JSON_UNESCAPED_UNICODE);
    exit;
}

function imageSlug($value) {
    return preg_match('/^[a-zA-Z0-9_-]{8,120}$/', (string) $value) ? (string) $value : '';
}

$family = strtolower(trim((string) ($_GET['family'] ?? $_POST['family'] ?? '')));
$family = preg_replace('/[^a-z0-9._-]+/', '-', $family);
$imageId = imageSlug($_GET['id'] ?? $_POST['id'] ?? '');
if ($family === '' || $imageId === '') imageJsonError(400, 'Nieprawidłowy identyfikator zdjęcia.');
appRequireLogin($family);
$directory = appStorageDir() . '/families/' . $family . '/data/images';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $files = glob($directory . '/' . $imageId . '.*') ?: [];
    if (count($files) !== 1 || !is_file($files[0])) imageJsonError(404, 'Zdjęcie nie istnieje.');
    $mime = function_exists('mime_content_type') ? mime_content_type($files[0]) : 'image/webp';
    if (!is_string($mime) || !str_starts_with($mime, 'image/')) $mime = 'application/octet-stream';
    header('Content-Type: ' . $mime);
    header('Content-Length: ' . filesize($files[0]));
    header('Cache-Control: private, no-store');
    header('X-Content-Type-Options: nosniff');
    readfile($files[0]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') imageJsonError(405, 'Niedozwolona metoda.');
appRequireSameOriginForWrite();
if (!isset($_FILES['image']) || !is_uploaded_file($_FILES['image']['tmp_name'])) imageJsonError(400, 'Nie przesłano zdjęcia.');
if ($_FILES['image']['error'] !== UPLOAD_ERR_OK || $_FILES['image']['size'] > 2 * 1024 * 1024) imageJsonError(400, 'Zdjęcie jest zbyt duże.');
$imageInfo = @getimagesize($_FILES['image']['tmp_name']);
$mime = is_array($imageInfo) ? ($imageInfo['mime'] ?? '') : '';
$extensions = ['image/webp' => 'webp', 'image/jpeg' => 'jpg', 'image/png' => 'png'];
if (!isset($extensions[$mime])) imageJsonError(400, 'Obsługiwane są zdjęcia WebP, JPEG i PNG.');

appBackupBeforeMutation('product-image');
if (!is_dir($directory) && !mkdir($directory, 0700, true) && !is_dir($directory)) imageJsonError(500, 'Nie można przygotować magazynu zdjęć.');
foreach (glob($directory . '/' . $imageId . '.*') ?: [] as $old) @unlink($old);
$target = $directory . '/' . $imageId . '.' . $extensions[$mime];
if (!move_uploaded_file($_FILES['image']['tmp_name'], $target)) imageJsonError(500, 'Nie można zapisać zdjęcia.');
@chmod($target, 0600);
header('Content-Type: application/json; charset=utf-8');
echo json_encode(['success' => true, 'imageId' => $imageId], JSON_UNESCAPED_UNICODE);
