/*外面界面点击机器后，你这边就调"tcplogin"，然后调"开始旁观"，
然后如果玩家开始游戏，你这边就调"开始游戏"接口,玩家推出房间到最外面的列表的时候，
就调“结束旁观”*/
var tk = getUrlParam('tk');
var guestno = getUrlParam('guestno');
var mid = getUrlParam('mid');
var doll_id = getUrlParam('doll_id');


/*var params = getUrlParam('params');
console.log(params);*/

// sendTcpLogin();
/**
 * 发起长连接登录
 */
function sendTcpLogin(){
	var os_type = getMobileType();
	var param = '{"path": "10002","d":{"tk":"'+tk+'","guestno":"'+guestno+'","os_type":"'+os_type+'","is_web":"1"}}';
	sendSocket(param);
}
/**
 * 发起获取旁观信息请求
 */
function sendOnlooker(){
	var param = '{"path":"10011","d":{"mid":"'+mid+'"}}';
	sendSocket(param);
}
/**
 * 开始游戏
 */
function startGame(){
	var param = '{"path":"10010","d":{"mid":"'+mid+'","web":"1"}}';
	// var param = '{"path":"10010","d":{"mid":"'+mid+'"}}';
	sendSocket(param);
}
/**
 * 结束旁观
 */
function leaveGame(){
	var param = '{"path":"10012","d":{"mid":"'+mid+'"}}';
	sendSocket(param);
}
/**
 * 发送弹幕
 */
function sendBarrage(){
	var param = '{"path":"10018","d":{"mid":"'+mid+'"}}';
	sendSocket(param);	
}
/**
 * 获取当前手机的系统类型
 */
function getMobileType(){
	var u = navigator.userAgent;
	var device =""; //当前设备信息
	if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {//安卓手机
	    return 1;
	} else if (u.indexOf('iPhone') > -1) {//苹果手机
	    return 2;
	}else{
		return 1;
	}
}
/**
 * 获取商品详情
 */
function CommodityDetails(){
	var myUrl = 'http://api.zhuazhuale.4utec.cn:9107/31?id='+doll_id+'&tk='+tk;
	$.ajax({
	  url: myUrl,
	  type: 'get',
	  dataType: 'json',
	  success: function (data) {
	    console.log(data)
	    var item = data.ret[0].d;
	    var width = item.width;
	    var length = item.length;
	    var material = item.material;
	    var desc = item.desc;
	    var img = 'http://api.zhuazhuale.4utec.cn:9107/'+item.img;
	    $('.menu-list-details span#width').html(width);
	    $('.menu-list-details span#length').html(length);
	    $('.menu-list-details span#material').html(material);
	    $('.menu-list-details span#desc').html(desc);
	    $('.menu-list-details #detail-img').html('<img src='+img+' alt="head" />');
	  },
	  fail: function (err) {
	    console.log(err)
	  }
	})	
}

/**
 * 请求报修
 */
function repairRequest(){
	var myUrl = 'http://api.zhuazhuale.4utec.cn:9107/42?mid='+mid+'&tk='+tk;
	$.ajax({
	  url: myUrl,
	  type: 'get',
	  dataType: 'json',
	  success: function (data) {
	  	console.log(data);
	  	if (data.ret[0].d.errcode == 0) {//成功
	  		addTip(data.ret[0].d.msg);
	  	} else {
	  		addTip(data.ret[0].d.msg);
	  	}
	  },
	  fail: function (err) {
	    addTip('报修失败');
	  }
	})		
}

/**
 * 区分IOS和Android
 */
function isIosOrAndroid(){
	var u = navigator.userAgent;
	if (!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {// ios
	    return 1;
	} else {// android
	    return 0;
	}	
}

/**
 * 插入loading
 */
function addLoading(){
	$('body').append('<div class="loading"></div>');
}
/**
 * 移除loading
 */
function removeLoading(){
	$('body .loading').remove();
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
