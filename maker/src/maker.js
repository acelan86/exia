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

    var CONFIG_START_SCROLL_DISTANCE = 60;  //设置上下边缘尝试开始滚动的距离


    //对文档内容进行操作的方法
    var doc = {
        findInsertPos : function (coordinate) {
            var pos = 'after',
                widget,
                widgets = _dom.contents().find('.control');

            for (var i = 0, len = widgets.length; i < len; i++) {
                widget = widgets[i];

                if (FrameHelper.areaUtil.isBefore(coordinate, widget)) {
                    pos = 'before';
                    break;
                } else if (FrameHelper.areaUtil.isAfter(coordinate, widget)){
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



    /**
     * 坐标变换工具类
     */
    var coordinateUtil = {
        /**
         * 把外部鼠标位置coordinate转换成Frame中相对page0，0的位置
         * @param  {[type]} coordinate [description]
         * @return {[type]}            [description]
         */
        event2FramePagePoint: function(coordinate) {
            //此处在iframe中x轴不滚动的情况
            return {
                x: coordinate.x - _offset.left + 0,
                y: coordinate.y - _offset.top + FrameHelper.scrollUtil.pos
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
    };


    _cache();

    //当窗口大小改变的时候重新缓存DocumentFrame的大小跟偏移
    $(window).resize(_cache);
    //当有方法改变尺寸的时候也要调用cache

    //初始化documentIframe
    _dom.load(function () {
        console.log('document frame loaded');
        _frameWindow = _dom[0].contentWindow;

        //加载辅助方法到iframe中
        (function (window, document) {
            /**
             * @private
             * @param  {HTMLScriptElement} scr     script节点
             * @param  {String} url     资源地址
             * @param  {String} charset 字符集
             */
            function _createScriptTag(scr, url, charset) {
                scr.setAttribute('type', 'text/javascript');
                charset && scr.setAttribute('charset', charset);
                scr.setAttribute('src', url);
                document.getElementsByTagName('head')[0].appendChild(scr);
            }
            /**
             * @private
             * @param  {HTMLScriptElement} scr script节点
             */
            function _removeScriptTag(scr) {
                if (scr && scr.parentNode) {
                    scr.parentNode.removeChild(scr);
                }
                scr = null;
            }
            /**
             * 加载js模块
             * @param  {String} url          资源地址
             * @param  {Function} opt_callback 成功后回调方法
             * @param  {Object} opt_options  选项
             */
            function loadScript(url, optCallback, optOptions) {
                var scr = document.createElement("SCRIPT"),
                    scriptLoaded = 0,
                    options = optOptions || {},
                    charset = options.charset || 'utf-8',
                    callback = optCallback || function () {},
                    timeOut = options.timeout || 0,
                    timer;
                
                // IE和opera支持onreadystatechange
                // safari、chrome、opera支持onload
                scr.onload = scr.onreadystatechange = function () {
                    // 避免opera下的多次调用
                    if (scriptLoaded) {
                        return;
                    }
                    
                    var readyState = scr.readyState;
                    if ('undefined' === typeof readyState ||
                         readyState === "loaded" ||
                         readyState === "complete") {
                        scriptLoaded = 1;
                        try {
                            callback();
                            clearTimeout(timer);
                        } finally {
                            scr.onload = scr.onreadystatechange = null;
                            _removeScriptTag(scr);
                        }
                    }
                };

                if (timeOut) {
                    timer = setTimeout(function () {
                        scr.onload = scr.onreadystatechange = null;
                        _removeScriptTag(scr);
                        options.onfailure && options.onfailure();
                    }, timeOut);
                }
                
                _createScriptTag(scr, url, charset);
            }

            loadScript('/static/core/js/jQuery-2.1.1.js', function () {
                window.jQuery.noConflict();
                loadScript('/static/page/helper.js', function () {
                    console.log('helper inject complete!');
                    //FrameHelper = window.FrameHelper;
                });
            });
        })(_dom[0].contentWindow, _dom[0].contentWindow.document);
    });


    //返回给外部接口方法
    return {
        cache : _cache,
        tryScroll : function (coordinate) {
            //尝试滚动iframe内部的内容
            var relY = coordinateUtil.event2FrameViewportPoint(coordinate).y,
                up = CONFIG_START_SCROLL_DISTANCE,
                down = _height - CONFIG_START_SCROLL_DISTANCE;

            console.log(relY, up, down);

            //相对坐标大于距离底部设置的最小距离处
            relY > down ?
                (console.log('down'),FrameHelper.scrollUtil.down()) :
                //相对坐标小于最小距离
                relY < up ?
                    (console.log('up'), FrameHelper.scrollUtil.up()) :
                    //在60 -> height - 最小距离 之间，停止滚动
                    (console.log('stop', FrameHelper.scrollUtil.timer), FrameHelper.scrollUtil.stop());
        },
        tryInsert : function (coordinate) {
            var coordinate = coordinateUtil.event2FramePagePoint(coordinate),
                o = doc.findInsertPos(coordinate);
            FrameHelper.ghostUtil.insertTo(o.el, o.pos);
        },

        out : function () {
            FrameHelper.scrollUtil.stop();
            FrameHelper.ghostUtil.hide();
        },

        addWidget : doc.add
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