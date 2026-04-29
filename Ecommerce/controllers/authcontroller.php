<?php
session_start();
require_once '../config/database.php';
require_once '../models/User.php';

$db = (new Database())->connect();
$userModel = new User($db);

$action = $_POST['action'] ?? '';

if ($action === 'register') {
    $name     = trim($_POST['name'] ?? '');
    $email    = trim($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';

    if (!$name || !$email || !$password) {
        echo json_encode(['success' => false, 'message' => 'Semua field wajib diisi']);
        exit;
    }

    $result = $userModel->register($name, $email, $password);
    echo json_encode($result);
    exit;
}

if ($action === 'login') {
    $email    = trim($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';

    if (!$email || !$password) {
        echo json_encode(['success' => false, 'message' => 'Semua field wajib diisi']);
        exit;
    }

    $result = $userModel->login($email, $password);
    if ($result['success']) {
        $_SESSION['user_id']   = $result['user']['id'];
        $_SESSION['user_name'] = $result['user']['name'];
    }
    echo json_encode($result);
    exit;
}