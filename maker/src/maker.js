/**
 * documentFrame的相关接口
 */
var documentFrame = (function () {
    var _dom = $('#DocumentFrame'),
        _frameWindow,
        _offset = {
            top : 0,
            left: 0
        },
        _width = 0,
        _height = 0;

    /**
     * 缓存documentFramen节点的一些状态
     * 尺寸，偏移
     */
    function _cache() {
        _offset = _dom.offset();
        _width = _dom.width();
        _height = _dom.height();
    }

    /**
     * 滚动辅助工具类
     */
    var _scrollUtils = {
        CONFIG_START_SCROLL_DISTANCE : 60,  //设置上下边缘尝试开始滚动的距离
        pos : 0,                            //当前滚动的位置缓存
        /**
         * 停止滚动
         * @return {[type]} [description]
         */
        stop : function () {
            clearInterval(_scrollUtils.timer);
        },
        /**
         * 开始向上滚动
         * @return {[type]} [description]
         */
        up : function () {
            clearInterval(_scrollUtils.timer);
            var begin = new Date;
            _scrollUtils.pos = _dom.contents().scrollTop();
            _scrollUtils.timer = setInterval(function() {
                _scrollUtils.pos -= 20;
                _dom.contents().scrollTop(_scrollUtils.pos);
                if (new Date - begin > 2000) {
                    return clearInterval(_scrollUtils.timer);
                }
            }, 50);
        },
        /**
         * 开始向下滚动
         * @return {[type]} [description]
         */
        down : function () {
            clearInterval(_scrollUtils.timer);
            var begin = new Date;
            _scrollUtils.pos = _dom.contents().scrollTop();
            _scrollUtils.timer = setInterval(function() {
                _scrollUtils.pos += 20;
                _dom.contents().scrollTop(_scrollUtils.pos);
                if (new Date - begin > 2000) {
                    return clearInterval(_scrollUtils.timer);
                }
            }, 50);
        }
    };

    /**
     * 坐标变换工具类
     */
    var _coordinateUtils = {
        /**
         * 把外部鼠标位置coordinate转换成Frame中相对page0，0的位置
         * @param  {[type]} coordinate [description]
         * @return {[type]}            [description]
         */
        event2FramePagePoint: function(coordinate) {
            //此处在iframe中x轴不滚动的情况
            return {
                x: coordinate.x - _offset.left + 0,
                y: coordinate.y - _offset.top + _scrollUtils.pos
            };
        },
        /**
         * 把外部鼠标位置coordinate转换成Frame中相对视口的位置
         * @param  {[type]} coordinate [description]
         * @return {[type]}            [description]
         */
        event2FrameViewportPoint: function(coordinate) {
            //此处在iframe中x轴不滚动的情况
            return {
                x: coordinate.x - _offset.left,
                y: coordinate.y - _offset.top
            };
        }
    }

    /**
     * 节点区域计算辅助工具类
     * @type {Object}
     */
    var _areaUtils = {
        /**
         * 获取某个节点的关键区域点，上t，右r，下b，左l，中心点x, y坐标, 宽w，高h
         * @param  {[type]} el [description]
         * @return {[type]}    [description]
         */
        get : function (el) {
            var el = $(el),
                offset = el.offset(),
                width = el.outerWidth(),
                height = el.outerHeight();
            return {
                t : offset.top,
                r : offset.left + width,
                b : offset.top + height,
                l : offset.left,
                x: offset.left + width / 2,
                y: offset.top + height / 2,                 
                w : width,
                h : height,
                style : {
                    position : el.css('position'),
                    display : el.css('display')
                }
            };
        },
        /**
         * 判断coordinate的坐标值x, y是否在某个节点的后半部分
         * coordinate is after el
         * @param  {[type]}  coordinate [description]
         * @param  {[type]}  el         [description]
         * @return {Boolean}            [description]
         */
        isAfter: function(coordinate, el) {
            var o = _areaUtils.get(el);

            return 'fixed' === o.style.position || 'absolute' === o.style.position || 'sticky' === o.style.position ?
                        false :
                        o.style.display.indexOf('inline') !== -1 ? 
                            Math.max(o.x, o.r - 20) < coordinate.x && coordinate.x < o.r && o.t < coordinate.y && coordinate.y < o.b :
                            Math.max(o.y, o.b - 20) < coordinate.y && coordinate.y < o.b && o.l < coordinate.x && coordinate.x < o.r;
        },

        /**
         * 判断coordinate的坐标x, y是否再某个节点的前半部分
         * coordinate is before el
         * @param  {[type]}  coordinate [description]
         * @param  {[type]}  el         [description]
         * @return {Boolean}            [description]
         */
        isBefore: function(coordinate, el) {
            var o = _areaUtils.get(el);
            return 'fixed' === o.style.position || 'absolute' === o.style.position || 'sticky' === o.style.position ?
                        false :
                        o.style.display.indexOf('inline') !== -1 ? 
                            Math.max(o.x, o.r - 20) >= coordinate.x && o.t < coordinate.y && coordinate.y < o.b || coordinate.x > o.r && coordinate.y < o.t:
                            Math.max(o.y, o.b - 20) >= coordinate.y && o.l < coordinate.x && coordinate.x < o.r;
        },

        /**
         * 判断某个节点el是否包含某个坐标coordinate
         * el is content coordinate
         * @param  {[type]}  el         [description]
         * @param  {[type]}  coordinate [description]
         * @return {Boolean}            [description]
         */
        isContain: function(el, coordinate) {
            var o = _areaUtils.get(el);
            return $(el).is(":visible") ?
                        !(coordinate.x < o.l || coordinate.x > o.r || coordinate.y < o.t || coordinate.y > o.b) :
                        false;
        }
    };


    /**
     * ghost对象辅助
     * @type {Object}
     */
    var _ghostUtils = {
        CONFIG_ID : '#WidgetGhost',
        get : function () {
            return _dom.contents().find(_ghostUtils.CONFIG_ID);
        },
        insertTo : function (el, pos) {
            var ghost = _ghostUtils.get();
            'before' === pos ? ghost.insertBefore(el) : ghost.insertAfter(el);
            ghost.show();
        },
        hide : function () {
            _ghostUtils.get().hide();
        }
    };

    //对文档内容进行操作的方法
    var doc = {
        findInsertPos : function (coordinate) {
            var pos = 'after',
                widget,
                widgets = _dom.contents().find('.control');

            for (var i = 0, len = widgets.length; i < len; i++) {
                widget = widgets[i];

                if (_areaUtils.isBefore(coordinate, widget)) {
                    pos = 'before';
                    break;
                } else if (_areaUtils.isAfter(coordinate, widget)){
                    pos = 'after';
                    break;
                }
            }
            return {
                el : widget,
                pos : pos
            };
        },
        add : function (ui) {
            var cid = (+new Date).toString(36),
                tn = ui.draggable.data('tn'),
                control = window[tn + 'Control'],
                tpl = control.template;

            control.value.cid = cid;
            var fragment = $(tpl(control.value)),
                ghost = _ghostUtils.get();

            _ghostUtils.hide();
            fragment.insertBefore(ghost);
            //初始化控件
            _dom[0].contentWindow.FrameAPI.initWidget(cid);
        }
    }

    _cache();

    //当窗口大小改变的时候重新缓存DocumentFrame的大小跟偏移
    $(window).resize(_cache);
    //当有方法改变尺寸的时候也要调用cache

    //初始化documentIframe
    _dom.load(function () {
        console.log('document frame loaded');
        _frameWindow = _dom[0].contentWindow;
    });


    //返回给外部接口方法
    return {
        offset : function () {
            return _offset;
        },
        height : function () {
            return _height;
        },
        width : function () {
            return _width;
        },
        cache : _cache,
        stopScroll : _scrollUtils.stop,
        tryScroll : function (coordinate) {
            //尝试滚动iframe内部的内容
            var relY = _coordinateUtils.event2FrameViewportPoint(coordinate).y,
                up = _scrollUtils.CONFIG_START_SCROLL_DISTANCE,
                down = _height - _scrollUtils.CONFIG_START_SCROLL_DISTANCE;

            //相对坐标大于距离底部设置的最小距离处
            relY > down ?
                _scrollUtils.down() :
                //相对坐标小于最小距离
                relY < up ?
                    _scrollUtils.up() :
                    //在60 -> height - 最小距离 之间，停止滚动
                    _scrollUtils.stop();
        },
        tryInsert : function (coordinate) {
            var coordinate = _coordinateUtils.event2FramePagePoint(coordinate),
                o = doc.findInsertPos(coordinate);
            _ghostUtils.insertTo(o.el, o.pos);
        },

        out : function () {
            _scrollUtils.stop();
            _ghostUtils.hide();
        },

        addWidget : doc.add,

        //for test
        doc : function () {
            return doc;
        },
        node : function () {
            return node;
        }
    };
})();


