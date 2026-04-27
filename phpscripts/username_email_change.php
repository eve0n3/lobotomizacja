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

    $user_id = $data["user_id"];
    $username = $data['username'] ?? null;
    $email = $data['email'] ?? null;

    //połączenie z bazą danych
    include 'dbconnect.php';

    //robimy template i podstawiamy  email
    if(!is_null($email)){  
        $stmt = $conn->prepare('SELECT COUNT(*) FROM users WHERE email = ?');
        $stmt->bind_param("s", $email);
        $stmt->execute();
    
        $res = $stmt->get_result();
        $row = $res->fetch_assoc();

        $mailExist = boolval($row["COUNT(*)"]);//true/false czy mail istnieje
    }

    //to samo tylko username
    if(!is_null($username)){ 
        $stmt = $conn->prepare('SELECT COUNT(*) FROM users WHERE nazwa = ?');
        $stmt->bind_param("s", $username);
        $stmt->execute();

        $res = $stmt->get_result();
        $row = $res->fetch_assoc();

        $userExist = boolval($row["COUNT(*)"]);//true/false czy user istnieje
    }
    
    $messages = [];


    $criteria = [];
    $params = [];
    $paramTypes = "";
    $sqlQueryStart = "UPDATE users SET ";

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
        if(!is_null($username)){
            $stmt = $conn->prepare('SELECT nazwa FROM users WHERE id = ?');
            $stmt->bind_param("s", $user_id);
            $stmt->execute();

            $res = $stmt->get_result();
            $user = $res->fetch_assoc();
            if($username == $user['nazwa']){
                http_response_code(401);
                echo json_encode([
                    'success' => false, 
                    'message' => 'Nowa nazwa uzytkownika nie może być taka sama jak stara'
                     ]);
            }else{
                array_push($criteria, "nazwa = ?");
                array_push($params, $username);
                $paramTypes .= "s";
            }
        }

        if(!is_null($email)){
            $stmt = $conn->prepare('SELECT email FROM users WHERE id = ?');
            $stmt->bind_param("s", $user_id);
            $stmt->execute();

            $res = $stmt->get_result();
            $user = $res->fetch_assoc();
            if($email == $user['email']){
                 http_response_code(401);
                echo json_encode([
                    'success' => false, 
                    'message' => 'Nowy email nie może być taki sam jak stary'
                     ]);

            }else{
                array_push($criteria, "email = ?");
                array_push($params, $email);
                $paramTypes .= "s";
            }
        }

        if(!empty($criteria)){
            $sqlQueryStart .= join(", ", $criteria);

            array_push($params, $user_id);
            $paramTypes .= "i";
            $sqlQueryEnd = " WHERE id = ?";
            $sqlQuery = $sqlQueryStart.$sqlQueryEnd;
            echo json_encode($sqlQuery);
            $stmt = $conn->prepare($sqlQuery);
            $stmt->bind_param($paramTypes, ...$params);


            if($stmt->execute()){
                http_response_code(200);
                echo json_encode([
                    "success" => true,
                    "message" => "Dane zostaly zmienione"
                ]);
            
            }else{
                http_response_code(503);
                echo json_encode([
                    "success" => false,
                    "message" => "wystąpił błąd"
                ]);
        }
        }else{
            http_response_code(400);
            echo json_encode([
                "success" => false,
                "message" => "Nie podano żadnych prawidłowych danych"
            ]);
        }

        
      
    }

    $stmt->close();
    $conn->close();
?>