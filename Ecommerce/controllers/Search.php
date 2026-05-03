<?php

class Search {
    private $db;

    public function __construct($db) {
        $this->db = $db;
    }

    
    public function searchProducts($keyword) {
        $keyword = '%' . $this->db->real_escape_string(trim($keyword)) . '%';
        $sql = "SELECT * FROM products 
                WHERE name LIKE ? OR category LIKE ? OR description LIKE ?
                ORDER BY name ASC
                LIMIT 20";
        $stmt = $this->db->prepare($sql);
        $stmt->bind_param('sss', $keyword, $keyword, $keyword);
        $stmt->execute();
        $result = $stmt->get_result();
        $products = [];
        while ($row = $result->fetch_assoc()) {
            $products[] = $row;
        }
        $stmt->close();
        return $products;
    }
}


if (isset($_GET['q'])) {
    
    require_once __DIR__ . '/../config/database.php';
    $search = new Search($conn);
    $results = $search->searchProducts($_GET['q']);

    header('Content-Type: application/json');
    echo json_encode($results);
    exit;
}
?>