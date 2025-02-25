<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Get JSON input
$json = file_get_contents('php://input');
$data = json_decode($json, true);

// Log the received data
error_log("Received data: " . print_r($data, true));

try {
    // Connect to your database
    $conn = new PDO("mysql:host=your_host;dbname=your_database", "username", "password");
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Get data from JSON
    $id = $data['id'];
    $name = $data['name'];
    $email = $data['email'];
    $title = $data['title'];
    $bio = $data['bio'];
    $image_url = $data['image_url'];

    // Update the profile
    $stmt = $conn->prepare("UPDATE profiles SET name = ?, email = ?, title = ?, bio = ?, image_url = ? WHERE id = ?");
    $result = $stmt->execute([$name, $email, $title, $bio, $image_url, $id]);

    if ($result) {
        echo json_encode(['success' => true, 'message' => 'Profile updated successfully']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to update profile']);
    }

} catch(PDOException $e) {
    error_log("Database error: " . $e->getMessage());
    echo json_encode(['success' => false, 'message' => 'Database error occurred: ' . $e->getMessage()]);
} catch(Exception $e) {
    error_log("General error: " . $e->getMessage());
    echo json_encode(['success' => false, 'message' => 'An error occurred: ' . $e->getMessage()]);
}
?>
