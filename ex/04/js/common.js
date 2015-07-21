$(function() {
    var ADzeroFun = function() {
        /*toggle tab*/
        $(".tab-content").each(function(i) {
            if (!$(this).parent().parent().hasClass("header-tab")) {
                $(".tab-content").eq(i).children("li").first().fadeIn("slow");
                var contentHeight = $(".tab-content").eq(i).children("li").first().css("height");
                $(".tab-content").eq(i).css("height", contentHeight);
            }
        })

        $(".tab-title li").live('click', function() {
            if (!$(this).parent().parent().parent().hasClass("banner")) {
                $(this).parent().parent().parent().addClass("curbox");
                $(this).addClass("current").siblings(".curbox .tab-title li").removeClass("current");
                var _index = $(this).index();
                $(".curbox .tab-content li").eq(_index).fadeIn("slow").siblings(".curbox .tab-content li").fadeOut("slow");
                var contentHeight = $(".curbox .tab-content li").eq(_index).css("height");
                $(".curbox .tab-content").animate({
                    height: contentHeight
                }, 1000)
                $(this).parent().parent().parent().removeClass("curbox");
            }
        })

        /*header-tab*/
        var headerTab = function() {
            var _time;
            var timeoutFun = function() {
                _time = setTimeout(conHide, 200);
            }
            var conHide = function() {
                $(".header-tab .tab-title li").removeClass("current");
                $(".header-tab .tab-content li").hide();
            }

            $(".header-tab .tab-title li").mouseout(function() {
                timeoutFun();
            })

            $(".header-tab .tab-content li").hover(
            function() {
                clearTimeout(_time);
            },
            function() {
                timeoutFun();
            })

            $(".header-tab .tab-title li").mouseover(function() {
                clearTimeout(_time);
                var _index = $(this).index();
                $(this).addClass("current").siblings().removeClass("current");
                $(".header-tab .tab-content li").eq(_index).show().siblings().hide();
            })
        }
        headerTab();

        /*nav*/
        var navTab = function() {
            var _leftFix = 25;  //偏移量
            var navItem = $("#header .header-top .line-nav");
            var navCur = $("#header .header-top li.current");
            if ($("#header .header-nav li").hasClass("current")) {
                navItem.width(navCur.width()).css("left", (parseInt(navCur.position().left) + _leftFix) + "px");
            }

            $("#header .header-nav li").hover(
            function() {
                var _width = $(this).width();
                var _left = (parseInt($(this).position().left) + _leftFix) + "px";
                navItem.stop().animate({ width: _width, left: _left }, 1000);
            },
            function() {
                if ($("#header .header-nav li").hasClass("current")) {
                    navItem.stop().animate({ width: navCur.width(), left: (parseInt(navCur.position().left) + _leftFix) + "px" }, 1000);
                }
                else {
                    navItem.stop().animate({ width: 0, left: 0 }, 1000);
                }
            })
        }
        navTab();

        /*banner*/
        var bannerTab = function() {
            var effTime = 3000;
            var loopTime = 8000;
            var titItem = $(".banner .tab-title li");
            var conItem = $(".banner .tab-content li");
            var titHeight = "114px";
            var num;

            /*页面加载后初始化内容部分第一个元素*/
            $(".banner .tab-content li.current").children().children(".item-img").css("left", "-1000px").animate({ left: 0 }, effTime).siblings(".item-txt").css("left", "-1000px").delay(1500).animate({ left: "20px" }, 2000).animate({ left: 0 }, 300);

            /*自动运行*/
            var autoFun = function() {
                var titCur = $(".banner .tab-title li.current");    //选中的开关
                var conCur = $(".banner .tab-content li.current");  //选中的内容

                if (conItem.last().hasClass("current")) {
                    titItem.first().addClass("temp").siblings().removeClass("temp");
                }
                else {
                    titCur.next().addClass("temp").siblings().removeClass("temp");
                }
                var itemTemp = $(".banner .tab-title li.temp");     //选中开关之后的开关
                var _index = itemTemp.index();

                var animeFun = function(obj) {
                    var obj = obj;
                    obj.children().children(".item-img").css("left", "-1000px").animate({ left: 0 }, effTime).siblings(".item-txt").css("left", "-1000px").delay(1500).animate({ left: "20px" }, 2000).animate({ left: 0 }, 300);
                    /*选中*/
                    $(".banner .tab-title-wrap .line-hover, .banner .tab-title-wrap .line-current").stop().animate({ left: titItem.eq(_index).position().left + "px" }, 1000);
                }

                /*进入*/
                if (conItem.last().hasClass("current")) {
                    conItem.last().removeClass("current").siblings().first().addClass("current");
                    titItem.last().removeClass("current").siblings().first().addClass("current");
                    animeFun(conItem.last().siblings().first().addClass("current"));
                }
                else {
                    conCur.removeClass("current").next().addClass("current");
                    titCur.last().removeClass("current").next().addClass("current");
                    animeFun(conCur.next());
                }
                /*移除*/
                conCur.children().children(".item-img").animate({ left: "2000px" }, effTime).siblings(".item-txt").animate({ left: "2000px" }, effTime);
            }
            if (titItem.parent().parent().parent().hasClass("banner")) { //判断是否是首页banner
                var intervalObj = setInterval(autoFun, loopTime);
            }

            titItem.hover(
            function() {
                clearInterval(intervalObj);
                $(this).children().children().stop().animate({ top: 0 }, 500);
                $(".banner .tab-title-wrap .line-hover").stop().animate({ left: $(this).position().left + "px" }, 1000);
            },
            function() {
                $(this).children().children().stop().animate({ top: titHeight }, 500);
                $(".banner .tab-title-wrap .line-hover").stop().animate({ left: $(".banner .tab-title li.current").position().left + "px" }, 1000);
                intervalObj = setInterval(autoFun, loopTime);
            })

            titItem.click(function() {
                if (!conItem.children().children().is(":animated")) {
                    var titCur = $(".banner .tab-title li.current");
                    var conCur = $(".banner .tab-content li.current");

                    $(this).addClass("current").siblings().removeClass("current");
                    var _index = $(this).index();

                    /*图片*/
                    if (conCur.index() != _index) {
                        /*移除*/
                        conCur.removeClass("current").children().children(".item-img").animate({ left: "2000px" }, effTime).siblings(".item-txt").animate({ left: "2000px" }, effTime);
                        /*进入*/
                        conItem.eq(_index).addClass("current").children().children(".item-img").css("left", "-1000px").animate({ left: 0 }, effTime).siblings(".item-txt").css("left", "-1000px").delay(1500).animate({ left: "20px" }, 2000).animate({ left: 0 }, 300);
                    }

                    /*选中*/
                    $(".banner .tab-title-wrap .line-current").stop().animate({ left: $(this).position().left + "px" }, 1000);
                    $(".banner .tab-title-wrap .line-hover").stop().animate({ left: titItem.eq(_index).position().left + "px" }, 1000);
                }
            })
        }
        bannerTab();

        /*accessories*/
        var accessoriesFun = function() {
            $(".list-accessories li").hover(
            function() {
                $(this).children().children().children(".txt-sm").stop().animate({ opacity: 0.8 }, 500);
            },
            function() {
                $(this).children().children().children(".txt-sm").stop().animate({ opacity: 0 }, 500);
            })
            /*触发*/
            $(".list-accessories li").click(function() {
                if (!$(this).hasClass("view-box")) {
                    if (!$(this).hasClass("current")) {
                        /*数据插入*/
                        $(".list-accessories li.view-box").html($(this).children(".view-con").html());
                        $(this).nextAll("li.view-box").eq(0).siblings("li.view-box").slideUp("slow");
                        $(this).nextAll("li.view-box").eq(0).delay(500).slideDown("slow").children().children(".jt-top").css("left", parseInt($(this).position().left) + "px");
                    }
                    $(this).addClass("current").siblings().removeClass("current");
                }
            })
            /*关闭*/
            $(".list-accessories .view-close").live('click', function() {
                $(".list-accessories").children().removeClass("current");
                $(".list-accessories li.view-box").slideUp("slow");
            })
        }
        accessoriesFun();

        /*模拟下拉*/
        /*触发*/
        $(".mn-select input, .mn-select .select-jt").click(function() {
            $(this).siblings(".show-select").fadeIn("normal");
        })
        /*选择*/
        $(".show-select dd").click(function() {
            $(this).parent().siblings("input").attr({ "value": $.trim($(this).text()), "cid": $("this").attr("cid") });
            $(this).parent().hide();
        })

        /*释放弹出*/
        var showHide = function() {
            var flag = false;
            $(".show-select").hover(function() { flag = true }, function() { flag = false })
            $(document).mousedown(function(e) {
                e = window.e || e;
                var target = e.target || e.srcElement;
                if (!flag && target != $(".show-select")) { $(".show-select").hide(); }
            })
        }
        showHide();

        /*模拟单选框*/
        $(".op-check").click(function() {
            if ($(this).hasClass("check-true")) {
                $(this).addClass("check-false").removeClass("check-true");
            }
            else {
                $(this).addClass("check-true").removeClass("check-false");
            }
        })

        /*shipping checkbox*/
        $(".shipping-box .op-check").click(function() {
            if ($(".op-check").hasClass("check-true")) {
                $(this).siblings(".shipping-con").slideDown("slow");
            }
            else {
                $(this).siblings(".shipping-con").slideUp("slow");
            }
        })

        /*验证提示*/
        var vercFun = function() {
            var _id;

            $(".input-check").click(function() {
                $(this).select();
            })
            $(".input-check").blur(function() {
                _id = $(this).attr("id");
                if ($(this).parent().parent().parent().hasClass("form-password")) {
                    $(this).hide().siblings(".ts").hide().siblings(".check-error").show().siblings("p").css("color", "#CFCFCF");
                }
                else if ($(this).parent().hasClass("mn-select")) {
                    //$(this).parent().parent().children(".mn-select").hide().parents(".value").find(".check-error").show();
                }
                else {
                    $(this).hide().parents(".value").find(".check-error").show();
                }
            })
            $(".check-error").mouseover(function() {
                if ($(this).parent().parent().parent().hasClass("form-password")) {
                    $(this).hide().siblings("p").show().siblings("input").show();
                }
                else {
                    $(this).hide().parents(".value").find(".input-check, .mn-select").show();
                }
                window.setTimeout(function() { jQuery("#" + _id + "").focus(); }, 0);
                _id = null;
            })
            /*type:background-txt*/
            $(".login-order-main .form-password input").click(function() {
                $(this).siblings("p").css("color", "#F2F2F2");
            })
        }
        vercFun();

        /*cart 商品数量+-*/
        $(".cart-box .order-list .op a").click(function() {
            var count = parseInt($(this).siblings("input").attr("value"));

            if ($(this).hasClass("btn-add")) {
                $(this).siblings("input").attr("value", count + 1);
            }
            else {
                if (count > 1) {
                    $(this).siblings("input").attr("value", count - 1);
                }
            }
        })

        /*登录*/
        var loginFun = function() {
            $(".login-form .form-main .form-input .pos-box input").click(function() {
                $(this).siblings("p").fadeOut("normal");
                $(".login-form .inf-error").stop().animate({ height: 0 }, 1000);
            })

            $(".login-form .form-main .form-input .pos-box input").blur(function() {
                if ($.trim($(this).attr("value")) == "") {
                    $(this).siblings("p").fadeIn("normal");
                }
            })
            /*提交*/
            $(".login-form .form-main .op-box .btn-sign").click(function() {
                var username = $.trim($("#username").val());
                var password = $.trim($("#password").val());
                var code = $.trim($("#Text1").val());

                if (username == "" || password == "") {
                    $(".login-form .inf-error").html(incorrect_user_name_or_password).stop().animate({ height: "40px" }, 1000);
                }
                else if (code == "") {
                    $(".login-form .inf-error").html(please_enter_verification_code).stop().animate({ height: "40px" }, 1000);
                }
                else {
                    $.ajax({
                        type: 'POST',
                        url: 'member.php',
                        data: { 'action': 'login', 'username': username, 'password': password, 'code': code, 'redirect': $.trim($("#redirect").val()), 'dataType': 'JSON' },
                        dataType: 'JSON',
                        cache: false,
                        success: function(result) {
                            if (result.error != 0) {
                                $(".login-form .inf-error").html(result.message).stop().animate({ height: "40px" }, 1000);
                            } else {
                                location.href = result.redirect ? result.redirect : './';
                            }
                        },
                        error: function(result) {
                            //alert('error: '+result);
                            $(".login-form .inf-error").html(access_failure).stop().animate({ height: "40px" }, 1000);
                        }
                    });
                }
            })
        }
        loginFun();

        /*order*/
        var orderFun = function() {
            var _height = 90;
            $(".login-order-main .inf-order .op a.btn-track").click(function() {
                $(".login-order-main .show-track").slideDown("slow");
            })
            $(".login-order-main .show-track .btn-close").click(function() {
                $(".login-order-main .show-track").slideUp("slow");
            })
        }
        orderFun();

        /*payment*/
        var paymentFun = function() {
            $(".payment-fun .list-payment li").click(function() {
                if ($(this).hasClass("current")) {
                    $(this).removeClass("current");
                }
                else {
                    $(this).addClass("current").siblings().removeClass("current");
                }
            })
        }
        paymentFun();
    }
    ADzeroFun();
})