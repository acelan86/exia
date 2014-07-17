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
            controlSelector : '.control',
            containerSelector : '.container'
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
            try {
                me.frame.win.$('#' + model.cid)[model.role.toLowerCase()]();
            } catch (e) {}
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
            this.frame.on('select', function (control) {
                //console.log('select ', control);
            });
            this.frame.on('sort', function (control) {
                //console.log('sort ', control);
            });
            this.frame.on('unselect', function (control) {
                //console.log('unselect ', control);
            });
        },

        //初始化控件拖拽添加事件
        initDDControllerEvents : function () {
            var me = this;

            this.ddcontroller.on('move', function (e) {
                //try scroll
                me.frame.scrollByViewportPoint(
                    me.frame.eventToFrameViewportPoint(e).y
                );

                //find insert pos
                var point = me.frame.eventToFramePagePoint(e),
                    pos = me.frame.findInsertPos(point.x, point.y);
                me.frame.showGhost(pos);
            });
            this.ddcontroller.on('out', function (e) {
                me.frame.stopScroll();
                me.frame.hideGhost();
            });
            this.ddcontroller.on('drop', function (e, ui) {
                me.frame.hideGhost();
                me.frame.stopScroll();
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