
$(function(){
//IOS微信浏览器
	$("body>*").bind("click",function(){});
	// tab
	$('ul#tab').on('click','li',function(){
		$('ul#tab li').removeClass('active');
		$(this).addClass('active');
		//加载机器列表
		RequestMachineList($(this).attr('value'));		
	})

	/**
	 *菜单
	 */
	$('#logo-btn').on('click',function(){
		$(".menu-frame").load("template/menu.html",function(){
			getMenuUserInfo();
		});
	})
	$('.menu-frame').on('click','.menu',function(){
		$(this).remove();
	})
	/**
	 * banner
	 */
	getBanner();

	$('#flexslider').on('click',function(){
		var href = $('#slides .flex-active-slide a').attr('href');
		window.location.href = href;
	})


	 /*******************-----意见反馈-----******************/
	 //打开
	$('.menu-frame').on('click','#menu_news',function(){
		$(".menu-list-frame").load("template/menu-Opinion.html");
	})
	//关闭
	$('.menu-list-frame').on('click','#close',function(){
		$('.menu-list-frame').html('');
	});
	//取消
	$('.menu-list-frame').on('click','#cancer',function(){
		$('.menu-list-frame').html('');
	});
	//确定
	$('.menu-list-frame').on('click','#opinion-query',function(){
		var advice = $('.menu-list-news #textarea').val();
		feelbackOpinion(advice);
		$('.menu-list-frame').html('');
	});
	//监听输入
	$('.menu-list-frame').on('input propertychange','#textarea',function(){
		var value = $(this).val().length;
		$('.menu-list-news #wordsNumber').html(value);
	})
	/*******************-----联系我们-----******************/
	 //打开
	$('.menu-frame').on('click','#menu-connect',function(){
		$(".menu-list-frame").load("template/menu-connect.html");
	})
	//确定
	$('.menu-list-frame').on('click','#connect-query',function(){
		$('.menu-list-frame').html('');
	});
	/*******************-----邀请好友-----******************/
	 //打开
	$('.menu-frame').on('click','#menu-share',function(){
		$(".menu-list-frame").load("template/menu-share1.html");
		InvitationCodeShare(token);	
	})
	//返回
	$('.menu-list-frame').on('click','.share1 #share1-back',function(){
		$('.menu-list-frame').html('');
	})	
	//分享
	$('.menu-list-frame').on('click','.share1 #share-btn',function(){
		$('.menu-list-frame').html('');
		$(".menu-list-frame").load("template/menu-share.html");	
	});
	//确定分享
	$('.menu-list-frame').on('click','.menu-list-shares #share-query',function(){
		$('.menu-list-frame').html('');
	});	
	/*******************-----幫助-----******************/
	 //打开
	$('.menu-frame').on('click','#menu-help',function(){
		$(".menu-list-frame").load("template/menu-help.html");
		InvitationCodeShare(token);	
	})	
	/*******************-----今日签到-----******************/
	$('.menu-list-frame').on('click','#sign-query',function(){
		getSign();
		todaySign();
	})
	/*******************-----选择机器-----******************/
	$('ul#machineList').on('click','li',function(){
		//判断是否可以进行游戏
		var value = $(this).attr('value');
		if (value == 0) {
			addTip('设备正在维修！');
		}else{
			$('.main-container').css('display','none');
			$('.game-cantainer').css('display','block');

			var mid = $(this).find('input#mid').val();
			var doll_id = $(this).find('input#doll_id').val();

			index_mid = mid;
			index_tk = token;
			index_guestno = guestno;
			index_doll_id = doll_id;
			// window.location.href="index.html?mid="+mid+"&tk="+token+"&guestno="+guestno+"&doll_id="+doll_id;
			sendTcpLogin();	

			var myVideo=document.getElementById("video");
			myVideo.play();		
		}



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
	$('#my-coin').on('click',function(){
		addTip('请下载app充值！');
	})


	/*******************-----IOS微信浏览器-----******************/
	$('body').on('touchmove touchstart', function (event) {
	    event.preventDefault();
	});


})