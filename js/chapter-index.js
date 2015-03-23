var chapterIndex = (function($) {
    var chapterIndexFun = {
        jumpEffect: function() {
            var obj = $('.step-index');
            obj.find('.item').click(function() {
                var that = $(this);
                var _w = that.width();
                var _h = that.height();
                that.transition({
                    'scale': '2',
                    'top': '50%',
                    'left': '50%',
                    'margin': '-' + _h / 2 + 'px 0 0 -' + _w / 2 + 'px'
                }, 2000, function() {
                    setTimeout(function() {
                        that.find('a').transition({
                            'color': '#fff'
                        }, 1500).parents('.inner-box').transition({
                            'background-color': '#000'
                        }, 1500);
                        setTimeout(function() {
                            that.find('a').transition({
                                'text-shadow': '0 0 30px #fff'
                            }, 2000);
                        }, 2000);
                        setTimeout(function() {
                            that.fadeOut(2000, function() {
                                setTimeout(function() {
                                    window.location.href = that.find('a').attr('data-link');
                                }, 1000);
                            });
                        }, 5000);
                    }, 1000);
                }).siblings('.item').fadeOut(1000);
            });
        }
    }
    chapterIndexFun.jumpEffect();
    return chapterIndexFun;
})(jQuery)