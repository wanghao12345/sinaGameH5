var token = '';
var guestno = ''
/**
 * 登录方式
 */
 getUrlToken();
function getUrlToken(){
	var login_type = getUrlParam('login_type');
	switch(login_type){
		case 'phone':
			login_phone();
		break;
		default:
			window.location.href='template/login/login-phone.html?type=switch';
		break;

	}
}

/**
 *登录
 */ 
function login_phone(){
	var p = {};
	var phone = getUrlParam('phone');
	var code = getUrlParam('code');
	var qpwd = getUrlParam('qpwd');

	if(phone!=null && code!=null){
		p.phone = phone;
		p.code = code;
	}
	if(phone!=null && qpwd!=null){
		p.phone = phone;
		p.qpwd = qpwd;
	}
 	var myUrl = 'http://api.zhuazhuale.4utec.cn:9107/92';
	$.ajax({
	  url: myUrl,
	  type: 'get',
	  data:p,
	  dataType: 'json',
	  success: function (data) {
	    console.log(data)
	    if (data.ret[0].d.errcode==0) {
		    token = data.ret[0].d.token;
		    guestno = data.ret[0].d.guestno;
		    RequestMachineList(0);
		    getUserInfo(data,'ish');
	    } else {
	    	delCookie('login_phone_code');
	    	delCookie('login_phone_qpwd');
	    	window.history.go(-1);
	    }


	  },
	  fail: function (err) {
	    console.log(err)
	  }
	})	
 }

/**
 * 获取测试token,guestno
 */
// getTestToken();
function getTestToken(){
	var myUrl = 'http://api.zhuazhuale.4utec.cn:9107/70';
	$.ajax({
	  url: myUrl,
	  type: 'get',
	  dataType: 'json',
	  success: function (data) {
	    console.log(data)
	    token = data.ret[0].d.token;
	    guestno = data.ret[0].d.guestno;
	    RequestMachineList(0);
	    getUserInfo(data,'ish');
	  },
	  fail: function (err) {
	    console.log(err)
	  }
	})		
}

/**
 *获取机器类型
 */
RequestMachineType();
function RequestMachineType(){
	var myUrl = 'http://api.zhuazhuale.4utec.cn:9107/45';
	$.ajax({
	  url: myUrl,
	  type: 'get',
	  dataType: 'json',
	  success: function (data) {
	    console.log(data)
	    var item = data.ret[0].d.categoryList;
	    var width = item.length*2.8+1;
	    $('#tab').css('width',width+'rem');
	    $('#tab').html('');
	    for (var i = 0; i < item.length; i++) {
	    	var id = item[i].id;
	    	var name = item[i].name;
	    	if (i == 0) {
	    		var content = '<li class="active" value='+id+'>';
	    	} else {
	    		var content = '<li value='+id+'>';
	    	}
	    	content += '<div class="tab">';
	    	content += '<div class="tab-bottom">'+name+'</div>';
	    	content += '</div>';
	    	content += '</li>';
	    	$('#tab').append(content);
	    }
	  },
	  fail: function (err) {
	    console.log(err)
	  }
	})	
}

/**
 *获取机器列表
 */
