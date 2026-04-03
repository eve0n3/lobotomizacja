<?php
    header('Access-Control-Allow-Origin: *'); 
    header('Access-Control-Allow-Methods: POST,OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    header('Content-type: application/json');

    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { //wazne bez tego bledy nie dzialaja
    http_response_code(200);
    exit(0);
    }

    $dataJSON = file_get_contents('php://input');
    $data = json_decode( $dataJSON, TRUE ); //convert JSON into array
    
    $tytul = $data['tytul'];
    $miasto = $data['miasto'];
    $adres = $data['adres'];
    $cena = $data['cena'];
    $kategoria = $data['kategoria'];
    $opis = $data['opis'];

    $waznosc = $data['waznosc'];

    $id_tworca = $data['id_tworca'];
    
    include 'dbconnect.php';

    $sqlquery = "INSERT INTO ogloszenia_oferty
                (tytul, kategoria, miasto, adres, cena, opis, utworzenie, waznosc, id_zglasz)
                VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, ?, ?);";
    
    $stmt = $conn->prepare($sqlquery);
    $stmt->bind_param('ssssdssi', $tytul, $kategoria, $miasto, $adres, $cena, $opis, $waznosc, $id_tworca);

    /*
    echo json_encode([ "debugs1" => [
        "tytul"=>$tytul,
        "kateg"=>$kategoria,
        "miasto"=>$miasto,
        "adres"=>$adres,
        "cena"=>$cena,
        "opis"=>$opis,
        "waznosc"=>$waznosc,
        "tworca"=>$tworca  
    ]]);
    */

    if($stmt->execute()){
        echo json_encode([
            "success"=>true,
            "message"=>"ogloszenie dodane"
        ]);
    }else{
        echo json_encode([
            "success"=>false,
            "message"=>"coś nie działa"
        ]);
        http_response_code(503);
    }
?>