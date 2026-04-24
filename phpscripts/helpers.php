<?php
function handle_options_request() {
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        exit(0);
    }
}

function cors_json_headers($origin = '*', $credentials = false) {
    header('Access-Control-Allow-Origin: ' . $origin);
    header('Access-Control-Allow-Methods: GET,POST,OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    if ($credentials) {
        header('Access-Control-Allow-Credentials: true');
    }
    header('Content-type: application/json; charset=utf-8');
    handle_options_request();
}

function read_json_input() {
    $dataJSON = file_get_contents('php://input');
    $data = json_decode($dataJSON, true);
    return is_array($data) ? $data : [];
}

function json_response($payload, $status = 200) {
    http_response_code($status);
    echo json_encode($payload);
    exit;
}

function column_exists($conn, $table, $column) {
    $table = $conn->real_escape_string($table);
    $column = $conn->real_escape_string($column);
    $result = $conn->query("SHOW COLUMNS FROM `$table` LIKE '$column'");
    return $result && $result->num_rows > 0;
}

function ensure_app_schema($conn) {
    if (!column_exists($conn, 'users', 'rola')) {
        $conn->query("ALTER TABLE users ADD rola VARCHAR(20) DEFAULT 'user'");
        $conn->query("UPDATE users SET rola = 'admin' WHERE id = 1");
    }

    if (column_exists($conn, 'users', 'zatwierdzony')) {
        $conn->query("UPDATE users SET zatwierdzony = 1 WHERE zatwierdzony IS NULL AND kod IS NULL");
    }

    if (column_exists($conn, 'users', 'ban')) {
        $conn->query("UPDATE users SET ban = 0, ban_data = NULL, ban_end = NULL WHERE ban = 1 AND ban_end IS NOT NULL AND ban_end < NOW()");
    }

    if (column_exists($conn, 'ogloszenia_zrobione', 'ocena')) {
        $conn->query("ALTER TABLE ogloszenia_zrobione MODIFY ocena INT(11) NULL");
    }

    if (!column_exists($conn, 'ogloszenia_zrobione', 'ocena_slowna')) {
        $conn->query("ALTER TABLE ogloszenia_zrobione ADD ocena_slowna VARCHAR(50) NULL");
    }

    if (!column_exists($conn, 'ogloszenia_zrobione', 'ocena_opis')) {
        $conn->query("ALTER TABLE ogloszenia_zrobione ADD ocena_opis VARCHAR(255) NULL");
    }

    if (!column_exists($conn, 'ogloszenia_zrobione', 'ocena_data')) {
        $conn->query("ALTER TABLE ogloszenia_zrobione ADD ocena_data DATETIME NULL");
    }

    if (!column_exists($conn, 'ogloszenia_zrobione', 'wybrano')) {
        $conn->query("ALTER TABLE ogloszenia_zrobione ADD wybrano DATETIME NULL");
    }

    $conn->query(
        "CREATE TABLE IF NOT EXISTS zgloszenia_ogloszen (
            id INT(11) NOT NULL AUTO_INCREMENT,
            id_ogloszenia INT(11) NOT NULL,
            id_zglaszajacy INT(11) NOT NULL,
            powod VARCHAR(255) NULL,
            status VARCHAR(20) NOT NULL DEFAULT 'new',
            utworzenie DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            rozpatrzono DATETIME NULL,
            PRIMARY KEY (id)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci"
    );
}

function user_is_admin($conn, $userId) {
    if (!$userId) {
        return false;
    }

    if (!column_exists($conn, 'users', 'rola')) {
        return intval($userId) === 1;
    }

    $stmt = $conn->prepare("SELECT rola FROM users WHERE id = ?");
    $stmt->bind_param("i", $userId);
    $stmt->execute();
    $result = $stmt->get_result();
    $user = $result->fetch_assoc();
    $stmt->close();

    return $user && ($user['rola'] === 'admin' || intval($userId) === 1);
}

function require_admin($conn, $userId) {
    if (!user_is_admin($conn, $userId)) {
        json_response([
            'success' => false,
            'message' => 'Brak uprawnien administratora.'
        ], 403);
    }
}

function clamp_text($text, $maxLength) {
    $text = trim((string) $text);
    if (function_exists('mb_substr')) {
        return mb_substr($text, 0, $maxLength, 'UTF-8');
    }
    return substr($text, 0, $maxLength);
}
?>
