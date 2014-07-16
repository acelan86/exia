exia.define('Builder', function (require, exports, module) {
    var Frame = require('Builder.Frame'),
        DDController = require('Builder.DDController'),
        Bounds = require('utils.Bounds'),
        _ = window._,
        Backbone = window.Backbone;

    function Builder(frame, preview, controlsPanel, propertitesPanel) {
        var me = this;

        /** View **/
        //frame
        this.frame = new Frame({
            dom : frame,
            selector : '.control'
        });

        //拖拽控制器
        this.ddcontroller = new DDController({
            from : controlsPanel,
            to : frame,
            accept : '.control-icon'
        });

        this.preview = $(preview);

        this.propertitesPanel = $(propertitesPanel);

        $('body').mousedown(function () {
            me.frame.hideSelectMask();
        });

        this.initFrameEvents();
        this.initDDControllerEvents();
        this.initPropertiesPanelEvents();


        /* model */

        this.Document = new Backbone.Collection();
        this.Document.on('add', function (model, collection, option) {
            var cid = model.cid;
            
            model = model.toJSON();
            model.cid = cid;
            var control = window[model.role + 'Control'];
            var tpl = control.template(model);
            me.frame.addControl(tpl);
            me.frame.window.$('#' + model.cid)[model.role.toLowerCase()]();
        });
        this.Document.on('remove', function (model, collection, option) {
            console.log('remove', model.toJSON());
        });
        this.Document.on('change', function (model, collection, option) {
            console.log('change', model.toJSON());
        });
        this.initDataChangeEvents();
    }

    Builder.prototype = {
        _getFrameLoadHandler : function () {
            var me = this;
            return function () {
                console.log('frame loaded!');
            };
        },
        //初始化frame加载事件
        initFrameEvents : function () {
            //这里用ready而不用load，load在刷新的时候不会出发
            this.frame.on('ready', this._getFrameLoadHandler());
            this.frame.on('hover', function (e) {
                //console.log('hover on', e)
            });
            this.frame.on('select', function (e) {
                //console.log('select on', e);
            });
        },

        //尝试进行滚动页面的操作
        _tryScrollFrame : function (event) {
            //尝试滚动iframe内部的内容
            var CONFIG_START_SCROLL_DISTANCE = 60,
                relY = this.frame.eventToFrameViewportPoint(event).y,
                up = CONFIG_START_SCROLL_DISTANCE,
                down = this.frame.height - CONFIG_START_SCROLL_DISTANCE;

            //相对坐标大于距离底部设置的最小距离处
            relY > down ?
                this.frame.scrollDown() :
                //相对坐标小于最小距离
                relY < up ?
                    this.frame.scrollUp() :
                    //在60 -> height - 最小距离 之间，停止滚动
                    this.frame.stopScroll();
        },
        //初始化控件拖拽添加事件
        initDDControllerEvents : function () {
            var me = this;

            this.ddcontroller.on('move', function (e) {
                me._tryScrollFrame(e);

                var point = me.frame.eventToFramePagePoint(e);
                var pos = me.frame.findInsertPos(point.x, point.y);
                me.frame.showGhost(pos);
            });
            this.ddcontroller.on('out', function (e) {
                me.frame.stopScroll();
                me.frame.hideGhost();
            });
            this.ddcontroller.on('drop', function (e, ui) {
                me.frame.hideGhost();
                var role = ui.draggable.data('role'),
                    control = window[role + 'Control'],
                    model = {
                        role : role
                    };
                var model = _.extend({role : role}, control.value);
                me.Document.add(model).cid;
            });
        },
        initPropertiesPanelEvents : function () {

        },

        initDataChangeEvents : function () {
        }
    };

    return Builder;
});