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
    

    //połączenie z bazą danych
    include 'dbconnect.php';


    $kod= random_int(1000, 9999);

    $kod_zapisywanie = $conn->prepare('UPDATE users SET kod = ?, kod_wygasniecie = DATE_ADD(NOW(), INTERVAL 15 MINUTE) WHERE email = ?');
    $kod_zapisywanie->bind_param('is', $kod, $email);
    $kod_zapisywanie->execute();   
    
  
$apiUrl = "https://smtp.maileroo.com/api/v2/emails";
$env = parse_ini_file('.env');
$apiKey = $env["API_KEY"];

$request_body = [
    "from" => [
        "address" => "sender@ew0r.cc" //tu możemy dać cokolwiek byle się domena zgadzała
    ],
    "to" => [
        [
            "address" => $email
        ]
    ],
    "subject" => "Rejestracja konta na sprzontando",
    "html" => "<h2>Witaj!</h2><p>Cieszymy się że postanowiłeś założyć konto na naszym portalu.</p>
    <p>Aby dokończyć proces rejestracji prosimy wspisać poniższy kod na naszej stronie:</p>
                <h1>$kod</h1>",
    "plain" => "Witaj! Cieszymy się że postanowiłeś założyć konto na naszym portalu.
                aby dokończyć proces rejestracji prosimy wpisać poniższy kod na naszej stronie: $kod"
];


$request = curl_init($apiUrl);

curl_setopt($request, CURLOPT_POST, true); #metoda = POST
curl_setopt($request, CURLOPT_POSTFIELDS, json_encode($request_body)); #tego jsona podpinamy
curl_setopt($request, CURLOPT_RETURNTRANSFER, true); #można przypisać response do zmiennej
curl_setopt($request, CURLOPT_HTTPHEADER, [  #ustawiamy nagłówki
    "Content-Type: application/json",
    "x-api-key: " . $apiKey
]);

$response = curl_exec($request);
$httpCode = curl_getinfo($request, CURLINFO_HTTP_CODE);

if ($httpCode != 200) {
    echo json_encode([
        "success" => "false",
        "message" => "Nie udało się wysłać wiadomości. Błąd: ".$httpCode, //jeśli problem po stronie curl a nie serwera, zwraca 0
        //"response" => json_decode($response)
        
    ]);
} else {
    echo json_encode([
        "succes" => "true",
        "message" => "Wiadomość została wysłana na podany adres e-mail",
        //"response" => json_decode($response)
        
    ]);
}

curl_close($request);
    ?>