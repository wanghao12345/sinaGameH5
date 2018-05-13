	
$(function(){
	//關閉
	$('body').on('click','.tip #tip-close',function(){
		$('body .tip').remove();
	})
	//確定
	$('body').on('click','.tip #tip-btn',function(){
		$('body .tip').remove();
	})
})





/**
 * 提示
 */
function addTip(msg){
	var content = '<div class="tip" id="tip">';
	content += '<div class="tip-content">';
	content += '<div class="tip-main-content">';
	// content += '<div class="close" id="tip-close"></div>';
	content += '<button class="close" id="tip-close"></button>';
	// content += '<div class="button" id="tip-btn"></div>';
	content += '<button class="button" id="tip-btn"></button>';
	content += '<div class="tip-info" id="tip-info">'+msg+'</div>';
	content += '</div>';
	content += '</div>';
	content += '</div>';
	$('body').append(content);
}
function addTipFun(msg,value){
	var content = '<div class="tip" id="tip">';
	content += '<div class="tip-content tip-content-fun">';
	content += '<div class="tip-main-content">';
	content += '<button class="close" id="tip-close"></button>';
	content += '<button class="button-cancer" id="tip-btn-cancer"></button>';
	content += '<button class="button-query" id="tip-btn-query" value="'+value+'"></button>';
	content += '<div class="tip-info" id="tip-info">'+msg+'</div>';
	content += '</div>';
	content += '</div>';
	content += '</div>';
	$('body').append(content);
}

/**
 * 抓取结果提示
 */
function addCatchResultTipFun(msg){
	var content = '<div class="tip" id="tip">';
	content += '<div class="tip-content tip-content-fun">';
	content += '<div class="tip-main-content">';
	content += '<button class="close" id="CatchResult-btn-cancer"></button>';
	content += '<button class="button-cancer" id="CatchResult-btn-cancer"></button>';
	content += '<button class="button-query" id="CatchResult-btn-query"></button>';
	content += '<div class="tip-info" id="tip-info">'+msg+'</div>';
	content += '</div>';
	content += '</div>';
	content += '</div>';
	$('body').append(content);
}

