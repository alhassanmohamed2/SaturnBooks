<?php
/**
 * SaturnBooks REST API
 *
 * A complete JSON REST API for the SaturnBooks platform.
 * Uses PDO with prepared statements for all database queries.
 * Supports parameterized routes via regex matching.
 *
 * @author  SaturnBooks Team
 * @version 2.0.0
 */

declare(strict_types=1);

// ──────────────────────────────────────────────
// CORS Headers
// ──────────────────────────────────────────────
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// ──────────────────────────────────────────────
// Database Configuration & Connection
// ──────────────────────────────────────────────
$dbConfig = [
    'host'     => 'db',
    'user'     => 'root',
    'password' => 'root',
    'dbname'   => 'saturn_books',
];

try {
    $pdo = new PDO(
        "mysql:host={$dbConfig['host']};dbname={$dbConfig['dbname']};charset=utf8mb4",
        $dbConfig['user'],
        $dbConfig['password'],
        [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ]
    );
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed: ' . $e->getMessage()]);
    exit();
}

// ──────────────────────────────────────────────
// Helper Functions
// ──────────────────────────────────────────────

/**
 * Send a JSON response with the given HTTP status code and exit.
 *
 * @param mixed $data       The data to encode as JSON.
 * @param int   $statusCode HTTP status code (default 200).
 */
function jsonResponse(mixed $data, int $statusCode = 200): void
{
    http_response_code($statusCode);
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit();
}

/**
 * Decode the raw JSON body from the request.
 *
 * @return array<string, mixed> Parsed JSON as an associative array.
 */
function getJsonBody(): array
{
    $body = json_decode(file_get_contents('php://input'), true);
    return is_array($body) ? $body : [];
}

/**
 * Validate that a string contains only alphabetic characters and spaces.
 *
 * @param string $value The string to validate.
 * @return bool True if valid.
 */
function isAlphabetic(string $value): bool
{
    return (bool) preg_match('/^[a-zA-Z\s\-\.]+$/', $value);
}

/**
 * Generate a unique filename to prevent collisions.
 *
 * @param string $originalName The original file name.
 * @return string A unique filename with the original extension preserved.
 */
function uniqueFilename(string $originalName): string
{
    $ext = pathinfo($originalName, PATHINFO_EXTENSION);
    return uniqid('', true) . '.' . $ext;
}

// ──────────────────────────────────────────────
// Request Parsing
// ──────────────────────────────────────────────
$uri    = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$method = $_SERVER['REQUEST_METHOD'];

// ══════════════════════════════════════════════
// ROUTE MATCHING
// ══════════════════════════════════════════════
// IMPORTANT: Parameterized routes (with regex) are checked BEFORE
// their simpler parent routes to avoid false matches.

// ──────────────────────────────────────────────
// 1. GET /api/visitors
//    Insert a new visitor row and return the latest count.
// ──────────────────────────────────────────────
if ($uri === '/api/visitors' && $method === 'GET') {
    // Insert a new visitor entry
    $stmt = $pdo->prepare("INSERT INTO visitors (time) VALUES (CURRENT_TIME())");
    $stmt->execute();

    // Retrieve the latest visitor ID as the count
    $stmt = $pdo->query("SELECT visitor FROM visitors ORDER BY visitor DESC LIMIT 1");
    $row  = $stmt->fetch();

    $count = $row ? (int) $row['visitor'] : 0;

    jsonResponse(['visitor' => $count]);
}

// ──────────────────────────────────────────────
// 3. GET /api/books/{id}  (checked BEFORE /api/books)
//    Fetch a single book by its numeric ID.
// ──────────────────────────────────────────────
if (preg_match('#^/api/books/(\d+)$#', $uri, $matches) && $method === 'GET') {
    $bookId = (int) $matches[1];

    $stmt = $pdo->prepare("SELECT * FROM books WHERE id = ?");
    $stmt->execute([$bookId]);
    $book = $stmt->fetch();

    if (!$book) {
        jsonResponse(['error' => 'Book not found'], 404);
    }

    jsonResponse($book);
}

// ──────────────────────────────────────────────
// 2. GET /api/books
//    Search books by name or return the latest 20.
// ──────────────────────────────────────────────
if ($uri === '/api/books' && $method === 'GET') {
    $query = $_GET['q'] ?? '';

    if ($query !== '') {
        // Search by name (case-insensitive LIKE)
        $stmt = $pdo->prepare("SELECT * FROM books WHERE name LIKE ? ORDER BY id DESC");
        $stmt->execute(['%' . $query . '%']);
    } else {
        // Return latest 20 books
        $stmt = $pdo->prepare("SELECT * FROM books ORDER BY id DESC LIMIT 20");
        $stmt->execute();
    }

    $books = $stmt->fetchAll();
    jsonResponse($books);
}

