(function ($) {
    $.widget('UI.Editor.StringEditor', $.pandora.BaseEditor, {
        options : {
            value : ''
        },
        _create : function () {
            var options = this.options;

            $.pandora.BaseEditor.prototype._create.call(this, options);

            this.editor = $('<input/>')
                .attr({type : 'text'})
                .addClass('ui-input')
                .val(this.options.value)
                .width(options.width)
                .blur($.proxy(this._blurHandler, this));

            this.element.
                addClass('string-editor').
                append(this.editor).
                keyup($.proxy(this._keyupHandler, this));

            this._setOption('disabled', options.disabled);
        },
        _blurHandler : function (e) {
            var value = this._getValue();
            if (this.options.value !== value) {
                this._trigger('change', e, {value : this.options.value = value});
            }
        },
        _keyupHandler : function (e) {
            if (!this.options.disabled) {
                if (e.which == 13) {
                    var value = this._getValue();
                    if (this.options.value !== value) {
                        this._trigger('change', e, {value : this.options.value = value});
                    }
                    e.target.blur();
                }
            }
        },
        _setOption : function (k, v) {
            $.pandora.BaseEditor.prototype._setOption.call(this, k, v);

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
            this.element.removeClass('string-editor');
            this.editor.unbind('blur', this._blurHandler);
            this.element.unbind('keyup', this._keyupHandler);
            $.pandora.BaseEditor.prototype._destroy.call(this);
        }
    });
})(jQuery);
