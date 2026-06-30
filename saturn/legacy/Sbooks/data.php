<?php
include '../database/database_conf.php';
$name = '%' . trim($_GET['name']) . '%';
$q= "select * from books where name like '$name'";
$result = mysqli_query($connection,$q);
     if(mysqli_num_rows($result) == 0){
        echo '<script>
        swal("Not Found!","Book Not Found!","error");
        </script> ';
    }
    
mysqli_close($connection);
?>
