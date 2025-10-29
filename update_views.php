<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Simple file-based storage (you can upgrade to database later)
$dataFile = 'view_counts.json';

// Initialize if file doesn't exist
if (!file_exists($dataFile)) {
    file_put_contents($dataFile, json_encode([]));
}

// Get POST data
$test = $_POST['test'] ?? '';
$count = intval($_POST['count'] ?? 0);

if (empty($test)) {
    echo json_encode(['success' => false, 'message' => 'Test name required']);
    exit;
}

// Read existing data
$data = json_decode(file_get_contents($dataFile), true) ?? [];

// Update view count
$data[$test] = $count;

// Save back to file
if (file_put_contents($dataFile, json_encode($data))) {
    echo json_encode(['success' => true, 'message' => 'View count updated']);
} else {
    echo json_encode(['success' => false, 'message' => 'Failed to update view count']);
}
?>