function RequestMachineList(type) {
	var myUrl = 'http://api.zhuazhuale.4utec.cn:9107/14?type='+type+'&tk='+token;
	$.ajax({
	  url: myUrl,
	  type: 'get',
	  dataType: 'json',
	  success: function (data) {
	    console.log(data)
	    $('ul#machineList').html('');
	    var item = data.ret[0].d.machineData;
	    for (var i = 0; i < item.length; i++) {
	    	var mid = item[i].mid;//机器id
	    	var doll_id = item[i].doll_id;//玩偶id
	    	var price = item[i].price;
	    	var inventory = item[i].inventory;//库存
	    	var status = item[i].status;//状态
	    	var img_url = 'http://api.zhuazhuale.4utec.cn:9107/'+item[i].img_url;
	    	var name = item[i].name;//名字
	    	if (inventory == 0 || status==2) { //不可以游戏
	    		var content = '<li value="0">';
	    	}else{
	    		var content = '<li>'
	    	}
	    	content += '<input type="hidden" id="mid" value='+mid+' />';
	    	content += '<input type="hidden" id="doll_id" value='+doll_id+' />';
	    	content += '<div class="list">';
	    	// content += '<div class="list-top list-top-free">';
	    	/*if (inventory>0 && inventory <= 10) {
	    		content += '<div class="surplus"><img src="img/index/surplus.png" alt="剩余"/></div><div class="list-num">'+inventory+'</div>';
	    	}*/
	    	if (status==2 || (inventory == 0 && status!=2)) { //维修中
		    	content += '<div class="list-top list-top-repair">';
	    		content += '<div class="list-status">';
		    	content += '<img src="img/index/list-top-repair-i.png" alt="维修中">';
		    	content += '<span style="color:#b3b3b3">维修中</span>';		
		    	content += '</div>';	    		
	    	}else if (status==1) { //使用中
				content += '<div class="list-top list-top-use">';
	    		content += '<div class="list-status">';
		    	content += '<img src="img/index/list-top-use-i.png" alt="使用中">';
		    	content += '<span style="color:#ffc52b">使用中</span>';		
		    	content += '</div>';				
	    	}else{//空闲
				content += '<div class="list-top list-top-free">';
	    		content += '<div class="list-status">';
		    	content += '<img src="img/index/list-top-free-i.png" alt="空闲中">';
		    	content += '<span style="color:#2dcdff">空闲中</span>';		
		    	content += '</div>';		
	    	}
			/*switch(status){
	    		case 1://使用中
			    	content += '<div class="list-status list-status2">';
			    	content += '<img src="img/index/list_status2.png" alt="使用中">';
			    	content += '<span>使用中......</span>';
			    	content += '</div>';	    		
	    		break;
	    		case 2://维护
			    	content += '<div class="list-status list-status1">';
			    	content += '<img src="img/index/list_status1.png" alt="维修中">';
			    	content += '<span>维修中......</span>';
			    	content += '</div>';		    		
	    		break;
	    	}*/
	    	content += '<div class="list-img">';
	    	content += '<img src='+img_url+' alt="测试">';
	    	content += '</div>';
	    	content += '</div>';
	    	content += '<div class="list-bottom">';
	    	content += '<div class="list-title">'+name+'</div>';
	    	content += '<div class="list-coin"><img src="img/index/coin_left.png" alt="" /><span>'+price+'/次</span></div>';
	    	content += '</div>';
	    	content += '</div>';
	    	content += '</li>';
	    	$('ul#machineList').append(content);
	    }
	  },
	  fail: function (err) {
	    console.log(err)
	  }
	})	
}

/**
 * 获取用户的基本信息
 */
function getUserInfo(data,ish){
	var item = data.ret[0].d;
	var head_img;
	if (ish=='ish1') {
		head_img = item.headImg;
	}else if (ish == 'ish'){
		head_img = 'http://api.zhuazhuale.4utec.cn:9107'+item.headImg;		
	}
	$('#head-img').html('<img src='+head_img+' alt="头像" />');
	var head_name = item.name;
	$('#head-name').html(head_name);
	var money = item.leftMoney;
	$('#my-coin').html(money);
	var inviation_code = item.inviation_code;//ID
	$('#inviation_code').html(inviation_code);
	var bonus = item.bonus;//积分
	$('#bonus').html(bonus);
	var freetimes = item.freeTimes;//个人卷数量
	$('span#my-voucher').html(freetimes);
	var totalDay = item.totalDay;//登录的总天数
	$('#totalDay').html(totalDay);
	var sigStatus = item.sigStatus;//今天的登录状态
	$('#sigStatus').html(sigStatus);
	if (sigStatus == 0) {//未领取，打开领奖
		$(".menu-list-frame").load("template/tip/sign.html",function(){
			for (var i = 1; i <= totalDay; i++) {
				$('#sign-img'+i).append('<img src="img/sign/ok.png" id="ok">');	
			}
		});
	}
	//是否有未读的邮件
	var mailStatus = item.mailStatus;
	isReadEmail(mailStatus);
	//是否有未读的背包消息
	var cartStatus = item.cartStatus;
	isReadCart(cartStatus);
}
/**
 * 加载菜单上用户的基本信息
 */
function getMenuUserInfo(){
	$('#menu-head-img').html($('#head-img').html());
	$('#menu-head-name').html($('#head-name').html());
	$('#menu-head-ID').html($('#inviation_code').html());
	$('#menu-head-bonus').html($('#bonus').html());

}
/**
 * 意见反馈
 */
function feelbackOpinion(advice){
	var myUrl = 'http://api.zhuazhuale.4utec.cn:9107/23?tk='+token+'&advice='+advice;
	$.ajax({
	  url: myUrl,
	  type: 'get',
	  dataType: 'json',
	  success: function (data) {
	    console.log(data)
	    if (data.ret[0].d.errcode == 0) {
	    	addTip('意见反馈成功！');
	    }
	    if (data.ret[0].d.errcode == -1) {
	    	addTip(data.ret[0].d.msg);
	    }
	  },
	  fail: function (err) {
	    console.log(err)
	  }
	})	
}
/**
 * 分享游戏接口(邀请码分享)
 */
