<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

$host = 'db';
$user = 'root';
$password = 'root';
$dbname = 'saturn_books';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode(['error' => 'Connection failed: ' . $e->getMessage()]);
    exit();
}

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$method = $_SERVER['REQUEST_METHOD'];

if ($uri === '/api/visitors' && $method === 'GET') {
    $stmt = $pdo->query("SELECT * FROM visitors ORDER BY visitor DESC LIMIT 1");
    $visitor = $stmt->fetch(PDO::FETCH_ASSOC);
    if (!$visitor) {
        $visitor = ['visitor' => 0];
    }
    
    // Increment visitor
    $pdo->exec("INSERT INTO visitors(time) VALUES (CURRENT_TIME())");
    $visitor['visitor'] += 1;
    
    echo json_encode($visitor);
    exit();
}

if ($uri === '/api/books' && $method === 'GET') {
    $stmt = $pdo->query("SELECT * FROM books ORDER BY id DESC LIMIT 10");
    $books = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($books);
    exit();
}

if ($uri === '/api/login' && $method === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $username = $data['username'] ?? '';
    $password = md5($data['password'] ?? '');

    $stmt = $pdo->prepare("SELECT * FROM users WHERE username = ? AND password = ?");
    $stmt->execute([$username, $password]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user) {
        echo json_encode(['success' => true, 'user' => $user]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid credentials']);
    }
    exit();
}

if ($uri === '/api/register' && $method === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $username = $data['username'] ?? '';
    $email = $data['email'] ?? '';
    $password = md5($data['password'] ?? '');

    $stmt = $pdo->prepare("SELECT * FROM users WHERE username = ? OR email = ?");
    $stmt->execute([$username, $email]);
    if ($stmt->fetch()) {
        echo json_encode(['success' => false, 'message' => 'User already exists']);
        exit();
    }

    $stmt = $pdo->prepare("INSERT INTO users (username, email, password, imgpath) VALUES (?, ?, ?, 'images/')");
    if ($stmt->execute([$username, $email, $password])) {
        echo json_encode(['success' => true, 'message' => 'Registered successfully']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Registration failed']);
    }
    exit();
}

if ($uri === '/api/books' && $method === 'POST') {
    $name = $_POST['name'] ?? '';
    $section = $_POST['section'] ?? '';
    $author = $_POST['author'] ?? '';
    $pages = $_POST['page'] ?? '';
    $buy = $_POST['buy'] ?? '';
    $brief = $_POST['breif'] ?? '';
    $lang = $_POST['langu'] ?? '';
    $username = $_POST['username'] ?? 'admin'; // Should come from session/token in a real app

    $target_dir_img = "uploads/images/";
    $target_dir_pdf = "uploads/books/";
    
    if (!is_dir($target_dir_img)) mkdir($target_dir_img, 0777, true);
    if (!is_dir($target_dir_pdf)) mkdir($target_dir_pdf, 0777, true);

    $img_path = "";
    $pdf_path = "";

    if (isset($_FILES["img"]) && $_FILES["img"]["error"] == 0) {
        $img_path = $target_dir_img . basename($_FILES["img"]["name"]);
        move_uploaded_file($_FILES["img"]["tmp_name"], $img_path);
    }
    
    if (isset($_FILES["pdf"]) && $_FILES["pdf"]["error"] == 0) {
        $pdf_path = $target_dir_pdf . basename($_FILES["pdf"]["name"]);
        move_uploaded_file($_FILES["pdf"]["tmp_name"], $pdf_path);
    }

    $stmt = $pdo->prepare("INSERT INTO books(name, Section, author, pdfpath, imgpath, pages, buylink, brief, user, lang) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    if ($stmt->execute([$name, $section, $author, $pdf_path, $img_path, $pages, $buy, $brief, $username, $lang])) {
        echo json_encode(['success' => true, 'message' => 'Book uploaded successfully']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to upload book']);
    }
    exit();
}

echo json_encode(['message' => 'API is running']);
