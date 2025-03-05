<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

require_once 'check_auth.php';
require_once 'db.php';

// Check if user is authenticated
if (!isAuthenticated()) {
    http_response_code(401);
    echo json_encode([
        "success" => false,
        "error" => "Authentication required"
    ]);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        // Get the user ID from the session
        $user_id = $_SESSION['user_id'];
        
        // Get form data
        $name = isset($_POST['name']) ? filter_var($_POST['name'], FILTER_SANITIZE_STRING) : '';
        $email = isset($_POST['email']) ? filter_var($_POST['email'], FILTER_VALIDATE_EMAIL) : '';
        $title = isset($_POST['title']) ? filter_var($_POST['title'], FILTER_SANITIZE_STRING) : '';
        $bio = isset($_POST['bio']) ? filter_var($_POST['bio'], FILTER_SANITIZE_STRING) : '';
        
        // Handle file upload if needed
        $image_url = ''; // Handle your image upload logic here

        // Validate required fields
        if (empty($name) || empty($email)) {
            throw new Exception("Name and email are required fields");
        }

        // Insert the profile with user_id
        $stmt = $conn->prepare("INSERT INTO user_profiles (name, email, title, bio, image_url, user_id) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("sssssi", $name, $email, $title, $bio, $image_url, $user_id);
        
        if ($stmt->execute()) {
            echo json_encode([
                "success" => true,
                "message" => "Profile created successfully"
            ]);
        } else {
            throw new Exception("Error creating profile");
        }

    } catch (Exception $e) {
        http_response_code(400);
        echo json_encode([
            "success" => false,
            "error" => $e->getMessage()
        ]);
    }
} else {
    http_response_code(405);
    echo json_encode([
        "success" => false,
        "error" => "Method not allowed"
    ]);
}
?>