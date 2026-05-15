<?php
session_start();
header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'Unauthorized']);
    exit;
}

require_once __DIR__ . '/../config/database.php';
$pdo = (new Database())->connect();

$action = $_POST['action'] ?? $_GET['action'] ?? '';

if ($action === 'getHistory') {
    getHistory($pdo);
} elseif ($action === 'cancelOrder') {
    cancelOrder($pdo);
} else {
    echo json_encode(['success' => false, 'message' => 'Action tidak dikenal']);
}

function getHistory($pdo) {
    $userId = $_SESSION['user_id'];
    try {
        $stmt = $pdo->prepare(
            "SELECT id, user_id, user_name, user_email, kota, alamat, payment, total, items, status, created_at
             FROM hs
             WHERE user_id = ?
             ORDER BY created_at DESC"
        );
        $stmt->execute([$userId]);
        $orders = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode(['success' => true, 'orders' => $orders]);
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'message' => 'Gagal mengambil data: ' . $e->getMessage()]);
    }
}


function cancelOrder($pdo) {
    $userId  = $_SESSION['user_id'];
    $orderId = intval($_POST['order_id'] ?? 0);

    if (!$orderId) {
        echo json_encode(['success' => false, 'message' => 'ID order tidak valid.']);
        return;
    }

    try {
       
        $stmt = $pdo->prepare(
            "SELECT id, status FROM hs WHERE id = ? AND user_id = ?"
        );
        $stmt->execute([$orderId, $userId]);
        $order = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$order) {
            echo json_encode(['success' => false, 'message' => 'Order tidak ditemukan.']);
            return;
        }

        if (!in_array($order['status'], ['pending', 'paid'])) {
            echo json_encode([
                'success' => false,
                'message' => 'Order tidak dapat dibatalkan karena statusnya sudah "' . $order['status'] . '".'
            ]);
            return;
        }

        
        $upd = $pdo->prepare("UPDATE hs SET status = 'cancelled' WHERE id = ? AND user_id = ?");
        $upd->execute([$orderId, $userId]);

        echo json_encode(['success' => true, 'message' => 'Order #' . $orderId . ' berhasil dibatalkan.']);
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'message' => 'Gagal membatalkan order: ' . $e->getMessage()]);
    }
}