$(function() {
    /*弹出框位置Fix*/
    var showPositionFix = function(obj) {
        var obj = obj;
        /*box fixed*/
        var boxnFixed = function() {
            if (jQuery.browser.version == '6.0') {
                var _wh = findDimensions().split("-");
                obj.css({ "top": ((_wh[1] - obj.height()) / 2 + document.documentElement.scrollTop) + "px", "left": (_wh[0] / 2 + document.documentElement.scrollLeft) });
            }
        }

        obj.css("margin", (jQuery.browser.version == '6.0' ? 0 : -obj.height() / 2 - 5) + "px 0 0 " + -obj.width() / 2 + "px");
        $("#bgScreen, #bgIFrame").css("height", jQuery.browser.version == '6.0' ? window.screen.height - 160 : '100%');

        /*position fix 注意需要unbind*/
        if (jQuery.browser.version == '6.0') {
            boxnFixed();
            $(window).bind('scroll', function() {
                boxnFixed();
            });
            obj.css("left", document.documentElement.scrollLeft + document.documentElement.clientWidth - this.offsetWidth);
        }
    }

    var myshowBox = function(titles, urls, objWidth, objHeight, types, classname) {
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
        })
    }

    var myshowBox2 = function() {
        var objName = new Array("upload");   //弹出框对象 show-div-***

        var bgAdd = function() {
            $("body").append("<div id='bgScreen'></div><iframe id='bgIFrame' src='about:blank'></iframe>");
        }
        var bgDel = function() {
            $("#bgScreen, #bgIFrame").remove();
            //$(window).unbind('scroll');
        }

        /*弹出框触发*/
        $(".show-myshowbox2").click(function() {
            if ($(this).attr("id") == "upload") {
                $(".show-div-upload .con-choose").show().siblings(".show-con").hide().siblings("h4").children("span").text("Upload a photo");
            }
            if ($(this).hasClass("add-photo")) {
                $(".show-div-upload .con-mode").show().siblings(".show-con").hide().siblings("h4").children("span").text("");
            }
            if ($(this).hasClass("add-albums") || $(this).hasClass("edit-albums")) {
                $(".show-div-upload .con-albums").show().siblings(".show-con").hide().siblings("h4").children("span").text($(this).hasClass("add-albums") ? "Create Album" : "Edit Album");
            }

            bgAdd();
            for (var i = 0; i < objName.length; i++) {
                if ($(this).hasClass("show-" + objName[i])) {
                    showPositionFix($(".show-div-" + objName[i]));
                    $(".show-div-" + objName[i]).show();
                }
            }
        })

        /*内部跳转*/
        $(".myshowbox .con-mode .link-upload").click(function() {
            $(this).parent().hide().siblings(".con-choose").show().siblings("h4").children("span").text("Upload a photo");
            showPositionFix($(".show-div-upload"));
        })
        $(".show-div-upload .btn-choose").click(function() {
            $(".show-div-upload .op-box label").removeClass("current");
            $(this).parent().hide().siblings(".con-submit").show();
            showPositionFix($(".show-div-upload"));
            vmiddleimgFun();
            $('.scroll-pane').jScrollPane();
        })
        $(".show-div-upload .btn-upload").click(function() {
            $(".myshowbox").hide();
            bgDel();
        })

        /*共用关闭*/
        $(".myshowbox .btn-close, #bgScreen").live('click', function() {
            $(".myshowbox").hide();
            bgDel();
        })
    }
    myshowBox2();
})