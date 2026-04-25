<?php
    header('Access-Control-Allow-Origin: *'); 
    header('Access-Control-Allow-Methods: POST,OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    header('Content-type: application/json');

    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { //wazne bez tego bledy nie dzialaja
    http_response_code(200);
    exit(0);
    }

    include 'dbconnect.php';

    $dataJSON = file_get_contents('php://input');
    $data = json_decode( $dataJSON, TRUE ); //convert JSON into array

    $id_ogl = $data["id_ogl"];
    $id_uz = $data["id_uz"];

    $sqlquery = "INSERT INTO ogloszenia_zrobione (id_ogl, id_wykon)
                VALUES (?, ?)";
    
    $stmt = $conn->prepare($sqlquery);
    $stmt->bind_param("ii", $id_ogl, $id_uz);

    if($stmt->execute()){
        echo json_encode([
            "success" => true,
            "message" => "pomyślnie wybrano wykonawcę"
        ]);
    }else{
        echo json_encode([
            "success" => false,
            "message" => "Wystąpił błąd"
        ]);
        http_response_code(503);
    }
