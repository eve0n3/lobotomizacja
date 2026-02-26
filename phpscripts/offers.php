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

    $miasto = $data["miasto"] ?? null;
    $kategoria = $data["kategoria"] ?? null;
    $cena = $data["cena"] ?? null;

    $page = $data["page"] ?? 1; //page 1 default
    $limit = $data["limit"] ?? 12; //12 art per page default

    echo json_encode([
        "debugvals" => [
            "miasto" => $miasto,
            "kategoria" => $kategoria,
            "cena" => $cena,
            "limit" => $limit,
            "page" => $page,
        ]
    ]);


    include 'dbconnect.php';

    $sqlQueryStart = "SELECT * FROM ogloszenia_oferty";

    $criteria = [];

    $params = [];
    $paramTypes = "";

    if(!is_null($miasto) || !is_null($kategoria) || !is_null($cena)){
        $sqlQueryStart .= " WHERE ";

        if(!is_null($miasto)){
            array_push($criteria, "miasto = ?");
            array_push($params, &$miasto);
            $paramTypes .= "s";
        }
        if(!is_null($kategoria)){
            array_push($criteria, "kategoria = ?");
            array_push($params, &$miasto);
            $paramTypes .= "s";
        }
        if(!is_null($cena)){
            array_push($criteria, "cena = ?");
            array_push($params, &$cena);
            $paramTypes .= "s";
        }
        $sqlQueryStart .= join(" AND ", $criteria);
        
        echo json_encode([
            "query" => $sqlQueryStart,
            "no miasto?" => is_null($miasto),
            "no kategoria?" => is_null($kategoria),
            "no cena?" => is_null($cena)
        ])
        
        array_push($params, $limit);
        $paramTypes .= "s";
        array_push($params, $offset); // zrob offset
    }else{

    }

    





?>