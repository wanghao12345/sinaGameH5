var $_GET = (function() {
  var url = window.document.location.href.toString();
  var u = url.split("?");
  if (typeof(u[1]) == "string") {
    u = u[1].split("&");
    var get = {};
    for (var i in u) {
      var j = u[i].split("=");
      get[j[0]] = j[1];
    }
    return get;
  } else {
    return {};
  }
})();

window.onload = function(){
	// 判断是否含有openid
	var wx_zhuazhuale_openid = getCookie('wx_zhuazhuale_openid');
	if (wx_zhuazhuale_openid==null || wx_zhuazhuale_openid==undefined) {
		var wx_code = $_GET['code'];
		if (wx_code==null) {	
			window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx43d8e413ecccb057&redirect_uri=http://web.zhuazhuale.4utec.cn:8902/index.html&response_type=code&scope=snsapi_login&state=1#wechat_redirect";
		}else{

			getGameUserInfoByCode(wx_code);
			/*getWeixinUserInfo(wx_code,function(data){
				var data1 = JSON.parse(data);
				var arr = data1.split(":");
				var openid = arr[1].split(",")[0];
				setCookie('wx_zhuazhuale_openid',openid,30);
	    	});*/
		}
	}else{
		getGameUserInfoByOpenid(wx_zhuazhuale_openid);
	}



}

var weixinUrl = "http://web.zhuazhuale.4utec.cn:8902/wx.php";
getWeixinUserInfo = function(code,complete){
	$.ajax({
	    type: "GET",
	    dataType: "text",
	    url: (weixinUrl+"?do=getUserInfo&&code="+code),
	    success: function (data) {
	    	complete(data);
	    },
	    error: function (data){
//	        alert("网络不给力, 请稍候再试");
	    },
	    complete : function(jdxhr, status){

	    }
	});
}

/**
 * 通过code获取游戏用户的基本信息
 */
function getGameUserInfoByCode(code){
	var URL = 'http://web.zhuazhuale.4utec.cn:9107/4?ish=1&code='+code;
	$.ajax({
	    type: "GET",
	    dataType: "text",
	    url: URL,
	    success: function (data) {
	    	var data = JSON.parse(data);
			token = data.ret[0].d.token;
	    	guestno = data.ret[0].d.guestno;
	    	var openid = data.ret[0].d.openid;
	    	setCookie('wx_zhuazhuale_openid',openid,30);
	    	RequestMachineList(0);
	    	getUserInfo(data,'ish1');
	    },
	    error: function (data){

	    }
	});		
}
/**
 * 通过openid获取游戏用户的基本信息
 */
function getGameUserInfoByOpenid(openid){
	var URL = 'http://web.zhuazhuale.4utec.cn:9107/4?ish=1&openid='+openid;
	$.ajax({
	    type: "GET",
	    dataType: "text",
	    url: URL,
	    success: function (data) {
	    	var data = JSON.parse(data);
	    	if (data.ret[0].d.errcode=="-1" || data.ret[0].d.errcode==-1) {
	    		delCookie('wx_zhuazhuale_openid');
	    		location.reload();
	    	}

			token = data.ret[0].d.token;
	    	guestno = data.ret[0].d.guestno;
	    	RequestMachineList(0);
	    	getUserInfo(data,'ish1');	    	
	    },
	    error: function (data){

	    }
	});		
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