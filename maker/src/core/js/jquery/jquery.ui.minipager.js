(function ($) {
    var BASE_CLASS = 'ui-minipager';
    $.widget('ui.minipager', {
        options : {
            total : 1,
            page : 0
        },
        _create : function () {
            var me = this,
                options = this.options;

            this.element.append($('<button><i class="icon-small icon-small-first"></i></button><button><i class="icon-small icon-small-prev"></i></button><button><i class="icon-small icon-small-next"></i></button><button><i class="icon-small icon-small-last"></i></button>')).buttonset();
            this.element.data('widgetName', this.widgetFullName);

            this.first = this.element.children().first()
                .click(function (e) {
                    me._trigger('change', e, {
                        page : me.options.page = 0
                    });
                    me.setState();
                });
            this.pre = this.first.next()
                .click(function (e) {
                    var page = me.options.page;
                    if (page > 0) {
                        me._trigger('change', e, {
                            page : me.options.page = page - 1
                        });
                    }
                    me.setState();
                });
            this.nxt = this.pre.next()
                .click(function (e) {
                    var page = me.options.page;
                    if (page < me.options.total - 1) {
                        me._trigger('change', e, {
                            page : me.options.page = page + 1
                        });
                    }
                    me.setState();
                });
            this.last = this.nxt.next()
                .click(function (e) {
                    me._trigger('change', e, {
                        page : me.options.page = me.options.total - 1
                    });
                    me.setState();
                });

            this.setState();
        },
        setState : function () {
            this.pre.button('option', 'disabled', this.options.page <= 0);
            this.first.button('option', 'disabled', this.options.page <= 0);
            this.nxt.button('option', 'disabled', this.options.page >= this.options.total - 1);
            this.last.button('option', 'disabled', this.options.page >= this.options.total - 1);
        },
        _setOption : function (k, v) {
            $.Widget.prototype._setOption.call(this, k, v);
            if (k === 'total' || k === 'page') {
                this.setState();
            }
        } 
    });
})(jQuery);