/**
 * documentFrame的相关接口
 */
var documentFrame = (function () {
    var _frame = $('#DocumentFrame'),
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
        _offset = _frame.offset();
        _width = _frame.width();
        _height = _frame.height();
    }

    var CONFIG_START_SCROLL_DISTANCE = 60;  //设置上下边缘尝试开始滚动的距离

    /**
     * 滚动辅助工具类
     */
    var scrollUtil = {
        timer : null,
        pos : 0,                         
        /**
         * 停止滚动
         * @return {[type]} [description]
         */
        stop : function () {
            clearInterval(this.timer);
        },
        /**
         * 开始向上滚动
         * @return {[type]} [description]
         */
        up : function () {
            var me = this;
            clearInterval(me.timer);
            var begin = new Date;
            me.pos = $(FrameDocument).scrollTop();
            me.timer = setInterval(function() {
                me.pos -= 20;
                $(FrameDocument).scrollTop(me.pos);
                if (new Date - begin > 2000) {
                    return clearInterval(me.timer);
                }
            }, 50);
        },
        /**
         * 开始向下滚动
         * @return {[type]} [description]
         */
        down : function () {
            var me = this;
            clearInterval(me.timer);
            var begin = new Date;
            me.pos = $(FrameDocument).scrollTop();
            me.timer = setInterval(function() {
                me.pos += 20;
                $(FrameDocument).scrollTop(me.pos);
                if (new Date - begin > 2000) {
                    return clearInterval(me.timer);
                }
            }, 50);
        }
    };


    /**
     * 节点区域计算辅助工具类
     * @type {Object}
     */
    var boxUtil = {
        /**
         * 获取某个节点的关键区域点，上t，右r，下b，左l，中心点x, y坐标, 宽w，高h
         * @param  {[type]} el [description]
         * @return {[type]}    [description]
         */
        getBox : function (el) {
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
            var o = this.getBox(el);

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
            var o = this.getBox(el);
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
            var o = this.getBox(el);
            return $(el).is(":visible") ?
                        !(coordinate.x < o.l || coordinate.x > o.r || coordinate.y < o.t || coordinate.y > o.b) :
                        false;
        }
    };

    //对文档内容进行操作的方法
    var doc = {
        findInsertPos : function (coordinate) {
            var pos = 'after',
                widget,
                widgets = _frame.contents().find('.control');

            for (var i = 0, len = widgets.length; i < len; i++) {
                widget = widgets[i];

                if (boxUtil.isBefore(coordinate, widget)) {
                    pos = 'before';
                    break;
                } else if (boxUtil.isAfter(coordinate, widget)){
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
            var fragment = tpl(control.value),
                ghost = FrameHelper.ghostUtil.get();

            FrameHelper.ghostUtil.hide();
            FrameHelper.docUtil.insert(fragment, ghost);
            //初始化控件
            FrameHelper.initControl(cid);
        }
    }



    

    _cache();

    //当窗口大小改变的时候重新缓存DocumentFrame的大小跟偏移
    $(window).resize(_cache);
    //当有方法改变尺寸的时候也要调用cache

    //初始化documentIframe
    _frame.load(function () {
        var frameBody = $(FrameDocument).find('body');
        console.log('document frame loaded');
        console.log('inject frameworks');
        frameBody.click(function (e) {
            console.log('select node', e.target);
        });
        frameBody.mousemove(function (e) {
            var point = pointUtil.event2FramePagePoint(e),
                el = FrameDocument.elementFromPoint(point.x, point.y);
            el.style.outline = '2px solid lightblue';
        });
    });


    //返回给外部接口方法
    return {
        cache : _cache,
        tryScroll : function (coordinate) {
            //尝试滚动iframe内部的内容
            var relY = pointUtil.event2FrameViewportPoint(coordinate).y,
                up = CONFIG_START_SCROLL_DISTANCE,
                down = _height - CONFIG_START_SCROLL_DISTANCE;

            //相对坐标大于距离底部设置的最小距离处
            relY > down ?
                scrollUtil.down() :
                //相对坐标小于最小距离
                relY < up ?
                    scrollUtil.up() :
                    //在60 -> height - 最小距离 之间，停止滚动
                    scrollUtil.stop();
        },
        tryInsert : function (event) {
            var point = pointUtil.event2FramePagePoint(event, true),
                el = FrameDocument.elementFromPoint(point.x, point.y);
            console.log(el, point);
        },

        out : function () {
            scrollUtil.stop();
            //FrameHelper.ghostUtil.hide();
        },

        addWidget : doc.add
    };
})();


/* 初始化工具栏拖拽挂接 */
$('.toolbar .control-icon').draggable({
    //当没有正确放置时候是否回退到默认位置
    revert: 'invalid',
    helper: function (e) {
        return $('<div class="control-dd-helper">').css('zIndex', 1000);
    },
    containment: 'document',
    //设置复制的节点再鼠标什么位置
    cursorAt: {
        top: -10,
        left: -10
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
        //documentFrame.addWidget(ui);
    }
});

//当拖拽再DD上滑动时
//判断是否需要滚动页面
//判断插入位置
$('#FrameDDMaskLayer').mousemove(function (e) {
    //尝试进行滚动
    //documentFrame.tryScroll(e);
    //尝试插入占位节点
    documentFrame.tryInsert(e);
});
$('#FrameDDMaskLayer').mouseout(function () {
    //documentFrame.out();
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