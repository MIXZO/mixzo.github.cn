var page = (function($) {
    var pageFun = {
        pageLogin: { //login
            posBox: function() { //表单窗口定位
                var obj = $('.form-box-wrap');
                obj.stop().animate({
                    'top': ($.ZScreenHeight() - obj.outerHeight(true)) / 2,
                    'opacity': 1
                }, 1000);
            }
        }
    }

    return pageFun;
})(jQuery)