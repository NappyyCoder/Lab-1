<?php
// Set proper headers
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Error handling
error_reporting(E_ERROR | E_PARSE);
ini_set('display_errors', '0');

try {
    // Your database connection
    $conn = new PDO("mysql:host=your_host;dbname=your_database", "username", "password");
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Your query
    $stmt = $conn->prepare("SELECT * FROM profiles");
    $stmt->execute();
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Return JSON
    echo json_encode($results);
    
} catch(PDOException $e) {
    // Return error as JSON
    http_response_code(500);
    echo json_encode(["error" => "Database error: " . $e->getMessage()]);
}
?>