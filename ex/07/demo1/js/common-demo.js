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
        $(this).find(".hover").fadeIn("slow");
    },
    function() {
        $(this).find(".hover").fadeOut("slow");
    })

    //HOT
    /*banner*/
    var hotTab = function() {
        var effTime = 3000;
        var loopTime = 8000;
        var conItem = $(".hot .tab-content li");
        var num;

        //FORMAT FIRST ELEMENT
        $(".hot .tab-content li").first().addClass("current").children().children(".item-1").css("left", "-1600px").animate({ left: 0 }, effTime)
                                                                        .siblings(".item-4").css("left", "-1600px").delay(1000).animate({ left: "20px" }, 2000).animate({ left: 0 }, 300)
                                                                        .siblings(".item-3").css("left", "-1600px").delay(1500).animate({ left: "20px" }, 2000).animate({ left: 0 }, 300)
                                                                        .siblings(".item-2").css("left", "-1600px").delay(2000).animate({ left: "20px" }, 2000).animate({ left: 0 }, 300);

        //PREV
        var prevFun = function() {
            if ($(".hot .tab-content li").first().hasClass("current")) {
                $(".hot .tab-content li.current").children().children(".item-2").animate({ left: "-1600px" }, 2000)
                                                            .siblings(".item-3").delay(500).animate({ left: "-1600px" }, 2000)
                                                            .siblings(".item-4").delay(1000).animate({ left: "-1600px" }, 2000)
                                                            .siblings(".item-1").delay(1500).animate({ left: "-1600px" }, effTime);
                $(".hot .tab-content li").first().removeClass("current");
                $(".hot .tab-content li").last().addClass("current").children().children(".item-1").css("left", "1600px").delay(1500).animate({ left: 0 }, effTime)
                                                                               .siblings(".item-2").css("left", "1600px").delay(3000).animate({ left: "-20px" }, 2000).animate({ left: 0 }, 300)
                                                                               .siblings(".item-3").css("left", "1600px").delay(3500).animate({ left: "-20px" }, 2000).animate({ left: 0 }, 300)
                                                                               .siblings(".item-4").css("left", "1600px").delay(4000).animate({ left: "-20px" }, 2000).animate({ left: 0 }, 300);
            }
            else {
                $(".hot .tab-content li.current").children().children(".item-2").animate({ left: "-1600px" }, 2000)
                                                            .siblings(".item-3").delay(500).animate({ left: "-1600px" }, 2000)
                                                            .siblings(".item-4").delay(1000).animate({ left: "-1600px" }, 2000)
                                                            .siblings(".item-1").delay(1500).animate({ left: "-1600px" }, effTime);
                $(".hot .tab-content li.current").removeClass("current").prev().addClass("current").children().children(".item-1").css("left", "1600px").delay(1500).animate({ left: 0 }, effTime)
                                                                               .siblings(".item-2").css("left", "1600px").delay(3000).animate({ left: "-20px" }, 2000).animate({ left: 0 }, 300)
                                                                               .siblings(".item-3").css("left", "1600px").delay(3500).animate({ left: "-20px" }, 2000).animate({ left: 0 }, 300)
                                                                               .siblings(".item-4").css("left", "1600px").delay(4000).animate({ left: "-20px" }, 2000).animate({ left: 0 }, 300);
            }
        }
        //NEXT
        var nextFun = function() {
            if ($(".hot .tab-content li").last().hasClass("current")) {
                $(".hot .tab-content li.current").children().children(".item-4").animate({ left: "1600px" }, 2000)
                                                            .siblings(".item-3").delay(500).animate({ left: "1600px" }, 2000)
                                                            .siblings(".item-2").delay(1000).animate({ left: "1600px" }, 2000)
                                                            .siblings(".item-1").delay(1500).animate({ left: "1600px" }, effTime);
                $(".hot .tab-content li").last().removeClass("current");
                $(".hot .tab-content li").first().addClass("current").children().children(".item-1").css("left", "-1600px").delay(1500).animate({ left: 0 }, effTime)
                                                                               .siblings(".item-4").css("left", "-1600px").delay(3000).animate({ left: "20px" }, 2000).animate({ left: 0 }, 300)
                                                                               .siblings(".item-3").css("left", "-1600px").delay(3500).animate({ left: "20px" }, 2000).animate({ left: 0 }, 300)
                                                                               .siblings(".item-2").css("left", "-1600px").delay(4000).animate({ left: "20px" }, 2000).animate({ left: 0 }, 300);
            }
            else {
                $(".hot .tab-content li.current").children().children(".item-4").animate({ left: "1600px" }, 2000)
                                                            .siblings(".item-3").delay(500).animate({ left: "1600px" }, 2000)
                                                            .siblings(".item-2").delay(1000).animate({ left: "1600px" }, 2000)
                                                            .siblings(".item-1").delay(1500).animate({ left: "1600px" }, effTime);
                $(".hot .tab-content li.current").removeClass("current").next().addClass("current").children().children(".item-1").css("left", "-1600px").delay(1500).animate({ left: 0 }, effTime)
                                                                                                              .siblings(".item-4").css("left", "-1600px").delay(3000).animate({ left: "20px" }, 2000).animate({ left: 0 }, 300)
                                                                                                              .siblings(".item-3").css("left", "-1600px").delay(3500).animate({ left: "20px" }, 2000).animate({ left: 0 }, 300)
                                                                                                              .siblings(".item-2").css("left", "-1600px").delay(4000).animate({ left: "20px" }, 2000).animate({ left: 0 }, 300);
            }
        }
        //CLICK
        $(".hot .tab-content-wrap .op-box a").click(function() {
            if ($(this).hasClass("prev")) {
                prevFun();
            }
            else {
                nextFun();
            }
        })
    }
    hotTab();
})(jQuery)