<?php
include '../database/database_conf.php';
$q= "select * from users ";
$result = mysqli_query($connection,$q);
     
    
mysqli_close($connection);
?>
