<?php
session_start();
header('Content-Type: application/json');
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../models/order.php';
require_once __DIR__ . '/../models/user.php';

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'Belum login']);
    exit;
}

$db       = (new Database())->connect();
$order    = new Order($db);
$userModel= new User($db);
$action   = $_POST['action'] ?? '';


if ($action === 'getUserData') {
    $user = $userModel->getById($_SESSION['user_id']);
    echo json_encode(['success' => true, 'user' => $user]);
    exit;
}


if ($action === 'placeOrder') {
    $kota    = trim($_POST['kota']    ?? '');
    $alamat  = trim($_POST['alamat']  ?? '');
    $payment = trim($_POST['payment'] ?? '');
    $total   = floatval($_POST['total'] ?? 0);
    $items   = $_POST['items'] ?? '[]';

    if (!$kota || !$alamat || !$payment || !$total) {
        echo json_encode(['success' => false, 'message' => 'Semua field wajib diisi']);
        exit;
    }

    $user = $userModel->getById($_SESSION['user_id']);

    $orderId = $order->create([
        'user_id'    => $_SESSION['user_id'],
        'user_name'  => $user['name'],
        'user_email' => $user['email'],
        'kota'       => $kota,
        'alamat'     => $alamat,
        'payment'    => $payment,
        'total'      => $total,
        'items'      => $items
    ]);

    echo json_encode([
        'success'  => true,
        'message'  => 'Order berhasil!',
        'order_id' => $orderId
    ]);
    exit;
}

echo json_encode(['success' => false, 'message' => 'Action tidak ditemukan']);