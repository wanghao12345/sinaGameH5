$(function(){
	//加入loading
	$(".loading-back").load("template/loading/loading.html",function(){
		start_loading_animate();
	});
	//menu
	$('#menu-btn').on('click',function(){
		var value = $(this).attr("value");
		if (value == '1') {//展开状态
  			$(".menu-list").animate({'height':'1.8rem'});
			$(this).attr("value","0");
		} else {//收缩状态
			// $(".menu-list").animate({'height':'9rem'});
			$(".menu-list").animate({'height':'7.2rem'});
			$(this).attr("value","1");
		}
	})
	/***********************----弹幕----************************/
	// $('canvas').barrager([{"msg":'弹幕消息'}]);
	$('#barrage').on('click',function(){
		var value = $(this).attr('value');
		if (value == "0") {//切换到不弹幕
			$(this).find('img').attr('src','img/game/tan1.png');
			$(this).attr('value','-1');	
			$('canvas').barrager("clear");
		}
		if (value == "-1") {//切换到弹幕
			$(this).find('img').attr('src','img/game/tan.png');
			$(this).attr('value','0');	
			sendBarrage();
		}		
	})

	/***********************----报修----************************/
	//打开
	$('#setup').on('click',function(){
		$(".game-menu-list").load("template/game/menu-setup.html");

	})
	//确定
	$('.game-menu-list').on('click','#setup-query',function(){
		$(".game-menu-list").html('');
		repairRequest();
	})


	/*************************-----详情-----***********************/
	//打开
	$('#detail').on('click',function(){
		$(".game-menu-list").load("template/game/menu-detail.html");
		CommodityDetails();
	})
	//关闭
	$('.game-menu-list').on('click','#close',function(){
		$(".game-menu-list").html('');
	})
	//取消
	$('.game-menu-list').on('click','#cancer',function(){
		$(".game-menu-list").html('');
	})
	//确定
	$('.game-menu-list').on('click','#detail-query',function(){
		$(".game-menu-list").html('');
	})
	/*************************-----帮助-----***********************/
	$('#help').on('click',function(){
		$(".game-menu-list").load("template/game/menu-help.html");
	})	
	/*******************-----提示框-----******************/	
	//關閉
	$('body').on('click','.tip #tip-close',function(){
		$('body .tip').remove();
	})
	//確定
	$('body').on('click','.tip #tip-btn',function(){
		$('body .tip').remove();
	})
	/*******************-----充值-----******************/
	$('#coin-number').on('click',function(){
		addTip('请下载app充值！');
	})

	/*******************-----抓取结果-----******************/
	$('body').on('click', '.tip #CatchResult-btn-cancer', function(event) { //取消
		window.history.go(-1);
	});	
	$('body').on('click', '.tip #CatchResult-btn-query', function(event) { //确定
		window.location.reload();
	});



})




