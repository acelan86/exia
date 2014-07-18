exia.define('Builder', function (require, exports, module) {
    var Frame = require('Builder.Frame'),
        DDController = require('Builder.DDController'),
        Control = require('Builder.Control'),
        Bounds = require('utils.Bounds'),
        _ = window._,
        Backbone = window.Backbone,
        Handlebars = window.Handlebars;

    function Builder(frame, preview, controlsPanel, propertitesPanel) {
        var me = this;

        /**
         * 初始化所有的Control
         */
        (function (controls) {
            var context = [];

            for (var type in controls) {
                Control.register(type, controls[type]);
                context.push({type : type});
            }

            $('#ControlsPanel').html(Handlebars.compile(
                [
                    '<ul>',
                        '{{#each this}}',
                            '<li class="control-icon" data-role="{{type}}">{{type}}</li>',
                        '{{/each}}',
                    '</ul>'
                ].join('')
            )(context));
        })(window.controls);

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
            me.frame.unselectControl();
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
            var control = Control.get(model.type);
            var tpl = control.template(model);
            me.frame.addControl(tpl);
            try {
                //me.frame.win.$('#' + model.cid)[model.type.toLowerCase()]();
            } catch (e) {}
        });
        this.Document.on('remove', function (model, collection, option) {
            console.log('remove', model.toJSON());
        });
        this.Document.on('change', function (model, collection, option) {
            console.log(model.cid, 'is change from', model.previous(), 'to', model, collection, option);
        });
        //this.initDataChangeEvents();

        //按钮
        $('#RotateButton').click(function (e) {
            $('body').toggleClass('landscape');
            me.frame.cache();
            e.stopPropagation();
        });
    }

    Builder.prototype = {
        //初始化frame加载事件
        initFrameEvents : function () {
            var me = this;
            this.frame.on('init', function () {
                console.log('frame inited!');
            });
            this.frame.on('select', function (control) {
                var cid = $(control).attr('id');
                var model = me.Document.get(cid);
                console.log(model);
                model.set({
                    'items': [
                        {text : 'aaa', url : '222'}
                    ],
                    'loop' : 1
                });
            });
            this.frame.on('sort', function (control) {
                console.log('sort ', control);
            });
            this.frame.on('unselect', function (control) {
                console.log('unselect ', control);
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
                var type = ui.draggable.data('role'),
                    control = Control.get(type),
                    model = {
                        type : type
                    };
                var model = _.extend({type : type}, control.defaults);
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