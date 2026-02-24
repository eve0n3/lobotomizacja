<?php
$dbServer = "localhost";
$dbUser = "root";
$dbPassword = "";
$database = "sprzontando";

$conn = new mysqli($dbServer, $dbUser, $dbPassword, $database);

if ($conn->connect_error) {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Database connection failed']);
        exit;
}
?>