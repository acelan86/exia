(function() {
    var Component,
        exports,
        __hasProp = {}.hasOwnProperty,
        __extends = function(child, parent) {
            for (var key in parent) {
                if (__hasProp.call(parent, key)) child[key] = parent[key]
            }
            function ctor() {
                this.constructor = child
            }
            ctor.prototype = parent.prototype;
            child.prototype = new ctor;
            child.__super__ = parent.prototype;
            return child
        };
    exports = exports != null ? exports: this;

    Component = function(_super) {
        __extends(Component, _super);
        function Component() {
            Component.__super__.constructor.apply(this, arguments);
            _.extend(this, Backbone.Events);
            this.parentControl = null;
            this.children = []
        }
        Component.prototype.getType = function() {};
        Component.prototype.setParent = function(parent) {};
        return Component
    } (Backbone.View);
    if (!exports.Drifty) {
        exports.Drifty = {}
    }
    exports.Drifty.Component = Component
}).call(this);
(function() {
    var Document,
        exports;
    exports = exports != null ? exports: this;
    Document = function() {
        Document.COMPONENT_TYPES = {};
        function Document() {
            _.extend(this, Backbone.Events)
        }
        Document.prototype.create = function(type) {
            var c;
            c = this._createComponent(type);
            c.setId(this._newComponentId(type));
            c.trigger("created");
            return c
        };
        Document.prototype._createComponent = function(type) {
            var newComponent, typeClass;
            typeClass = COMPONENT_TYPES[type];
            if (!typeClass) {
                return
            }
            newComponent = new typeClass;
            return newComponent
        };
        Document.prototype.resetDocument = function() {
            this.root = null;
            return this.typeCountMap = {}
        };
        Document.prototype._newComponentId = function(type) {
            var count, id;
            count = 1;
            while (count < 1e6) {
                id = type + count;
                if (!this.typeCountMap[id]) {
                    this.typeCountMap[id] = 1;
                    return id
                }
                count++
            }
        };
        return Document
    } ();
    if (!exports.Boggle) {
        exports.Boggle = {}
    }
    exports.Boggle.Document = Document
}).call(this);
(function() {
    var UndoRedo, exports;
    exports = exports != null ? exports: this;
    UndoRedo = function() {
        function UndoRedo() {
            _.extend(this, Backbone.Events)
        }
        return UndoRedo
    } ();
    if (!exports.Boggle) {
        exports.Boggle = {}
    }
    exports.Boggle.UndoRedo = UndoRedo
}).call(this);
(function() {
    var HtmlProcessor,
        MockComponent,
        NodeType,
        exports,
        __hasProp = {}.hasOwnProperty,
        __extends = function(child, parent) {
            for (var key in parent) {
                if (__hasProp.call(parent, key)) child[key] = parent[key]
            }
            function ctor() {
                this.constructor = child
            }
            ctor.prototype = parent.prototype;
            child.prototype = new ctor;
            child.__super__ = parent.prototype;
            return child
        };
    exports = exports != null ? exports: this;
    NodeType = {
        ELEMENT: 1,
        TEXT: 3,
        COMMENT: 8
    };
    MockComponent = function(_super) {
        __extends(MockComponent, _super);
        MockComponent.prototype.addChild = function(c) {};
        function MockComponent() {}
        return MockComponent
    } (Drifty.Component);
    HtmlProcessor = function() {
        function HtmlProcessor() {
            _.extend(this, Backbone.Events)
        }
        HtmlProcessor.prototype.parse = function(html) {
            var el;
            el = document.createElement("div");
            el.innerHTML = html;
            this._root = null;
            return this._emitTree(el)
        };
        HtmlProcessor.prototype.getRoot = function() {
            return this._root
        };
        HtmlProcessor.prototype.getComponentFromNode = function(node) {
            return new MockComponent
        };
        HtmlProcessor.prototype.processComponentOfParent = function(child, parent) {
            if (!this._root) {
                this._root = parent
            }
            return this.addChildToParent(child, parent)
        };
        HtmlProcessor.prototype.addChildToParent = function(child, parent) {};
        HtmlProcessor.prototype._emitTree = function(el) {
            var child,
                children,
                childstack,
                component,
                control,
                cs,
                parentComponent,
                _results;
            childstack = [];
            childstack.push([el, null]);
            _results = [];
            while (childstack.length) {
                cs = childstack.shift();
                el = cs[0];
                control = cs[1];
                parentComponent = control || this.getComponentFromNode(el);
                children = el.childNodes;
                _results.push(function() {
                    var _i, _len, _results1;
                    _results1 = [];
                    for (_i = 0, _len = children.length; _i < _len; _i++) {
                        child = children[_i];
                        if (child.nodeType === NodeType.TEXT && $.trim(child.data) === "") {
                            continue
                        }
                        component = this.getComponentFromNode(child);
                        if (component) {
                            this.processComponentOfParent(component, parentComponent)
                        }
                        _results1.push(childstack.push([child, component]))
                    }
                    return _results1
                }.call(this))
            }
            return _results
        };
        HtmlProcessor.prototype._parseTree = function(el) {
            var c,
                child,
                children,
                component,
                created,
                newChild,
                _i,
                _j,
                _len,
                _len1;
            created = [];
            children = el.childNodes;
            for (_i = 0, _len = children.length; _i < _len; _i++) {
                child = children[_i];
                if (child.nodeType === NodeType.TEXT && $.trim(child.data) === "") {
                    continue
                }
                newChild = this._parseTree(child);
                if (newChild) {
                    created.push(newChild)
                }
            }
            component = this.getComponentFromNode(el);
            if (component) {
                for (_j = 0, _len1 = created.length; _j < _len1; _j++) {
                    c = created[_j];
                    component.children.push(c);
                    this.trigger("childAdded", component, c)
                }
            }
            component;
            return this.trigger("componentTreeFinished", component)
        };
        return HtmlProcessor
    } ();
    exports.Drifty.HtmlProcessor = HtmlProcessor
}).call(this);

var FolderModel,
    JetstrapProject, 
    JetstrapProjectHtmlZip, 
    JetstrapProjects, 
    MediaModel, 
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) {
        for (var key in parent) {
            if (__hasProp.call(parent, key)) child[key] = parent[key]
        }
        function ctor() {
            this.constructor = child
        }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor;
        child.__super__ = parent.prototype;
        return child
    };
//Backbone.Model
JetstrapProjectHtmlZip = function(_super) {
    __extends(JetstrapProjectHtmlZip, _super);
    function JetstrapProjectHtmlZip() {
        return JetstrapProjectHtmlZip.__super__.constructor.apply(this, arguments)
    }
    JetstrapProjectHtmlZip.prototype.url = function() {
        return "/api/v1/project/" + this.id + "/htmlzip"
    };
    JetstrapProjectHtmlZip.prototype.idAttribute = "unique_id";
    return JetstrapProjectHtmlZip
} (Backbone.Model);

//Backbone.Model
JetstrapProject = function(_super) {
    __extends(JetstrapProject, _super);
    function JetstrapProject() {
        return JetstrapProject.__super__.constructor.apply(this, arguments)
    }
    JetstrapProject.prototype.urlRoot = "/api/v1/project";
    JetstrapProject.prototype.idAttribute = "unique_id";
    return JetstrapProject
} (Backbone.Model);

//Backbone.Collection
JetstrapProjects = function(_super) {
    __extends(JetstrapProjects, _super);
    function JetstrapProjects() {
        return JetstrapProjects.__super__.constructor.apply(this, arguments)
    }
    JetstrapProjects.prototype.model = JetstrapProject;
    JetstrapProjects.prototype.url = "/api/v1/projects";
    JetstrapProjects.prototype.parse = function(response) {
        return response.projects
    };
    return JetstrapProjects
} (Backbone.Collection);

//Backbone.Model
FolderModel = function(_super) {
    __extends(FolderModel, _super);
    function FolderModel() {
        return FolderModel.__super__.constructor.apply(this, arguments)
    }
    FolderModel.prototype.urlRoot = "/api/v1/folder";
    FolderModel.prototype.idAttribute = "unique_id";
    return FolderModel
} (Backbone.Model);

//Backbone.Model
MediaModel = function(_super) {
    __extends(MediaModel, _super);
    function MediaModel() {
        return MediaModel.__super__.constructor.apply(this, arguments)
    }
    MediaModel.prototype.urlRoot = function() {
        return "/api/v1/project/" + this.get("project_unique_id") + "/mediaupload"
    };
    return MediaModel
} (Backbone.Model);


window.JetstrapProject = JetstrapProject;
window.JetstrapProjects = JetstrapProjects;
window.FolderModel = FolderModel;
window.MediaModel = MediaModel;
var Builder,
    BuilderRouter,
    ButtonWidget,
    ButtonsWidget,
    Controls,
    DocUtils,
    Document,
    FileUploadWidget,
    FrameworkTemplates,
    Frameworks,
    GridLayoutWidget,
    HTMLAttrProperty,
    HiddenWidget,
    HtmlProcessor,
    IconWidget,
    Jetstrap,
    LinkToWidget,
    NodeType,
    Property,
    RichEditorWidget,
    SelectWidget,
    SingleTextWidget,
    SliderWidget,
    Template,
    ToggleWidget,
    UI,
    ValueTextItemsWidget,
    Widget,
    WysiToolbar,
    method,
    methods,
    _A,
    _E,
    _i,
    _len,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) {
        for (var key in parent) {
            if (__hasProp.call(parent, key)) child[key] = parent[key]
        }
        function ctor() {
            this.constructor = child
        }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor;
        child.__super__ = parent.prototype;
        return child
    },
    __indexOf = [].indexOf || function(item) {
        for (var i = 0,
        l = this.length; i < l; i++) {
            if (i in this && this[i] === item) return i
        }
        return - 1
    },
    __bind = function(fn, me) {
        return function() {
            return fn.apply(me, arguments)
        }
    };
window.JDEBUG = window.JDEBUG || window.DEBUG || true;
if (!window.JDEBUG) {
    if (!window.console) {
        window.console = {}
    }
    methods = ["log", "debug", "warn", "info", "error"];
    for (_i = 0, _len = methods.length; _i < _len; _i++) {
        method = methods[_i];
        console[method] = function() {}
    }
}
NodeType = {
    ELEMENT: 1,
    TEXT: 3,
    COMMENT: 8
};

/** Handlebar 门面方法 */
Template = function() {
    function Template() {}
    Template.render = function(name, data) {
        var source, template;
        source = $("#" + name).html();
        template = Handlebars.compile(source);
        return template(data || {})
    };
    return Template
} ();



window.Handlebars.registerHelper("p", function(prop) {
    var d, v;
    d = prop.defaultValue();
    v = prop.value();
    return new Handlebars.SafeString(v)
});
window.Handlebars.registerHelper("ps", function(prop) {
    var d, v;
    d = prop.defaultValue();
    v = prop.value();
    if (d !== v) {
        return new Handlebars.SafeString(" " + v)
    }
    return new Handlebars.SafeString("")
});
window.Handlebars.registerHelper("pattr", function(prop, attr) {
    var d, v;
    d = prop.defaultValue();
    v = prop.value();
    if (d !== v) {
        return new Handlebars.SafeString(" " + attr + '="' + v + '"')
    }
    return new Handlebars.SafeString("")
});
window.Handlebars.registerHelper("pcss", function(prop, entry) {
    var d, v;
    d = prop.defaultValue();
    v = prop.value();
    if (v && v !== "") {
        return new Handlebars.SafeString(" " + entry + ": " + v + ";")
    }
    return new Handlebars.SafeString("")
});



//这是什么？
$.widget("jetstrap.toggleslider", $.ui.mouse, {
    options: {
        on: null,
        off: null,
        leftText: "",
        rightText: ""
    },
    _init: function() {
        return this._mouseInit()
    },
    _create: function() {
        var self;
        self = this;
        console.log("Slider created");
        $(this.element).addClass("toggle-slider");
        $(this.element).addClass(this.options.extraClass);
        $(this.element).html('<div class="offtext on">' + this.options.leftText + '</div><div class="slider-wrapper"><div class="on inactive"></div>' + '<div class="off"></div><div class="slider"></div></div><div class="ontext">' + this.options.rightText + "</div>");
        $(".slider-wrapper", this.element).click(function() {
            var $this;
            if (self._disableClick === true) {
                self._disableClick = false;
                return false
            }
            $this = this;
            if ($(".on", this).hasClass("inactive")) {
                self._on(this)
            } else {
                self._off(this)
            }
            return false
        });
        $(".offtext", this.element).click(function() {
            if (self._disableClick === true) {
                self._disableClick = false;
                return false
            }
            self._off($(".slider-wrapper", self.element));
            return false
        });
        return $(".ontext", this.element).click(function() {
            if (self._disableClick === true) {
                self._disableClick = false;
                return false
            }
            self._on($(".slider-wrapper", self.element));
            return false
        })
    },
    _on: function(el, quiet) {
        var self;
        self = this;
        return $(".slider", el).animate({
            left: this.options.leftOffset || "20px"
        },
        50,
        function() {
            $(".off", el).addClass("inactive");
            $(".on", el).removeClass("inactive");
            $(".offtext", self.element).removeClass("on");
            $(".ontext", self.element).addClass("on");
            if (!quiet) {
                return self._trigger("on")
            }
        })
    },
    _off: function(el, quiet) {
        var self;
        self = this;
        return $(".slider", el).animate({
            left: "1px"
        },
        50,
        function() {
            $(".off", el).removeClass("inactive");
            $(".on", el).addClass("inactive");
            $(".offtext", self.element).addClass("on");
            $(".ontext", self.element).removeClass("on");
            if (!quiet) {
                return self._trigger("off")
            }
        })
    },
    on: function() {
        return this._on($(".slider-wrapper", this.element), true)
    },
    off: function() {
        return this._off($(".slider-wrapper", this.element), true)
    },
    triggerOff: function() {
        return this._off($(".slider-wrapper", this.element), false)
    },
    _mouseStart: function(e) {
        var elPos, parentPos, point;
        this._slider = this.element.find(".slider");
        this._wrapper = this.element.find(".slider-wrapper");
        elPos = this._slider.position();
        point = e.screenX;
        parentPos = this.element.offset();
        point = {
            x: e.pageX - parentPos.left,
            y: e.pageY - parentPos.top
        };
        this._startPoint = point;
        this._clickOffset = {
            x: elPos.left - point.x,
            y: elPos.top - point.y
        };
        return console.log("Clicked down", this._clickOffset)
    },
    _mouseDrag: function(e) {
        var distance, ds, elPos, newLeft, parentPos, point, wrapperWidth;
        elPos = this._slider.position();
        parentPos = this.element.offset();
        wrapperWidth = this._wrapper.width();
        point = {
            x: e.pageX - parentPos.left,
            y: e.pageY - parentPos.top
        };
        if (!this._lastPos) {
            this._lastPos = point
        }
        ds = {
            x: this._startPoint.x - point.x,
            y: 0
        };
        distance = Math.sqrt(ds.x * ds.x + ds.y * ds.y);
        if (distance < 5 && !this._isDragging) {
            return
        }
        this._isDragging = true;
        newLeft = Math.min(wrapperWidth + 4 - this._slider.width(), this._lastPos.x + this._clickOffset.x);
        newLeft = Math.max(0, newLeft);
        this._slider.css({
            left: newLeft
        });
        return this._lastPos = point
    },
    _mouseStop: function() {
        var pos, wrapperWidth;
        if (this._isDragging) {
            this._disableClick = true
        }
        this._isDragging = false;
        pos = this._slider.position();
        wrapperWidth = this._wrapper.width();
        if (pos.left > wrapperWidth / 2 - 15) {
            return this._on(this.element.find(".slider-wrapper"))
        } else {
            return this._off(this.element.find(".slider-wrapper"))
        }
    }
});
$.widget("jetstrap.collapser", {
    _create: function() {
        var self;
        self = this;
        return $("li > span", this.element).click(function() {
            var li;
            li = $(this).parent();
            if (!li.hasClass("active")) {
                self._expand(li)
            } else {
                self._collapse(li)
            }
            return false
        })
    },
    _expand: function(which) {
        return which.addClass("active")
    },
    _collapse: function(which) {
        return which.removeClass("active")
    }
});
_E = function(tag) {
    return document.createElement(tag)
};
_A = function(el, child) {
    return el.appendChild(child)
};
Widget = function(_super) {
    __extends(Widget, _super);
    Widget.prototype.renderTemplate = function(name, data) {
        var source, template;
        source = $("#jetstrap-widget-" + name).html();
        template = Handlebars.compile(source);
        return template(data)
    };
    function Widget(type) {
        this.type = type;
        this.data = {}
    }
    Widget.prototype.render = function() {
        var d, html;
        d = document.createElement("div");
        html = this.renderTemplate(this.type, this.data);
        $(d).html(html);
        return this.setElement(d)
    };
    Widget.prototype.setValue = function(val) {};
    return Widget
} (Backbone.View);
HiddenWidget = function(_super) {
    __extends(HiddenWidget, _super);
    function HiddenWidget(data) {
        HiddenWidget.__super__.constructor.call(this, "hidden");
        this.data = $.extend({},
        data)
    }
    HiddenWidget.prototype.setValue = function(value) {};
    HiddenWidget.prototype.getValue = function() {};
    return HiddenWidget
} (Widget);
ToggleWidget = function(_super) {
    __extends(ToggleWidget, _super);
    function ToggleWidget(data) {
        ToggleWidget.__super__.constructor.call(this, "toggle");
        this.data = $.extend({},
        data)
    }
    ToggleWidget.prototype.events = {
        "click .switch": "onToggleChanged"
    };
    ToggleWidget.prototype.onToggleChanged = function(event) {
        var checked, t;
        t = $(event.currentTarget).find("input");
        checked = t.is(":checked");
        if (checked) {
            return this.trigger("valueChanged", this.data.onValue)
        } else {
            return this.trigger("valueChanged", this.data.offValue)
        }
    };
    ToggleWidget.prototype.render = function() {
        var s;
        ToggleWidget.__super__.render.apply(this, arguments);
        s = this.$el.find(".switch");
        return s.switchbtn(s.data())
    };
    ToggleWidget.prototype.setValue = function(val) {
        if (val === this.data.onValue) {
            return this.data._active = "active"
        } else {
            return this.data._active = ""
        }
    };
    return ToggleWidget
} (Widget);
SelectWidget = function(_super) {
    __extends(SelectWidget, _super);
    function SelectWidget(data) {
        SelectWidget.__super__.constructor.call(this, "select");
        this.data = $.extend({},
        data)
    }
    SelectWidget.prototype.events = {
        "change select": "onChange"
    };
    SelectWidget.prototype.onChange = function(event) {
        var val;
        val = $(event.currentTarget).val();
        if (val === "_blank_") {
            val = ""
        }
        return this.trigger("valueChanged", val)
    };
    SelectWidget.prototype.setValue = function(val) {
        var i, _j, _len1, _ref, _results;
        _ref = this.data.items;
        _results = [];
        for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
            i = _ref[_j];
            if (i.value === val) {
                _results.push(i.selected = true)
            } else {
                _results.push(i.selected = false)
            }
        }
        return _results
    };
    SelectWidget.prototype.render = function() {
        SelectWidget.__super__.render.apply(this, arguments);
        return $(this.el).find("select").select2({
            minimumResultsForSearch: 100
        })
    };
    return SelectWidget
} (Widget);
IconWidget = function(_super) {
    __extends(IconWidget, _super);
    function IconWidget() {
        IconWidget.__super__.constructor.call(this, {
            items: [{
                value: "icon-glass",
                text: "glass"
            },
            {
                value: "icon-music",
                text: "music"
            },
            {
                value: "icon-search",
                text: "search"
            },
            {
                value: "icon-envelope",
                text: "envelope"
            },
            {
                value: "icon-heart",
                text: "heart"
            },
            {
                value: "icon-star",
                text: "star"
            },
            {
                value: "icon-star-empty",
                text: "star-empty"
            },
            {
                value: "icon-user",
                text: "user"
            },
            {
                value: "icon-film",
                text: "film"
            },
            {
                value: "icon-th-large",
                text: "th-large"
            },
            {
                value: "icon-th",
                text: "th"
            },
            {
                value: "icon-th-list",
                text: "th-list"
            },
            {
                value: "icon-ok",
                text: "ok"
            },
            {
                value: "icon-remove",
                text: "remove"
            },
            {
                value: "icon-zoom-in",
                text: "zoom-in"
            },
            {
                value: "icon-zoom-out",
                text: "zoom-out"
            },
            {
                value: "icon-off",
                text: "off"
            },
            {
                value: "icon-signal",
                text: "signal"
            },
            {
                value: "icon-cog",
                text: "cog"
            },
            {
                value: "icon-trash",
                text: "trash"
            },
            {
                value: "icon-home",
                text: "home"
            },
            {
                value: "icon-file",
                text: "file"
            },
            {
                value: "icon-time",
                text: "time"
            },
            {
                value: "icon-road",
                text: "road"
            },
            {
                value: "icon-download-alt",
                text: "download-alt"
            },
            {
                value: "icon-download",
                text: "download"
            },
            {
                value: "icon-upload",
                text: "upload"
            },
            {
                value: "icon-inbox",
                text: "inbox"
            },
            {
                value: "icon-play-circle",
                text: "play-circle"
            },
            {
                value: "icon-repeat",
                text: "repeat"
            },
            {
                value: "icon-refresh",
                text: "refresh"
            },
            {
                value: "icon-list-alt",
                text: "list-alt"
            },
            {
                value: "icon-lock",
                text: "lock"
            },
            {
                value: "icon-flag",
                text: "flag"
            },
            {
                value: "icon-headphones",
                text: "headphones"
            },
            {
                value: "icon-volume-off",
                text: "volume-off"
            },
            {
                value: "icon-volume-down",
                text: "volume-down"
            },
            {
                value: "icon-volume-up",
                text: "volume-up"
            },
            {
                value: "icon-qrcode",
                text: "qrcode"
            },
            {
                value: "icon-barcode",
                text: "barcode"
            },
            {
                value: "icon-tag",
                text: "tag"
            },
            {
                value: "icon-tags",
                text: "tags"
            },
            {
                value: "icon-book",
                text: "book"
            },
            {
                value: "icon-bookmark",
                text: "bookmark"
            },
            {
                value: "icon-print",
                text: "print"
            },
            {
                value: "icon-camera",
                text: "camera"
            },
            {
                value: "icon-font",
                text: "font"
            },
            {
                value: "icon-bold",
                text: "bold"
            },
            {
                value: "icon-italic",
                text: "italic"
            },
            {
                value: "icon-text-height",
                text: "text-height"
            },
            {
                value: "icon-text-width",
                text: "text-width"
            },
            {
                value: "icon-align-left",
                text: "align-left"
            },
            {
                value: "icon-align-center",
                text: "align-center"
            },
            {
                value: "icon-align-right",
                text: "align-right"
            },
            {
                value: "icon-align-justify",
                text: "align-justify"
            },
            {
                value: "icon-list",
                text: "list"
            },
            {
                value: "icon-indent-left",
                text: "indent-left"
            },
            {
                value: "icon-indent-right",
                text: "indent-right"
            },
            {
                value: "icon-facetime-video",
                text: "facetime-video"
            },
            {
                value: "icon-picture",
                text: "picture"
            },
            {
                value: "icon-pencil",
                text: "pencil"
            },
            {
                value: "icon-map-marker",
                text: "map-marker"
            },
            {
                value: "icon-adjust",
                text: "adjust"
            },
            {
                value: "icon-tint",
                text: "tint"
            },
            {
                value: "icon-edit",
                text: "edit"
            },
            {
                value: "icon-share",
                text: "share"
            },
            {
                value: "icon-check",
                text: "check"
            },
            {
                value: "icon-move",
                text: "move"
            },
            {
                value: "icon-step-backward",
                text: "step-backward"
            },
            {
                value: "icon-fast-backward",
                text: "fast-backward"
            },
            {
                value: "icon-backward",
                text: "backward"
            },
            {
                value: "icon-play",
                text: "play"
            },
            {
                value: "icon-pause",
                text: "pause"
            },
            {
                value: "icon-stop",
                text: "stop"
            },
            {
                value: "icon-forward",
                text: "forward"
            },
            {
                value: "icon-fast-forward",
                text: "fast-forward"
            },
            {
                value: "icon-step-forward",
                text: "step-forward"
            },
            {
                value: "icon-eject",
                text: "eject"
            },
            {
                value: "icon-chevron-left",
                text: "chevron-left"
            },
            {
                value: "icon-chevron-right",
                text: "chevron-right"
            },
            {
                value: "icon-plus-sign",
                text: "plus-sign"
            },
            {
                value: "icon-minus-sign",
                text: "minus-sign"
            },
            {
                value: "icon-remove-sign",
                text: "remove-sign"
            },
            {
                value: "icon-ok-sign",
                text: "ok-sign"
            },
            {
                value: "icon-question-sign",
                text: "question-sign"
            },
            {
                value: "icon-info-sign",
                text: "info-sign"
            },
            {
                value: "icon-screenshot",
                text: "screenshot"
            },
            {
                value: "icon-remove-circle",
                text: "remove-circle"
            },
            {
                value: "icon-ok-circle",
                text: "ok-circle"
            },
            {
                value: "icon-ban-circle",
                text: "ban-circle"
            },
            {
                value: "icon-arrow-left",
                text: "arrow-left"
            },
            {
                value: "icon-arrow-right",
                text: "arrow-right"
            },
            {
                value: "icon-arrow-up",
                text: "arrow-up"
            },
            {
                value: "icon-arrow-down",
                text: "arrow-down"
            },
            {
                value: "icon-share-alt",
                text: "share-alt"
            },
            {
                value: "icon-resize-full",
                text: "resize-full"
            },
            {
                value: "icon-resize-small",
                text: "resize-small"
            },
            {
                value: "icon-plus",
                text: "plus"
            },
            {
                value: "icon-minus",
                text: "minus"
            },
            {
                value: "icon-asterisk",
                text: "asterisk"
            },
            {
                value: "icon-exclamation-sign",
                text: "exclamation-sign"
            },
            {
                value: "icon-gift",
                text: "gift"
            },
            {
                value: "icon-leaf",
                text: "leaf"
            },
            {
                value: "icon-fire",
                text: "fire"
            },
            {
                value: "icon-eye-open",
                text: "eye-open"
            },
            {
                value: "icon-eye-close",
                text: "eye-close"
            },
            {
                value: "icon-warning-sign",
                text: "warning-sign"
            },
            {
                value: "icon-plane",
                text: "plane"
            },
            {
                value: "icon-calendar",
                text: "calendar"
            },
            {
                value: "icon-random",
                text: "random"
            },
            {
                value: "icon-comment",
                text: "comment"
            },
            {
                value: "icon-magnet",
                text: "magnet"
            },
            {
                value: "icon-chevron-up",
                text: "chevron-up"
            },
            {
                value: "icon-chevron-down",
                text: "chevron-down"
            },
            {
                value: "icon-retweet",
                text: "retweet"
            },
            {
                value: "icon-shopping-cart",
                text: "shopping-cart"
            },
            {
                value: "icon-folder-close",
                text: "folder-close"
            },
            {
                value: "icon-folder-open",
                text: "folder-open"
            },
            {
                value: "icon-resize-vertical",
                text: "resize-vertical"
            },
            {
                value: "icon-resize-horizontal",
                text: "resize-horizontal"
            },
            {
                value: "icon-hdd",
                text: "hdd"
            },
            {
                value: "icon-bullhorn",
                text: "bullhorn"
            },
            {
                value: "icon-bell",
                text: "bell"
            },
            {
                value: "icon-certificate",
                text: "certificate"
            },
            {
                value: "icon-thumbs-up",
                text: "thumbs-up"
            },
            {
                value: "icon-thumbs-down",
                text: "thumbs-down"
            },
            {
                value: "icon-hand-right",
                text: "hand-right"
            },
            {
                value: "icon-hand-left",
                text: "hand-left"
            },
            {
                value: "icon-hand-up",
                text: "hand-up"
            },
            {
                value: "icon-hand-down",
                text: "hand-down"
            },
            {
                value: "icon-circle-arrow-right",
                text: "circle-arrow-right"
            },
            {
                value: "icon-circle-arrow-left",
                text: "circle-arrow-left"
            },
            {
                value: "icon-circle-arrow-up",
                text: "circle-arrow-up"
            },
            {
                value: "icon-circle-arrow-down",
                text: "circle-arrow-down"
            },
            {
                value: "icon-globe",
                text: "globe"
            },
            {
                value: "icon-wrench",
                text: "wrench"
            },
            {
                value: "icon-tasks",
                text: "tasks"
            },
            {
                value: "icon-filter",
                text: "filter"
            },
            {
                value: "icon-briefcase",
                text: "briefcase"
            },
            {
                value: "icon-fullscreen",
                text: "fullscreen"
            }]
        })
    }
    IconWidget.prototype.render = function() {
        IconWidget.__super__.render.apply(this, arguments);
        return $(this.el).find("select").select2({
            formatResult: function(icon) {
                return '<i class="' + icon.id + ' icon-white"></i> ' + icon.text
            },
            formatSelection: function(icon) {
                return '<i class="' + icon.id + ' icon-white"></i> ' + icon.text
            },
            minimumResultsForSearch: 100
        })
    };
    return IconWidget
} (SelectWidget);
GridLayoutWidget = function(_super) {
    __extends(GridLayoutWidget, _super);
    GridLayoutWidget.prototype.events = {
        "change select": "onChange",
        "keyup input": "onKeyUp"
    };
    GridLayoutWidget.prototype.onChange = function(event) {
        var val;
        val = $(event.currentTarget).val();
        if (val === "_custom_") {
            val = "";
            $(this.el).find("input.custom-layout").removeClass("hidden");
            return false
        }
        $(this.el).find("input.custom-layout").addClass("hidden");
        return this.trigger("valueChanged", val)
    };
    GridLayoutWidget.prototype.onKeyUp = function(event) {
        var v;
        v = $(event.currentTarget).val();
        return this.trigger("valueChanged", v)
    };
    GridLayoutWidget.prototype.setValue = function(val) {
        var found, i, _j, _len1, _ref;
        found = false;
        _ref = this.data.items;
        for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
            i = _ref[_j];
            if (i.value === val) {
                i.selected = true;
                found = true
            } else {
                i.selected = false
            }
        }
        if (!found) {
            return this.data.customValue = val
        }
    };
    GridLayoutWidget.prototype.render = function() {
        GridLayoutWidget.__super__.render.apply(this, arguments);
        return $(this.el).find("select").select2({
            minimumResultsForSearch: 100
        })
    };
    function GridLayoutWidget() {
        GridLayoutWidget.__super__.constructor.call(this, "gridlayout");
        this.data = {
            items: [{
                value: "6 6",
                text: "6-6"
            },
            {
                value: "4 4 4",
                text: "4-4-4"
            },
            {
                value: "4 8",
                text: "4-8"
            },
            {
                value: "8 4",
                text: "8-4"
            },
            {
                value: "3 3 3 3",
                text: "3-3-3-3"
            },
            {
                value: "2 10",
                text: "2-10"
            },
            {
                value: "10 2",
                text: "10-2"
            },
            {
                value: "3 9",
                text: "3-9"
            },
            {
                value: "9 3",
                text: "9-3"
            }]
        }
    }
    return GridLayoutWidget
} (Widget);
SingleTextWidget = function(_super) {
    __extends(SingleTextWidget, _super);
    function SingleTextWidget() {
        SingleTextWidget.__super__.constructor.call(this, "singletext")
    }
    SingleTextWidget.prototype.events = {
        "keyup input": "onKeyUp"
    };
    SingleTextWidget.prototype.onKeyUp = function(event) {
        var val;
        val = $(event.currentTarget).val();
        console.log("Text value changed", val);
        this.data.text = val;
        this.trigger("valueChanged", val);
        return true
    };
    SingleTextWidget.prototype.setValue = function(value) {
        this.data.text = value;
        return $(this.el).find("input[type=text]").val(value)
    };
    return SingleTextWidget
} (Widget);
ButtonWidget = function(_super) {
    __extends(ButtonWidget, _super);
    ButtonWidget.prototype.events = {
        "click button": "onClick"
    };
    function ButtonWidget(data) {
        ButtonWidget.__super__.constructor.call(this, "button");
        this.data = $.extend({},
        data)
    }
    ButtonWidget.prototype.onClick = function(event) {
        return this.trigger("valueChanged")
    };
    return ButtonWidget
} (Widget);
ButtonsWidget = function(_super) {
    __extends(ButtonsWidget, _super);
    ButtonsWidget.prototype.events = {
        "click button": "onClick"
    };
    function ButtonsWidget(data) {
        ButtonsWidget.__super__.constructor.call(this, "buttons");
        this.data = $.extend({},
        data)
    }
    ButtonsWidget.prototype.onClick = function(event) {
        var which;
        which = $(event.currentTarget).data("which");
        return this.trigger("valueChanged", which)
    };
    return ButtonsWidget
} (Widget);
ValueTextItemsWidget = function(_super) {
    __extends(ValueTextItemsWidget, _super);
    ValueTextItemsWidget.prototype.events = {
        "keyup input": "onKeyUp",
        "click button": "onClick"
    };
    ValueTextItemsWidget.prototype.onKeyUp = function(event) {
        var input, parent, t, v;
        input = $(event.currentTarget);
        parent = input.parent().parent();
        v = parent.find("input:first").val();
        t = parent.find("input:nth(1)").val();
        this.data.items[parent.index()] = {
            text: t,
            value: v
        };
        return this.trigger("valueChanged", this.data.items)
    };
    ValueTextItemsWidget.prototype.onClick = function(event) {
        this.data.items.push({
            value: "value" + this.data.items.length,
            text: "Item" + this.data.items.length
        });
        this.render();
        return this.trigger("valueChanged", this.data.items)
    };
    ValueTextItemsWidget.prototype.render = function() {
        var d, html;
        d = this.el || _E("div");
        d.innerHTML = "";
        html = Template.render("jetstrap-widget-valuetextitems", this.data);
        $(d).html(html);
        return this.setElement(d)
    };
    function ValueTextItemsWidget(data) {
        ValueTextItemsWidget.__super__.constructor.call(this, "valuetextitems");
        this.data = $.extend({},
        data)
    }
    return ValueTextItemsWidget
} (Widget);
FileUploadWidget = function(_super) {
    __extends(FileUploadWidget, _super);
    FileUploadWidget.prototype.events = {
        "keyup input": "onSrcChanged",
        "click button": "onUploadClicked"
    };
    function FileUploadWidget() {
        FileUploadWidget.__super__.constructor.call(this, "fileupload");
        this.data = {}
    }
    FileUploadWidget.prototype.setValue = function(value) {
        this.data.src = value;
        return $(this.el).find("input").val(value)
    };
    FileUploadWidget.prototype._sendFile = function(model, resp) {
        $(".loading", self.el).addClass("hidden");
        if (!resp.success) {
            return
        }
        return self.trigger("fileUploaded", resp)
    };
    FileUploadWidget.prototype.onSrcChanged = function(event) {
        var v;
        v = $(event.target).val();
        return self.trigger("valueChanged", v)
    };
    FileUploadWidget.prototype.onUploadClicked = function(event) {
        var app, self, _this = this;
        self = this;
        app = window.Jetstrap.builder.getDocument().project;
        return filepicker.pick({
            services: ["COMPUTER", "URL", "DROPBOX", "GOOGLE_DRIVE", "IMAGE_SEARCH", "GITHUB", "BOX", "EVERNOTE", "FLICKR", "GMAIL", "INSTAGRAM", "FACEBOOK", "PICASA"]
        },
        function(file) {
            $(_this.el).find(".loading-indicator").removeClass("hidden");
            $(_this.el).find("input").attr("disabled", "disabled");
            $(_this.el).find("button").addClass("disabled");
            return filepicker.store(file,
            function(f) {
                var asset;
                asset = new MediaModel;
                asset.set(f);
                asset.set("project_unique_id", app.id);
                return asset.save(null, {
                    success: function(model, resp) {
                        $(_this.el).find(".loading-indicator").addClass("hidden");
                        $(_this.el).find("input").removeAttr("disabled");
                        $(_this.el).find("button").removeClass("disabled");
                        console.log("Successfully uploaded file!");
                        _this.trigger("fileUploaded", model);
                        _this.setValue(model.get("s3_filename"));
                        return _this.trigger("valueChanged", model.get("s3_filename"))
                    },
                    error: function(resp) {
                        $(this.el).find(".loading-indicator").addClass("hidden");
                        $(this.el).find("input").removeAttr("disabled");
                        $(this.el).find("button").removeClass("disabled");
                        return this.trigger("fileUploadFailed", resp)
                    }
                })
            })
        })
    };
    return FileUploadWidget
} (Widget);
LinkToWidget = function(_super) {
    __extends(LinkToWidget, _super);
    function LinkToWidget() {
        LinkToWidget.__super__.constructor.call(this, "linkto")
    }
    LinkToWidget.prototype.events = {
        "change select": "onChange"
    };
    LinkToWidget.prototype.onChange = function(event) {
        var link, val;
        val = $(event.currentTarget).val();
        console.log("Text value changed", val);
        if (val === "_URL_") {
            link = prompt("URL");
            if (link) {
                if (link.indexOf("http://") === -1 && link.indexOf("https://") === -1) {
                    link = "http://" + link
                }
                this.data.url = link
            } else {
                this.data.url = "#"
            }
            this.trigger("valueChanged", this.data.url);
            this.render();
            return
        }
        return this.trigger("valueChanged", val)
    };
    LinkToWidget.prototype.setValue = function(value) {
        this.data.url = value;
        return $(this.el).find("select").val(value)
    };
    LinkToWidget.prototype.render = function() {
        var d, foundPage, o, option, s, screen_url, screens, select, u, urlOption, _j, _len1;
        d = this.el || _E("div");
        d.innerHTML = "";
        select = _E("select");
        foundPage = false;
        o = _E("option");
        o.innerHTML = "#";
        o.setAttribute("value", "#");
        if (this.data.url === "#") {
            o.setAttribute("selected", "selected")
        }
        _A(select, o);
        screens = window.Jetstrap.builder.getScreens();
        for (_j = 0, _len1 = screens.length; _j < _len1; _j++) {
            s = screens[_j];
            screen_url = "screen-" + s.unique_id + ".html";
            option = _E("option");
            option.innerHTML = s.name;
            option.setAttribute("value", screen_url);
            if (screen_url === this.data.url) {
                foundPage = true;
                option.setAttribute("selected", "selected")
            }
            _A(select, option)
        }
        if (!foundPage && !(this.data.url === "#")) {
            u = _E("option");
            u.innerHTML = this.data.url;
            u.setAttribute("selected", "selected");
            u.value = this.data.url;
            _A(select, u)
        }
        urlOption = _E("option");
        urlOption.innerHTML = "URL...";
        urlOption.setAttribute("value", "_URL_");
        _A(select, urlOption);
        _A(d, select);
        this.data.screens = screens;
        this.setElement(d);
        return $(this.el).find("select").select2({
            minimumResultsForSearch: 100
        })
    };
    return LinkToWidget
} (Widget);
SliderWidget = function(_super) {
    __extends(SliderWidget, _super);
    function SliderWidget(data) {
        SliderWidget.__super__.constructor.call(this, "slider");
        this.data = $.extend({
            content: ""
        },
        data)
    }
    SliderWidget.prototype.setValue = function(value) {
        this.data.value = value;
        return this.render
    };
    SliderWidget.prototype.render = function() {
        var _this = this;
        SliderWidget.__super__.render.apply(this, arguments);
        return $(this.el).find(".slider").slider({
            min: this.data.min,
            max: this.data.max,
            value: this.data.value,
            slide: function(event, ui) {
                if (ui.value < 1) {
                    return _this.trigger("valueChanged", null)
                } else {
                    return _this.trigger("valueChanged", ui.value)
                }
            }
        })
    };
    return SliderWidget
} (Widget);
RichEditorWidget = function(_super) {
    __extends(RichEditorWidget, _super);
    function RichEditorWidget(data) {
        RichEditorWidget.__super__.constructor.call(this, "editor");
        this.data = $.extend({
            content: ""
        },
        data)
    }
    RichEditorWidget.prototype.setValue = function(content) {
        return this.data.content = content
    };
    RichEditorWidget.prototype.render = function() {
        var ta, _this = this;
        ta = document.createElement("textarea");
        if (!this.el) {
            this.el = document.createElement("div");
            this.el.appendChild(ta)
        } else {
            $(this.el).html(ta)
        }
        ta.value = this.data.content;
        return setTimeout(function() {
            var editor;
            editor = CKEDITOR.replace(ta, {
                height: "100px",
                enterMode: CKEDITOR.ENTER_BR,
                toolbar: [["Bold", "Italic", "-", "NumberedList", "BulletedList", "-", "JustifyLeft", "JustifyCenter", "JustifyRight", "Format"], ["Link", "Unlink"], ["Source"]]
            });
            return editor.on("change",
            function(e) {
                console.log("Editor changed", e);
                return _this.trigger("valueChanged", e.editor.getData())
            })
        },
        20)
    };
    return RichEditorWidget
} (Widget);
Property = function() {
    function Property(data) {
        var self;
        _.extend(this, Backbone.Events);
        self = this;
        this.k = data["key"];
        this.v = data["value"];
        this.name = data["name"];
        this.pos = data["pos"];
        this.type = data["type"];
        this.widgetdata = data["widgetdata"];
        this.widget = new this.type(this.widgetdata);
        this.widget.setValue(this.v);
        this.widget.bind("valueChanged",
        function(val) {
            var oldValue;
            oldValue = self.v;
            self.v = val;
            return self.trigger("propertyChanged", oldValue)
        });
        this.dv = this.v
    }
    Property.prototype.key = function() {
        return this.k
    };
    Property.prototype.value = function() {
        return this.v
    };
    Property.prototype.defaultValue = function() {
        return this.dv
    };
    Property.prototype.setValue = function(value) {
        this.v = value;
        return this.widget.setValue(this.v)
    };
    Property.prototype.widget = function() {
        return this.widget
    };
    Property.prototype.renderWidget = function() {
        this.widget.setValue(this.v);
        return this.widget.render()
    };
    return Property
} ();
HTMLAttrProperty = function(_super) {
    __extends(HTMLAttrProperty, _super);
    function HTMLAttrProperty(data, attributes) {
        this.attributes = attributes;
        HTMLAttrProperty.__super__.constructor.call(this, data)
    }
    HTMLAttrProperty.prototype.setValue = function(attributes) {
        var el;
        if (typeof attributes === "string") {
            el = $("<div " + attributes + " />");
            return this.attributes = el.get(0).attributes
        } else {
            return this.attributes = attributes
        }
    };
    HTMLAttrProperty.prototype.setAttribute = function(name, value) {
        var a, i;
        if (!this.attributes) {
            return this.setValue([{
                name: name,
                value: value
            }])
        } else {
            i = 0;
            while (i < this.attributes.length) {
                a = this.attributes[i];
                if (a.name && a.name.toLowerCase() === name) {
                    this.attributes[i] = {
                        name: name,
                        value: value
                    };
                    return
                }
                i++
            }
            return this.attributes.push({
                name: name,
                value: value
            })
        }
    };
    HTMLAttrProperty.prototype.value = function() {
        var attr, attrs, i;
        attrs = [];
        if (this.attributes) {
            i = 0;
            while (i < this.attributes.length) {
                attr = this.attributes[i];
                if (attr.value) {
                    attrs.push(attr.name + '="' + attr.value.replace('"', '"') + '"')
                }
                i++
            }
        }
        return attrs.join(" ")
    };
    HTMLAttrProperty.prototype.getAttribute = function(name) {
        var attr, attrs, i;
        attrs = [];
        if (this.attributes) {
            i = 0;
            while (i < this.attributes.length) {
                attr = this.attributes[i];
                if (attr.name && attr.name.toLowerCase() === name.toLowerCase()) {
                    return attr
                }
                i++
            }
        }
        return null
    };
    return HTMLAttrProperty
} (Property);
UI = function() {
    function UI() {}
    UI.prototype.controls = [];
    return UI
} ();

