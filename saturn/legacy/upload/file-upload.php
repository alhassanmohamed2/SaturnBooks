
<?php
// Database connection
if(!empty($_POST) && $_SERVER['REQUEST_METHOD'] == 'POST'){
include("database_conf.php");
$Err = 0;
$name = mysqli_real_escape_string($connection, trim($_POST['name']));
$author = mysqli_real_escape_string($connection, trim($_POST['author']));
$section = mysqli_real_escape_string($connection, trim($_POST['section']));
$page = mysqli_real_escape_string($connection, trim($_POST['page']));
$buy = mysqli_real_escape_string($connection, trim($_POST['buy']));
$lag = mysqli_real_escape_string($connection, trim($_POST['langu']));

$comma = "'";
$breif_enter = str_replace(array(':', '-', '/', '*', '/n', $comma), '', mysqli_real_escape_string($connection, trim($_POST['breif'])));
$breif = preg_replace("/[\r\n]*/", "", $breif_enter);
/*Image Uplode code start */
if (preg_match("/^[a-zA-Z]+$/", $name) == 1 && preg_match("/^[a-zA-Z]+$/", $author) == 1 && preg_match("/^[a-zA-Z]+$/", $section) == 1) {
    $target_dir_img = "books/images/";
    // Get file path
    $target_file_img = $target_dir_img . basename($_FILES["img"]["name"]);
    // Get file extension
    $imageExt = strtolower(pathinfo($target_file_img, PATHINFO_EXTENSION));
    // Allowed file types
    /*Image Uplode code end */
    /*Pdf Upload Start */
    $target_dir_pdf = "books/";
    // Get file path
    $target_file_pdf = $target_dir_pdf . basename($_FILES["pdf"]["name"]);
    // Get file extension
    $imageExt = strtolower(pathinfo($target_file_pdf, PATHINFO_EXTENSION));

    /*Pdf Upload End */
    if (move_uploaded_file($_FILES["img"]["tmp_name"], $target_file_img) && move_uploaded_file($_FILES["pdf"]["tmp_name"], $target_file_pdf)) {
        $username = $_SESSION['username'];
        $sql = "INSERT INTO books(name, Section, author, pdfpath, imgpath, pages, buylink, brief, user, lang) VALUES ('$name' ,'$section','$author','$target_file_pdf','$target_file_img','$page','$buy','$breif','$username','$lag')";
        if (mysqli_query($connection, $sql)) {

            $Err = +1;
        }
    }else{$Err=+1;}
}else{$Err =+1;}
unset($name);
unset($author);
unset($section);
unset($page);
unset($buy);
unset($breif);

}
?>