/* 初始化toolbar */
$('.toolbar .control-icon').draggable({
    //当没有正确放置时候是否回退到默认位置
    revert: 'invalid',
    helper: function (e) {
        return $('<div class="widget-dd-helper">').css('zIndex', 1000);
    },
    containment: 'document',
    //设置复制的节点再鼠标什么位置
    cursorAt: {
        top: -5,
        left: -5
    },
    start : function (e, ui) {
        $('body').addClass('stage-status-dragging');
        ui.helper.addClass('cant-drop');
    },
    drag : function (e, ui) {
    },
    stop : function (e, ui) {
        $('body').removeClass('stage-status-dragging');
        ui.helper.removeClass('cant-drop');
    }
});


//初始化接收拖拽容器
$('#FrameDDMaskLayer').droppable({
    //只接受com类型节点
    accept : '.control-icon',
    tolerance : 'pointer',
    over : function (e, ui) {
        ui.helper.addClass('can-drop');
    },
    out : function (e, ui) {
        ui.helper.removeClass('can-drop');
    },
    drop : function (e, ui) {
        ui.helper.removeClass('can-drop');
        console.log('drop');

        documentFrame.addWidget(ui);
    }
});

//当拖拽再DD上滑动时
//判断是否需要滚动页面
//判断插入位置
$('#FrameDDMaskLayer').mousemove(function (e) {
    var coordinate = {
        x : e.pageX,
        y : e.pageY
    }
    //尝试进行滚动
    documentFrame.tryScroll(coordinate);
    //尝试插入占位节点
    documentFrame.tryInsert(coordinate);
});
$('#FrameDDMaskLayer').mouseout(function () {
    documentFrame.out();
});



/* ================================== */

/* 初始化重置大小事件 */
$('#RotateButton').click(function () {
    $('body').toggleClass('landscape');
    documentFrame.cache();
});

/* 初始化隐藏工具栏事件 */
$('#HideToolbarButton').click(function () {
    $('body').toggleClass('stage-layout-hide-toolbar');
    documentFrame.cache();
});

/* 搜索组件事件 */
// (function () {
//     var styleNode = $('#WidgetSearchStyle')
//     $('#WidgetSearchInput').on('input', function () {
//         var keyword = $(this).val();
//         if (!keyword) {  
//             styleNode.html("");  
//             return;  
//         }
//         styleNode.html(".control-icon:not([data-kw*=\"" + keyword.toLowerCase() + "\"]) { display: none; }");  
//     });
// })();