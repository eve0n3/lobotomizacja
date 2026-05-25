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
    
    $ogloszenie_id = $data["ogloszenie_id"];

    $tytul = $data["tytul"] ?? null;
    $miasto = $data["miasto"] ?? null;
    $kategoria = $data["kategoria"] ?? null;
    $adres = $data["adres"] ?? null;
    $cena = $data["cena"] ?? null;
    $opis = $data["opis"] ?? null;
    $waznosc = $data["waznosc"] ?? null;


    include 'dbconnect.php';

    $sqlQueryStart = "UPDATE ogloszenia_oferty SET ";

    $criteria = [];

    $params = [];
    $paramTypes = "";

    if(!is_null($tytul) || !is_null($miasto) || !is_null($kategoria) || !is_null($adres) || !is_null($cena) || !is_null($opis)){
       

        if(!is_null($tytul)){
            array_push($criteria, "tytul = ?");
            array_push($params, $tytul);
            $paramTypes .= "s";
        }
        if(!is_null($miasto)){
            array_push($criteria, "miasto = ?");
            array_push($params, $miasto);
            $paramTypes .= "s";
        }
        if(!is_null($kategoria)){
            array_push($criteria, "kategoria = ?");
            array_push($params, $kategoria);
            $paramTypes .= "s";
        }
        if(!is_null($adres)){
            array_push($criteria, "adres = ?");
            array_push($params, $adres);
            $paramTypes .= "s";
        }
        if(!is_null($cena)){
            array_push($criteria, "cena = ?");
            array_push($params, $cena);
            $paramTypes .= "i";
        }
        if(!is_null($opis)){
            array_push($criteria, "opis = ?");
            array_push($params, $opis);
            $paramTypes .= "s";
        }
        if(!is_null($waznosc)){
            array_push($criteria, "waznosc = ?");
            array_push($params, $waznosc);
            $paramTypes .= "s";
        }
        $sqlQueryStart .= join(", ", $criteria);
        

    }

    array_push($params, $ogloszenie_id);
    $paramTypes .= "i";

    $sqlQueryEnd = " WHERE id = ?;";

    $sqlQuery = $sqlQueryStart.$sqlQueryEnd;

    echo json_encode($sqlQuery);
    $stmt = $conn->prepare($sqlQuery);
    $stmt->bind_param($paramTypes, ...$params);

    $sqlQuery2 = "DELETE FROM chetny WHERE id_ogloszenia = ?;";
    $stmt2 = $conn->prepare($sqlQuery2);
    $stmt2->bind_param("i", $ogloszenie_id);

    $sqlQuery3 = "DELETE FROM ogloszenia_zrobione WHERE id_ogl = ?;";
    $stmt3 = $conn->prepare($sqlQuery3);
    $stmt3->bind_param("i", $ogloszenie_id);

    if($stmt->execute()){
        $kod_zapisywanie = $conn->prepare('DELETE FROM chetny WHERE id_ogloszenia = ?');
        $kod_zapisywanie->bind_param('i', $ogloszenie_id, );
        $kod_zapisywanie->execute();   

        echo json_encode([
            "success" => true,
            "message" => "Dane ogloszenie zostaly zmienione"
        ]);

        $stmt2->execute();
        $stmt3->execute();

    }else{
        echo json_encode([
            "success" => false,
            "message" => "Prosze spróbować ponownie później"
        ]);
        http_response_code(503);
    }

?>