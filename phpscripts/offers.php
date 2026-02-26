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

    $offset = ($page-1)*$limit; //offset to nr strony pomnożony przez limit na stronie

    /*
    echo json_encode([
        "debugvals" => [
            "miasto" => $miasto,
            "kategoria" => $kategoria,
            "cena" => $cena,
            "limit" => $limit,
            "page" => $page,
        ]
    ]);
    */

    include 'dbconnect.php';

    $sqlQueryStart = "SELECT * FROM ogloszenia_oferty";

    $criteria = [];

    $params = [];
    $paramTypes = "";

    if(!is_null($miasto) || !is_null($kategoria) || !is_null($cena)){
        $sqlQueryStart .= " WHERE ";

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
        if(!is_null($cena)){
            array_push($criteria, "cena = ?");
            array_push($params, $cena);
            $paramTypes .= "s";
        }
        $sqlQueryStart .= join(" AND ", $criteria);
        

    }

    array_push($params, $limit);
    $paramTypes .= "s";
    array_push($params, $offset);
    $paramTypes .= "s";

    $sqlQueryEnd = " ORDER BY utworzenie DESC LIMIT ? OFFSET ?";
    $sqlQuery = $sqlQueryStart.$sqlQueryEnd;

    /*
    echo json_encode([
        "querydebug" => [
        "query" => $sqlQuery,
        "no miasto?" => is_null($miasto),
        "no kategoria?" => is_null($kategoria),
        "no cena?" => is_null($cena),
        "params" => [$paramTypes, $params]
        ]
    ]);
    */

    $stmt = $conn->prepare($sqlQuery);
    $stmt->bind_param($paramTypes, ...$params);

    if($stmt->execute()){
        $res = $stmt->get_result();
        $cols = $res->fetch_all(MYSQLI_ASSOC);
        
        if($cols){
            echo json_encode([
                "data" => $cols
            ]);
        }else{
            //http_response_code(205); 
            echo json_encode([
                "success" => true,
                "message" => "nie ma"
            ]);
        }
    }else{
        http_response_code(503);
        echo json_encode([
            "success" => false,
            "message" => "prosze spróbować ponownie później"
        ]);
    }

    $stmt->close();
    $conn->close();
?>