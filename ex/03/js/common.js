var common = (function($) {
	var commonFun = {
			viewportFix: function() {
				var v_t;
				var _width = 640	//PSD width

				var advice = function() { //viewport width
					var zoom = $(window).width() / 640;
					$('#pageWrap').css({
					    zoom: (zoom * 100) + "%",
					    '-webkit-text-size-adjust': (zoom * 100) + '%'
					});

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
					}, 100);
				}).on("orientationchange", function(event) {
					clearTimeout(v_t);
					v_t = setTimeout(function() {
						advice();
					}, 1000);
				});
			},
			loadFun: function() { //页面动作
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