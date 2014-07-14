/**
 * 定义外部进行初始化的接口文件
 */
function _initControl(cid) {
    var node = $('#' + cid),
        type = node.data('role');
    node[type]();
}
jQuery(function ($) {
    //插入辅助的css
    $('head').append($('<link type="text/css" rel="stylesheet" href="/static/page/helper.css">'));
    //插入ghost, highlight, select辅助节点
    $('body')
        .append($('<div id="ControlGhostHelper" class="control-ghost-helper">'))
        .append($('<div id="ControlHighlightHelper" class="control-highlight-helper">'))
        .append($('<div id="ControlSelectHelper" class="control-select-helper">'));

    parent.FrameHelper = {
        /**
         * 滚动辅助工具类
         */
        scrollUtil : {
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
                me.pos = $(document).scrollTop();
                me.timer = setInterval(function() {
                    console.log('up', me.timer);
                    me.pos -= 20;
                    $(document).scrollTop(me.pos);
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
                me.pos = $(document).scrollTop();
                me.timer = setInterval(function() {
                    console.log('down', me.timer);
                    me.pos += 20;
                    $(document).scrollTop(me.pos);
                    if (new Date - begin > 2000) {
                        return clearInterval(me.timer);
                    }
                }, 50);
            }
        },

        /**
         * ghost对象辅助
         * @type {Object}
         */
        ghostUtil : {
            id : 'ControlGhostHelper',
            get : function () {
                return $('#' + this.id);
            },
            insertTo : function (el, pos) {
                var ghost = this.get();
                !el ? 
                    $('body').append(ghost) :
                    'before' === pos ? ghost.insertBefore(el) : ghost.insertAfter(el);
                ghost.show();
            },
            hide : function () {
                this.get().hide();
            }
        },


        /**
         * 节点区域计算辅助工具类
         * @type {Object}
         */
        areaUtil : {
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
                var o = this.get(el);

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
                var o = this.get(el);
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
                var o = this.get(el);
                return $(el).is(":visible") ?
                            !(coordinate.x < o.l || coordinate.x > o.r || coordinate.y < o.t || coordinate.y > o.b) :
                            false;
            }
        },

        docUtil : {
            insert : function (html) {
                $(html).insertBefore($('#ControlGhostHelper'));
            }
        },

        /**
         * 需要被实际框架进行覆盖，再页面中实际处理
         * @param  {[type]} cid [description]
         * @return {[type]}     [description]
         */
        initControl : function (cid) {
            console.log('init control ' + cid);
            _initControl(cid);
        }
    };
});