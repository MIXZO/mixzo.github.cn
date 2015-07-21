var order = (function($) {
    var orderFun = {
        orderstep1: function() {
            //删除商品
            $(".list-order-con .op .btn-del").click(function() {
                $(this).parents(".list-order-con").css({
                    "width": "100%", "overflow": "hidden", "zoom": "1"
                }).animate({
                    "height": "0", "opacity": "0"
                }, 1000, function() { $(this).remove(); });
            });
            //删除元素
            var delBox = function(obj) { $(obj).animate({ "height": "0", "opacity": "0" }, 1000, function() { obj.remove(); }); }
            //方式开关
            var hideModeBox = function(obj) { delBox($(obj)); }
            var getOrderGoods = function() {
                var orderitems = $('.list-order-con-wrap .list-order');
                var orderList = new Array();
                orderitems.each(function() {
                    if ($.trim($(this).attr('itemid')) == '') {
                        $(this).attr('itemid', new Date().getTime());
                    }
                    orderList.push({
                        itemid: $(this).attr('itemid'),
                        name: $(this).find('.name a').html(),
                        spec: $(this).find('.name span').html(),
                        src: $(this).find('.product img').attr('src'),
                        bsrc: $(this).find('.product img').attr('bsrc'),
                        size: $(this).find('.size .pos-box .value').html(),
                        color: $(this).find('.color .pos-box .value').html(),
                        num: parseInt($(this).find('.num .num-op input').val()),
                        price: $(this).find('.price span').html()
                    });
                });
                return orderList;
            };
            //包装方式切换
            var showMode = function(obj) {
                obj.addClass("temp");
                var orderList = getOrderGoods();
                $(".mode-op .list-item", obj).html('');
                for (var i = 0, length = orderList.length; i < length; i++) {
                    var orderitem = orderList[i];
                    var lihtml = '<li><div class="pos-box"><img src="images/null.gif" alt="" /> <p> 黑色 / 85C </p> <a class="frame frame-bg"></a><a class="frame frame-1"></a><a class="frame frame-2"></a><i></i>'
							   + '</div> <div class="num-op"> <a class="minus" href="javascript:;"></a> <input type="text" id="Text12" value="1"><a class="add" href="javascript:;"></a> </div></li>';
                    // 订单商品数量 减去 已经被包装的商品数量
                    var addNum = $(".mode-op .list-item li.current[orderitemid='" + orderitem.itemid + "']").size();
                    $(".mode-view .list-item li[orderitemid='" + orderitem.itemid + "']").each(function() {
                        var num = parseInt($(this).attr('num'));
                        if (!isNaN(num)) {
                            addNum += num;
                        }
                    });
                    var itemnum = orderitem.num - addNum;

                    for (var j = 0; j < itemnum; j++) {
                        var li = $(lihtml).attr('orderitemid', orderitem.itemid);
                        li.find('.pos-box img').attr('src', orderitem.bsrc).attr('ssrc', orderitem.bsrc).next('p').html(orderitem.color + ' / ' + orderitem.size)
						.attr('name', orderitem.name).attr('color', orderitem.color).attr('size', orderitem.size);
                        $(".mode-op .list-item", obj).append(li);
                    }
                }
                $(".mode-box.temp .mode-op").slideDown("slow");
                $(".mode-box.temp .mode-change .close").fadeIn("slow");
                obj.removeClass("temp");
            }
            var hideMode = function(obj) {
                obj.addClass("temp");
                $(".mode-box.temp .mode-op, .mode-box.temp .mode-view").slideUp("slow");
                $(".mode-box.temp .mode-change .close").fadeOut("slow");
                $(".mode-box.temp .mode-change label.show").removeClass("current");
                $(".mode-box.temp .mode-change label.hide").addClass("current");
                obj.removeClass("temp");
            }

            //激活礼品盒选项
            $(".package-add").live('click', function() {    //201308021409
                delBox($(".choose-box"));
                $(".package-add").before($("#innerhtml_choosebox").val());
                $(".choose-box.new").removeClass("new").slideDown("slow").find("label").removeClass("current");
            });
            $(".choose-box h3 .close").live('click', function() { delBox($(this).parents(".choose-box")); });
            //选中礼品盒跳转
            $(".choose-box label").live('click', function() {
                var groupId = new Date().getTime();
                delBox($(this).parents(".choose-box"));
                if ($(this).parents(".choose-box").next(".mode-box").hasClass("edit")) {
                    $(".mode-box.edit").find('.result-box img')
				    .attr('src', $(this).find('.name').attr('simg'))			// 设置包装缩略图地址
				    .next('.name').html($(this).find('.name').html())			// 设置包装名称
				    .next('.price').html($(this).find('.price').html()); 	// 设置包装价格
                    // 包装容纳商品数量, 包装分组ID
                    $(".mode-box.edit").find('.mode-op .op-con')
				    .attr('capacity', $(this).find('.name')
				    .attr('capacity')).attr('groupId', groupId);
                    $(".mode-box.edit").removeclass("edit");
                }
                else {
                    var modebox = $($("#innerhtml_modebox").val());
                    modebox.find('.result-box img')
				    .attr('src', $(this).find('.name').attr('simg'))			// 设置包装缩略图地址
				    .next('.name').html($(this).find('.name').html())			// 设置包装名称
				    .next('.price').html($(this).find('.price').html()); 	// 设置包装价格
                    // 包装容纳商品数量, 包装分组ID
                    modebox.find('.mode-op .op-con')
				    .attr('capacity', $(this).find('.name')
				    .attr('capacity')).attr('groupId', groupId);

                    $(this).parents(".choose-box").after(modebox);
                    $(".mode-box.new label").attr("group", groupId);
                    $(".mode-box.new").removeClass("new").slideDown("slow");
                }
            });
            //关闭包装方式
            $(".mode-box .result-box .op a.close").live('click', function() { delBox($(this).parents(".mode-box")); });
            //更改包装方式
            $(".mode-box .result-box .op a.change").live('click', function() {
                //hideModeBox($(this).parents(".mode-box"));
                $(this).parents(".mode-box").addClass("edit").before($("#innerhtml_choosebox").val());
                $(".choose-box.new").removeClass("new").slideDown("slow").find("label").removeClass("current");
            });
            $(".mode-box .mode-change label").live('click', function() {
                var _parent = $(this).parents(".mode-box");
                if ($(this).hasClass("show")) {
                    // 选项: 帮我包好（价格标签会被剪掉）
                    $(".mode-view", _parent).slideUp("slow");
                    setTimeout(function() {
                        $(".mode-view .list-item", _parent).html('');
                        showMode(_parent);
                    }, 200);
                }
                else {
                    // 选项: 自己包装
                    hideMode($(this).parents(".mode-box"));
                    setTimeout(function() {
                        $(".mode-view .list-item", _parent).html('');
                    }, 400);
                }
            });
            $(".mode-box .mode-change .close, .mode-box .mode-op .op-box a.btn-cancel").live('click', function() {
                hideMode($(this).parents(".mode-box"));
            });
            //选择  201308021404
            var errorTs = function(obj) {
                obj.parents(".op-con").find(".list-item-wrap").siblings("p").find("span").addClass("error").animate({ "opacity": "0.2" }, 300).animate({ "opacity": "1" }, 300).animate({ "opacity": "0.2" }, 300).animate({ "opacity": "1" }, 300);
            }
            var errorClear = function(obj) {
                obj.parents(".op-con").find(".list-item-wrap").siblings("p").find("span").removeClass("error");
            }
            $(".order-page .mode-box .mode-op a.btn-all").live('click', function() {
                if ($(this).siblings(".list-item-wrap").find("li").length > 6) {
                    errorTs($(this));
                    $(this).siblings(".list-item-wrap").find("li").removeClass("current");
                }
            });
            $(".mode-box .mode-op .list-item li .pos-box").live('click', function() {
                if ($(this).parent().hasClass("current")) {
                    $(this).parent().removeClass("current");
                    errorClear($(this));
                }
                else {
                    if ($(this).parents(".list-item").children("li.current").length < 6) {
                        $(this).parent().addClass("current");
                        errorClear($(this));
                    }
                    else { errorTs($(this)); }
                }
            });
            //选择包装完成
            $(".mode-box .mode-op .op-box a.btn-finish").live('click', function() {
                var _parent = $(this).parents('.mode-box').get(0);
                var selectObj = {};
                var index = 0;

                $(this).parents('.op-con').find('.list-item li.current').each(function() {
                    var _self = $(this);
                    var item = {
                        itemid: _self.attr('orderitemid'),
                        name: _self.find('.pos-box p').attr('name'),
                        color: _self.find('.pos-box p').attr('color'),
                        size: _self.find('.pos-box p').attr('size'),
                        src: _self.find('.pos-box img').attr('ssrc'),
                        bsrc: _self.find('.pos-box img').attr('src'),
                        num: 1
                    };
                    if (selectObj[item.itemid]) {
                        item.num += selectObj[item.itemid].num;
                    }
                    selectObj[item.itemid] = item;
                    index++;
                });

                if (index == 0) return; // 没有数据, 直接返回

                var li_html = '<li><img src="images/null.gif" alt="" /><p>N/0件</p></li>';
                $('.mode-view .list-item', _parent).html('');

                for (var key in selectObj) {
                    var item = selectObj[key];
                    var li = $(li_html);
                    li.attr('orderitemid', item.itemid).attr('num', item.num).find('img').attr('src', item.src).attr('alt', item.name + ',' + item.color).next('p').html(item.size + '/' + item.num);
                    $('.mode-view .list-item', _parent).append(li);
                }
                $(".mode-op", _parent).slideUp("slow");
                $(".mode-change .close", _parent).fadeOut("slow");
                $(".mode-view", _parent).slideDown("slow");
                $(".mode-op .list-item", _parent).html('');
            });
        },
        orderstep2: function() {
            //清空文本框
            var inputCheckValue = function(obj) {
                var obj = $(obj);
                obj.each(function() {
                    if ($.trim($(this).val()) != "") {
                        $(this).siblings(".ts-type, .ts-error").fadeOut("slow");
                    }
                });
            }

            //监测地址数量
            if ($(".orderinf-address .value-box li.item").length < 2) {
                $(".orderinf-address .value-box .show-address").slideDown("slow").find(".close").hide();
            }

            //地址选中背景色，打开下拉窗口
            $("li.item label").live('click', function() {
                $(this).parents("ul.value-address").find("li.item").removeClass("current");
                $(this).parent().addClass("current");
                if ($(this).hasClass("add")) {
                    $(this).parent().siblings(".show-address").slideDown("slow").find(".close").hide();
                    inputCheckValue(".form-input input");
                }
                else {
                    $(this).parent().siblings(".show-address").slideUp("slow").find(".close").show(); ;
                }
            });
            //修改删除地址
            $(".orderinf-con .value-address li .op a").live('click', function() {
                var that = $(this);
                var _index = $(this).parent().parent().index();
                var bindDel = function(group) {
                    $("label[group=" + group + "]").parent("li").eq(_index).animate({ "opacity": "0" }, 1000, function() { $("label[group=" + group + "]").parent("li").eq(_index).remove(); });
                }
                if ($(this).hasClass("btn-edit")) {
                    var _index = $(this).parent().parent("li").index();
                    $(this).parent().parent("li").addClass("edit").siblings(".show-address").slideDown("slow");
                    $(".orderinf-con .show-address-2 li").eq(_index).addClass("edit");
                    inputCheckValue(".form-input input");
                }
                else {
                    $(".show-div-alert .show-con .op-box a").click(function() {
                        if ($(this).hasClass("btn-confirm")) {
                            that.parent().parent("li").addClass("item-del").animate({ "opacity": "0" }, 1000, function() { $(".item-del").remove(); });
                            if (that.parent(".op").siblings("label").attr("group") == "address") {
                                bindDel("address2");
                            }
                            else {
                                bindDel("address");
                            }
                            if (that.parent().parent().parent("ul").find(".item").length < 3) {
                                that.parent(".op").siblings("label").removeClass("current").parents("ul").children(".item").removeClass("current").last().addClass("current").children("label").addClass("current");
                                that.parents(".value-address").find(".show-address").slideDown("slow").find(".close").hide();
                            }
                            else {
                                that.parents(".value-address").find(".show-address").slideUp("slow");
                            }
                        }
                        mshow.boxHide();
                    });
                }
            });
            //关闭下拉
            $(".orderinf-address .show-address h4 .close").live('click', function() {
                if (!$(this).parents("ul").find("label.add").hasClass("current")) {
                    $(this).parents("li").slideUp("slow");
                }
            });
            //发票地址切换
            $(".orderinf-con .value-address label").live('click', function() {
                if (!$(this).hasClass("add")) {
                    if ($(this).parents(".value-address").hasClass("show-address-2")) {
                        $(".orderinf-invoice .txt-box .inf span").html($.trim($(this).find("span.inf").html()));
                    }
                }
            });
            //保存地址
            $(".orderinf-con .show-address .btn-save").live('click', function() {
                var province = $.trim($(this).parents(".show-address").find(".province").text());
                var city = $.trim($(this).parents(".show-address").find(".city").text());
                var area = $.trim($(this).parents(".show-address").find(".area").text());
                var street = $.trim($(this).parents(".show-address").find(".street").val());
                var zipcode = $.trim($(this).parents(".show-address").find(".zipcode").val());
                var username = $.trim($(this).parents(".show-address").find(".username").val());
                var telephone = $.trim($(this).parents(".show-address").find(".telephone").val());
                var _html = '<span class="inf">' + province + '&nbsp;' + city + '&nbsp;' + area + '&nbsp;&nbsp;' + street + '&nbsp;&nbsp;' + zipcode + '&nbsp;&nbsp;&nbsp;&nbsp;' + username + '（收）&nbsp;&nbsp;' + telephone + '</span>';
                var addCurrentCheck = "";
                if ($(this).parents(".value-address").find("label.add").hasClass("current")) {
                    if ($(this).parents(".value-address").hasClass("show-address-1")) {
                        $(".orderinf-con .value-address li, .orderinf-con .value-address li label").removeClass("current");
                        addCurrentCheck = "current "
                    }
                    $(".orderinf-con .show-address-1 label.add").parent("li").before('<li class="item ' + addCurrentCheck + 'clearfix">' +
                                                                                         '<label group="address" class="' + addCurrentCheck + 'clearfix">' +
                                                                                              '<i></i>' + _html +
                                                                                         '</label>' +
                                                                                         '<div class="op">' +
                                                                                             '<a href="javascript:;" class="btn-edit">修改</a><a href="javascript:;" class="btn-del show-myshowbox2 show-alert">删除</a>' +
                                                                                         '</div>' +
                                                                                     '</li>');
                    $(".orderinf-con .show-address-2 label.add").parent("li").before('<li class="item ' + addCurrentCheck + 'clearfix">' +
                                                                                         '<label group="address2" class="' + addCurrentCheck + 'clearfix">' +
                                                                                              '<i></i>' + _html +
                                                                                         '</label>' +
                                                                                     '</li>');
                    if ($(this).parents(".value-address").hasClass("show-address-2")) {
                        $(".orderinf-invoice .txt-box .inf span").html(_html);
                        $(this).parents(".show-address-2").find("label.add").removeClass("current").parent("li").removeClass("current").prev("li").addClass("current").children("label").addClass("current");
                    }
                }
                else {
                    $(".orderinf-con .show-address-1").find("li.edit").removeClass("edit").html('<label group="address" class="current clearfix">' +
                                                                                                     '<i></i>' + _html +
                                                                                               '</label>' +
                                                                                               '<div class="op">' +
                                                                                                   '<a href="javascript:;" class="btn-edit">修改</a><a href="javascript:;" class="btn-del show-myshowbox2 show-alert">删除</a>' +
                                                                                               '</div>');
                    var editCurrentCheck = $(".orderinf-con .show-address-2").find("li.edit").hasClass("current") ? "current " : "";
                    $(".orderinf-con .show-address-2").find("li.edit").removeClass("edit").html('<label group="address2" class= ' + editCurrentCheck + ' "clearfix">' +
                                                                                                     '<i></i>' + _html +
                                                                                               '</label>');
                }
                $(".orderinf-con .value-address .show-address").slideUp("slow");
            })
            //清除label选中
            var labelFormat = function(obj) {
                obj.parents("ul").find("label").removeClass("current");
            }
            //关闭下拉
            var payOnlineHide = function() {
                $(".orderinf-pay .show-pay").slideUp("slow").siblings(".op-box").slideDown("slow");
            }
            var payHdfkHide = function() {
                $(".orderinf-pay .show-address").slideUp("slow");
            }
            //支付方式下拉窗口
            $(".orderinf-pay .op-box a.more").click(function() {
                labelFormat($(this));
                $(this).parent(".op-box").slideUp("slow").siblings(".show-pay").slideDown("slow").siblings("label").addClass("current");
                payHdfkHide();
            });

            $(".orderinf-pay h4 .close").click(function() { payOnlineHide(); })
            //切换
            $(".orderinf-pay label").click(function() {
                if ($(this).hasClass("online")) {
                    payHdfkHide();
                }
                else if ($(this).hasClass("hdfk")) { payOnlineHide(); }
            });
            //配送区域下拉框
            $(".orderinf-pay a.area").click(function() {
                labelFormat($(this));
                payOnlineHide();
                $(this).parents("ul").find(".show-address").slideDown("slow");
                $(this).parents("ul").find("label.hdfk").addClass("current");
            });
            //发票下拉
            $(".orderinf-invoice label").live('click', function() {
                if ($(this).hasClass("yes")) {
                    $(this).parents("ul").find(".show-invoice").slideDown("slow");
                    lascna.inputCheckValue(".form-input input");
                }
                else if ($(this).hasClass("no")) {
                    $(this).parents("ul").find(".show-invoice").slideUp("slow").siblings(".show-address").slideUp("slow");
                }
                else {
                    if ($(this).parent("li").hasClass("item") && (!$(this).hasClass("add"))) {
                        $(this).parents(".show-address").slideUp("slow");
                    }
                }
            });
            //修改地址下拉
            $(".orderinf-invoice a.edit").live('click', function() {
                $(this).parents("ul").children(".show-address").slideDown("slow");
                lascna.inputCheckValue(".form-input input");
            });
            //发票地址选中背景色，打开下拉窗口
            $(".show-address li label").live('click', function() {
                if ($(this).hasClass("add")) {
                    $(this).parent().siblings(".show-address").slideDown("slow").find(".close").hide();
                    lascna.inputCheckValue(".form-input input");
                }
                else {
                    $(this).parent().siblings(".show-address").slideUp("slow").find(".close").show(); ;
                }
            });
            //关闭下拉
            $(".show-address .show-address h4 .close, .show-address .show-address .btn-save").click(function() {
                if (!$(this).parents(".show-address-2").find("label.add").hasClass("current")) {
                    $(this).parents(".show-address-2").children(".show-address").slideUp("slow");
                }
            });
        },
        orderstep3: function() {
            //打开其他银行下拉
            $(".orderinf-pay2 .op-box a.more").click(function() {
                $(this).parent().siblings(".show-pay").slideDown("slow");
            });
        }
    }
    return orderFun;
})(jQuery);
// 201308021404 201308021409