<!-- start footer-->
<div class="footer"> 
			<div class="copyright">
			copyright &copy; 2020 saturn, Alhassan Mohamed & Alaa Mahdy 
		</div>
        <!-- end footer-->
		<section class="over-load">
		<div class="sk-folding-cube">
  <div class="sk-cube1 sk-cube"></div>
  <div class="sk-cube2 sk-cube"></div>
  <div class="sk-cube4 sk-cube"></div>
  <div class="sk-cube3 sk-cube"></div>
</div>
		</section>

<script src="/script/jqscript.js?v=1609334487"?v=<?php echo time(); ?>></script>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.js"?v=<?php echo time(); ?>></script> 
  <!--  <script src="https://malsup.github.com/jquery.form.js"?v=<?php //echo time(); ?>></script> -->
	<script>
        function myFunction() {
            var x = document.getElementById("myTopnav");
            if (x.className === "topnav") {
                x.className += " responsive";
            } else {
                x.className = "topnav";
            }
        }
       
    </script>

        </body>
    
</html>
<script>
     const t = document.querySelector('[alt="www.000webhost.com"]');
t.outerHTML = "";
 function slider1(){
$(".info .book-type .active").each(function(){
if(!$(this).is(":last-child")){
    $(this).delay(4000).fadeOut(1000, function(){
    $(this).removeClass("active").next().addClass("active").fadeIn();
    slider1();
    });
}
else{

    $(this).delay(4000).fadeOut(1000,function(){

        $(this).removeClass("active");
        $(".info .book-type div").eq(0).addClass("active").fadeIn();
        slider1();
    });
}
});
};

slider1();
</script>