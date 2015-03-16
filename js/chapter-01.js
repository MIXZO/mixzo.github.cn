var chapter01 = (function($) {
	var chapter01Fun = {
			step01: function() { //step-1
				common.pageLoad(function() {
					$('.chapter-box, .step-1').addClass('show').transition({
						'display': 'block',
						'opacity': '1'
					});
				});

				var canvasFun = function() {
					var nextStep = function() {
						$('#cas_pb').transition({
							'opacity': '0'
						}, 1000);
						setTimeout(function() {
							$('.step-1').removeClass('show').transition({
								'opacity': '0'
							}, 1000, function() {
								$('.step-1').css('display', 'none');
							});
							setTimeout(function() {
								chapter01Fun.step03();
							}, 500);
						}, 2000);
					}

					var canvas = document.getElementById("cas_pb"),
						ctx = canvas.getContext("2d");
					var x1, y1, a = 30,
						timeout, totimes = 100,
						jiange = 30;
					canvas.width = $('body').width();
					canvas.height = $('body').height();
					var img = new Image();
					img.src = "../images/img/chapters_01_00.jpg";
					img.style.backgroundSize = 'cover';
					img.onload = function() {
						ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
						tapClip();
					}

					//通过修改globalCompositeOperation来达到擦除的效果  
					function tapClip() {
						var hastouch = "ontouchstart" in window ? true : false,
							tapstart = hastouch ? "touchstart" : "mousedown",
							tapmove = hastouch ? "touchmove" : "mousemove",
							tapend = hastouch ? "touchend" : "mouseup";

						ctx.lineCap = "round";
						ctx.lineJoin = "round";
						ctx.lineWidth = a * 2;
						ctx.globalCompositeOperation = "destination-out";

						canvas.addEventListener(tapstart, function(e) {
							clearTimeout(timeout);
							e.preventDefault();

							x1 = hastouch ? e.targetTouches[0].pageX : e.clientX - ($(window).width() - $('#cas_pb').width()) / 2;
							y1 = hastouch ? e.targetTouches[0].pageY : e.clientY - ($(window).height() - $('#cas_pb').height()) / 2;

							ctx.save();
							ctx.beginPath();
							ctx.arc(x1, y1, 1, 0, 2 * Math.PI);
							ctx.fill();
							ctx.restore();

							canvas.addEventListener(tapmove, tapmoveHandler);
							canvas.addEventListener(tapend, function() {
								canvas.removeEventListener(tapmove, tapmoveHandler);

								timeout = setTimeout(function() {
									var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
									var dd = 0;
									for (var x = 0; x < imgData.width; x += jiange) {
										for (var y = 0; y < imgData.height; y += jiange) {
											var i = (y * imgData.width + x) * 4;
											if (imgData.data[i + 3] > 0) {
												dd++
											}
										}
									}
									if (dd / (imgData.width * imgData.height / (jiange * jiange)) < 0.5) {
										nextStep();
									}
								}, totimes);
							});

							function tapmoveHandler(e) {
								clearTimeout(timeout);
								e.preventDefault();
								x2 = hastouch ? e.targetTouches[0].pageX : e.clientX - ($(window).width() - $('#cas_pb').width()) / 2;
								y2 = hastouch ? e.targetTouches[0].pageY : e.clientY - ($(window).height() - $('#cas_pb').height()) / 2;

								ctx.save();
								ctx.moveTo(x1, y1);
								ctx.lineTo(x2, y2);
								ctx.stroke();
								ctx.restore();

								x1 = x2;
								y1 = y2;
							}
						})
					}

					//使用clip来达到擦除效果  
					function otherClip() {
						var hastouch = "ontouchstart" in window ? true : false,
							tapstart = hastouch ? "touchstart" : "mousedown",
							tapmove = hastouch ? "touchmove" : "mousemove",
							tapend = hastouch ? "touchend" : "mouseup";

						canvas.addEventListener(tapstart, function(e) {
							clearTimeout(timeout);
							e.preventDefault();

							x1 = hastouch ? e.targetTouches[0].pageX : e.clientX - canvas.offsetLeft;
							y1 = hastouch ? e.targetTouches[0].pageY : e.clientY - canvas.offsetTop;

							ctx.save();
							ctx.beginPath();
							ctx.arc(x1, y1, a, 0, 2 * Math.PI);
							ctx.clip();
							ctx.clearRect(0, 0, canvas.width, canvas.height);
							ctx.restore();

							canvas.addEventListener(tapmove, tapmoveHandler);
							canvas.addEventListener(tapend, function() {
								canvas.removeEventListener(tapmove, tapmoveHandler);

								timeout = setTimeout(function() {
									var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
									var dd = 0;
									for (var x = 0; x < imgData.width; x += jiange) {
										for (var y = 0; y < imgData.height; y += jiange) {
											var i = (y * imgData.width + x) * 4;
											if (imgData.data[i + 3] > 0) {
												dd++
											}
										}
									}
									if (dd / (imgData.width * imgData.height / (jiange * jiange)) < 0.5) {
										nextStep();
									}
								}, totimes);

							});

							function tapmoveHandler(e) {
								e.preventDefault();
								x2 = hastouch ? e.targetTouches[0].pageX : e.clientX - canvas.offsetLeft;
								y2 = hastouch ? e.targetTouches[0].pageY : e.clientY - canvas.offsetTop;

								var aasin = a * Math.sin(Math.atan((y2 - y1) / (x2 - x1)));
								var aacos = a * Math.cos(Math.atan((y2 - y1) / (x2 - x1)));
								var x3 = x1 + asin;
								var y3 = y1 - acos;
								var x4 = x1 - asin;
								var y4 = y1 + acos;
								var x5 = x2 + asin;
								var y5 = y2 - acos;
								var x6 = x2 - asin;
								var y6 = y2 + acos;

								ctx.save();
								ctx.beginPath();
								ctx.arc(x2, y2, a, 0, 2 * Math.PI);
								ctx.clip();
								ctx.clearRect(0, 0, canvas.width, canvas.height);
								ctx.restore();

								ctx.save();
								ctx.beginPath();
								ctx.moveTo(x3, y3);
								ctx.lineTo(x5, y5);
								ctx.lineTo(x6, y6);
								ctx.lineTo(x4, y4);
								ctx.closePath();
								ctx.clip();
								ctx.clearRect(0, 0, canvas.width, canvas.height);
								ctx.restore();

								x1 = x2;
								y1 = y2;
							}
						})
					}
				}
				canvasFun();
			},
			step03: function() { //step-3
				var objStep = $('.step-3');
				var t1;
				var _height = $(window).height();
				$(window).resize(function() {
					_height = $(window).height();
				});
				var start03 = function() {
					objStep.addClass('show').transition({
						'display': 'block',
						'opacity': '1'
					}, 1000);
				}

				var musicFun = function() {
					var music_01 = document.getElementById('music_01');
					var ctrlPlay = $('.yinle1');
					var objMusic01 = $('#music_01');
					ctrlPlay.addClass('play');
					music_01.play();

					ctrlPlay.transition({
						'display': 'block',
						'opacity': '1'
					}, 500).click(function() {
						if (ctrlPlay.hasClass('play')) {
							ctrlPlay.removeClass('play');
							music_01.pause();
						} else {
							ctrlPlay.addClass('play');
							music_01.play();
						};
					});
				}
				musicFun();

				var playFun = function(index) {
					clearTimeout(t1);
					var objNext = objStep.find('.item').eq(index);
					objStep.find('.item.show').removeClass('show').css({
						'rotateY': '0',
						'opacity': '0'
					});
					objStep.find('.txt-box').css({
						'top': '50%',
						'height': '0'
					}).find('.txt').css({
						'opacity': '0'
					});
					objNext.addClass('show').css('transform', 'rotateY(0)').transition({
						'rotateY': '360',
						'opacity': '1'
					}, function() {
						t1 = setTimeout(function() {
							objNext.find('.txt-box').transition({
								'top': '0',
								'height': '100%'
							}, 1000, 'easeInOutSine').find('.txt').transition({
								'opacity': '1'
							}, 'slow');
							objStep.find('.item').css('transform', 'none');
						}, 1000);
					});
				}
				setTimeout(function() {
					start03();
					playFun(0);
				}, 1000);

				var swipeFun = function() { //手势滑动页面切换
					objStep.swipe({
						swipeLeft: function(event, direction, distance, duration, fingerCount) {
							var index = objStep.find('.item.show').index();
							if (index < objStep.find('.item').size() - 1) {
								playFun(index + 1);
							};
						},
						swipeRight: function(event, direction, distance, duration, fingerCount) {
							var index = objStep.find('.item.show').index();
							if (index > 0) {
								playFun(index - 1);
							};
						}
					});
				}
				swipeFun();
			}
		}
		//共用调用
	chapter01Fun.step01();
	return chapter01Fun;
})(jQuery)