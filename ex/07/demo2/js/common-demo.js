(function($) {
    //SEARCH
    var searchFun = function() {
        $(".header-input").click(function() {
            $(this).animate({ width: "200px" }, 1000);
        })
        $(".header-input input").blur(function() {
            $(".header-input").animate({ width: "140px" }, 1000);
        })
    }
    searchFun();

    var autoFun = function(obj) {
        if (obj.children().last().hasClass("current")) {
            obj.children().last().removeClass("current").fadeOut("slow");
            obj.children().first().addClass("current").fadeIn("slow");
        }
        else {
            obj.children(".current").removeClass("current").fadeOut("slow").next().addClass("current").fadeIn("slow");
        }
    }
    //BANNER
    var bannerFun = function() {
        var obj = $(".banner");
        obj.children().first().addClass("current").fadeIn("slow");
        window.setInterval(function() { autoFun(obj); }, 2000);
    }
    bannerFun();

    //NEW
    $(".new-list li").hover(
    function() {
        $(this).find(".hover").animate({ top: "500px" }, 500);
    },
    function() {
        $(this).find(".hover").animate({ top: "663px" }, 500);
    })

    $(".hot-wrap .op-box a").click(function() {
        var move = 479;
        var marginValue = $(".hot-list").css("margin-left");
        var _index = $(".hot-list .current").index();
        if ($(this).hasClass("next")) {
            if (!$(".hot-list li").eq($(".hot-list li").last().index() - 2).hasClass("current")) {
                $(".hot-list .current").removeClass("current").next().addClass("current");
                $(".hot-list").animate({ "margin-left": -move * parseInt($(".hot-list .current").index()) + "px" }, 1000);
            }
        }
        else {
            if (!$(".hot-list li").first().hasClass("current")) {
                $(".hot-list .current").removeClass("current").prev().addClass("current");
                $(".hot-list").animate({ "margin-left": -move * parseInt($(".hot-list .current").index()) + "px" }, 1000);
            }
        }
    })

    $(".news-wrap .op-box a").click(function() {
        var move2 = 195;
        var marginValue = $(".news-list").css("margin-left");
        var _index = $(".news-list .current").index();
        if ($(this).hasClass("next")) {
            if (!$(".news-list li").eq($(".hot-list li").last().index() - 3).hasClass("current")) {
                $(".news-list .current").removeClass("current").next().addClass("current");
                $(".news-list").animate({ "margin-left": -move2 * parseInt($(".news-list .current").index()) + "px" }, 1000);
            }
        }
        else {
            if (!$(".news-list li").first().hasClass("current")) {
                $(".news-list .current").removeClass("current").prev().addClass("current");
                $(".news-list").animate({ "margin-left": -move2 * parseInt($(".news-list .current").index()) + "px" }, 1000);
            }
        }
    })
})(jQuery)