<?php
require_once 'helpers.php';
cors_json_headers('http://localhost:5173', true);

$data = read_json_input();
$email = trim($data['email'] ?? '');
$password = $data['password'] ?? '';

include 'dbconnect.php';
ensure_app_schema($conn);

$stmt = $conn->prepare('SELECT id, nazwa, email, haslo, zatwierdzony, ban, ban_end, rola FROM users WHERE email = ?');
$stmt->bind_param('s', $email);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc();
$stmt->close();

if (!$user || !($password == $user['haslo'])) {
    json_response([
        'success' => false,
        'message' => 'Niepoprawne haslo lub email.',
        'type' => 'password'
    ], 401);
}

if ($user['zatwierdzony'] == null) {
    json_response([
        'success' => false,
        'message' => 'Weryfikacja wymagana.',
        'type' => 'verification'
    ]);
}

$isBanned = intval($user['ban'] ?? 0) === 1;
$banEnd = $user['ban_end'] ?? null;
if ($isBanned && ($banEnd === null || strtotime($banEnd) > time())) {
    json_response([
        'success' => false,
        'message' => 'Konto jest czasowo zbanowane.',
        'type' => 'ban',
        'ban_end' => $banEnd
    ], 403);
}

$cookieValue = json_encode([
    "id" => intval($user['id']),
    "username" => $user['nazwa'],
    "email" => $user['email'],
    "role" => $user['rola'] ?? 'user'
]);

setcookie("loggedas", $cookieValue, [
    'expires' => time() + 3600,
    'path' => '/',
    'secure' => false,
    'httponly' => false,
    'samesite' => 'Lax',
]);

json_response([
    'success' => true,
    'message' => 'Login successful',
    'user' => [
        "id" => intval($user['id']),
        "username" => $user['nazwa'],
        "email" => $user['email'],
        "role" => $user['rola'] ?? 'user'
    ]
]);
?>
