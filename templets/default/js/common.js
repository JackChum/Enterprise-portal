$(function(){			   

        $(".fullSlide").slide({titCell:".hd ul", mainCell:".bd ul", effect:"fold", autoPlay:true, autoPage:true, trigger:"click",endFun:function(index){
        	
        	$($('.bannerImg')[index]).fadeIn(2000)
    		
        },startFun:function(index){
        	$('.bannerImg').hide();
        }});
            
//选项卡
        $(".slide_news").slide();
        $(".slide_pro").slide();
//
    $(" .nav ul li").hover(function () {
        $(this).children(".down").stop(true,false).fadeIn(200);
    },
    function () {
        $(this).children(".down").fadeOut("slow");
    });
//遮罩层
	    $(" .nav").hover(function () {
        $(".before").fadeIn(500);
        
    },function (){
    	$(".before").fadeOut(1000)
    	});
//    
    jQuery(".slideBox").slide({mainCell:".bd ul",autoPlay:false}); 
});
