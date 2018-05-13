
$(function(){

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
		$(".menu-frame").load("template/menu/menu.html",function(){
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

	 /*******************-----意见反馈-----******************/
	 //打开
	$('.menu-frame').on('click','#menu-news',function(){
		$(".menu-list-frame").load("template/menu/menu-Opinion.html");
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
		$(".menu-list-frame").load("template/menu/menu-connect.html");
	})
	//确定
	$('.menu-list-frame').on('click','#connect-query',function(){
		$('.menu-list-frame').html('');
	});
	/*******************-----邀请好友-----******************/
	 //打开
	$('.menu-frame').on('click','#menu-share',function(){
		$(".menu-list-frame").load("template/menu/menu-share1.html");
		InvitationCodeShare(token);	
	})
	//返回
	$('.menu-list-frame').on('click','.share1 #share1-back',function(){
		$('.menu-list-frame').html('');
	})	
	//分享
	$('.menu-list-frame').on('click','.share1 #share-btn',function(){
		$('.menu-list-frame').html('');
		$(".menu-list-frame").load("template/menu/menu-share.html");	
	});
	//确定分享
	$('.menu-list-frame').on('click','.menu-list-shares #share-query',function(){
		$('.menu-list-frame').html('');
	});	
	/*******************-----排行榜-----******************/
	 //打开富豪榜
	$('.menu-frame').on('click','#menu-rank',function(){
		$(".menu-list-frame").load("template/menu/menu-rank.html");
		$('.menu-list-frame .menu-list-ranks button#rank-tab1').html('<img src="img/menulist/menu_rank/tab1.png" alt="富豪榜">');
		$('.menu-list-frame .menu-list-ranks button#rank-tab2').html('<img src="img/menulist/menu_rank/tab2.png" alt="达人榜">');
		richList();
	})
	//打开富豪榜
	$('.menu-list-frame').on('click','#menu-list-ranks #rank-tab1',function(){	
		richList();
		$('.menu-list-frame .menu-list-ranks button#rank-tab1').html('<img src="img/menulist/menu_rank/tab1.png" alt="富豪榜">');
		$('.menu-list-frame .menu-list-ranks button#rank-tab2').html('<img src="img/menulist/menu_rank/tab2.png" alt="达人榜">');		
	})
	//打开达人榜
	$('.menu-list-frame').on('click','#menu-list-ranks #rank-tab2',function(){
		$('.menu-list-frame .menu-list-ranks button#rank-tab1').html('<img src="img/menulist/menu_rank/tab1_1.png" alt="富豪榜">');
		$('.menu-list-frame .menu-list-ranks button#rank-tab2').html('<img src="img/menulist/menu_rank/tab2_1.png" alt="达人榜">');		
		masterList();
	})
	/*******************-----积分商城-----******************/
	 //打开富豪榜
	$('.menu-frame').on('click','#menu-shoppingMall',function(){
		$(".menu-list-frame").load("template/menu/menu-shopping.html");
		getIntegral();
	})
	//积分兑换
	$('.menu-list-frame').on('click','#menu-list-shoppings #shopping-exchange-btn',function(){
		integralExchange($(this).attr('value'));
	})


	/*******************-----地址列表-----******************/
	 //打开
	$('.menu-frame').on('click','#menu-address',function(){
		$(".menu-list-frame").load("template/menu/menu-address.html");
		addressList();
	})
	//点击选择地址
	$('.menu-list-frame').on('click','.menu-list-addresss #check_img',function(){
		var check = $(this).parent('.check').hasClass('checked');
		$('.menu-list-addresss ul#menu-address-list li .check').removeClass('checked');
		$('.menu-list-addresss ul#menu-address-list li .operation').addClass('hide');
		if (!check) {//点击之前没有选中
			$(this).parent('.check').addClass('checked');
			$(this).parent('.check').parent('.top').children('.operation').removeClass('hide');
		}
	})
	//设为默认地址
	$('.menu-list-frame').on('click','.menu-list-addresss button#setDefaultAddress',function(){
		var value = $(this).attr('value');
		setDefaultAddress(value);
	})	
	//删除地址
	$('.menu-list-frame').on('click','.menu-list-addresss button#removeAddress',function(){
		var value = $(this).attr('value');
		addTipFun('确认删除该地址？',value);
	})	
	/*******************-----添加地址-----******************/
	//打开
	$('.menu-list-frame').on('click','.menu-list-addresss button#add-address-btn',function(){
		$(".tip-frame").load("template/menu/menu-addedaddress-1.html");
		initAddressCity();
	})	
	//确定
	$('.tip-frame').on('click','.menu-list-addedaddresss-1 button#addedaddress-query',function(){
		var address = {};
		address.city = $('.menu-list-addedaddresss-1 #menu-list-addedaddress-input select#prov').text()+$('.menu-list-addedaddresss #menu-list-addedaddress-input select#city').text();
		address.address = $('.menu-list-addedaddresss-1 #menu-list-addedaddress-input .item input#address-detail').val();
		address.name = $('.menu-list-addedaddresss-1 #menu-list-addedaddress-input .item input#name').val();
		address.phone = $('.menu-list-addedaddresss-1 #menu-list-addedaddress-input .item input#phone').val();
		// address.zipcode = '111111111';
		addedAddress(address);
	})	
	//省市二级联动
	$(".tip-frame").on('change','.menu-list-addedaddresss-1 #menu-list-addedaddress-input select#prov',function(){
		var value = $('.menu-list-addedaddresss-1 #menu-list-addedaddress-input select#prov option:selected') .val();
     	getAddressCity(parseInt(value));
 	});	
	/*******************-----兑换-----******************/
	 //打开
	$('.menu-frame').on('click','#menu-exchange',function(){
		$(".menu-list-frame").load("template/menu/menu-exchange.html");
	})
	//查询兑换码
	$('.menu-list-frame').on('click','.menu-list-exchanges #lookFor',function(){
		var code = $('.menu-list-frame .menu-list-exchanges input#code-value').val();
		redeemCode(code);
	})	

	$('.menu-list-frame').on('click','.menu-list-exchanges #exchange-query',function(){
		var code = $(this).attr('value');
		getRedeemCode(code);
	})	
	/*******************-----邮件-----******************/
	 //打开
	$('.main-container').on('click','#menu-email',function(){
		$(".menu-list-frame").load("template/menu/menu-email.html");
		emailList();
	})
	//邮件详情
	$('.menu-list-frame').on('click','ul#menu-email-list li button',function(){
		$(".tip-frame").load("template/menu/menu-emailDetail.html");
		emailDetail($(this).attr('value'));
	})	
	//邮件详情关闭
	$('.tip-frame').on('click','#close',function(){
		$(".tip-frame").html('');
	})	
	/*******************-----修改名字-----******************/
	 //打开
	$('.menu-frame').on('click','#head-name',function(){
		$(".menu-list-frame").load("template/menu/menu-modifyName.html");
	
	})
	//修改名字
	$('.menu-list-frame').on('click','.menu-list-modifyNames #modifyName-query',function(){
		modifyName($('.menu-list-frame .menu-list-modifyNames input#name').val());
	})		


	/*******************-----背包-----******************/
	 //打开未下单
	$('.main-container').on('click','#menu-knapsack',function(){
		$(".menu-list-frame").load("template/menu/menu-cart.html");
		$('.menu-list-frame .menu-list-carts button#rank-tab1').html('<img src="img/menulist/menu_cart/tab1.png" alt="未下单">');
		$('.menu-list-frame .menu-list-carts button#rank-tab2').html('<img src="img/menulist/menu_cart/tab2.png" alt="已下单">');
		cartNoOrderList();
	})
	//打开未下单
	$('.menu-list-frame').on('click', '.menu-list-carts #rank-tab1', function() {
		$('.menu-list-frame .menu-list-carts button#rank-tab1').html('<img src="img/menulist/menu_cart/tab1.png" alt="未下单">');
		$('.menu-list-frame .menu-list-carts button#rank-tab2').html('<img src="img/menulist/menu_cart/tab2.png" alt="已下单">');
		cartNoOrderList();
	});
	//打开已下单
	$('.menu-list-frame').on('click', '.menu-list-carts #rank-tab2', function() {
		$('.menu-list-frame .menu-list-carts button#rank-tab1').html('<img src="img/menulist/menu_cart/tab1_1.png" alt="未下单">');
		$('.menu-list-frame .menu-list-carts button#rank-tab2').html('<img src="img/menulist/menu_cart/tab2_1.png" alt="已下单">');
		cartOrderList();
	});
	/*******************-----确定下单-----******************/
	//打开选择地址
	$('.menu-list-frame').on('click', '.menu-list-carts button#buy-btn', function() {
		$(".tip-frame").load("template/menu/menu-selectAddress.html");
		var buy_id = $(this).attr('value');
		selectAddressList(buy_id);
	});
	//选择地址
	$('.tip-frame').on('click','.menu-list-selectAddresss #menu-list-selectAddress-select button.check',function(){
		var check = $(this).parent('.top').hasClass('checked');
		$('.menu-list-selectAddresss #menu-list-selectAddress-select .top').removeClass('checked');
		if (!check) {//点击之前没有选中
			$(this).parent('.top').addClass('checked');
		}		
	})
	//确定下单
	$('.tip-frame').on('click','.menu-list-selectAddresss .menu-list-selectAddress-button button#buy-query',function(){
		var data = {};
		data.addr_no = $('.menu-list-selectAddresss #menu-list-selectAddress-select .item .checked').parent('.item').find('.bottom .bottom-top').attr('value');
		data.cart_no = $('.menu-list-selectAddresss #menu-list-selectAddress-select #buy_id').attr('value');
		queryBuyOrder(data);
	})	
	//新增地址
	$('.tip-frame').on('click','.menu-list-selectAddresss .menu-list-selectAddress-button button#selectAddress-query',function(){
		$(".tip-frame").load("template/menu/menu-addedaddress.html");
		initAddressCity();
	})	
	//省市二级联动
	$(".tip-frame").on('change','.menu-list-addedaddresss #menu-list-addedaddress-input select#prov',function(){
		var value = $('.menu-list-addedaddresss #menu-list-addedaddress-input select#prov option:selected') .val();
     	getAddressCity(parseInt(value));
 	});	
	//确定新增地址
	$('.tip-frame').on('click','.menu-list-addedaddresss button#addedaddress-query',function(){
		var address = {};
		address.city = $('.menu-list-addedaddresss #menu-list-addedaddress-input select#prov').text()+$('.menu-list-addedaddresss #menu-list-addedaddress-input select#city').text();
		address.address = $('#menu-list-addedaddress-input .item input#address-detail').val();
		address.name = $('#menu-list-addedaddress-input .item input#name').val();
		address.phone = $('#menu-list-addedaddress-input .item input#phone').val();
		addedAddress(address);
	})	
	/*******************-----幫助-----******************/
	 //打开
	$('.menu-frame').on('click','#menu-help',function(){
		$(".menu-list-frame").load("template/menu/menu-help.html");
		InvitationCodeShare(token);	
	})	
	/*******************-----绑定账号-----******************/
	$('.menu-frame').on('click','#menu-bindAccount',function(){
		window.location.href='template/login/login-phone.html?type=bind';
	})	
	/*******************-----切换账号-----******************/
	$('.menu-frame').on('click','#menu-switchAccount',function(){
		window.location.href='template/login/login-phone.html?type=switch';
	})	
	/*******************-----当前版本-----******************/
	$('.menu-frame').on('click','#menu-version',function(){
		addTip('当前版本：1.4');
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
			// 进入游戏房间
			goGameRoom(this);
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
	//取消
	$('body').on('click','.tip #tip-btn-cancer',function(){
		$('body .tip').remove();
	})
	//确认回掉函数
	$('body').on('click','.tip #tip-btn-query',function(){
		var value = $(this).attr('value');
		$('body .tip').remove();
		removeAddress(value);
	})





	/*******************-----充值-----******************/
	$('#my-coin').on('click',function(){
		addTip('请下载app充值！');
	})


	/*******************-----IOS微信浏览器-----******************/


})