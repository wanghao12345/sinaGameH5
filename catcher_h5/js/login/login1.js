$(function(){
	//记住密码
	$('#remember img').on('click',function(){
		$('#remember img').addClass('active');
		$(this).removeClass('active');
	})

	//登录按钮
	$('#login_btn').on('click',function(){
		window.location.href = 'index.html';
	})



})