<?php
require_once 'helpers.php';
cors_json_headers();

$data = read_json_input();
$userId = intval($data['user_id'] ?? 0);
$action = $data['action'] ?? 'get';

include 'dbconnect.php';
ensure_app_schema($conn);

if (!$userId) {
    json_response([
        'success' => false,
        'message' => 'Brak identyfikatora uzytkownika.'
    ], 400);
}

if ($action === 'get') {
    $stmt = $conn->prepare("SELECT id, nazwa, email, utworzenie, ban, ban_end, rola FROM users WHERE id = ?");
    $stmt->bind_param("i", $userId);
    $stmt->execute();
    $result = $stmt->get_result();
    $user = $result->fetch_assoc();
    $stmt->close();

    if (!$user) {
        json_response([
            'success' => false,
            'message' => 'Nie znaleziono uzytkownika.'
        ], 404);
    }

    json_response([
        'success' => true,
        'data' => $user
    ]);
}

if ($action === 'update') {
    $username = trim($data['username'] ?? '');
    $email = trim($data['email'] ?? '');
    $password = trim($data['password'] ?? '');

    if ($username === '' || $email === '') {
        json_response([
            'success' => false,
            'message' => ['Nazwa i email sa wymagane.']
        ], 400);
    }

    $messages = [];

    $stmt = $conn->prepare("SELECT id FROM users WHERE email = ? AND id <> ?");
    $stmt->bind_param("si", $email, $userId);
    $stmt->execute();
    if ($stmt->get_result()->fetch_assoc()) {
        $messages[] = 'Ten adres email jest zajety.';
    }
    $stmt->close();

    $stmt = $conn->prepare("SELECT id FROM users WHERE nazwa = ? AND id <> ?");
    $stmt->bind_param("si", $username, $userId);
    $stmt->execute();
    if ($stmt->get_result()->fetch_assoc()) {
        $messages[] = 'Ta nazwa uzytkownika jest zajeta.';
    }
    $stmt->close();

    if (count($messages) > 0) {
        json_response([
            'success' => false,
            'message' => $messages
        ], 400);
    }

    if ($password !== '') {
        $stmt = $conn->prepare("UPDATE users SET nazwa = ?, email = ?, haslo = ? WHERE id = ?");
        $stmt->bind_param("sssi", $username, $email, $password, $userId);
    } else {
        $stmt = $conn->prepare("UPDATE users SET nazwa = ?, email = ? WHERE id = ?");
        $stmt->bind_param("ssi", $username, $email, $userId);
    }

    if (!$stmt->execute()) {
        $stmt->close();
        json_response([
            'success' => false,
            'message' => 'Nie udalo sie zapisac zmian.'
        ], 503);
    }
    $stmt->close();

    $stmt = $conn->prepare("SELECT id, nazwa, email, utworzenie, ban, ban_end, rola FROM users WHERE id = ?");
    $stmt->bind_param("i", $userId);
    $stmt->execute();
    $updated = $stmt->get_result()->fetch_assoc();
    $stmt->close();

    json_response([
        'success' => true,
        'message' => 'Dane uzytkownika zostaly zaktualizowane.',
        'data' => $updated
    ]);
}

json_response([
    'success' => false,
    'message' => 'Nieznana akcja.'
], 400);
?>
