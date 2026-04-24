<?php
require_once 'helpers.php';
cors_json_headers();

$data = read_json_input();
$offerId = intval($data['id'] ?? 0);
$userId = intval($data['user_id'] ?? 0);

include 'dbconnect.php';
ensure_app_schema($conn);

if (!$offerId || !$userId) {
    json_response([
        'success' => false,
        'message' => 'Brak danych do aktualizacji ogloszenia.'
    ], 400);
}

$stmt = $conn->prepare(
    "SELECT oo.id, oo.id_zglasz, oo.ban, oz.id AS done_id
    FROM ogloszenia_oferty oo
    LEFT JOIN ogloszenia_zrobione oz ON oz.id_ogl = oo.id
    WHERE oo.id = ?"
);
$stmt->bind_param("i", $offerId);
$stmt->execute();
$offer = $stmt->get_result()->fetch_assoc();
$stmt->close();

if (!$offer || intval($offer['id_zglasz']) !== $userId) {
    json_response([
        'success' => false,
        'message' => 'Nie masz uprawnien do edycji tego ogloszenia.'
    ], 403);
}

if (intval($offer['ban']) === 1 || $offer['done_id'] !== null) {
    json_response([
        'success' => false,
        'message' => 'Mozna edytowac tylko aktywne ogloszenia.'
    ], 400);
}

$title = trim($data['tytul'] ?? '');
$city = trim($data['miasto'] ?? '');
$address = trim($data['adres'] ?? '');
$price = floatval($data['cena'] ?? 0);
$category = trim($data['kategoria'] ?? '');
$description = clamp_text($data['opis'] ?? '', 500);
$validUntil = trim($data['waznosc'] ?? '');

if ($title === '' || $city === '' || $address === '' || $price <= 0 || $category === '' || $validUntil === '') {
    json_response([
        'success' => false,
        'message' => 'Uzupelnij wszystkie wymagane pola.'
    ], 400);
}

$stmt = $conn->prepare(
    "UPDATE ogloszenia_oferty
    SET tytul = ?, kategoria = ?, miasto = ?, adres = ?, cena = ?, opis = ?, waznosc = ?
    WHERE id = ?"
);
$stmt->bind_param("ssssdssi", $title, $category, $city, $address, $price, $description, $validUntil, $offerId);

if (!$stmt->execute()) {
    $stmt->close();
    json_response([
        'success' => false,
        'message' => 'Nie udalo sie zapisac ogloszenia.'
    ], 503);
}
$stmt->close();

json_response([
    'success' => true,
    'message' => 'Ogloszenie zostalo zaktualizowane.'
]);
?>
