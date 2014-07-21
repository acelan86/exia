(function ($) {
    $.widget('ui.formdialog', {
        _create : function () {
            var me = this,
                options = this.options;

            this.widgetEventPrefix = 'formdialog';

            this.form = $('form', this.element)
                .append('<input style="position:absolute;top:-1000px" type="submit" value="登录"/>')
                .submit(function (e) {
                    e.preventDefault();
                    var array = $(this).serializeArray(),
                        data = {};
                    $.each(array, function (i, item) {
                        if (data[item.name]) {
                            if (data[item.name] instanceof Array) {
                                data[item.name].push(item.value);
                            } else {
                                data[item.name] = [v, item.value];
                            }
                        } else {
                            data[item.name] = item.value;
                        }
                    });
                    me._trigger('ok', null, data);
                    me.element.dialog('close');
                });

            this.element
                .data('widgetName', this.widgetFullName)
                .dialog({
                    autoOpen : false,
                    modal : true,
                    resizable : false,
                    width : options.width || 300,
                    buttons : [
                        { 
                            text : '确定',
                            click : function () {
                                me.form.submit();
                            },
                            'class' : 'ui-state-em'
                        },
                        {
                            text : '取消',
                            click : function (e) {
                                $(this).dialog('close');
                            }
                        }
                    ]
                });
        },
        _destroy : function () {
            this.form.unbind().remove();
        },
        open : function () {
            this.form[0].reset();
            this._trigger('open', null);
            this.element.dialog('open');
        }
    });
})(jQuery);