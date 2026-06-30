<?php
include '../database/database_conf.php';
$name =  $_GET['name'];
$q= "select * from users where username='$name' ";
$result = mysqli_query($connection,$q);
     $t = mysqli_fetch_assoc($result);
    $books= "select * from books where user = '$name'";
    $book_no = mysqli_query($connection,$books);
    $book_nu=mysqli_num_rows($book_no);
    
    $q2= "select * from books where user= '$name'";
    $result1 = mysqli_query($connection,$q2);
    if(!empty($_POST) && $_SERVER['REQUEST_METHOD'] == 'POST'){	 
        $target_dir_img = "images/";
        // Get file path
        $target_file_img = $target_dir_img .$name. basename($_FILES["img"]["name"]);
        // Get file extension
        $imageExt = strtolower(pathinfo($target_file_img, PATHINFO_EXTENSION));
        // Allowed file types
        move_uploaded_file($_FILES["img"]["tmp_name"], $target_file_img);
       
        $sql = "UPDATE users SET imgpath = '$target_file_img' where username = '$name' ";
        
        $result3 = mysqli_query($connection,$sql);

    }
    
?>
<script >
const n = document.querySelector(".nname");
n.innerHTML = "<?php echo $t['username'];?>"

const s = document.querySelector(".nemail");
s.innerHTML = "<?php echo $t['email'];?>"

const u = document.querySelector(".nbooks");
u.innerHTML = "<?php echo $book_nu;?>"


 const i = document.querySelector(".bimage");
i.setAttribute("src","<?php  echo $t['imgpath'];?>") 




</script>

<?php 
mysqli_free_result($result);
mysqli_close($connection);
?>
