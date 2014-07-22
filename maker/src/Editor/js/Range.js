(function ($) {
    $.widget('ui.RangeEditor', $.ui.BaseEditor, {
        options : {
            value : 0,
            min : 0,
            max : 100,
            format : function (v) {
                return v;
            }
        },
        _create : function () {
            var options = this.options;

            $.ui.BaseEditor.prototype._create.call(this, options);

            this.slider = $('<div class="range-editor-slider"/>')
                .appendTo(this.element)
                .slider({
                    min : options.min,
                    max : options.max,
                    value : options.value,
                    //orientation : 'vertical',
                    change : $.proxy(this._changeHandler, this),
                    slide : $.proxy(this._slideHandler, this)
                });

            this.editor = $('<span style="display:none;padding:0px 6px;line-height:20px;">').html(options.value).appendTo(this.element);

            this.element.addClass('range-editor');

            this._setOption('disabled', options.disabled);
        },
        _slideHandler : function (e, ui) {
            this.editor.html(ui.value);
        },

        _changeHandler : function (e, ui) {
            this._trigger('change', e, {value : this.options.value = ui.value});
        },

        _destroy : function () {
            this.element.removeClass('range-editor');
            $.ui.BaseEditor.prototype._destroy.call(this);
        },

        _setOption : function (k, v) {
            $.ui.BaseEditor.prototype._setOption.call(this, k, v);
            if (k === 'disabled') {
                this.slider.slider('option', 'disabled', v);
            }
        },
        _formatValue : function (v) {
            //return $.isFunction(this.options.format) ? this.options.format(v) : v;
            return parseInt(v, 10);
        },
        _getValue : function () {
            return this._formatValue(this.editor.val());
        },
        _setValue : function (v) {
            this.editor.val(this.options.value = v);
        }
    });

})(jQuery);