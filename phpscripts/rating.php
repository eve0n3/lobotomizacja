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
    
    $id_ogl = $data["id_ogl"];   

    $ocena = $data["ocena"];
    $opis = $data["opis"] ?? null;

    if (mb_strlen($opis, 'UTF-8') <= 255) {
        include 'dbconnect.php';
        $stmt = $conn->prepare('UPDATE ogloszenia_zrobione SET ocena = ?, ocena_opis = ? WHERE id_ogl=? ');
        $stmt->bind_param('isi', $ocena, $opis, $id_ogl);
        $stmt->execute();

        if($stmt->execute()){
            echo json_encode([
                "success" => true,
                "message" => "Pomyślnie dodano ocenę"
            ]);
        }else{
            echo json_encode([
                "success" => false,
                "message" => "Wystąpił błąd"
            ]);
            http_response_code(503);
    }
    }else{
        echo json_encode([
            "success" => false,
            "message" => "Dodano zbyt długi opis"
        ]); 
        http_response_code(500);
    }

