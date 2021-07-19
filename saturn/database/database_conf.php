<?php
    $host = 'localhost';
    $user = 'id15585118_saturnaassnd';
    $password = '^>Sf@04vPd%<}yNX';
    $dbname ='id15585118_books';
    $connection = mysqli_connect($host,$user,$password,$dbname);

    if(mysqli_connect_errno()){
        $msg ="Database connection failed";
        $msg .= mysqli_connect_error();
        $msg .= "(" . mysqli_connect_errno() . ")";
        exit($msg);
    }
    ?>



