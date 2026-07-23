<?php
require_once __DIR__ . '/security.php';
require_once __DIR__ . '/backup.php';
require_once __DIR__ . '/airtable-client.php';

function imageJsonError($status, $message) {
    header('Content-Type: application/json; charset=utf-8');
    http_response_code($status);
    echo json_encode(['success' => false, 'error' => $message], JSON_UNESCAPED_UNICODE);
    exit;
}

function imageSlug($value) {
    return preg_match('/^[a-zA-Z0-9_-]{8,120}$/', (string) $value) ? (string) $value : '';
}

function linkImageInSharedProduct($family, $productId, $product, $imageId) {
    $dataDir = appStorageDir() . '/families/' . $family . '/data';
    $sharedFile = $dataDir . '/shared.json';
    $payload = is_file($sharedFile) ? json_decode((string) file_get_contents($sharedFile), true) : [];
    if (!is_array($payload)) $payload = [];
    if (array_is_list($payload)) $payload = ['items' => $payload, 'settings' => []];
    $items = is_array($payload['items'] ?? null) ? array_values($payload['items']) : [];
    $safeProduct = is_array($product) ? $product : [];
    $safeProduct['id'] = $productId;
    $safeProduct['image'] = null;
    $safeProduct['imageId'] = $imageId;
    $safeProduct['imageStatus'] = 'pending';
    $safeProduct['photoOperationId'] = substr((string) ($_POST['photoOperationId'] ?? ''), 0, 120);
    $found = false;
    foreach ($items as $index => $entry) {
        if (is_array($entry) && (string) ($entry['id'] ?? '') === $productId) {
            $items[$index] = array_merge($entry, $safeProduct);
            $found = true;
            break;
        }
    }
    if (!$found) $items[] = $safeProduct;
    $payload['items'] = $items;
    $lock = @fopen($dataDir . '/.shared-sync.lock', 'c');
    if (!$lock || !flock($lock, LOCK_EX)) imageJsonError(503, 'Nie można teraz zapisać właściwości zdjęcia.');
    $contents = json_encode($payload, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    $written = appAtomicWrite($sharedFile, $contents === false ? '' : $contents);
    flock($lock, LOCK_UN);
    fclose($lock);
    if (!$written || $contents === false) imageJsonError(500, 'Nie można zapisać zdjęcia przy produkcie.');
    return hash('sha256', json_encode($payload, JSON_UNESCAPED_UNICODE));
}

function linkImageInSharedProductLatest($family, $productId, $product, $imageId) {
    $dataDir = appStorageDir() . '/families/' . $family . '/data';
    $sharedFile = $dataDir . '/shared.json';
    $lock = @fopen($dataDir . '/.shared-sync.lock', 'c');
    if (!$lock || !flock($lock, LOCK_EX)) {
        if (is_resource($lock)) fclose($lock);
        throw new RuntimeException('image-lock');
    }
    $payload = is_file($sharedFile) ? json_decode((string) file_get_contents($sharedFile), true) : [];
    if (!is_array($payload)) $payload = [];
    $isList = $payload === [] || array_keys($payload) === range(0, count($payload) - 1);
    if ($isList) $payload = ['items' => $payload, 'settings' => []];
    $previousPayload = json_decode(json_encode($payload), true);
    $items = is_array($payload['items'] ?? null) ? array_values($payload['items']) : [];
    $safeProduct = is_array($product) ? $product : [];
    $safeProduct['id'] = $productId;
    $safeProduct['image'] = null;
    $safeProduct['imageId'] = $imageId;
    $now = microtime(true);
    $safeProduct['imageUpdatedAt'] = gmdate('Y-m-d\\TH:i:s', (int) $now)
        . '.' . str_pad((string) ((int) (($now - floor($now)) * 1000000)), 6, '0', STR_PAD_LEFT) . 'Z';
    $previousImageId = '';
    $found = false;
    foreach ($items as $index => $entry) {
        if (is_array($entry) && (string) ($entry['id'] ?? '') === $productId) {
            $previousImageId = imageSlug($entry['imageId'] ?? '');
            $items[$index] = array_merge($entry, $safeProduct);
            $found = true;
            break;
        }
    }
    if (!$found) $items[] = $safeProduct;
    $payload['items'] = $items;
    $pendingContents = json_encode($payload, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    $written = $pendingContents !== false && appAtomicWrite($sharedFile, $pendingContents);
    if (!$written) throw new RuntimeException('image-write');
    foreach ($payload['items'] as $index => $entry) {
        if (is_array($entry) && (string) ($entry['id'] ?? '') === $productId) {
            $payload['items'][$index]['imageStatus'] = 'ready';
            break;
        }
    }
    $airtableSaved = photoAirtableUpsert($family . ':shared', $payload);
    $readyContents = json_encode($payload, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    if (!$airtableSaved || $readyContents === false || !appAtomicWrite($sharedFile, $readyContents)) {
        appAtomicWrite($sharedFile, json_encode($previousPayload, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
        flock($lock, LOCK_UN);
        fclose($lock);
        return ['status' => 'pending_retry', 'revision' => '', 'imageUpdatedAt' => $safeProduct['imageUpdatedAt'], 'replacedImageId' => ''];
    }
    flock($lock, LOCK_UN);
    fclose($lock);
    if ($previousImageId !== '' && $previousImageId !== $imageId) {
        foreach (glob($dataDir . '/images/' . $previousImageId . '.*') ?: [] as $oldFile) {
            if (is_file($oldFile)) @unlink($oldFile);
        }
    }
    return [
        'status' => 'completed',
        'revision' => hash('sha256', json_encode($payload, JSON_UNESCAPED_UNICODE)),
        'imageUpdatedAt' => $safeProduct['imageUpdatedAt'],
        'replacedImageId' => $previousImageId !== $imageId ? $previousImageId : '',
    ];
}

function linkUploadedImageLatestOrError($family, $productId, $product, $imageId, $target) {
    try {
        return linkImageInSharedProductLatest($family, $productId, $product, $imageId);
    } catch (Throwable $error) {
        @unlink($target);
        imageJsonError(500, 'Nie moĹĽna zapisaÄ‡ zdjÄ™cia przy produkcie.');
    }
}

function unlinkImageFromSharedProduct($family, $productId, $expectedImageId) {
    $dataDir = appStorageDir() . '/families/' . $family . '/data';
    $sharedFile = $dataDir . '/shared.json';
    $lock = @fopen($dataDir . '/.shared-sync.lock', 'c');
    if (!$lock || !flock($lock, LOCK_EX)) {
        if (is_resource($lock)) fclose($lock);
        throw new RuntimeException('image-lock');
    }
    $payload = is_file($sharedFile) ? json_decode((string) file_get_contents($sharedFile), true) : [];
    if (!is_array($payload)) $payload = [];
    $isList = $payload === [] || array_keys($payload) === range(0, count($payload) - 1);
    if ($isList) $payload = ['items' => $payload, 'settings' => []];
    $previousPayload = json_decode(json_encode($payload), true);
    $items = is_array($payload['items'] ?? null) ? array_values($payload['items']) : [];
    $removed = false;
    $currentImageId = '';
    foreach ($items as $index => $entry) {
        if (is_array($entry) && (string) ($entry['id'] ?? '') === $productId) {
            $currentImageId = imageSlug($entry['imageId'] ?? '');
            if ($currentImageId !== $expectedImageId) break;
            $items[$index]['imageId'] = null;
            $items[$index]['imageStatus'] = 'deleted';
            $items[$index]['imageUpdatedAt'] = gmdate('c');
            unset($items[$index]['photoOperationId']);
            $removed = true;
            break;
        }
    }
    if (!$removed) {
        flock($lock, LOCK_UN);
        fclose($lock);
        return ['status' => 'completed', 'removed' => false, 'currentImageId' => $currentImageId];
    }
    $payload['items'] = $items;
    $contents = json_encode($payload, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    $written = $contents !== false && appAtomicWrite($sharedFile, $contents);
    if (!$written) throw new RuntimeException('image-write');
    if (!photoAirtableUpsert($family . ':shared', $payload)) {
        appAtomicWrite($sharedFile, json_encode($previousPayload, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
        flock($lock, LOCK_UN);
        fclose($lock);
        return ['status' => 'pending_retry', 'removed' => false, 'currentImageId' => $expectedImageId];
    }
    flock($lock, LOCK_UN);
    fclose($lock);
    foreach (glob($dataDir . '/images/' . $expectedImageId . '.*') ?: [] as $oldFile) {
        if (is_file($oldFile)) @unlink($oldFile);
    }
    return ['status' => 'completed', 'removed' => true, 'currentImageId' => ''];
}

function unlinkImageFromSharedProductOrError($family, $productId, $imageId) {
    try {
        return unlinkImageFromSharedProduct($family, $productId, $imageId);
    } catch (Throwable $error) {
        imageJsonError(500, 'Nie można usunąć zdjęcia przy produkcie.');
    }
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
if (($_POST['action'] ?? '') === 'delete-link') {
    $productId = substr(trim((string) ($_POST['productId'] ?? '')), 0, 100);
    $expectedImageId = imageSlug($_POST['id'] ?? '');
    if ($productId === '' || $expectedImageId === '') imageJsonError(400, 'Brak poprawnych danych zdjęcia.');
    appBackupBeforeMutation('product-image-delete-link');
    $result = unlinkImageFromSharedProductOrError($family, $productId, $expectedImageId);
    echo json_encode(['success' => true, 'imageId' => $expectedImageId] + $result, JSON_UNESCAPED_UNICODE);
    exit;
}
if (($_POST['action'] ?? '') === 'delete') {
    appBackupBeforeMutation('product-image-delete');
    $existing = glob($directory . '/' . $imageId . '.*') ?: [];
    foreach ($existing as $old) {
        if (is_file($old)) @unlink($old);
    }
    echo json_encode(['success' => true, 'imageId' => $imageId], JSON_UNESCAPED_UNICODE);
    exit;
}
if (!isset($_FILES['image']) || !is_uploaded_file($_FILES['image']['tmp_name'])) imageJsonError(400, 'Nie przesłano zdjęcia.');
if ($_FILES['image']['error'] !== UPLOAD_ERR_OK || $_FILES['image']['size'] > 2 * 1024 * 1024) imageJsonError(400, 'Zdjęcie jest zbyt duże.');
$imageInfo = @getimagesize($_FILES['image']['tmp_name']);
$mime = is_array($imageInfo) ? ($imageInfo['mime'] ?? '') : '';
$extensions = ['image/webp' => 'webp', 'image/jpeg' => 'jpg', 'image/png' => 'png'];
if (!isset($extensions[$mime])) imageJsonError(400, 'Obsługiwane są zdjęcia WebP, JPEG i PNG.');
appBackupBeforeMutation('product-image');
if (!is_dir($directory) && !mkdir($directory, 0700, true) && !is_dir($directory)) imageJsonError(500, 'Nie można przygotować magazynu zdjęć.');
$existing = glob($directory . '/' . $imageId . '.*') ?: [];
$existingBytes = array_sum(array_map('filesize', array_filter($existing, 'is_file')));
$allImages = glob($directory . '/*.*') ?: [];
$totalBytes = array_sum(array_map('filesize', array_filter($allImages, 'is_file')));
if (count($allImages) - count($existing) >= 100 || $totalBytes - $existingBytes + $_FILES['image']['size'] > 50 * 1024 * 1024) {
    imageJsonError(413, 'Osiągnięto limit zdjęć lub ich łącznego rozmiaru.');
}

// Some private PHP hosting plans do not expose GD/WebP. The upload has
// already passed MIME and size validation, so retain the original validated
// JPEG/PNG instead of silently losing the product photo.
if (!function_exists('imagewebp')) {
    $target = $directory . '/' . $imageId . '.' . $extensions[$mime];
    $temporary = $directory . '/.' . bin2hex(random_bytes(12)) . '.' . $extensions[$mime];
    if (!move_uploaded_file($_FILES['image']['tmp_name'], $temporary) || !rename($temporary, $target)) {
        @unlink($temporary);
        imageJsonError(500, 'Nie można zapisać zdjęcia na serwerze.');
    }
    $linkResult = null;
    if (($_POST['action'] ?? '') === 'upload-link') {
        $productId = substr(trim((string) ($_POST['productId'] ?? '')), 0, 100);
        $product = json_decode((string) ($_POST['product'] ?? ''), true);
        if ($productId === '' || !is_array($product)) imageJsonError(400, 'Brak poprawnych danych produktu.');
        $linkResult = linkUploadedImageLatestOrError($family, $productId, $product, $imageId, $target);
    }
    @chmod($target, 0600);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode(['success' => true, 'imageId' => $imageId] + ($linkResult ?: []), JSON_UNESCAPED_UNICODE);
    exit;
}

$source = match ($mime) {
    'image/jpeg' => @imagecreatefromjpeg($_FILES['image']['tmp_name']),
    'image/png' => @imagecreatefrompng($_FILES['image']['tmp_name']),
    default => @imagecreatefromwebp($_FILES['image']['tmp_name']),
};
if (!$source) imageJsonError(400, 'Nie można bezpiecznie przetworzyć zdjęcia.');
$temporary = $directory . '/.' . bin2hex(random_bytes(12)) . '.webp';
if (!imagewebp($source, $temporary, 85)) {
    imagedestroy($source);
    imageJsonError(500, 'Nie można zapisać zdjęcia.');
}
imagedestroy($source);
$target = $directory . '/' . $imageId . '.webp';
if (!rename($temporary, $target)) {
    @unlink($temporary);
    imageJsonError(500, 'Nie można zapisać zdjęcia.');
}
if (($_POST['action'] ?? '') === 'upload-link') {
    $productId = substr(trim((string) ($_POST['productId'] ?? '')), 0, 100);
    $product = json_decode((string) ($_POST['product'] ?? ''), true);
    if ($productId === '' || !is_array($product)) imageJsonError(400, 'Brak poprawnych danych produktu.');
    $linkResult = linkUploadedImageLatestOrError($family, $productId, $product, $imageId, $target);
} else {
    $linkResult = null;
}
@chmod($target, 0600);
header('Content-Type: application/json; charset=utf-8');
echo json_encode(['success' => true, 'imageId' => $imageId] + ($linkResult ?: []), JSON_UNESCAPED_UNICODE);
