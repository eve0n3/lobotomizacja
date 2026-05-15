<?php
    header('Access-Control-Allow-Origin: *'); 
    header('Access-Control-Allow-Methods: POST,OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    header('Content-type: application/json');

    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { //wazne bez tego bledy nie dzialaja
    http_response_code(200);
    exit(0);
    }

    include '../dbconnect.php';

    //dane z react
    $dataJSON = file_get_contents('php://input');
    $data = json_decode( $dataJSON, TRUE ); //convert JSON into array
    
    $id = $data["id"];
    $date_end = $data["date_end"];

    $sqlquery = "UPDATE users
                SET ban = 1, ban_data=NOW(), ban_end=?
                WHERE id = ?";
    
    $stmt=$conn->prepare($sqlquery);
    $stmt->bind_param("si", $date_end, $id);

    if($stmt->execute()){
        echo json_encode([
            "success"=>true,
            "message"=>"Wykonano pomyślnie"
        ]);
    }else{
        echo json_encode([
            "success"=>false,
            "message"=>"Wystąpił błąd"
        ]);
        http_response_code(503);
    }
?>