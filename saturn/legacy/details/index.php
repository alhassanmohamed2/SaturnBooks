<?php session_start(); include '../template/header.php'; ?>



<div class="about-book">
    <div class="image">
        <img class="bimage" src="" width="300px" height="400px">
    </div>
    <div class="infod">
        <h1 class="name"></h1>
        <div class="components-books">
            <div class="section">
                <span>Section: </span>
                <span class="nsection"></span>
            </div>
            <div class="author">
                <span>Author: </span>
                <span class="nauthor"></span>
            </div>
            <div class="pages">
                <span>Pages: </span>
                <span class="npages"></span>
            </div>
            <div class="pages">
                <span>Uploaded By: </span>
                <span class="by"></span>
            </div>
            <p class="text"></p>
            <div class="buttons">
                <button class="bplay">🔊 Play</button>
                <button class="bpasue">🔇</button>
                <button class="bresume">⏯</button>
                <a download href="" class="download">Download</a>
                <a href="" class="icon-buy" target="_blank"></a>
            </div>



        </div>
    </div>
</div>


<?php include '../template/footer.php'; ?>
<script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
<?php if (count($_GET) > 0) {
    require_once 'data.php';
} ?>
<script src="responsivevoice.js?v=<?php echo time(); ?>"></script>
<script src="../script/voice.js?v=<?php echo time(); ?>"></script>

