<?php
function isAuthenticated() {
    session_start();
    return isset($_SESSION['user_id']) && !empty($_SESSION['user_id']);
}
?>