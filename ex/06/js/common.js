$(function() {
    /*浏览器高度宽度监测*/
    var findDimensions = function() {
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

    /*初始化*/
    var formatFun = function() {
        var minWidth = 1000;
        var minHeight = 650;
        var _wh = findDimensions().split("-");

        /*width*/
        if (_wh[0] > minWidth) {
            /*container*/
            $("#wrap").css("width", _wh[0] + "px");
            /*content-bottom*/
            $(".content-bottom").width((_wh[0] - 294) + "px");
            /*bottom scroll*/
            $(".content-bottom .list-link-wrap").width((_wh[0] - 892) + "px");
            /*footer*/
            $("#footer").width(_wh[0] + "px");
            /*content-bg*/
            $(".content-bg").width((_wh[0] - 294) + "px");
        }
        else {
            /*container*/
            $("#wrap").width(minWidth + "px");
            /*content-bottom*/
            $(".content-bottom").width((minWidth - 294) + "px");
            /*bottom scroll*/
            $(".content-bottom .list-link-wrap").width((minWidth - 892) + "px");
            /*footer*/
            $("#footer").width(minWidth + "px");
            /*content-bg*/
            $(".content-bg").width((minWidth - 294) + "px");
        }
        /*height*/
        if (_wh[1] > minHeight) {
            /*container*/
            $("#wrap").css("height", _wh[1] + "px");
            /*content-left*/
            $(".content-left").height((_wh[1] - 166) + "px");
            /*side*/
            $(".sidebar .tab-content").height((_wh[1] - 600) + "px");
            /*content-bg*/
            $(".content-bg").height((_wh[1] - 173) + "px");
        }
        else {
            /*container*/
            $("#wrap").height(minHeight + "px");
            /*content-left*/
            $(".content-left").height((minHeight - 166) + "px");
            /*side*/
            $(".sidebar .tab-content").height((minHeight - 600) + "px");
            /*content-bg*/
            $(".content-bg").height((minHeight - 173) + "px");
        }
        /*content-bottom*/
        $(".content-bottom b").width($(".content-bottom").width());
    }
    formatFun();

    $(window).load(function() {
        $(window).scrollTop($(window).scrollTop() + 1);
        $(window).scrollTop($(window).scrollTop() - 1);
        $(".content-bottom").animate({ bottom: "7px" }, 1000);
    })

    /*scroll*/
    $(window).one('scroll', function() {
        formatFun();
    })

    /*bg*/
    var bgSize = function() {
        var parentElement = "";
        var optionsArr = {
            selector: "img",
            fillOnResize: true,
            defaultCss: true
        };

        $.fn.fullscreenBackground = function(options) {
            if (options) {
                $.extend(optionsArr, options);
            }

            this.each(function() {
                parentElement = this;

                if (optionsArr.defaultCss == true) {
                    $(parentElement).css({
                        height: $(".content-bg").height(),
                        width: $(".content-bg").width()
                    });
                }

                if (optionsArr.fillOnResize == true) {
                    $(window).resize(function() {
                        fillBg(optionsArr.selector, parentElement);
                    });
                }

                fillBg(optionsArr.selector, parentElement);
            });
        };

        function fillBg(selector, parentobj) {
            var windowHeight = $(".content-bg").height();
            var windowWidth = $(".content-bg").width();

            $(selector, parentobj).each(function() {
                var imgHeight = $(this).attr("height");
                var imgWidth = $(this).attr("width");

                var newWidth = windowWidth;
                var newHeight = (windowWidth / imgWidth) * imgHeight;
                var topMargin = ((newHeight - windowHeight) / 2) * -1;
                var leftMargin = 0;

                if (newHeight < windowHeight) {
                    var newWidth = (windowHeight / imgHeight) * imgWidth;
                    var newHeight = windowHeight;
                    var topMargin = 0;
                    var leftMargin = ((newWidth - windowWidth) / 2) * -1;
                }

                $(this).css({
                    height: newHeight + "px",
                    width: newWidth + "px"
                });
            });
        }
    }
    bgSize();
    $("#backgroundImage").fullscreenBackground();

    /*bg fade*/
    var bgFade = function() {
        var objContainer = $(".content-bg");
        var effectTime = 1500;

        /*format*/
        objContainer.children("img").first().addClass("current").fadeIn(effectTime);

        /*切换*/
        var autoChange = function() {
            if (objContainer.children("img").last().hasClass("current")) {
                objContainer.children("img[class=current]").removeClass("current").fadeOut(effectTime).siblings("img").first().addClass("current").fadeIn(effectTime);
            }
            else {
                objContainer.children("img[class=current]").removeClass("current").fadeOut(effectTime).next().addClass("current").fadeIn(effectTime);
            }
        }
        var t = setInterval(autoChange, effectTime * 5);
    }
    bgFade();

    /*resize*/
    $(window).resize(function() {
        formatFun();
        $("#backgroundImage").fullscreenBackground();
    })

    /*tab*/
    $(".tab-content").each(function(i) {
        $(".tab-content").eq(i).children("li").first().fadeIn("slow");
        var contentHeight = $(".tab-content").eq(i).children("li").first().css("height");
        $(".tab-content").eq(i).css("height", contentHeight);
    })

    $(".tab-title li").click(function() {
        if (!$(".tab-content").is(":animated")) {
            $(this).parent().parent().parent().addClass("curbox");
            $(this).addClass("current").siblings(".curbox .tab-title li").removeClass("current");
            var _index = $(this).index();
            $(".curbox .tab-content li").eq(_index).show().siblings(".curbox .tab-content li").hide();
            var contentHeight = $(".curbox .tab-content li").eq(_index).css("height");
            $(".curbox .tab-content").height(contentHeight);
            $(this).parent().parent().parent().removeClass("curbox");
        }
    })

    var scrollFun = function() {
        var speed = 100;
        var tab = document.getElementById("scrolldiv");
        var tab1 = document.getElementById("scrolldiv1");
        var tab2 = document.getElementById("scrolldiv2");
        tab2.innerHTML = tab1.innerHTML;
        function Marquee() {
            if (tab2.offsetWidth - tab.scrollLeft <= 0) {
                tab.scrollLeft -= tab1.offsetWidth;
            }
            else {
                tab.scrollLeft++;
            }
        }
        var MyMar = setInterval(Marquee, speed);
        tab.onmouseover = function() { clearInterval(MyMar) };
        tab.onmouseout = function() { MyMar = setInterval(Marquee, speed) };
    }
    scrollFun();

    /*底部滚动*/
    var scrollFun2 = function() {
        $('#marquee1').kxbdSuperMarquee({
            distance: 172,
            time: 3,
            btnGo: { left: '#goL', right: '#goR' },
            direction: 'left'
        });
    }
    scrollFun2();

    /*search*/
    var searchFun = function() {
        $(".ico-search").click(function() {
            $(".show-search").fadeIn("fast");
        })
    }
    searchFun();

    /*sitemap*/
    var sitemapFun = function() {
        $(".sitemap-box").hover(
        function() {
            $(this).addClass("hover");
            $(".show-sitemap").fadeIn("fast");
        },
        function() {
            $(this).removeClass("hover");
            $(".show-sitemap").fadeOut("fast");
        })
    }
    sitemapFun();

    /*弹出释放*/
    var hideFun = function() {
        var flag = false;
        $(".show-search").hover(function() { flag = true }, function() { flag = false })
        $(document).mousedown(function(e) {
            e = window.e || e;
            var target = e.target || e.srcElement;
            if (!flag && target != $(".show-search")) {
                $(".show-search").fadeOut("fast");
            }
        })
    }
    hideFun();
})