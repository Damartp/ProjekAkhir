<?php
class Order {
    private $conn;
    private $table = 'hs';

    public function __construct($db) {
        $this->conn = $db;
    }

    public function create($data) {
        $stmt = $this->conn->prepare("
            INSERT INTO {$this->table}
            (user_id, user_name, user_email, kota, alamat, payment, total, items)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ");
        $stmt->execute([
            $data['user_id'],
            $data['user_name'],
            $data['user_email'],
            $data['kota'],
            $data['alamat'],
            $data['payment'],
            $data['total'],
            $data['items']
        ]);
        return $this->conn->lastInsertId();
    }

    public function getByUser($user_id) {
        $stmt = $this->conn->prepare(
            "SELECT * FROM {$this->table} WHERE user_id = ? ORDER BY created_at DESC"
        );
        $stmt->execute([$user_id]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}