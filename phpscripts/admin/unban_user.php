<?php
    header('Access-Control-Allow-Origin: *'); 
    header('Access-Control-Allow-Methods: POST,OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    header('Content-type: application/json');

    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        exit(0);
    }

    include '../dbconnect.php';

    $dataJSON = file_get_contents('php://input');
    $data = json_decode($dataJSON, TRUE);

    $id = $data["id"];

    $sqlquery = "UPDATE users
                SET ban = 0,
                    ban_data = NULL,
                    ban_end = NULL
                WHERE id = ?";

    $stmt = $conn->prepare($sqlquery);
    $stmt->bind_param("i", $id);

    if($stmt->execute()){
        echo json_encode([
            "success" => true,
            "message" => "Użytkownik został odbanowany"
        ]);
    } else {
        echo json_encode([
            "success" => false,
            "message" => "Wystąpił błąd"
        ]);
        http_response_code(503);
    }
?>