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
	var wx_code = $_GET['code'];
	alert(wx_code);
	if (wx_code==null) {	
		// window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx43d8e413ecccb057&redirect_uri=http://web.zhuazhuale.4utec.cn:8902/oauth2.php&response_type=code&scope=snsapi_login&state=1#wechat_redirect";
		window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx43d8e413ecccb057&redirect_uri=http://web.zhuazhuale.4utec.cn:8902/index.html&response_type=code&scope=snsapi_login&state=1#wechat_redirect";
	}else{
		getWeixinUserInfo(wx_code,function(data){
			getGameUserInfo(wx_code,data);



    	});
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
 * 获取游戏用户的基本信息
 */
function getGameUserInfo(code,data){

	alert('code:    '+code);
	alert('data:    '+data);


/*	$.ajax({
	    type: "GET",
	    dataType: "text",
	    url: ("https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx43d8e413ecccb057&redirect_uri=http://web.zhuazhuale.4utec.cn:8902/oauth2.php&response_type=code&scope=snsapi_login&state=1#wechat_redirect"),
	    success: function (data) {
	    	alert(data);
	    },
	    error: function (data){

	    },
	    complete : function(jdxhr, status){

	    }
	});	*/	
}




/**
 * 存储用户的数据信息
 */
function setCookieWxUserInfo(jsonStr){
	var data = JSON.parse(jsonStr);

	var wx_userinfo_zhuazhuale_headimgurl = data.headimgurl;
	var wx_userinfo_zhuazhuale_headimgurl



}
/**
 * 获取用户的数据信息
 */
function getCookieWxUserInfo(){

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