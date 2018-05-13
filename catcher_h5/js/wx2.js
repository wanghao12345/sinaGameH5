var weixinUrl = "http://api.zhuazhuale.4utec.cn:8902/wx.php";
var weixinTitle = "大家抓抓乐";
var weixinDesc = "一起来抓抓乐吧！";
var weixinIcon = "http://api.zhuazhuale.4utec.cn:8902/icon.png";
var weixinShareUrl = "http://api.zhuazhuale.4utec.cn:8902/index.html";

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

getSignPackage = function(title, desc, url, icon){
//	alert(weixinUrl+"?url="+encodeURIComponent(location.href.split('#')[0]));
	$.ajax({
	    type: "GET",
	    dataType: "text",
	    url: (weixinUrl+"?url="+encodeURIComponent(location.href.split('#')[0])),
	    success: function (data) {
//	    	alert("url:"+location.href);
	    	getWeiXinConfig(JSON.parse(data));
	    	getWeixinReady(title, desc,url,icon);
	    },
	    error: function (data){
//	        alert("网络不给力, 请稍候再试");
	    },
	    complete : function(jdxhr, status){
	    }
	});
}

getSignPackage2 = function(title, desc, url, icon, complete){
//	alert(weixinUrl+"?url="+encodeURIComponent(location.href.split('#')[0]));
	$.ajax({
	    type: "GET",
	    dataType: "text",
	    url: (weixinUrl+"?url="+encodeURIComponent(location.href.split('#')[0])),
	    success: function (data) {
//	    	alert("url:"+location.href);
	    	getWeiXinConfig(JSON.parse(data));
	    	getWeixinReady(title, desc,url,icon);
	    },
	    error: function (data){
//	        alert("网络不给力, 请稍候再试");
	    },
	    complete : function(jdxhr, status){
	    	complete();
	    }
	});
}

getWeixinReady = function(title, desc, url, icon){
	wx.ready(function(){
//		alert("getWeixinReady");
	    // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
	    getWeiXinShareTimeline(desc,url,icon,function(){
	    	alert("分享成功");
	    });
	    getWeiXinShareAppMessage(title,desc,url,icon,function(){
	    	alert("分享成功");
	    });
	});
}

getWeiXinConfig = function(signPackage){
	wx.config({
	    debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
	    appId: signPackage.appId, // 必填，公众号的唯一标识
	    timestamp: signPackage.timestamp, // 必填，生成签名的时间戳
	    nonceStr: signPackage.nonceStr, // 必填，生成签名的随机串
	    signature: signPackage.signature,// 必填，签名，见附录1
	    jsApiList: [
            // 所有要调用的 API 都要加到这个列表中
            'checkJsApi',//判断当前客户端是否支持指定JS接口
            'onMenuShareTimeline',//获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
            'onMenuShareAppMessage',//获取“分享给朋友”按钮点击状态及自定义分享内容接口
            'onMenuShareQQ',//获取“分享到QQ”按钮点击状态及自定义分享内容接口
            'onMenuShareWeibo',//获取“分享到腾讯微博”按钮点击状态及自定义分享内容接口
            'hideMenuItems',//批量隐藏功能按钮接口
            'showMenuItems',//批量显示功能按钮接口
            'hideAllNonBaseMenuItem',//隐藏所有非基础按钮接口
            'showAllNonBaseMenuItem',//显示所有功能按钮接口
            'translateVoice',//识别音频并返回识别结果接口
            'startRecord',//开始录音接口
            'stopRecord',//停止录音接口
            'playVoice',//播放语音接口
            'pauseVoice',//暂停播放接口
            'stopVoice',//停止播放接口
            'uploadVoice',//上传语音接口
            'downloadVoice',//下载语音接口
            'chooseImage',//拍照或从手机相册中选图接口
            'previewImage',//预览图片接口
            'uploadImage',//上传图片接口
            'downloadImage',//下载图片接口
            'getNetworkType',//获取网络状态接口
            'openLocation',//使用微信内置地图查看位置接口
            'getLocation',//获取地理位置接口
            'hideOptionMenu',//隐藏右上角菜单接口
            'showOptionMenu',//显示右上角菜单接口
            'closeWindow',//关闭当前网页窗口接口
            'scanQRCode',//调起微信扫一扫接口
            'chooseWXPay',//发起一个微信支付请求
            'openProductSpecificView',//跳转微信商品页接口
            'addCard',//批量添加卡券接口
            'chooseCard',//调起适用于门店的卡券列表并获取用户选择列表
            'openCard'//查看微信卡包中的卡券接口
	    ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
	});
}

getWeiXinShareTimeline = function(title,url,icon,sucessCallback){
	wx.onMenuShareTimeline({
	    title: title, // 分享标题
	    link: url, // 分享链接
	    imgUrl: icon, // 分享图标
	    success: function () { 
	        // 用户确认分享后执行的回调函数
	        sucessCallback();
	    },
	    cancel: function () { 
	        // 用户取消分享后执行的回调函数
	    }
	});
}

getWeiXinShareAppMessage = function(title,desc,url,icon,sucessCallback){
//	alert("getWeiXinShareAppMessage");
	wx.onMenuShareAppMessage({
	    title: title, // 分享标题
	    desc: desc, // 分享描述
	    link: url, // 分享链接
	    imgUrl: icon, // 分享图标
	    type: '', // 分享类型,music、video或link，不填默认为link
	    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
	    success: function () { 
	        // 用户确认分享后执行的回调函数
//	        alert("share app success");
	        sucessCallback();
	    },
	    cancel: function () {
//	    	alert("share app cancel");
	        // 用户取消分享后执行的回调函数
	    }
	});
}