<?php


session_start();
header('Content-Type: application/json');
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../models/product.php';

$db      = (new Database())->connect();
$product = new Product($db);
$action  = $_GET['action'] ?? $_POST['action'] ?? '';



if ($action === 'getAll') {
    echo json_encode(['success' => true, 'data' => $product->getAll()]);
    exit;
}

if ($action === 'getBySection') {
    $section = $_GET['section'] ?? '';
    echo json_encode(['success' => true, 'data' => $product->getBySection($section)]);
    exit;
}

if ($action === 'getById') {
    $id = intval($_GET['id'] ?? 0);
    echo json_encode(['success' => true, 'data' => $product->getById($id)]);
    exit;
}



function requireAdmin() {
    if (!isset($_SESSION['user_id']) || ($_SESSION['role'] ?? '') !== 'admin') {
        echo json_encode(['success' => false, 'message' => 'Akses ditolak. Hanya admin.']);
        exit;
    }
}

if ($action === 'create') {
    requireAdmin();
    $name        = trim($_POST['name'] ?? '');
    $price       = floatval($_POST['price'] ?? 0);
    $old_price   = floatval($_POST['old_price'] ?? 0);
    $emoji       = trim($_POST['emoji'] ?? '📦');
    $badge       = trim($_POST['badge'] ?? '');
    $badge_color = trim($_POST['badge_color'] ?? '');
    $stars       = intval($_POST['stars'] ?? 5);
    $reviews     = intval($_POST['reviews'] ?? 0);
    $section     = trim($_POST['section'] ?? 'explore');

    if (!$name || $price <= 0) {
        echo json_encode(['success' => false, 'message' => 'Nama dan harga wajib diisi']);
        exit;
    }

    $id = $product->create(compact('name','price','old_price','emoji','badge','badge_color','stars','reviews','section'));
    echo json_encode(['success' => true, 'message' => 'Produk berhasil ditambahkan', 'id' => $id]);
    exit;
}

if ($action === 'delete') {
    requireAdmin();
    $id = isset($_POST['id']) ? intval($_POST['id']) : null;
    if ($id === null) {
        echo json_encode(['success' => false, 'message' => 'ID tidak valid']);
        exit;
    }
    $result = $product->delete($id);
    echo json_encode(['success' => $result, 'message' => $result ? 'Produk dihapus' : 'Gagal menghapus']);
    exit;
}


if ($action === 'update') {
    requireAdmin();

    $id          = isset($_POST['id']) ? intval($_POST['id']) : null;
    $name        = trim($_POST['name'] ?? '');
    $price       = floatval($_POST['price'] ?? 0);
    $old_price   = floatval($_POST['old_price'] ?? 0);
    $emoji       = trim($_POST['emoji'] ?? '📦');
    $badge       = trim($_POST['badge'] ?? '');
    $badge_color = trim($_POST['badge_color'] ?? '');
    $stars       = intval($_POST['stars'] ?? 5);
    $reviews     = intval($_POST['reviews'] ?? 0);
    $section     = trim($_POST['section'] ?? 'explore');

    if ($id === null || !$name || $price <= 0) {
        echo json_encode(['success' => false, 'message' => 'ID, nama, dan harga wajib diisi']);
        exit;
    }

    $result = $product->update($id, compact('name','price','old_price','emoji','badge','badge_color','stars','reviews','section'));
    echo json_encode(['success' => $result, 'message' => $result ? 'Produk berhasil diupdate' : 'Gagal mengupdate']);
    exit;
}

echo json_encode(['success' => false, 'message' => 'Action tidak ditemukan']);