<?php
    header('Access-Control-Allow-Origin: http://localhost:5173'); //domena na produkcji 
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
    $email = trim($data['email']); 
    $password = $data['password'];

    //połączenie z bazą danych
    include 'dbconnect.php';

$stmt = $conn->prepare('SELECT id, nazwa, email, haslo, zatwierdzony, admin FROM users WHERE email = ?');
$stmt->bind_param('s', $email);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc();


if (!$user || !password_verify($password, $user["haslo"])) { //jebac bezpieczenstwo trzeba bedzie to poprawic
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Nie poprawne hasło lub email', 'type' => 'password']);
} else {
    if ($user["zatwierdzony"] == 0){
        echo json_encode([
        'success' => false,
        'message' => 'Weryfikacja wymagana', 
        'type' => 'verification'
        
    ]);
    }
    else{

        $stmt1 = $conn->prepare("SELECT IF(ban_end>NOW(), true, false) AS czy_ban, ban_end, id FROM users WHERE id = ?;");
        $stmt1->bind_param("i", $user['id']);

        if($stmt1->execute()){
            $res = $stmt1->get_result();
            $rows = $res->fetch_assoc();

            if((int)$rows["czy_ban"] === 1){
                echo json_encode([
                "success"=>false,
                "message"=>"użytkownik zbanowany",
                "ban_end" => $rows["ban_end"],
                ]);
            }else{
                if(!is_null($rows["ban_end"]) && $rows["ban_end"] < date("Y-m-d H:i:s")){
                    $stmt2 = $conn->prepare("UPDATE users SET ban_data = null, ban_end = null, ban = 0 WHERE id = ?;");
                    $stmt2->bind_param("i", $user["id"]);
                    
                    if($stmt2->execute()){
                        setcookie("loggedas", 
                        json_encode([
                        "id"=>$user['id'],
                        "username"=>$user['nazwa'],
                        "admin"=>$user['admin']
                        ]),
                        [
                        'expires'  => time() + 3600,
                        'path'     => '/',
                        'secure'   => true,        // true in production (HTTPS)
                        'httponly' => false,        // must be false so JS can read it
                        'samesite' => 'None',       // required for cross-origin
                        ]);

                        echo json_encode([
                        'success' => true,
                        'message' => 'Zalogowano pomyślnie i użytkownik odbanowany', 
                        ]);
                    }
                }else{
                    setcookie("loggedas", 
                    json_encode([
                    "id"=>$user['id'],
                    "username"=>$user['nazwa'],
                    "admin"=>$user['admin']
                    ]),
                    [
                    'expires'  => time() + 3600,
                    'path'     => '/',
                    'secure'   => true,        // true in production (HTTPS)
                    'httponly' => false,        // must be false so JS can read it
                    'samesite' => 'None',       // required for cross-origin
                    ]);

                    echo json_encode([
                    'success' => true,
                    'message' => 'Pomyślnie zalogowano', 
                    ]);
                    }
            }
                
        }  
    }
}

$stmt->close();
$conn->close();
   
?>