/** 引用的框架 默认bootstrap **/
Frameworks = function() {
    function Frameworks() {}
    Frameworks._frameworks = {};
    Frameworks._frameworkList = [];
    Frameworks.add = function(framework, data) {
        data.framework = framework;
        this._frameworks[framework] = data;
        return this._frameworkList.push({
            framework: framework,
            data: data
        })
    };
    Frameworks.get = function(framework) {
        return this._frameworks[framework]
    };
    Frameworks.getFrameworks = function() {
        return this._frameworkList
    };
    return Frameworks
} ();
FrameworkTemplates = function() {
    function FrameworkTemplates() {}
    FrameworkTemplates._templates = {};
    FrameworkTemplates.add = function(framework, data) {
        if (!this._templates[framework]) {
            this._templates[framework] = []
        }
        return this._templates[framework].push(data)
    };
    FrameworkTemplates.get = function(framework) {
        return this._templates[framework]
    };
    FrameworkTemplates.getTemplate = function(framework, key) {
        var t, ts, _j, _len1;
        ts = this._templates[framework];
        if (!ts) {
            return
        }
        for (_j = 0, _len1 = ts.length; _j < _len1; _j++) {
            t = ts[_j];
            if (t.key === key) {
                return t
            }
        }
    };
    return FrameworkTemplates
} ();


Controls = function() {
    function Controls() {}
    Controls._controlLookupData = {};
    Controls.framework = "bootstrap";
    Controls.registry = {};
    Controls.add = function(type, obj) {
        var baseObj, className, framework, nodeName, _j, _k, _len1, _len2, _ref, _ref1;
        framework = type.split("/");
        if (framework.length > 1) {
            framework = framework[0]
        } else {
            framework = "generic"
        }
        if (!this._controlLookupData[framework]) {
            this._initFramework(framework)
        }
        if (type !== "_base") {
            baseObj = this.registry["_base"];
            this._extend(type, baseObj, obj)
        }
        this.registry[type] = obj;
        obj.type = type;
        if (obj.classes) {
            _ref = obj.classes;
            for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
                className = _ref[_j];
                this._controlLookupData[framework].classReverseLookup[className] = obj
            }
        }
        if (obj.classRegex) {
            this._controlLookupData[framework].classRegexLookup[obj.classRegex] = obj
        }
        if (obj.nodes) {
            _ref1 = obj.nodes;
            for (_k = 0, _len2 = _ref1.length; _k < _len2; _k++) {
                nodeName = _ref1[_k];
                this._controlLookupData[framework].nodeReverseLookup[nodeName] = obj
            }
        }
        if (obj.matchNode) {
            return this._controlLookupData[framework].nodeMatchLookup[obj.type] = obj
        }
    };
    Controls._initFramework = function(framework) {
        return this._controlLookupData[framework] = {
            nodeMatchLookup: {},
            classRegexLookup: {},
            classReverseLookup: {},
            nodeReverseLookup: {}
        }
    };
    Controls.setFramework = function(framework) {
        return this.framework = framework
    };
    Controls._extend = function(template, base, obj) {
        var existing_properties, prop, template_type, _j, _k, _l, _len1, _len2, _len3, _len4, _m, _ref, _ref1, _ref2, _ref3;
        existing_properties = {};
        if (!obj.properties) {
            obj.properties = []
        }
        _ref = obj.properties;
        for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
            prop = _ref[_j];
            existing_properties[prop.key] = prop
        }
        template_type = this.registry[template];
        if (template_type) {
            _ref1 = template_type.properties;
            for (_k = 0, _len2 = _ref1.length; _k < _len2; _k++) {
                prop = _ref1[_k];
                if (! (prop.key in existing_properties)) {
                    obj.properties.push(prop)
                }
            }
        }
        _ref2 = obj.properties;
        for (_l = 0, _len3 = _ref2.length; _l < _len3; _l++) {
            prop = _ref2[_l];
            existing_properties[prop.key] = prop
        }
        _ref3 = base.properties;
        for (_m = 0, _len4 = _ref3.length; _m < _len4; _m++) {
            prop = _ref3[_m];
            if (! (prop.key in existing_properties)) {
                obj.properties.push(prop)
            }
        }
        if (obj.canDrag === void 0) {
            obj.canDrag = base.canDrag
        }
        return obj
    };
    Controls.extend = function(template, type, obj) {
        var baseObj;
        baseObj = this.registry["_base"];
        this._extend(template, baseObj, obj);
        return this.add(type, obj)
    };
    Controls.get = function(type) {
        return this.registry[type]
    };
    Controls.search = function(query) {
        var components, key, type, _ref;
        components = [];
        _ref = this.registry;
        for (key in _ref) {
            type = _ref[key];
            if (type.name.toLowerCase().indexOf(query) >= 0) {
                components.push(type)
            }
        }
        return components
    };
    Controls.matchClass = function(className) {
        var reg;
        for (reg in this._controlLookupData[this.framework].classRegexLookup) {
            if (new RegExp(reg).test(className)) {
                return this._controlLookupData[this.framework].classRegexLookup[reg]
            }
        }
        if (className in this._controlLookupData[this.framework].classReverseLookup) {
            return this._controlLookupData[this.framework].classReverseLookup[className]
        }
    };
    Controls.matchNode = function(node) {
        var classLookup, className, classes, found, k, obj, _j, _len1, _ref;
        if (!node) {
            return null
        }
        node = $(node).get(0);
        _ref = this._controlLookupData[this.framework].nodeMatchLookup;
        for (k in _ref) {
            obj = _ref[k];
            if (obj.matchNode(node)) {
                return obj
            }
        }
        if (node.nodeType === NodeType.TEXT || node.nodeType === NodeType.COMMENT) {
            return null
        }
        if (node.className) {
            classes = node.className.split(/\s+/) || [];
            classLookup = {};
            for (_j = 0, _len1 = classes.length; _j < _len1; _j++) {
                className = classes[_j];
                found = this.matchClass(className);
                if (found) {
                    return found
                }
            }
        }
        if (node.nodeName && node.nodeName.toLowerCase() in this._controlLookupData[this.framework].nodeReverseLookup) {
            return this._controlLookupData[this.framework].nodeReverseLookup[node.nodeName.toLowerCase()]
        }
        return this.registry["generic"]
    };
    Controls.updateNodeForType = function(node, type, property, newVal) {
        var newNode, v, _j, _len1, _ref;
        node = $(node).get(0);
        if (property.setOnNode) {
            newNode = property.setOnNode(node, newVal, type);
            if (newNode && !$.isArray(newNode)) {
                return newNode
            }
        } else if (property.html_attr === "class") {
            if (property.possibleValues) {
                _ref = property.possibleValues;
                for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
                    v = _ref[_j];
                    $(node).removeClass(v)
                }
                return $(node).addClass(newVal)
            }
        } else if (property.html_attr) {
            return $(node).attr(property.html_attr, newVal)
        }
    };
    Controls.getPropertyValue = function(type, node, property) {
        var v, _j, _len1, _ref;
        node = $(node).get(0);
        if (!property.html_attr && property.getFromNode) {
            return property.getFromNode(node, type)
        } else if (property.html_attr === "class") {
            if (property.possibleValues) {
                _ref = property.possibleValues;
                for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
                    v = _ref[_j];
                    if ($(node).hasClass(v)) {
                        return v
                    }
                }
            } else {
                return $(node).attr("class")
            }
        } else {
            if (property.html_attr) {
                return $(node).attr(property.html_attr)
            }
        }
    };
    Controls.commitProperties = function(component) {
        var didChange, didChildChange, obj, prop, _j, _len1, _ref;
        obj = this.matchNode(component.node);
        if (!obj || !obj.properties) {
            return
        }
        didChange = false;
        _ref = obj.properties;
        for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
            prop = _ref[_j];
            didChildChange = prop.commitOnNode && prop.commitOnNode(component.node, this.getPropertyValue(obj, component.node, prop));
            didChange = didChildChange || didChange
        }
        return didChange
    };
    Controls.allowsChild = function(component, type) {
        if (component.validChildren && !(__indexOf.call(component.validChildren, type) >= 0)) {
            return false
        }
        return true
    };
    Controls.addNewChild = function(component, node, childType) {
        var childObj, target;
        childObj = this.get(childType);
        if (!childObj || !childObj.defaultHtml) {
            return
        }
        if (component.insertChild) {
            return component.insertChild(node, $(childObj.defaultHtml))
        } else if (component.insertionSelector) {
            target = $(node).find(component.insertionSelector);
            return target.length && $(target).append(childObj.defaultHtml)
        } else {
            target = node;
            return target.length && $(target).append(childObj.defaultHtml)
        }
    };
    Controls.cleanNode = function(node) {
        var els;
        node = $(node).clone();
        els = node.find("*").andSelf();
        els.removeClass("jetstrap-dragging");
        els.filter(".jetstrap-draggable, .jetstrap-detached").remove();
        els.filter('[class=""]').removeAttr("class");
        els.removeAttr("contenteditable");
        els.removeAttr("spellcheck");
        return node
    };
    return Controls
} ();


// 文档类
Document = function() {
    Document.ActionTypes = {
        ADD: 0,
        REMOVE: 1,
        MOVE_TO: 2,
        MOVE_FROM: 3,
        PROPERTY_TO: 4,
        PROPERTY_FROM: 5
    };
    function Document() {
        var _this = this;
        _.extend(this, Backbone.Events);
        this._componentMap = {};
        this._actionStack = [];
        this._redoStack = [];
        this.project = new JetstrapProject;
        this.rootEl = $(window.FrameDocument).find("body");
        this.on("document.updateHtml", function() {
            var tree;
            tree = _this.rootEl.clone();
            _this.cleanTree(tree);
            _this.replaceProjectBodyHtml(tree.html());
            return _this.trigger("documentChanged")
        });
    }
    Document.prototype.clear = function() {
        this.rootEl.html("");
        return this.project.clear()
    };
    Document.prototype.uprootDocEl = function() {
        this.rootEl = $(window.FrameDocument).find("body");
        return this.buildFromHtml(this.project.get("html"))
    };
    Document.prototype.initWithTemplate = function(template, trigger) {
        var css, html;
        if (trigger == null) {
            trigger = true
        }
        html = template.html;
        css = template.css;
        if (css) {
            this.setCss(css);
            this.trigger("document.newCss")
        }
        this.buildFromHtml(html);
        if (trigger) {
            return this.trigger("document.updateHtml")
        }
    };
    Document.prototype.initWithDefaults = function() {
        return this.initWithTemplate("empty")
    };
    Document.prototype.newScreen = function(name, template) {
        this.project.clear();
        this.project.id = null;
        this.initWithTemplate(template, false);
        return this.saveNew(name)
    };
    Document.prototype.newDemoScreen = function(template) {
        this.project.clear();
        this.project.id = null;
        this.project.set("name", "DEMO");
        this.project.set("demo", true);
        return this.initWithTemplate(template, false)
    };
    Document.prototype.saveNew = function(name) {
        var html, _this = this;
        if (this.project.get("demo") === true) {
            return
        }
        html = this.getHtml();
        return this.project.save({
            folder_id: this.folderId,
            html: html,
            name: name,
            css: this.getCss(),
            js: this.getJs()
        },
        {
            success: function(model, resp) {
                _this.project.id = model.get("unique_id");
                _this.trigger("document.newLoaded");
                return _this.trigger("document.saved")
            },
            error: function(model, resp) {
                _this.clear();
                return _this.trigger("document.saveError", resp)
            }
        })
    };
    Document.prototype.save = function() {
        var html, _this = this;
        if (this.project.get("demo") === true) {
            return
        }
        html = this.getHtml();
        if (!this.project.get("name") || !this.project.get("unique_id")) {
            return false
        }
        return this.project.save({
            html: html
        },
        {
            success: function(model, resp) {
                return _this.trigger("document.saved")
            },
            error: function(model, resp) {
                if (resp.status === 401) {
                    window.location = "/login"
                }
                return _this.trigger("document.saveError", resp)
            }
        })
    };
    Document.prototype.cleanTree = function(tree) {
        var dataType, el, els, s, scripts, type, _j, _k, _len1, _len2;
        this.identifyNodes(tree);
        els = tree.find("*").andSelf();
        els.removeClass("jetstrap-dragging");
        els.filter(".jetstrap-draggable, .jetstrap-detached, .jetstrap-cloned").remove();
        scripts = window.FrameDocument.getElementsByTagName("disabledscript");
        for (_j = 0, _len1 = scripts.length; _j < _len1; _j++) {
            s = scripts[_j];
            s.style.display = "none"
        }
        for (_k = 0, _len2 = els.length; _k < _len2; _k++) {
            el = els[_k];
            dataType = $(el).data("jetstrap-component");
            if (!dataType) {
                continue
            }
            type = Controls.get(dataType);
            if (!type || type.canSelect === false) {
                continue
            }
            if (type.clean) {
                type.clean(el)
            }
        }
        els.filter('[class=""]').removeAttr("class");
        els.filter('[style=""]').removeAttr("style");
        els.removeAttr("contenteditable");
        return els.removeAttr("spellcheck")
    };
    Document.prototype.cleanTarget = function() {
        return this.cleanTree(this.rootEl)
    };
    Document.prototype.replaceProjectBodyHtml = function(body) {
        var bEnd,
            bStart,
            h,
            html,
            postBody,
            preBody;
        html = this.project.get("html");
        bStart = html.indexOf("<body");
        bEnd = html.indexOf("</body");
        if (bStart >= 0 && bEnd >= 0) {
            preBody = html.slice(0, html.indexOf(">", bStart) + 1);
            postBody = html.slice(bEnd);
            h = this.project.get("html");
            h = preBody + "\n" + body + "\n" + postBody;
            h = style_html(h, {
                indent_size: 2,
                indent_char: " ",
                unformatted: ["textarea", "a", "span", "b", "i", "u", "strong", "em", "s", "script"]
            })
        }
        h = h.replace(/<disabledscript/g, "<script");
        h = h.replace(/(<script[^>]*)(style="[^"]*")/g, "$1");
        h = h.replace(/<\/disabledscript/g, "</script");
        this.project.set("html", h);
        return this.project.get("html")
    };
    Document.prototype.getBodyHtml = function(html) {
        var bEnd, bStart, innerBody;
        bStart = html.indexOf("<body");
        bEnd = html.indexOf("</body");
        if (bStart >= 0 && bEnd >= 0) {
            innerBody = html.slice(html.indexOf(">", bStart) + 1, bEnd)
        } else {
            innerBody = html
        }
        innerBody = innerBody.replace(/<script/g, "<disabledscript");
        innerBody = innerBody.replace(/<\/script/g, "</disabledscript");
        innerBody = style_html(innerBody, {
            indent_size: 2,
            indent_char: " ",
            unformatted: ["textarea", "a", "span", "b", "i", "u", "strong", "em", "s", "script"]
        });
        return innerBody
    };
    Document.prototype.buildFromHtml = function(html, trigger) {
        if (trigger == null) {
            trigger = false
        }
        if (!html) {
            return
        }
        this.project.set("html", this.getHtml(html));
        this.rootEl.html(this.getBodyHtml(this.project.get("html")));
        if (trigger) {
            return this.trigger("document.updateHtml")
        }
    };
    Document.prototype.loadFrom = function(id) {
        var screenLoadingIndicator, _this = this;
        this.trigger("document.loading");
        this.project = new JetstrapProject;
        this.project.id = id;
        screenLoadingIndicator = $("#main").find(".screen-loading-indicator").removeClass("hidden");
        this.root = null;
        return this.project.fetch({
            success: function(model, resp) {
                var html;
                _this.project.id = model.id;
                _this.project.framework = model.get("framework");
                html = model.get("html");
                if (!html) {
                    html = model.get("partial_html")
                }
                _this.buildFromHtml(html, true);
                _this.trigger("document.loaded");
                return screenLoadingIndicator.addClass("hidden")
            },
            error: function(model, error) {
                _this.trigger("document.loadError", error);
                return screenLoadingIndicator.addClass("hidden")
            }
        })
    };
    Document.prototype.getHtml = function(html) {
        var html_bottom, html_top;
        if (!html) {
            html = this.project.get("html")
        }
        if (!html) {
            return
        }
        if (html.indexOf("<html") < 0) {
            if (Jetstrap.builder._framework === Frameworks.get("bootstrap")) {
                html_top = "<!DOCTYPE html>\n" + '<html lang="en">\n' + "  <head>\n" + '    <meta charset="utf-8">\n' + "    <title></title>\n" + '    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n' + '    <meta name="description" content="">\n' + '    <meta name="author" content="">\n\n' + "    <!-- Le styles -->\n" + '    <link href="https://netdna.bootstrapcdn.com/twitter-bootstrap/2.3.2/css/bootstrap-combined.min.css" rel="stylesheet">\n' + "  </head>\n" + "  <body>\n";
                html_bottom = "\n" + '    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>\n' + '    <script src="https://netdna.bootstrapcdn.com/twitter-bootstrap/2.3.2/js/bootstrap.min.js"></script>\n' + "  </body>\n" + "</html>"
            } else if (Jetstrap.builder._framework === Frameworks.get("bootstrap3")) {
                html_top = "<!DOCTYPE html>\n" + '<html lang="en">\n' + "  <head>\n" + '    <meta charset="utf-8">\n' + "    <title></title>\n" + '    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n' + '    <meta name="description" content="">\n' + '    <meta name="author" content="">\n\n' + '    <link href="https://netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap.min.css" rel="stylesheet">\n' + '    <link href="https://netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap-glyphicons.css" rel="stylesheet">\n' + "  </head>\n" + "  <body>\n";
                html_bottom = "\n" + '    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>\n' + '    <script src="https://netdna.bootstrapcdn.com/bootstrap/3.0.0/js/bootstrap.min.js"></script>\n' + "  </body>\n" + "</html>"
            }
            html = html_top + html + html_bottom;
            html = style_html(html, {
                indent_size: 2,
                indent_char: " ",
                unformatted: ["textarea", "script"]
            })
        }
        return html
    };
    Document.prototype.setCss = function(css) {
        this.project.set("css", css);
        return this.trigger("documentChanged")
    };
    Document.prototype.getCss = function() {
        return this.project.get("css")
    };
    Document.prototype.setJs = function(js) {
        this.project.set("js", js);
        return this.trigger("documentChanged")
    };
    Document.prototype.getJs = function() {
        return this.project.get("js")
    };
    Document.prototype.getRegisteredCssEntries = function() {
        var child, childstack, classes, component, elementclass, elementid, ids, _j, _len1, _ref;
        ids = [];
        classes = [];
        childstack = [];
        childstack.push(this.root);
        while (childstack.length) {
            component = childstack.shift();
            elementid = component.getValue("elementid").value();
            elementclass = component.getValue("elementclass").value();
            if (elementid !== "") {
                ids.push(elementid)
            }
            if (elementclass !== "") {
                classes.push(elementclass)
            }
            _ref = component.children;
            for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
                child = _ref[_j];
                childstack.splice(0, 0, child)
            }
        }
        return {
            classes: classes,
            ids: ids
        }
    };
    Document.prototype.identifyNodes = function(root) {
        var child, children, childstack, el, found, _results;
        if (root == null) {
            root = this.rootEl
        }
        childstack = [];
        childstack.push(root.get(0));
        _results = [];
        while (childstack.length) {
            el = childstack.shift();
            if (el.nodeType === NodeType.TEXT || el.nodeType === NodeType.COMMENT || !el.childNodes) {
                continue
            }
            children = el.childNodes;
            _results.push(function() {
                var _j, _len1, _results1;
                _results1 = [];
                for (_j = 0, _len1 = children.length; _j < _len1; _j++) {
                    child = children[_j];
                    if (child.nodeType === NodeType.TEXT) {
                        continue
                    }
                    found = Controls.matchNode(child);
                    if (found) {
                        $(child).data("jetstrap-component", found.type)
                    }
                    _results1.push(childstack.push(child))
                }
                return _results1
            } ())
        }
        return _results
    };
    Document.prototype.pushAction = function(action) {
        this._redoStack = [];
        this._actionStack.push(action);
        return this.trigger("documentChanged")
    };
    Document.prototype.canUndo = function() {
        return this._actionStack.length
    };
    Document.prototype.undo = function() {
        var lastAction;
        lastAction = this._actionStack.pop();
        if (lastAction) {
            console.log("UNDO");
            this.scriptAction(lastAction.reaction, lastAction);
            this._redoStack.push(lastAction);
            return this.trigger("document.updateHtml")
        }
    };
    Document.prototype.canRedo = function() {
        return this._redoStack.length
    };
    Document.prototype.redo = function() {
        var nextAction;
        nextAction = this._redoStack.pop();
        if (nextAction) {
            console.log("REDO");
            this.scriptAction(nextAction.action, nextAction);
            this._actionStack.push(nextAction);
            return this.trigger("document.updateHtml")
        }
    };
    Document.prototype.scriptAction = function(action, data) {
        switch (action) {
        case Document.ActionTypes.ADD:
            DocUtils.insertAtIndex(data.parent, data.node, data.index);
            break;
        case Document.ActionTypes.REMOVE:
            $(data.node).remove();
            break;
        case Document.ActionTypes.MOVE_FROM:
            DocUtils.removeAtIndex(data.newParent, data.newPosition);
            DocUtils.insertAtIndex(data.oldParent, data.node, data.oldPosition);
            break;
        case Document.ActionTypes.MOVE_TO:
            DocUtils.removeAtIndex(data.oldParent, data.oldPosition);
            DocUtils.insertAtIndex(data.newParent, data.node, data.newPosition)
        }
        return this.trigger("documentChanged")
    };
    return Document
} ();
DocUtils = function() {
    function DocUtils() {}
    DocUtils.getElementBox = function(el) {
        var $el, box, height, offset, width;
        $el = $(el);
        if ($el.get(0).nodeType === NodeType.COMMENT) {
            return null
        } else if ($el.get(0).nodeType === NodeType.TEXT) {
            return this.getTextBounds($el.get(0))
        } else {
            offset = $el.offset();
            width = $el.outerWidth();
            height = $el.outerHeight();
            box = [[offset.left, offset.top], [offset.left + width, offset.top], [offset.left + width, offset.top + height], [offset.left, offset.top + height]];
            return box
        }
    };
    DocUtils.insertNewChildAtPoint = function(parent, child, point) {
        var c, children, _j, _len1;
        children = $(parent).contents().not(child);
        for (_j = 0, _len1 = children.length; _j < _len1; _j++) {
            c = children[_j];
            if (this.isBefore(c, point)) {
                child.insertBefore(c);
                return true
            }
        }
        try {
            $(parent).append(child)
        } catch(e) {
            return false
        }
        return true
    };
    DocUtils.insertAtIndex = function(parent, node, index) {
        var child, children, i, _j, _len1;
        if (index === 0) {
            return parent.prepend(node)
        } else if (index >= $(parent).children().length) {
            return $(parent).append(node)
        } else {
            children = $(parent).children();
            for (i = _j = 0, _len1 = children.length; _j < _len1; i = ++_j) {
                child = children[i];
                if (i === index) {
                    $(node).insertBefore(child);
                    return
                }
            }
        }
    };
    DocUtils.removeAtIndex = function(parent, index) {
        return parent.children().eq(index).remove()
    };
    DocUtils.isAfter = function(el, point) {
        var $el, box, height, midx, midy, width;
        $el = $(el);
        width = $el.outerWidth();
        height = $el.outerHeight();
        box = this.getElementBox($el);
        midy = box[0][1] + height / 2;
        midx = box[0][0] + width / 2;
        return point.y > midy && point.y < box[2][1] || point.x > midx && point.x < box[1][0]
    };
    DocUtils.getTextBounds = function(textNode) {
        var range, rect, sx, sy;
        if (document.createRange) {
            range = document.createRange();
            range.selectNodeContents(textNode);
            if (range.getBoundingClientRect) {
                rect = range.getBoundingClientRect();
                sx = window.FrameWindow.scrollX;
                sy = window.FrameWindow.scrollY;
                return [[rect.left + sx, rect.top + sy], [rect.left + sx + rect.width, rect.top + sy], [rect.left + sx + rect.width, rect.top + sy + rect.height], [rect.left + sx, rect.top + sy + rect.height]]
            }
        }
        return null
    };
    DocUtils.isBeforeAndNotInside = function(el, point) {
        var $el, box;
        $el = $(el);
        if ($el.get(0).nodeType === NodeType.COMMENT) {
            return false
        } else if ($el.get(0).nodeType === NodeType.TEXT) {
            box = this.getTextBounds($el.get(0));
            if (!box) {
                return false
            }
        } else {
            box = this.getElementBox($el)
        }
        return point.y < box[0][1] + 10
    };
    DocUtils.isBefore = function(el, point) {
        var $el, beforePointX, beforePointY, box;
        $el = $(el);
        if ($el.get(0).nodeType === NodeType.COMMENT) {
            return false
        } else if ($el.get(0).nodeType === NodeType.TEXT) {
            box = this.getTextBounds($el.get(0));
            if (!box) {
                return false
            }
        } else {
            box = this.getElementBox($el)
        }
        beforePointY = box[0][1] + 10;
        beforePointX = box[0][0] + 10;
        if (point.y < box[2][1]) {
            return point.y < beforePointY || point.x < beforePointX
        }
        return false
    };
    DocUtils.elementContains = function(el, point) {
        var height, margin, offset, width;
        if (el.get(0) && el.get(0).nodeType === NodeType.TEXT) {
            return false
        }
        offset = el.offset();
        width = el.outerWidth();
        height = el.outerHeight();
        margin = [0, 0, 0, 0];
        if (margin[3] < 0 && margin[1] < 0 && point.x > offset.left + width + -margin[1] || point.x < offset.left + margin[3] || point.y > offset.top + height || point.y < offset.top) {
            return false
        } else if (point.x > offset.left + width || point.x < offset.left || point.y > offset.top + height || point.y < offset.top) {
            return false
        }
        return true
    };
    return DocUtils
} ();

