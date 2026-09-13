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
$incoming = isset($data['settings']) ? $data['settings'] : $data;
$targetFile = realpath(__DIR__ . '/..') . '/site-settings.json';

// Read existing settings if available
$existing = [];
if (file_exists($targetFile)) {
    $existingContent = file_get_contents($targetFile);
    if ($existingContent) {
        $decoded = json_decode($existingContent, true);
        if (is_array($decoded)) {
            $existing = $decoded;
        }
    }
}

$merged = array_merge($existing, $incoming);
$merged['updatedAt'] = isset($incoming['updatedAt']) && $incoming['updatedAt'] > 0 
    ? $incoming['updatedAt'] 
    : (int)(microtime(true) * 1000);

$jsonString = json_encode($merged, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);

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
