<?php
    header('Access-Control-Allow-Origin: *'); //domena na produkcji 
    header('Access-Control-Allow-Methods: POST,OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    header('Access-Control-Allow-Credentials: true');
    header('Content-type: application/json');

    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { //wazne bez tego bledy nie dzialaja
    http_response_code(200);
    exit(0);
    }

    //dane z react
    $dataJSON = file_get_contents('php://input');
    $data = json_decode( $dataJSON, TRUE ); //convert JSON into array
    $user_id = trim($data['user_id']); 
    

    //połączenie z bazą danych
    include 'dbconnect.php';

$stmt = $conn->prepare('SELECT users.*, ROUND(CAST(AVG(ocena) AS DECIMAL(4,2)),2) AS avgocena FROM ogloszenia_zrobione
RIGHT JOIN users ON ogloszenia_zrobione.id_wykon=users.id
WHERE users.id = ?');
$stmt->bind_param('i', $user_id);


if($stmt->execute()){
    $res = $stmt->get_result();
    $user = $res->fetch_array(MYSQLI_ASSOC);
        
    echo json_encode([
        "success" => true,
        "data" => $user
    ]);
}else{
    echo json_encode([
        "success" => false,
        "message" => "Prosze spróbować ponownie później"
    ]);
    http_response_code(503);
    }


?>