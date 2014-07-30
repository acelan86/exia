(function($) {
    $.widget('ui.SelectEditor', $.ui.BaseEditor, {
        options : {
            value : 0,
            datasource : []
        },
        _create : function () {
            var options = this.options;

            $.ui.BaseEditor.prototype._create.call(this, options);

            this.element.html(this._getMainHTML());
            this.editor = this.element.children('select').selectmenu({
                width : options.width,
                menuWidth : options.menuWidth,
                format : options.format,
                change : $.proxy(this._changeHandler, this)
            });

            this._setOption('disabled', options.disabled);
        },
        _changeHandler : function (e, ui) {
            console.log('change');
            this._trigger('change', e, {value : this.options.value = this._formatValue(ui.item.value)});
        },
        _destroy : function () {
            $.ui.BaseEditor.prototype._destroy.call(this);
        },
        _getMainHTML : function () {
            var me = this,
                html = [],
                ds = this.options.datasource;

            $.each(ds, function (i, item) {
                var selected = (item.value == me.options.value ? 'selected="selected" ' : '');
                html.push('<option ' + selected + 'value="' + item.value + '">' + item.name + '</option>');
            });

            return '<select name="' + (this.options.name || this._getName()) + '" value="' + this.options.value + '">' + html.join('') + '</select>';
        },

        _setOption : function (k, v) {
            $.ui.BaseEditor.prototype._setOption.call(this, k, v);
            if (k === 'disabled') {
                this.editor.selectmenu(v ? 'disable' : 'enable');
            }
        },

        _formatValue : function (v) {
            return v + '';
        },
        _setValue : function (v) {
            //@TODO 这里不能添加没有的值
            var inOptions = false,
                me = this,
                value = this._formatValue(v);
            $.each(this.options.datasource, function (i, item) {
                if (me._formatValue(item.value) === value) {
                    inOptions = true;
                    return false;
                }
            });
            inOptions && this.editor.selectmenu('value', this.options.value = value);
            return inOptions;
        },
        _getValue : function () {
            return this._formatValue(this.editor.selectmenu('value'));
        }
    })
})(jQuery);