function InvitationCodeShare(token){
	var myUrl = 'http://api.zhuazhuale.4utec.cn:9107/43?tk='+token+'&type=invite';
	$.ajax({
	  url: myUrl,
	  type: 'get',
	  dataType: 'json',
	  success: function (data) {
	    console.log(data)

	    var inviteCode = data.ret[0].d.inviteCode;//邀请码
	    var QR_img = 'http://api.zhuazhuale.4utec.cn:9107'+data.ret[0].d.qrCode;//邀请二维码
	    var inviteCodeArr = inviteCode.split('');
	    $('.share1 #share1-Invitation').html('');
	    $('.share1 #share1-QR').html('');
	    var content = "";
	    for (var i = 0; i < inviteCodeArr.length; i++) {
	    	content += '<span>'+inviteCodeArr[i]+'</span>'
	    }
	    $('.share1 #share1-Invitation').append(content);
	    $('.share1 #share1-QR').append('<img src='+QR_img+' alt="二维码">');
	  },
	  fail: function (err) {
	    console.log(err)
	  }
	})		
}
/**
 * 签到得奖励
 */
function getSign(){
	var myUrl = 'http://api.zhuazhuale.4utec.cn:9107/27?tk='+token;
	$.ajax({
	  url: myUrl,
	  type: 'get',
	  dataType: 'json',
	  success: function (data) {
	    console.log(data)
	    if (data.ret[0].d.errcode == 0) {
			var totalDay = parseInt($('#totalDay').html())+1;
			$('#sign-img'+totalDay).append('<img src="img/sign/ok.png" id="ok">');
			var time = window.setTimeout(function(){
				$(".menu-list-frame").html('');
			},1000)	
	    }
	    if (data.ret[0].d.errcode == -1) {
			addTip('获取奖励失败！');		    	
	    }
	  },
	  fail: function (err) {
	    addTip('获取奖励失败！');
	  }
	})	
}
/**
 * 每日签到
 */
function todaySign(){

	var myUrl = 'http://api.zhuazhuale.4utec.cn:9107/29?tk='+token;
	$.ajax({
	  url: myUrl,
	  type: 'get',
	  dataType: 'json',
	  success: function (data) {
		console.log(data);
	  },
	  fail: function (err) {
	    console.log(err);
	  }
	})	
}
/**
 * 排行榜-富豪榜(消耗排行)
 */
function richList(){
	$('#menu-list-ranks ul#menu-rank-list li').remove();
	var myUrl = 'http://api.zhuazhuale.4utec.cn:9107/16?tk='+token;
	$.ajax({
	  url: myUrl,
	  type: 'get',
	  dataType: 'json',
	  success: function (data) {
		console.log(data);
		var item = data.ret[0].d.rankData;
		var rankPerson = data.ret[0].d.rankPerson;
		$('.menu-list-ranks .my-rank').html('我的排名：第'+rankPerson+'名');
		for (var i = 0; i < item.length; i++) {
			var content = '<li>';
			content += '<div class="ranking-left">';
			content += '<span class="rank-number">'+(i<3? '':(i+1) )+'</span>';
			content += '<span class="rank-name">'+item[i].nickname+'</span>';
			content += '</div>';
			content += '<div class="ranking-right">';
			content += '<span class="rank-icon"></span>';
			content += '<span class="rank-money">'+item[i].consume+'</span>';
			content += '</div>';
			content += '</li>';
			$('.menu-list-ranks ul#menu-rank-list').append(content);
		}
	  },
	  fail: function (err) {
	    console.log(err);
	  }
	})	
}
/**
 * 排行榜-达人榜(抓取排行)
 */
function masterList(){
	$('#menu-list-ranks ul#menu-rank-list li').remove();
	var myUrl = 'http://api.zhuazhuale.4utec.cn:9107/17?tk='+token;
	$.ajax({
	  url: myUrl,
	  type: 'get',
	  dataType: 'json',
	  success: function (data) {
		console.log(data);
		var item = data.ret[0].d.rankData;
		var rankPerson = data.ret[0].d.rankPerson;
		$('.menu-list-ranks .my-rank').html('我的排名：第'+rankPerson+'名');
		for (var i = 0; i < item.length; i++) {
			var content = '<li>';
			content += '<div class="ranking-left">';
			content += '<span class="rank-number">'+(i<3? '':(i+1) )+'</span>';
			content += '<span class="rank-name">'+item[i].nickname+'</span>';
			content += '</div>';
			content += '<div class="ranking-right">';
			content += '<span class="rank-icon-1"></span>';
			content += '<span class="rank-money">'+item[i].claw+'</span>';
			content += '</div>';
			content += '</li>';
			$('.menu-list-ranks ul#menu-rank-list').append(content);	
		}	
	  },
	  fail: function (err) {
	    console.log(err);
	  }
	})	
}
/**
 * 获取积分
 */
function getIntegral(){
	var myUrl = 'http://api.zhuazhuale.4utec.cn:9107/10009?tk='+token;
	$.ajax({
	  url: myUrl,
	  type: 'get',
	  dataType: 'json',
	  success: function (data) {
		console.log(data);
		var item = data.ret[0].d;
		if (item.errcode == 0) {
			$('#menu-list-shoppings .menu-list-shoppings-myIntegral i').html(item.point);
			getShoppingMall();
		} else {
			addTip('商城列表获取失败，请重新登录！');
		}

	  },
	  fail: function (err) {
	    console.log(err);
	  }
	})	
}


