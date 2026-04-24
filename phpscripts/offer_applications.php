<?php
require_once 'helpers.php';
cors_json_headers();

$data = read_json_input();
$action = $data['action'] ?? 'list';
$offerId = intval($data['offer_id'] ?? 0);

include 'dbconnect.php';
ensure_app_schema($conn);

if (!$offerId) {
    json_response([
        'success' => false,
        'message' => 'Brak identyfikatora ogloszenia.'
    ], 400);
}

function offer_owner_id($conn, $offerId) {
    $stmt = $conn->prepare("SELECT id_zglasz FROM ogloszenia_oferty WHERE id = ?");
    $stmt->bind_param("i", $offerId);
    $stmt->execute();
    $result = $stmt->get_result();
    $offer = $result->fetch_assoc();
    $stmt->close();
    return $offer ? intval($offer['id_zglasz']) : null;
}

if ($action === 'list') {
    $stmt = $conn->prepare(
        "SELECT
            c.id AS application_id,
            c.id_chetnego,
            c.zgloszenie,
            u.nazwa,
            u.email,
            COALESCE(ROUND(AVG(oz.ocena), 2), 0) AS avgocena,
            COUNT(oz.ocena) AS completed_count
        FROM chetny c
        JOIN users u ON u.id = c.id_chetnego
        LEFT JOIN ogloszenia_zrobione oz ON oz.id_wykon = u.id AND oz.ocena IS NOT NULL
        WHERE c.id_ogloszenia = ?
        GROUP BY c.id, c.id_chetnego, c.zgloszenie, u.nazwa, u.email
        ORDER BY c.zgloszenie DESC"
    );
    $stmt->bind_param("i", $offerId);
    $stmt->execute();
    $rows = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
    $stmt->close();

    foreach ($rows as &$row) {
        $candidateId = intval($row['id_chetnego']);
        $recentStmt = $conn->prepare(
            "SELECT oo.tytul, oz.ocena, oz.ocena_slowna, oz.ocena_opis, oz.ocena_data
            FROM ogloszenia_zrobione oz
            JOIN ogloszenia_oferty oo ON oo.id = oz.id_ogl
            WHERE oz.id_wykon = ? AND oz.ocena IS NOT NULL
            ORDER BY COALESCE(oz.ocena_data, oz.id) DESC
            LIMIT 3"
        );
        $recentStmt->bind_param("i", $candidateId);
        $recentStmt->execute();
        $row['recent_jobs'] = $recentStmt->get_result()->fetch_all(MYSQLI_ASSOC);
        $recentStmt->close();
    }

    $selectionStmt = $conn->prepare(
        "SELECT oz.id_ogl, oz.id_wykon, oz.ocena, oz.ocena_slowna, oz.ocena_opis, oz.ocena_data, u.nazwa
        FROM ogloszenia_zrobione oz
        JOIN users u ON u.id = oz.id_wykon
        WHERE oz.id_ogl = ?"
    );
    $selectionStmt->bind_param("i", $offerId);
    $selectionStmt->execute();
    $selection = $selectionStmt->get_result()->fetch_assoc();
    $selectionStmt->close();

    json_response([
        'success' => true,
        'data' => $rows,
        'selection' => $selection
    ]);
}

if ($action === 'choose') {
    $ownerId = intval($data['owner_id'] ?? 0);
    $performerId = intval($data['performer_id'] ?? 0);
    $realOwnerId = offer_owner_id($conn, $offerId);

    if (!$ownerId || !$performerId || $realOwnerId !== $ownerId) {
        json_response([
            'success' => false,
            'message' => 'Nie mozna wybrac wykonawcy dla tego ogloszenia.'
        ], 403);
    }

    $checkStmt = $conn->prepare("SELECT id FROM chetny WHERE id_ogloszenia = ? AND id_chetnego = ?");
    $checkStmt->bind_param("ii", $offerId, $performerId);
    $checkStmt->execute();
    $application = $checkStmt->get_result()->fetch_assoc();
    $checkStmt->close();

    if (!$application) {
        json_response([
            'success' => false,
            'message' => 'Wybrany uzytkownik nie zglosil sie do oferty.'
        ], 400);
    }

    $stmt = $conn->prepare(
        "INSERT INTO ogloszenia_zrobione (id_ogl, id_wykon, ocena, ocena_slowna, ocena_opis, ocena_data, wybrano)
        VALUES (?, ?, NULL, NULL, NULL, NULL, NOW())
        ON DUPLICATE KEY UPDATE id_wykon = VALUES(id_wykon), ocena = NULL, ocena_slowna = NULL, ocena_opis = NULL, ocena_data = NULL, wybrano = NOW()"
    );
    $stmt->bind_param("ii", $offerId, $performerId);

    if (!$stmt->execute()) {
        $stmt->close();
        json_response([
            'success' => false,
            'message' => 'Nie udalo sie wybrac wykonawcy.'
        ], 503);
    }
    $stmt->close();

    json_response([
        'success' => true,
        'message' => 'Wykonawca zostal wybrany.'
    ]);
}

if ($action === 'rate') {
    $ownerId = intval($data['owner_id'] ?? 0);
    $rating = intval($data['rating'] ?? 0);
    $label = clamp_text($data['label'] ?? '', 50);
    $description = clamp_text($data['description'] ?? '', 255);
    $realOwnerId = offer_owner_id($conn, $offerId);

    if (!$ownerId || $realOwnerId !== $ownerId) {
        json_response([
            'success' => false,
            'message' => 'Nie mozna ocenic tej oferty.'
        ], 403);
    }

    if ($rating < 1 || $rating > 5) {
        json_response([
            'success' => false,
            'message' => 'Ocena musi byc w zakresie od 1 do 5.'
        ], 400);
    }

    $stmt = $conn->prepare(
        "UPDATE ogloszenia_zrobione
        SET ocena = ?, ocena_slowna = ?, ocena_opis = ?, ocena_data = NOW()
        WHERE id_ogl = ?"
    );
    $stmt->bind_param("issi", $rating, $label, $description, $offerId);

    if (!$stmt->execute() || $stmt->affected_rows === 0) {
        $stmt->close();
        json_response([
            'success' => false,
            'message' => 'Najpierw wybierz wykonawce.'
        ], 400);
    }
    $stmt->close();

    json_response([
        'success' => true,
        'message' => 'Ocena zostala zapisana.'
    ]);
}

json_response([
    'success' => false,
    'message' => 'Nieznana akcja.'
], 400);
?>
