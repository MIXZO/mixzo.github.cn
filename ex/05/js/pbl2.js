var pbl2 = (function($) {
    var _wh = findDimensions().split("-");
    /*初始化页面宽度*/
    var pageWidthFix = function() {
        var _wh = findDimensions().split("-");
        var minWidth = 980;

        if (_wh[0] > minWidth) {
            if ($(".container-pbl").length > 0 || $(".wAuto").length > 0) {
                $("#content").width(parseInt(_wh[0] / ($(".cell").width() + 18)) * ($(".cell").width() + 18) + "px");
                $("#header .inner-box").width($("#content").width() - 18 + "px");
                $(".wAuto").width($("#content").width() - 18 + "px");
                if ($(".container-albums").length > 0) {
                    $(".container-albums").width($("#content").width() + 100 + "px")
                }
            }
            else {
                $("#header").width(_wh[0] + "px").children().width($(".content-box").width() + "px");
            }
        }
        else {
            $("#content, #header .inner-box, .wAuto").width(minWidth + "px");
        }
        $("#header .nav .show-tags").width($("#header .inner-box").width());
    }
    pageWidthFix();

    $(window).resize(function() {
        pageWidthFix();
    })

    var pbl2Fun = {
        //scroll load
        scrollFun: function(url) {
            var index = 0;  //加载次数
            var _scrollTimer = null;
            if ($.trim(url) == "") { url = "#"; }
            var $container = $('.container-pbl');
            $(window).scroll(function() {
                clearTimeout(_scrollTimer);
                _scrollTimer = setTimeout(function() {
                    if ($(".cell:last").offset().top - $(document).scrollTop() - _wh[1] < 0) {
                        if (index < 5) {
                            var obj = "";

                            for (var i = 0; i < 20; i++) {
                                if (i < 10) {
                                    i = "0" + i;
                                }
                                var src = "/images/img/pbl_0" + i + ".jpg";
                                obj += '<div class="cell"><div class="pos-box"><img class="waterfall_img" src="' + src + '" alt="" /><div class="screen-box"><a href="view/photo_zoom_in.htm"></a></div><div class="name-box"><p class="name"><a href="view/photo_zoom_in.htm">Plum cheeks</a></p></div><p class="line"></p><div class="author-box">Created By : <a href="javascript:;">Ecoh</a></div><div class="count-box clearfix"><a href="javascript:;"><i class="i-1"></i><span class="num">140</span></a><a href="javascript:;"><i class="i-2"></i><span class="num">30</span></a><a href="/view/photo_zoom_in.htm"><i class="i-3"></i><span class="num">12</span></a></div><div class="share-box"><a class="head img-corner" href="javascript:;"><img class="img-1 img-grayscale" src="/images/img/秋山澪_20121029001.jpg" alt="" /><img class="img-2" src="/images/img/秋山澪_20121029001.jpg" alt="" /></a><a class="email" href="javascript:;"></a><a class="renren" href="javascript:;"></a><a class="souhu" href="javascript:;"></a><a class="qq" href="javascript:;"></a><a class="weibo" href="javascript:;"></a></div></div></div>';
                            }
                            var $obj = $(obj);
                            $container.imagesLoaded(function() {
                                $container.append($obj).masonry('appended', $obj);
                            });
                            index++;
                        }
                        else {
                            if (!$("#opBox").length > 0) {
                                $("body").append('<div id="opBox" class="op-box"><a class="btn-next" href="' + url + '">More photos</a></div>');
                            }
                        }
                    }
                }, 100)
            })
        }
    }

    return pbl2Fun;
})(jQuery);