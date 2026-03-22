<?php
    header('Access-Control-Allow-Origin: http://localhost:5173'); 
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

$stmt = $conn->prepare('SELECT id, nazwa, email, haslo FROM users WHERE email = ?');
$stmt->bind_param('s', $email);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc();


if (!$user || !($password == $user['haslo'])) { //jebac bezpieczenstwo trzeba bedzie to poprawic

    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Nie poprawne hasło lub email']);
} else {
    setcookie("username", $user['nazwa'], [
        'expires'  => time() + 3600,
        'path'     => '/',
        'secure'   => false,        // true in production (HTTPS)
        'httponly' => false,        // must be false so JS can read it
        'samesite' => 'None',       // required for cross-origin
    ]);

    echo json_encode([
        'success' => true,
        'message' => 'Login successful', 
    ]);
}

$stmt->close();
$conn->close();
   
?>