/**
 * 积分商城
 */
function getShoppingMall(){
	$('#menu-list-shoppings ul#menu-shopping-list li').remove();
	var myUrl = 'http://api.zhuazhuale.4utec.cn:9107/10007?tk='+token;
	$.ajax({
	  url: myUrl,
	  type: 'get',
	  dataType: 'json',
	  success: function (data) {
		console.log(data);
		var item = data.ret[0].d.list;
		for (var i = 0; i < item.length; i++) {
			var content = '<li>';
			content += '<div class="top">';
			content += '<div class="top-content"><img src=http://api.zhuazhuale.4utec.cn:9107/'+item[i].img_url+' alt="商品图片" /></div>';
			content += '</div>';
			content += '<div class="bottom">';
			content += '<div class="title">'+item[i].name+'</div>';
			content += '<div class="need">所需积分:'+item[i].bonus+'</div>';
			content += '<div class="exchange-btn">';
			content += '<button value='+item[i].im_id+' id="shopping-exchange-btn"></button>';
			content += '</div>';
			content += '</div>';
			content += '</li>';
			$('#menu-list-shoppings ul#menu-shopping-list').append(content);
		}
	  },
	  fail: function (err) {
	    console.log(err);
	  }
	})	
}
/**
 * 积分兑换
 */
function integralExchange(im_id){
	var myUrl = 'http://api.zhuazhuale.4utec.cn:9107/10008?tk='+token+'&im_id='+im_id;
	$.ajax({
	  url: myUrl,
	  type: 'get',
	  dataType: 'json',
	  success: function (data) {
		console.log(data);
		var item = data.ret[0].d;
		if (item.errcode == 0) {
			addTip('积分兑换成功！');
			getIntegral();
		} else {
			addTip(item.msg);
		}

	  },
	  fail: function (err) {
	    console.log(err);
	  }
	})	
}

/**
 * 查询兑换码
 */
function redeemCode(code){
	var myUrl = 'http://api.zhuazhuale.4utec.cn:9107/44?tk='+token+'&code='+code+'&flag=0';
	$.ajax({
	  url: myUrl,
	  type: 'get',
	  dataType: 'json',
	  success: function (data) {
		console.log(data);
		var item = data.ret[0].d;
		if (item.errcode == 0) {
			$('.menu-list-frame .menu-list-exchanges #code-img').addClass('hide');
			$('.menu-list-frame .menu-list-exchanges #code-content').removeClass('hide');
			$('.menu-list-frame .menu-list-exchanges #exchange-query').attr('value',code);
			if (item.data.coin!=0) {
				$('.menu-list-frame .menu-list-exchanges #code-content #get-pic').html('<img src="img/index/coin_left.png" alt="奖品">x'+item.data.coin);
			}
			if (item.data.bonus!=0) {
				$('.menu-list-frame .menu-list-exchanges #code-content #get-pic').html('<img src="img/index/code.png" alt="奖品">x'+item.data.bonus);
			}
			if (item.data.freetimes!=0) {
				$('.menu-list-frame .menu-list-exchanges #code-content #get-pic').html('<img src="img/game/voucher.png" alt="奖品">x'+item.data.freetimes);
			}
		} else {
			addTip(item.msg);
		}

	  },
	  fail: function (err) {
	    console.log(err);
	  }
	})	
}
/**
 * 确定领取兑换码奖励
 */
function getRedeemCode(code){
	var myUrl = 'http://api.zhuazhuale.4utec.cn:9107/44?tk='+token+'&code='+code+'&flag=1';
	$.ajax({
	  url: myUrl,
	  type: 'get',
	  dataType: 'json',
	  success: function (data) {
		console.log(data);
		var item = data.ret[0].d;
		if (item.errcode == 0) {
			addTip(item.msg);
			$('.menu-list-frame').html('');
		} else {
			addTip(item.msg);
		}

	  },
	  fail: function (err) {
	    console.log(err);
	  }
	})		
}




/**
 * 地址列表
 */
function addressList(){
	$('.menu-list-addresss ul#menu-address-list li').remove();
	var myUrl = 'http://api.zhuazhuale.4utec.cn:9107/7?tk='+token;
	$.ajax({
	  url: myUrl,
	  type: 'get',
	  dataType: 'json',
	  success: function (data) {
		console.log(data);
		var item = data.ret[0].d.AddressData;
		for (var i = 0; i < item.length; i++) {
			var content = '<li><div class="top">';
			if (item[i].def=='1') {//默认地址
				content += '<div class="check checked">';
				content += '<button class="check_img" id="check_img"></button>';
				content += '<div class="check_tip">默认地址</div>';
				content += '</div>';
				content += '<div class="operation">';
			} else {
				content += '<div class="check">';
				content += '<button class="check_img" id="check_img"></button>';
				content += '<div class="check_tip">选择地址</div>';
				content += '</div>';
				content += '<div class="operation hide">';
			}
			content += '<button class="operation1" id="setDefaultAddress" value='+item[i].id+'>设为默认</button>';
			content += '<button class="operation2" id="removeAddress" value='+item[i].id+'>删除地址</button>';
			content += '</div></div>';
			content += '<div class="bottom">';
			content += '<div class="bottom-top">'+item[i].addr+'</div>';
			content += '<div class="bottom-bottom">';
			content += '<div class="bottom-left">'+item[i].name+'</div>';
			content += '<div class="bottom-right">'+item[i].phone+'</div>';
			content += '</div></div></li>';
			$('.menu-list-addresss ul#menu-address-list').append(content);
		}

	  },
	  fail: function (err) {
	    console.log(err);
	  }
	})
}
/**
 * 设为默认地址
 */
