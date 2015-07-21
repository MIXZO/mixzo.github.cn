var lascna = (function($) {
    $("a").live('mousedown', function() { return false; });
    var lascnaFun = {
        tabFade: function(obj) {    //元素hover淡入淡出
            var obj = $(obj);
            obj.first().addClass("current").parents(".tab-fade-effect").find(".tab-content li").first().addClass("current").fadeIn("slow");
            obj.mouseover(function() {
                var _index = $(this).index();
                $(this).addClass("current").siblings().removeClass("current").parents(".tab-fade-effect").find(".tab-content li").eq(_index).addClass("current").fadeIn("slow").siblings().removeClass("current").fadeOut("slow");
            });
        },
        clickTabFade: function(obj) {   //元素前后切换淡入淡出
            var obj = $(obj);
            obj.click(function() {
                var _wrap = $(this).parents(".tab-fade-effect");
                if ($(this).hasClass("btn-next")) { //201307241239
                    if (_wrap.find(".tab-content li").last().hasClass("current")) {
                        _wrap.find(".tab-content li.current").fadeOut("slow").removeClass("current");
                        _wrap.find(".tab-content li").first().fadeIn("slow").addClass("current");
                        _wrap.find(".tab-title i.current").removeClass("current");
                        _wrap.find(".tab-title i").first().addClass("current");
                    }
                    else {
                        _wrap.find(".tab-content li.current").fadeOut("slow").removeClass("current").next().fadeIn("slow").addClass("current");
                        _wrap.find(".tab-title i.current").removeClass("current").next().addClass("current");
                    }
                }
                else {
                    if (_wrap.find(".tab-content li").first().hasClass("current")) {
                        _wrap.find(".tab-content li.current").fadeOut("slow").removeClass("current");
                        _wrap.find(".tab-content li").last().fadeIn("slow").addClass("current");
                        _wrap.find(".tab-title i.current").removeClass("current");
                        _wrap.find(".tab-title i").last().addClass("current");
                    }
                    else {
                        _wrap.find(".tab-content li.current").fadeOut("slow").removeClass("current").prev().fadeIn("slow").addClass("current");
                        _wrap.find(".tab-title i.current").removeClass("current").prev().addClass("current");
                    }
                }
            });
        },
        autoFade: function(obj) {   //元素自动切换淡入淡出
            var obj = $(obj);
            var time;
            var autoFun = function(obj) {
                if (obj.find(".tab-content li").last().hasClass("current")) {
                    obj.find(".tab-content li.current").fadeOut("slow").removeClass("current");
                    obj.find(".tab-content li").first().fadeIn("slow").addClass("current");
                    obj.find(".tab-title i.current").removeClass("current");
                    obj.find(".tab-title i").first().addClass("current");
                }
                else {
                    obj.find(".tab-content li.current").fadeOut("slow").removeClass("current").next().fadeIn("slow").addClass("current");
                    obj.find(".tab-title i.current").removeClass("current").next().addClass("current");
                }
            }
            time = window.setInterval(function() { autoFun(obj); }, 5000);
            //hover中断
            obj.find("img").hover(
            function() {
                clearInterval(time);
            },
            function() {
                time = window.setInterval(function() { autoFun(obj); }, 5000);
            });
        },
        tabChange: function(obj) {  //TAB自适应高度切换
            var obj = $(obj);
            
            var autoLoadFun = function(obj){
                obj.find(".tab-title").children("li").first().addClass("current");
                obj.find(".tab-content").children("li").first().fadeIn("slow");
                var contentHeight = obj.find(".tab-content").children("li").first().css("height");
                obj.find(".tab-content").css("height", contentHeight);
            }
            window.setTimeout(function() { autoLoadFun(obj); }, 1000);            

            obj.find(".tab-title li").click(function() {
                if (!obj.find(".tab-content").is(":animated")) {
                    obj.addClass("curbox");
                    $(this).addClass("current").siblings(".curbox .tab-title li").removeClass("current");
                    var _index = $(this).index();
                    $(".curbox .tab-content li").eq(_index).fadeIn("slow").siblings(".curbox .tab-content li").fadeOut("slow");
                    var contentHeight = $(".curbox .tab-content li").eq(_index).css("height");
                    $(".curbox .tab-content").animate({
                        height: contentHeight
                    }, 1000)
                    obj.removeClass("curbox");
                }
            })
        },
        searchWidth: function() {   //搜索框伸缩
            var obj = $("header nav .search-box input");
            obj.focus(function() {
                $(this).animate({ width: "150px" }, 1000);
            });
            obj.blur(function() {
                $(this).animate({ width: "80px" }, 1000);
            });
        },
        objMouseOver: function(obj) {   //元素添加mouseover事件
            var obj = $(obj);
            obj.live('mouseover', function() {
                $(this).addClass("over");
            });
        },
        objHover: function(obj) {   //元素添加hover事件
            var obj = $(obj);
            obj.live('mouseenter', function() {
                $(this).addClass("hover");
            }).live('mouseleave', function() {
                $(this).removeClass("hover");
            });
        },
        objHide: function(obj, callback) {  //鼠标点击空白区域元素消失
            var flag = false;
            var obj = $(obj);
            obj.live('mouseover', function() { flag = true }).live('mouseout', function() { flag = false });
            $(document).mousedown(function(e) {
                e = window.e || e;
                var target = e.target || e.srcElement;
                if (!flag && target != obj) { callback(); }
            });
        },
        objCurrent: function(obj) { //元素添加current属性
            var obj = $(obj);
            obj.live('click', function() {
                $(this).addClass("current").siblings().removeClass("current");
            });
        },
        objFirstCurrent: function(obj) {    //队列第一个元素添加current
            var obj = $(obj);
            obj.first().addClass("current");
        },
        objOnceCurrent: function(obj, newName) {    //点击元素只执行一次添加current属性
            var obj = $(obj);
            obj.live('click', function() {
                if (!$(this).hasClass("current")) {
                    $(this).addClass("current");
                }
                if (newName != "") {
                    $(this).find(".txt").text(newName);
                }
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
                }
                else {
                    $(this).addClass("current");
                    if ($.trim(newName) != "") {
                        $(this).html($.trim(newName));
                    }
                }
            });
        },
        objCurrentAll: function(btn, selector) {
            var btn = $(btn);
            btn.live('click', function() { $(selector).addClass("current"); });
        },
        categoryClick: function() {  //category元素点击状态
            $(".category-list li").mousedown(function() {
                if (!$(".category-list .inf .cart").hasClass("hover")) {
                    $(this).addClass("click");
                }
            }).mouseup(function() {
                $(this).removeClass("click");
            });
        },
        menuFixed: function() { //产品列表页筛选菜单浮动效果
            var obj = $("menu.filter-box .filter-wrap");
            var objTop = obj.offset().top;
            $(window).bind('scroll resize', function() {
                if ($(window).scrollTop() > objTop) {
                    obj.addClass("fixed");
                }
                else {
                    obj.removeClass("fixed");
                }
            });
        },
        dropDownScroll: function(obj, height) {
            var obj = $(obj);
            if ($.trim(height) == "") { height = 200; }
            obj.live('mouseenter', function() {
                if ($(this).find(".dd-show dl").height() > height) {
                    $(this).find(".dd-show").css({ "height": height + "px" });
                }
                else {
                    $(this).find(".dd-show").css({ "height": "auto" });
                }
            });
        },
        dropDownValue: function(obj) {  //模拟下拉返回选中值
            var obj = $(obj);
            obj.live('click', function() {
                $(this).parents(".dd-show").siblings(".value").text($(this).text()).parents(".hover").removeClass("hover");
            });
        },
        rqzhScroll: function(width, count, parent) {    //队列横向滑动效果
            var _parent = parent;
            _parent.find(".tab-content li").first().addClass("current");
            _parent.find(".btn-op").click(function() {
                var _width = width;
                var _index = _parent.find(".tab-content li.current").index();
                if ($(this).hasClass("btn-next")) {
                    if (_parent.find(".tab-content li").length - _index > count) {
                        _parent.find(".tab-content li.current").removeClass("current").next().addClass("current");
                        _parent.find(".tab-content").animate({ "margin-left": "-" + _width * (_index + 1) + "px" }, 1000);
                    }
                }
                else {
                    if (_index > 0) {
                        _parent.find(".tab-content li.current").removeClass("current").prev().addClass("current");
                        _parent.find(".tab-content").animate({ "margin-left": "-" + _width * (_index - 1) + "px" }, 1000);
                    }
                }
            });
        },
        cartCalc: function(obj) {   //数量+- 201308021410
            var obj = $(obj);
            obj.live('click', function() {
                if ($(this).hasClass("add")) {
                    $(this).siblings("input").val(parseInt($(this).siblings("input").val()) + 1);
                }
                else {
                    if ($(this).siblings("input").val() > 1) {
                        $(this).siblings("input").val(parseInt($(this).siblings("input").val()) - 1);
                    }
                }
            });
        },
        inputFocus: function(obj, parent) { //文本框获得焦点状态
            var obj = $(obj);
            obj.live('focus', function() {
                $(this).parents(parent).addClass("focus");
                $(this).parents(parent).find(".ts-type, .ts-error").fadeOut("slow");
            });
        },
        inputBlur: function(obj, parent) {  //文本框失去焦点状态
            var obj = $(obj);
            obj.live('blur', function() {
                $(this).parents(parent).removeClass("focus");
                if ($(this).val() == "") {
                    $(this).parents(parent).find(".ts-type").fadeIn("slow");
                }
            });
        },
        inputCheckValue: function(obj) {    //页面刷新后监测文本框有无内容，如果有隐藏提示消息
            var obj = $(obj);
            obj.each(function() {
                if ($.trim($(this).val()) != "") {
                    $(this).siblings(".ts-type, .ts-error").fadeOut("slow");
                }
            })
        },
        scoreView: function(obj) {  //星级评分显示
            var obj = $(obj);
            obj.each(function() {
                $(this).children("i:lt(" + $(this).attr("score") + ")").addClass("current");
            });
        },
        scoreChange: function(obj) {  //星级评分操作
            $(obj).children("i").click(function() {
                var _parent = $(this).parent();
                var index = $(this).index();
                _parent.attr("score", 0).children("i").removeClass('current');
                _parent.attr("score", index + 1).children("i:lt(" + (index + 1) + ")").addClass('current');
            });
        },
        favoritesMove: function() { //加入收藏投射效果
            var img = $(".img-normal");
            var posX = img.parent().offset().left;
            var posY = img.parent().offset().top;
            var target = $("header section .cart");
            var targetX = target.offset().left + 50;
            var targetY = target.offset().top;
            var obj = $(".product-detail-page .op-box .btn-cart");
            obj.click(function() {
                if (!$(".img-normal.temp").is(":animated")) {
                    img.clone().prependTo("body").addClass("temp").css({ "position": "absolute", "top": posY, "left": posX, "z-index": "99999" }).animate({ top: targetY, left: targetX, opacity: "0", width: "0", height: "0" }, 1000, function() { $(".img-normal.temp").remove(); });
                }
            });
        },
        radioFun: function(obj) {
            $(obj).live('click', function() {
                $(obj + "[group=" + $(this).attr("group") + "]").removeClass("current");
                $(this).addClass("current");
            });
        },
        categoryCat: function() {
            $(".show-div-cart .op-box .btn-cart").click(function() {
                if ($.trim($(this).data("disabled")) == 'true') {
                    return;
                }
                $(this).data("disabled", true);
                setTimeout($.proxy(function() {
                    $(this).data("disabled", false);
                }, this), 2000);
                $(".show-div-cart .op-box .ts").stop().css({ "top": "-15px", "opacity": "0" }).animate({ "top": "-42px", "opacity": "1" }, 1000).delay(1000).animate({ "opacity": "0" }, 1000);

            });
        },
        delObjSlide: function(obj, parent) {
            var obj = $(obj);
            obj.click(function() {
                $(this).parents(parent).animate({ "height": "0" }, 1000, $.proxy(function() { $(this).parents(parent).remove(); }, this));
            })
        },
        passwordforget: function() {   //忘记密码
            $(".page-password .list-form .op-box a.btn-send").parents(".con-box").hide().siblings(".finish-box").show();
        },
        //order1价格满XX赠送礼品
        priceGift: function(total) {
            var totalPrice;
            //计算价格
            var calcPric = function() {
                totalPrice = 0;
                $(".order-page .list-order-con").each(function(i) {
                    totalPrice += parseFloat($(this).find(".price em").text()) * $(this).find(".num-op input").val();
                    //剩余消费
                    $(".order-page .account-box .continue .ad-gift .ts span").text(total - totalPrice < 0 ? 0 : (total - totalPrice).toFixed(2));
                });
            }
            //礼品显示
            var giftShow = function() {
                $(".order-page .list-order-gift").slideDown("slow");
                $(".order-page .account-box .continue .ad-gift").slideUp("slow");
            }
            //礼品消失
            var giftHide = function() {
                $(".order-page .list-order-gift").slideUp("slow");
                $(".order-page .account-box .continue .ad-gift").slideDown("slow");
            }
            calcPric();
            if (totalPrice >= total) {
                giftShow();
            }
            //修改数量重新计算
            $(".list-order-con .num-op a, .list-order-con .op .btn-del").live('click', function() {
                setTimeout(function() {
                    calcPric();
                    if (totalPrice >= total) {
                        giftShow();
                    }
                    else {
                        giftHide();
                    }
                }, 1010);
            });
        },
        listDtFun: function() {   //邮政编码下拉
            //显示消失
            $(".form-dt").live('mouseenter', function() {
                $(this).find(".list-dt-wrap").show().parent(".pos-box").css("z-index", "99");
            }).live('mouseleave', function() {
                $(this).find(".list-dt-wrap").hide().parent(".pos-box").css("z-index", "0");
            });
            //提交选择
            $(".form-input .list-dt dd a").live('click', function() {
                $(this).parents(".form-dt").find("input").attr("value", $(this).text());
                $(this).parents(".list-dt-wrap").hide().siblings(".ts-type").fadeOut("slow"); ;
            });
        }
    }
    lascnaFun.tabFade(".tab-banner-title i");
    lascnaFun.autoFade(".banner");
    lascnaFun.searchWidth();
    lascnaFun.objHover("header nav li, header section .cart");
    lascnaFun.delObjSlide("header section .cart .list-cart .close", "li");

    //nav fix
    var navFix = function() {
        //左右高度统一
        $("header nav li.drop-item").mouseenter(function() {
            var _this = $(this);
            if ($(this).attr("range") != "1") {
                var boxFix = function(obj) {
                    var dl = obj.find(".nav-show").find(".link-list");
                    var dlCount = dl.length;
                    var _width = 132;
                    obj.find(".nav-show").find(".link-list-con").width(dlCount * _width);
                    var _height = obj.find(".nav-show").find(".link-list-con").height() + 25;
                    //$("header nav li.hover .nav-show .recommend-wrap, header nav li.hover .recommend-wrap .pos-box, header nav li.hover .recommend-wrap .pos-box p.bg").height(_height);
                    obj.find(".nav-show").find(".recommend-wrap").height(_height);
                    obj.find(".recommend-wrap").find(".pos-box").height(_height);
                    obj.find(".recommend-wrap").find(".pos-box").find("p.bg").height(_height);
                    dl.height(_height - 79);
                    obj.find(".nav-show-1").css("opacity", "1");
                    obj.attr("range", "1");
                }
                window.setTimeout(function() { boxFix(_this) }, 1);
            }
        });
    }
    navFix();

    //公告
    var announcementFun = function() {
        if ($("#announcement").length > 0) {
            $("#announcement a.close").click(function() {
                $("#announcement").stop().slideUp(2000);
            });
            $("#announcement").delay(1000).slideDown(2000); //自动开启
            $("#announcement").delay(5000).slideUp(2000);   //自动关闭
        }
    }
    announcementFun();

    //购物袋下拉
    var cartCheckFun = function() {
        var checkFun = function() {
            if ($("header section .cart .list-cart li").length < 1) {
                $("header section .cart .cart-true").hide().siblings(".cart-false").show();
            }
        }
        checkFun();
        $("header section .cart .list-cart .close").click(function() {
            setTimeout(checkFun, 1100);
        })
    }
    cartCheckFun();

    //BANNER        
    var banner = function() { }

    //HOT模块需要完整尺寸的图片完成后优化
    //HOT
    /*banner*/
    var hotTab = function() {
        var effTime = 3000;
        var loopTime = 8000;
        var conItem = $(".hot .tab-content li");
        var num;

        //FORMAT FIRST ELEMENT
        $(".hot .tab-content a.item").css("left","2000");
        $(".hot .tab-content li").first().addClass("current").children().children(".item-1").css("left", "-2000px").animate({ left: 0 }, effTime)
                                                                        .siblings(".item-4").css("left", "-2000px").delay(1000).animate({ left: "1200px" }, 2000).animate({ left: "1180px" }, 300)
                                                                        .siblings(".item-3").css("left", "-2000px").delay(1500).animate({ left: "860px" }, 2000).animate({ left: "840px" }, 300)
                                                                        .siblings(".item-2").css("left", "-2000px").delay(2000).animate({ left: "510px" }, 2000).animate({ left: "490px" }, 300);

        //PREV
        var prevFun = function() {
            if ($(".hot .tab-content li").first().hasClass("current")) {
                $(".hot .tab-content li.current").children().children(".item-2").animate({ left: "-2000px" }, 2000)
                                                            .siblings(".item-3").delay(500).animate({ left: "-2000px" }, 2000)
                                                            .siblings(".item-4").delay(1000).animate({ left: "-2000px" }, 2000)
                                                            .siblings(".item-1").delay(1500).animate({ left: "-2000px" }, effTime);
                $(".hot .tab-content li").first().removeClass("current");
                $(".hot .tab-content li").last().addClass("current").children().children(".item-1").css("left", "2000px").delay(1500).animate({ left: 0 }, effTime)
                                                                               .siblings(".item-2").css("left", "2000px").delay(3000).animate({ left: "470px" }, 2000).animate({ left: "490px" }, 300)
                                                                               .siblings(".item-3").css("left", "2000px").delay(3500).animate({ left: "820px" }, 2000).animate({ left: "840px" }, 300)
                                                                               .siblings(".item-4").css("left", "2000px").delay(4000).animate({ left: "1160px" }, 2000).animate({ left: "1180px" }, 300);
            }
            else {
                $(".hot .tab-content li.current").children().children(".item-2").animate({ left: "-2000px" }, 2000)
                                                            .siblings(".item-3").delay(500).animate({ left: "-2000px" }, 2000)
                                                            .siblings(".item-4").delay(1000).animate({ left: "-2000px" }, 2000)
                                                            .siblings(".item-1").delay(1500).animate({ left: "-2000px" }, effTime);
                $(".hot .tab-content li.current").removeClass("current").prev().addClass("current").children().children(".item-1").css("left", "2000px").delay(1500).animate({ left: 0 }, effTime)
                                                                               .siblings(".item-2").css("left", "2000px").delay(3000).animate({ left: "470px" }, 2000).animate({ left: "490px" }, 300)
                                                                               .siblings(".item-3").css("left", "2000px").delay(3500).animate({ left: "820px" }, 2000).animate({ left: "840px" }, 300)
                                                                               .siblings(".item-4").css("left", "2000px").delay(4000).animate({ left: "1160px" }, 2000).animate({ left: "1180px" }, 300);
            }
        }
        //NEXT
        var nextFun = function() {
            if ($(".hot .tab-content li").last().hasClass("current")) {
                $(".hot .tab-content li.current").children().children(".item-4").animate({ left: "2000px" }, 2000)
                                                            .siblings(".item-3").delay(500).animate({ left: "2000px" }, 2000)
                                                            .siblings(".item-2").delay(1000).animate({ left: "2000px" }, 2000)
                                                            .siblings(".item-1").delay(1500).animate({ left: "2000px" }, effTime);
                $(".hot .tab-content li").last().removeClass("current");
                $(".hot .tab-content li").first().addClass("current").children().children(".item-1").css("left", "-2000px").delay(1500).animate({ left: 0 }, effTime)
                                                                               .siblings(".item-4").css("left", "-2000px").delay(3000).animate({ left: "1200px" }, 2000).animate({ left: "1180px" }, 300)
                                                                               .siblings(".item-3").css("left", "-2000px").delay(3500).animate({ left: "860px" }, 2000).animate({ left: "840px" }, 300)
                                                                               .siblings(".item-2").css("left", "-2000px").delay(4000).animate({ left: "510px" }, 2000).animate({ left: "490px" }, 300);
            }
            else {
                $(".hot .tab-content li.current").children().children(".item-4").animate({ left: "2000px" }, 2000)
                                                            .siblings(".item-3").delay(500).animate({ left: "2000px" }, 2000)
                                                            .siblings(".item-2").delay(1000).animate({ left: "2000px" }, 2000)
                                                            .siblings(".item-1").delay(1500).animate({ left: "2000px" }, effTime);
                $(".hot .tab-content li.current").removeClass("current").next().addClass("current").children().children(".item-1").css("left", "-2000px").delay(1500).animate({ left: 0 }, effTime)
                                                                                                              .siblings(".item-4").css("left", "-2000px").delay(3000).animate({ left: "1200px" }, 2000).animate({ left: "1180px" }, 300)
                                                                                                              .siblings(".item-3").css("left", "-2000px").delay(3500).animate({ left: "860px" }, 2000).animate({ left: "840px" }, 300)
                                                                                                              .siblings(".item-2").css("left", "-2000px").delay(4000).animate({ left: "510px" }, 2000).animate({ left: "490px" }, 300);
            }
        }
        //CLICK
        $(".rmsp-box a.op-btn").click(function() {
            if (!$(".hot .tab-content .item").is(":animated")) {
                if ($(this).hasClass("prev")) {
                    prevFun();
                }
                else {
                    nextFun();
                }
            }
        });
    }
    hotTab();

    return lascnaFun;
})(jQuery)

/*浏览器高度宽度监测*/
function findDimensions() {
    var winWidth = 0;
    var winHeight = 0;
    if (window.innerWidth) {
        winWidth = window.innerWidth;
    }
    else if ((document.body) && (document.body.clientWidth)) {
        winWidth = document.body.clientWidth;
    }
    if (window.innerHeight) {
        winHeight = window.innerHeight;
    }
    else if ((document.body) && (document.body.clientHeight)) {
        winHeight = document.body.clientHeight;
    }
    if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth) {
        winHeight = document.documentElement.clientHeight;
        winWidth = document.documentElement.clientWidth;
    }
    return winWidth + "-" + winHeight;
}

// 201307241239 201308021410