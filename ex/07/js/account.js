var account = (function($) {
    var accountFun = {
        delObjFade: function(obj, callback) {
            obj.animate({ "opacity": "0" }, 1000, function() {
                obj.remove();
                if ($.trim(callback) != "") {
                    callback();
                }
            });
        },
        delObjSlide: function(obj, callback) {
            obj.animate({ "height": "0", "opacity": "0" }, 1000, function() {
                obj.remove();
                if ($.trim(callback) != "") {
                    callback();
                }
            });
        },
        pageMy: function() {
            //尺寸数据初始化&同步
            $(".account-my .form-size .form-input input").each(function() {
                $(this).val($.trim($(this).siblings("p").text()));
            }).blur(function() {
                if ($.trim($(this).val()) == "") {
                    $(this).val($.trim($(this).siblings("p").text()));
                }
                else {
                    $(this).siblings("p").text($.trim($(this).val()));
                }
            });
            //尺寸编辑按钮
            $(".account-main h3.title-1 a.btn-edit").click(function() {
                if ($(this).hasClass("current")) {
                    $(".account-my .form-size").removeClass("current");
                    $(this).parents(".account-my").find("ul.form-size p").show();
                }
                else {
                    $(".account-my .form-size").addClass("current");
                    $(this).parents(".account-my").find("ul.form-size p").hide();
                }
            });
        },
        pageOrder: function() {
            //删除收藏
            $(".account-favorit .list-order-con li.op a.btn-del").click(function() {
                accountFun.delObjSlide($(this).parents("ul.list-order-con"));
            })
        },
        pageAddress: function() {
            //地址序号
            var listNum = function() {
                $(".list-address").each(function(i) {
                    $(this).find("h3 span.txt span").text(i + 1);
                });
            }
            listNum();
            //默认地址切换
            $(".list-address h3 a.btn-default").live('click', function() {
                $(this).parents(".list-address").addClass("default").siblings(".list-address").removeClass("default");
            });
            //删除地址
            $(".op-box a.btn-del").live('click', function() {
                var callback = function() {
                    listNum();
                }
                accountFun.delObjSlide($(this).parents(".list-address"), callback);
            })
            //编辑地址
            $(".op-box a.btn-edit").live('click', function() {
                $(this).parents(".op-box").slideUp("slow").siblings(".show-address").slideDown("slow");
                lascna.inputCheckValue(".form-input input");
            })
            //保存&关闭地址
            $(".show-address h4 .close, .show-address .btn-save").live('click', function() {
                //地址修改
                if ($(this).hasClass("btn-save")) {
                    var _parent = $(this).parents(".show-address");
                    _parent.siblings(".list-view-wrap").find(".provinces").text($.trim(_parent.find(".provinces").text()))
                                                       .siblings(".city").text($.trim(_parent.find(".provinces").text()))
                                                       .siblings(".area").text($.trim(_parent.find(".area").text()));
                    _parent.siblings(".list-view-wrap").find(".address").text($.trim(_parent.find(".address").val()));
                    _parent.siblings(".list-view-wrap").find(".name").text($.trim(_parent.find(".name").val()));
                    _parent.siblings(".list-view-wrap").find(".telephone").text($.trim(_parent.find(".telephone").val()));
                    _parent.siblings(".list-view-wrap").find(".zipcode").text($.trim(_parent.find(".zipcode").val()));
                    if ($(this).parents(".list-address").hasClass("new")) {
                        $(this).parents(".list-address").removeClass("new");
                    }
                }
                else {
                    if ($(this).parents(".list-address").hasClass("new")) {
                        accountFun.delObjSlide($(this).parents(".list-address"));
                    }
                }
                $(this).parents(".show-address").slideUp("slow").siblings(".list-view-wrap, .op-box").slideDown("slow");
            });
            //添加新地址
            $(".account-address .btn-add").click(function() {
                $(this).before($.trim($("#innerhtml_address").val()));
                $(".list-address.new").find(".list-view-wrap, .op-box").hide().siblings(".show-address").show();
                $(".list-address.new").slideDown("slow");
                listNum();
            });
        },
        pagePersonal: function() {
            //验证邮件
            $(".list-form a.btn-verc").click(function() {
                $(".verc-box").show().siblings(".link-box").hide();
                $(this).parents(".list-form").find(".show-verc").fadeIn("slow");
            });
            //弹出框验证跳转
            $(".list-form .show-verc a.btn-email").click(function() {
                $(this).parents(".verc-box").hide().siblings(".link-box").show();
            })
            //关闭弹出
            $(".show-verc a.close").click(function() {
                $(this).parents(".show-verc").fadeOut("slow");
            })
        }
    }
    return accountFun;
})(jQuery);