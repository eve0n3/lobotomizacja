<?php


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
        $mysql_date = $odp_kod["kod_wygasniecie"];
        $expire_data= new DateTime($mysql_date);
        $teraz = new DateTime();


        if ($expire_data<=$teraz){
            echo json_encode([               
            "succes" => "false",
            "message" => "Kod wygasł, wygeneruj nowy"
            ]);
        } else{
            if ($kod == $odp_kod["kod"]){
                echo json_encode([
                    "succes" => "true",
                    "message" => "Poprawny kod!! Proces rejestracji zakończony sukcesem"
                        $stmt = $conn->prepare('UPDATE users SET zatwierdzony = TRUE WHERE email = ?');
                        $stmt->bind_param('s',$email);
                        $stmt->execute();   

                ]);

            } else{
                echo json_encode([
                    "succes" => "false",
                    "message" => "Kod niepoprawny!!"
                ]);
            }
        }
    


        } else{
        echo json_encode([
            "succes" => "false",
            "message" => "Ten użytkownik jest już zatwierdzony"
        ]);
        }

?>