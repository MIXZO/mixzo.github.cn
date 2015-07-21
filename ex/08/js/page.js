var kboxingPage = (function($) {
    var kboxingPageFun = {
        objCurrent: function(obj) { //元素添加current属性
            $(obj).live('click', function() {
                $(this).addClass('current').siblings().removeClass('current');
            });
        },
        objCurrentFlag: function(obj, newName, oldName) { //点击元素current属性
            var obj = $(obj);
            obj.live('click', function() {
                if ($(this).hasClass("current")) {
                    $(this).removeClass("current");
                    if ($.trim(oldName) != "") {
                        $(this).html($.trim(oldName));
                    }
                } else {
                    $(this).addClass("current");
                    if ($.trim(newName) != "") {
                        $(this).html($.trim(newName));
                    }
                }
            });
        },
        objHover: function(obj) { //元素添加hover事件
            $(obj).live('mouseenter', function() {
                $(this).addClass('hover');
            }).live('mouseleave', function() {
                $(this).removeClass('hover');
            });
        },
        objBlankHide: function(obj, callback) { //鼠标点击空白区域元素消失
            var flag = false;
            $(obj).live('mouseenter', function() {
                flag = true
            }).live('mouseleave', function() {
                flag = false
            });
            $(document).mousedown(function(e) {
                e = window.e || e;
                var target = e.target || e.srcElement;
                if (!flag && target != $(obj)) {
                    callback();
                }
            });
        },
        objOnceCurrent: function(obj, newName) { //点击元素只执行一次添加current属性
            $(obj).live('click', function() {
                if (!$(this).hasClass("current")) {
                    $(this).addClass("current");
                }
                if (newName != "") {
                    $(this).find(".txt").text(newName);
                }
            });
        },
        contentMainWidth: function() { //设定内容部分宽度
            var minWidth = 990;
            var _width = kboxing.screenWidth() - $('#content aside').outerWidth() > minWidth ? kboxing.screenWidth() - $('#content aside').outerWidth() : minWidth;
            $('#content .content-main').width(_width);
        },
        dropDownScroll: function(obj, height) { //模拟下拉内容部分滚动条设置
            if ($.trim(height) == '') {
                height = 200;
            }
            //alert($(obj).find('.dd-show dl').height());
            if ($(obj).find('.dd-show dl').height() > height) {
                $(obj).find('.dd-show').css({
                    'height': height + 'px'
                });
            } else {
                $(obj).find('.dd-show').css({
                    'height': 'auto'
                });
            }
        },
        dropDownFun: function(obj, scroll, height) { //模拟下拉返回选中值
            $(obj).live('mousedown', function() {
                var that = $(this);
                $(obj).removeClass('current');
                $(this).addClass('current').find('.dd-show dd').live('mouseenter', function() {
                    $(this).addClass('hover').siblings('dd').removeClass('hover');
                }).live('mouseleave', function() {
                    $(this).removeClass('hover');
                }).live('click', function() {
                    that.removeClass('current').find('.value').text($(this).text());
                });
                kboxingPageFun.dropDownScroll(this, height);
            });
            this.objBlankHide(obj, function() {
                $(obj).removeClass('current');
            });
        },
        tabFloatAlignFun: function(obj) { //TAB(FLOAT)横向切换
            var objCon = $(obj).find('.tab-con');
            var objConLi = $(obj).find('.tab-con li');
            var objCtrl = $(obj).find('.tab-ctrl');

            objConLi.first().addClass('current');

            var nextFun = function() {
                if (objCon.find('li.current').index() > objConLi.size() - 3) {
                    objConLi.removeClass('current').first().addClass('current');
                    objCon.animate({
                        'margin-left': 0
                    }, 'slow');
                } else {
                    objCon.find('li.current').removeClass('current').next().addClass('current');
                    objCon.animate({
                        'margin-left': '-' + (objConLi.width() + parseInt(objConLi.css('margin-right').substring(0, objConLi.css('margin-right').indexOf('px')))) * objCon.find('li.current').index()
                    }, 'slow');
                }
            }
            var prevFun = function() {
                if (objCon.find('li.current').index() < 2) {
                    objConLi.removeClass('current').last().addClass('current');
                    objCon.animate({
                        'margin-left': '-' + (objConLi.width() + parseInt(objConLi.css('margin-right').substring(0, objConLi.css('margin-right').indexOf('px')))) * (objConLi.size() - 2)
                    }, 'slow');
                } else {
                    objCon.find('li.current').removeClass('current').prev().addClass('current');
                    objCon.animate({
                        'margin-left': '-' + (objConLi.width() + parseInt(objConLi.css('margin-right').substring(0, objConLi.css('margin-right').indexOf('px')))) * (objCon.find('li.current').index() - 1)
                    }, 'slow');
                }
            }

            objCtrl.click(function() {
                if ($(this).hasClass('tab-next')) {
                    nextFun();
                } else {
                    prevFun();
                }
            });
        },
        amountFun: function(obj) { //商品数量操作
            $(obj).find('a').live('click', function() {
                if ($(this).hasClass('add')) {
                    $(this).siblings('input').val(parseInt($(this).siblings('input').val()) + 1);
                } else {
                    if (parseInt($(this).siblings('input').val()) > 1) {
                        $(this).siblings('input').val(parseInt($(this).siblings('input').val()) - 1);
                    }
                }
            });
        },
        delObj: function(objBtn) { //删除列表元素
            $(objBtn).live('click', function() {
                var obj = $(this).parents('li');
                obj.animate({
                    'height': '0',
                    'opacity': '0'
                }, 'slow', function() {
                    obj.remove();
                });
            });
        },
        formRadioChoose: function(obj) { //radio选择
            $(obj).live('click', function() {
                $(this).parents('li').addClass('current').siblings('li').removeClass('current');
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
        scoreView: function(obj) { //星级评分显示
            var obj = $(obj);
            obj.each(function() {
                $(this).find('i:lt(' + $(this).attr('score') + ')').addClass('current');
            });
        },
        scoreChange: function(obj) { //星级评分操作
            var index;
            $(obj + ' i').click(function() {
                index = $(this).index();
                $(this).parent(obj).attr('score', 0).find('i').removeClass('current');
                $(this).parent(obj).attr('score', index + 1).find('i:lt(' + (index + 1) + ')').addClass('current');
            });
        },
        pageProduct: function() { //product
            $('.product-show-more').each(function() { //计算系列隐藏cell数量
                if ($(this).siblings('.cell-source').find('.cell').size() > 0) {
                    $(this).find('.total').text($(this).siblings('.cell-source').find('.cell').size());
                } else {
                    $(this).hide();
                }
            });
            $('.product-show-more').click(function() { //显示剩余cell
                $(this).slideUp('slow').siblings('.grid-container-product').addClass('cell-add').append($(this).siblings('.cell-source').html());
                kboxing.gridLayout('.cell-add', 9);
                $(".cell-add .lazyload").lazyload({
                    effect: "fadeIn"
                });
                $(this).siblings('.grid-container-product').removeClass('cell-add');
            });
        },
        pageProductDetail: function() { //product_detail
            var sidebarWidth = function() { //设置右栏高度
                $('.product-sidebar').animate({
                    'height': kboxing.asideHeightFix()
                }, 'slow');
            }
            setTimeout(sidebarWidth, 550);

            var pageConWidth = function() { //设置内容部分宽度
                if ($('html').width() > 990) {
                    $('.product-detail-img').width(kboxing.screenWidth() - $('#content aside').width() - $('.product-sidebar').width());
                }
            }
            pageConWidth();

            var colorChange = function() { //选择颜色
                var colorItem = $('.product-color .list-color li');
                colorItem.first().addClass('current');
                var loadColor = function() {
                    $('.product-color .txt span').text($('.product-color .list-color li.current').attr('data-color'));
                }
                loadColor();
                colorItem.live('click', function() {
                    $(this).addClass('current').siblings().removeClass('current');
                    loadColor();
                });
            }
            colorChange();

            var commentHeight = function() { //获取评论模块高度
                var _height = $('.product-comment .txt-box li:visible').size() > 3 ? $('.product-comment .txt-box li').outerHeight() * 3 : 'auto';
                $('.product-comment .tab-con').animate({
                    'height': _height
                }, 'slow');
            }
            commentHeight();

            var commentPageSize = function() { //评论翻页
                $('.product-comment .tit-box i').click(function() {
                    if ($(this).hasClass('left')) {
                        if ($('.product-comment .txt-box li:hidden').size() > 2) {
                            for (var i = 0; i < 3; i++) {
                                $('.product-comment .txt-box li:hidden').last().show();
                            };
                        }
                    } else {
                        if ($('.product-comment .txt-box li:visible').size() > 3) {
                            $('.product-comment .txt-box li:visible:lt(3)').hide();
                        }
                    }
                });
            }
            commentPageSize();

            var cartBtnFun = function() { //购物车按钮动作
                $('.product-sidebar .btn-cart i, .product-sidebar .btn-cart .txt').click(function() {
                    $(this).siblings('.show-box').fadeIn('slow');
                });
                $('.product-sidebar .btn-cart .show-box .close').click(function() {
                    $(this).parents('.show-box').fadeOut('slow');
                });
            }
            cartBtnFun();
        },
        pageCart: function() { //cart
            var delFun = function() {
                $('.list-cart .txt .ctrl a').live('click', function() {
                    var obj = $(this).parents('li');
                    obj.animate({
                        'height': '0',
                        'opacity': '0'
                    }, 'slow', function() {
                        obj.remove();
                    });
                });
            }
            delFun();
        },
        pageOrderInformation: function() { //order-infromation
            $('.show-box .close').click(function() { //showbox关闭
                $(this).parents('.show-box').fadeOut('slow');
            });
            $('.btn-add-address, .list-address .op-box .edit').live('click', function() { //添加新地址
                $('.show-address').css('top', $(this).offset().top + 11).fadeIn('slow');
                if ($(this).hasClass('btn-add-address')) {
                    $('.show-address input').val('');
                    $('.show-address .ts-type').show();
                };
            });
            $('.list-pay .bank').click(function() { //选择银行
                $('.show-bank').css('top', $(this).offset().top + 10).fadeIn('slow');
            });
        },
        addressEdit: function() { //地址弹出框编辑
            var objList = $('.list-address');
            var objListLi;
            var objShowbox = $('.show-address');
            var objListLiAdd;
            var objListLiEdit;
            $('.list-address .op-box .edit').live('click', function() { //弹出框抓取资料
                $('.list-address li').removeClass('edit');
                $(this).parents('li').addClass('edit');
                objShowbox.find('.user').val($(this).parents('li').find('.user').text());
                objShowbox.find('.drop-province .value').text($(this).parents('li').find('.province').text());
                objShowbox.find('.drop-city .value').text($(this).parents('li').find('.city').text());
                objShowbox.find('.drop-area .value').text($(this).parents('li').find('.area').text());
                objShowbox.find('.address').val($(this).parents('li').find('.address').text());
                objShowbox.find('.zipcode').val($(this).parents('li').find('.zipcode').text());
                objShowbox.find('.tel').val($(this).parents('li').find('.tel').text());
                kboxingPageFun.inputCheckValue('.show-address input');
            });
            $('.show-address .btn-save').click(function() { //弹出框提交资料
                objListLiEdit = objList.find('li.edit');
                var dataFun = function(obj) {
                    obj.find('.user').text(objShowbox.find('.user').val());
                    obj.find('.province').text(objShowbox.find('.drop-province .value').text());
                    obj.find('.city').text(objShowbox.find('.drop-city .value').text());
                    obj.find('.area').text(objShowbox.find('.drop-area .value').text());
                    obj.find('.address').text(objShowbox.find('.address').val());
                    obj.find('.zipcode').text(objShowbox.find('.zipcode').val());
                    obj.find('.tel').text(objShowbox.find('.tel').val());
                }
                if (objListLiEdit.size() > 0) {
                    dataFun(objListLiEdit);
                    objListLiEdit.removeClass('edit');
                } else {
                    var flag = function() {
                        var _flag = $('.page-my-address').size() > 0 ? true : false;
                        return _flag;
                    }
                    var radioHtml = flag() ? '' : '<i></i>'
                    var opHtml = flag() ? '<a class="default" href="javascript:;">默认地址</a><a class="set-default" href="javascript:;">设为默认地址</a>' : ''
                    objList.append('<li class="add">' + '    <div class="value clearfix">' + radioHtml + '        <div class="address-box"><span class="province">上海</span> <span class="city"></span> <span class="area"></span> <span class="address"></span></div>' + '        <div class="user-box">' + '            (<span class="user"></span> 收)' + '        </div>' + '        <div class="tel-box">' + '            <span class="tel"></span>' + '        </div>' + '        <div class="zipcode-box">' + '            <span class="zipcode"></span>' + '        </div>' + '    </div>' + '    <div class="op-box">' + opHtml + '<a class="edit" href="javascript:;">编辑</a><a class="del" href="javascript:;">删除</a>' + '    </div>' + '</li>');
                    objListLiAdd = objList.find('li.add');
                    dataFun(objListLiAdd);
                    objListLiAdd.removeClass('add');
                };
                objShowbox.fadeOut('slow');
            });
        },
        bankChoose: function() { //选择银行
            var objShowbox = $('.show-bank');
            objShowbox.find('img').click(function() {
                $('.con-bank').find('img.bank').attr({
                    'src': $(this).attr('src'),
                    'alt': $(this).attr('alt')
                });
                objShowbox.fadeOut('fast');
            });
        },
        pageOrderFinish: function() { //order-finish
            $('.show-box .close').click(function() { //showbox关闭
                $(this).parents('.show-box').fadeOut('slow');
            });
            $('.con-pay .bank').click(function() { //选择银行
                $('.show-bank').css('top', $(this).offset().top + 30).fadeIn('slow');
            });
            $('.show-div-payConform .btn-finish').click(function() { //已完成跳转
                $('.choose-box').hide().siblings('.success-box').show();
            });
            $('.show-div-payConform .btn-error').click(function() { //已完成跳转
                $('.choose-box').hide().siblings('.error-box').show();
            });
        },
        pageMyAccount: function() { //my-account
            $('.show-all').each(function() {
                if ($(this).prev('.form-common-list').find('ul li').size() > 5) {
                    $(this).addClass('show');
                    $(this).prev('.form-common-list').find('ul li:gt(4)').hide();
                }
            }).click(function() {
                $(this).removeClass('show').prev('.form-common-list').find('ul li').show();
            });
        },
        pageMyReturn: function() { //my-return
            $('.list-mode .value').click(function() {
                if ($(this).parents('li').index() == 0) {
                    $('.express-box').hide().siblings('.list-address').show();
                } else {
                    $('.list-address').hide().siblings('.express-box').show();
                };
            });
        },
        pageMyAddress: function() { //my-address
            $('.list-address .op-box .set-default').live('click', function() {
                $(this).parents('li').addClass('current').siblings('li').removeClass('current');
            });
        },
        pageMyInformation: function() { //my-infromation
            $('.list-form-relative .op .btn-verc').click(function() { //触发验证
                $('.show-verc').fadeIn('slow');
            });
            $('.show-verc .btn-send').click(function() {
                $(this).parents('.step-1').hide().siblings('.step-2').show();
            });
            $('.show-verc .btn-link').click(function() {
                $('.show-verc').fadeOut('fast');
            });
            $('.list-form-relative .op .btn-edit').click(function() { //触发修改邮箱
                $('.show-edit').fadeIn('slow');
            });
            $('.show-edit .btn-confirm').click(function() {
                $('.show-edit').fadeOut('fast');
            });
            $('.list-form-relative .op .btn-bind').click(function() { //触发绑定
                $('.show-bind').fadeIn('slow');
            });
            $('.show-bind .btn-next').click(function() {
                $(this).parents('.step-1').hide().siblings('.step-2').show();
            });
            $('.show-bind .btn-confirm').click(function() {
                $('.show-bind').fadeOut('fast');
            });
        },
        horizontalScroll: function(obj, colNum, contentWidth, objOuter) { //自适应宽度水平滑动
            var contentWidth;
            var objItemWidth;
            $(obj).find('li').first().addClass('current');
            var imgWidth = function(obj, contentWidth) {
                setTimeout(function() {
                    contentWidth = $.trim(contentWidth) == '' ? $('.content-main').width() : contentWidth;
                    objItemWidth = contentWidth / colNum;
                    $(obj).find('li').stop().animate({
                        'width': objItemWidth
                    });
                }, 100);
            }
            imgWidth(obj, contentWidth);
            kboxingPageFun.horizontalScrollMove(obj, colNum, contentWidth, objOuter);
            $(window).resize(function() {
                imgWidth(obj, contentWidth);
            });
        },
        horizontalScrollMove: function(obj, colNum, contentWidth, objOuter) { //自适应宽度水平滑动前后切换
            $(window).resize(function() {
                $(obj).siblings('.btn-prev').fadeOut('slow').siblings('.btn-next').fadeIn('slow');
                $(obj).stop().animate({
                    'margin-left': '0'
                }, 'slow').find('li').first().addClass('current').siblings('li').removeClass('current');
                moveFun();
            });
            for (var i = 0; i < $(obj).find('li').size() / colNum; i++) {
                $(obj).siblings('.horizontal-scroll-tit').append('<i></i>');
            }
            var moveFun = function() {
                setTimeout(function() {
                    var moveWidth;
                    _contentWidth = $.trim(contentWidth) == '' ? $('.content-main').width() : contentWidth;
                    $(obj).siblings('.btn-op').unbind('click');
                    $(obj).siblings('.btn-op').click(function() {
                        moveWidth = _contentWidth / colNum;
                        var nextFun = function() {
                            if ($(obj).siblings('.btn-prev').css('display') == 'none') {
                                $(obj).siblings('.btn-prev').fadeIn('slow');
                            }
                            if ($(obj).find('li.current').index() < $(obj).find('li').size() - colNum) {
                                $(obj).stop().animate({
                                    'margin-left': '-' + ($(obj).find('li.current').index() + 1) * moveWidth
                                }, 'slow').find('li.current').removeClass('current').next().addClass('current');
                                if ($(obj).find('li.current').index() == $(obj).find('li').size() - colNum) {
                                    $(obj).siblings('.btn-next').fadeOut('slow');
                                };
                            }
                        };
                        var prevFun = function() {
                            if ($(obj).siblings('.btn-next').css('display') == 'none') {
                                $(obj).siblings('.btn-next').fadeIn('slow');
                            }
                            if ($(obj).find('li.current').index() > 0) {
                                $(obj).stop().animate({
                                    'margin-left': '-' + ($(obj).find('li.current').index() - 1) * moveWidth
                                }, 'slow').find('li.current').removeClass('current').prev().addClass('current');
                                if ($(obj).find('li.current').index() == 0) {
                                    $(obj).siblings('.btn-prev').fadeOut('slow');
                                };
                            }
                        };
                        if ($(this).hasClass('btn-next')) {
                            nextFun();
                        } else {
                            prevFun();
                        }
                    });                    
                    $(obj).siblings('.horizontal-scroll-tit').find('i').first().addClass('current');
                    $(obj).siblings('.horizontal-scroll-tit').find('i').click(function() {
                        var _index = $(this).index();
                        _contentWidth = $.trim(_contentWidth) == '' ? $('.content-main').width() : _contentWidth;
                        objOuter = $.trim(objOuter) == '' ? 0 : objOuter;
                        $(obj).stop().animate({
                            'margin-left': '-' + (_contentWidth + colNum * objOuter) * _index
                        }, 'slow');
                        $(this).addClass('current').siblings('i').removeClass('current');
                    });
                }, 500);
            }
            moveFun();
        },
        pageStyle: function() { //style
            var imgCenter = function() {
                $('.horizontal-scroll .img img').css('margin-left', '-' + $('.horizontal-scroll .img img').width() / 2 + 'px');
            }
            imgCenter();
            $(window).resize(function() {
                imgCenter();
            });
        },
        pageWardrobe: function() { //wardrobe
            var renameFun = function() { //重命名
                $('.show-inf .btn-rename').live('click', function() {
                    $(this).addClass('current');
                    setTimeout(function() {
                        kboxingPage.inputCheckValue(".form-input input");
                    }, 100);
                });
                $('.show-div-rename .btn-cancel').live('click', function() { //重命名弹出框取消
                    $('.show-inf .btn-rename.current').removeClass('current');
                    mshow.boxHide();
                });
                $('.show-div-rename .btn-save').live('click', function() { //重命名弹出框保存
                    if ($.trim($(this).parents('.show-con').find('input.name').val()) != '') {
                        var _index = $('.show-inf .btn-rename.current').parents('li').index();
                        $('.show-inf .btn-rename.current').siblings('h4').text($(this).parents('.show-con').find('input.name').val());
                        $('.horizontal-scroll-big li').eq(_index).find('h4').text($(this).parents('.show-con').find('input.name').val());
                        $('.show-inf .btn-rename.current').removeClass('current');
                        mshow.boxHide();
                    };
                });
            }
            renameFun();
            var delFun = function() { //删除
                $('.show-inf .btn-del').live('click', function() {
                    var _index = $(this).parents('li').index();
                    $('.horizontal-scroll li').eq(_index).find('.btn-del').addClass('current');
                    $('.horizontal-scroll-big li').eq(_index).find('.btn-del').addClass('current');
                });
                $('.show-div-del .btn-cancel').live('click', function() {
                    $('.show-inf .btn-del.current').removeClass('current');
                    mshow.boxHide();
                });
                $('.show-div-del .btn-del').live('click', function() {
                    var _index = $('.show-inf .btn-del.current').parents('li').index();
                    $('.show-inf .btn-del.current').parents('li').animate({
                        'width': '0'
                    }, 'slow', function() {
                        $('.show-inf .btn-del.current').parents('li').remove();
                    });
                    $('.horizontal-scroll-big li').eq(_index).animate({
                        'width': '0'
                    }, 'slow', function() {
                        $('.horizontal-scroll-big li').eq(_index).remove();
                    });
                    mshow.boxHide();
                });
            }
            delFun();
            var showBig = function() { //显示大图模块
                var moveWidth;
                var infFormat = function() {
                    $('.horizontal-scroll-big li').each(function(i) {
                        $(this).find('h4').text($('.horizontal-scroll li').eq(i).find('h4').text());
                        $(this).find('.num').text($(this).index() + 1).siblings('.total').text($('.horizontal-scroll-big li').size());
                    });
                }
                infFormat();
                $('.horizontal-scroll .bg').live('click', function() {
                    var _index = $(this).parents('li').index();
                    moveWidth = $('.content-main').width();
                    $('.show-preview').find('.btn-op').fadeOut('slow');
                    $('.show-big .btn-op').show();
                    $('.show-big').fadeIn('slow').find('.horizontal-scroll-big').stop().animate({
                        'margin-left': '-' + _index * moveWidth
                    }, 'slow').find('li').eq(_index).addClass('current').siblings('li').removeClass('current');
                });
                $('.show-div-del .btn-del').live('click', function() {
                    setTimeout(function() {
                        infFormat();
                    }, 1000);
                });
                $('.show-big .close').live('click', function() {
                    $(this).parents('.show-big').fadeOut('slow');
                    $('.show-preview').find('.btn-op').fadeIn('slow');
                });
            }
            showBig();
        },
        pageWardrobeCollocation: function() { //wardrobe_collocation
            var imgShow = function() {  //大图展示
                setTimeout(function() {
                    $('.horizontal-scroll li').stop().animate({
                        'width': $('.content-main').width() - $('.wardrobe-sidebar').outerWidth() + 'px',
                        'height': $('.wardrobe-sidebar').height() + 'px'
                    }, 'slow', function() {
                        $('.horizontal-scroll img').stop().animate({
                            'margin-left': '-' + $('.horizontal-scroll img').width() / 2 + 'px'
                        }, 'slow');
                    });
                }, 500);
            }
            imgShow();
            $(window).resize(function() {
                imgShow();
            });

            var showSaveFun = function() {  //保存搭配弹出框
                $('.show-inf .show-save').live('click', function() {    //激活弹出框后初始化input
                    setTimeout(function() {
                        kboxingPage.inputCheckValue(".form-input input");
                    }, 100);
                });
                $('.show-div-save .btn-list-save').live('click', function() { //保存到列表
                    if ($.trim($(this).siblings('.form-input').find('input.name').val()) != '') {
                        $('.show-div-save .list-series ul').append('<li><span class="name">' + $(this).siblings('.form-input').find('input.name').val() + '</span></li>');
                    };
                    $(this).siblings('.form-input').find('input.name').val('');
                    setTimeout(function() {
                        kboxingPage.inputCheckValue(".form-input input");
                    }, 100);
                });
                $('.show-div-save .op-box .btn-save').live('click', function() {    //保存弹出框信息
                    mshow.boxHide();
                });
            }
            showSaveFun();
        },
        pageStory: function() { //story
            var timelineFun = function() { //时间轴
                var objTimeline = $('.timeline');
                var objTimelineItem = $('.timeline li');
                var objPoint = $('.timeline-box .point');
                var formatFun = function() { //初始化加载位置
                    setTimeout(function() {
                        var contentWidth = $('.content-main').width();
                        objPoint.css('left', contentWidth / 2);
                        var moveWidth = objTimeline.find('.begin').width() - objPoint.position().left + 194;
                        objTimeline.stop().animate({
                            'margin-left': '-' + moveWidth
                        }, 'slow');
                        objTimelineItem.eq(1).addClass('current').siblings('li').removeClass('current');
                    }, 100);
                }
                formatFun();
                var moveFun = function() { //切换位置
                    $('.page-wardrobe .list-wrap .btn-op').live('click', function() {
                        setTimeout(function() {
                            var _index = $('.horizontal-scroll li.current').index();
                            var moveWidth = objTimeline.find('.begin').width() - objPoint.position().left + 194 + objTimelineItem.eq(1).width() * _index;
                            objTimeline.stop().animate({
                                'margin-left': '-' + moveWidth
                            }, 'slow');
                            objTimelineItem.eq(_index + 1).addClass('current').siblings('li').removeClass('current');
                        }, 100);
                    });
                }
                moveFun();
                $(window).resize(function() {
                    formatFun();
                    moveFun();
                });
            }
            timelineFun();
        },
        pageReservation: function() {   //reservation
        }
    }

    return kboxingPageFun;
})(jQuery)