
// 阻止微信长按菜单
document.oncontextmenu=function(e){
    e.preventDefault();
};
function connectMachine(ip,port,pwd){
	var ws = "ws://"+ip+":"+port;
	// var ws = "ws://api.zhuazhuale.4utec.cn:"+port;
	machineSocket = new WebSocket(ws);
	machineSocket.onopen=function(){
		machineSocket.send("big\r\n"+pwd)
	}
	// $("#play-video").attr("src","http://"+ip+":8090/1_A.mjpeg");
	// $("#play-video").attr("src","http://"+ip+":8090/1_A.mjpeg?m="+Math.random());
	var img_url = "http://"+ip+":8090/"+mid+"_A.mjpeg";
	$('#video-content').html('<img id="play-video" style="width:100%; height:100%;" src="'+img_url+'" />');

	$('#play-video').css('pointer-events','none');
	
	$("#play-up").on('touchstart',function(){
		machineSocket.send("iop\r\n"+pwd);
	});
	$("#play-up").on('touchend',function(){
		machineSocket.send("ern\r\n"+pwd);
	});
	$("#play-down").on('touchstart',function(){
		machineSocket.send("vgy\r\n"+pwd);
	});
	$("#play-down").on('touchend',function(){
		machineSocket.send("ern\r\n"+pwd);
	}); 

	$("#play-left").on('touchstart',function(){
		machineSocket.send("tgb\r\n"+pwd);
	});
	$("#play-left").on('touchend',function(){
		machineSocket.send("ern\r\n"+pwd);
	});
	$("#play-right").on('touchstart',function(){
		machineSocket.send("ymg\r\n"+pwd);
	});
	$("#play-right").on('touchend',function(){
		machineSocket.send("ern\r\n"+pwd);
	}); 
	$("#play-catch").on('touchstart',function(){
		$('.game-cantainer .container .time').css('display', 'none');
		machineSocket.send("lre\r\n"+pwd);
	});
}
