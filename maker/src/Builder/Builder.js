exia.define('Builder', function (require, exports, module) {
    "use strict";

    var _ = window._,
        Backbone = window.Backbone,
        Handlebars = window.Handlebars,

        Bounds = require('utils.Bounds'),

        Frame = require('Builder.Frame'),
        DDController = require('Builder.DDController'),
        Control = require('Builder.Control'),
        Editor = require('Builder.Editor'),
        PropertiesPanel = require('Builder.PropertiesPanel'),
        ControlCollection = require('Builder.ControlCollection');

    function Builder(frame, preview, controlsPanel, propertiesPanel) {
        var me = this;

        /**
         * 初始化所有的Control列表
         */
        (function (controls) {
            var context = [];
            for (var control in controls) {
                context.push({
                    type : control
                });
            }
            $('#ControlsPanel').html(Handlebars.compile(
                '<ul>' +
                    '{{#each this}}' +
                        '<li class="control-icon" data-type="{{type}}">{{type}}</li>' +
                    '{{/each}}' +
                '</ul>'
            )(context));
        })(Control.get());


        /** View **/
        //frame
        this.frame = new Frame({
            dom : frame,
            controlSelector : '.control',
            containerSelector : '.container'
        });
        this.initFrameEvents();

        //拖拽控制器
        this.ddcontroller = new DDController({
            from : controlsPanel,
            to : frame,
            accept : '.control-icon'
        });
        this.initDDControllerEvents();

        this.propertiesPanel = new PropertiesPanel(propertiesPanel);
        this.initPropertiesPanelEvents();

        /* model */
        this.Document = new ControlCollection();
        this.initDocumentChangeEvents();

        this.preview = $(preview);


        //其他builder事件
        $('body').mousedown(function () {
            me.frame.unselectControl();
        });

        $('#RotateButton').click(function (e) {
            $('body').toggleClass('landscape');
            me.frame.cache();
            e.stopPropagation();
        });

        //退出前询问
        // window.onbeforeunload = function (e) {
        //     return "您所做的修改尚未保存";
        // };
    }

    Builder.prototype = {
        //初始化frame加载事件
        initFrameEvents : function () {
            var me = this;
            this.frame.on('init', function () {
                console.log('frame inited!');
            });
            //控件选中
            this.frame.on('select', function (control) {
                var cid = $(control).attr('id'),
                    model = me.Document.get(cid),
                    type = model.get('type'),
                    control = Control.get(type);

                me.propertiesPanel.render(control.properties, model);
            });
            this.frame.on('sort', function (control) {
                console.log('sort ', control);
            });
            //控件取消选中
            this.frame.on('unselect', function (control) {
                console.log('unselect ', control);
                me.propertiesPanel.clear();
            });
        },

        //初始化控件拖拽添加事件
        initDDControllerEvents : function () {
            var me = this;

            //拖拽过程尝试是否需要滚动和插入占位节点
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

            //拖拽移出隐藏占位节点，停止滚动
            this.ddcontroller.on('out', function (e) {
                me.frame.stopScroll();
                me.frame.hideGhost();
            });

            //拖拽释放到可接受区域隐藏占位节点，停止滚动，并且添加数据
            this.ddcontroller.on('drop', function (e, ui) {
                me.frame.hideGhost();
                me.frame.stopScroll();

                //添加数据到模型集合中
                var type = ui.draggable.data('type'),
                    control = Control.get(type),
                    model = {
                        type : type,
                        value : _.extend({}, control.defaults)
                    };
                me.Document.add(model);
            });
        },

        initPropertiesPanelEvents : function () {

        },

        initDocumentChangeEvents : function () {
            var me = this;

            //新增数据
            this.Document.on('add', function (model) {
                var cid = model.cid,
                    type = model.get('type'),
                    control = Control.get(type),
                    html = control.template({
                        cid : cid,
                        value : model.get('value')
                    });

                me.frame.addControl(html);
                try {
                    me.frame.win.$('#' + cid)[type.toLowerCase()]();
                } catch (e) {}
            });

            //移除数据
            this.Document.on('remove', function (model, collection, option) {
                console.log('remove', model.toJSON());
            });

            //数据改变
            this.Document.on('change', function (model, collection, option) {
                console.log(model.cid, 'is change from', model.previous(), 'to', model, collection, option);
            });
        }
    };

    return Builder;
});