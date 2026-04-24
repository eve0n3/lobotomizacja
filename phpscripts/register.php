<?php
require_once 'helpers.php';
cors_json_headers();

$data = read_json_input();
$username = trim($data['username'] ?? '');
$email = trim($data['email'] ?? '');
$password = $data['password'] ?? '';

include 'dbconnect.php';
ensure_app_schema($conn);

if ($username === '' || $email === '' || $password === '') {
    json_response([
        "success" => false,
        "status" => 400,
        "message" => ["Uzupelnij wszystkie pola."]
    ], 400);
}

$stmt = $conn->prepare('SELECT COUNT(*) AS count FROM users WHERE email = ?');
$stmt->bind_param("s", $email);
$stmt->execute();
$mailExist = intval($stmt->get_result()->fetch_assoc()["count"]) > 0;
$stmt->close();

$stmt = $conn->prepare('SELECT COUNT(*) AS count FROM users WHERE nazwa = ?');
$stmt->bind_param("s", $username);
$stmt->execute();
$userExist = intval($stmt->get_result()->fetch_assoc()["count"]) > 0;
$stmt->close();

$messages = [];
if ($mailExist) {
    $messages[] = "Ten adres Email jest zajety";
}
if ($userExist) {
    $messages[] = "Ta nazwa uzytkownika jest zajeta";
}

if (count($messages) > 0) {
    json_response([
        "success" => false,
        "status" => 400,
        "message" => $messages
    ], 400);
}

$stmt = $conn->prepare("INSERT INTO users (nazwa, email, haslo, utworzenie, ban, rola) VALUES (?, ?, ?, CURRENT_TIMESTAMP, 0, 'user')");
$stmt->bind_param("sss", $username, $email, $password);

if ($stmt->execute()) {
    $stmt->close();
    http_response_code(201);
    include 'auth_code.php';
    exit;
}

$stmt->close();
json_response([
    "success" => false,
    "status" => 503,
    "message" => "Wystapil blad."
], 503);
?>