function setDefaultAddress(id){
	var myUrl = 'http://api.zhuazhuale.4utec.cn:9107/9?tk='+token+'&no='+id;
	$.ajax({
	  url: myUrl,
	  type: 'get',
	  dataType: 'json',
	  success: function (data) {
		console.log(data);
		var errcode = data.ret[0].d.errcode;
		if (errcode==0) {//成功
			addressList();
			addTip('默认地址设置成功！')
		} else {
			addTip('默认地址设置失败！')
		}
	  },
	  fail: function (err) {
	    console.log(err);
	    addTip('网络错误！')
	  }
	})
}
/**
 * 删除地址
 */
function removeAddress(id){
	var myUrl = 'http://api.zhuazhuale.4utec.cn:9107/8?tk='+token+'&no='+id;
	$.ajax({
	  url: myUrl,
	  type: 'get',
	  dataType: 'json',
	  success: function (data) {
		console.log(data);
		var errcode = data.ret[0].d.errcode;
		if (errcode==0) {//成功
			addressList();
			addTip('删除成功！')
		} else {
			addTip(data.ret[0].d.msg)
		}		
	  },
	  fail: function (err) {
	    console.log(err);
	    addTip('网络错误！');
	  }
	})
}
/**
 * 初始化城市数组
 */
function initAddressCity(){
	var myUrl ='js/lib/city/city.json';
	$.ajax({
	    url: myUrl,
	    type: 'get',
	    data:{},
	    dataType: 'json',
	    success: function (data) {
	    	var prov = data;
	    	$('.tip-frame #menu-list-addedaddress-input select#prov').html('')
	    	for (var i = 0; i < prov.length; i++) {
	    		$('.tip-frame #menu-list-addedaddress-input select#prov').append('<option value='+i+'>'+prov[i].name+'</option>');
	    	}
	    	var city = data[0].city[0].area;
	    	$('.tip-frame #menu-list-addedaddress-input select#city').html('')
			for (var i = 0; i < city.length; i++) {
				$('.tip-frame #menu-list-addedaddress-input select#city').append('<option value='+i+'>'+city[i]+'</option>');
			}
	    },
	    fail: function (err) {
	      console.log(err);
	      addTip('网络错误！');
	    }
	})
}
/**
 * 获取城市（二级联动）
 */
function getAddressCity(index){
	var myUrl ='js/lib/city/city.json';
	$.ajax({
	    url: myUrl,
	    type: 'get',
	    data:{},
	    dataType: 'json',
	    success: function (data) {
	    	var city = data[index].city[0].area;
	    	$('.tip-frame #menu-list-addedaddress-input select#city').html('')
			for (var i = 0; i < city.length; i++) {
				$('.tip-frame #menu-list-addedaddress-input select#city').append('<option value='+i+'>'+city[i]+'</option>');
			}
	    },
	    fail: function (err) {
	      console.log(err);
	      addTip('网络错误！');
	    }
	})
}


/**
 * 增加地址
 */
function addedAddress(data){
	var myUrl = 'http://api.zhuazhuale.4utec.cn:9107/6?tk='+token;
	$.ajax({
	  url: myUrl,
	  type: 'get',
	  data:data,
	  dataType: 'json',
	  success: function (data) {
		console.log(data);
		var errcode = data.ret[0].d.errcode;
		if (errcode==0) {//成功
			$('.tip-frame').html('');
			addressList();
			addTip('新增成功！');
		} else {
			addTip(data.ret[0].d.msg);
		}		
	  },
	  fail: function (err) {
	    console.log(err);
	    addTip('网络错误！');
	  }
	})
}
/**
 * 选择地址列表
 */
