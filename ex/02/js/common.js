var common = (function($) {
	var commonFun = {
			viewportFix: function() {
				var v_t;
				var _width = 640	//PSD width

				var advice = function() { //viewport width
					var _viewport = $('[name=viewport]');
					var phoneWidth = parseInt(window.screen.width);
					var phoneScale = phoneWidth / _width;
					var ua = navigator.userAgent;
					if (/Android (\d+\.\d+)/.test(ua)) {
						var version = parseFloat(RegExp.$1);
						// andriod 2.3
						if (version > 2.3) {
							_viewport.attr('content', 'width=' + _width + ', minimum-scale = ' + phoneScale + ', maximum-scale = ' + phoneScale + ', target-densitydpi=device-dpi');
							// andriod 2.3以上
						} else {
							_viewport.attr('content', 'width=' + _width + ', target-densitydpi=device-dpi');
						}
						// 其他系统
					} else {
						_viewport.attr('content', 'width=640, user-scalable=no, target-densitydpi=device-dpi');
					}

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
					clearTimeout(v_t);
					v_t = setTimeout(function() {
						advice();
					}, 10);
				}).on("orientationchange", function(event) {
					clearTimeout(v_t);
					v_t = setTimeout(function() {
						advice();
					}, 10);
				});
			},
			pageIndex: function() { //页面动作
				window.onload = function() {
					if (document.readyState == 'complete') {
						$('#loading').fadeOut('slow');
					}
				}
			}
		}
		//共用调用
	commonFun.viewportFix();
	return commonFun;

})(jQuery)