<?php session_start(); ?>
<?php  include '../template/header.php'; ?>
<script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
 <div class="symtext">

<img src="/favicon.png" width="100px" height="100px">
<h1 class="sym-text">Saturn Books</h1>
</div>  

<fieldset class="list" style="display:block;"> 
<legend>Members</legend> 
<table id="books">
  <tr>
    <th>Name</th>
    <th>Email</th>
    <th>Profile</th>

  </tr> 
<?php require_once 'data.php'; if(mysqli_num_rows($result) != 0){?>    
<script>document.querySelector(".list").style.display = "block";
</script>
<?php } ?>
<?php while($book = mysqli_fetch_assoc($result)){?>
    <tr>
    <td><?php echo $book['username'];?></td>
    <td><?php echo $book['email']; ?></td>
    <td><a href="../user?name=<?php echo $book['username']; ?>">Details</a></td>

  </tr>   
<?php  } ?>
</table>
</fieldset>

<?php include '../template/footer.php' ?>

<script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
