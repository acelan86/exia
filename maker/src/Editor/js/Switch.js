(function ($) {
    $.widget('ui.SwitchEditor', $.ui.BaseEditor, {
        options : {
            value : false
        },
        _create : function () {
            var me = this,
                options = this.options;

            $.ui.BaseEditor.prototype._create.call(this, options);

            this.editor = $(
                    '<select>' +
                        '<option value="off">Off</option>' +
                        '<option value="on">On</option>' +
                    '</select>'
                )
                .val(options.value ? 'on' : 'off')
                .attr('disabled', !!options.disabled)
                .appendTo(this.element)
                .flipswitch({
                    change : $.proxy(this._changeHandler, this)
                });
        },
        _changeHandler : function (e, ui) {
            this._trigger('change', e, ui);
        },
        _destroy : function () {
            $.ui.BaseEditor.prototype._destroy.call(this);
        },

        _setOption : function (k, v) {
            $.ui.BaseEditor.prototype._setOption.call(this, k, v);

            if (k === 'disabled') {
                this.editor.attr('disabled', v);
            }
        },
        _setValue : function (v) { 
            this.editor.val(this.options.value = v ? 'On' : 'Off');
        },
        _getValue : function () {
            return this.editor.val() === 'On' ? true : false;
        }
    });
})(jQuery);