(function ($) {
    $.extend({
        'centerImage' : function (w, h, maxW, maxH) {
            maxW = maxW || 80;
            maxH = maxH || 60;
            if(w < maxW && h < maxH){
                return {'w' : w, 'h' : h, 'wp' : ((maxW - w) / 2), 'hp' : ((maxH - h) / 2) };
            }
            var tw = Math.floor(maxH * w / h),
                th = Math.floor(maxW * h / w),
                hpadding = 0,
                wpadding = 0;
            tw < maxW ? (th = maxH) : (tw = maxW); 
            tw < maxW ? (wpadding = (maxW - tw) / 2) : (wpadding = 0);
            th < maxH ? (hpadding = (maxH - th) / 2) : (hpadding = 0);
            return {'w' : tw, 'h' : th, 'wp' : wpadding, 'hp' : hpadding};
        },
        'imageScaleAsync' : function (src, maxW, maxH, cb) {
            var img = new Image(),
                w,
                h;
            img.onload = function () {
                w = img.width > maxW ? maxW : img.width;
                h = w * img.height / img.width;

                if (h > maxH) {
                    h = maxH;
                    w = h * img.height / img.width;
                }
                cb(src, w, h);
            };
            img.src = src;
        },
        'imageScale' : function (width, height, maxW, maxH) {
            var w = width > maxW ? maxW : width,
                h = w * height / width;

            if (h > maxH) {
                h = maxH;
                w = h * height / width;
            }
            return {width : w, height : h};
        }
    });
})(jQuery);