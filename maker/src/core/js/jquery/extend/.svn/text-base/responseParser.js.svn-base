(function ($) {
    $.extend({
        'responseParser' : function (data, success, fail) {
            switch (data.status) {
                case 0 : 
                    success && success(data.data, data);
                    break;
                case 1 : 
                    fail && fail(data.statusInfo, data);
                    break;
                case 2 : 
                    pandora.tipBox.show((data.statusInfo && data.statusInfo.global) || '未知错误，请重试', 2);
                    fail && fail(data.statusInfo, data);
                    break;
                case 126 :
                    pandora.tipBox.show('您没有此操作权限，请您使用更高权限的账号登录', 1); 
                    break;
                case 127 : 
                    pandora.tipBox.show('您尚未登录，请登录后请重新执行操作。', 1);
                    pandora.loginBox.open();
                    break;
                default : break;
            }
        }
    });
})(jQuery);