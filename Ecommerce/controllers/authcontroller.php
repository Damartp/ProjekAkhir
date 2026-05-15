<?php


session_start();
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../models/User.php';

$action = $_GET['action'] ?? $_POST['action'] ?? '';


if ($action === 'register') {
    header('Content-Type: application/json');
    $db   = (new Database())->connect();
    $user = new User($db);

    $name     = trim($_POST['name'] ?? '');
    $email    = trim($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';

    if (!$name || !$email || !$password) {
        echo json_encode(['success' => false, 'message' => 'Semua field wajib diisi']);
        exit;
    }

    $result = $user->register($name, $email, $password);
    echo json_encode($result);
    exit;
}


if ($action === 'login') {
    header('Content-Type: application/json');
    $db   = (new Database())->connect();
    $user = new User($db);

    $email    = trim($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';

    if (!$email || !$password) {
        echo json_encode(['success' => false, 'message' => 'Email dan password wajib diisi']);
        exit;
    }

    $result = $user->login($email, $password);

    if ($result['success']) {
        $_SESSION['user_id']   = $result['user']['id'];
        $_SESSION['user_name'] = $result['user']['name'];
        $_SESSION['user_email']= $result['user']['email'];
        $_SESSION['role']      = $result['user']['role'] ?? 'user'; // ← simpan role
    }

    echo json_encode($result);
    exit;
}


if ($action === 'logout') {
    session_destroy();
    header('Location: ../views/login.php');
    exit;
}