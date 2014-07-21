(function ($) {
    $.widget('ui.splitbutton', {
        options : {
            menu : [
                {text : '输入框', value : 'input'},
                {text : '文本框', value : 'textarea'},
                {text : '单选框', value : 'radio'},
                {text : '多选框', value : 'checkbox'}
            ],
            buttonText : '添加...',
            value : 'input'
        },
        _create : function () {
            var me = this;

            this.widgetEventPrefix = 'splitbutton';

            var menu = this._menu = $(this._getMenuHTML())
                .appendTo($('body'))
                .menu({
                    select : function (e, ui) {
                        mainbtn.attr('data-index', parseInt($(ui.item).attr('data-index'), 10));
                        me._trigger('change', e, {
                            value : me._getValue(),
                            item : me.getItem()
                        });
                    }
                }).hide();

            var mainbtn = this._mainbtn =  $('<button>' + this.options.buttonText + '</button>')
                .addClass('ui-splitbutton-main')
                .appendTo(this.element)
                .click(function (e) {
                    me._trigger('change', e, {
                        value : me._getValue(),
                        item : me.getItem()
                    });
                });

            var splitbtn = this._splitbtn = $('<button><i class="icon-chevron-down"></i></button>')
                .addClass('ui-splitbutton-split')
                .appendTo(this.element)
                .click(function (e) {
                    $(this).addClass('ui-state-active');
                    menu.show().position({
                        my: "left top",
                        at: "left bottom",
                        of: $(this).prev()
                    });
                    $(document).one("click", function() {
                        splitbtn.removeClass('ui-state-active');
                        menu.hide();
                    });
                    return false;
                });

            this.element.buttonset();

            this._setValue(this.options.value);
        },
        _destroy : function () {
            this._mainbtn.unbind();
            this._splitbtn.unbind();
            this._menu.remove();
            this._mainbtn = this._splitbtn = this._menu = null;
        },
        _getIndexByValue : function (v) {
            var r = -1;
            $.each(this.options.menu, function (i, item) {
                if (item.value === v) {
                    r = i;
                    return false;
                }
            });
            return r;
        },
        _getMenuHTML : function () {
            var html = [];
            $.each(this.options.menu, function (i, item) {
                html.push('<li data-index="' + i + '"><a href="javascript:void(0);">' + item.text + '</a></li>');
            });
            return '<ul class="ui-splitbutton-menu">' + html.join('') + '</ul>';
        },
        _setValue : function (v) {
            var index = this._getIndexByValue(v);
            index = (index === -1 ? 0 : index);
            this._mainbtn.attr('data-index', index);
            this.options.value = this.options.menu[index].value;
        },
        _getValue : function () {
            return this.getItem().value;
        },
        getItem : function () {
            return this.options.menu[parseInt(this._mainbtn.attr('data-index'), 10)]
        }
    });
})(jQuery);