;(function($,window,document,undefined){
	var Slides = function(ele,opt){
		this.$element = ele,
		this.default = {
			'stay_time':8000
		},
		this.options = $.extend({},this.defaults,opt)
	}
	Slides.prototype = {
		start:function(){
			var _this = this;
			var index = 0;
			this.$element.html(this.options.slides);
			var length = this.$element.find('li').length;
			this.$element.css({
				'width':length+'00%',
				'overflow':'hidden'
			});
			this.$element.find('li').css('float','left');
			this.$element.find('li').css({
				'float':'left',
				'width':'16rem'
			});
			var time = window.setInterval(function(){
				index = index + 1;
				if (index == length) {
					index = 0;
				}
				_this.$element.css('left','-'+(index*16)+'rem');
				//重新请求数据
				RequestMachineList($('ul#tab li.active').attr('value'));	
			},8000)
		}
	}
	$.fn.myslides = function(options){
		var myslides = new Slides(this,options);
		return myslides.start();
	}
})(jQuery,window,document);