// ──────────────────────────────────────────────
// 4. POST /api/books
//    Upload a new book with image and PDF files.
//    Expects multipart/form-data.
// ──────────────────────────────────────────────
if ($uri === '/api/books' && $method === 'POST') {
    // Extract form fields
    $name     = trim($_POST['name'] ?? '');
    $author   = trim($_POST['author'] ?? '');
    $section  = trim($_POST['section'] ?? '');
    $pages    = trim($_POST['pages'] ?? '');
    $buyLink  = trim($_POST['buylink'] ?? '');
    $brief    = trim($_POST['brief'] ?? '');
    $lang     = trim($_POST['lang'] ?? '');
    $username = trim($_POST['username'] ?? 'admin');

    // Validate required alphabetic fields
    if ($name === '' || $author === '' || $section === '') {
        jsonResponse(['error' => 'Fields name, author, and section are required'], 400);
    }

    if (!isAlphabetic($name)) {
        jsonResponse(['error' => 'Book name must contain only alphabetic characters'], 400);
    }
    if (!isAlphabetic($author)) {
        jsonResponse(['error' => 'Author must contain only alphabetic characters'], 400);
    }
    if (!isAlphabetic($section)) {
        jsonResponse(['error' => 'Section must contain only alphabetic characters'], 400);
    }

    // Ensure upload directories exist
    $imgDir = "uploads/images/";
    $pdfDir = "uploads/books/";
    if (!is_dir($imgDir)) {
        mkdir($imgDir, 0777, true);
    }
    if (!is_dir($pdfDir)) {
        mkdir($pdfDir, 0777, true);
    }

    // Handle image upload
    $imgPath = '';
    if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
        $imgFilename = uniqueFilename($_FILES['image']['name']);
        $imgPath     = $imgDir . $imgFilename;
        move_uploaded_file($_FILES['image']['tmp_name'], $imgPath);
    }

    // Handle PDF upload
    $pdfPath = '';
    if (isset($_FILES['pdf']) && $_FILES['pdf']['error'] === UPLOAD_ERR_OK) {
        $pdfFilename = uniqueFilename($_FILES['pdf']['name']);
        $pdfPath     = $pdfDir . $pdfFilename;
        move_uploaded_file($_FILES['pdf']['tmp_name'], $pdfPath);
    }

    // Insert the book record
    $stmt = $pdo->prepare(
        "INSERT INTO books (name, Section, author, pdfpath, imgpath, pages, buylink, brief, user, lang)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
    );
    $stmt->execute([$name, $section, $author, $pdfPath, $imgPath, $pages, $buyLink, $brief, $username, $lang]);

    $newBookId = (int) $pdo->lastInsertId();

    jsonResponse([
        'success' => true,
        'message' => 'Book uploaded successfully',
        'bookId'  => $newBookId,
    ], 201);
}

// ──────────────────────────────────────────────
// 5. GET /api/members
//    List all registered members (safe fields only).
// ──────────────────────────────────────────────
if ($uri === '/api/members' && $method === 'GET') {
    $stmt = $pdo->prepare("SELECT id, username, email, imgpath FROM users");
    $stmt->execute();
    $members = $stmt->fetchAll();

    jsonResponse($members);
}

// ──────────────────────────────────────────────
// 6. GET /api/user/{username}  (checked BEFORE /api/user)
//    Get user profile, book count, and their uploaded books.
// ──────────────────────────────────────────────
if (preg_match('#^/api/user/([\w]+)$#', $uri, $matches) && $method === 'GET') {
    $requestedUsername = $matches[1];

    // Fetch user info (exclude password)
    $stmt = $pdo->prepare("SELECT id, username, email, imgpath FROM users WHERE username = ?");
    $stmt->execute([$requestedUsername]);
    $user = $stmt->fetch();

    if (!$user) {
        jsonResponse(['error' => 'User not found'], 404);
    }

    // Fetch book count for this user
    $stmt = $pdo->prepare("SELECT COUNT(*) AS book_count FROM books WHERE user = ?");
    $stmt->execute([$requestedUsername]);
    $countRow = $stmt->fetch();
    $user['book_count'] = (int) $countRow['book_count'];

    // Fetch the user's books
    $stmt = $pdo->prepare("SELECT * FROM books WHERE user = ? ORDER BY id DESC");
    $stmt->execute([$requestedUsername]);
    $books = $stmt->fetchAll();

    jsonResponse([
        'user'  => $user,
        'books' => $books,
    ]);
}

// ──────────────────────────────────────────────
// 7. POST /api/user/avatar
//    Update a user's avatar image.
//    Expects multipart/form-data with username and img file.
// ──────────────────────────────────────────────
if ($uri === '/api/user/avatar' && $method === 'POST') {
    $username = trim($_POST['username'] ?? '');

    if ($username === '') {
        jsonResponse(['error' => 'Username is required'], 400);
    }

    // Verify the user exists
    $stmt = $pdo->prepare("SELECT id FROM users WHERE username = ?");
    $stmt->execute([$username]);
    if (!$stmt->fetch()) {
        jsonResponse(['error' => 'User not found'], 404);
    }

    // Handle image upload
    if (!isset($_FILES['img']) || $_FILES['img']['error'] !== UPLOAD_ERR_OK) {
        jsonResponse(['error' => 'Image file is required'], 400);
    }

    $imgDir = "uploads/images/";
    if (!is_dir($imgDir)) {
        mkdir($imgDir, 0777, true);
    }

    $imgFilename = uniqueFilename($_FILES['img']['name']);
    $imgPath     = $imgDir . $imgFilename;
    move_uploaded_file($_FILES['img']['tmp_name'], $imgPath);

    // Update the user's avatar path
    $stmt = $pdo->prepare("UPDATE users SET imgpath = ? WHERE username = ?");
    $stmt->execute([$imgPath, $username]);

    jsonResponse([
        'success' => true,
        'message' => 'Avatar updated successfully',
        'imgpath' => $imgPath,
    ]);
}

