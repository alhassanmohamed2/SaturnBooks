<?php

session_start();
if (!isset($_SESSION['username'])) {
    $_SESSION['msg'] = "You must log in first";
    header('location: ../registration/login.php');
}
if (isset($_GET['logout'])) {
    session_destroy();
    unset($_SESSION['username']);
    header("location: ../");
}
?>
<?php include '../template/header.php' ?>
<?php if (!empty($_POST) && $_SERVER['REQUEST_METHOD'] == 'POST') {
    include 'file-upload.php'; ?>
    <script>
        var Err = <?php echo $Err; ?>;
        Document.replaceState(null,null,window.location.href);
    </script>
    
<?php } ?>
<div class="BC">
    <div class="box">
        <form accept-charset="utf-8" name="upload" method="post" enctype="multipart/form-data" class="cform fupload">

            <label>Name:</label>
            <input type="text" name="name" placeholder="Name" minlength="5" maxlength="30" required />

            <label>Author:</label>
            <input type="text" name="author" placeholder="Author" minlength="5" maxlength="30" required />

            <label>Section:</label>
            <input type="text" name="section" placeholder="Section" minlength="3" maxlength="20" required />

            <label>Pages:</label>
            <input type="number" min="1" name="page" placeholder="No. Of Pages" required />

            <label>Buy Link:</label>
            <input type="url" name="buy" placeholder="Buy Link" required />

            <label for="breif">Short Brief</label>
            <textarea name="breif" rows="4" cols="20" minlength="200" maxlength="1000" required></textarea>
            <label>The Book</label>
            <input type="file" name="pdf" class="pdf-upload" accept=".pdf,.doc,.docx" required>
            <label>Image For the book</label>
            <input type="file" name="img" class="img-upload" accept="image/*" required>
            <label>Language</label>
            <select name="langu" id="langu" required>
                <option value="eng">eng</option>
                <option value="ar">ar</option>
            </select>
            <div class="dbtn">
                <input type="submit" name="upload" value="Upload" class="btn" />
            </div>
        </form>
    </div>
</div>


<div class="progress">
    <div class="bar"><span class="percent">0%</span></div>

</div>
<script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>

<?php include '../template/footer.php' ?>

<script src="progress.js?v=<?php echo time(); ?>"></script>