function selectAddressList(buy_id){
	$('.menu-list-selectAddresss #menu-list-selectAddress-select .item').remove();
	var myUrl = 'http://api.zhuazhuale.4utec.cn:9107/7?tk='+token;
	$.ajax({
	  url: myUrl,
	  type: 'get',
	  dataType: 'json',
	  success: function (data) {
		console.log(data);
		var item = data.ret[0].d.AddressData;
		for (var i = 0; i < item.length; i++) {
			var content = '<div class="item">';
			if (item[i].def == '1') {
				content += '<div class="top checked">';
				content += '<button class="check"></button>';
				content += '<div class="check-tip">默认地址</div>';
				content += '</div>';
			} else {
				content += '<div class="top">';
				content += '<button class="check"></button>';
				content += '<div class="check-tip">选择地址</div>';
				content += '</div>';				
			}
			content += '<div class="bottom">';
			content += '<div class="bottom-top" value='+item[i].id+'>'+item[i].addr+'</div>';
			content += '<div class="bottom-bottom">';
			content += '<div class="name">'+item[i].name+'</div>';
			content += '<div class="phone">'+item[i].phone+'</div>';
			content += '</div></div></div>';

			$('.menu-list-selectAddresss #menu-list-selectAddress-select').append(content);
		}
		$('.menu-list-selectAddresss #menu-list-selectAddress-select').append('<div id=buy_id style="display:none" value='+buy_id+'></div>');

	  },
	  fail: function (err) {
	    console.log(err);
	  }
	})

 }
/**
 * 确定下单
 */
function queryBuyOrder(data){
	var myUrl = 'http://api.zhuazhuale.4utec.cn:9107/18?tk='+token;
	$.ajax({
	  url: myUrl,
	  type: 'get',
	  data:data,
	  dataType: 'json',
	  success: function (data) {
		console.log(data);
		var errcode = data.ret[0].d.errcode;
		if (errcode==0) {//成功
			cartNoOrderList();
			$('.tip-frame').html('');
			addTip('下单成功');
		} else {
			addTip(data.ret[0].d.msg);
		}		
	  },
	  fail: function (err) {
	    console.log(err);
	    addTip('网络错误！');
	  }
	})	
}
/**
 * 邮件
 */
function emailList(){
	//清除跳动
	window.clearInterval(Beat_tips_time1);
	$('#menu-email i').css('display', 'none');
	//列表内容清除
	$('.menu-list-emails ul#menu-email-list li').remove();
	var myUrl = 'http://api.zhuazhuale.4utec.cn:9107/21?tk='+token;
	$.ajax({
	  url: myUrl,
	  type: 'get',
	  dataType: 'json',
	  success: function (data) {
		console.log(data);
		var item = data.ret[0].d.mailList;
		for (var i = 0; i < item.length; i++) {
			var content = '<li><button value='+item[i].id+'>';
			content +='<div class="email-icon"><img src="img/menulist/menu_email/admin-head.png" alt=""></div>';
			content +='<div class="email-intro">';
			content +='<div class="email-intro-top">'+item[i].name+'</div>';
			content +='<div class="email-intro-bottom">'+item[i].introduction+'</div>';
			content +='</div>';
			content +='<div class="email-time">'+item[i].sendtime+'</div>';
			content +='</button></li>';
			$('.menu-list-emails ul#menu-email-list').append(content);	
		}	
	  },
	  fail: function (err) {
	    console.log(err);
	  }
	})	
}
/**
 * 邮件详情
 */
function emailDetail(id){
	//列表内容清除
	$('.menu-list-emailDetails #menu-list-emailDetail-main-content').html('');
	var myUrl = 'http://api.zhuazhuale.4utec.cn:9107/22?tk='+token+'&no='+id;
	$.ajax({
	  url: myUrl,
	  type: 'get',
	  dataType: 'json',
	  success: function (data) {
		console.log(data);
		var item = data.ret[0].d.MailBody;
		var content = '<div class="title">'+item.name+'</div>';
		content += '<div class="time">'+item.sendtime+'</div>';
		content += '<div class="content">'+item.introduction+'</div>';
		$('.menu-list-emailDetails #menu-list-emailDetail-main-content').append(content);
	  },
	  fail: function (err) {
	    console.log(err);
	  }
	})	
}
/**
 * 判断是否有未读的邮件信息
 */
function isReadEmail(mailStatus){
	if (mailStatus==1) {
		$('#menu-email i').css('display', 'block');
		DocumentBeat1('#menu-email');
	}
}
/**
 * 背包(未下单)
 */
function cartNoOrderList(){
	//清除跳动
	window.clearInterval(Beat_tips_time2);
	$('#menu-knapsack i').css('display', 'none');
	$('.menu-list-carts ul#menu-cart-list li').remove();
	var myUrl = 'http://api.zhuazhuale.4utec.cn:9107/15?tk='+token;
	$.ajax({
	  url: myUrl,
	  type: 'get',
	  dataType: 'json',
	  success: function (data) {
		console.log(data);
		var item = data.ret[0].d.CartData;
		for (var i = 0; i < item.length; i++) {
			var content = '<li class="no-order"><div class="top">';
			content += '<div class="top-left"><img src=http://api.zhuazhuale.4utec.cn:9107/'+item[i].img+' alt="商品图片"></div>';
			content += '<div class="top-right">';
			content += '<div class="name">'+item[i].name+'</div>';
			content += '<div class="getTime">获得时间：'+item[i].time+'</div>';
			content += '<div class="tips">请<i>14天23小时</i>内下单，逾期视为放弃</div>';
			content += '</div></div>';
			content += '<div class="bottom">';
			content += '<button id="buy-btn" value='+item[i].no+'></button>';
			content += '</div></li>';
			$('.menu-list-carts ul#menu-cart-list').append(content);
		}

	  },
	  fail: function (err) {
	    console.log(err);
	  }
	})
}
/**
 * 背包(已下单)
 */
