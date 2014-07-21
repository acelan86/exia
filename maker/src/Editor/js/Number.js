/**
 * 数字输入框
 * @return {[type]} [description]
 *
 * Event =========
 * change
 *
 * Method ========
 * getValue()
 * setValue(v)
 */
(function ($) {
    $.widget('ui.NumberEditor', $.ui.BaseEditor, {
        options : {
            value : 0
        },
        _create : function () {
            var me = this,
                options = this.options;

            $.ui.BaseEditor.prototype._create.call(this, options);

            this.editor = $('<input/>')
                .attr({type : 'text'})
                .addClass('ui-input')
                .val(this.options.value)
                .width(options.width)
                .blur(function (e) {
                    var value = me._getValue();
                    if (options.value !== value) {
                        me._trigger('change', e, {value : options.value = value});
                    }
                });

            this.element.
                addClass('number-editor').
                append(this.editor).
                keydown(function (e) {
                    if(!me.disabled) {
                        var value = me._getValue();
                        if (e.which == 13 && options.value !== value) {
                            me._trigger('change', e, {value : options.value = value});
                        }
                    }
                });

            this.editor.spinner({
                min : this.options.min,
                max : this.options.max,
                spin : function (e, ui) {
                    if (options.value !== ui.value) {
                        me._trigger('change', e, {value : options.value = ui.value});
                    }
                }
            });

            this._setOption('disabled', options.disabled);
        },
        _destroy : function () {
            this.element.removeClass('number-editor');
            this.editor.unbind('blur');
            this.element.unbind('keydown');
            $.ui.BaseEditor.prototype._destroy.call(this);
        },

        _setOption : function (k, v) {
            $.ui.BaseEditor.prototype._setOption.call(this, k, v);

            if (k === 'disabled') {
                this.editor.attr('disabled', v);
            }
        },
        _formatValue : function (v) {
            return parseInt(v, 10) || 0;
        },
        _setValue : function (v) { 
            this.editor.val(this.options.value = v);
        },
        _getValue : function () {
            return this._formatValue(this.editor.val());
        }
    });
})(jQuery);