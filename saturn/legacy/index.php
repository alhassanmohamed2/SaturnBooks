<?php   session_start(); 
?>
<?php include 'template/header.php';
    include 'database/database_conf.php';
    $sql = "INSERT INTO visitors(time) VALUES (CURRENT_TIME())";
	mysqli_query($connection, $sql);
	$sql2="SELECT * FROM visitors ORDER BY visitor DESC LIMIT 1";
    $no_visitors=mysqli_query($connection, $sql2);
    $number=mysqli_fetch_assoc($no_visitors);
    
	
?>

	<!--start text -->
	<div class="text">
		<div class="useful">
			<h2><b>The powerful of reading</b> </h2>
			<p> Reading can be educational, recreational, healthy and life changing.

				Reading can make you a scholar, linguist, intellectual, philosopher, expert and good person.

				Reading stimulates imagination, intelligence, character, abilities and skills.

				Reading shows us values, places, people, culture, art and life in every way.

				Reading gives us information in every subject to help us from going wrong or making mistakes.

				Reading keeps us happy, intrigued, interested, emotional and alive.

				Reading makes our mind broader, world wise and empathetic.

				Reading takes us on adventure, romance and even love.</p>
		</div>
	</div>
	<!--end text-->
	<!--start type -->

	<div class="info">
		<h2><b>Type of books</b> </h2>
		<p> When it comes to select a great book, we don't discriminate here at saturn.com. From an essential fall best-seller, to novels by Latinx authors, and every single read on saturn's Book Club list, our approach to finding a riveting page-turner is to have an open mind.</p>
		<div class="book-type">
			<div class="active">
				<h3>Action and Adventure</h3>
				<p>Action and adventure books constantly have you on the edge of your seat with excitement, as your fave main character repeatedly finds themselves in high stakes situations. The protagonist has an ultimate goal to achieve and is always put in risky, often dangerous situations. This genre typically crosses over with others like mystery, crime </p>
			</div>
			<div>
				<h3>Classics</h3>
				<p>you may think of these books as the throwback readings you were assigned in English class. The classics have been around for decades, and were often groundbreaking stories at their publish time, but have continued to be impactful for generations, serving as the foundation for many popular works we read today.</p>
			</div>


			<div>
				<h3>Comic Book or Graphic Novel</h3>
				<p>The stories in comic books and graphic novels are presented to the reader through engaging, sequential narrative art (illustrations and typography) that's either presented in a specific design or the traditional panel layout you find in comics. With both, you'll often find the dialogue presented in the tell-tale "word balloons" next to the respective characters.</p>
			</div>
			<div>
				<h3>Detective and Mystery</h3>
				<p>The plot always revolves around a crime of sorts that must be solved—or foiled—by the protagonists.</p>
			</div>
			<div>
				<h3>Historical Fiction</h3>
				<p>These books are based in a time period set in the past decades, often against the backdrop of significant (real) historical events</p>
			</div>
		</div>
	</div>

	<!--end type-->
	<!-- start our-books-->


	<div class="our-work">
		<h2> Some of our books </h2>
		<div class="active"> <img src="upload/books/images/13bc4258f89bbca754b8ea331d6f5de2-d.gif" height="400" width="300"> </div>
		<div><img src="upload/books/images/72ffffd425db6b2f001e750d3e7da71d-d.jpg" height="400" width="300"> </div>
		<div><img src="upload/books/images/289ed1bb5f73b80e854b5e97d43cdf9d.jpg" height="400" width="300"> </div>
		<div><img src="upload/books/images/c22c0b074035605b6e3ed04d4661c234.jpg" height="400" width="300"> </div>
	</div>
    <p class="visit">No. Of Visitors = <?php echo $number['visitor'];?></p>
    <p class="visit">Last Update : 08/01/2021</p>
    <p class="visit">Established : 10/12/2020 </p>
	<!--end our-books-->
	<?php include 'template/footer.php' ?>
