(function($) {
    var setting = {
        column_width: 314,
        column_className: 'waterfall_column',
        column_space: 18,
        cell_selector: '.cell',
        img_selector: '.waterfall_img',
        auto_imgHeight: true,
        fadein: true,
        fadein_speed: 500,
        insert_type: 1,
        getResource: function(index) { }
    },
        waterfall = $.waterfall = {},
        $container = null;
    waterfall.load_index = 0,
        $.fn.extend({
            waterfall: function(opt) {
                if ($(".container-pbl").length > 0) {
                    opt = opt || {};
                    setting = $.extend(setting, opt);
                    $container = waterfall.$container = $(this);
                    waterfall.$columns = creatColumn();
                    render($(this).find(setting.cell_selector).detach(), false);
                    waterfall._scrollTimer2 = null;
                    $(window).bind('scroll', function() {
                        clearTimeout(waterfall._scrollTimer2);
                        waterfall._scrollTimer2 = setTimeout(onScroll, 300);
                    });
                    waterfall._scrollTimer3 = null;
                    $(window).bind('resize', function() {
                        clearTimeout(waterfall._scrollTimer3);
                        waterfall._scrollTimer3 = setTimeout(onResize, 300);
                    });
                }
            }
        });

    function creatColumn() {
        waterfall.column_num = calculateColumns();
        var html = '';
        for (var i = 0; i < waterfall.column_num; i++) {
            html += '<div class="' + setting.column_className + '" style="width:' + setting.column_width + 'px; display:inline-block; *display:inline;zoom:1; margin-left:' + setting.column_space / 2 + 'px;margin-right:' + setting.column_space / 2 + 'px; vertical-align:top; overflow:hidden"></div>';
        }
        $container.prepend(html);
        return $('.' + setting.column_className, $container);
    }
    function calculateColumns() {
        var num = Math.floor(($container.innerWidth()) / (setting.column_width + setting.column_space));
        if (num < 1) { num = 1; }
        return num;
    }
    function render(elements, fadein) {
        if (!$(elements).length) return;
        var $columns = waterfall.$columns;
        $(elements).each(function(i) {
            $(this).find("img").attr("width", setting.column_width);
            if (!setting.auto_imgHeight || setting.insert_type == 2) {
                if (setting.insert_type == 1) {
                    insert($(elements).eq(i), setting.fadein && fadein);
                } else if (setting.insert_type == 2) {
                    insert2($(elements).eq(i), i, setting.fadein && fadein);
                }
                return true;
            }
            if ($(this)[0].nodeName.toLowerCase() == 'img' || $(this).find(setting.img_selector).length > 0) {
                var image = new Image;
                var src = $(this)[0].nodeName.toLowerCase() == 'img' ? $(this).attr('src') : $(this).find(setting.img_selector).attr('src');
                image.onload = function() {
                    image.onreadystatechange = null;
                    if (setting.insert_type == 1) {
                        insert($(elements).eq(i), setting.fadein && fadein);
                    } else if (setting.insert_type == 2) {
                        insert2($(elements).eq(i), i, setting.fadein && fadein);
                    }
                    image = null;
                }
                image.onreadystatechange = function() {
                    if (image.readyState == "complete") {
                        image.onload = null;
                        if (setting.insert_type == 1) {
                            insert($(elements).eq(i), setting.fadein && fadein);
                        } else if (setting.insert_type == 2) {
                            insert2($(elements).eq(i), i, setting.fadein && fadein);
                        }
                        image = null;
                    }
                }
                image.src = src;
            } else {
                if (setting.insert_type == 1) {
                    insert($(elements).eq(i), setting.fadein && fadein);
                } else if (setting.insert_type == 2) {
                    insert2($(elements).eq(i), i, setting.fadein && fadein);
                }
            }
        });
    }
    function public_render(elems) {
        render(elems, true);
    }
    function insert($element, fadein) {
        if (fadein) {
            $element.css('opacity', 0).appendTo(waterfall.$columns.eq(calculateLowest())).fadeTo(setting.fadein_speed, 1);
        } else {
            $element.appendTo(waterfall.$columns.eq(calculateLowest()));
        }
    }
    function insert2($element, i, fadein) {
        if (fadein) {
            $element.css('opacity', 0).appendTo(waterfall.$columns.eq(i % waterfall.column_num)).fadeTo(setting.fadein_speed, 1);
        } else {
            $element.appendTo(waterfall.$columns.eq(i % waterfall.column_num));
        }
    }
    function calculateLowest() {
        var min = waterfall.$columns.eq(0).outerHeight(), min_key = 0;
        waterfall.$columns.each(function(i) {
            if ($(this).outerHeight() < min) {
                min = $(this).outerHeight();
                min_key = i;
            }
        });
        return min_key;
    }
    function getElements() {
        $.waterfall.load_index++;
        return setting.getResource($.waterfall.load_index, public_render);
    }
    waterfall._scrollTimer = null;
    function onScroll() {
        if ($(".container-random").length > 0) {
            clearTimeout(waterfall._scrollTimer);
            waterfall._scrollTimer = setTimeout(function() {
                var $lowest_column = waterfall.$columns.eq(calculateLowest());
                var bottom = $lowest_column.offset().top + $lowest_column.outerHeight();
                var scrollTop = document.documentElement.scrollTop || document.body.scrollTop || 0;
                var windowHeight = document.documentElement.clientHeight || document.body.clientHeight || 0;
                if (scrollTop >= bottom - windowHeight) {
                    render(getElements(), true);

                    setTimeout(grayscaleFun, 600);
                    setTimeout(cornerFun, 700);
                    setTimeout(vmiddleimgFun, 500);
                }
            }, 100);
        }
    }
    function onResize() {
        pageWidthFix();

        if (calculateColumns() == waterfall.column_num) return;
        var $cells = waterfall.$container.find(setting.cell_selector);
        var _scrollTop = $(window).scrollTop();
        waterfall.$columns.remove();
        waterfall.$columns = creatColumn();

        $("html, body").animate({ scrollTop: _scrollTop }, 1000);

        render($cells, false);
    }

    var opt = {
        getResource: function(index, render) {
            if (index < 10) {
                if (index >= 10) {
                    index = index % 10 + 1;
                }

                var html = '';

                for (var i = 0; i < 20; i++) {
                    if (i < 10) {
                        i = "0" + i;
                    }
                    var src = "/images/img/pbl_0" + i + ".jpg";
                    html += '<div class="cell">' +
                            '<div class="pos-box">' +
                                '<img class="waterfall_img" src="' + src + '" alt="" />' +
                                '<div class="screen-box">' +
                                    '<a href="view/photo_zoom_in.htm"></a>' +
                                '</div>' +
                                '<div class="name-box">' +
                                    '<p class="name">' +
                                        '<a href="view/photo_zoom_in.htm">Plum cheeks</a>' +
                                    '</p>' +
                                '</div>' +
                                '<p class="line">' +
                                '</p>' +
                                '<div class="author-box">' +
                                    'Created By : <a href="javascript:;">Ecoh</a>' +
                                '</div>' +
                                '<div class="count-box clearfix">' +
                                    '<a href="javascript:;"><i class="i-1"></i><span class="num">140</span></a><a href="javascript:;"><i class="i-2"></i><span class="num">30</span></a><a href="/view/photo_zoom_in.htm"><i class="i-3"></i><span class="num">12</span></a>' +
                                '</div>' +
                                '<div class="share-box">' +
                                    '<a class="head img-corner" href="javascript:;">' +
                                        '<img class="img-1 img-grayscale" src="/images/img/秋山澪_20121029001.jpg" alt="" />' +
                                        '<img class="img-2" src="/images/img/秋山澪_20121029001.jpg" alt="" /></a> <a class="email" href="javascript:;"></a><a class="renren" href="javascript:;"></a><a class="souhu" href="javascript:;"></a><a class="qq" href="javascript:;"></a><a class="weibo" href="javascript:;"></a>' +
                                '</div>' +
                            '</div>' +
                        '</div>';
                }
                return $(html);
            }
            else {
                if (!$("#opBox").length > 0) {
                    $("body").append('<div id="opBox" class="op-box"><a class="btn-next" href="javascript:;">More photos</a></div>');
                }
            }
        },
        auto_imgHeight: true,
        insert_type: 1
    }
    $('.container-random').waterfall(opt);

    /*初始化页面宽度*/
    var pageWidthFix = function() {
        var _wh = findDimensions().split("-");
        var minWidth = 980;

        if (_wh[0] > minWidth) {
            if ($(".container-pbl").length > 0 || $(".wAuto").length > 0) {
                $("#content").width(parseInt(_wh[0] / (setting.column_width + setting.column_space)) * (setting.column_width + setting.column_space) + "px");
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

})(jQuery);