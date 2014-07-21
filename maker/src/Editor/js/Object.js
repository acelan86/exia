(function ($) {
    var ITEM_CLASS = 'object-editor-item',
        BLOCK_CLASS = 'object-editor-block',
        PANEL_CLASS = 'object-editor-panel';

    $.widget('ui.ObjectEditor', $.ui.BaseEditor, {
        options : {
            value : {},
            map : {}
        },
        _create : function () {
            var me = this,
                options = this.options,
                map = options.map,
                value = options.value;

            $.ui.BaseEditor.prototype._create.call(this, options);


            this.element
                .addClass('object-editor')
                .append($('<div class="' + PANEL_CLASS + '"><div class="editor-panel-arrow">\u25C6</div><div class="editor-panel-content"></div></div>'));

            this.editor = $('.editor-panel-content', this.element);

            this._on(this.editor, function () {
                var h = {};
                h['editorchange .' + ITEM_CLASS] = function (e, data) {
                    var r = this._copy();
                    var el = $(e.currentTarget),
                        pn = el.attr('data-pn');

                    r[pn] = data.value;

                    this._trigger('change', e, {value : this.options.value = r});
                    e.stopPropagation();
                };
                return h;
            }());

            this._setValue(this.options.value);
        },
        _destroy : function () {
            this.element.removeClass('object-editor');
            $.ui.BaseEditor.prototype._destroy.call(this);
        },
        _copy : function () {
            return $.extend({}, this.options.value);
        },
        _setValue : function (v) {
            var map = this.options.map,
                html = [];

            this._remove();
            for(var k in map) {
                map[k].value = v[k];
                html.push('<tr><th><nobr>' + map[k].label + '</nobr></th><td><div data-pn="' + k + '" class="' + ITEM_CLASS + '"></div></td></tr>');
            }
            this.editor.append($('<table>' + html.join('') + '</table>'));
            
            $('.' + ITEM_CLASS, this.editor).each(function (i, item) {
                var $item = $(item),
                    k = $item.attr('data-pn');
                $item[$.upperCaseFirst(map[k].type) + 'Editor'](map[k]);
            });

            this.options.value = v;
        },
        _getValue : function () {
            return this.option.value;
        },
        _remove : function () {
            $('.editor', this.editor).remove();
        }
    });
})(jQuery);