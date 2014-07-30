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
        ControlCollection = require('Builder.ControlCollection'),

        Login = require('Builder.Login');

    function Builder(frame, preview, controlsPanel, propertiesPanel, loginBox) {
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

        this.login = new Login(loginBox);


        //其他builder事件
        $('body').mousedown(function () {
            me.frame.unselectControl();
        });

        $('#RotateButton').click(function (e) {
            $('body').toggleClass('landscape');
            me.frame.cache();
            e.stopPropagation();
        });


        $('.toolbar-button-group').buttonset();

        $('#FullscreenButton').click(function (e) {
            if (!$.toggleFullscreen()) {
                alert('亲，您的浏览器过期了，不支持全屏你造么？');
            }
        });

        $('#PreviewButton').click(function (e) {
            $('body')
                .toggleClass('design')
                .toggleClass('preview');

            me.doPreview();
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
                    type = model.type,
                    control = Control.get(type);

                me.propertiesPanel.render(control.properties, model);
            });
            this.frame.on('sort', function (cid, to) {
                //console.log('sort ', control, to);
                me.Document.sort(cid, to);
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
                me.frame.stopScroll();

                me.frame.hideGhost();
                //添加数据到模型集合中
                var type = ui.draggable.data('type'),
                    control = Control.get(type),
                    model = {
                        type : type,
                        value : _.extend({}, control.defaults)
                    };
                me.Document.add/* model, before */(model, me.frame.$('.ghost').data('cid'));
            });
        },

        initPropertiesPanelEvents : function () {
            var me = this;
            this.propertiesPanel.on('change', function (cid, name, value, type) {
                console.log(cid, name, value, type);;
                me.Document
                    .get(cid)
                    .set(name, value);
            });
        },

        initDocumentChangeEvents : function () {
            var me = this;

            //新增数据
            this.Document.on('add', function (model, to) {
                var cid = model.cid,
                    type = model.type,
                    control = Control.get(type),
                    html = control.template({
                        cid : cid,
                        type : type,
                        value : model.get()
                    });

                me.frame.addControl/* before */(html, me.frame.$('#' + to));
            });

            //移除数据
            this.Document.on('remove', function (changes) {
                console.log('remove', changes);
            });

            //数据改变
            this.Document.on('change', function (cid, type, changes) {
                var control = Control.get(type),
                    html = control.template(me.Document.get(cid).toJSON());

                me.frame.replaceControl(cid, html);
                // var options = {},
                //     change;
                // for (var i = 0, len = changes.length; i < len; i++) {
                //     change = changes[i];
                //     options[change.name] = change.value;
                // }
                // try {
                //     me.frame.win.$('#' + cid)[type.toLowerCase()](options);
                // } catch (e) {}
                me.frame.showSelectMask(me.frame.$('#' + cid));
            });
            this.Document.on('sort', function (order, collection) {
                console.log(order, collection);
            });
        },

        isPreview : function () {
            return $('body').hasClass('preview');
        },

        doPreview : function () {
            if (this.isPreview()) {
                var data = this.Document.toJSON();
                $.post('/create', {
                        data : JSON.stringify({
                            controls : data
                        })
                    })
                    .done(function (res) {
                        console.log(res);
                        var doc = $('#Preview')[0].contentDocument || $('#Preview')[0].contentWindow.document;
                        doc.open('text/html');
                        doc.write(res);
                        doc.close();
                    });
            } else {
                
            }
        }
    };

    return Builder;
});