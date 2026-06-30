
$(window).on('load',function(){
    $(".over-load .sk-folding-cube ").fadeOut(2000,function(){
        
        $(this).parent().fadeOut(1000,function(){
            $(this).remove();
            $("body").css("overflow","auto");});
    });
});

function slider(){
$(".our-work .active").each(function(){
if(!$(this).is(":last-child")){
    $(this).delay(3000).fadeOut(1000, function(){
    $(this).removeClass("active").next().addClass("active").fadeIn();
    slider();
    });
}
else{

    $(this).delay(3000).fadeOut(1000,function(){

        $(this).removeClass("active");
        $(".our-work div").eq(0).addClass("active").fadeIn();
        slider();
    });
}
});
};
slider();
/*
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
        $(".our-work div").eq(0).addClass("active").fadeIn();
        slider1();
    });
}
});
};

slider1();
*/