<?php
header('Access-Control-Allow-Origin: *'); 
    header('Access-Control-Allow-Methods: POST,OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    header('Content-type: application/json');

    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { //wazne bez tego bledy nie dzialaja
    http_response_code(200);
    exit(0);
    }

    //dane z react
    $dataJSON = file_get_contents('php://input');
    $data = json_decode( $dataJSON, true ); //convert JSON into array
    $email = trim($data['email']);
    $haslo = trim($data['haslo']);
    

    //połączenie z bazą danych
    include 'dbconnect.php';

    $stmt = $conn->prepare('UPDATE users SET haslo=? WHERE email = ?');
    $stmt->bind_param('ss', $haslo, $email);
    $stmt->execute();

    ?>