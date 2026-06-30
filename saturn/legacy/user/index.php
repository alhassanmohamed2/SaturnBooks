<?php session_start();

include '../template/header.php'; ?>

<div class="about-book">
    <div class="image">
        <img class="bimage" src="" width="300px" height="400px">
    </div>
    <div class="infod">
        <div class="components-books">
            <div class="section">
                <span>Name: </span>
                <span class="nname"></span>
            </div>
            <div class="author">
                <span>E-mail: </span><span class="nemail"></span>
            </div>
            <div class="pages">
                <span>No. Of Books Uploaded: </span>
                <span class="nbooks"></span>
            </div>
           
        </div>
    </div>
</div>
<?php if(isset($_SESSION["username"]) && $_SESSION['username']==$_GET["name"]){ ?>
<form accept-charset="utf-8" name="upload" method="post" enctype="multipart/form-data" class="cform fupload" >
    <input type="file" name="img" class="img-upload" accept="image/*" required> 
        <input type="submit" name="upload" value="Upload A Profile Image" class="btn"   /> 
</form>
        <a href="/upload" class="user-upload">Upload A Book</a>

<?php } ?>
<fieldset class="list"> 
<legend>Books</legend> 
<table id="books">
  <tr>
    <th>ID</th>
    <th>Name</th>
    <th>Section</th>
    <th>Author</th>
    <th>Pages</th>
    <th>Details</th>
  </tr> 
<?php if(count($_GET)>0 ){require_once 'data.php'; if(mysqli_num_rows($book_no) != 0){?>    
<script>document.querySelector(".list").style.display = "block";
</script>
<?php } ?>
<?php while($book = mysqli_fetch_assoc($result1)){?>
    <tr>
    <td><?php echo $book['id'];?></td>
    <td><?php echo $book['name']; ?></td>
    <td><?php echo $book['Section']; ?></td>
    <td><?php echo $book['author']; ?></td>
    <td><?php echo $book['pages']; ?></td>
    <td><a href="../details?name=<?php echo $book['name'] ?>&id=<?php echo $book['id'] ?>">Details</a>
  </tr>   
<?php } } ?>
</table>
</fieldset>

<?php include '../template/footer.php'; ?>
<script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
<?php if (count($_GET) > 0) {
    require_once 'data.php';
} ?>

