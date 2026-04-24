<?php
require_once 'helpers.php';
cors_json_headers();

$data = read_json_input();
$id_ogl = intval($data["id_ogl"] ?? 0);
$id_chetnego = intval($data["id_chetnego"] ?? 0);

include 'dbconnect.php';
ensure_app_schema($conn);

if (!$id_ogl || !$id_chetnego) {
    json_response([
        "success" => false,
        "message" => "Brak danych zgloszenia."
    ], 400);
}

$offerStmt = $conn->prepare("SELECT id_zglasz, ban FROM ogloszenia_oferty WHERE id = ?");
$offerStmt->bind_param("i", $id_ogl);
$offerStmt->execute();
$offer = $offerStmt->get_result()->fetch_assoc();
$offerStmt->close();

if (!$offer) {
    json_response([
        "success" => false,
        "message" => "Nie znaleziono ogloszenia."
    ], 404);
}

if (intval($offer["ban"]) === 1) {
    json_response([
        "success" => false,
        "message" => "Nie mozna zglosic sie do zbanowanego ogloszenia."
    ], 400);
}

if (intval($offer["id_zglasz"]) === $id_chetnego) {
    json_response([
        "success" => false,
        "message" => "Nie mozna zglosic sie do wlasnej oferty."
    ], 400);
}

$duplicateStmt = $conn->prepare("SELECT id FROM chetny WHERE id_ogloszenia = ? AND id_chetnego = ?");
$duplicateStmt->bind_param("ii", $id_ogl, $id_chetnego);
$duplicateStmt->execute();
$duplicate = $duplicateStmt->get_result()->fetch_assoc();
$duplicateStmt->close();

if ($duplicate) {
    json_response([
        "success" => false,
        "message" => "Juz zglosiles sie do tej oferty."
    ], 409);
}

$stmt = $conn->prepare("INSERT INTO chetny (id_ogloszenia, id_chetnego, zgloszenie) VALUES (?, ?, CURRENT_TIMESTAMP)");
$stmt->bind_param('ii', $id_ogl, $id_chetnego);

if ($stmt->execute()) {
    $stmt->close();
    json_response([
        "success" => true,
        "message" => "Zgloszono do ogloszenia."
    ]);
}

$stmt->close();
json_response([
    "success" => false,
    "message" => "Wystapil blad."
], 503);
?>
