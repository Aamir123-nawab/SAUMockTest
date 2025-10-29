<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$dataFile = 'view_counts.json';

// Initialize if file doesn't exist
if (!file_exists($dataFile)) {
    file_put_contents($dataFile, json_encode([]));
}

// Read and return data
$data = json_decode(file_get_contents($dataFile), true) ?? [];

echo json_encode([
    'success' => true,
    'views' => $data
]);
?>