var kboxing = (function($) {
    var kboxingFun = {
        findDimensions: function() {
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
            return winWidth + '-' + winHeight;
        },
        screenWidth: function() { //获取屏幕宽度
            var _wh = this.findDimensions().split('-');
            return _wh[0];
        },
        screenHeight: function() { //获取屏幕高度
            var _wh = this.findDimensions().split('-');
            return _wh[1];
        },
        objHover: function(obj) { //元素添加hover事件
            var obj = $(obj);
            obj.live('mouseenter', function() {
                $(this).addClass('hover');
            }).live('mouseleave', function() {
                $(this).removeClass('hover');
            });
        },
        inputFocus: function(obj, parent) { //文本框获得焦点状态
            var obj = $(obj);
            obj.live('focus', function() {
                $(this).parents(parent).addClass("focus");
                $(this).parents(parent).find(".ts-type, .ts-error").fadeOut("fast");
            });
        },
        inputBlur: function(obj, parent) { //文本框失去焦点状态
            var obj = $(obj);
            obj.live('blur', function() {
                $(this).parents(parent).removeClass("focus");
                if ($(this).val() == "") {
                    $(this).parents(parent).find(".ts-type").fadeIn("fast");
                }
            });
        },
        inputCheckValue: function(obj) { //页面刷新后监测文本框有无内容，如果有隐藏提示消息
            var obj = $(obj);
            obj.each(function() {
                if ($.trim($(this).val()) != "") {
                    $(this).siblings(".ts-type, .ts-error").fadeOut("fast");
                }
                else {
                    $(this).siblings(".ts-type").fadeIn("fast");
                }
            });
        },
        asideHeightFix: function(minHeight) { //左导航自适应高度
            var _h = function() {
                var _height = $('body').height() < minHeight ? minHeight : $('.content-main').height();
                $('#content aside').height(_height);
                return _height;
            }
            setTimeout(_h, 500);
            return _h();
        },
        asideFooterFixed: function() { //左导航底部fixed
            var obj = $('#content aside .footer');
            var _fun = function(obj) {
                var _top = obj.offset().top - kboxingFun.screenHeight() + obj.outerHeight();
                var posFun = function() {
                    if ($(document).scrollTop() > _top) {
                        obj.css('position', 'fixed');
                    } else {
                        obj.css('position', 'static');
                    }
                }
                posFun();
                $(window).scroll(function() {
                    posFun();
                });
            }
            _fun(obj);
            $(window).resize(function() {
                _fun(obj);
            });
        },
        widthReference: function(objName, targetName, offsetFix) { //模拟宽度
            var _fun = function() {
                offsetFix = $.trim(offsetFix) == '' ? 0 : offsetFix;
                setTimeout(function() {
                    $(objName).width($(targetName).width() + offsetFix);
                }, 100);
            }
            _fun();
            $(window).resize(function() {
                _fun();
            });
        },
        gridLayout: function(containerName, colNum, offsetWidth) { //网格布局模块
            var _fun = function(containerName, colNum, offsetWidth) {
                var offsetWidth = $.trim(offsetWidth) == '' ? 229 : offsetWidth;
                var _width = kboxingFun.screenWidth() > 990 ? kboxingFun.screenWidth() - offsetWidth : 760; //设置网格宽度
                var colNum = $.trim(colNum) == '' ? 8 : colNum; //设置网格列数
                var scale = 1;
                var colWidth = _width / colNum;
                var rowHeight = colWidth * scale;
                var maxHeight = 0; //网格最大高度初始化
                var rangeMain = function(obj) {
                    obj.width(_width).find('.cell').each(function() {
                        if ($(this).parents(containerName).attr('autoRange') == 'true') {
                            if ($.trim($(this).prev().attr('left')) == '') {
                                $(this).attr({
                                    'left': 0,
                                    'top': 0
                                });
                            } else {
                                _left = (parseInt($(this).prev().attr('left')) + parseInt($(this).attr('col'))) % colNum == 0 ? 0 : parseInt($(this).prev().attr('left')) + parseInt($(this).attr('col'));
                                _top = (parseInt($(this).prev().attr('left')) + parseInt($(this).attr('col'))) % colNum == 0 ? parseInt($(this).prev().attr('top')) + parseInt($(this).prev().attr('row')) : $(this).prev().attr('top');
                                $(this).attr({
                                    'left': _left,
                                    'top': _top
                                });
                            }
                        }
                        $(this).css({
                            'top': rowHeight * $(this).attr('top'),
                            'left': colWidth * $(this).attr('left'),
                            'width': colWidth * $(this).attr('col'),
                            'height': rowHeight * $(this).attr('row')
                        }, 'slow').fadeIn('slow');
                        objOffsetHeight = rowHeight * $(this).attr('top') + rowHeight * $(this).attr('row');
                        maxHeight = maxHeight < objOffsetHeight ? objOffsetHeight : maxHeight; //获取网格最大高度
                        $(this).parents(containerName).height(maxHeight);
                    });
                    kboxingFun.asideHeightFix(930);
                }
                rangeMain($(containerName));
            }
            _fun(containerName, colNum, offsetWidth);
            $(window).resize(function() {
                _fun(containerName, colNum, offsetWidth);
            });
        },
        tabObjWidth: function(containerName) { //获取TAB容器高宽度
            setTimeout(function() {
                var _width = $(containerName).width();
                var _height = $(containerName).height();
                $(containerName).find('.tab-con li').css({
                    'width': _width,
                    'height': _height
                });
            }, 500);
        },
        tabFloatEffect: function(obj) { //TAB(FLOAT)事件
            var t = null;
            var intervalTime = 5000;
            //初始化
            if ($(obj).attr('load') != 'true') {
                for (var i = 0; i < $(obj + ' .tab-con li').size(); i++) {
                    $(obj + ' .tab-tit').append('<a></a>');
                };
                $(obj).attr('load', 'true');
            }
            $(obj + ' .tab-con').append($(obj + ' .tab-con li').first().clone());
            var formatFun = function(obj) {
                $(obj + ' .tab-tit a').first().addClass('current').siblings('a').removeClass('current');
                $(obj + ' .tab-con').stop().animate({
                    'margin-left': '0'
                }, 'slow');
            }
            formatFun(obj);

            var objCon = $(obj + ' .tab-con');
            var objConLi = $(obj + ' .tab-con li');
            var objTit = $(obj + ' .tab-tit');
            var objTitA = $(obj + ' .tab-tit a');
            var moveWidth;

            var getMoveWidth = function() {
                moveWidth = objConLi.width();
            };
            setTimeout(getMoveWidth, 1000);

            $(window).resize(function() {
                formatFun(obj);
                setTimeout(getMoveWidth, 1000);
            });

            var prevFun = function(index) {
                objCon.stop().animate({
                    'margin-left': '-' + moveWidth * index
                }, 'slow');
                curChange(index);
            }
            var nextFun = function(index) {
                objCon.stop().animate({
                    'margin-left': '-' + moveWidth * index
                }, 'slow');
                curChange(index);
            }
            var autoFun = function() {
                if (objTitA.last().hasClass('current')) {
                    objCon.stop().animate({
                        'margin-left': '-' + moveWidth * ($(obj + ' .tab-tit a.current').index() + 1)
                    }, 'slow', function() {
                        objCon.css('margin-left', '0')
                    });
                    curChange(0);
                } else {
                    objCon.stop().animate({
                        'margin-left': '-' + moveWidth * ($(obj + ' .tab-tit a.current').index() + 1)
                    }, 'slow');
                    curChange($(obj + ' .tab-tit a.current').index() + 1);
                }
            }
            t = setInterval(autoFun, intervalTime);

            var curChange = function(index) {
                objTitA.removeClass('current');
                objTitA.eq(index).addClass('current');
            }

            objTitA.live('mouseenter', function() {
                var _index = $(obj + ' .tab-tit a.current').index();
                if ($(this).index() > _index) {
                    nextFun($(this).index());
                } else if ($(this).index() < _index) {
                    prevFun($(this).index());
                }
            });

            $(obj).live('mouseenter', function() {
                clearInterval(t);
            }).live('mouseleave', function() {
                t = setInterval(autoFun, intervalTime);
            });
        },
        txtBoxShow: function(obj, parentName) { //容器文本框显隐
            var _height = $(parentName + ' ' + obj).height();
            $(parentName).each(function() {
                $(this).live('mouseenter', function() {
                    $(this).find(obj).stop().animate({
                        'bottom': '0'
                    }, 'fast');
                }).live('mouseleave', function() {
                    $(this).find(obj).stop().animate({
                        'bottom': '-' + _height + 'px'
                    }, 'fast');
                });
            });
        }
    }

    //共用执行
    kboxingFun.asideHeightFix(930);

    return kboxingFun;
})(jQuery)