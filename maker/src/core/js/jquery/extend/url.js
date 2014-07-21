(function ($) {
    $.extend({
        getPar : function (key) { 
            var s = window.location.search.substring(1).split("&"),
                _s,
                i = 0;
            while (_s = s[i++]) {
                _s = _s.split('=');
                if (_s[0] === key) {
                    return _s[1];
                }
            }
            return null;
        }
    });
})(jQuery);