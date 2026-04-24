<?php
require_once 'helpers.php';
cors_json_headers();

$data = read_json_input();

$offerId = $data["offerId"] ?? null;
$tytul = $data["tytul"] ?? null;
$miasto = $data["miasto"] ?? null;
$kategoria = $data["kategoria"] ?? null;
$minCena = $data["minCena"] ?? null;
$maxCena = $data["maxCena"] ?? null;
$ownerId = $data["ownerId"] ?? null;
$appliedUserId = $data["appliedUserId"] ?? null;
$selectedUserId = $data["selectedUserId"] ?? null;
$status = $data["status"] ?? null;

$page = intval($data["page"] ?? 1);
$limit = intval($data["limit"] ?? 24);
$page = max(1, $page);
$limit = min(max(1, $limit), 100);
$offset = ($page - 1) * $limit;

include 'dbconnect.php';
ensure_app_schema($conn);

$sql = "SELECT
    oo.*,
    oz.id_wykon AS selected_user_id,
    selected_user.nazwa AS selected_username,
    oz.ocena AS wykonawca_ocena,
    oz.ocena_slowna,
    oz.ocena_opis,
    CASE
        WHEN oo.ban = 1 THEN 'banned'
        WHEN oz.id IS NOT NULL THEN 'finished'
        ELSE 'active'
    END AS status
FROM ogloszenia_oferty oo
LEFT JOIN ogloszenia_zrobione oz ON oz.id_ogl = oo.id
LEFT JOIN users selected_user ON selected_user.id = oz.id_wykon";

$criteria = [];
$params = [];
$types = "";

if (!is_null($appliedUserId)) {
    $sql .= " JOIN chetny applied_filter ON applied_filter.id_ogloszenia = oo.id AND applied_filter.id_chetnego = ?";
    $params[] = intval($appliedUserId);
    $types .= "i";
}

if (!is_null($offerId)) {
    $criteria[] = "oo.id = ?";
    $params[] = intval($offerId);
    $types .= "i";
}

if (!is_null($tytul) && trim($tytul) !== '') {
    $criteria[] = "oo.tytul LIKE ?";
    $params[] = "%" . trim($tytul) . "%";
    $types .= "s";
}

if (!is_null($miasto) && trim($miasto) !== '') {
    $criteria[] = "LOWER(oo.miasto) LIKE LOWER(?)";
    $params[] = "%" . trim($miasto) . "%";
    $types .= "s";
}

if (!is_null($kategoria) && trim($kategoria) !== '') {
    $criteria[] = "LOWER(oo.kategoria) LIKE LOWER(?)";
    $params[] = "%" . trim($kategoria) . "%";
    $types .= "s";
}

if (!is_null($minCena) && $minCena !== '') {
    $criteria[] = "oo.cena >= ?";
    $params[] = floatval($minCena);
    $types .= "d";
}

if (!is_null($maxCena) && $maxCena !== '') {
    $criteria[] = "oo.cena <= ?";
    $params[] = floatval($maxCena);
    $types .= "d";
}

if (!is_null($ownerId)) {
    $criteria[] = "oo.id_zglasz = ?";
    $params[] = intval($ownerId);
    $types .= "i";
}

if (!is_null($selectedUserId)) {
    $criteria[] = "oz.id_wykon = ?";
    $params[] = intval($selectedUserId);
    $types .= "i";
}

if ($status === 'active') {
    $criteria[] = "oo.ban = 0 AND oz.id IS NULL";
} elseif ($status === 'finished') {
    $criteria[] = "oo.ban = 0 AND oz.id IS NOT NULL";
} elseif ($status === 'banned') {
    $criteria[] = "oo.ban = 1";
} else {
    $criteria[] = "oo.ban = 0";
}

if (count($criteria) > 0) {
    $sql .= " WHERE " . join(" AND ", $criteria);
}

$sql .= " ORDER BY oo.utworzenie DESC LIMIT ? OFFSET ?";
$params[] = $limit;
$params[] = $offset;
$types .= "ii";

$stmt = $conn->prepare($sql);
if (!$stmt) {
    json_response([
        "success" => false,
        "message" => "Nie udalo sie przygotowac zapytania."
    ], 503);
}

$stmt->bind_param($types, ...$params);

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
