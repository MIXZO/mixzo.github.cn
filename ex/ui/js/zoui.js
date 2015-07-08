(function($) {
    jQuery.extend({
        ZFindDimensions: function() { //获取完整屏幕分辨率
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
        },
        ZPageMinHeight: function() { //页面最小高度
            if ($('body').height() < $.ZScreenHeight()) {
                $('#content').css('min-height', $.ZScreenHeight() - $('header').outerHeight(true) - $('footer').outerHeight(true));
            };
        },
        ZTimeNow: function() { //获取当前时间
            var myDate = new Date(),
                year = myDate.getFullYear(),
                month = myDate.getMonth() < 9 ? '0' + parseInt(myDate.getMonth() + 1) : parseInt(myDate.getMonth() + 1),
                day = myDate.getDate() < 10 ? '0' + myDate.getDate() : myDate.getDate(),
                hour = myDate.getHours() < 10 ? '0' + myDate.getHours() : myDate.getHours(),
                min = myDate.getMinutes() < 10 ? '0' + myDate.getMinutes() : myDate.getMinutes(),
                sec = myDate.getSeconds() < 10 ? '0' + myDate.getSeconds() : myDate.getSeconds();
            return year + '-' + month + '-' + day + '-' + hour + '-' + min + '-' + sec;
        },
        checkMobile: function(obj) { //表单验证：手机号码
            var value = $(obj).val();
            var ts = $(obj).siblings('.ts-error');
            var verc = !(/1[3-8]+\d{9}/.test(value));
            if (verc && value !== "") {
                ts.html('<span class="txt"><i class="spritePng ico-error"></i>请输入正确的手机号码</span>').fadeIn('slow');
                $.createShowBox('请输入正确的手机号码');
                return false;
            } else if (value === "") {
                ts.html('<span class="txt"><i class="spritePng ico-error"></i>请输入您的手机号码</span>').fadeIn('slow');
                $.createShowBox('请输入您的手机号码');
                return false;
            } else {
                return true;
            }
        },
        checkLength: function(obj, _length, name) { //表单验证：长度
            var value = $(obj).val();
            var ts = $(obj).siblings('.ts-error');
            if (value === "") {
                ts.html('<span class="txt"><i class="spritePng ico-error"></i>请输入' + name + '</span>').fadeIn('slow');
                $.createShowBox('请输入' + name);
                return false;
            } else if (value.length < _length) {
                ts.html('<span class="txt"><i class="spritePng ico-error"></i>请输入正确的' + name + '</span>').fadeIn('slow');
                $.createShowBox('请输入正确的' + name);
                return false;
            } else {
                return true;
            }
        },
        checkCardNo: function(obj) { //表单验证：身份证
            var value = $(obj).val();
            var ts = $(obj).siblings('.ts-error');
            //var verc = !(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value));
            var verc = !(/^((1[1-5])|(2[1-3])|(3[1-7])|(4[1-6])|(5[0-4])|(6[1-5])|71|(8[12])|91)\d{4}((19\d{2}(0[13-9]|1[012])(0[1-9]|[12]\d|30))|(19\d{2}(0[13578]|1[02])31)|(19\d{2}02(0[1-9]|1\d|2[0-8]))|(19([13579][26]|[2468][048]|0[48])0229))\d{3}(\d|X|x)?$/.test(value));
            if (verc && value !== "") {
                ts.html('<span class="txt"><i class="spritePng ico-error"></i>请输入正确的身份证号码</span>').fadeIn('slow');
                $.createShowBox('请输入正确的身份证号码');
                return false;
            } else if (value === "") {
                ts.html('<span class="txt"><i class="spritePng ico-error"></i>请输入您的身份证号码</span>').fadeIn('slow');
                $.createShowBox('请输入您的身份证号码');
                return false;
            } else {
                return true;
            }
        },
        checkBank: function(obj) { //表单验证：银行卡卡号
            var value = $(obj).val();
            var ts = $(obj).siblings('.ts-error');
            var verc = !(/^\d{15,19}$/.test(value));
            if (verc && value !== "") {
                ts.html('<span class="txt"><i class="spritePng ico-error"></i>请输入正确的银行卡卡号</span>').fadeIn('slow');
                $.createShowBox('请输入正确的银行卡卡号');
                return false;
            } else if (value === "") {
                ts.html('<span class="txt"><i class="spritePng ico-error"></i>请输入您的银行卡卡号</span>').fadeIn('slow');
                $.createShowBox('请输入您的银行卡卡号');
                return false;
            } else {
                return true;
            }
        },
        checkCvv2: function(obj) { //表单验证：银行卡卡号
            var value = $(obj).val();
            var ts = $(obj).siblings('.ts-error');
            var verc = !(/^\d{3}$/.test(value));
            if (verc && value !== "") {
                ts.html('<span class="txt"><i class="spritePng ico-error"></i>请输入正确的安全码</span>').fadeIn('slow');
                $.createShowBox('请输入正确的安全码');
                return false;
            } else if (value === "") {
                ts.html('<span class="txt"><i class="spritePng ico-error"></i>请输入您的安全码</span>').fadeIn('slow');
                $.createShowBox('请输入您的安全码');
                return false;
            } else {
                return true;
            }
        },
        checkVercCode: function(obj) { //表单验证：验证码
            var value = $(obj).val();
            var ts = $(obj).siblings('.ts-error');
            var verc = !(/^\d{6}$/.test(value));
            if (verc && value !== "") {
                ts.html('<span class="txt"><i class="spritePng ico-error"></i>请输入正确的验证码</span>').fadeIn('slow');
                $.createShowBox('请输入正确的验证码');
                return false;
            } else if (value === "") {
                ts.html('<span class="txt"><i class="spritePng ico-error"></i>请输入您的验证码</span>').fadeIn('slow');
                $.createShowBox('请输入您的验证码');
                return false;
            } else {
                return true;
            }
        }
    });
    //元素hover
    jQuery.fn.ZObjHover = function(options) {
        var defaults = {
            funType: 'single' //选择模式；single：单选；tab：切换
        }
        var opts = $.extend(defaults, options);
        var method = {
            singleFun: function(obj) {
                var obj = $(obj);
                obj.live('mouseenter', function() {
                    $(this).addClass('hover');
                }).live('mouseleave', function() {
                    $(this).removeClass('hover');
                });
            },
            tabFun: function(obj) {
                var obj = $(obj);
                obj.live('mouseenter', function() {
                    $(this).addClass('hover').siblings().removeClass('hover');
                });
            }
        }
        this.each(function() {
            if (opts.funType == 'tab') {
                method.tabFun($(this));
            } else {
                method.singleFun($(this));
            }
        });
    };
    //元素单选切换(TAB)
    jQuery.fn.ZObjCurrent = function(options) {
        var defaults = {
            funType: 'single' //选择模式；single：单选；tab：切换
        }
        var opts = $.extend(defaults, options);
        var method = {
            singleFun: function(obj) {
                var obj = $(obj);
                if (obj.hasClass('current')) {
                    obj.removeClass('current');
                } else {
                    obj.addClass('current');
                };
            },
            tabFun: function(obj) {
                var obj = $(obj);
                if (!obj.hasClass('current')) {
                    obj.addClass('current').siblings().removeClass('current');
                };
            }
        }
        this.each(function() {
            var that = $(this);
            that.die().live('click', function() {
                if (opts.funType == 'tab') {
                    method.tabFun($(this));
                } else {
                    method.singleFun($(this));
                }
            });
        });
    };
    //弹出框
    jQuery.fn.ZShowbox = function(options) {
        var defaults = {
            bgFrame: true, //是否需要遮罩层
            bgFrameClose: false, //是否开启点击遮罩层关闭
            showType: '', //弹出框类型，show：显示页面弹出框；create：创建新弹出框
            createClassName: 'ZShowbox-create', //创建弹出框的className
            createTitTxt: '提示信息', //创建模式弹出框标题
            createConHTML: '', //创建模式内容HTML
            createBtnType: 0, //创建模式弹出框类型（0.弹出框，1.提示框，2.确认框，3.同意拒绝）
            createIcoClose: null, //创建模式关闭按钮回调函数
            createCallbackConfirm: null, //创建模式确认按钮回调函数
            createCallbackCancel: null, //创建模式取消按钮回调函数
            createCallbackCancel2: null, //创建模式拒绝按钮回调函数
            createBgSave: false //创建模式是否保留背景（boolen，true为保留）
        }
        var opts = $.extend(defaults, options);
        var method = {
            createBox: function(className, titTxt, conHTML, btnType, icoClose, callbackConfirm, callbackCancel, callbackCancel2, bgSave) { //创建弹出框；className：创建弹出框的className；titTxt：创建弹出框的标题；conHTML：创建弹出框的内容HTML；btnType：创建弹出框类型（0.弹出框，1.提示框，2.确认框）；callbackConfirm：确认按钮回调函数；callbackCancel：取消按钮回调函数；bgSave：是否保留背景（boolen，true为保留）
                var _html = '<div class="ZShowbox ' + className + '" show-type="create"><a class="show-close" href="javascript:;"><i class="spriteImg"></i></a><h3 class="show-tit"><p class="txt">' + titTxt + '</p></h3><div class="show-con"><div class="inner-box">' + conHTML + '</div></div></div>';
                $('body').append(_html);
                var objBox = $('.' + className);
                if (btnType == 1) {
                    objBox.find('.show-con').after('<div class="show-op  show-op-1"><a class="show-confirm module-btn module-btn-black" href="javascript:;" style="margin:0 auto;">确定</a></div>');
                } else if (btnType == 2) {
                    objBox.find('.show-con').after('<div class="show-op show-op-2 clearfix"><a class="show-confirm module-btn module-btn-black" href="javascript:;">确定</a>' + '<a class="show-cancel module-btn module-btn-white" href="javascript:;" style="margin-left:20px;">取消</a></div>');
                } else if (btnType == 3) {
                    objBox.find('.show-con').after('<div class="show-op show-op-2 clearfix"><a class="show-confirm module-btn module-btn-black" href="javascript:;">同意</a>' + '<a class="show-cancel2 module-btn module-btn-white" href="javascript:;" style="margin-left:20px;">拒绝</a></div>');
                };
                method.bgAdd();
                method.showPositionFix(objBox);
                objBox.show();
                method.clickClose(opts.bgFrameClose, callbackCancel);
                var closeBox = function(bgSave) {
                    method.objRemove(objBox);
                    if (!bgSave) {
                        method.bgDel();
                    };
                }
                objBox.find('.show-cancel').die().live('click', function() {
                    closeBox(bgSave);
                });
                if (typeof icoClose == 'function') {
                    objBox.find('.show-close').die().live('click', function() {
                        icoClose();
                        closeBox(bgSave);
                    });
                };
                if (typeof callbackConfirm == 'function') {
                    objBox.find('.show-confirm').die().live('click', function() {
                        callbackConfirm();
                        closeBox(bgSave);
                    });
                };
                if (typeof callbackCancel == 'function') {
                    objBox.find('.show-cancel, .show-close').die().live('click', function() {
                        callbackCancel();
                        closeBox(bgSave);
                    });
                };
                if (typeof callbackCancel2 == 'function') {
                    objBox.find('.show-cancel2').die().live('click', function() {
                        callbackCancel2();
                        closeBox(bgSave);
                    });
                };
            },
            allShow: function(obj) { //显示弹出框+遮罩；obj：执行对象
                method.bgAdd();
                method.boxShow(obj);
                method.clickClose(opts.bgFrameClose);
            },
            allHide: function(callback) { //关闭弹出框+遮罩；callback：回调函数
                method.boxHide(callback);
                method.bgDel();
            },
            boxShow: function(obj) { //显示弹出框；obj：执行对象
                var showBoxObj = $(obj);
                method.showPositionFix(showBoxObj);
                showBoxObj.show();
            },
            boxHide: function(callback) { //隐藏弹出框；callback：回调函数
                $('.ZShowbox').hide();
                if (typeof callback == 'function') {
                    callback();
                };
            },
            objHide: function(obj, callback) { //关闭指定弹出框，obj：执行对象；callback：回调函数
                $(obj).each(function() {
                    var that = $(this);
                    that.hide();
                    if (typeof callback == 'function') {
                        callback();
                    };
                });
            },
            objRemove: function(obj, callback) { //删除指定内容，obj：执行对象；callback：回调函数
                $(obj).each(function() {
                    var that = $(this);
                    that.remove();
                    if (typeof callback == 'function') {
                        callback();
                    };
                });
            },
            bgAdd: function() { //创建遮罩层
                if (opts.bgFrame) {
                    if ($('#bgScreen').size() < 1) {
                        $('body').append('<div id="bgScreen"></div><iframe id="bgIFrame" src="about:blank"></iframe>');
                        $('#bgScreen, #bgIFrame').css({
                            'height': jQuery.browser.version == '6.0' ? window.screen.height - 100 : '100%'
                        });
                    }
                };
            },
            bgDel: function() { //删除遮罩层
                if (opts.bgFrame) {
                    $('#bgScreen, #bgIFrame').remove();
                    //$(window).unbind('scroll');
                };
            },
            clickClose: function(bgFrameClose, callback) { //关闭操作；bgFrameClose：是否点击遮罩关闭（可选，boolean）
                var objBg = bgFrameClose ? ', #bgScreen' : '';
                $('.ZShowbox .show-close').die().live('click', function() {
                    if ($(this).parents('.ZShowbox').attr('show-type') == 'create') {
                        method.objRemove($(this).parents('.ZShowbox'));
                    } else {
                        $(this).parents('.ZShowbox').hide();
                    };
                    if ($('.ZShowbox:visible').size() < 2) {
                        method.bgDel();
                    };
                    if (typeof callback == 'function') {
                        callback();
                    };
                });
                if (objBg != '') {
                    $(objBg).die().live('click', function() {
                        if (closeType) {
                            $('.ZShowbox').hide();
                        } else {
                            method.objRemove($('.ZShowbox'));
                        };
                        method.bgDel();
                    });
                    if (typeof callback == 'function') {
                        callback();
                    };
                };
            },
            showPositionFix: function(obj) { //弹出框定位
                var obj = obj;
                /*box fixed*/
                var boxnFixed = function() {
                    if (jQuery.browser.version == '6.0') {
                        obj.css({
                            'top': document.documentElement.scrollTop + (ZScreenHeight - obj.height()) / 2 + 'px',
                            'left': (ZScreenWidth / 2 + document.documentElement.scrollLeft)
                        });
                    }
                }

                obj.css('margin', (jQuery.browser.version == '6.0' ? 0 : -obj.height() / 2 - 5) + 'px 0 0 ' + -obj.width() / 2 + 'px');
                //obj.css({'top': document.documentElement.scrollTop + (_wh[1] - obj.height()) / 2, 'margin-left':-obj.width() / 2 + 'px'});

                /*position fix 注意需要unbind*/
                if (jQuery.browser.version == '6.0') {
                    boxnFixed();
                    $(window).bind('scroll', function() {
                        boxnFixed();
                    });
                    obj.css('left', document.documentElement.scrollLeft + document.documentElement.clientWidth - this.offsetWidth);
                }
            }
        }

        this.each(function() {
            if (opts.showType == 'show') {
                method.allShow(this);
            } else if (opts.showType == 'create') {
                method.createBox(opts.createClassName, opts.createTitTxt, opts.createConHTML, opts.createBtnType, opts.createIcoClose, opts.createCallbackConfirm, opts.createCallbackCancel, opts.createCallbackCancel2, opts.createBgSave);
            };
        });
        return method;
    };
    //容器居中
    jQuery.fn.ZCenter = function(options) {
        var defaults = {
            scrollMove: true //滚动时是否需要保持居中（Boolean，true为是）
        }
        var opts = $.extend(defaults, options);
        var method = {
            centerFun: function(obj, scrollMove) {
                var obj = obj;
                body_width = parseInt($(window).width());
                body_height = parseInt($(window).height());
                block_width = parseInt(obj.width());
                block_height = parseInt(obj.height());
                left_position = parseInt((body_width / 2) - (block_width / 2) + $(window).scrollLeft());
                if (body_width < block_width) {
                    left_position = 0 + $(window).scrollLeft();
                };
                top_position = parseInt((body_height / 2) - (block_height / 2) + $(window).scrollTop());
                if (body_height < block_height) {
                    top_position = 0 + $(window).scrollTop();
                };
                if (!scrollMove) {
                    obj.css({
                        'position': 'absolute'
                    });
                    obj.css({
                        'top': top_position,
                        'left': left_position
                    });
                    $(window).bind('resize', function() {
                        method.centerFun(obj, !scrollMove);
                    });
                    $(window).bind('scroll', function() {
                        method.centerFun(obj, !scrollMove);
                    });
                } else {
                    obj.stop();
                    obj.css({
                        'position': 'absolute'
                    });
                    obj.animate({
                        'top': top_position,
                        'left': left_position
                    }, 200, 'linear');
                }
            }
        }
        this.each(function() {
            var that = $(this);
            method.centerFun(that, opts.loaded);
        });
    };
    //鼠标点击空白区域元素消失
    jQuery.fn.ZBlankHide = function(options) {
            var defaults = {
                callback: function(obj) { //回调函数
                    $(obj).fadeOut('fast');
                }
            };
            var opts = $.extend(defaults, options);
            var method = {
                hideFun: function(obj, callback) {
                    var flag = false;
                    $(obj).live('mouseenter', function() {
                        flag = true
                    }).live('mouseleave', function() {
                        flag = false
                    });
                    $('html, body').mousedown(function(e) {
                        e = window.e || e;
                        var target = e.target || e.srcElement;
                        if (!flag && target != $(obj)) {
                            if (typeof callback == 'function') {
                                callback($(obj));
                            };
                        }
                    });
                }
            }
            this.each(function() {
                var that = $(this);
                method.hideFun(that, opts.callback);
            });
        }
        //删除元素
    jQuery.fn.ZObjDel = function(options) {
            var defaults = {
                btnClassName: '.btn-del', //需要删除元素的删除按钮className
                targetClassName: 'li', //需要删除元素的父级容器className
                animateType: 'slide', //删除动画；slideUp：滑动；fade：淡出；none：无动画
                callback: null //回调函数
            };
            var opts = $.extend(defaults, options);
            var method = {
                delFun: function(obj, objClassName, target, animateType, callback) {
                    var _target = obj.parents(target);
                    if (animateType == 'slide') {
                        _target.animate({
                            'height': '0'
                        }, 'slow', function() {
                            _target.remove();
                        });
                    } else if (animateType == 'fade') {
                        _target.animate({
                            'opacity': '0'
                        }, 'slow', function() {
                            _target.remove();
                        });
                    } else {
                        _target.remove();
                    };
                    if (typeof callback == 'function') {
                        callback();
                    };
                }
            }
            this.each(function() {
                var that = $(this);
                that.live('click', function() {
                    method.delFun(that, $(opts.btnClassName), opts.targetClassName, opts.animateType, opts.callback);
                });
            });
        }
        //文本框控制
    jQuery.fn.ZInput = function(options) {
            var defaults = {
                allFun: true //调用所有方法（Boolean）
            }
            var opts = $.extend(defaults, options);
            var method = {
                inputFocus: function(obj) { //文本框获得焦点状态；obj：执行对象名称
                    $(obj).find('input, textarea').live('focus', function() {
                        var that = $(this);
                        $(obj).addClass("focus").find(".ts-type, .ts-error").fadeOut("fast");
                    });
                },
                inputBlur: function(obj) { //文本框失去焦点状态；obj：执行对象名称
                    $(obj).find('input, textarea').live('blur', function() {
                        var that = $(this);
                        $(obj).removeClass("focus");
                        if ($(this).val() == "") {
                            $(obj).find(".ts-type").fadeIn("fast");
                        }
                    });
                },
                inputCheckValue: function(obj) { //页面刷新后监测文本框有无内容，如果有隐藏提示消息；obj：执行对象名称
                    $(obj).each(function() {
                        var objInput = $(this).find('input, textarea');
                        if ($.trim(objInput.val()) != "") {
                            objInput.parent('.relative-box').find(".ts-type, .ts-error").fadeOut("fast");
                        } else {
                            objInput.parent('.relative-box').find(".ts-type").fadeIn("fast");
                        }
                    });
                }
            }
            this.each(function() {
                var that = $(this);
                if (opts.allFun) {
                    method.inputFocus(that);
                    method.inputBlur(that);
                    method.inputCheckValue(that);
                };
            });
            return method;
        }
        //模拟select
    jQuery.fn.ZSelect = function(options) {
            var defaults = {
                scrollHeight: 200, //设置滚动条最小高度
                valueCross: false //设置点击结果后是否交叉传值
            }
            var opts = $.extend(defaults, options);
            var method = {
                selectScroll: function(obj, scrollHeight) { //设置模拟select内容部分滚动条；obj：执行对象名称；scrollHeight：滚动条最小高度（可选）
                    if (obj.find('.show-select dl').height() > scrollHeight) {
                        obj.find('.show-select').css({
                            'height': scrollHeight + 'px'
                        });
                    } else {
                        obj.find('.show-select').css({
                            'height': 'auto'
                        });
                    }
                },
                selectFun: function(obj, scrollHeight) { //模拟select；obj：执行对象名称；scrollHeight：滚动条高度（开启scroll后可选）
                    obj.live('mousedown', function() {
                        var that = $(this);
                        obj.removeClass('current');
                        that.addClass('current').find('.show-select dd').live('mouseenter', function() {
                            $(this).addClass('hover').siblings('dd').removeClass('hover');
                        }).live('mouseleave', function() {
                            $(this).removeClass('hover');
                        }).live('click', function() {
                            var objValue = that.find('.value');
                            that.removeClass('current');
                            if (opts.valueCross) {
                                if (objValue.is('input')) {
                                    objValue.attr({
                                        'value': $(this).attr('data-value'),
                                        'data-value': $(this).text()
                                    });
                                } else {
                                    objValue.text($(this).attr('data-value')).attr('value', $(this).text());
                                };
                            } else {
                                if (objValue.is('input')) {
                                    objValue.attr({
                                        'value': $(this).text(),
                                        'data-value': $(this).attr('data-value')
                                    });
                                } else {
                                    objValue.text($(this).text()).attr('value', $(this).attr('data-value'));
                                };
                            }
                        });
                        if (scrollHeight > 0) {
                            method.selectScroll($(this), scrollHeight);
                        };
                    });
                    obj.ZBlankHide({
                        callback: function() {
                            if (obj.hasClass('current')) {
                                obj.removeClass('current');
                            }
                        }
                    });
                }
            }
            this.each(function() {
                var that = $(this);
                method.selectFun(that, opts.scrollHeight);
            });
        }
        //input radio选择
    jQuery.fn.ZRadio = function(options) {
            var defaults = {
                itemClassName: '.ZRadio .value' //选择元素的className
            }
            var opts = $.extend(defaults, options);
            var method = {
                radioFun: function(obj) {
                    $(obj).live('click', function() {
                        if (!$(this).parents('.item').hasClass('lock')) {
                            var group = $(this).attr('group');
                            $(obj + '[group=' + group + ']').removeClass('current');
                            $(this).addClass('current');
                        }
                    });
                }
            }
            this.each(function() {
                method.radioFun(opts.itemClassName);
            });
        }
        //input checkbox选择
    jQuery.fn.ZCheckBox = function(options) {
            var defaults = {
                itemClassName: '.ZCheckBox .value' //选择元素的className
            }
            var opts = $.extend(defaults, options);
            var method = {
                checkBoxFun: function(obj) {
                    $(obj).live('click', function() {
                        if (!$(this).parents('.item').hasClass('lock')) {
                            $(this).parents('.item').toggleClass('current');
                        }
                    });
                }
            }
            this.each(function() {
                method.checkBoxFun(opts.itemClassName);
            });
        }
        //自适应子容器高度
    jQuery.fn.ZAutoHeight = function(options) {
            var defaults = {
                animateType: 'slide', //动画类型；slideUp：滑动；fade：淡出；none：无动画
                isResize: false, //在窗口大小发生变化时是否自适应
                callback: null
            }
            var opts = $.extend(defaults, options);
            var method = {
                autoFun: function(obj, animateType) {
                    obj.stop().animate({
                        'height': obj.children(':visible').outerHeight(true)
                    }, 'normal', function() {
                        if (typeof callback == 'function') {
                            callback();
                        }
                    });
                }
            }
            this.each(function() {
                var that = $(this);
                method.autoFun(that, opts.animateType);
                if (opts.isResize) {
                    var t;
                    $(window).resize(function() {
                        clearTimeout(t);
                        t = setTimeout(function() {
                            method.autoFun(that, opts.animateType);
                        }, 100);
                    });
                };
            });
        }
        //背景图片居中
    $.fn.ZVMiddleImg = function(options) {
        var defaults = {
            'width': null,
            'height': null,
            vmType: 'max', //居中模式；max：放大模式；min：缩小模式
            isResize: false
        };
        var opts = $.extend({}, defaults, options);
        var method = {
            maxFun: function(obj) {
                var objWidth = obj.width(),
                    objHeight = obj.height(),
                    objScale = objWidth / objHeight,
                    parentWidth = opts.width || obj.parent().width(),
                    parentHeight = opts.height || obj.parent().height(),
                    parentScale = parentWidth / parentHeight,
                    t;
                if (objScale < parentScale) {
                    obj.width(parentWidth);
                    obj.height(obj.width() * objHeight / objWidth);
                } else {
                    obj.height(parentHeight);
                    obj.width(obj.height() * objWidth / objHeight);
                };
                obj.css({
                    'top': (parentHeight - obj.height()) / 2 + 'px',
                    'left': (parentWidth - obj.width()) / 2 + 'px'
                });
            },
            minFun: function(obj) {
                var objWidth = obj.width(),
                    objHeight = obj.height(),
                    objScale = objWidth / objHeight,
                    parentWidth = opts.width || obj.parent().width(),
                    parentHeight = opts.height || obj.parent().height(),
                    parentScale = parentWidth / parentHeight,
                    t;
                if (objScale > parentScale) {
                    obj.width(parentWidth);
                    obj.height(obj.width() * objHeight / objWidth);
                } else {
                    obj.height(parentHeight);
                    obj.width(obj.height() * objWidth / objHeight);
                };
                obj.css({
                    'top': (parentHeight - obj.height()) / 2 + 'px',
                    'left': (parentWidth - obj.width()) / 2 + 'px'
                });
            }
        }
        this.each(function() {
            var that = $(this);
            if (opts.vmType == 'max') {
                method.maxFun(that);
            } else if (opts.vmType == 'min') {
                method.minFun(that);
            };
        });
    };
    //TAB切换模块
    jQuery.fn.ZTab = function(options) {
            var defaults = {
                tabAuto: false, //设置TAB切换是否自动执行
                tabHoverStop: true, //设置TAB在hover状态是否停止轮播
                tabAutoTime: 5000, //设置TAB切换是否自动执行时间间隔
                tabAutoHeight: false, ///设置TAB切换是否自适应高度
                animateType: 'fade', //设置TAB切换的动画效果；fade：淡入淡出；opacity：淡入淡出（透明）；scroll：滑动；none：无动画
                animateSpeed: 'slow', //设置TAB切换动画的过渡时间；slow/normal/fast/number
                scrollType: 'horizontal', //scroll模式时设置滑动类型；horizontal：水平滑动；vertical：垂直滑动
                scrollLoop: true, //scroll模式时设置是否无限滑动
                hasOpBtn: false //是否显示切换按钮
            };
            var opts = $.extend(defaults, options);
            var method = {
                objSet: {
                    parentWidth: function(obj) {
                        var that = obj,
                            _width = null;
                        var getWidth = function(obj) {
                            _width = obj.parent().width();
                        }
                        getWidth(that);
                        if (opts.tabAutoHeight) {
                            $(window).resize(function() {
                                getWidth(that);
                            });
                        };
                        return _width;
                    }
                },
                formatFun: function(obj, animateType) { //TAB初始化
                    var that = obj,
                        objCon = that.find('.tab-con'),
                        objConLi = that.find('.tab-con li');
                    objConLi.first().addClass('current').fadeIn(opts.animateSpeed);
                    if (animateType == 'scroll') {
                        objConLi.fadeIn(opts.animateSpeed);
                    };
                    if (opts.tabAutoHeight) {
                        objCon.ZAutoHeight();
                    };
                    if ($.trim(obj.find('.tab-tit').html()) == '') {
                        for (var i = 0; i < objConLi.size(); i++) {
                            obj.find('.tab-tit').append('<a></a>');
                        };
                    };
                    that.find('.tab-tit').children().first().addClass('current');
                },
                titCur: function(obj, animateType) { //TAB TIT元素current状态切换
                    if (animateType == 'scroll') {
                        obj.find('.tab-tit').children().eq(obj.find('.tab-con li.current').index() - 1).addClass('current').siblings().removeClass('current');
                    } else {
                        obj.find('.tab-tit').children().eq(obj.find('.tab-con li.current').index()).addClass('current').siblings().removeClass('current');
                    };
                },
                prevFun: function(obj, animateType, scrollType, scrollLoop) { //切换到上一个
                    var that = obj,
                        objCon = that.find('.tab-con'),
                        objConLi = that.find('.tab-con li'),
                        objTit = that.find('.tab-tit'),
                        _index = objCon.find('li.current').index();
                    if (animateType == 'scroll') {
                        var objConLiFirst = objConLi.eq(objCon.find('li').first().index() + 1),
                            objConLiLast = objConLi.eq(objCon.find('li').last().index() - 1)
                        var objConMove = function() {
                            objCon.stop().animate({
                                'left': '-' + method.objSet.parentWidth(that) * (objCon.find('li.current').index() - 1) + 'px'
                            }, opts.animateSpeed);
                        }
                        if (objConLi.eq(objCon.find('li').first().index() + 1).hasClass('current')) {
                            objConLiFirst.removeClass('current');
                            objConLiLast.addClass('current');
                            objConMove();
                        } else {
                            objCon.find('li.current').removeClass('current').prev().addClass('current');
                            objConMove();
                        };
                    } else if (animateType == 'fade') {
                        if (_index == 0) {
                            objConLi.last().addClass('current').fadeIn(opts.animateSpeed, function() {
                                method.isTabAutoHeight(that, opts.animateSpeed);
                            }).siblings('li').removeClass('current').fadeOut(opts.animateSpeed);
                        } else {
                            objCon.find('li.current').removeClass('current').fadeOut(opts.animateSpeed).prev().addClass('current').fadeIn(opts.animateSpeed, function() {
                                method.isTabAutoHeight(that, opts.animateSpeed);
                            });
                        };
                    };
                    method.titCur(that, animateType);
                },
                nextFun: function(obj, animateType, scrollType, scrollLoop) { //切换到下一个
                    var that = obj,
                        objCon = that.find('.tab-con'),
                        objConLi = that.find('.tab-con li'),
                        objTit = that.find('.tab-tit'),
                        _index = objCon.find('li.current').index();
                    if (animateType == 'scroll') {
                        var objConLiFirst = objConLi.eq(objCon.find('li').first().index() + 1),
                            objConLiLast = objConLi.eq(objCon.find('li').last().index() - 1)
                        var objConMove = function() {
                            objCon.stop().animate({
                                'left': '-' + method.objSet.parentWidth(that) * (objCon.find('li.current').index() - 1) + 'px'
                            }, opts.animateSpeed);
                        }
                        if (objConLi.eq(objCon.find('li').last().index() - 1).hasClass('current')) {
                            objConLiLast.removeClass('current');
                            objConLiFirst.addClass('current');
                            objConMove();
                        } else {
                            objCon.find('li.current').removeClass('current').next().addClass('current');
                            objConMove();
                        };
                    } else if (animateType == 'fade') {
                        if (_index == objConLi.size() - 1) {
                            objConLi.first().addClass('current').fadeIn(opts.animateSpeed, function() {
                                method.isTabAutoHeight(that, opts.animateSpeed);
                            }).siblings('li').removeClass('current').fadeOut(opts.animateSpeed);
                        } else {
                            objCon.find('li.current').removeClass('current').fadeOut(opts.animateSpeed).next().addClass('current').fadeIn(opts.animateSpeed, function() {
                                method.isTabAutoHeight(that, opts.animateSpeed);
                            });
                        };
                    };
                    method.titCur(that, animateType);
                },
                operateFun: function(obj, animateType, scrollType) { //手动切换到任意一个
                    var that = obj,
                        objTit = that.find('.tab-tit'),
                        objTitItem = that.find('.tab-tit li').size() > 0 ? that.find('.tab-tit li') : that.find('.tab-tit a'),
                        objCon = that.find('.tab-con'),
                        objConLi = that.find('.tab-con li');
                    objTitItem.die().live('click', function() {
                        $(this).addClass('current').siblings().removeClass('current');
                        var _index = objTit.children('.current').index();
                        if (animateType == 'scroll') {
                            objCon.stop().animate({
                                'left': '-' + method.objSet.parentWidth(that) * _index + 'px'
                            }, opts.animateSpeed);
                            objConLi.eq(_index + 1).addClass('current').siblings().removeClass('current');
                        } else if (animateType == 'fade') {
                            objConLi.eq(_index).addClass('current').fadeIn(opts.animateSpeed, function() {
                                method.isTabAutoHeight(that, opts.animateSpeed);
                            }).siblings('li').removeClass('current').fadeOut(opts.animateSpeed);
                        };
                    });
                },
                autoFun: function(obj, animateType, scrollType, scrollLoop, tabAutoTime, tabHoverStop) { //自动执行
                    var that = obj,
                        t;
                    t = window.setInterval(function() {
                        method.nextFun(that, animateType, scrollType, scrollLoop);
                    }, tabAutoTime);
                    if (tabHoverStop) {
                        that.mouseenter(function() {
                            clearInterval(t);
                        }).mouseleave(function() {
                            t = window.setInterval(function() {
                                method.nextFun(that, animateType, scrollType, scrollLoop);
                            }, tabAutoTime);
                        });
                    };
                },
                scrollItemArrange: function(obj) { //scroll模式元素排列
                    var that = obj,
                        objCon = that.find('.tab-con'),
                        objConLi = that.find('.tab-con li'),
                        t;
                    var objConLiPos = function() {
                        objCon.find('li').width(method.objSet.parentWidth(that));
                    }
                    var resetScroll = function(obj) {
                        obj.animate({
                            'left': '-' + (obj.find('li.current').index() - 1) * method.objSet.parentWidth(that) + 'px'
                        }, opts.animateSpeed);
                    }
                    objConLiPos();
                    if (opts.tabAutoHeight) {
                        objCon.ZAutoHeight();
                        $(window).resize(function() {
                            clearTimeout(t);
                            t = setTimeout(function() {
                                objConLiPos();
                                resetScroll(objCon);
                                objCon.ZAutoHeight();
                            }, 500);
                        });
                    };
                    var addFixItem = function() {
                        objCon.prepend(objConLi.last().clone().removeClass().attr('style', '').css('margin-left', '-' + method.objSet.parentWidth(that) + 'px').show());
                        objCon.append(objConLi.first().clone().removeClass().attr('style', '').css('margin-left', method.objSet.parentWidth(that) * objConLi.index()).show());
                    }
                    addFixItem();
                },
                scrollFun: function(obj, tabAuto, scrollLoop) { //滑动效果
                    var that = obj;
                    method.formatFun(that, 'scroll');
                    method.scrollItemArrange(that);
                    method.operateFun(that, 'scroll', opts.scrollType);
                },
                fadeFun: function(obj, tabAuto) { //淡入淡出效果
                    var that = obj;
                    method.formatFun(that, 'fade');
                    method.operateFun(that, 'fade', opts.scrollType);
                },
                opBtnFun: function(obj, animateType, scrollType, scrollLoop) { //切换按钮模块
                    var that = obj,
                        objBtn = obj.find('.op-box .btn-op'),
                        t;
                    var posBtn = function() {
                        var _top = obj.find('.tab-con li.current').height() / 2 - objBtn.outerHeight(true) / 2;
                        objBtn.stop().animate({
                            'top': _top
                        }, 'slow');
                    }
                    setTimeout(function() {
                        posBtn();
                        objBtn.animate({
                            'opacity': 1
                        }, 'slow');
                    }, 500);
                    if (opts.tabAutoHeight) {
                        $(window).resize(function() {
                            clearTimeout(t);
                            t = setTimeout(function() {
                                posBtn();
                            }, 500);
                        });
                    };
                    objBtn.die().live('click', function() {
                        if (animateType == 'scroll') {
                            if (scrollType == 'horizontal') {
                                if ($(this).hasClass('btn-next')) {
                                    method.nextFun(that, 'scroll', opts.scrollType);
                                } else {
                                    method.prevFun(that, 'scroll', opts.scrollType);
                                };
                            };
                        } else {
                            if ($(this).hasClass('btn-next')) {
                                method.nextFun(that, animateType);
                            } else {
                                method.prevFun(that, animateType);
                            };
                        };
                    });
                },
                isTabAutoHeight: function(obj, animateSpeed) {
                    var that = obj;
                    setTimeout(function() {
                        obj.find('.tab-con').ZAutoHeight();
                    }, 100);
                }
            }
            this.each(function() {
                var that = $(this);
                if (opts.animateType == 'scroll') {
                    method.scrollFun(that, opts.tabAuto, opts.scrollLoop);
                } else if (opts.animateType == 'fade') {
                    method.fadeFun(that, opts.tabAuto);
                };
                if (that.find('.tab-con li').size() > 1) {
                    if (opts.hasOpBtn) {
                        method.opBtnFun(that, opts.animateType, opts.scrollType, opts.scrollLoop);
                    }
                    if (opts.tabAuto) {
                        method.autoFun(that, opts.animateType, opts.scrollType, opts.scrollLoop, opts.tabAutoTime, opts.tabHoverStop);
                    }
                }
                if (opts.tabAuto) {
                    method.autoFun(that, opts.animateType, opts.scrollType, opts.scrollLoop, opts.tabAutoTime, opts.tabHoverStop);
                }
            });
        }
        //图片上传预览
    jQuery.fn.extend({
        uploadPreview: function(opts) {
            opts = jQuery.extend({
                width: 0,
                height: 0,
                imgDiv: "#imgDiv",
                maxSize: 4096,
                imgType: ["gif", "jpeg", "jpg", "bmp", "png"],
                callback: function() {
                    return false;
                }
            }, opts || {});
            var _this = $(this);
            var imgDiv = $(opts.imgDiv);
            imgDiv.width(opts.width);
            imgDiv.height(opts.height);
            var version = parseInt($.browser.version, 10);
            autoScaling = function() {
                    if (version == 7 || version == 8 || version == 9) {
                        imgDiv.get(0).filters.item("DXImageTransform.Microsoft.AlphaImageLoader").sizingMethod = "image";
                    }
                    var img_width = imgDiv.width();
                    var img_height = imgDiv.height();
                    if (img_width > 0 && img_height > 0) {
                        var rate = (opts.width / img_width < opts.height / img_height) ? opts.width / img_width : opts.height / img_height;
                        if (rate <= 1) {
                            if (version == 7 || version == 8 || version == 9) imgDiv.get(0).filters.item("DXImageTransform.Microsoft.AlphaImageLoader").sizingMethod = "scale";
                            imgDiv.width(img_width * rate);
                            imgDiv.height(img_height * rate);
                        } else {
                            imgDiv.width(img_width);
                            imgDiv.height(img_height);
                        }
                        var left = (opts.width - imgDiv.width()) * 0.5;
                        var top = (opts.height - imgDiv.height()) * 0.5;
                        imgDiv.css({
                            "margin-left": left,
                            "margin-top": top
                        });
                        imgDiv.show();
                    }
                },
                createImg = function() {
                    imgDiv.html('');
                    var img = $("<img />");
                    imgDiv.replaceWith(img);
                    imgDiv = img;
                },
                _this.change(function() {
                    if (this.value) {
                        if (!RegExp("\.(" + opts.imgType.join("|") + ")$", "i").test(this.value.toLowerCase())) {
                            alert("图片类型必须是" + opts.imgType.join("，") + "中的一种");
                            this.value = "";
                            return false;
                        }
                        imgDiv.hide();
                        if ($.browser.msie && version < 10) {
                            if (version == 6) {
                                var image = new Image();
                                image.onload = function() {
                                    if ((image.fileSize / 1024) > opts.maxSize) {
                                        alert('图片大小不能超过' + opts.maxSize + 'K');
                                        return false;
                                    }
                                }
                                image.src = 'file:///' + this.value;
                                createImg();
                                imgDiv.attr('src', image.src);
                                autoScaling();
                            } else {
                                this.select();
                                var img = document.selection.createRange().text;
                                var image = new Image();
                                image.onload = function() {
                                    if ((image.fileSize / 1024) > opts.maxSize) {
                                        alert('图片大小不能超过' + opts.maxSize + 'K');
                                        return false;
                                    }
                                }
                                image.src = img;
                                imgDiv.html('');
                                imgDiv.css({
                                    filter: "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=image)"
                                });
                                imgDiv.get(0).filters.item("DXImageTransform.Microsoft.AlphaImageLoader").sizingMethod = "image";
                                try {
                                    imgDiv.get(0).filters.item('DXImageTransform.Microsoft.AlphaImageLoader').src = img;
                                } catch (e) {
                                    alert("无效的图片文件！");
                                    return;
                                }
                                setTimeout("autoScaling()", 100);
                            }
                        } else {
                            try {
                                var file = null;
                                var size = 0;
                                if (this.files && this.files[0]) {
                                    file = this.files[0];
                                    size = file.size;
                                } else if (this.files && this.files.item(0)) {
                                    file = this.files.item(0);
                                    size = file.fileSize;
                                }
                                if ((size / 1024) > opts.maxSize) {
                                    alert('图片大小不能超过' + opts.maxSize + 'K');
                                    return false;
                                }
                                createImg();
                                //Firefox 因安全性问题已无法直接通过input[file].value 获取完整的文件路径  
                                try {
                                    //Firefox7.0 以下                               
                                    imgDiv.attr('src', file.getAsDataURL());
                                } catch (e) {
                                    //Firefox8.0以上                                
                                    imgDiv.attr('src', window.URL.createObjectURL(file));
                                }

                                imgDiv.css({
                                    "vertical-align": "middle"
                                });
                                setTimeout("autoScaling()", 100);
                            } catch (e) {
                                //支持html5的浏览器,比如高版本的firefox、chrome、ie10  
                                if (this.files && this.files[0]) {
                                    if ((this.files[0].size / 1024) > opts.maxSize) {
                                        alert('图片大小不能超过' + opts.maxSize + 'K');
                                        return false;
                                    }

                                    var reader = new FileReader();
                                    reader.onload = function(e) {
                                        imgDiv.attr('src', e.target.result);
                                    };
                                    reader.readAsDataURL(this.files[0]);
                                    setTimeout("autoScaling()", 100);
                                }
                            };
                        }
                    }
                });
        }
    });
})(jQuery);