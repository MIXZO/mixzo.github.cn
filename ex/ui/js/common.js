(function($) {
	$.extend({		
		ZFindDimensions: function() {	//获取完整屏幕分辨率
            var winWidth = 0;
            var winHeight = 0;
            if (window.innerWidth) {
                winWidth = window.innerWidth;
            } else if ((document.body) && (document.body.clientWidth)) {
                winWidth = document.body.clientWidth;
            }
            if (window.innerHeight) {
                winHeight = window.innerHeight;
            } else if ((document.body) && (document.body.clientHeight)) {
                winHeight = document.body.clientHeight;
            }
            if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth) {
                winHeight = document.documentElement.clientHeight;
                winWidth = document.documentElement.clientWidth;
            }
            var _wh = winWidth + '-' + winHeight
            return _wh.split('-');
        },
        ZScreenWidth: function() { //获取屏幕宽度
            return this.ZFindDimensions()[0];
        },
        ZScreenHeight: function() { //获取屏幕高度
            return this.ZFindDimensions()[1];
        }
	});
	//元素hover
	$.fn.ZObjHover = function(options) {
		var defaults = {};
		var o = $.extend(defaults, options);
		return this.each(function() {
			var _this = $(this);
			_this.live('mouseenter', function() {
				$(this).addClass('hover');
			}).live('mouseleave', function() {
				$(this).removeClass('hover');
			});
		});
	};
})(jQuery);