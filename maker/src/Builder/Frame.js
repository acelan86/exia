exia.define('Builder.Frame', function (require, exports, module) {
    "use strict";
    var _ = window._,
        Backbone = window.Backbone,
        BoundsUtils = require('utils.Bounds');

    /*
       events : ready,  cache
     */
    function Frame(options) {
        _.extend(this, Backbone.Events);

        options = options || {};
        //this.left
        //this.top
        //this.width
        //this.height

        this.dom = $(options.dom);
        this.selector = options.selector;
        this.cache();
        this.init();
    }

    Frame.prototype.controlFromPoint = function(x, y) {
        var node = this.document.elementFromPoint(x, y);
        if (node.tagName.toUpperCase() === 'HTML' || node.tagName.toUpperCase() === 'BODY') {
            node = null;
        } else {
            node = $(node).closest(this.selector).get(0);
        }
        return node;
    };

    Frame.prototype._getHighlightControlHandler = function () {
        var me = this;
        return function (e) {
            var point = me.eventToFrameViewportPoint(e, true),
                node;
            if (node = me.controlFromPoint(point.x, point.y)) {
                me.showHighlightMask(node);
            }
        };
    };

    Frame.prototype._getSelectControlHandler = function () {
        var me = this;
        return function (e) {
            var point = me.eventToFrameViewportPoint(e, true),
                node;
            if (node = me.controlFromPoint(point.x, point.y)) {
                me.showSelectMask(node);
            } else {
                me.hideSelectMask(node);
            }
        };
    },

    Frame.prototype.init = function () {
        var me = this;

        $(window).resize(function () {
            me.cache();
        });

        this.dom.ready(function(e) {
            me.window = me.dom[0].contentWindow;
            me.document = me.dom[0].contentWindow.document;

            console.log('iframe ready');

            setTimeout(function () {
                $('<style>', me.document)
                    .html(
                        [
                            '.highlight-mask{',
                                'border:1px solid #9ABFF9;',
                                'pointer-events: none;',
                                'z-index:1000;',
                            '}',
                            '.select-mask{',
                                'border:2px solid #009ff2;',
                                'background:rgba(73, 164, 230, 0.5);',
                                'z-index:1000;',
                            '}',
                            '.ghost{',
                                'border:2px solid #009ff2;',
                                'display:none;',
                            '}'
                        ].join('\n')
                    )
                    .appendTo($('head', me.document));

                $('<div class="highlight-mask">', me.document)
                    .css({
                        position : 'absolute',
                        display : 'none'
                    })
                    .appendTo($('body', me.document));

                $('<div class="select-mask">', me.document)
                    .css({
                        position : 'absolute',
                        display : 'none'
                    })
                    .appendTo($('body', me.document));

                $('<div class="ghost">', me.document)
                    .css({
                        display : 'none'
                    })
                    .appendTo($('body', me.document));
            }, 500);

            //me.dom.contents().mousemove(me._getHighlightControlHandler());
            me.dom.contents().click(me._getSelectControlHandler());

            me.dom.contents().mousedown(function (e) {
                me._startDrag = 1;
            });
            me.dom.contents().mouseup(function (e) {
                me._startDrag = 0;
            });
            me.dom.contents().mousemove(function (e) {
               if (me._startDrag) {
                    console.log('drag in frame');
               };
            });


            me.trigger('ready', e);
        });

    };
    Frame.prototype.cache = function () {
        var offset = this.dom.offset();
        this.left = offset.left;
        this.top = offset.top;
        this.width = this.dom.outerWidth();
        this.height = this.dom.outerHeight();
        this.trigger('cache', {
            left : this.left,
            top : this.top,
            width : this.width,
            height : this.height
        });
    };

    /**
     * 停止滚动
     * @return {[type]} [description]
     */
    Frame.prototype.stopScroll = function () {
        clearInterval(this.scrollTimer);
    };
    /**
     * 开始向上滚动
     * @return {[type]} [description]
     */
    Frame.prototype.scrollUp = function () {
        var me = this;
        clearInterval(me.scrollTimer);
        var begin = new Date;
        me.scrollTop = me.dom.contents().scrollTop();
        me.scrollTimer = setInterval(function() {
            me.scrollTop -= 20;
            me.dom.contents().scrollTop(me.scrollTop);
            if (new Date - begin > 2000) {
                return clearInterval(me.scrollTimer);
            }
        }, 50);
    };
    /**
     * 开始向下滚动
     * @return {[type]} [description]
     */
    Frame.prototype.scrollDown = function () {
        var me = this;
        clearInterval(me.scrollTimer);
        var begin = new Date;
        me.scrollTop = me.dom.contents().scrollTop();
        me.scrollTimer = setInterval(function() {
            me.scrollTop += 20;
            me.dom.contents().scrollTop(me.scrollTop);
            if (new Date - begin > 2000) {
                return clearInterval(me.scrollTimer);
            }
        }, 50);
    };


    /**
     * 把外部鼠标位置event转换成Frame中相对page0，0的位置
     */
    Frame.prototype.eventToFramePagePoint = function(event, isFromFrame) {
        return isFromFrame ?
            {
                x: event.pageX,
                y: event.pageY
            } :
            {
                x: event.pageX - this.left + this.dom.contents().scrollLeft(),
                y: event.pageY - this.top + this.dom.contents().scrollTop()
            }
    };
    /**
     * 把外部鼠标位置event转换成Frame中相对视口的位置
     */
    Frame.prototype.eventToFrameViewportPoint = function(event, isFromFrame) {
        //此处在iframe中x轴不滚动的情况
        return isFromFrame ?
            {
                x : event.pageX - this.dom.contents().scrollLeft(),
                y : event.pageY - this.dom.contents().scrollTop()
            } :
            {
                x: event.pageX - this.left - this.dom.contents().scrollLeft(),
                y: event.pageY - this.top - this.dom.contents().scrollTop()
            };
    };

    Frame.prototype.addControl = function (html) {
        $(html).insertBefore($('.ghost', this.document));
    };
    Frame.prototype.removeControl = function (node) {
        $(node).remove();
    };
    Frame.prototype.showHighlightMask = function (node) {
        var offset = $(node).offset(),
            width = $(node).outerWidth(),
            height = $(node).outerHeight();

        $('.highlight-mask', this.document)
            .css({
                width : width - 2,
                height : height - 2,
                left : offset.left,
                top : offset.top
            })
            .show();
    };

    Frame.prototype.findInsertPos = function (x, y) {
        var pos;
        $(this.selector, this.document).each(function (i, control) {
            var bounds = BoundsUtils.getElementBounds(control);
            if (y < bounds.y) {
                pos = control;
                return false;
            }
        });
        return pos;
    };

    Frame.prototype.showGhost = function (node) {
        if (node) {
            $('.ghost', this.document)
                .insertBefore(node)
                .show();
        } else {
            $('.ghost', this.document)
                .appendTo($('body', this.document))
                .show();
        }
    };
    Frame.prototype.hideGhost = function () {
        $('.ghost', this.document).hide();
    };

    Frame.prototype.showSelectMask = function (node) {
        var offset = $(node).offset(),
            width = $(node).outerWidth(),
            height = $(node).outerHeight();

        $('.select-mask', this.document)
            .css({
                width : width - 4,
                height : height - 4,
                left : offset.left,
                top : offset.top
            })
            .show();
    };
    Frame.prototype.hideSelectMask = function () {
        $('.select-mask', this.document).hide();
    }
    return Frame;
});