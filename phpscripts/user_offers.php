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
    $data = json_decode( $dataJSON, TRUE ); //convert JSON into array
    
    $id_zglasz = $data["id_zglasz"];
    $mode = $data["mode"] ?? "active";

    include 'dbconnect.php';

    switch($mode){
        case "active":
            $sqlQuery = 'SELECT ogloszenia_oferty.*,users.nazwa FROM ogloszenia_oferty JOIN users ON users.id = ogloszenia_oferty.id_zglasz WHERE id_zglasz = ? AND zakonczone = 0 AND ogloszenia_oferty.ban = 0;';
            break;
        case "ended":
            $sqlQuery = 'SELECT ogloszenia_oferty.*,users.nazwa FROM ogloszenia_oferty JOIN users ON users.id = ogloszenia_oferty.id_zglasz WHERE id_zglasz = ? AND zakonczone = 1 AND ogloszenia_oferty.ban = 0;';
            break;
        case "banned":
            $sqlQuery = 'SELECT ogloszenia_oferty.*,users.nazwa FROM ogloszenia_oferty JOIN users ON users.id = ogloszenia_oferty.id_zglasz WHERE id_zglasz = ? AND ogloszenia_oferty.ban = 1;';
            break;
    }
   
    $stmt = $conn->prepare($sqlQuery);
    $stmt->bind_param('i', $id_zglasz);
    $stmt->execute();
    $result = $stmt->get_result();
    $user = $result->fetch_assoc();


    if($stmt->execute()){
        $res = $stmt->get_result();
        $rows = $res->fetch_all(MYSQLI_ASSOC);
        
        if($rows){
            echo json_encode([
                "success" => true,
                "data" => $rows
            ]);
        }else{
            echo json_encode([
                "success" => true,
                "data" => [],
                "message" => "Brak Wyników"
            ]);
        }
    }else{
        echo json_encode([
            "success" => false,
            "message" => "Prosze spróbować ponownie później"
        ]);
        http_response_code(503);
    }

?>