function cartOrderList(){
	//清除跳动
	window.clearInterval(Beat_tips_time2);
	$('#menu-knapsack i').css('display', 'none');
	$('.menu-list-carts ul#menu-cart-list li').remove();
	var myUrl = 'http://api.zhuazhuale.4utec.cn:9107/19?tk='+token;
	$.ajax({
	  url: myUrl,
	  type: 'get',
	  dataType: 'json',
	  success: function (data) {
		console.log(data);
		var item = data.ret[0].d.orderData;
		for (var i = 0; i < item.length; i++) {
			var content = '<li class="no-order order">';
			content += '<div class="status status'+item[i].status+'"></div>';
			content += '<div class="top">';
			content += '<div class="top-left"><img src=http://api.zhuazhuale.4utec.cn:9107/'+item[i].img_url+' alt="商品图片"></div>';
			content += '<div class="top-right">';
			content += '<div class="name">'+item[i].dname+'</div>';
			content += '<div class="getTime">下单时间：'+item[i].created_at+'</div>';
			content += '<div class="tips">'+item[i].addr+'</div>';
			content += '</div></div>';
			content += '</li>';
			$('.menu-list-carts ul#menu-cart-list').append(content);
		}

	  },
	  fail: function (err) {
	    console.log(err);
	  }
	})
}
/**
 * 是否有未读的背包信息
 */
function isReadCart(cartStatus){
	if (cartStatus==1) {
		$('#menu-knapsack i').css('display', 'block');
		 DocumentBeat2('#menu-knapsack');
	}
}
/**
 * 兑换
 */
function exchangeCode(){
	var myUrl = 'http://api.zhuazhuale.4utec.cn:9107/10008?tk='+token;
	$.ajax({
	  url: myUrl,
	  type: 'get',
	  dataType: 'json',
	  success: function (data) {
		console.log(data);
	  },
	  fail: function (err) {
	    console.log(err);
	  }
	})	
}
/**
 * 机器列表进入游戏房间
 */
function goGameRoom(_this){
	$('.main-container').css('display','none');
	// addLoading();
	$('.game-cantainer').css('display','block');
	//加入loading
	$(".loading-back").load("template/loading/loading.html",function(){
		start_loading_animate();
	});

	var mid = $(_this).find('input#mid').val();
	var doll_id = $(_this).find('input#doll_id').val();

	index_mid = mid;
	index_tk = token;
	index_guestno = guestno;
	index_doll_id = doll_id;
	// window.location.href="index.html?mid="+mid+"&tk="+token+"&guestno="+guestno+"&doll_id="+doll_id;
	sendTcpLogin();	

	var myVideo=document.getElementById("video");
	myVideo.play();			
 }
/**
 * 上传头像图片
 */
function upHeadImg(file){
	var formData = new FormData();
	// var img_file = document.getElementById("headImg-file");
	var fileObj = file.files[0];
	formData.append('tk',token);
	formData.append('head_img',fileObj);
	var myUrl = 'http://api.zhuazhuale.4utec.cn:9107/30';
	if (fileObj.size<1048576) {
		$.ajax({
		  url: myUrl,
		  type: 'post',
		  data:formData,
		  dataType: 'json',
		  async: false,
		  processData: false,
		  contentType: false,
		  success: function (data) {
			console.log(data);
			if (data.ret[0].d.errcode == 0) {
				var img_url = data.ret[0].d.new_img;
				$('.container #head-img').html('<img src=http://api.zhuazhuale.4utec.cn:9107'+img_url+'>');
				$('.menu-frame #menu-head-img').html('<img src=http://api.zhuazhuale.4utec.cn:9107'+img_url+' alt="头像">');
			} else {
				addTip(data.ret[0].d.msg)
			}
		  },
		  fail: function (err) {
		    console.log(err);
		  }
		})
	}else{
		addTip('上传图片过大！');
	}



	// var xmlhttp;
	// if (window.XMLHttpRequest){// code for IE7+, Firefox, Chrome, Opera, Safari
	//   xmlhttp=new XMLHttpRequest();
	// }else{// code for IE6, IE5
	//   xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	// }
	// xmlhttp.onreadystatechange=function(){
	// 	if (xmlhttp.readyState==4 && xmlhttp.status==200){
	// 		var data = JSON.parse(xmlhttp.responseText);
	// 	    if (data.ret[0].d.errcode == 0) {
	// 			var img_url = data.ret[0].d.new_img;
	// 			$('.container #head-img').html('<img src=http://api.zhuazhuale.4utec.cn:9107'+img_url+'>');
	// 			$('.menu-frame #menu-head-img').html('<img src=http://api.zhuazhuale.4utec.cn:9107'+img_url+' alt="头像">');
	// 		} else {
	// 			addTip(data.ret[0].d.msg)
	// 		}
	// 	}
	// 	if (xmlhttp.status==413) {
	// 		addTip('上传图片过大！');
	// 	}
	// }
	// xmlhttp.open("POST",myUrl,true);
	// xmlhttp.send(formData);






}
/**
 * 修改名字
 */
