<?php
require_once __DIR__ . '/security.php';
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit;
}

appRequireLogin();
$nutritionRateKey = (string) ($_SESSION['user'] ?? '') . ':' . appClientIp();
appRequireLoginRateLimit('nutrition', $nutritionRateKey, 'Zbyt wiele zapytań o dane żywieniowe. Spróbuj ponownie za kilka minut.');
appRecordRateLimitAttempt('nutrition', $nutritionRateKey, 30, 900);

$query = trim((string) ($_GET['q'] ?? ''));
if ($query === '' || strlen($query) > 300) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Missing query']);
    exit;
}

function httpJsonGet($url) {
    if (function_exists('curl_init')) {
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_TIMEOUT, 20);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, ['Accept: application/json']);
        $body = curl_exec($ch);
        $status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $ok = $body !== false;
        curl_close($ch);
        if (!$ok || $status < 200 || $status >= 300) {
            return null;
        }
        $decoded = json_decode($body, true);
        return is_array($decoded) ? $decoded : null;
    }

    if (!ini_get('allow_url_fopen')) {
        return null;
    }

    $context = stream_context_create([
        'http' => [
            'method' => 'GET',
            'timeout' => 20,
            'ignore_errors' => true,
            'header' => "Accept: application/json\r\n",
        ],
    ]);

    $body = @file_get_contents($url, false, $context);
    if ($body === false) {
        return null;
    }

    $decoded = json_decode($body, true);
    return is_array($decoded) ? $decoded : null;
}

function firstValue($source, $keys) {
    foreach ($keys as $key) {
        if (isset($source[$key]) && $source[$key] !== '' && $source[$key] !== null) {
            return $source[$key];
        }
    }
    return null;
}

function nutritionHasData($values) {
    foreach ($values as $value) {
        if ($value !== null && $value !== '') return true;
    }
    return false;
}

function nutritionFromOpenFoodFacts($query) {
    $url = 'https://world.openfoodfacts.org/cgi/search.pl?search_terms=' . rawurlencode($query) . '&search_simple=1&action=process&json=1&page_size=1';
    $data = httpJsonGet($url);
    if (!$data || empty($data['products'][0])) {
        return null;
    }

    $product = $data['products'][0];
    $nutriments = $product['nutriments'] ?? [];
    $kcal = firstValue($nutriments, ['energy-kcal_100g', 'energy-kcal_value', 'energy-kcal', 'energy_100g', 'energy_value']);
    $protein = firstValue($nutriments, ['proteins_100g', 'proteins_value', 'proteins']);
    $fat = firstValue($nutriments, ['fat_100g', 'fat_value', 'fat']);
    $carbs = firstValue($nutriments, ['carbohydrates_100g', 'carbohydrates_value', 'carbohydrates']);
    $sugars = firstValue($nutriments, ['sugars_100g', 'sugars_value', 'sugars']);
    $salt = firstValue($nutriments, ['salt_100g', 'salt_value', 'salt']);
    $fiber = firstValue($nutriments, ['fiber_100g', 'fiber_value', 'fiber']);
    $saturatedFat = firstValue($nutriments, ['saturated-fat_100g', 'saturated-fat_value', 'saturated-fat']);
    $nutriScore = strtolower(trim((string) ($product['nutriscore_grade'] ?? ($product['nutriscore'] ?? ''))));
    if (!preg_match('/^[a-e]$/', $nutriScore)) $nutriScore = null;
    $novaGroup = $product['nova_group'] ?? ($product['nova_groups'] ?? null);
    if (!is_int($novaGroup) && !is_float($novaGroup) && !preg_match('/^[1-4]$/', trim((string) $novaGroup))) $novaGroup = null;

    if (!nutritionHasData([$kcal, $protein, $fat, $carbs, $sugars, $salt, $fiber, $saturatedFat, $nutriScore, $novaGroup])) {
        return null;
    }

    return [
        'source' => 'Open Food Facts',
        'productName' => $product['product_name'] ?? ($product['generic_name'] ?? $query),
        'kcal' => $kcal,
        'protein' => $protein,
        'fat' => $fat,
        'carbs' => $carbs,
        'sugars' => $sugars,
        'salt' => $salt,
        'fiber' => $fiber,
        'saturatedFat' => $saturatedFat,
        'nutriScore' => $nutriScore,
        'novaGroup' => $novaGroup,
    ];
}

