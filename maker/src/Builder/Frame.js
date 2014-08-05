/**
 * 编辑区frame
 */
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
        return $(selector, this.doc);
    };

    Frame.prototype.controlFromPoint = function(x, y) {
        var node = this.document.elementFromPoint(x, y);
        return this.findControl(node);
    };

    Frame.prototype.findControl/* by node */ = function (node) {
        if (node.tagName.toUpperCase() === 'HTML' || node.tagName.toUpperCase() === 'BODY') {
            node = null;
        } else {
            node = this.$(node).closest(this.controlSelector).get(0);
        }
        return node ? $(node) : null;
    };

    Frame.prototype.getContainer = function (node) {
        if (node.tagName.toUpperCase() === 'HTML' || node.tagName.toUpperCase() === 'BODY') {
            node = null;
        } else {
            node = this.$(node).closest(this.containerSelector).get(0);
        }
        return node;
    };

    Frame.prototype._frameLoaded = function () {
        var me = this;
        if (this.isFrameLoaded === true) {
            console.error("frame already loaded");
            return
        }
        this.isFrameLoaded = true;

        var win = me.dom[0].contentWindow,
            doc = win.document;

        me.win = win;
        me.doc = doc;

        me.$('<style>')
            .html(
                [
                    'body{',
                        '-webkit-user-select:none;',
                    '}',
                    '.is-dragging{',
                        'opacity:.6;',
                    '}',
                    '.select-mask{',
                        'position:absolute;',
                        'pointer-events: none;',
                        '-webkit-pointer-events:none;',
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
                    '}',
                    '.drag-mask{',
                        'position:absolute;',
                        'opacity:0;',
                        'display:none;',
                        'z-index:1500;',
                    '}'
                ].join('\n')
            )
            .appendTo(me.$('head'));

        me.$('body')
            .append(me.$('<div class="drag-mask">'))
            .append(me.$('<div class="select-mask">'))
            .append(me.$('<div class="ghost">'));


        //绑定内部拖拽和选中事件
        (function () {
            var DRAG_STATUS = {
                INIT : 0,
                START_DRAG : 1,
                DRAGGING : 2
            };
            me.$(me.doc)
                .mousedown(function (e) {
                    var control = me.findControl(e.target),
                        offset;

                    me._dragState = DRAG_STATUS.INIT;

                    if (control) {
                        me._active = control.attr('id');
                        me._dragDeltaX = e.pageX;
                        me._dragDeltaY = e.pageY;
                        me._dragState = DRAG_STATUS.START_DRAG;
                        //遮罩保护层, 防止拖拽到真正的控件，造成不必要的结果
                        offset = control.offset();
                        me.$('.drag-mask')
                            .css({
                                width : control.outerWidth(),
                                height : control.outerHeight(),
                                left : control.left,
                                top : control.top
                            })
                            .show();
                    }
                })
                .mouseup(function (e) {
                    if (me._dragState === DRAG_STATUS.DRAGGING) {
                        var to = me.$('.ghost').data('cid');
                        me.hideGhost();

                        //拖拽状态，进入完成拖拽
                        me.$('.drag-helper').remove();
                        me.getControl(me._active).removeClass('is-dragging');
                        me.moveControlTo(me._active, to);
                        //触发排序事件
                        me.trigger('sort', me._active, to);
                    }

                    if (me._dragState !== DRAG_STATUS.INIT) {
                        me.selectControl(me._active);
                    } else {
                        me.unselectControl();
                    }
                    //操作完毕，回到初始状态
                    me._dragState = DRAG_STATUS.INIT;
                    //隐藏拖拽保护层
                    me.$('.drag-mask').hide();
                })
                .mousemove(function (e) {
                    var $active;

                    e.preventDefault();
                    e.stopPropagation();

                    if (!me._active) {
                        return;
                    }
                    
                    $active = me.getControl(me._active);
                    //拖拽状态，持续改变helper坐标跟随
                    if (me._dragState === DRAG_STATUS.DRAGGING) {
                        me.$('.drag-helper')
                            .css({
                                left : e.pageX + 10,
                                top : e.pageY - $active.outerHeight()
                            });
                        var point = me.eventToFramePagePoint(e, true),
                            pos = me.findInsertPos(point.x, point.y);

                        ////滚动
                        me.scrollByViewportPoint(me.eventToFrameViewportPoint(e, true).y);

                        me.showGhost(pos);

                    //按下状态，判断拖拽是否超过一定距离，开始拖拽
                    } else if (me._dragState === DRAG_STATUS.START_DRAG) {
                        if (Math.abs(e.pageX - me._dragDeltaX) > 30 || Math.abs(e.pageY - me._dragDeltaY) > 30) {
                            me._dragState = DRAG_STATUS.DRAGGING;
                            me.hideSelectMask();
                            me.$('<div class="drag-helper">')
                                .css({
                                    width : $active.outerWidth(),
                                    left: e.pageX + 10,
                                    top : e.pageY - $active.outerHeight()
                                })
                                .append(
                                    $active
                                        .clone()
                                        .removeClass(me.controlSelector.replace('.', ''))
                                )
                                .appendTo(me.$('body'));
                            $active.addClass('is-dragging');
                        }
                    };
                });
        })();

        me.trigger('init');
    };

    Frame.prototype.init = function () {
        var me = this;

        $(window).resize(function () {
            me.cache();
        });

        var frameHTML = [
            '<!doctype html>',
                '<html lang="zh-cn">',
                '<head>',
                    '<meta charset="utf-8">',
                    '<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">',
                    '<title> Exia Demo </title>',
                    '<meta name="viewport" content="width=device-width, initial-scale=1.0">',
                    '<meta name="format-detection" content="telephone=no,email=no">',
                    // '<link rel="stylesheet" href="/static/page/jquery-ui-1.11.0/jquery-ui.min.css">',
                    '<script src="/static/page/jquery-ui-1.11.0/external/jquery/jquery.js"></script>',
                    // '<script src="/static/page/jquery-ui-1.11.0/jquery-ui.min.js"></script>',
                    // '<link rel="stylesheet" href="/static/page/GMU/reset.css">',
                    // '<link rel="stylesheet" href="/static/page/GMU/gmu.css">',
                    // '<script src="/static/page/GMU/zepto.js"></script>',
                    // '<script src="/static/page/GMU/gmu.js"></script>',
                    // '<link rel="stylesheet" href="/static/page/jquery.mobile.custom/jquery.mobile.custom.structure.css">',
                    // '<link rel="stylesheet" href="/static/page/jquery.mobile.custom/jquery.mobile.custom.theme.css">',
                    // '<script src="/static/page/jquery.mobile.custom/jquery.mobile.custom.min.js"></script>',
                    // '<link rel="stylesheet" href="/static/page/bootstrap/css/bootstrap-responsive.css">',
                    // '<link rel="stylesheet" href="/static/page/bootstrap/css/bootstrap.css">',
                    // '<script src="/static/page/bootstrap/js/bootstrap.js"></script>',
                    '<link rel="stylesheet" href="http://cdn.bootcss.com/bootstrap/3.2.0/css/bootstrap.min.css">',
                    '<script src="http://cdn.bootcss.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>',
                    '<script>parent.FrameDocument = document; parent.FrameWindow = window;</script>',
                '</head>',
                '<body>',
                '</body>',
            '</html>'
        ].join('');

        var doc = me.dom[0].contentWindow.document;
        doc.open('text/html');
        doc.write(frameHTML);
        doc.close();


        this.dom.ready(function() {
            var waitFunction,
                waitTimeout;
            waitFunction = function() {
                var waitTimeout;
                if (!window.FrameDocument || $("body", window.FrameDocument).length === 0) {
                    console.log("frame loading, waiting");
                    return waitTimeout = setTimeout(waitFunction, 20)
                } else {
                    console.log("frame ready, stop watiting");
                    return me._frameLoaded();
                }
            };
            return waitTimeout = setTimeout(waitFunction, 20);
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
                x: event.pageX - this.left,
                y: event.pageY - this.top
            };
    };

    Frame.prototype.getControl/* by Id */ = function (controlId) {
        var control = this.$('#' + controlId || 'undefinedId');
        return control.get(0) ? control : null;
    };

    Frame.prototype.addControl/* before */ = function (html, controlId) {
        var control = this.getControl(controlId);
        if (control) {
            this.$(html)
                .addClass('control')
                .insertBefore(control);
        } else {
            this.$(html)
                .addClass('control')
                .appendTo(this.$('body'));
        }
    };
    Frame.prototype.replaceControl = function (controlId, html) {
        var control = this.getControl(controlId);
        control && control.replaceWith(
            this.$(html).addClass('control')
        );
    };
    Frame.prototype.removeControl = function (controlId) {
        var control = this.getControl(controlId);
        control && control.remove();
    };

    Frame.prototype.findInsertPos = function (x, y) {
        var pos;
        this.$(this.controlSelector).each(function (i, control) {
            var bounds = BoundsUtils.getElementBounds(control);
            if (y < bounds.y || y < bounds.b && x < bounds.l + 20) {
                pos = control;
                return false;
            }
        });
        return pos ? $(pos).attr('id') : null;
    };

    Frame.prototype.moveControlTo = function (controlId, toControlId) {
        var control = this.getControl(controlId),
            toControl = this.getControl(toControlId);
        if (control) {
            toControl ? control.insertBefore(toControl) : control.appendTo(this.$('body'));
        }
    }

    Frame.prototype.showGhost/*Before*/ = function (controlId) {
        var control = this.getControl(controlId);
        if (control) {
            this.$('.ghost')
                .data('cid', controlId) //保存当前位置到ghost
                .insertBefore(control)
                .show();
        } else {
            this.$('.ghost')
                .data('cid', null)
                .appendTo(this.$('body'))
                .show();
        }
    };
    Frame.prototype.hideGhost = function () {
        this.$('.ghost').hide();
    };

    Frame.prototype.showSelectMask = function (controlId) {
        var control = this.getControl(controlId),
            offset,
            width, 
            height;

        if (control) {
            offset = control.offset(),
            width = control.outerWidth(),
            height = control.outerHeight();
            this.$('.select-mask')
                .css({
                    width : width,
                    height : height,
                    left : offset.left,
                    top : offset.top
                })
                .show();
        }
    };
    Frame.prototype.selectControl = function (controlId) {
        this._active = controlId;
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
        var CONFIG_START_SCROLL_DISTANCE = 30,
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