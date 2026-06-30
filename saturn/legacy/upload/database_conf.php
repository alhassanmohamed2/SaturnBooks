<?php
    $host = 'localhost';
    $user = 'id15585118_saturnaassnd';
    $password = 'Vu2l~JMma7F>j-KW';
    $dbname ='id15585118_books';
    $connection = mysqli_connect($host,$user,$password,$dbname);

    if(mysqli_connect_errno()){
        $msg ="Database connection failed";
        $msg .= mysqli_connect_error();
        $msg .= "(" . mysqli_connect_errno() . ")";
        exit($msg);
    }
    ?>



