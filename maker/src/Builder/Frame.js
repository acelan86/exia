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

        this.dom = $(options.dom);
        this.controlSelector = options.controlSelector;
        this.cache();
        this.init();
    }

    Frame.prototype.$ = function (selector) {
        return $(selector, this.document);
    };

    Frame.prototype.controlFromPoint = function(x, y) {
        var node = this.document.elementFromPoint(x, y);
        return this.getControl(node);
    };

    Frame.prototype.getControl = function (node) {
        if (node.tagName.toUpperCase() === 'HTML' || node.tagName.toUpperCase() === 'BODY') {
            node = null;
        } else {
            node = this.$(node).closest(this.controlSelector).get(0);
        }
        return node;
    };

    Frame.prototype.getContainer = function (node) {
        if (node.tagName.toUpperCase() === 'HTML' || node.tagName.toUpperCase() === 'BODY') {
            node = null;
        } else {
            node = this.$(node).closest(this.containerSelector).get(0);
        }
        return node;
    };

    // Frame.prototype._getHighlightControlHandler = function () {
    //     var me = this;
    //     return function (e) {
    //         var point = me.eventToFrameViewportPoint(e, true),
    //             node;
    //         if (node = me.controlFromPoint(point.x, point.y)) {
    //             me.showHighlightMask(node);
    //         }
    //     };
    // };


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
                me.$('<style>')
                    .html(
                        [
                            '.highlight-mask{',
                                'position:absolute;',
                                'display:none;',
                                'border:1px solid #9ABFF9;',
                                'pointer-events: none;',
                                'z-index:1000;',
                            '}',
                            '.select-mask{',
                                'position:absolute;',
                                'pointer-events: none;',
                                'display:none;',
                                'border:2px solid #009ff2;',
                                'background:rgba(73, 164, 230, 0.5);',
                                'z-index:1000;',
                            '}',
                            '.ghost{',
                                'border:2px solid #009ff2;',
                                'display:none;',
                            '}',
                            '.drag-helper{',
                                'position:absolute;',
                                'pointer-events: none;',
                                'z-index:2000;',
                            '}'
                        ].join('\n')
                    )
                    .appendTo(me.$('head'));

                me.$('body')
                    .append(me.$('<div class="highlight-mask">'))
                    .append(me.$('<div class="select-mask">'))
                    .append(me.$('<div class="ghost">'));
            }, 500);

            //me.dom.contents().mousemove(me._getHighlightControlHandler());

            //绑定内部拖拽和选中事件
            (function () {
                var DRAG_STATUS = {
                    INIT : 0,
                    START_DRAG : 1,
                    DRAGGING : 2
                };
                me.dom.contents().mousedown(function (e) {
                    me._dragState = DRAG_STATUS.INIT;
                    me._active = me.getControl(e.target);
                    if (me._active) {
                        me._dragDeltaX = e.pageX;
                        me._dragDeltaY = e.pageY;
                        me._dragState = DRAG_STATUS.START_DRAG;
                    }
                });
                me.dom.contents().mouseup(function (e) {
                    if (me._dragState === DRAG_STATUS.DRAGGING) {
                        me.hideGhost();
                        //拖拽状态，进入完成拖拽
                        me.$('.drag-helper').remove();
                        me.$(me._active).css('opacity', 1);
                        me.moveControlTo(me._active, me.$('.ghost'));
                        me.trigger('sort', me._active);
                    }

                    if (me._dragState !== DRAG_STATUS.INIT) {
                        me.selectControl(me._active);
                    } else {
                        me.unselectControl();
                    }
                    //操作完毕，回到初始状态
                    me._dragState = DRAG_STATUS.INIT;
                });
                me.dom.contents().mousemove(function (e) {
                    //拖拽状态，持续改变helper坐标跟随
                    if (me._dragState === DRAG_STATUS.DRAGGING) {
                        me.$('.drag-helper', me.document)
                            .css({
                                left : e.pageX + 10,
                                top : e.pageY + 10
                            });
                        var point = me.eventToFrameViewportPoint(e, true),
                            pos = me.findInsertPos(point.x, point.y);
                        //me.moveNodeTo(me._active, pos);
                        me.showGhost(pos);

                        //滚动
                        console.log('inner scroll',point.y, pos);
                        me.scrollByViewportPoint(point.y);

                    //按下状态，判断拖拽是否超过一定距离，开始拖拽
                    } else if (me._dragState === DRAG_STATUS.START_DRAG) {
                        if (Math.abs(e.pageX - me._dragDeltaX) > 10 || Math.abs(e.pageY - me._dragDeltaY) > 10) {
                            me._dragState = DRAG_STATUS.DRAGGING;
                            me.hideSelectMask();
                            me.$(me._active).css({
                                opacity : .6
                            });
                            me.$('<div class="drag-helper">')
                                .css({
                                    left: e.pageX + 10,
                                    top : e.pageY + 10
                                })
                                .append(
                                    me.$(me._active)
                                        .clone()
                                        .removeClass(me.controlSelector.replace('.', ''))
                                )
                                .appendTo(me.$('body'));
                        }
                    };
                    e.preventDefault();
                    e.stopPropagation();
                });
            })();

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
        var scrollTop = me.dom.contents().scrollTop();
        me.scrollTimer = setInterval(function() {
            scrollTop -= 20;
            me.dom.contents().scrollTop(scrollTop);
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
        var scrollTop = me.dom.contents().scrollTop();
        me.scrollTimer = setInterval(function() {
            scrollTop += 20;
            me.dom.contents().scrollTop(scrollTop);
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
        this.$(html).insertBefore(this.$('.ghost'));
    };
    Frame.prototype.removeControl = function (node) {
        this.$(node).remove();
    };
    Frame.prototype.showHighlightMask = function (node) {
        node = this.$(node);

        var offset = node.offset(),
            width = node.outerWidth(),
            height = node.outerHeight();

        this.$('.highlight-mask')
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
        this.$(this.controlSelector).each(function (i, control) {
            var bounds = BoundsUtils.getElementBounds(control);
            console.log(y, bounds.y, control);
            if (y < bounds.y) {
                pos = control;
                return false;
            }
        });
        return pos;
    };

    Frame.prototype.moveControlTo = function (node, to) {
         if (to) {
            this.$(node).insertBefore(to);
        } else {
            this.$(node).appendTo(this.$('body'))
        }
    }

    Frame.prototype.showGhost = function (node) {
        if (node) {
            this.$('.ghost')
                .insertBefore(node)
                .show();
        } else {
            this.$('.ghost')
                .appendTo(this.$('body'))
                .show();
        }
    };
    Frame.prototype.hideGhost = function () {
        this.$('.ghost').hide();
    };

    Frame.prototype.showSelectMask = function (node) {
        node = this.$(node);
        var offset = node.offset(),
            width = node.outerWidth(),
            height = node.outerHeight();

        this.$('.select-mask')
            .css({
                width : width - 4,
                height : height - 4,
                left : offset.left,
                top : offset.top
            })
            .show();
    };
    Frame.prototype.selectControl = function (node) {
        this._active = node;
        this.showSelectMask(this._active);
        this.trigger('select', this._active);
    };
    Frame.prototype.hideSelectMask = function () {
        this.$('.select-mask').hide();
    };
    Frame.prototype.unselectControl = function () {
        this.hideSelectMask();
        this.trigger('unselect', this._active);
        this._active = null;
    };

    Frame.prototype.scrollByViewportPoint = function (y) {
        var CONFIG_START_SCROLL_DISTANCE = 60,
            up = CONFIG_START_SCROLL_DISTANCE,
            down = this.height - CONFIG_START_SCROLL_DISTANCE;

        //相对坐标大于距离底部设置的最小距离处
        y > down ?
            this.scrollDown() :
            //相对坐标小于最小距离
            y < up ?
                this.scrollUp() :
                //在60 -> height - 最小距离 之间，停止滚动
                this.stopScroll();
    }
    return Frame;
});