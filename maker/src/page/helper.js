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