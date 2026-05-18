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

    $sqlQuery = "SELECT * FROM `ogloszenia_oferty` JOIN users ON users.id=ogloszenia_oferty.id_zglasz WHERE report_count>0 ORDER BY report_count DESC;";

    $stmt = $conn->prepare($sqlQuery);
    
    if($stmt->execute()){
        $res = $stmt->get_result();
        $rows = $res->fetch_all(MYSQLI_ASSOC);

        if($rows){
            echo json_encode([
                "success"=>true,
                "data"=>$rows
            ]);
        }else{
            echo json_encode([
                "success"=>true,
                "data"=>[]
            ]);
        }
    }else{
        echo json_encode([
            "success"=>false,
            "message"=>"Wystąpił błąd"
        ]);
    }
?>