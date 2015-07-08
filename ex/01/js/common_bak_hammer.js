var common = (function($) {
	var commonFun = {
			viewportFix: function() {
				zoom = $(window).width() / 640;
				$('#pageWrap').css({
					zoom: (zoom * 100) + "%",
					'-webkit-text-size-adjust': (zoom * 100) + '%'
				});
			},
			heightFix: function() { //框架高度
				$('#pageWrap').height($(window).height() / ($(window).width() / 640));
			},
			actionFun: function() { //页面动作
				//屏蔽上下弹动页面
				$('#pageWrap').on('touchstart', function(event) {
					event.preventDefault();
				});
				commonFun.viewportFix();
				commonFun.heightFix();
				/*竖屏提示*/
				var advice = function() {
					if (window.orientation != undefined) {
						if (window.orientation == 0) {
							$('#advice').hide();
						} else {
							$('#advice').show();
						}
					}
				}
				advice();
				$(window).resize(function() {
					setTimeout(function() {
						commonFun.viewportFix();
						commonFun.heightFix();
					}, 100);
				}).on("orientationchange", function(event) {
					advice();
				});
				window.onload = function() {
					if (document.readyState == 'complete') {
						$('#loading').fadeOut('slow', function() {
							$('.step-1').css('display', 'block').transition({
								'opacity': '1'
							});
						});
					}
				}
				$('.step-box').hammer().on('swipeleft', function() {
					var that = $(this),
						index = that.index(),
						prev = that.prev(),
						next = that.next();
					if (index != $('.step-box').size() - 1) {
						next.css({
							'transform': 'scale(0.3) translate3d(0,80%,0)',
							'display': 'block'
						});
						that.transition({
							'scale': '0.3',
							'y': '-80%',
							'opacity': '0'
						});
						next.transition({
							'scale': '1',
							'y': '0',
							'opacity': '1'
						});
					};
				}).on('swiperight', function() {
					var that = $(this),
						index = that.index(),
						prev = that.prev(),
						next = that.next();
					if (index != 0) {
						prev.css({
							'transform': 'scale(0.3) translate3d(0,-80%,0)',
							'display': 'block'
						});
						that.transition({
							'scale': '0.3',
							'y': '80%',
							'opacity': '0'
						});
						prev.transition({
							'scale': '1',
							'y': '0',
							'opacity': '1'
						});
					};
				});
			}
		}
		//共用调用
	commonFun.actionFun();
	return commonFun;

})(jQuery)