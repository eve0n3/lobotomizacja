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
    $data = json_decode( $dataJSON, true ); //convert JSON into array
    $email = trim($data['email']); 
    $kod = trim($data['kod']); 

    

    //połączenie z bazą danych
    include 'dbconnect.php';

    
    $stmt = $conn->prepare('SELECT kod, zatwierdzony FROM users WHERE email = ?');
    $stmt->bind_param('s',$email);
    $stmt->execute();   

    $res = $stmt->get_result();
    $odp_kod = $res->fetch_assoc();

    if ($odp_kod["zatwierdzony"] == null){
        

            if ($kod == $odp_kod["kod"]){
                $stmt = $conn->prepare('UPDATE users SET zatwierdzony = TRUE WHERE email = ?');
                $stmt->bind_param('s',$email);
                $stmt->execute(); 
                
                $stmt = $conn->prepare('UPDATE users SET kod=NULL WHERE email = ?');
                $stmt->bind_param('s',$email);
                $stmt->execute();

                echo json_encode([
                    "success" => true,
                    "message" => "Poprawny kod!! Proces rejestracji zakończony sukcesem"
                        
                ]);

            } else{
                echo json_encode([
                    "success" => false,
                    "message" => "Kod niepoprawny!!"
                ]);
            }
        }
    


         else{
        echo json_encode([
            "success" => false,
            "message" => "Ten użytkownik jest już zatwierdzony"
        ]);
        }

?>