(function ($) {
    var nid = 0,
        uid = 0;

    $.widget('ui.BaseEditor', {
        options : {
            value : 0
        },
        _create : function () {
            this.widgetEventPrefix = 'editor';
            this.options.value = this._formatValue(this.options.value);
            this.element.data('widgetName', this.widgetFullName).addClass('editor');
        },
        _destroy : function () {
            this.element
                .removeClass('editor')
                .removeData();
        },
        _getName : function () {
            return this.widgetName + 'Name' + (nid++);
        },
        _getUID : function () {
            return this.widgetName + 'UID' + (uid++);
        },
        _formatValue : function (v) {
            return v;
        },
        setValue : function (v) {
            if (!this.options.disabled) {
                var v = this._formatValue(v);
                this._setValue && this._setValue(v);
            }
        },
        getValue : function () {
            return this._getValue();
        }
    });
})(jQuery);