<?php
require_once 'helpers.php';
cors_json_headers();

$data = read_json_input();

$tytul = trim($data['tytul'] ?? '');
$miasto = trim($data['miasto'] ?? '');
$adres = trim($data['adres'] ?? '');
$cena = floatval($data['cena'] ?? 0);
$kategoria = trim($data['kategoria'] ?? '');
$opis = clamp_text($data['opis'] ?? '', 500);
$waznosc = trim($data['waznosc'] ?? '');
$id_tworca = intval($data['id_tworca'] ?? 0);

if ($tytul === '' || $miasto === '' || $adres === '' || $cena <= 0 || $kategoria === '' || $waznosc === '' || !$id_tworca) {
    json_response([
        "success" => false,
        "message" => "Uzupelnij wszystkie wymagane pola."
    ], 400);
}

include 'dbconnect.php';
ensure_app_schema($conn);

$sqlquery = "INSERT INTO ogloszenia_oferty
            (tytul, kategoria, miasto, adres, cena, opis, utworzenie, waznosc, id_zglasz, ban)
            VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, ?, ?, 0)";

$stmt = $conn->prepare($sqlquery);
$stmt->bind_param('ssssdssi', $tytul, $kategoria, $miasto, $adres, $cena, $opis, $waznosc, $id_tworca);

if ($stmt->execute()) {
    $newId = $stmt->insert_id;
    $stmt->close();
    json_response([
        "success" => true,
        "message" => "Ogloszenie dodane.",
        "id" => $newId
    ]);
}

$stmt->close();
json_response([
    "success" => false,
    "message" => "Nie udalo sie dodac ogloszenia."
], 503);
?>
