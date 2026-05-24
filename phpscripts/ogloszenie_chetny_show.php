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


    $id_ogl = $data["id_ogl"] ?? null;
    $id_chetnego = $data["id_chetnego"] ?? null;
    $mode = $data["mode"] ?? "applied"; //BARDZO WAŻNE: to musi być jak robisz zapytnie o id_chetnego. bez tego null trzeba manualnie podać wartość null żeby działało gdy pytasz o id_ogl

    if(!is_null($id_chetnego)){
        switch($mode){
            case "applied":
                $sqlquery = "SELECT ogloszenia_oferty.*, users.nazwa, if(ogloszenia_zrobione.id_wykon=chetny.id_chetnego, true, false) AS wybrany FROM `chetny`
                            LEFT JOIN ogloszenia_zrobione ON ogloszenia_zrobione.id_ogl=chetny.id_ogloszenia
                            JOIN ogloszenia_oferty ON ogloszenia_oferty.id=chetny.id_ogloszenia
                            JOIN users ON users.id = ogloszenia_oferty.id_zglasz
                            WHERE id_chetnego = ?
                            HAVING wybrany = 0;"; 
                break;
            case "inProgress":
                $sqlquery = "SELECT ogloszenia_oferty.*, users.nazwa, if(ogloszenia_zrobione.id_wykon=chetny.id_chetnego, true, false) AS wybrany FROM `chetny`
                            LEFT JOIN ogloszenia_zrobione ON ogloszenia_zrobione.id_ogl=chetny.id_ogloszenia
                            JOIN ogloszenia_oferty ON ogloszenia_oferty.id=chetny.id_ogloszenia
                            JOIN users ON users.id = ogloszenia_oferty.id_zglasz
                            WHERE id_chetnego = ? AND zakonczone = 0
                            HAVING wybrany = 1;"; 
                break;
            case "ended":
                $sqlquery = "SELECT ogloszenia_oferty.*, users.nazwa, ogloszenia_zrobione.ocena, ogloszenia_zrobione.ocena_opis, if(ogloszenia_zrobione.id_wykon=chetny.id_chetnego, true, false) AS wybrany FROM `chetny`
                            LEFT JOIN ogloszenia_zrobione ON ogloszenia_zrobione.id_ogl=chetny.id_ogloszenia
                            JOIN ogloszenia_oferty ON ogloszenia_oferty.id=chetny.id_ogloszenia
                            JOIN users ON users.id = ogloszenia_oferty.id_zglasz
                            WHERE id_chetnego = ? AND zakonczone = 1
                            HAVING wybrany = 1;"; 
                break;
        }
        $param = $id_chetnego;
    }elseif(!is_null($id_ogl)){
        $sqlquery = "SELECT *,ROUND(CAST(AVG(oceny.ocena) AS DECIMAL(4,2)),2) AS avgocena, if(ogloszenia_zrobione.id_wykon=chetny.id_chetnego, true, false) AS wybrany FROM `chetny`
                    LEFT JOIN ogloszenia_zrobione ON ogloszenia_zrobione.id_ogl=chetny.id_ogloszenia
                    JOIN users ON users.id=chetny.id_chetnego 
                    LEFT JOIN ogloszenia_zrobione as oceny ON oceny.id_wykon=users.id
                    WHERE id_ogloszenia = ? GROUP BY users.id;"; 
        $param = $id_ogl;
    }
    
    // echo json_encode([$sqlquery, $param]);
    $stmt = $conn->prepare($sqlquery);
    $stmt->bind_param("i", $param);

    if($stmt->execute()){
        $res = $stmt->get_result();
        $rows = $res->fetch_all(MYSQLI_ASSOC);

        if($rows){
            echo json_encode([
                "data"=>$rows,
                "success"=>true,
            ]);
        }else{
            echo json_encode([
                "success"=>true,
                "data"=>[],
                "message"=>"Nic nie spełnia kryterii"
            ]); 
        }
        
    }else{
        echo json_encode([
            "success"=>false,
            "message"=>"Proszę spróbować ponownie później"
        ]);
        http_response_code(503);
    }
?>