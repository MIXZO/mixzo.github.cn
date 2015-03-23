(function($) {
	//插件模块
	$.fn.transitionList = function() {
			$(this).find('.item').each(function() {
				var that = $(this),
					_data = JSON.parse("" + that.attr('act').replace(/'/g, '"') + "");

				for (var i = 0; i < _data.style.length; i++) {
					that.transition(_data.style[i]);
				};
			});
		}
		//文字队列
	$.fn.txtSH = function(options) {
		var defaults = {
			speed: 5000
		}
		var opts = $.extend(defaults, options);
		var method = {
			allFun: function(obj, speed, callback) {
				obj.find('.item').each(function(i) {
					var that = $(this);
					var inFun = function() {
						that.css('opacity', '0').transition({
							'opacity': '1'
						}, 2000);
					}
					var outFun = function() {
						that.transition({
							'opacity': '0'
						}, 2000);
					}
					setTimeout(function() {
						inFun();
					}, speed * i);
					setTimeout(function() {
						outFun();
					}, speed * i + 3000);
				});
				setTimeout(function() {
					if (typeof callback == 'function') {
						callback();
					};
				}, speed * obj.find('.item').size());
			}
		}
		this.each(function() {
			var that = $(this);
			method.allFun(that, opts.speed, opts.callback);
		});
		return method;
	}
	$.fn.txtPos = function(options) {
		var defaults = {
			step: 200, //间隔速度
			speed: 1000, //动画速度
			posH: 'left', //水平定位
			valueH: 20, //水平移动距离
			valueHFix: 0,	//水平移动距离修正
			lineHeight: 20, //行高
			lineHeightFix: 20 //行高修正
		}
		var opts = $.extend(defaults, options);
		var method = {
			mainFun: function(obj) {
				obj.find('.item').each(function(i) {
					var that = $(this);
					that.css('top', opts.lineHeight * i + opts.lineHeightFix);
					var showFun = function() {
    				that.transition({
    					'left': opts.valueH + opts.valueHFix * i
	    				}, opts.speed);
	    			}
	    			setTimeout(function() {
	                    showFun();
	                }, opts.step * i);
				});
			}
		}
		this.each(function() {
			var that = $(this);
			method.mainFun(that);
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
		formatFun: function(callback) { //页面初始化
			//commonFun.touchLock();
			commonFun.viewportFix();
			commonFun.pageLoad(function() {
				$('.step-box').first().addClass('show').css('display', 'block').transition({
					'opacity': '1'
				});
				if (typeof callback == 'function') {
					callback();
				};
			});
		},
		page_logo_mixzo: function() { //首屏LOGO
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
						window.location.href = 'chapter-index.htm';
					});
				}, 5000);
			}
			logo_mixzo();
		},
		chapter_index: function() { //chapter 目录
		}
	}
	return commonFun;
})(jQuery)