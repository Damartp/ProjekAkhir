<?php
require_once __DIR__ . '/../config/database.php';

if (isset($_GET['q'])) {
    header('Content-Type: application/json');
    
    try {
        $db      = (new Database())->connect();
        $keyword = '%' . trim($_GET['q']) . '%';
        
        $stmt = $db->prepare(
            "SELECT id, name, price, old_price, emoji, badge, badge_color, stars, reviews, section
             FROM datab
             WHERE name LIKE ?
             ORDER BY name ASC
             LIMIT 20"
        );
        $stmt->execute([$keyword]);
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        echo json_encode($results);
    } catch (Exception $e) {
        echo json_encode([]);
    }
    exit;
}
?>
