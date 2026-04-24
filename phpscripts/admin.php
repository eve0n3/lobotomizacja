<?php
require_once 'helpers.php';
cors_json_headers();

$data = read_json_input();
$action = $data['action'] ?? '';
$adminId = intval($data['admin_id'] ?? 0);

include 'dbconnect.php';
ensure_app_schema($conn);

if ($action === 'reportOffer') {
    $offerId = intval($data['offer_id'] ?? 0);
    $userId = intval($data['user_id'] ?? 0);
    $reason = clamp_text($data['reason'] ?? '', 255);

    if (!$offerId || !$userId) {
        json_response([
            'success' => false,
            'message' => 'Zaloguj sie, aby zglosic ogloszenie.'
        ], 400);
    }

    $stmt = $conn->prepare(
        "INSERT INTO zgloszenia_ogloszen (id_ogloszenia, id_zglaszajacy, powod)
        VALUES (?, ?, ?)"
    );
    $stmt->bind_param("iis", $offerId, $userId, $reason);

    if (!$stmt->execute()) {
        $stmt->close();
        json_response([
            'success' => false,
            'message' => 'Nie udalo sie zapisac zgloszenia.'
        ], 503);
    }
    $stmt->close();

    json_response([
        'success' => true,
        'message' => 'Zgloszenie zostalo przekazane administratorowi.'
    ]);
}

require_admin($conn, $adminId);

if ($action === 'banOffer') {
    $offerId = intval($data['offer_id'] ?? 0);
    $ban = intval($data['ban'] ?? 1);

    $stmt = $conn->prepare("UPDATE ogloszenia_oferty SET ban = ? WHERE id = ?");
    $stmt->bind_param("ii", $ban, $offerId);
    $ok = $stmt->execute();
    $stmt->close();

    json_response([
        'success' => $ok,
        'message' => $ok ? 'Status ogloszenia zostal zmieniony.' : 'Nie udalo sie zmienic statusu ogloszenia.'
    ], $ok ? 200 : 503);
}

if ($action === 'getReports') {
    $stmt = $conn->prepare(
        "SELECT
            z.id,
            z.id_ogloszenia,
            z.id_zglaszajacy,
            z.powod,
            z.status,
            z.utworzenie,
            oo.tytul,
            oo.ban,
            u.nazwa AS zglaszajacy
        FROM zgloszenia_ogloszen z
        JOIN ogloszenia_oferty oo ON oo.id = z.id_ogloszenia
        JOIN users u ON u.id = z.id_zglaszajacy
        ORDER BY z.status = 'new' DESC, z.utworzenie DESC"
    );
    $stmt->execute();
    $rows = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
    $stmt->close();

    json_response([
        'success' => true,
        'data' => $rows
    ]);
}

if ($action === 'resolveReport') {
    $reportId = intval($data['report_id'] ?? 0);
    $decision = $data['decision'] ?? 'ok';

    $stmt = $conn->prepare("SELECT id_ogloszenia FROM zgloszenia_ogloszen WHERE id = ?");
    $stmt->bind_param("i", $reportId);
    $stmt->execute();
    $report = $stmt->get_result()->fetch_assoc();
    $stmt->close();

    if (!$report) {
        json_response([
            'success' => false,
            'message' => 'Nie znaleziono zgloszenia.'
        ], 404);
    }

    if ($decision === 'ban') {
        $offerId = intval($report['id_ogloszenia']);
        $banStmt = $conn->prepare("UPDATE ogloszenia_oferty SET ban = 1 WHERE id = ?");
        $banStmt->bind_param("i", $offerId);
        $banStmt->execute();
        $banStmt->close();
        $status = 'banned';
    } else {
        $status = 'ok';
    }

    $stmt = $conn->prepare("UPDATE zgloszenia_ogloszen SET status = ?, rozpatrzono = NOW() WHERE id = ?");
    $stmt->bind_param("si", $status, $reportId);
    $ok = $stmt->execute();
    $stmt->close();

    json_response([
        'success' => $ok,
        'message' => $ok ? 'Zgloszenie zostalo rozpatrzone.' : 'Nie udalo sie rozpatrzyc zgloszenia.'
    ], $ok ? 200 : 503);
}

if ($action === 'lowRatedUsers') {
    $stmt = $conn->prepare(
        "SELECT
            u.id,
            u.nazwa,
            u.email,
            u.ban,
            u.ban_end,
            ROUND(AVG(oz.ocena), 2) AS avgocena,
            COUNT(oz.ocena) AS completed_count
        FROM users u
        JOIN ogloszenia_zrobione oz ON oz.id_wykon = u.id AND oz.ocena IS NOT NULL
        GROUP BY u.id, u.nazwa, u.email, u.ban, u.ban_end
        HAVING avgocena <= 3
        ORDER BY avgocena ASC, completed_count DESC"
    );
    $stmt->execute();
    $rows = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
    $stmt->close();

    json_response([
        'success' => true,
        'data' => $rows
    ]);
}

if ($action === 'banUser') {
    $userId = intval($data['user_id'] ?? 0);
    $days = intval($data['days'] ?? 7);
    if ($days < 1) {
        $days = 1;
    }

    $stmt = $conn->prepare(
        "UPDATE users
        SET ban = 1, ban_data = NOW(), ban_end = DATE_ADD(NOW(), INTERVAL ? DAY)
        WHERE id = ?"
    );
    $stmt->bind_param("ii", $days, $userId);
    $ok = $stmt->execute();
    $stmt->close();

    json_response([
        'success' => $ok,
        'message' => $ok ? 'Uzytkownik zostal czasowo zbanowany.' : 'Nie udalo sie zbanowac uzytkownika.'
    ], $ok ? 200 : 503);
}

if ($action === 'searchUsers') {
    $query = trim($data['query'] ?? '');
    $like = '%' . $query . '%';
    $asId = intval($query);

    $stmt = $conn->prepare(
        "SELECT
            u.id,
            u.nazwa,
            u.email,
            u.utworzenie,
            u.ban,
            u.ban_end,
            COALESCE(created.created_count, 0) AS created_count,
            COALESCE(created.banned_count, 0) AS banned_count,
            COALESCE(done.completed_count, 0) AS completed_count,
            COALESCE(done.avgocena, 0) AS avgocena
        FROM users u
        LEFT JOIN (
            SELECT id_zglasz, COUNT(*) AS created_count, SUM(CASE WHEN ban = 1 THEN 1 ELSE 0 END) AS banned_count
            FROM ogloszenia_oferty
            GROUP BY id_zglasz
        ) created ON created.id_zglasz = u.id
        LEFT JOIN (
            SELECT id_wykon, COUNT(ocena) AS completed_count, ROUND(AVG(ocena), 2) AS avgocena
            FROM ogloszenia_zrobione
            WHERE ocena IS NOT NULL
            GROUP BY id_wykon
        ) done ON done.id_wykon = u.id
        WHERE u.nazwa LIKE ? OR u.email LIKE ? OR u.id = ?
        ORDER BY u.id ASC
        LIMIT 25"
    );
    $stmt->bind_param("ssi", $like, $like, $asId);
    $stmt->execute();
    $rows = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
    $stmt->close();

    json_response([
        'success' => true,
        'data' => $rows
    ]);
}

json_response([
    'success' => false,
    'message' => 'Nieznana akcja.'
], 400);
?>
