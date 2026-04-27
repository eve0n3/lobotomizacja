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

    $username = $data['username'];
    $email = $data['email'];
    $password = $data['password'];

    //połączenie z bazą danych
    include 'dbconnect.php';

    //robimy template i podstawiamy  email
    $stmt = $conn->prepare('SELECT COUNT(*) FROM users WHERE email = ?');
    $stmt->bind_param("s", $email);
    $stmt->execute();
    
    $res = $stmt->get_result();
    $row = $res->fetch_assoc();

    $mailExist = boolval($row["COUNT(*)"]);//true/false czy mail istnieje

    //to samo tylko username
    $stmt = $conn->prepare('SELECT COUNT(*) FROM users WHERE nazwa = ?');
    $stmt->bind_param("s", $username);
    $stmt->execute();
    
    $res = $stmt->get_result();
    $row = $res->fetch_assoc();

    $userExist = boolval($row["COUNT(*)"]);//true/false czy user istnieje
    
    $messages = [];

    if($mailExist || $userExist){
        if($mailExist){
            array_push($messages, "Ten adres Email jest zajęty");
        }
        if($userExist){
            array_push($messages, "Ta nazwa użytkownika jest zajęta");
        }
        http_response_code(400);
        echo json_encode([
            "success" => false,
            "status" => 400,
            "message" => $messages
        ]);
    }else{
        $stmt = $conn->prepare("INSERT INTO users (nazwa, email, haslo) VALUES (?, ?, ?)"); //TODO: timestamp tworzenia
        $stmt->bind_param("sss", $username, $email, $password);
        
        if($stmt->execute()){
            http_response_code(201);
            echo json_encode([
                "success" => true,
                "status" => 201,
                "message" => "Użytkownik stworzony"
            ]);
            include 'auth_code.php';
        }else{
            http_response_code(503);
            echo json_encode([
                "success" => false,
                "status" => 503,
                "message" => "wystąpił błąd"
            ]);
        }
    }

    $stmt->close();
    $conn->close();
?>