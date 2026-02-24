<?php 
    //header('Access-Control-Allow-Origin: *'); 
    //header('Access-Control-Allow-Methods: GET,POST,OPTIONS');
    //header('Access-Control-Allow-Headers: Content-Type, Authorization');
    //header('Content-type: application/json');

    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { //wazne bez tego bledy nie dzialaja
    http_response_code(200);
    exit(0);
    }

    //dane z react
    $dataJSON = file_get_contents('php://input');
    $data = json_decode( $dataJSON, TRUE ); //convert JSON into array

    //połączenie z bazą danych
    include 'dbconnect.php';
    
    $getstmt = $conn->prepare('SELECT email FROM users');
    $getstmt->execute();
    $getresult = $getstmt->get_result();
    $emaillist = $getresult->fetch_assoc();

?>