(function($) {
    $.fn.VMiddleImg = function(options) {
        var defaults = {
            "width": null,
            "height": null
        };
        var opts = $.extend({}, defaults, options);
        return $(this).each(function() {
            var $this = $(this);
            var objHeight = $this.height();
            var objWidth = $this.width();
            var parentHeight = opts.height || $this.parent().height();
            var parentWidth = opts.width || $this.parent().width();
            var ratio = objHeight / objWidth;
            if (objHeight > parentHeight && objWidth > parentWidth) {
                if (objHeight > objWidth) {
                    $this.width(parentWidth);
                    $this.height(parentWidth * ratio);
                } else {
                    $this.height(parentHeight);
                    $this.width(parentHeight / ratio);
                }
                objHeight = $this.height();
                objWidth = $this.width();
                if (objHeight > objWidth) {
                    $this.css("top", (parentHeight - objHeight) / 2);
                } else {
                    $this.css("left", (parentWidth - objWidth) / 2);
                }
            }
            else {
                if (objWidth > parentWidth) {
                    $this.css("left", (parentWidth - objWidth) / 2);
                }
                $this.css("top", (parentHeight - objHeight) / 2);
            }
        });
    };
})(jQuery);