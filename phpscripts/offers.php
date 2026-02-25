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

    $orderCrit = $data["orderCrit"] ?? "utworzenie";//domyślnie "utworzenie"
    $orderType = $data["orderType"] ?? "DESC";//domyślnie "DESC"
    $miasto = $data["miasto"] ?? null;
    $kategoria = $data["kategoria"] ?? null;
    $limit = $data["limit"] ?? 20; //domyślnie 20

    $id = $data["id"] ?? null; //jak id jest wysłane używamy trybu jednego artykułu

    echo json_encode([
        "debugvals" => [
            "orderCrit" => $orderCrit,
            "orderType" => $orderType,
            "miasto" => $miasto,
            "kategoria" => $kategoria,
            "limit" => $limit,
            "id" => $id,
        ]
    ]);


    include 'dbconnect.php';


    $sqlquery = "SELECT * FROM ogloszenia_oferty";
    if(is_null($id)){//tryb listy ogłoszeń
        /*
        TODO: co się dzieje gdy sortujesz od miasto, kategorii i obu
        czyli multimode
        */

        echo json_encode([
            "debug_multimode" => [
                "sql" => $sqlquery,
            ]
        ]);
    }else{//tryb jednego artykułu
        $sqlquery .= " WHERE id = ?";
        $stmt = $conn->prepare($sqlquery);
        $stmt->bind_param("s", $id);

        echo json_encode([
            "debug_singlemode" => [
                "id" => $id,
                "sql" => $sqlquery,
            ]
        ]);
    }
    





?>