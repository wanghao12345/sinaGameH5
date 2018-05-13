/**
 *开始loading
 */
function start_loading_animate(){
	loading_animate1();
	loading_animate2();
	loading_animate3();
}
/**
 *loading
 */
function loading_animate1() {
	var time1 = window.setInterval(function(){
		var value = parseInt($('.loading-frame .loading-frame-content .img1 img').attr('value'))+1;
		if (value>12) {
			value = 0;
		}
		$('.loading-frame .loading-frame-content .img1 img').attr('value',value);
		var img_url = 'img/loading/ic_load'+value+'.png'
		$('.loading-frame .loading-frame-content .img1 img').attr('src',img_url) 	
	},200)
} 

/**
 *熊
 */
function loading_animate2() {
	var time2 = window.setInterval(function(){
		var value = parseInt($('.loading-frame .loading-frame-content .img2 img').attr('value'))+1;
		if (value>1) {
			value = 0;
		}
		$('.loading-frame .loading-frame-content .img2 img').attr('value',value);
		var img_url = 'img/loading/bear_swim'+value+'.png';
		$('.loading-frame .loading-frame-content .img2 img').attr('src',img_url) 	
	},1000)
} 
/**
 *进度条
 */
function loading_animate3() {
	var time3 = window.setInterval(function(){
		var value = parseInt($('.loading-frame .loading-frame-content .img3 .loading-bar').attr('value'))+5;
		if (value>100) {
			value = 0;
		}
		$('.loading-frame .loading-frame-content .img3 .loading-bar').attr('value',value);
		$('.loading-frame .loading-frame-content .img3 .loading-bar').css('width',value+'%'); 	
	},500)
} 
