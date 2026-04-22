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
    
    $tytul = $data["tytul"] ?? null;

    $miasto = $data["miasto"] ?? null;
    $kategoria = $data["kategoria"] ?? null;
    
    $minCena = $data["minCena"] ?? null;
    $maxCena = $data["maxCena"] ?? null;

    $page = $data["page"] ?? 1; //page 1 default
    $limit = $data["limit"] ?? 12; //12 art per page default

    $offset = ($page-1)*$limit; //offset to nr strony pomnożony przez limit na stronie

    include 'dbconnect.php';

    $sqlQueryStart = "SELECT * FROM ogloszenia_oferty";

    $criteria = [];

    $params = [];
    $paramTypes = "";

    if(!is_null($tytul) || !is_null($miasto) || !is_null($kategoria) || !is_null($minCena) || !is_null($maxCena)){
        $sqlQueryStart .= " WHERE ";

        if(!is_null($tytul)){
            array_push($criteria, "tytul LIKE ?");
            array_push($params, "%".$tytul."%");
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
        if(!is_null($minCena)){
            array_push($criteria, "cena > ?");
            array_push($params, $minCena);
            $paramTypes .= "s";
        }
        if(!is_null($maxCena)){
            array_push($criteria, "cena < ?");
            array_push($params, $maxCena);
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

    $stmt = $conn->prepare($sqlQuery);
    $stmt->bind_param($paramTypes, ...$params);

    if($stmt->execute()){
        $res = $stmt->get_result();
        $rows = $res->fetch_all(MYSQLI_ASSOC);
        
        if($rows){
            echo json_encode([
                "data" => $rows
            ]);
        }else{
            echo json_encode([
                "success" => true,
                "data" => [],
                "message" => "Żadne ogłoszenie nie spełnia kryterii"
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