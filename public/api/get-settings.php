<?php
/**
 * Bahria Education & Training System (BEATS) - cPanel Settings Provider
 * Returns public_html/site-settings.json
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, Accept, X-Requested-With');
header('Cache-Control: no-cache, no-store, must-revalidate');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit();
}

$parentDir = dirname(__DIR__);
$targetFile = $parentDir . '/site-settings.json';

if (file_exists($targetFile)) {
    echo file_get_contents($targetFile);
} else {
    http_response_code(404);
    echo json_encode(['error' => 'Settings file site-settings.json not found']);
}