function nutritionFromOpenFoodRepo($query) {
    $url = 'https://openfoodrepo.org/api/v3/products?label=' . rawurlencode($query) . '&limit=1';
    $data = httpJsonGet($url);
    if (!$data || empty($data['data'][0])) {
        return null;
    }

    $product = $data['data'][0];
    $rawNutrition = $product['nutritional_values'] ?? ($product['nutritional_value'] ?? ($product['nutrients'] ?? ($product['nutritional'] ?? [])));
    $values = [];

    if (is_array($rawNutrition)) {
        if (array_keys($rawNutrition) !== range(0, count($rawNutrition) - 1)) {
            // Some responses return nutrients as an object map instead of an array of entries.
            foreach ($rawNutrition as $key => $value) {
                if (!is_string($key)) {
                    continue;
                }
                $values[strtolower($key)] = $value;
            }
        } else {
            foreach ($rawNutrition as $entry) {
                if (is_array($entry) && isset($entry['name']) && isset($entry['value'])) {
                    $values[strtolower((string) $entry['name'])] = $entry['value'];
                }
            }
        }
    }

    $kcal = firstValue($values, ['energy-kcal_100g', 'energy-kcal_value', 'energy-kcal', 'energy_100g', 'energy_value', 'kcal']);
    $protein = firstValue($values, ['proteins_100g', 'proteins_value', 'proteins', 'protein']);
    $fat = firstValue($values, ['fat_100g', 'fat_value', 'fat']);
    $carbs = firstValue($values, ['carbohydrates_100g', 'carbohydrates_value', 'carbohydrates', 'carbs']);
    $sugars = firstValue($values, ['sugars_100g', 'sugars_value', 'sugars', 'sugar']);
    $salt = firstValue($values, ['salt_100g', 'salt_value', 'salt']);
    $fiber = firstValue($values, ['fiber_100g', 'fiber_value', 'fiber', 'fibre']);
    $saturatedFat = firstValue($values, ['saturated-fat_100g', 'saturated-fat_value', 'saturated-fat', 'saturated_fat']);
    $nutriScore = strtolower(trim((string) ($product['nutriscore_grade'] ?? ($product['nutriscore'] ?? ''))));
    if (!preg_match('/^[a-e]$/', $nutriScore)) $nutriScore = null;
    $novaGroup = $product['nova_group'] ?? ($product['nova_groups'] ?? null);
    if (!is_int($novaGroup) && !is_float($novaGroup) && !preg_match('/^[1-4]$/', trim((string) $novaGroup))) $novaGroup = null;

    if (!nutritionHasData([$kcal, $protein, $fat, $carbs, $sugars, $salt, $fiber, $saturatedFat, $nutriScore, $novaGroup])) {
        return null;
    }

    return [
        'source' => 'Open Food Repo',
        'productName' => $product['name'] ?? $query,
        'kcal' => $kcal,
        'protein' => $protein,
        'fat' => $fat,
        'carbs' => $carbs,
        'sugars' => $sugars,
        'salt' => $salt,
        'fiber' => $fiber,
        'saturatedFat' => $saturatedFat,
        'nutriScore' => $nutriScore,
        'novaGroup' => $novaGroup,
    ];
}

$nutrition = null;
$lookupChain = ['Open Food Facts', 'Open Food Repo'];

foreach ($lookupChain as $sourceName) {
    if ($sourceName === 'Open Food Facts') {
        $nutrition = nutritionFromOpenFoodFacts($query);
    } elseif ($sourceName === 'Open Food Repo') {
        $nutrition = nutritionFromOpenFoodRepo($query);
    }

    if ($nutrition !== null) {
        break;
    }
}

if ($nutrition === null) {
    echo json_encode(['success' => false, 'error' => 'No nutrition data found']);
    exit;
}

echo json_encode(['success' => true, 'nutrition' => $nutrition], JSON_UNESCAPED_UNICODE);
