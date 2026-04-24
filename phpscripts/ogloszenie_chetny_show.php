<?php
require_once 'helpers.php';
cors_json_headers();

$data = read_json_input();
$id_ogl = $data["id_ogl"] ?? null;
$id_chetnego = $data["id_chetnego"] ?? null;

include 'dbconnect.php';
ensure_app_schema($conn);

if (!is_null($id_chetnego)) {
    $sqlquery = "SELECT id_ogloszenia FROM chetny WHERE id_chetnego = ?";
    $param = intval($id_chetnego);
} elseif (!is_null($id_ogl)) {
    $sqlquery = "SELECT id_chetnego FROM chetny WHERE id_ogloszenia = ?";
    $param = intval($id_ogl);
} else {
    json_response([
        "success" => false,
        "message" => "Brak kryteriow wyszukiwania."
    ], 400);
}

$stmt = $conn->prepare($sqlquery);
$stmt->bind_param("i", $param);

if ($stmt->execute()) {
    $rows = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
    $stmt->close();
    json_response([
        "success" => true,
        "data" => $rows
    ]);
}

$stmt->close();
json_response([
    "success" => false,
    "message" => "Prosze sprobowac ponownie pozniej."
], 503);
?>
