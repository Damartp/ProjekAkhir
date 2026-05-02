<?php
header('Content-Type: application/json');
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../models/Product.php';

$db      = (new Database())->connect();
$product = new Product($db);
$action  = $_GET['action'] ?? '';

if ($action === 'getAll') {
    $data = $product->getAll();
    echo json_encode(['success' => true, 'data' => $data]);
    exit;
}

if ($action === 'getBySection') {
    $section = $_GET['section'] ?? '';
    $data    = $product->getBySection($section);
    echo json_encode(['success' => true, 'data' => $data]);
    exit;
}

if ($action === 'getById') {
    $id   = $_GET['id'] ?? 0;
    $data = $product->getById($id);
    echo json_encode(['success' => true, 'data' => $data]);
    exit;
}

echo json_encode(['success' => false, 'message' => 'Action tidak ditemukan']);