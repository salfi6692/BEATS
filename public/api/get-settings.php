<?php
/**
 * Bahria Education & Training System (BEATS) - cPanel Settings Provider
 * Returns public_html/site-settings.json
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Cache-Control: no-cache, no-store, must-revalidate');

$targetFile = realpath(__DIR__ . '/..') . '/site-settings.json';

if (file_exists($targetFile)) {
    echo file_get_contents($targetFile);
} else {
    http_response_code(404);
    echo json_encode(['error' => 'Settings not found']);
}
