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

    public function create($data) {
        $stmt = $this->conn->prepare(
            "INSERT INTO {$this->table} 
             (name, price, old_price, emoji, badge, badge_color, stars, reviews, section)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)"
        );
        $stmt->execute([
            $data['name'],
            $data['price'],
            $data['old_price'],
            $data['emoji'],
            $data['badge'],
            $data['badge_color'],
            $data['stars'],
            $data['reviews'],
            $data['section'],
        ]);
        return $this->conn->lastInsertId();
    }

    public function update($id, $data) {
        $stmt = $this->conn->prepare(
            "UPDATE {$this->table} SET
             name        = ?,
             price       = ?,
             old_price   = ?,
             emoji       = ?,
             badge       = ?,
             badge_color = ?,
             stars       = ?,
             reviews     = ?,
             section     = ?
             WHERE id    = ?"
        );
        return $stmt->execute([
            $data['name'],
            $data['price'],
            $data['old_price'],
            $data['emoji'],
            $data['badge'],
            $data['badge_color'],
            $data['stars'],
            $data['reviews'],
            $data['section'],
            $id,
        ]);
    }

    public function delete($id) {
        $stmt = $this->conn->prepare(
            "DELETE FROM {$this->table} WHERE id = ?"
        );
        return $stmt->execute([$id]);
    }
}