function modifyName(name){
	var myUrl = 'http://api.zhuazhuale.4utec.cn:9107/5?tk='+token+'&name='+name;
	$.ajax({
	  url: myUrl,
	  type: 'get',
	  data:{},
	  dataType: 'json',
	  success: function (data) {
		console.log(data);
		if (data.ret[0].d.errcode == 0) {
			$('.container #head-name').html(data.ret[0].d.nickname);
			$(".menu-list-frame").html('');
		} else {
			addTip(data.ret[0].d.msg)
		}
	  },
	  fail: function (err) {
	    console.log(err);
	  }
	})	
}
/**
 * 获取banner数据
 */
function getBanner() {
	var myUrl = 'http://api.zhuazhuale.4utec.cn:9107/52';
	$.ajax({
	  url: myUrl,
	  type: 'get',
	  dataType: 'json',
	  success: function (data) {
	    console.log(data)
	    var item = data.ret[0].d.list;
	    var content = '';
	    var slides = [];
	    for (var i = 0; i < item.length; i++) {
	    	var type = item[i].type;
	    	var slide = '';
	    	switch(type){
	    		case '1'://链接
	    			content += '<li class="sw-slide"><a href='+item[i].url+'><img src='+item[i].img+'></a></li>';
	    		break;
	    		case '2'://跳转机器
	    			content += '<li class="sw-slide" value='+type+' onclick="goGameRoomBanner('+item[i].url+','+item[i].id+')" ><img src='+item[i].img+'></li>';
	    		break;
	    		case '3'://新闻图片
	    			content += '<li class="sw-slide"><a href="img.html?img='+item[i].url+'"><img src='+item[i].img+'></a></li>';
	    		break;
	    		case '4'://跳页面
	    			content += '<li class="sw-slide" onclick="gotoShare()"><img src='+item[i].img+'></li>';	 		
	    		break;	    			    			    		
	    	}
	    	slides.push(slide);

	    }

	    // $('#slides').myslides({'slides':content});
	    //启动banner
	    // $('#slides').append(content);
	    $('#slides').html(content);
	    


	    $(window).load(function() {
        	$('#full_feature').swipeslider();
    	});
    	
	  },
	  fail: function (err) {
	    console.log(err)
	  }
	})	
}
/**
 * banner进入游戏房间
 */
function goGameRoomBanner(mid,doll_id){
	$('.main-container').css('display','none');
	addLoading();
	index_mid = mid;
	index_tk = token;
	index_guestno = guestno;


	index_doll_id = doll_id;
	sendTcpLogin();	

	var myVideo=document.getElementById("video");
	myVideo.play();			
 }
/**
 * banner跳页面
 */
function gotoURL(url){
 	if (url!="" && url!=undefined && url!='undefined') {
 		window.location.href=url;	
 	}
 }
/**
 * banner跳分享页
 */
function gotoShare(){
	$(".menu-list-frame").load("template/menu-share1.html");
	InvitationCodeShare(token);	
 }

/**
 * 获取url中参数
 */
function getUrlParam(param){
    var reg = new RegExp("(^|&)" + param + "=([^&]*)(&|$)", "i"); 
    var r = window.location.search.substr(1).match(reg); 
    if (r != null) return unescape(r[2]); 
    return null; 
}

/**
 * 存储cookie
 * setCookie('username','Darren',30)  
 */ 
function setCookie(c_name, value, expiredays){  
　　var exdate=new Date();  
　　exdate.setDate(exdate.getDate() + expiredays);  
　　document.cookie=c_name+ "=" + escape(value) + ((expiredays==null) ? "" : ";expires="+exdate.toGMTString());  
}  
/**
 * 获取cookie
 * getCookie("username")
 */
function getCookie(name)  {  
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");  
    if(arr=document.cookie.match(reg))  
        return (arr[2]);  
    else  
        return null;  
}  
/**
 * 删除cookie
 */
function delCookie(name)  {  
    var exp = new Date();  
    exp.setTime(exp.getTime() - 1);  
    var cval=getCookie(name);  
    if(cval!=null)  
        document.cookie= name + "="+cval+";expires="+exp.toGMTString();  
}





