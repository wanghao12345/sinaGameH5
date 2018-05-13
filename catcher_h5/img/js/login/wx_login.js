$(function(){

	//微信授权登录
	$('#webchat_btn').on('click',function(){
		//判断是否已经授权过
		
		// 授权过

		// 未授权
		wxRequest();
	})
	var appid = getUrlParam(param);
	if (appid!=null) {
		wxRequest();
	}
})


/**
 * 获取url上的参数
 */
function getUrlParam(param){
    var reg = new RegExp("(^|&)" + param + "=([^&]*)(&|$)", "i"); 
    var r = window.location.search.substr(1).match(reg); 
    if (r != null) return unescape(r[2]); 
    return null; 
}
/**
 * 开始
 */
function wxRequest(){
	var wx_code = getUrlParam('code');
	if (wx_code == null) {
		window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx43d8e413ecccb057&redirect_uri=http://web.zhuazhuale.4utec.cn:8902/oauth2.php&response_type=code&scope=snsapi_login&state=1#wechat_redirect";		
	}else{
		getWeixinUserInfo(wx_code,function(data){
			alert(data);
   		});
	}
}

/**
 * 获取用户数据信息
 */
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
 * cookie存储
 */




