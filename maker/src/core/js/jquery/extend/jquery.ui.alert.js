(function ($) {
    $.extend({
        'alert' : function (message, ok) {
            var id = '__GLOBAL_ALERT_DIALOG__',
                dialog = $('#' + id);
            if (!dialog.get(0)) {
                dialog = $('<div id="' + id + '">')
                    .html('<div class="message"></div>')
                    .appendTo($('body'))
                    .dialog({
                        title : '提示',
                        autoOpen : false,
                        modal : true,
                        resizable : false,
                        buttons : [
                            { 
                                'text' : '好',
                                'click' : function () {
                                    dialog.dialog('close');
                                    ok && ok();
                                },
                                'class': 'ui-state-em'
                            }
                        ]
                    });
            }
            $('.message', dialog).html(message);
            dialog.dialog('open');
        },
        'confirm' : function (message, ok, cancel) {
            var id = '__GLOBAL_CONFIRM_DIALOG__',
                dialog = $('#' + id);
            if (!dialog.get(0)) {
                dialog = $('<div id="' + id + '">')
                    .html('<div class="message"></div>')
                    .appendTo($('body'))
                    .dialog({
                        title : '确认',
                        autoOpen : false,
                        modal : true,
                        resizable : false,
                        buttons : [
                            { 
                                'text' : '取消',
                                'click' : function () {
                                    dialog.dialog('close');
                                    cancel && cancel();
                                }
                            },
                            { 
                                'text' : '好',
                                'click' : function () {
                                    dialog.dialog('close');
                                    ok && ok();
                                },
                                'class': 'ui-state-em'
                            }
                        ]
                    });
            }
            $('.message', dialog).html(message);
            dialog.dialog('open');
        }
    });
})(jQuery);