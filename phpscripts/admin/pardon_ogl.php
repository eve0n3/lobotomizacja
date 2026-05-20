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

    $sqlquery = "UPDATE ogloszenia_oferty SET report_count = 0 WHERE id = ?;";

    $stmt = $conn->prepare($sqlquery);
    $stmt->bind_param("i",$id);

    if($stmt->execute()){
        echo json_encode ([
            "success"=>true,
            "message"=>"ogloszenie {$id} jest tak jakby okej"
        ]);
    }else{
        echo json_encode ([
            "success"=>false,
            "messgae"=>"Nie jest okej"
        ]);
    }