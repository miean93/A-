+function(){
	var focus_vr 		= $('.focus-vr');
		btn_nav_ul 		= $('.focus-nav ul',focus_vr),
		btn_nav_items 	= $('li',btn_nav_ul),
		viewport 		= $('.focus-viewport',focus_vr),
		iframe 			= $('iframe',focus_vr),
		btn_prev		= $('.focus-prev',focus_vr),
		btn_next		= $('.focus-next',focus_vr),
		index 			= 0,
		marginleft 		= 0,
		btn_nav_ul_width = btn_nav_items.length*170;
	
	var init = function (params) {		
		btn_nav_ul.css({width:btn_nav_ul_width});
		bindClick();
		btn_nav_items.first().addClass('active');
		change_nav(0);
	}
	
	var bindClick = function () {
		btn_nav_items.bind("click",function(){
			slider($(this));
			index = btn_nav_items.index($(this));
			change_nav(index);
		});
		
		btn_prev.bind("click",prev);
		btn_next.bind("click",next);
	}
	
	var change_nav = function (index) {
		marginleft = viewport.width()/2-index*170-75;
		marginleft = marginleft > 0 ? 0 : marginleft;
		marginleft = (btn_nav_ul_width + marginleft) < viewport.width() ? viewport.width()- 60 - btn_nav_ul_width : marginleft;
		btn_nav_ul.stop(true,true).animate({'margin-left':marginleft},300,function(){
			iframe.attr({'src':btn_nav_items.eq(index).attr('data-src')});
		});	
	}
	
	var slider = function (btn) {
		if(btn.hasClass('active')) return;
		btn_nav_items.removeClass('active');
		btn.addClass("active");
	}
	
	var prev = function(){
		var slide_now = btn_nav_items.index(btn_nav_items.filter('.active'));
		slide_now = slide_now-1<0?btn_nav_items.length-1:slide_now-1;
		btn_nav_items.removeClass('active');
		btn_nav_items.eq(slide_now).addClass("active");
		change_nav(slide_now);
	}
	
	var next = function(){
		var slide_now = btn_nav_items.index(btn_nav_items.filter('.active'));			
		slide_now = (slide_now+2>btn_nav_items.length)?0:slide_now+1;
		btn_nav_items.removeClass('active');
		btn_nav_items.eq(slide_now).addClass("active");
		change_nav(slide_now);
	}
	init();
}();