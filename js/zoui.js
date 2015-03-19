(function($) {
    $.extend({
        createShowBox: function(msg) { //弹框提示
            $(window).ZShowbox({
                showType: 'create',
                createConHTML: msg,
                createBtnType: 1,
                createCallbackConfirm: function() {
                    $(window).ZShowbox().allHide();
                }
            });
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
        checkUsername: function(obj) {
            var value = $(obj).val();
            var ts = $(obj).siblings('.ts-error');
            if (value.length < 2 && value !== "") {
                ts.html('<span class="txt"><i class="spritePng ico-error"></i>请您输入正确的姓名</span>').fadeIn('slow');
                $.createShowBox('请您输入正确的姓名');
                return false;
            } else if (value === "") {
                ts.html('<span class="txt"><i class="spritePng ico-error"></i>请您输入姓名</span>').fadeIn('slow');
                $.createShowBox('请您输入姓名');
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
        checkVercCode: function(obj) {  //表单验证：验证码
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
    $.fn.ZInput = function(options) {
        var defaults = {
            allFun: true //调用所有方法（Boolean）
        }
        var opts = $.extend(defaults, options);
        var method = {
            inputFocus: function(obj) { //文本框获得焦点状态；obj：执行对象名称
                $(obj).delegate('input, textarea', 'focus', function() {
                    var that = $(this);
                    $(obj).addClass("focus").find(".ts-type, .ts-error").fadeOut("fast");
                });
            },
            inputBlur: function(obj) { //文本框失去焦点状态；obj：执行对象名称
                $(obj).delegate('input, textarea', 'blur', function() {
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
                        objInput.parents('.relative-box').find(".ts-type, .ts-error").fadeOut("fast");
                    } else {
                        objInput.parents('.relative-box').find(".ts-type").fadeIn("fast");
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
    //input radio选择
    $.fn.ZRadio = function(options) {
        var defaults = {
            itemClassName: '.ZRadio .value' //选择元素的className
        }
        var opts = $.extend(defaults, options);
        var method = {
            radioFun: function(obj) {
                $(obj).on('click', function() {
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
    $.fn.ZCheckBox = function(options) {
        var defaults = {
            itemClassName: '.ZCheckBox .value' //选择元素的className
        }
        var opts = $.extend(defaults, options);
        var method = {
            checkBoxFun: function(obj) {
                $(obj).delegate(obj, 'click', function() {
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
    //弹出框
    $.fn.ZShowbox = function(options) {
        var defaults = {
            bgFrame: true, //是否需要遮罩层
            bgFrameClose: false, //是否开启点击遮罩层关闭
            showType: '', //弹出框类型，show：显示页面弹出框；create：创建新弹出框
            createClassName: 'ZShowbox-create', //创建弹出框的className
            createTitTxt: '提示信息', //创建模式弹出框标题
            createConHTML: '', //创建模式内容HTML
            createBtnType: 0, //创建模式弹出框类型（0.弹出框，1.提示框，2.确认框）
            createCallbackConfirm: null, //创建模式确认按钮回调函数
            createCallbackCancel: null, //创建模式取消按钮回调函数
            createBgSave: false //创建模式是否保留背景（boolen，true为保留）
        }
        var opts = $.extend(defaults, options);
        var method = {
            createBox: function(className, titTxt, conHTML, btnType, callbackConfirm, callbackCancel, bgSave) { //创建弹出框；className：创建弹出框的className；titTxt：创建弹出框的标题；conHTML：创建弹出框的内容HTML；btnType：创建弹出框类型（0.弹出框，1.提示框，2.确认框）；callbackConfirm：确认按钮回调函数；callbackCancel：取消按钮回调函数；bgSave：是否保留背景（boolen，true为保留）
                var _html = '<div class="ZShowbox ' + className + '" show-type="create"><a class="show-close" href="javascript:;"><i class="spriteImg"></i></a><h3 class="show-tit"><p class="txt">' + titTxt + '</p></h3><div class="show-con"><div class="inner-box">' + conHTML + '</div></div></div>';
                $('body').append(_html);
                var objBox = $('.' + className);
                if (btnType == 1) {
                    objBox.find('.show-con').after('<div class="show-op  show-op-1"><a class="show-confirm module-btn module-btn-black" href="javascript:;" style="margin:0 auto;">确认</a></div>');
                } else if (btnType == 2) {
                    objBox.find('.show-con').after('<div class="show-op show-op-2 clearfix"><a class="show-confirm module-btn module-btn-black" href="javascript:;">确认</a>' + '<a class="show-cancel module-btn module-btn-white" href="javascript:;" style="margin-left:20px;">取消</a></div>');
                };
                method.bgAdd();
                method.showPositionFix(objBox);
                objBox.fadeIn('slow');
                method.clickClose(opts.bgFrameClose, callbackCancel);
                var closeBox = function(bgSave) {
                    method.objRemove(objBox);
                    if (!bgSave) {
                        method.bgDel();
                    };
                }
                objBox.delegate('.show-cancel', 'click', function() {
                    closeBox(bgSave);
                });
                if (typeof callbackConfirm == 'function') {
                    objBox.delegate('.show-confirm', 'click', function() {
                        callbackConfirm();
                        closeBox(bgSave);
                    });
                };
                if (typeof callbackCancel == 'function') {
                    objBox.delegate('.show-cancel, .show-close', 'click', function() {
                        callbackCancel();
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
                showBoxObj.fadeIn('slow');
            },
            boxHide: function(callback) { //隐藏弹出框；callback：回调函数
                $('.ZShowbox').fadeOut('slow');
                if (typeof callback == 'function') {
                    callback();
                };
            },
            objHide: function(obj, callback) { //关闭指定弹出框，obj：执行对象；callback：回调函数
                $(obj).each(function() {
                    var that = $(this);
                    that.fadeOut('slow');
                    if (typeof callback == 'function') {
                        callback();
                    };
                });
            },
            objRemove: function(obj, callback) { //删除指定内容，obj：执行对象；callback：回调函数
                $(obj).each(function() {
                    var that = $(this);
                    that.stop().animate({
                        'opacity': 0
                    }, 'slow', function() {
                        that.remove();
                    });
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
                            'height': '100%',
                            'opacity': '0'
                        }).animate({
                            opacity: 0.3
                        }, 500);
                    }
                };
            },
            bgDel: function() { //删除遮罩层
                if (opts.bgFrame) {
                    $('#bgScreen, #bgIFrame').animate({
                        opacity: 0
                    }, 500, function() {
                        $('#bgScreen, #bgIFrame').remove()
                    });
                    //$(window).unbind('scroll');
                };
            },
            clickClose: function(bgFrameClose, callback) { //关闭操作；bgFrameClose：是否点击遮罩关闭（可选，boolean）
                var objBg = bgFrameClose ? ', #bgScreen' : '';
                $('.ZShowbox').delegate('.show-close', 'click', function() {
                    if ($(this).parents('.ZShowbox').attr('show-type') == 'create') {
                        method.objRemove($(this).parents('.ZShowbox'));
                    } else {
                        $(this).parents('.ZShowbox').fadeOut('slow');
                    };
                    if ($('.ZShowbox:visible').size() < 2) {
                        method.bgDel();
                    };
                    if (typeof callback == 'function') {
                        callback();
                    };
                });
                if (objBg != '') {
                    $(objBg).delegate(objBg, 'click', function() {
                        if (closeType) {
                            $('.ZShowbox').fadeOut('slow');
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
                obj.css('margin', (-obj.height() / 2 - 5) + 'px 0 0 ' + -obj.width() / 2 + 'px');
            }
        }

        this.each(function() {
            if (opts.showType == 'show') {
                method.allShow(this);
            } else if (opts.showType == 'create') {
                method.createBox(opts.createClassName, opts.createTitTxt, opts.createConHTML, opts.createBtnType, opts.createCallbackConfirm, opts.createCallbackCancel, opts.createBgSave);
            };
        });
        return method;
    };
})(jQuery);