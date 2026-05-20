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

    $id = $data['id'] ?? null;
    $username = $data['username'] ?? null;

    $criteria = [];
    $params = [];
    $paramTypes = "";

    

    $sqlQueryStart = "SELECT users.*, 
                    COUNT(DISTINCT chetny.id) AS liczba_checi,
                    COUNT(DISTINCT oceny.id) AS liczba_wykonan,
                    ROUND(CAST(AVG(oceny.ocena) AS DECIMAL(4,2)),2) AS avgocena,
                    COUNT(DISTINCT ogloszenia_oferty.id) AS liczba_ogloszen
	                    FROM `users`
                    LEFT JOIN chetny ON chetny.id_chetnego=users.id
                    LEFT JOIN ogloszenia_oferty ON ogloszenia_oferty.id_zglasz=users.id
                    LEFT JOIN ogloszenia_zrobione AS oceny ON oceny.id_wykon=users.id";
    $sqlQueryEnd = " GROUP BY users.id
                    ORDER BY avgocena ASC;";
    
    if(!is_null($id) || !is_null($username)){
        $sqlQueryStart .= " WHERE ";

        if(!is_null($id)){
            array_push($criteria, "users.id LIKE ?");
            array_push($params, $id);
            $paramTypes .= "i";
        }
        if(!is_null($username)){
            array_push($criteria, "users.nazwa LIKE ?");
            array_push($params, "%".$username."%");
            $paramTypes .= "s";
        }
        $sqlQueryStart .= join(" AND ", $criteria);
    }
    
    $sqlQuery = $sqlQueryStart.$sqlQueryEnd;
    
    echo json_encode($sqlQuery);

    $stmt = $conn->prepare($sqlQuery);
    if($paramTypes != ""){
        $stmt->bind_param($paramTypes, ...$params);
    }

    if($stmt->execute()){
        $res = $stmt->get_result();
        $rows = $res->fetch_all(MYSQLI_ASSOC);

        if($rows){
            echo json_encode([
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
            "message"=>"wystąpił błąd"
        ]);
    }
?>