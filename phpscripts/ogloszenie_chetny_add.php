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
    $id_chetnego = $data["id_chetnego"];

    $sqlquery = "INSERT INTO chetny 
                (id_ogloszenia, id_chetnego, data)
                VALUES (?,?,CURRENT_TIMESTAMP);";
    
    $stmt = $conn->prepare($sqlquery);
    $stmt->bind_param('ii', $id_ogl, $id_chetnego); //hitler code
/*
    echo json_encode([ "debug"=>[
        "id_c"=>$id_chetny,
        "id_o"=>$id_ogl
    ]
    ]);
*/
    if($stmt->execute()){
        echo json_encode([
            "success"=>true,
            "message"=>"Zgłoszono do ogłoszenia!"
        ]);
    }else{
        echo json_encode([
            "success"=>false,
            "message"=>"wystąpił błąd!"
        ]);
        http_response_code(503);
    }
?>