// ──────────────────────────────────────────────
// 8. POST /api/login
//    Authenticate a user.
//    Tries password_verify() first, then MD5 fallback.
//    Auto-upgrades legacy MD5 hashes to bcrypt.
// ──────────────────────────────────────────────
if ($uri === '/api/login' && $method === 'POST') {
    $data     = getJsonBody();
    $username = trim($data['username'] ?? '');
    $password = $data['password'] ?? '';

    if ($username === '' || $password === '') {
        jsonResponse(['error' => 'Username and password are required'], 400);
    }

    // Fetch user by username only (we verify the password in PHP)
    $stmt = $pdo->prepare("SELECT * FROM users WHERE username = ?");
    $stmt->execute([$username]);
    $user = $stmt->fetch();

    if (!$user) {
        jsonResponse(['success' => false, 'message' => 'Invalid credentials'], 401);
    }

    $storedHash    = $user['password'];
    $authenticated = false;

    // Strategy 1: Try password_verify() for bcrypt/argon hashes
    if (password_verify($password, $storedHash)) {
        $authenticated = true;
    }

    // Strategy 2: MD5 fallback for legacy passwords
    if (!$authenticated && md5($password) === $storedHash) {
        $authenticated = true;

        // Auto-upgrade the legacy MD5 hash to a secure bcrypt hash
        $newHash = password_hash($password, PASSWORD_DEFAULT);
        $stmt    = $pdo->prepare("UPDATE users SET password = ? WHERE id = ?");
        $stmt->execute([$newHash, $user['id']]);
    }

    if (!$authenticated) {
        jsonResponse(['success' => false, 'message' => 'Invalid credentials'], 401);
    }

    // Remove password from the response payload
    unset($user['password']);

    jsonResponse([
        'success' => true,
        'user'    => $user,
    ]);
}

// ──────────────────────────────────────────────
// 9. POST /api/register
//    Register a new user account.
//    Uses password_hash() for secure storage.
// ──────────────────────────────────────────────
if ($uri === '/api/register' && $method === 'POST') {
    $data     = getJsonBody();
    $username = trim($data['username'] ?? '');
    $email    = trim($data['email'] ?? '');
    $password = $data['password'] ?? '';

    // Validate required fields
    if ($username === '' || $email === '' || $password === '') {
        jsonResponse(['error' => 'Username, email, and password are required'], 400);
    }

    // Check for duplicate username or email
    $stmt = $pdo->prepare("SELECT id FROM users WHERE username = ? OR email = ?");
    $stmt->execute([$username, $email]);
    if ($stmt->fetch()) {
        jsonResponse([
            'success' => false,
            'message' => 'Username or email already exists',
        ], 409);
    }

    // Hash the password securely using bcrypt
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    // Insert the new user
    $stmt = $pdo->prepare(
        "INSERT INTO users (username, email, password, imgpath) VALUES (?, ?, ?, ?)"
    );
    $stmt->execute([$username, $email, $hashedPassword, 'uploads/images/']);

    $newUserId = (int) $pdo->lastInsertId();

    jsonResponse([
        'success' => true,
        'message' => 'Registered successfully',
        'userId'  => $newUserId,
    ], 201);
}

// ──────────────────────────────────────────────
// 10. POST /api/contact
//     Submit a contact message.
//     Expects JSON body with name, email, reason, message.
// ──────────────────────────────────────────────
if ($uri === '/api/contact' && $method === 'POST') {
    $data    = getJsonBody();
    $name    = trim($data['name'] ?? '');
    $email   = trim($data['email'] ?? '');
    $reason  = trim($data['reason'] ?? '');
    $message = trim($data['message'] ?? '');

    // Validate required fields
    if ($name === '' || $email === '' || $message === '') {
        jsonResponse(['error' => 'Name, email, and message are required'], 400);
    }

    // Insert contact message
    $stmt = $pdo->prepare(
        "INSERT INTO contact_messages (name, email, reason, message) VALUES (?, ?, ?, ?)"
    );
    $stmt->execute([$name, $email, $reason, $message]);

    jsonResponse([
        'success' => true,
        'message' => 'Message sent successfully',
    ], 201);
}

// ──────────────────────────────────────────────
// Fallback: No route matched
// ──────────────────────────────────────────────
jsonResponse([
    'error'  => 'Endpoint not found',
    'uri'    => $uri,
    'method' => $method,
], 404);
