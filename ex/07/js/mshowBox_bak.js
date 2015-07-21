var mshow = (function($) {
    var mshowboxFun = {
        myshowBox: function(titles, urls, objWidth, objHeight, types, classname) {
            var _title = titles;
            var _url = urls;
            var _width = objWidth;
            var _height = objHeight;
            var _type = types;      //ture为iframe,false为div
            var _class = classname;

            if (_type == "iframe") {
                addHTML = "<iframe class='iframe-myshowbox' id='myshowbox' src='" + _url + "' frameborder='0' scrolling='no' width='" + _width + "' height='" + _height + "'></iframe>";

                //IE6 BUG fix
                var ieset = navigator.userAgent;
                if (ieset.indexOf("MSIE 6.0") > -1) {
                    setTimeout('window.parent[\'myshowbox\'].location.reload();', 0);
                }
            }
            else {
                addHTML = "<div class='div-myshowbox' style='width:" + _width + "px; height:" + _height + "px;'></div>"
            }

            $("body").append("<div id='mshowbox' class='myshowbox " + _class + "'><div class='myshowbox-container'><a class='btn-close' href='javascript:;'></a><h3 class='title'>" + _title + "</h3>" + addHTML + "</div></div><div id='bgScreen'></div><iframe id='bgIFrame' src='about:blank'></iframe>");

            //判断是否有标题
            if (_title == "") {
                $(".myshowbox .title").hide();
            }
            else {
                $(".myshowbox .title").css("width", _width - 20 + "px");
            }

            $(".myshowbox-container").css("width", _width);

            showPositionFix($("myshowbox" + _class));

            //关闭释放
            $(".myshowbox-container .btn-close, #bgScreen").live('click', function() {
                $(".myshowbox, #bgScreen, #bgIFrame").hide().remove();
                $(window).unbind('scroll');
            });
        },
        myshowBox2: function(obj) {
            var objName = new Array(obj);   //弹出框对象 show-div-objname

            var bgAdd = function() {
                if($("#bgScreen").size() < 1) {
                    $("body").append("<div id='bgScreen'></div><iframe id='bgIFrame' src='about:blank'></iframe>");
                    $("#bgScreen, #bgIFrame").css("opacity", "0").animate({ opacity: 0.3 }, 500);
                }
            }
            var bgDel = function() {
                $("#bgScreen, #bgIFrame").animate({ opacity: 0 }, 500, function() { $("#bgScreen, #bgIFrame").remove() });
                //$(window).unbind('scroll');
            }

            /*弹出框触发*/
            $(".show-myshowbox2").live('click', function() {
                bgAdd();
                for (var i = 0; i < objName.length; i++) {
                    if ($(this).hasClass("show-" + objName[i])) {
                        showPositionFix($(".show-div-" + objName[i]));
                        $(".show-div-" + objName[i]).fadeIn("slow");
                    }
                }
            });

            /*共用关闭*/
            $(".myshowbox .btn-close, #bgScreen").live('click', function() {
                $(".myshowbox").fadeOut("slow");
                bgDel();
            })
        },
        boxShow: function(obj) {
        },
        boxHide: function() {
            $(".myshowbox").fadeOut("slow");
            $("#bgScreen, #bgIFrame").animate({ opacity: 0 }, 500, function() { $("#bgScreen, #bgIFrame").remove() });
        }
    }

    //弹出框位置Fix
    var showPositionFix = function(obj) {
        var obj = obj;        
        var _wh = findDimensions().split("-");
        /*box fixed*/
        var boxnFixed = function() {
            if (jQuery.browser.version == '6.0') {
                obj.css({ "top": ((_wh[1] - obj.height()) / 2 + document.documentElement.scrollTop) + "px", "left": (_wh[0] / 2 + document.documentElement.scrollLeft) });
            }
        }

        //obj.css("margin", (jQuery.browser.version == '6.0' ? 0 : -obj.height() / 2 - 5) + "px 0 0 " + -obj.width() / 2 + "px");
        obj.css({"top":document.documentElement.scrollTop + (_wh[1] - obj.height()) / 2,"margin-left":-obj.width() / 2 + "px"});
        $("#bgScreen, #bgIFrame").css("height", jQuery.browser.version == '6.0' ? window.screen.height - 100 : '100%');

        /*position fix 注意需要unbind*/
        /*if (jQuery.browser.version == '6.0') {
            boxnFixed();
            $(window).bind('scroll', function() {
                boxnFixed();
            });
            obj.css("left", document.documentElement.scrollLeft + document.documentElement.clientWidth - this.offsetWidth);
        }*/
    }

    return mshowboxFun;
})(jQuery)