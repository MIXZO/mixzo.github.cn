var mshow = (function($) {
    var mshowboxFun = {
        bgAdd: function() {
            $("body").append("<div id='bgScreen'></div><iframe id='bgIFrame' src='about:blank'></iframe>");
            $("#bgScreen, #bgIFrame").css("opacity", "0").animate({ opacity: 0.3 }, 500);
        },
        bgDel: function() {
            $("#bgScreen, #bgIFrame").animate({ opacity: 0 }, 500, function() { $("#bgScreen, #bgIFrame").remove() });
            //$(window).unbind('scroll');
        },
        boxShow: function(obj) {
            var obj = $(".show-div-" + obj);
            showPositionFix(obj);
            obj.fadeIn("slow");
        },
        AllShow: function(obj) {
            mshowboxFun.bgAdd();
            mshowboxFun.boxShow(obj);
        },
        boxHide: function() {
            $(".myshowbox").fadeOut("slow");
        },
        AllHide: function() {
            mshowboxFun.boxHide();
            mshowboxFun.bgDel();
        },
        boxFun: function(className, obj) {
            /*显示*/
            $(className).live('click', function() {
                mshowboxFun.AllShow(obj);
            });
            /*共用关闭*/
            $(".myshowbox .btn-close, #bgScreen").live('click', function() {
                mshowboxFun.AllHide();
            });
        }
    }

    //弹出框位置Fix
    var showPositionFix = function(obj) {
        /*box fixed*/
        var boxnFixed = function() {
            if (jQuery.browser.version == '6.0') {
                var _wh = findDimensions().split("-");
                obj.css({ "top": ((_wh[1] - obj.height()) / 2 + document.documentElement.scrollTop) + "px", "left": (_wh[0] / 2 + document.documentElement.scrollLeft) });
            }
        }

        obj.css("margin", (jQuery.browser.version == '6.0' ? 0 : -obj.height() / 2 - 5) + "px 0 0 " + -obj.width() / 2 + "px");
        $("#bgScreen, #bgIFrame").css("height", jQuery.browser.version == '6.0' ? window.screen.height - 100 : '100%');

        /*position fix 注意需要unbind*/
        if (jQuery.browser.version == '6.0') {
            boxnFixed();
            $(window).bind('scroll', function() {
                boxnFixed();
            });
            obj.css("left", document.documentElement.scrollLeft + document.documentElement.clientWidth - this.offsetWidth);
        }
    }

    return mshowboxFun;
})(jQuery)