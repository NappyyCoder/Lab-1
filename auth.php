<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

error_reporting(E_ALL);
ini_set('display_errors', 1);

include 'db.php';
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = isset($_POST['action']) ? $_POST['action'] : '';
    $username = isset($_POST['username']) ? filter_var($_POST['username'], FILTER_SANITIZE_STRING) : '';
    $password = isset($_POST['password']) ? filter_var($_POST['password'], FILTER_SANITIZE_STRING) : '';

    if (empty($username) || empty($password)) {
        echo json_encode([
            "success" => false, 
            "error" => "Username and password are required."
        ]);
        exit;
    }

    $hashedPassword = md5($password);

    try {
        // Check if the user exists in the database
        $stmt = $conn->prepare("SELECT id, username, password FROM profile_app_users WHERE username = ?");
        if (!$stmt) {
            throw new Exception("Prepare failed: " . $conn->error);
        }

        $stmt->bind_param("s", $username);
        if (!$stmt->execute()) {
            throw new Exception("Execute failed: " . $stmt->error);
        }

        // Bind result variables
        $stmt->bind_result($userId, $dbUsername, $dbPassword);
        
        // Fetch the result
        if ($stmt->fetch()) {
            // Verify password
            if ($hashedPassword === $dbPassword) {
                $_SESSION['user_id'] = $userId;
                $_SESSION['username'] = $dbUsername;
                
                echo json_encode([
                    "success" => true,
                    "message" => "Login successful",
                    "user" => [
                        "username" => $dbUsername
                    ]
                ]);
            } else {
                echo json_encode([
                    "success" => false,
                    "error" => "Invalid password"
                ]);
            }
        } else {
            echo json_encode([
                "success" => false,
                "error" => "User not found"
            ]);
        }
        
        $stmt->close();
        
    } catch (Exception $e) {
        error_log("Login error: " . $e->getMessage());
        echo json_encode([
            "success" => false,
            "error" => "Login failed: " . $e->getMessage()
        ]);
    }
} else {
    echo json_encode([
        "success" => false,
        "error" => "Invalid request method"
    ]);
}
?>
