<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

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
    $data = json_decode( $dataJSON, true ); //convert JSON into array
    $email = trim($data['email']); 
    $kod = trim($data['kod']); 

    

    //połączenie z bazą danych
    include 'dbconnect.php';

    
    $stmt = $conn->prepare('SELECT kod, kod_wygasniecie, zatwierdzony FROM users WHERE email = ?');
    $stmt->bind_param('s',$email);
    $stmt->execute();   

    $res = $stmt->get_result();
    $odp_kod = $res->fetch_assoc();

    if ($odp_kod["zatwierdzony"] == null){
        $expire_data = $odp_kod["kod_wygasniecie"];
        $teraz = new DateTime();
        echo json_encode([$odp_kod]);


        if ($expire_data<=$teraz){
            echo "Kod wygasł, wygeneruj nowy";
        } else{
            echo "Lecimy dalej";
        }
    


        } else{
        echo json_encode([
        "succes" => "false",
        "message" => "Ten użytkownik jest już zatwierdzony",
        ]);
        }

?>