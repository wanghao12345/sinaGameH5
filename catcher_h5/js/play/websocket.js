socket = new WebSocket("ws://api.zhuazhuale.4utec.cn:65154");
//打开事件
socket.onopen = function(){
    console.log("Socket 已打开");
    sendTcpLogin();
};
//获得消息事件
socket.onmessage = function(msg){
    console.log(msg.data);
    var data = JSON.parse(msg.data);
    switch(data.i){
        case 10002: //tcplogin请求
            getTcpLogin(data.d);
        break;
        case 10004: //房间正忙
            getStartGame(data);
        break;
        case 10010: //开始游戏
            getStartGame(data);
        break;
        case 10011: //获取旁观信息
            getOnlooker(data.d);
        break;
        case 10012: //离开游戏
            getLeaveGame(data.d);
        break;  
        case 10015: //抓取结果
            getCatchDollResult(data.d);
        break;
        case 10016: //抓取剩余时间
            getSurplusTime(data.d);
        break;
        case 10018: //接收弹幕
            getBarrage(data.d);
        break;               
        case 10020: //获取旁观头像
            getOnlookerImg(data.d);
        break;
        case 10022: //获取用户碎片数
            getFragment(data.d);
        break;
        case 10023: //是否有人在玩
            getIsHavePerson(data.d);
        break;     
    }
};
//关闭事件
socket.onclose = function(){
    console.log("Socket 已关闭");
};
//发生了错误事件
socket.onerror = function(){
    console.log("发生了错误");
}
//发送
var sendSocket = function(data){
    socket.send(data);
}
//关闭
var closeSocket = function(){
    socket.close();
}
/**
 * 获取长连接登录的数据
 */
function getTcpLogin(data){

    //发起获取旁观信息请求
    sendOnlooker();        

}
/**
 * 获取旁观信息
 */
function getOnlooker(data){
    var money = data.money;
    $('span#coin-number').html(money);
    var watch = data.watch;
    $('i#watch').html(watch);
    //抓取价格
    var price = data.price+'/次';
    $('#need-price').html(price);
    //抓取所需卷
    var machine_free = data.machine_free+'/次';
    $('#need-free').html(machine_free);
    //获取操作视频的一些信息
    startGame();
}
/**
 * 获取旁观头像 
 */
function getOnlookerImg(data){
    var item = data.viewers_head;
    for (var i = 0; i < 3; i++) {
        $('#head-img'+(i+1)).html('<img src='+item[i].img+' alt="头像" />');
    }
}
/**
 * 获取用户碎片数
 */
function getFragment(data){

}

/**
 * 获取是否有人在玩
 */
function getIsHavePerson(data){
    $('.game-cantainer #game-user .status').addClass('hide');
    $('.game-cantainer #game-user #status1').removeClass('hide');
    $('.game-cantainer #game-user #head-img0').removeClass('hide');

    if (data.do_headimg == "" || data.do_name == "") {
        $('#game-user').html('<div class=status>当前房间空闲</div>');
    } else {
        var content = '<div class="head-img" id="head-img0"><img src='+data.do_headimg+' alt="头像" /></div>';
        content += '<div class="status1">';
        content += '<div class="status-name">'+data.do_name+'</div>';
        content += '<div class="status-content">正在抓取...</div>';
        content += '</div>';
        $('#game-user').html(content);
    }


}

/**
 * 开始游戏
 */
function getStartGame(data){
    if (data.i == 10010) {
        var ip = data.d.ip1;
        var pwd = data.d.pwd;
        var port = data.d.operate_port+1
        connectMachine(ip,port,pwd);
        //去掉loading
        $('.game-cantainer .loading-back').remove();
    }
    if (data.i == 10004) {
        addTip(data.d.msg);
    }
}
/**
 * 离开游戏
 */
function getLeaveGame(data){
    
}


/**
 * 抓取结果
 */
function getCatchDollResult(data){
    addCatchResultTipFun(data.msg+',是否继续游戏？');
    // if (data.result==1) {//抓到了
    //     addCatchResultTipFun(msg+',是否继续游戏？')
    // } else { //没有抓到
    //     addCatchResultTipFun(msg+',是否继续游戏？')
    // }
}
/**
 * 获取抓取剩余时间，并且倒计时
 */
function getSurplusTime(data){
    var end_time = data.end_time;
    var time = data.time;
    var count_time = parseInt(timestampToTime(end_time - time));
    $('.game-cantainer .container .time i#countDown').html(count_time);
    var time = window.setInterval(function(){
        count_time = count_time -1;
        if (count_time>=0) {
            if (count_time==20) {
                $('.game-cantainer .container .time').css('display', 'block');
            }
            $('.game-cantainer .container .time i#countDown').html(count_time);
        } else {
            window.clearInterval(time);
            $('.game-cantainer .container .time').css('display', 'none');
        }
    },1000)
}
/**
 * 取出时间戳里面的秒
 */
function timestampToTime(timestamp) {
    var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    s = date.getSeconds();
    return s;
}




/**
 * 接收弹幕
 */
function getBarrage(data){
    var msg = data.result;
    $('canvas').barrager([{"msg":msg}]);
}