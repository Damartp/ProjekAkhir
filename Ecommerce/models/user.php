<?php
class User {
    private $conn;
    private $table = 'datap';

    public function __construct($db) {
        $this->conn = $db;
    }

    public function register($name, $email, $password) {
        $check = $this->conn->prepare("SELECT id FROM {$this->table} WHERE email = ?");
        $check->execute([$email]);
        if ($check->rowCount() > 0) {
            return ['success' => false, 'message' => 'Email sudah digunakan'];
        }

        $hash = password_hash($password, PASSWORD_DEFAULT);
        $stmt = $this->conn->prepare(
            "INSERT INTO {$this->table} (name, email, password) VALUES (?, ?, ?)"
        );
        $stmt->execute([$name, $email, $hash]);
        return ['success' => true, 'message' => 'Registrasi berhasil'];
    }

    public function login($email, $password) {
        $stmt = $this->conn->prepare(
            "SELECT * FROM {$this->table} WHERE email = ?"
        );
        $stmt->execute([$email]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user && password_verify($password, $user['password'])) {
            return ['success' => true, 'user' => $user];
        }
        return ['success' => false, 'message' => 'Email atau password salah'];
    }
}