<?php
require_once 'helpers.php';
cors_json_headers();

read_json_input();

include 'dbconnect.php';
ensure_app_schema($conn);

$sqlQuery = "SELECT
    users.id,
    users.nazwa,
    ROUND(CAST(AVG(ogloszenia_zrobione.ocena) AS DECIMAL(4,2)), 2) AS avgocena,
    COUNT(ogloszenia_zrobione.ocena) AS liczba_ocen
FROM ogloszenia_zrobione
JOIN users ON ogloszenia_zrobione.id_wykon = users.id
WHERE ogloszenia_zrobione.ocena IS NOT NULL
GROUP BY users.id, users.nazwa
ORDER BY avgocena DESC, liczba_ocen DESC
LIMIT 10";

$stmt = $conn->prepare($sqlQuery);

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
    "message" => "Tymczasowy blad, prosze sprobowac pozniej."
], 503);
?>
