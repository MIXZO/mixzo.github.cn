(function($) { //插件模块
	$.fn.transitionList = function() {
		$(this).find('.item').each(function() {
			var that = $(this),
				_data = JSON.parse("" + that.attr('act').replace(/'/g, '"') + "");

			for (var i = 0; i < _data.style.length; i++) {
				that.transition(_data.style[i]);
			};
		});
	}
})(jQuery);

var common = (function($) {
	var commonFun = {
		showLoad: function() { //显示load
			$('#loading').fadeIn('slow');
		},
		hideLoad: function(callback) { //隐藏load
			$('#loading').fadeOut('slow', function() {
				if (typeof callback == 'function') {
					callback();
				};
			});
		},
		pageLoad: function(callback) { //页面加载动作
			$('#loading').fadeIn('slow', function() {
				document.onreadystatechange = function() {
					if (document.readyState == "complete") {
						commonFun.hideLoad(callback);
					}
				}
			});
		},
		tsIcoNext: function() { //提示上滑
			var b_t;
			var bottomFun = function() {
				$('#bottom').hide();
				clearTimeout(b_t);
				b_t = setTimeout(function() {
					if (!$('.step-box').last().hasClass('show')) {
						$('#bottom').fadeIn('slow');
					};
				}, 3000);
			}
		},
		viewportFix: function() { //屏幕适配
			var v_t;
			var _width = 640 //PSD width

			var heightFix = function() { //框架高度
				$('#pageWrap').height('100%');
			}

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

				heightFix();

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
		touchLock: function() { //屏蔽上下弹动页面
			$('#pageWrap').on('touchstart', function(event) {
				event.preventDefault();
			});
		},
		formatFun: function() { //页面初始化
			commonFun.touchLock();
			commonFun.viewportFix();
			commonFun.pageLoad(function() {
				$('.step-box').first().addClass('show').css('display', 'block').transition({
					'opacity': '1'
				});
				commonFun.page_logo();
			});
		},
		page_logo: function() { //首屏LOGO
			var objStep = $('.step-logo');
			var closeLogo = function() {
				objStep.fadeOut('slow');
			}
			var logo_mixzo = function() { //logo mixzo
				objStep.find('.m-box').show();
				var st = 200;
				var objBox = $('.step-logo');
				objBox.find('.t').each(function(i) {
					var that = $(this);
					var fun = function() {
						that.addClass('x2d');
					}
					setTimeout(function() {
						fun();
					}, st * i);
				});
				setTimeout(function() {
					objBox.find('.t-s').fadeIn('slow');
				}, 2000);
				setTimeout(function() {
					objStep.find('.m-box').fadeOut('slow', function() {
						closeLogo();
						window.location.href = 'chapter-01.htm';
					});
				}, 5000);
			}
			logo_mixzo();
		}
	}
	commonFun.formatFun();
	return commonFun;
})(jQuery)