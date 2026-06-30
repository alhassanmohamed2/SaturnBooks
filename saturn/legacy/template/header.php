<?php 

  if (isset($_GET['logout'])) {
  	session_destroy();
  	unset($_SESSION['username']);
  	header("location: ../");
  }
?>
<!doctype html>
<html lang="en">
	<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
		
		<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=yes">
		<title> Saturn Books</title>
		<link rel="icon" href="/favicon.png" type="image/icon type">
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
		<link rel="preconnect" href="https://fonts.gstatic.com">
		 <link href="https://fonts.googleapis.com/css2?family=Langar&display=swap" rel="stylesheet">
		 <link rel="stylesheet" href="/css/normalize.css?v=<?php echo time(); ?>">
		 <link rel="stylesheet" href="/css/style.css?v=<?php echo time(); ?>">
		 		 	<script src="/script/jquery-3.5.1.min.js"></script>

	</head>
	<body>
		<!-- start header -->
		<div class="topnav" id="myTopnav">
		<a href="/" class="Title">Saturn Books <img src="https://www.animatedimages.org/data/media/53/animated-book-image-0016.gif" width="18px" height="18px"> </a>
        <a href="/" class="activee">Home</a>
        <a href="/Sbooks">Search</a>
        <a href="/upload">Add Book</a>
		<a href="https://alhassanmh.000webhostapp.com/about.html">About</a>
		<a href="/contact">Contact</a>
				<a href="/members">Members</a>

		
		<?php if (isset($_SESSION['username'])) { ?>
<a href="/user?name=<?php echo $_SESSION['username'] ?>" class="auser"><?php echo 'Hello: '.$_SESSION['username']; ?></a>
			<a href="?logout" class="alogout" >Log Out</a>
			<?php  } ?>
		<?php if (!isset($_SESSION['username'])) { ?>
                	<a href="/registration/login.php" class="alogin" >Log IN</a>
			<?php } ?>

        <a href="javascript:void(0);" class="icon" onclick="myFunction()">
            <i class="fa fa-bars"></i>
        </a>
    </div>
		<!-- end header -->