HtmlProcessor = function(_super) {
    __extends(HtmlProcessor, _super);
    function HtmlProcessor(document) {
        this.document = document;
        this._guessType = __bind(this._guessType, this);
        this.getComponentFromNode = __bind(this.getComponentFromNode, this);
        HtmlProcessor.__super__.constructor.apply(this, arguments)
    }
    HtmlProcessor.prototype.processComponentOfParent = function(c, p, node) {
        return $(node).data("jetstrap-component", c.type)
    };
    HtmlProcessor.prototype.getComponentFromNode = function(node) {
        var type;
        type = this._guessType(node);
        return type
    };
    HtmlProcessor.prototype._guessType = function(node) {
        var className, classNames, classes, name, nodeName, type, types, _j, _len1, _ref;
        types = COMPONENT_LOOKUP;
        classNames = node.className;
        for (name in types) {
            type = types[name];
            classes = classNames && classNames.split(/\s+/) || [];
            for (_j = 0, _len1 = classes.length; _j < _len1; _j++) {
                className = classes[_j];
                if (type.isOfClass(className)) {
                    return type
                }
            }
        }
        _ref = this.nodeTypeMap;
        for (nodeName in _ref) {
            type = _ref[nodeName];
            if (node.nodeName.toLowerCase() === nodeName) {
                return type
            }
        }
        return HtmlNodeComponent
    };
    return HtmlProcessor
} (Drifty.HtmlProcessor);
WysiToolbar = function(_super) {
    __extends(WysiToolbar, _super);
    function WysiToolbar() {
        return WysiToolbar.__super__.constructor.apply(this, arguments)
    }
    WysiToolbar.prototype.COMMANDS = {
        bold: {
            command: "bold"
        },
        italic: {
            command: "italic"
        },
        link: {
            command: "createLink",
            getValue: function() {
                return prompt("Enter URL")
            }
        },
        "align-left": {
            command: "JustifyLeft"
        },
        "align-center": {
            command: "JustifyCenter"
        },
        "align-right": {
            command: "JustifyRight"
        }
    };
    WysiToolbar.prototype.events = {
        "click [data-wysi-tool]": "onAction"
    };
    WysiToolbar.prototype.initialize = function(data, document) {
        this.document = document;
        WysiToolbar.__super__.initialize.call(this, data);
        rangy.init();
        this.APPLIERS = {};
        this.APPLIERS["align-left"] = {
            "class": "text-left"
        };
        this.APPLIERS["align-center"] = {
            "class": "text-center"
        };
        return this.APPLIERS["align-right"] = {
            "class": "text-right"
        }
    };
    WysiToolbar.prototype.onAction = function(event) {
        var type;
        type = $(event.currentTarget).data("wysi-tool");
        console.log("Wysi action", type);
        this.execCommand(type);
        return false
    };
    WysiToolbar.prototype.execCommand = function(type) {
        var applier, className, command, data, parent, range, rangeNum, sel, _j, _ref, _ref1;
        command = this.COMMANDS[type];
        applier = this.APPLIERS[type];
        if (!command) {
            return
        }
        if (applier) {
            sel = rangy.getSelection(window.FrameWindow);
            for (rangeNum = _j = 0, _ref = sel.rangeCount; 0 <= _ref ? _j <= _ref: _j >= _ref; rangeNum = 0 <= _ref ? ++_j: --_j) {
                range = sel.getRangeAt(rangeNum);
                parent = $(range.commonAncestorContainer).closest("[contenteditable]");
                break
            }
            _ref1 = this.APPLIERS;
            for (className in _ref1) {
                data = _ref1[className];
                parent && parent.removeClass(data["class"])
            }
            return parent && parent.addClass(applier["class"])
        } else {
            if (command.getValue) {
                return this.document.execCommand(command.command, false, command.getValue())
            } else {
                return this.document.execCommand(command.command, false)
            }
        }
    };
    return WysiToolbar
} (Backbone.View);
BuilderRouter = function(_super) {
    __extends(BuilderRouter, _super);
    function BuilderRouter() {
        return BuilderRouter.__super__.constructor.apply(this, arguments)
    }
    BuilderRouter.prototype.routes = {
        "screen-:screen": "loadScreen",
        dash: "showDashboard"
    };
    return BuilderRouter
} (Backbone.Router);
Builder = function(_super) {
    var cmdChar;
    __extends(Builder, _super);
    cmdChar = String.fromCharCode(parseInt(2318, 16));
    Builder.prototype.DEFAULT_CONTEXT_ACTIONS = [{
        tag: "delete-component",
        text: "Delete",
        shortcut: {
            mac: cmdChar + "DEL",
            windows: "Ctrl+Bksp"
        },
        action: function() {
            return this.deleteSelectedComponent()
        },
        shouldShow: function() {
            return true
        }
    },
    {
        tag: "duplicate-component",
        text: "Duplicate",
        shortcut: {
            mac: cmdChar + "D",
            windows: "Ctrl+D"
        },
        action: function() {
            return this.duplicateActive()
        },
        shouldShow: function() {
            return false
        }
    },
    {
        tag: "cut-component",
        text: "Cut",
        shortcut: {
            mac: cmdChar + "X",
            windows: "Ctrl+X"
        },
        action: function() {
            return this.cut()
        },
        shouldShow: function() {
            return true
        }
    },
    {
        tag: "copy-component",
        text: "Copy",
        shortcut: {
            mac: cmdChar + "C",
            windows: "Ctrl+C"
        },
        action: function() {
            return this.copy()
        },
        shouldShow: function() {
            return true
        }
    },
    {
        tag: "paste-component",
        text: function() {
            var copied;
            copied = this._copiedComponent || this._cutComponent;
            if (copied) {
                return "Paste " + copied.obj.name
            }
            return "Paste"
        },
        shortcut: {
            mac: cmdChar + "V",
            windows: "Ctrl+V"
        },
        action: function() {
            return this.paste()
        },
        shouldShow: function() {
            var c;
            if (this._copiedComponent || this._cutComponent) {
                c = this._copiedComponent || this._cutComponent;
                if (Controls.allowsChild(this._contextMenuComponent, c.type)) {
                    return true
                }
            }
            return false
        }
    }];

    /** 编辑器 **/
    function Builder() {

        this._processWindowResize = __bind(this._processWindowResize, this);
        this._resizeScrollers = __bind(this._resizeScrollers, this);
        this._processFrameContentResize = __bind(this._processFrameContentResize, this);
        this._documentChangedHandler = __bind(this._documentChangedHandler, this);

        var frameworkName,
            self,
            _this = this;

        self = this;
        _.extend(this, Backbone.Events);
        this._initMap = {};
        this._onDocumentReady();
        console.log("Starting builder");
        if (window.WTF === 1) {
            this._demoMode()
        }
        this.isLoading = true;
        this.documentFrame = $("#document-frame");
        this.previewFrame = $("#preview-frame");
        this.contentWrapper = $("#content-wrapper");
        this.frameWrapper = $("#frame-wrapper");
        this.contextLayer = $("#context-layer");
        this.codeInspector = $("#code-inspector");
        this.editorToggles = $("#editor-toggles");
        this.centerViewport = $("#center-viewport");
        this.componentSearch = $("#component-search");
        this.screensSidepane = $("#screens-sidepane");
        this.userScreens = this.screensSidepane.find(".user-screens");
        this.sidepaneContent = this.screensSidepane.find(".sidepane-content");
        this.screenLoadingIndicator = $("#main").find(".screen-loading-indicator");
        this.header = $("header");
        this.sizesDropdown = $("#sizes-dropdown");
        this.accountDropdown = $("#account-dropdown");
        this.newProjectModal = $("#new-project-modal");
        frameworkName = window.JetstrapOptions && window.JetstrapOptions.framework || "bootstrap";
        this._framework = Frameworks.get(frameworkName) || Frameworks.get("bootstrap");
        Controls.setFramework(frameworkName);
        this._loadFrame();
        this.bind("doneLoading",
        function() {
            _this.redraw();
            _this.isLoading = false;
            return $("#loading-overlay").hide()
        })
    }
    Builder.prototype._onDocumentReady = function() {
        return $("[rel=tooltip]").tooltip()
    };
    Builder.prototype._setupRouter = function() {
        var enablePushState, pushState, self, _this = this;
        if (this._initMap["router"]) {
            return
        }
        this._initMap["router"] = true;
        self = this;
        this.router = new BuilderRouter;
        this.router.on("route:loadScreen",
        function(screen) {
            var unique_id;
            unique_id = screen.split(".")[0];
            _this.trigger("openBuilder");
            _this.screenLoadingIndicator.removeClass("hidden");
            return _this.setScreen(unique_id)
        });
        this.router.on("route:showDashboard",
        function() {
            return self.trigger("closeBuilder")
        });
        enablePushState = true;
        pushState = !!(enablePushState && window.history && window.history.pushState);
        if (pushState) {
            Backbone.history.start({
                pushState: true,
                root: "/"
            })
        } else {
            Backbone.history.start({
                pushState: false,
                root: "/"
            })
        }
        return $(document).ready(function() {
            return $(document).on("click", "a[href^='/']",
            function(event) {
                var href, passThrough, url;
                href = $(event.currentTarget).attr("href");
                passThrough = href.indexOf("/build") !== 0 && href.indexOf("/screen-") !== 0;
                if (!passThrough && !event.altKey && !event.ctrlKey && !event.metaKey && !event.shiftKey) {
                    event.preventDefault();
                    url = href.replace(/^\//, "").replace("#!/", "");
                    self.router.navigate(url, {
                        trigger: true
                    });
                    return false
                }
            })
        })
    };
    Builder.prototype._demoMode = function() {
        this._projectsDisabled = true;
        this._savingDisabled = true;
        return this._exportDisabled = true
    };
    Builder.prototype._documentChangedHandler = function(data) {
        var _this = this;
        if (this.isLoading) {
            return
        }
        clearTimeout(this._changeTimeout);
        return this._changeTimeout = setTimeout(function() {
            _this._updateShortcutIcons();
            _this.redraw();
            if (!_this._savingDisabled) {
                return _this.save()
            }
        },
        100)
    };
    Builder.prototype._initDocument = function() {
        var frame, _this = this;
        if (this._document) {
            frame = $("#preview-frame").get(0);
            this.previewDoc = frame.contentDocument || frame.contentWindow.document;
            if (this.previewDoc.document) {
                this.previewDoc = this.previewDoc.document
            }
            this._document.uprootDocEl()
        } else {
            this._document = new Document
        }
        frame = $("#preview-frame").get(0);
        this.previewDoc = frame.contentDocument || frame.contentWindow.document;
        if (this.previewDoc.document) {
            this.previewDoc = this.previewDoc.document
        }
        this._document.bind("cssChanged",
        function(css) {
            return _this._cssEditor.setValue(css)
        });
        this._document.bind("documentChanged", this._documentChangedHandler);
        this._document.on("document.updateHtml",
        function() {
            _this._skipHtmlValueChange = true;
            return _this._updateHtmlEditor()
        });
        this._document.bind("document.saved",
        function() {
            clearTimeout(_this._savingClearTimeout);
            _this._savingClearTimeout = setTimeout(function() {
                var allSaved, savingText;
                savingText = $("#saving-text");
                allSaved = savingText.find(".all-saved");
                savingText.find(".saving").hide();
                allSaved.removeClass("fadeout");
                return setTimeout(function() {
                    return allSaved.addClass("fadeout")
                },
                3e3)
            },
            1e3);
            if (_this._newProjectSuccessfullyCreated === false) {
                _this._newProjectSuccessfullyCreated = true;
                return $("#project-name").text(_this._document.project.get("name"))
            }
        });
        this._document.bind("document.saveError",
        function(resp) {
            var j;
            console.log("Unable to save", resp);
            try {
                j = JSON.parse(resp.responseText);
                if (j.error === "limit") {
                    return _this.trigger("builder.planLimit", resp)
                }
            } catch(e) {
                return console.log("Error on save", resp)
            }
        });
        this._document.bind("document.loading",
        function() {
            _this.isLoading = true;
            _this.clearSelection();
            return _this._document.unbind("documentChanged", _this._documentChangedHandler)
        });
        this._document.bind("document.emptyLoaded",
        function() {
            _this.emptyLoaded = true;
            _this.trigger("promptNewScreen");
            return false
        });
        this._document.bind("document.newLoaded",
        function() {
            return _this.trigger("addAndSetScreen", _this._document.project)
        });
        this._document.bind("document.loaded",
        function() {
            var folderId, id;
            id = _this._document.project.get("unique_id");
            folderId = _this._document.project.get("folder_id");
            _this.setCurrentFolder(folderId);
            $("#download-screen-link").attr("href", "/api/v1/project/" + id + "/htmlzip");
            $("#download-project-link").attr("href", "api/v1/folder/" + folderId + "/htmlzip");
            $("#share-link").attr("href", "/share/" + id);
            _this._updateShortcutIcons();
            _this._updateHtmlEditor();
            _this._updateCssEditor();
            _this._updateJsEditor();
            _this._document.bind("documentChanged", _this._documentChangedHandler);
            _this.userScreens.find("a.selected").removeClass("selected");
            _this.userScreens.find('a[data-sid="' + _this._document.project.id + '"]').addClass("selected");
            return _this.trigger("doneLoading")
        });
        this._document.bind("document.loadError",
        function(error) {
            _this.trigger("doneLoading");
            if (error.status === 404) {
                return window.location = "/dash"
            } else {
                return alert('Unable to load project. Please try again later or send an email to <a href="mailto:max@jetstrap.com">max@jetstrap.com</a>')
            }
        });
        return this._document.bind("document.newCss",
        function() {
            return _this._updateCssEditor()
        })
    };
    Builder.prototype.getDocument = function() {
        return this._document
    };
    Builder.prototype.getFramework = function() {
        return this._framework
    };
    Builder.prototype._loadFrameworks = function() {
        var body, cssFile, cssFiles, entry, fd, frameworks, head, jsFile, jsFiles, link, script, _j, _k, _len1, _len2, _results;
        if (!window.FrameDocument) {
            return
        }
        fd = window.FrameDocument;
        frameworks = Drifty.Frameworks.getFrameworks();
        head = fd.head;
        body = fd.body;
        _results = [];
        for (_j = 0, _len1 = frameworks.length; _j < _len1; _j++) {
            entry = frameworks[_j];
            console.log("CORE: Loading framework", entry);
            cssFiles = entry.data.cssFiles || [];
            jsFiles = entry.data.jsFiles || [];
            for (_k = 0, _len2 = cssFiles.length; _k < _len2; _k++) {
                cssFile = cssFiles[_k];
                link = fd.createElement("link");
                link.type = "text/css";
                link.rel = "stylesheet";
                link.href = cssFile;
                head.appendChild(link)
            }
            _results.push(function() {
                var _l, _len3, _results1;
                _results1 = [];
                for (_l = 0, _len3 = jsFiles.length; _l < _len3; _l++) {
                    jsFile = jsFiles[_l];
                    script = fd.createElement("script");
                    script.src = jsFile;
                    _results1.push(head.appendChild(script))
                }
                return _results1
            } ())
        }
        return _results
    };
    Builder.prototype._loadFramework = function() {
        var body, c, control, controls, controlsList, cssFile, cssFiles, entry, fd, head, item, jsFile, jsFiles, link, script, t, templates, ts, _j, _k, _l, _len1, _len2, _len3, _len4, _m, _results;
        if (!this._framework) {
            return
        }
        //获取模板，这个模板包括demo, empty, statrt, jumbo四个
        //
        templates = FrameworkTemplates.get(this._framework.framework);
        $("#new-project-modal .framework code").text(this._framework.name);
        if (templates) {
            ts = $("#new-project-modal .template-selection");
            ts.empty();
            for (_j = 0, _len1 = templates.length; _j < _len1; _j++) {
                t = templates[_j];
                ts.append('<a data-template="' + t.key + '" class="btn gray-radio-button" data-template="' + this._framework.framework + "/" + t.key + '"><div class="image" style="background-image: url(' + t.image + ')"></div> ' + t.name + "</a>")
            }
            ts.find(":first").addClass("active")
        }

        //初始化面板
        controls = this._framework.controls;
        controlsList = $("#controls-list");
        controlsList.empty();
        for (_k = 0, _len2 = controls.length; _k < _len2; _k++) {
            c = controls[_k];
            control = Controls.get(c);
            if (!control) {
                continue
            }
            item = $('<li data-section="' + this._framework.framework + '" data-type="' + c + '"><a href="#">' + control.name + "</a></li>");
            if (control.image) {
                item.css({
                    backgroundImage: "url(" + control.image + ")",
                    backgroundRepeat: "no-repeat"
                })
            }
            controlsList.append(item)
        }


        fd = window.FrameDocument;
        head = fd.head;
        body = fd.body;
        //插入必要的css跟js文件
        //
        entry = this._framework;
        cssFiles = entry.cssFiles || [];
        jsFiles = entry.jsFiles || [];
        for (_l = 0, _len3 = cssFiles.length; _l < _len3; _l++) {
            cssFile = cssFiles[_l];
            link = fd.createElement("link");
            link.type = "text/css";
            link.rel = "stylesheet";
            link.href = cssFile;
            head.appendChild(link)
        }
        _results = [];
        for (_m = 0, _len4 = jsFiles.length; _m < _len4; _m++) {
            jsFile = jsFiles[_m];
            script = fd.createElement("script");
            script.src = jsFile;
            _results.push(head.appendChild(script))
        }
        return _results
    };
    Builder.prototype._loadFrame = function() {
        var doc, framePlaceholder, iframe, iframeHtml, _this = this;
        iframe = document.createElement("iframe");
        iframe.id = "document-frame";
        iframe.className = "full";
        iframe.src = "about:blank";
        framePlaceholder = document.getElementById("core-frame");
        $(framePlaceholder).replaceWith(iframe);
        iframeHtml = '<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <meta charset="utf-8">\n    <title></title>\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n\n    <link rel="stylesheet" href="https://s3.amazonaws.com/jetstrap-site/css/frame.css?10" />\n    <style id="custom-css">\n    </style>\n\n    <script>\n      parent.FrameWindow = window;\n      parent.FrameDocument = document;\n    </script>\n    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>\n\n    <script id="custom-js"></script>\n  </head>\n  <body class="design">\n  </body>\n</html>';
        doc = iframe.contentWindow.document;
        doc.open();
        doc.write(iframeHtml);
        doc.close();
        return $(iframe).ready(function() {
            var waitFunction, waitTimeout;
            waitFunction = function() {
                var waitTimeout;
                if (!window.FrameDocument || $("body", window.FrameDocument).length === 0) {
                    console.log("Still not loaded, waiting");
                    return waitTimeout = setTimeout(waitFunction, 20)
                } else {
                    console.log("Frame loaded, done waiting");
                    return _this._frameLoaded()
                }
            };
            return waitTimeout = setTimeout(waitFunction, 20)
        })
    };
    Builder.prototype._frameLoaded = function() {
        var css;
        console.log("Frame loaded");
        if (this.isFrameLoaded === true) {
            console.error("FRAME ALREADY LOAEED!");
            return
        }
        this.isFrameLoaded = true;
        this._loadFramework();
        this._initDocument();
        this._initDialogs();
        this._setupRouter();
        this.sourceSelector = "#components ul > li";
        this.frameDrop = $("#frame-drop");
        this.frameBody = $(window.FrameDocument).find("body");
        this._initEvents();
        this._initDraggable();
        this._initDroppable();
        this._initHoverController();
        this._bindUIEvents();
        this._bindShortcuts();
        this.setFirstScreen();
        this.wysi = new WysiToolbar({
            el: $("#wysi-tools").get(0)
        },window.FrameDocument);
        if (this._projectsDisabled) {
            this._document.initWithDemo();
            css = this._document.project.get("css");
            this._cssEditor.setValue(css);
            this.trigger("css.valueChanged", css)
        }
        this.redraw();
        return this.trigger("readyToGo")
    };
    Builder.prototype._initDialogs = function() {
        var CssMode, HtmlMode, JsMode, editor, self;
        self = this;
        editor = ace.edit("html-editor-target");
        HtmlMode = require("ace/mode/html").Mode;
        editor.getSession().setMode(new HtmlMode);
        editor.getSession().setTabSize(2);
        editor.getSession().setUseSoftTabs(true);
        editor.setReadOnly(false);
        editor.setTheme("ace/theme/monokai");
        editor.renderer.setHScrollBarAlwaysVisible(false);
        editor.renderer.setShowPrintMargin(false);
        editor.commands.commands.find.exec = function() {};
        editor.getSession().setUseWrapMode(true);
        this._htmlExportEditor = editor; (function(editor) {
            var changeTimeout;
            changeTimeout = null;
            editor.getSession().selection.on("changeCursor",
            function() {
                var spot;
                return spot = editor.selection.getCursor()
            });
            return editor.getSession().on("change",
            function() {
                if (!self.isLoading) {
                    clearTimeout(changeTimeout);
                    return changeTimeout = setTimeout(function() {
                        var value;
                        value = editor.getValue();
                        return self.trigger("html.valueChanged", value)
                    },
                    20)
                }
            })
        })(this._htmlExportEditor);
        editor = ace.edit("css-editor-target");
        CssMode = require("ace/mode/css").Mode;
        editor.getSession().setMode(new CssMode);
        editor.getSession().setTabSize(2);
        editor.getSession().setUseSoftTabs(true);
        editor.setTheme("ace/theme/monokai");
        editor.renderer.setHScrollBarAlwaysVisible(false);
        editor.renderer.setShowPrintMargin(false);
        editor.commands.commands.find.exec = function() {};
        this._cssEditor = editor; (function(editor) {
            var changeTimeout;
            changeTimeout = null;
            return editor.getSession().on("change",
            function() {
                if (!self.isLoading) {
                    clearTimeout(changeTimeout);
                    return changeTimeout = setTimeout(function() {
                        var value;
                        value = editor.getValue();
                        return self.trigger("css.valueChanged", value)
                    },
                    100)
                }
            })
        })(this._cssEditor);
        editor = ace.edit("js-editor-target");
        JsMode = require("ace/mode/javascript").Mode;
        editor.getSession().setMode(new JsMode);
        editor.getSession().setTabSize(2);
        editor.getSession().setUseSoftTabs(true);
        editor.setTheme("ace/theme/monokai");
        editor.renderer.setHScrollBarAlwaysVisible(false);
        editor.renderer.setShowPrintMargin(false);
        editor.commands.commands.find.exec = function() {};
        this._jsEditor = editor; (function(editor) {
            var changeTimeout;
            changeTimeout = null;
            return editor.getSession().on("change",
            function() {
                if (!self.isLoading) {
                    clearTimeout(changeTimeout);
                    return changeTimeout = setTimeout(function() {
                        var value;
                        value = editor.getValue();
                        return self.trigger("js.valueChanged", value)
                    },
                    500)
                }
            })
        })(this._jsEditor);
        return $('[data-type="bootstrap/button"]').focus()
    };
    Builder.prototype._minimizeComponents = function() {
        return $("#minimize-components").show()
    };
    Builder.prototype._processFrameContentResize = function() {
        var editorHeight, mainHeight;
        mainHeight = $(window).height() - this.header.outerHeight();
        editorHeight = this.codeInspector.height() + parseInt(this.codeInspector.css("bottom").replace("px", ""));
        return this.contentWrapper.height(mainHeight - editorHeight)
    };
    Builder.prototype._resizeScrollers = function() {
        $("#components-sidepane").nanoScroller();
        return this.sidepaneContent.nanoScroller()
    };
    Builder.prototype._processWindowResize = function() {
        var centerWidth, editorHeight, headerHeight, leftBarWidth, leftSidebar, main, mainHeight, rightBarWidth, rightSidebar, sideHeaderHeight, windowHeight, windowWidth;
        windowHeight = $(window).height();
        windowWidth = $(window).width();
        headerHeight = this.header.outerHeight();
        mainHeight = windowHeight - headerHeight;
        sideHeaderHeight = $("#components").find(".header").outerHeight();
        leftSidebar = $("#left-sidebar");
        leftBarWidth = leftSidebar.width();
        if (parseInt(leftSidebar.css("marginLeft")) < 0) {
            leftBarWidth = 0
        }
        rightSidebar = $("#right-sidebar");
        rightBarWidth = rightSidebar.width();
        if (parseInt(rightSidebar.css("marginRight")) < 0) {
            rightBarWidth = 0
        }
        centerWidth = windowWidth - leftBarWidth - rightBarWidth;
        main = $("#main");
        main.height(mainHeight);
        main.css("top", headerHeight);
        this.centerViewport.css({
            width: centerWidth,
            height: mainHeight
        });
        editorHeight = this.codeInspector.height() + parseInt(this.codeInspector.css("bottom").replace("px", ""));
        this.contentWrapper.height(mainHeight - editorHeight);
        $("#components-sidepane").height(mainHeight - $("#screens").outerHeight() - sideHeaderHeight + 1);
        $("#properties").find(".sidepane").height(mainHeight - sideHeaderHeight + 1);
        this._resizeScrollers();
        this.updateSelectBox();
        return this.updateHighlightBox()
    };
    Builder.prototype._bindUIEvents = function() {
        var self, sidebarWidth, slider, _this = this;
        self = this;
        $(document).ready(function() {
            return self._processWindowResize()
        });
        this._watchMediaQueries();
        $(window).resize(function() {
            clearTimeout(_this._windowResizeTimeout);
            return _this._windowResizeTimeout = setTimeout(function() {
                return _this._processWindowResize()
            },
            20)
        });
        $(window.FrameWindow).scroll(function(event) {
            var scrollTop, top;
            scrollTop = self.getScrollTop();
            if (self._contextMenu) {
                top = self._contextMenuStart.top - scrollTop;
                self._contextMenu.css({
                    top: top
                })
            }
            if (self._selectBox) {
                top = self._selectBoxStart.top - scrollTop;
                self._selectBox.css({
                    top: top
                })
            }
            if (self._highlightBox) {
                top = self._highlightBoxStart.top - scrollTop;
                self._highlightBox.css({
                    top: top
                })
            }
            if (self._jetstrapTag) {
                top = Math.max(0, self._jetstrapTagStart.top - scrollTop);
                return self._jetstrapTag.css({
                    top: top
                })
            }
        });
        this.frameWrapper.scroll(function(event) {
            var left, scrollLeft;
            scrollLeft = self.getScrollLeft();
            if (self._jetstrapTag) {
                left = Math.max(scrollLeft, self._jetstrapTagStart.left);
                return self._jetstrapTag.css({
                    left: left
                })
            }
        });
        $("#components").find("ul").collapser();
        this.componentSearch.find(".j-icon-close").click(function() {
            var searchBarInput;
            searchBarInput = self.componentSearch.find(".search-bar-input");
            searchBarInput.addClass("hidden");
            searchBarInput.val("");
            self.componentSearch.removeClass("expanded");
            return self.searchComponents("")
        });
        this.componentSearch.find(".j-icon-search").click(function() {
            if (!self.componentSearch.hasClass("expanded")) {
                self.componentSearch.addClass("expanded");
                $("#components").find(".header-text").html("");
                setTimeout(function() {
                    return self.componentSearch.find("input").focus()
                },
                200)
            }
            return false
        });
        this.componentSearch.find(".component-search-bar").on("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd",
        function() {
            if (self.componentSearch.hasClass("expanded")) {
                return self.componentSearch.find(".search-bar-input").removeClass("hidden")
            } else {
                return $("#components").find(".header-text").html("COMPONENTS")
            }
        });
        sidebarWidth = $(".sidebar").width();
        $(".sidebar-collapser").click(function() {
            var centerClass, centerWidth, isCollapsed, side, sidebar;
            sidebar = $(this).closest(".sidebar");
            isCollapsed = sidebar.hasClass("collapsed");
            centerWidth = self.centerViewport.outerWidth();
            if (isCollapsed) {
                self.centerViewport.css({
                    width: centerWidth - sidebarWidth + "px"
                })
            } else {
                self.centerViewport.css({
                    width: centerWidth + sidebarWidth + "px"
                })
            }
            sidebar.toggleClass("collapsed");
            side = $(this).data("side");
            centerClass = isCollapsed ? "expanded-" + side: "collapsed-" + side;
            self.centerViewport.removeClass("collapsed-" + side + " expanded-" + side);
            self.centerViewport.addClass(centerClass);
            self.updateSelectBox();
            return self.updateHighlightBox()
        });
        $("#editor-toggle").click(function() {
            self._toggleEditors();
            return false
        });
        this.editorToggles.find("[data-editor]").click(function(event) {
            var which;
            which = $(this).data("editor");
            $("#editors").find(".editor").hide();
            self.editorToggles.find(".active").removeClass("active");
            $("#" + which + "-editor-target").show();
            self.editorToggles.find('[data-editor="' + which + '"]').addClass("active");
            if (which === "html") {
                self._htmlExportEditor.focus()
            } else if (which === "css") {
                self._cssEditor.focus()
            } else if (which === "js") {
                self._jsEditor.focus()
            }
            return event.preventDefault()
        });
        this.header.find(".size").click(function() {
            var frameHtml, _this = this;
            self.hideHighlightBox();
            self.hideSelectBox();
            self.header.find(".size").removeClass("selected");
            $(this).addClass("selected");
            frameHtml = $(window.FrameDocument).find("html");
            frameHtml.removeClass("full desktop laptop tablet phone").addClass($(this).data("size"));
            $("#document-frame, #frame-drop, #preview-frame").removeClass("full desktop laptop tablet phone").addClass($(this).data("size"));
            $("#sizes-dropdown-toggle").removeClass("j-icon-phone j-icon-tablet j-icon-laptop j-icon-desktop j-icon-full").addClass("j-icon-" + $(this).data("size"));
            self.sizesDropdown.find(".dropdown-menu").fadeOut(50);
            setTimeout(function() {
                return self.updateSelectBox()
            },
            120);
            return false
        });
        this.sizesDropdown.find(".dropdown-toggle").click(function() {
            return self.accountDropdown.find(".dropdown-menu").fadeOut(50)
        });
        this.accountDropdown.find(".dropdown-toggle").click(function() {
            return self.sizesDropdown.find(".dropdown-menu").fadeOut(50)
        });
        $(".dropdown-toggle").click(function() {
            return $(".dropdown-menu").not($(this).next()).fadeOut(50)
        });
        $("#filterbar").find("li[data-filter] a").click(function() {
            var parent, section;
            parent = $(this).parent();
            section = parent.data("filter");
            parent.parent().find("li").removeClass("selected");
            parent.addClass("selected");
            self.filterComponents(section);
            return false
        });
        this.componentSearch.find('[name="ui-search"]').keyup(function(e) {
            var newThis, q;
            newThis = $(this);
            if (e.which === 27) {
                newThis.val("");
                self.searchComponents("");
                return
            }
            q = newThis.val();
            return self.searchComponents(q)
        });
        slider = $("#preview-slider").toggleslider({
            leftText: "BUILD",
            rightText: "TEST",
            leftOffset: "25px",
            on: function(event) {
                return self.setPreviewMode(true)
            },
            off: function(event) {
                return self.setPreviewMode(false)
            }
        });
        this._previewSlider = slider;
        $(document).on("hover", "#breadcrumbs > a",
        function(e) {
            var node;
            node = $(this).data("node");
            return self.showHighlightBox(node)
        });
        $(document).on("click", "#breadcrumbs > a",
        function(e) {
            var node;
            node = $(this).data("node");
            return self.selectComponentByNode(node)
        });
        $('[data-action="new-screen"]').click(function() {
            _this.clearSelection();
            return _this.trigger("promptNewScreen")
        });
        $('[data-action="select-screen"]').live("click",
        function(event) {
            event.stopPropagation();
            self.hideContextLayer();
            self.router.navigate("screen-" + $(this).attr("data-sid") + ".html", {
                trigger: true
            });
            return false
        });
        $('[data-action="create-screen"]').click(function() {
            var name, nameInput, template, templateKey;
            nameInput = _this.newProjectModal.find('[name="name"]');
            name = nameInput.val();
            if (!name || $.trim(name) === "") {
                nameInput.addClass("error");
                nameInput.attr("placeholder", "Please enter a name for this screen");
                return false
            }
            nameInput.removeClass("error");
            templateKey = _this.newProjectModal.find("[data-template].active").data("template");
            template = FrameworkTemplates.getTemplate(_this._framework.framework, templateKey);
            if (!template) {
                return false
            }
            console.log("New project with template", template);
            _this.trigger("newScreen", name, template);
            _this.hideHighlightBox();
            _this.emptyLoaded = false;
            _this.newProjectModal.modal("hide");
            return false
        });
        this.newProjectModal.find('[name="name"]').click(function() {
            var newThis;
            newThis = $(this);
            newThis.removeClass("error");
            return newThis.attr("placeholder", "Name this screen")
        });
        this.newProjectModal.find("[data-template]").click(function() {
            self.newProjectModal.find('[name="name"]').focus();
            return true
        });
        this.newProjectModal.on("hidden",
        function() {
            if (_this.emptyLoaded) {
                return _this.newProjectModal.modal("show")
            } else {
                return _this.screenLoadingIndicator.addClass("hidden")
            }
        });
        $('[data-action="rename-screen"]').click(function() {
            var n, p;
            p = self.userScreens.find("a.selected");
            n = prompt("Enter new name for this screen", $.trim(p.text()));
            if (n) {
                self.trigger("renameScreen", p.attr("data-sid"), $("<div>").text(n).html())
            }
            return false
        });
        $('[data-action="duplicate-screen"]').click(function() {
            _this.trigger("duplicateScreen", _this._document.project.get("unique_id"));
            return false
        });
        $('[data-action="delete-screen"]').click(function() {
            var n;
            if (_this.userScreens.find("a.selected").length) {
                n = confirm("Are you sure you want to delete this screen? There is no undo.");
                if (n) {
                    _this.trigger("deleteScreen", _this._document.project.get("unique_id"))
                }
                return false
            }
        });
        $('[data-action="close-builder"]').click(function() {
            _this.router.navigate("/dash", {
                trigger: true
            });
            _this.setPreviewMode(false);
            _this.trigger("closeBuilder");
            return false
        });
        this.on("duplicateScreen",
        function(screen) {
            var _this = this;
            this.hideContextLayer();
            this._document.clear();
            this.screenLoadingIndicator.removeClass("hidden");
            return $.ajax({
                type: "POST",
                url: "/api/v1/project/" + screen + "/duplicate",
                success: function(resp) {
                    var p;
                    _this.screenLoadingIndicator.addClass("hidden");
                    console.log("Duplicated", resp);
                    p = new JetstrapProject;
                    p.set(resp);
                    return _this.trigger("addAndSetScreen", p)
                },
                error: function(resp) {
                    var j;
                    _this.screenLoadingIndicator.addClass("hidden");
                    j = JSON.parse(resp.responseText);
                    if (j.error === "limit") {
                        return _this.trigger("builder.planLimit", resp)
                    }
                }
            })
        });
        this.on("deleteScreen",
        function(screen) {
            var _this = this;
            return $.ajax({
                type: "DELETE",
                url: "/api/v1/project/" + screen,
                success: function(resp) {
                    if (resp.error && resp.error === "must_have_one") {
                        alert("You must have at least one screen in your project.");
                        return
                    }
                    _this.hideContextLayer();
                    _this._document.clear();
                    _this.screenLoadingIndicator.addClass("hidden");
                    console.log("Deleted", resp);
                    return _this.trigger("screenRemoved", screen)
                },
                error: function(resp) {
                    return _this.screenLoadingIndicator.addClass("hidden")
                }
            })
        });
        this.on("promptNewScreen",
        function() {
            this.hideContextLayer();
            self.newProjectModal.modal("show");
            return self.newProjectModal.find("input:first").val("").focus()
        });
        this.on("newScreen",
        function(name, template) {
            this.hideContextLayer();
            this.isLoading = true;
            this.setPreviewMode(false);
            return this._document.newScreen(name, template)
        });
        this.on("newDemoScreen",
        function(template) {
            this.hideContextLayer();
            this.isLoading = true;
            this.setPreviewMode(false);
            return this._document.newDemoScreen(template)
        });
        this.on("loadFolder",
        function(folderid) {
            self.loadFolder(folderid);
            return self._processWindowResize()
        });
        this.on("newFolder",
        function(folderid) {
            self.newFolder(folderid);
            return self._processWindowResize()
        });
        this.on("applyScreenTemplate",
        function(template) {
            this._document && this._document.initWithTemplate(template);
            return this.save()
        });
        this.on("addAndSetScreen",
        function(model, prepend) {
            if (prepend == null) {
                prepend = true
            }
            self.addAndSetScreen(model, prepend);
            return self.sidepaneContent.nanoScroller()
        });
        this.on("renameScreen",
        function(id, name) {
            var s, _this = this;
            this._document.clear();
            this.screenLoadingIndicator.removeClass("hidden");
            s = new JetstrapProject;
            s.id = id;
            return s.save({
                name: name
            },
            {
                success: function(model, resp) {
                    _this.screenLoadingIndicator.addClass("hidden");
                    console.log("Screen renamed", model);
                    return self.trigger("screenRenamed", model)
                },
                error: function(resp) {
                    _this.screenLoadingIndicator.addClass("hidden");
                    return alert("Unable to rename screen. Please try again later or contact support@jetstrap.com.")
                }
            })
        });
        this.on("screenRenamed",
        function(screen) {
            self = this;
            if (screen.attributes) {
                screen = screen.attributes
            }
            self.userScreens.find('a[data-sid="' + screen.unique_id + '"]').remove();
            return self.addAndSetScreen(screen, true)
        });
        return this.on("screenRemoved",
        function(screen) {
            var sidepaneContent;
            this.hideContextLayer();
            this._document.clear();
            sidepaneContent = self.sidepaneContent;
            self.userScreens.find('a[data-sid="' + screen + '"]').remove();
            self.userScreens.find("a.selected").removeClass("selected");
            self.userScreens.find("a:first").click();
            sidepaneContent.animate({
                scrollTop: 0
            },
            100);
            sidepaneContent.nanoScroller();
            if (self.userScreens.find("a").length < 1) {
                return this._document.trigger("document.emptyLoaded")
            }
        })
    };
    Builder.prototype._setShortcutIcon = function(which, enabled) {
        var shortcutIcon;
        shortcutIcon = $("#shortcut-icons").find(".j-icon-" + which);
        if (enabled) {
            shortcutIcon.removeClass("disabled");
            return shortcutIcon.parent().removeClass("disabled")
        } else {
            shortcutIcon.addClass("disabled");
            return shortcutIcon.parent().addClass("disabled")
        }
    };
    Builder.prototype._updateShortcutIcons = function() {
        if (!this._document) {
            return
        }
        this._setShortcutIcon("undo", this._document.canUndo());
        this._setShortcutIcon("redo", this._document.canRedo());
        this._setShortcutIcon("duplicate", this._activeComponent);
        this._setShortcutIcon("cut", this._activeComponent);
        this._setShortcutIcon("paste", this._activeComponent && this._activeComponent.isContainer && (this._cutComponent || this._copiedComponent));
        return this._setShortcutIcon("delete", this._activeComponent)
    };
    Builder.prototype._bindShortcuts = function() {
        var preventBackspace, self, shortcutIcons, _this = this;
        self = this;
        shortcutIcons = $("#shortcut-icons");
        preventBackspace = function(event) {
            var d, doPrevent;
            doPrevent = false;
            if (event.keyCode === 8) {
                d = event.srcElement || event.target;
                if (d.tagName.toUpperCase() === "INPUT" && (d.type.toUpperCase() === "TEXT" || d.type.toUpperCase() === "PASSWORD") || d.tagName.toUpperCase() === "TEXTAREA") {
                    doPrevent = d.readOnly || d.disabled
                } else if ($(d).is("[contenteditable]")) {
                    doPrevent = false
                } else {
                    doPrevent = true
                }
            }
            if (doPrevent) {
                return event.preventDefault()
            }
        };
        $(document).unbind("keydown").bind("keydown", preventBackspace);
        $(window.FrameDocument).unbind("keydown").bind("keydown", preventBackspace);
        window.bindKeymasterEvents(window.FrameDocument, window.FrameWindow);
        key("escape, esc",
        function(e) {
            return _this.clearSelection()
        });
        shortcutIcons.find('[data-action="duplicate"]').click(function() {
            if (!$(this).hasClass("disabled")) {
                self.duplicateActive()
            }
            return false
        });
        key("⌘+d, ctrl+d", "all",
        function(e) {
            self.duplicateActive();
            return false
        });
        shortcutIcons.find('[data-action="undo"]').click(function() {
            self.undo();
            return false
        });
        key("⌘+shift+z, ctrl+shift+z", "all",
        function(e) {
            self.redo();
            return false
        });
        key("⌘+z,ctrl+z", "all",
        function(e) {
            self.undo();
            return false
        });
        shortcutIcons.find('[data-action="redo"]').click(function() {
            self.redo();
            return false
        });
        key("⌘+c, ctrl+c", "all",
        function(e) {
            self.copy();
            return false
        });
        shortcutIcons.find('[data-action="paste"]').click(function() {
            if (!$(this).hasClass("disabled")) {
                self.paste()
            }
            return false
        });
        key("⌘+v, ctrl+V", "all",
        function(e) {
            self.paste();
            return false
        });
        key("⌘+s, ctrl+s", "all",
        function(e) {
            self.save();
            return false
        });
        shortcutIcons.find('[data-action="cut"]').click(function() {
            if (!$(this).hasClass("disabled")) {
                self.cut()
            }
            return false
        });
        key("⌘+x, ctrl+x", "all",
        function(e) {
            self.cut();
            return false
        });
        shortcutIcons.find('[data-action="delete"]').click(function() {
            if (!$(this).hasClass("disabled")) {
                self.deleteSelectedComponent()
            }
            return false
        });
        return key("delete, del, backspace", "all",
        function(e) {
            if (!$(e.target).is("[contenteditable]")) {
                self.deleteSelectedComponent();
                return false
            }
        })
    };
    Builder.prototype.loadFrom = function(id) {
        var self, waitFunction, waitTimeout;
        self = this;
        this.trigger("documentLoading");
        this._document.loadFrom(id);
        if (this._isPreview) {
            waitFunction = function() {
                var waitTimeout;
                if (self.isLoading) {
                    return waitTimeout = setTimeout(waitFunction, 10)
                } else {
                    return self.showPreviewFrame()
                }
            };
            return waitTimeout = setTimeout(waitFunction, 1)
        }
    };
    Builder.prototype.writePreviewFrame = function(html, css, js) {
        var beginning, end, index, self;
        if (html == null) {
            html = null
        }
        if (css == null) {
            css = null
        }
        if (js == null) {
            js = null
        }
        self = this;
        if (!html) {
            html = this._document.getHtml()
        }
        if (!css) {
            css = this._document.getCss()
        }
        if (!js) {
            js = this._document.getJs()
        }
        if (css) {
            index = html.indexOf("</head");
            if (index >= 0) {
                beginning = html.slice(0, index);
                end = html.slice(index);
                html = beginning + '<style class="custom-css">\n' + css + "\n</style>\n" + end
            }
        }
        if (js) {
            index = html.indexOf("</body");
            if (index >= 0) {
                beginning = html.slice(0, index);
                end = html.slice(index);
                html = beginning + '<script class="custom-js">\n' + js + "\n</script>\n" + end
            }
        }
        this.previewDoc.open();
        this.previewDoc.write(html);
        this.previewDoc.close();
        return $(this.previewDoc).click(function(event) {
            var id, url;
            url = $(event.target).attr("href") || null;
            if (url && typeof url !== "undefined") {
                if (url.indexOf("screen-") === 0) {
                    id = url.substring(7);
                    id = id.substring(0, id.indexOf(".html"));
                    self.router.navigate("/screen-" + id + ".html", {
                        trigger: true
                    })
                } else {
                    if (url.indexOf("#") !== 0) {
                        alert("This link would go to the external url: " + url)
                    } else {
                        return true
                    }
                }
                return false
            } else {
                if (event.target.parentElement) {
                    event.target.parentElement.click(event)
                }
                event.stopPropagation();
                return false
            }
        })
    };
    Builder.prototype.clearPreviewFrame = function() {
        if (this.previewFrame) {
            return this.previewFrame.remove()
        }
    };
    Builder.prototype.showPreviewFrame = function() {
        var frame, self, size, waitFunction, waitTimeout;
        self = this;
        this.clearPreviewFrame();
        size = this.header.find(".size.selected").data("size");
        this.frameWrapper.append('<iframe id="preview-frame" src="about:blank" class="hidden relative ' + size + '"></iframe>');
        this.previewFrame = $("#preview-frame");
        $("#document-frame").addClass("hidden");
        frame = $("#preview-frame").get(0);
        waitFunction = function() {
            var waitTimeout;
            if (!frame.contentDocument && !frame.contentWindow) {
                return waitTimeout = setTimeout(waitFunction, 10)
            } else {
                self.previewDoc = frame.contentDocument || frame.contentWindow;
                if (self.previewDoc.document) {
                    self.previewDoc = self.previewDoc.document
                }
                self.writePreviewFrame();
                self.previewFrame.removeClass("hidden");
                self.documentFrame.addClass("hidden");
                return self.screenLoadingIndicator.addClass("hidden")
            }
        };
        return waitTimeout = setTimeout(waitFunction, 1)
    };
    Builder.prototype.hidePreviewFrame = function() {
        $("#document-frame").removeClass("hidden");
        if (this.previewFrame) {
            return this.previewFrame.hide()
        }
    };
    Builder.prototype.setPreviewMode = function(isPreview, preserveSelection) {
        var self;
        if (preserveSelection == null) {
            preserveSelection = false
        }
        self = this;
        this._isPreview = isPreview;
        if (isPreview) {
            this._previewSlider.toggleslider("on");
            this.closeEditors();
            this.hideContextMenu();
            this.clearSelection();
            this.hideHighlightBox();
            this.stopEditingNodes();
            this.showPreviewFrame();
            return this.frameBody.controlHighlight("destroy")
        } else {
            this._previewSlider.toggleslider("off");
            this.frameBody.controlHighlight();
            this.hidePreviewFrame();
            this.frameBody.blur();
            $("input", window.FrameDocument).blur();
            this.documentFrame.blur();
            this.frameDrop.focus();
            if (!preserveSelection) {
                this.clearSelection()
            }
            return this.redraw()
        }
    };
    Builder.prototype._watchMediaQueries = function() {
        var sizemq;
        if (window.matchMedia) {
            sizemq = window.matchMedia("(min-width: 1170px)");
            return sizemq.addListener(function(mq) {
                if (mq.matches) {
                    return console.log("Screen width 1170")
                }
            })
        }
    };
    Builder.prototype.filterComponents = function(section) {
        var $components, $componentsDataSection;
        $components = $("#components");
        $componentsDataSection = components.find("[data-section]");
        $("#filterbar").find('[name="uisearch"]').val("");
        if (section === "all") {
            return $componentsDataSection.show()
        } else {
            $componentsDataSection.hide();
            return $components.find('[data-section="' + section + '"]').show()
        }
    };
    Builder.prototype.searchComponents = function(query) {
        var $components, $componentsDataSection, components, k, q, _j, _len1, _results;
        $components = $("#components");
        $componentsDataSection = $components.find("[data-section]");
        $componentsDataSection.hide();
        q = query.toLowerCase();
        if ($.trim(q) === "") {
            $componentsDataSection.show();
            return
        }
        components = Controls.search(q);
        _results = [];
        for (_j = 0, _len1 = components.length; _j < _len1; _j++) {
            k = components[_j];
            _results.push($components.find('[data-type="' + k.type + '"]').show())
        }
        return _results
    };
    Builder.prototype.addControl = function(type, controlData) {
        var $controlsList, html;
        Controls.add(type, controlData);
        html = Template.render("jetstrap-control-entry", $.extend({
            type: type
        },
        controlData));
        $controlsList = $("#controls-list");
        $controlsList.find('[data-type="' + type + '"]').remove();
        $controlsList.append(html);
        return this._initDraggable()
    };
    Builder.prototype.newFolder = function(id) {
        var self;
        self = this;
        self.setScreens([]);
        self.setCurrentFolder(id);
        return self._document.trigger("document.emptyLoaded")
    };
    Builder.prototype.loadFolder = function(id) {
        var self;
        self = this;
        self.setScreens([]);
        return $.ajax({
            url: "/api/v1/folder/" + id + "/allprojects",
            success: function(response) {
                var screens;
                self.setCurrentFolder(id);
                screens = response["screens"];
                if (screens.length > 0) {
                    self.setScreens(screens);
                    return $("#project-name").text(response["folder_name"])
                } else {
                    return self._document.trigger("document.emptyLoaded")
                }
            },
            type: "GET",
            dataype: "json"
        })
    };
    Builder.prototype.setFirstScreen = function() {
        return this.userScreens.find("a:first").click()
    };
    Builder.prototype.setScreens = function(screens) {
        var s, self, _j, _len1;
        self = this;
        this._document.clear();
        this.userScreens.empty();
        this.screens = screens;
        for (_j = 0, _len1 = screens.length; _j < _len1; _j++) {
            s = screens[_j];
            self.addScreen(s, false)
        }
        return true
    };
    Builder.prototype.setCurrentFolder = function(folder) {
        self.currentFolder = folder;
        this._document.folderId = folder;
        return this.trigger("setCurrentFolder", folder)
    };
    Builder.prototype.addScreen = function(model, prepend) {
        var screen;
        screen = '<a data-action="select-screen" data-sid="' + model.unique_id + '" href="#"><div class="j-icon j-icon-page"></div><span class="screen-name"> ' + model.name + "</span></a>";
        if (prepend) {
            return this.userScreens.prepend(screen)
        } else {
            return this.userScreens.append(screen)
        }
    };
    Builder.prototype.addAndSetScreen = function(model, prepend) {
        var self;
        self = this;
        if (model.attributes) {
            model = model.attributes
        }
        self.addScreen(model, prepend);
        self.router.navigate("/screen-" + model.unique_id + ".html", {
            trigger: true,
            model: model
        });
        return mixpanel.track("Project Loaded")
    };
    Builder.prototype.setScreen = function(id) {
        this.clear();
        this.userScreens.find("a.selected").removeClass("selected");
        this.userScreens.find('a[data-sid="' + id + '"]').addClass("selected");
        this.isLoading = true;
        if (this._document) {
            this.loadFrom(id);
            return mixpanel.track("Project Loaded")
        }
    };
    Builder.prototype.getScreens = function() {
        var s, screens, _j, _len1, _ref;
        screens = [];
        _ref = this.userScreens.find("a");
        for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
            s = _ref[_j];
            s = $(s);
            screens.push({
                folder_id: s.attr("data-folderid"),
                unique_id: s.attr("data-sid"),
                name: s.text()
            })
        }
        return screens
    };
    Builder.prototype.clear = function() {
        this.clearSelection();
        this._document.clear();
        return this.hideSelectBox()
    };
    Builder.prototype.closeCurrentProject = function() {
        $("#project-name").text();
        this._document.initWithDefaults();
        return this.redraw()
    };
    Builder.prototype.newProject = function(name, template) {
        this._document.startNew(name, template);
        mixpanel.track("New Project Created");
        this.redraw();
        return this.save()
    };
    Builder.prototype.save = function() {
        var _this = this;
        clearTimeout(this._saveTimeout);
        return this._saveTimeout = setTimeout(function() {
            $("#saving-text .all-saved").addClass("fadeout");
            $("#saving-text .saving").show();
            return _this._document.save()
        },
        500)
    };
    Builder.prototype.showDropFrame = function() {
        return this.frameDrop.removeClass("hidden")
    };
    Builder.prototype.hideDropFrame = function() {
        return this.frameDrop.addClass("hidden")
    };
    Builder.prototype._initEvents = function() {
        var self, _this = this;
        self = this;
        this.bind("css.valueChanged",
        function(value) {
            _this._document.setCss(value);
            return $("#custom-css", window.FrameDocument).html(value)
        });
        this.bind("html.valueChanged",
        function(value) {
            if (!_this._skipHtmlValueChange) {
                _this._document.buildFromHtml(value);
                _this.clearSelection()
            }
            _this._document.trigger("documentChanged", {
                fromHtml: true
            });
            return _this._skipHtmlValueChange = false
        });
        this.bind("js.valueChanged",
        function(value) {
            return _this._document.setJs(value)
        });
        this.bind("js.error",
        function(msg) {
            return alert("JS ERROR", msg)
        });
        this.on("html.cursorChanged",
        function(spot) {
            var TokenIterator, iterator, token;
            TokenIterator = require("ace/token_iterator").TokenIterator;
            iterator = new TokenIterator(_this._htmlExportEditor.getSession(), spot.row, spot.column);
            token = iterator.getCurrentToken();
            return console.log("Current token", token)
        });
        this.bind("dragStart",
        function(type) {
            if (this._isPreview) {
                this._previewSlider.toggleslider("off");
                this.setPreviewMode(false, true)
            }
            return this.showDropFrame()
        });
        this.bind("dragStop",
        function() {
            self._activeComponent = null;
            this.hideHighlightBox();
            this.hideSelectBox();
            this.hideSelectTag();
            return this.hideDropFrame()
        });
        this.on("fileUploadFailed",
        function(resp) {
            return alert("Unable to upload file. Please try again later or contact support at support@jetstrap.com. Sorry :(")
        });
        return this.on("componentAction",
        function(action) {
            switch (action) {
            case "delete-component":
                return this.deleteSelectedComponent();
            case "duplicate-component":
                this.duplicateActive();
                return this.updateHighlightBox();
            case "click-component":
                if (this._activeComponent.obj.sendClick) {
                    this._activeComponent.obj.sendClick(this._activeComponent.node);
                    this.updateSelectBox();
                    return this.updateHighlightBox()
                }
            }
        })
    };
    Builder.prototype._initDraggable = function() {
        var self;
        self = this;
        console.log("Creating draggable for", this.sourceSelector);
        return $(this.sourceSelector).draggable({
            appendTo: "body",
            cursor: "hand",
            cursorAt: {
                left: -10,
                bottom: -10
            },
            helper: function() {
                var component, el, helper, insertable, text, type;
                text = $(this).text();
                type = $(this).data("type");
                self.clearSelection();
                component = Controls.get(type);
                el = $(component.defaultHtml);
                helper = el;
                helper.data("type", type);
                helper.addClass("jetstrap-dragging");
                helper.css({
                    position: "absolute"
                });
                insertable = helper.clone().removeAttr("style");
                self._activeComponent = {
                    obj: component,
                    node: insertable,
                    clone: $(insertable).clone().addClass("jetstrap-cloned")
                };
                return helper
            },
            start: function(event, ui) {
                var type;
                type = $(ui.helper).data("type");
                if (self._contextMenuComponent) {
                    self.hideContextMenu()
                }
                console.log("Starting dragging controls", ui);
                self._isDragging = true;
                return self.trigger("dragStart", type)
            },
            stop: function() {
                console.log("Stopping dragging controls");
                self._isDragging = false;
                self.trigger("dragStop");
                return self._dragStop()
            },
            revert: "invalid"
        })
    };
    Builder.prototype._initDroppable = function() {
        var self, _this = this;
        self = this;
        this.frameDrop.unbind("mousemove.jetstrap");
        this.frameDrop.bind("mousemove.jetstrap",
        function(event) {
            var el, point;
            if (!self._isPreview) {
                if (self._contextMenuComponent) {
                    return false
                }
                if (self._activeComponent && self._activeComponent.clone) {
                    self._activeComponent.clone.hide()
                }
                point = self.eventToFramePoint(event, true);
                el = self.getComponentFromPoint(point.x, point.y);
                if (self._activeComponent && self._activeComponent.clone) {
                    self._activeComponent.clone.show()
                } else {
                    self.hideHighlightBox()
                }
                el && self._dragEntered(point, el);
                return true
            }
        });
        this.frameBody.mousemove(function(event) {
            var el, point;
            if (!self._isPreview) {
                if (self._activeComponent && self._activeComponent.clone) {
                    self._activeComponent.clone.hide()
                }
                point = self.eventToFramePoint(event);
                el = self.getComponentFromPoint(point.x, point.y);
                if (self._activeComponent && self._activeComponent.clone) {
                    self._activeComponent.clone.show()
                } else {
                    self.hideHighlightBox()
                }
                if ($(el).attr("contenteditable")) {
                    self.hideHighlightBox();
                    return true
                }
                el && self._dragEntered(point, el);
                return true
            }
            return true
        });
        this.frameBody.on("click mousedown mousemove", "select, input",
        function(event) {
            if (!self._isPreview) {
                return event.preventDefault()
            }
        });
        this.frameBody.click(function(event, data) {
            var el, point;
            if (!self._isPreview) {
                if ($(event.target).is("[contenteditable]")) {
                    return true
                } else if (self.frameBody.find("[contenteditable]").length) {
                    self.stopEditingNodes()
                }
                if (self._didJustDrag) {
                    self._didJustDrag = false;
                    return false
                }
                if (data && data.context_click) {
                    return true
                }
                point = self.eventToFramePoint(event);
                el = self.getComponentFromPoint(point.x, point.y);
                if (!el || el === self.frameBody.get(0)) {
                    self.hideHighlightBox();
                    self.clearSelection()
                }
                el && self.selectComponentByNode(el);
                return false
            }
            return true
        });
        this.frameBody.dblclick(function(event) {
            var el, point;
            if (!self._isPreview) {
                self.clearSelection();
                self.hideHighlightBox();
                point = self.eventToFramePoint(event);
                el = self.getComponentFromPoint(point.x, point.y);
                return el && self.editComponentByNode(el)
            }
        });
        this.frameBody.get(0).oncontextmenu = function() {
            if (!self._isPreview) {
                return false
            }
        };
        this.frameBody.mousedown(function(event) {
            var el, point;
            if (!self._isPreview) {
                if (event.button === 2) {
                    if (self.frameBody.find("[contenteditable]").length) {
                        return
                    }
                    point = self.eventToFramePoint(event);
                    el = self.getComponentFromPoint(point.x, point.y);
                    if (!el) {
                        el = self.frameBody.get(0)
                    }
                    if ($(el).is("html,head,body")) {
                        return
                    }
                    el && self.selectComponentByNode(el);
                    self.showContextMenu(event);
                    return false
                } else {
                    self.hideContextMenu()
                }
            }
            return true
        });
        this.frameBody.on("mousemove", "#context-menu",
        function(e) {
            return false
        });
        this.frameBody.on("mousedown", "#context-menu",
        function(e) {
            return false
        });
        this.frameBody.on("mouseup", "#context-menu",
        function(e) {
            return false
        });
        this.frameBody.on("click", "#context-menu",
        function(e) {
            _this.hideContextMenu();
            e.stopPropagation();
            return true
        });
        return this.frameDrop.droppable({
            greedy: true,
            tolerance: "pointer",
            activate: function(event, ui) {
                return console.log("Droppable activate")
            },
            deactivate: function(event, ui) {},
            over: function(event, ui) {
                return console.log("Droppable over")
            },
            out: function(event, ui) {
                $(".jetstrap-dragging, .jetstrap-detached, .jetstrap-cloned").remove();
                $(".jetstrap-dragging, .jetstrap-detached, .jetstrap-cloned", window.FrameDocument).remove();
                return console.log("Droppable out")
            },
            drop: function(event, ui) {
                return self._dragStopped(event)
            }
        })
    };
    Builder.prototype.getComponentFromPoint = function(x, y) {
        var el;
        el = window.FrameDocument.elementFromPoint(x - this.getScrollLeft(), y - this.getScrollTop());
        if (el !== this.frameBody.get(0)) {
            el = this.frameBody.find(el).get(0)
        }
        return el
    };
    Builder.prototype.getScrollLeft = function() {
        return this.frameWrapper.scrollLeft()
    };
    Builder.prototype.setScrollLeft = function(newScrollLeft) {
        newScrollLeft = Math.min(0, newScrollLeft);
        return this.frameWrapper.scrollLeft(newScrollLeft)
    };
    Builder.prototype.getScrollTop = function() {
        return Math.max(this.frameBody.scrollTop(), $(window.FrameDocument).find("html").scrollTop())
    };
    Builder.prototype.setScrollTop = function(newScrollTop) {
        var frameHtml;
        newScrollTop = Math.max(0, newScrollTop);
        this.frameBody.scrollTop(newScrollTop);
        frameHtml = $(window.FrameDocument).find("html");
        return frameHtml.scrollTop(newScrollTop)
    };
    Builder.prototype.eventToFramePoint = function(event, fromFrameDrop) {
        var offset, point, self;
        if (fromFrameDrop == null) {
            fromFrameDrop = false
        }
        self = this;
        if (fromFrameDrop) {
            offset = self.frameDrop.offset();
            point = {
                x: event.pageX - offset.left - this.getFrameOffset() + this.getScrollLeft(),
                y: event.pageY - offset.top + this.getScrollTop()
            }
        } else {
            point = {
                x: event.pageX + this.getScrollLeft(),
                y: event.pageY
            }
        }
        return point
    };
    Builder.prototype._dragStop = function() {
        this._stopScrollingFrame();
        return $(".jetstrap-dragging", window.FrameDocument).remove()
    };
    Builder.prototype._stopScrollingFrame = function(which) {
        if (which === "down") {
            return clearInterval(this._frameScrollDownTimeout)
        } else if (which === "up") {
            return clearInterval(this._frameScrollUpTimeout)
        } else if (which === "right") {
            return clearInterval(this._frameScrollRightTimeout)
        } else if (which === "left") {
            return clearInterval(this._frameScrollLeftTimeout)
        } else {
            clearInterval(this._frameScrollDownTimeout);
            clearInterval(this._frameScrollUpTimeout);
            clearInterval(this._frameScrollRightTimeout);
            return clearInterval(this._frameScrollLeftTimeout)
        }
    };
    Builder.prototype._scrollFrameDown = function() {
        var self;
        self = this;
        clearInterval(this._frameScrollDownTimeout);
        this.hideContextMenu();
        return this._frameScrollDownTimeout = setInterval(function() {
            return self.setScrollTop(self.getScrollTop() + 20)
        },
        20)
    };
    Builder.prototype._scrollFrameUp = function() {
        var self;
        self = this;
        clearInterval(this._frameScrollUpTimeout);
        this.hideContextMenu();
        return this._frameScrollUpTimeout = setInterval(function() {
            return self.setScrollTop(self.getScrollTop() - 20)
        },
        20)
    };
    Builder.prototype._scrollFrameLeft = function() {
        var self;
        self = this;
        clearInterval(this._frameScrollLeftTimeout);
        this.hideContextMenu();
        return this._frameScrollLeftTimeout = setInterval(function() {
            return self.setScrollLeft(self.getScrollLeft() - 20)
        },
        20)
    };
    Builder.prototype._scrollFrameRight = function() {
        var self;
        self = this;
        clearInterval(this._frameScrollRightTimeout);
        this.hideContextMenu();
        return this._frameScrollTimeout = setInterval(function() {
            return self.setScrollLeft(self.getScrollLeft() + 20)
        },
        20)
    };
    Builder.prototype._dragEntered = function(point, node) {
        var container, insertableNode, sh, st;
        if (node !== this.frameBody.get(0)) {
            if (!this.frameBody.find(node).length) {
                return
            }
        }
        this.showHighlightBox(node);
        if (!this._isDragging || !this._activeComponent) {
            return true
        }
        this.frameDrop.removeClass("hand grabbing").addClass("grabbing");
        st = this.getScrollTop();
        sh = this.contentWrapper.height();
        if (point.y - st < 40) {
            this._scrollFrameUp()
        } else if (point.y > st + sh - 40) {
            this._scrollFrameDown()
        } else {
            this._stopScrollingFrame()
        }
        container = Controls.matchNode(node);
        if (!container) {
            return true
        }
        if (node === this._activeComponent.node.get(0) || node === this._activeComponent.clone.get(0) || $(node).parentsUntil("body").index(this._activeComponent.node) >= 0 || $(node).parentsUntil("body").index(this._activeComponent.clone) >= 0) {
            return true
        }
        if (!Controls.allowsChild(container, this._activeComponent.obj.type)) {
            return this._dragEntered(point, node.parentNode)
        }
        insertableNode = $(this._activeComponent.node);
        this._foundDragSpot = DocUtils.insertNewChildAtPoint(node, insertableNode, point);
        return true
    };
    Builder.prototype._dragStopped = function(event) {
        var num_parents, selectNode;
        if (!this._isDragging) {
            return true
        }
        this._isDragging = false;
        this._stopScrollingFrame();
        this.frameDrop.removeClass("hand grabbing");
        if (!this._document) {
            return
        }
        this._document.cleanTarget();
        this.hideSelectTag();
        $(".jetstrap-detached").remove();
        $(".jetstrap-draggable").remove();
        selectNode = null;
        if (
                this._foundDragSpot &&
                this._activeComponent &&
                this._activeComponent.clone
            ) {
            $(this._activeComponent.clone).remove();
            num_parents = $(this._activeComponent.node).parentsUntil("body").length;
            if (this._activeComponent.startParent) {
                this._document.pushAction({
                    action: Document.ActionTypes.MOVE_TO,
                    reaction: Document.ActionTypes.MOVE_FROM,
                    node: this._activeComponent.node,
                    oldParent: this._activeComponent.startParent,
                    oldPosition: this._activeComponent.startIndex,
                    newParent: this._activeComponent.node.parent(),
                    newPosition: this._activeComponent.node.index()
                })
            } else {
                this._document.pushAction({
                    action: Document.ActionTypes.ADD,
                    reaction: Document.ActionTypes.REMOVE,
                    node: this._activeComponent.node,
                    parent: this._activeComponent.node.parent(),
                    index: this._activeComponent.node.index()
                })
            }
            selectNode = this._activeComponent.node
        } else if (this._activeComponent) {
            $(this._activeComponent.clone).remove()
        }
        this._foundDragSpot = false;
        this._activeComponent = null;
        if (selectNode) {
            this.selectComponentByNode(selectNode)
        }
        this.redraw();
        return this._document.trigger("document.updateHtml")
    };
    Builder.prototype._initHoverController = function() {
        var $w, detachedControlEl, detachedIndex, detachedParent, dragStartPoint, repositionDragControl, self, widget;
        self = this;
        detachedControlEl = null;
        detachedIndex = null;
        detachedParent = null;
        dragStartPoint = null;
        repositionDragControl = function(e, lastPos, clickOffset) {
            var de, newLeft, newTop, offset, orig, s;
            s = self._activeComponent.clone;
            orig = self._activeComponent.node;
            de = $(s);
            offset = de.offset();
            newLeft = lastPos.x + clickOffset.x;
            newTop = lastPos.y - de.outerHeight() - clickOffset.y;
            de.css({
                position: "absolute",
                left: newLeft + "px",
                top: newTop + "px",
                zIndex: 1e3
            });
            if (!de.get(0).parentNode) {
                return de.appendTo(self.frameBody)
            }
        };
        widget = {
            _init: function() {
                this._mouseInit();
                this._savedControl = null;
                return this._lastPos = null
            },
            _destroy: function() {
                return this._mouseDestroy()
            },
            _mouseStart: function(e) {
                var control, controlNode, el, elPos, offset, parent, point, scrollTop;
                if (!self._isPreview) {
                    console.log("MOUSESTART: REDROPPING");
                    this._mouseStarted = false;
                    self._blockDropMouseClick = true;
                    point = {
                        x: e.pageX,
                        y: e.pageY
                    };
                    if (self._activeComponent && DocUtils.elementContains(self._activeComponent.node, point)) {
                        controlNode = self._activeComponent.node
                    } else {
                        scrollTop = self.getScrollTop();
                        el = window.FrameDocument.elementFromPoint(point.x, point.y - scrollTop);
                        el = self.frameBody.find(el).get(0);
                        controlNode = $(el)
                    }
                    if ($(el).attr("contenteditable")) {
                        return true
                    }
                    if (!controlNode || !controlNode.length) {
                        return
                    }
                    control = Controls.matchNode(controlNode);
                    while (control && control.canDrag === false) {
                        control = Controls.matchNode(controlNode.parent());
                        controlNode = controlNode.parent()
                    }
                    if (!control || !controlNode.length || controlNode.is("html,head,body")) {
                        return
                    }
                    console.log("Starting dragging on control", control.type);
                    parent = controlNode.parent();
                    if (!parent.length) {
                        return
                    }
                    self._activeComponent = {
                        node: $(controlNode).addClass("jetstrap-dragging"),
                        obj: control,
                        clone: $(controlNode).clone().addClass("jetstrap-cloned"),
                        startParent: $(controlNode).parent(),
                        startIndex: $(controlNode).index()
                    };
                    el = $(controlNode);
                    offset = el.offset();
                    elPos = {
                        x: offset.left,
                        y: offset.top
                    };
                    this._startPoint = point;
                    this._clickOffset = {
                        x: 10,
                        y: 10
                    }
                }
                return true
            },
            _mouseDrag: function(e) {
                var distance, ds, el, point;
                if (!self._isPreview) {
                    if (!self._activeComponent || !this._startPoint) {
                        self._isDragging = false;
                        return
                    }
                    point = {
                        x: e.pageX,
                        y: e.pageY
                    };
                    if (!this._lastPos) {
                        this._lastPos = point
                    }
                    ds = {
                        x: this._startPoint.x - point.x,
                        y: this._startPoint.y - point.y
                    };
                    distance = Math.sqrt(ds.x * ds.x + ds.y * ds.y);
                    if (distance < 10 && !self._isDragging) {
                        return
                    } else if (!self._isDragging) {
                        $(this.el).hide();
                        self.hideSelectBox()
                    }
                    self._isDragging = true;
                    repositionDragControl(e, this._lastPos, this._clickOffset);
                    this._lastPos = point;
                    el = window.FrameDocument.elementFromPoint(point.x, point.y);
                    el = $(window.FrameDocument).find("body").find(el).get(0)
                }
                return true
            },
            _mouseStop: function(e) {
                if (!self._isPreview) {
                    console.log("MOUSE STOP");
                    self._isDragging && self._dragStopped(e);
                    self._isDragging = false;
                    self._didJustDrag = true;
                    $(".jetstrap-dragging", window.FrameDocument).removeClass("jetstrap-dragging");
                    return false
                }
                return true
            }
        };
        $w = window.FrameWindow.$;
        $.widget("jetstrap.controlHighlight", $.core.mouse, widget);
        return this.frameBody.controlHighlight()
    };
    Builder.prototype.componentPropertyChanged = function(component, property, newValue) {
        var newNode;
        console.log("Processing new value for component", component, property, newValue);
        newNode = Controls.updateNodeForType(component.node, component.obj, property, newValue);
        newNode && newNode instanceof HTMLElement && this.selectComponentByNode(newNode);
        this.updateSelectBox();
        this.updateHighlightBox();
        return this._document.trigger("document.updateHtml")
    };
    Builder.prototype.componentChildrenChanged = function(component) {
        this._document.trigger("document.updateHtml");
        return this.redraw()
    };
    Builder.prototype.clearSelection = function() {
        var didChange;
        $(".shim", window.FrameDocument).remove();
        $("[contenteditable]", this.frameBody).removeAttr("contenteditable").removeAttr("spellcheck");
        this.hideSelectBox();
        didChange = this._activeComponent && Controls.commitProperties(this._activeComponent);
        this._activeComponent = null;
        this._activeComponents = null;
        $("#properties .sidepane").empty();
        $("#properties .header").text("PROPERTIES");
        this.hideBreadcrumbs();
        if (didChange) {
            return this._document.trigger("documentChanged")
        }
    };
    Builder.prototype.getFrameOffset = function() {
        return parseInt($("#document-frame").css("margin-left").replace(/px/, ""))
    };
    Builder.prototype.normalizeToScreenPoint = function(point) {
        var p;
        p = {
            x: point.x || point.left,
            y: point.y || point.top
        };
        p.x += this.getFrameOffset();
        p.y -= this.getScrollTop();
        return p
    };
    Builder.prototype.editComponentByNode = function(node) {
        if ($(node).is("body")) {
            return
        }
        this.frameBody.controlHighlight("destroy");
        $(node).attr("contenteditable", "true");
        $(node).attr("spellcheck", "false");
        $(node).focus();
        return $("#wysi-tools").show()
    };
    Builder.prototype.stopEditingNodes = function() {
        var node;
        if (!this._isPreview) {
            this.frameBody.controlHighlight()
        }
        node = this.frameBody.find("[contenteditable]");
        node.removeAttr("contenteditable");
        node.removeAttr("spellcheck");
        this.clearSelection();
        $(node).trigger("blur");
        $("#wysi-tools").hide();
        return this._document.trigger("document.updateHtml")
    };
    Builder.prototype.selectComponentByNode = function(node) {
        var type;
        if (this._activeComponent && this._activeComponent.node === node) {
            return true
        }
        if ($(node).is("html,head,body")) {
            return
        }
        this.clearSelection();
        this._activeComponent = null;
        this._activeComponents = null;
        type = Controls.matchNode(node);
        if (type.canSelect === false) {
            return this.selectComponentByNode($(node).parent())
        }
        if (type) {
            this._activeComponent = {
                node: $(node),
                clone: $(node).clone().addClass("jetstrap-cloned"),
                obj: type
            };
            this._blurEditors();
            this.showSelectBox(node, type);
            this.showCurrentProperties();
            this._updateShortcutIcons();
            this.showBreadcrumbsFor(node)
        }
        return false
    };
    Builder.prototype.getComponentByNode = function(node) {
        var type;
        type = Controls.matchNode(node);
        return {
            node: $(node),
            obj: type
        }
    };
    Builder.prototype.showContextMenu = function(e) {
        var a, contentHeight, contextMenuHeight, el, os, p, point, self, text, top, type, _j, _len1, _ref;
        self = this;
        p = self.eventToFramePoint(e);
        el = self.getComponentFromPoint(p.x, p.y);
        if (!el) {
            return
        }
        type = Controls.matchNode(el);
        if (type) {
            this._contextMenuComponent = {
                node: $(el),
                obj: type
            }
        }
        if (!this._contextMenuComponent) {
            return
        }
        if (!this._contextMenu) {
            this._contextMenu = $('      <ul id="context-menu" class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu">      </ul>      ');
            $(this._contextMenu).on("click", "[data-action]",
            function(e) {
                var a, tag, _j, _len1, _ref, _results;
                tag = $(this).data("action");
                _ref = self.DEFAULT_CONTEXT_ACTIONS;
                _results = [];
                for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
                    a = _ref[_j];
                    if (tag === a.tag) {
                        a.action && a.action.call(self, e);
                        break
                    } else {
                        _results.push(void 0)
                    }
                }
                return _results
            })
        }
        this._contextMenu.html("");
        os = "windows";
        if (navigator.userAgent.indexOf("Mac OS X") !== -1) {
            os = "mac"
        }
        _ref = this.DEFAULT_CONTEXT_ACTIONS;
        for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
            a = _ref[_j];
            if (a.shouldShow && a.shouldShow.call(self)) {
                text = a.text;
                if (typeof text === "function") {
                    text = a.text.call(self)
                }
                this._contextMenu.append('<li><a tabindex="-1" href="#" data-action="' + a.tag + '"><span class="context-shortcut right">' + a.shortcut[os] + "</span>" + text + "</a></li>")
            }
        }
        point = this.normalizeToScreenPoint(p);
        contentHeight = this.contentWrapper.height();
        this._contextMenu.appendTo(this.contextLayer);
        contextMenuHeight = this._contextMenu.outerHeight();
        top = point.y;
        if (top + contextMenuHeight > contentHeight) {
            top -= contextMenuHeight + 2
        }
        this._contextMenuStart = {
            top: top + this.getScrollTop()
        };
        return this._contextMenu.css({
            display: "block",
            top: top,
            left: point.x - this.getScrollLeft()
        }).appendTo(this.contextLayer)
    };
    Builder.prototype.hideContextMenu = function() {
        if (!this._contextMenu) {
            return
        }
        this._contextMenu.hide();
        return this._contextMenuComponent = null
    };
    Builder.prototype.showSelectBox = function(node, type) {
        var buttons, clickComp, el, outerHeight, point, self;
        self = this;
        if (node === self.frameBody.get(0)) {
            return
        }
        if (!this._selectBox) {
            el = $('<div class="jetstrap-selected-box"><div class="relative"><div class="buttons"><a href="#" data-action="click-component" rel="tooltip" title="Click"><div class="j-icon j-icon-click-small"></div></a><a href="#" data-action="duplicate-component" rel="tooltip" title="Duplicate"><div class="j-icon j-icon-duplicate-small"></div></a><a href="#" data-action="delete-component" rel="tooltip" title="Delete"><div class="j-icon j-icon-delete-small"></div></a></div></div></div>');
            el.find("a[data-action]").click(function() {
                var which;
                which = $(this).data("action");
                self.trigger("componentAction", which);
                console.log("doing button action", which);
                return false
            });
            el.appendTo(self.contextLayer);
            this._selectBox = el
        }
        clickComp = $('.jetstrap-selected-box [data-action="click-component"]', self._contextExtras);
        if (type.sendClick) {
            clickComp.show()
        } else {
            clickComp.hide()
        }
        point = this.normalizeToScreenPoint($(node).offset());
        this._selectBoxStart = {
            top: point.y + this.getScrollTop()
        };
        outerHeight = $(node).outerHeight();
        this._selectBox.css({
            left: point.x,
            top: point.y,
            width: $(node).outerWidth(),
            height: outerHeight
        });
        buttons = this.contextLayer.find(".jetstrap-selected-box").find(".buttons");
        if (point.y + outerHeight + buttons.outerHeight() > this.contentWrapper.outerHeight()) {
            buttons.addClass("inverted")
        } else {
            buttons.removeClass("inverted")
        }
        return this._selectBox.show()
    };
    Builder.prototype.updateSelectBox = function() {
        if (!this._selectBox || !this._activeComponent) {
            return
        }
        return this.showSelectBox(this._activeComponent.node, this._activeComponent.obj)
    };
    Builder.prototype.hideSelectBox = function() {
        return $(".jetstrap-selected-box", this.contextLayer).hide()
    };
    Builder.prototype.showHighlightBox = function(node) {
        var className, el, id, name, point, scrollLeft, scrollTop, type;
        if (!node) {
            this.hideHighlightBox();
            return
        }
        if ($(node).closest(".jetstrap-dragging").length) {
            this.hideHighlightBox();
            return
        }
        if (!this._highlightBox) {
            el = $('<div class="jetstrap-highlighted-box"></div>');
            el.appendTo(this.contextLayer);
            this._highlightBox = el
        } else {
            this._highlightBox.show()
        }
        type = Controls.matchNode(node);
        if (type.canSelect === false) {
            if (node.parentNode) {
                return this.showHighlightBox(node.parentNode)
            } else {
                this.hideHighlightBox()
            }
        }
        point = this.normalizeToScreenPoint($(node).offset());
        scrollTop = this.getScrollTop();
        scrollLeft = this.getScrollLeft();
        if (type) {
            this.frameDrop.removeClass("hand grabbing").addClass("hand");
            name = type.name;
            if (type.type === "generic") {
                className = node.className.split(" ").join(".");
                id = node.id;
                if (node.nodeName.toLowerCase() !== "body") {
                    name = node.nodeName.toLowerCase();
                    if (id) {
                        name = name + "#" + id
                    }
                    if (className) {
                        name = name + "." + className
                    }
                } else {
                    name = node.nodeName.toLowerCase()
                }
            }
            className = "jetstrap-tag";
            if (point.y < 21) {
                className = "jetstrap-tag-inverted"
            }
            if (!this._jetstrapTag) {
                this._jetstrapTag = $('<div class="' + className + '">' + name + "</div>");
                this._jetstrapTag.appendTo(this.contextLayer)
            } else {
                this._jetstrapTag.html(name);
                this._jetstrapTag.removeClass("jetstrap-tag, jetstrap-tag-inverted");
                this._jetstrapTag.addClass(className);
                this._jetstrapTag.show()
            }
            this._jetstrapTagStart = {
                top: Math.max(0, point.y + scrollTop - 21),
                left: point.x
            };
            this._jetstrapTag.css({
                top: Math.max(0, point.y - 21),
                left: Math.max(scrollLeft, point.x)
            })
        }
        this._highlightedComponent = node;
        this._highlightBoxStart = {
            top: point.y + scrollTop
        };
        return this._highlightBox.css({
            left: point.x,
            top: point.y,
            width: $(node).outerWidth(),
            height: $(node).outerHeight()
        })
    };
    Builder.prototype.updateHighlightBox = function() {
        if (!this._highlightBox || !this._highlightedComponent) {
            return
        }
        return this.showHighlightBox(this._highlightedComponent)
    };
    Builder.prototype.hideHighlightBox = function() {
        this.frameDrop.removeClass("hand grabbing");
        $(".jetstrap-highlighted-box", this.contextLayer).hide();
        this.hideSelectTag();
        return this._highlightedComponent = null
    };
    Builder.prototype.hideSelectTag = function() {
        $(".jetstrap-tag", this.contextLayer).hide();
        return $(".jetstrap-tag-inverted", this.contextLayer).hide()
    };
    Builder.prototype.hideContextLayer = function() {
        this.hideSelectBox();
        this.hideHighlightBox();
        this.hideSelectTag();
        return this.hideContextMenu()
    };
    Builder.prototype.getSelectedComponent = function() {
        return this._activeComponent
    };
    Builder.prototype.deleteSelectedComponent = function() {
        var $c, cs, node, oldIndex, p, _j, _len1;
        if (this._activeComponent) {
            node = this._activeComponent.node
        }
        if (this._contextMenuComponent) {
            node = this._contextMenuComponent.node
        }
        if (!node || node.is("body")) {
            return
        }
        cs = [node];
        this.hideHighlightBox();
        for (_j = 0, _len1 = cs.length; _j < _len1; _j++) {
            $c = cs[_j];
            if (!$c) {
                continue
            }
            oldIndex = $c.index();
            p = $c.parent();
            $c.remove();
            this._document.pushAction({
                action: Document.ActionTypes.REMOVE,
                reaction: Document.ActionTypes.ADD,
                node: node,
                parent: p,
                index: oldIndex
            })
        }
        this.clearSelection();
        this.updateHighlightBox();
        return this._document.trigger("document.updateHtml")
    };
    Builder.prototype.duplicateActive = function() {
        var newC, targetNode;
        if ((!this._activeComponent || !this._activeComponent.node) && !this._contextMenuComponent) {
            return
        }
        if (this._contextMenuComponent) {
            newC = $(this._contextMenuComponent.node).clone();
            targetNode = $(this._contextMenuComponent.node)
        } else {
            newC = $(this._activeComponent.node).clone();
            targetNode = $(this._activeComponent.node)
        }
        newC.insertAfter(targetNode);
        this._document.pushAction({
            action: Document.ActionTypes.ADD,
            reaction: Document.ActionTypes.REMOVE,
            node: newC,
            parent: targetNode.parent(),
            index: newC.index()
        });
        this.redraw();
        this.selectComponentByNode(newC.get(0));
        this.updateSelectBox();
        return this.updateHighlightBox()
    };
    Builder.prototype["export"] = function() {
        if (this._exportDisabled) {
            return
        }
        this._updateHtmlEditor();
        return this._htmlExportEditor.resize()
    };
    Builder.prototype.copy = function() {
        if (this._contextMenuComponent) {
            this._copiedComponent = this._contextMenuComponent;
            return this._cutComponent = null
        } else if (this._activeComponent) {
            this._copiedComponent = this._activeComponent;
            return this._cutComponent = null
        }
    };
    Builder.prototype.cut = function() {
        if (this._contextMenuComponent) {
            this._cutComponent = this._contextMenuComponent;
            this._cutComponent.oldParent = this._contextMenuComponent.node.parent()
        } else if (this._activeComponent) {
            this._cutComponent = this._activeComponent;
            this._cutComponent.oldParent = this._activeComponent.node.parent()
        }
        if (this._cutComponent) {
            this._copiedComponent = null;
            this.deleteSelectedComponent(this._activeComponent)
        }
        this.updateSelectBox();
        return this.updateHighlightBox()
    };
    Builder.prototype.paste = function() {
        var c, newNode, parentNode, target;
        c = this._copiedComponent || this._cutComponent;
        if (!c) {
            return
        }
        target = this._activeComponent || this.getComponentByNode($("body", window.FrameDocument));
        if (!target) {
            return
        }
        while (target && !Controls.allowsChild(target.obj, c.obj.type)) {
            parentNode = target.node.parent();
            target = this.getComponentByNode(parentNode)
        }
        if (!target) {
            return
        }
        newNode = c.node.clone();
        target.node.append(newNode);
        this.redraw();
        this._document.pushAction({
            action: Document.ActionTypes.ADD,
            reaction: Document.ActionTypes.REMOVE,
            node: newNode,
            parent: newNode.parent(),
            index: newNode.index()
        });
        this._cutComponent = null;
        this.selectComponentByNode(newNode);
        this.updateSelectBox();
        return this.updateHighlightBox()
    };
    Builder.prototype.undo = function() {
        this.clearSelection();
        this._document.undo();
        this.updateSelectBox();
        return this.updateHighlightBox()
    };
    Builder.prototype.redo = function() {
        this.clearSelection();
        this._document.redo();
        this.updateSelectBox();
        return this.updateHighlightBox()
    };
    Builder.prototype._bindCustomWidgetEvents = function(widget) {
        var _this = this;
        return widget.on("fileUploaded",
        function(file) {
            return console.log("Processing uploaded file", file)
        })
    };
    Builder.prototype.showCurrentProperties = function() {
        var childEntries, childObj, childType, className, component, k, name, node, prop, properties, row, self, sorted, target, type, widget, _fn, _j, _k, _len1, _len2, _ref, _this = this;
        if (!this._activeComponent) {
            return
        }
        self = this;
        component = this._activeComponent;
        type = component.obj;
        node = Controls.cleanNode(component.node);
        properties = type.properties;
        if (properties.length === 0) {
            return
        }
        name = component.obj.name;
        node = component.node.get(0);
        if (type.type === "generic") {
            className = node.className.split(" ").join(".");
            name = node.nodeName.toLowerCase();
            if (node.nodeName.toLowerCase() !== "body" && className) {
                name = name + "." + className
            }
        }
        $("#properties .header").text(name.toUpperCase());
        target = $("#properties .sidepane");
        target.empty();
        sorted = [];
        for (k in properties) {
            prop = properties[k];
            if (!prop.widgetpos) {
                prop.widgetpos = 3
            }
            sorted.push(prop)
        }
        sorted.sort(function(a, b) {
            return a.widgetpos - b.widgetpos
        });
        _fn = function(component, property) {
            return widget.on("valueChanged",
            function(val) {
                return _this.componentPropertyChanged(component, property, val)
            })
        };
        for (_j = 0, _len1 = sorted.length; _j < _len1; _j++) {
            prop = sorted[_j];
            widget = new prop.widgettype(prop.widgetdata);
            widget.setValue(Controls.getPropertyValue(type, node, prop));
            this._bindCustomWidgetEvents(widget);
            if (widget.type === "hidden") {
                continue
            }
            _fn(component, prop);
            widget.render();
            row = $('<div class="control-group clearfix"><label>' + prop.name + '</label><div class="controls"></div></div>');
            row.find(".controls").append(widget.el);
            target.append(row)
        }
        if (type.validChildren && type.validChildren.length) {
            childEntries = $('<div class="control-group clearfix"><label>Add Child</label><div class="controls"></div></div>');
            target.append(childEntries);
            _ref = type.validChildren;
            for (_k = 0, _len2 = _ref.length; _k < _len2; _k++) {
                childType = _ref[_k];
                childObj = Controls.get(childType);
                childObj && childEntries.find(".controls").append('<a href="#" class="btn btn-small" data-add-child-type="' + childType + '">' + childObj.name + "</a>")
            }
        }
        return target.find("[data-add-child-type]").click(function() {
            childType = $(this).data("add-child-type");
            Controls.addNewChild(self._activeComponent.obj, self._activeComponent.node, childType);
            return self.componentChildrenChanged(self._activeComponent)
        })
    };
    Builder.prototype.hideBreadcrumbs = function() {
        var bc;
        bc = $("#breadcrumbs");
        return bc.empty()
    };
    Builder.prototype.showBreadcrumbsFor = function(component) {
        var bc, c, dataType, link, name, parts, stack, type, _j, _len1, _results;
        bc = $("#breadcrumbs");
        bc.empty();
        c = $(component).get(0);
        stack = [];
        while (c) {
            stack.splice(0, 0, c);
            c = c.parentNode
        }
        parts = [];
        _results = [];
        for (_j = 0, _len1 = stack.length; _j < _len1; _j++) {
            c = stack[_j];
            dataType = $(c).data("jetstrap-component");
            if (!dataType) {
                continue
            }
            type = Controls.get(dataType);
            if (!type || type.canSelect === false) {
                continue
            }
            name = type.name;
            if (type.type === "generic") {
                link = $('<a href="#">' + c.nodeName.toLowerCase() + "</a>")
            } else {
                link = $('<a href="#">' + name.toLowerCase() + "</a>")
            }
            link.data("node", c);
            parts.push(link);
            bc.append(link);
            _results.push(bc.find("a + a").before(' <div class="breadcrumb-divider"></div> '))
        }
        return _results
    };
    Builder.prototype.redraw = function() {
        if (!this._document.rootEl) {
            return
        }
        return this._document.identifyNodes()
    };
    Builder.prototype._blurEditors = function() {
        this._htmlExportEditor.blur();
        this._cssEditor.blur();
        return this._jsEditor.blur()
    };
    Builder.prototype._htmlEditorShowNode = function(node) {
        if (!this._htmlExportEditor) {
            return
        }
        return this._htmlExportEditor.find($(node).html())
    };
    Builder.prototype._updateHtmlEditor = function() {
        var cursor, html, scroll;
        html = this._document.getHtml();
        cursor = this._htmlExportEditor.selection.getCursor();
        scroll = this._htmlExportEditor.session.getScrollTop();
        this._htmlExportEditor.getSession().setValue(html);
        this._htmlExportEditor.gotoLine(cursor.row + 1, cursor.column);
        return this._htmlExportEditor.session.setScrollTop(scroll)
    };
    Builder.prototype._updateCssEditor = function() {
        var css;
        css = this._document.getCss();
        this._document.setCss(css);
        $("#custom-css", window.FrameDocument).html(css);
        return this._cssEditor.getSession().setValue(css)
    };
    Builder.prototype._updateJsEditor = function() {
        var js;
        js = this._document.getJs();
        this._document.setJs(js);
        return this._jsEditor.getSession().setValue(js)
    };
    Builder.prototype._resizeEditors = function() {
        this._htmlExportEditor.resize(true);
        this._cssEditor.resize(true);
        return this._jsEditor.resize(true)
    };
    Builder.prototype._toggleEditors = function() {
        if (this.codeInspector.hasClass("expanded")) {
            return this.closeEditors()
        } else {
            this.codeInspector.addClass("expanded");
            this.editorToggles.removeClass("hidden");
            this._processFrameContentResize();
            return this.editorToggles.find(".active").click()
        }
    };
    Builder.prototype.closeEditors = function() {
        this.contentWrapper.height(this.centerViewport.height() - (this.codeInspector.outerHeight() - 400));
        this.codeInspector.removeClass("expanded");
        return this.editorToggles.addClass("hidden")
    };
    return Builder
} (Backbone.View);
Jetstrap = function() {
    function Jetstrap() {
        var _this = this;
        _.extend(this, Backbone.Events);
        $(document).ready(function() {
            _this.builder = new Builder;
            return _this.builder.on("readyToGo",
            function() {
                return _this.trigger("readyToGo")
            })
        })
    }
    Jetstrap.prototype.startFresh = function() {
        if (!this.builder.isFrameLoaded) {
            return
        }
        this.builder.getDocument().initWithDefaults();
        return this.builder.trigger("doneLoading")
    };
    Jetstrap.prototype.getHtml = function() {
        if (!this.builder.isFrameLoaded) {
            return
        }
        return this.builder.getDocument().getHtml()
    };
    Jetstrap.prototype.loadFromHtml = function(html) {
        if (!this.builder.isFrameLoaded) {
            return
        }
        this.builder.getDocument().buildFromHtml(html);
        return this.builder.trigger("doneLoading")
    };
    Jetstrap.prototype.loadByProjectId = function(id) {
        if (!this.builder.isFrameLoaded) {
            return
        }
        return this.builder.loadFrom(id)
    };
    Jetstrap.prototype.addControl = function(type, controlData) {
        return this.builder.addControl(type, controlData)
    };
    return Jetstrap
} ();
window.Jetstrap = new Jetstrap;
var __indexOf = [].indexOf ||
function(item) {
    for (var i = 0,
    l = this.length; i < l; i++) {
        if (i in this && this[i] === item) return i
    }
    return - 1
};
Controls.add("_base", {
    name: "Base",
    canDrag: true,
    properties: [{
        name: "Id",
        key: "id",
        html_attr: "id",
        widgetpos: -2,
        widgettype: SingleTextWidget
    },
    {
        name: "Extra classes",
        key: "extraClasses",
        getFromNode: function(node, type) {
            var c, classes, finalClasses, _i, _len;
            classes = node.className.split(" ");
            finalClasses = [];
            for (_i = 0, _len = classes.length; _i < _len; _i++) {
                c = classes[_i];
                if (type.classes && __indexOf.call(type.classes, c) < 0) {
                    finalClasses.push(c)
                } else if (!type.classes) {
                    finalClasses.push(c)
                }
            }
            return finalClasses.join(" ")
        },
        setOnNode: function(node, value, type) {
            var c, classes, preserve, _i, _len, _ref;
            preserve = [];
            classes = node.className.split(" ");
            if (type.classes) {
                _ref = type.classes;
                for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                    c = _ref[_i];
                    if (__indexOf.call(classes, c) >= 0) {
                        preserve.push(c)
                    }
                }
            }
            $(node).attr("class", "");
            $(node).addClass(preserve.join(" "));
            return $(node).addClass(value)
        },
        widgetpos: -2,
        widgettype: SingleTextWidget
    },
    {
        name: "Float",
        key: "float",
        html_attr: "class",
        possibleValues: ["", "pull-left", "pull-right"],
        widgetpos: 0,
        widgettype: SelectWidget,
        widgetdata: {
            items: [{
                value: "",
                text: "None"
            },
            {
                value: "pull-left",
                text: "Left"
            },
            {
                value: "pull-right",
                text: "Right"
            }]
        }
    }]
});
Controls.add("generic", {
    name: "Node",
    properties: [{
        name: "Type",
        key: "nodeName",
        getFromNode: function(node) {
            return node.nodeName.toLowerCase()
        },
        widgetpos: 0,
        widgettype: HiddenWidget
    }]
});
Controls.add("content", {
    name: "Html Content",
    defaultHtml: "<div>Some interesting content</div>",
    properties: [{
        name: "Content",
        key: "content",
        widgetpos: 100,
        widgettype: HiddenWidget
    }]
});
Frameworks.add("bootstrap", {
    name: "Bootstrap 2.3.2",
    cssFiles: ["https://netdna.bootstrapcdn.com/twitter-bootstrap/2.3.2/css/bootstrap-combined.min.css"],
    jsFiles: ["https://netdna.bootstrapcdn.com/twitter-bootstrap/2.3.2/js/bootstrap.min.js"],
    controls: ["bootstrap/gridrow", "bootstrap/button", "bootstrap/buttongroup", "bootstrap/buttontoolbar", "bootstrap/heading", "bootstrap/pageheader", "bootstrap/image", "bootstrap/hero", "bootstrap/alert", "bootstrap/well", "bootstrap/content", "bootstrap/icon", "bootstrap/taglabel", "bootstrap/badge", "bootstrap/progressbar", "bootstrap/hr", "bootstrap/navbar", "bootstrap/navcont", "bootstrap/breadcrumbs", "bootstrap/pagination", "bootstrap/form", "bootstrap/textinputgroup", "bootstrap/selectinputgroup", "bootstrap/fileinputgroup", "bootstrap/textareainputgroup", "bootstrap/radiobutton", "bootstrap/submitbutton", "bootstrap/checkbox", "bootstrap/container", "bootstrap/table"]
});
FrameworkTemplates.add("bootstrap", {
    name: "Empty",
    key: "empty",
    html: '<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <meta charset="utf-8">\n    <title>Bootstrap, from Twitter</title>\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <meta name="description" content="">\n    <meta name="author" content="">\n\n    <!-- Le styles -->\n    <link rel="stylesheet" href="https://netdna.bootstrapcdn.com/twitter-bootstrap/2.3.2/css/bootstrap-combined.min.css">\n  </head>\n  <body>\n    <div class="container"></div>\n  </body>\n</html>',
    image: "https://s3.amazonaws.com/jetstrap-site/images/builder/templates/blank_template.jpg"
});
FrameworkTemplates.add("bootstrap", {
    name: "Starter",
    key: "starter",
    image: "https://s3.amazonaws.com/jetstrap-site/images/builder/templates/starter_template.jpg",
    html: '<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <meta charset="utf-8">\n    <title>Bootstrap, from Twitter</title>\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <meta name="description" content="">\n    <meta name="author" content="">\n\n    <!-- Le styles -->\n    <link rel="stylesheet" href="https://netdna.bootstrapcdn.com/twitter-bootstrap/2.3.2/css/bootstrap-combined.min.css">\n  </head>\n\n  <body>\n\n    <div class="navbar navbar-inverse navbar-fixed-top">\n      <div class="navbar-inner">\n        <div class="container">\n          <button type="button" class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">\n            <span class="icon-bar"></span>\n            <span class="icon-bar"></span>\n            <span class="icon-bar"></span>\n          </button>\n          <a class="brand" href="#">Project name</a>\n          <div class="nav-collapse collapse">\n            <ul class="nav">\n              <li class="active"><a href="#">Home</a></li>\n              <li><a href="#about">About</a></li>\n              <li><a href="#contact">Contact</a></li>\n            </ul>\n          </div><!--/.nav-collapse -->\n        </div>\n      </div>\n    </div>\n\n    <div class="container">\n\n      <h1>Bootstrap starter template</h1>\n      <p>Use this document as a way to quick start any new project.<br> All you get is this message and a barebones HTML document.</p>\n\n    </div> <!-- /container -->\n\n    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>\n    <script src="https://netdna.bootstrapcdn.com/twitter-bootstrap/2.3.2/js/bootstrap.min.js"></script>\n  </body>\n</html>',
    css: "body {\n  padding-top: 60px; /* 60px to make the container go all the way to the bottom of the topbar */\n}"
});
FrameworkTemplates.add("bootstrap", {
    name: "Jumbotron",
    key: "jumbotron",
    css: "/* GLOBAL STYLES\n-------------------------------------------------- */\n/* Padding below the footer and lighter body text */\n\nbody {\n  padding-bottom: 40px;\n  color: #5a5a5a;\n}\n\n\n\n/* CUSTOMIZE THE NAVBAR\n-------------------------------------------------- */\n\n/* Special class on .container surrounding .navbar, used for positioning it into place. */\n.navbar-wrapper {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  z-index: 10;\n  margin-top: 20px;\n  margin-bottom: -90px; /* Negative margin to pull up carousel. 90px is roughly margins and height of navbar. */\n}\n.navbar-wrapper .navbar {\n\n}\n\n/* Remove border and change up box shadow for more contrast */\n.navbar .navbar-inner {\n  border: 0;\n  -webkit-box-shadow: 0 2px 10px rgba(0,0,0,.25);\n     -moz-box-shadow: 0 2px 10px rgba(0,0,0,.25);\n          box-shadow: 0 2px 10px rgba(0,0,0,.25);\n}\n\n/* Downsize the brand/project name a bit */\n.navbar .brand {\n  padding: 14px 20px 16px; /* Increase vertical padding to match navbar links */\n  font-size: 16px;\n  font-weight: bold;\n  text-shadow: 0 -1px 0 rgba(0,0,0,.5);\n}\n\n/* Navbar links: increase padding for taller navbar */\n.navbar .nav > li > a {\n  padding: 15px 20px;\n}\n\n/* Offset the responsive button for proper vertical alignment */\n.navbar .btn-navbar {\n  margin-top: 10px;\n}\n\n\n\n/* CUSTOMIZE THE CAROUSEL\n-------------------------------------------------- */\n\n/* Carousel base class */\n.carousel {\n  margin-bottom: 60px !important;\n}\n\n.carousel .container {\n  position: relative;\n  z-index: 9;\n}\n\n.carousel-control {\n  height: 80px;\n  margin-top: 0;\n  font-size: 120px;\n  text-shadow: 0 1px 1px rgba(0,0,0,.4);\n  background-color: transparent;\n  border: 0;\n  z-index: 10;\n}\n\n.carousel .item {\n  height: 500px;\n}\n.carousel img {\n  position: absolute;\n  top: 0;\n  left: 0;\n  min-width: 100%;\n  height: 500px;\n}\n\n.carousel-caption {\n  background-color: transparent !important;\n  position: static !important;\n  max-width: 550px !important;\n  padding: 0 20px !important;\n  margin-top: 200px !important;\n}\n.carousel-caption h1,\n.carousel-caption .lead {\n  margin: 0;\n  line-height: 1.25;\n  color: #fff;\n  text-shadow: 0 1px 1px rgba(0,0,0,.4);\n}\n.carousel-caption .btn {\n  margin-top: 10px;\n}\n\n\n\n/* MARKETING CONTENT\n-------------------------------------------------- */\n\n/* Center align the text within the three columns below the carousel */\n.marketing .span4 {\n  text-align: center;\n}\n.marketing h2 {\n  font-weight: normal;\n}\n.marketing .span4 p {\n  margin-left: 10px;\n  margin-right: 10px;\n}\n\n\n/* Featurettes\n------------------------- */\n\n.featurette-divider {\n  margin: 80px 0; /* Space out the Bootstrap <hr> more */\n}\n.featurette {\n  padding-top: 120px; /* Vertically center images part 1: add padding above and below text. */\n  overflow: hidden; /* Vertically center images part 2: clear their floats. */\n}\n.featurette-image {\n  margin-top: -120px; /* Vertically center images part 3: negative margin up the image the same amount of the padding to center it. */\n}\n\n/* Give some space on the sides of the floated elements so text doesn't run right into it. */\n.featurette-image.pull-left {\n  margin-right: 40px;\n}\n.featurette-image.pull-right {\n  margin-left: 40px;\n}\n\n/* Thin out the marketing headings */\n.featurette-heading {\n  font-size: 50px;\n  font-weight: 300;\n  line-height: 1;\n  letter-spacing: -1px;\n}\n\n\n\n/* RESPONSIVE CSS\n-------------------------------------------------- */\n\n@media (max-width: 979px) {\n\n  .container.navbar-wrapper {\n    margin-bottom: 0;\n    width: auto;\n  }\n  .navbar-inner {\n    border-radius: 0;\n    margin: -20px 0;\n  }\n\n  .carousel .item {\n    height: 500px;\n  }\n  .carousel img {\n    width: auto;\n    height: 500px;\n  }\n\n  .featurette {\n    height: auto;\n    padding: 0;\n  }\n  .featurette-image.pull-left,\n  .featurette-image.pull-right {\n    display: block;\n    float: none;\n    max-width: 40%;\n    margin: 0 auto 20px;\n  }\n}\n\n\n@media (max-width: 767px) {\n\n  .navbar-inner {\n    margin: -20px;\n  }\n\n  .carousel {\n    margin-left: -20px;\n    margin-right: -20px;\n  }\n  .carousel .container {\n\n  }\n  .carousel .item {\n    height: 300px;\n  }\n  .carousel img {\n    height: 300px;\n  }\n  .carousel-caption {\n    width: 65%;\n    padding: 0 70px;\n    margin-top: 100px;\n  }\n  .carousel-caption h1 {\n    font-size: 30px;\n  }\n  .carousel-caption .lead,\n  .carousel-caption .btn {\n    font-size: 18px;\n  }\n\n  .marketing .span4 + .span4 {\n    margin-top: 40px;\n  }\n\n  .featurette-heading {\n    font-size: 30px;\n  }\n  .featurette .lead {\n    font-size: 18px;\n    line-height: 1.5;\n  }\n\n}",
    html: '<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <meta charset="utf-8">\n    <title>Carousel Template &middot; Bootstrap</title>\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <meta name="description" content="">\n    <meta name="author" content="">\n\n    <!-- Le styles -->\n    <link rel="stylesheet" href="https://netdna.bootstrapcdn.com/twitter-bootstrap/2.3.2/css/bootstrap-combined.min.css">\n  </head>\n\n  <body>\n\n    <div class="navbar-wrapper">\n      <div class="container">\n\n        <div class="navbar navbar-inverse">\n          <div class="navbar-inner">\n            <button type="button" class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">\n              <span class="icon-bar"></span>\n              <span class="icon-bar"></span>\n              <span class="icon-bar"></span>\n            </button>\n            <a class="brand" href="#">Project name</a>\n            <div class="nav-collapse collapse">\n              <ul class="nav">\n                <li class="active"><a href="#">Home</a></li>\n                <li><a href="#about">About</a></li>\n                <li><a href="#contact">Contact</a></li>\n                <li class="dropdown">\n                  <a href="#" class="dropdown-toggle" data-toggle="dropdown">Dropdown <b class="caret"></b></a>\n                  <ul class="dropdown-menu">\n                    <li><a href="#">Action</a></li>\n                    <li><a href="#">Another action</a></li>\n                    <li><a href="#">Something else here</a></li>\n                    <li class="divider"></li>\n                    <li class="nav-header">Nav header</li>\n                    <li><a href="#">Separated link</a></li>\n                    <li><a href="#">One more separated link</a></li>\n                  </ul>\n                </li>\n              </ul>\n            </div>\n          </div>\n        </div>\n\n      </div> \n    </div>\n\n    <div id="myCarousel" class="carousel slide">\n      <div class="carousel-inner">\n        <div class="item active">\n          <img src="https://getbootstrap.com/2.3.2/assets/img/examples/slide-01.jpg">\n          <div class="container">\n            <div class="carousel-caption">\n              <h1>Example headline.</h1>\n              <p class="lead">Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>\n              <a class="btn btn-large btn-primary" href="#">Sign up today</a>\n            </div>\n          </div>\n        </div>\n        <div class="item">\n          <img src="https://getbootstrap.com/2.3.2/assets/img/examples/slide-02.jpg">\n          <div class="container">\n            <div class="carousel-caption">\n              <h1>Another example headline.</h1>\n              <p class="lead">Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>\n              <a class="btn btn-large btn-primary" href="#">Learn more</a>\n            </div>\n          </div>\n        </div>\n        <div class="item">\n          <img src="https://getbootstrap.com/2.3.2/assets/img/examples/slide-03.jpg">\n          <div class="container">\n            <div class="carousel-caption">\n              <h1>One more for good measure.</h1>\n              <p class="lead">Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>\n              <a class="btn btn-large btn-primary" href="#">Browse gallery</a>\n            </div>\n          </div>\n        </div>\n      </div>\n      <a class="left carousel-control" href="#myCarousel" data-slide="prev">&lsaquo;</a>\n      <a class="right carousel-control" href="#myCarousel" data-slide="next">&rsaquo;</a>\n    </div>\n\n    <div class="container marketing">\n\n      <div class="row">\n        <div class="span4">\n          <img class="img-circle" data-src="holder.js/140x140">\n          <h2>Heading</h2>\n          <p>Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod. Nullam id dolor id nibh ultricies vehicula ut id elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.</p>\n          <p><a class="btn" href="#">View details &raquo;</a></p>\n        </div>\n        <div class="span4">\n          <img class="img-circle" data-src="holder.js/140x140">\n          <h2>Heading</h2>\n          <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Cras mattis consectetur purus sit amet fermentum. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</p>\n          <p><a class="btn" href="#">View details &raquo;</a></p>\n        </div>\n        <div class="span4">\n          <img class="img-circle" data-src="holder.js/140x140">\n          <h2>Heading</h2>\n          <p>Donec sed odio dui. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vestibulum id ligula porta felis euismod semper. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</p>\n          <p><a class="btn" href="#">View details &raquo;</a></p>\n        </div>\n      </div>\n\n      <hr class="featurette-divider">\n\n      <div class="featurette">\n        <img class="featurette-image pull-right" src="https://getbootstrap.com/2.3.2/assets/img/examples/browser-icon-chrome.png">\n        <h2 class="featurette-heading">First featurette headling. <span class="muted">It\'ll blow your mind.</span></h2>\n        <p class="lead">Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula porta felis euismod semper. Praesent commodo cursus magna, vel scelerisque nisl consectetur. Fusce dapibus, tellus ac cursus commodo.</p>\n      </div>\n\n      <hr class="featurette-divider">\n\n      <div class="featurette">\n        <img class="featurette-image pull-left" src="https://getbootstrap.com/2.3.2/assets/img/examples/browser-icon-firefox.png">\n        <h2 class="featurette-heading">Oh yeah, it\'s that good. <span class="muted">See for yourself.</span></h2>\n        <p class="lead">Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula porta felis euismod semper. Praesent commodo cursus magna, vel scelerisque nisl consectetur. Fusce dapibus, tellus ac cursus commodo.</p>\n      </div>\n\n      <hr class="featurette-divider">\n\n      <div class="featurette">\n        <img class="featurette-image pull-right" src="https://getbootstrap.com/2.3.2/assets/img/examples/browser-icon-safari.png">\n        <h2 class="featurette-heading">And lastly, this one. <span class="muted">Checkmate.</span></h2>\n        <p class="lead">Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula porta felis euismod semper. Praesent commodo cursus magna, vel scelerisque nisl consectetur. Fusce dapibus, tellus ac cursus commodo.</p>\n      </div>\n\n      <hr class="featurette-divider">\n      <footer>\n        <p class="pull-right"><a href="#">Back to top</a></p>\n        <p>&copy; 2013 Company, Inc. &middot; <a href="#">Privacy</a> &middot; <a href="#">Terms</a></p>\n      </footer>\n\n    </div>\n    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>\n    <script src="https://netdna.bootstrapcdn.com/twitter-bootstrap/2.3.2/js/bootstrap.min.js"></script>\n\n    <script>\n      !function ($) {\n        $(function(){\n          // carousel demo\n          $(\'#myCarousel\').carousel()\n        })\n      }(window.jQuery)\n    </script>\n    <!--<script src="/assets/js/holder/holder.js"></script>-->\n  </body>\n</html>',
    image: "https://s3.amazonaws.com/jetstrap-site/images/builder/templates/jumbotron_template.jpg"
});
FrameworkTemplates.add("bootstrap", {
    name: "Basic Marketing",
    key: "basicmarketing",
    image: "https://s3.amazonaws.com/jetstrap-site/images/builder/templates/marketing_template.jpg",
    css: "body {\n  padding-top: 60px; /* 60px to make the container go all the way to the bottom of the topbar */\n  padding-bottom: 40px;\n}",
    html: '<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <meta charset="utf-8">\n    <title>Bootstrap, from Twitter</title>\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <meta name="description" content="">\n    <meta name="author" content="">\n\n    <!-- Le styles -->\n    <link rel="stylesheet" href="https://netdna.bootstrapcdn.com/twitter-bootstrap/2.3.2/css/bootstrap-combined.min.css">\n  </head>\n\n  <body>\n\n    <div class="navbar navbar-inverse navbar-fixed-top">\n      <div class="navbar-inner">\n        <div class="container">\n          <button type="button" class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">\n            <span class="icon-bar"></span>\n            <span class="icon-bar"></span>\n            <span class="icon-bar"></span>\n          </button>\n          <a class="brand" href="#">Project name</a>\n          <div class="nav-collapse collapse">\n            <ul class="nav">\n              <li class="active"><a href="#">Home</a></li>\n              <li><a href="#about">About</a></li>\n              <li><a href="#contact">Contact</a></li>\n              <li class="dropdown">\n                <a href="#" class="dropdown-toggle" data-toggle="dropdown">Dropdown <b class="caret"></b></a>\n                <ul class="dropdown-menu">\n                  <li><a href="#">Action</a></li>\n                  <li><a href="#">Another action</a></li>\n                  <li><a href="#">Something else here</a></li>\n                  <li class="divider"></li>\n                  <li class="nav-header">Nav header</li>\n                  <li><a href="#">Separated link</a></li>\n                  <li><a href="#">One more separated link</a></li>\n                </ul>\n              </li>\n            </ul>\n            <form class="navbar-form pull-right">\n              <input class="span2" type="text" placeholder="Email">\n              <input class="span2" type="password" placeholder="Password">\n              <button type="submit" class="btn">Sign in</button>\n            </form>\n          </div><!--/.nav-collapse -->\n        </div>\n      </div>\n    </div>\n\n    <div class="container">\n\n      <!-- Main hero unit for a primary marketing message or call to action -->\n      <div class="hero-unit">\n        <h1>Hello, world!</h1>\n        <p>This is a template for a simple marketing or informational website. It includes a large callout called the hero unit and three supporting pieces of content. Use it as a starting point to create something more unique.</p>\n        <p><a href="#" class="btn btn-primary btn-large">Learn more &raquo;</a></p>\n      </div>\n\n      <!-- Example row of columns -->\n      <div class="row">\n        <div class="span4">\n          <h2>Heading</h2>\n          <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>\n          <p><a class="btn" href="#">View details &raquo;</a></p>\n        </div>\n        <div class="span4">\n          <h2>Heading</h2>\n          <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>\n          <p><a class="btn" href="#">View details &raquo;</a></p>\n       </div>\n        <div class="span4">\n          <h2>Heading</h2>\n          <p>Donec sed odio dui. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vestibulum id ligula porta felis euismod semper. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</p>\n          <p><a class="btn" href="#">View details &raquo;</a></p>\n        </div>\n      </div>\n\n      <hr>\n\n      <footer>\n        <p>&copy; Company 2013</p>\n      </footer>\n\n    </div> <!-- /container -->\n\n    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>\n    <script src="https://netdna.bootstrapcdn.com/twitter-bootstrap/2.3.2/js/bootstrap.min.js"></script>\n  </body>\n</html>'
});
FrameworkTemplates.add("bootstrap", {
    name: "Fluid Marketing",
    key: "fluidmarketing",
    image: "https://s3.amazonaws.com/jetstrap-site/images/builder/templates/fluid_template.jpg",
    css: "body {\n  padding-top: 60px;\n  padding-bottom: 40px;\n}\n.sidebar-nav {\n  padding: 9px 0;\n}\n\n@media (max-width: 980px) {\n  /* Enable use of floated navbar text */\n  .navbar-text.pull-right {\n    float: none;\n    padding-left: 5px;\n    padding-right: 5px;\n  }\n}",
    html: '<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <meta charset="utf-8">\n    <title>Bootstrap, from Twitter</title>\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <meta name="description" content="">\n    <meta name="author" content="">\n\n    <!-- Le styles -->\n    <link rel="stylesheet" href="https://netdna.bootstrapcdn.com/twitter-bootstrap/2.3.2/css/bootstrap-combined.min.css">\n  </head>\n\n  <body>\n\n    <div class="navbar navbar-inverse navbar-fixed-top">\n      <div class="navbar-inner">\n        <div class="container-fluid">\n          <button type="button" class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">\n            <span class="icon-bar"></span>\n            <span class="icon-bar"></span>\n            <span class="icon-bar"></span>\n          </button>\n          <a class="brand" href="#">Project name</a>\n          <div class="nav-collapse collapse">\n            <p class="navbar-text pull-right">\n              Logged in as <a href="#" class="navbar-link">Username</a>\n            </p>\n            <ul class="nav">\n              <li class="active"><a href="#">Home</a></li>\n              <li><a href="#about">About</a></li>\n              <li><a href="#contact">Contact</a></li>\n            </ul>\n          </div><!--/.nav-collapse -->\n        </div>\n      </div>\n    </div>\n\n    <div class="container-fluid">\n      <div class="row-fluid">\n        <div class="span3">\n          <div class="well sidebar-nav">\n            <ul class="nav nav-list">\n              <li class="nav-header">Sidebar</li>\n              <li class="active"><a href="#">Link</a></li>\n              <li><a href="#">Link</a></li>\n              <li><a href="#">Link</a></li>\n              <li><a href="#">Link</a></li>\n              <li class="nav-header">Sidebar</li>\n              <li><a href="#">Link</a></li>\n              <li><a href="#">Link</a></li>\n              <li><a href="#">Link</a></li>\n              <li><a href="#">Link</a></li>\n              <li><a href="#">Link</a></li>\n              <li><a href="#">Link</a></li>\n              <li class="nav-header">Sidebar</li>\n              <li><a href="#">Link</a></li>\n              <li><a href="#">Link</a></li>\n              <li><a href="#">Link</a></li>\n            </ul>\n          </div><!--/.well -->\n        </div><!--/span-->\n        <div class="span9">\n          <div class="hero-unit">\n            <h1>Hello, world!</h1>\n            <p>This is a template for a simple marketing or informational website. It includes a large callout called the hero unit and three supporting pieces of content. Use it as a starting point to create something more unique.</p>\n            <p><a href="#" class="btn btn-primary btn-large">Learn more &raquo;</a></p>\n          </div>\n          <div class="row-fluid">\n            <div class="span4">\n              <h2>Heading</h2>\n              <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>\n              <p><a class="btn" href="#">View details &raquo;</a></p>\n            </div><!--/span-->\n            <div class="span4">\n              <h2>Heading</h2>\n              <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>\n              <p><a class="btn" href="#">View details &raquo;</a></p>\n            </div><!--/span-->\n            <div class="span4">\n              <h2>Heading</h2>\n              <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>\n              <p><a class="btn" href="#">View details &raquo;</a></p>\n            </div><!--/span-->\n          </div><!--/row-->\n          <div class="row-fluid">\n            <div class="span4">\n              <h2>Heading</h2>\n              <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>\n              <p><a class="btn" href="#">View details &raquo;</a></p>\n            </div><!--/span-->\n            <div class="span4">\n              <h2>Heading</h2>\n              <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>\n              <p><a class="btn" href="#">View details &raquo;</a></p>\n            </div><!--/span-->\n            <div class="span4">\n              <h2>Heading</h2>\n              <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>\n              <p><a class="btn" href="#">View details &raquo;</a></p>\n            </div><!--/span-->\n          </div><!--/row-->\n        </div><!--/span-->\n      </div><!--/row-->\n\n      <hr>\n\n      <footer>\n        <p>&copy; Company 2013</p>\n      </footer>\n\n    </div><!--/.fluid-container-->\n\n    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>\n    <script src="https://netdna.bootstrapcdn.com/twitter-bootstrap/2.3.2/js/bootstrap.min.js"></script>\n  </body>\n</html>'
});
FrameworkTemplates.add("bootstrap", {
    name: "Narrow Marketing",
    key: "narrowmarketing",
    image: "https://s3.amazonaws.com/jetstrap-site/images/builder/templates/narrow_template.jpg",
    css: "body {\n  padding-top: 20px;\n  padding-bottom: 40px;\n}\n\n/* Custom container */\n.container-narrow {\n  margin: 0 auto;\n  max-width: 700px;\n}\n.container-narrow > hr {\n  margin: 30px 0;\n}\n\n/* Main marketing message and sign up button */\n.jumbotron {\n  margin: 60px 0;\n  text-align: center;\n}\n.jumbotron h1 {\n  font-size: 72px;\n  line-height: 1;\n}\n.jumbotron .btn {\n  font-size: 21px;\n  padding: 14px 24px;\n}\n\n/* Supporting marketing content */\n.marketing {\n  margin: 60px 0;\n}\n.marketing p + h4 {\n  margin-top: 28px;\n}",
    html: '<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <meta charset="utf-8">\n    <title>Template &middot; Bootstrap</title>\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <meta name="description" content="">\n    <meta name="author" content="">\n    \n    <link rel="stylesheet" href="https://netdna.bootstrapcdn.com/twitter-bootstrap/2.3.2/css/bootstrap-combined.min.css">\n    </style>\n  </head>\n\n  <body>\n\n    <div class="container-narrow">\n\n      <div class="masthead">\n        <ul class="nav nav-pills pull-right">\n          <li class="active"><a href="#">Home</a></li>\n          <li><a href="#">About</a></li>\n          <li><a href="#">Contact</a></li>\n        </ul>\n        <h3 class="muted">Project name</h3>\n      </div>\n\n      <hr>\n\n      <div class="jumbotron">\n        <h1>Super awesome marketing speak!</h1>\n        <p class="lead">Cras justo odio, dapibus ac facilisis in, egestas eget quam. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</p>\n        <a class="btn btn-large btn-success" href="#">Sign up today</a>\n      </div>\n\n      <hr>\n\n      <div class="row-fluid marketing">\n        <div class="span6">\n          <h4>Subheading</h4>\n          <p>Donec id elit non mi porta gravida at eget metus. Maecenas faucibus mollis interdum.</p>\n\n          <h4>Subheading</h4>\n          <p>Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Cras mattis consectetur purus sit amet fermentum.</p>\n\n          <h4>Subheading</h4>\n          <p>Maecenas sed diam eget risus varius blandit sit amet non magna.</p>\n        </div>\n\n        <div class="span6">\n          <h4>Subheading</h4>\n          <p>Donec id elit non mi porta gravida at eget metus. Maecenas faucibus mollis interdum.</p>\n\n          <h4>Subheading</h4>\n          <p>Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Cras mattis consectetur purus sit amet fermentum.</p>\n\n          <h4>Subheading</h4>\n          <p>Maecenas sed diam eget risus varius blandit sit amet non magna.</p>\n        </div>\n      </div>\n\n      <hr>\n\n      <div class="footer">\n        <p>&copy; Company 2013</p>\n      </div>\n\n    </div> <!-- /container -->\n    \n    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>\n    <script src="https://netdna.bootstrapcdn.com/twitter-bootstrap/2.3.2/js/bootstrap.min.js"></script>\n\n  </body>\n</html>'
});
FrameworkTemplates.add("bootstrap", {
    name: "Justified Nav",
    key: "justifiednav",
    image: "https://s3.amazonaws.com/jetstrap-site/images/builder/templates/justified_template.jpg",
    css: "body {\n  padding-top: 20px;\n  padding-bottom: 60px;\n}\n\n/* Custom container */\n.container {\n  margin: 0 auto;\n  max-width: 1000px;\n}\n.container > hr {\n  margin: 60px 0;\n}\n\n/* Main marketing message and sign up button */\n.jumbotron {\n  margin: 80px 0;\n  text-align: center;\n}\n.jumbotron h1 {\n  font-size: 100px;\n  line-height: 1;\n}\n.jumbotron .lead {\n  font-size: 24px;\n  line-height: 1.25;\n}\n.jumbotron .btn {\n  font-size: 21px;\n  padding: 14px 24px;\n}\n\n/* Supporting marketing content */\n.marketing {\n  margin: 60px 0;\n}\n.marketing p + h4 {\n  margin-top: 28px;\n}\n\n\n/* Customize the navbar links to be fill the entire space of the .navbar */\n.navbar .navbar-inner {\n  padding: 0;\n}\n.navbar .nav {\n  margin: 0;\n  display: table;\n  width: 100%;\n}\n.navbar .nav li {\n  display: table-cell;\n  width: 1%;\n  float: none !important;\n}\n.navbar .nav li a {\n  font-weight: bold;\n  text-align: center;\n  border-left: 1px solid rgba(255,255,255,.75);\n  border-right: 1px solid rgba(0,0,0,.1);\n}\n.navbar .nav li:first-child a {\n  border-left: 0;\n  border-radius: 3px 0 0 3px;\n}\n.navbar .nav li:last-child a {\n  border-right: 0;\n  border-radius: 0 3px 3px 0;\n}",
    html: '<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <meta charset="utf-8">\n    <title>Template &middot; Bootstrap</title>\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <meta name="description" content="">\n    <meta name="author" content="">\n    \n    <link rel="stylesheet" href="https://netdna.bootstrapcdn.com/twitter-bootstrap/2.3.2/css/bootstrap-combined.min.css">\n\n  </head>\n\n  <body>\n\n    <div class="container">\n\n      <div class="masthead">\n        <h3 class="muted">Project name</h3>\n        <div class="navbar">\n          <div class="navbar-inner">\n            <div class="container">\n              <ul class="nav">\n                <li class="active"><a href="#">Home</a></li>\n                <li><a href="#">Projects</a></li>\n                <li><a href="#">Services</a></li>\n                <li><a href="#">Downloads</a></li>\n                <li><a href="#">About</a></li>\n                <li><a href="#">Contact</a></li>\n              </ul>\n            </div>\n          </div>\n        </div><!-- /.navbar -->\n      </div>\n\n      <!-- Jumbotron -->\n      <div class="jumbotron">\n        <h1>Marketing stuff!</h1>\n        <p class="lead">Cras justo odio, dapibus ac facilisis in, egestas eget quam. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</p>\n        <a class="btn btn-large btn-success" href="#">Get started today</a>\n      </div>\n\n      <hr>\n\n      <!-- Example row of columns -->\n      <div class="row-fluid">\n        <div class="span4">\n          <h2>Heading</h2>\n          <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>\n          <p><a class="btn" href="#">View details &raquo;</a></p>\n        </div>\n        <div class="span4">\n          <h2>Heading</h2>\n          <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>\n          <p><a class="btn" href="#">View details &raquo;</a></p>\n       </div>\n        <div class="span4">\n          <h2>Heading</h2>\n          <p>Donec sed odio dui. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vestibulum id ligula porta felis euismod semper. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa.</p>\n          <p><a class="btn" href="#">View details &raquo;</a></p>\n        </div>\n      </div>\n\n      <hr>\n\n      <div class="footer">\n        <p>&copy; Company 2013</p>\n      </div>\n\n    </div> <!-- /container -->\n    \n    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>\n    <script src="https://netdna.bootstrapcdn.com/twitter-bootstrap/2.3.2/js/bootstrap.min.js"></script>\n\n  </body>\n</html>'
});
Controls.add("bootstrap/container", {
    classes: ["container", "container-fluid"],
    canDrag: false,
    canEdit: false,
    defaultHtml: '<div class="container"></div>',
    name: "Container",
    properties: [{
        name: "Fluid Mode",
        key: "fluidmode",
        html_attr: "class",
        possibleValues: ["container", "container-fluid"],
        widgettype: SelectWidget,
        widgetdata: {
            items: [{
                value: "container",
                text: "Not Fluid"
            },
            {
                value: "container-fluid",
                text: "Fluid"
            }]
        }
    }]
});
Controls.add("bootstrap/button", {
    classes: ["btn", "btn-link"],
    name: "Button",
    validChildren: ["_text", "bootstrap/icon"],
    defaultHtml: '<a class="btn">Click!</a>',
    properties: [{
        name: "Content",
        key: "content",
        widgetpos: 100,
        widgettype: HiddenWidget
    },
    {
        name: "Link To",
        key: "href",
        html_attr: "href",
        widgetpos: 1,
        widgettype: LinkToWidget
    },
    {
        name: "Type",
        key: "type",
        html_attr: "class",
        widgetpos: 2,
        widgettype: SelectWidget,
        possibleValues: ["", "btn-primary", "btn-info", "btn-success", "btn-warning", "btn-danger", "btn-inverse"],
        widgetdata: {
            items: [{
                value: "",
                text: "Default"
            },
            {
                value: "btn-primary",
                text: "Primary"
            },
            {
                value: "btn-info",
                text: "Info"
            },
            {
                value: "btn-success",
                text: "Success"
            },
            {
                value: "btn-warning",
                text: "Warning"
            },
            {
                value: "btn-danger",
                text: "Danger"
            },
            {
                value: "btn-inverse",
                text: "Inverse"
            }]
        }
    },
    {
        name: "Size",
        key: "size",
        html_attr: "class",
        widgetpos: 3,
        widgettype: SelectWidget,
        possibleValues: ["", "btn-large", "btn-small", "btn-mini"],
        widgetdata: {
            items: [{
                value: "",
                text: "Default"
            },
            {
                value: "btn-large",
                text: "Large"
            },
            {
                value: "btn-small",
                text: "Small"
            },
            {
                value: "btn-mini",
                text: "Mini"
            }]
        }
    },
    {
        name: "Target",
        key: "target",
        html_attr: "target",
        widgetpos: 4,
        widgettype: SingleTextWidget
    },
    {
        name: "Disabled",
        key: "disabled",
        html_attr: "class",
        widgetpos: 5,
        widgettype: ToggleWidget,
        possibleValues: ["", "disabled"],
        widgetdata: {
            onText: "yes",
            onValue: "disabled",
            offText: "no",
            offValue: ""
        }
    }]
});
Controls.add("bootstrap/navbutton", {
    matchNode: function(node) {
        return $(node).hasClass("btn-navbar")
    },
    name: "Nav Button",
    validChildren: [],
    sendClick: function(node) {
        return $(node).trigger("click", {
            context_click: true
        })
    },
    clean: function(node) {
        var nav;
        node = $(node);
        nav = $(".nav-collapse", node.parent());
        node.removeClass("collapsed");
        nav.removeClass("in");
        nav.removeAttr("style");
        return node.trigger("click", {
            context_click: true
        })
    }
});
Controls.add("bootstrap/buttongroup", {
    classes: ["btn-group"],
    name: "Button Group",
    validChildren: ["bootstrap/button"],
    defaultHtml: '<div class="btn-group"><a href="#" class="btn">Button 1</a><a href="#" class="btn">Button 2</a><a href="#" class="btn">Button 3</a></div>'
});
Controls.add("bootstrap/buttontoolbar", {
    classes: ["btn-toolbar"],
    name: "Button Toolbar",
    validChildren: ["bootstrap/buttongroup", "bootstrap/buttondropdown"],
    defaultHtml: '<div class="btn-toolbar"><div class="btn-group"><a href="#" class="btn">Button 1</a><a href="#" class="btn">Button 2</a><a href="#" class="btn">Button 3</a></div><div class="btn-group"><a href="#" class="btn">Button 1</a><a href="#" class="btn">Button 2</a><a href="#" class="btn">Button 3</a></div></div>'
});
Controls.add("bootstrap/icon", {
    classRegex: "icon-",
    name: "Icon",
    defaultHtml: '<i class="icon-heart"></i>',
    properties: [{
        name: "Icon",
        key: "icon",
        widgetpos: 0,
        widgettype: IconWidget,
        getFromNode: function(node) {
            var className, classNames, classes, _i, _len;
            classNames = node.className;
            classes = classNames && classNames.split(/\s+/) || [];
            for (_i = 0, _len = classes.length; _i < _len; _i++) {
                className = classes[_i];
                if (/icon-/.test(className)) {
                    return className
                }
            }
        },
        setOnNode: function(node, value) {
            var className, classNames, classes, _i, _len;
            classNames = node.className;
            classes = classNames && classNames.split(/\s+/) || [];
            for (_i = 0, _len = classes.length; _i < _len; _i++) {
                className = classes[_i];
                if (/icon-/.test(className)) {
                    $(node).removeClass(className)
                }
            }
            return $(node).addClass(value)
        }
    }]
});
Controls.add("bootstrap/pageheader", {
    name: "Page Header",
    defaultHtml: '<div class="page-header"><h3>Top of the mornin\' to ya!</h3></div>',
    image: "https://s3.amazonaws.com/jetstrap-site/images/builder/components/heading.png",
    image2x: "https://s3.amazonaws.com/jetstrap-site/images/builder/components/heading2x.png"
});
Controls.add("bootstrap/image", {
    nodes: ["img"],
    name: "Image",
    validChildren: [],
    defaultHtml: '<img src="https://s3.amazonaws.com/jetstrap-site/images/website/index/what_icon.png">',
    image: "https://s3.amazonaws.com/jetstrap-site/images/builder/components/image.png",
    image2x: "https://s3.amazonaws.com/jetstrap-site/images/builder/components/image2x.png",
    canEdit: false,
    properties: [{
        name: "Image",
        key: "src",
        html_attr: "src",
        widgettype: FileUploadWidget
    },
    {
        name: "Size",
        key: "width",
        html_attr: "width",
        widgettype: SingleTextWidget
    },
    {
        name: "Height",
        key: "height",
        html_attr: "height",
        widgettype: SingleTextWidget
    }]
});
Controls.add("bootstrap/heading", {
    nodes: ["h1", "h2", "h3", "h4", "h5", "h6"],
    name: "Heading",
    defaultHtml: "<h3>Heading</h3>",
    image: "https://s3.amazonaws.com/jetstrap-site/images/builder/components/heading.png",
    image2x: "https://s3.amazonaws.com/jetstrap-site/images/builder/components/heading2x.png",
    validChildren: [],
    properties: [{
        name: "Content",
        key: "content",
        widgetpos: 100,
        widgettype: HiddenWidget
    },
    {
        name: "Size",
        key: "size",
        widgetpos: 4,
        possibleValues: ["1", "2", "3", "4", "5", "6"],
        getFromNode: function(node) {
            var r;
            r = /H(\d)/.exec(node.nodeName);
            if (r && r.length > 1) {
                return r[1]
            }
            return 3
        },
        setOnNode: function(node, value) {
            var newNode;
            console.log("Changing H to H", value);
            newNode = document.createElement("h" + value);
            $(newNode).append($(node).contents());
            $(node).replaceWith(newNode);
            return newNode
        },
        widgettype: SelectWidget,
        widgetdata: {
            items: [{
                value: "1",
                text: "1"
            },
            {
                value: "2",
                text: "2"
            },
            {
                value: "3",
                text: "3"
            },
            {
                value: "4",
                text: "4"
            },
            {
                value: "5",
                text: "5"
            },
            {
                value: "6",
                text: "6"
            }]
        }
    }]
});
Controls.add("bootstrap/hr", {
    validChildren: [],
    image: "https://s3.amazonaws.com/jetstrap-site/images/builder/components/hr.png",
    image2x: "https://s3.amazonaws.com/jetstrap-site/images/builder/components/hr2x.png",
    nodes: ["hr"],
    name: "Horizontal Rule",
    defaultHtml: "<hr>"
});
Controls.add("bootstrap/form", {
    nodes: ["form"],
    image: "https://s3.amazonaws.com/jetstrap-site/images/builder/components/form.png",
    image2x: "https://s3.amazonaws.com/jetstrap-site/images/builder/components/form2x.png",
    name: "Form",
    defaultHtml: "<form></form>",
    properties: [{
        name: "Style",
        key: "style",
        html_attr: "class",
        possibleValues: ["", "form-search", "form-inline", "form-horizontal"],
        widgettype: SelectWidget,
        widgetdata: {
            items: [{
                value: "",
                text: "Default"
            },
            {
                value: "form-search",
                text: "Search"
            },
            {
                value: "form-inline",
                text: "Inline"
            },
            {
                value: "form-horizontal",
                text: "Horizontal"
            }]
        }
    },
    {
        name: "Action",
        key: "action",
        html_attr: "action",
        value: "",
        widgetpos: 1,
        widgettype: SingleTextWidget
    },
    {
        name: "Method",
        key: "method",
        html_attr: "method",
        value: "",
        widgetpos: 2,
        widgettype: SingleTextWidget
    }]
});
Controls.add("bootstrap3/label", {
    name: "Label",
    nodes: ["label"],
    defaultHtml: '<label for="">Label</label>',
    properties: [{
        name: "For id",
        html_attr: "for",
        widgettype: SingleTextWidget
    }]
});
Controls.add("bootstrap/alert", {
    classes: ["alert"],
    name: "Alert",
    defaultHtml: '<div class="alert"><h3>Alert!</h3><p>This is not a test</p></h3></div>',
    properties: [{
        name: "Type",
        key: "type",
        html_attr: "class",
        widgettype: SelectWidget,
        possibleValues: ["", "alert-error", "alert-success", "alert-info"],
        widgetdata: {
            items: [{
                value: "",
                text: "Default"
            },
            {
                value: "alert-error",
                text: "Danger"
            },
            {
                value: "alert-success",
                text: "Success"
            },
            {
                value: "alert-info",
                text: "Info"
            }]
        }
    }]
});
Controls.add("bootstrap/progressbar", {
    classes: ["progress"],
    name: "Progress Bar",
    defaultHtml: '<div class="progress"><div class="bar" style="width: 50%"></div></div>',
    properties: [{
        name: "Value",
        key: "value",
        getFromNode: function(node) {
            var bar;
            bar = $(node).find(".bar:first").get(0);
            if (bar) {
                return bar.style.width.substring(0, bar.style.width.length - 1)
            }
            return 50
        },
        setOnNode: function(node, value) {
            var bar;
            bar = $(node).find(".bar:first").get(0);
            if (bar) {
                return bar.style.width = value + "%"
            }
        },
        widgettype: SingleTextWidget
    },
    {
        name: "Type",
        key: "type",
        html_attr: "class",
        possibleValues: ["", "progress-success", "progress-warning", "progress-danger"],
        widgettype: SelectWidget,
        widgetdata: {
            items: [{
                value: "",
                text: "Default"
            },
            {
                value: "progress-success",
                text: "Success"
            },
            {
                value: "progress-warning",
                text: "Warning"
            },
            {
                value: "progress-danger",
                text: "Error"
            }]
        }
    },
    {
        name: "Striped",
        key: "striped",
        html_attr: "class",
        possibleValues: ["", "progress-striped"],
        widgettype: ToggleWidget,
        widgetdata: {
            onText: "yes",
            onValue: "progress-striped",
            offText: "no",
            offValue: ""
        }
    },
    {
        name: "Animated",
        key: "animated",
        html_attr: "class",
        possibleValues: ["", "active"],
        widgettype: ToggleWidget,
        widgetdata: {
            onText: "yes",
            onValue: "active",
            offText: "no",
            offValue: ""
        }
    }]
});
Controls.add("bootstrap/progressbarbar", {
    name: "Bar",
    matchNode: function(node) {
        return $(node).hasClass("bar") && $(node).parent().is(".progress")
    },
    canSelect: false,
    canEdit: false,
    canDrag: false
});
Controls.add("bootstrap/hero", {
    classes: ["hero-unit"],
    name: "Hero Unit",
    defaultHtml: '<div class="hero-unit"><h1>Hello, World!</h1><p>This is the coolest!</p></div>'
});
Controls.add("bootstrap/well", {
    classes: ["well"],
    name: "Well",
    defaultHtml: '<div class="well"><h3>Well!</h3><p>This is something.</p></div>'
});
Controls.add("bootstrap/taglabel", {
    classes: ["label"],
    name: "Tag Label",
    defaultHtml: '<span class="label">Label</span>',
    properties: [{
        name: "Text",
        key: "text",
        widgettype: HiddenWidget
    },
    {
        name: "Content",
        key: "content",
        widgetpos: 100,
        widgettype: HiddenWidget
    },
    {
        name: "Type",
        key: "type",
        html_attr: "class",
        possibleValues: ["", "label-success", "label-warning", "label-important", "label-info", "label-inverse"],
        widgettype: SelectWidget,
        widgetdata: {
            items: [{
                value: "",
                text: "Default"
            },
            {
                value: "label-success",
                text: "Success"
            },
            {
                value: "label-warning",
                text: "Warning"
            },
            {
                value: "label-important",
                text: "Important"
            },
            {
                value: "label-info",
                text: "Info"
            },
            {
                value: "label-inverse",
                text: "Inverse"
            }]
        }
    }]
});
Controls.add("bootstrap/badge", {
    classes: ["badge"],
    name: "Badge",
    defaultHtml: '<span class="badge">Badge</span>',
    properties: [{
        name: "Text",
        key: "text",
        widgettype: HiddenWidget
    },
    {
        name: "Content",
        key: "content",
        widgetpos: 100,
        widgettype: HiddenWidget
    },
    {
        name: "Type",
        key: "type",
        html_attr: "class",
        possibleValues: ["", "badge-success", "badge-warning", "badge-important", "badge-info", "badge-inverse"],
        widgettype: SelectWidget,
        widgetdata: {
            items: [{
                value: "",
                text: "Default"
            },
            {
                value: "badge-success",
                text: "Success"
            },
            {
                value: "badge-warning",
                text: "Warning"
            },
            {
                value: "badge-important",
                text: "Important"
            },
            {
                value: "badge-info",
                text: "Info"
            },
            {
                value: "badge-inverse",
                text: "Inverse"
            }]
        }
    }]
});
Controls.add("bootstrap/navcont", {
    name: "Nav",
    classes: ["nav", "nav-tabs", "nav-pills"],
    validChildren: ["bootstrap/navitem", "bootstrap/dropdown"],
    defaultHtml: '<ul class="nav nav-tabs"><li class="active"><a href="#">Home</a></li><li><a href="#">About</a></li><li><a href="#">Contact</a></li></ul>',
    properties: [{
        name: "Nav Type",
        key: "type",
        html_attr: "class",
        possibleValues: ["", "nav-tabs", "nav-pills"],
        widgettype: SelectWidget,
        widgetdata: {
            items: [{
                value: "nav-tabs",
                text: "Tabbed"
            },
            {
                value: "nav-pills",
                text: "Pilled"
            }]
        }
    },
    {
        name: "Stacked",
        key: "stacked",
        widgetpos: -1,
        html_attr: "class",
        possibleValues: ["", "nav-stacked"],
        widgettype: SelectWidget,
        widgetdata: {
            items: [{
                value: "",
                text: "Horizontal"
            },
            {
                value: "nav-stacked",
                text: "Vertical"
            }]
        }
    }]
});
Controls.add("bootstrap/dropdown", {
    matchNode: function(node) {
        return $(node).is(".dropdown")
    },
    name: "Dropdown",
    validChildren: ["bootstrap/navitem"],
    insertChild: function(node, child) {
        return $(node).find("> ul > li:last").before(child)
    },
    sendClick: function(node) {
        return $(node).toggleClass("open")
    },
    clean: function(node) {
        return $(node).removeClass("open")
    },
    defaultHtml: '<li class="dropdown"><a class="dropdown-toggle" data-toggle="dropdown" href="#">Dropdown <div class="caret"></div></a><ul class="dropdown-menu" role="menu" aria-labelledby="dLabel"><li><a tabindex="-1" href="#">Action</a></li><li><a tabindex="-1" href="#">Another action</a></li><li><a tabindex="-1" href="#">Something else here</a></li><li class="divider"></li><li><a tabindex="-1" href="#">Separated link</a></li></ul></li>'
});
Controls.add("bootstrap/dropdowninner", {
    classes: ["dropdown-toggle"],
    name: "Dropdown Inner",
    canSelect: false,
    canDrag: false
});
Controls.add("bootstrap/dropdownmenu", {
    classes: ["dropdown-menu"],
    name: "Dropdown Menu",
    canSelect: false,
    canDrag: false
});
Controls.add("bootstrap/navitem", {
    matchNode: function(node) {
        return node.nodeName.toLowerCase() === "li" && $(node).parent().is("ul.nav")
    },
    name: "Nav Item",
    defaultHtml: '<li><a href="#">Item</a></li>',
    validChildren: ["bootstrap/icon"],
    properties: [{
        name: "Target",
        key: "target",
        html_attr: "target",
        widgetpos: 4,
        widgettype: SingleTextWidget
    },
    {
        name: "Active",
        key: "active",
        widgetpos: -1,
        html_attr: "class",
        possibleValues: ["", "active"],
        widgettype: SelectWidget,
        widgetdata: {
            items: [{
                value: "",
                text: "Inactive"
            },
            {
                value: "active",
                text: "Active"
            }]
        }
    }]
});
Controls.add("bootstrap/navbar", {
    classes: ["navbar"],
    name: "Nav Bar",
    defaultHtml: '<div class="navbar"><div class="navbar-inner"><div class="container"><a class="brand" href="#">Brand</a></div></div></div>',
    validChildren: [],
    properties: [{
        name: "Type",
        key: "type",
        html_attr: "class",
        possibleValues: ["", "navbar-inverse"],
        widgettype: SelectWidget,
        widgetdata: {
            items: [{
                value: "",
                text: "Default"
            },
            {
                value: "navbar-inverse",
                text: "Inverse"
            }]
        }
    },
    {
        name: "Fixed mode",
        key: "fixedmode",
        html_attr: "class",
        possibleValues: ["", "navbar-fixed-top", "navbar-fixed-bottom"],
        widgettype: SelectWidget,
        widgetdata: {
            items: [{
                value: "",
                text: "Not fixed"
            },
            {
                value: "navbar-fixed-top",
                text: "Fixed Top"
            },
            {
                value: "navbar-fixed-bottom",
                text: "Fixed Bottom"
            }]
        }
    },
    {
        name: "Fluid Mode",
        key: "fluidmode",
        html_attr: "class",
        possibleValues: ["", "navbar-fluid"],
        widgettype: SelectWidget,
        widgetdata: {
            items: [{
                value: "",
                text: "Not Fluid"
            },
            {
                value: "navbar-fluid",
                text: "Fluid"
            }]
        }
    }]
});
Controls.add("bootstrap/navbarinner", {
    classes: ["navbar-inner"],
    name: "Nav Bar Inner",
    validChildren: [],
    canSelect: false,
    canDrag: false,
    defaultHtml: '<div class="navbar-inner"></div>'
});
Controls.add("bootstrap/breadcrumbs", {
    classes: ["breadcrumb"],
    name: "Breadcrumbs",
    defaultHtml: '<ul class="breadcrumb"><li><a href="#">Home</a> <span class="divider">/</span></li><li><a href="#">Products</a> <span class="divider">/</span></li><li class="active">Specials</li></ul>'
});
Controls.add("bootstrap/breadcrumbitem", {
    matchNode: function(node) {
        return node.nodeName.toLowerCase() === "li" && $(node).parent().is(".breadcrumb")
    },
    name: "Breadcrumb Item",
    defaultHtml: '<li><a href="#">Crumb</a></li>',
    properties: [{
        name: "Active",
        key: "active",
        html_attr: "class",
        possibleValues: ["", "active"],
        widgettype: ToggleWidget,
        widgetdata: {
            onText: "yes",
            onValue: "active",
            offText: "no",
            offValue: ""
        }
    }]
});
Controls.add("bootstrap/pagination", {
    classes: ["pagination"],
    name: "Pagination",
    validChildren: ["bootstrap/paginationitem", "listitem"],
    insertChild: function(node, child) {
        return $(node).find("> ul > li:last").before(child)
    },
    defaultHtml: '<div class="pagination"><ul><li><a href="#">Prev</a></li><li><a href="#">1</a></li><li><a href="#">2</a></li><li><a href="#">3</a></li><li><a href="#">Next</a></li></ul></div>',
    properties: [{
        name: "Alignment",
        key: "alignment",
        html_attr: "class",
        possibleValues: ["", "pagination-centered", "pagination-right"],
        widgettype: SelectWidget,
        widgetdata: {
            items: [{
                value: "",
                text: "Left"
            },
            {
                value: "pagination-centered",
                text: "Center"
            },
            {
                value: "pagination-right",
                text: "Right"
            }]
        }
    }]
});
Controls.add("bootstrap/paginationitem", {
    matchNode: function(node) {
        return node.nodeName.toLowerCase() === "li" && $(node).parent().parent().is(".pagination")
    },
    defaultHtml: '<li><a href="#">n</a></li>',
    validChildren: [],
    name: "Pagination Item",
    properties: [{
        name: "Link To",
        key: "href",
        html_attr: "href",
        setOnNode: function(node, value) {
            return $(node).children("a:first").attr("href", value)
        },
        getFromNode: function(node) {
            return $(node).children("a:first").attr("href")
        },
        widgetpos: 1,
        widgettype: LinkToWidget
    },
    {
        name: "Active",
        key: "active",
        html_attr: "class",
        possibleValues: ["", "active"],
        widgettype: ToggleWidget,
        widgetdata: {
            onText: "yes",
            onValue: "active",
            offText: "no",
            offValue: ""
        }
    }]
});
Controls.add("bootstrap/textinputgroup", {
    name: "Text Input",
    defaultHtml: '<div class="control-group"><label class="control-label">Text</label><div class="controls"><input type="text"></div></div>'
});
Controls.add("bootstrap/selectinputgroup", {
    name: "Select Input",
    defaultHtml: '<div class="control-group"><label class="control-label">Choose wisely:</label><div class="controls"><select><option value="pizza">Pizza</option><option value="salad">Salad</option><option value="pizzasalad">Pizza and Salad</option></select></div></div>'
});
Controls.add("bootstrap/fileinputgroup", {
    name: "Input group",
    defaultHtml: '<div class="control-group"><label class="control-label">Upload your file:</label><div class="controls"><input type="file"></div></div>'
});
Controls.add("bootstrap/textareainputgroup", {
    name: "Input group",
    defaultHtml: '<div class="control-group"><label class="control-label">Your response:</label><div class="controls"><textarea></textarea></div></div>'
});
Controls.extend("input", "bootstrap/submitbutton", {
    name: "Submit Button",
    matchNode: function(node) {
        return $(node).is('button[type="submit"]') || $(node).is('input[type="submit"]')
    },
    validChildren: ["_text", "bootstrap/icon"],
    defaultHtml: '<button type="submit" class="btn">Click!</button>',
    properties: [{
        name: "Content",
        key: "content",
        widgetpos: 100,
        widgettype: HiddenWidget
    },
    {
        name: "Type",
        key: "type",
        html_attr: "class",
        widgetpos: 2,
        widgettype: SelectWidget,
        possibleValues: ["", "btn-primary", "btn-info", "btn-success", "btn-warning", "btn-danger", "btn-inverse"],
        widgetdata: {
            items: [{
                value: "",
                text: "Default"
            },
            {
                value: "btn-primary",
                text: "Primary"
            },
            {
                value: "btn-info",
                text: "Info"
            },
            {
                value: "btn-success",
                text: "Success"
            },
            {
                value: "btn-warning",
                text: "Warning"
            },
            {
                value: "btn-danger",
                text: "Danger"
            },
            {
                value: "btn-inverse",
                text: "Inverse"
            }]
        }
    },
    {
        name: "Size",
        key: "size",
        html_attr: "class",
        widgetpos: 3,
        widgettype: SelectWidget,
        possibleValues: ["", "btn-large", "btn-small", "btn-mini"],
        widgetdata: {
            items: [{
                value: "",
                text: "Default"
            },
            {
                value: "btn-large",
                text: "Large"
            },
            {
                value: "btn-small",
                text: "Small"
            },
            {
                value: "btn-mini",
                text: "Mini"
            }]
        }
    },
    {
        name: "Disabled",
        key: "disabled",
        html_attr: "class",
        widgetpos: 5,
        widgettype: ToggleWidget,
        possibleValues: ["", "disabled"],
        widgetdata: {
            onText: "yes",
            onValue: "disabled",
            offText: "no",
            offValue: ""
        }
    }]
});
Controls.add("bootstrap/checkbox", {
    matchNode: function(node) {
        return $(node.firstChild).is('input[type="checkbox"]')
    },
    name: "Checkbox",
    defaultHtml: '<label class="checkbox"><input type="checkbox"> Remember me</label>',
    properties: [{
        name: "Name",
        widgetpos: 0,
        key: "name",
        html_attr: "name",
        setOnNode: function(node, value) {
            return $(node.firstChild).attr("name", value)
        },
        widgettype: SingleTextWidget
    }]
});
Controls.add("bootstrap/radiobutton", {
    matchNode: function(node) {
        return $(node.firstChild).is('input[type="radio"]')
    },
    name: "Radio Button",
    defaultHtml: '<label class="radio"><input type="radio"> Yes</label>',
    properties: [{
        name: "Name",
        widgetpos: 0,
        key: "name",
        html_attr: "name",
        setOnNode: function(node, value) {
            return $(node.firstChild).attr("name", value)
        },
        widgettype: SingleTextWidget
    }]
});
Controls.add("bootstrap/controlgroup", {
    name: "Control Group",
    defaultHtml: '<div class="control-group"></div>'
});
Controls.add("bootstrap/table", {
    nodes: ["table"],
    classes: ["table"],
    name: "Table",
    defaultHtml: '<table class="table"><tr><td>Cell 1</td><td>Cell 2</td><td>Cell 3</td></tr></table>',
    validChildren: ["bootstrap/tablerow", "bootstrap/tablehead"],
    properties: [{
        name: "Type",
        key: "type",
        html_attr: "class",
        widgetpos: 2,
        widgettype: SelectWidget,
        possibleValues: ["", "table-striped", "table-bordered", "table-hover", "table-condensed"],
        widgetdata: {
            items: [{
                value: "",
                text: "Default"
            },
            {
                value: "table-striped",
                text: "Striped"
            },
            {
                value: "table-bordered",
                text: "Bordered"
            },
            {
                value: "table-hover",
                text: "Hover"
            },
            {
                value: "table-condensed",
                text: "Condensed"
            }]
        }
    }]
});
Controls.add("bootstrap/tablehead", {
    nodes: ["thead"],
    name: "Table Head",
    defaultHtml: "<thead><tr><th>Head 1</th><th>Head 2</th><th>Head 3</th></tr></thead>",
    validChildren: ["bootstrap/tablecell"],
    properties: [{
        name: "Type",
        key: "type",
        html_attr: "class",
        widgetpos: 2,
        widgettype: SelectWidget,
        possibleValues: ["", "success", "error", "warning", "info"],
        widgetdata: {
            items: [{
                value: "",
                text: "Default"
            },
            {
                value: "success",
                text: "Success"
            },
            {
                value: "error",
                text: "Error"
            },
            {
                value: "warning",
                text: "Warning"
            },
            {
                value: "info",
                text: "Info"
            }]
        }
    }]
});
Controls.add("bootstrap/tablerow", {
    nodes: ["tr"],
    name: "Table Row",
    defaultHtml: "<tr><td>Cell 1</td><td>Cell 2</td><td>Cell 3</td></tr>",
    validChildren: ["bootstrap/tablecell", "bootstrap/tableheadercell"],
    properties: [{
        name: "Type",
        key: "type",
        html_attr: "class",
        widgetpos: 2,
        widgettype: SelectWidget,
        possibleValues: ["", "success", "error", "warning", "info"],
        widgetdata: {
            items: [{
                value: "",
                text: "Default"
            },
            {
                value: "success",
                text: "Success"
            },
            {
                value: "error",
                text: "Error"
            },
            {
                value: "warning",
                text: "Warning"
            },
            {
                value: "info",
                text: "Info"
            }]
        }
    }]
});
Controls.add("bootstrap/tablecell", {
    nodes: ["td"],
    name: "Table Cell",
    defaultHtml: "<td>Cell</td>"
});
Controls.add("bootstrap/tableheadercell", {
    nodes: ["th"],
    name: "Table Header Cell",
    defaultHtml: "<th>Head</th>"
});
Controls.add("bootstrap/tablebody", {
    nodes: ["tbody"],
    name: "Table Body",
    defaultHtml: "<tbody><tr><td>Cell 1</td><td>Cell 2</td><td>Cell 3</td></tr></tbody>"
});
Controls.add("bootstrap/gridspan", {
    name: "Grid Span",
    classRegex: "span",
    canDrag: false,
    defaultHtml: '<div class="span4"><h3>Span 4</h3><p>Content</p></div>'
});
Controls.add("bootstrap/gridrow", {
    name: "Grid Row",
    validChildren: ["bootstrap/gridspan"],
    classes: ["row", "row-fluid"],
    defaultHtml: '<div class="row-fluid"><div class="span4"><h3>Span 4</h3><p>Content</p></div><div class="span4"><h3>Span 4</h3><p>Content</p></div><div class="span4"><h3>Span 4</h3><p>Content</p></div></div>',
    properties: [{
        name: "Is Fluid",
        key: "isfluid",
        html_attr: "class",
        possibleValues: ["row", "row-fluid"],
        widgettype: ToggleWidget,
        widgetdata: {
            onText: "yes",
            onValue: "row-fluid",
            offText: "no",
            offValue: "row"
        }
    },
    {
        name: "Grid Layout",
        key: "gridlayout",
        widgetpos: 1,
        commitOnNode: function(node, value) {
            $(node).children(":hidden").remove();
            return true
        },
        _updateExistingNodes: function(node, spans, parts) {
            var i, p, r, res, span, _i, _j, _len, _len1, _results;
            _results = [];
            for (i = _i = 0, _len = spans.length; _i < _len; i = ++_i) {
                span = spans[i];
                if (i < parts.length) {
                    p = parseInt(parts[i]);
                    if (isNaN(p)) {
                        continue
                    }
                    res = $(span).attr("class").match(/span\d+/);
                    if (res) {
                        for (_j = 0, _len1 = res.length; _j < _len1; _j++) {
                            r = res[_j];
                            $(span).removeClass(r)
                        }
                    }
                    _results.push($(span).addClass("span" + p))
                } else {
                    _results.push(void 0)
                }
            }
            return _results
        },
        _fillSpaces: function(node, spans, parts) {
            var hidden, hiddenEl, i, left, p, pi, r, res, toShow, _i, _j, _k, _len, _len1, _len2, _results;
            hidden = $(node).children(":hidden");
            toShow = hidden.slice(0, parts.length - spans.length);
            if (toShow.length) {
                left = parts.slice(spans.length);
                for (i = _i = 0, _len = toShow.length; _i < _len; i = ++_i) {
                    hiddenEl = toShow[i];
                    if (i < left.length) {
                        p = left[i];
                        res = hiddenEl.className.match(/span\d+/);
                        if (res) {
                            for (_j = 0, _len1 = res.length; _j < _len1; _j++) {
                                r = res[_j];
                                $(hiddenEl).removeClass(r)
                            }
                        }
                        $(hiddenEl).addClass("span" + p)
                    }
                }
                toShow.show();
                spans = $(node).children("[class^=span]")
            }
            left = parts.slice(spans.length);
            _results = [];
            for (i = _k = 0, _len2 = left.length; _k < _len2; i = ++_k) {
                p = left[i];
                console.log("Adding extra child", p);
                pi = parseInt(p);
                if (isNaN(pi)) {
                    continue
                }
                _results.push($(node).append('<div class="span' + pi + '"><h3>Span ' + pi + "</h3><p>Content here</p></div>"))
            }
            return _results
        },
        setOnNode: function(node, value) {
            var parts, removeSpans, spans, v;
            v = $.trim(value);
            parts = v.split(/\s+/);
            spans = $(node).children("[class^=span]:not(:hidden)");
            this._updateExistingNodes(node, spans, parts);
            if (parts.length > spans.length) {
                this._fillSpaces(node, spans, parts)
            } else if (parts.length < spans.length) {
                removeSpans = $(spans).slice(parts.length).hide()
            } else if (v === "") {
                removeSpans = $(spans).hide()
            }
            return null
        },
        getFromNode: function(node) {
            var layouts, spans;
            layouts = [];
            spans = $(node).find('[class^="span"]').each(function() {
                var res, spanClass;
                spanClass = $(this).attr("class");
                res = spanClass.match(/span(\d+)/);
                if (res.length > 1) {
                    return layouts.push(res[1])
                }
            });
            return layouts.join(" ")
        },
        widgettype: GridLayoutWidget
    }]
});
Controls.add("bootstrap/carousel", {
    name: "Carousel",
    classes: ["carousel"],
    defaultHtml: '<div class="carousel slide"><ol class="carousel-indicators"><li data-target="#myCarousel" data-slide-to="0" class="active"></li><li data-target="#myCarousel" data-slide-to="1"></li><li data-target="#myCarousel" data-slide-to="2"></li></ol><!-- Carousel items --><div class="carousel-inner"><div class="active item"><img src="http://twitter.github.com/bootstrap/assets/img/bootstrap-mdo-sfmoma-01.jpg" alt=""><div class="carousel-caption"><h4>First Thumbnail label</h4><p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p></div></div><div class="item"><img src="http://twitter.github.com/bootstrap/assets/img/bootstrap-mdo-sfmoma-02.jpg" alt=""><div class="carousel-caption"><h4>Second Thumbnail label</h4><p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p></div></div><div class="item"><img src="http://twitter.github.com/bootstrap/assets/img/bootstrap-mdo-sfmoma-03.jpg" alt=""></div></div></div><!-- Carousel nav --><a class="carousel-control left" href="#myCarousel" data-slide="prev">&lsaquo;</a><a class="carousel-control right" href="#myCarousel" data-slide="next">&rsaquo;</a></div>',
    additionalControls: [{
        icon: ".j-icon-small-left",
        action: "prev",
        performOnNode: function(node, action) {
            return $(node).carousel(action)
        }
    },
    {
        icon: ".j-icon-small-right",
        action: "next",
        performOnNode: function(node, action) {
            return $(node).carousel(action)
        }
    },
    {
        icon: ".j-icon-small-plus",
        action: "additem",
        performOnNode: function(node) {
            return $(node).find(".carousel-inner").append('<div class="active item"><img src="http://twitter.github.com/bootstrap/assets/img/bootstrap-mdo-sfmoma-01.jpg" alt=""><div class="carousel-caption"><h4>First Thumbnail label</h4><p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p></div></div>')
        }
    }],
    properties: [{
        name: "Cycle",
        key: "nextpage",
        widgetpos: 100,
        widgettype: ButtonsWidget,
        widgetdata: {
            buttons: [{
                text: "Prev",
                tag: "prev"
            },
            {
                text: "Next",
                tag: "next"
            }]
        },
        setOnNode: function(node, value) {
            return $(node).carousel(value)
        }
    }]
});
Controls.add("bootstrap/carouselinner", {
    name: "Carousel Inner",
    classes: ["carousel-inner"],
    canEdit: false,
    canDrag: false,
    canSelect: false
});
Controls.add("bootstrap/carouselcaption", {
    name: "Carousel Caption",
    classes: ["carousel-caption"],
    canEdit: false,
    canDrag: false,
    canSelect: false
});
Controls.add("bootstrap/carouselitem", {
    name: "Carousel Item",
    canDrag: false,
    canSelect: false,
    canEdit: false,
    defaultHtml: '<div class="active item"><img src="http://twitter.github.com/bootstrap/assets/img/bootstrap-mdo-sfmoma-01.jpg" alt=""><div class="carousel-caption"><h4>First Thumbnail label</h4><p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p></div></div>',
    matchNode: function(node) {
        return $(node).hasClass("item") && $(node).parent().is(".carousel-inner")
    }
});
Controls.add("bootstrap3/content", {
    name: "Html Content",
    defaultHtml: "<div>Some interesting content</div>",
    image: "https://s3.amazonaws.com/jetstrap-site/images/builder/components/text_block.png",
    image2x: "https://s3.amazonaws.com/jetstrap-site/images/builder/components/text_block2x.png",
    properties: [{
        name: "Content",
        key: "content",
        widgetpos: 100,
        widgettype: HiddenWidget
    }]
});
Controls.add("bootstrap3/listitem", {
    nodes: ["li"],
    name: "List Item",
    validChildren: []
});
Controls.add("bootstrap3/link", {
    nodes: ["a"],
    name: "Link",
    validChildren: [],
    canDrag: false,
    properties: [{
        name: "URL",
        key: "href",
        html_attr: "href",
        widgetpos: 1,
        widgettype: LinkToWidget
    },
    {
        name: "Target",
        key: "target",
        widgetpos: 4,
        html_attr: "target",
        widgettype: SingleTextWidget
    },
    {
        name: "Content",
        key: "content",
        widgetpos: 100,
        widgettype: HiddenWidget
    }]
});
Controls.add("bootstrap3/image", {
    nodes: ["img"],
    name: "Image",
    validChildren: [],
    defaultHtml: '<img src="https://s3.amazonaws.com/jetstrap-site/images/website/index/what_icon.png">',
    image: "https://s3.amazonaws.com/jetstrap-site/images/builder/components/image.png",
    image2x: "https://s3.amazonaws.com/jetstrap-site/images/builder/components/image2x.png",
    canEdit: false,
    properties: [{
        name: "Image",
        key: "src",
        html_attr: "src",
        widgettype: FileUploadWidget
    },
    {
        name: "Size",
        key: "width",
        html_attr: "width",
        widgettype: SingleTextWidget
    },
    {
        name: "Height",
        key: "height",
        html_attr: "height",
        widgettype: SingleTextWidget
    }]
});
Controls.add("bootstrap3/heading", {
    nodes: ["h1", "h2", "h3", "h4", "h5", "h6"],
    name: "Heading",
    defaultHtml: "<h3>Heading</h3>",
    image: "https://s3.amazonaws.com/jetstrap-site/images/builder/components/heading.png",
    image2x: "https://s3.amazonaws.com/jetstrap-site/images/builder/components/heading2x.png",
    validChildren: [],
    properties: [{
        name: "Content",
        key: "content",
        widgetpos: 100,
        widgettype: HiddenWidget
    },
    {
        name: "Size",
        key: "size",
        widgetpos: 4,
        possibleValues: ["1", "2", "3", "4", "5", "6"],
        getFromNode: function(node) {
            var r;
            r = /H(\d)/.exec(node.nodeName);
            if (r && r.length > 1) {
                return r[1]
            }
            return 3
        },
        setOnNode: function(node, value) {
            var newNode;
            console.log("Changing H to H", value);
            newNode = document.createElement("h" + value);
            $(newNode).append($(node).contents());
            $(node).replaceWith(newNode);
            return newNode
        },
        widgettype: SelectWidget,
        widgetdata: {
            items: [{
                value: "1",
                text: "1"
            },
            {
                value: "2",
                text: "2"
            },
            {
                value: "3",
                text: "3"
            },
            {
                value: "4",
                text: "4"
            },
            {
                value: "5",
                text: "5"
            },
            {
                value: "6",
                text: "6"
            }]
        }
    }]
});
Controls.add("bootstrap3/hr", {
    validChildren: [],
    image: "https://s3.amazonaws.com/jetstrap-site/images/builder/components/hr.png",
    image2x: "https://s3.amazonaws.com/jetstrap-site/images/builder/components/hr2x.png",
    nodes: ["hr"],
    name: "Horizontal Rule",
    defaultHtml: "<hr>"
});
Controls.add("bootstrap3/form", {
    nodes: ["form"],
    image: "https://s3.amazonaws.com/jetstrap-site/images/builder/components/form.png",
    image2x: "https://s3.amazonaws.com/jetstrap-site/images/builder/components/form2x.png",
    name: "Form",
    defaultHtml: "<form></form>",
    properties: [{
        name: "Style",
        key: "style",
        html_attr: "class",
        possibleValues: ["", "form-search", "form-inline", "form-horizontal"],
        widgettype: SelectWidget,
        widgetdata: {
            items: [{
                value: "",
                text: "Default"
            },
            {
                value: "form-search",
                text: "Search"
            },
            {
                value: "form-inline",
                text: "Inline"
            },
            {
                value: "form-horizontal",
                text: "Horizontal"
            }]
        }
    },
    {
        name: "Action",
        key: "action",
        html_attr: "action",
        value: "",
        widgetpos: 1,
        widgettype: SingleTextWidget
    },
    {
        name: "Method",
        key: "method",
        html_attr: "method",
        value: "",
        widgetpos: 2,
        widgettype: SingleTextWidget
    }]
});
Controls.add("bootstrap3/label", {
    name: "Label",
    nodes: ["label"],
    defaultHtml: '<label for="">Label</label>',
    properties: [{
        name: "For id",
        html_attr: "for",
        widgettype: SingleTextWidget
    }]
});
Controls.add("bootstrap3/input", {
    name: "Input",
    validChildren: [],
    properties: [{
        name: "Name",
        widgetpos: 0,
        key: "name",
        html_attr: "name",
        widgettype: SingleTextWidget
    }]
});
Controls.extend("bootstrap3/input", "bootstrap3/buttoninput", {
    nodes: ["button"],
    validChildren: [],
    name: "Button Input",
    defaultHtml: '<button class="btn">Button Input</button>',
    properties: [{
        name: "Content",
        key: "content",
        widgetpos: 100,
        widgettype: HiddenWidget
    },
    {
        name: "Type",
        key: "type",
        widgetpos: 2,
        html_attr: "class",
        widgettype: SelectWidget,
        possibleValues: ["", "btn-primary", "btn-info", "btn-success", "btn-warning", "btn-danger", "btn-inverse"],
        widgetdata: {
            items: [{
                value: "",
                text: "Default"
            },
            {
                value: "btn-primary",
                text: "Primary"
            },
            {
                value: "btn-info",
                text: "Info"
            },
            {
                value: "btn-success",
                text: "Success"
            },
            {
                value: "btn-warning",
                text: "Warning"
            },
            {
                value: "btn-danger",
                text: "Danger"
            },
            {
                value: "btn-inverse",
                text: "Inverse"
            }]
        }
    },
    {
        name: "Size",
        key: "size",
        html_attr: "class",
        widgetpos: 3,
        widgettype: SelectWidget,
        possibleValues: ["", "btn-large", "btn-small", "btn-mini"],
        widgetdata: {
            items: [{
                value: "",
                text: "Default"
            },
            {
                value: "btn-large",
                text: "Large"
            },
            {
                value: "btn-small",
                text: "Small"
            },
            {
                value: "btn-mini",
                text: "Mini"
            }]
        }
    },
    {
        name: "Disabled",
        key: "disabled",
        html_attr: "class",
        widgetpos: 5,
        widgettype: ToggleWidget,
        possibleValues: ["", "disabled"],
        widgetdata: {
            onText: "yes",
            onValue: "disabled",
            offText: "no",
            offValue: ""
        }
    }]
});
Controls.extend("bootstrap3/input", "bootstrap3/textinput", {
    validChildren: [],
    matchNode: function(node) {
        var pv, types, _i, _len, _ref;
        types = [];
        _ref = ["", "text", "password", "email", "datetime", "datetime-local", "date", "time", "month", "week", "number", "url", "search", "tel", "color"];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            pv = _ref[_i];
            types.push('input[type="' + pv + '"]')
        }
        return $(node).is(types.join(","))
    },
    name: "Text Input",
    defaultHtml: '<input type="text">',
    properties: [{
        name: "Type",
        key: "type",
        html_attr: "type",
        widgettype: SelectWidget,
        possibleValues: ["", "text", "password", "email", "datetime", "datetime-local", "date", "time", "month", "week", "number", "url", "search", "tel", "color"],
        setOnNode: function(node, value) {
            return node.type = value
        },
        widgetdata: {
            items: [{
                value: "text",
                text: "Text"
            },
            {
                value: "password",
                text: "Password"
            },
            {
                value: "email",
                text: "Email"
            },
            {
                value: "datetime",
                text: "Datetime"
            },
            {
                value: "datetime-local",
                text: "Datetime Local"
            },
            {
                value: "date",
                text: "Date"
            },
            {
                value: "time",
                text: "Time"
            },
            {
                value: "month",
                text: "Month"
            },
            {
                value: "week",
                text: "Week"
            },
            {
                value: "number",
                text: "Number"
            },
            {
                value: "url",
                text: "URL"
            },
            {
                value: "search",
                text: "Search"
            },
            {
                value: "tel",
                text: "Tel"
            },
            {
                value: "color",
                text: "Color"
            }]
        }
    },
    {
        name: "Placeholder",
        key: "placeholder",
        html_attr: "placeholder",
        widgettype: SingleTextWidget
    }]
});
Controls.extend("bootstrap3/input", "bootstrap3/selectinput", {
    nodes: ["select"],
    name: "Select Input",
    validChildren: [],
    defaultHtml: '<select><option value="pizza">Pizza</option><option value="salad">Salad</option><option value="pizzasalad">Pizza and Salad</option></select>',
    properties: [{
        name: "Options",
        type: "options",
        widgettype: ValueTextItemsWidget,
        widgetdata: {
            items: [{
                value: "pizza",
                text: "Pizza"
            },
            {
                value: "salad",
                text: "Salad"
            },
            {
                value: "pizzasalad",
                text: "Pizza and Salad"
            }]
        },
        setOnNode: function(node, items) {
            var item, _i, _len, _results;
            $(node).empty();
            _results = [];
            for (_i = 0, _len = items.length; _i < _len; _i++) {
                item = items[_i];
                _results.push($(node).append('<option value="' + item.value + '">' + item.text + "</option>"))
            }
            return _results
        }
    }]
});
Controls.extend("bootstrap3/input", "bootstrap3/fileinput", {
    validChildren: [],
    matchNode: function(node) {
        return $(node).is('input[type="file"]')
    },
    name: "File Input",
    defaultHtml: '<input type="file">'
});
Controls.extend("bootstrap3/input", "bootstrap3/textarea", {
    validChildren: [],
    nodes: ["textarea"],
    name: "Textarea",
    defaultHtml: "<textarea></textarea>"
});
Frameworks.add("bootstrap3", {
    name: "Bootstrap 3.0.0",
    cssFiles: ["https://netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap.min.css", "https://netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap-glyphicons.css"],
    jsFiles: ["https://netdna.bootstrapcdn.com/bootstrap/3.0.0/js/bootstrap.min.js"],
    controls: ["bootstrap3/gridrow", "bootstrap3/button", "bootstrap3/buttongroup", "bootstrap3/buttontoolbar", "bootstrap3/heading", "bootstrap3/image", "bootstrap3/pageheader", "bootstrap3/jumbotron", "bootstrap3/alert", "bootstrap3/well", "bootstrap3/panel", "bootstrap3/listgroup", "bootstrap3/content", "bootstrap3/hr", "bootstrap3/taglabel", "bootstrap3/badge", "bootstrap3/progressbar", "bootstrap3/navbar", "bootstrap3/breadcrumbs", "bootstrap3/pagination", "bootstrap3/form", "bootstrap3/submitbutton", "bootstrap3/textinputgroup", "bootstrap3/textareainputgroup", "bootstrap3/selectinputgroup", "bootstrap3/fileinputgroup", "bootstrap3/checkbox", "bootstrap3/radiobutton", "bootstrap3/table", "bootstrap3/container"]
});
FrameworkTemplates.add("bootstrap3", {
    name: "Demo",
    key: "demo",
    css: "#jumbo {\n  background-color: #333;\n  color: #eee;\n}\n#jumbo p {\n  font-size: 16px;\n}\n#try-header {\n  margin: 30px 0px;\n}\n#try-more {\n  margin: 30px 0px;\n  font-style: italic;\n}",
    html: '<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <meta charset="utf-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <meta name="description" content="">\n    <meta name="author" content="">\n\n    <title></title>\n\n    <link href="https://netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap.min.css" rel="stylesheet">\n  </head>\n\n  <body>\n    <div id="jumbo" class="jumbotron">\n      <div class="container">\n        <img src="https://s3.amazonaws.com/jetstrap-site/images/website/common/jetstrap_logo.png">\n        <h1>Welcome to Jetstrap!</h1>\n        <p>This is the Jetstrap demo. Feel free to play around with it!</p>\n        <p>\n          Try dragging new Bootstrap 3 components from the left side onto this page.\n        </p>\n        <p>\n          When you are ready to\n          try the real thing, click Sign up above!\n        </p>\n      </div>\n    </div>\n\n    <div class="container">\n      <!-- Example row of columns -->\n      <h2 id="try-header">Try the full version to get</h2>\n      <div class="row">\n        <div class="col-md-4">\n          <h3>Cloud Saving</h3>\n          <p>\n            Jetstrap saves all your projects and screens in the cloud, so you can\n          work on them from anywhere, at any time.\n          </p>\n          <p>\n            No software to install means Jetstrap is fast and easy to use!\n          </p>\n        </div>\n        <div class="col-md-4">\n          <h3>Sharing and Linking</h3>\n          <p>\n            You can wire up screens to link to each other, and share your \n            work with anyone in the world!\n          </p>\n          <p>\n            Quickly show clients and co-workers your work, and let them preview\n            the page on different screen sizes.\n          </p>\n       </div>\n        <div class="col-md-4">\n          <h3>Full HTML/JS/CSS Editing</h3>\n          <p>Jetstrap lets you edit the full HTML of each screen you design, and you can\n          add custom CSS and Javascript to give your screens some life!</p>\n          <p>\n            Add backend services like <a href="http://firebase.com/">Firebase</a>, or customize the look and feel of your page.\n          </p>\n        </div>\n      </div>\n      <h2 id="try-more">And more!</h2>\n\n    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>\n    <script src="https://netdna.bootstrapcdn.com/bootstrap/3.0.0/js/bootstrap.min.js"></script>\n  </body>\n</html>',
    image: "https://s3.amazonaws.com/jetstrap-site/images/builder/templates/blank_template.jpg"
});
FrameworkTemplates.add("bootstrap3", {
    name: "Empty",
    key: "empty",
    css: "",
    html: '<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <meta charset="utf-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <meta name="description" content="">\n    <meta name="author" content="">\n\n    <title></title>\n\n    <link href="https://netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap.min.css" rel="stylesheet">\n  </head>\n\n  <body>\n    <div class="container"></div>\n\n    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>\n    <script src="https://netdna.bootstrapcdn.com/bootstrap/3.0.0/js/bootstrap.min.js"></script>\n  </body>\n</html>',
    image: "https://s3.amazonaws.com/jetstrap-site/images/builder/templates/blank_template.jpg"
});
FrameworkTemplates.add("bootstrap3", {
    name: "Starter",
    key: "starter",
    image: "https://s3.amazonaws.com/jetstrap-site/images/builder/templates/starter_template.jpg",
    css: "body {\n  padding-top: 50px;\n}\n.starter-template {\n  padding: 40px 15px;\n}",
    html: '<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <meta charset="utf-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <meta name="description" content="">\n    <meta name="author" content="">\n    <link rel="shortcut icon" href="../../assets/ico/favicon.png">\n\n    <title>Starter Template for Bootstrap</title>\n\n    <link href="https://netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap.min.css" rel="stylesheet">\n  </head>\n\n  <body>\n\n    <div class="navbar navbar-inverse navbar-fixed-top">\n      <div class="container">\n        <div class="navbar-header">\n          <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">\n            <span class="icon-bar"></span>\n            <span class="icon-bar"></span>\n            <span class="icon-bar"></span>\n          </button>\n          <a class="navbar-brand" href="#">Project name</a>\n        </div>\n        <div class="collapse navbar-collapse">\n          <ul class="nav navbar-nav">\n            <li class="active"><a href="#">Home</a></li>\n            <li><a href="#about">About</a></li>\n            <li><a href="#contact">Contact</a></li>\n          </ul>\n        </div><!--/.nav-collapse -->\n      </div>\n    </div>\n\n    <div class="container">\n\n      <div class="starter-template">\n        <h1>Bootstrap starter template</h1>\n        <p class="lead">Use this document as a way to quickly start any new project.<br> All you get is this text and a mostly barebones HTML document.</p>\n      </div>\n\n    </div><!-- /.container -->\n\n    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>\n    <script src="https://netdna.bootstrapcdn.com/bootstrap/3.0.0/js/bootstrap.min.js"></script>\n  </body>\n</html>'
});
FrameworkTemplates.add("bootstrap3", {
    name: "Jumbotron",
    key: "jumbotron",
    image: "https://jetstrap-site.s3.amazonaws.com/images/builder/templates/marketing_template.jpg",
    css: "\n/* Move down content because we have a fixed navbar that is 50px tall */\nbody {\n  padding-top: 50px;\n  padding-bottom: 20px;\n}",
    html: '<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <meta charset="utf-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <meta name="description" content="">\n    <meta name="author" content="">\n\n    <title>Jumbotron Template for Bootstrap</title>\n\n    <link href="https://netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap.min.css" rel="stylesheet">\n  </head>\n\n  <body>\n    <div class="navbar navbar-inverse navbar-fixed-top">\n      <div class="container">\n        <div class="navbar-header">\n          <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">\n            <span class="icon-bar"></span>\n            <span class="icon-bar"></span>\n            <span class="icon-bar"></span>\n          </button>\n          <a class="navbar-brand" href="#">Project name</a>\n        </div>\n        <div class="navbar-collapse collapse">\n          <ul class="nav navbar-nav">\n            <li class="active"><a href="#">Home</a></li>\n            <li><a href="#about">About</a></li>\n            <li><a href="#contact">Contact</a></li>\n            <li class="dropdown">\n              <a href="#" class="dropdown-toggle" data-toggle="dropdown">Dropdown <b class="caret"></b></a>\n              <ul class="dropdown-menu">\n                <li><a href="#">Action</a></li>\n                <li><a href="#">Another action</a></li>\n                <li><a href="#">Something else here</a></li>\n                <li class="divider"></li>\n                <li class="dropdown-header">Nav header</li>\n                <li><a href="#">Separated link</a></li>\n                <li><a href="#">One more separated link</a></li>\n              </ul>\n            </li>\n          </ul>\n          <form class="navbar-form navbar-right">\n            <div class="form-group">\n              <input type="text" placeholder="Email" class="form-control">\n            </div>\n            <div class="form-group">\n              <input type="password" placeholder="Password" class="form-control">\n            </div>\n            <button type="submit" class="btn btn-success">Sign in</button>\n          </form>\n        </div><!--/.navbar-collapse -->\n      </div>\n    </div>\n\n    <!-- Main jumbotron for a primary marketing message or call to action -->\n    <div class="jumbotron">\n      <div class="container">\n        <h1>Hello, world!</h1>\n        <p>This is a template for a simple marketing or informational website. It includes a large callout called the hero unit and three supporting pieces of content. Use it as a starting point to create something more unique.</p>\n        <p><a class="btn btn-primary btn-lg">Learn more &raquo;</a></p>\n      </div>\n    </div>\n\n    <div class="container">\n      <!-- Example row of columns -->\n      <div class="row">\n        <div class="col-md-4">\n          <h2>Heading</h2>\n          <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>\n          <p><a class="btn btn-default" href="#">View details &raquo;</a></p>\n        </div>\n        <div class="col-md-4">\n          <h2>Heading</h2>\n          <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>\n          <p><a class="btn btn-default" href="#">View details &raquo;</a></p>\n       </div>\n        <div class="col-md-4">\n          <h2>Heading</h2>\n          <p>Donec sed odio dui. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vestibulum id ligula porta felis euismod semper. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</p>\n          <p><a class="btn btn-default" href="#">View details &raquo;</a></p>\n        </div>\n      </div>\n\n      <hr>\n\n      <footer>\n        <p>&copy; Company 2013</p>\n      </footer>\n    </div> <!-- /container -->\n\n    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>\n    <script src="https://netdna.bootstrapcdn.com/bootstrap/3.0.0/js/bootstrap.min.js"></script>\n  </body>\n</html>'
});
Controls.add("bootstrap3/container", {
    classes: ["container"],
    image: "https://s3.amazonaws.com/jetstrap-site/images/builder/components/container.png",
    image2x: "https://s3.amazonaws.com/jetstrap-site/images/builder/components/container2x.png",
    canDrag: false,
    canEdit: false,
    defaultHtml: '<div class="container"></div>',
    name: "Container"
});
Controls.add("bootstrap3/button", {
    classes: ["btn", "btn-link"],
    name: "Button",
    image: "https://s3.amazonaws.com/jetstrap-site/images/builder/components/button.png",
    image2x: "https://s3.amazonaws.com/jetstrap-site/images/builder/components/button2x.png",
    validChildren: ["_text"],
    defaultHtml: '<a href="#" class="btn btn-default">Click!</a>',
    properties: [{
        name: "Link To",
        key: "href",
        html_attr: "href",
        widgetpos: 1,
        widgettype: LinkToWidget
    },
    {
        name: "Type",
        key: "type",
        html_attr: "class",
        widgetpos: 2,
        widgettype: SelectWidget,
        possibleValues: ["btn-default", "btn-primary", "btn-info", "btn-success", "btn-warning", "btn-danger", "btn-link"],
        widgetdata: {
            items: [{
                value: "btn-default",
                text: "Default"
            },
            {
                value: "btn-primary",
                text: "Primary"
            },
            {
                value: "btn-info",
                text: "Info"
            },
            {
                value: "btn-success",
                text: "Success"
            },
            {
                value: "btn-warning",
                text: "Warning"
            },
            {
                value: "btn-danger",
                text: "Danger"
            },
            {
                value: "btn-link",
                text: "Link"
            }]
        }
    },
    {
        name: "Size",
        key: "size",
        html_attr: "class",
        widgetpos: 3,
        widgettype: SelectWidget,
        possibleValues: ["", "btn-lg", "btn-sm", "btn-xs"],
        widgetdata: {
            items: [{
                value: "",
                text: "Default"
            },
            {
                value: "btn-lg",
                text: "Large"
            },
            {
                value: "btn-sm",
                text: "Small"
            },
            {
                value: "btn-xs",
                text: "X-Small"
            }]
        }
    },
    {
        name: "Target",
        key: "target",
        html_attr: "target",
        widgetpos: 4,
        widgettype: SingleTextWidget
    },
    {
        name: "Disabled",
        key: "disabled",
        html_attr: "class",
        widgetpos: 5,
        widgettype: ToggleWidget,
        possibleValues: ["", "disabled"],
        widgetdata: {
            onText: "yes",
            onValue: "disabled",
            offText: "no",
            offValue: ""
        }
    }]
});
Controls.add("bootstrap3/buttongroup", {
    classes: ["btn-group"],
    name: "Button Group",
    image: "https://s3.amazonaws.com/jetstrap-site/images/builder/components/button_group.png",
    image2x: "https://s3.amazonaws.com/jetstrap-site/images/builder/components/button_group2x.png",
    validChildren: ["bootstrap3/button"],
    defaultHtml: '<div class="btn-group"><a href="#" class="btn btn-default">Button 1</a><a href="#" class="btn btn-default">Button 2</a><a href="#" class="btn btn-default">Button 3</a></div>'
});
Controls.add("bootstrap3/buttontoolbar", {
    classes: ["btn-toolbar"],
    name: "Button Toolbar",
    image: "https://s3.amazonaws.com/jetstrap-site/images/builder/components/button_toolbar.png",
    image2x: "https://s3.amazonaws.com/jetstrap-site/images/builder/components/button_toolbar2x.png",
    validChildren: ["bootstrap3/buttongroup", "bootstrap3/buttondropdown"],
    defaultHtml: '<div class="btn-toolbar"><div class="btn-group"><a href="#" class="btn btn-default">Button 1</a><a href="#" class="btn btn-default">Button 2</a><a href="#" class="btn btn-default">Button 3</a></div><div class="btn-group"><a href="#" class="btn btn-default">Button 1</a><a href="#" class="btn btn-default">Button 2</a><a href="#" class="btn btn-default">Button 3</a></div></div>'
});
Controls.add("bootstrap3/pageheader", {
    name: "Page Header",
    defaultHtml: '<div class="page-header"><h3>Top of the mornin\' to ya!</h3></div>',
    image: "https://s3.amazonaws.com/jetstrap-site/images/builder/components/heading.png",
    image2x: "https://s3.amazonaws.com/jetstrap-site/images/builder/components/heading2x.png"
});
Controls.add("bootstrap3/alert", {
    classes: ["alert"],
    name: "Alert",
    image: "https://s3.amazonaws.com/jetstrap-site/images/builder/components/alert.png",
    image2x: "https://s3.amazonaws.com/jetstrap-site/images/builder/components/alert2x.png",
    defaultHtml: '<div class="alert"><h3>Alert!</h3><p>This is not a test</p></h3></div>',
    properties: [{
        name: "Type",
        key: "type",
        html_attr: "class",
        widgettype: SelectWidget,
        possibleValues: ["", "alert-danger", "alert-success", "alert-info"],
        widgetdata: {
            items: [{
                value: "",
                text: "Default"
            },
            {
                value: "alert-danger",
                text: "Danger"
            },
            {
                value: "alert-success",
                text: "Success"
            },
            {
                value: "alert-info",
                text: "Info"
            }]
        }
    }]
});
Controls.add("bootstrap3/progressbar", {
    classes: ["progress"],
    name: "Progress Bar",
    image: "https://s3.amazonaws.com/jetstrap-site/images/builder/components/progressbar.png",
    image2x: "https://s3.amazonaws.com/jetstrap-site/images/builder/components/progressbar2x.png",
    defaultHtml: '<div class="progress"><div class="progress-bar" style="width: 50%"></div></div>',
    properties: [{
        name: "Value",
        key: "value",
        getFromNode: function(node) {
            var bar;
            bar = $(node).find(".progress-bar:first").get(0);
            if (bar) {
                return bar.style.width.substring(0, bar.style.width.length - 1)
            }
            return 50
        },
        setOnNode: function(node, value) {
            var bar;
            bar = $(node).find(".progress-bar:first").get(0);
            if (bar) {
                return bar.style.width = value + "%"
            }
        },
        widgettype: SingleTextWidget
    },
    {
        name: "Type",
        key: "type",
        setOnNode: function(node, value) {
            var bar, className, classNames, classes, _i, _len;
            bar = $(node).find(".progress-bar:first").get(0);
            if (bar) {
                classNames = bar.className;
                classes = classNames && classNames.split(/\s+/) || [];
                for (_i = 0, _len = classes.length; _i < _len; _i++) {
                    className = classes[_i];
                    if (/progress-bar-/.test(className)) {
                        $(bar).removeClass(className)
                    }
                }
                return $(bar).addClass(value)
            }
        },
        getFromNode: function(node) {
            var bar, className, classNames, classes, _i, _len;
            bar = $(node).find(".progress-bar:first").get(0);
            if (bar) {
                classNames = bar.className;
                classes = classNames && classNames.split(/\s+/) || [];
                for (_i = 0, _len = classes.length; _i < _len; _i++) {
                    className = classes[_i];
                    if (/progress-bar-/.test(className)) {
                        return className
                    }
                }
            }
        },
        possibleValues: ["", "progress-bar-success", "progress-bar-info", "progress-bar-warning", "progress-bar-danger"],
        widgettype: SelectWidget,
        widgetdata: {
            items: [{
                value: "",
                text: "Default"
            },
            {
                value: "progress-bar-info",
                text: "Info"
            },
            {
                value: "progress-bar-success",
                text: "Success"
            },
            {
                value: "progress-bar-warning",
                text: "Warning"
            },
            {
                value: "progress-bar-danger",
                text: "Error"
            }]
        }
    },
    {
        name: "Striped",
        key: "striped",
        html_attr: "class",
        possibleValues: ["", "progress-bar-striped"],
        widgettype: ToggleWidget,
        widgetdata: {
            onText: "yes",
            onValue: "progress-striped",
            offText: "no",
            offValue: ""
        }
    },
    {
        name: "Animated",
        key: "animated",
        html_attr: "class",
        possibleValues: ["", "active"],
        widgettype: ToggleWidget,
        widgetdata: {
            onText: "yes",
            onValue: "active",
            offText: "no",
            offValue: ""
        }
    }]
});
Controls.add("bootstrap3/progressbarbar", {
    name: "Bar",
    matchNode: function(node) {
        return $(node).hasClass("progress-bar") && $(node).parent().is(".progress")
    },
    canSelect: false,
    canEdit: false,
    canDrag: false
});
Controls.add("bootstrap3/jumbotron", {
    classes: ["jumbotron"],
    image: "https://s3.amazonaws.com/jetstrap-site/images/builder/components/hero_unit.png",
    image2x: "https://s3.amazonaws.com/jetstrap-site/images/builder/components/herou_unit2x.png",
    name: "Jumbotron",
    defaultHtml: '<div class="jumbotron"><h1>Hello, World!</h1><p>This is the coolest!</p><p><a class="btn btn-primary btn-lg" href="#">Learn more</a></div>'
});
Controls.add("bootstrap3/well", {
    classes: ["well"],
    image: "https://s3.amazonaws.com/jetstrap-site/images/builder/components/well.png",
    image2x: "https://s3.amazonaws.com/jetstrap-site/images/builder/components/well2x.png",
    name: "Well",
    defaultHtml: '<div class="well"><h3>Well!</h3><p>This is something.</p></div>'
});
Controls.add("bootstrap3/panel", {
    classes: ["panel", "panel-default", "panel-primary", "panel-success", "panel-info", "panel-warning", "panel-danger"],
    name: "Panel",
    image: "https://s3.amazonaws.com/jetstrap-site/images/builder/components/panels.png",
    image2x: "https://s3.amazonaws.com/jetstrap-site/images/builder/components/panels2x.png",
    defaultHtml: '<div class="panel panel-default">\n  <div class="panel-heading">\n    <h3 class="panel-title">Panel title</h3>\n  </div>\n  <div class="panel-body">\n    Panel content\n  </div>\n</div>',
    properties: [{
        name: "Type",
        key: "type",
        html_attr: "class",
        possibleValues: ["panel-default", "panel-primary", "panel-success", "panel-warning", "panel-danger", "panel-info"],
        widgettype: SelectWidget,
        widgetdata: {
            items: [{
                value: "panel-default",
                text: "Default"
            },
            {
                value: "panel-primary",
                text: "Primary"
            },
            {
                value: "panel-success",
                text: "Success"
            },
            {
                value: "panel-warning",
                text: "Warning"
            },
            {
                value: "panel-danger",
                text: "Danger"
            },
            {
                value: "panel-info",
                text: "Info"
            }]
        }
    }]
});
Controls.add("bootstrap3/panelbody", {
    name: "Panel Body",
    classes: ["panel-body"],
    canDrag: false,
    canEdit: false,
    canSelect: false,
    defaultHtml: '<div class="panel-body">\n  Basic panel example\n</div>'
});
Controls.add("bootstrap3/panelbody", {
    name: "Panel Heading",
    classes: ["panel-heading"],
    canDrag: false,
    canEdit: false,
    canSelect: false,
    defaultHtml: '<div class="panel-heading">\n  <h3 class="panel-title">Panel Title</h3>\n</div>'
});
Controls.add("bootstrap3/listgroup", {
    name: "List Group",
    image: "https://s3.amazonaws.com/jetstrap-site/images/builder/components/list_group.png",
    image2x: "https://s3.amazonaws.com/jetstrap-site/images/builder/components/list_group2x.png",
    classes: ["list-group"],
    canDrag: true,
    canEdit: false,
    canSelect: true,
    defaultHtml: '<ul class="list-group">\n  <li class="list-group-item">\n    <span class="badge">14</span>\n    Cras justo odio\n  </li>\n  <li class="list-group-item">\n    <span class="badge">2</span>\n    Dapibus ac facilisis in\n  </li>\n  <li class="list-group-item">\n    <span class="badge">1</span>\n    Morbi leo risus\n  </li>\n</ul>'
});
Controls.add("bootstrap3/listitem", {
    name: "List Item",
    classes: ["list-group-item"],
    canEdit: true,
    canSelect: true,
    canDrag: true,
    defaultHtml: '<li class="list-group-item"><span class="badge">14</span> Cras justo odio</li>'
});
Controls.add("bootstrap3/taglabel", {
    classes: ["label"],
    image: "https://s3.amazonaws.com/jetstrap-site/images/builder/components/label.png",
    image2x: "https://s3.amazonaws.com/jetstrap-site/images/builder/components/label2x.png",
    name: "Tag Label",
    defaultHtml: '<span class="label label-default">Label</span>',
    properties: [{
        name: "Type",
        key: "type",
        html_attr: "class",
        possibleValues: ["label-default", "label-primary", "label-success", "label-warning", "label-danger", "label-info"],
        widgettype: SelectWidget,
        widgetdata: {
            items: [{
                value: "label-default",
                text: "Default"
            },
            {
                value: "label-primary",
                text: "Primary"
            },
            {
                value: "label-success",
                text: "Success"
            },
            {
                value: "label-warning",
                text: "Warning"
            },
            {
                value: "label-danger",
                text: "Danger"
            },
            {
                value: "label-info",
                text: "Info"
            }]
        }
    }]
});
Controls.add("bootstrap3/badge", {
    classes: ["badge"],
    image: "https://s3.amazonaws.com/jetstrap-site/images/builder/components/badge.png",
    image2x: "https://s3.amazonaws.com/jetstrap-site/images/builder/components/badge2x.png",
    name: "Badge",
    defaultHtml: '<span class="badge">Badge</span>',
    properties: [{
        name: "Text",
        key: "text",
        widgettype: HiddenWidget
    }]
});
Controls.add("bootstrap3/navbar", {
    classes: ["navbar"],
    image: "https://s3.amazonaws.com/jetstrap-site/images/builder/components/navbar.png",
    image2x: "https://s3.amazonaws.com/jetstrap-site/images/builder/components/navbar2x.png",
    name: "Nav Bar",
    defaultHtml: '<nav class="navbar navbar-default" role="navigation"><div class="navbar-header"><a class="navbar-brand" href="#">Brand</a></div><div class="collapse navbar-collapse navbar-ex1-collapse"><ul class="nav navbar-nav"><li class="active"><a href="#">Home</a></li><li><a href="#">Link</a></li><li><a href="#">Link</a></li></ul></div></nav>',
    validChildren: [],
    properties: [{
        name: "Type",
        key: "type",
        html_attr: "class",
        possibleValues: ["", "navbar-inverse"],
        widgettype: SelectWidget,
        widgetdata: {
            items: [{
                value: "",
                text: "Default"
            },
            {
                value: "navbar-inverse",
                text: "Inverse"
            }]
        }
    },
    {
        name: "Fixed mode",
        key: "fixedmode",
        html_attr: "class",
        possibleValues: ["", "navbar-fixed-top", "navbar-fixed-bottom"],
        widgettype: SelectWidget,
        widgetdata: {
            items: [{
                value: "",
                text: "Not fixed"
            },
            {
                value: "navbar-fixed-top",
                text: "Fixed Top"
            },
            {
                value: "navbar-fixed-bottom",
                text: "Fixed Bottom"
            }]
        }
    }]
});
Controls.add("bootstrap3/breadcrumbs", {
    classes: ["breadcrumb"],
    name: "Breadcrumbs",
    image: "https://s3.amazonaws.com/jetstrap-site/images/builder/components/breadcrumbs.png",
    image2x: "https://s3.amazonaws.com/jetstrap-site/images/builder/components/breadcrumbs2x.png",
    defaultHtml: '<ul class="breadcrumb"><li><a href="#">Home</a></li><li><a href="#">Products</a></li><li class="active">Specials</li></ul>'
});
Controls.add("bootstrap3/breadcrumbitem", {
    matchNode: function(node) {
        return node.nodeName.toLowerCase() === "li" && $(node).parent().is(".breadcrumb")
    },
    name: "Breadcrumb Item",
    defaultHtml: '<li><a href="#">Crumb</a></li>',
    properties: [{
        name: "Active",
        key: "active",
        html_attr: "class",
        possibleValues: ["", "active"],
        widgettype: ToggleWidget,
        widgetdata: {
            onText: "yes",
            onValue: "active",
            offText: "no",
            offValue: ""
        }
    }]
});
Controls.add("bootstrap3/pagination", {
    classes: ["pagination"],
    name: "Pagination",
    image: "https://s3.amazonaws.com/jetstrap-site/images/builder/components/pagenation.png",
    image2x: "https://s3.amazonaws.com/jetstrap-site/images/builder/components/pagenation2x.png",
    validChildren: ["bootstrap3/paginationitem", "listitem"],
    insertChild: function(node, child) {
        return $(node).find("> ul > li:last").before(child)
    },
    defaultHtml: '<ul class="pagination"><li><a href="#">Prev</a></li><li><a href="#">1</a></li><li><a href="#">2</a></li><li><a href="#">3</a></li><li><a href="#">Next</a></li></ul>'
});
Controls.add("bootstrap3/paginationitem", {
    matchNode: function(node) {
        return node.nodeName.toLowerCase() === "li" && $(node).parent().parent().is(".pagination")
    },
    defaultHtml: '<li><a href="#">n</a></li>',
    validChildren: [],
    name: "Pagination Item",
    properties: [{
        name: "Link To",
        key: "href",
        html_attr: "href",
        setOnNode: function(node, value) {
            return $(node).children("a:first").attr("href", value)
        },
        getFromNode: function(node) {
            return $(node).children("a:first").attr("href")
        },
        widgetpos: 1,
        widgettype: LinkToWidget
    },
    {
        name: "Active",
        key: "active",
        html_attr: "class",
        possibleValues: ["", "active"],
        widgettype: ToggleWidget,
        widgetdata: {
            onText: "yes",
            onValue: "active",
            offText: "no",
            offValue: ""
        }
    }]
});
Controls.add("bootstrap3/pager", {
    name: "Pager",
    defaultHtml: '<ul class="pager"><li class="previous"><a href="#">&larr; Older</a></li><li class="next"><a href="#">Newer &rarr;</a></li></ul>',
    validChildren: []
});
Controls.add("bootstrap3/form", {
    nodes: ["form"],
    image: "https://s3.amazonaws.com/jetstrap-site/images/builder/components/form.png",
    image2x: "https://s3.amazonaws.com/jetstrap-site/images/builder/components/form2x.png",
    name: "Form",
    defaultHtml: "<form></form>",
    properties: [{
        name: "Style",
        key: "style",
        html_attr: "class",
        possibleValues: ["", "form-search", "form-inline", "form-horizontal"],
        widgettype: SelectWidget,
        widgetdata: {
            items: [{
                value: "",
                text: "Default"
            },
            {
                value: "form-search",
                text: "Search"
            },
            {
                value: "form-inline",
                text: "Inline"
            },
            {
                value: "form-horizontal",
                text: "Horizontal"
            }]
        }
    },
    {
        name: "Action",
        key: "action",
        html_attr: "action",
        value: "",
        widgetpos: 1,
        widgettype: SingleTextWidget
    },
    {
        name: "Method",
        key: "method",
        html_attr: "method",
        value: "",
        widgetpos: 2,
        widgettype: SingleTextWidget
    }]
});
Controls.add("bootstrap3/textinputgroup", {
    name: "Text Input",
    image: "https://s3.amazonaws.com/jetstrap-site/images/builder/components/text_input.png",
    image2x: "https://s3.amazonaws.com/jetstrap-site/images/builder/components/text_input2x.png",
    defaultHtml: '<div class="form-group"><label>Text</label><input type="text" class="form-control"></div></div>'
});
Controls.add("bootstrap3/selectinputgroup", {
    name: "Select Input",
    image: "https://s3.amazonaws.com/jetstrap-site/images/builder/components/select_input.png",
    image2x: "https://s3.amazonaws.com/jetstrap-site/images/builder/components/select_input2x.png",
    defaultHtml: '<div class="form-group"><label>Choose wisely:</label><select class="form-control"><option value="pizza">Pizza</option><option value="salad">Salad</option><option value="pizzasalad">Pizza and Salad</option></select></div>'
});
Controls.add("bootstrap3/fileinputgroup", {
    name: "Input group",
    image: "https://s3.amazonaws.com/jetstrap-site/images/builder/components/file_input.png",
    image2x: "https://s3.amazonaws.com/jetstrap-site/images/builder/components/file_input2x.png",
    defaultHtml: '<div class="form-group"><label>Upload your file:</label><input type="file" class="form-control"></div>'
});
Controls.add("bootstrap3/textareainputgroup", {
    name: "Text Area",
    image: "https://s3.amazonaws.com/jetstrap-site/images/builder/components/text_area.png",
    image2x: "https://s3.amazonaws.com/jetstrap-site/images/builder/components/text_area2x.png",
    defaultHtml: '<div class="form-group"><label>Your response:</label><textarea class="form-control"></textarea></div>'
});
Controls.extend("input", "bootstrap3/submitbutton", {
    name: "Submit Button",
    image: "https://s3.amazonaws.com/jetstrap-site/images/builder/components/button.png",
    image2x: "https://s3.amazonaws.com/jetstrap-site/images/builder/components/button2x.png",
    matchNode: function(node) {
        return $(node).is('button[type="submit"]') || $(node).is('input[type="submit"]')
    },
    validChildren: ["_text"],
    defaultHtml: '<button type="submit" class="btn btn-default">Click!</button>',
    properties: [{
        name: "Content",
        key: "content",
        widgetpos: 100,
        widgettype: HiddenWidget
    },
    {
        name: "Type",
        key: "type",
        html_attr: "class",
        widgetpos: 2,
        widgettype: SelectWidget,
        possibleValues: ["btn-default", "btn-primary", "btn-info", "btn-success", "btn-warning", "btn-danger", "btn-link"],
        widgetdata: {
            items: [{
                value: "btn-default",
                text: "Default"
            },
            {
                value: "btn-primary",
                text: "Primary"
            },
            {
                value: "btn-info",
                text: "Info"
            },
            {
                value: "btn-success",
                text: "Success"
            },
            {
                value: "btn-warning",
                text: "Warning"
            },
            {
                value: "btn-danger",
                text: "Danger"
            },
            {
                value: "btn-link",
                text: "Link"
            }]
        }
    },
    {
        name: "Size",
        key: "size",
        html_attr: "class",
        widgetpos: 3,
        widgettype: SelectWidget,
        possibleValues: ["", "btn-lg", "btn-sm", "btn-xs"],
        widgetdata: {
            items: [{
                value: "",
                text: "Default"
            },
            {
                value: "btn-lg",
                text: "Large"
            },
            {
                value: "btn-sm",
                text: "Small"
            },
            {
                value: "btn-xs",
                text: "X-Small"
            }]
        }
    },
    {
        name: "Disabled",
        key: "disabled",
        html_attr: "class",
        widgetpos: 5,
        widgettype: ToggleWidget,
        possibleValues: ["", "disabled"],
        widgetdata: {
            onText: "yes",
            onValue: "disabled",
            offText: "no",
            offValue: ""
        }
    }]
});
Controls.add("bootstrap3/checkbox", {
    matchNode: function(node) {
        return $(node.firstChild).is('input[type="checkbox"]')
    },
    name: "Checkbox",
    image: "https://s3.amazonaws.com/jetstrap-site/images/builder/components/checkbox.png",
    image2x: "https://s3.amazonaws.com/jetstrap-site/images/builder/components/checkbox2x.png",
    defaultHtml: '<label class="checkbox"><input type="checkbox"> Remember me</label>',
    properties: [{
        name: "Name",
        widgetpos: 0,
        key: "name",
        html_attr: "name",
        setOnNode: function(node, value) {
            return $(node.firstChild).attr("name", value)
        },
        widgettype: SingleTextWidget
    }]
});
Controls.add("bootstrap3/radiobutton", {
    matchNode: function(node) {
        return $(node.firstChild).is('input[type="radio"]')
    },
    name: "Radio Button",
    image: "https://s3.amazonaws.com/jetstrap-site/images/builder/components/radio.png",
    image2x: "https://s3.amazonaws.com/jetstrap-site/images/builder/components/radio2x.png",
    defaultHtml: '<label class="radio"><input type="radio"> Yes</label>',
    properties: [{
        name: "Name",
        widgetpos: 0,
        key: "name",
        html_attr: "name",
        setOnNode: function(node, value) {
            return $(node.firstChild).attr("name", value)
        },
        widgettype: SingleTextWidget
    }]
});
Controls.add("bootstrap3/table", {
    nodes: ["table"],
    classes: ["table"],
    image: "https://s3.amazonaws.com/jetstrap-site/images/builder/components/table.png",
    image2x: "https://s3.amazonaws.com/jetstrap-site/images/builder/components/table2x.png",
    name: "Table",
    defaultHtml: '<table class="table"><tr><td>Cell 1</td><td>Cell 2</td><td>Cell 3</td></tr></table>',
    validChildren: ["bootstrap3/tablerow", "bootstrap3/tablehead"],
    properties: [{
        name: "Type",
        key: "type",
        html_attr: "class",
        widgetpos: 2,
        widgettype: SelectWidget,
        possibleValues: ["", "table-striped", "table-bordered", "table-hover", "table-condensed"],
        widgetdata: {
            items: [{
                value: "",
                text: "Default"
            },
            {
                value: "table-striped",
                text: "Striped"
            },
            {
                value: "table-bordered",
                text: "Bordered"
            },
            {
                value: "table-hover",
                text: "Hover"
            },
            {
                value: "table-condensed",
                text: "Condensed"
            }]
        }
    }]
});
Controls.add("bootstrap3/tablehead", {
    nodes: ["thead"],
    name: "Table Head",
    defaultHtml: "<thead><tr><th>Head 1</th><th>Head 2</th><th>Head 3</th></tr></thead>",
    validChildren: ["bootstrap3/tablecell"],
    properties: [{
        name: "Type",
        key: "type",
        html_attr: "class",
        widgetpos: 2,
        widgettype: SelectWidget,
        possibleValues: ["", "success", "danger", "warning", "info"],
        widgetdata: {
            items: [{
                value: "",
                text: "Default"
            },
            {
                value: "success",
                text: "Success"
            },
            {
                value: "anger",
                text: "Error"
            },
            {
                value: "warning",
                text: "Warning"
            },
            {
                value: "info",
                text: "Info"
            }]
        }
    }]
});
Controls.add("bootstrap3/tablerow", {
    nodes: ["tr"],
    name: "Table Row",
    defaultHtml: "<tr><td>Cell 1</td><td>Cell 2</td><td>Cell 3</td></tr>",
    validChildren: ["bootstrap3/tablecell", "bootstrap3/tableheadercell"],
    properties: [{
        name: "Type",
        key: "type",
        html_attr: "class",
        widgetpos: 2,
        widgettype: SelectWidget,
        possibleValues: ["", "success", "danger", "warning", "active"],
        widgetdata: {
            items: [{
                value: "",
                text: "Default"
            },
            {
                value: "success",
                text: "Success"
            },
            {
                value: "error",
                text: "Error"
            },
            {
                value: "warning",
                text: "Warning"
            },
            {
                value: "active",
                text: "Active"
            }]
        }
    }]
});
Controls.add("bootstrap3/tablecell", {
    nodes: ["td"],
    name: "Table Cell",
    defaultHtml: "<td>Cell</td>"
});
Controls.add("bootstrap3/tableheadercell", {
    nodes: ["th"],
    name: "Table Header Cell",
    defaultHtml: "<th>Head</th>"
});
Controls.add("bootstrap3/tablebody", {
    nodes: ["tbody"],
    name: "Table Body",
    defaultHtml: "<tbody><tr><td>Cell 1</td><td>Cell 2</td><td>Cell 3</td></tr></tbody>"
});
Controls.add("bootstrap3/gridrow", {
    name: "Grid Row",
    image: "https://s3.amazonaws.com/jetstrap-site/images/builder/components/grid_row.png",
    image2x: "https://s3.amazonaws.com/jetstrap-site/images/builder/components/grid_row2x.png",
    validChildren: ["bootstrap3/gridspan"],
    classes: ["row"],
    defaultHtml: '<div class="row"><div class="col-md-4"><h3>Span 4</h3><p>Content</p></div><div class="col-md-4"><h3>Span 4</h3><p>Content</p></div><div class="col-md-4"><h3>Span 4</h3><p>Content</p></div></div>',
    properties: [{
        name: "Grid Layout",
        key: "gridlayout",
        widgetpos: 1,
        commitOnNode: function(node, value) {
            $(node).children(":hidden").remove();
            return true
        },
        _updateExistingNodes: function(node, spans, parts) {
            var i, p, r, res, span, _i, _j, _len, _len1, _results;
            _results = [];
            for (i = _i = 0, _len = spans.length; _i < _len; i = ++_i) {
                span = spans[i];
                if (i < parts.length) {
                    p = parseInt(parts[i]);
                    if (isNaN(p)) {
                        continue
                    }
                    res = $(span).attr("class").match(/col-md-\d+/);
                    if (res) {
                        for (_j = 0, _len1 = res.length; _j < _len1; _j++) {
                            r = res[_j];
                            $(span).removeClass(r)
                        }
                    }
                    _results.push($(span).addClass("col-md-" + p))
                } else {
                    _results.push(void 0)
                }
            }
            return _results
        },
        _fillSpaces: function(node, spans, parts) {
            var hidden, hiddenEl, i, left, p, pi, r, res, toShow, _i, _j, _k, _len, _len1, _len2, _results;
            hidden = $(node).children(":hidden");
            toShow = hidden.slice(0, parts.length - spans.length);
            if (toShow.length) {
                left = parts.slice(spans.length);
                for (i = _i = 0, _len = toShow.length; _i < _len; i = ++_i) {
                    hiddenEl = toShow[i];
                    if (i < left.length) {
                        p = left[i];
                        res = hiddenEl.className.match(/col-md-\d+/);
                        if (res) {
                            for (_j = 0, _len1 = res.length; _j < _len1; _j++) {
                                r = res[_j];
                                $(hiddenEl).removeClass(r)
                            }
                        }
                        $(hiddenEl).addClass("col-md" + p)
                    }
                }
                toShow.show();
                spans = $(node).children("[class^=col-]")
            }
            left = parts.slice(spans.length);
            _results = [];
            for (i = _k = 0, _len2 = left.length; _k < _len2; i = ++_k) {
                p = left[i];
                console.log("Adding extra child", p);
                pi = parseInt(p);
                if (isNaN(pi)) {
                    continue
                }
                _results.push($(node).append('<div class="col-md-' + pi + '"><h3>Span ' + pi + "</h3><p>Content here</p></div>"))
            }
            return _results
        },
        setOnNode: function(node, value) {
            var parts, removeSpans, spans, v;
            v = $.trim(value);
            parts = v.split(/\s+/);
            spans = $(node).children("[class^=col-md]:not(:hidden)");
            this._updateExistingNodes(node, spans, parts);
            if (parts.length > spans.length) {
                this._fillSpaces(node, spans, parts)
            } else if (parts.length < spans.length) {
                removeSpans = $(spans).slice(parts.length).hide()
            } else if (v === "") {
                removeSpans = $(spans).hide()
            }
            return null
        },
        getFromNode: function(node) {
            var layouts, spans;
            layouts = [];
            spans = $(node).find('[class^="col-md"]').each(function() {
                var res, spanClass;
                spanClass = $(this).attr("class");
                res = spanClass.match(/col-md-(\d+)/);
                if (res && res.length > 1) {
                    return layouts.push(res[1])
                }
            });
            return layouts.join(" ")
        },
        widgettype: GridLayoutWidget
    }]
});
Controls.add("bootstrap3/gridspan", {
    name: "Grid Span",
    classRegex: "col-",
    canDrag: false,
    canSelect: false,
    defaultHtml: '<div class="col-md-4"><h3>Span 4</h3><p>Content</p></div>'
});
Controls.add("bootstrap3/content", {
    name: "Html Content",
    defaultHtml: "<div>Some interesting content</div>",
    image: "https://s3.amazonaws.com/jetstrap-site/images/builder/components/text_block.png",
    image2x: "https://s3.amazonaws.com/jetstrap-site/images/builder/components/text_block2x.png",
    properties: [{
        name: "Content",
        key: "content",
        widgetpos: 100,
        widgettype: HiddenWidget
    }]
});
Controls.add("bootstrap3/listitem", {
    nodes: ["li"],
    name: "List Item",
    validChildren: []
});
Controls.add("bootstrap3/link", {
    nodes: ["a"],
    name: "Link",
    validChildren: [],
    canDrag: false,
    properties: [{
        name: "URL",
        key: "href",
        html_attr: "href",
        widgetpos: 1,
        widgettype: LinkToWidget
    },
    {
        name: "Target",
        key: "target",
        widgetpos: 4,
        html_attr: "target",
        widgettype: SingleTextWidget
    },
    {
        name: "Content",
        key: "content",
        widgetpos: 100,
        widgettype: HiddenWidget
    }]
});
Controls.add("bootstrap3/image", {
    nodes: ["img"],
    name: "Image",
    validChildren: [],
    defaultHtml: '<img src="https://s3.amazonaws.com/jetstrap-site/images/website/index/what_icon.png">',
    image: "https://s3.amazonaws.com/jetstrap-site/images/builder/components/image.png",
    image2x: "https://s3.amazonaws.com/jetstrap-site/images/builder/components/image2x.png",
    canEdit: false,
    properties: [{
        name: "Image",
        key: "src",
        html_attr: "src",
        widgettype: FileUploadWidget
    },
    {
        name: "Size",
        key: "width",
        html_attr: "width",
        widgettype: SingleTextWidget
    },
    {
        name: "Height",
        key: "height",
        html_attr: "height",
        widgettype: SingleTextWidget
    }]
});
Controls.add("bootstrap3/heading", {
    nodes: ["h1", "h2", "h3", "h4", "h5", "h6"],
    name: "Heading",
    defaultHtml: "<h3>Heading</h3>",
    image: "https://s3.amazonaws.com/jetstrap-site/images/builder/components/heading.png",
    image2x: "https://s3.amazonaws.com/jetstrap-site/images/builder/components/heading2x.png",
    validChildren: [],
    properties: [{
        name: "Content",
        key: "content",
        widgetpos: 100,
        widgettype: HiddenWidget
    },
    {
        name: "Size",
        key: "size",
        widgetpos: 4,
        possibleValues: ["1", "2", "3", "4", "5", "6"],
        getFromNode: function(node) {
            var r;
            r = /H(\d)/.exec(node.nodeName);
            if (r && r.length > 1) {
                return r[1]
            }
            return 3
        },
        setOnNode: function(node, value) {
            var newNode;
            console.log("Changing H to H", value);
            newNode = document.createElement("h" + value);
            $(newNode).append($(node).contents());
            $(node).replaceWith(newNode);
            return newNode
        },
        widgettype: SelectWidget,
        widgetdata: {
            items: [{
                value: "1",
                text: "1"
            },
            {
                value: "2",
                text: "2"
            },
            {
                value: "3",
                text: "3"
            },
            {
                value: "4",
                text: "4"
            },
            {
                value: "5",
                text: "5"
            },
            {
                value: "6",
                text: "6"
            }]
        }
    }]
});
Controls.add("bootstrap3/hr", {
    validChildren: [],
    image: "https://s3.amazonaws.com/jetstrap-site/images/builder/components/hr.png",
    image2x: "https://s3.amazonaws.com/jetstrap-site/images/builder/components/hr2x.png",
    nodes: ["hr"],
    name: "Horizontal Rule",
    defaultHtml: "<hr>"
});
Controls.add("bootstrap3/form", {
    nodes: ["form"],
    image: "https://s3.amazonaws.com/jetstrap-site/images/builder/components/form.png",
    image2x: "https://s3.amazonaws.com/jetstrap-site/images/builder/components/form2x.png",
    name: "Form",
    defaultHtml: "<form></form>",
    properties: [{
        name: "Style",
        key: "style",
        html_attr: "class",
        possibleValues: ["", "form-search", "form-inline", "form-horizontal"],
        widgettype: SelectWidget,
        widgetdata: {
            items: [{
                value: "",
                text: "Default"
            },
            {
                value: "form-search",
                text: "Search"
            },
            {
                value: "form-inline",
                text: "Inline"
            },
            {
                value: "form-horizontal",
                text: "Horizontal"
            }]
        }
    },
    {
        name: "Action",
        key: "action",
        html_attr: "action",
        value: "",
        widgetpos: 1,
        widgettype: SingleTextWidget
    },
    {
        name: "Method",
        key: "method",
        html_attr: "method",
        value: "",
        widgetpos: 2,
        widgettype: SingleTextWidget
    }]
});
Controls.add("bootstrap3/label", {
    name: "Label",
    nodes: ["label"],
    defaultHtml: '<label for="">Label</label>',
    properties: [{
        name: "For id",
        html_attr: "for",
        widgettype: SingleTextWidget
    }]
});
Controls.add("bootstrap3/input", {
    name: "Input",
    validChildren: [],
    properties: [{
        name: "Name",
        widgetpos: 0,
        key: "name",
        html_attr: "name",
        widgettype: SingleTextWidget
    }]
});
Controls.extend("bootstrap3/input", "bootstrap3/buttoninput", {
    nodes: ["button"],
    validChildren: [],
    name: "Button Input",
    defaultHtml: '<button class="btn">Button Input</button>',
    properties: [{
        name: "Content",
        key: "content",
        widgetpos: 100,
        widgettype: HiddenWidget
    },
    {
        name: "Type",
        key: "type",
        widgetpos: 2,
        html_attr: "class",
        widgettype: SelectWidget,
        possibleValues: ["", "btn-primary", "btn-info", "btn-success", "btn-warning", "btn-danger", "btn-inverse"],
        widgetdata: {
            items: [{
                value: "",
                text: "Default"
            },
            {
                value: "btn-primary",
                text: "Primary"
            },
            {
                value: "btn-info",
                text: "Info"
            },
            {
                value: "btn-success",
                text: "Success"
            },
            {
                value: "btn-warning",
                text: "Warning"
            },
            {
                value: "btn-danger",
                text: "Danger"
            },
            {
                value: "btn-inverse",
                text: "Inverse"
            }]
        }
    },
    {
        name: "Size",
        key: "size",
        html_attr: "class",
        widgetpos: 3,
        widgettype: SelectWidget,
        possibleValues: ["", "btn-large", "btn-small", "btn-mini"],
        widgetdata: {
            items: [{
                value: "",
                text: "Default"
            },
            {
                value: "btn-large",
                text: "Large"
            },
            {
                value: "btn-small",
                text: "Small"
            },
            {
                value: "btn-mini",
                text: "Mini"
            }]
        }
    },
    {
        name: "Disabled",
        key: "disabled",
        html_attr: "class",
        widgetpos: 5,
        widgettype: ToggleWidget,
        possibleValues: ["", "disabled"],
        widgetdata: {
            onText: "yes",
            onValue: "disabled",
            offText: "no",
            offValue: ""
        }
    }]
});
Controls.extend("bootstrap3/input", "bootstrap3/textinput", {
    validChildren: [],
    matchNode: function(node) {
        var pv, types, _i, _len, _ref;
        types = [];
        _ref = ["", "text", "password", "email", "datetime", "datetime-local", "date", "time", "month", "week", "number", "url", "search", "tel", "color"];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            pv = _ref[_i];
            types.push('input[type="' + pv + '"]')
        }
        return $(node).is(types.join(","))
    },
    name: "Text Input",
    defaultHtml: '<input type="text">',
    properties: [{
        name: "Type",
        key: "type",
        html_attr: "type",
        widgettype: SelectWidget,
        possibleValues: ["", "text", "password", "email", "datetime", "datetime-local", "date", "time", "month", "week", "number", "url", "search", "tel", "color"],
        setOnNode: function(node, value) {
            return node.type = value
        },
        widgetdata: {
            items: [{
                value: "text",
                text: "Text"
            },
            {
                value: "password",
                text: "Password"
            },
            {
                value: "email",
                text: "Email"
            },
            {
                value: "datetime",
                text: "Datetime"
            },
            {
                value: "datetime-local",
                text: "Datetime Local"
            },
            {
                value: "date",
                text: "Date"
            },
            {
                value: "time",
                text: "Time"
            },
            {
                value: "month",
                text: "Month"
            },
            {
                value: "week",
                text: "Week"
            },
            {
                value: "number",
                text: "Number"
            },
            {
                value: "url",
                text: "URL"
            },
            {
                value: "search",
                text: "Search"
            },
            {
                value: "tel",
                text: "Tel"
            },
            {
                value: "color",
                text: "Color"
            }]
        }
    },
    {
        name: "Placeholder",
        key: "placeholder",
        html_attr: "placeholder",
        widgettype: SingleTextWidget
    }]
});
Controls.extend("bootstrap3/input", "bootstrap3/selectinput", {
    nodes: ["select"],
    name: "Select Input",
    validChildren: [],
    defaultHtml: '<select><option value="pizza">Pizza</option><option value="salad">Salad</option><option value="pizzasalad">Pizza and Salad</option></select>',
    properties: [{
        name: "Options",
        type: "options",
        widgettype: ValueTextItemsWidget,
        widgetdata: {
            items: [{
                value: "pizza",
                text: "Pizza"
            },
            {
                value: "salad",
                text: "Salad"
            },
            {
                value: "pizzasalad",
                text: "Pizza and Salad"
            }]
        },
        setOnNode: function(node, items) {
            var item, _i, _len, _results;
            $(node).empty();
            _results = [];
            for (_i = 0, _len = items.length; _i < _len; _i++) {
                item = items[_i];
                _results.push($(node).append('<option value="' + item.value + '">' + item.text + "</option>"))
            }
            return _results
        }
    }]
});
Controls.extend("bootstrap3/input", "bootstrap3/fileinput", {
    validChildren: [],
    matchNode: function(node) {
        return $(node).is('input[type="file"]')
    },
    name: "File Input",
    defaultHtml: '<input type="file">'
});
Controls.extend("bootstrap3/input", "bootstrap3/textarea", {
    validChildren: [],
    nodes: ["textarea"],
    name: "Textarea",
    defaultHtml: "<textarea></textarea>"
});