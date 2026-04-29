<?php
class Product {
    private $conn;
    private $table = 'datab';

    public function __construct($db) {
        $this->conn = $db;
    }


    public function getAll() {
        $stmt = $this->conn->prepare("SELECT * FROM {$this->table} ORDER BY id");
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getBySection($section) {
        $stmt = $this->conn->prepare(
            "SELECT * FROM {$this->table} WHERE section = ? ORDER BY id"
        );
        $stmt->execute([$section]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getById($id) {
        $stmt = $this->conn->prepare(
            "SELECT * FROM {$this->table} WHERE id = ?"
        );
        $stmt->execute([$id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
}