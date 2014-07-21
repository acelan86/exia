(function ($) {
    $.widget('ui.TextEditor', $.ui.BaseEditor, {
        options : {
            value : ''
        },
        _create : function () {
            var me = this, 
                options = this.options;

            $.ui.BaseEditor.prototype._create.call(this, options);
            this.element.
                addClass('text-editor').
                append(
                    this.editor = $('<textarea>').val(this.options.value).width(options.width)
                ).
                keyup($.proxy(this._keyupHandler, this));

            this._setOption('disabled', options.disabled);
        },

        _keyupHandler : function (e) {
            var value = this._getValue();
            if (this.options.value !== value) {
                this._trigger('change', e, {value : this.options.value = value});
            }
        },

        _setOption : function (k, v) {
            $.ui.BaseEditor.prototype._setOption.call(this, k, v);

            if (k === 'disabled') {
                this.editor.attr('disabled', v);
            }
        },

        _formatValue : function (v) {
            return v + '';
        },
        _setValue : function (v) { 
            this.editor.val(this.options.value = v);
        },
        _getValue : function () {
            return this._formatValue(this.editor.val());
        },
        _destroy : function () {
            this.element.removeClass('text-editor');
            this.element.unbind('keyup', this._keyupHandler);
        }
    });
})(jQuery);