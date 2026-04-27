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

    include 'dbconnect.php';

    $sqlQuery = "SELECT users.nazwa, ROUND(CAST(AVG(ocena) AS DECIMAL(4,2)), 2) AS avgocena FROM `ogloszenia_zrobione` 
    JOIN users ON ogloszenia_zrobione.id_wykon=users.id 
    WHERE NOT isnull(ocena)
    GROUP BY users.nazwa 
    ORDER BY avgocena DESC
    LIMIT 10";

   

    $stmt = $conn->prepare($sqlQuery);

    if($stmt->execute()){
        $res = $stmt->get_result();
        $rows = $res->fetch_all(MYSQLI_ASSOC);

        echo json_encode([
            "success" => true,
            "data" => $rows
        ]);
        http_response_code(200);
    }else{
        echo json_encode([
            "success" => false,
            "message" => "Tymczasowy Błąd, prosze spróbować póxniej"
        ]);
        http_response_code(503);
    }
?>