(function ($) {

    var ITEM_CLASS = 'object-array-editor-item',
        BLOCK_CLASS = 'object-array-editor-block',
        PANEL_CLASS = 'object-array-editor-panel',
        uid = 0;

    $.widget('ui.ObjectArrayEditor', $.ui.BaseEditor, {
        options : {
            value : [],
            map : {},
            max : 10,                   //最大条数
            min : 1,                    //最小条数
            itemHeader : '',            //每个条目的title
            buttonText : ' + 添加一项',  //添加按钮文字
            onitemselect : $.noop
        },

        add : function (e) {
            var r = this._copy();
            if (r.length < this.options.max) {
                var last = r[r.length - 1],
                    item = (this.options.newItemData && this.options.newItemData(last)) || $.extend({}, last);
                this._addBlock(r.length, item);  
                r.push(item);
            }
            this._trigger('change', e, {value : this.options.value = r});
            this._changeState();
        },

        _create : function () {
            var me = this,
                options = this.options;

            this.currentIndex = 0;
        
            $.ui.BaseEditor.prototype._create.call(this, options);

            this.addBtn = $('<button>' + this.options.buttonText + '</button>')
                .button()
                .click($.proxy(this.add, this));


            this.element
                .addClass('object-array-editor')
                .append(this.addBtn)
                .append($('<div class="' + PANEL_CLASS + '"><div class="editor-panel-arrow">\u25C6</div><div class="editor-panel-content"></div></div>'));

            this.editor = $('.editor-panel-content', this.element);

            this._on(this.editor, function () {
                var h = {};
                h['editorchange .' + ITEM_CLASS] = function (e, data) {
                    var r = this._copy(),
                        el = $(e.currentTarget),
                        idx = parseInt(el.attr('data-idx'), 10),
                        pn = el.attr('data-pn');

                    r[idx][pn] = data.value;
                    this._trigger('change', e, {value : this.options.value = r});
                    e.stopPropagation();
                    this.options.onitemselect(this.currentIndex);
                };
                h['mouseover .' + BLOCK_CLASS] = function (e) {
                    $(e.currentTarget).addClass(BLOCK_CLASS + '-hover');
                };
                h['mouseout .' + BLOCK_CLASS] = function (e) {
                    $(e.currentTarget).removeClass(BLOCK_CLASS + '-hover');
                };
                h['click .' + BLOCK_CLASS + '-remove'] = function (e) {
                    var r = this._copy();
                    if (r.length > this.options.min) {
                        var block = $(e.currentTarget).parent()[0],
                        idx = this._getIndex(block);
                        $(block).remove();
                        r.splice(idx, 1); 
                    }
                    if (r.length === 0) {
                        this.element.removeClass(BLOCK_CLASS + '-open');
                    }
                    this._trigger('change', e, {value : this.options.value = r});
                    this._changeState();
                    this._refreshIndex();
                    e.stopPropagation();
                };
                h['click .' + BLOCK_CLASS + '-header'] = function (e) {
                    var $target = $(e.target),
                        idx = parseInt($target.attr('data-idx'), 10);
                    this.currentIndex = idx || 0;
                    $('.' + BLOCK_CLASS + '-table', this.editor).hide();
                    $target.next().show();
                    this.options.onitemselect(idx);
                };
                return h;
            }());

            !this.options.itemHeader && this.element.addClass('object-array-editor-expend');

            this._setValue(this.options.value);
            this._setOption('disabled', options.disabled);
        },
        _changeState : function () {
            this.addBtn.button('option', 'disabled', this.options.value.length >= this.options.max);

            if (this.options.value.length > this.options.min) {
                this.editor.addClass(BLOCK_CLASS + '-canremove');
            } else {
                this.editor.removeClass(BLOCK_CLASS + '-canremove');
            }
        },
        _destroy : function () {
            this.element.removeClass('object-array-editor');
            this.addBtn.unbind('click', this.add);
            $.ui.BaseEditor.prototype._destroy.call(this);
        },
        _setOption : function (k, v) {
            $.ui.BaseEditor.prototype._setOption.call(this, k, v);
            if (k === 'disabled') {
                this.addBtn.button('option', 'disabled', v);
            }
        },
        _addBlock : function (i, value) {
            var html = [],
                map = this.options.map,
                block;
            for(var k in map) {
                map[k].value = value[k];
                html.push(
                    ['<div class="property-row">',
                        (map[k].label ? '<label><nobr>' + map[k].label + '</nobr></label>' : ''),
                        '<div class="property-control"><div data-idx="' + i + '" data-pn="' + k + '" class="' + ITEM_CLASS + '"></div></div>',
                    '</div>'].join('')
                );
            }
            this.editor.append(
                block = $(
                    ['<div class="' + BLOCK_CLASS + '">',
                        (this.options.itemHeader ? '<h4 data-idx="' + i + '" class="' + BLOCK_CLASS + '-header">' + this.options.itemHeader + '</h4>' : ''),
                        '<div class="' + BLOCK_CLASS + '-table">' + html.join('') + '</div>',
                        '<div class="' + BLOCK_CLASS + '-remove ui-corner-all">×</div>',
                    '</div>'].join('')
                )
            );
            
            $('.' + ITEM_CLASS, block).each(function (i, item) {
                var $item = $(item),
                    k = $item.attr('data-pn');
                $item[map[k].type + 'Editor'](map[k]);
            });

            this.element.addClass(BLOCK_CLASS + '-open');
        },
        _genId : function () {
            return 'ObjarrayEditor' + (uid++);
        },
        _copy : function () {
            return this.options.value.slice(0);
        },
        _getIndex : function (el) {
            return $.inArray(el, $('.' + BLOCK_CLASS, this.editor));
        },
        _refreshIndex : function () {
            $('.' + BLOCK_CLASS + '-header', this.editor).each(function (i, item) {
                $(item).attr('data-idx', i);
            });
            $('.' + BLOCK_CLASS, this.editor).each(function (i, item) {
                $(item).attr('data-idx', i);
            });
        },
        _setValue : function (v) {
            var me = this;
            //如果数据超出最大允许值，强制截断
            this.options.value = v.slice(0, this.options.max);

            $.each(this.options.value, function (i, item) {
                me._addBlock(i, item);
            });
            this._changeState();
        },
        _getValue : function () {
            return this.options.value;
        }
    });
})(jQuery);