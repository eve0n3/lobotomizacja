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

    $user_id = $data["user_id"];

    include 'dbconnect.php';

    $stmt = $conn->prepare('SELECT ogloszenia_oferty.* FROM ogloszenia_oferty JOIN ogloszenia_zrobione ON ogloszenia_oferty.id = ogloszenia_zrobione.id_ogl 
    WHERE ogloszenia_oferty.zakonczone = 1 AND ogloszenia_zrobione.id_wykon = ? AND ogloszenia_oferty.ban = 0 ORDER BY ogloszenia_oferty.data_zakonczenia DESC LIMIT 1');
    $stmt->bind_param('i', $user_id);

    if($stmt->execute()){
        $res = $stmt->get_result();
        $rows = $res->fetch_assoc();
        
        if($rows){

            $stmt = $conn->prepare('SELECT nazwa FROM users WHERE id = ?');
            $stmt->bind_param('i', $rows['id_zglasz']);
            $stmt->execute();

            $res_users = $stmt->get_result();
            $rows_users = $res_users->fetch_assoc();

            echo json_encode([
                "success" => true,
                "ogloszenie" => $rows,
                "user" => $rows_users
            ]);
            
            
        }else{
            echo json_encode([
                "success" => true,
                "data" => [],
                "message" => "Użytkownik nie ma jeszcze żadnych wykonanych ogłoszeń"
            ]);
        }
    }else{
        echo json_encode([
            "success" => false,
            "message" => "Prosze spróbować ponownie później"
        ]);
        http_response_code(503);
    }




    

