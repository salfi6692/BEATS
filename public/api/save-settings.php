<?php
/**
 * Bahria Education & Training System (BEATS) - cPanel Settings Saver
 * Persists site settings into public_html/site-settings.json
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Only POST method is allowed']);
    exit();
}

$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true);

if (!$data) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid JSON input']);
    exit();
}

// Extract settings object if wrapped in { settings: ... }
$settings = isset($data['settings']) ? $data['settings'] : $data;
$jsonString = json_encode($settings, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);

$targetFile = realpath(__DIR__ . '/..') . '/site-settings.json';

if (file_put_contents($targetFile, $jsonString) !== false) {
    echo json_encode([
        'success' => true,
        'message' => 'Settings saved successfully to site-settings.json',
        'timestamp' => time()
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Failed to write site-settings.json. Please check permissions.'
    ]);
}
