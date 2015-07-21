$(function() {
    var snsFun = function() {
        /*页头*/
        var headerFun = function() {
            var _wh = findDimensions().split("-");

            /*圆角*/
            //$("#header .inf-box li.num a").corner();
            //$(".pzi-box .author-box .head, .pzi-box .message-main .head").corner("25px");
            //$(".list-user dd .head, .activity-box .list-activity .message-box .head").corner("21px");

            /*头部下拉*/
            var mouseover_tid = [];
            var mouseout_tid = [];
            $("#header li.show-dp").each(function(index) {
                $(this).hover(
                function() {
                    var _self = this;
                    clearTimeout(mouseout_tid[index]);
                    mouseover_tid[index] = setTimeout(function() {
                        $(_self).addClass("hover").children().children(".show-inf").slideDown("fast");
                    }, 200);
                },
                function() {
                    var _self = this;
                    clearTimeout(mouseover_tid[index]);
                    mouseout_tid[index] = setTimeout(function() {
                        $(_self).removeClass("hover").children().children(".show-inf").slideUp("fast");
                    }, 200);
                })
            })

            $("#header .inf-box .show-echo dd").hover(
            function() {
                $(this).addClass("hover");
            },
            function() {
                $(this).removeClass("hover");
            })
        }
        headerFun();

        /*upload*/
        var uploadFun = function() {
            var obj = $("#upload");
            /*定位*/
            var posFun = function() {
                var _top = $(window).scrollTop() + 101;
                obj.css("top", _top + "px");
                $("#header").css("top", $(window).scrollTop() + "px");
            }

            if (jQuery.browser.version == '6.0') {
                $(window).scroll(function() {
                    posFun();
                })
                $(window).resize(function() {
                    posFun();
                })
            }

            /*mode 4*/
            /*type*/
            $(".list-form-select li.value").mouseup(function() {
                $(this).parent().css("z-index", "9").siblings("ul").css("z-index", "0");
                $(this).children(".show-select-wrap").show();
                $('.scroll-pane').jScrollPane();
            })
            $(".list-form-select .show-select dd").hover(
            function() { $(this).addClass("hover"); },
            function() { $(this).removeClass("hover"); })
            $(".list-form-select .show-select dd").click(function() {
                $(this).parents(".show-select-wrap").hide().siblings(".select-value").text($.trim($(this).children().text()));
            })
            /*tags*/
            if ($.trim($("#txtTags").attr("value")) != "") {
                $("#txtTags").parent().siblings(".key").hide();
            }

            $("#txtTags").click(function() {
                $(this).parent().parent().css("z-index", "9").siblings("ul").css("z-index", "0");
                $(this).parent().siblings(".show-tags-wrap").show();
            }).keyup(function() {
                $(this).parent().siblings(".key").hide();
            }).blur(function() {
                if ($.trim($(this).attr("value")) == "") {
                    $(this).parent().siblings(".key").fadeIn("fast");
                }
            })
            $(".show-tags-wrap .item-box a").click(function() {
                $(this).parents(".show-tags-wrap").siblings(".key").hide();
                if (!$(this).hasClass("current")) {
                    $("#txtTags").attr("value", $("#txtTags").attr("value") + $(this).text() + " ");
                    $(this).addClass("current");
                }
                else {
                    $(this).removeClass("current");
                }
            })
            /*checkbox*/
            $(".show-div-upload .op-box label").click(function() {
                if ($(this).hasClass("current")) {
                    if (!$(this).parent().hasClass("radios-box")) {
                        $(this).removeClass("current");
                    }
                }
                else {
                    $(this).addClass("current").siblings("label").removeClass("current");
                }
            })
        }
        uploadFun();

        /*瀑布流内部效果*/
        var pblInnerFun = function() {
            var _timeout1;
            var _timeout2;
            /*hover*/
            $(".container-pbl .cell").live('mouseover', function() {
                $(this).addClass("hover");
            }).live('mouseout', function() {
                $(this).removeClass("hover");
            })

            $(".container-pbl .count-box a, .container-pbl .share-box a").live('mouseover', function() {
                $(this).addClass("hover");
                if ($(this).hasClass("head")) {
                    $(this).children(".img-1").hide().siblings(".img-2").show();
                }
            })
            $(".container-pbl .count-box a, .container-pbl .share-box a").live('mouseout', function() {
                $(this).removeClass("hover");
                if ($(this).hasClass("head")) {
                    $(this).children(".img-2").hide().siblings(".img-1").show();
                }
            })

            /*select*/
            $(".container-pbl .screen-select, .container-pbl .ico-select").live('click', function() {
                if ($(this).parent().parent().hasClass("current")) {
                    $(this).parent().parent().removeClass("current");
                }
                else {
                    $(this).parent().parent().addClass("current")
                }
            })
            /*select all*/
            $(".albums-all-op .btn-all").click(function() {
                $(".container-pbl .cell").addClass("current");
            })
            $(".albums-all-op .link-cancle").click(function() {
                $(".container-pbl .cell").removeClass("current");
            })

            /*cell*/
            $(".container-pbl .op-box a.btn-privacy").live('click', function() {
                $(this).addClass("current").siblings().removeClass("current");
            })
            $(".container-pbl .name-edit .name").live('click', function() {
                $(this).hide().siblings().show().children().attr("value", $.trim($(this).children().text())).select();
            })
            $(".container-pbl .name-edit .edit input").live('blur', function() {
                $(this).parent().hide().siblings().show();
            }).live('keydown', function(event) {
                if (event.keyCode == 13) {
                    if ($.trim($(this).attr("value")) != "") {
                        $(this).parent().hide().siblings().show().children().text($.trim($(this).attr("value")));
                    }
                    else {
                        $(this).parent().hide().siblings().show();
                    }
                }
                else if (event.keyCode == 27) {
                    $(this).parent().hide().siblings().show();
                }
            })
        }
        pblInnerFun();

        /*user*/
        /*个人信息模块*/
        var userFun = function() {
            if ($("#user .show-inf").is(":visible") == false) {
                $("#user .head-box").mouseover(function() {
                    $("#user .show-inf").show();
                })
            }
            $("#user .show-inf .close").click(function() {
                $("#user .show-inf").hide();
            })
            /*title编辑*/
            $("#user .title-box .show").click(function() {
                $(this).hide().siblings(".edit").show().children().focus().select();
            })
            $("#user .title-box .edit input").blur(function() {
                if ($.trim($(this).attr("value")) != "")
                    $("#user .title-box .show span").text($.trim($(this).attr("value")));
                $(this).parent().hide().siblings(".show").show();
            })
        }
        userFun();

        /*TOP*/
        var topFun = function() {
            var obj = $("#top");
            /*定位*/
            var posFun = function() {
                var _wh = findDimensions().split("-");
                var _top = _wh[1] - obj.height() - 10 + $(window).scrollTop();
                var _left = _wh[0] - obj.width() - 10;
                obj.css({ "bottom": "auto", "top": _top + "px", "left": _left });
            }

            if (jQuery.browser.version == '6.0') {
                $(window).scroll(function() {
                    posFun();
                })
                $(window).resize(function() {
                    posFun();
                })
            }
            /*滚动*/
            obj.click(function() {
                $("html, body").animate({ scrollTop: "0" }, 1000);
            })
        }
        topFun();

        /*失焦控制*/
        var hideFun = function() {
            var flag = false;
            $(".show-select-wrap, .show-tags-wrap").hover(function() { flag = true }, function() { flag = false })
            $(document).mousedown(function(e) {
                e = window.e || e;
                var target = e.target || e.srcElement;
                if (!flag && target != $(".show-select-wrap")) { $(".show-select-wrap").hide(); }
                if (!flag && target != $(".show-tags-wrap")) { $(".show-tags-wrap").hide(); }
            })
        }
        hideFun();

        /*验证*/
        var vercFun = function() {
            /*input-txt*/
            $(".list-form-pos li.value .check-data").mousedown(function() {
                $(this).parent().siblings(".key").fadeOut("fast");
            }).blur(function() {
                if ($.trim($(this).attr("value")) == "") {
                    $(this).parent().siblings(".key").fadeIn("fast");
                }
            })
            /*textarea*/
            $(".list-form-sta .input-textarea").focus(function() {
                if ($.trim($(this).attr("value")) == $(this).attr("null")) {
                    $(this).attr("value", "");
                }
            }).blur(function() {
                if ($.trim($(this).attr("value")) == "") {
                    $(this).attr("value", $(this).attr("null"));
                }
            })
            /*check*/
            $(".check-data").mousedown(function() {
                $(this).parent().siblings(".success, .ts").fadeOut();
            }).blur(function() {
                if ($.trim($(this).attr("value")) == "") {
                    $(this).parent().siblings(".ts").fadeIn();
                }
                else {
                    $(this).parent().siblings(".success").fadeIn();
                }
            })
        }
        vercFun();
    }
    snsFun();
})

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