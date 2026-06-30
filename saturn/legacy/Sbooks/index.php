<?php session_start(); ?>
<?php  include '../template/header.php'; ?>
<script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
 <div class="symtext">

<img src="/favicon.png" width="100px" height="100px">
<h1 class="sym-text">Saturn Books</h1>
</div>  
<div class="fsearch-form">
<form  method="GET" class="search-form">
<input type="text" name="name" id="tsearch" required >    
<input type="submit" value="Search" id="bsearch"> 
</form>
<a href="?name=" class="books-all">Show All Books</a>
</div>
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
<?php if(count($_GET)>0 ){require_once 'data.php'; if(mysqli_num_rows($result) != 0){?>    
<script>document.querySelector(".list").style.display = "block";
</script>
<?php } ?>
<?php while($book = mysqli_fetch_assoc($result)){?>
    <tr>
    <td><?php echo $book['id'];?></td>
    <td><?php echo $book['name']; ?></td>
    <td><?php echo $book['Section']; ?></td>
    <td><?php echo $book['author']; ?></td>
    <td><?php echo $book['pages']; ?></td>
    <td><a href="../details?name=<?php echo $book['name'] ?>&id=<?php echo $book['id'] ?>&lang=<?php echo $book['lang'] ?>">Details</a></td>

  </tr>   
<?php } } ?>
</table>
</fieldset>

<?php include '../template/footer.php' ?>

<script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
