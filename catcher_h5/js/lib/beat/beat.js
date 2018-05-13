/**
 *跳动
 */
var Beat_tips_time1,Beat_tips_time2;
function DocumentBeat1(Document){
	Beat_tips_time1 = window.setInterval(function(){
		DocumentBeatTop(Document);
	},2000);
}
function DocumentBeat2(Document){
	Beat_tips_time2 = window.setInterval(function(){
		DocumentBeatTop(Document);
	},2000);
}

function DocumentBeatTop(Document){
	var time1 = window.setTimeout(function(){
		$(Document).css('margin-top','-0.2rem');
		DocumentBeatBottom(Document);
	},500);	
}
function DocumentBeatBottom(Document){
	var time2 = window.setTimeout(function(){
		$(Document).css('margin-top','0rem');
	},500);
}



