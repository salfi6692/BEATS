<?php
/**
 * Bahria Education & Training System (BEATS) - cPanel Media Uploader Handler
 * Handles uploading and writing WebP images directly into public_html/media/
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, Accept, X-Requested-With');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Only POST method is allowed']);
    exit();
}

$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true);

if (!$data || (empty($data['base64']) && empty($data['dataUrl']))) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Missing base64 image data']);
    exit();
}

$mediaDir = realpath(__DIR__ . '/../media');
if (!$mediaDir) {
    $mediaDir = __DIR__ . '/../media';
    if (!file_exists($mediaDir)) {
        mkdir($mediaDir, 0755, true);
    }
}

// Extract and sanitize filename
$filename = isset($data['filename']) ? trim($data['filename']) : ('media_' . time() . '.png');
$filename = preg_replace('/[^a-zA-Z0-9_\-\.]/', '_', $filename);
if (!preg_match('/\.(webp|png|jpg|jpeg|gif|svg|ico|pdf|doc|docx)$/i', $filename)) {
    $filename = preg_replace('/\.[^.]+$/', '', $filename) . '.png';
}

$base64 = !empty($data['base64']) ? $data['base64'] : $data['dataUrl'];
if (strpos($base64, ',') !== false) {
    $parts = explode(',', $base64);
    $base64 = $parts[1];
}

$binary = base64_decode($base64);
if ($binary === false) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Failed to decode base64 binary']);
    exit();
}

$targetPath = $mediaDir . '/' . $filename;
if (file_put_contents($targetPath, $binary) !== false) {
    echo json_encode([
        'success' => true,
        'url' => '/media/' . $filename,
        'filename' => $filename,
        'size' => strlen($binary)
    ]);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Failed to write file to public_html/media directory. Check folder permissions.']);
}
