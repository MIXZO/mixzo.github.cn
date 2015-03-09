(function($) { //插件模块
	$.fn.wrapAnimation = function() {
		$(this).find('.item').each(function() {
			var _this = $(this),
				_act = JSON.parse("" + _this.attr('act').replace(/'/g, '"') + "");

			for (var i = 0; i < _act.style.length; i++) {
				_this.transition(_act.style[i]);
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
		swipeFun: function() { //手势上下滑动页面切换
			$('.swipe-box').swipe({
				swipeUp: function(event, direction, distance, duration, fingerCount) {
					var that = $('.swipe-box.show'),
						index = that.index(),
						prev = that.prev(),
						next = that.next();
					if (index != $('.swipe-box').size() - 1) {
						next.addClass('show').css({
							'transform': 'scale(0.3) translate3d(0,80%,0)',
							'display': 'block'
						});
						that.removeClass('show').transition({
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
					bottomFun();
				},
				swipeDown: function(event, direction, distance, duration, fingerCount) {
					var that = $('.swipe-box.show'),
						index = that.index(),
						prev = that.prev(),
						next = that.next();

					if (index != 0) {
						prev.addClass('show').css({
							'transform': 'scale(0.3) translate3d(0,-80%,0)',
							'display': 'block'
						});
						that.removeClass('show').transition({
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
				}
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
						window.location.href = 'chapters-01.htm';
					});
				}, 5000);
			}
			logo_mixzo();
		}
	}
	commonFun.formatFun();
	return commonFun;
})(jQuery)