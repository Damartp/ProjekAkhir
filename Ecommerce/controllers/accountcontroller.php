<?php
session_start();
require_once __DIR__ . '/../config/database.sql';
require_once __DIR__ . '/../models/User.php';


if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'Belum login']);
    exit;
}

$db        = (new Database())->connect();
$userModel = new User($db);
$action    = $_POST['action'] ?? '';


if ($action === 'getUser') {
    $user = $userModel->getById($_SESSION['user_id']);
    echo json_encode(['success' => true, 'user' => $user]);
    exit;
}


if ($action === 'updateName') {
    $name   = trim($_POST['name'] ?? '');
    if (!$name) {
        echo json_encode(['success' => false, 'message' => 'Nama tidak boleh kosong']);
        exit;
    }
    $result = $userModel->updateName($_SESSION['user_id'], $name);
    if ($result) $_SESSION['user_name'] = $name;
    echo json_encode(['success' => $result, 'message' => $result ? 'Nama berhasil diubah' : 'Gagal mengubah nama']);
    exit;
}


if ($action === 'updatePassword') {
    $current = $_POST['current_password'] ?? '';
    $new     = $_POST['new_password'] ?? '';
    if (!$current || !$new) {
        echo json_encode(['success' => false, 'message' => 'Semua field wajib diisi']);
        exit;
    }
    $result = $userModel->updatePassword($_SESSION['user_id'], $current, $new);
    echo json_encode($result);
    exit;
}