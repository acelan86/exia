var DEBUG, i, lang, lang_en, methods, _i;
_i = function(a) {
    var b, c;
    return c = lang[a],
    c ? (b = String.prototype.format.apply(c, arguments), b) : ""
},
DEBUG = 1;
if (!DEBUG) {
    window.console || (window.console = {}),
    methods = ["log", "debug", "warn", "info", "error"],
    i = 0;
    while (i < methods.length) console[methods[i]] = function() {},
    i++
}
String.prototype.format = function() {
    var a, b;
    b = this.toString(),
    i = 0;
    while (i < arguments.length - 1) a = new RegExp("\\{" + i + "\\}", "gm"),
    b = b.replace(a, arguments[i + 1]),
    i++;
    return b
},
lang_en = {
    add_page: "Add Page",
    page_home: "Home",
    tab_themes: "Themes",
    tab_templates: "Templates",
    saving: "Saving app...",
    done_saving: "Saved {0}"
},
lang = lang_en;
var en, _t;
_t = function(a) {
    return window.TRANS_TABLE[a.toLowerCase()] || a
},
en = {
    please_contact: "Please contact help@codiqa.com for help.",
    error_open_codiqa: "Unable to open Codiqa file due to error.",
    "component names": "Component Names",
    "page header": "Page Header",
    "page footer": "Page Footer",
    "tab bar": "Tab Bar",
    "nav bar": "Nav Bar",
    button: "Button",
    link: "Link",
    map: "Map",
    heading: "Heading",
    collapsible: "Collapsible",
    grid: "Grid",
    "list view": "List View",
    form: "Form",
    "text input": "Text Input",
    "search input": "Search Input",
    "text area": "Text Area",
    "toggle switch": "Toggle Switch",
    slider: "Slider",
    "select menu": "Select Menu",
    "radio buttons": "Radio Buttons",
    checkboxes: "Checkboxes",
    "submit button": "Submit Button",
    "interface labels": "Interface Labels",
    test: "TEST",
    "download html": "Download HTML",
    pages: "Pages",
    components: "Components",
    "new page": "New page",
    duplicate: "Duplicate",
    "delete": "Delete",
    build: "BUILD",
    "properties window": "Properties Window",
    theme: "Theme",
    "a (default: black)": "a (default: Black)",
    "b (default: blue)": "b (default: Blue)",
    "c (default: gray)": "c (default: Gray)",
    "d (default: light gray)": "d (default: Light Gray)",
    "e (default: yellow)": "e (default: Yellow)",
    "fixed mode": "Fixed Mode",
    yes: "Yes",
    no: "No",
    id: "Id",
    "icon position": "Icon Position",
    items: "Items",
    text: "Text",
    "is initially active?": "Is initially active?",
    "link to page": "Link to page",
    icon: "Icon",
    "choose...": "Choose...",
    transition: "Transition",
    "delete button": "Delete button",
    "new button": "Add button",
    "new checkbox": "Add checkbox",
    "new radio": "Add radio",
    "link to": "Link to",
    inline: "Inline",
    "reverse transition": "Reverse Transition",
    "back in history": "Back in history",
    "open in new window": "Open in New Window",
    image: "Image",
    "upload image": "Upload image",
    width: "Width",
    height: "Height",
    align: "Align",
    left: "Left",
    center: "Center",
    right: "Right",
    display: "Display",
    block: "Block",
    location: "Location",
    "zoom level": "Zoom Level",
    markers: "Markers",
    "delete marker": "Delete marker",
    "new marker": "New marker",
    size: "Size",
    columns: "Columns",
    rows: "Rows",
    "enter content here": "Enter content here",
    sections: "Sections",
    "section header": "Section Header",
    "is collapsed": "Is collapsed",
    "delete section": "Delete section",
    "new section": "New section",
    "header theme": "Header Theme",
    "content theme": "Content Theme",
    "divider theme": "Divider Theme",
    "read only": "Read only",
    inset: "Inset",
    divider: "Divider",
    "delete divider": "Delete Divider",
    "link transition": "Link transition",
    "count bubble text": "Count Bubble Text",
    "new divider": "Add divider",
    "action (url)": "Action (URL)",
    method: "Method",
    get: "GET",
    post: "POST",
    "ajax submit": "Ajax Submit",
    title: "Title",
    name: "Name",
    "is mini": "Is mini",
    placeholder: "Placeholder",
    "initial text": "Initial Text",
    "input type": "Input type",
    password: "Password",
    email: "Email",
    range: "Range",
    search: "Search",
    number: "Number",
    "phone number": "Phone Number",
    url: "URL",
    date: "Date",
    time: "Time",
    month: "Month",
    week: "Week",
    datetime: "Datetime",
    "datetime local": "Datetime Local",
    color: "Color",
    '"off" text': '"Off" text',
    '"on" text': '"On" text',
    value: "Value",
    "min value": "Min Value",
    "max value": "Max Value",
    "show highlight": "Show Highlight",
    "track theme": "Track Theme",
    "is native menu": "Is Native menu",
    orientation: "Orientation",
    vertical: "Vertical",
    horizontal: "Horizontal",
    checkbox: "Checkbox",
    "input name": "Input name",
    others: "Others",
    "inspect code": "Inspect Code",
    indent: "Indent",
    spaces: "spaces",
    tabs: "tabs",
    all: "All",
    toolbars: "Toolbars",
    buttons: "Buttons",
    content: "Content",
    "list views": "List Views",
    "form elements": "Form Elements"
},
window.TRANS_TABLE = window.TRANS_TABLE || en,
function(a) {
    return a.fn.translate = function() {
        return this.each(function() {
            var b;
            return b = a(this).data("t"),
            b && a(this).text(_t(b) || b)
        })
    }
} (jQuery);
var Metrics;
Metrics = {
    _tests: {},
    _c: 0,
    start: function() {
        return this._tests[++this._c] = (new Date).getTime(),
        this._c
    },
    end: function(a) {
        var b, c;
        return c = (new Date).getTime(),
        b = this._tests[a],
        b ? (delete this._tests[a], c - b) : 0
    }
};
var ApplicationService, GenericApplicationService, GenericMenuBar, MenuBar, WebApplicationService, WebMenuBar;
GenericApplicationService = Backbone.View.extend({
    start: function() {},
    listenForUpdates: function() {},
    tryQuit: function() {
        return console.log("Triggering try quit"),
        this.trigger("appQuit")
    },
    quit: function() {}
}),
_.extend(GenericApplicationService, Backbone.Events),
WebApplicationService = GenericApplicationService.extend({
    start: function() {},
    login: function(a, b, c) {
        return $.post("/beta/login", {
            email: a,
            password: b
        },
        function(a) {
            return console.log("Login response", a),
            c(a)
        })
    },
    create: function(a, b, c, d) {
        return $.post("/beta/create", {
            name: a,
            email: b,
            password: c,
            plan: "builder"
        },
        function(a) {
            return console.log("Create response", a),
            d(a)
        })
    }
}),
GenericMenuBar = Backbone.View.extend({
    initialize: function() {},
    create: function(a) {},
    addMenu: function() {
        return {}
    },
    addMenuItem: function() {
        return {}
    },
    addSeparator: function() {},
    addCheckItem: function() {
        return {}
    },
    finishMenu: function() {},
    render: function() {}
}),
_.extend(GenericMenuBar, Backbone.Events),
WebMenuBar = GenericMenuBar.extend({
    initialize: function() {},
    render: function() {}
}),
MenuBar = new WebMenuBar,
ApplicationService = new WebApplicationService;
var AcceptAllInputFilter, AcceptIDInputFilter, AcceptPageIDInputFilter, AcceptUrlInputFilter, AccordionSectionItemWidget, AceWidget, AddItemWidget, ArrayProperty, ButtonListItemWidget, ButtonWidget, CheckboxItemsWidget, ChildrenArrayProperty, ChildrenPropertyWidget, ExternalImageWidget, HTMLAttrProperty, HeaderButtonItemWidget, ICONS, IconSelectWidget, IconWidget, IconWidgetPopup, ImageWidget, IndirectProperty, InputFilter, ItemPropertyWidget, JavascriptLinkSelectWidget, ListItemWidget, MapMarkerWidget, MultiTextWidget, NullWidget, PageSelectWidget, PanelListItemWidget, PixelSizeWidget, Property, RadioItemsWidget, ScalarProperty, SelectWidget, SingleTextWidget, TRANSITIONS, TabBarItemsWidget, ThemeSelectWidget, TransitionSelectWidget, UrlOrPageSelectWidget, UrlOrPageWidget, UrlOrUploadWidget, Widget, WysiWidget, __hasProp = {}.hasOwnProperty,
__extends = function(a, b) {
    function d() {
        this.constructor = a
    }
    for (var c in b) __hasProp.call(b, c) && (a[c] = b[c]);
    return d.prototype = b.prototype,
    a.prototype = new d,
    a.__super__ = b.prototype,
    a
},
__indexOf = [].indexOf ||
function(a) {
    for (var b = 0,
    c = this.length; b < c; b++) if (b in this && this[b] === a) return b;
    return - 1
};
Handlebars.registerHelper("property",
function(a, b) {
    if (a.property.getValue() !== a.property.getDefaultValue() && $.trim(a.property.getValue()) !== "") return b(this)
}),
Handlebars.registerHelper("propertyParent",
function(a, b) {
    if (a.getValue() !== a.getDefaultValue()) return b(this)
}),
Handlebars.registerHelper("propertyContentPadding",
function(a, b) {
    var c;
    c = a.getDefaultValue();
    if (a.value.value !== c.value || a.value.units !== c.units) return b(this)
}),
Handlebars.registerHelper("pattr",
function(a, b, c) {
    var d, e;
    if (!typeof a === "string") {
        e = a.property.getValue();
        if (e === a.property.getDefaultValue()) return ""
    }
    return typeof a == "string" && a !== "" ? new Handlebars.SafeString(" " + b + '="' + a + '"') : (d = a && a.property && a.property.getValue(), d && $.trim(d) !== "" ? new Handlebars.SafeString(" " + b + '="' + d + '"') : typeof c == "string" && $.trim(c) !== "" ? new Handlebars.SafeString(" " + b + '="' + c + '"') : "")
}),
Handlebars.registerHelper("pa",
function(a, b, c) {
    var d;
    return d = a.property.getValue(),
    d && $.trim(d) !== "" ? new Handlebars.SafeString(" " + b + '="' + d + '" ') : typeof c == "string" && $.trim(c) !== "" ? new Handlebars.SafeString(" " + b + '="' + c + '" ') : ""
}),
Handlebars.registerHelper("pdefault",
function(a, b) {
    var c;
    return c = a.property.getValue(),
    c && $.trim(c) !== "" ? new Handlebars.SafeString(c) : new Handlebars.SafeString(b)
}),
Handlebars.registerHelper("pattrs",
function(a) {
    var b;
    b = a.getValue();
    if (b && $.trim(b) !== "") return " " + new Handlebars.SafeString(b)
}),
Handlebars.registerHelper("pv",
function(a) {
    return new Handlebars.SafeString(a.property.value)
}),
Handlebars.registerHelper("ifless",
function(a, b, c) {
    return a < b ? c() : c.inverse(this)
}),
Handlebars.registerHelper("ifgreater",
function(a, b, c) {
    return a > b ? c(this) : c.inverse(this)
}),
Handlebars.registerHelper("ifequal",
function(a, b, c) {
    return a === b ? c(this) : c.inverse(this)
}),
Handlebars.registerHelper("ifemptystring",
function(a, b) {
    return a === "" || $.trim(a) === "" ? b(this) : b.inverse(this)
}),
Handlebars.registerHelper("ifnotemptystring",
function(a, b) {
    return a !== "" && $.trim(a) !== "" ? b(this) : b.inverse(this)
}),
Handlebars.registerHelper("ifempty",
function(a, b) {
    return a.length === 0 ? b(this) : b.inverse(this)
}),
Handlebars.registerHelper("endscript",
function() {
    return "</script>"
}),
TRANSITIONS = [{
    value: "none",
    key: _t("None")
},
{
    value: "fade",
    key: _t("Fade")
},
{
    value: "pop",
    key: _t("Pop")
},
{
    value: "flip",
    key: _t("Flip")
},
{
    value: "turn",
    key: _t("Turn")
},
{
    value: "flow",
    key: _t("Flow")
},
{
    value: "slidefade",
    key: _t("Slide Fade")
},
{
    value: "slide",
    key: _t("Slide")
},
{
    value: "slideup",
    key: _t("Slide Up")
},
{
    value: "slidedown",
    key: _t("Slide Down")
}],
ICONS = [{
    value: "",
    key: ""
},
{
    value: "arrow-l",
    key: _t("Left arrow")
},
{
    value: "arrow-r",
    key: _t("Right arrow")
},
{
    value: "arrow-u",
    key: _t("Up arrow")
},
{
    value: "arrow-d",
    key: _t("Down arrow")
},
{
    value: "delete",
    key: _t("Delete")
},
{
    value: "plus",
    key: _t("Plus")
},
{
    value: "minus",
    key: _t("Minus")
},
{
    value: "check",
    key: _t("Check")
},
{
    value: "gear",
    key: _t("Gear")
},
{
    value: "refresh",
    key: _t("Refresh")
},
{
    value: "forward",
    key: _t("Forward")
},
{
    value: "back",
    key: _t("Back")
},
{
    value: "grid",
    key: _t("Grid")
},
{
    value: "star",
    key: _t("Star")
},
{
    value: "alert",
    key: _t("Alert")
},
{
    value: "info",
    key: _t("Info")
},
{
    value: "home",
    key: _t("Home")
},
{
    value: "search",
    key: _t("Search")
}],
Property = function(a) {
    function b() {
        return b.__super__.constructor.apply(this, arguments)
    }
    return __extends(b, a),
    b.prototype.initialize = function(a, b, c) {
        return this._title = a,
        this.propertyType = "default",
        this.value = c,
        this._widget = b,
        b.setValue(this.value),
        this._defaultData = {
            value: this.value,
            _property_title: a
        }
    },
    b.prototype.setValue = function(a) {
        return this.value = a,
        this._widget.setValue(a)
    },
    b.prototype.updateValue = function(a) {
        return this.value = a,
        this._widget.updateValue(a)
    },
    b.prototype.getDefaultValue = function() {
        return this._defaultData.value
    },
    b.prototype.getValue = function() {
        return this.value
    },
    b.prototype.serialize = function() {
        var a;
        return a = this._serializeProperty(this.value),
        a
    },
    b.prototype._serializeProperty = function(a) {
        var b, c, d;
        if (typeof a == "object") {
            b = {};
            for (c in a) d = a[c],
            b[c] = this._serializeProperty(d);
            return b
        }
        return a
    },
    b.prototype.render = function() {
        return this.renderWidget()
    },
    b.prototype.renderWidget = function() {
        return this._widget.render(this._defaultData._property_title)
    },
    b.prototype.getRenderedWidget = function() {
        return this._widget.el
    },
    b.prototype.bindWidgetEvent = function(a, b) {
        return this._widget.bind(a, b, this)
    },
    b.prototype.getName = function() {
        return this._title
    },
    b.prototype.getWidget = function() {
        return this._widget
    },
    b.prototype.handle = function(a) {},
    b
} (Backbone.View),
_.extend(Property, Backbone.Events),
ScalarProperty = Property.extend({
    initialize: function(a, b, c) {
        var d;
        return Property.prototype.initialize.call(this, a, b, c),
        d = this,
        this.bindWidgetEvent("invalidValue",
        function(a) {}),
        this.bindWidgetEvent("valueChanged",
        function(a) {
            var b;
            b = d.getValue();
            if (b === a) return;
            return d.updateValue(a),
            d.trigger("propertyChanged", d, b, a)
        })
    }
}),
_.extend(ScalarProperty, Backbone.Events),
IndirectProperty = Property.extend({
    initialize: function(a, b, c) {
        var d;
        return Property.prototype.initialize.call(this, a, b),
        d = this,
        this.getValueFunc = c,
        this.bindWidgetEvent("addItem",
        function(a) {
            return console.log("item added", a),
            d.trigger("addItem", a)
        }),
        this.bindWidgetEvent("valueChanged",
        function(a) {
            return d.trigger("propertyChanged", d, a)
        })
    },
    render: function(a) {
        var b;
        return b = this.getValueFunc && this.getValueFunc(),
        this.setValue(b),
        this.renderWidget()
    }
}),
ChildrenArrayProperty = function(a) {
    function b() {
        return b.__super__.constructor.apply(this, arguments)
    }
    return __extends(b, a),
    b.prototype.initialize = function(a, c, d) {
        var e, f = this;
        return b.__super__.initialize.call(this, a, new ChildrenPropertyWidget(d)),
        e = this,
        this.component = c,
        this.bindWidgetEvent("buttonClicked",
        function(a) {
            return e.trigger("propertyChanged", e, [], [], !0)
        }),
        this.bindWidgetEvent("valueChanged",
        function(a) {
            return console.log("Array Property value changed", a)
        }),
        this.bindWidgetEvent("itemAdded",
        function(a) {
            return console.log("Item added", a),
            e.trigger("propertyChanged", e, [], [], !0)
        }),
        this.bindWidgetEvent("itemChanged",
        function(a, b) {
            return console.log("Item changed", a, b),
            e.trigger("propertyChanged", e, [], [])
        }),
        this.bindWidgetEvent("itemDeleted",
        function(a) {
            var b, c, g, h, i, j;
            g = 0;
            if (d.typeFilter) {
                j = f.component.children;
                for (h = 0, i = j.length; h < i; h++) {
                    b = j[h];
                    if (b.controlId === d.typeFilter) {
                        if (g === a) {
                            c = f.component.removeChild(b);
                            break
                        }
                        g++
                    }
                }
            } else c = f.component.removeControlAtIndex(a);
            if (c) return console.log("Item deleted", c),
            e.trigger("propertyChanged", e, [], [], !0)
        }),
        this.bindWidgetEvent("itemMoved",
        function(a, b) {
            var c, f, g, h, i, j, k, l;
            if (!d.typeFilter) return f = this.component.children[a],
            this.component.moveChild(f, b),
            console.log("Item moved", f),
            e.trigger("propertyChanged", e, [], [], !0);
            h = 0,
            l = this.component.children;
            for (g = j = 0, k = l.length; j < k; g = ++j) {
                c = l[g];
                if (c.controlId === d.typeFilter) {
                    if (h === a) {
                        i = g;
                        break
                    }
                    h++
                }
            }
            if (i >= 0) return this.component.moveChild(this.component.children[i], b),
            e.trigger("propertyChanged", e, [], [], !0)
        })
    },
    b.prototype.renderWidget = function() {
        return this._widget.render(this._defaultData._property_title, this.component)
    },
    b
} (Property),
ArrayProperty = function(a) {
    function b() {
        return b.__super__.constructor.apply(this, arguments)
    }
    return __extends(b, a),
    b.prototype.initialize = function(a, c, d) {
        var e;
        return b.__super__.initialize.call(this, a, c, d),
        this.propertyType = "array",
        e = this,
        this.bindWidgetEvent("itemAdded",
        function(a) {
            var b, c;
            return c = e.getValue().slice(0),
            e.addItem(a),
            e.setItemCount(),
            b = e.getValue().slice(0),
            e.trigger("itemAdded", a),
            e.trigger("propertyChanged", e, c, b, !0)
        }),
        this.bindWidgetEvent("itemChanged",
        function(a, b) {
            var c, d, f;
            return f = e.getValue().slice(0),
            d = e.replaceItem(a, b),
            c = e.getValue().slice(0),
            e.trigger("itemChanged", b, d),
            e.trigger("propertyChanged", e, f, c)
        }),
        this.bindWidgetEvent("itemDeleted",
        function(a) {
            var b, c, d;
            return d = e.getValue().slice(0),
            b = e.removeItem(a),
            e.setItemCount(),
            c = e.getValue().slice(0),
            e.trigger("itemDeleted", b),
            e.trigger("propertyChanged", e, d, c, !0)
        }),
        this.bindWidgetEvent("itemMoved",
        function(a, b) {
            var c, d;
            return d = e.getValue().slice(0),
            e.moveItem(a, b),
            c = e.getValue().slice(0),
            e.trigger("itemMoved", a, b),
            e.trigger("propertyChanged", e, d, c)
        })
    },
    b.prototype.addItemDistinct = function(a) {
        var b, c;
        if ($.isArray(this.value)) {
            b = 0;
            while (b < this.value.length) {
                c = this.value[b];
                if (c === a) return;
                b++
            }
            return this.value.push(a)
        }
    },
    b.prototype.addItem = function(a) {
        if ($.isArray(this.value)) return this.value.push(a)
    },
    b.prototype.removeItemMatch = function(a) {
        var b, c;
        if ($.isArray(this.value)) {
            b = 0;
            while (b < this.value.length) {
                c = this.value[b];
                if (c === a) return this.value.splice(b, 1),
                c;
                b++
            }
        }
    },
    b.prototype.getItems = function() {
        return this.value
    },
    b.prototype.removeItem = function(a) {
        var b;
        return $.isArray(this.value) && a < this.value.length ? (b = this.value[a], this.value.splice(a, 1), b) : null
    },
    b.prototype.moveItem = function(a, b) {
        var c;
        if ($.isArray(this.value) && a < this.value.length && b < this.value.length) return c = this.value[a],
        this.value.splice(a, 1),
        this.value.splice(b, 0, c)
    },
    b.prototype.replaceItem = function(a, b) {
        var c;
        return $.isArray(this.value) && a < this.value.length ? (c = this.value[a], this.value[a] = b, c) : null
    },
    b.prototype.size = function() {
        return this.value.length
    },
    b.prototype.setItemCount = function() {
        return this._widget.el.setAttribute("data-item-count", this.size())
    },
    b.prototype.render = function() {
        return b.__super__.render.call(this),
        this.setItemCount()
    },
    b
} (Property),
HTMLAttrProperty = function(a) {
    function b(a, c, d) {
        b.__super__.constructor.call(this, a, c, ""),
        this.attributes = d
    }
    return __extends(b, a),
    b.prototype.setValue = function(a) {
        var b, c, d, e, f, g;
        this.attributes = [],
        c = [];
        if (!a) return;
        typeof a == "string" ? (d = $("<div " + a + " />"), c = d.get(0).attributes) : c = a,
        g = [];
        for (e = 0, f = c.length; e < f; e++) b = c[e],
        g.push(this.attributes.push({
            value: b.value,
            name: b.name
        }));
        return g
    },
    b.prototype.setAttribute = function(a, b) {
        var c, d;
        if (!this.attributes) return this.setValue([{
            name: a,
            value: b
        }]);
        d = 0;
        while (d < this.attributes.length) {
            c = this.attributes[d];
            if (c.name && c.name.toLowerCase() === a) {
                this.attributes[d] = {
                    name: a,
                    value: b
                };
                return
            }
            d++
        }
        return this.attributes.push({
            name: a,
            value: b
        })
    },
    b.prototype.getValue = function() {
        var a, b, c;
        b = [];
        if (this.attributes) {
            c = 0;
            while (c < this.attributes.length) a = this.attributes[c],
            a.value && b.push(a.name + '="' + a.value.replace('"', '"') + '"'),
            c++
        }
        return b.join(" ")
    },
    b.prototype.getAttribute = function(a) {
        var b, c, d;
        c = [];
        if (this.attributes) {
            d = 0;
            while (d < this.attributes.length) {
                b = this.attributes[d];
                if (b.name && b.name.toLowerCase() === a.toLowerCase()) return b;
                d++
            }
        }
        return null
    },
    b
} (Property),
Widget = Backbone.View.extend({
    initialize: function(a, b) {
        return this._template = a,
        this._data = {},
        this._filter = b || new AcceptAllInputFilter
    },
    trigger: function(a) {
        var b;
        if (a === "valueChanged") {
            b = Array.prototype.slice.call(arguments, 1);
            if (b.length > 0 && this._filter && !this._filter.accept(b[0])) {
                this.trigger("invalidValue", arguments);
                return
            }
        }
        return Backbone.View.prototype.trigger.apply(this, Array.prototype.slice.call(arguments))
    },
    setValue: function(a) {},
    render: function(a) {
        var b, c, d;
        d = "#template-widget-" + this._template;
        c = Handlebars.compile($(d).html());
        b = c($.extend(this._data, {
            _property_title: a,
            _wid: this.cid
        }));
        $(this.el).html(b);
        this.delegateEvents();
    },
    onAttach: function() {}
}),
_.extend(Widget, Backbone.Events),
ItemPropertyWidget = function(a) {
    function b() {
        return b.__super__.constructor.apply(this, arguments)
    }
    return __extends(b, a),
    b.prototype.events = {
        'click [data-action="delete"]': "onItemRemoved"
    },
    b.prototype.onItemRemoved = function(a) {},
    b
} (Widget),
ChildrenPropertyWidget = function(a) {
    function b() {
        return b.__super__.constructor.apply(this, arguments)
    }
    return __extends(b, a),
    b.prototype.initialize = function(a) {
        return this.data = a,
        b.__super__.initialize.call(this, "children", new AcceptAllInputFilter)
    },
    b.prototype.events = {
        "click [data-tag]": "onButtonClicked",
        'click [data-action="delete"]': "onItemRemoved",
        'keyup input[type="text"]': "onInputChanged",
        "keyup textarea": "onInputChanged"
    },
    b.prototype.onItemRemoved = function(a) {
        var b, c, d;
        return c = $(a.currentTarget),
        d = c.closest(".fg-collapsible"),
        b = $(d).index(),
        this.trigger("itemDeleted", b),
        d.remove(),
        !1
    },
    b.prototype.onInputChanged = function(a) {
        var b, c;
        return c = $(a.target).closest(".fg-collapsible"),
        b = c.find("input:first").val(),
        c.find("h3 .title").text(b),
        !0
    },
    b.prototype.onButtonClicked = function(a) {
        var b;
        return b = $(a.target),
        this.trigger("buttonClicked", b.data("tag")),
        !1
    },
    b.prototype.bindCloser = function() {
        return $("[data-action]", this.el).click(function(a) {
            var b, c;
            return b = $(a.target).data("action"),
            c = $(a.target).closest(".fg-collapsible").index(),
            b === "delete" && this.trigger("itemDeleted", c),
            !1
        })
    },
    b.prototype.render = function(a, b) {
        var c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A;
        n = this,
        h = document.createElement("div"),
        q = "#template-widget-children",
        p = Handlebars.compile($(q).html()),
        j = p($.extend(this._data, {
            _property_title: a,
            _wid: this.cid,
            title: "None",
            childHtml: $(g).html()
        })),
        $(h).html(j),
        o = $(h).find(".fg-accordion"),
        z = b.children;
        for (r = 0, v = z.length; r < v; r++) {
            f = z[r];
            if (this.data.typeFilter && f.controlId !== this.data.typeFilter) continue;
            g = document.createElement("div"),
            m = f.getPropertiesSorted();
            if (m.length) for (s = 0, w = m.length; s < w; s++) {
                l = m[s];
                if (l.propertyName !== "elementId" && l.propertyName !== "elementClass") {
                    i = l;
                    break
                }
            }
            for (t = 0, x = m.length; t < x; t++) {
                l = m[t];
                if (this.data.fieldFilter && (A = l.propertyName, __indexOf.call(this.data.fieldFilter, A) < 0)) continue;
                l.property.renderWidget(),
                $(l.property._widget.el).detach().appendTo(g),
                l.property._widget.delegateEvents(),
                l.property.bindWidgetEvent("valueChanged",
                function(a) {
                    return console.log("Sub widget val changed", a)
                })
            }
            q = "#template-widget-childrenitem",
            p = Handlebars.compile($(q).html()),
            j = p($.extend(this._data, {
                _property_title: "Item",
                _wid: this.cid,
                title: i && i.property.getValue() || "Item"
            })),
            k = $(j),
            k.find(".content").append(g),
            $(o).append(k)
        }
        e = this.data.buttons;
        if (e.length) {
            d = $(h).find(".buttons");
            for (u = 0, y = e.length; u < y; u++) c = e[u],
            $(d).append('<a class="btn" href="#" data-tag="' + c.tag + '">' + c.text + "</a>")
        }
        return $(".fg-accordion.sortable", h).accordion({
            active: ":last",
            autoHeight: !1,
            animated: !1,
            collapsible: !0,
            clearStyle: !0,
            header: "> div > h3",
            icons: {
                header: "bui-icon bui-icon-plus",
                headerSelected: "bui-icon bui-icon-minus"
            },
            create: function(a, b) {
                return $('input[type="text"]:last', b.newContent).focus()
            },
            change: function(a, b) {
                return $('input[type="text"]', b.newContent).focus(),
                window.App.getPropertyView().resize()
            }
        }).sortable({
            axis: "y",
            handle: "h3",
            tolerance: "pointer",
            start: function(a, b) {
                var c;
                return c = b.item.index(),
                b.item.data("contentDragStart", c)
            },
            change: function(a, b) {
                var c;
                return c = b.item.index()
            },
            stop: function(a, b) {
                var c, d;
                return $(this).data("_stop", !0),
                d = b.item.data("contentDragStart"),
                c = b.item.index(),
                n.trigger("itemMoved", d, c)
            }
        }),
        $(".fg-collapsible.sortable h3", h).click(function(a) {
            l = $(this).closest(".fg-collapsible.sortable");
            if (l.data("_stop") === !0) return a.stopImmediatePropagation(),
            a.preventDefault(),
            l.data("_stop", !1)
        }),
        this.delegateEvents(),
        this.setElement(h),
        this.bindCloser()
    },
    b
} (Widget),
NullWidget = Widget.extend({
    initialize: function() {
        return Widget.prototype.initialize.call(this, "nullwidget", new AcceptAllInputFilter)
    }
}),
UrlOrUploadWidget = Widget.extend({
    initialize: function(a, b) {
        return Widget.prototype.initialize.call(this, "singletext", a),
        this._data = {
            text: b
        }
    },
    events: {
        "keyup input": "onKeyPress",
        "keydown input": "onKeyDown"
    },
    setValue: function(a) {
        return this._data.text = a,
        $("input[type=text]", this.el).val(a)
    },
    updateValue: function(a) {
        return this._data.text = a
    },
    onKeyDown: function(a) {
        return (a.ctrlKey || a.metaKey) && a.which === 90 ? (window.App.undo(), !1) : (a.ctrlKey || a.metaKey) && a.which === 89 ? (window.App.redo(), !1) : !0
    },
    onKeyPress: function(a) {
        var b;
        return b = $(a.currentTarget),
        this.trigger("valueChanged", b.val())
    }
}),
SingleTextWidget = Widget.extend({
    initialize: function(a, b, c) {
        return Widget.prototype.initialize.call(this, "singletext", a),
        this._delay = b,
        this._data = {
            text: "",
            extra: c || {}
        }
    },
    events: {
        "keyup input": "onKeyPress",
        "click button": "onButtonClicked"
    },
    setValue: function(a) {
        return this._data.text = a,
        $("input[type=text]", this.el).val(a)
    },
    updateValue: function(a) {
        return this._data.text = a
    },
    onKeyDown: function(a) {
        return (a.ctrlKey || a.metaKey) && a.which === 90 ? (window.App.undo(), !1) : (a.ctrlKey || a.metaKey) && a.which === 89 ? (window.App.redo(), !1) : !0
    },
    onKeyPress: function(a) {
        var b, c;
        c = this,
        b = $(a.currentTarget);
        if (this._data.extra.mustCommit) return;
        return this._delay ? (clearTimeout(this._delayTimeout), this._delayTimeout = setTimeout(function() {
            return c.trigger("valueChanged", b.val())
        },
        this._delay)) : this.trigger("valueChanged", b.val())
    },
    onButtonClicked: function(a) {
        var b;
        return b = $(this.el).find("input").val(),
        this.trigger("valueChanged", b),
        !1
    }
}),
PixelSizeWidget = Widget.extend({
    initialize: function(a, b) {
        return Widget.prototype.initialize.call(this, "pixelsize", a),
        this._data = b
    },
    events: {
        "keyup input": "onKeyPress",
        "keydown input": "onKeyDown",
        'change input[type="radio"]': "onRadioChange"
    },
    setValue: function(a) {
        var b, c;
        return typeof a == "string" && (c = parseFloat(a), b = /(px)|(%)/.exec(a), b.length && b[0] ? a = {
            value: "" + c,
            units: b[0]
        }: a = {
            value: "" + c,
            units: "px"
        }),
        this._data = a,
        $("input[type=text].val", this.el).val(a.value),
        $('input[type=radio][value="' + a.units + '"]', this.el).attr("checked", "checked")
    },
    updateValue: function(a) {
        return this._data = a
    },
    onKeyDown: function(a) {
        return (a.ctrlKey || a.metaKey) && a.which === 90 ? (window.App.undo(), !1) : (a.ctrlKey || a.metaKey) && a.which === 89 ? (window.App.redo(), !1) : !0
    },
    _valueChanged: function() {
        var a, b;
        return b = $(this.el).find(".val").val(),
        a = $(this.el).find('input[type="radio"]:checked').val(),
        this.trigger("valueChanged", {
            value: b,
            units: a
        })
    },
    onKeyPress: function(a) {
        return this._valueChanged()
    },
    onRadioChange: function(a) {
        var b;
        return b = $(a.currentTarget),
        this._valueChanged()
    }
}),
MultiTextWidget = Widget.extend({
    initialize: function(a, b) {
        return Widget.prototype.initialize.call(this, "multitext", a),
        this._data = {
            text: b
        }
    },
    events: {
        "keyup textarea": "onKeyPress"
    },
    setValue: function(a) {
        return this._data.text = a,
        $("textarea", this.el).val(a)
    },
    updateValue: function(a) {
        return this._data.text = a
    },
    onKeyPress: function(a) {
        var b;
        return b = $(a.currentTarget),
        this.trigger("valueChanged", b.val())
    }
}),
WysiWidget = Widget.extend({
    initialize: function(a, b) {
        return Widget.prototype.initialize.call(this, "tinymce", a),
        this._data = {
            text: b
        }
    },
    events: {
        "keyup textarea": "onKeyPress"
    },
    setValue: function(a) {
        return this._data.text = a,
        $("textarea", this.el).val(a)
    },
    updateValue: function(a) {
        return this._data.text = a
    },
    onKeyPress: function(a) {
        var b;
        return b = $(a.currentTarget),
        this.trigger("valueChanged", b.val())
    },
    onAttach: function() {
        var a, b;
        return b = this,
        a = this.el,
        tinyMCE.init({
            theme: "advanced",
            mode: "exact",
            valid_elements: "*[*]",
            elements: this.cid,
            plugins: "autolink,lists,spellchecker,pagebreak,style,layer,table,save,advhr,advimage,advlink,emotions,iespell,inlinepopups,contextmenu,paste,nonbreaking,xhtmlxtras,template",
            theme_advanced_buttons1: "bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull",
            theme_advanced_buttons2: "bullist,numlist,|,outdent,indent,blockquote",
            theme_advanced_buttons3: "undo,redo,|,link,unlink,anchor,image,code,|,forecolor,backcolor",
            theme_advanced_buttons4: "formatselect,fontselect,fontsizeselect",
            theme_advanced_toolbar_location: "top",
            theme_advanced_toolbar_align: "left",
            theme_advanced_statusbar_location: "bottom",
            theme_advanced_resizing: !0,
            verify_html: !1,
            width: "290",
            height: "350",
            oninit: function() {
                return window.App._views.propertyview.resize()
            },
            setup: function(a) {
                return a.onKeyUp.add(function(a, c) {
                    var d;
                    return d = a.getContent({
                        format: "raw"
                    }),
                    b.trigger("valueChanged", d)
                })
            },
            onchange_callback: function(a) {
                var c;
                return console.log("CHANGED", a),
                c = a.getContent({
                    format: "raw"
                }),
                b.trigger("valueChanged", c)
            }
        })
    }
}),
AceWidget = function(a) {
    function b() {
        return b.__super__.constructor.apply(this, arguments)
    }
    return __extends(b, a),
    b.prototype.initialize = function(a, b) {
        return Widget.prototype.initialize.call(this, "ace", a),
        this._data = {
            text: b
        }
    },
    b.prototype.setValue = function(a) {
        this.updateValue(a);
        if (this._editor) return this._editor.getSession().setValue(a)
    },
    b.prototype.updateValue = function(a) {
        return this._data.text = a
    },
    b.prototype.onAttach = function() {
        var a, b;
        return b = this,
        this._editor = ace.edit(this.cid),
        this._editor.setTheme("ace/theme/monokai"),
        a = require("ace/mode/html").Mode,
        this._editor.getSession().setMode(new a),
        this._editor.renderer.setShowPrintMargin(!1),
        this._editor.renderer.setHScrollBarAlwaysVisible(!1),
        this._editor.getSession().setValue(this._data.text),
        this._editor.focus(),
        this._editor.on("change",
        function() {
            var a;
            return a = b._editor.getSession().getValue(),
            b.updateValue(a),
            b.trigger("valueChanged", a)
        })
    },
    b
} (Widget),
UrlOrPageWidget = Widget.extend({
    initialize: function(a) {
        return Widget.prototype.initialize.call(this, "urlorpage", a)
    }
}),
ImageWidget = function(a) {
    function b() {
        return b.__super__.constructor.apply(this, arguments)
    }
    return __extends(b, a),
    b.prototype.initialize = function(a, b) {
        return Widget.prototype.initialize.call(this, "image", a),
        this._data = {
            text: b
        }
    },
    b.prototype.events = {
        "keyup input": "onKeyPress",
        "keydown input": "onKeyDown",
        "change select": "onSelectChanged"
    },
    b.prototype.setValue = function(a) {
        return this._data.text = a,
        $("input[type=text]", this.el).val(a)
    },
    b.prototype.updateValue = function(a) {
        return this._data.text = a
    },
    b.prototype.onUploadClicked = function(a) {
        var b, c;
        c = this,
        b = window.App.getLoadedApp();
        if (b) return filepicker.pick({
            services: ["COMPUTER", "URL", "DROPBOX", "GOOGLE_DRIVE", "IMAGE_SEARCH", "GITHUB", "BOX", "EVERNOTE", "FLICKR", "GMAIL", "INSTAGRAM", "FACEBOOK", "PICASA"]
        },
        function(a) {
            return filepicker.store(a,
            function(a) {
                var d;
                return d = new LightAsset,
                d.set(a),
                d.set("appid", b.id),
                d.save(null, {
                    success: function(a, d) {
                        $(".loading", c.el).addClass("hidden");
                        if (!d.success) return;
                        return b.get("assets").push(d),
                        c._loadAsset(a.get("s3_filename"))
                    },
                    error: function(a) {
                        return alert("Unable to upload file. Please try again later or contact support at support@codiqa.com. Sorry :(")
                    }
                })
            })
        });
        if (window.MODE === "tiny" && window.ORIGIN_DOMAIN) return filepicker.pick({
            services: ["COMPUTER", "URL", "DROPBOX", "GOOGLE_DRIVE", "IMAGE_SEARCH", "GITHUB", "BOX", "EVERNOTE", "FLICKR", "GMAIL", "INSTAGRAM", "FACEBOOK", "PICASA"]
        },
        function(a) {
            var b;
            return b = {
                path: "/" + window.ORIGIN_DOMAIN + "/" + a.key
            },
            filepicker.store(a, b,
            function(a) {
                var b;
                return b = new TinyCodiqaAsset,
                b.set(a),
                b.set("domain", window.ORIGIN_DOMAIN),
                b.save(null, {
                    success: function(a, b) {
                        var d, e;
                        $(".loading", c.el).addClass("hidden");
                        if (!b.success) return;
                        return e = localStorage.getItem("assets"),
                        e ? (d = JSON.parse(e), d.push(b)) : d = [b],
                        localStorage.setItem("assets", JSON.stringify(d)),
                        c._loadAsset(a.get("s3_filename"))
                    },
                    error: function(a) {
                        return alert("Unable to upload file. Please try again later or contact support at support@codiqa.com. Sorry :(")
                    }
                })
            })
        })
    },
    b.prototype.onKeyDown = function(a) {
        return (a.ctrlKey || a.metaKey) && a.which === 90 ? (window.App.undo(), !1) : (a.ctrlKey || a.metaKey) && a.which === 89 ? (window.App.redo(), !1) : !0
    },
    b.prototype.onSelectChanged = function(a) {
        var b, c;
        return b = $(a.currentTarget),
        b.val() === "UPLOAD" ? (this.onUploadClicked(a), this._lastOptionIndex = 0, b.get(0).selectedIndex = this._lastOptionIndex) : b.val() === "URL" ? (c = prompt(_t("Enter URL for image")), c ? this._loadAsset(c) : b.get(0).selectedIndex = this._lastOptionIndex) : this.trigger("valueChanged", b.val()),
        this._renderAssets()
    },
    b.prototype.onKeyPress = function(a) {
        var b;
        return b = $(a.currentTarget),
        this.trigger("valueChanged", b.val())
    },
    b.prototype.onAttach = function() {
        var a, b, c;
        c = this,
        a = void 0,
        b = this.$el.find("select"),
        b.select2({
            placeholder: "Choose image...",
            allowClear: !0,
            width: "element",
            minimumResultsForSearch: 99
        });
        if (window.MODE === "tiny" || window.App.getLoadedApp()) return this._renderAssets()
    },
    b.prototype._loadAsset = function(a) {
        var b, c;
        return c = this,
        b = new Image,
        b.onload = function() {
            var d, e;
            return e = b.width,
            d = b.height,
            c.trigger("dimensionsChanged", e, d),
            c.trigger("valueChanged", a),
            c._renderAssets()
        },
        b.src = a
    },
    b.prototype._renderAssets = function() {
        var a, b, c, d, e, f, g, h;
        h = this,
        g = $(this.el).find("select.assets"),
        $("option:not(.default)", g).remove(),
        d = !1,
        g.append('<option value="UPLOAD">Upload...</option>'),
        g.append('<option value="URL">From URL...</option>'),
        a = window.App.getLoadedApp(),
        a ? b = a.get("assets") : (f = localStorage.getItem("assets"), f && (b = JSON.parse(f)));
        if (b) {
            e = 0;
            while (e < b.length) c = b[e].s3_filename,
            c === this._data.text ? (d = !0, g.append('<option value="' + c + '" selected>' + b[e].filename + "</option>")) : g.append('<option value="' + c + '">' + b[e].filename + "</option>"),
            e++
        }
        return ! d && !$.trim(this._data.text) === "" && $('<option value="' + this._data.text + '" selected>' + this._data.text + "</option>").insertAfter(".default", g),
        this._lastOptionIndex = g.get(0).selectedIndex,
        g.select2("val", g.val()),
        console.log("ImageWidget _lastOptionIndex:", this._lastOptionIndex)
    },
    b
} (Widget),
ButtonWidget = Widget.extend({
    initialize: function(a) {
        return Widget.prototype.initialize.call(this, "button", new AcceptAllInputFilter),
        this._data = {
            text: a || _t("Choose")
        }
    },
    events: {
        "click button": "onButtonClicked"
    },
    onButtonClicked: function(a) {
        return this.trigger("buttonClicked")
    },
    updateValue: function(a) {
        return this.setValue(a)
    },
    setValue: function(a) {}
}),
ExternalImageWidget = ButtonWidget.extend({
    initialize: function(a) {
        return ButtonWidget.prototype.initialize.call(this, a),
        this._data = {
            text: _t("Choose...")
        }
    },
    onButtonClicked: function(a) {
        var b;
        b = window.Codiqa && window.Codiqa.onImageUrlRequested && window.Codiqa.onImageUrlRequested();
        if (typeof b == "string") return this.trigger("valueChanged", b)
    },
    updateValue: function(a) {
        return this.setValue(a)
    },
    setValue: function(a) {}
}),
SelectWidget = function(a) {
    function b() {
        return b.__super__.constructor.apply(this, arguments)
    }
    return __extends(b, a),
    b.prototype.initialize = function(a, c) {
        return b.__super__.initialize.call(this, "select", a),
        this._data = {
            options: c
        }
    },
    b.prototype.events = {
        "change select": "onValueChanged"
    },
    b.prototype.onValueChanged = function(a) {
        var b;
        return b = $(a.currentTarget),
        this.trigger("valueChanged", b.val())
    },
    b.prototype.setValue = function(a) {
        var b, c, d;
        d = [];
        for (b in this._data.options) c = this._data.options[b],
        c.selected = !1,
        c.value === a ? d.push(c.selected = !0) : d.push(void 0);
        return d
    },
    b.prototype.updateValue = function(a) {
        return this.setValue(a)
    },
    b
} (Widget),
AddItemWidget = Widget.extend({
    initialize: function(a) {
        return Widget.prototype.initialize.call(this, "additem", new AcceptAllInputFilter),
        this._data = {
            buttons: a
        }
    },
    events: {
        "click button": "onButtonClicked"
    },
    onButtonClicked: function(a) {
        var b, c;
        return b = $(a.currentTarget),
        c = b.data("type"),
        this.trigger("addItem", {
            type: c
        }),
        !1
    }
}),
Handlebars.registerHelper("listitems_render",
function(a, b) {
    var c, d, e, f, g, h, i, j, k, l, m, n;
    f = [],
    d = 0;
    while (d < a.length) e = a[d],
    h = new UrlOrPageSelectWidget,
    h.setValue(e.url),
    h.render(),
    g = $(h.el).html(),
    m = new TransitionSelectWidget,
    m.setValue(e.transition),
    m.render(),
    l = $(m.el).html(),
    n = new ThemeSelectWidget,
    n.setValue(e.theme),
    n.render(),
    k = $(n.el).html(),
    j = "#sub-template-widget-listitems",
    i = Handlebars.compile($(j).html()),
    c = i($.extend({
        pageSelect: g,
        transitionSelect: l,
        themeSelect: k
    },
    e)),
    f.push(c),
    d++;
    return f.join("")
}),
ListItemWidget = function(a) {
    function b() {
        return b.__super__.constructor.apply(this, arguments)
    }
    return __extends(b, a),
    b.prototype.initialize = function(a) {
        return b.__super__.initialize.call(this, "listitems", a),
        this._data = {
            items: []
        }
    },
    b.prototype.events = function() {
        return _.extend({},
        ItemPropertyWidget.prototype.events, {
            "click .add-button": "onItemAdded",
            "click .add-divider": "onDividerItemAdded",
            "keyup input.text": "onButtonTextChanged",
            "keyup input.count": "onButtonCountChanged",
            "change select.themes": "onThemeChanged",
            "change select.pages": "onPageChanged",
            "change select.transitions": "onTransitionChanged"
        })
    },
    b.prototype.onPageChanged = function(a) {
        var b, c, d, e;
        return c = $(a.currentTarget),
        d = c.closest(".fg-collapsible"),
        b = $(d).index(),
        console.log("Changing page for button", b),
        c.val() === "URL" && (e = prompt(_t('Enter URL for button (tip: try tel:NUMBER to make a "Click to Call" button)')), e ? (c.find("option:not(.page)").remove(), c.append('<option value="' + e + '" selected>' + e + "</option>").append('<option value="URL">' + _t("URL") + "...</option>"), c.select2("val", e)) : this._data && this._data.items && this._data.items.length >= b + 1 && c.select2("val", this._data.items[b].url)),
        this._changed(b, d)
    },
    b.prototype.onTransitionChanged = function(a) {
        var b, c, d;
        return c = $(a.currentTarget),
        d = c.closest(".fg-collapsible"),
        b = $(d).index(),
        console.log("Changing page for button", b),
        this._changed(b, d)
    },
    b.prototype.onButtonTextChanged = function(a) {
        var b, c, d, e;
        return c = $(a.currentTarget),
        d = c.closest(".fg-collapsible"),
        b = $(d).index(),
        console.log("Changing text for button", b),
        e = $("h3 span", d),
        $("h3 .heading", d).html(c.val()),
        this._changed(b, d)
    },
    b.prototype.onButtonCountChanged = function(a) {
        var b, c, d;
        return c = $(a.currentTarget),
        d = c.closest(".fg-collapsible"),
        b = $(d).index(),
        this._changed(b, d)
    },
    b.prototype.onThemeChanged = function(a) {
        var b, c, d;
        return c = $(a.currentTarget),
        d = c.closest(".fg-collapsible"),
        b = $(d).index(),
        this._changed(b, d)
    },
    b.prototype._changed = function(a, b) {
        var c, d, e, f, g, h;
        return d = b.data("isdivider") === !0,
        f = $("input.text", b).val(),
        c = $("input.count", b).val(),
        e = $("select.pages", b).val(),
        g = $("select.themes", b).val(),
        h = $("select.transitions", b).val(),
        this.trigger("itemChanged", a, {
            isDivider: d,
            text: f,
            count: c !== "" ? c: null,
            url: e,
            transition: h,
            theme: g
        })
    },
    b.prototype.onItemAdded = function(a) {
        var b, c, d, e;
        return b = $("select.pages", this.el).val(),
        c = $("input[type=text]", this.el).val(),
        d = $("select.themes", this.el).val(),
        e = $("select.transitions", this.el).val(),
        d === "" && (d = "c"),
        this.trigger("itemAdded", {
            text: "Button",
            url: b,
            transition: e,
            icon: "",
            theme: d,
            isDivider: !1
        })
    },
    b.prototype.onDividerItemAdded = function(a) {
        var b, c;
        return b = $("input[type=text]", this.el).val(),
        c = $("select.themes", this.el).val(),
        c === "" && (c = "b"),
        this.trigger("itemAdded", {
            isDivider: !0,
            text: "Divider",
            theme: c
        })
    },
    b.prototype.onItemRemoved = function(a) {
        var b, c, d;
        return c = $(a.currentTarget),
        d = c.closest(".fg-collapsible"),
        b = $(d).index(),
        console.log("Deleting button", b),
        this.trigger("itemDeleted", b),
        d.remove()
    },
    b.prototype.updateValue = function(a) {
        return this._data.items = a
    },
    b.prototype.setValue = function(a) {
        return this._data.items = a
    },
    b.prototype.render = function(a) {
        var b, c, d, e;
        return e = "#template-widget-" + this._template,
        d = Handlebars.compile($(e).html()),
        b = d($.extend(this._data, {
            _property_title: a
        })),
        c = this,
        $(this.el).html(b),
        $(".fg-accordion.sortable", this.el).accordion({
            active: ":last",
            autoHeight: !1,
            animated: !1,
            collapsible: !0,
            clearStyle: !0,
            header: "> div > h3",
            icons: {
                header: "bui-icon bui-icon-plus",
                headerSelected: "bui-icon bui-icon-minus"
            },
            create: function(a, b) {
                return $('input[type="text"]:last', b.newContent).focus()
            },
            change: function(a, b) {
                return $('input[type="text"]', b.newContent).focus(),
                window.App.getPropertyView().resize()
            }
        }).sortable({
            axis: "y",
            handle: "h3",
            tolerance: "pointer",
            start: function(a, b) {
                var c;
                return c = b.item.index(),
                b.item.data("contentDragStart", c)
            },
            change: function(a, b) {
                var c;
                return c = b.item.index()
            },
            stop: function(a, b) {
                var d, e;
                return $(this).data("_stop", !0),
                e = b.item.data("contentDragStart"),
                d = b.item.index(),
                c.trigger("itemMoved", e, d)
            }
        }),
        $(".fg-collapsible.sortable h3").click(function(a) {
            var b;
            b = $(this).closest(".fg-collapsible.sortable");
            if (b.data("_stop") === !0) return a.stopImmediatePropagation(),
            a.preventDefault(),
            b.data("_stop", !1)
        }),
        this.delegateEvents()
    },
    b
} (ItemPropertyWidget),
PanelListItemWidget = function(a) {
    function b() {
        return b.__super__.constructor.apply(this, arguments)
    }
    return __extends(b, a),
    b.prototype.initialize = function(a) {
        return b.__super__.initialize.call(this, "panellistitems", a),
        this._data = {
            items: []
        }
    },
    b.prototype.onItemAdded = function(a) {
        var b, c, d, e;
        return b = $("select.pages", this.el).val(),
        c = $("input[type=text]", this.el).val(),
        d = $("select.themes", this.el).val(),
        e = $("select.transitions", this.el).val(),
        d === "" && (d = "a"),
        this.trigger("itemAdded", {
            text: "Button",
            url: b,
            transition: e,
            icon: "",
            theme: d,
            isDivider: !1
        })
    },
    b
} (ListItemWidget),
Handlebars.registerHelper("tabbartems_render",
function(a, b) {
    var c, d, e, f, g, h, i, j, k, l, m, n;
    h = [],
    d = 0;
    while (d < a.length) g = a[d],
    j = new PageSelectWidget(null, !0),
    j.setValue(g.url),
    j.render(),
    i = $(j.el).html(),
    f = new IconSelectWidget(IconSelectWidget.ICON_ONLY),
    f.setValue(g.icon),
    f.render(),
    e = $(f.el).html(),
    n = new TransitionSelectWidget,
    n.setValue(g.transition),
    n.render(),
    m = $(n.el).html(),
    l = "#sub-template-widget-tabbaritems",
    k = Handlebars.compile($(l).html()),
    c = k($.extend({
        iconSelect: e,
        pageSelect: i,
        transitionSelect: m
    },
    g)),
    h.push(c),
    d++;
    return h.join("")
}),
TabBarItemsWidget = function(a) {
    function b() {
        return b.__super__.constructor.apply(this, arguments)
    }
    return __extends(b, a),
    b.prototype.initialize = function(a) {
        return Widget.prototype.initialize.call(this, "tabbaritems", a),
        this._data = {
            items: []
        }
    },
    b.prototype.events = function() {
        return _.extend({},
        ItemPropertyWidget.prototype.events, {
            "click .add": "onItemAdded",
            "keyup input": "onButtonTextChanged",
            "change select.icons": "onIconChanged",
            "change select.pages": "onPageChanged",
            "change select.transitions": "onTransitionChanged"
        })
    },
    b.prototype.onIconChanged = function(a) {
        var b, c, d;
        return c = $(a.currentTarget),
        d = c.closest(".fg-collapsible"),
        b = $(d).index(),
        console.log("Changing icon for button", b),
        this._changed(b, d)
    },
    b.prototype.onTransitionChanged = function(a) {
        var b, c, d;
        return c = $(a.currentTarget),
        d = c.closest(".fg-collapsible"),
        b = $(d).index(),
        console.log("Changing page for button", b),
        this._changed(b, d)
    },
    b.prototype.onPageChanged = function(a) {
        var b, c, d;
        return c = $(a.currentTarget),
        d = c.closest(".fg-collapsible"),
        b = $(d).index(),
        console.log("Changing page for button", b),
        this._changed(b, d)
    },
    b.prototype.onButtonTextChanged = function(a) {
        var b, c, d, e;
        return c = $(a.currentTarget),
        d = c.closest(".fg-collapsible"),
        b = $(d).index(),
        console.log("Changing text for button", b),
        e = $("h3 span", d),
        $("h3 .heading", d).html(c.val()),
        this._changed(b, d)
    },
    b.prototype._changed = function(a, b) {
        var c, d, e, f;
        return e = $("input", b).val(),
        c = $("select.icons", b).val(),
        d = $("select.pages", b).val(),
        f = $("select.transitions", b).val(),
        this.trigger("itemChanged", a, {
            text: e,
            icon: c,
            url: d,
            transition: f
        })
    },
    b.prototype.onItemAdded = function(a) {
        return this.trigger("itemAdded", {
            text: "Button",
            url: window.App && window.App.getCurrentPageId() || "",
            icon: "",
            transition: "fade"
        })
    },
    b.prototype.onItemRemoved = function(a) {
        var b, c, d;
        return c = $(a.currentTarget),
        d = c.closest(".fg-collapsible"),
        b = $(d).index(),
        console.log("Deleting button", b),
        this.trigger("itemDeleted", b),
        d.remove()
    },
    b.prototype.updateValue = function(a) {
        return this._data.items = a
    },
    b.prototype.setValue = function(a) {
        return this._data.items = a
    },
    b.prototype.render = function(a) {
        var b, c, d, e;
        return e = "#template-widget-" + this._template,
        d = Handlebars.compile($(e).html()),
        b = d($.extend(this._data, {
            _property_title: a
        })),
        c = this,
        $(this.el).html(b),
        $(".fg-accordion.sortable", this.el).accordion({
            active: ":last",
            autoHeight: !1,
            animated: !1,
            collapsible: !0,
            clearStyle: !0,
            header: "> div > h3",
            icons: {
                header: "bui-icon bui-icon-plus",
                headerSelected: "bui-icon bui-icon-minus"
            },
            create: function(a, b) {
                return $('input[type="text"]:last', b.newContent).focus()
            },
            change: function(a, b) {
                return $('input[type="text"]', b.newContent).focus(),
                window.App.getPropertyView().resize()
            }
        }).sortable({
            axis: "y",
            handle: "h3",
            tolerance: "pointer",
            start: function(a, b) {
                var c;
                return c = b.item.index(),
                b.item.data("contentDragStart", c)
            },
            change: function(a, b) {
                var c;
                return c = b.item.index()
            },
            stop: function(a, b) {
                var d, e;
                return $(this).data("_stop", !0),
                e = b.item.data("contentDragStart"),
                d = b.item.index(),
                c.trigger("itemMoved", e, d)
            }
        }),
        $(".fg-collapsible.sortable h3").click(function(a) {
            var b;
            b = $(this).closest(".fg-collapsible.sortable");
            if (b.data("_stop") === !0) return a.stopImmediatePropagation(),
            a.preventDefault(),
            b.data("_stop", !1)
        }),
        this.delegateEvents()
    },
    b
} (ItemPropertyWidget),
Handlebars.registerHelper("buttonlistitems_render",
function(a, b) {
    var c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r;
    j = [],
    d = 0;
    while (d < a.length) i = a[d],
    l = new PageSelectWidget,
    l.setValue(i.url),
    l.render(),
    k = $(l.el).html(),
    h = new IconSelectWidget(IconSelectWidget.ICON_ONLY),
    h.setValue(i.icon),
    h.render(),
    f = $(h.el).html(),
    r = new ThemeSelectWidget,
    r.setValue(i.theme),
    r.render(),
    o = $(r.el).html(),
    q = new TransitionSelectWidget,
    q.setValue(i.transition),
    q.render(),
    p = $(q.el).html(),
    e = new SelectWidget(new AcceptAllInputFilter, [{
        value: !1,
        text: _t("No")
    },
    {
        value: !0,
        text: _t("Yes")
    }]),
    e.setValue(i.isActive === "true"),
    e.render(),
    g = $(e.el).html(),
    n = "#sub-template-widget-buttonlistitems",
    m = Handlebars.compile($(n).html()),
    c = m($.extend({
        iconSelect: f,
        pageSelect: k,
        themeSelect: o,
        isActiveSelect: g,
        transitionSelect: p
    },
    i)),
    j.push(c),
    d++;
    return j.join("")
}),
ButtonListItemWidget = function(a) {
    function b() {
        return b.__super__.constructor.apply(this, arguments)
    }
    return __extends(b, a),
    b.prototype.initialize = function(a) {
        return Widget.prototype.initialize.call(this, "buttonlistitems", a),
        this._data = {
            items: []
        }
    },
    b.prototype.events = function() {
        return _.extend({},
        ItemPropertyWidget.prototype.events, {
            "click .add": "onItemAdded",
            "keyup input": "onButtonTextChanged",
            "click .radio": "onAlignChanged",
            "change select.icons": "onIconChanged",
            "change select.pages": "onPageChanged",
            "change select.themes": "onThemeChanged",
            "change select.transitions": "onTransitionChanged",
            "change .isActive select": "onIsActiveChanged"
        })
    },
    b.prototype.onIconChanged = function(a) {
        var b, c, d;
        return c = $(a.currentTarget),
        d = c.closest(".fg-collapsible"),
        b = $(d).index(),
        console.log("Changing icon for button", b),
        this._changed(b, d)
    },
    b.prototype.onTransitionChanged = function(a) {
        var b, c, d;
        return c = $(a.currentTarget),
        d = c.closest(".fg-collapsible"),
        b = $(d).index(),
        this._changed(b, d)
    },
    b.prototype.onPageChanged = function(a) {
        var b, c, d;
        return c = $(a.currentTarget),
        d = c.closest(".fg-collapsible"),
        b = $(d).index(),
        console.log("Changing page for button", b),
        this._changed(b, d)
    },
    b.prototype.onThemeChanged = function(a) {
        var b, c, d;
        return c = $(a.currentTarget),
        d = c.closest(".fg-collapsible"),
        b = $(d).index(),
        console.log("Changing page for button", b),
        this._changed(b, d)
    },
    b.prototype.onIsActiveChanged = function(a) {
        var b, c, d;
        return c = $(a.currentTarget),
        d = c.closest(".fg-collapsible"),
        b = $(d).index(),
        this._changed(b, d)
    },
    b.prototype.onAlignChanged = function(a) {
        var b, c, d;
        return c = $(a.currentTarget),
        d = c.closest(".fg-collapsible"),
        b = $(d).index(),
        console.log("Changing icon alignment for button", b),
        this._changed(b, d)
    },
    b.prototype.onButtonTextChanged = function(a) {
        var b, c, d, e;
        return c = $(a.currentTarget),
        d = c.closest(".fg-collapsible"),
        b = $(d).index(),
        console.log("Changing text for button", b),
        e = $("h3 span", d),
        $("h3 .heading", d).html(c.val()),
        this._changed(b, d)
    },
    b.prototype._changed = function(a, b) {
        var c, d, e, f, g, h, i;
        return g = $("input", b).val(),
        c = $("select.icons", b).val(),
        d = $(".radio.selected", b).data("align"),
        e = $(".isActive select", b).val(),
        f = $("select.pages", b).val(),
        h = $("select.themes", b).val(),
        e = $(".isActive select", b).val(),
        i = $("select.transitions", b).val(),
        this.trigger("itemChanged", a, {
            text: g,
            icon: c,
            align: d,
            url: f,
            theme: h,
            isActive: e,
            transition: i
        })
    },
    b.prototype.onItemAdded = function(a) {
        return this.trigger("itemAdded", {
            text: "Button",
            url: window.App && window.App.getCurrentPageId() || "",
            icon: "",
            theme: "",
            isActive: !1,
            transition: "fade"
        })
    },
    b.prototype.onItemRemoved = function(a) {
        var b, c, d;
        return c = $(a.currentTarget),
        d = c.closest(".fg-collapsible"),
        b = $(d).index(),
        console.log("Deleting button", b),
        this.trigger("itemDeleted", b),
        d.remove()
    },
    b.prototype.updateValue = function(a) {
        return this._data.items = a
    },
    b.prototype.setValue = function(a) {
        return this._data.items = a
    },
    b.prototype.render = function(a) {
        var b, c, d, e;
        return e = "#template-widget-" + this._template,
        d = Handlebars.compile($(e).html()),
        b = d($.extend(this._data, {
            _property_title: a
        })),
        c = this,
        $(this.el).html(b),
        $(".fg-accordion.sortable", this.el).accordion({
            active: ":last",
            autoHeight: !1,
            animated: !1,
            collapsible: !0,
            clearStyle: !0,
            header: "> div > h3",
            icons: {
                header: "bui-icon bui-icon-plus",
                headerSelected: "bui-icon bui-icon-minus"
            },
            create: function(a, b) {
                return $('input[type="text"]:last', b.newContent).focus()
            },
            change: function(a, b) {
                return $('input[type="text"]', b.newContent).focus(),
                window.App.getPropertyView().resize()
            }
        }).sortable({
            axis: "y",
            handle: "h3",
            tolerance: "pointer",
            start: function(a, b) {
                var c;
                return c = b.item.index(),
                b.item.data("contentDragStart", c)
            },
            change: function(a, b) {
                var c;
                return c = b.item.index()
            },
            stop: function(a, b) {
                var d, e;
                return $(this).data("_stop", !0),
                e = b.item.data("contentDragStart"),
                d = b.item.index(),
                c.trigger("itemMoved", e, d)
            }
        }),
        $(".fg-collapsible.sortable h3").click(function(a) {
            var b;
            b = $(this).closest(".fg-collapsible.sortable");
            if (b.data("_stop") === !0) return a.stopImmediatePropagation(),
            a.preventDefault(),
            b.data("_stop", !1)
        }),
        this.delegateEvents()
    },
    b
} (ItemPropertyWidget),
Handlebars.registerHelper("radioitems_render",
function(a, b) {
    var c, d, e, f, g, h, i, j;
    f = [],
    d = 0;
    while (d < a.length) e = a[d],
    j = new ThemeSelectWidget,
    j.setValue(e.theme),
    j.render(),
    i = $(j.el).html(),
    h = "#sub-template-widget-radioitems",
    g = Handlebars.compile($(h).html()),
    c = g($.extend({
        themeSelect: i
    },
    e)),
    f.push(c),
    d++;
    return f.join("")
}),
RadioItemsWidget = function(a) {
    function b() {
        return b.__super__.constructor.apply(this, arguments)
    }
    return __extends(b, a),
    b.prototype.initialize = function(a, b) {
        return Widget.prototype.initialize.call(this, "radioitems", a),
        this._data = {
            items: [],
            newTitle: b || _t("New button")
        }
    },
    b.prototype.events = function() {
        return _.extend({},
        ItemPropertyWidget.prototype.events, {
            "click .add": "onItemAdded",
            "keyup input.key": "onButtonTextChanged",
            "keyup input.value": "onButtonValueChanged",
            "change select": "onButtonThemeChanged"
        })
    },
    b.prototype.onButtonTextChanged = function(a) {
        var b, c, d;
        return c = $(a.currentTarget),
        d = c.closest(".fg-collapsible"),
        b = $(d).index(),
        console.log("Changing text for button", b),
        $("h3 .heading", d).html(c.val()),
        this._changed(b, d)
    },
    b.prototype.onButtonValueChanged = function(a) {
        var b, c, d;
        return c = $(a.currentTarget),
        d = c.closest(".fg-collapsible"),
        b = $(d).index(),
        this._changed(b, d)
    },
    b.prototype.onButtonThemeChanged = function(a) {
        var b, c, d;
        return c = $(a.currentTarget),
        d = c.closest(".fg-collapsible"),
        b = $(d).index(),
        this._changed(b, d)
    },
    b.prototype._changed = function(a, b) {
        var c, d, e, f;
        return c = this._data.items[a],
        d = $("input.key", b).val(),
        f = $("input.value", b).val(),
        e = $("select", b).val(),
        c.text = d,
        c.value = f,
        c.theme = e,
        this.trigger("itemChanged", a, c)
    },
    b.prototype.onItemAdded = function(a) {
        var b;
        return b = {
            text: "Option"
        },
        this.trigger("itemAdded", b)
    },
    b.prototype.onItemRemoved = function(a) {
        var b, c, d;
        return c = $(a.currentTarget),
        d = c.closest(".fg-collapsible"),
        b = $(d).index(),
        console.log("Deleting button", b),
        this.trigger("itemDeleted", b),
        d.remove()
    },
    b.prototype.updateValue = function(a) {
        return this._data.items = a
    },
    b.prototype.setValue = function(a) {
        return this._data.items = a
    },
    b.prototype.render = function(a) {
        var b, c, d, e;
        return e = "#template-widget-" + this._template,
        d = Handlebars.compile($(e).html()),
        b = d($.extend(this._data, {
            _property_title: a
        })),
        c = this,
        $(this.el).html(b),
        $(".fg-accordion.sortable", this.el).accordion({
            active: ":last",
            autoHeight: !1,
            animated: !1,
            collapsible: !0,
            clearStyle: !0,
            header: "> div > h3",
            icons: {
                header: "bui-icon bui-icon-plus",
                headerSelected: "bui-icon bui-icon-minus"
            },
            create: function(a, b) {
                return $('input[type="text"]', b.newContent).focus()
            },
            change: function(a, b) {
                return $('input[type="text"]', b.newContent).focus(),
                window.App.getPropertyView().resize()
            }
        }).sortable({
            axis: "y",
            handle: "h3",
            tolerance: "pointer",
            start: function(a, b) {
                var c;
                return c = b.item.index(),
                b.item.data("contentDragStart", c)
            },
            change: function(a, b) {
                var c;
                return c = b.item.index()
            },
            stop: function(a, b) {
                var d, e;
                return $(this).data("_stop", !0),
                e = b.item.data("contentDragStart"),
                d = b.item.index(),
                c.trigger("itemMoved", e, d)
            }
        }),
        $(".fg-collapsible.sortable h3").click(function(a) {
            var b;
            b = $(this).closest(".fg-collapsible.sortable");
            if (b.data("_stop") === !0) return a.stopImmediatePropagation(),
            a.preventDefault(),
            b.data("_stop", !1)
        }),
        this.delegateEvents()
    },
    b
} (ItemPropertyWidget),
Handlebars.registerHelper("checkboxitems_render",
function(a, b) {
    var c, d, e, f, g, h, i, j;
    f = [],
    d = 0;
    while (d < a.length) e = a[d],
    j = new ThemeSelectWidget,
    j.setValue(e.theme),
    j.render(),
    i = $(j.el).html(),
    h = "#sub-template-widget-checkboxitems",
    g = Handlebars.compile($(h).html()),
    c = g($.extend({
        themeSelect: i
    },
    e)),
    f.push(c),
    d++;
    return f.join("")
}),
CheckboxItemsWidget = function(a) {
    function b() {
        return b.__super__.constructor.apply(this, arguments)
    }
    return __extends(b, a),
    b.prototype.initialize = function(a) {
        return Widget.prototype.initialize.call(this, "checkboxitems", a),
        this._data = {
            items: []
        }
    },
    b.prototype.events = function() {
        return _.extend({},
        ItemPropertyWidget.prototype.events, {
            "click .add": "onItemAdded",
            "keyup input.text": "onButtonTextChanged",
            "keyup input.name": "onButtonNameChanged",
            "change select": "onButtonThemeChanged"
        })
    },
    b.prototype.onButtonNameChanged = function(a) {
        var b, c, d;
        return c = $(a.currentTarget),
        d = c.closest(".fg-collapsible"),
        b = $(d).index(),
        this._changed(b, d)
    },
    b.prototype.onButtonTextChanged = function(a) {
        var b, c, d, e;
        return c = $(a.currentTarget),
        d = c.closest(".fg-collapsible"),
        b = $(d).index(),
        console.log("Changing text for button", b),
        e = $("h3 span", d),
        $("h3 .heading", d).html(c.val()),
        this._changed(b, d)
    },
    b.prototype.onButtonThemeChanged = function(a) {
        var b, c, d;
        return c = $(a.currentTarget),
        d = c.closest(".fg-collapsible"),
        b = $(d).index(),
        this._changed(b, d)
    },
    b.prototype._changed = function(a, b) {
        var c, d, e, f;
        return c = this._data.items[a],
        d = $("input.name", b).val(),
        e = $("input.text", b).val(),
        f = $("select", b).val(),
        c.text = e,
        c.name = d,
        c.theme = f,
        this.trigger("itemChanged", a, c)
    },
    b.prototype.onItemAdded = function(a) {
        var b;
        return b = {
            text: _t("Checkbox"),
            name: ""
        },
        this.trigger("itemAdded", b)
    },
    b.prototype.onItemRemoved = function(a) {
        var b, c, d;
        return c = $(a.currentTarget),
        d = c.closest(".fg-collapsible"),
        b = $(d).index(),
        console.log("Deleting button", b),
        this.trigger("itemDeleted", b),
        d.remove()
    },
    b.prototype.updateValue = function(a) {
        return this._data.items = a
    },
    b.prototype.setValue = function(a) {
        return this._data.items = a
    },
    b.prototype.render = function(a) {
        var b, c, d, e;
        return e = "#template-widget-" + this._template,
        d = Handlebars.compile($(e).html()),
        b = d($.extend(this._data, {
            _property_title: a
        })),
        c = this,
        $(this.el).html(b),
        $(".fg-accordion.sortable", this.el).accordion({
            active: ":last",
            autoHeight: !1,
            animated: !1,
            collapsible: !0,
            clearStyle: !0,
            header: "> div > h3",
            icons: {
                header: "bui-icon bui-icon-plus",
                headerSelected: "bui-icon bui-icon-minus"
            },
            create: function(a, b) {
                return $('input[type="text"]', b.newContent).focus()
            },
            change: function(a, b) {
                return $('input[type="text"]', b.newContent).focus(),
                window.App.getPropertyView().resize()
            }
        }).sortable({
            axis: "y",
            handle: "h3",
            tolerance: "pointer",
            start: function(a, b) {
                var c;
                return c = b.item.index(),
                b.item.data("contentDragStart", c)
            },
            change: function(a, b) {
                var c;
                return c = b.item.index()
            },
            stop: function(a, b) {
                var d, e;
                return $(this).data("_stop", !0),
                e = b.item.data("contentDragStart"),
                d = b.item.index(),
                c.trigger("itemMoved", e, d)
            }
        }),
        $(".fg-collapsible.sortable h3").click(function(a) {
            var b;
            b = $(this).closest(".fg-collapsible.sortable");
            if (b.data("_stop") === !0) return a.stopImmediatePropagation(),
            a.preventDefault(),
            b.data("_stop", !1)
        }),
        this.delegateEvents()
    },
    b
} (ItemPropertyWidget),
Handlebars.registerHelper("collapsiblesections_render",
function(a, b) {
    var c, d, e, f, g, h, i, j;
    h = [],
    d = 0;
    while (d < a.length) g = a[d],
    f = new SelectWidget(new AcceptAllInputFilter, [{
        value: "false",
        text: _t("No")
    },
    {
        value: "true",
        text: _t("Yes")
    }]),
    f.setValue(g.isCollapsed),
    f.render(),
    e = $(f.el).html(),
    j = "#sub-template-widget-collapsiblesections",
    i = Handlebars.compile($(j).html()),
    c = i($.extend({
        isCollapsedSelect: e
    },
    g)),
    h.push(c),
    d++;
    return h.join("")
}),
AccordionSectionItemWidget = function(a) {
    function b() {
        return b.__super__.constructor.apply(this, arguments)
    }
    return __extends(b, a),
    b.prototype.initialize = function(a) {
        return Widget.prototype.initialize.call(this, "collapsiblesections", a),
        this._data = {
            items: []
        }
    },
    b.prototype.events = function() {
        return _.extend({},
        ItemPropertyWidget.prototype.events, {
            "click .add": "onItemAdded",
            "keyup input.text": "onButtonTextChanged",
            "keyup input.id": "onButtonIdChanged",
            "change .is-collapsed select": "onCollapsedChanged"
        })
    },
    b.prototype.onButtonIdChanged = function(a) {
        var b, c, d;
        return c = $(a.currentTarget),
        d = c.closest(".fg-collapsible"),
        b = $(d).index(),
        console.log("Changing id for button", b),
        this._changed(b, d)
    },
    b.prototype.onButtonTextChanged = function(a) {
        var b, c, d, e;
        return c = $(a.currentTarget),
        d = c.closest(".fg-collapsible"),
        b = $(d).index(),
        console.log("Changing text for button", b),
        e = $("h3 span", d),
        $("h3", d).html("").append(e).append(c.val()),
        this._changed(b, d)
    },
    b.prototype.onCollapsedChanged = function(a) {
        var b, c, d;
        return c = $(a.currentTarget),
        d = c.closest(".fg-collapsible"),
        b = $(d).index(),
        this._changed(b, d)
    },
    b.prototype._changed = function(a, b) {
        var c, d, e, f;
        return e = this._data.items[a],
        f = $("input.text", b).val(),
        c = $("input.id", b).val(),
        d = $(".is-collapsed select", b).val(),
        e.text = f,
        e.isCollapsed = d,
        e.id = c,
        this.trigger("itemChanged", a, e)
    },
    b.prototype.onItemAdded = function(a) {
        var b;
        return b = {
            text: _t("Section Header"),
            isCollapsed: "false"
        },
        this.trigger("itemAdded", b)
    },
    b.prototype.onItemRemoved = function(a) {
        var b, c, d;
        return c = $(a.currentTarget),
        d = c.closest(".fg-collapsible"),
        b = $(d).index(),
        console.log("Deleting button", b),
        this.trigger("itemDeleted", b),
        d.remove()
    },
    b.prototype.updateValue = function(a) {
        return this._data.items = a
    },
    b.prototype.setValue = function(a) {
        return this._data.items = a
    },
    b.prototype.render = function(a) {
        var b, c, d, e;
        return e = "#template-widget-" + this._template,
        d = Handlebars.compile($(e).html()),
        b = d($.extend(this._data, {
            _property_title: a
        })),
        c = this,
        $(this.el).html(b),
        $(".fg-accordion.sortable", this.el).accordion({
            active: ":last",
            autoHeight: !1,
            animated: !1,
            collapsible: !0,
            clearStyle: !0,
            header: "> div > h3",
            icons: {
                header: "bui-icon bui-icon-plus",
                headerSelected: "bui-icon bui-icon-minus"
            },
            create: function(a, b) {
                return $('input[type="text"]', b.newContent).focus()
            },
            change: function(a, b) {
                return $('input[type="text"]', b.newContent).focus(),
                window.App.getPropertyView().resize()
            }
        }).sortable({
            axis: "y",
            handle: "h3",
            tolerance: "pointer",
            start: function(a, b) {
                var c;
                return c = b.item.index(),
                b.item.data("contentDragStart", c)
            },
            change: function(a, b) {
                var c;
                return c = b.item.index()
            },
            stop: function(a, b) {
                var d, e;
                return $(this).data("_stop", !0),
                e = b.item.data("contentDragStart"),
                d = b.item.index(),
                c.trigger("itemMoved", e, d)
            }
        }),
        $(".fg-collapsible.sortable h3").click(function(a) {
            var b;
            b = $(this).closest(".fg-collapsible.sortable");
            if (b.data("_stop") === !0) return a.stopImmediatePropagation(),
            a.preventDefault(),
            b.data("_stop", !1)
        }),
        this.delegateEvents()
    },
    b
} (ItemPropertyWidget),
PageSelectWidget = Widget.extend({
    render: function(a) {
        var b, c, d;
        d = window.App.getPages(),
        this._data.pages = [],
        this._allowEmpty && this._data.pages.push({
            key: "",
            value: "",
            selected: !0
        }),
        b = 0;
        while (b < d.length) c = d[b],
        c.getId() === this._selectedPage ? this._data.pages.push({
            key: c.title.getValue(),
            value: c.getId(),
            selected: !0
        }) : this._data.pages.push({
            key: c.title.getValue(),
            value: c.getId(),
            selected: !1
        }),
        b++;
        return Widget.prototype.render.call(this, a)
    },
    initialize: function(a, b) {
        var c;
        return c = this,
        Widget.prototype.initialize.call(this, "pageselect", a),
        this._allowEmpty = b,
        c._selectedPage = null
    },
    events: {
        "change select": "onValueChanged"
    },
    onValueChanged: function(a) {
        var b, c;
        return b = $(a.currentTarget),
        b.val() === "__codiqa__new__" ? (c = this, window.App.promptForNewPage(function(a) {
            return c._selectedPage = a,
            c.trigger("valueChanged", a.getId())
        })) : this.trigger("valueChanged", b.val())
    },
    setValue: function(a) {
        return this._selectedPage = a,
        console.log(a)
    },
    updateValue: function(a) {
        return this.setValue(a)
    }
}),
UrlOrPageSelectWidget = function(a) {
    function b() {
        return b.__super__.constructor.apply(this, arguments)
    }
    return __extends(b, a),
    b.prototype.render = function(a) {
        var b, c, d, e;
        e = window.App.getPages(),
        b = !1,
        this._data.blankDefault = this.blankDefault,
        this._data.pages = [],
        c = 0;
        while (c < e.length) d = e[c],
        d.getId() === this._selectedPage || "#" + d.getId() === this._selectedPage ? (b = !0, this._data.pages.push({
            key: d.title.getValue(),
            value: d.getId(),
            selected: !0
        })) : this._data.pages.push({
            key: d.title.getValue(),
            value: d.getId(),
            selected: !1
        }),
        c++;
        return Widget.prototype.render.call(this, a),
        $(this.el).find("option:not(.page, .blank)").remove(),
        !b && this._selectedPage && $(this.el).find("select").append('<option value="' + this._selectedPage + '" selected>' + this._selectedPage + "</option>"),
        $(this.el).find("select").append('<option value="URL">' + _t("URL") + "...</option>")
    },
    b.prototype.initialize = function(a, b) {
        var c;
        return c = this,
        Widget.prototype.initialize.call(this, "pageselect", a),
        this.blankDefault = b,
        c._selectedPage = null
    },
    b.prototype.events = {
        "change select": "onValueChanged"
    },
    b.prototype.onValueChanged = function(a) {
        var b, c;
        b = $(a.currentTarget);
        if (b.val() !== "URL") return c = b.val(),
        c.indexOf(".") === -1 && (c = "#" + c),
        this.trigger("valueChanged", c);
        c = prompt(_t('Enter URL for button (tip: try tel:NUMBER to make a "Click to Call" button)'));
        if (c) return this.trigger("valueChanged", c),
        b.find("option:not(.page)").remove(),
        b.append('<option value="' + c + '" selected>' + c + "</option>").append('<option value="URL">' + _t("URL") + "...</option>"),
        b.select2("val", c);
        if (this._selectedPage) return b.select2("val", this._selectedPage.replace("#", ""))
    },
    b.prototype.setValue = function(a) {
        return this._selectedPage = a,
        console.log(a)
    },
    b.prototype.updateValue = function(a) {
        return this.setValue(a)
    },
    b
} (Widget),
IconWidgetPopup = Backbone.View.extend({
    events: {
        "click #icons-from-set a": "iconClicked",
        "click .select": "iconSelected",
        "click .list a": "setClicked",
        "dblclick #icons-from-set a": "iconDoubleSelected"
    },
    initialize: function() {},
    show: function() {
        return $(".select", this.el).attr("disabled", "disabled"),
        $("#icons-from-set a", this.el).removeClass("selected"),
        $(this.el).modal("show")
    },
    close: function() {
        return $("#modal-icons").modal("hide")
    },
    setClicked: function(a) {
        var b, c;
        return b = $(a.currentTarget),
        c = b.data("setslug"),
        $(".icons ul", this.el).addClass("hidden"),
        $('.icons ul[data-setslug="' + c + '"]').removeClass("hidden"),
        !1
    },
    iconDoubleSelected: function(a) {
        var b, c, d, e;
        return b = $(a.currentTarget),
        c = b.closest("ul").data("setslug"),
        e = b.data("iconslug"),
        d = b.data("iconsize"),
        this._icon = {
            set: c,
            icon: e,
            size: d
        },
        this.iconSelected(a),
        !1
    },
    iconSelected: function(a) {
        return this._icon ? (this._icon.set === "__jqm__" && (console.log("JQM icon selected"), this._icon.set = ""), this.trigger("icon:selected", this._icon), this.close(), !1) : !1
    },
    iconClicked: function(a) {
        var b, c, d, e, f;
        return b = $(a.currentTarget),
        d = b.closest("ul").data("setslug"),
        f = b.data("iconslug"),
        e = b.data("iconsize"),
        $(".select", this.el).removeAttr("disabled"),
        c = b.hasClass("selected"),
        $("#icons-from-set a", this.el).removeClass("selected"),
        c ? (b.removeClass("selected"), this._icon = null, $(".select", this.el).attr("disabled", "disabled")) : (b.addClass("selected"), console.log("Chose icon", f, "from set", d), this._icon = {
            set: d,
            icon: f,
            size: e
        }),
        !1
    },
    render: function() {}
}),
IconWidget = Widget.extend({
    initialize: function(a, b) {
        Widget.prototype.initialize.call(this, "icon", b),
        this._data = {
            size: 18
        },
        a === IconSelectWidget.ICON_ONLY && (this._data.align = null);
        if (a === IconSelectWidget.ALIGN_ONLY) return this._data.icons = null
    },
    events: {
        "click .ui-icon": "onBrowseClicked",
        "click .browse": "onBrowseClicked",
        "change select": "onValueChanged",
        'click input[type="checkbox"]': "onAlignChanged",
        "click .radio-set a": "onAlignChanged",
        "click .remove": "onRemoveClicked"
    },
    onRemoveClicked: function(a) {
        return this.trigger("valueChanged", {
            icon: null,
            size: null,
            align: "left"
        }),
        this.render(),
        !1
    },
    onAlignChanged: function(a) {
        var b, c;
        return c = $(a.currentTarget),
        b = c.data("align"),
        c.closest(".radio-set").find(".radio").removeClass("selected"),
        c.addClass("selected"),
        this.setAlign(b),
        !0
    },
    setAlign: function(a) {
        return this._data.align = a,
        this.trigger("valueChanged", {
            icon: this._data.icon,
            size: this._data.size,
            align: a
        })
    },
    showPopup: function() {
        var a;
        return a = this,
        window.IconPopupInstance || (window.IconPopupInstance = new IconWidgetPopup({
            el: $("#modal-icons")
        })),
        window.IconPopupInstance.unbind("icon:selected"),
        window.IconPopupInstance.bind("icon:selected",
        function(b) {
            return b.set ? a.trigger("valueChanged", {
                icon: b.set + "-" + b.icon,
                align: "left",
                size: b.size
            }) : a.trigger("valueChanged", {
                icon: b.icon,
                align: "left",
                size: b.size
            }),
            a.render()
        }),
        window.IconPopupInstance.show()
    },
    onBrowseClicked: function(a) {
        return this.showPopup()
    },
    onValueChanged: function(a) {},
    setValue: function(a) {
        return this._data.icon = a.icon,
        this._data.align = a.align,
        this._data.size = a.size
    },
    updateValue: function(a) {
        return this.setValue(a)
    }
}),
IconSelectWidget = Widget.extend({
    initialize: function(a, b) {
        Widget.prototype.initialize.call(this, "iconselect", b),
        this._data = {
            align: "left",
            icons: [{
                value: "",
                key: ""
            },
            {
                value: "arrow-l",
                key: "Left arrow"
            },
            {
                value: "arrow-l",
                key: "Left arrow"
            },
            {
                value: "arrow-r",
                key: "Right arrow"
            },
            {
                value: "arrow-u",
                key: "Up arrow"
            },
            {
                value: "arrow-d",
                key: "Down arrow"
            },
            {
                value: "bars",
                key: "Bars"
            },
            {
                value: "delete",
                key: "Delete"
            },
            {
                value: "edit",
                key: "Edit"
            },
            {
                value: "plus",
                key: "Plus"
            },
            {
                value: "minus",
                key: "Minus"
            },
            {
                value: "check",
                key: "Check"
            },
            {
                value: "gear",
                key: "Gear"
            },
            {
                value: "refresh",
                key: "Refresh"
            },
            {
                value: "forward",
                key: "Forward"
            },
            {
                value: "back",
                key: "Back"
            },
            {
                value: "grid",
                key: "Grid"
            },
            {
                value: "star",
                key: "Star"
            },
            {
                value: "alert",
                key: "Alert"
            },
            {
                value: "info",
                key: "Info"
            },
            {
                value: "home",
                key: "Home"
            },
            {
                value: "search",
                key: "Search"
            }]
        },
        a === IconSelectWidget.ICON_ONLY && (this._data.align = null);
        if (a === IconSelectWidget.ALIGN_ONLY) return this._data.icons = null
    },
    events: {
        "change select": "onValueChanged",
        "click a": "onAlignChanged"
    },
    onAlignChanged: function(a) {
        var b, c, d;
        return c = $(a.currentTarget),
        b = c.data("align"),
        d = $("select", this.el).val(),
        this._data.align = b,
        this.trigger("valueChanged", {
            icon: d,
            align: b
        }),
        !0
    },
    onValueChanged: function(a) {
        var b, c;
        return b = $(a.currentTarget),
        c = $(b).val(),
        this.trigger("valueChanged", {
            icon: c,
            align: this._data.align
        })
    },
    setValue: function(a) {
        var b, c, d;
        for (b in this._data.icons) {
            d = this._data.icons[b],
            d.selected = !1;
            if (d.value === a.icon || d.value === a) d.selected = !0
        }
        if (a.align) {
            this._data.align = a.align,
            c = $(".radio-set", this.el);
            if (c.length > 0) return $(".radio", this.el).removeClass("selected"),
            $('.radio[data-align="' + a.align + '"]', this.el).addClass("selected")
        }
    },
    updateValue: function(a) {
        return this.setValue(a)
    }
},
{
    ICON_ONLY: 1,
    ICON_ALIGN: 2,
    ALIGN_ONLY: 3
}),
TransitionSelectWidget = Widget.extend({
    initialize: function(a) {
        return Widget.prototype.initialize.call(this, "transitionselect", a),
        this._data = {
            align: "left",
            transitions: $.extend(!0, [], TRANSITIONS)
        }
    },
    events: {
        "change select": "onValueChanged"
    },
    onValueChanged: function(a) {
        var b, c;
        return b = $(a.currentTarget),
        c = $(b).val(),
        this.trigger("valueChanged", c)
    },
    setValue: function(a) {
        var b, c, d;
        d = [];
        for (b in this._data.transitions) c = this._data.transitions[b],
        c.selected = !1,
        c.value === a ? d.push(c.selected = !0) : d.push(void 0);
        return d
    },
    updateValue: function(a) {
        return this.setValue(a)
    }
}),
Handlebars.registerHelper("headerbuttonitems_render",
function(a, b) {
    var c, d, e, f, g, h, i, j, k, l, m, n, o, p;
    j = [],
    f = 0;
    while (f < a.length) i = a[f],
    l = new PageSelectWidget,
    l.setValue(i.url),
    l.render(),
    k = $(l.el).html(),
    h = new IconSelectWidget(IconSelectWidget.ICON_ALIGN),
    h.setValue(i.icon),
    h.render(),
    g = $(h.el).html(),
    p = new ThemeSelectWidget,
    p.setValue(i.theme),
    p.render(),
    o = $(p.el).html(),
    d = new SelectWidget(new AcceptAllInputFilter, [{
        value: "",
        text: _t("No")
    },
    {
        value: "back",
        text: _t("Yes")
    }]),
    d.setValue(i.isBack),
    d.render(),
    c = $(d.el).html(),
    n = "#sub-template-widget-headerbuttonitems",
    m = Handlebars.compile($(n).html()),
    e = m($.extend({
        iconSelect: g,
        pageSelect: k,
        themeSelect: o,
        backSelect: c
    },
    i)),
    j.push(e),
    f++;
    return j.join("")
}),
HeaderButtonItemWidget = Widget.extend({
    initialize: function(a) {
        return Widget.prototype.initialize.call(this, "headerbuttonitems", a),
        this._data = {
            items: []
        }
    },
    events: {
        "click .add": "onItemAdded",
        "click .remove": "onItemDeleted",
        "keyup input": "onButtonTextChanged",
        "click .radio": "onAlignChanged",
        "change select.icons": "onIconChanged",
        "change select.pages": "onPageChanged",
        "change select.themes": "onThemeChanged",
        "change .isBack select": "onIsBackChanged"
    },
    onIconChanged: function(a) {
        var b, c, d;
        return c = $(a.currentTarget),
        d = c.closest(".fg-collapsible"),
        b = $(d).index(),
        console.log("Changing icon for button", b),
        this._changed(b, d)
    },
    onPageChanged: function(a) {
        var b, c, d;
        return c = $(a.currentTarget),
        d = c.closest(".fg-collapsible"),
        b = $(d).index(),
        console.log("Changing page for button", b),
        this._changed(b, d)
    },
    onThemeChanged: function(a) {
        var b, c, d;
        return c = $(a.currentTarget),
        d = c.closest(".fg-collapsible"),
        b = $(d).index(),
        console.log("Changing page for button", b),
        this._changed(b, d)
    },
    onAlignChanged: function(a) {
        var b, c, d;
        return c = $(a.currentTarget),
        d = c.closest(".fg-collapsible"),
        $(".radio", d).removeClass("selected"),
        c.addClass("selected"),
        b = $(d).index(),
        console.log("Changing icon alignment for button", b),
        this._changed(b, d)
    },
    onIsBackChanged: function(a) {
        var b, c, d;
        return c = $(a.currentTarget),
        d = c.closest(".fg-collapsible"),
        b = $(d).index(),
        console.log("Changing transition for button", b),
        this._changed(b, d)
    },
    onButtonTextChanged: function(a) {
        var b, c, d, e;
        return c = $(a.currentTarget),
        d = c.closest(".fg-collapsible"),
        b = $(d).index(),
        console.log("Changing text for button", b),
        e = $("h3 span", d),
        $("h3", d).html("").append(e).append(c.val()),
        this._changed(b, d)
    },
    _changed: function(a, b) {
        var c, d, e, f, g, h;
        return g = $("input", b).val(),
        c = $("select.icons", b).val(),
        d = $(".radio.selected", b).data("align"),
        f = $("select.pages", b).val(),
        h = $("select.themes", b).val(),
        e = $(".isBack select", b).val(),
        this.trigger("itemChanged", a, {
            text: g,
            icon: c,
            align: d,
            url: f,
            theme: h,
            isBack: e
        })
    },
    onItemAdded: function(a) {
        var b, c, d, e, f, g;
        return e = $("select.pages", this.el).val(),
        f = $("input[type=text]", this.el).val(),
        g = $("select.themes", this.el).val(),
        b = $("select.icons ", this.el).val(),
        c = $(".radio.selected", this.el).data("align"),
        d = $(".isBack select", this.el).val(),
        this.trigger("itemAdded", {
            text: _t("Button"),
            url: "",
            icon: "",
            theme: "a",
            isBack: ""
        })
    },
    onItemDeleted: function(a) {
        var b, c, d;
        return c = $(a.currentTarget),
        d = c.closest(".fg-collapsible"),
        b = $(d).index(),
        console.log("Deleting button", b),
        this.trigger("itemDeleted", b),
        d.remove()
    },
    updateValue: function(a) {
        return this._data.items = a
    },
    setValue: function(a) {
        return this._data.items = a
    },
    render: function(a) {
        var b, c, d, e;
        return e = "#template-widget-" + this._template,
        d = Handlebars.compile($(e).html()),
        b = d($.extend(this._data, {
            _property_title: a
        })),
        c = this,
        $(this.el).html(b),
        $(".fg-accordion.sortable", this.el).accordion({
            active: ":last",
            autoHeight: !1,
            animated: !1,
            collapsible: !0,
            clearStyle: !0,
            header: "> div > h3",
            icons: {
                header: "bui-icon bui-icon-plus",
                headerSelected: "bui-icon bui-icon-minus"
            },
            create: function(a, b) {
                return $('input[type="text"]', b.newContent).focus()
            },
            change: function(a, b) {
                return $('input[type="text"]', b.newContent).focus(),
                window.App.getPropertyView().resize()
            }
        }).sortable({
            axis: "y",
            handle: "h3",
            tolerance: "pointer",
            start: function(a, b) {
                var c;
                return c = b.item.index(),
                b.item.data("contentDragStart", c)
            },
            change: function(a, b) {
                var c;
                return c = b.item.index()
            },
            stop: function(a, b) {
                var d, e;
                return $(this).data("_stop", !0),
                e = b.item.data("contentDragStart"),
                d = b.item.index(),
                c.trigger("itemMoved", e, d)
            }
        }),
        $(".fg-collapsible.sortable h3").click(function(a) {
            var b;
            b = $(this).closest(".fg-collapsible.sortable");
            if (b.data("_stop") === !0) return a.stopImmediatePropagation(),
            a.preventDefault(),
            b.data("_stop", !1)
        }),
        this.delegateEvents()
    }
}),
Handlebars.registerHelper("mapmarkers_render",
function(a, b) {
    var c, d, e, f, g, h;
    f = [],
    d = 0;
    while (d < a.length) e = a[d],
    h = "#sub-template-widget-mapmarkers",
    g = Handlebars.compile($(h).html()),
    c = g($.extend({},
    e)),
    f.push(c),
    d++;
    return f.join("")
}),
MapMarkerWidget = function(a) {
    function b() {
        return b.__super__.constructor.apply(this, arguments)
    }
    return __extends(b, a),
    b.prototype.initialize = function(a) {
        return Widget.prototype.initialize.call(this, "mapmarker", a),
        this._data = {
            items: []
        }
    },
    b.prototype.events = function() {
        return _.extend({},
        ItemPropertyWidget.prototype.events, {
            "click .add-button": "onItemAdded",
            "click .remove": "onItemRemoved",
            "keyup input.location": "onLocationChanged"
        })
    },
    b.prototype.onLocationChanged = function(a) {
        var b, c, d, e;
        return c = $(a.currentTarget),
        d = c.closest(".fg-collapsible"),
        b = $(d).index(),
        console.log("Changing text for button", b),
        e = $("h3 span", d),
        $("h3 .heading", d).html(c.val()),
        this._changed(b, d)
    },
    b.prototype._changed = function(a, b) {
        var c, d;
        return d = this,
        c = $("input.location", b).val(),
        clearTimeout(this._changeTimeout),
        this._changeTimeout = setTimeout(function() {
            return d.trigger("itemChanged", a, {
                location: c
            })
        },
        1e3)
    },
    b.prototype.onItemAdded = function(a) {
        return this.trigger("itemAdded", {
            location: ""
        })
    },
    b.prototype.onItemRemoved = function(a) {
        var b, c, d;
        return c = $(a.currentTarget),
        d = c.closest(".fg-collapsible"),
        b = $(d).index(),
        console.log("Deleting button", b),
        this.trigger("itemDeleted", b),
        d.remove()
    },
    b.prototype.updateValue = function(a) {
        return this._data.items = a
    },
    b.prototype.setValue = function(a) {
        return this._data.items = a
    },
    b.prototype.render = function(a) {
        var b, c, d, e;
        return e = "#template-widget-" + this._template,
        d = Handlebars.compile($(e).html()),
        b = d($.extend(this._data, {
            _property_title: a
        })),
        c = this,
        $(this.el).html(b),
        $(".fg-accordion.sortable", this.el).accordion({
            active: ":last",
            autoHeight: !1,
            animated: !1,
            collapsible: !0,
            clearStyle: !0,
            header: "> div > h3",
            icons: {
                header: "bui-icon bui-icon-plus",
                headerSelected: "bui-icon bui-icon-minus"
            },
            create: function(a, b) {
                return $('input[type="text"]:last', b.newContent).focus()
            },
            change: function(a, b) {
                return $('input[type="text"]', b.newContent).focus(),
                window.App.getPropertyView().resize()
            }
        }).sortable({
            axis: "y",
            handle: "h3",
            tolerance: "pointer",
            start: function(a, b) {
                var c;
                return c = b.item.index(),
                b.item.data("contentDragStart", c)
            },
            change: function(a, b) {
                var c;
                return c = b.item.index()
            },
            stop: function(a, b) {
                var d, e;
                return $(this).data("_stop", !0),
                e = b.item.data("contentDragStart"),
                d = b.item.index(),
                c.trigger("itemMoved", e, d)
            }
        }),
        $(".fg-collapsible.sortable h3").click(function(a) {
            var b;
            b = $(this).closest(".fg-collapsible.sortable");
            if (b.data("_stop") === !0) return a.stopImmediatePropagation(),
            a.preventDefault(),
            b.data("_stop", !1)
        }),
        this.delegateEvents()
    },
    b
} (ItemPropertyWidget),
ThemeSelectWidget = Widget.extend({
    initialize: function(a, b) {
        Widget.prototype.initialize.call(this, "themeselect", a),
        this._data = {
            align: "left",
            themes: [{
                value: "",
                key: _t("Default")
            },
            {
                value: "a",
                key: _t("Swatch A")
            },
            {
                value: "b",
                key: _t("Swatch B")
            },
            {
                value: "c",
                key: _t("Swatch C")
            },
            {
                value: "d",
                key: _t("Swatch D")
            },
            {
                value: "e",
                key: _t("Swatch E")
            },
            {
                value: "f",
                key: _t("Swatch F")
            },
            {
                value: "g",
                key: _t("Swatch G")
            },
            {
                value: "h",
                key: _t("Swatch H")
            }]
        };
        if (b === !1 && this._data.themes[0].value === "") return this._data.themes.splice(0, 1)
    },
    events: {
        "change select": "onValueChanged"
    },
    onValueChanged: function(a) {
        var b;
        return b = $(a.currentTarget),
        this.trigger("valueChanged", b.val())
    },
    setValue: function(a) {
        var b, c, d;
        d = [];
        for (b in this._data.themes) c = this._data.themes[b],
        c.selected = !1,
        c.value === a ? d.push(c.selected = !0) : d.push(void 0);
        return d
    },
    updateValue: function(a) {
        return this.setValue(a)
    }
}),
Handlebars.registerHelper("propertyFunctionHref",
function(a) {
    return a.indexOf("()") >= 0 ? "#": a
}),
JavascriptLinkSelectWidget = function(a) {
    function b() {
        return b.__super__.constructor.apply(this, arguments)
    }
    return __extends(b, a),
    b.prototype.render = function(a) {
        var c, d, e, f, g, h, i, j, k, l, m;
        i = window.App.getPages(),
        f = window.Codiqa && window.Codiqa.getEventHandlerNames() || [],
        d = !1,
        this._data.blankDefault = this.blankDefault,
        this._data.pages = [],
        this._data.handlers = [],
        c = this.control.clickHandler && this.control.clickHandler.getValue();
        for (j = 0, l = i.length; j < l; j++) h = i[j],
        h.getId() === this._selectedPage || "#" + h.getId() === this._selectedPage ? (d = !0, this._data.pages.push({
            key: h.title.getValue(),
            value: h.getId(),
            selected: !0
        })) : this._data.pages.push({
            key: h.title.getValue(),
            value: h.getId(),
            selected: !1
        });
        for (k = 0, m = f.length; k < m; k++) g = f[k],
        e = g.name,
        e === c ? (d = !0, this._data.handlers.push({
            name: e + "()",
            type: g.type,
            selected: !0
        })) : this._data.handlers.push({
            name: e + "()",
            type: g.type,
            selected: !1
        });
        return b.__super__.render.call(this, a),
        $(this.el).find("option:not(.page, .blank, .handler)").remove(),
        !d && this._selectedPage && $(this.el).find("select").append('<option value="' + this._selectedPage + '" selected>' + this._selectedPage + "</option>"),
        $(this.el).find("select").append('<option value="URL">' + _t("URL") + "...</option>"),
        $(this.el).find("select").append('<option value="JAVASCRIPT">Javascript handler...</option>')
    },
    b.prototype.initialize = function(a, c, d) {
        var e;
        return this.control = c,
        e = this,
        b.__super__.initialize.call(this, "jspageselect", a),
        this.blankDefault = d,
        e._selectedPage = null
    },
    b.prototype.events = {
        "change select": "onValueChanged"
    },
    b.prototype.onValueChanged = function(a) {
        var b, c, d;
        return b = $(a.currentTarget),
        b.val().indexOf("()") > 0 ? (c = b.val().replace("()", ""), this.trigger("valueChanged", "#"), this.trigger("jsHandlerChosen", c)) : b.val() === "JAVASCRIPT" ? this.trigger("jsHandlerChoose") : b.val() === "URL" ? (d = prompt(_t('Enter URL for button (tip: try tel:NUMBER to make a "Click to Call" button)')), d ? (this.trigger("valueChanged", d), this.trigger("jsHandlerCleared", c), $(this.el).find("option:not(.page)").remove(), $(this.el).find("select").append('<option value="' + d + '" selected>' + d + "</option>"), $(this.el).find("select").append('<option value="URL">URL...</option>')) : (this.trigger("jsHandlerCleared", c), b.get(0).selectedIndex = this._lastOptionIndex)) : this.trigger("valueChanged", "#" + b.val())
    },
    b.prototype.setValue = function(a) {
        return this._selectedPage = a,
        console.log(a)
    },
    b.prototype.updateValue = function(a) {
        return this.setValue(a)
    },
    b.prototype.setHandler = function(a) {
        return this._selectedPage = a,
        console.log(a),
        this.render()
    },
    b
} (Widget),
InputFilter = Backbone.Model.extend({
    accept: function() {}
}),
AcceptAllInputFilter = InputFilter.extend({
    accept: function() {
        return ! 0
    }
}),
AcceptIDInputFilter = InputFilter.extend({
    accept: function(a) {
        return /^[\S]+$/.test(a) ? !0 : !1
    }
}),
AcceptPageIDInputFilter = InputFilter.extend({
    accept: function(a) {
        var b;
        return /^[\S]+$/.test(a) ? (b = window.App.getControl(a), b ? !1 : !0) : !1
    }
}),
AcceptUrlInputFilter = InputFilter.extend({
    accept: function(a) {
        return a.indexOf("http://") >= 0
    }
});
var BoxLayout, GridLayout, Layout, __hasProp = {}.hasOwnProperty,
__extends = function(a, b) {
    function d() {
        this.constructor = a
    }
    for (var c in b) __hasProp.call(b, c) && (a[c] = b[c]);
    return d.prototype = b.prototype,
    a.prototype = new d,
    a.__super__ = b.prototype,
    a
};
Layout = function(a) {
    function b() {
        return b.__super__.constructor.apply(this, arguments)
    }
    return __extends(b, a),
    b.prototype.initialize = function(a) {
        return this._control = a
    },
    b.prototype.render = function() {},
    b
} (Backbone.View),
BoxLayout = function(a) {
    function b() {
        return b.__super__.constructor.apply(this, arguments)
    }
    return __extends(b, a),
    b.prototype.initialize = function(a) {
        return Layout.prototype.initialize.call(this, a)
    },
    b.prototype.render = function() {
        var a, b, c, d, e;
        b = this._control.children,
        c = window.FrameDocument.createElement("div"),
        d = 0;
        while (d < b.length) a = b[d],
        a.render(),
        e = a.getDeviceRenderedEl(),
        $(c, window.FrameDocument).append(e),
        d++;
        return this.el = c
    },
    b.prototype.renderTo = function(a) {
        var b, c, d, e, f;
        d = this._control.children,
        e = 0,
        f = [];
        while (e < d.length) b = d[e],
        c = document.createElement("div"),
        b.renderTo(c),
        DomUtils.appendContents(a, c),
        f.push(e++);
        return f
    },
    b.prototype.cleanRenderTo = function(a) {
        var b, c, d, e, f, g;
        d = this._control.children,
        g = [];
        for (e = 0, f = d.length; e < f; e++) b = d[e],
        c = document.createElement("div"),
        b.renderTo(c),
        g.push(DomUtils.appendContents(a, c));
        return g
    },
    b.prototype.quickRenderTo = function() {
        var a, b, c, d, e;
        d = document.createElement("div"),
        c = this._control.children,
        e = 0;
        while (e < c.length) a = c[e],
        b = document.createElement("div"),
        a.renderTo(b),
        $(d).append($(b).contents()),
        e++;
        return d
    },
    b
} (Layout),
GridLayout = function(a) {
    function b() {
        return b.__super__.constructor.apply(this, arguments)
    }
    return __extends(b, a),
    b.prototype.initialize = function(a) {
        return Layout.prototype.initialize.call(this, a),
        this._gridColMap = {
            0 : "a",
            1 : "b",
            2 : "c",
            3 : "d",
            4 : "e"
        }
    },
    b.prototype.render = function() {
        var a, b, c, d, e, f, g, h, i, j;
        b = this._control.children,
        d = window.FrameDocument.createElement("div"),
        g = parseInt(this._control.rows.getValue()),
        f = parseInt(this._control.columns.getValue()),
        e = 0;
        while (e < b.length) j = Math.floor(e / g),
        h = Math.floor(e % f),
        a = b[e],
        a.render(),
        c = this._gridColMap[h],
        i = a.getDeviceRenderedEl(),
        i.removeClass("ui-block-a"),
        i.removeClass("ui-block-b"),
        i.removeClass("ui-block-c"),
        i.removeClass("ui-block-d"),
        i.removeClass("ui-block-e"),
        i.addClass("ui-block-" + c),
        $(d, window.FrameDocument).append(i),
        e++;
        return this.el = d
    },
    b.prototype.renderTo = function(a) {
        var b, c, d, e, f, g, h, i, j, k;
        d = this._control.children,
        h = parseInt(this._control.rows.getValue()),
        g = parseInt(this._control.columns.getValue()),
        f = 0,
        k = [];
        while (f < d.length) j = Math.floor(f / h),
        i = Math.floor(f % g),
        b = d[f],
        c = document.createElement("div"),
        e = this._gridColMap[i],
        b.renderTo(c),
        $(":first", c).addClass("ui-block-" + e),
        DomUtils.appendContents(a, c),
        k.push(f++);
        return k
    },
    b.prototype.cleanRenderTo = function(a) {
        var b, c, d, e, f, g, h, j, k, l, m;
        d = this._control.children,
        g = parseInt(this._control.rows.getValue()),
        f = parseInt(this._control.columns.getValue()),
        m = [];
        for (k = 0, l = d.length; k < l; k++) b = d[k],
        j = Math.floor(i / g),
        h = Math.floor(i % f),
        c = document.createElement("div"),
        e = this._gridColMap[h],
        b.cleanRenderTo(c),
        $(":first", c).addClass("ui-block-" + e),
        m.push(DomUtils.appendContents(a, c));
        return m
    },
    b
} (Layout);
var AppControl, BareCollapsibleContentControl, BareCollapsibleSetControl, BasicImageControl, BasicListItemControl, ButtonControl, CameraInputControl, CheckboxControl, CheckboxInputControl, CollapsibleContentControl, CollapsibleSetControl, ContentControlTemplate, Control, ControlAppendMode, ControlFactory, ControlOutputVisitor, DateInputControl, DomUtils, FileInputControl, FlexibleListViewControl, FooterNavBarControl, FormControl, FormControlTemplate, GoogleMapsControl, GoogleMapsJSControl, GridBlockControl, GridControl, HTMLCommentNodeControl, HTMLNodeControl, HTMLTextNodeControl, HeaderNavBarControl, HeadingControl, HiddenInputControl, HorizontalRuleControl, HtmlBlockControl, ImageControl, InsertMode, LinkControl, ListViewControl, NavBarControl, NodeType, PageContentControl, PageControl, PageFooterControl, PageHeaderControl, PanelButtonControl, PanelControl, PanelListViewControl, ParagraphControl, RadioButtonControl, RadioInputControl, SearchInputControl, SelectControl, SliderControl, SplitContentControl, SplitPrimaryContentControl, SplitSecondaryContentControl, SubmitButtonControl, TabBarControl, TextAreaControl, TextBlockControl, TextInputControl, ThumbnailListItemControl, ThumbnailListViewControl, ToggleSwitchControl, VimeoControl, YouTubeControl, renderTemplate, _compiledTemplates, __hasProp = {}.hasOwnProperty,
__extends = function(a, b) {
    function d() {
        this.constructor = a
    }
    for (var c in b) __hasProp.call(b, c) && (a[c] = b[c]);
    return d.prototype = b.prototype,
    a.prototype = new d,
    a.__super__ = b.prototype,
    a
};
NodeType = {
    ELEMENT: 1,
    TEXT: 3,
    COMMENT: 8
},
ControlAppendMode = {
    CONTENT_APPEND: 0,
    CONTENT_PREPEND: 1,
    PAGE_APPEND: 2,
    PAGE_PREPEND: 3,
    HEADER_PREPEND: 4,
    HEADER_APPEND: 5,
    FOOTER_PREPEND: 6,
    FOOTER_APPEND: 7
},
InsertMode = {
    FLOW: 0,
    PREPEND: 1,
    APPEND: 2
},
DomUtils = function() {
    function a() {}
    return a.appendContents = function(a, b) {
        var c, d, e, f, g, h, i, j, k;
        e = b.childNodes,
        f = [];
        for (g = 0, i = e.length; g < i; g++) d = e[g],
        f.push(d);
        k = [];
        for (h = 0, j = f.length; h < j; h++) c = f[h],
        k.push(a.appendChild(c));
        return k
    },
    a
} (),
_compiledTemplates = {},
renderTemplate = function(a, b) {
    var c, d;
    return c = _compiledTemplates[a],
    c ? c(b) : (d = Handlebars.compile($(a).html()), _compiledTemplates[a] = d, d(b))
},
//控件
Control = function(a) {
    function b() {
        return b.__super__.constructor.apply(this, arguments)
    }
    return __extends(b, a),
    b.prototype.initialize = function() {
        var a;
        return a = this,
        this.children = [],
        this.childrenLookup = {},
        this.namedChildren = {},
        this.settings = {},
        this.appendSelector = ":first",
        this._propertiesMap = {},
        this._insertMode = InsertMode.FLOW,
        this._alreadyAfterBound = !1,
        this._appendMode = ControlAppendMode.CONTENT_APPEND,
        this._layout = new BoxLayout(this),
        this._isContainer = !1,
        this._canEditContent = !1,
        this._contentEditWidget = null,
        this._supportsChildRendering = !0,
        this._supportsSorting = !1,
        this._sortableItemsSelector = "> [data-cid], > .ui-submit",
        this._canDelete = !0,
        this.validFor = [],
        this.validParents = null,
        this.invalidParents = null,
        this.placeholderName = null,
        this._id = null,
        this.elementId = new ScalarProperty(_t("Id"), new SingleTextWidget(new AcceptAllInputFilter, "")),
        this.addProperty("elementId", this.elementId, {
            pos: -1
        }),
        this.elementClass = new ScalarProperty(_t("Class"), new SingleTextWidget(new AcceptAllInputFilter, "")),
        this.addProperty("elementClass", this.elementClass, {
            pos: -2
        }),
        this.attributes = new HTMLAttrProperty("Attributes", new NullWidget, ""),
        this.addProperty("attributes", this.attributes, {
            pos: 101
        })
    },
    b.prototype.setSupportsSorting = function(a) {
        return this._supportsSorting = a
    },
    b.prototype.supportsSorting = function() {
        return this._supportsSorting
    },
    b.prototype.setTextContent = function(a) {
        var b, c;
        return b = this.children,
        this.children = [],
        c = new HTMLTextNodeControl,
        c.data.setValue(a),
        this.addChild(c)
    },
    b.prototype.cloneControl = function(a, b) {
        var c, d, e, f, g, h, i, j;
        d = ControlFactory.newControl(this.controlId),
        a || d.setId(this.getId()),
        d.setAlreadyAfterBound(!0),
        d.parentControl = b,
        j = d.getProperties();
        for (h in this._propertiesMap) {
            i = this._propertiesMap[h].property,
            g = j[h];
            if (!g) {
                console.error("Cloning control no property with name", h);
                continue
            }
            h === "elementId" ? g.property.setValue("") : i.getValue() === null ? g.property.setValue("") : $.isArray(i.getValue()) ? g.property.setValue($.extend(!0, [], i.getValue())) : typeof i.getValue() == "object" ? g.property.setValue($.extend(!0, {},
            i.getValue())) : g.property.setValue(i.getValue())
        }
        f = 0;
        while (f < this.children.length) c = this.children[f],
        e = c.cloneControl(a, d),
        e.setAlreadyAfterBound(!0),
        e.setId(e.controlId + IdGiver.give(e.getControlType())),
        e.parentControl = d,
        d.children.push(e),
        d.childrenLookup[e.getId()] = e,
        f++;
        return d.onAfterClone && d.onAfterClone(this),
        d
    },
    b.prototype.copyProperties = function(a) {
        var b, c, d, e, f;
        e = a.getProperties(),
        f = [];
        for (c in this._propertiesMap) {
            d = this._propertiesMap[c].property,
            b = e[c];
            if (!b) {
                console.error("Cloning control no property with name", c);
                continue
            }
            $.isArray(d.getValue()) ? f.push(b.property.setValue($.extend(!0, [], d.getValue()))) : typeof d.getValue() == "object" ? f.push(b.property.setValue($.extend(!0, {},
            d.getValue()))) : f.push(b.property.setValue(d.getValue()))
        }
        return f
    },
    b.prototype.isContainer = function() {
        return this._isContainer
    },
    b.prototype.setIsContainer = function(a) {
        return this._isContainer = a
    },
    b.prototype.canEditContent = function() {
        return this._canEditContent
    },
    b.prototype.setCanEditContent = function(a) {
        return this._canEditContent = a
    },
    b.prototype.setContentEditWidget = function(a) {
        return this._contentEditWidget = a
    },
    b.prototype.getContentEditWidget = function() {
        return this._contentEditWidget
    },
    b.prototype.getLayout = function() {
        return this._layout
    },
    b.prototype.setLayout = function(a) {
        return this._layout = a
    },
    b.prototype.setSortableItemsSelector = function(a) {
        return this._sortableItemsSelector = a
    },
    b.prototype.getSortableItemsSelector = function() {
        return this._sortableItemsSelector
    },
    b.prototype.getParentMatching = function(a) {
        var b;
        b = this.getParent();
        while (b) {
            if (b.getParent().getControlType() === a) return b.getParent();
            b = b.getParent()
        }
        return null
    },
    b.prototype.setTheme = function(a) {
        return this._theme = a
    },
    b.prototype.setAppendMode = function(a) {
        return this._appendMode = a
    },
    b.prototype.getAppendMode = function() {
        return this._appendMode
    },
    b.prototype.setInsertMode = function(a) {
        return this._insertMode = a
    },
    b.prototype.getInsertMode = function() {
        return this._insertMode
    },
    b.prototype.setCanDeleteControl = function(a) {
        return this._canDelete = a
    },
    b.prototype.canDeleteControl = function() {
        return this._canDelete
    },
    b.prototype.getOutputAppendSelector = function() {
        return ""
    },
    b.prototype.acceptControl = function(a) {
        return ! 0
    },
    b.prototype.getOutputAppendNode = function() {
        var a;
        return a = this._cloneNode,
        a || (a = this.getCloneNode()),
        $(this.appendSelector, a)
    },
    b.prototype.getCloneNode = function() {
        return this._cloneNode || (console.log("Cloned node for control " + this.getId()), this._cloneNode = $(this.el).clone()),
        this._cloneNode
    },
    b.prototype.p = function(a) {
        var b;
        return b = null,
        a.widgetdata ? b = new a.propertytype(a.name, new a.widgettype(new AcceptAllInputFilter, a.widgetdata), a.defaultValue || a.value) : b = new a.propertytype(a.name, new a.widgettype(new AcceptAllInputFilter), a.defaultValue || a.value),
        this.addProperty(a.key, b, {
            pos: a.pos
        }),
        b
    },
    b.prototype.removeProperty = function(a) {
        return delete this._propertiesMap[a]
    },
    b.prototype.addProperty = function(a, b, c) {
        var d, e;
        return this._propertiesMap[a] = {},
        $.extend(this._propertiesMap[a], {
            property: b
        },
        c),
        e = this,
        d = null,
        b.bind("propertyChanged",
        function(a, b, c, f) {
            return clearTimeout(d),
            d = setTimeout(function() {
                return e.onPropertyChanged(a, b, c, f)
            },
            100)
        })
    },
    b.prototype.getProperty = function(a) {
        return this._propertiesMap[a]
    },
    b.prototype.getProperties = function() {
        return this._propertiesMap
    },
    b.prototype.getNumProperties = function() {
        var a, b;
        a = 0;
        for (b in this._propertiesMap) a++;
        return a
    },
    b.prototype.getPropertiesSorted = function() {
        return this._sortProperties()
    },
    b.prototype.getControlType = function() {
        return this.controlId
    },
    b.prototype.getType = function() {
        return this.controlId
    },
    b.prototype.setParent = function(a) {
        return this.parentControl = a
    },
    b.prototype.getId = function() {
        return this._id
    },
    b.prototype.setId = function(a) {
        return this._id = a
    },
    b.prototype.getSerializedProperties = function() {
        var a, b, c;
        a = {};
        for (b in this._propertiesMap) c = this._propertiesMap[b].property,
        a[b] = c.getValue();
        return a
    },
    b.prototype.initFromSerializedProperties = function(a) {
        var b, c, d;
        if (!a) return;
        d = [];
        for (b in a) c = this._propertiesMap[b],
        c ? (c.property.setValue(a[b]), d.push(c.property.trigger("propertyInitialized", a[b]))) : d.push(void 0);
        return d
    },
    b.prototype.initFromSerialized = function(a) {
        return this.setId(a.id),
        this.initFromSerializedProperties(a.properties)
    },
    b.prototype.initFromDomNode = function(a) {
        return this.elementId.setValue(a.id || ""),
        this.attributes.setValue(a.attributes)
    },
    b.prototype.initProp = function(a, b, c) {
        var d;
        return d = b.getAttribute(c),
        !d || $.trim(d) === "" ? a.setValue(a.value || "") : a.setValue(d)
    },
    b.prototype.setPropertyFromAttribute = function(a, b, c) {
        var d;
        if (a.hasAttribute(c)) return d = a.getAttribute(c),
        console.log("PROP SET FROM ATTR", d.value),
        b.setValue(d.value)
    },
    b.prototype._sortProperties = function() {
        var a, b, c;
        b = [];
        for (a in this._propertiesMap) {
            b.push(
                $.extend(
                    {
                        propertyName: a
                    },
                    this._propertiesMap[a]
                )
            );
        }
        c = b.sort(function(a, b) {
            if (a.pos > b.pos) return 1;
            if (a.pos === b.pos) return 0;
            if (a.pos < b.pos) return - 1
        });
        return c;
    },
    b.prototype._getRenderData = function() {
        var a;
        a = {
            __control: this,
            __children: this.children,
            __namedChildren: this.namedChildren
        };
        $.extend(a, this._propertiesMap);
        return a;
    },
    b.prototype._initChildControl = function(a) {
        var b;
        return a._id ? console.log("Added existing child with id", a.getId()) : (b = window.IdGiver.give(a.getControlType()), a.setId(a.controlId + b), console.log("New " + a.name + " control added with id", a.getId())),
        a.getId() === this.getId() ? (console.error("Attempt to add child to itself"), !1) : !0
    },
    b.prototype.wrapQuickRenderTo = function(a) {
        var b, c;
        return c = document.createElement("div"),
        b = this.renderTo(c),
        $(a).append($(c).contents())
    },
    b.prototype.cleanRenderTo = function(a) {
        var b;
        return b = document.createElement("div"),
        this._layout.cleanRenderTo(b),
        DomUtils.appendContents(a, b)
    },
    b.prototype.quickRenderTo = function(a) {
        var b;
        return b = document.createElement("div"),
        this._layout.renderTo(b),
        $(a).append($(b).contents())
    },
    b.prototype.renderTo = function(a) {
        var b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q;
        i = this._getRenderData(),
        k = "#template-control-" + this.templateName,
        j = Handlebars.compile($(k).html()),
        g = j(i),
        this.templateName === "htmlblock" && (g = this._disableScripts(g)),
        a.innerHTML = g,
        h = document.createElement("div"),
        this._layout.renderTo(h),
        d = this.elementClass.value,
        e = this.elementId.value;
        if (this.quickRenderTargetSelector) {
            DomUtils.appendContents($(this.quickRenderTargetSelector, a).get(0), h),
            c = this.attributes.getValue();
            if (this.attributes.attributes) {
                p = this.attributes.attributes;
                for (l = 0, n = p.length; l < n; l++) {
                    b = p[l];
                    try {
                        f = $(this.quickRenderTargetSelector, a).attr(b.name),
                        f || $(this.quickRenderTargetSelector, a).attr(b.name, b.value)
                    } catch(r) {
                        console.error("Unable to set attribute", b.name, b.value, r)
                    }
                }
            }
            return this.controlId !== "page" && e && $(this.quickRenderTargetSelector, a).attr("id", e),
            d && $(this.quickRenderTargetSelector, a).addClass(d)
        }
        c = this.attributes.getValue();
        if (this.attributes.attributes) {
            q = this.attributes.attributes;
            for (m = 0, o = q.length; m < o; m++) {
                b = q[m];
                try {
                    f = $(":first", a).attr(b.name),
                    f || $(":first", a).attr(b.name, b.value)
                } catch(r) {
                    console.error("Unable to set attribute", b.name, b.value, r)
                }
            }
        }
        return DomUtils.appendContents($(":first", a).get(0), h),
        this.controlId !== "page" && e && $(":first", a).attr("id", e),
        d && $(":first", a).addClass(d)
    },
    b.prototype.renderToBuffer = function() {
        var a;
        return a = document.createElement("div"),
        this.renderTo(a),
        this._bufferedElement = $(a).contents()
    },
    b.prototype.render = function() {
        var a, b, c, d, e, f, g, h, i, j, k, l, m;
        j = this._getRenderData(),
        f = window.FrameDocument.createElement("div"),
        c = void 0,
        h = void 0,
        !window.App.isPreviewMode() && this.placeholderName ? i = renderTemplate("#template-placeholder-" + this.placeholderName, j) : i = renderTemplate("#template-control-" + this.templateName, j),
        this.templateName === "htmlblock" && (i = this._disableScripts(i)),
        window.FrameWindow.$(f, window.FrameDocument).html(i);
        if (f.childNodes.length > 0) {
            c = $(f, window.FrameDocument).children(),
            h = $(c.get(0), window.FrameDocument),
            h.attr("data-cid", this.getId()),
            $(h, window.FrameDocument).addClass("codiqa-control"),
            this._isContainer && $(h, window.FrameDocument).addClass("codiqa-container");
            if (this.getControlType() === "page" && this._deviceRenderedEl) this._deviceRenderedEl.attr("id", this.getId()),
            this._deviceRenderedEl.data("cid", this.getId()),
            this._deviceRenderedEl.attr("data-cid", this.getId()),
            this._deviceRenderedEl.empty();
            else {
                if (this.controlId === "htmltextnode" || this.controlId === "htmlcommentnode") {
                    this._deviceRenderedEl = $(f).contents(),
                    this.trigger("controlRendered"),
                    this.el = f;
                    return
                }
                this._deviceRenderedEl = c
            }
            d = this.elementClass.value,
            e = this.elementId.value,
            e && this._deviceRenderedEl.attr("id", e),
            d && this._deviceRenderedEl.addClass(d),
            b = this.attributes.getValue(),
            m = this.attributes.attributes;
            for (k = 0, l = m.length; k < l; k++) {
                a = m[k];
                try {
                    g = this._deviceRenderedEl.attr(a.name),
                    g || this._deviceRenderedEl.attr(a.name, a.value)
                } catch(n) {
                    console.error("Unable to set attribute", a.name, a.value, n)
                }
            }
            this._layout.render(),
            this._layout.el.childNodes.length > 0 && this.positionLayoutElement(this._deviceRenderedEl, this._layout.el),
            this.trigger("controlRendered")
        }
        return this.el = f
    },
    b.prototype._disableScripts = function(a) {
        if (a) return a.replace(/<script/gi, "<scriptdisabled").replace(/script>/gi, "scriptdisabled>")
    },
    b.prototype.positionLayoutElement = function(a, b) {
        var c;
        return c = $(b, window.FrameDocument).contents(),
        this.renderTargetSelector ? a.find(this.renderTargetSelector).append(c) : a.append(c)
    },
    b.prototype.onDrop = function(a) {
        switch (a._insertMode) {
        case InsertMode.PREPEND:
            this.insertChild(a, 0);
            break;
        case InsertMode.APPEND:
            this.addChild(a);
            break;
        case InsertMode.FLOW:
            if (this._lastHoverIndex === -1) return this.addChild(a),
            this.getChildPosition(a);
            this.insertChild(a, this._lastHoverIndex)
        }
        return this.getChildPosition(a)
    },
    b.prototype.onHover = function(a, b) {
        var c, d, e, f, g, h, i, j, k, l, m;
        k = this._deviceRenderedEl.get(0),
        $(".shim", k).remove(),
        d = k.children,
        f = null,
        l = document.createElement("div"),
        l.className = "shim",
        l.style.width = k.offsetWidth,
        m = $(k),
        this.dropSelector && (m = $(k).find(this.dropSelector));
        if (d.length <= 0) {
            m.append(l);
            return
        }
        d = [],
        e = 0;
        while (e < k.children.length) d.push(k.children[e]),
        e++;
        e = 0;
        while (e < d.length) {
            c = d[e],
            i = g = c.offsetLeft,
            j = h = c.offsetTop;
            if (DocUtils.isBefore(c, b)) {
                $(l).insertBefore(c),
                this._lastHoverIndex = e;
                return
            }
            e++
        }
        return m.append(l),
        this._lastHoverIndex = -1
    },
    b.prototype.addNamedChild = function(a, b) {
        return this.addChild(b),
        this.namedChildren[a] = b
    },
    b.prototype.getNamedChild = function(a) {
        return this.namedChildren[a]
    },
    b.prototype.prependChild = function(a) {
        if (!this._initChildControl(a)) return;
        return a.parentControl = this,
        this.children.splice(0, 0, a),
        this.childrenLookup[a.getId()] = a,
        this.trigger("childAdded", a)
    },
    b.prototype.addChild = function(a) {
        if ((a.controlId === "htmltextnode" || a.controlId === "htmlnode") && "text" in this._propertiesMap) return;
        if (!this._initChildControl(a)) return;
        return a.parentControl = this,
        this.children.push(a),
        this.childrenLookup[a.getId()] = a,
        this.trigger("childAdded", a)
    },
    b.prototype.setChildrenFrom = function(a) {
        return this.children = [],
        this.addChildrenOf(a)
    },
    b.prototype.addChildrenOf = function(a) {
        var b, c, d;
        c = 0,
        d = [];
        while (c < a.children.length) b = a.children[c],
        this.addChild(b),
        d.push(c++);
        return d
    },
    b.prototype.insertChild = function(a, b) {
        if (!this._initChildControl(a)) return;
        return a.parentControl = this,
        this.children.splice(b, 0, a),
        this.childrenLookup[a.getId()] = a,
        this.trigger("childAdded", a)
    },
    b.prototype.insertBefore = function(a, b) {
        var c, d;
        if (!this._initChildControl(b)) return;
        if (!a) {
            this.children.push(b),
            this.childrenLookup[b.getId()] = b,
            this.trigger("childAdded", b);
            return
        }
        b.parentControl = this,
        d = 0;
        while (d < this.children.length) {
            c = this.children[d];
            if (typeof a == "string") {
                if (c.getId() === a) {
                    d + 1 >= this.children.length ? this.children.push(b) : this.children.splice(d + 1, 0, b),
                    this.childrenLookup[b.getId()] = b,
                    this.trigger("childAdded", b);
                    return
                }
            } else if (c.getId() === a.getId()) {
                d + 1 >= this.children.length ? this.children.push(b) : this.children.splice(d + 1, 0, b),
                this.childrenLookup[b.getId()] = b,
                this.trigger("childAdded", b);
                return
            }
            d++
        }
    },
    b.prototype.insertAfter = function(a, b) {
        var c, d;
        if (!this._initChildControl(b)) return;
        b.parentControl = this,
        d = 0;
        while (d < this.children.length) {
            c = this.children[d];
            if (c.getId() === a.getId()) {
                this.children.splice(d, 0, b),
                this.childrenLookup[b.getId()] = b,
                this.trigger("childAdded", b);
                return
            }
            d++
        }
    },
    b.prototype.removeChild = function(a, b) {
        var c, d, e, f, g;
        g = -1,
        d = null,
        f = null,
        e = 0;
        while (e < this.children.length) {
            c = this.children[e];
            if (c.getId() === a.getId()) {
                f = c.parentControl,
                c.parentControl = null,
                d = c,
                g = e;
                break
            }
            e++
        }
        return g < 0 ? (console.error("Couldn't find child to remove!"), d) : (console.log("Removed child with id: " + a.getId()), this.children.splice(g, 1), delete this.childrenLookup[a.getId()], a.onAfterRemove && a.onAfterRemove(f, b), this.trigger("childRemoved", a), d)
    },
    b.prototype.removeControlAtIndex = function(a) {
        var b;
        if (a > this.children.length || a < 0) return;
        return b = this.children[a],
        b.parentControl = null,
        this.children.splice(a, 1),
        delete this.childrenLookup[b.getId()],
        this.trigger("childRemoved", b),
        b
    },
    b.prototype.moveChild = function(a, b) {
        var c, d, e;
        d = -1,
        e = 0;
        while (e < this.children.length) {
            c = this.children[e];
            if (c.getId() === a.getId()) {
                d = e;
                break
            }
            e++
        }
        return d < 0 ? -1 : (this.children.splice(e, 1), this.children.splice(b, 0, a), b)
    },
    b.prototype.relocateControl = function(a, b) {
        var c;
        return c = a.getParent(),
        c.removeChild(a),
        this.insertChild(a, b)
    },
    b.prototype.findChildrenByType = function(a) {
        var b, c, d;
        c = [],
        d = 0;
        while (d < this.children.length) b = this.children[d],
        b.getControlType() === a && c.push(b),
        d++;
        return c
    },
    b.prototype.getChildWithId = function(a) {
        var b, c;
        c = 0;
        while (c < this.children.length) {
            b = this.children[c];
            if (b.getId() === a) return b;
            c++
        }
        return null
    },
    b.prototype.hasChild = function(a) {
        var b, c;
        c = 0;
        while (c < this.children.length) {
            b = this.children[c];
            if (b.getId() === a.getId()) return ! 0;
            c++
        }
        return ! 1
    },
    b.prototype.getChild = function(a) {
        return a >= this.children.length || a < 0 ? null: this.children[a]
    },
    b.prototype.getChildPosition = function(a) {
        var b, c;
        c = 0;
        while (c < this.children.length) {
            b = this.children[c];
            if (b.getId() === a.getId()) return c;
            c++
        }
        return - 1
    },
    b.prototype.getChildren = function(a) {
        var b, c, d;
        if (a) {
            c = [],
            d = 0;
            while (d < this.children.length) b = this.children[d],
            b.controlId === a && c.push(b),
            d++;
            return c
        }
        return this.children
    },
    b.prototype.getParent = function() {
        return this.parentControl
    },
    b.prototype.getName = function() {
        return this.name
    },
    b.prototype.getDeviceExistingControl = function(a) {
        return a('[data-cid="' + this.getId() + '"]')
    },
    b.prototype.getDeviceRenderedEl = function() {
        return this._deviceRenderedEl
    },
    b.prototype.setDeviceRenderedEl = function(a) {
        return this._deviceRenderedEl = a
    },
    b.prototype.addChildAtPoint = function(a, b) {
        return this.addChild(a)
    },
    b.prototype.getIndexAtPoint = function(a) {
        return 0
    },
    b.prototype.onDragOver = function(a, b) {},
    b.prototype.onDragPosition = function(a) {
        if (this.parent) return this.parent.onDragPosition(a)
    },
    b.prototype.onDragDrop = function(a) {},
    b.prototype.onDragOut = function() {
        var a;
        return a = this.getDeviceRenderedEl().get(0),
        $(".shim", a).remove()
    },
    b.prototype.onDropFinished = function() {
        return $(".shim", this.getDeviceRenderedEl()).remove()
    },
    b.prototype.containsPoint = function(a) {
        var b, c, d, e, f;
        b = $(this.getDeviceRenderedEl()),
        e = b.offset(),
        f = b.outerWidth(),
        c = b.outerHeight(),
        d = this.getCalculatedMargin();
        if (d[3] < 0 && d[1] < 0) {
            if (a.x > e.left + f + -d[1] || a.x < e.left + d[3] || a.y > e.top + c || a.y < e.top) return ! 1
        } else if (a.x > e.left + f || a.x < e.left || a.y > e.top + c || a.y < e.top) return ! 1;
        return ! 0
    },
    b.prototype.isPointAfterMidway = function(a) {
        var b, c, d, e;
        return b = $(this.getDeviceRenderedEl()),
        d = b.offset(),
        e = b.outerWidth(),
        c = b.outerHeight(),
        a.y >= d.top + c / 2 && a.y <= d.top + c
    },
    b.prototype.getCalculatedWidth = function() {
        var a;
        return a = this._deviceRenderedEl,
        a ? $(a).outerWidth() : 0
    },
    b.prototype.getCalculatedMargin = function() {
        var a, b, c, d, e, f, g, h, i;
        return a = this._deviceRenderedEl,
        a ? (c = parseInt($(a).css("marginLeft")), g = parseInt($(a).css("paddingLeft")), e = parseInt($(a).css("marginTop")), i = parseInt($(a).css("paddingTop")), d = parseInt($(a).css("marginRight")), h = parseInt($(a).css("paddingRight")), b = parseInt($(a).css("marginBottom")), f = parseInt($(a).css("paddingBottom")), [e + i, d + h, b + f, c + g]) : [0, 0, 0, 0]
    },
    b.prototype.refresh = function() {},
    b.prototype.onAfterBind = function() {},
    b.prototype.setAlreadyAfterBound = function(a) {
        return this._alreadyAfterBound = a
    },
    b.prototype.hasAlreadyAfterBound = function() {
        return this._alreadyAfterBound
    },
    b.prototype.onPropertyChanged = function(a, b, c, d) {
        return this.trigger("propertyChanged", a, b, c),
        this.trigger("controlUpdated", this, d)
    },
    b
} (Backbone.View),
FormControlTemplate = function(a) {
    function b() {
        return b.__super__.constructor.apply(this, arguments)
    }
    return __extends(b, a),
    b.prototype.initialize = function() {
        return Control.prototype.initialize.call(this),
        this.isMini = new ScalarProperty(_t("Is mini"), new SelectWidget(new AcceptAllInputFilter, [{
            value: "false",
            text: _t("No")
        },
        {
            value: "true",
            text: _t("Yes")
        }]), "false"),
        this.addProperty("isMini", this.isMini, {
            pos: 1
        })
    },
    b.prototype.render = function() {
        var a, b, c, d, e, f, g, h, i, j;
        g = this._getRenderData(),
        h = "#template-control-" + this.templateName,
        f = renderTemplate(h, g),
        c = window.FrameDocument.createElement("div"),
        a = void 0,
        d = void 0,
        window.App.isPreviewMode() ? $(c, window.FrameDocument).html(f) : this.placeholderName ? (e = renderTemplate("#template-placeholder-" + this.placeholderName, g), $(c, window.FrameDocument).html(e)) : $(c, window.FrameDocument).html(f);
        if (c.children.length > 0) {
            a = $(c, window.FrameDocument).children(),
            d = $(a.get(0), window.FrameDocument),
            d.attr("data-cid", this.getId()),
            $(d, window.FrameDocument).addClass("codiqa-control"),
            this._isContainer && $(d, window.FrameDocument).addClass("codiqa-container");
            if (this.getControlType() === "page" && this._deviceRenderedEl) this._deviceRenderedEl.empty();
            else {
                if (this.controlId === "htmltextnode" || this.controlId === "htmlcommentnode") {
                    this._deviceRenderedEl = $(c).contents(),
                    this.trigger("controlRendered"),
                    this.el = c;
                    return
                }
                this._deviceRenderedEl = a
            }
            b = this.elementClass.value,
            b && this._deviceRenderedEl.addClass(b),
            this._layout.render(),
            this._layout.el.childNodes.length > 0 && this.positionLayoutElement(this._deviceRenderedEl, this._layout.el),
            this.trigger("controlRendered")
        }
        this.el = c,
        i = this.title;
        if (i) {
            j = i.value;
            if ($.trim(j) === "") return this._deviceRenderedEl.find("label").remove()
        }
    },
    b.prototype.renderTo = function(a) {
        var b, c, d, e, f, g, h, i;
        e = this._getRenderData(),
        g = "#template-control-" + this.templateName,
        f = Handlebars.compile($(g).html()),
        c = f(e),
        $(a).html(c),
        d = document.createElement("div"),
        this._layout.renderTo(d),
        b = this.elementClass.value,
        this.quickRenderTargetSelector ? ($(this.quickRenderTargetSelector, a).append($(d).contents()), b && $(this.quickRenderTargetSelector, a).addClass(b)) : ($(":first", a).append($(d).contents()), b && $(":first", a).addClass(b)),
        h = this.title;
        if (h) {
            i = h.value;
            if ($.trim(i) === "") return $(a).find("label").remove()
        }
    },
    b.prototype.initFromDomNode = function(a) {
        return Control.prototype.initFromDomNode.call(this, a),
        this.initProp(this.isMini, a, "data-mini")
    },
    b
} (Control),
ContentControlTemplate = function(a) {
    function b() {
        return b.__super__.constructor.apply(this, arguments)
    }
    return __extends(b, a),
    b.prototype.onDragOut = function() {
        var a;
        return a = this.getDeviceRenderedEl().get(0),
        $(".shim", a).remove()
    },
    b.prototype.onDragOver = function(a, b) {
        var c, d, e, f, g, h, i, j, k, l;
        c = ControlFactory.getControlForType(b);
        if (!c) return;
        l = c.defaultSize,
        j = this.getDeviceRenderedEl().get(0),
        $(".shim", j).remove(),
        d = j.children,
        f = null,
        k = $('<div class="shim"></div>'),
        c && l && k.css({
            width: l[0]
        });
        if (d.length <= 0) {
            $(j).append(k);
            return
        }
        e = 0;
        while (e < j.children.length) {
            c = j.children[e],
            h = c.offsetLeft,
            i = c.offsetTop;
            if (! (e + 1 < j.children.length)) {
                if (i < a.y) {
                    $(k).insertAfter(c);
                    return
                }
                $(k).insertBefore(c);
                return
            }
            g = j.children[e + 1];
            if (a.y > i && a.y < g.offsetTop) {
                $(k).insertAfter(c);
                return
            }
            if (a.y < i) {
                $(k).insertBefore(c);
                return
            }
            e++
        } ! (a.x < w / 2)
    },
    b.prototype.onDragPosition = function(a) {
        var b, c, d, e;
        e = $("> .codiqa-control", this.getDeviceRenderedEl()),
        $(".shim", e).remove(),
        c = e.children(),
        d = null;
        if (c.length <= 0 || a + 1 >= c.length || a === 0) {
            $(e).append('<div class="shim"></div>');
            return
        }
        return b = c[a + 1],
        $('<div class="shim"></div>').insertAfter(b)
    },
    b.prototype.addChildAtPoint = function(a, b) {
        var c, d, e;
        if (this.children.length < 1 || !b) {
            Control.prototype.addChildAtPoint.call(this, a, b);
            return
        }
        d = 0;
        while (d < this.children.length) {
            c = this.children[d],
            e = c.getDeviceRenderedEl().get(0);
            if (e.offsetTop > b.y) {
                this.insertChild(a, d);
                return
            }
            d++
        }
        return Control.prototype.addChildAtPoint.call(this, a, b)
    },
    b.prototype.getIndexAtPoint = function(a) {
        var b, c, d;
        if (this.children.length < 1 || !a) return 0;
        c = 0;
        while (c < this.children.length) {
            b = this.children[c],
            d = b.getDeviceRenderedEl().get(0);
            if (d.offsetTop < a.y) return c;
            c++
        }
        return 0
    },
    b
} (Control),
AppControl = function(a) {
    function b() {
        return b.__super__.constructor.apply(this, arguments)
    }
    return __extends(b, a),
    b.prototype.getOutputAppendNode = function() {
        return this._appendNode || (this._appendNode = $("<div />")),
        this._appendNode
    },
    b.prototype.initialize = function() {
        return Control.prototype.initialize.call(this),
        this.data = {
            title: ""
        },
        this.templateName = "app",
        this.name = _t("App"),
        this.controlId = "app",
        this.title = new Property(_t("Title"), new SingleTextWidget(new AcceptAllInputFilter), ""),
        this.scripts = new ArrayProperty(_t("Scripts"), new NullWidget, []),
        this.headScripts = new ArrayProperty(_t("Head Scripts"), new NullWidget, []),
        this.stylesheets = new ArrayProperty(_t("Stylesheets"), new NullWidget, []),
        this.initialSize = new ScalarProperty(_t("Initial Size"), new NullWidget, ""),
        this.activeJQMTheme = new ScalarProperty(_t("Active Theme"), new NullWidget, ""),
        this.framework = new ScalarProperty(_t("Framework"), new NullWidget, "jqm"),
        this.frameworkVersion = new ScalarProperty(_t("Framework Version"), new NullWidget, "1.3.1"),
        this.addProperty("title", this.title, {
            pos: 0
        }),
        this.addProperty("headScripts", this.headScripts, {
            pos: 1
        }),
        this.addProperty("scripts", this.scripts, {
            pos: 1
        }),
        this.addProperty("stylesheets", this.stylesheets, {
            pos: 2
        }),
        this.addProperty("initialSize", this.initialSize, {
            pos: 3
        }),
        this.addProperty("activeJQMTheme", this.activeJQMTheme, {
            pos: 4
        }),
        this.addProperty("framework", this.framework, {
            pos: 5
        }),
        this.addProperty("frameworkVersion", this.frameworkVersion, {
            pos: 6
        })
    },
    b
} (Control),
PageHeaderControl = function(a) {
    function b() {
        return b.__super__.constructor.apply(this, arguments)
    }
    return __extends(b, a),
    b.prototype.initialize = function() {
        var a, b, c, d;
        return d = this,
        Control.prototype.initialize.call(this),
        this._insertMode = InsertMode.PREPEND,
        this.setAppendMode(ControlAppendMode.PAGE_PREPEND),
        this.setIsContainer(!0),
        this.setSupportsSorting(!0),
        this.validParents = {
            page: 1
        },
        c = _t("Page header"),
        a = "fixed",
        b = "a",
        this.name = _t("Page Header"),
        this.controlId = "pageheader",
        this.templateName = "pageheader",
        this.title = new ScalarProperty(_t("Title"), new SingleTextWidget(new AcceptAllInputFilter), c),
        this.theme = new ScalarProperty(_t("Theme Swatch"), new ThemeSelectWidget(new AcceptAllInputFilter), b),
        this.isFixed = new ScalarProperty(_t("Fixed Mode"), new SelectWidget(new AcceptAllInputFilter, [{
            value: "",
            text: _t("No")
        },
        {
            value: "fixed",
            text: _t("Yes")
        }]), ""),
        this.noHeading = new ScalarProperty(_t("No Heading"), new NullWidget, "false"),
        this.addProperty("theme", this.theme, {
            pos: 1
        }),
        this.addProperty("isFixed", this.isFixed, {
            pos: 2
        }),
        this.addProperty("noHeading", this.noHeading, {
            pos: 3
        }),
        this.bind("childRemoved",
        function(a) {
            var b, c, d;
            c = !1,
            d = 0;
            while (d < this.children.length) {
                b = this.children[d];
                if (b.controlId === "heading") {
                    c = !0;
                    break
                }
                d++
            }
            if (!c) return this.noHeading.setValue("true"),
            this.trigger("controlUpdated", this, !1)
        }),
        this.bind("childAdded",
        function(a) {
            if (a.controlId === "heading") return this.noHeading.setValue("false"),
            this.trigger("controlUpdated", this, !1)
        })
    },
    b.prototype.initFromDomNode = function(a) {
        var b, c, d;
        Control.prototype.initFromDomNode.call(this, a),
        this.initProp(this.theme, a, "data-theme"),
        this.initProp(this.isFixed, a, "data-position"),
        b = "false",
        c = 0;
        while (c < a.children.length) {
            d = a.children[c];
            if (d.nodeName.toLowerCase().match(/h\d/)) {
                b = "true";
                break
            }
            c++
        }
        return this.noHeading.setValue(b)
    },
    b.prototype.onHover = function(a, b) {
        return this.onDragOver(b, a.controlId)
    },
    b.prototype.onDragOver = function(a, b) {
        var c, d, e, f, g, h, i, j, k, l, m, n, o;
        c = ControlFactory.getControlForType(b);
        if (!c) return;
        g = b === "button" || b === "panelbutton",
        n = c.defaultSize,
        l = this._deviceRenderedEl.get(0),
        $(".shim", l).remove(),
        d = l.children,
        h = null,
        o = this._deviceRenderedEl.width(),
        e = this._deviceRenderedEl.height(),
        m = $('<div class="shim"></div>'),
        c && n && (g ? m.css({
            width: 63,
            height: 28
        }) : m.css({
            width: n[0],
            height: n[1]
        })),
        console.log("PageHeader onDragOver", a.y, e),
        g && a.y < e - 5 && (a.x < o / 2 ? (console.log("drag to left of header"), m.removeClass("ui-btn-right"), m.addClass("ui-btn ui-btn-left")) : (console.log("drag to right of header"), m.removeClass("ui-btn-left"), m.addClass("ui-btn ui-btn-right")));
        if (d.length <= 0) {
            $(l).append(m);
            return
        }
        f = 0;
        while (f < l.children.length) {
            c = l.children[f],
            j = c.offsetLeft,
            k = c.offsetTop;
            if (! (f + 1 < l.children.length)) {
                if (k < a.y) {
                    $(m).insertAfter(c);
                    return
                }
                $(m).insertBefore(c);
                return
            }
            i = l.children[f + 1];
            if (a.y > k && a.y < i.offsetTop) {
                $(m).insertAfter(c);
                return
            }
            if (a.y < k) {
                $(m).insertBefore(c);
                return
            }
            f++
        }
    },
    b.prototype.onDrop = function(a, b) {
        return this.addChildAtPoint(a, b)
    },
    b.prototype.addChildAtPoint = function(a, b) {
        var c, d, e, f, g;
        this._deviceRenderedEl && b && (g = this._deviceRenderedEl.width(), d = this._deviceRenderedEl.height(), (a.controlId === "button" || a.controlId === "panelbutton") && b.y < d - 5 && (b.x < g / 2 ? a.extraClasses.setValue("ui-btn-left") : a.extraClasses.setValue("ui-btn-right")));
        if (this.children.length < 1 || !b) {
            Control.prototype.addChildAtPoint.call(this, a, b);
            return
        }
        if (this.children.length < 1 || !b) {
            Control.prototype.addChildAtPoint.call(this, a, b);
            return
        }
        e = 0;
        while (e < this.children.length) {
            c = this.children[e],
            f = c.getDeviceRenderedEl().get(0);
            if (f.offsetTop > b.y) {
                this.insertChild(a, e);
                return
            }
            e++
        }
        return Control.prototype.addChildAtPoint.call(this, a, b)
    },
    b.prototype.getIndexAtPoint = function(a) {
        var b, c, d;
        if (this.children.length < 1 || !a) return 0;
        c = 0;
        while (c < this.children.length) {
            b = this.children[c],
            d = b.getDeviceRenderedEl().get(0);
            if (d.offsetTop < a.y) return c;
            c++
        }
        return 0
    },
    b.prototype.onAfterBind = function() {
        var a;
        return a = new HeadingControl,
        a.text.setValue(_t("Header")),
        a.size.setValue(3),
        this.addChild(a)
    },
    b.defaultSize = ["100%", 39],
    b
} (Control),
PageFooterControl = function(a) {
    function b() {
        return b.__super__.constructor.apply(this, arguments)
    }
    return __extends(b, a),
    b.prototype.initialize = function() {
        var a;
        return a = this,
        PageHeaderControl.prototype.initialize.call(this),
        this.title.setValue(_t("Page footer")),
        this._insertMode = InsertMode.APPEND,
        this.setAppendMode(ControlAppendMode.PAGE_APPEND),
        this.name = _t("Page Footer"),
        this.controlId = "pagefooter",
        this.templateName = "pagefooter",
        this.isFixed.setValue("fixed"),
        this.bind("childRemoved",
        function(a) {
            return this.noHeading.setValue(this.children.length ? "false": "true"),
            this.trigger("controlUpdated", this, !1)
        }),
        this.bind("childAdded",
        function(a) {
            return this.noHeading.setValue("false"),
            this.trigger("controlUpdated", this, !1)
        })
    },
    b.prototype.onDragOver = function(a, b) {
        var c, d, e, f, g, h, i, j, k, l, m, n;
        c = ControlFactory.getControlForType(b);
        if (!c) return;
        m = c.defaultSize,
        k = $(this.getDeviceRenderedEl()).get(0),
        $(".shim", k).remove(),
        d = k.children,
        g = null,
        n = this._deviceRenderedEl.width(),
        e = this._deviceRenderedEl.height(),
        l = $('<div class="shim"></div>'),
        c && m && (b === "button" ? l.css({
            width: 63,
            height: 28
        }) : l.css({
            width: m[0],
            height: m[1]
        })),
        b === "button" && (a.x < n / 2 ? (console.log("drag to left of header"), l.removeClass("ui-btn-right"), l.addClass("ui-btn ui-btn-left")) : (console.log("drag to right of header"), l.removeClass("ui-btn-left"), l.addClass("ui-btn ui-btn-right")));
        if (d.length <= 0) {
            $(k).append(l);
            return
        }
        f = 0;
        while (f < k.children.length) {
            c = k.children[f],
            i = c.offsetLeft,
            j = c.offsetTop;
            if (! (f + 1 < k.children.length)) {
                if (j < a.y) {
                    $(l).insertAfter(c);
                    return
                }
                $(l).insertBefore(c);
                return
            }
            h = k.children[f + 1];
            if (a.y > j && a.y < h.offsetTop) {
                $(l).insertAfter(c);
                return
            }
            if (a.y < j) {
                $(l).insertBefore(c);
                return
            }
            f++
        }
    },
    b.prototype.addChildAtPoint = function(a, b) {
        var c, d, e, f, g;
        this._deviceRenderedEl && b && (g = this._deviceRenderedEl.width(), d = this._deviceRenderedEl.height(), a.controlId === "button" && (b.x < g / 2 ? a.extraClasses.setValue("ui-btn-left") : a.extraClasses.setValue("ui-btn-right")));
        if (this.children.length < 1 || !b) {
            Control.prototype.addChildAtPoint.call(this, a, b);
            return
        }
        e = 0;
        while (e < this.children.length) {
            c = this.children[e],
            f = c.getDeviceRenderedEl().get(0);
            if (f.offsetTop > b.y) {
                this.insertChild(a, e);
                return
            }
            e++
        }
        return Control.prototype.addChildAtPoint.call(this, a, b)
    },
    b.prototype.getIndexAtPoint = function(a) {
        var b, c, d;
        if (this.children.length < 1 || !a) return 0;
        c = 0;
        while (c < this.children.length) {
            b = this.children[c],
            d = b.getDeviceRenderedEl().get(0);
            if (d.offsetTop < a.y) return c;
            c++
        }
        return 0
    },
    b.prototype.onAfterBind = function() {
        var a;
        return a = new HeadingControl,
        a.text.setValue(_t("Footer")),
        a.size.setValue(3),
        this.addChild(a)
    },
    b.defaultSize = ["100%", 39],
    b
} (PageHeaderControl),
TabBarControl = function(a) {
    function b() {
        return b.__super__.constructor.apply(this, arguments)
    }
    return __extends(b, a),
    b.prototype.initialize = function() {
        var a, b, c;
        return c = this,
        Control.prototype.initialize.call(this),
        this._insertMode = InsertMode.APPEND,
        this.setAppendMode(ControlAppendMode.PAGE_PREPEND),
        this.validParents = {
            page: 1
        },
        this.name = _t("Tab Bar"),
        this.controlId = "tabbar",
        this.templateName = "tabbar",
        b = window.App && window.App.getCurrentPageId() || "",
        a = [{
            text: _t("One"),
            url: b,
            icon: "home",
            theme: "",
            isActive: !0,
            transition: "fade"
        },
        {
            text: _t("Two"),
            url: "",
            icon: "star",
            theme: "",
            isActive: !1,
            transition: "fade"
        },
        {
            text: _t("Three"),
            url: "",
            icon: "info",
            theme: "",
            isActive: !1,
            transition: "fade"
        }],
        this.theme = new ScalarProperty(_t("Theme Swatch"), new ThemeSelectWidget(new AcceptAllInputFilter, !1), "a"),
        this.iconPos = new ScalarProperty(_t("Icon Position"), new IconSelectWidget(IconSelectWidget.ALIGN_ONLY), {
            align: "top"
        }),
        this.items = new ArrayProperty(_t("Items"), new TabBarItemsWidget(new AcceptAllInputFilter, !0), a),
        this.addProperty("theme", this.theme, {
            pos: 0
        }),
        this.addProperty("iconPos", this.iconPos, {
            pos: 0
        }),
        this.addProperty("items", this.items, {
            pos: 100
        })
    },
    b.prototype.addChild = function(a) {},
    b.prototype.initFromDomNode = function(a) {
        var c, d, e = this;
        return b.__super__.initFromDomNode.call(this, a),
        this.initProp(this.iconPos, a, "data-iconpos"),
        this.initProp(this.theme, a, "data-theme"),
        this.items.setValue([]),
        c = [],
        d = $(a).find("> ul > li"),
        d.each(function(a, b) {
            var d, e, f, g, h, i, j;
            return f = $(b).find("> a"),
            j = f.attr("href"),
            j.indexOf("#") === 0 && (j = j.substring(1)),
            i = f.data("transition"),
            h = f.data("theme"),
            d = f.data("icon"),
            e = f.hasClass("ui-btn-active"),
            g = $.trim($(f).html()),
            c.push({
                url: j,
                transition: i,
                theme: h,
                icon: d,
                isActive: e,
                text: g
            })
        }),
        this.items.setValue(c)
    },
    b.defaultSize = ["100%", 36],
    b
} (Control),
NavBarControl = function(a) {
    function b() {
        return b.__super__.constructor.apply(this, arguments)
    }
    return __extends(b, a),
    b.prototype.initialize = function() {
        var a, b, c;
        return c = this,
        Control.prototype.initialize.call(this),
        this.name = _t("Nav Bar"),
        this.controlId = "navbar",
        this.templateName = "navbar",
        b = window.App && window.App.getCurrentPageId() || "",
        a = [{
            text: _t("Button"),
            url: b,
            icon: "",
            theme: "",
            isActive: !1,
            transition: "fade"
        }],
        this.iconPos = new ScalarProperty(_t("Icon Position"), new IconSelectWidget(IconSelectWidget.ALIGN_ONLY), {
            align: "top"
        }),
        this.items = new ArrayProperty(_t("Items"), new ButtonListItemWidget(new AcceptAllInputFilter), a),
        this.addProperty("iconPos", this.iconPos, {
            pos: 0
        }),
        this.addProperty("items", this.items, {
            pos: 100
        })
    },
    b.prototype.addChild = function(a) {},
    b.prototype.initFromDomNode = function(a) {
        var c, d, e = this;
        return b.__super__.initFromDomNode.call(this, a),
        this.initProp(this.iconPos, a, "data-iconpos"),
        this.items.setValue([]),
        c = [],
        d = $(a).find("> ul > li"),
        d.each(function(a, b) {
            var d, e, f, g, h, i, j;
            return f = $(b).find("> a"),
            j = f.attr("href"),
            j.indexOf("#") === 0 && (j = j.substring(1)),
            i = f.data("transition"),
            h = f.data("theme"),
            d = f.data("icon"),
            e = f.hasClass("ui-btn-active"),
            g = $.trim($(f).html()),
            c.push({
                url: j,
                transition: i,
                theme: h,
                icon: d,
                isActive: e,
                text: g
            })
        }),
        this.items.setValue(c)
    },
    b.defaultSize = ["100%", 36],
    b
} (Control),
HeaderNavBarControl = function(a) {
    function b() {
        return b.__super__.constructor.apply(this, arguments)
    }
    return __extends(b, a),
    b.prototype.initialize = function() {
        return NavBarControl.prototype.initialize.call(this, "header")
    },
    b
} (NavBarControl),
FooterNavBarControl = function(a) {
    function b() {
        return b.__super__.constructor.apply(this, arguments)
    }
    return __extends(b, a),
    b.prototype.initialize = function() {
        return NavBarControl.prototype.initialize.call(this, "footer")
    },
    b
} (NavBarControl),
PageContentControl = function(a) {
    function b() {
        return b.__super__.constructor.apply(this, arguments)
    }
    return __extends(b, a),
    b.prototype.initialize = function() {
        return Control.prototype.initialize.call(this),
        this.templateName = "pagecontent",
        this.name = _t("Page Content"),
        this.controlId = "pagecontent",
        this._supportsSorting = !0,
        this.setIsContainer(!0)
    },
    b.prototype.acceptControl = function(a) {
        return a.getControlType() !== "pageheader" && a.getControlType() !== "pagefooter" && a.getControlType() !== "tabbar"
    },
    b.prototype.onDragOut = function() {
        var a;
        return a = this.getDeviceRenderedEl().get(0),
        $(".shim", a).remove()
    },
    b.prototype.onDragOver = function(a, b) {
        var c, d, e, f, g, h, i, j, k, l;
        c = ControlFactory.getControlForType(b);
        if (!c) return;
        l = c.defaultSize,
        j = this.getDeviceRenderedEl().get(0),
        $(".shim", j).remove(),
        d = j.children,
        f = null,
        k = $('<div class="shim"></div>'),
        c && l && k.css({
            width: l[0]
        });
        if (d.length <= 0) {
            $(j).append(k);
            return
        }
        e = 0;
        while (e < j.children.length) {
            c = j.children[e],
            h = c.offsetLeft,
            i = c.offsetTop;
            if (! (e + 1 < j.children.length)) {
                if (i < a.y) {
                    $(k).insertAfter(c);
                    return
                }
                $(k).insertBefore(c);
                return
            }
            g = j.children[e + 1];
            if (a.y > i && a.y < g.offsetTop) {
                $(k).insertAfter(c);
                return
            }
            if (a.y < i) {
                $(k).insertBefore(c);
                return
            }
            e++
        } ! (a.x < w / 2)
    },
    b.prototype.onDragPosition = function(a) {
        var b, c, d, e;
        e = $("> .codiqa-control", this.getDeviceRenderedEl()),
        $(".shim", e).remove(),
        c = e.children(),
        d = null;
        if (c.length <= 0 || a + 1 >= c.length || a === 0) {
            $(e).append('<div class="shim"></div>');
            return
        }
        return b = c[a + 1],
        $('<div class="shim"></div>').insertAfter(b)
    },
    b.prototype.addChildAtPoint = function(a, b) {
        var c, d, e;
        if (this.children.length < 1 || !b) {
            Control.prototype.addChildAtPoint.call(this, a, b);
            return
        }
        d = 0;
        while (d < this.children.length) {
            c = this.children[d],
            e = c.getDeviceRenderedEl().get(0);
            if (e.offsetTop > b.y) {
                this.insertChild(a, d);
                return
            }
            d++
        }
        return Control.prototype.addChildAtPoint.call(this, a, b)
    },
    b.prototype.getIndexAtPoint = function(a) {
        var b, c, d;
        if (this.children.length < 1 || !a) return 0;
        c = 0;
        while (c < this.children.length) {
            b = this.children[c],
            d = b.getDeviceRenderedEl().get(0);
            if (d.offsetTop < a.y) return c;
            c++
        }
        return 0
    },
    b
} (Control),
PageControl = function(a) {
    function b() {
        return b.__super__.constructor.apply(this, arguments)
    }
    return __extends(b, a),
    b.prototype.initialize = function() {
        var a;
        return a = this,
        Control.prototype.initialize.call(this),
        this.name = _t("Page"),
        this.templateName = "page",
        this.controlId = "page",
        this.setIsContainer(!0),
        this.setSupportsSorting(!1),
        this.title = new ScalarProperty(_t("Title"), new SingleTextWidget(new AcceptAllInputFilter)),
        this.theme = new ScalarProperty(_t("Theme Swatch"), new ThemeSelectWidget(new AcceptAllInputFilter, !1), "c"),
        !EMBED && window.MODE !== "library" && window.MODE !== "nifty" ? this.bgImage = new ScalarProperty(_t("Background Image"), new ImageWidget(new AcceptAllInputFilter), "") : window.MODE === "library" ? this.bgImage = new ScalarProperty(_t("Image"), new NullWidget, "") : this.bgImage = new ScalarProperty(_t("Background Image URL"), new SingleTextWidget(new AcceptAllInputFilter), ""),
        this.bgImageRepeat = new ScalarProperty(_t("Background Image Repeat"), new SelectWidget(new AcceptAllInputFilter, [{
            value: "no-repeat",
            text: _t("No repeat")
        },
        {
            value: "repeat",
            text: "X and Y"
        },
        {
            value: "repeat-x",
            text: "X"
        },
        {
            value: "repeat-y",
            text: "Y"
        }]), "no-repeat"),
        this.isDefault = new ScalarProperty(_t("Is First Page?"), new NullWidget),
        this.contentPadding = new ScalarProperty(_t("Content Padding"), new PixelSizeWidget(new AcceptAllInputFilter), {
            value: "15",
            units: "px"
        }),
        this.addProperty("title", this.title, {
            pos: 2
        }),
        this.addProperty("isDefault", this.isDefault, {
            pos: 1
        }),
        this.addProperty("theme", this.theme, {
            pos: 2
        }),
        this.addProperty("bgImage", this.bgImage, {
            pos: 3
        }),
        this.addProperty("bgImageRepeat", this.bgImageRepeat, {
            pos: 4
        }),
        this.addProperty("contentPadding", this.contentPadding, {
            pos: 5
        }),
        a = this,
        this.isDefault.bind("propertyChanged",
        function(b, c, d) {
            return a.trigger("defaultPageChanged", a)
        }),
        this.elementId = new ScalarProperty(_t("Id"), new SingleTextWidget(new AcceptPageIDInputFilter, null, {
            mustCommit: !0
        }), ""),
        this.elementId.bind("propertyChanged",
        function(b, c, d) {
            return a._id = d,
            window.Codiqa && window.Codiqa.updatePageId && window.Codiqa.updatePageId(a, b, c)
        }),
        this.addProperty("elementId", this.elementId, {
            pos: 100
        })
    },
    b.prototype.addChildAtPoint = function(a, b) {
        var c, d, e, f, g, h;
        if (a.getControlType() === "pageheader") {
            e = 0,
            h = this.children;
            for (d = f = 0, g = h.length; f < g; d = ++f) c = h[d],
            c.getControlType() === "panel" && (e = d + 1);
            return this.insertChild(a, e)
        }
        return a.getControlType() === "pagefooter" || a.getControlType() === "tabbar" ? this.addChild(a) : Control.prototype.addChildAtPoint.call(this, a, b)
    },
    b.prototype.initFromDomNode = function(a) {
        Control.prototype.initFromDomNode.call(this, a),
        this.initProp(this.title, a, "data-control-title"),
        this.initProp(this.theme, a, "data-theme");
        if (a && a.id && a.id.length) return this.setId(a.id)
    },
    b.prototype.setId = function(a) {
        return this._id = a,
        this.elementId.setValue(a)
    },
    b.prototype.getId = function() {
        var a;
        return a = this.elementId.getValue(),
        a && $.trim(a) !== "" ? a: this._id
    },
    b
} (Control),
Handlebars.registerHelper("gridclass",
function(a, b) {
    var c;
    return c = {
        2 : "a",
        3 : "b",
        4 : "c",
        5 : "d"
    },
    c[a]
}),
GridControl = function(a) {
    function b() {
        return b.__super__.constructor.apply(this, arguments)
    }
    return __extends(b, a),
    b.prototype.initialize = function() {
        var a;
        return a = this,
        Control.prototype.initialize.call(this),
        this.setLayout(new GridLayout(this)),
        this.templateName = "grid",
        this.name = _t("Grid"),
        this.controlId = "grid",
        this.setIsContainer(!0),
        this.setSupportsSorting(!1),
        this.columns = new ScalarProperty(_t("Columns"), new SelectWidget(new AcceptAllInputFilter, [{
            value: "2",
            text: "2",
            selected: !0
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
        }]), "2"),
        this.rows = new ScalarProperty(_t("Rows"), new SelectWidget(new AcceptAllInputFilter, [{
            value: "1",
            text: "1",
            selected: !0
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
        }]), "1"),
        this.addProperty("columns", this.columns, {
            pos: 0
        }),
        this.addProperty("rows", this.rows, {
            pos: 1
        }),
        a = this,
        this.bind("propertyChanged",
        function(b, c, d) {
            var e, f;
            return f = parseInt(a.rows.getValue()),
            e = parseInt(a.columns.getValue()),
            a._resize(f, e)
        })
    },
    b.prototype.initFromDomNode = function(a) {
        var b, c, d, e, f, g, h;
        Control.prototype.initFromDomNode.call(this, a),
        e = /ui-grid-(\w)/.exec(a.className),
        e && e.length > 1 ? (h = {
            a: 2,
            b: 3,
            c: 4,
            d: 5
        } [e[1]], h && this.columns.setValue("" + h)) : this.columns.setValue("3"),
        f = 0,
        d = 0;
        while (d < a.children.length) b = a.children[d],
        b.className.match(/ui-block-/) && f++,
        d++;
        return c = parseInt(this.columns.getValue()),
        g = f / c,
        isNaN(g) ? this.rows.setValue("1") : this.rows.setValue("" + g)
    },
    b.prototype.onAfterBind = function() {
        var a, b;
        return a = new GridBlockControl,
        this.addChild(a),
        b = new GridBlockControl,
        this.addChild(b),
        this._gridList = [[a, b]],
        this._resize(parseInt(this.rows.getValue()), parseInt(this.columns.getValue()))
    },
    b.prototype._resize = function(a, b) {
        var c, d, e;
        d = void 0,
        c = void 0,
        d = 0;
        while (d < a * b) c = this.getChild(d),
        c || (c = new GridBlockControl, this.insertChild(c, d)),
        d++;
        e = [];
        while (this.children.length > a * b) e.push(this.removeControlAtIndex(a * b));
        return e
    },
    b.prototype.getGrid = function() {
        return this._gridList
    },
    b.defaultSize = ["100%", 60],
    b
} (Control),
GridBlockControl = function(a) {
    function b() {
        return b.__super__.constructor.apply(this, arguments)
    }
    return __extends(b, a),
    b.prototype.initialize = function() {
        var a;
        return a = this,
        Control.prototype.initialize.call(this),
        this.templateName = "gridblock",
        this.name = _t("Grid Block"),
        this.controlId = "gridblock",
        this.setIsContainer(!0),
        this.setSupportsSorting(!0),
        this.columnIndex = new ScalarProperty(_t("Index"), new SingleTextWidget(new AcceptAllInputFilter), "a"),
        this.addProperty("columnIndex", this.columnIndex, {
            pos: 0
        })
    },
    b.prototype.onDragOver = function(a, b) {
        var c, d, e, f, g, h, i, j, k, l;
        c = ControlFactory.getControlForType(b);
        if (!c) return;
        l = c.defaultSize,
        j = $(this.getDeviceRenderedEl()).get(0),
        $(".shim", j).remove(),
        d = j.children,
        f = null,
        k = $('<div class="shim"></div>'),
        c && l && k.css({
            width: l[0]
        });
        if (d.length <= 0) {
            $(j).append(k);
            return
        }
        e = 0;
        while (e < j.children.length) {
            c = j.children[e],
            h = c.offsetLeft,
            i = c.offsetTop;
            if (! (e + 1 < j.children.length)) {
                if (i < a.y) {
                    $(k).insertAfter(c);
                    return
                }
                $(k).insertBefore(c);
                return
            }
            g = j.children[e + 1];
            if (a.y > i && a.y < g.offsetTop) {
                $(k).insertAfter(c);
                return
            }
            if (a.y < i) {
                $(k).insertBefore(c);
                return
            }
            e++
        } ! (a.x < w / 2)
    },
    b.prototype.addChildAtPoint = function(a, b) {
        var c, d, e;
        if (this.children.length < 1 || !b) {
            Control.prototype.addChildAtPoint.call(this, a, b);
            return
        }
        d = 0;
        while (d < this.children.length) {
            c = this.children[d],
            e = c.getDeviceRenderedEl().get(0);
            if (e.offsetTop > b.y) {
                this.insertChild(a, d);
                return
            }
            d++
        }
        return Control.prototype.addChildAtPoint.call(this, a, b)
    },
    b.defaultSize = [60, 60],
    b
} (Control),
CollapsibleSetControl = function(a) {
    function b() {
        return b.__super__.constructor.apply(this, arguments)
    }
    return __extends(b, a),
    b.prototype.initialize = function() {
        var a, b, c, d = this;
        return c = this,
        Control.prototype.initialize.call(this),
        this.templateName = "collapsible",
        this.name = _t("Collapsible"),
        this.controlId = "collapsible",
        this.setIsContainer(!0),
        this.setSupportsSorting(!1),
        this.setSortableItemsSelector("> .ui-collapsible-content > [data-cid], > .ui-collapsible > .ui-collapsible-content > [data-cid]"),
        b = "",
        a = "",
        this.headerTheme = new ScalarProperty(_t("Header Theme"), new ThemeSelectWidget(new AcceptAllInputFilter), b),
        this.contentTheme = new ScalarProperty(_t("Content Theme"), new ThemeSelectWidget(new AcceptAllInputFilter), a),
        this.sections = new ArrayProperty(_t("Sections"), new AccordionSectionItemWidget(new AcceptAllInputFilter), []),
        this.addProperty("sections", this.sections, {
            pos: 100
        }),
        this.addProperty("headerTheme", this.headerTheme, {
            pos: 1
        }),
        this.addProperty("contentTheme", this.contentTheme, {
            pos: 2
        }),
        this.sections.bind("itemAdded",
        function(a) {
            var b;
            return b = new CollapsibleContentControl,
            b.headerText.setValue(a.text),
            b.isCollapsed.setValue(a.isCollapsed),
            c.addChild(b),
            a._controlId = b.getId()
        }),
        this.sections.bind("itemChanged",
        function(a, b) {
            var e, f, g, h, i, j, k, l, m, n;
            g = a._controlId,
            f = c.getChildWithId(g),
            console.log("Changed collapsible with id", g);
            if (!f) return;
            f.headerText.setValue(a.text),
            f.elementId.setValue(a.id);
            if (a.isCollapsed === "false") {
                m = d.sections.getItems();
                for (i = 0, k = m.length; i < k; i++) h = m[i],
                h.isCollapsed = "true";
                n = d.children;
                for (j = 0, l = n.length; j < l; j++) e = n[j],
                e.isCollapsed.setValue(a.isCollapsed);
                a.isCollapsed = "false"
            }
            return f.isCollapsed.setValue(a.isCollapsed),
            d.trigger("controlUpdated", d, !1)
        }),
        this.sections.bind("itemDeleted",
        function(a) {
            var b, d;
            d = a._controlId,
            b = c.getChildWithId(d),
            console.log("Changed collapsible with id", d);
            if (!b) return;
            return c.removeChild(b)
        }),
        this.sections.bind("itemMoved",
        function(a, b) {
            var d;
            d = c.getChild(a);
            if (d) return c.moveChild(d, b)
        }),
        this.sections.setValue([{
            text: _t("Section Header"),
            isCollapsed: "false"
        }])
    },
    b.prototype.onAfterBind = function() {
        var a;
        return a = new CollapsibleContentControl,
        a.headerText.setValue(_t("Section Header")),
        a.isCollapsed.setValue("false"),
        this.addChild(a),
        this.sections.getWidget()._data.items[0]._controlId = a.getId()
    },
    b.prototype.cloneControl = function(a) {
        var b, c, d, e, f, g;
        d = Control.prototype.cloneControl.call(this, a),
        g = d.children;
        for (c = e = 0, f = g.length; e < f; c = ++e) b = g[c],
        d.sections.getWidget()._data.items[c]._controlId = b.getId();
        return d
    },
    b.prototype.getCalculatedWidth = function() {
        var a;
        return a = $("h3:first").outerWidth(!0),
        a
    },
    b.prototype.getCalculatedMargin = function() {
        var a, b, c, d, e;
        return a = $("h3:first", this._deviceRenderedEl),
        a ? (c = parseInt($(a).css("marginLeft")), e = parseInt($(a).css("marginTop")), d = parseInt($(a).css("marginRight")), b = parseInt($(a).css("marginBottom")), [e, d, b, c]) : [0, 0, 0, 0]
    },
    b.prototype.acceptControl = function(a) {
        return ! 0
    },
    b.prototype.onDragOver = function(a, b) {},
    b.prototype.addChildAtPoint = function(a, b) {
        var c, d, e;
        if (this.sections.size() < 2 || !b) {
            if (this.children.length < 1 || !b) {
                Control.prototype.addChildAtPoint.call(this, a, b);
                return
            }
            d = 0;
            while (d < this.children.length) {
                c = this.children[d],
                e = c.getDeviceRenderedEl().get(0);
                if (e.offsetTop > b.y) {
                    this.insertChild(a, d);
                    return
                }
                d++
            }
        }
        return Control.prototype.addChildAtPoint.call(this, a, b)
    },
    b.prototype.getIndexAtPoint = function(a) {
        var b, c, d;
        if (this.children.length < 1 || !a) return 0;
        c = 0;
        while (c < this.children.length) {
            b = this.children[c],
            d = b.getDeviceRenderedEl().get(0);
            if (d.offsetTop < a.y) return c;
            c++
        }
        return 0
    },
    b.prototype.initFromDomNode = function(a) {
        var b, c;
        Control.prototype.initFromDomNode.call(this, a),
        this.initProp(this.headerTheme, a, "data-theme"),
        this.initProp(this.contentTheme, a, "data-content-theme"),
        c = $(a).find('[data-role="collapsible"]');
        if (c.length) return b = [],
        c.each(function() {
            var a, c, d;
            return c = _t($("h3:first", this).html()),
            d = $(this).attr("data-collapsed"),
            a = $(this).attr("id"),
            b.push({
                text: c,
                isCollapsed: d,
                id: a
            })
        }),
        this.sections.setValue(b)
    },
    b.defaultSize = ["100%", 60],
    b
} (Control),
CollapsibleContentControl = function(a) {
    function b() {
        return b.__super__.constructor.apply(this, arguments)
    }
    return __extends(b, a),
    b.prototype.initialize = function() {
        return Control.prototype.initialize.call(this),
        this.templateName = "collapsiblecontent",
        this.name = _t("CollapsibleContent"),
        this.controlId = "collapsiblecontent",
        this.setIsContainer(!0),
        this.setSupportsSorting(!0),
        this.setSortableItemsSelector("> .ui-collapsible-content > [data-cid]"),
        this.headerText = new ScalarProperty(_t("Header Text"), new NullWidget, _t("Section Header")),
        this.isCollapsed = new ScalarProperty(_t("Is Collapsed"), new NullWidget, "true"),
        this.addProperty("headerText", this.headerText, {
            pos: 0
        }),
        this.addProperty("isCollapsed", this.isCollapsed, {
            pos: 1
        })
    },
    b.prototype.initFromDomNode = function(a) {
        var c;
        return b.__super__.initFromDomNode.call(this, a),
        c = $("> :header:first", a),
        this.headerText.setValue($.trim(c.html()))
    },
    b.prototype.onDragOver = function(a, b) {
        var c, d, e, f, g, h, i, j, k, l;
        c = ControlFactory.getControlForType(b);
        if (!c) return;
        l = c.defaultSize,
        j = $(this.getDeviceRenderedEl()).children().get(1),
        $(".shim", j).remove(),
        d = j.children,
        f = null,
        k = $('<div class="shim"></div>'),
        c && l && k.css({
            width: l[0]
        });
        if (d.length <= 0) {
            $(j).append(k);
            return
        }
        e = 0;
        while (e < j.children.length) {
            c = j.children[e],
            h = c.offsetLeft,
            i = c.offsetTop;
            if (! (e + 1 < j.children.length)) {
                if (i < a.y) {
                    $(k).insertAfter(c);
                    return
                }
                $(k).insertBefore(c);
                return
            }
            g = j.children[e + 1];
            if (a.y > i && a.y < g.offsetTop) {
                $(k).insertAfter(c);
                return
            }
            if (a.y < i) {
                $(k).insertBefore(c);
                return
            }
            e++
        } ! (a.x < w / 2)
    },
    b.prototype.addChildAtPoint = function(a, b) {
        var c, d, e;
        if (this.children.length < 1 || !b) {
            Control.prototype.addChildAtPoint.call(this, a, b);
            return
        }
        d = 0;
        while (d < this.children.length) {
            c = this.children[d],
            e = c.getDeviceRenderedEl().get(0);
            if (e.offsetTop > b.y) {
                this.insertChild(a, d);
                return
            }
            d++
        }
        return Control.prototype.addChildAtPoint.call(this, a, b)
    },
    b
} (Control),
BareCollapsibleSetControl = function(a) {
    function b() {
        return b.__super__.constructor.apply(this, arguments)
    }
    return __extends(b, a),
    b.prototype.initialize = function() {
        return CollapsibleSetControl.prototype.initialize.call(this),
        this.templateName = "barecollapsible",
        this.name = "Collapsible",
        this.controlId = "barecollapsible",
        this.sections = new ChildrenArrayProperty("Items", this)
    },
    b.prototype.onAfterBind = function() {
        var a;
        return a = new BareCollapsibleContentControl,
        a.isCollapsed.setValue("false"),
        this.addChild(a)
    },
    b.prototype.addChildAtPoint = function(a, b) {
        return Control.prototype.addChildAtPoint.call(this, a, b)
    },
    b
} (CollapsibleSetControl),
BareCollapsibleContentControl = function(a) {
    function b() {
        return b.__super__.constructor.apply(this, arguments)
    }
    return __extends(b, a),
    b.prototype.initialize = function() {
        return CollapsibleContentControl.prototype.initialize.call(this),
        this.templateName = "barecollapsiblecontent",
        this.name = "CollapsibleContent",
        this.controlId = "barecollapsiblecontent",
        this.removeProperty("headerText")
    },
    b.prototype.onAfterBind = function() {
        var a;
        return a = new HeadingControl,
        a.text.setValue("Header"),
        a.size.setValue(3),
        this.addChild(a)
    },
    b.prototype.render = function() {
        return b.__super__.render.apply(this, arguments)
    },
    b.prototype.addChild = function(a) {
        return Control.prototype.addChild.call(this, a)
    },
    b.prototype.initFromDomNode = function(a) {
        return b.__super__.initFromDomNode.call(this, a)
    },
    b
} (CollapsibleContentControl),
HeadingControl = function(a) {
    function b() {
        return b.__super__.constructor.apply(this, arguments)
    }
    return __extends(b, a),
    b.prototype.initialize = function() {
        var a, b, c;
        return c = this,
        Control.prototype.initialize.call(this),
        a = 2,
        b = _t("Heading"),
        this.name = _t("Heading"),
        this.controlId = "heading",
        this.templateName = "heading",
        this.text = new ScalarProperty(_t("Text"), new SingleTextWidget(new AcceptAllInputFilter), b),
        this.addProperty("text", this.text, {
            pos: 0
        }),
        this.size = new ScalarProperty(_t("Size"), new SelectWidget(new AcceptAllInputFilter, [{
            value: 1,
            text: "1"
        },
        {
            value: 2,
            text: "2",
            selected: !0
        },
        {
            value: 3,
            text: "3"
        },
        {
            value: 4,
            text: "4"
        },
        {
            value: 5,
            text: "5"
        }]), a),
        this.addProperty("size", this.size, {
            pos: 1
        })
    },
    b.prototype.initFromDomNode = function(a) {
        var b;
        return Control.prototype.initFromDomNode.call(this, a),
        b = /H(\d)/.exec(a.nodeName),
        b && b.length > 1 ? this.size.setValue(b[1]) : this.size.setValue("3"),
        this.text.setValue($.trim(a.innerHTML))
    },
    b.defaultSize = ["100%", 24],
    b
} (Control),
HorizontalRuleControl = function(a) {
    function b() {
        return b.__super__.constructor.apply(this, arguments)
    }
    return __extends(b, a),
    b.prototype.initialize = function() {
        var a, b, c;
        return c = this,
        Control.prototype.initialize.call(this),
        this.name = _t("Divider"),
        this.controlId = "horizontalrule",
        this.templateName = "horizontalrule",
        this.placeholderName = this.templateName,
        b = "3",
        a = "#ccc",
        this.size = new ScalarProperty(_t("Size"), new SelectWidget(new AcceptAllInputFilter, [{
            value: "1",
            text: "1"
        },
        {
            value: "2",
            text: "2"
        },
        {
            value: "3",
            text: "3",
            selected: !0
        },
        {
            value: "4",
            text: "4"
        },
        {
            value: "5",
            text: "5"
        }]), b),
        this.addProperty("size", this.size, {
            pos: 0
        }),
        this.color = new ScalarProperty(_t("Color"), new SelectWidget(new AcceptAllInputFilter, [{
            value: "#000",
            text: "Black"
        },
        {
            value: "#ccc",
            text: "Gray",
            selected: !0
        },
        {
            value: "#fff",
            text: "White"
        }]), a),
        this.addProperty("color", this.color, {
            pos: 1
        })
    },
    b.prototype.initFromDomNode = function(a) {
        var b;
        this.initProp(this.elementId, a, "id"),
        this.color.setValue(a.style.backgroundColor);
        if (a.style.height.length) return b = a.style.height.replace("px", ""),
        this.size.setValue(b)
    },
    b.defaultSize = ["100%", 24],
    b
} (Control),
ParagraphControl = function(a) {
    function b() {
        return b.__super__.constructor.apply(this, arguments)
    }
    return __extends(b, a),
    b.prototype.initialize = function() {
        var a;
        return a = this,
        Control.prototype.initialize.call(this),
        this.setCanEditContent(!0),
        this.setContentEditWidget(new WysiWidget),
        this.name = _t("Paragraph"),
        this.controlId = "paragraph",
        this.templateName = "paragraph"
    },
    b.prototype.onAfterBind = function() {
        var a;
        return a = new HTMLTextNodeControl("Enter content here"),
        this.addChild(a)
    },
    b.defaultSize = ["100%", 24],
    b
} (Control),
TextBlockControl = function(a) {
    function b() {
        return b.__super__.constructor.apply(this, arguments)
    }
    return __extends(b, a),
    b.prototype.initialize = function() {
        var a, b;
        return b = this,
        Control.prototype.initialize.call(this),
        a = "<b>Enter content here...</b>",
        this.name = _t("Text"),
        this.controlId = "text",
        this.templateName = "textblock",
        this.text = new ScalarProperty(_t("Content"), new WysiWidget(new AcceptAllInputFilter), a),
        this.addProperty("text", this.text, {
            pos: 0
        })
    },
    b.defaultSize = ["100%", 24],
    b.prototype.addChild = function(a) {},
    b.prototype.initFromDomNode = function(a) {
        return b.__super__.initFromDomNode.call(this, a),
        this.text.setValue($.trim(a.innerHTML))
    },
    b
} (Control),
HtmlBlockControl = function(a) {
    function b() {
        return b.__super__.constructor.apply(this, arguments)
    }
    return __extends(b, a),
    b.prototype.initialize = function() {
        var a, b;
        return b = this,
        Control.prototype.initialize.call(this),
        a = "<p>Edit HTML here...</p>",
        this.name = _t("HTML"),
        this.controlId = "htmlblock",
        this.templateName = "htmlblock",
        this.html = new ScalarProperty(_t("Content"), new AceWidget(new AcceptAllInputFilter), a),
        this.addProperty("html", this.html, {
            pos: 0
        })
    },
    b.defaultSize = ["100%", 24],
    b.prototype.addChild = function(a) {},
    b.prototype.initFromDomNode = function(a) {
        return b.__super__.initFromDomNode.call(this, a),
        this.html.setValue($.trim(a.innerHTML))
    },
    b
} (Control),
ButtonControl = function(a) {
    function b() {
        return b.__super__.constructor.apply(this, arguments)
    }
    return __extends(b, a),
    b.prototype.initialize = function() {
        var a, b, c, d, e, f, g, h, i, j = this;
        return i = this,
        this.name = _t("Button"),
        this.controlId = "button",
        this.templateName = "button",
        Control.prototype.initialize.call(this),
        d = _t("Button"),
        c = "false",
        g = "",
        window.App && (h = window.App.getPages(), a = window.App.getCurrentPage(), a && (g = "#" + a.getId())),
        e = "",
        b = {
            icon: "",
            align: "left"
        },
        f = "fade",
        this.text = new ScalarProperty(_t("Text"), new SingleTextWidget(new AcceptAllInputFilter), d),
        this.isInline = new ScalarProperty(_t("Inline"), new SelectWidget(new AcceptAllInputFilter, [{
            value: "false",
            text: _t("No")
        },
        {
            value: "true",
            text: _t("Yes")
        }]), c),
        !window.EMBED && window.MODE !== "gdrive" && window.MODE !== "library" && window.MODE !== "nifty" ? this.icon = new ScalarProperty(_t("Icon"), new IconWidget(IconSelectWidget.ICON_ALIGN, new AcceptAllInputFilter), b) : this.icon = new ScalarProperty(_t("Icon"), new IconSelectWidget(IconSelectWidget.ICON_ALIGN, new AcceptAllInputFilter), b),
        this.theme = new ScalarProperty(_t("Theme Swatch"), new ThemeSelectWidget(new AcceptAllInputFilter), e),
        window.MODE === "library" ? (this.url = new ScalarProperty(_t("Link to"), new JavascriptLinkSelectWidget(new AcceptAllInputFilter, this), g), this.url.bindWidgetEvent("jsHandlerCleared",
        function(a) {
            return i.clickHandler.setValue("")
        }), this.url.bindWidgetEvent("jsHandlerChosen",
        function(a) {
            var b;
            b = window.Codiqa && window.Codiqa.onHandlerAttached(i.elementId.getValue(), "click", a);
            if (!b) return;
            return i.clickHandler.setValue(a),
            b.controlId && i.elementId.setValue(b.controlId),
            i.url.renderWidget()
        }), this.url.bindWidgetEvent("jsHandlerChoose",
        function() {
            var a;
            a = window.Codiqa && window.Codiqa.onHandlerRequested(i.elementId.getValue());
            if (!a) return;
            return a.controlId && i.elementId.setValue(a.controlId),
            i.clickHandler.setValue(a.name),
            i.url.setValue("#"),
            i.url.renderWidget()
        })) : this.url = new ScalarProperty(_t("Link to"), new UrlOrPageSelectWidget(new AcceptAllInputFilter), g),
        this.openNewWindow = new ScalarProperty(_t("Open in New Window"), new SelectWidget(new AcceptAllInputFilter, [{
            value: "true",
            text: _t("Yes")
        },
        {
            value: "false",
            text: _t("No")
        }]), "false"),
        this.isReverseTransition = new ScalarProperty(_t("Reverse Transition"), new SelectWidget(new AcceptAllInputFilter, [{
            value: "false",
            text: _t("No")
        },
        {
            value: "true",
            text: _t("Yes")
        }]), "false"),
        this.isBackButton = new ScalarProperty(_t("Back in history"), new SelectWidget(new AcceptAllInputFilter, [{
            value: "false",
            text: _t("No")
        },
        {
            value: "true",
            text: _t("Yes")
        }]), "false"),
        this.transition = new ScalarProperty(_t("Transition"), new TransitionSelectWidget(new AcceptAllInputFilter), f),
        this.extraClasses = new ScalarProperty(_t("Extra Classes"), new NullWidget, ""),
        this.clickHandler = new ScalarProperty(_t("Click Hander"), new NullWidget, ""),
        this.clickHandler.bind("propertyChanged",
        function(a, b) {
            return i.url.getWidget().setHandler(b)
        }),
        this.addProperty("clickHandler", this.clickHandler, {
            pos: 100
        }),
        this.addProperty("text", this.text, {
            pos: 0
        }),
        this.addProperty("url", this.url, {
            pos: 1
        }),
        this.addProperty("openNewWindow", this.openNewWindow, {
            pos: 2
        }),
        this.addProperty("transition", this.transition, {
            pos: 2
        }),
        this.addProperty("icon", this.icon, {
            pos: 3
        }),
        this.addProperty("theme", this.theme, {
            pos: 4
        }),
        this.addProperty("isInline", this.isInline, {
            pos: 5
        }),
        this.addProperty("isReverseTransition", this.isReverseTransition, {
            pos: 6
        }),
        this.addProperty("isBackButton", this.isBackButton, {
            pos: 7
        }),
        this.addProperty("extraClasses", this.extraClasses, {
            pos: 8
        }),
        this.url.setValue = function(a) {
            return i.url.value = a,
            a.indexOf("()") === -1 && !a.match(/^\w+:/) && a.indexOf("#") === -1 && (i.url.value = "#" + a),
            i.url._widget.setValue(i.url.value)
        },
        this.icon.on("propertyChanged",
        function(a, b, c) {
            if (i.text && (!i.text.value || i.text.value === "") && i.icon._widget._data.align !== "notext") return i.icon._widget.setAlign("notext")
        }),
        this.text.on("propertyChanged",
        function(a, b, c) {
            if (i.icon) {
                if (!c || !c.length) return i.icon._widget.setAlign("notext");
                if (i.icon._widget._data.align === "notext") return i.icon._widget.setAlign("left")
            }
        })
    },
    b.prototype.initFromDomNode = function(a) {
        var b, c, d;
        return Control.prototype.initFromDomNode.call(this, a),
        this.text.setValue($.trim(a.innerHTML)),
        this.initProp(this.isInline, a, "data-inline"),
        c = a.getAttribute("data-icon"),
        d = a.getAttribute("data-iconpos"),
        this.icon.setValue({
            icon: c,
            align: d
        }),
        this.initProp(this.url, a, "href"),
        b = Codiqa.getHandlerForId(a.id),
        b && this.clickHandler.setValue(b.name),
        this.initProp(this.theme, a, "data-theme"),
        this.isReverseTransition.setValue(a.getAttribute("data-direction") === "reverse"),
        this.isBackButton.setValue(a.getAttribute("data-rel") === "back"),
        this.initProp(this.transition, a, "data-transition"),
        this.initProp(this.extraClasses, a, "class")
    },
    b.defaultSize = ["100%", 40],
    b
} (Control),
LinkControl = function(a) {
    function b() {
        return b.__super__.constructor.apply(this, arguments)
    }
    return __extends(b, a),
    b.prototype.initialize = function() {
        var a, b, c;
        return c = this,
        Control.prototype.initialize.call(this),
        a = _t("Link"),
        b = "fade",
        this.quickRenderTargetSelector = ":first > :first",
        this.text = new ScalarProperty(_t("Text"), new SingleTextWidget(new AcceptAllInputFilter), a),
        this.url = new ScalarProperty(_t("Link to"), new UrlOrPageSelectWidget(new AcceptAllInputFilter), ""),
        this.transition = new ScalarProperty(_t("Transition"), new TransitionSelectWidget(new AcceptAllInputFilter), b),
        this.openNewWindow = new ScalarProperty(_t("Open in New Window"), new SelectWidget(new AcceptAllInputFilter, [{
            value: "true",
            text: _t("Yes")
        },
        {
            value: "false",
            text: _t("No")
        }]), "false"),
        this.addProperty("text", this.text, {
            pos: 0
        }),
        this.addProperty("url", this.url, {
            pos: 1
        }),
        this.addProperty("openNewWindow", this.openNewWindow, {
            pos: 2
        }),
        this.addProperty("transition", this.transition, {
            pos: 3
        }),
        this.name = _t("Link"),
        this.controlId = "link",
        this.templateName = "link"
    },
    b.prototype.initFromDomNode = function(a) {
        return Control.prototype.initFromDomNode.call(this, a),
        this.initProp(this.url, a, "href"),
        this.openNewWindow.setValue("" + a.getAttribute("target") == "_blank"),
        this.initProp(this.transition, a, "transition")
    },
    b.defaultSize = ["100%", 24],
    b
} (Control),
ListViewControl = function(a) {
    function b() {
        return b.__super__.constructor.apply(this, arguments)
    }
    return __extends(b, a),
    b.defaultSize = ["100%", 74],
    b.prototype.initialize = function() {
        var a;
        return b.__super__.initialize.apply(this, arguments),
        a = this,
        this.name = _t("List View"),
        this.controlId = "listview",
        this.templateName = "listview",
        this.dividerTheme = new ScalarProperty(_t("Divider Theme"), new ThemeSelectWidget(new AcceptAllInputFilter), "b"),
        this.isReadOnly = new ScalarProperty(_t("Read only"), new SelectWidget(new AcceptAllInputFilter, [{
            value: "true",
            text: _t("Yes")
        },
        {
            value: "false",
            text: _t("No")
        }]), "false"),
        this.displayInset = new ScalarProperty(_t("Inset"), new SelectWidget(new AcceptAllInputFilter, [{
            value: "true",
            text: _t("Yes")
        },
        {
            value: "false",
            text: _t("No")
        }]), "true"),
        this.items = new ArrayProperty("Items", new ListItemWidget(new AcceptAllInputFilter), []),
        this.addProperty("dividerTheme", this.dividerTheme, {
            pos: 1
        }),
        this.addProperty("isReadOnly", this.isReadOnly, {
            pos: 2
        }),
        this.addProperty("displayInset", this.displayInset, {
            pos: 2
        }),
        this.addProperty("items", this.items, {
            pos: 100
        }),
        this.items.setValue([{
            text: _t("Divider"),
            isDivider: !0
        },
        {
            text: _t("Button"),
            isDivider: !1,
            transition: "slide",
            theme: "c"
        }])
    },
    b.prototype.addChild = function(a) {},
    b.prototype.initFromDomNode = function(a) {
        var c, d, e, f, g, h, i, j;
        b.__super__.initFromDomNode.call(this, a),
        this.initProp(this.dividerTheme, a, "data-divider-theme"),
        this.initProp(this.displayInset, a, "data-inset"),
        this.items.setValue([]),
        f = $(a).find("> li"),
        j = [];
        for (h = 0, i = f.length; h < i; h++) e = f[h],
        e = $(e),
        d = {},
        d.isDivider = e.is('[data-role="list-divider"]'),
        d.theme = e.attr("[data-theme]"),
        c = e.find("a"),
        c.length ? (g = c.html(), d.transition = c.attr("[data-transition]")) : g = e.html(),
        d.text = $.trim(g),
        j.push(this.items.addItem(d));
        return j
    },
    b.prototype.render = function() {
        var a, c, d, e;
        if (this.items && this.items.propertyType === "array") {
            e = this.items.value;
            for (c = 0, d = e.length; c < d; c++) a = e[c],
            a.url && a.url.indexOf("#") !== 0 && a.url.indexOf(".") === -1 && (a.url = "#" + a.url)
        }
        return b.__super__.render.apply(this, arguments)
    },
    b
} (Control),
FlexibleListViewControl = function(a) {
    function b() {
        return b.__super__.constructor.apply(this, arguments)
    }
    return __extends(b, a),
    b.prototype.initialize = function() {
        var a, b = this;
        return Control.prototype.initialize.call(this),
        a = this,
        this.name = "List",
        this.controlId = "flexiblelistview",
        this.templateName = "flexiblelistview",
        this.dividerTheme = this.p({
            name: "Divider Theme",
            key: "dividerTheme",
            value: "b",
            defaultValue: "b",
            pos: 0,
            propertytype: ScalarProperty,
            widgettype: ThemeSelectWidget
        }),
        this.isReadOnly = this.p({
            name: "Read only",
            key: "isReadOnly",
            value: "false",
            defaultValue: "false",
            pos: 1,
            propertytype: ScalarProperty,
            widgettype: SelectWidget,
            widgetdata: [{
                value: "true",
                text: "Yes"
            },
            {
                value: "false",
                text: "No"
            }]
        }),
        this.displayInset = this.p({
            name: "Inset",
            key: "displayInset",
            value: "true",
            defaultValue: "true",
            pos: 2,
            propertytype: ScalarProperty,
            widgettype: SelectWidget,
            widgetdata: [{
                value: "true",
                text: "Yes"
            },
            {
                value: "false",
                text: "No"
            }]
        }),
        this.autoDivider = this.p({
            name: "Auto divider",
            key: "autoDivider",
            value: "false",
            defaultValue: "false",
            pos: 2,
            propertytype: ScalarProperty,
            widgettype: SelectWidget,
            widgetdata: [{
                value: "true",
                text: "Yes"
            },
            {
                value: "false",
                text: "No"
            }]
        }),
        this.items = new ChildrenArrayProperty("Items", this, {
            buttons: [{
                tag: "newitem",
                text: "Add Item"
            }]
        }),
        this.items.bindWidgetEvent("buttonClicked",
        function(a) {
            return b.processWidgetAction(a)
        }),
        this.addProperty("items", this.items, {
            pos: 200
        })
    },
    b.prototype.processWidgetAction = function(a) {
        var b;
        if (a === "newitem") return b = new BasicListItemControl,
        this.addChild(b)
    },
    b.prototype.addChild = function(a) {
        if (a.getType() !== "basiclistitem") return;
        return b.__super__.addChild.call(this, a)
    },
    b.prototype.onAfterBind = function() {
        var a, b, c;
        return a = new BasicListItemControl,
        b = new BasicListItemControl,
        c = new BasicListItemControl,
        this.addChild(a),
        this.addChild(b),
        this.addChild(c)
    },
    b.prototype.initFromDomNode = function(a) {
        var c, d = this;
        return b.__super__.initFromDomNode.call(this, a),
        this.initProp(this.dividerTheme, a, "data-divider-theme"),
        this.initProp(this.displayInset, a, "data-inset"),
        this.initProp(this.autoDivider, a, "data-autodividers"),
        c = $(a).find('li:not([data-role="list-divider"])'),
        c.each(function(a, b) {
            var c, e, f, g, h, i;
            return g = new BasicListItemControl,
            c = $(b).find("> a:first"),
            f = c.attr("href"),
            h = $(b).data("theme"),
            i = c.data("transition"),
            e = $.trim(c.find("> .ui-li-count").html()),
            g.text.setValue($.trim(c.html())),
            g.href.setValue(f),
            g.theme.setValue(h),
            g.transition.setValue(i),
            g.count.setValue(e),
            d.addChild(g)
        })
    },
    b
} (Control),
BasicListItemControl = function(a) {
    function b() {
        return b.__super__.constructor.apply(this, arguments)
    }
    return __extends(b, a),
    b.prototype.initialize = function() {
        var a;
        return Control.prototype.initialize.call(this),
        a = this,
        this.settings.renderParent = !0,
        this.name = "List Item",
        this.controlId = "basiclistitem",
        this.templateName = "basiclistitem",
        this.text = this.p({
            name: "Text",
            key: "text",
            value: "Item",
            pos: 0,
            propertytype: ScalarProperty,
            widgettype: SingleTextWidget
        }),
        this.href = this.p({
            name: "Link to",
            key: "href",
            value: "#",
            pos: 1,
            propertytype: ScalarProperty,
            widgettype: UrlOrPageSelectWidget
        }),
        this.theme = this.p({
            name: "Theme Swatch",
            key: "theme",
            value: "c",
            defaultValue: "c",
            pos: 2,
            propertytype: ScalarProperty,
            widgettype: ThemeSelectWidget
        }),
        this.transition = this.p({
            name: "Transition",
            key: "transition",
            value: "fade",
            defaultValue: "fade",
            pos: 3,
            propertytype: ScalarProperty,
            widgettype: TransitionSelectWidget
        }),
        this.count = this.p({
            name: "Count",
            key: "count",
            value: "",
            pos: 3,
            propertytype: ScalarProperty,
            widgettype: SingleTextWidget
        })
    },
    b
} (Control),
ThumbnailListViewControl = function(a) {
    function b() {
        return b.__super__.constructor.apply(this, arguments)
    }
    return __extends(b, a),
    b.prototype.initialize = function() {
        var a;
        return FlexibleListViewControl.prototype.initialize.call(this),
        a = this,
        this.name = "Thumbnail List",
        this.controlId = "thumbnaillistview",
        this.templateName = "flexiblelistview"
    },
    b.prototype.processWidgetAction = function(a) {
        var b;
        return a === "newitem" && (b = new ThumbnailListItemControl, this.addChild(b)),
        this.onPropertyChanged(this.items, [], [], !0)
    },
    b.prototype.addChild = function(a) {
        if (a.getType() !== "thumbnaillistitem") return;
        return Control.prototype.addChild.call(this, a)
    },
    b.prototype.initFromDomNode = function(a) {
        var c, d, e = this;
        return b.__super__.initFromDomNode.call(this, a),
        d = $(a).find('li:not([data-role="list-divider"])'),
        c = null,
        d.each(function(a, b) {
            var d, f, g, h, i, j, k, l;
            return c = new ThumbnailListItemControl,
            d = $(b).find("> a:first"),
            j = d.find("> img:first"),
            h = d.find("> :header:first"),
            g = d.find("> p:first"),
            i = d.attr("href"),
            k = d.data("theme"),
            l = d.data("transition"),
            f = $.trim(d.find("> .ui-li-count").html()),
            c.src.setValue(j.attr("src")),
            c.text.setValue($.trim(h.html())),
            c.subText.setValue($.trim(g.html())),
            c.href.setValue(i),
            c.theme.setValue(k),
            c.transition.setValue(l),
            c.count.setValue(f),
            e.addChild(c)
        })
    },
    b.prototype.onAfterBind = function() {
        var a, b, c;
        return a = new ThumbnailListItemControl,
        b = new ThumbnailListItemControl,
        c = new ThumbnailListItemControl,
        this.addChild(a),
        this.addChild(b),
        this.addChild(c)
    },
    b
} (FlexibleListViewControl),
ThumbnailListItemControl = function(a) {
    function b() {
        return b.__super__.constructor.apply(this, arguments)
    }
    return __extends(b, a),
    b.prototype.initialize = function() {
        var a;
        return Control.prototype.initialize.call(this),
        a = this,
        this.settings.renderParent = !0,
        this.name = "Thumbnail Item",
        this.controlId = "thumbnaillistitem",
        this.templateName = "thumbnaillistitem",
        this.text = this.p({
            name: "Text",
            key: "text",
            value: "Item",
            pos: 0,
            propertytype: ScalarProperty,
            widgettype: SingleTextWidget
        }),
        this.subText = this.p({
            name: "Sub Text",
            key: "subtext",
            value: "Description",
            pos: 0,
            propertytype: ScalarProperty,
            widgettype: SingleTextWidget
        }),
        this.src = this.p({
            name: "Image",
            key: "src",
            value: "https://codiqa.com/static/images/v2/image_component.jpg",
            pos: 1,
            propertytype: ScalarProperty,
            widgettype: ImageWidget
        }),
        this.href = this.p({
            name: "Link to",
            key: "href",
            value: "#",
            pos: 1,
            propertytype: ScalarProperty,
            widgettype: UrlOrPageSelectWidget
        }),
        this.theme = this.p({
            name: "Theme Swatch",
            key: "theme",
            value: "c",
            defaultValue: "c",
            pos: 2,
            propertytype: ScalarProperty,
            widgettype: ThemeSelectWidget
        }),
        this.transition = this.p({
            name: "Transition",
            key: "transition",
            value: "fade",
            defaultValue: "fade",
            pos: 3,
            propertytype: ScalarProperty,
            widgettype: TransitionSelectWidget
        }),
        this.count = this.p({
            name: "Count",
            key: "count",
            value: "",
            pos: 3,
            propertytype: ScalarProperty,
            widgettype: SingleTextWidget
        })
    },
    b.prototype.addChild = function(a) {},
    b.prototype.initFromDomNode = function(a) {},
    b
} (Control),
ImageControl = function(a) {
    function b() {
        return b.__super__.constructor.apply(this, arguments)
    }
    return __extends(b, a),
    b.prototype.initialize = function() {
        var a, b, c, d, e;
        return e = this,
        Control.prototype.initialize.call(this),
        c = "",
        d = "288",
        b = "200",
        a = "block",
        !window.EMBED && window.MODE !== "gdrive" && window.MODE !== "library" && window.MODE !== "nifty" ? this.url = new ScalarProperty(_t("Image"), new ImageWidget(new AcceptAllInputFilter), c) : window.MODE === "library" ? this.url = new ScalarProperty(_t("Image"), new ExternalImageWidget(new AcceptAllInputFilter), "") : this.url = new ScalarProperty(_t("Image URL"), new SingleTextWidget(new AcceptAllInputFilter), c),
        this.href = new ScalarProperty(_t("Link to"), new UrlOrPageSelectWidget(new AcceptAllInputFilter, !0), ""),
        this.width = new ScalarProperty(_t("Width"), new PixelSizeWidget(new AcceptAllInputFilter), {
            value: d,
            units: "px"
        }),
        this.height = new ScalarProperty(_t("Height"), new PixelSizeWidget(new AcceptAllInputFilter), {
            value: b,
            units: "px"
        }),
        this.align = new ScalarProperty(_t("Align"), new SelectWidget(new AcceptAllInputFilter, [{
            value: "left",
            text: _t("Left")
        },
        {
            value: "center",
            text: _t("Center")
        },
        {
            value: "right",
            text: _t("Right")
        }]), "left"),
        this.displayMode = new ScalarProperty(_t("Display"), new SelectWidget(new AcceptAllInputFilter, [{
            value: "block",
            text: _t("Block")
        },
        {
            value: "inline",
            text: _t("Inline")
        }]), a),
        this.openNewWindow = new ScalarProperty(_t("Open in New Window"), new SelectWidget(new AcceptAllInputFilter, [{
            value: "true",
            text: _t("Yes")
        },
        {
            value: "false",
            text: _t("No")
        }]), "false"),
        this.addProperty("url", this.url, {
            pos: 0
        }),
        this.addProperty("href", this.href, {
            pos: 0
        }),
        this.addProperty("width", this.width, {
            pos: 1
        }),
        this.addProperty("height", this.height, {
            pos: 2
        }),
        this.addProperty("align", this.align, {
            pos: 3
        }),
        this.addProperty("displayMode", this.displayMode, {
            pos: 4
        }),
        this.addProperty("openNewWindow", this.openNewWindow, {
            pos: 5
        }),
        this.url.getWidget().bind("dimensionsChanged",
        function(a, b) {
            return e.width.setValue({
                value: a,
                units: "px"
            }),
            e.height.setValue({
                value: b,
                units: "px"
            }),
            this.trigger("controlUpdated", this, !1)
        }),
        this.name = _t("Image"),
        this.controlId = "image",
        this.templateName = "image"
    },
    b.defaultSize = [288, 100],
    b
} (Control),
BasicImageControl = function(a) {
    function b() {
        return b.__super__.constructor.apply(this, arguments)
    }
    return __extends(b, a),
    b.prototype.initialize = function() {
        var a, b, c, d;
        return d = this,
        Control.prototype.initialize.call(this),
        b = "",
        c = "288",
        a = "100",
        this.url = new ScalarProperty(_t("Image URL"), new SingleTextWidget(new AcceptAllInputFilter), b),
        this.width = new ScalarProperty(_t("Width"), new SingleTextWidget(new AcceptAllInputFilter), c),
        this.height = new ScalarProperty(_t("Width"), new SingleTextWidget(new AcceptAllInputFilter), a),
        this.addProperty("url", this.url, {
            pos: 0
        }),
        this.addProperty("width", this.width, {
            pos: 1
        }),
        this.addProperty("height", this.height, {
            pos: 2
        }),
        this.name = _t("Image"),
        this.controlId = "image",
        this.templateName = "image"
    },
    b.defaultSize = [288, 100],
    b
} (Control),
FormControl = function(a) {
    function b() {
        return b.__super__.constructor.apply(this, arguments)
    }
    return __extends(b, a),
    b.prototype.initialize = function() {
        var a, b, c, d = this;
        return c = this,
        this.name = _t("Form"),
        this.controlId = "form",
        this.templateName = "form",
        Control.prototype.initialize.call(this),
        this.setIsContainer(!0),
        this.setSupportsSorting(!0),
        b = "GET",
        a = "true",
        this.url = new ScalarProperty(_t("Action (URL)"), new SingleTextWidget(new AcceptAllInputFilter), ""),
        this.method = new ScalarProperty(_t("Method"), new SelectWidget(new AcceptAllInputFilter, [{
            value: "GET",
            text: "GET"
        },
        {
            value: "POST",
            text: "POST"
        }]), b),
        this.ajax = new ScalarProperty(_t("Ajax Submit"), new SelectWidget(new AcceptAllInputFilter, [{
            value: "false",
            text: _t("No")
        },
        {
            value: "true",
            text: _t("Yes")
        }]), a),
        this.supportsFileUpload = this.p({
            name: _t("Enable File Uploads"),
            key: "enableFileUploads",
            defaultValue: "",
            value: "",
            pos: 2,
            propertytype: ScalarProperty,
            widgettype: SelectWidget,
            widgetdata: [{
                value: "multipart/form-data",
                text: "Yes"
            },
            {
                value: "",
                text: "No"
            }]
        }),
        this.hiddenFields = new ChildrenArrayProperty("Hidden fields", this, {
            typeFilter: "hiddeninput",
            fieldFilter: ["name", "value"],
            buttons: [{
                tag: "newitem",
                text: "Add Item"
            }]
        }),
        this.hiddenFields.bindWidgetEvent("buttonClicked",
        function(a) {
            var b;
            if (a === "newitem") return b = new HiddenInputControl,
            d.addChild(b)
        }),
        this.addProperty("hiddenfields", this.hiddenFields, {
            pos: 200
        }),
        this.addProperty("url", this.url, {
            pos: 0
        }),
        this.addProperty("action", this.method, {
            pos: 1
        }),
        this.addProperty("ajax", this.ajax, {
            pos: 2
        })
    },
    b.prototype.initFromDomNode = function(a) {
        return b.__super__.initFromDomNode.call(this, a),
        this.initProp(this.url, a, "action"),
        this.initProp(this.method, a, "method"),
        this.initProp(this.ajax, a, "data-ajax")
    },
    b.prototype.onDragOver = function(a, b) {
        var c, d, e, f, g, h, i, j, k, l;
        c = ControlFactory.getControlForType(b);
        if (!c) return;
        l = c.defaultSize,
        j = $(this.getDeviceRenderedEl()).get(0),
        $(".shim", j).remove(),
        d = j.children,
        f = null,
        k = $('<div class="shim"></div>'),
        c && l && k.css({
            width: l[0]
        });
        if (d.length <= 0) {
            $(j).append(k);
            return
        }
        e = 0;
        while (e < j.children.length) {
            c = j.children[e],
            h = c.offsetLeft,
            i = c.offsetTop;
            if (! (e + 1 < j.children.length)) {
                if (i < a.y) {
                    $(k).insertAfter(c);
                    return
                }
                $(k).insertBefore(c);
                return
            }
            g = j.children[e + 1];
            if (a.y > i && a.y < g.offsetTop) {
                $(k).insertAfter(c);
                return
            }
            if (a.y < i) {
                $(k).insertBefore(c);
                return
            }
            e++
        } ! (a.x < w / 2)
    },
    b.prototype.addChildAtPoint = function(a, b) {
        var c, d, e;
        if (this.children.length < 1 || !b) {
            Control.prototype.addChildAtPoint.call(this, a, b);
            return
        }
        d = 0;
        while (d < this.children.length) {
            c = this.children[d],
            e = c.getDeviceRenderedEl().get(0);
            if (e.offsetTop > b.y) {
                this.insertChild(a, d);
                return
            }
            d++
        }
        return Control.prototype.addChildAtPoint.call(this, a, b)
    },
    b.defaultSize = ["100%", 40],
    b
} (Control),
HiddenInputControl = function(a) {
    function b() {
        return b.__super__.constructor.apply(this, arguments)
    }
    return __extends(b, a),
    b.prototype.initialize = function() {
        var a;
        return a = this,
        this.name = _t("Hidden Input"),
        this.controlId = "hiddeninput",
        this.templateName = "hiddeninput",
        b.__super__.initialize.apply(this, arguments),
        this.nameField = this.p({
            name: _t("Name"),
            key: "name",
            value: "",
            pos: 3,
            propertytype: ScalarProperty,
            widgettype: SingleTextWidget
        }),
        this.nameField = this.p({
            name: _t("Value"),
            key: "value",
            value: "",
            pos: 3,
            propertytype: ScalarProperty,
            widgettype: SingleTextWidget
        })
    },
    b
} (Control),
TextInputControl = function(a) {
    function b() {
        return b.__super__.constructor.apply(this, arguments)
    }
    return __extends(b, a),
    b.prototype.initialize = function() {
        var a, b, c, d;
        return d = this,
        this.name = _t("Text Input"),
        this.controlId = "textinput",
        this.templateName = "textinput",
        FormControlTemplate.prototype.initialize.call(this),
        b = _t("Title"),
        a = "",
        c = "text",
        this.title = new ScalarProperty(_t("Title"), new SingleTextWidget(new AcceptAllInputFilter), b),
        this.addProperty("title", this.title, {
            pos: 0
        }),
        this.placeholder = new ScalarProperty(_t("Placeholder"), new SingleTextWidget(new AcceptAllInputFilter), a),
        this.addProperty("placeholder", this.placeholder, {
            pos: 1
        }),
        this.text = new ScalarProperty(_t("Initial Text"), new SingleTextWidget(new AcceptAllInputFilter), a),
        this.addProperty("text", this.text, {
            pos: 2
        }),
        this.nameField = new ScalarProperty(_t("Name"), new SingleTextWidget(new AcceptAllInputFilter), ""),
        this.addProperty("name", this.nameField, {
            pos: 0
        }),
        this.inputType = new ScalarProperty(_t("Input type"), new SelectWidget(new AcceptAllInputFilter, [{
            value: "text",
            text: "Text",
            selected: !0
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
            value: "range",
            text: "Range"
        },
        {
            value: "search",
            text: "Search"
        },
        {
            value: "number",
            text: "Number"
        },
        {
            value: "tel",
            text: "Phone Number"
        },
        {
            value: "url",
            text: "Url"
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
            value: "datetime",
            text: "Datetime"
        },
        {
            value: "datetime-l",
            text: "Datetime local"
        },
        {
            value: "color",
            text: "Color"
        }]), c),
        this.addProperty("type", this.inputType, {
            pos: 2
        })
    },
    b.prototype.initFromDomNode = function(a) {
        var c, d;
        b.__super__.initFromDomNode.call(this, a),
        d = $(a).find("label:first"),
        c = $(a).find("input:first"),
        c.length && (c = c.get(0), this.initProp(this.elementId, c, "id"), this.initProp(this.inputType, c, "type"), this.initProp(this.nameField, c, "name"), this.initProp(this.text, c, "value"), this.initProp(this.placeholder, c, "placeholder"), this.initProp(this.isMini, c, "data-mini"));
        if (d.length) return this.title.setValue($.trim(d.html()))
    },
    b.defaultSize = ["100%", 56],
    b
} (FormControlTemplate),
CameraInputControl = function(a) {
    function b() {
        return b.__super__.constructor.apply(this, arguments)
    }
    return __extends(b, a),
    b.prototype.initialize = function() {
        return this.name = _t("Photo Input"),
        this.controlId = "camerainput",
        this.templateName = "camerainput",
        b.__super__.initialize.apply(this, arguments),
        this.title = this.p({
            name: _t("Title"),
            key: "title",
            value: "",
            pos: 2,
            propertytype: ScalarProperty,
            widgettype: SingleTextWidget
        }),
        this.nameField = this.p({
            name: _t("Name"),
            key: "name",
            value: "",
            pos: 3,
            propertytype: ScalarProperty,
            widgettype: SingleTextWidget
        })
    },
    b.prototype.addChild = function(a) {},
    b.prototype.initFromDomNode = function(a) {
        var c, d;
        b.__super__.initFromDomNode.call(this, a),
        d = $(a).find("label:first"),
        c = $(a).find("input:first"),
        c.length && (c = c.get(0), this.initProp(this.elementId, c, "id"), this.initProp(this.nameField, c, "name"), this.initProp(this.isMini, c, "data-mini"));
        if (d.length) return this.title.setValue($.trim(d.html()))
    },
    b
} (FormControlTemplate),
FileInputControl = function(a) {
    function b() {
        return b.__super__.constructor.apply(this, arguments)
    }
    return __extends(b, a),
    b.prototype.initialize = function() {
        return this.name = _t("File Input"),
        this.controlId = "fileinput",
        this.templateName = "fileinput",
        b.__super__.initialize.apply(this, arguments),
        this.title = this.p({
            name: _t("Title"),
            key: "title",
            value: "",
            pos: 2,
            propertytype: ScalarProperty,
            widgettype: SingleTextWidget
        }),
        this.nameField = this.p({
            name: _t("Name"),
            key: "name",
            value: "",
            pos: 3,
            propertytype: ScalarProperty,
            widgettype: SingleTextWidget
        }),
        this.acceptTypes = this.p({
            name: _t("Filetype Restriction"),
            key: "acceptTypes",
            value: "",
            pos: 3,
            propertytype: ScalarProperty,
            widgettype: SingleTextWidget
        })
    },
    b.prototype.addChild = function(a) {},
    b.prototype.initFromDomNode = function(a) {
        var c, d;
        b.__super__.initFromDomNode.call(this, a),
        d = $(a).find("label:first"),
        c = $(a).find("input:first"),
        c.length && (c = c.get(0), this.initProp(this.elementId, c, "id"), this.initProp(this.nameField, c, "name"), this.initProp(this.acceptTypes, c, "accept"), this.initProp(this.isMini, c, "data-mini"));
        if (d.length) return this.title.setValue($.trim(d.html()))
    },
    b
} (FormControlTemplate),
SearchInputControl = function(a) {
    function b() {
        return b.__super__.constructor.apply(this, arguments)
    }
    return __extends(b, a),
    b.prototype.initialize = function() {
        var a, b, c;
        return c = this,
        FormControlTemplate.prototype.initialize.call(this),
        b = "",
        a = "",
        this.title = new ScalarProperty(_t("Title"), new SingleTextWidget(new AcceptAllInputFilter), b),
        this.addProperty("title", this.title, {
            pos: 0
        }),
        this.nameField = new ScalarProperty(_t("Name"), new SingleTextWidget(new AcceptAllInputFilter), ""),
        this.addProperty("name", this.nameField, {
            pos: 0
        }),
        this.placeholder = new ScalarProperty(_t("Placeholder"), new SingleTextWidget(new AcceptAllInputFilter), a),
        this.addProperty("placeholder", this.placeholder, {
            pos: 1
        }),
        this.text = new ScalarProperty(_t("Initial Text"), new SingleTextWidget(new AcceptAllInputFilter), a),
        this.addProperty("text", this.text, {
            pos: 2
        }),
        this.name = _t("Search Input"),
        this.controlId = "searchinput",
        this.templateName = "searchinput"
    },
    b.prototype.initFromDomNode = function(a) {
        var c, d;
        b.__super__.initFromDomNode.call(this, a),
        d = $(a).find("label:first"),
        c = $(a).find("input:first"),
        c.length && (c = c.get(0), this.initProp(this.elementId, c, "id"), this.initProp(this.nameField, c, "name"), this.initProp(this.text, c, "value"), this.initProp(this.placeholder, c, "placeholder"), this.initProp(this.isMini, c, "data-mini"));
        if (d.length) return this.title.setValue($.trim(d.html()))
    },
    b.defaultSize = ["100%", 56],
    b
} (FormControlTemplate),
DateInputControl = function(a) {
    function b() {
        return b.__super__.constructor.apply(this, arguments)
    }
    return __extends(b, a),
    b.prototype.initialize = function() {
        var a, b;
        return b = this,
        TextInputControl.prototype.initialize.call(this),
        this.name = _t("Date Input"),
        this.controlId = "dateinput",
        this.templateName = "dateinput",
        a = "date",
        this.inputType = new ScalarProperty(_t("Input type"), new SelectWidget(new AcceptAllInputFilter, [{
            value: "date",
            text: "Date",
            selected: !0
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
            value: "datetime",
            text: "Datetime"
        },
        {
            value: "datetime-l",
            text: "Datetime local"
        }]), a),
        this.addProperty("type", this.inputType, {
            pos: 2
        })
    },
    b.prototype.initFromDomNode = function(a) {
        var c;
        b.__super__.initFromDomNode.call(this, a),
        c = $(a).find("input:first");
        if (c.length) return this.inputType.setValue(c.attr("type"))
    },
    b
} (TextInputControl),
TextAreaControl = function(a) {
    function b() {
        return b.__super__.constructor.apply(this, arguments)
    }
    return __extends(b, a),
    b.prototype.initialize = function() {
        var a, b, c, d;
        return d = this,
        FormControlTemplate.prototype.initialize.call(this),
        b = _t("Title"),
        a = "",
        c = "text",
        this.title = new ScalarProperty(_t("Title"), new SingleTextWidget(new AcceptAllInputFilter), b),
        this.addProperty("title", this.title, {
            pos: 0
        }),
        this.nameField = new ScalarProperty(_t("Name"), new SingleTextWidget(new AcceptAllInputFilter), ""),
        this.addProperty("name", this.nameField, {
            pos: 0
        }),
        this.placeholder = new ScalarProperty(_t("Placeholder"), new SingleTextWidget(new AcceptAllInputFilter), a),
        this.addProperty("placeholder", this.placeholder, {
            pos: 1
        }),
        this.text = new ScalarProperty(_t("Initial Text"), new SingleTextWidget(new AcceptAllInputFilter), a),
        this.addProperty("text", this.text, {
            pos: 2
        }),
        this.name = _t("Text Area"),
        this.controlId = "textarea",
        this.templateName = "textarea"
    },
    b.prototype.addChild = function(a) {},
    b.prototype.initFromDomNode = function(a) {
        var c, d;
        b.__super__.initFromDomNode.call(this, a),
        d = $(a).find("label:first"),
        c = $(a).find("textarea:first"),
        c.length && (this.text.setValue($.trim(c.html())), c = c.get(0), this.initProp(this.elementId, c, "id"), this.initProp(this.nameField, c, "name"), this.initProp(this.text, c, "value"), this.initProp(this.placeholder, c, "placeholder"), this.initProp(this.isMini, c, "data-mini"));
        if (d.length) return this.title.setValue($.trim(d.html()))
    },
    b.defaultSize = ["100%", 56],
    b
} (FormControlTemplate),
ToggleSwitchControl = function(a) {
    function b() {
        return b.__super__.constructor.apply(this, arguments)
    }
    return __extends(b, a),
    b.prototype.initialize = function() {
        var a, b, c, d, e;
        return e = this,
        FormControlTemplate.prototype.initialize.call(this),
        d = "",
        b = _t("On"),
        a = _t("Off"),
        c = "",
        this.title = new ScalarProperty(_t("Title"), new SingleTextWidget(new AcceptAllInputFilter), d),
        this.off = new ScalarProperty(_t('"Off" text'), new SingleTextWidget(new AcceptAllInputFilter), a),
        this.on = new ScalarProperty(_t('"On" text'), new SingleTextWidget(new AcceptAllInputFilter), b),
        this.theme = new ScalarProperty(_t("Theme Swatch"), new ThemeSelectWidget(new AcceptAllInputFilter), c),
        this.addProperty("title", this.title, {
            pos: 0
        }),
        this.nameField = new ScalarProperty(_t("Name"), new SingleTextWidget(new AcceptAllInputFilter), ""),
        this.addProperty("name", this.nameField, {
            pos: 0
        }),
        this.addProperty("off", this.off, {
            pos: 1
        }),
        this.addProperty("on", this.on, {
            pos: 2
        }),
        this.addProperty("theme", this.theme, {
            pos: 3
        }),
        this.trackTheme = this.p({
            name: "Track Theme",
            key: "trackTheme",
            value: "",
            pos: 3,
            propertytype: ScalarProperty,
            widgettype: ThemeSelectWidget
        }),
        this.name = _t("Toggle Switch"),
        this.controlId = "toggleswitch",
        this.templateName = "toggleswitch"
    },
    b.prototype.initFromDomNode = function(a) {
        var c, d, e, f, g, h, i;
        b.__super__.initFromDomNode.call(this, a),
        d = $(a).find("label:first"),
        c = $(a).find("select:first"),
        c.length && (c = c.get(0), this.initProp(this.elementId, c, "id"), this.initProp(this.nameField, c, "name"), this.initProp(this.theme, c, "data-theme"), this.initProp(this.trackTheme, c, "data-track-theme"), this.initProp(this.isMini, c, "data-mini"), i = $(c).find("option"), i.length >= 2 && (f = $(i[0]).attr("value"), e = $.trim($(i[0]).html()), h = $(i[1]).attr("value"), g = $.trim($(i[1]).html()), this.off.setValue(e), this.on.setValue(g)));
        if (d.length) return this.title.setValue($.trim(d.html()))
    },
    b.prototype.addChild = function(a) {},
    b.defaultSize = ["100%", 64],
    b
} (FormControlTemplate),
RadioButtonControl = function(a) {
    function b() {
        return b.__super__.constructor.apply(this, arguments)
    }
    return __extends(b, a),
    b.prototype.initialize = function() {
        var a, b, c;
        return c = this,
        FormControlTemplate.prototype.initialize.call(this),
        this._supportsChildRendering = !1,
        b = _t("Choose:"),
        a = "vertical",
        this.nameField = new ScalarProperty(_t("Name"), new SingleTextWidget(new AcceptAllInputFilter), ""),
        this.addProperty("name", this.nameField, {
            pos: 0
        }),
        this.title = new ScalarProperty(_t("Title"), new SingleTextWidget(new AcceptAllInputFilter), b),
        this.addProperty("title", this.title, {
            pos: 0
        }),
        this.orientation = new ScalarProperty(_t("Orientation"), new SelectWidget(new AcceptAllInputFilter, [{
            value: "vertical",
            text: _t("Vertical"),
            selected: !0
        },
        {
            value: "horizontal",
            text: _t("Horizontal")
        }]), a),
        this.items = new ArrayProperty("Items", new RadioItemsWidget(new AcceptAllInputFilter), []),
        this.name = _t("Radio Buttons"),
        this.controlId = "radiobuttons",
        this.templateName = "radiobuttons",
        this.addProperty("orientation", this.orientation, {
            pos: 1
        }),
        this.addProperty("items", this.items, {
            pos: 2
        }),
        this.items.bind("itemAdded",
        function(a) {
            var b;
            return b = new RadioInputControl,
            c.addChild(b),
            b.title.setValue(a.text),
            b.value.setValue(b.getId()),
            a._controlId = b.getId(),
            a.value = b.getId()
        }),
        this.items.bind("itemChanged",
        function(a, b) {
            var d, e;
            e = a._controlId,
            d = c.getChildWithId(e),
            console.log("Changed text input with id", e);
            if (!d) return;
            return d.title.setValue(a.text),
            d.value.setValue(a.value),
            d.theme.setValue(a.theme)
        }),
        this.items.bind("itemDeleted",
        function(a) {
            var b, d;
            d = a._controlId,
            b = c.getChildWithId(d),
            console.log("Changed checkbox with id", d);
            if (!b) return;
            return c.removeChild(b)
        }),
        this.items.bind("itemMoved",
        function(a, b) {
            var d;
            d = c.getChild(a);
            if (d) return c.moveChild(d, b)
        }),
        this.items.setValue([{
            text: _t("Option"),
            value: "radio1"
        }])
    },
    b.prototype.cloneControl = function(a) {
        var b, c, d, e, f, g;
        d = Control.prototype.cloneControl.call(this, a),
        g = d.children;
        for (c = e = 0, f = g.length; e < f; c = ++e) b = g[c],
        d.items.getWidget()._data.items[c]._controlId = b.getId();
        return d
    },
    b.prototype.onAfterBind = function() {
        var a;
        return a = new RadioInputControl,
        this.addChild(a),
        a.title.setValue(_t("Option")),
        this.items.getWidget()._data.items[0]._controlId = a.getId()
    },
    b.prototype.positionLayoutElement = function(a, b) {
        var c;
        return c = $(b).contents(),
        c.insertAfter($("legend", a))
    },
    b.prototype.render = function() {
        var a, b;
        Control.prototype.render.call(this),
        a = this.title;
        if (a) {
            b = a.value;
            if ($.trim(b) === "") return this._deviceRenderedEl.find("legend:first").remove()
        }
    },
    b.prototype.renderTo = function(a) {
        var b, c, d, e, f, g, h, i;
        return e = this._getRenderData(),
        g = "#template-control-" + this.templateName,
        f = Handlebars.compile($(g).html()),
        b = f(e),
        $(a).html(b),
        d = $("legend", a),
        c = document.createElement("div"),
        this._layout.renderTo(c),
        $(c).children().insertAfter(d),
        h = this.title,
        h && (i = h.value, $.trim(i) === "" && $(a).find("legend:first").remove()),
        this.trigger("controlRendered")
    },
    b.prototype.addChild = function(a) {
        if (a.getType() !== "radio") return;
        return b.__super__.addChild.call(this, a)
    },
    b.prototype.initFromDomNode = function(a) {
        var c, d, e, f, g = this;
        return b.__super__.initFromDomNode.call(this, a),
        f = $(a),
        c = f.find("input"),
        e = f.find("legend:first"),
        this.title.setValue($.trim(e.html())),
        this.items.setValue([]),
        d = [],
        c.each(function(a, b) {
            var c, e;
            return e = $(b).next("label"),
            c = new RadioInputControl,
            c.title.setValue($.trim(e.html())),
            c.value.setValue($(b).attr("value")),
            g.addChild(c),
            d.push({
                text: c.title.getValue(),
                value: c.value.getValue()
            })
        })
    },
    b.defaultSize = ["100%", 89],
    b
} (FormControlTemplate),
RadioInputControl = function(a) {
    function b() {
        return b.__super__.constructor.apply(this, arguments)
    }
    return __extends(b, a),
    b.prototype.initialize = function() {
        var a;
        return a = this,
        Control.prototype.initialize.call(this),
        this.title = new ScalarProperty(_t("Title"), new SingleTextWidget(new AcceptAllInputFilter), ""),
        this.value = new ScalarProperty(_t("Value"), new SingleTextWidget(new AcceptAllInputFilter), ""),
        this.theme = new ScalarProperty(_t("Theme Swatch"), new ThemeSelectWidget(new AcceptAllInputFilter), "c"),
        this.addProperty("title", this.title, {
            pos: 0
        }),
        this.addProperty("value", this.value, {
            pos: 1
        }),
        this.addProperty("theme", this.theme, {
            pos: 2
        }),
        this.name = _t("Radio"),
        this.controlId = "radio",
        this.templateName = "radio"
    },
    b.defaultSize = ["100%", 89],
    b
} (Control),
CheckboxControl = function(a) {
    function b() {
        return b.__super__.constructor.apply(this, arguments)
    }
    return __extends(b, a),
    b.prototype.initialize = function() {
        var a, b, c;
        return c = this,
        FormControlTemplate.prototype.initialize.call(this),
        this._supportsChildRendering = !1,
        b = _t("Choose:"),
        a = "vertical",
        this.title = new ScalarProperty(_t("Title"), new SingleTextWidget(new AcceptAllInputFilter), b),
        this.addProperty("title", this.title, {
            pos: 0
        }),
        this.orientation = new ScalarProperty(_t("Orientation"), new SelectWidget(new AcceptAllInputFilter, [{
            value: "vertical",
            text: _t("Vertical"),
            selected: !0
        },
        {
            value: "horizontal",
            text: _t("Horizontal")
        }]), a),
        this.items = new ArrayProperty("Items", new CheckboxItemsWidget(new AcceptAllInputFilter), []),
        this.name = _t("Checkboxes"),
        this.controlId = "checkboxes",
        this.templateName = "checkboxes",
        this.addProperty("title", this.title, {
            pos: 0
        }),
        this.addProperty("orientation", this.orientation, {
            pos: 1
        }),
        this.addProperty("items", this.items, {
            pos: 2
        }),
        this.items.bind("itemAdded",
        function(a) {
            var b;
            return b = new CheckboxInputControl,
            b.title.setValue(a.text),
            b.nameField.setValue(a.name),
            c.addChild(b),
            a._controlId = b.getId()
        }),
        this.items.bind("itemChanged",
        function(a, b) {
            var d, e;
            e = a._controlId,
            d = c.getChildWithId(e),
            console.log("Changed text input with id", e);
            if (!d) return;
            return d.title.setValue(a.text),
            d.nameField.setValue(a.name),
            d.theme.setValue(a.theme)
        }),
        this.items.bind("itemDeleted",
        function(a) {
            var b, d;
            d = a._controlId,
            b = c.getChildWithId(d),
            console.log("Changed checkbox with id", d);
            if (!b) return;
            return c.removeChild(b)
        }),
        this.items.bind("itemMoved",
        function(a, b) {
            var d;
            d = c.getChild(a);
            if (d) return c.moveChild(d, b)
        }),
        this.items.setValue([{
            text: "Checkbox",
            name: ""
        }])
    },
    b.prototype.cloneControl = function(a) {
        var b, c, d, e, f, g;
        d = Control.prototype.cloneControl.call(this, a),
        g = d.children;
        for (c = e = 0, f = g.length; e < f; c = ++e) b = g[c],
        d.items.getWidget()._data.items[c]._controlId = b.getId();
        return d
    },
    b.prototype.onAfterBind = function() {
        var a;
        return a = new CheckboxInputControl,
        this.addChild(a),
        a.title.setValue(_t("Option")),
        this.items.getWidget()._data.items[0]._controlId = a.getId()
    },
    b.prototype.positionLayoutElement = function(a, b) {
        var c;
        return c = $(b).contents(),
        c.insertAfter($("legend", a))
    },
    b.prototype.addChild = function(a) {
        if (a.getType() !== "checkbox") return;
        return b.__super__.addChild.call(this, a)
    },
    b.prototype.initFromDomNode = function(a) {
        var c, d, e, f, g = this;
        return b.__super__.initFromDomNode.call(this, a),
        f = $(a),
        c = f.find("input"),
        e = f.find("legend:first"),
        this.title.setValue($.trim(e.html())),
        this.items.setValue([]),
        d = [],
        c.each(function(a, b) {
            var c, e;
            return e = $(b).next("label"),
            c = new CheckboxInputControl,
            c.title.setValue($.trim(e.html())),
            c.nameField.setValue($(b).attr("name")),
            g.addChild(c),
            d.push({
                text: c.title.getValue(),
                name: c.nameField.getValue()
            })
        }),
        this.items.setValue(d)
    },
    b.prototype.render = function() {
        var a, b;
        Control.prototype.render.call(this),
        a = this.title;
        if (a) {
            b = a.value;
            if ($.trim(b) === "") return this._deviceRenderedEl.find("legend:first").remove()
        }
    },
    b.prototype.renderTo = function(a) {
        var b, c, d, e, f, g, h, i;
        return e = this._getRenderData(),
        g = "#template-control-" + this.templateName,
        f = Handlebars.compile($(g).html()),
        b = f(e),
        $(a).html(b),
        d = $("legend", a),
        c = document.createElement("div"),
        this._layout.renderTo(c),
        $(c).children().insertAfter(d),
        h = this.title,
        h && (i = h.value, $.trim(i) === "" && $(a).find("legend:first").remove()),
        this.trigger("controlRendered")
    },
    b.defaultSize = ["100%", 89],
    b
} (FormControlTemplate),
CheckboxInputControl = function(a) {
    function b() {
        return b.__super__.constructor.apply(this, arguments)
    }
    return __extends(b, a),
    b.prototype.initialize = function() {
        var a;
        return a = this,
        Control.prototype.initialize.call(this),
        this.nameField = new ScalarProperty(_t("Name"), new SingleTextWidget(new AcceptAllInputFilter), ""),
        this.addProperty("name", this.nameField, {
            pos: 0
        }),
        this.title = new ScalarProperty(_t("Title"), new SingleTextWidget(new AcceptAllInputFilter), ""),
        this.addProperty("title", this.title, {
            pos: 0
        }),
        this.theme = new ScalarProperty(_t("Theme Swatch"), new ThemeSelectWidget(new AcceptAllInputFilter), "c"),
        this.addProperty("theme", this.theme, {
            pos: 1
        }),
        this.name = _t("Checkbox"),
        this.controlId = "checkbox",
        this.templateName = "checkbox"
    },
    b.defaultSize = ["100%", 89],
    b
} (Control),
SliderControl = function(a) {
    function b() {
        return b.__super__.constructor.apply(this, arguments)
    }
    return __extends(b, a),
    b.prototype.initialize = function() {
        var a, b, c, d;
        return d = this,
        this.name = _t("Slider"),
        this.controlId = "slider",
        this.templateName = "slider",
        FormControlTemplate.prototype.initialize.call(this),
        c = _t("Value"),
        b = "0",
        a = "100",
        this.nameField = new ScalarProperty(_t("Name"), new SingleTextWidget(new AcceptAllInputFilter), "slider"),
        this.title = new ScalarProperty(_t("Title"), new SingleTextWidget(new AcceptAllInputFilter), c),
        this.value = new ScalarProperty(_t("Value"), new SingleTextWidget(new AcceptAllInputFilter), "50"),
        this.min = new ScalarProperty(_t("Min Value"), new SingleTextWidget(new AcceptAllInputFilter), b),
        this.max = new ScalarProperty(_t("Max Value"), new SingleTextWidget(new AcceptAllInputFilter), a),
        this.isHighlight = new ScalarProperty(_t("Show Highlight"), new SelectWidget(new AcceptAllInputFilter, [{
            value: "false",
            text: _t("No")
        },
        {
            value: "true",
            text: _t("Yes")
        }]), "false"),
        this.theme = new ScalarProperty(_t("Theme Swatch"), new ThemeSelectWidget(new AcceptAllInputFilter), "c"),
        this.trackTheme = new ScalarProperty(_t("Track Theme"), new ThemeSelectWidget(new AcceptAllInputFilter), "c"),
        this.addProperty("title", this.title, {
            pos: 0
        }),
        this.addProperty("name", this.nameField, {
            pos: 1
        }),
        this.addProperty("value", this.value, {
            pos: 2
        }),
        this.addProperty("min", this.min, {
            pos: 3
        }),
        this.addProperty("max", this.max, {
            pos: 4
        }),
        this.addProperty("isMini", this.isMini, {
            pos: 5
        }),
        this.addProperty("isHighlight", this.isHighlight, {
            pos: 6
        }),
        this.addProperty("theme", this.theme, {
            pos: 7
        }),
        this.addProperty("trackTheme", this.trackTheme, {
            pos: 8
        })
    },
    b.prototype.addChild = function(a) {},
    b.prototype.initFromDomNode = function(a) {
        var c, d;
        b.__super__.initFromDomNode.call(this, a),
        d = $(a).find("label:first"),
        c = $(a).find("input:first"),
        c.length && (c = c.get(0), this.initProp(this.elementId, c, "id"), this.initProp(this.nameField, c, "name"), this.initProp(this.value, c, "value"), this.initProp(this.min, c, "min"), this.initProp(this.max, c, "max"), this.initProp(this.isMini, c, "data-mini"), this.initProp(this.isHighlight, c, "data-highlight"), this.initProp(this.theme, c, "data-theme"), this.initProp(this.trackTheme, c, "data-track-theme"));
        if (d.length) return this.title.setValue($.trim(d.html()))
    },
    b.defaultSize = ["100%", 40],
    b
} (FormControlTemplate),
SubmitButtonControl = function(a) {
    function b() {
        return b.__super__.constructor.apply(this, arguments)
    }
    return __extends(b, a),
    b.prototype.initialize = function() {
        var a, b, c, d, e;
        return e = this,
        this.name = _t("Submit Button"),
        this.controlId = "submitbutton",
        this.templateName = "submitbutton",
        FormControlTemplate.prototype.initialize.call(this),
        c = _t("Submit"),
        b = "false",
        d = "",
        a = {
            icon: "",
            align: "left"
        },
        this.text = new ScalarProperty(_t("Text"), new SingleTextWidget(new AcceptAllInputFilter), c),
        this.isInline = new ScalarProperty(_t("Is inline"), new SelectWidget(new AcceptAllInputFilter, [{
            value: "false",
            text: _t("No")
        },
        {
            value: "true",
            text: _t("Yes")
        }]), b),
        this.icon = new ScalarProperty(_t("Icon"), new IconSelectWidget(IconSelectWidget.ICON_ALIGN, new AcceptAllInputFilter), a),
        this.theme = new ScalarProperty(_t("Theme Swatch"), new ThemeSelectWidget(new AcceptAllInputFilter), d),
        this.addProperty("text", this.text, {
            pos: 0
        }),
        this.addProperty("isInline", this.isInline, {
            pos: 5
        }),
        this.addProperty("icon", this.icon, {
            pos: 6
        }),
        this.addProperty("theme", this.theme, {
            pos: 7
        })
    },
    b.prototype.initFromDomNode = function(a) {
        var c, d;
        return b.__super__.initFromDomNode.call(this, a),
        c = a.getAttribute("data-icon"),
        d = a.getAttribute("data-iconpos"),
        this.icon.setValue({
            icon: c,
            align: d
        }),
        this.initProp(this.text, a, "value"),
        this.initProp(this.isInline, a, "data-inline"),
        this.initProp(this.theme, a, "data-theme")
    },
    b.prototype.getDeviceExistingControl = function(a) {
        return a('[data-cid="' + this._id + '"]').parent()
    },
    b.defaultSize = ["100%", 40],
    b
} (FormControlTemplate),
SelectControl = function(a) {
    function b() {
        return b.__super__.constructor.apply(this, arguments)
    }
    return __extends(b, a),
    b.prototype.initialize = function() {
        var a, b, c, d, e;
        return e = this,
        FormControlTemplate.prototype.initialize.call(this),
        this._supportsChildRendering = !1,
        d = _t("Choose:"),
        a = "true",
        b = "vertical",
        c = "",
        this.title = new ScalarProperty(_t("Title"), new SingleTextWidget(new AcceptAllInputFilter), d),
        this.isNative = new ScalarProperty(_t("Is Native Menu"), new SelectWidget(new AcceptAllInputFilter, [{
            value: "false",
            text: _t("No")
        },
        {
            value: "true",
            text: _t("Yes")
        }]), a),
        this.nameField = new ScalarProperty(_t("Name"), new SingleTextWidget(new AcceptAllInputFilter), ""),
        this.addProperty("name", this.nameField, {
            pos: 0
        }),
        this.addProperty("title", this.title, {
            pos: 0
        }),
        this.addProperty("isNative", this.isNative, {
            pos: 1
        }),
        this.theme = new ScalarProperty(_t("Theme Swatch"), new ThemeSelectWidget(new AcceptAllInputFilter), c),
        this.items = new ArrayProperty(_t("Items"), new RadioItemsWidget(new AcceptAllInputFilter, _t("Add option")), []),
        this.name = _t("Select Menu"),
        this.controlId = "selectmenu",
        this.templateName = "selectmenu",
        this.addProperty("theme", this.theme, {
            pos: 2
        }),
        this.addProperty("items", this.items, {
            pos: 100
        }),
        this.items.setValue([{
            text: _t("Option 1"),
            value: "option1"
        }]),
        this.items.bind("itemAdded",
        function(a) {
            return a.value = "value"
        })
    },
    b.prototype.addChild = function(a) {},
    b.prototype.initFromDomNode = function(a) {
        var c, d, e, f;
        b.__super__.initFromDomNode.call(this, a),
        e = $(a).find("label:first"),
        c = $(a).find("select:first"),
        c.length && (f = c.find("option"), f.length && (d = [], f.each(function() {
            return d.push({
                text: _t(this.innerText),
                value: $(this).attr("value")
            })
        }), d.length && this.items.setValue(d)), c = c.get(0), this.initProp(this.elementId, c, "id"), this.initProp(this.nameField, c, "name"), this.initProp(this.isMini, c, "data-mini"), this.initProp(this.isNative, c, "data-native-menu"), this.initProp(this.theme, c, "data-theme"));
        if (e.length) return this.title.setValue($.trim(e.html()))
    },
    b.defaultSize = ["100%", 40],
    b
} (FormControlTemplate),
PanelButtonControl = function(a) {
    function b() {
        return b.__super__.constructor.apply(this, arguments)
    }
    return __extends(b, a),
    b.prototype.initialize = function() {
        var a, b, c, d = this;
        return c = this,
        ButtonControl.prototype.initialize.call(this),
        this.templateName = "panelbutton",
        this.controlId = "panelbutton",
        this.name = "Panel",
        b = _t("Panel"),
        this.theme = new ScalarProperty(_t("Button Theme"), new ThemeSelectWidget(new AcceptAllInputFilter), ""),
        this.panelId = new ScalarProperty(_t("Panel Id"), new NullWidget),
        this.listViewId = new ScalarProperty(_t("List View Id"), new NullWidget),
        this.text = new ScalarProperty(_t("Button Text"), new SingleTextWidget(new AcceptAllInputFilter), b),
        a = {
            icon: "bars",
            align: "left"
        },
        this.icon = new ScalarProperty(_t("Button Icon"), new IconWidget(IconSelectWidget.ICON_ALIGN, new AcceptAllInputFilter), a),
        this.isInline = new ScalarProperty(_t("Button Inline"), new SelectWidget(new AcceptAllInputFilter, [{
            value: "false",
            text: _t("No")
        },
        {
            value: "true",
            text: _t("Yes")
        }]), "No"),
        this.listDividerTheme = new ScalarProperty(_t("Divider Theme"), new ThemeSelectWidget(new AcceptAllInputFilter), "h"),
        this.listItems = new ArrayProperty("Items", new PanelListItemWidget(new AcceptAllInputFilter), []),
        this.listItems.setValue([{
            text: _t("Divider"),
            isDivider: !0
        },
        {
            text: _t("Button"),
            isDivider: !1,
            transition: "slide",
            theme: "a"
        }]),
        this.panelPosition = new ScalarProperty("Panel Position", new SelectWidget(new AcceptAllInputFilter, [{
            value: "left",
            text: "Left",
            selected: !0
        },
        {
            value: "right",
            text: "Right"
        }])),
        this.panelDisplay = new ScalarProperty("Panel Display", new SelectWidget(new AcceptAllInputFilter, [{
            value: "reveal",
            text: "Reveal",
            selected: !0
        },
        {
            value: "overlay",
            text: "Overlay"
        },
        {
            value: "push",
            text: "Push"
        }])),
        this.panelTheme = new ScalarProperty(_t("Panel Theme"), new ThemeSelectWidget(new AcceptAllInputFilter), "a"),
        this.addProperty("panelId", this.panelId, {
            pos: 0
        }),
        this.addProperty("listViewId", this.listViewId, {
            pos: 0
        }),
        this.addProperty("text", this.text, {
            pos: 0
        }),
        this.addProperty("icon", this.icon, {
            pos: 0
        }),
        this.addProperty("isInline", this.isInline, {
            pos: 0
        }),
        this.addProperty("theme", this.theme, {
            pos: 0
        }),
        this.addProperty("isInline", this.isInline, {
            pos: 0
        }),
        this.addProperty("panelPosition", this.panelPosition, {
            pos: 1
        }),
        this.addProperty("panelDisplay", this.panelDisplay, {
            pos: 1
        }),
        this.addProperty("panelTheme", this.panelTheme, {
            pos: 1
        }),
        this.addProperty("listDividerTheme", this.listDividerTheme, {
            pos: 2
        }),
        this.addProperty("listItems", this.listItems, {
            pos: 100
        }),
        this.removeProperty("url"),
        this.removeProperty("openNewWindow"),
        this.removeProperty("transition"),
        this.removeProperty("isReverseTransition"),
        this.removeProperty("isBackButton"),
        this.panelPosition.on("propertyChanged",
        function(a, b, c) {
            var e, f;
            f = d.getPanel();
            if (f) {
                f.position.setValue(c),
                e = window.FrameWindow.$("#" + f.getId(), window.FrameDocument);
                if (e.length) return e.panel("option", "position", c).removeClass("ui-panel-position-left").removeClass("ui-panel-position-right").addClass("ui-panel-position-" + c).attr("data-position", c)
            }
        }),
        this.panelDisplay.on("propertyChanged",
        function(a, b, c) {
            var e, f;
            f = d.getPanel();
            if (f) {
                f.display.setValue(c),
                e = window.FrameWindow.$("#" + f.getId(), window.FrameDocument);
                if (e.length) return e.panel("option", "display", c).removeClass("ui-panel-display-overlay").removeClass("ui-panel-display-reveal").removeClass("ui-panel-display-push").addClass("ui-panel-display-" + c).attr("data-display", c)
            }
        }),
        this.panelTheme.on("propertyChanged",
        function(a, b, c) {
            var e, f;
            f = d.getPanel();
            if (f) {
                f.theme.setValue(c),
                e = window.FrameWindow.$("#" + f.getId(), window.FrameDocument);
                if (e.length) return e.panel("option", "theme", c).removeClass("ui-body-a").removeClass("ui-body-b").removeClass("ui-body-c").removeClass("ui-body-d").removeClass("ui-body-e").removeClass("ui-body-f").removeClass("ui-body-g").removeClass("ui-body-h").addClass("ui-body-" + c).attr("data-theme", c)
            }
        }),
        this.listItems.on("propertyChanged",
        function(a, b, c) {
            var e;
            e = d.getListView();
            if (e) return e.items.setValue(c),
            d.trigger("controlUpdated", e, !1)
        }),
        this.listDividerTheme.on("propertyChanged",
        function(a, b, c) {
            var e;
            e = d.getListView();
            if (e) return e.dividerTheme.setValue(c),
            d.trigger("controlUpdated", e, !1)
        }),
        this.icon.on("propertyChanged",
        function(a, b, d) {
            if (c.text && (!c.text.value || c.text.value === "") && c.icon._widget._data.align !== "notext") return c.icon._widget.setAlign("notext")
        }),
        this.text.on("propertyChanged",
        function(a, b, d) {
            if (c.icon) {
                if (!d || !d.length) return c.icon._widget.setAlign("notext");
                if (c.icon._widget._data.align === "notext") return c.icon._widget.setAlign("left")
            }
        })
    },
    b.prototype.getPanel = function() {
        var a;
        a = this.getParentMatching("page");
        if (a) return a.childrenLookup[this.panelId.value]
    },
    b.prototype.getListView = function() {
        var a;
        a = this.getPanel();
        if (a) return a.childrenLookup[this.listViewId.value]
    },
    b.prototype.onAfterAdd = function() {
        var a, b, c;
        b = this.getParentMatching("page");
        if (b) return c = new PanelControl,
        a = new PanelListViewControl,
        a.dividerTheme.setValue("h"),
        a.displayInset.setValue("false"),
        c.addChild(a),
        this.addPanelToPageControl(c),
        console.log("Added panel", c.getId()),
        this.panelId.setValue(c.getId()),
        this.listViewId.setValue(a.getId()),
        this.trigger("controlUpdated", this, !1)
    },
    b.prototype.onAfterRemove = function(a, b) {
        var c, d, e, f, g;
        if (b) return;
        console.log("onAfterRemove, panel", this.panelId.value);
        if (a) {
            c = a.getParent();
            if (c && c.getType() === "page") {
                g = c.children;
                for (e = 0, f = g.length; e < f; e++) {
                    d = g[e];
                    if (d.getId() === this.panelId.value) {
                        c.removeChild(d),
                        this.trigger("controlUpdated", c, !1);
                        return
                    }
                }
                return console.log("Unable to find panel", this.panelId.value)
            }
            return console.log("Unable to find parent page")
        }
    },
    b.prototype.onAfterClone = function(a) {
        var b, c, d, e;
        return this.panelId.setValue(null),
        this.listViewId.setValue(null),
        d = a.getPanel(),
        d ? (e = this.getParentMatching("page"), e ? (c = d.cloneControl(!0, e), this.addPanelToPageControl(c), this.panelId.setValue(c.getId()), c.children.length ? (b = c.children[0], b ? this.listViewId.setValue(b.getId()) : console.log("Cloned panel does not have a listview")) : console.log("Cloned panel does not have any children")) : console.log("Unable to find page for new panel")) : console.log("Unable to find original panel")
    },
    b.prototype.addPanelToPageControl = function(a) {
        var b;
        b = this.getParentMatching("page");
        if (b && a) return b.prependChild(a),
        this.setRelation()
    },
    b.prototype.setRelation = function() {
        return this.panelControl = this.getPanel()
    },
    b.prototype.onSelected = function() {
        return this.setRelation()
    },
    b.prototype.close = function() {
        var a, b, c, d, e;
        d = this.getPanel();
        if (d) {
            b = window.FrameWindow.$("#" + d.getId(), window.FrameDocument);
            if (b.length) {
                e = b.data("mobile-panel");
                if (e) return c = this.getParentMatching("page"),
                c && (a = window.FrameWindow.$("#" + c.getId(), window.FrameDocument), a.removeClass("ui-body-a").removeClass("ui-body-b").removeClass("ui-body-c").removeClass("ui-body-d").removeClass("ui-body-e").removeClass("ui-body-f").removeClass("ui-body-g").removeClass("ui-body-h").addClass("ui-body-" + a.attr("data-theme")).jqmRemoveData("panel")),
                b.panel("close")
            }
        }
    },
    b
} (ButtonControl),
PanelControl = function(a) {
    function b() {
        return b.__super__.constructor.apply(this, arguments)
    }
    return __extends(b, a),
    b.prototype.initialize = function() {
        return ContentControlTemplate.prototype.initialize.call(this),
        this.name = "Panel",
        this.templateName = "panel",
        this.controlId = "panel",
        this._supportsChildRendering = !1,
        this.position = new ScalarProperty(_t("Position"), new NullWidget, "left"),
        this.display = new ScalarProperty(_t("Display"), new NullWidget, "reveal"),
        this.theme = new ScalarProperty(_t("Theme"), new ThemeSelectWidget(new AcceptAllInputFilter), "a"),
        this.addProperty("position", this.position, {
            pos: 0
        }),
        this.addProperty("display", this.display, {
            pos: 0
        }),
        this.addProperty("theme", this.theme, {
            pos: 0
        })
    },
    b.prototype.initFromDomNode = function(a) {
        return this.initProp(this.position, a, "data-position"),
        this.initProp(this.display, a, "data-display"),
        this.initProp(this.theme, a, "data-theme")
    },
    b.prototype.acceptControl = function(a) {
        return ! 1
    },
    b
} (ContentControlTemplate),
PanelListViewControl = function(a) {
    function b() {
        return b.__super__.constructor.apply(this, arguments)
    }
    return __extends(b, a),
    b.prototype.initialize = function() {
        return ListViewControl.prototype.initialize.call(this),
        this.name = "PanelListView",
        this.templateName = "listview",
        this.controlId = "panelListView",
        this._supportsChildRendering = !1,
        this.items = new ArrayProperty("Items", new PanelListItemWidget(new AcceptAllInputFilter), []),
        this.addProperty("items", this.items, {
            pos: 100
        }),
        this.items.setValue([{
            text: _t("Divider"),
            isDivider: !0
        },
        {
            text: _t("Button"),
            isDivider: !1,
            transition: "slide",
            theme: "a"
        }])
    },
    b
} (ListViewControl),
Handlebars.registerHelper("markerparams",
function(a, b) {
    var c, d;
    d = [],
    c = void 0,
    c = 0;
    while (c < a.length) d.push(a[c].location),
    c++;
    return d.join("|")
}),
GoogleMapsControl = function(a) {
    function b() {
        return b.__super__.constructor.apply(this, arguments)
    }
    return __extends(b, a),
    b.prototype.initialize = function() {
        var a;
        return a = this,
        this.name = _t("Map"),
        this.controlId = "googlemaps",
        this.templateName = "googlemaps",
        Control.prototype.initialize.call(this),
        this.loc = new ScalarProperty(_t("Location"), new SingleTextWidget(new AcceptAllInputFilter, 1e3), _t("Madison, WI")),
        this.zoom = new ScalarProperty(_t("Zoom Level"), new SingleTextWidget(new AcceptAllInputFilter, 500), "14"),
        this.width = new ScalarProperty(_t("Width"), new SingleTextWidget(new AcceptAllInputFilter, 500), "288"),
        this.height = new ScalarProperty(_t("Height"), new SingleTextWidget(new AcceptAllInputFilter, 500), "200"),
        this.markers = new ArrayProperty(_t("Markers"), new MapMarkerWidget(new AcceptAllInputFilter), [{
            location: _t("Madison, WI")
        }]),
        this.addProperty("loc", this.loc, {
            pos: 0
        }),
        this.addProperty("zoom", this.zoom, {
            pos: 2
        }),
        this.addProperty("width", this.width, {
            pos: 3
        }),
        this.addProperty("height", this.height, {
            pos: 4
        }),
        this.addProperty("markers", this.markers, {
            pos: 5
        })
    },
    b.defaultSize = ["100%", 200],
    b
} (Control),
GoogleMapsJSControl = function(a) {
    function b() {
        return b.__super__.constructor.apply(this, arguments)
    }
    return __extends(b, a),
    b.prototype.initialize = function() {
        var a;
        return a = this,
        this.name = _t("Map"),
        this.controlId = "googlemapsjs",
        this.templateName = "googlemapsjs",
        Control.prototype.initialize.call(this),
        this.placeholderName = this.templateName,
        this.loc = new ScalarProperty(_t("Location"), new SingleTextWidget(new AcceptAllInputFilter, 1e3), _t("Madison, WI")),
        this.zoom = new ScalarProperty(_t("Zoom Level"), new SingleTextWidget(new AcceptAllInputFilter, 500), "14"),
        this.width = new ScalarProperty(_t("Width"), new SingleTextWidget(new AcceptAllInputFilter, 500), "288"),
        this.height = new ScalarProperty(_t("Height"), new SingleTextWidget(new AcceptAllInputFilter, 500), "200"),
        this.addProperty("loc", this.loc, {
            pos: 0
        }),
        this.addProperty("zoom", this.zoom, {
            pos: 2
        }),
        this.addProperty("width", this.width, {
            pos: 3
        }),
        this.addProperty("height", this.height, {
            pos: 4
        })
    },
    b.defaultSize = ["100%", 200],
    b
} (Control),
YouTubeControl = function(a) {
    function b() {
        return b.__super__.constructor.apply(this, arguments)
    }
    return __extends(b, a),
    b.prototype.initialize = function() {
        var a, b, c;
        return c = this,
        b = "288",
        a = "216",
        Control.prototype.initialize.call(this),
        this.name = _t("YouTube"),
        this.controlId = "youtube",
        this.templateName = "youtube",
        this.placeholderName = this.templateName,
        this.videoId = new ScalarProperty(_t("Video Id"), new SingleTextWidget(new AcceptAllInputFilter, 1e3), "C0DPdy98e4c"),
        this.width = new ScalarProperty(_t("Width"), new PixelSizeWidget(new AcceptAllInputFilter), {
            value: b,
            units: "px"
        }),
        this.height = new ScalarProperty(_t("Height"), new PixelSizeWidget(new AcceptAllInputFilter), {
            value: a,
            units: "px"
        }),
        this.addProperty("videoId", this.videoId, {
            pos: 0
        }),
        this.addProperty("width", this.width, {
            pos: 1
        }),
        this.addProperty("height", this.height, {
            pos: 2
        })
    },
    b.prototype.initFromDomNode = function(a) {
        var b, c;
        return b = a.getAttribute("src"),
        b && (c = b.replace("http://www.youtube.com/embed/", ""), this.videoId.setValue(c)),
        this.initProp(this.width, a, "width"),
        this.initProp(this.height, a, "height")
    },
    b.defaultSize = ["100%", 100],
    b
} (Control),
VimeoControl = function(a) {
    function b() {
        return b.__super__.constructor.apply(this, arguments)
    }
    return __extends(b, a),
    b.prototype.initialize = function() {
        var a, b, c, d, e, f = this;
        return e = this,
        d = "288",
        a = "216",
        c = "12643828",
        b = "http://b.vimeocdn.com/ts/713/201/71320130_640.jpg",
        Control.prototype.initialize.call(this),
        this.name = _t("Vimeo"),
        this.controlId = "vimeo",
        this.templateName = "vimeo",
        this.placeholderName = this.templateName,
        this.videoId = new ScalarProperty(_t("Video Id"), new SingleTextWidget(new AcceptAllInputFilter, 1e3), c),
        this.width = new ScalarProperty(_t("Width"), new PixelSizeWidget(new AcceptAllInputFilter), {
            value: d,
            units: "px"
        }),
        this.height = new ScalarProperty(_t("Height"), new PixelSizeWidget(new AcceptAllInputFilter), {
            value: a,
            units: "px"
        }),
        this.addProperty("videoId", this.videoId, {
            pos: 0
        }),
        this.addProperty("width", this.width, {
            pos: 1
        }),
        this.addProperty("height", this.height, {
            pos: 2
        }),
        this.videoId.bind("propertyChanged",
        function(a, b, d) {
            return f.setThumbnail(d, c)
        }),
        this.videoId.bind("propertyInitialized",
        function(a) {
            return f.setThumbnail(a, c)
        }),
        this.thumbnail = b
    },
    b.prototype.initFromDomNode = function(a) {
        var b, c;
        return b = a.getAttribute("src"),
        b && (c = b.replace("http://player.vimeo.com/video/", ""), this.videoId.setValue(c)),
        this.initProp(this.width, a, "width"),
        this.initProp(this.height, a, "height")
    },
    b.defaultSize = ["100%", 100],
    b.prototype.setThumbnail = function(a, b) {
        var c = this;
        if (a !== b) return $.ajax({
            url: "http://vimeo.com/api/v2/video/" + a + ".json",
            jsonp: "callback",
            dataType: "jsonp",
            success: function(a) {
                if (a && a.length && a[0].thumbnail_large) return c.thumbnail = a[0].thumbnail_large,
                c.trigger("controlUpdated", c, !1)
            }
        })
    },
    b.defaultSize = ["100%", 100],
    b
} (Control),
SplitSecondaryContentControl = function(a) {
    function b() {
        return b.__super__.constructor.apply(this, arguments)
    }
    return __extends(b, a),
    b.prototype.initialize = function() {
        return ContentControlTemplate.prototype.initialize.call(this),
        this.setIsContainer(!0),
        this.setSupportsSorting(!0),
        this.name = _t("SplitSecondary"),
        this.controlId = "splitsecondary",
        this.templateName = "splitsecondary"
    },
    b
} (ContentControlTemplate),
SplitPrimaryContentControl = function(a) {
    function b() {
        return b.__super__.constructor.apply(this, arguments)
    }
    return __extends(b, a),
    b.prototype.initialize = function() {
        return ContentControlTemplate.prototype.initialize.call(this),
        this.setIsContainer(!0),
        this.setSupportsSorting(!0),
        this.name = _t("SplitPrimary"),
        this.controlId = "splitprimary",
        this.templateName = "splitprimary"
    },
    b
} (ContentControlTemplate),
SplitContentControl = function(a) {
    function b() {
        return b.__super__.constructor.apply(this, arguments)
    }
    return __extends(b, a),
    b.prototype.initialize = function() {
        var a;
        return a = this,
        Control.prototype.initialize.call(this),
        this.setIsContainer(!0),
        this.setSupportsSorting(!0),
        this.name = _t("Split Pane"),
        this.controlId = "split",
        this.templateName = "split"
    },
    b.prototype.acceptControl = function() {
        return ! 1
    },
    b.prototype.onAfterBind = function() {
        var a, b;
        return b = new SplitSecondaryContentControl,
        a = new SplitPrimaryContentControl,
        this.addChild(b),
        this.addChild(a)
    },
    b.defaultSize = ["100%", 200],
    b
} (Control),
HTMLTextNodeControl = function(a) {
    function b() {
        return b.__super__.constructor.apply(this, arguments)
    }
    return __extends(b, a),
    b.prototype.initialize = function(a) {
        var b;
        return Control.prototype.initialize.call(this),
        b = this,
        this.name = "HTML Text Node",
        this.controlId = "htmltextnode",
        this.templateName = "htmltextnode",
        this.data = new ScalarProperty("Content", new MultiTextWidget, a),
        this.addProperty("data", this.data, {
            pos: 0
        })
    },
    b.prototype.positionLayoutElement = function(a, b) {
        var c;
        return c = $(b, window.FrameDocument).contents(),
        a.append(c)
    },
    b
} (Control),
HTMLCommentNodeControl = function(a) {
    function b() {
        return b.__super__.constructor.apply(this, arguments)
    }
    return __extends(b, a),
    b.prototype.initialize = function(a) {
        var b;
        return Control.prototype.initialize.call(this),
        b = this,
        this.name = "HTML Comment Node",
        this.controlId = "htmlcommentnode",
        this.templateName = "htmlcommentnode",
        this.data = new ScalarProperty("Content", new MultiTextWidget, a),
        this.addProperty("data", this.data, {
            pos: 0
        })
    },
    b.prototype.positionLayoutElement = function(a, b) {
        var c;
        return c = $(b, window.FrameDocument).contents(),
        a.append(c)
    },
    b
} (Control),
HTMLNodeControl = function(a) {
    function b() {
        return b.__super__.constructor.apply(this, arguments)
    }
    return __extends(b, a),
    b.prototype.initialize = function(a, b, c) {
        var d, e, f;
        return Control.prototype.initialize.call(this),
        f = this,
        this.setIsContainer(!1),
        this.name = "Generic Element",
        this.controlId = "htmlnode",
        this.templateName = "htmlnode",
        this.nodeName = new ScalarProperty("Node Name", new NullWidget, a && a.toLowerCase()),
        this.attributes.setValue(b),
        c ? (e = new RegExp("</" + a, "i"), d = !e.test(c.outerHTML), this.isVoid = new ScalarProperty("Is Void", new NullWidget, d)) : this.isVoid = new ScalarProperty("Is Void", new NullWidget, !1),
        this.addProperty("nodeName", this.nodeName, {
            pos: 0
        }),
        this.addProperty("attributes", this.attributes, {
            pos: 1
        }),
        this.addProperty("isVoid", this.isVoid, {
            pos: 2
        })
    },
    b
} (Control),
ControlFactory = function(a) {
    function b() {
        return b.__super__.constructor.apply(this, arguments)
    }
    return __extends(b, a),
    b._controlMap = {
        pageheader: PageHeaderControl,
        pagecontent: PageContentControl,
        collapsible: CollapsibleSetControl,
        collapsiblecontent: CollapsibleContentControl,
        barecollapsiblecontent: BareCollapsibleContentControl,
        barecollapsible: BareCollapsibleSetControl,
        grid: GridControl,
        gridblock: GridBlockControl,
        tabbar: TabBarControl,
        navbar: NavBarControl,
        pagefooter: PageFooterControl,
        heading: HeadingControl,
        horizontalrule: HorizontalRuleControl,
        link: LinkControl,
        listview: ListViewControl,
        thumbnaillistitem: ThumbnailListItemControl,
        thumbnaillistview: ThumbnailListViewControl,
        page: PageControl,
        button: ButtonControl,
        text: TextBlockControl,
        htmlblock: HtmlBlockControl,
        image: ImageControl,
        hiddeninput: HiddenInputControl,
        textinput: TextInputControl,
        fileinput: FileInputControl,
        camerainput: CameraInputControl,
        searchinput: SearchInputControl,
        dateinput: DateInputControl,
        textarea: TextAreaControl,
        toggleswitch: ToggleSwitchControl,
        radiobuttons: RadioButtonControl,
        radio: RadioInputControl,
        checkboxes: CheckboxControl,
        checkbox: CheckboxInputControl,
        submitbutton: SubmitButtonControl,
        slider: SliderControl,
        selectmenu: SelectControl,
        form: FormControl,
        googlemaps: GoogleMapsControl,
        googlemapsjs: GoogleMapsJSControl,
        youtube: YouTubeControl,
        vimeo: VimeoControl,
        panelbutton: PanelButtonControl,
        panel: PanelControl,
        panelListView: PanelListViewControl,
        split: SplitContentControl,
        splitsecondary: SplitSecondaryContentControl,
        splitprimary: SplitPrimaryContentControl,
        htmltextnode: HTMLTextNodeControl,
        htmlcommentnode: HTMLCommentNodeControl,
        htmlnode: HTMLNodeControl
    },
    b.cloneControl = function(a) {
        var b;
        return b = this.newControl(a.controlId),
        b
    },
    b.getControlForType = function(a) {
        var b;
        return b = this._controlMap[a],
        b ? b: null
    },
    b.newControl = function(a) {
        var b;
        return b = this._controlMap[a],
        b ? new b: (console.error("ControlFactory: unable to construct control of type: " + a), null)
    },
    b.deepCloneControl = function(a, b) {
        var c, d, e, f, g;
        if (b > 100) return console.error("Detected circular reference in deep clone control"),
        null;
        e = a.children,
        g = this.cloneControl(a),
        f = 0;
        while (f < e.length) c = e[f],
        d = this.deepCloneControl(c, b + 1),
        g.addChild(d),
        f++;
        return g
    },
    b
} (Backbone.Model),
ControlOutputVisitor = function(a) {
    function b() {
        return b.__super__.constructor.apply(this, arguments)
    }
    return __extends(b, a),
    b.prototype._i = function(a) {
        return Array(a + 1).join("  ")
    },
    b.prototype.getTreeAsHtml = function(a) {
        var b;
        return a ? (b = document.createElement("div"), a.cleanRenderTo(b), b.innerHTML) : null
    },
    b.prototype.getAppHtml = function(a, b) {
        var c, d, e, f, g;
        f = this.getOutputTree(a);
        if (!f) return;
        return e = $(f).html(),
        e
    },
    b.prototype.getAppFragmentHtml = function(a) {
        var b, c, d, e;
        c = (new Date).getTime(),
        e = this.getOutputTree(a);
        if (!e) return;
        return d = $(e).html(),
        b = (new Date).getTime(),
        console.log("Getting fragment HTML took", (b - c) / 1e3, "seconds"),
        d
    },
    b.prototype.getAppFragmentOuterHtml = function(a) {
        var b, c, d, e, f;
        c = (new Date).getTime(),
        e = document.createElement("div"),
        a.wrapQuickRenderTo(e),
        f = $(e);
        if (!f) return;
        return d = $(f).html(),
        b = (new Date).getTime(),
        console.log("Getting fragment HTML took", (b - c) / 1e3, "seconds"),
        d
    },
    b.prototype.getAppDocument = function(a) {
        return this._getOutputDict(a)
    },
    b.prototype._getOutputDict = function(a) {
        var b, c, d, e, f;
        d = a.children,
        c = [],
        e = 0;
        while (e < d.length) b = d[e],
        f = this._getOutputDict(b),
        c.push(f),
        e++;
        return {
            id: a.getId(),
            type: a.getControlType(),
            children: c,
            properties: a.getSerializedProperties()
        }
    },
    b.prototype._getJQMWrappedBody = function(a, b) {
        return "<!DOCTYPE html>\n<html>\n" + this._i(1) + "<head>\n" + this._i(2) + '<meta charset="utf-8">\n' + this._i(2) + '<meta name="viewport" content="width=device-width, initial-scale=1">\n' + this._i(2) + "<title>" + a.title.value + "</title>\n" + this._i(2) + '<link rel="stylesheet" href="https://ajax.aspnetcdn.com/ajax/jquery.mobile/1.2.0/jquery.mobile-1.2.0.min.css" />\n' + this._i(2) + '<link rel="stylesheet" href="my.css" />\n' + this._i(2) + "<style>" + this._i(3) + "/* App custom styles */" + this._i(2) + "</style>" + this._i(2) + '<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>\n' + this._i(2) + '<script src="https://ajax.aspnetcdn.com/ajax/jquery.mobile/1.2.0/jquery.mobile-1.2.0.min.js"></script>\n' + this._i(2) + '<script src="my.js"></script>\n' + this._i(1) + "</head>\n" + b + "</html>"
    },
    b.prototype.getOutputTree = function(a) {
        return this.quickGetOutputTree(a)
    },
    b.prototype._getOutputTree = function(a, b) {
        var c, d, e, f, g, h, i, j;
        if (!a._supportsChildRendering) return;
        f = a.children,
        g = 0,
        j = [];
        while (g < f.length) c = f[g],
        d = c.cloneControl(),
        e = document.createElement("div"),
        d.renderTo(e),
        h = $(":first", e).clone(),
        $(b).append(h),
        d.getOutputAppendSelector() === "" ? this._getOutputTree(d, h) : (i = $(d.getOutputAppendSelector(), h), this._getOutputTree(d, i)),
        j.push(g++);
        return j
    },
    b.prototype.quickGetOutputTree = function(a) {
        var b;
        return a ? (b = document.createElement("div"), a.quickRenderTo(b), $(b)) : null
    },
    b
} (Backbone.Model);
var Addons, AllAssets, AppAddon, AppAssets, Asset, LightAsset, TempApp, Theme, TinyCodiqaAsset, User, UserAccount, UserApp, UserAppVersion, UserAppVersions, UserApps;
TempApp = Backbone.Model.extend({
    urlRoot: "/tryit"
}),
UserApp = Backbone.Model.extend({
    urlRoot: "/api/v1/user/app"
}),
UserAppVersion = Backbone.Model.extend({
    url: function() {
        return "/api/v1/user/app/" + this.get("appid") + "/version/" + this.id
    }
}),
UserAppVersions = Backbone.Collection.extend({
    model: UserAppVersion,
    url: function() {
        return "/api/v1/user/app/" + this.id + "/versions"
    },
    parse: function(a) {
        return a.versions
    }
}),
UserApps = Backbone.Collection.extend({
    model: UserApp,
    url: "/api/v1/user/apps",
    parse: function(a) {
        return a.apps.concat(a.archived)
    }
}),
User = Backbone.Collection.extend({
    urlRoot: "/api/v1/user"
}),
UserAccount = Backbone.Model.extend({
    urlRoot: "/api/v1/user"
}),
Theme = Backbone.Model.extend({
    urlRoot: "/api/v1/user/theme"
}),
AllAssets = Backbone.Model.extend({
    url: "/api/v1/user/assets"
}),
AppAssets = Backbone.Collection.extend({
    url: function() {
        return "/api/v1/project/" + this.id + "/assets"
    }
}),
Asset = Backbone.Model.extend({
    url: function() {
        return "/api/v1/project/" + this.get("appid") + "/assets/" + this.id
    }
}),
LightAsset = Backbone.Model.extend({
    urlRoot: function() {
        return "/api/v1/project/" + this.get("appid") + "/lightassets"
    }
}),
TinyCodiqaAsset = Backbone.Model.extend({
    urlRoot: function() {
        return "/api/v1/tinycodiqa/" + this.get("domain") + "/lightassets"
    }
}),
AppAddon = Backbone.Model.extend({
    urlRoot: function() {
        return "/api/v1/project/" + this.get("app_id") + "/addon"
    }
}),
Addons = Backbone.Collection.extend({
    url: "/api/v1/addons"
});
var ActionTypes, AppMode, Builder, BuilderDispatcher, ControlView, DeviceOrientation, DeviceSizes, DeviceTypes, DocUtils, ExternalCssView, ExternalJsView, HtmlImporter, IdGiver, InterfaceModes, NON_HOVERABLE_TYPES, NON_SELECTABLE_TYPES, NodeType, PageView, PropertyView, SidebarModalView, ThemeView, UserView, appButton, __hasProp = {}.hasOwnProperty,
__extends = function(a, b) {
    function d() {
        this.constructor = a
    }
    for (var c in b) __hasProp.call(b, c) && (a[c] = b[c]);
    return d.prototype = b.prototype,
    a.prototype = new d,
    a.__super__ = b.prototype,
    a
};
NON_HOVERABLE_TYPES = {
    collapsiblecontent: 1,
    htmlcommentnode: 1,
    htmltextnode: 1,
    basiclistitem: 1,
    panel: 1,
    panelListView: 1,
    thumbnaillistview: 1
},
NON_SELECTABLE_TYPES = {
    app: 1,
    gridblock: 1,
    pagecontent: 1,
    collapsiblecontent: 1,
    collapsiblecontentheader: 1,
    checkbox: 1,
    panel: 1,
    panelListView: 1,
    radio: 1,
    splitprimary: 1,
    splitsecondary: 1,
    htmlcommentnode: 1,
    htmltextnode: 1
},
DocUtils = {
    isAfter: function(a, b) {
        var c, d, e, f, g, h, i;
        return c = $(a),
        h = c.offset(),
        i = c.outerWidth(),
        e = c.outerHeight(),
        d = [[h.left, h.top], [h.left + i, h.top], [h.left + i, h.top + e], [h.left, h.top + e]],
        g = d[0][1] + e / 2,
        f = d[0][0] + i / 2,
        b.y > g && b.y < d[2][1] || b.x > f && b.x < d[1][0]
    },
    isBefore: function(a, b) {
        var c, d, e, f, g, h, i;
        return c = $(a),
        h = c.offset(),
        i = c.outerWidth(),
        e = c.outerHeight(),
        d = [[h.left, h.top], [h.left + i, h.top], [h.left + i, h.top + e], [h.left, h.top + e]],
        g = d[0][1] + e / 2,
        f = d[0][0] + i / 2,
        b.y < g || b.y < d[0][1] + e && b.x < h.left + 20
    },
    elementContains: function(a, b) {
        var c, d, e, f;
        return a.is(":visible") ? (e = a.offset(), f = a.outerWidth(), c = a.outerHeight(), d = [0, 0, 0, 0], d[3] < 0 && d[1] < 0 && b.x > e.left + f + -d[1] || b.x < e.left + d[3] || b.y > e.top + c || b.y < e.top ? !1 : b.x > e.left + f || b.x < e.left || b.y > e.top + c || b.y < e.top ? !1 : !0) : !1
    },
    getComponentAt: function(a, b, c) {
        var d, e, f, g, h, i, j, k, l;
        e = [],
        g = a,
        e.push(a),
        h = null;
        while (e.length) {
            f = e.shift(),
            l = f.children;
            for (j = 0, k = l.length; j < k; j++) {
                d = l[j];
                if (d.controlId === "htmltextnode" || d.controlId === "htmlcommentnode") continue;
                if (c === d) continue;
                i = d._deviceRenderedEl;
                if (i && i.length && this.elementContains(i, b)) {
                    NON_SELECTABLE_TYPES.hasOwnProperty(d.controlId) || (g = d);
                    if (d._isContainer) if (c && c.validParents && c.validParents.hasOwnProperty(d.controlId)) h = d;
                    else if (!c || !c.validParents) h = d;
                    e.splice(0, 0, d)
                }
            }
        }
        return {
            control: g,
            container: h
        }
    },
    eventToFramePoint: function(a) {
        var b, c, d, e;
        return b = $("#mobile-frame"),
        d = b.offset(),
        c = a.pageX - d.left,
        e = a.pageY - d.top,
        {
            x: c,
            y: Math.max(e, 0)
        }
    }
},
NodeType = {
    ELEMENT: 1,
    TEXT: 3,
    COMMENT: 8
},
HtmlImporter = Backbone.View.extend({
    _roleTypeMap: {
        page: PageControl,
        button: ButtonControl,
        content: PageContentControl,
        header: PageHeaderControl,
        footer: PageFooterControl,
        navbar: NavBarControl,
        tabbar: TabBarControl,
        "collapsible-set": CollapsibleSetControl,
        collapsible: CollapsibleContentControl,
        listview: ListViewControl
    },
    _controlTypeMap: {
        textinput: TextInputControl,
        dateinput: DateInputControl,
        searchinput: SearchInputControl,
        textarea: TextAreaControl,
        radiobuttons: RadioButtonControl,
        fileinput: FileInputControl,
        camerainput: CameraInputControl,
        checkboxes: CheckboxControl,
        googlemaps: GoogleMapsControl,
        googlemapsjs: GoogleMapsJSControl,
        textblock: TextBlockControl,
        htmlblock: HtmlBlockControl,
        slider: SliderControl,
        toggleswitch: ToggleSwitchControl,
        image: ImageControl,
        selectmenu: SelectControl,
        listview: ListViewControl,
        flexiblelistview: FlexibleListViewControl,
        thumbnaillistview: ThumbnailListViewControl,
        youtube: YouTubeControl,
        vimeo: VimeoControl
    },
    _inputTypeMap: {
        submit: SubmitButtonControl
    },
    _nodeNameMap: {
        h1: HeadingControl,
        h2: HeadingControl,
        h3: HeadingControl,
        h4: HeadingControl,
        h5: HeadingControl,
        hr: HorizontalRuleControl,
        form: FormControl,
        select: SelectControl,
        textarea: TextAreaControl
    },
    initialize: function(a) {
        return this.document = a
    },
    getComponentFromNode: function(a) {
        var b;
        b = this._fromDomNode(a);
        if (!b) return;
        return b.attributes.setValue(a.attributes),
        b
    },
    addChildToParent: function(a, b) {
        return a.setAlreadyAfterBound(!0),
        b.addChild(a),
        this.trigger("controlAdded", b, a)
    },
    _fromDomNode: function(a) {
        var b, c, d, e, f, g, h, i, j;
        switch (a.nodeType) {
        case NodeType.COMMENT:
            return new HTMLCommentNodeControl(a.data);
        case NodeType.TEXT:
            if (!$.trim(a.data) === "") return new HTMLTextNodeControl(a.data);
            return null;
        case NodeType.ELEMENT:
            g = a.getAttribute("data-role"),
            c = a.getAttribute("data-controltype"),
            d = null;
            if (this._controlTypeMap.hasOwnProperty(c)) return d = new this._controlTypeMap[c],
            d.initFromDomNode(a),
            d;
            if (this._roleTypeMap.hasOwnProperty(g)) return d = new this._roleTypeMap[g],
            d.initFromDomNode(a),
            d;
            e = this.guessTypeFromNode(a);
            if (e) return e.initFromDomNode(a),
            e;
            f = a.nodeName.toLowerCase();
            if (this._nodeNameMap.hasOwnProperty(f)) return d = new this._nodeNameMap[f],
            d.initFromDomNode(a),
            d;
            if (f === "input" && this._inputTypeMap.hasOwnProperty(a.type.toLowerCase())) return d = new(this._inputTypeMap[a.type.toLowerCase()]),
            d.initFromDomNode(a),
            d;
            if (a.getAttribute("data-role") === "fieldcontain" && a.children.length) {
                j = a.children;
                for (h = 0, i = j.length; h < i; h++) {
                    b = j[h];
                    if (b.nodeName.toLowerCase() === "input" && b.type.toLowerCase() === "file") return b.getAttribute("capture") === "camera" ? d = new CameraInputControl: d = new FileInputControl,
                    d.initFromDomNode(a),
                    d
                }
            }
            return new HTMLNodeControl(a.nodeName, a.attributes, a)
        }
        return null
    },
    guessTypeFromNode: function(a) {
        var b;
        return a.className.match(/ui-grid-/) ? new GridControl: a.className.match(/ui-block-/) ? new GridBlockControl: this._roleIs(a, "fieldcontain") ? this._guessFieldContain(a) : this._roleIs(a, "controlgroup") ? this._guessControlGroup(a) : (b = a.nodeName.toLowerCase(), null)
    },
    _classContains: function(a, b) {
        return a.className.indexOf(b) >= 0
    },
    _roleIs: function(a, b) {
        var c;
        return c = a.getAttribute("data-role"),
        c && c.toLowerCase() === b.toLowerCase()
    },
    _guessFieldContain: function(a) {
        var b, c;
        return b = a.getAttribute("data-controltype"),
        b ? (c = this._controlTypeMap[b], c ? new c: null) : null
    },
    _guessControlGroup: function(a) {
        var b, c, d, e, f, g;
        c = 0,
        g = a.children;
        for (e = 0, f = g.length; e < f; e++) {
            b = g[e],
            d = b.nodeName.toLowerCase();
            if (d === "input" && b.getAttribute("type") === "radio") return new RadioButtonControl;
            if (d === "input" && b.getAttribute("type") === "checkbox") return new CheckboxControl;
            if (d === "input" && b.getAttribute("type") === "submit") return new SubmitButtonControl;
            if (d === "select") return new SelectControl
        }
        return null
    },
    parse: function(a) {
        var b;
        try {
            b = document.implementation.createHTMLDocument(""),
            b.body.innerHTML = a
        } catch(c) {
            b = new ActiveXObject("htmlfile"),
            b.write(a),
            b.close()
        }
        return this._root = null,
        this._emitTree(b.body)
    },
    getRoot: function() {
        return this._root
    },
    processComponentOfParent: function(a, b) {
        return this._root || (this._root = b),
        this.addChildToParent(a, b)
    },
    _emitTree: function(a) {
        var b, c, d, e, f, g, h, i;
        d = [],
        g = null,
        f = null,
        e = null,
        h = null,
        c = null,
        d.push([a, null]),
        i = [];
        while (d.length) {
            g = d.shift(),
            a = g[0],
            f = g[1],
            h = f || this.getComponentFromNode(a);
            if (!h) continue;
            console.log("Constructed parent", h.controlId),
            c = a.childNodes,
            i.push(function() {
                var a, f, g;
                g = [];
                for (a = 0, f = c.length; a < f; a++) {
                    b = c[a];
                    if (b.nodeType === NodeType.TEXT && $.trim(b.data) === "") continue;
                    e = this.getComponentFromNode(b),
                    e && this.processComponentOfParent(e, h),
                    g.push(d.push([b, e]))
                }
                return g
            }.call(this))
        }
        return i
    },
    _parseTree: function(a) {
        var b, c, d, e, f, g, h, j, k, l;
        f = [],
        g = null,
        d = a.childNodes;
        for (h = 0, k = d.length; h < k; h++) {
            c = d[h];
            if (c.nodeType === NodeType.TEXT && $.trim(c.data) === "") continue;
            g = this._parseTree(c),
            g && f.push(g)
        }
        e = this.getComponentFromNode(a);
        if (e) for (j = 0, l = f.length; j < l; j++) b = f[j],
        e.children.push(b),
        this.trigger("childAdded", e, b),
        i++;
        return this.trigger("componentTreeFinished", e)
    }
}),
_.extend(HtmlImporter, Backbone.Events),
IdGiver = {
    _types: {},
    reset: function() {
        return this._types = {}
    },
    forceIncrement: function(a) {
        return this._types.hasOwnProperty(a) || (this._types[a] = 0),
        ++this._types[a]
    },
    give: function(a) {
        var b;
        this._types.hasOwnProperty(a) || (this._types[a] = 0),
        b = ++this._types[a];
        for (;;) {
            if (!window.App.getControl(a + b)) return b;
            b = ++this._types[a]
        }
    }
},
AppMode = {
    NOT_SET: -1,
    NATIVE: 0,
    WEB_FULL: 1,
    WEB_EMBED: 2,
    WEB_MINIMAL: 3,
    WEB_DEMO: 4,
    WEB_GDRIVE: 5
},
$.widget("codiqa.slider", $.ui.mouse, {
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
        var a, b;
        return b = this,
        console.log("Slider created"),
        a = $(this.element),
        a.addClass("toggle-slider").addClass(this.options.extraClass).addClass("clearfix"),
        a.html('<div class="l offtext on">' + this.options.leftText + '</div><div class="slider-wrapper l"><div class="on inactive"></div><div class="off"></div><div class="slider"></div></div><div class="l ontext">' + this.options.rightText + "</div>"),
        $(".slider-wrapper", this.element).click(function() {
            return b._disableClick === !0 ? (b._disableClick = !1, !1) : (a.hasClass("test-mode") ? b._off(this) : b._on(this), !1)
        }),
        $(".offtext", this.element).click(function() {
            return b._disableClick === !0 ? (b._disableClick = !1, !1) : (b._off($(".slider-wrapper", b.element)), !1)
        }),
        $(".ontext", this.element).click(function() {
            return b._disableClick === !0 ? (b._disableClick = !1, !1) : (b._on($(".slider-wrapper", b.element)), !1)
        })
    },
    _on: function(a, b) {
        var c;
        return c = this,
        $(".slider", a).animate({
            left: this.options.leftOffset || "20px"
        },
        50,
        function() {
            $(c.element).addClass("test-mode"),
            $(".off", a).addClass("inactive"),
            $(".on", a).removeClass("inactive"),
            c._disableClick = !1;
            if (!b) return c._trigger("on")
        })
    },
    _off: function(a, b) {
        var c;
        return c = this,
        $(".slider", a).animate({
            left: "0px"
        },
        50,
        function() {
            $(c.element).removeClass("test-mode"),
            $(".off", a).removeClass("inactive"),
            $(".on", a).addClass("inactive"),
            c._disableClick = !1;
            if (!b) return c._trigger("off")
        })
    },
    on: function() {
        return this._on($(".slider-wrapper", this.element), !0)
    },
    off: function() {
        return this._off($(".slider-wrapper", this.element), !0)
    },
    _mouseStart: function(a) {
        var b, c, d;
        return this._slider = this.element.find(".slider"),
        this._wrapper = this.element.find(".slider-wrapper"),
        b = this._slider.position(),
        d = a.screenX,
        c = this.element.offset(),
        d = {
            x: a.pageX - c.left,
            y: a.pageY - c.top
        },
        this._startPoint = d,
        this._clickOffset = {
            x: b.left - d.x,
            y: b.top - d.y
        }
    },
    _mouseDrag: function(a) {
        var b, c, d, e, f, g, h;
        d = this._slider.position(),
        f = this.element.offset(),
        h = this._wrapper.width(),
        g = {
            x: a.pageX - f.left,
            y: a.pageY - f.top
        },
        this._lastPos || (this._lastPos = g),
        c = {
            x: this._startPoint.x - g.x,
            y: 0
        },
        b = Math.sqrt(c.x * c.x + c.y * c.y);
        if (b < 5 && !this._isDragging) return;
        return this._isDragging = !0,
        e = Math.min(h + 1 - this._slider.width(), this._lastPos.x + this._clickOffset.x),
        e = Math.max(0, e),
        this._slider.css({
            left: e
        }),
        this._lastPos = g
    },
    _mouseStop: function() {
        var a, b;
        return this._isDragging && (this._disableClick = !0),
        this._isDragging = !1,
        a = this._slider.position(),
        b = this._wrapper.width(),
        a.left > b / 2 - 15 ? this._on(this.element.find(".slider-wrapper")) : this._off(this.element.find(".slider-wrapper"))
    }
}),
appButton = function(a) {
    return $(a).live({
        mouseenter: function() {
            return $(this).addClass("hover")
        },
        mouseleave: function() {
            return $(this).removeClass("hover")
        }
    }),
    $(a).live("mousedown",
    function() {
        return $(this).addClass("active")
    }),
    $(a).live("mouseup",
    function() {
        return $(this).removeClass("active")
    })
},
DeviceOrientation = {
    LANDSCAPE: 0,
    PORTRAIT: 1
},
DeviceTypes = {
    IPHONE: 1,
    IPAD: 2,
    A_DROID: 3,
    A_DROID_X: 4,
    A_DROID_BIONIC: 5,
    A_ATRIX: 6,
    A_HTC_DESIRE: 7
},
DeviceSizes = {
    APPLE_IPHONE3: [320, 480, "iPhone 3"],
    APPLE_IPHONE4: [320, 480, "iPhone 4"],
    APPLE_IPHONE5: [320, 568, "iPhone 5"],
    APPLE_IPAD: [768, 1024, "iPad"],
    APPLE_IPAD3: [768, 1024, "iPad"],
    PHONE_240x320: [240, 320, "Phone"],
    PHONE_480x800: [480, 800, "Phone"],
    PHONE_720x720: [720, 720, "Phone"],
    TABLET_600x1024: [600, 1024, "Tablet"],
    TABLET_720x1280: [720, 1280, "Tablet"],
    TABLET_768x1280: [768, 1280, "Tablet"],
    TABLET_800x1280: [800, 1280, "Tablet"],
    TABLET_1200x1900: [1200, 1900, "Tablet"]
},
InterfaceModes = {
    DESIGN: 1,
    PREVIEW: 2,
    CODE: 3
},
ActionTypes = {
    NEW_APP: 0,
    ADD: 1,
    REMOVE: 2,
    MOVE_FORWARD: 3,
    MOVE_BACK: 4,
    PROPERTY_FORWARD: 5,
    PROPERTY_BACK: 6
},
SidebarModalView = function(a) {
    function b() {
        return b.__super__.constructor.apply(this, arguments)
    }
    return __extends(b, a),
    b.prototype.initialize = function() {
        return _.extend(b, Backbone.Events)
    },
    b.prototype._sortedCategories = function() {
        var a, b, c, d;
        c = [],
        d = this._data;
        for (b in d) a = d[b],
        c[a.weight] = {
            id: b,
            category: a
        };
        return c
    },
    b.prototype.events = {
        "click [data-showcategory]": "onShowCategory",
        "click [data-category] a": "onItemSelected"
    },
    b.prototype.onItemSelected = function(a) {
        var b, c, d, e, f, g, h, i;
        e = $(a.currentTarget).data("itemid"),
        d = e.split("_"),
        b = this._data[d[0]],
        h = b.items,
        i = [];
        for (f = 0, g = h.length; f < g; f++) c = h[f],
        c.id === e ? i.push(this.trigger("itemSelected", c)) : i.push(void 0);
        return i
    },
    b.prototype.onShowCategory = function(a) {
        var b;
        return b = $(a.currentTarget).data("showcategory"),
        this.showCategory(b),
        !1
    },
    b.prototype.showCategory = function(a) {
        return this.$el.find("ul[data-category]").hide(),
        this.$el.find('ul[data-category="' + a + '"]').show(),
        this.$el.find("ul [data-showcategory]").removeClass("active"),
        this.$el.find('ul [data-showcategory="' + a + '"]').addClass("active"),
        this._selectedCategory = a
    },
    b.prototype.render = function() {
        var a, b, c, d, e, f, g, h, i;
        this.$el.find("ul[data-category]").empty(),
        d = this._sortedCategories();
        for (e = 0, g = d.length; e < g; e++) {
            b = d[e],
            a = b.category,
            i = a.items;
            for (f = 0, h = i.length; f < h; f++) c = i[f],
            this.$el.find('ul[data-category="' + b.id + '"]').append('<li><a data-itemid="' + c.id + '"href="#">' + c.name + "</a></li>")
        }
        return this._selectedCategory || (this._selectedCategory = this.$el.find("ul [data-showcategory]:first").data("showcategory")),
        this.showCategory(this._selectedCategory)
    },
    b
} (Backbone.View),
ThemeView = function(a) {
    function b() {
        return b.__super__.constructor.apply(this, arguments)
    }
    return __extends(b, a),
    b.prototype.initialize = function() {
        return b.__super__.initialize.apply(this, arguments),
        this.resetThemes(),
        window.MODE !== "tiny" ? this.loadThemes() : this.render(),
        this.on("itemSelected",
        function(a) {
            return console.log("Loading theme", a),
            this.setTheme(a),
            this.hide()
        })
    },
    b.prototype.show = function() {
        return this.render(),
        $(this.el).modal("show"),
        this.loadThemes()
    },
    b.prototype.hide = function() {
        return this.$el.modal("hide")
    },
    b.prototype.setTheme = function(a) {
        return this._theme = a,
        this.trigger("themeSet", a)
    },
    b.prototype.resetThemes = function() {
        return this._data = {
            library: {
                weight: 0,
                items: []
            },
            user: {
                weight: 1,
                items: []
            }
        }
    },
    b.prototype.loadThemes = function() {
        var a = this;
        return $.getJSON("/api/v1/user/themes?library=true",
        function(b) {
            var c, d, e, f, g, h, i;
            a.resetThemes(),
            h = b.library_themes;
            for (d = 0, f = h.length; d < f; d++) c = h[d],
            a._data.library.items.push(c);
            i = b.themes;
            for (e = 0, g = i.length; e < g; e++) c = i[e],
            a._data.user.items.push(c);
            return a.render()
        })
    },
    b
} (SidebarModalView),
ExternalJsView = function(a) {
    function b() {
        return b.__super__.constructor.apply(this, arguments)
    }
    return __extends(b, a),
    b.prototype.events = {
        "submit form": "onFormSubmit",
        'click [data-action="remove"]': "onRemoveScript"
    },
    b.prototype.onRemoveScript = function(a) {
        var b, c;
        return c = $(a.target).prev().attr("href"),
        b = window.App._document.root.scripts,
        b.removeItemMatch(c),
        window.App.forceDocumentChanged(),
        $(a.target).parent().remove(),
        alert("Please refresh to finish removing active Javascript."),
        !1
    },
    b.prototype.onFormSubmit = function(a) {
        var b, c, d, e, f, g;
        d = window.App._document.root.scripts,
        e = d.getValue(),
        g = $(a.target).find('[name="url"]'),
        f = g.val();
        if (f.indexOf("http://") < 0 && f.indexOf("https://") < 0 && f.indexOf("//") !== 0) return alert("Invalid URL. Make sure you've entered it correctly."),
        !1;
        b = 0;
        while (b < e.length) {
            c = e[b];
            if (c.toLowerCase() === f) return g.val(""),
            !1;
            b++
        }
        return g.val(""),
        d.addItem(f),
        this.addScript(f),
        window.App.forceDocumentChanged(),
        !1
    },
    b.prototype.addScript = function(a) {
        return $("#externaljs-modal .scripts").append('<div><a target="_blank" href="' + a + '">' + a + '</a> <a href="#" data-action="remove">remove</a></div>'),
        this.trigger("scriptAdded", a)
    },
    b.prototype.initialize = function() {},
    b
} (Backbone.View),
ExternalCssView = Backbone.View.extend({
    events: {
        "submit form": "onFormSubmit",
        'click [data-action="remove"]': "onRemoveSheet"
    },
    onRemoveSheet: function(a) {
        var b, c;
        return c = $(a.target).prev().attr("href"),
        b = window.App._document.root.stylesheets,
        b.removeItemMatch(c),
        window.App.forceDocumentChanged(),
        $(a.target).parent().remove(),
        this.trigger("sheetRemoved", c),
        !1
    },
    onFormSubmit: function(a) {
        var b, c, d, e, f, g;
        d = window.App._document.root.stylesheets,
        e = d.getValue(),
        g = $(a.target).find('[name="url"]'),
        f = g.val();
        if (f.indexOf("http://") < 0 && f.indexOf("https://") < 0 && f.indexOf("//") !== 0) return alert("Invalid URL. Make sure you've entered it correctly."),
        !1;
        b = 0;
        while (b < e.length) {
            c = e[b];
            if (c.toLowerCase() === f) return g.val(""),
            !1;
            b++
        }
        return g.val(""),
        d.addItem(f),
        this.addSheet(f),
        window.App.forceDocumentChanged(),
        !1
    },
    addSheet: function(a) {
        return $("#externalcss-modal .sheets").append('<div><a target="_blank" href="' + a + '">' + a + '</a> <a href="#" data-action="remove">remove</a></div>'),
        this.trigger("sheetAdded", a)
    },
    initialize: function() {}
}),
UserView = Backbone.View.extend({
    name: "UnnamedUserView",
    setBuilder: function(a) {
        return this._builder = a
    },
    render: function() {
        var a, b;
        if (!this._templateName) {
            console.error("Null template for userview render");
            return
        }
        return b = Handlebars.compile($("#template-ui-" + this._templateName).html()),
        a = b(this._data),
        $(this.el).html(a),
        this._bindTabs(),
        $(".tab-panel", this.el).show(),
        $("[data-t]", this.el).translate()
    },
    _bindTabs: function() {},
    getData: function() {
        return this._data
    }
}),
PageView = function(a) {
    function b() {
        return b.__super__.constructor.apply(this, arguments)
    }
    return __extends(b, a),
    b.prototype.name = "PageView",
    b.prototype._templateName = "pageview",
    b.prototype._data = {},
    b.prototype.initialize = function(a) {
        return UserView.prototype.initialize.call(this, a)
    },
    b.prototype.render = function() {
        var a, b, c, d;
        b = this,
        this._data.pages = this._builder.getPages();
        if (!this._templateName) {
            console.error("Null template for userview render");
            return
        }
        return c = Handlebars.compile($("#template-ui-" + this._templateName).html()),
        a = c(this._data),
        $("#userview-pages").html(a),
        $(".item-list", this.el).sortable({
            tolerance: "pointer",
            items: "> li",
            zIndex: 18,
            cursor: "move",
            axis: "y",
            start: function(a, b) {
                var c;
                return c = b.item.index(),
                b.item.data("contentDragStart", c)
            },
            change: function(a, b) {},
            stop: function(a, c) {
                var d, e;
                return e = c.item.data("contentDragStart"),
                d = c.item.index(),
                b.trigger("pageMoved", c.item.data("cid"), e, d)
            }
        }),
        d = $(window).height()
    },
    b.prototype.addPage = function(a) {
        return this.render(),
        this.selectPage(a.getId())
    },
    b.prototype.newApp = function() {
        return this.render()
    },
    b.prototype.events = {
        "click li": "onPageClicked",
        "click .newpage": "onAddPageLinkClicked",
        "click .duplicatepage": "onDuplicatePageLinkClicked",
        "click .deletepage": "onDeletePageLinkClicked",
        "click .renamepage": "onRenamePageLinkClicked"
    },
    b.prototype._canDeletePage = function() {
        return $(".b-icon-deletepage", this.el).removeClass("inactive"),
        $(".b-icon-renamepage", this.el).removeClass("inactive")
    },
    b.prototype._canNotDeletePage = function() {
        return $(".b-icon-deletepage", this.el).addClass("inactive"),
        $(".b-icon-renamepage", this.el).addClass("inactive")
    },
    b.prototype._canDuplicatePage = function() {
        return $(".b-icon-duplicatepage", this.el).removeClass("inactive")
    },
    b.prototype._canNotDuplicatePage = function() {
        return $(".b-icon-duplicatepage", this.el).addClass("inactive")
    },
    b.prototype._makeSelectedButtons = function() {
        return '<a href="#" class="button duplicate"><div class="l"></div><div class="l-c">duplicate</div><div class="r"></div></a><a href="#" class="button delete"><div class="l"></div><div class="l-c">delete</div><div class="r"></div></a>'
    },
    b.prototype.selectPage = function(a) {
        var b;
        this._currentPageId = a,
        b = $('li[data-cid="' + a + '"]'),
        this._highlightRow(b),
        $(".deletepage", this.el).removeClass("inactive"),
        $(".renamepage", this.el).removeClass("inactive"),
        this._canDeletePage(),
        this._canDuplicatePage();
        if (this._builder._isInspectorShowing || EMBED) return this._builder._updateInspector()
    },
    b.prototype._getSelectedPageControl = function() {
        var a, b, c;
        if (!this._currentPageId) return null;
        c = this._builder.getPages(),
        a = 0;
        while (a < c.length) {
            b = c[a];
            if (b.getId() === this._currentPageId) return b;
            a++
        }
        return null
    },
    b.prototype._highlightRow = function(a) {
        return $(".item-list li", this.el).removeClass("selected"),
        $(a).addClass("selected"),
        $(".b-icon", a).addClass("selected")
    },
    b.prototype.onPageClicked = function(a) {
        var b, c;
        return c = $(a.currentTarget),
        b = c.data("cid"),
        console.log("PageView: Page clicked:", b),
        this.trigger("pageClicked", b),
        this.selectPage(b),
        !1
    },
    b.prototype.addPageEntry = function(a) {
        return this.render(),
        this.selectPage(a.getId())
    },
    b.prototype.removePageEntry = function(a) {
        var b, c, d;
        b = 0,
        d = [];
        while (b < this._data.pages.length) {
            c = this._data.pages[b];
            if (c.getId() === a.getId()) {
                this._data.pages.splice(b, 1),
                this.render(),
                this._data.pages.length > 0 && this.selectPage(this._data.pages[0].getId());
                break
            }
            d.push(b++)
        }
        return d
    },
    b.prototype.onAddPageLinkClicked = function(a) {
        var b, c, d;
        return d = this,
        c = this._data.pages,
        !window.EMBED && c.length >= 3 && CodiqaDude.hasFeature("only_three_pages") ? (this._builder.trigger("proRequired", "Please upgrade to add more pages.", "More Pages"), !1) : (console.log("PageView: Add Page clicked"), b = prompt(_t("New page")), b !== null && (console.log("Creating page", b), d.trigger("pageAdded", b,
        function(a) {
            var b;
            return b = $("#userview-page .b-el-content").get(0),
            b.scrollTop = b.scrollHeight
        })), !1)
    },
    b.prototype.onDuplicatePageLinkClicked = function(a) {
        var b, c, d, e;
        return e = this,
        b = $(a.currentTarget),
        this._currentPageId ? (d = this._data.pages, !window.EMBED && d.length >= 3 && CodiqaDude.hasFeature("only_three_pages") ? (this._builder.trigger("proRequired", "Please upgrade to add more pages.", "More Pages"), !1) : (c = this._currentPageId, e.trigger("pageDuplicated", c,
        function(a) {
            var b;
            return e.render(),
            e.selectPage(a.getId()),
            b = $("#userview-page .b-el-content").get(0),
            b.scrollTop = b.scrollHeight
        }), !1)) : !1
    },
    b.prototype.onDeletePageLinkClicked = function(a) {
        var b, c, d, e;
        d = this,
        b = $(a.currentTarget);
        if (!this._currentPageId) return;
        return c = this._currentPageId,
        this._data.pages.length < 2 ? (alert("There must be at least one page in the app.  Please add a new page before deleting this one."), !1) : (e = confirm(_t("Are you sure you want to delete this page?")), e === !0 && (console.log("Deleting page", c), d.trigger("pageDeleted", c)), !1)
    },
    b.prototype.onRenamePageLinkClicked = function(a) {
        var b, c, d, e;
        return e = this,
        console.log("PageView: Rename Page clicked"),
        b = $(a.currentTarget),
        d = b.closest("li").data("cid"),
        c = this._builder.getControl(d),
        this.trigger("pageEdited", c),
        !1
    },
    b.prototype.onPageDeleted = function() {
        var a;
        this.render();
        if (this._data.pages.length > 0) return a = this._data.pages[0],
        this.selectPage(a.getId())
    },
    b.prototype.sync = function() {
        return this.render(),
        this.selectPage(this._currentPageId)
    },
    b
} (UserView),
ControlView = UserView.extend({
    name: "ControlView",
    _templateName: "controlview",
    _data: {
        categories: [{
            name: _t("Toolbars"),
            id: "navigation",
            controls: [new PageHeaderControl, new PageFooterControl, new TabBarControl, new NavBarControl]
        },
        {
            name: _t("Buttons"),
            id: "action",
            controls: [new ButtonControl, new LinkControl, new PanelButtonControl]
        },
        {
            name: _t("Content"),
            id: "content",
            controls: [new ImageControl, new YouTubeControl, new VimeoControl, new GoogleMapsControl, new GoogleMapsJSControl, new HeadingControl, new HorizontalRuleControl, new TextBlockControl, new HtmlBlockControl, new CollapsibleSetControl, new GridControl, new SplitContentControl]
        },
        {
            name: _t("List Views"),
            id: "listviews",
            controls: [new ListViewControl]
        },
        {
            name: _t("Form Elements"),
            id: "forms",
            controls: [new FormControl, new TextInputControl, new CameraInputControl, new FileInputControl, new SearchInputControl, new DateInputControl, new TextAreaControl, new ToggleSwitchControl, new SliderControl, new SelectControl, new RadioButtonControl, new CheckboxControl, new SubmitButtonControl]
        }]
    },
    _controlLookupMap: {},
    initialize: function() {
        var a, b, c, d, e;
        EMBED && (this._templateName = "controlview-embedded"),
        c = 0,
        e = [];
        while (c < this._data.categories.length) {
            a = this._data.categories[c],
            d = 0;
            while (d < a.controls.length) b = a.controls[d],
            this._controlLookupMap[b.controlId] = b,
            d++;
            e.push(c++)
        }
        return e
    },
    events: {
        "click .icon-list li": "onControlClick",
        "dblclick .icon-list li": "onControlDblClick",
        "click .tabs .standard-button": "onFilterClick"
    },
    onFilterClick: function(a) {
        var b;
        return EMBED && (b = $(a.currentTarget).data("categoryid"), console.log("Filtering components", b), b === "ALL" ? $(".icon-list li").show() : ($("#b-controls .icon-list li").hide(), $('#b-controls .icon-list li[data-categoryid="' + b + '"]').show()), $("#b-controls .standard-button").removeClass("active"), $(a.currentTarget).addClass("active")),
        !1
    },
    onControlClick: function(a) {
        if (window.App.isPreviewMode()) return window.App.setInterfaceMode(InterfaceModes.DESIGN)
    },
    onControlDblClick: function(a) {
        var b, c;
        return c = $(a.currentTarget),
        b = this._controlLookupMap[$(c).data("cid")],
        b ? (this.trigger("controlClicked", b), !1) : (console.error("Unable to find control with id:", $(c).data("cid")), !1)
    },
    render: function() {
        return UserView.prototype.render.call(this),
        EMBED ? (appButton("#b-controls .tabs a"), $("#b-controls .tabs a:first").addClass("active"), $('[data-cid="text"]', this.el).remove(), $('[data-cid="tabbar"]', this.el).remove(), $('[data-cid="split"]', this.el).remove(), $('[data-cid="youtube"]', this.el).remove(), $('[data-cid="vimeo"]', this.el).remove(), $('#userview-control [data-cid="googlemapsjs"]').remove()) : window.MODE !== "library" && $('#userview-control [data-cid="googlemaps"]').remove(),
        window.MODE === "library" && ($('#userview-control [data-cid="googlemapsjs"]').remove(), $('#userview-control [data-cid="link"]').remove(), $('#userview-control [data-cid="panelbutton"]').remove()),
        $(".fg-accordion", this.el).accordion({
            active: !1,
            autoHeight: !1,
            animated: !1,
            collapsible: !0,
            clearStyle: !0,
            header: "> div > h3",
            icons: {
                header: "bui-icon bui-icon-plus",
                headerSelected: "bui-icon bui-icon-minus"
            },
            create: function(a, b) {},
            change: function(a, b) {}
        })
    }
}),
_.extend(ControlView, Backbone.Events),
PropertyView = function(a) {
    function b() {
        return b.__super__.constructor.apply(this, arguments)
    }
    return __extends(b, a),
    b.prototype.name = "PropertyView",
    b.prototype._templateName = "propertyview",
    b.prototype.initialize = function() {
        var a, b = this;
        return a = this,
        this._data = {},
        $(document).on("click", '[data-action="toggle-popout"]',
        function() {
            return b.onPopout()
        }),
        $(document).on("click", '[data-action="toggle-popin"]',
        function() {
            return b.onPopin()
        })
    },
    b.prototype.events = {
        "click .delete": "onDeleteClicked"
    },
    b.prototype.onPopout = function(a) {
        return this._isDialog = !0,
        this.hideProperties(),
        this.showProperties(this._control),
        this.trigger("propertiesPopped", "out"),
        !1
    },
    b.prototype.onPopin = function(a) {
        return this._isDialog = !1,
        this.hideProperties(),
        this.showProperties(this._control),
        this.trigger("propertiesPopped", "in"),
        !1
    },
    b.prototype.onDeleteClicked = function(a) {
        return this.trigger("selectedControlDeleted"),
        !1
    },
    //显示右侧属性栏
    b.prototype.showPropertySidebarForControl = function(a) {
        debugger;
        var b, c;
        if (a.getNumProperties() === 0) return;
        b = $("#b-p-c");
        if (b.length) {
            b.show();
            b.find(".control-name").text(a.name);
            b.find(".help-icon").html('<a href="http://docs.codiqa.com/codiqa/components/#' + a.name.replace(/\s/g, "") + '" target="_blank" rel="tooltip" data-placement="top" data-original-title="' + a.name + ' Help"><div class="b4-icon help"></div></a>');
            $('[rel="tooltip"]').tooltip()
        }
        c = $("#userview-property");
        if (c.length) {
            c.show();
            c.find(".nano").nanoScroller()
        }
        return this.onAttach();
    },
    b.prototype.showPropertyDialogForControl = function(a) {
        var b, c, d, e;
        if (a.getNumProperties() === 0) return;
        return EMBED ? ($("#b-p-c").show(), b = $("#userview-property"), b.length && (b.show(), b.find(".title").text(a.getName().toUpperCase()), b.find(".b-h").show(), b.find(".nano").nanoScroller()), this.onAttach()) : (e = this, this._propertyDialog || (c = !0, this._propertyDialog = $("#property-dialog").dialog({
            autoOpen: !1,
            resizable: !1,
            minWidth: 316,
            maxWidth: 316,
            maxHeight: 500,
            height: 500,
            create: function(a, b) {
                var c, d;
                return c = $(this).closest(".ui-dialog"),
                d = $(".ui-dialog-titlebar", c),
                d.append('<div class="right"><a href="#" rel="tooltip" data-placement="top" data-original-title="Pop in" data-action="toggle-popin"><div class="b4-icon popout popin"></div></a></div>'),
                d.append('<div class="help-icon"></div>')
            },
            open: function(a, b) {
                var d;
                return c && ($(this).dialog("option", "height", 380), d = $(window).width(), $(this).dialog("option", "position", [d - 340, 100]), $(".ui-dialog").resizable({
                    handles: "s",
                    alsoResize: "#property-dialog"
                })),
                e.onAttach(),
                c = !1,
                $("#userview-property").find(".nano").nanoScroller()
            },
            beforeclose: function() {
                return $(this).dialog("option", "height", $(".ui-dialog").height())
            },
            zIndex: 90
        })), d = this._propertyDialog, d.dialog("option", "title", a.getName()), d.find(":input").attr("tabindex", "-1"), d.dialog("open"), d.find(":input").attr("tabindex", "1"), d.find(".help-icon").html('<a href="http://docs.codiqa.com/codiqa/components/#' + a.name.replace(/\s/g, "") + '" target="_blank" rel="tooltip" data-placement="top" data-original-title="What\'s this?"><div class="b4-icon help"></div></a>'), $('[rel="tooltip"]').tooltip(), $('[rel="tooltip"]').on("click",
        function() {
            return $(this).tooltip("hide")
        }))
    },
    b.prototype.showProperties = function(a) {
        this.setControl(a);
        this.render();
        if (this._isDialog) {
            $("#userview-property").detach().appendTo("#property-dialog");
            this.showPropertyDialogForControl(a);
        } else {
            $("#userview-property").detach().appendTo("#b-p-c-target");
            this.showPropertySidebarForControl(a);
        }
    },
    b.prototype.hideProperties = function() {
        return EMBED ? $("#b-p-c").hide() : (this._propertyDialog && $(this._propertyDialog).dialog("close"), $("#b-p-c").hide())
    },
    b.prototype.setProperties = function(a) {},
    b.prototype.setControl = function(a) {
        return this._control = a
    },
    b.prototype.showRenderedProperties = function(a) {
        return this._renderedProperties = a,
        this.render(),
        $("input:first, textarea:first", this.el).focus().select()
    },
    b.prototype.resize = function() {
        var a;
        a = $("#userview-property");
        if (a.length) return a.find(".nano").length && a.find(".nano").nanoScroller()
    },
    b.prototype.onAttach = function(a) {
        var b, c, d, e, f;
        f = this;
        if (this._control) {
            d = this._control.getPropertiesSorted();
            b = 0;
            while (b < d.length) {
                c = d[b];
                c.property.getWidget().onAttach();
                b++;
            }
        }
        if (!EMBED) {
            e = $("#userview-property").find(".nano");
            return e.size();
        }
    },
    b.prototype.render = function() {
        var a, b, c, d, e, f, g, h;
        if (!this._control) return;
        h = Handlebars.compile($("#template-ui-" + this._templateName).html()),
        b = h($.extend({
            control: this._control
        },
        this._data)),
        $(this.el).html(b),
        a = $("#userview-property"),
        a.length && a.find(".nano").nanoScroller();
        if (this._control) {
            c = [];
            $(".nano-content", this.el).html("");
            f = this._control.getPropertiesSorted();
            d = 0;
            while (d < f.length) {
                e = f[d];
                e.property.render();
                g = $(e.property.getRenderedWidget());
                e.property.propertyType === "array" ?
                    $(".nano-content", this.el).append("<hr>").append(g) :
                    $(".nano-content", this.el).append(g);
                d++;
            }
            a.find("select").select2({
                width: "element",
                minimumResultsForSearch: 99
            });
            console.log("PropertySetRenderer - rendered " + f.length + " properties")
        }
        return $(this.el).find("[data-t]").translate()
    },
    b.prototype.clear = function() {
        return this._renderedProperties = "",
        this._control = null,
        $("#userview-property").empty()
    },
    b
} (UserView),
_.extend(PropertyView, Backbone.Events),
BuilderDispatcher = new Backbone.Model.extend({}),
_.extend(BuilderDispatcher, Backbone.Events),
Builder = function(a) {
    function c() {
        return c.__super__.constructor.apply(this, arguments)
    }
    var b;
    return __extends(c, a),
    c.prototype._document = {
        root: null,
        lookup: {},
        persistent: {},
        aliases: {},
        aliases_lookup: {}
    },
    c.prototype._hasLoaded = !1,
    c.prototype._indentWidth = 4,
    c.prototype._indentType = "spaces",
    c.prototype._views = {},
    c.prototype._currentOrientation = DeviceOrientation.PORTRAIT,
    c.prototype._currentDevice = DeviceTypes.IPHONE,
    c.prototype._currentInterfaceMode = InterfaceModes.DESIGN,
    c.prototype._currentDeviceSize = DeviceSizes.APPLE_IPHONE5,
    c.prototype._appMode = AppMode.NOT_SET,
    c.prototype._currentPage = null,
    c.prototype._actionStack = [],
    c.prototype._redoStack = [],
    c.prototype._internalActionCount = 0,
    c.prototype._lastSavedAction = 0,
    c.prototype._themes = {},
    c.prototype._device = null,
    c.prototype._lastModified = null,
    c.prototype._lastSaved = null,
    c.prototype._tempAppId = null,
    c.prototype._isLoading = !0,
    c.prototype.setAppMode = function(a) {
        return this._appMode = a
    },
    c.prototype.getAppMode = function(a) {
        return this._appMode
    },
    c.prototype.initialize = function() {
        return console.log("Initializing builder.."),
        this.ajaxManager = $.manageAjax.create("queue", {
            queue: "clear",
            maxRequests: 1,
            abortOld: !0,
            cacheResponse: !1
        })
    },
    c.prototype.onDocumentReady = function() {
        var a;
        return a = this,
        this._appMode === AppMode.NOT_SET && (this._appMode = AppMode.WEB_FULL),
        console.log("Document ready, starting builder interface"),
        this.renderUserViews(),
        this._resizeWindow(),
        EMBED ? this.setDeviceSize(DeviceSizes.APPLE_IPHONE4) : this.setDeviceSize(DeviceSizes.APPLE_IPHONE5),
        $("#phone > .device").show(),
        this.initMenus(),
        this.precache(),
        ApplicationService.start(),
        $("#mobile-frame").ready(function() {
            var b, c;
            return b = function() {
                var c;
                return ! window.FrameDocument || $("body", window.FrameDocument).length === 0 || !window.FrameWindow.$.mobile || !window.FrameWindow.$.mobile.changePage || !window.FrameWindow.$.mobile.activePage ? c = setTimeout(b, 20) : (console.log("Frame loaded, done waiting"), a.onDeviceReady())
            },
            c = setTimeout(b, 20)
        })
    },
    c.prototype.precache = function() {
        var a;
        return a = new Image,
        a.src = "/static/images/v2/image_component.jpg"
    },
    c.prototype.initMenus = function() {
        var a, b, c, d;
        return c = this,
        $("#h-menu > li").hover(function() {
            return $("> ul", this).show()
        },
        function() {
            return $("> ul", this).hide()
        }),
        MenuBar.create(this),
        $("#help-about").fancybox({
            transitionIn: "elastic",
            transitionOut: "elastic",
            speedIn: 0,
            speedOut: 0,
            overlayShow: !0,
            autoDimensions: !1,
            width: 510,
            height: 480,
            onComplete: function() {
                return $("#popup-help-about").show()
            },
            onClose: function() {}
        }),
        $("#popup-trigger-login").fancybox({
            transitionIn: "elastic",
            transitionOut: "elastic",
            modal: !0,
            speedIn: 0,
            speedOut: 0,
            overlayShow: !0,
            autoDimensions: !1,
            width: 300,
            height: 250,
            onComplete: function() {
                return $("#popup-login").show()
            },
            onClose: function() {}
        }),
        $("#popup-trigger-login").click(),
        $("#popup-login a[data-next]").click(function() {
            var a, b;
            return a = $(this).data("next"),
            b = $('#popup-login fieldset[data-fieldset="' + a + '"]'),
            $("#popup-login .error").addClass("hidden"),
            $(this).closest("fieldset").addClass("hidden"),
            b.removeClass("hidden"),
            !1
        }),
        $("#popup-login button").click(function() {
            var a, b, c, d, e, f;
            return a = this,
            $(a).attr("disabled", "disabled"),
            c = $(this).closest("fieldset"),
            f = c.data("fieldset"),
            $("#popup-login .error").addClass("hidden"),
            f === "create" ? (d = $(".name input", c).val(), b = $(".email input", c).val(), e = $(".pw input", c).val(), console.log([b, e, key]), ApplicationService.create(d, b, e,
            function(b) {
                var c;
                $(a).removeAttr("disabled");
                if (!b.errors) return window.location = "/builder";
                b.errors.name && (c = $("td", $(".name").prev()), c.text(b.errors.name[0]), c.removeClass("hidden")),
                b.errors.email && (c = $("td", $(".email").prev()), c.text(b.errors.email[0]), c.removeClass("hidden"));
                if (b.errors.password) return c = $("td", $(".pw").prev()),
                $(c).text(b.errors.password[0]),
                $(c).removeClass("hidden")
            })) : f === "login" && (b = $(".email input", c).val(), e = $(".pw input", c).val(), console.log([b, e]), ApplicationService.login(b, e,
            function(b) {
                var c;
                $(a).removeAttr("disabled");
                if (!b.errors) return window.location = "/builder";
                b.errors.email && (c = $("td", $(".email").prev()), c.text(b.errors.email[0]), c.removeClass("hidden"));
                if (b.errors.password) return c = $("td", $(".pw").prev()),
                c.text(b.errors.password[0]),
                c.removeClass("hidden")
            })),
            !1
        }),
        $("#h-menu").delegate("#mfile-new", "click",
        function() {
            return c.newDefaultApp(),
            !1
        }),
        $("#h-menu").delegate("#mfile-save", "click",
        function() {
            return c.saveAsCodiqa(),
            !1
        }),
        $("#h-menu").delegate("#mfile-open", "click",
        function() {
            var a;
            return a = prompt("File"),
            c.openFromCodiqa(a),
            !1
        }),
        $("#h-menu").delegate("#mfile-export", "click",
        function() {
            return c.exportAsZip(),
            !1
        }),
        $("#h-show-feedback").fancybox({
            transitionIn: "elastic",
            transitionOut: "elastic",
            speedIn: 0,
            speedOut: 0,
            overlayShow: !0,
            autoDimensions: !1,
            width: 510,
            height: 480,
            onComplete: function() {
                return $("#popup-feedback").show()
            },
            onClose: function() {}
        }),
        $("#toolbar-app-save").click(function() {
            return c.downloadAppHtml(),
            !1
        }),
        $("#toolbar-app-save-min").click(function() {
            return c.mustSignup(),
            !1
        }),
        $("#toolbar-app-save-upgrade").click(function() {
            return c.mustUpgrade(),
            !1
        }),
        $("#toolbar-export-zip").click(function() {
            return c.exportAsZip(),
            !1
        }),
        $("#toolbar-save-codiqa").click(function() {
            return c.documentSaved(),
            c.saveAsCodiqa(),
            !1
        }),
        $("#toolbar-open-codiqa").click(function() {
            var a;
            return a = prompt("File"),
            c.openFromCodiqa(a),
            !1
        }),
        $("#toolbar-view-phone").click(function() {
            return $(this).addClass("selected"),
            $("#toolbar-view-tablet").removeClass("selected"),
            !1
        }),
        $("#toolbar-view-tablet").click(function() {
            return $(this).addClass("selected"),
            $("#toolbar-view-phone").removeClass("selected"),
            !1
        }),
        $("#toolbar-view-orientation").click(function() {
            return ! 1
        }),
        $('[rel="tooltip"]').tooltip(),
        $('[rel="tooltip"]').on("click",
        function() {
            return $(this).tooltip("hide")
        }),
        appButton(".standard-button"),
        appButton("#dropdown-theme .dropdown-toggle"),
        appButton("#dropdown-size .dropdown-toggle"),
        EMBED ? (d = $("#preview-slider").slider({
            leftText: _t("BUILD"),
            rightText: _t("TEST"),
            on: function(a) {
                return c.setInterfaceMode(InterfaceModes.PREVIEW)
            },
            off: function(a) {
                return c.setInterfaceMode(InterfaceModes.DESIGN)
            }
        }), this.bind("interfaceModeChanged",
        function(a) {
            c._currentInterfaceMode === InterfaceModes.DESIGN && d.slider("off");
            if (c._currentInterfaceMode === InterfaceModes.PREVIEW) return c._jsEditor && (window.EMBED || c.applyJs(c._jsEditor.getSession().getValue())),
            d.slider("on")
        })) : (d = $("#preview-slider").slider({
            extraClass: "v6",
            leftText: _t("BUILD"),
            rightText: _t("TEST"),
            leftOffset: "15px",
            on: function(a) {
                return c.setInterfaceMode(InterfaceModes.PREVIEW)
            },
            off: function(a) {
                return c.setInterfaceMode(InterfaceModes.DESIGN)
            }
        }), this.bind("interfaceModeChanged",
        function(a) {
            c._currentInterfaceMode === InterfaceModes.DESIGN && d.slider("off");
            if (c._currentInterfaceMode === InterfaceModes.PREVIEW) return c._jsEditor && c.applyJs(c._jsEditor.getSession().getValue()),
            d.slider("on")
        })),
        this.bind("appLoading",
        function(a) {
            return c._isLoading = !0,
            setTimeout(function() {
                var a;
                if (c._isLoading) return a = $("#app-loading"),
                a.css({
                    top: $(window).height() / 2 + "px"
                }),
                a.show(),
                $("#app-loading-back").show()
            },
            1500)
        }),
        this.bind("appDoneLoading",
        function(a) {
            return this._fullApp && (c.applyCss(this._fullApp.get("css")), c.setJs(this._fullApp.get("js"))),
            c._isLoading = !1,
            $("#app-loading").hide(),
            $("#app-loading-back").hide(),
            c._shouldSkipHtmlReset = !0,
            window.EMBED || this._updateInspector(),
            c._device.initAppTree(c._document.root),
            setTimeout(function() {
                var a;
                a = c._document.root.getChildren("page");
                if (a.length > 0) return c.onPageClicked(a[0].getId(), !0),
                window.Codiqa && window.Codiqa.onReady && window.Codiqa.onReady()
            },
            1)
        }),
        $("#toolbar-undo").click(function() {
            return c.undo(),
            !1
        }),
        $("#toolbar-redo").click(function() {
            return c.redo(),
            !1
        }),
        $("#toolbar-mode-live").click(function() {
            return c.makeBetaLive(),
            !1
        }),
        $("#toolbar-mode-design").click(function() {
            return $(this).addClass("selected"),
            $("#toolbar-mode-preview").removeClass("selected"),
            $("#toolbar-mode-inspector").removeClass("selected"),
            c.setInterfaceMode(InterfaceModes.DESIGN),
            !1
        }),
        $("#toolbar-mode-preview").click(function() {
            return $(this).addClass("selected"),
            $("#toolbar-mode-design").removeClass("selected"),
            $("#toolbar-mode-inspector").removeClass("selected"),
            c.setInterfaceMode(InterfaceModes.PREVIEW),
            !1
        }),
        $("#toolbar-mode-inspector").click(function() {
            return $(this).toggleClass("selected"),
            $("#toolbar-mode-design").removeClass("selected"),
            $("#toolbar-mode-preview").removeClass("selected"),
            c.hideCrumbs(),
            c.onAllControlsDeselected(),
            $(this).hasClass("selected") ? ($("#code").removeClass("hidden"), $("#phone-wrapper").addClass("hidden"), c._isInspectorShowing = !0, c._updateInspector()) : ($("#code").addClass("hidden"), $("#phone-wrapper").removeClass("hidden"), c._isInspectorShowing = !1),
            c._resizeCodeEditor(),
            !1
        }),
        $("#dropdown-size .sizes li a").click(function() {
            var a;
            return console.log("Setting size"),
            a = $(this).parent().data("size"),
            $("#dropdown-size .sizes li").removeClass("active"),
            $(this).parent().addClass("active"),
            c.userSetDeviceSize(DeviceSizes[a]),
            !0
        }),
        $('[data-action="rotate"]').click(function() {
            return c.toggleDeviceOrientation(),
            !1
        }),
        $('[data-action="open-themes"]').click(function() {
            return c._views.themes.show(),
            !1
        }),
        a = $("#b-r-modes"),
        a.find(".design").click(function() {
            return c.setInterfaceMode(InterfaceModes.DESIGN),
            !1
        }),
        a.find(".preview").click(function() {
            return c.setInterfaceMode(InterfaceModes.PREVIEW),
            !1
        }),
        a.find(".code").click(function() {
            return c.setInterfaceMode(InterfaceModes.CODE),
            !1
        }),
        b = $("#code-configs"),
        b.find('input[type="text"]').change(function() {
            var a;
            return a = Number($(this).val()),
            console.log("New tab size", a),
            !isNaN(a) && a > 16 ? (alert("Please enter a number from 1-16"), !1) : (c._indentWidth = a, c._updateInspector())
        }),
        b.find('input[type="radio"]').click(function() {
            var a;
            return a = $(this).val(),
            console.log("Inspector is now", a),
            c._indentType = a,
            c._updateInspector()
        }),
        $(".refresh-builder").live("click",
        function() {
            return window.location.reload(),
            !1
        }),
        $("#modal-upgrade-now").find(".upgrade").click(function() {
            var a, b, d, e, f;
            return a = new ControlOutputVisitor,
            d = $(this).closest(".modal").find('input[type="text"]').val(),
            e = $(this).closest(".modal").find(".loading"),
            !d || $.trim(d) === "" ? !1 : (e.removeClass("hidden"), f = {
                v: "b1",
                saved: (new Date).getTime(),
                doc: a.getAppDocument(c._document.root)
            },
            b = {
                name: d,
                tree: f,
                html: c.getDocumentAsHtml()
            },
            c.ajaxManager.add({
                url: "/builder/gen",
                type: "POST",
                data: JSON.stringify(b),
                success: function(a) {
                    console.log("Saved app!");
                    if (a.path) return window.onbeforeunload = undefined,
                    window.location = a.path
                }
            }), !1)
        }),
        $(".pro-required").live("click",
        function() {
            var a;
            return a = $(this).data("trial-action"),
            c.trigger("proRequired", "", a),
            !1
        })
    },
    c.prototype._setInspectorButton = function(a) {
        var b;
        return b = $("#toolbar-mode-inspector"),
        a ? (b.removeClass("selected"), b.click()) : (b.addClass("selected"), b.click())
    },
    c.prototype._resizeWindow = function() {
        var a, b, c, d, e, f, g, h, i, j, k, l, m, n;
        return n = $(window).width(),
        l = $(window).height(),
        b = $("#b-ui"),
        f = $("#userview-control"),
        a = f.find(".b-el-content"),
        c = $("#b-p-c"),
        k = c.is(":visible") ? c.width() : 0,
        b.css({
            width: n - parseInt($("#b-r-c").css("marginLeft")) - k + "px"
        }),
        this._resizeCodeEditor(),
        window.MODE === "library" || window.MODE === "tiny" ? (b.height(l), this._propertyDialog && this._propertyDialog.dialog("option", "position", ["right", "top"]), window.MODE === "tiny" ? (m = 92, c.height(l - 54)) : (m = 41, c.height(l)), g = $("#userview-page"), g.height(l - m), f.height(l - m), a.height(l - m), g.find(".b-el-content").height(l - 30), a.nanoScroller()) : (e = $("#h-w"), $("#preview-slider").find(".off.inactive") ? (d = $("#code"), d.is(":hidden") ? b.height(l - e.height()) : b.height(l - e.height() - d.height())) : b.height(l - e.height()), EMBED || (j = e.length && $("#b-toolbar").length && 18, i = Math.max(200, l - 373), j || (i = Math.max(200, l - 329)), f.height(i + 32), a.length && (a.height(i), a.nanoScroller()), h = $("#userview-property"), h.find(".b-el-content").height(h.height() - 62)), c.height(l - 55)),
        this._centerPhone(n)
    },
    c.prototype._centerPhone = function(a) {
        var b;
        return a = a || $(window).width(),
        b = $("#phone-skin"),
        b.css({
            marginLeft: Math.max((a - 624) / 2 - b.width() / 2, 50)
        })
    },
    c.prototype._resizeCodeEditor = function() {
        var a, b, c, d, e, f, g;
        g = $(window).width(),
        f = $(window).height(),
        a = $("#code"),
        e = g - parseInt($("#b-r-c").css("marginLeft")),
        a.css("width", e + "px"),
        this._isInspectorShowing && a.css("height", f / 2 + "px"),
        c = a.find(".text-editor"),
        c.css("width", parseInt(e - 20) + "px"),
        d = $("#html-editor").height(),
        c.css("height", d + "px"),
        this._htmlEditor && this._cssEditor && this._jsEditor ? d && (this._htmlEditor.resize(), this._cssEditor.resize(), this._jsEditor.resize(), this._setInspectorFocus()) : window.EMBED && this._htmlEditor ? this._htmlEditor.resize() : window.EMBED || (this._renderEditors(!0), this._htmlEditor && this._cssEditor && this._jsEditor && d && (this._htmlEditor.resize(), this._cssEditor.resize(), this._jsEditor.resize(), this._setInspectorFocus()));
        if (window.EMBED && this._htmlEditor) return b = $("#code.embed #html-text-editor"),
        b.width(a.width()),
        b.height(a.height() - 30),
        this._htmlEditor.resize()
    },
    c.prototype._updateToolbar = function() {
        return this._redoStack.length <= 0 ? $("#toolbar-redo").addClass("disabled") : $("#toolbar-redo").removeClass("disabled"),
        this._actionStack.length <= 0 ? $("#toolbar-undo").addClass("disabled") : $("#toolbar-undo").removeClass("disabled")
    },
    c.prototype.initEvents = function() {
        var a, b, c;
        return c = this,
        this._resizeWindow(),
        $(window).resize(function() {
            return c._resizeWindow()
        }),
        b = !1,
        $(document).mousemove(function() {
            if (window.EMBED && !b) return c.checkReadyGo(),
            b = !0
        }),
        a = $("#code"),
        $("#b-l > .tabs > a").click(function() {
            var a;
            return a = $(this).attr("href"),
            $("#b-l").find(".userview").addClass("hidden"),
            $(a).removeClass("hidden"),
            $(this).parent().find("a").removeClass("selected"),
            $(this).addClass("selected"),
            !1
        }),
        a.find(".radio").live("click",
        function() {
            var a;
            return a = $(this).closest(".radio-set"),
            $(".radio", a).removeClass("selected"),
            $(this).addClass("selected"),
            !1
        }),
        a.find(".divider").click(function() {
            return a.toggleClass("collapsed"),
            c._resizeWindow()
        }),
        a.find(".radios").find("a").click(function() {
            var b;
            return $(this).parent().find("a").removeClass("selected"),
            $(this).addClass("selected"),
            b = $(this).data("editor"),
            a.find(".code-editor").removeClass("active"),
            $("#" + b + "-editor").addClass("active"),
            a.find(".editor-extras > div").hide(),
            a.find('.editor-extras > [data-for-editor="' + b + '"]').show(),
            c._resizeCodeEditor(),
            !1
        }),
        a.find(".toggle.expand").live("click",
        function() {
            return ! window.EMBED && CodiqaDude.getFeature("editing") === !1 ? (c.trigger("proRequired", "Please upgrade to edit the CSS and JS for your app.", "Edit Code"), !1) : (a.find(".buttons").fadeIn(150), $(this).removeClass("expand").addClass("collapse"), c._isInspectorShowing = !0, c._updateInspector(!0), c._resizeWindow(), !1)
        }),
        a.find(".toggle.collapse").live("click",
        function() {
            return a.find(".buttons").fadeOut(50),
            a.css("height", "25px"),
            c._isInspectorShowing = !1,
            $(this).removeClass("collapse").addClass("expand"),
            c._resizeWindow(),
            !1
        }),
        a.find("[data-action]").click(function() {
            var a;
            return a = $(this).data("action"),
            c._doEditorAction(a),
            !1
        }),
        $("#crumbs").find("a").live("click",
        function() {
            var a, b;
            return b = $(this).data("cid"),
            a = c.getControl(b),
            a && c.onControlSelected(a),
            !1
        }),
        this.bind("interfaceModeChanged",
        function(a) {
            return c._updateInterfaceModeStyles()
        }),
        this.bind("pageDeleted",
        function() {
            return c._views.pageview.onPageDeleted(),
            c._resizeWindow()
        }),
        this.bind("readyToGo",
        function() {
            console.log("ALL READY TO GO");
            if (window.location.search && window.location.search.indexOf("mode=preview") > 0) return c.setInterfaceMode(InterfaceModes.PREVIEW)
        }),
        this.bind("js.error",
        function(a) {
            return console.error("JS ERROR", a, a.message),
            $("#js-errors").text("Javascript error: " + a.message).show()
        }),
        this.bind("save",
        function(a) {
            return console.log("Saving project"),
            c.forceDocumentChanged()
        }),
        this.setScroller()
    },
    c.prototype.setSessionKey = function(a) {
        return this._sessionKey = a
    },
    c.prototype.onDeviceReady = function() {
        var a, b = this;
        a = this,
        window.scrollTo(0, 0),
        console.log("Device ready."),
        $("#phone-wrapper").show(),
        this._device = new Device,
        this._htmlImporter = new HtmlImporter(this._document),
        this._htmlImporter.on("controlAdded",
        function(a, c) {
            return b._newControlAddedFast(c)
        }),
        this.bindDeviceEvents(),
        this.bindShortcuts(),
        this.render(),
        this.initEvents(),
        this.initDraggable(),
        this._isDeviceInited = !0,
        this.trigger("deviceReady");
        if (window.MODE === "library") return window.Codiqa && window.Codiqa.onReady && window.Codiqa.onReady();
        if (!window.EMBED) return this.checkReadyGo()
    },
    c.prototype.onDevicePageResize = function(a, c, d) {
        if (d && d.length) return b.contentH = c,
        b.content = d,
        b.reset(),
        window.FrameWindow.$("#page-min-height-css").remove(),
        window.FrameWindow.$("head").append("<style id='page-min-height-css'>.ui-page{min-height:" + this._currentDeviceSize[1] + "px !important;}</style>")
    },
    c.prototype.setScroller = function() {
        if (!b.initalized) {
            b.iframe = $("#mobile-frame"),
            b.cover = $("#iframe-cover"),
            b.pane = $("#iframe-pane"),
            b.slider = $("#iframe-slider");
            if (b.iframe.length && b.cover.length && b.pane.length && b.slider.length) return b.iframeWindow = b.iframe[0].contentWindow,
            $(b.iframeWindow).on("resize", this.resizeScroller),
            b.slider.on("mousedown", b.onDown),
            b.pane.on("mousedown", b.onPanedown),
            b.sliderY = 0,
            b.initalized = !0
        }
    },
    c.prototype.resizeScroller = function() {
        return b.reset(),
        b.scroll()
    },
    c.prototype.onIframeScroll = function(a) {
        var c, d, e, f;
        if (!b.initalized || b.isDrag === !0 || !a) return;
        return f = b.paneH - b.sliderH,
        c = b.contentH - a.clientHeight,
        e = $(b.iframeWindow).scrollTop(),
        d = e / c,
        b.sliderY = Math.round(d * f),
        b.slider.css({
            top: b.sliderY + "px"
        })
    },
    b = {
        onDown: function(a) {
            return b.isDrag = !0,
            b.offsetY = a.clientY - b.slider.offset().top,
            b.cover.addClass("active"),
            b.pane.addClass("active"),
            $(document).on("mousemove", b.onDrag),
            $(document).on("mouseup", b.onUp),
            !1
        },
        onDrag: function(a) {
            return b.sliderY = a.clientY - b.iframe.offset().top - b.offsetY,
            b.scroll(),
            !1
        },
        onUp: function(a) {
            return b.isDrag = !1,
            b.pane.removeClass("active"),
            b.cover.removeClass("active"),
            $(document).off("mousemove", b.onDrag),
            $(document).off("mouseup", b.onUp),
            !1
        },
        onPanedown: function(a) {
            return b.sliderY = a.clientY - b.iframe.offset().top - b.sliderH * .5,
            b.scroll(),
            b.onDown(a)
        },
        scroll: function() {
            var a;
            if (b.iframeWindow) return this.sliderY = Math.max(0, this.sliderY),
            this.sliderY = Math.min(this.scrollH, this.sliderY),
            a = this.paneH - this.contentH,
            a = a * this.sliderY / this.scrollH,
            $(b.iframeWindow).scrollTop( - a),
            this.slider.css({
                top: this.sliderY + "px"
            })
        },
        reset: function() {
            var a;
            if (this.content && this.content.length) return window.App.setScroller(),
            this.contentH = this.content[0].scrollHeight,
            this.paneH = this.pane.outerHeight(),
            this.contentH <= this.paneH ? this.slider.hide() : (this.slider.show(), this.sliderH = this.paneH / this.contentH * this.paneH, this.sliderH = Math.round(this.sliderH), this.scrollH = this.paneH - this.sliderH, this.slider.height(this.sliderH - 3)),
            a = $("#phone").width(),
            b.iframeWindow.$("#page-width-css").remove(),
            b.iframeWindow.$("head").append("<style id='page-width-css'>.ui-page,.ui-header,.ui-footer{width:" + a + "px !important;}</style>")
        }
    },
    c.prototype.isDeviceAlreadyInited = function() {
        return this._isDeviceInited
    },
    c.prototype.reload = function() {
        return window.location.reload()
    },
    c.prototype.checkReadyGo = function() {
        var a, b;
        if (this._isDeviceInited && this._isUiInited) return a = new AppControl,
        this._document.root = a,
        this._addControl(a),
        b = this._addPage(_t("Home")),
        b.isDefault.setValue("true"),
        this._views.pageview.sync(),
        this._resizeWindow()
    },
    c.prototype.bindDeviceEvents = function() {
        var a;
        return a = this,
        this._device.bind("controlSelected",
        function(b) {
            var c;
            c = a._document.lookup[b],
            console.log("Control selected:", b, c);
            if (!c) {
                console.error("Clicked control but unable to find it in document!");
                return
            }
            return a.onControlSelected(c)
        }),
        this._device.bind("controlDoubleClicked",
        function(b) {
            var c;
            c = a._document.lookup[b],
            console.log("Control double clicked:", b, c);
            if (!c) {
                console.error("Clicked control but unable to find it in document!");
                return
            }
            return window.Codiqa && window.Codiqa.onControlDoubleClicked(c)
        }),
        this._device.bind("controlRightClicked",
        function(b) {
            var c;
            c = a._document.lookup[b],
            console.log("Control right clicked:", b, c);
            if (!c) {
                console.error("Clicked right clicked but unable to find it in document!");
                return
            }
            return window.Codiqa && window.Codiqa.onControlRightClicked(c)
        }),
        this._device.bind("controlMoved",
        function(b, c, d, e, f) {
            var g;
            if (e === f && d === c) return;
            g = a.getControl(b);
            if (!g) {
                console.error("Tried to move control that doesn't exist!");
                return
            }
            return a.moveControl(g, c, d, e, f)
        }),
        this._device.bind("pageChanged",
        function(b) {
            a._hasLoaded || (a._hasLoaded = !0, a.trigger("readyToGo"));
            if (!a.isLoading()) return a._views.pageview.selectPage(b),
            a.setCurrentPage(b),
            a._device.refreshPage(),
            a._device.redrawActivePage()
        })
    },
    c.prototype.bindShortcuts = function() {
        var a;
        if (this._shortcutsBound) return;
        return this._shortcutsBound = !0,
        a = this,
        window.bindKeymasterEvents && window.bindKeymasterEvents(window.FrameDocument, window.FrameWindow),
        key("esc, escape", "all",
        function() {
            return a.onAllControlsDeselected(),
            !1
        }),
        key("delete, backspace, del", "all",
        function() {
            return a.removeSelectedControl(),
            !1
        }),
        key("ctrl+s, ⌘+s", "all",
        function() {
            return a.forceDocumentChanged(),
            !1
        }),
        key("ctrl+c, ⌘+c", "all",
        function() {
            return a.copy(),
            !1
        }),
        key("ctrl+x, ⌘+x", "all",
        function() {
            return a.cut(),
            !1
        }),
        key("ctrl+v, ⌘+v", "all",
        function() {
            return a.paste(),
            !1
        }),
        key("ctrl+d, ⌘+d", "all",
        function() {
            return a.duplicateActive(),
            !1
        }),
        key("ctrl+z, ⌘+z", "all",
        function() {
            return a.undo(),
            !1
        }),
        key("ctrl+shift+z,⌘+shift+z,ctrl+y,⌘+y", "all",
        function() {
            return a.redo(),
            !1
        })
    },
    c.prototype.forceDocumentChanged = function() {
        return this._internalActionCount++,
        this.documentChanged()
    },
    c.prototype.documentChanged = function() {
        var a, b = this;
        this._lastModified = new Date,
        this._betaLivePreviewKey && this.makeBetaLive(),
        (this._isInspectorShowing || EMBED) && this._updateInspector();
        if (this._isLoading === !0) return;
        if (this._lastSavedAction === this._internalActionCount) {
            console.log("Not saving, no user action!");
            return
        }
        window.Codiqa && window.Codiqa.markChangesMade(),
        this.trigger("documentChanged");
        if (window.MODE === "library") return;
        return a = function() {
            if (!b._document.root) return;
            if (b._appMode !== AppMode.NATIVE) return EMBED ? b.saveTemp(b._tempAppId) : b._appMode === AppMode.WEB_DEMO ? b.saveDemoApp() : b.saveAppToServer()
        },
        clearTimeout(this._saveAppTimeout),
        this._saveAppTimeout = setTimeout(a, 500)
    },
    c.prototype.onSuccessfulSave = function(a) {
        var b, c;
        return clearInterval(this._lastSaveInterval),
        this._lastSavedAction = a,
        b = new Date,
        c = function() {
            var a;
            return a = $.timeago(b)
        },
        this._lastSaveInterval = setInterval(c, 6e4)
    },
    c.prototype.onConflictedSave = function(a, b) {
        return this._savingDisabled = !0,
        b === "is_locked" ? $("#modal-save-clash .modal-body p").html("<span class='bold'>" + a.name + "</span> is currently editing this project. Saving has been disabled to avoid loss of work. Please refresh the page to continue working.") : b === "stale_app" && $("#modal-save-clash .modal-body p").html("This project has been recently modified by <span class='bold'>" + a.name + "</span>. Please refresh the page to continue working."),
        $("#modal-save-clash").modal("show"),
        $(".saving-text").html('Saving disabled, please <a href="#" class="refresh-builder">refresh</a>')
    },
    c.prototype.hasDocumentChanged = function() {
        return this._lastModified ? this._lastModified > this._lastSaved: !1
    },
    c.prototype._updateInspector = function(a) {
        var b = this;
        return window.EMBED ? (this._htmlEditor || this._renderEditors(a), setTimeout(function() {
            var a;
            a = b.getDocumentFragmentAsHtml();
            if (b._htmlEditor) return b._htmlEditor.getSession().setValue(a)
        },
        50)) : ((!this._htmlEditor || !this._cssEditor || !this._jsEditor) && this._renderEditors(a), setTimeout(function() {
            var a, c, d, e;
            if (!b._htmlEditor || !b._cssEditor || !b._jsEditor) return;
            a = b.getCurrentPage();
            if (a) return d = b.getHtmlForPage(a),
            c = b._htmlEditor.selection.getCursor(),
            e = b._htmlEditor.session.getScrollTop(),
            b._htmlEditor.getSession().setValue(d),
            b._htmlEditor.gotoLine(c.row + 1, c.column),
            b._htmlEditor.session.setScrollTop(e)
        },
        50))
    },
    c.prototype._setInspectorFocus = function() {
        var a, b;
        a = $("#code").find(".selected");
        if (a.length) {
            b = a.data("editor");
            if (b === "css" && this._cssEditor) return this._cssEditor.focus();
            if (b === "js" && this._jsEditor) return this._jsEditor.focus()
        }
    },
    c.prototype.documentSaved = function() {
        return this._lastSaved = new Date
    },
    c.prototype._error = function(a, b) {
        if (DEBUG) return alert(a + " - " + b)
    },
    c.prototype.render = function() {
        return console.log("Rendering Builder View")
    },
    c.prototype.renderUserViews = function() {
        var a, b, c, d, e = this;
        return c = this,
        b = this.registerView("externaljs", new ExternalJsView({
            el: $("#externaljs-modal")
        })),
        a = this.registerView("externalcss", new ExternalCssView({
            el: $("#externalcss-modal")
        })),
        d = this.registerView("themes", new ThemeView({
            el: $("#themes-modal")
        })),
        d.bind("themeSet",
        function(a) {
            return e.applyTheme(a)
        }),
        b.bind("scriptAdded",
        function(a) {
            return c._device.addScript(a)
        }),
        a.bind("sheetAdded",
        function(a) {
            return c._device.addStylesheet(a)
        }),
        a.bind("sheetRemoved",
        function(a) {
            return c._device.removeStylesheet(a)
        }),
        this._renderControlView(),
        this._renderPageView(),
        this._renderPropertyView(),
        window.EMBED || this._renderEditors(),
        this._isUiInited = !0
    },
    c.prototype.registerView = function(a, b) {
        return this._views[a] = b,
        b
    },
    c.prototype.getView = function(a) {
        return this._views[a]
    },
    c.prototype._saveEditors = function() {
        var a, b, c, d = this;
        if (!this._device) return;
        return a = this._cssEditor.getValue(),
        c = this._jsEditor.getValue(),
        b = this._htmlEditor.getValue(),
        this._device.applyCss(a),
        this.updateCurrentPageFromHtml(b),
        setTimeout(function() {
            return d.trigger("save")
        },
        300)
    },
    c.prototype._renderEditors = function(a) {
        var b, c, d, e, f, g, h, i, j, k = this;
        j = this;
        if (window.MODE === "library" || window.MODE === "tiny") return;
        if (window.EMBED && !a) return;
        if (!window.EMBED && $("#code").find(".text-editor").length !== 3) {
            console.error("_renderEditors: Too many text-editor classes");
            return
        }
        require("ace/edit_session").EditSession.prototype.$useWorker = !1,
        j = this,
        g = ace.edit("html-text-editor"),
        c = require("ace/mode/html").Mode,
        g.getSession().setMode(new c),
        g.setReadOnly(!0),
        g.renderer.setHScrollBarAlwaysVisible(!1),
        g.renderer.setShowPrintMargin(!1),
        g.commands.commands.find.exec = function() {},
        g.commands.commands.replaceall.exec = function() {},
        g.on("focus",
        function() {
            return $("#html-editor").addClass("focused")
        }),
        g.on("blur",
        function() {
            return $("#html-editor").removeClass("focused")
        }),
        g.commands.addCommand({
            name: "saveFile",
            bindKey: {
                win: "Ctrl-S",
                mac: "Command-S",
                sender: "editor|cli"
            },
            exec: function(a, b, c) {
                return k.forceDocumentChanged()
            }
        }),
        this._htmlEditor = g;
        if (!window.EMBED) return f = ace.edit("css-text-editor"),
        b = require("ace/mode/css").Mode,
        f.getSession().setMode(new b),
        f.setReadOnly(!1),
        f.renderer.setHScrollBarAlwaysVisible(!1),
        f.renderer.setShowPrintMargin(!1),
        f.commands.commands.find.exec = function() {},
        f.commands.commands.replaceall.exec = function() {},
        f.on("focus",
        function() {
            return $("#css-editor").addClass("focused")
        }),
        f.on("blur",
        function() {
            return $("#css-editor").removeClass("focused")
        }),
        f.commands.addCommand({
            name: "saveFile",
            bindKey: {
                win: "Ctrl-S",
                mac: "Command-S",
                sender: "editor|cli"
            },
            exec: function(a, b, c) {
                return j.forceDocumentChanged()
            }
        }),
        e = null,
        f.getSession().on("change",
        function() {
            if (!j.isLoading()) return clearTimeout(e),
            e = setTimeout(function() {
                var a;
                return a = f.getValue(),
                j._device.applyCss(a),
                j.trigger("save")
            },
            1e3)
        }),
        this._cssEditor = f,
        i = ace.edit("js-text-editor"),
        d = require("ace/mode/javascript").Mode,
        i.getSession().setMode(new d),
        i.setReadOnly(!1),
        i.renderer.setHScrollBarAlwaysVisible(!1),
        i.renderer.setShowPrintMargin(!1),
        i.commands.commands.find.exec = function() {},
        i.commands.commands.replaceall.exec = function() {},
        i.on("focus",
        function() {
            return $("#js-editor").addClass("focused")
        }),
        i.on("blur",
        function() {
            return $("#js-editor").removeClass("focused")
        }),
        i.commands.addCommand({
            name: "saveFile",
            bindKey: {
                win: "Ctrl-S",
                mac: "Command-S",
                sender: "editor|cli"
            },
            exec: function(a, b, c) {
                return j.forceDocumentChanged()
            }
        }),
        h = null,
        i.getSession().on("change",
        function() {
            if (!j.isLoading()) return clearTimeout(h),
            h = setTimeout(function() {
                var a;
                return a = i.getValue(),
                j.trigger("save")
            },
            1e3)
        }),
        this._jsEditor = i
    },
    c.prototype._renderControlView = function() {
        var a, b, c;
        return c = this,
        a = $("#userview-control"),
        b = new ControlView({
            el: a
        }),
        b.bind("controlClicked", c.onControlClicked, this),
        b.render(),
        a.find(".icon-list > li").draggable({
            appendTo: "body",
            cursorAt: {
                left: -20,
                top: -20
            },
            helper: function() {
                var a, b;
                return b = $(":first", this).clone(),
                a = $('<div class="b-icon b-icon-add"></div>'),
                a.css({
                    position: "absolute",
                    top: "4px",
                    left: "4px"
                }),
                $(b).append(a),
                b
            },
            start: function() {
                return c._currentInterfaceMode === InterfaceModes.PREVIEW && $("#toolbar-mode-design").click(),
                $("#phone-drop").removeClass("empty"),
                $("#phone-drop").show(),
                $(this).data("origPosition", $(this).position())
            },
            stop: function() {
                return $("#phone-drop").hide()
            },
            revert: "invalid"
        }),
        $("#phone-drop").droppable({
            greedy: !0,
            tolerance: "pointer",
            activate: function(a, b) {
                return console.log("Phone drop activate"),
                c.onDropActivate(a.originalEvent, b)
            },
            deactivate: function(a, b) {
                return console.log("Phone drop deactivate"),
                c.onDropDeactivate(a.originalEvent, b)
            },
            over: function(a, b) {
                return console.log("Phone drop over"),
                c.onDropOver(a.originalEvent, b)
            },
            out: function(a, b) {
                return console.log("Phone drop out"),
                c.onDropOut(a.originalEvent, b)
            },
            drop: function(a, b) {
                return c.onDrop(a.originalEvent, b)
            }
        }),
        $("#phone-drop").mousemove(function(a) {
            if (c._isInterfaceMove === !0) return;
            return c._detachedControlEl && c._detachedControlEl.css({
                left: a.pageX + "px",
                top: a.pageY + "px"
            }),
            c.onDropTargetMouseMove(a)
        }),
        this._views.controlview = b
    },
    c.prototype._renderPageView = function() {
        var a, b;
        return b = this,
        a = new PageView({
            el: $("#userview-page")
        }),
        a.setBuilder(this),
        a.bind("pageClicked", b.onPageClicked, this),
        a.bind("pageAdded", b.onPageAdded, this),
        a.bind("pageDeleted", b.onPageDeleted, this),
        a.bind("pageDuplicated", b.onPageDuplicated, this),
        a.bind("pageEdited", b.onPageEdited, this),
        a.bind("pageMoved", b.onPageMoved, this),
        a.render(),
        this._views.pageview = a
    },
    c.prototype._renderPropertyView = function() {
        var a, b = this;
        return a = new PropertyView({
            el: $("#userview-property")
        }),
        a.bind("propertiesPopped",
        function(a) {
            return b._resizeWindow()
        }),
        a.render(),
        this._views.propertyview = a
    },
    c.prototype.initDraggable = function() {
        var a, b, c, d, e, f, g, h, i, j, k;
        return j = this,
        g = null,
        h = null,
        e = !1,
        b = null,
        c = null,
        d = null,
        i = function(a, b, c) {
            var d, e, f, g, h, i, k;
            return i = j._activeControl,
            d = i._deviceRenderedEl,
            h = window.FrameWindow.$(d).position(),
            f = b.x + c.x,
            g = b.y + c.y,
            k = window.FrameWindow.$(d).outerWidth(),
            e = window.FrameWindow.$(d).outerHeight(),
            d.css({
                position: "absolute",
                left: f + "px",
                top: g + "px",
                zIndex: 1e3
            })
        },
        a = function(a, e) {
            var f, g, h, i;
            return f = e._deviceRenderedEl,
            window.FrameWindow.$(f).addClass("ds-detached"),
            h = window.FrameWindow.$(f).offset(),
            f.css({
                position: "absolute",
                left: h.left + "px",
                top: h.top + "px",
                width: window.FrameWindow.$(f).outerWidth(),
                height: window.FrameWindow.$(f).outerHeight(),
                zIndex: 1e3
            }),
            g = f.index(),
            i = f.parent(),
            c = g,
            d = i,
            f.detach(),
            window.FrameWindow.$.mobile.activePage.append(f),
            b = f
        },
        f = function(b, c) {
            return g = c,
            h = c.parent,
            e = !0,
            a(b, c)
        },
        k = {
            _init: function() {
                return this._mouseInit(),
                this._savedControl = null,
                this._lastPos = null
            },
            _mouseStart: function(a) {
                var b, c, d, e, f, g;
                console.log("START REDROPPING"),
                this._mouseStarted = !1,
                j.endHover(),
                g = DocUtils.eventToFramePoint(a),
                this._startPoint = g,
                b = null,
                c = null,
                j._activeControl && DocUtils.elementContains(j._activeControl._deviceRenderedEl, g) ? c = j._activeControl: (b = DocUtils.getComponentAt(j._document.root, g, !1), c = b.control);
                if (NON_SELECTABLE_TYPES.hasOwnProperty(c.controlId) || c.controlId === "page") return;
                console.log("Starting dragging on control", c.getId()),
                f = c.parentControl;
                if (!f) return;
                if (!c) {
                    window.FrameWindow.$(".shim").remove();
                    return
                }
                return j._activeControl = c,
                d = window.FrameWindow.$(c._deviceRenderedEl),
                e = d.offset(),
                this._clickOffset = {
                    x: e.left - g.x,
                    y: e.top - g.y
                },
                window.FrameWindow.$(this.el).hide()
            },
            _mouseDrag: function(a) {
                var b, c, d, e, g;
                if (!j._activeControl) {
                    j._isDragging = !1;
                    return
                }
                g = DocUtils.eventToFramePoint(a),
                this._lastPos || (this._lastPos = g),
                e = {
                    x: this._startPoint.x - g.x,
                    y: this._startPoint.y - g.y
                },
                d = Math.sqrt(e.x * e.x + e.y * e.y);
                if (d < 10 && !j._isDragging) return;
                return j._isDragging || f(a, j._activeControl),
                j._isDragging = !0,
                j.onAllControlsDeselected(),
                i(a, this._lastPos, this._clickOffset),
                this._lastPos = g,
                window.FrameWindow.$(".shim").remove(),
                b = DocUtils.getComponentAt(j._document.root, g, j._activeControl),
                c = b.container,
                c && j._hoverContainer(c, g)
            },
            _mouseStop: function(a) {
                console.log("DONE REDROPPING"),
                j._isDragging = !1,
                j.endHover();
                if (!j._activeControl || !b) return;
                return b.remove(),
                j._redropControl(a)
            },
            _mouseDown: function(a) {
                return $.ui.mouse.prototype._mouseDown.call(this, a)
            }
        },
        $.widget("codiqa.controlDragger", $.ui.mouse, k),
        $("#phone-drop").controlDragger()
    },
    c.prototype.showIconView = function() {
        return this._views.iconview.show()
    },
    c.prototype.getPropertyView = function() {
        return this._views.propertyview
    },
    c.prototype._renderThemeView = function() {
        var a, b;
        return b = this,
        a = new ThemeView({
            el: $("#userview-themes")
        }),
        a.bind("themeChanged", b.onThemeChanged, this),
        a.render(),
        this._views.themeview = a
    },
    c.prototype.showPage = function(a) {},
    c.prototype.getPages = function() {
        return this._document.root ? this._document.root.getChildren("page") : []
    },
    c.prototype.promptForNewPage = function(a) {
        var b, c;
        c = this,
        b = prompt("New page name:");
        if (b !== null) return console.log("Creating page", b),
        this.onPageAdded(b,
        function(b) {
            return c._views.pageview.addPageEntry(b),
            a(b)
        },
        !0)
    },
    c.prototype._addPage = function(a) {
        var b, c;
        return b = new PageControl,
        b.title.setValue(a),
        this._currentPage || (this._currentPage = b),
        this._addControl(b, this._document.root),
        this._currentPage = b,
        c = new PageContentControl,
        this._addControl(c, b),
        this.onAllControlsDeselected(),
        this._views.pageview.sync(),
        this._resizeWindow(),
        b
    },
    c.prototype.addPage = function(a) {
        var b, c;
        return b = new PageControl,
        b.title.setValue(a),
        this._currentPage || (this._currentPage = b),
        this.addControl(b, this._document.root),
        this._currentPage = b,
        c = new PageContentControl,
        this._addControl(c, b),
        this.onAllControlsDeselected(),
        this._views.pageview.sync(),
        this._resizeWindow(),
        b
    },
    c.prototype.addPageControl = function(a) {
        return this._currentPage || (this._currentPage = a),
        this._addControl(a, this._document.root),
        this.onAllControlsDeselected(),
        this._views.pageview.sync(),
        this._resizeWindow(),
        a
    },
    c.prototype.addEmptyPage = function(a, b, c) {
        var d;
        return d = new PageControl,
        d.setId(b),
        d.title.setValue(a),
        d.initFromSerialized(c),
        this._currentPage || (this._currentPage = d),
        this._document.root.addChild(d),
        this._document.lookup[d.getId()] = d,
        this.addControl(d),
        this._currentPage = d,
        this.onAllControlsDeselected(),
        this._views.pageview.sync(),
        this._resizeWindow(),
        d
    },
    c.prototype.updatePageId = function(a, b, c) {
        var d, e, f, g, h, i, j, k, l, m, n;
        for (f in this._document.lookup) {
            d = this._document.lookup[f],
            l = d.getProperties();
            for (k in l) {
                j = l[k].property;
                if (j.propertyType === "array") {
                    h = j.getItems(),
                    e = 0;
                    while (e < h.length) g = h[e],
                    g.url && (g.url === c || g.url === "#" + c) && (g.url.indexOf("#") === 0 ? g.url = "#" + b.value: g.url = b.value),
                    e++
                }
            }
            m = d.getProperty("url"),
            m && m.property && (n = m.property.value, n === "#" + c && m.property.setValue("#" + b.value))
        }
        return i = this._document.lookup[c],
        this._document.lookup[b.value] = i,
        delete this._document.lookup[c],
        this._device.redrawAll(),
        this._views.pageview.sync(),
        this._views.pageview.selectPage(b.value),
        this.documentChanged()
    },
    c.prototype.indexControl = function(a) {
        return this._document.lookup[a.getId()] = a
    },
    c.prototype.indexControlTree = function(a) {
        var b, c, d, e, f;
        c = [],
        d = void 0,
        c.push(a),
        f = [];
        while (c.length) d = c.shift(),
        this._document.lookup[d.getId()] = d,
        e = 0,
        f.push(function() {
            var a;
            a = [];
            while (e < d.children.length) b = d.children[e],
            c.splice(0, 0, b),
            a.push(e++);
            return a
        } ());
        return f
    },
    c.prototype.unindexControl = function(a) {
        return delete this._document.lookup[a.getId()]
    },
    c.prototype._bindAllAddControlEvents = function(a) {
        var b, c, d, e, f;
        c = [],
        d = void 0,
        c.push(a),
        f = [];
        while (c.length) d = c.shift(),
        d.setAlreadyAfterBound(!1),
        this._bindAddControlEvents(d),
        d.setAlreadyAfterBound(!0),
        e = 0,
        f.push(function() {
            var a;
            a = [];
            while (e < d.children.length) b = d.children[e],
            c.splice(0, 0, b),
            a.push(e++);
            return a
        } ());
        return f
    },
    c.prototype._bindAddControlEvents = function(a) {
        var b;
        b = this;
        if (a.hasAlreadyAfterBound()) return;
        return a.bind("controlUpdated",
        function(a, c, d) {
            return d || b._propagateAliasChanges(a),
            b._device.updateControl(a),
            b.documentChanged(),
            c && (b._views.propertyview.render(), b._views.propertyview.onAttach()),
            b.embedUpdatePropertiesView(a),
            b._views.pageview.sync(),
            b._views.propertyview.resize()
        }),
        a.bind("propertyChanged",
        function(c, d, e) {
            return b.pushAction({
                action: ActionTypes.PROPERTY_FORWARD,
                reaction: ActionTypes.PROPERTY_BACK,
                control: a,
                property: c,
                oldValue: d,
                newValue: e
            })
        }),
        a.bind("controlUpdatedAdded",
        function(a, c, d) {
            return b._device.addControlToContainer(c, a, d),
            b._views.propertyview.render()
        }),
        a.bind("controlRendered",
        function() {
            return b._device.onControlRendered(this)
        }),
        a.bind("childAdded",
        function(a) {
            return b._newControlAdded(a)
        }),
        a.bind("childRemoved",
        function(a) {
            return delete b._document.lookup[a.getId()]
        }),
        a.bind("defaultPageChanged",
        function(a) {
            var c, d, e, f, g;
            g = b._document.root.getChildren("page"),
            console.log("CHANGING DEFAULT PAGE ON", g.length, "pages");
            if (a.isDefault.getValue() === "true") {
                e = 0;
                while (e < g.length) f = g[e],
                f.getId() !== a.getId() && f.isDefault.setValue("false"),
                e++;
                b._document.root.moveChild(a, 0)
            }
            c = !1,
            e = 0;
            while (e < g.length) f = g[e],
            f.isDefault.getValue() === "true" && (c = !0),
            e++;
            return c || (d = b._document.root.getChild(0), d && d.isDefault.setValue("true")),
            b._views.pageview.sync(),
            b.documentChanged()
        })
    },
    c.prototype._onAfterBindAll = function(a) {
        var b, c, d, e, f;
        c = [],
        d = void 0,
        c.push(a),
        f = [];
        while (c.length) d = c.shift(),
        d.hasAlreadyAfterBound() || (d.onAfterBind(), this._bindAddControlEvents(d), d.setAlreadyAfterBound(!0)),
        e = 0,
        f.push(function() {
            var a;
            a = [];
            while (e < d.children.length) b = d.children[e],
            c.splice(0, 0, b),
            a.push(e++);
            return a
        } ());
        return f
    },
    c.prototype._createTempControl = function(a) {
        return ControlFactory.newControl(a)
    },
    c.prototype._newControlAdded = function(a) {
        return this.indexControl(a),
        a.hasAlreadyAfterBound() || (this._onAfterBindAll(a), a.setAlreadyAfterBound(!0)),
        this._bindAddControlEvents(a),
        this.indexControlTree(a),
        this.documentChanged(),
        this._device.initControl(a)
    },
    c.prototype._newControlAddedFast = function(a) {
        return this.indexControl(a),
        this._bindAddControlEvents(a),
        this.indexControlTree(a),
        a.setAlreadyAfterBound(!0)
    },
    c.prototype._addControl = function(a, b, c, d) {
        return b ? (this._bindAddControlEvents(a), a.hasAlreadyAfterBound() || (this._onAfterBindAll(a), a.setAlreadyAfterBound(!0)), this._addControlToContainer(a, b, c, d, 1), this.documentChanged()) : (this._bindAddControlEvents(a), a.hasAlreadyAfterBound() || (this._onAfterBindAll(a), a.setAlreadyAfterBound(!0)), this._device.addControl(a), a.controlId !== "page" && a.controlId !== "pagecontent" ? this.onControlSelected(a) : this.onAllControlsDeselected(), this._printDocument(), this.documentChanged())
    },
    c.prototype.addControl = function(a, b, c, d) {
        return this.pushAction({
            action: ActionTypes.ADD,
            reaction: ActionTypes.REMOVE,
            control: a,
            parent: b,
            point: c
        }),
        this._addControl(a, b, c, d)
    },
    c.prototype._addControlFromFile = function(a, b, c) {
        return b ? (this._bindAddControlEvents(a), a.hasAlreadyAfterBound() || a.setAlreadyAfterBound(!0), this._addControlToContainer(a, b, c, !1, 1)) : (this._bindAddControlEvents(a), a.hasAlreadyAfterBound() || a.setAlreadyAfterBound(!0), this._device.addControl(a), a.controlId !== "page" && a.controlId !== "pagecontent" ? this.onControlSelected(a) : this.onAllControlsDeselected())
    },
    c.prototype._addControlToContainer = function(a, b, c, d, e) {
        if (e > 30) {
            console.error("CIRCULAR REFERENCE DETECTED");
            return
        }
        if (!b) return;
        return ! d || d && b.acceptControl(a) ? (this._device.addControlToContainer(a, b, c), this._document.lookup[a.getId()] = a) : this._addControlToContainer(a, b.getParent(), c, d, e + 1)
    },
    c.prototype._hoverContainer = function(a, b) {
        var c, d;
        this.endHover();
        if (!this._activeControl) return;
        return d = a._deviceRenderedEl,
        c = $(d).offset(),
        $(".ds-tag", window.FrameDocument).remove(),
        $('<div class="ds-tag">' + a.name + "</div>").css({
            top: Math.max(0, c.top - 15),
            left: c.left
        }).appendTo($("body", window.FrameDocument)),
        d.addClass("ds-hover"),
        this._device.dragHoverContainer(a, this._activeControl, b)
    },
    c.prototype._hoverControl = function(a, b) {
        var c;
        this.endHover();
        if (!NON_SELECTABLE_TYPES.hasOwnProperty(a.controlId)) return this._lastHovered = a,
        c = a._deviceRenderedEl,
        this._device.hoverControl(a)
    },
    c.prototype.endHover = function() {
        return this._device.endHover()
    },
    c.prototype._redropControl = function(a) {
        var b, c, d, e, f, g, h;
        g = this,
        h = a.target || a.srcElement;
        if (h !== $("#phone-drop").get(0)) {
            console.log("Not a real drop, ignoring"),
            this._device.forceRedrawActivePage();
            return
        }
        f = DocUtils.eventToFramePoint(a);
        if (!this._activeContainer || !this._activeControl) {
            console.error("not dropping, no container or component found"),
            this._device.forceRedrawActivePage();
            return
        }
        return console.log("Dropping control", this._activeControl, "on container", this._activeContainer),
        b = this._activeControl,
        d = b.parentControl,
        e = b.parentControl.getChildPosition(b),
        this._activeControl.parentControl.removeChild(this._activeControl),
        $(".shim", window.FrameDocument).remove(),
        $(".ds-hover", window.FrameDocument).removeClass("ds-hover"),
        c = this._activeContainer.onDrop(b, f),
        this.pushAction({
            action: ActionTypes.MOVE_FORWARD,
            reaction: ActionTypes.MOVE_BACK,
            control: b,
            newParent: this._activeContainer,
            newPosition: this._activeContainer.getChildPosition(b),
            oldParent: d,
            oldPosition: e,
            point: f
        }),
        this.showDropTarget(),
        this.trigger("control.dropped", b),
        this.documentChanged(),
        this.onAllControlsDeselected(),
        this._device.updateControl(b),
        this.stopScrolling(),
        setTimeout(function() {
            return g.onControlSelected(b)
        },
        20)
    },
    c.prototype._initDeviceMeta = function() {
        var a, b, c, d, e, f;
        if (!this._document || !this._document.root) return;
        b = this._document.root,
        c = b.initialSize.getValue();
        if (c) {
            a = c.split("x"),
            f = [];
            for (d in DeviceSizes) {
                e = DeviceSizes[d];
                if (e[0] === a[0] && e[1] === a[1]) f.push(this.setDeviceSize(e));
                else {
                    if (e[1] === a[0] && e[0] === a[1]) {
                        this.setDeviceSize(e),
                        this.toggleDeviceOrientation();
                        break
                    }
                    f.push(void 0)
                }
            }
            return f
        }
    },
    c.prototype._cleanupChildrenFromRemovedControl = function(a) {
        var b, c, d, e, f;
        c = [],
        d = void 0,
        c.push(a),
        f = [];
        while (c.length) d = c.shift(),
        this._reassignPersistence(d),
        delete this._document.lookup[d.getId()],
        e = 0,
        f.push(function() {
            var a;
            a = [];
            while (e < d.children.length) b = d.children[e],
            c.splice(0, 0, b),
            a.push(e++);
            return a
        } ());
        return f
    },
    c.prototype._verifySinglePersistentType = function(a, b) {
        var c, d, e, f, g;
        d = [],
        e = void 0,
        g = a.parentControl;
        while (g && g.controlId !== "app") a = a.parentControl,
        g = a && a.parentControl;
        d.push(a);
        while (d.length) {
            e = d.shift();
            if (e.controlId === b && this._document.persistent.hasOwnProperty(e.getId()) || this._document.aliases_lookup.hasOwnProperty(e.getId())) return ! 1;
            f = 0;
            while (f < e.children.length) c = e.children[f],
            d.splice(0, 0, c),
            f++
        }
        return ! 0
    },
    c.prototype._isPersistentType = function(a) {
        return a === "tabbar"
    },
    c.prototype._makePersistentCopy = function(a) {
        var b, c, d;
        for (c in this._document.persistent) {
            d = this._document.lookup[c];
            if (!d) {
                delete this._document.persistent[c],
                delete this._document.aliases[c];
                continue
            }
            if (d.controlId === a) return b = this.getDuplicatedControl(d),
            [b, d]
        }
    },
    c.prototype._addPersistentControlsToPage = function(a) {
        var b, c, d, e;
        e = [];
        for (c in this._document.persistent) b = this.getControl(c),
        b ? (d = this.getDuplicatedControl(b), d.setAlreadyAfterBound(!1), this.addControl(d, a), e.push(this._recordAlias(b, d))) : e.push(void 0);
        return e
    },
    c.prototype._recordAlias = function(a, b) {
        var c;
        return c = a.getId(),
        this._document.aliases.hasOwnProperty(c) || (this._document.aliases[c] = []),
        this._document.aliases[c].push(b.getId()),
        this._document.aliases_lookup[b.getId()] = c
    },
    c.prototype._findAndRecordAlias = function(a) {
        var b, c;
        for (c in this._document.persistent) {
            b = this.getControl(c);
            if (b && b.controlId === a.controlId) {
                this._recordAlias(b, a);
                return
            }
            b || delete this._document.persistent[c]
        }
    },
    c.prototype._recordAllAliasedControls = function(a) {
        var b, c, d, e, f;
        c = [],
        d = void 0,
        c.push(a),
        f = [];
        while (c.length) d = c.shift(),
        this._isPersistentType(d.controlId) && this._findAndRecordAlias(d),
        e = 0,
        f.push(function() {
            var a;
            a = [];
            while (e < d.children.length) b = d.children[e],
            c.splice(0, 0, b),
            a.push(e++);
            return a
        } ());
        return f
    },
    c.prototype._fillAliasLookups = function() {
        var a, b, c, d, e;
        this._document.aliases_lookup = {},
        e = [];
        for (d in this._document.aliases) b = this._document.aliases[d],
        c = 0,
        e.push(function() {
            var e;
            e = [];
            while (c < b.length) a = b[c],
            this._document.aliases_lookup[a] = d,
            e.push(c++);
            return e
        }.call(this));
        return e
    },
    c.prototype._fillExternalScripts = function() {
        var a, b, c, d, e, f, g;
        a = this.getView("externaljs");
        if (!a) return;
        c = this._document.root.scripts,
        d = c.getValue(),
        b = 0;
        while (b < d.length) a.addScript(d[b]),
        b++;
        a = this.getView("externalcss"),
        e = this._document.root.stylesheets,
        f = e.getValue(),
        b = 0,
        g = [];
        while (b < f.length) a.addSheet(f[b]),
        g.push(b++);
        return g
    },
    c.prototype._reassignPersistence = function(a) {
        var b, c, d, e, f;
        e = a.getId();
        if (this._document.persistent.hasOwnProperty(e)) {
            if (this._document.aliases.hasOwnProperty(e)) {
                c = this._document.aliases[e];
                if (c && c.length) {
                    this._document.persistent[c[0]] = 1,
                    this._document.aliases[c[0]] = this._document.aliases[e],
                    delete this._document.aliases[e],
                    delete this._document.aliases_lookup[c[0]],
                    c.splice(0, 1),
                    d = 0;
                    while (d < c.length) this._document.aliases_lookup[c[d]] = c[0],
                    d++
                }
            }
            return delete this._document.persistent[e]
        }
        if (this._document.aliases_lookup.hasOwnProperty(e)) {
            f = this._document.aliases_lookup[e],
            c = this._document.persistent[f];
            if (c) {
                d = 0;
                while (d < c.length) {
                    b = c[d];
                    if (b === e) {
                        c.splice(d, 1),
                        delete this._document.aliases_lookup[e];
                        return
                    }
                    d++
                }
            }
        }
    },
    c.prototype._propagateAliasChanges = function(a) {
        var b, c, d, e, f, g, h, i;
        f = void 0,
        e = void 0,
        this._document.aliases_lookup.hasOwnProperty(a.getId()) ? (f = this._document.aliases_lookup[a.getId()], e = this.getControl(f)) : this._document.persistent.hasOwnProperty(a.getId()) && (f = a.getId(), e = a);
        if (e && this._document.aliases.hasOwnProperty(f)) {
            d = this._document.aliases[f],
            a.copyProperties(e),
            e.trigger("controlUpdated", e, !1, !0),
            i = [];
            for (g = 0, h = d.length; g < h; g++) {
                c = d[g];
                if (c === a.getId()) continue;
                b = this.getControl(c),
                b ? (a.copyProperties(b), i.push(b.trigger("controlUpdated", b, !1, !0))) : i.push(void 0)
            }
            return i
        }
    },
    c.prototype._userAddedControl = function(a) {
        return a.onAfterAdd && a.onAfterAdd(),
        this._device.scrollToControl(a),
        a.controlId !== "page" && a.controlId !== "pagecontent" ? this.onControlSelected(a) : this.onAllControlsDeselected()
    },
    c.prototype._calculateOffsetContentMovePosition = function(a, b) {
        var c, d;
        d = 0;
        while (d < a.children.length) {
            c = a.children[d];
            if (c.getAppendMode() === ControlAppendMode.PAGE_PREPEND) b++;
            else break;
            d++
        }
        return b
    },
    c.prototype._moveControl = function(a, b, c, d, e) {
        var f;
        return f = this._calculateOffsetContentMovePosition(c, e),
        b.removeChild(a, !0),
        c.insertChild(a, f),
        console.log("Moved child", a, "of parent", b, "to position", e, "of", c),
        this._device.updateControl(b),
        this._device.updateControl(c),
        this.documentChanged()
    },
    c.prototype.moveControl = function(a, b, c, d, e) {
        var f;
        return f = a.getParent(),
        this.pushAction({
            action: ActionTypes.MOVE_FORWARD,
            reaction: ActionTypes.MOVE_BACK,
            control: a,
            oldParent: b,
            newParent: c,
            oldPosition: d,
            newPosition: e
        }),
        this._moveControl(a, b, c, d, e)
    },
    c.prototype._removeControl = function(a, b) {
        var c, d, e, f;
        e = this.getPages(),
        d = this._document.lookup[a.getId()];
        if (!d) {
            console.error("Unable to find control", a.getId(), " in document lookup map!"),
            this.onAllControlsDeselected();
            return
        }
        return this._cleanupChildrenFromRemovedControl(d),
        delete this._document.lookup[a.getId()],
        a.parentControl ? a.parentControl.removeChild(a) : console.error("Null parent control on child removal!"),
        a.getControlType() === "page" ? (e.length > 0 ? (c = e[0], this.onAllControlsDeselected(), this.setCurrentPage(c.getId())) : console.error("Tried to switch to page on page delete but none exist!"), f = this, setTimeout(function() {
            return f._device.removeControl(a),
            f.onControlDeselected(a),
            f.documentChanged(),
            f.trigger("pageDeleted")
        },
        150)) : (this._device.removeControl(a), this.onControlDeselected(a), this.documentChanged())
    },
    c.prototype.removeControl = function(a, b) {
        return this.pushAction({
            action: ActionTypes.REMOVE,
            reaction: ActionTypes.ADD,
            control: a,
            parent: a.getParent()
        }),
        this._removeControl(a, b)
    },
    c.prototype.removeSelectedControl = function() {
        var a;
        a = this.getSelectedControl();
        if (a && a.controlId !== "page") return this.removeControl(a)
    },
    c.prototype._changeProperty = function(a, b, c) {
        return console.log("Changing property", a, b, c),
        b.setValue(c),
        this._device.updateControl(a),
        this._views.propertyview.render()
    },
    c.prototype.duplicateControl = function(a) {
        var b, c, d;
        return d = a.getParent(),
        b = a.cloneControl(!0, d),
        this._bindAllAddControlEvents(b),
        c = a.parentControl.getChildPosition(a),
        a.parentControl.insertChild(b, c + 1),
        this.pushAction({
            action: ActionTypes.ADD,
            reaction: ActionTypes.REMOVE,
            control: b,
            parent: a.parentControl,
            index: c
        }),
        this._duplicateIndexControls(b),
        this._newControlAdded(b),
        b.getControlType() === "page" && this.setCurrentPage(b.getId()),
        b
    },
    c.prototype.getDuplicatedControl = function(a) {
        var b;
        return b = a.cloneControl(!0),
        this._bindAddControlEvents(b),
        b.setAlreadyAfterBound(!0),
        this.indexControl(b),
        this._duplicateIndexControls(b),
        b
    },
    c.prototype._duplicateIndexControls = function(a) {
        var b, c, d;
        c = 0,
        d = [];
        while (c < a.children.length) b = a.children[c],
        this.indexControl(b),
        this._bindAddControlEvents(b),
        b.setAlreadyAfterBound(!0),
        this._duplicateIndexControls(b),
        d.push(c++);
        return d
    },
    c.prototype.getControl = function(a) {
        return this._document.lookup[a]
    },
    c.prototype.pushAction = function(a) {
        if (this._isLoading) return;
        return this._redoStack = [],
        this._actionStack.push(a),
        this._updateToolbar(),
        this._internalActionCount++
    },
    c.prototype.scriptAction = function(a, b) {
        if (!b.action) return;
        switch (a) {
        case ActionTypes.ADD:
            return b.control.getControlType() === "page" ? this.addPageControl(b.control) : b.control.getControlType() === "panelbutton" ? (this._addControl(b.control, b.parent, b.index), b.control.addPanelToPageControl(b.control.panelControl)) : this._addControl(b.control, b.parent, b.index);
        case ActionTypes.REMOVE:
            return this._removeControl(b.control);
        case ActionTypes.MOVE_BACK:
            return b.newParent.removeChild(b.control, !0),
            b.oldParent.insertChild(b.control, b.oldPosition),
            this._device.updateControl(b.newParent),
            this._device.updateControl(b.oldParent),
            this._internalActionCount++,
            this.documentChanged();
        case ActionTypes.MOVE_FORWARD:
            return b.oldParent.removeChild(b.control, !0),
            b.newParent.insertChild(b.control, b.newPosition),
            this._device.updateControl(b.newParent),
            this._device.updateControl(b.oldParent),
            this._internalActionCount++,
            this.documentChanged();
        case ActionTypes.PROPERTY_BACK:
            return this._changeProperty(b.control, b.property, b.oldValue);
        case ActionTypes.PROPERTY_FORWARD:
            return this._changeProperty(b.control, b.property, b.newValue)
        }
    },
    c.prototype.cut = function() {
        var a;
        a = this.getSelectedControl();
        if (a && a.controlId !== "page" && !(a.controlId in NON_SELECTABLE_TYPES)) return this._cutControl = a,
        this._copiedControl = null,
        this.removeSelectedControl()
    },
    c.prototype.copy = function() {
        var a;
        a = this.getSelectedControl();
        if (a && a.controlId !== "page" && !(a.controlId in NON_SELECTABLE_TYPES)) return this._copiedControl = a,
        this._cutControl = null
    },
    c.prototype.paste = function() {
        var a, b, c, d, e;
        e = this._cutControl || this._copiedControl;
        if (!e) return;
        d = this.getSelectedControl();
        if (d && d.controlId === "page") {
            a = d.findChildrenByType("pagecontent");
            if (a.length) return c = a[0],
            console.log("Pasting", e, "into", d),
            b = e.cloneControl(!0),
            this.addControl(b, c, null, !1)
        } else if (d && d.acceptControl(this._copiedControl)) return console.log("Pasting", e, "into", d),
        b = e.cloneControl(!0),
        this.addControl(b, d, null, !1)
    },
    c.prototype.updateSavePointer = function() {
        return this._lastSavePointer = this._actionStack[this._actionStack.length - 1]
    },
    c.prototype.isLastSaveSpot = function(a) {
        var b;
        return this._lastSavePointer ? (b = this._lastSavePointer, b === a) : !1
    },
    c.prototype.isBackAtSaved = function() {
        return this._actionStack.length && this.isLastSaveSpot(this._actionStack[this._actionStack.length - 1]) ? !0 : !1
    },
    c.prototype.undo = function() {
        var a, b;
        if (this.isPreviewMode()) return;
        if (this._actionStack.length <= 1) return;
        return b = this._actionStack.pop(),
        b && (console.log("UNDO"), a = this.isBackAtSaved(), this.scriptAction(b.reaction, b), a && Codiqa.markBackAtSaved && Codiqa.markBackAtSaved(), this._redoStack.push(b)),
        this._updateToolbar()
    },
    c.prototype.redo = function() {
        var a, b;
        if (this.isPreviewMode()) return;
        return b = this._redoStack.pop(),
        b && (console.log("REDO"), this.scriptAction(b.action, b), this._actionStack.push(b), a = this.isBackAtSaved(), a && Codiqa.markBackAtSaved && Codiqa.markBackAtSaved()),
        this._updateToolbar()
    },
    c.prototype.duplicateActive = function() {
        var a, b;
        b = this.getSelectedControl();
        if (b) return a = this.duplicateControl(b),
        this.onControlSelected(a)
    },
    c.prototype.hasUndo = function() {
        return this._actionStack.length > 0
    },
    c.prototype.hasRedo = function() {
        return this._redoStack.length > 0
    },
    c.prototype.getLoadedApp = function() {
        return this._loadedApp
    },
    c.prototype.generateCodiqaFile = function() {
        var a, b, c;
        return a = new ControlOutputVisitor,
        b = {
            v: "b1",
            saved: (new Date).getTime(),
            doc: a.getAppDocument(this._document.root)
        },
        c = JSON.stringify(b),
        $.post("/builder/export/csave", {
            d: c
        },
        function(a) {
            if (a.result === "success") return window.location = "/builder/export/cout"
        }),
        console.log("Codiqa output:", b),
        c
    },
    c.prototype.saveAsCodiqa = function() {
        var a, b, c;
        return a = new ControlOutputVisitor,
        b = {
            v: "b1",
            saved: (new Date).getTime(),
            doc: a.getAppDocument(this._document.root)
        },
        c = JSON.stringify(b),
        $.post("/builder/export/csave", {
            d: c
        },
        function(a) {
            if (a.result === "success") return window.location = "/builder/export/cout"
        }),
        console.log("Codiqa output:", b)
    },
    c.prototype.setTempAppId = function(a) {
        return this._tempAppId = a
    },
    c.prototype.saveTemp = function(a) {
        var b, c, d, e;
        return b = new TempApp,
        b.id = a,
        c = new ControlOutputVisitor,
        d = {
            v: "b1",
            saved: (new Date).getTime(),
            doc: c.getAppDocument(this._document.root)
        },
        e = this.getDocumentAsHtml(),
        b.set({
            app_html: e,
            app_tree: d
        }),
        this.ajaxManager.add({
            url: "/tryit/" + a,
            type: "POST",
            data: JSON.stringify(b),
            success: function() {
                return console.log("saved app")
            }
        })
    },
    c.prototype.saveDemoApp = function(a) {
        var b, c, d, e;
        return b = new TempApp,
        b.id = a,
        c = new ControlOutputVisitor,
        d = {
            v: "b1",
            saved: (new Date).getTime(),
            doc: c.getAppDocument(this._document.root)
        },
        e = this.getDocumentAsHtml(),
        b.set({
            html: e,
            tree: d
        }),
        this.ajaxManager.add({
            url: "/builder/demo/save",
            type: "POST",
            data: JSON.stringify(b),
            success: function() {
                return console.log("saved app")
            }
        })
    },
    c.prototype.processAppMetaData = function(a) {
        return $("#app-name").text(a.get("name"))
    },
    c.prototype.loadAppById = function(a) {
        var b, c;
        return this.trigger("appLoading"),
        c = this,
        b = new UserApp,
        b.id = a,
        this._fullApp = b,
        b.fetch({
            success: function(d) {
                return console.log("Loaded app with id", a),
                d.get("tree") === "" && c.trigger("appDoneLoading"),
                d.set({
                    lm: d.get("last_modified")
                }),
                c.processAppMetaData(d),
                c.openFromCodiqa(d.get("tree"), d),
                c._loadedApp = b
            },
            error: function(b) {
                return console.error("Unable to load app with id", a)
            }
        })
    },
    c.prototype._handleAppTheme = function(a) {
        var b, c;
        return b = this._document.root,
        a.get("active_theme") && !b.activeJQMTheme.getValue() && (c = a.get("active_theme"), c.name && c.css && b.activeJQMTheme.setValue({
            type: "user",
            name: c.name,
            css: c.css
        })),
        this._views.themes.setTheme(this._document.root.activeJQMTheme.getValue())
    },
    c.prototype.removeTheme = function() {
        return this._activeTheme = null,
        this._device.removeTheme(),
        this.forceDocumentChanged()
    },
    c.prototype.applyTheme = function(a) {
        if (!a.css) return;
        return this._activeTheme = a,
        this._document.root.activeJQMTheme.setValue(a),
        this._device.applyTheme(a),
        window.App._device.setJQueryMobileThemeUrl(""),
        this.forceDocumentChanged()
    },
    c.prototype.applyCss = function(a) {
        return this._cssEditor.getSession().setValue(a),
        this._device.applyCss(a)
    },
    c.prototype.applyJs = function(a) {
        return this._jsEditor.getSession().setValue(a),
        this._device.applyJs(a)
    },
    c.prototype.setJs = function(a) {
        return this._jsEditor.getSession().setValue(a)
    },
    c.prototype.saveAppToServer = function() {
        var a, b, c;
        return c = this,
        a = new ControlOutputVisitor,
        b = this._internalActionCount,
        $.proxy(function() {
            var d, e, f, g;
            if (this._loadedApp) {
                e = {
                    v: "b1",
                    saved: (new Date).getTime(),
                    doc: a.getAppDocument(this._document.root),
                    persistent: this._document.persistent,
                    aliases: this._document.aliases
                };
                if (!this._document.root || !this._document.root.children || this._document.root.children.length < 1) return;
                return f = this.getDocumentAsHtml(),
                d = this.getCss(),
                g = this.getJs(),
                this._loadedApp.set({
                    tree: e
                }),
                this._loadedApp.set({
                    html: f
                }),
                this._loadedApp.set({
                    css: d
                }),
                this._loadedApp.set({
                    js: g
                }),
                this._sessionKey && this._loadedApp.set({
                    key: this._sessionKey
                }),
                this._startSaving(),
                this.ajaxManager.add({
                    url: "/api/v1/user/app/" + this._loadedApp.id,
                    type: "PUT",
                    data: JSON.stringify($.extend(this._loadedApp.attributes, {
                        name: "",
                        is_archived: "",
                        is_public: ""
                    })),
                    success: function(a) {
                        return c._loadedApp.set({
                            lm: a.last_modified
                        }),
                        console.log("Saved app! Last modified:", c._loadedApp.get("last_modified")),
                        c._endSaving(),
                        c.onSuccessfulSave(b)
                    },
                    error: function(a, b, d) {
                        var e;
                        try {
                            e = JSON.parse(a.responseText);
                            if (e.result) return c.onConflictedSave(e.last_user, e.result)
                        } catch(f) {
                            return console.log("UNABLE TO SAVE", a, b, d)
                        }
                    }
                })
            }
        },
        this)(b)
    },
    c.prototype._startSaving = function() {
        return clearTimeout(this._saveNoticeDelay),
        $(".saving-text").removeClass("hidden"),
        $(".last-saved").addClass("hidden")
    },
    c.prototype._endSaving = function() {
        return clearTimeout(this._saveNoticeDelay),
        this._saveNoticeDelay = setTimeout(function() {
            return $(".last-saved").removeClass("hidden"),
            $(".saving-text").addClass("hidden")
        },
        2e3)
    },
    c.prototype.makeBetaLive = function(a) {
        var b, c;
        return c = this,
        b = this.getDocumentAsHtml(),
        c._betaLivePreviewKey ? $.post("/b/" + c._betaLivePreviewKey, {
            h: b
        },
        function(a) {
            if (a.result === "success") return console.log("Updated app live preview of", a.key)
        }) : $.post("/b/", {
            h: b
        },
        function(a) {
            var b, d, e;
            if (a.result === "success") return console.log("Saved app live preview to", a.key),
            c._betaLivePreviewKey = a.key,
            $("#toolbar-mode-live").hide(),
            b = document.domain,
            d = document.location.protocol,
            e = d + "//" + b + "/b/" + a.key,
            $("#b-toolbar > .r").prepend('<a class="l" href="' + e + '">' + e + "</a>")
        })
    },
    c.prototype.newDefaultApp = function() {
        var a;
        return this._actionStack = [{
            action: ActionTypes.NEW_APP
        }],
        this._redoStack = [],
        this._lastSavePointer = this._actionStack[0],
        a = this,
        this._device.newApp(function() {
            var b;
            return b = new AppControl,
            a._document.root = b,
            a._addControl(b),
            a._addPage(_t("Home")),
            a._views.pageview.sync(),
            a.trigger("appDoneLoading")
        })
    },
    c.prototype.newApp = function(a) {
        return this._actionStack = [{
            action: ActionTypes.NEW_APP
        }],
        this._redoStack = [],
        this._lastSavePointer = this._actionStack[0],
        this._document.root = null,
        this._document.lookup = {},
        this._device.newApp(a),
        this._views.pageview.sync()
    },
    c.prototype._isValidCodiqaFile = function(a) {
        var b;
        if ($.trim(a) === "") return ! 1;
        b = null;
        try {
            b = JSON.parse(a)
        } catch(c) {
            return console.error("Invalid codiqa file, unable to parse", a),
            !1
        }
        return b ? !0 : !1
    },
    c.prototype.isLoading = function() {
        return this._isLoading
    },
    c.prototype.resetDocument = function() {
        return IdGiver.reset(),
        this._document.persistent = {},
        this._document.lookup = {},
        this._document.aliases = {},
        this._actionStack = [{
            action: ActionTypes.NEW_APP
        }],
        this._redoStack = [],
        this._lastSavePointer = this._actionStack[0]
    },
    c.prototype.openFromCodiqa = function(a, b) {
        var c, d = this;
        console.log("New app");
        if (!a) return;
        if (typeof a == "string" || a instanceof String) {
            if ($.trim(a) === "") return;
            c = null;
            try {
                c = JSON.parse(a)
            } catch(e) {
                console.error("Invalid codiqa file, unable to parse", a);
                return
            }
            if (!c) return;
            a = c
        }
        if (!a.doc) {
            console.log("Invalid file doc");
            return
        }
        return this.newApp(function() {
            var c, e, f, g, h, i;
            if (a) {
                console.log("New root"),
                f = a.doc;
                if (!f) {
                    alert("Unable to load app. Please contact support@codiqa.com");
                    return
                }
                d._document.root = new AppControl,
                d._document.root.initFromSerialized(f),
                d._document.persistent = a.persistent || {},
                d._document.aliases = a.aliases || {},
                b && d._handleAppTheme(b),
                d._initDeviceMeta(),
                d._fillAliasLookups(),
                d._fillExternalScripts(),
                console.log("Readding from root", f),
                i = f.children;
                for (g = 0, h = i.length; g < h; g++) {
                    e = i[g],
                    c = null;
                    if (e.type === "page") console.log("New page"),
                    c = d.addEmptyPage(e.properties.title, e.id, e),
                    IdGiver.forceIncrement("page");
                    else {
                        c = ControlFactory.newControl(e.type);
                        if (!c) continue;
                        c.initFromSerialized(e),
                        IdGiver.forceIncrement(e.type)
                    }
                    d._openFromCodiqaRoot(c, e, d._document.root)
                }
            }
            return d._device.fixPageThemes(),
            d.trigger("pagesChanged"),
            d.trigger("appDoneLoading")
        })
    },
    c.prototype._openFromCodiqaRoot = function(a, b, c) {
        var d, e, f, g, h, i;
        a.getControlType() !== "page" && this._addControlFromFile(a, c),
        console.log("Adding children from page", a.getId()),
        h = b.children,
        i = [];
        for (f = 0, g = h.length; f < g; f++) {
            e = h[f],
            d = ControlFactory.newControl(e.type);
            if (!d) continue;
            d.initFromSerialized(e),
            IdGiver.forceIncrement(e.type),
            console.log("\tAdding child", d.getId()),
            i.push(this._openFromCodiqaRoot(d, e, a))
        }
        return i
    },
    c.prototype.openFromCodiqaObject = function(a) {
        return this.openFromCodiqa(JSON.stringify(a))
    },
    c.prototype.downloadAppHtml = function() {
        return this._loadedApp ? window.location = "/download/" + this._loadedApp.id + "/" + this._loadedApp.get("slug") : this.exportAsZip()
    },
    c.prototype.exportAsZip = function() {
        var a, b, c;
        return a = new ControlOutputVisitor,
        c = a.getAppHtml(this._document.root),
        b = style_html(c, {
            indentSize: 4,
            unformatted: ["textarea", "script", "scriptdisabled"]
        }),
        $.post("/builder/export/qsave", {
            h: b
        },
        function(a) {
            var b;
            if (a.result === "success") return b = window.onbeforeunload,
            window.onbeforeunload = undefined,
            window.location = "/builder/export/qzip",
            setTimeout(function() {
                return window.onbeforeunload = b
            },
            5e3)
        })
    },
    c.prototype.getDocument = function() {
        return this._document
    },
    c.prototype.getCurrentHtml = function() {
        var a, b, c, d, e, f;
        return e = this._document.active_html,
        e ? (f = this.getDocumentFragmentAsHtml(), c = e.indexOf("<body>"), b = e.indexOf("</body>"), d = e.slice(0, c), a = e.slice(b), d + "<body>\n" + f + "\n" + a) : (this._document.active_html = this.getDocumentAsHtml(), this._document.active_html)
    },
    c.prototype.getCss = function() {
        return this._cssEditor.getSession().getValue()
    },
    c.prototype.getJs = function() {
        return this._jsEditor.getSession().getValue()
    },
    c.prototype.setHtmlIndentChar = function(a) {
        return this._htmlIndentChar = a
    },
    c.prototype._enableScripts = function(a) {
        if (a) return a.replace(/<scriptdisabled/gi, "<script").replace(/scriptdisabled>/gi, "script>")
    },
    c.prototype.getDocumentAsHtml = function() {
        var a, b, c;
        return a = new ControlOutputVisitor,
        c = a.getTreeAsHtml(this._document.root),
        c = this._enableScripts(c),
        b = style_html(c, {
            indentChar: this._htmlIndentChar || "  ",
            unformatted: ["textarea", "script", "scriptdisabled"]
        }),
        b
    },
    c.prototype.getDocumentFragmentAsHtml = function() {
        var a, b, c;
        return a = new ControlOutputVisitor,
        c = a.getAppFragmentHtml(this._document.root),
        c = this._enableScripts(c),
        b = style_html(c, {
            indent_size: this._indentWidth,
            indent_char: this._indentType === "tabs" ? "\t": " ",
            unformatted: ["textarea", "script", "scriptdisabled"]
        }),
        b
    },
    c.prototype.getHtmlForPage = function(a) {
        var b, c, d;
        return b = new ControlOutputVisitor,
        d = b.getAppFragmentOuterHtml(a),
        d = this._enableScripts(d),
        c = style_html(d, {
            indent_size: this._indentWidth,
            indent_char: this._indentType === "tabs" ? "\t": " ",
            unformatted: ["textarea", "script", "scriptdisabled"]
        }),
        c
    },
    c.prototype.updateCurrentPageFromHtml = function(a) {
        var b, c, d, e, f, g, h, i, j;
        f = this;
        if (!this._htmlImporter) return;
        c = this.getCurrentPage(),
        c || console.error("No current page!"),
        e = c,
        this._htmlImporter.parse(a),
        g = this._htmlImporter.getRoot();
        if (g.children.length === 0) return;
        c.children = g.children[0].children,
        d = 0,
        j = c.children;
        for (h = 0, i = j.length; h < i; h++) b = j[h],
        b.parentControl = c;
        return this._shouldSkipHtmlReset = !0,
        this.documentChanged(),
        this._bindAllAddControlEvents(e),
        this._device.updateControl(e),
        setTimeout(function() {
            return f._device.fixPageThemes()
        },
        100),
        console.log("Built tree", g)
    },
    c.prototype.updateFromHtml = function(a, b) {
        var c = this;
        if (!this._htmlImporter) return;
        return this._device.newApp(function() {
            var d, e, f, g, h, i, j, k, l, m;
            c.resetDocument(),
            e = new AppControl,
            c._htmlImporter.parse(a),
            g = c._htmlImporter.getRoot();
            if (g.children.length === 0) return;
            l = g.children;
            for (h = 0, j = l.length; h < j; h++) d = l[h],
            e.addChild(d);
            c._document.root = e,
            c._shouldSkipHtmlReset = !0,
            c.documentChanged(),
            c._bindAllAddControlEvents(e),
            c._device.initAppTree(e),
            m = b.stylesheets;
            for (i = 0, k = m.length; i < k; i++) f = m[i],
            c._device.addStylesheet($(f).attr("href"));
            return setTimeout(function() {
                var a, b, d, e;
                e = c._document.root.children;
                for (b = 0, d = e.length; b < d; b++) {
                    a = e[b];
                    if (a.controlId === "page") {
                        c.onPageClicked(a.getId(), !0, !0);
                        break
                    }
                }
                return c._device.fixPageThemes(),
                c.trigger("pagesChanged"),
                c.trigger("appDoneLoading"),
                c._views.pageview.sync()
            },
            100),
            console.log("Built tree", g)
        })
    },
    c.prototype.onControlClicked = function(a) {
        return console.log("Clicked a control in app"),
        console.log(a),
        a = ControlFactory.cloneControl(a),
        this.addControl(a)
    },
    c.prototype.isSelectableControl = function(a) {
        var b;
        return b = a.getControlType(),
        !NON_SELECTABLE_TYPES.hasOwnProperty(b)
    },
    c.prototype.embedUpdatePropertiesView = function(a) {
        var b;
        if (!EMBED) return;
        return b = $("#userview-property"),
        b.length && (b.show(), b.find(".title").text(a.getName().toUpperCase()), b.find(".b-h").show(), b.find(".nano").size() && b.find(".nano").nanoScroller()),
        this._views.propertyview.onAttach()
    },
    //当控件选中时
    c.prototype.onControlSelected = function(a) {
        var b;
        debugger;
        a && a.onSelected && a.onSelected();
        if (!this._isUiInited || !this.isSelectableControl(a)) return;
        this.onAllControlsDeselected();
        this.setSelectedControl(a);
        b = this._views.propertyview;
        if (this._currentInterfaceMode !== InterfaceModes.PREVIEW) {
            debugger;
            //开始收集该control的属性并显示属性
            b.showProperties(a);
            this._device.onControlSelected(a);
        }
        return this.showCrumbs(a);
    },
    c.prototype.showCrumbs = function(a) {
        var b, c, d, e, f, g;
        $("#crumbs").show(),
        $("#crumbs").empty(),
        e = a,
        f = 0,
        g = [];
        while (e || f > 100) {
            d = e.name,
            e.controlId === "htmlnode" && (d = e.nodeName.getValue()),
            c = '<a href="#" data-cid="' + e.getId() + '">' + d + "</a>",
            b = e,
            e = e.parentControl;
            if (!e) break;
            if (b.controlId === "pagecontent") {
                f++;
                continue
            }
            $("#crumbs").prepend(c);
            if (e.controlId === "app") break;
            $("#crumbs").prepend(' <span class="divider-arrow"></span> '),
            g.push(f++)
        }
        return g
    },
    c.prototype.hideCrumbs = function() {
        return $("#crumbs").hide()
    },
    c.prototype.setSelectedControl = function(a) {
        return this._selectedControl = a
    },
    c.prototype.getSelectedControl = function() {
        return this._selectedControl
    },
    c.prototype.userSetDeviceSize = function(a) {
        return this._currentOrientation === DeviceOrientation.LANDSCAPE ? this.setDeviceSize([a[1], a[0], a[2]]) : this.setDeviceSize(a),
        this._currentDeviceSize = a
    },
    c.prototype.setDeviceSize = function(a) {
        this._currentDeviceSize = a,
        this._document && this._document.root && this._document.root.initialSize.setValue(a[0] + "x" + a[1]),
        this._internalActionCount++,
        this.documentChanged(),
        a[0] < 750 ? $('#userview-control [data-cid="split"]').hide() : $('#userview-control [data-cid="split"]').show(),
        $("#phone").css({
            width: a[0],
            height: a[1]
        }),
        $("#phone .sized").css({
            width: a[0] + "px",
            height: a[1] + "px"
        }),
        $("#phone-c").css({
            width: a[0],
            height: a[1]
        }),
        $("#phone-skin .toolbar .size").text(a[2] + " - " + a[0] + "x" + a[1]),
        this._centerPhone();
        if (this._device) return this._device.repositionCurrentSelector()
    },
    c.prototype.setDeviceType = function(a) {
        this._currentDevice = a;
        switch (a) {
        case DeviceTypes.IPHONE:
            return $("#phone .device > div").attr("class", "iphone");
        case DeviceTypes.IPAD:
            return $("#phone .device > div").attr("class", "ipad")
        }
    },
    c.prototype.toggleDeviceOrientation = function() {
        var a;
        return this._currentOrientation === DeviceOrientation.LANDSCAPE ? (this.setDeviceOrientation(DeviceOrientation.PORTRAIT), a = this._currentDeviceSize, this.setDeviceSize([this._currentDeviceSize[0], this._currentDeviceSize[1], this._currentDeviceSize[2]]), this._currentDeviceSize = a) : (this.setDeviceOrientation(DeviceOrientation.LANDSCAPE), a = this._currentDeviceSize, this.setDeviceSize([this._currentDeviceSize[1], this._currentDeviceSize[0], this._currentDeviceSize[2]]), this._currentDeviceSize = a)
    },
    c.prototype.setDeviceOrientation = function(a) {
        return this._currentOrientation = a
    },
    c.prototype.expandSidebar = function() {
        return $(document.body).removeClass("collapsed")
    },
    c.prototype.collapseSidebar = function() {
        return $(document.body).addClass("collapsed")
    },
    c.prototype.setInterfaceMode = function(a) {
        return this._currentInterfaceMode = a,
        this.trigger("interfaceModeChanged")
    },
    c.prototype.getInterfaceMode = function() {
        return this._currentInterfaceMode
    },
    c.prototype.isPreviewMode = function() {
        return this._currentInterfaceMode === InterfaceModes.PREVIEW
    },
    c.prototype._updateInterfaceModeStyles = function() {
        var a, b, c, d;
        a = $("#code"),
        b = $("#design"),
        c = $("#preview");
        switch (this._currentInterfaceMode) {
        case InterfaceModes.DESIGN:
            return c.removeClass("active"),
            c.addClass("inactive"),
            a.removeClass("small"),
            b.removeClass("inactive"),
            b.addClass("active"),
            $("#js-errors").text("").hide(),
            this._changeToDesignMode();
        case InterfaceModes.PREVIEW:
            return b.removeClass("active"),
            b.addClass("inactive"),
            a.addClass("small"),
            this._changeToPreviewMode();
        case InterfaceModes.CODE:
            return this.hideCrumbs(),
            b.removeClass("active"),
            b.addClass("inactive"),
            c.removeClass("active"),
            c.addClass("inactive"),
            d = this.getDocumentFragmentAsHtml(),
            a.find("textarea").val(d),
            a.removeClass("inactive"),
            a.addClass("active")
        }
    },
    c.prototype._changeToDesignMode = function() {
        return this._device.closeControls(),
        this._device.initEvents(),
        $(document.body).removeClass("preview").addClass("design"),
        $("#code").removeClass("hidden"),
        $("#phone-wrapper").removeClass("hidden"),
        window.MODE === "library" && this._refreshTestFrame(),
        this.onAllControlsDeselected(),
        this._isInspectorShowing = !1,
        this._resizeWindow(),
        this._document.root && (this._device.designModeHint(), this._device.redrawActivePage()),
        this._device.redrawPlaceholderControls()
    },
    c.prototype._changeToPreviewMode = function() {
        this.onAllControlsDeselected(),
        $(document.body).removeClass("design").addClass("preview"),
        this.hideCrumbs(),
        window.MODE === "library" && this._injectIntoTestFrame(),
        $("#code").addClass("hidden"),
        $("#phone-wrapper").removeClass("hidden"),
        this._isInspectorShowing = !1,
        this._resizeWindow(),
        this._device.previewModeHint(),
        this._device.redrawPlaceholderControls(),
        this._syncHtmlBlockScripts();
        if (window.FrameWindow.CodiqaControls) return window.FrameWindow.CodiqaControls.init()
    },
    c.prototype._syncHtmlBlockScripts = function() {
        var a, b, c;
        window.FrameWindow.$("script[data-sync-load]", window.FrameDocument).remove(),
        a = window.FrameWindow.$("scriptdisabled", window.FrameDocument);
        if (!a.length) return;
        return b = this,
        b.syncScripts = [],
        c = function() {
            var a;
            if (b.syncScripts.length === 0) {
                b._device.refreshPage();
                return
            }
            a = b.syncScripts[0],
            b.syncScripts.splice(0, 1),
            window.FrameDocument.body.appendChild(a);
            if (!a.src || a.src === "") return c()
        },
        a.each(function() {
            var a, d;
            return d = window.FrameDocument.createElement("script"),
            d.setAttribute("data-sync-load", "true"),
            a = window.FrameWindow.$(this, window.FrameDocument).attr("src"),
            a && a !== "" ? (d.src = a, d.onload = c, d.onerror = c) : d.innerHTML = this.innerHTML,
            b.syncScripts.push(d)
        }),
        c()
    },
    c.prototype._refreshTestFrame = function() {
        var a, b, c, d;
        return a = $("#test-frame"),
        b = $("#test-frame-wrapper"),
        b.hide(),
        c = a.get(0),
        d = c.contentWindow
    },
    c.prototype._createScriptElement = function(a, b) {
        var c;
        return c = a.createElement("script"),
        c.type = "text/javascript",
        c.src = b,
        c
    },
    c.prototype._injectIntoTestFrame = function() {
        var a, b, c, d, e, f;
        return b = $("#test-frame-wrapper"),
        b.show(),
        a = $("#test-frame"),
        d = a.get(0),
        f = d.contentDocument || d.contentWindow.document,
        c = this.getDocumentAsHtml(),
        e = window.Codiqa.onGetTestModeHtml && window.Codiqa.onGetTestModeHtml(c),
        f.open(),
        f.write(e),
        f.close()
    },
    c.prototype._doEditorAction = function(a) {
        switch (a) {
        case "save":
            return this._saveEditors();
        case "externaljs":
            return $("#externaljs-modal").modal("show");
        case "externalcss":
            return $("#externalcss-modal").modal("show")
        }
    },
    c.prototype.showDropTarget = function() {
        return $("#phone-drop").show()
    },
    c.prototype.hideDropTarget = function() {
        return $("#phone-drop").hide()
    },
    c.prototype.enterDropMode = function() {
        return this.showDropTarget()
    },
    c.prototype.exitDropMode = function() {
        return this.hideDropTarget()
    },
    c.prototype.onControlDeselected = function(a) {
        if (!this._isUiInited) return;
        return this.clearControlToolbar(),
        this.onAllControlsDeselected()
    },
    c.prototype.onAllControlsDeselected = function() {
        if (!this._isUiInited) return;
        return $("#crumbs").hide(),
        this._selectedControl = null,
        this.getView("propertyview").hideProperties(),
        this.clearControlToolbar(),
        this._views.propertyview.clear(),
        this._device.onAllControlsDeselected()
    },
    c.prototype.setCurrentPage = function(a) {
        var b;
        return b = this._document.lookup[a],
        console.log(b),
        this._device._setCurrentPage(a),
        this._currentPage = b
    },
    c.prototype.getCurrentPage = function() {
        return this._currentPage
    },
    c.prototype.getCurrentPageId = function() {
        var a;
        a = this.getCurrentPage();
        if (a) return a.getId()
    },
    c.prototype.onPageClicked = function(a, b) {
        var c;
        return this._isInspectorShowing && $("#toolbar-mode-design").click(),
        c = this._document.lookup[a],
        console.log(c),
        this._device.showPage(a, b),
        this.onAllControlsDeselected(),
        this._currentPage = c,
        this.onControlSelected(c)
    },
    c.prototype.onPageAdded = function(a, b) {
        var c, d;
        return d = this,
        c = this.addPage(a),
        BuilderDispatcher.trigger("pagesChanged", this.getPages()),
        this._addPersistentControlsToPage(c),
        b(c)
    },
    c.prototype.onPageDeleted = function(a, b) {
        var c;
        c = this.getControl(a);
        if (!c) return;
        return this.removeControl(c, b)
    },
    c.prototype.onPageDuplicated = function(a, b) {
        var c, d, e;
        return c = this.getControl(a),
        c && (d = this.duplicateControl(c), e = d.title.getValue(), e.indexOf("Copy") < 0 && d.title.setValue(e + " Copy"), this._recordAllAliasedControls(d), this.onControlSelected(d), b(d)),
        this._resizeWindow()
    },
    c.prototype.onPageEdited = function(a) {
        return this.onControlSelected(a)
    },
    c.prototype.onPageMoved = function(a, b, c) {
        var d;
        if (b === c) return;
        return d = this.getControl(a),
        this._document.root.moveChild(d, c),
        this._internalActionCount++,
        this.documentChanged()
    },
    c.prototype.onThemeChanged = function(a) {
        var b;
        b = this.getSelectedControl();
        if (b) return b.setTheme(a),
        this._device.updateControl(b)
    },
    c.prototype.onDropActivate = function(a, b) {
        console.log("Drop activate");
        if (this.isPreviewMode()) return this.setInterfaceMode(InterfaceModes.DESIGN)
    },
    c.prototype.onDropDeactivate = function() {
        return console.log("Drop deactivate"),
        this.onDropFinished(),
        this._selectedContainer = null
    },
    c.prototype.onDropOver = function(a, b) {
        var c;
        return console.log("Drop over"),
        c = $(b.draggable).data("cid"),
        this._dragDropType = c,
        console.log("Drop", c),
        this._device.startDragDrop(c)
    },
    c.prototype.onDropOut = function(a, b) {
        return console.log("Drop out"),
        this._dragDropType = null,
        this._device.stopDragDrop(),
        this.onDropFinished(),
        this._selectedContainer && this._selectedContainer.onDragOut(),
        this._selectedContainer = null
    },
    c.prototype.onDrop = function(a, b) {
        var c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s;
        if (!this._selectedContainer) return;
        r = Metrics.start(),
        h = $("#phone .content"),
        n = h.offset(),
        i = a.pageX - n.left,
        s = a.pageY - n.top,
        e = window.FrameWindow,
        q = e.pageYOffset,
        p = {
            x: i,
            y: Math.max(s + q - 40, 0)
        },
        console.log("Dropped over container", this._selectedContainer),
        d = $(b.draggable).data("cid"),
        console.log("Drop", d),
        b.helper.remove(),
        c = Metrics.start(),
        l = void 0,
        o = void 0,
        j = !1,
        k = !1;
        if (this._isPersistentType(d)) {
            if (!this._verifySinglePersistentType(this._selectedContainer, d)) return;
            m = this._makePersistentCopy(d),
            m ? (l = m[0], o = m[1], k = !0) : (l = ControlFactory.newControl(d), j = !0)
        } else l = ControlFactory.newControl(d);
        return f = Metrics.end(c),
        console.log("Cloned control in " + f + "ms"),
        this.addControl(l, this._selectedContainer, p, !0),
        this.onDropFinished(),
        this._userAddedControl(l),
        this._selectedContainer = null,
        j && (this._document.persistent[l.getId()] = 1),
        k && o && this._recordAlias(o, l),
        g = Metrics.end(r),
        console.log("Added control - " + g + "ms")
    },
    c.prototype.onDropped = function(a) {
        var b, c, d, e, f, g, h, i;
        if (a.target !== $("#phone-drop").get(0)) {
            console.log("Not a real drop, ignoring");
            return
        }
        i = DocUtils.eventToFramePoint(a);
        if (!this._activeContainer || !this._activeControl) {
            console.error("not dropping, no container or component found");
            return
        }
        console.log("Dropping control", this._activeControl, "on container", this._activeContainer),
        $(".shim", window.FrameDocument).remove(),
        $(".ds-hover", window.FrameDocument).removeClass("ds-hover"),
        b = this._activeControl.controlId,
        e = void 0,
        h = void 0,
        c = !1,
        d = !1;
        if (this._isPersistentType(b)) {
            if (!this._verifySinglePersistentType(this._activeContainer, b)) return;
            f = this._makePersistentCopy(b),
            f ? (e = f[0], h = f[1], d = !0) : (e = ControlFactory.newControl(b), c = !0)
        } else e = ControlFactory.newControl(b);
        return g = this._activeContainer.onDrop(e, i),
        this.pushAction({
            action: ActionTypes.ADD,
            reaction: ActionTypes.REMOVE,
            control: e,
            parent: this._activeContainer,
            index: g
        }),
        this._newControlAdded(e),
        c && (this._document.persistent[e.getId()] = 1),
        d && h && this._recordAlias(h, e),
        this.onAllControlsDeselected(),
        this.onControlSelected(e),
        this.showDropTarget(),
        this.stopScrolling()
    },
    c.prototype.stopScrolling = function() {
        return clearInterval(this._scrollTimeout)
    },
    c.prototype.scrollDown = function() {
        var a, b, c;
        return b = this,
        a = $("#phone"),
        clearInterval(this._scrollTimeout),
        c = new Date,
        this._scrollTimeout = setInterval(function() {
            var d, e;
            e = a.scrollTop(),
            a.scrollTop(e + 20),
            d = new Date;
            if (d.getTime() - c.getTime() > 2e3) return clearInterval(b._scrollTimeout)
        },
        30)
    },
    c.prototype.scrollUp = function() {
        var a, b, c;
        return b = this,
        a = $("#phone"),
        clearInterval(this._scrollTimeout),
        c = new Date,
        this._scrollTimeout = setInterval(function() {
            var d, e;
            e = a.scrollTop(),
            a.scrollTop(e - 20),
            d = new Date;
            if (d.getTime() - c.getTime() > 2e3) return clearInterval(b._scrollTimeout)
        },
        30)
    },
    c.prototype.tryScrollDropFrame = function(a) {
        var b, c, d, e, f;
        return d = DocUtils.eventToFramePoint(a),
        c = $("#phone-skin").offset(),
        b = $("#phone-skin").height(),
        e = a.pageY - c.top,
        f = b - 60,
        e > f ? this.scrollDown() : e < 60 ? this.scrollUp() : this.stopScrolling()
    },
    c.prototype.onPhoneDropMouseMove = function(a) {
        var b, c, d, e;
        if (!this._document || !this._document.root || !this._currentPage || !this._currentPage._deviceRenderedEl) return;
        this._currentPage && !this._currentPage._deviceRenderedEl.is(":visible") && this._device.showPage(this._currentPage.getId()),
        e = DocUtils.eventToFramePoint(a);
        if (!this._isDragging) return b = DocUtils.getComponentAt(this._document.root, e),
        this._activeContainer = null,
        this._hoverControl(b.control, e),
        this.stopScrolling();
        this.tryScrollDropFrame(a),
        b = DocUtils.getComponentAt(this._document.root, e, this._activeControl),
        d = b.control,
        c = b.container;
        if (this._activeControl && c) return this._activeContainer = c,
        this._activeContainer === this._activeControl,
        this._hoverContainer(c, e)
    },
    c.prototype.onPhoneDropMouseClick = function(a) {
        var b, c, d, e;
        if (!this._document || !this._document.root) return;
        return e = DocUtils.eventToFramePoint(a),
        b = DocUtils.getComponentAt(this._document.root, e),
        d = b.control,
        c = b.container,
        this._device._controlClicked(d.getId())
    },
    c.prototype.updateControlToolbar = function(a, b) {
        var c, d, e, f, g, h, i;
        return
    },
    c.prototype.clearControlToolbar = function() {
        return $("#phone-drop .buttons").remove()
    },
    c.prototype.onDropTargetMouseMove = function(a) {
        var b, c, d, e, f, g, h, i, j, k;
        f = $("#phone .content"),
        h = f.offset(),
        g = a.pageX - h.left,
        j = a.pageY - h.top,
        e = $("#phone-drop").offset(),
        d = $("#phone-drop").height(),
        k = d - 60,
        c = window.FrameWindow,
        i = c.pageYOffset,
        j > k ? this._device.scrollDown() : j < 60 ? this._device.scrollUp() : this._device.stopScrolling(),
        this._currentPage.getDeviceRenderedEl().is(":visible") || this._device.showPage(this._currentPage.getId()),
        this._currentPage.getDeviceRenderedEl().is(":visible") || (console.error("Current page was hidden. Showing it"), this._device.showPage(this._currentPage.getId())),
        b = this._getContainerUnderMouse({
            x: g,
            y: Math.max(j + i - 40, 0)
        });
        if (b) return b !== this._selectedContainer && this._selectedContainer && this._selectedContainer.onDragOut(),
        b.onDragOver({
            x: g,
            y: Math.max(j + i - 40, 0)
        },
        this._dragDropType),
        this._selectedContainer = b,
        this._device.repositionCurrentSelector()
    },
    c.prototype.onDropFinished = function() {
        var a;
        a = window.FrameWindow,
        a.$(".codiqa-control.selected").removeClass("selected");
        if (this._selectedContainer) return this._selectedContainer.onDropFinished()
    },
    c.prototype.showDragIndicator = function(a, b) {
        var c, d, e;
        return c = a.getDeviceRenderedEl(),
        e = $(c).offset(),
        d = $("#phone-drop .indicator"),
        d.length === 0 && (d = $("<div></div>"), d.appendTo("#phone-drop")),
        d.attr("class", "indicator"),
        d.addClass("depth-" + b),
        d.width($(c).outerWidth()),
        d.height($(c).outerHeight()),
        d.css("left", e.left),
        d.css("top", e.top)
    },
    c.prototype._getContainerUnderMouse = function(a) {
        var b, c, d;
        return c = (new Date).getTime(),
        d = this._controlContainsIterative(this._currentPage, a),
        b = (new Date).getTime(),
        d
    },
    c.prototype._controlContainsIterative = function(a, b) {
        var c, d, e, f, g;
        d = [],
        e = void 0,
        f = void 0,
        d.push(a);
        while (d.length) {
            e = d.shift(),
            g = 0;
            while (g < e.children.length) c = e.children[g],
            c.isContainer() && c.containsPoint(b) && (f = c, d.splice(0, 0, c)),
            g++
        }
        return f
    },
    c.prototype._controlContains = function(a, b, c) {
        var d, e, f, g;
        if (!a.isContainer()) return null;
        e = a.children,
        g = 0;
        while (g < e.length) {
            d = e[g];
            if (d.isContainer() ? d.containsPoint(b) : void 0) return this._controlContains(d, b, c + 1);
            g++
        }
        if (a.containsPoint(b) && a.getControlType() === "page") return f = a.findChildrenByType("pagecontent"),
        f.length > 0 ? [f[0], c] : null;
        if (a.containsPoint(b)) return [a, c]
    },
    c.prototype._printDocument = function() {
        return console.log("DOCUMENT"),
        this._printNode(this._document.root, 0)
    },
    c.prototype._printNode = function(a, b) {
        var c, d;
        a.controlId === "htmlnode" ? console.log(this._tab(b) + a.getName() + "(" + a.nodeName.getValue() + ")", ":", a.getId()) : console.log(this._tab(b) + a.getName(), ":", a.getId()),
        c = 0,
        d = [];
        while (c < a.children.length) this._printNode(a.children[c], b + 1),
        d.push(c++);
        return d
    },
    c.prototype._tab = function(a) {
        return (new Array(a + 1)).join(" ")
    },
    c.prototype.mustSignup = function() {
        return $("#modal-signup").modal("show")
    },
    c.prototype.mustUpgrade = function() {
        return $("#modal-upgrade-now").modal("show"),
        $('#modal-upgrade-now input[type="text"]').focus()
    },
    c
} (Backbone.View);
var HTMLProjectDocument;
HTMLProjectDocument = function() {
    function a() {}
    return a.createFromHtml = function(b) {
        var c;
        return c = new a,
        c.setHtml(b),
        c
    },
    a.prototype.setHtml = function(a) {
        var b;
        this.html = "\n" + a + "\n";
        try {
            b = document.implementation.createHTMLDocument(""),
            b.documentElement.innerHTML = a,
            b.documentElement.insertBefore(document.createTextNode("\n"), b.head),
            b.documentElement.insertBefore(document.createTextNode("\n"), b.body.nextSibling)
        } catch(c) {
            b = new ActiveXObject("htmlfile"),
            b.write(a),
            b.close()
        }
        return this.domDoc = b,
        b
    },
    a.prototype.getFullHtml = function() {
        var a;
        return a = "<!DOCTYPE html>\n" + this.domDoc.documentElement.outerHTML,
        a
    },
    a.prototype.getHeadScripts = function() {
        return $(this.domDoc).find("head script")
    },
    a.prototype.getBodyScripts = function() {
        return $(this.domDoc).find("body script")
    },
    a.prototype.getCSSFiles = function() {
        return $(this.domDoc).find('link[rel="stylesheet"]')
    },
    a.prototype.setBodyHtml = function(a) {
        var b;
        return this.domDoc.body.innerHTML = a,
        b = this.domDoc.body.firstChild,
        this.domDoc.body.insertBefore(this.domDoc.createTextNode("\n"), this.domDoc.body.firstChild),
        this.domDoc.body.appendChild(this.domDoc.createTextNode("\n"))
    },
    a.prototype.getBodyHtml = function() {
        return this.domDoc.body.innerHTML
    },
    a.prototype.getBodyNode = function() {
        return this.domDoc.body
    },
    a
} (),
window.Codiqa = {
    onReady: function() {},
    onImageUrlRequested: function() {},
    getHtml: function() {
        return window.App.getDocumentAsHtml()
    },
    setIndentCharacter: function(a) {
        return window.App.setHtmlIndentChar(a)
    },
    getCodiqaFile: function() {
        var a, b;
        return a = new ControlOutputVisitor,
        b = {
            v: "b1",
            saved: (new Date).getTime(),
            doc: a.getAppDocument(window.App._document.root)
        },
        JSON.stringify(b)
    },
    open: function(a) {
        return window.App.trigger("appLoading"),
        window.App.openFromCodiqa(a)
    },
    openFromHtml: function(a) {
        var b, c;
        return c = HTMLProjectDocument.createFromHtml(a),
        b = c.getBodyHtml(),
        window.App.updateFromHtml(b, {
            headScripts: c.getHeadScripts(),
            bodyScripts: c.getBodyScripts(),
            stylesheets: c.getCSSFiles()
        }),
        this._htmlProject = c,
        c
    },
    onGetTestModeHtml: function(a) {
        return this._htmlProject ? (this._htmlProject.setBodyHtml(a), this._htmlProject.getFullHtml()) : ""
    },
    getFullHtml: function() {
        var a;
        return this._htmlProject ? (a = window.App.getDocumentAsHtml(), this._htmlProject.setBodyHtml(a), this._htmlProject.getFullHtml()) : ""
    },
    getEventHandlerNames: function() {
        return this._handlers = this._handlers || [{
            type: "click",
            name: "handler1",
            controlId: "newId"
        }]
    },
    getHandlerForId: function(a) {
        return {
            type: "click",
            name: "handler1",
            controlId: "newId"
        }
    },
    onHandlerAttached: function(a, b, c) {},
    onHandlerRequested: function(a) {
        var b;
        return b = {
            type: "click",
            name: "testHandler",
            controlId: "newId"
        },
        this._handlers.push(b),
        b
    },
    newApp: function() {
        return window.App.newDefaultApp()
    },
    updatePageId: function(a, b, c) {
        return window.App.updatePageId(a, b, c)
    },
    undo: function() {
        return window.App.undo()
    },
    redo: function() {
        return window.App.redo()
    },
    hasUndo: function() {
        return window.App.hasUndo()
    },
    hasRedo: function() {
        return window.App.hasRedo()
    },
    hasUnsavedChanges: function() {
        return ! this._lastKnownSaveTime || this._lastKnownModTime.getTime() > this._lastKnownSaveTime.getTime()
    },
    markSaved: function() {
        return this._lastKnownSaveTime = new Date,
        this._lastKnownModTime = this._lastKnownSaveTime,
        window.App.updateSavePointer(),
        this.onSaved && this.onSaved()
    },
    markChangesMade: function() {
        return this._lastKnownModTime = new Date,
        this.onChangesMade && this.onChangesMade()
    },
    markBackAtSaved: function() {
        return console.log("Back at save point"),
        this._lastKnownSaveTime = new Date,
        this._lastKnownModTime = this._lastKnownSaveTime,
        this.onChangesMade()
    },
    onChangesMade: function() {
        return console.log("CHANGES MADE. Dirty?", this.hasUnsavedChanges())
    },
    onSaved: function() {},
    onControlDoubleClicked: function(a) {
        return console.log("Double clicked", a)
    },
    onControlRightClicked: function(a) {
        return console.log("Right clicked", a)
    },
    setDeviceSize: function(a) {
        return window.App.userSetDeviceSize(a)
    },
    rotateDevice: function() {
        return window.App.toggleDeviceOrientation()
    },
    setInterfaceMode: function(a) {
        return window.App.setInterfaceMode(a)
    },
    setPreviewMode: function() {
        return this.setInterfaceMode(InterfaceModes.PREVIEW)
    },
    setDesignMode: function() {
        return this.setInterfaceMode(InterfaceModes.DESIGN)
    },
    addScript: function(a) {
        return window.App._document.root.scripts.addItemDistinct(a),
        window.App.forceDocumentChanged()
    },
    addStylesheet: function(a) {
        return window.App._document.root.stylesheets.addItemDistinct(a),
        window.App.forceDocumentChanged()
    },
    setJQueryMobileThemeUrl: function(a) {
        return window.App._document.root.activeJQMTheme.setValue(a),
        window.App._device.setJQueryMobileThemeUrl(a),
        window.App.forceDocumentChanged()
    }
};
/**
 * 设备事件
 */
var Device,
    DraggableControl;
DraggableControl = Backbone.View.extend({
    initialize: function(a, b, c) {
        debugger;
        this._builder = a;
        this._device = b;
        return this._control = c;
    },
    _repositionDragControl: function(a, b, c, d) {
        debugger;
        var e, f, g, h;
        e = b._deviceRenderedEl;
        h = window.FrameWindow.$(e).position();
        f = a.pageX + d[0];
        g = a.pageY + d[1];
        return e.css({
            position: "absolute",
            left: f + "px",
            top: g + "px",
            width: window.FrameWindow.$(e).width(),
            height: window.FrameWindow.$(e).height(),
            zIndex: 1e3
        })
    },
    _redropCurrent: function(a) {
        debugger;
        var b;
        b = this._builder.getSelectedControl();
        if (!b) return;
        return this._redroppingControl = b,
        this._redroppingControlParent = b.getParent(),
        this._dragDropType = b.getControlType(),
        this._isRedropping = !0,
        this._detachAndDragControl(a, b)
    },
    _detachAndDragControl: function(a, b) {
        debugger;
        var c, d;
        return c = b._deviceRenderedEl,
        window.FrameWindow.$(c).addClass("codiqa-detached"),
        d = window.FrameWindow.$(c).position(),
        c.css({
            position: "absolute",
            left: d.left + "px",
            top: d.top + "px",
            width: window.FrameWindow.$(c).width(),
            height: window.FrameWindow.$(c).height(),
            zIndex: 1e3
        }),
        c.detach(),
        window.FrameWindow.$("body").append(c),
        this._detachedControlEl = c
    },
    _initWidget: function() {
        debugger;
        var a, b;
        return b = this,
        a = {
            _init: function() {
                return this._mouseInit(),
                this._savedControl = null,
                this._lastPos = null
            },
            _mouseStart: function(a) {
                var c, d, e;
                return console.log("START REDROPPING"),
                this._mouseStarted = !1,
                b._device.findAndSelectUnderMouse(a.pageX, a.pageY),
                c = b._builder.getSelectedControl(),
                d = window.FrameWindow.$(c._deviceRenderedEl),
                e = d.position(),
                this._clickOffset = [e.left - a.pageX, e.top - a.pageY],
                window.FrameWindow.$(this.el).hide(),
                b._redropCurrent(a)
            },
            _mouseDrag: function(a) {
                var c;
                return console.log("Dragging"),
                c = b._builder.getSelectedControl(),
                this._lastPos || (this._lastPos = [a.pageX, a.pageY]),
                b._repositionDragControl(a, c, this._lastPos, this._clickOffset),
                this._lastPos = [a.pageX, a.pageY],
                b._device.repositionCurrentSelector(),
                b._device._highlightOpenSpot(a, this.el)
            },
            _mouseStop: function(a) {
                return console.log("DONE REDROPPING"),
                window.FrameWindow.$(this.el).show(),
                b._detachedControlEl.remove(),
                b._device._controlDropped(a)
            },
            _mouseDown: function(a) {
                return window.FrameWindow.$.ui.mouse.prototype._mouseDown.call(this, a)
            }
        },
        parent.window.FrameWindow.$.widget("codiqa.controlHighlight", window.FrameWindow.$.ui.mouse, a),
        parent.window.FrameWindow.$(this._control._deviceRenderedEl).controlHighlight()
    },
    events: {
        "click .c-icon-plus": "onDuplicateClick",
        "click .c-icon-close": "onCloseClick"
    },
    onDuplicateClick: function(a) {
        var b;
        return b = this._builder.getSelectedControl(),
        b && this._builder.duplicateControl(b),
        !1
    },
    onCloseClick: function(a) {
        var b;
        return b = this._builder.getSelectedControl(),
        b && this._builder.removeControl(b),
        !1
    },
    render: function() {
        return window.FrameWindow.$(this.el).html('<div class="content"><div class="buttons"><a href="#" title="Remove" class="c-icon c-icon-close"></a></div></div>'),
        window.FrameWindow.$(this.el).addClass("highlight-selector"),
        this._initWidget()
    }
}),
Device = Backbone.View.extend({
    _builder: null,
    _currentPage: "page1",
    _highlighter: null,
    _highlightedEl: null,
    _highlightSelector: null,
    _dirtyPages: {},
    initialize: function(a) {
        return this._builder = window.App,
        this._window = a,
        this._scrollEls = window.FrameWindow.$("body,html,document"),
        console.log("Device target ready for communication."),
        this.initEvents()
    },
    initEvents: function() {
        var a;
        return a = this,
        this.designModeHint(),
        this.removeEvents(),
        DEBUG || (window.FrameWindow.$("body").live("contextmenu",
        function() {
            return ! 1
        }), window.FrameWindow.$("body").live("click",
        function() {
            return a.stopScrolling()
        })),
        window.FrameWindow.$("body").addClass("edit"),
        window.FrameDocument.onselectstart = function() {
            return ! 1
        },
        $(".codiqa-control", window.FrameDocument).live("click",
        function() {
            var b;
            return b = window.FrameWindow.$(this).data("cid"),
            a._controlClicked(b),
            !1
        }),
        $(".codiqa-control", window.FrameDocument).live("mousemove",
        function(b) {
            return a.moveHover(b)
        }),
        $(".codiqa-control", window.FrameDocument).live("mouseenter",
        function() {
            return a._isValidHoverTarget(window.FrameWindow.$(this)) && a.startHover(window.FrameWindow.$(this)),
            !1
        }),
        $(".highlight", window.FrameDocument).live("mousemove",
        function(b) {
            return a.moveHover(b),
            !1
        }),
        $(".highlight", window.FrameDocument).live("click",
        function(b) {
            var c, d, e, f;
            if (!a._currentPageObj) return;
            e = window.FrameWindow.$(".codiqa-control", a._currentPageObj),
            f = e.length - 1;
            while (f >= 0) {
                d = e.eq(f);
                if (a._controlElementContains(d, b.pageX, b.pageY) && a._isValidHoverTarget(d)) return c = window.FrameWindow.$(d).data("cid"),
                a._controlClicked(c),
                !0;
                f--
            }
        }),
        $(".highlight", window.FrameDocument).live("mouseleave",
        function() {
            return a._highlighterHidden ? !0 : (window.FrameWindow.$(this).css("cursor", "normal"), a.endHover(window.FrameWindow.$(this)), a._highlighterHidden = !1, !1)
        }),
        $(".highlight, .highlight-selector", window.FrameDocument).live("mousedown",
        function(b) {
            var c, d, e;
            if (!a._currentPageObj) return;
            d = window.FrameWindow.$(".codiqa-control", a._currentPageObj),
            e = d.length - 1;
            while (e >= 0) {
                c = d.eq(e);
                if (a._controlElementContains(c, b.pageX, b.pageY) && a._isValidHoverTarget(c)) return b.which === 3 ? (a.trigger("controlRightClicked", window.FrameWindow.$(c).data("cid")), b.preventDefault(), !1) : (b.target = $(c).get(0), b.currentTarget = $(c).get(0), b.srcElement = $(c).get(0), c.trigger(b), !0);
                e--
            }
        }),
        $(".highlight-selector", window.FrameDocument).live("dblclick",
        function(b) {
            var c, d, e, f, g;
            d = window.FrameWindow.$(".codiqa-control", a._currentPageObj),
            g = d.toArray().slice(0).reverse();
            for (e = 0, f = g.length; e < f; e++) {
                c = g[e],
                c = $(c);
                if (a._controlElementContains(c, b.pageX, b.pageY) && a._isValidHoverTarget(c)) return a.trigger("controlDoubleClicked", window.FrameWindow.$(c).data("cid")),
                !1
            }
            return ! 1
        }),
        $(".highlight-selector", window.FrameDocument).live("click",
        function(b) {
            var c, d, e;
            if (!a._currentPageObj) return ! 1;
            d = window.FrameWindow.$(".codiqa-control", a._currentPageObj),
            e = d.length - 1;
            while (e >= 0) {
                c = d.eq(e);
                if (a._controlElementContains(c, b.pageX, b.pageY) && a._isValidHoverTarget(c)) return a._controlClicked(window.FrameWindow.$(c).data("cid")),
                !1;
                e--
            }
            return ! 1
        }),
        $(".highlight-selector", window.FrameDocument).live("mousemove",
        function(b) {
            return a.repositionCurrentSelector(),
            a.moveHover(b)
        }),
        $(window.FrameWindow).scroll(function() {
            return window.FrameWindow.$(window.FrameDocument).scrollTop() === 0 && a.stopScrolling(),
            window.FrameWindow.$(window.FrameDocument).scrollTop() + window.FrameWindow.$(window.FrameWindow).height() >= window.FrameWindow.$(window.FrameDocument).height() && a.stopScrolling(),
            a.repositionCurrentSelector()
        })
    },
    _controlClicked: function(a) {
        if (!a) return;
        return this._highlighterHidden = !1,
        console.log("Clicked on element", a),
        this.trigger("controlSelected", a)
    },
    removeEvents: function() {
        var a;
        return window.FrameWindow.$("body").die("contextmenu"),
        $(".codiqa-control", window.FrameDocument).die("click"),
        $(".codiqa-control", window.FrameDocument).die("mousemove"),
        a = this.getCurrentPage().children(":first").get(0),
        $(".codiqa-control", window.FrameDocument).die("mouseenter"),
        $(".highlight", window.FrameDocument).die("mousemove"),
        $(".highlight", window.FrameDocument).die("mousedown"),
        $(".highlight", window.FrameDocument).die("click"),
        $(".highlight", window.FrameDocument).die("mouseleave"),
        $(".highlight-selector", window.FrameDocument).die("mousedown"),
        $(".highlight-selector", window.FrameDocument).die("click"),
        $(".highlight-selector", window.FrameDocument).die("mousemove")
    },
    removeSorting: function() {
        var a;
        return a = $(".ui-sortable", window.FrameDocument),
        a.each(function() {
            return window.FrameWindow.$(this).sortable("disable")
        })
    },
    enableSorting: function() {
        var a;
        return a = $('[data-role="content"]'),
        a.each(function() {
            return $(this).sortable("enable")
        })
    },
    removeTheme: function() {
        return window.FrameWindow.$("#current-theme").remove()
    },
    setJQueryMobileThemeUrl: function(a) {
        return this._jqmThemeUrl || (this._jqmThemeUrl = $("#jqm-css", window.FrameDocument).attr("href")),
        $("#jqm-css", window.FrameDocument).attr("href", a)
    },
    setJQueryMobileThemeCSS: function(a) {
        return this._jqmStructureCss || (this._jqmStructureCss = $("#jqm-structure-css", window.FrameDocument).detach(), this._jqmThemeCss = $("#jqm-theme-css", window.FrameDocument).detach()),
        window.FrameWindow.$("head").append('<style id="current-theme">' + a + "</style>")
    },
    resetJQueryMobileThemeUrl: function() {
        if (this._jqmStructureCss) return $("#jqm-css", window.FrameDocument).remove(),
        this._jqmThemeCss.appendTo($("head", window.FrameDocument)),
        this._jqmStructureCss.appendTo($("head", window.FrameDocument))
    },
    applyTheme: function(a) {
        var b, c;
        $("#current-theme", window.FrameDocument).remove();
        if (a.css.indexOf("ui-page") >= 0) return this.setJQueryMobileThemeCSS(a.css);
        this.resetJQueryMobileThemeUrl(),
        window.FrameWindow.$("#current-theme").remove(),
        b = $('<style id="current-theme">' + a.css + "</style>"),
        c = window.FrameWindow.$("#jqm-structure-css");
        if (c.length === 0 && this._jqmStructureCss) return this._jqmStructureCss.appendTo($("head", window.FrameDocument)),
        b.insertBefore(this._jqmStructureCss);
        if (c.length) return b.insertBefore(c)
    },
    applyCss: function(a) {
        return window.FrameWindow.$("#current-css").remove(),
        window.FrameWindow.$("head").append('<style id="current-css">' + a + "</style>")
    },
    applyJs: function(a) {
        var b, c;
        return window.FrameWindow.$("#current-js").remove(),
        c = window.FrameDocument.createElement("script"),
        c.text = "try {\n//@ sourceURL=app.js\n" + a + "\n} catch (error) {\nparent.App.trigger('js.error', error);\n}",
        c.id = "current-js",
        b = window.FrameWindow.$("head").get(0),
        b.appendChild(c)
    },
    addStylesheet: function(a) {
        var b;
        return b = window.FrameWindow.$("head"),
        $(b).append('<link rel="stylesheet" type="text/css" class="codiqa-external" href="' + a + '" />')
    },
    removeAllStylesheets: function() {
        return window.FrameWindow.$(".codiqa-external").remove()
    },
    removeStylesheet: function(a) {
        var b, c, d, e, f, g;
        c = "css",
        f = c === "js" ? "script": c === "css" ? "link": "none",
        e = c === "js" ? "src": c === "css" ? "href": "none",
        b = window.FrameDocument.getElementsByTagName(f),
        d = b.length,
        g = [];
        while (d >= 0) b[d] && b[d].getAttribute(e) != null && b[d].getAttribute(e).indexOf(a) !== -1 && b[d].parentNode.removeChild(b[d]),
        g.push(d--);
        return g
    },
    addScript: function(a, b) {
        var c, d;
        return b ? d = window.FrameWindow.$("body").get(0) : d = window.FrameWindow.$("head").get(0),
        c = window.FrameDocument.createElement("script"),
        c.type = "text/javascript",
        c.src = a,
        d.appendChild(c)
    },
    onAllControlsDeselected: function() {
        return this._highlightSelector && (window.FrameWindow.$(this._highlightSelector).remove(), this._highlightSelector = null),
        window.FrameWindow.$(".highlight-selector").remove(),
        this.endHover()
    },
    onControlSelected: function(a) {
        var b;
        return b = window.FrameWindow.$(a._deviceRenderedEl),
        this.selectAndHighlightElement(b)
    },
    onPageChanged: function() {
        var a, b;
        return a = window.FrameWindow.$.mobile.activePage,
        b = window.FrameWindow.$(a).attr("data-cid"),
        console.log("Switched to page", b),
        this._builder && this._builder.isPreviewMode() && this.markPageDirty(b),
        this.trigger("pageChanged", b)
    },
    markPageDirty: function(a) {
        if (!a) return;
        return this._dirtyPages[a] = !0
    },
    clearDirtyPages: function() {
        return this._dirtyPages = {}
    },
    _controlDropped: function(a) {
        var b, c, d, e;
        if (!this._currentDropSpot) return;
        d = this._currentDropSpot[0],
        c = this._builder.getControl(window.FrameWindow.$(d).data("cid"));
        if (!c) {
            console.error("Unable to drop control on invalid container", window.FrameWindow.$(d).data("cid"));
            return
        }
        return e = this._currentDropSpot[1],
        b = c.getChild(e),
        c.relocateControl(this._builder.getSelectedControl(), e),
        this.redrawAll(),
        this.startHover(this._builder.getSelectedControl()._deviceRenderedEl),
        this.repositionCurrentSelector()
    },
    _containerElContains: function(a, b) {
        var c, d, e;
        return a = window.FrameWindow.$(a),
        d = a.offset(),
        e = a.outerWidth(),
        c = a.outerHeight(),
        b[0] > d.left + e || b[0] < d.left || b[1] > d.top + c || b[1] < d.top ? !1 : !0
    },
    _highlightOpenSpot: function(a, b) {
        return this._highlightShim || (this._highlightShim = document.createElement("div"), this._highlightShim.className = "highlight-shim"),
        this._highlightOpenSpotRecursive(window.FrameWindow.$.mobile.activePage, a)
    },
    _highlightOpenSpotRecursive: function(a, b) {
        var c, d, e, f, g, h, i, j, k, l;
        e = window.FrameWindow.$("> .codiqa-container", a),
        h = 0;
        while (h < e.length) {
            c = e.get(h);
            if (this._containerElContains(c, [b.pageX, b.pageY])) return this._highlightOpenSpotRecursive(c, b);
            h++
        }
        if (this._containerElContains(a, [b.pageX, b.pageY])) {
            k = window.FrameWindow.$(a).offset();
            if (b.pageY < 30 && window.FrameWindow.$(a).data("role") === "content") {
                d = this._builder.getControl(window.FrameWindow.$(a).data("cid")),
                window.FrameWindow.$(this._highlightShim).detach(),
                window.FrameWindow.$(this._highlightShim).insertBefore(a),
                this._currentDropSpot = [d.getParent()._deviceRenderedEl, d.getParent().getChildPosition(d)];
                return
            }
            g = window.FrameWindow.$("> .codiqa-control", a),
            i = 0;
            while (i < g.length) {
                f = g.get(i),
                l = window.FrameWindow.$(f).offset(),
                j = (l.top + window.FrameWindow.$(f).height()) / 2;
                if (b.pageY < j) {
                    window.FrameWindow.$(this._highlightShim).detach(),
                    window.FrameWindow.$(this._highlightShim).insertBefore(f),
                    this._currentDropSpot = [a, i];
                    return
                }
                i++
            }
            b.pageY < k.top + window.FrameWindow.$(a).height() && (window.FrameWindow.$(this._highlightShim).detach(), window.FrameWindow.$(this._highlightShim).appendTo(a), this._currentDropSpot = [a, g.length])
        }
    },
    selectAndHighlightElement: function(a) {
        var b, c;
        this._repositionSelector(a),
        b = a.attr("data-role");
        if (b === "button" || b === "panelbutton") return c = a.attr("data-theme"),
        a.removeClass("ui-btn-down-" + c).addClass("ui-btn-up-" + c)
    },
    repositionCurrentSelector: function() {
        var a;
        if (!this._builder) return;
        if (this._builder.isPreviewMode()) return;
        if (this._builder.getSelectedControl()) {
            a = this._builder.getSelectedControl()._deviceRenderedEl;
            if (!a) {
                this._builder.setSelectedControl(null);
                return
            }
            this._repositionSelector(a)
        }
        if (this._highlightedEl) return this._repositionHover(this._highlightedEl)
    },
    _makeHighlightSelector: function(a) {
        var b, c;
        return c = this,
        a ? (b = $('<div class="highlight-selector"><div class="content"><div class="buttons"><a href="#" title="Duplicate" class="c-icon c-icon-plus"></a> <a href="#" title="Remove" class="c-icon c-icon-close"></a></div></div></div>'), $(".c-icon-plus", b).click(function() {
            var a, b;
            return b = c._builder.getSelectedControl(),
            b && (a = c._builder.duplicateControl(b), c._builder.onControlSelected(a)),
            !1
        }), $(".c-icon-close", b).click(function() {
            var a;
            return a = c._builder.getSelectedControl(),
            a && c._builder.removeControl(a),
            !1
        }), b) : (b = $('<div class="highlight-selector noborder"><div class="content"></div></div>'), b)
    },
    _repositionSelector: function(a) {
        var b, c, d, e, f;
        if (!this._builder) return;
        b = this._builder.getControl(window.FrameWindow.$(a).data("cid"));
        if (!b) {
            this._builder.setSelectedControl(null);
            return
        }
        if (b.controlId === "page") return;
        e = a.offset(),
        this._highlightSelector || (this._highlightSelector = this._makeHighlightSelector(b.getControlType() !== "page"), window.FrameWindow.$(this._highlightSelector).appendTo("body"), a.css("position") === "fixed" && (this._highlightSelector.find(".buttons").css("bottom", "4px"), this._highlightSelector.find(".c-icon-plus").remove(), this._highlightSelector.css({
            border: "none",
            width: "30px"
        }))),
        c = b.getCalculatedMargin(),
        f = window.FrameWindow.$(window).height(),
        c[3] < 0 && c[1] < 0 ? (d = c[3] + c[1], window.FrameWindow.$(this._highlightSelector).css({
            left: e.left + c[1],
            top: e.top,
            width: a.outerWidth() - d,
            height: a.outerHeight()
        })) : window.FrameWindow.$(this._highlightSelector).css({
            left: e.left,
            top: e.top,
            width: a.outerWidth(),
            height: a.outerHeight()
        });
        if (b.controlId !== "page") return window.App.updateControlToolbar(b, this._highlightSelector)
    },
    startHover: function(a) {
        if (this._isSorting === !0) return;
        return window.FrameWindow.$(".highlight").remove(),
        this._highlighter = null,
        this._repositionHover(a),
        this._bindHighlightEvents(),
        this._highlightedEl = a
    },
    _bindHighlightEvents: function() {
        var a;
        return a = this
    },
    _repositionHover: function(a, b) {
        var c, d, e, f;
        b || (b = ""),
        c = this._builder.getControl(window.FrameWindow.$(a).data("cid")),
        f = a.offset(),
        this._highlighter ? this._highlighter.addClass(b) : this._highlighter = window.FrameWindow.$('<div class="highlight ' + b + '"></div>').appendTo("body");
        if (!c) {
            this._highlighter = null,
            window.FrameWindow.$(".highlight").remove();
            return
        }
        return c.getControlType() === "page" ? this._highlighter.addClass("noborder") : this._highlighter.removeClass("noborder"),
        d = c.getCalculatedMargin(),
        d[3] < 0 && d[1] < 0 ? (e = d[3] + d[1], window.FrameWindow.$(this._highlighter).css({
            left: f.left + d[1],
            top: f.top,
            width: a.outerWidth() - e,
            height: a.outerHeight()
        })) : this._highlighter.css({
            left: f.left,
            top: f.top,
            width: a.outerWidth(),
            height: a.outerHeight()
        })
    },
    moveHover: function(a) {
        var b, c, d, e, f;
        if (!this._currentPageObj) return ! 1;
        if (this._isSorting === !0 && this._highlightedEl) return this._repositionHover(this._highlightedEl),
        f = this._builder.getSelectedControl(),
        f && (b = f._deviceRenderedEl, this._highlightedEl.get(0) === b.get(0) && this._repositionSelector(this._highlightedEl)),
        !1;
        d = window.FrameWindow.$("[data-cid]", this._currentPageObj),
        e = d.length - 1;
        while (e >= 0) {
            c = d.eq(e);
            if (this._controlElementContains(c, a.pageX, a.pageY) && this._isValidHoverTarget(c)) {
                this.endHover(),
                this.startHover(c);
                return
            }
            e--
        }
    },
    _isValidHoverTarget: function(a) {
        var b;
        return b = this._builder.getControl(window.FrameWindow.$(a).data("cid")),
        b && !this._builder.isSelectableControl(b) ? !1 : !0
    },
    hoverControl: function(a) {
        return this._repositionHover(a._deviceRenderedEl)
    },
    dragHoverContainer: function(a, b, c) {
        var d;
        return a.onHover(b, c),
        d = window.FrameWindow.$.mobile.activePage,
        window.App.onDevicePageResize(d.width(), d.height(), d)
    },
    stopDrag: function() {
        return $(".ds-tag, .shim").remove()
    },
    stopScrolling: function() {
        return clearInterval(this._scrollTimeout)
    },
    scrollDown: function() {
        var a;
        return a = $(window.FrameDocument),
        clearInterval(this._scrollTimeout),
        this._scrollTimeout = setInterval(function() {
            var b;
            return b = a.scrollTop(),
            a.scrollTop(b + 20)
        },
        30)
    },
    scrollUp: function() {
        var a;
        return a = $(window.FrameDocument),
        clearInterval(this._scrollTimeout),
        this._scrollTimeout = setInterval(function() {
            var b;
            return b = a.scrollTop(),
            a.scrollTop(b - 20)
        },
        30)
    },
    _controlElementContains: function(a, b, c) {
        var d, e, f, g, h;
        d = this._builder.getControl(window.FrameWindow.$(a).data("cid"));
        if (!d) return ! 1;
        g = a.offset(),
        h = a.outerWidth(),
        e = a.outerHeight(),
        f = d.getCalculatedMargin();
        if (f[3] < 0 && f[1] < 0) {
            if (b > g.left + h + -f[1] || b < g.left + f[3] || c > g.top + e || c < g.top) return ! 1
        } else if (b > g.left + h || b < g.left || c > g.top + e || c < g.top) return ! 1;
        return ! 0
    },
    endHover: function() {
        $(".shim, .ds-tag, .highlight", window.FrameDocument).remove();
        if (!this._highlighter) return;
        return this._highlighter.remove(),
        this._highlighter = null,
        this._highlighterHidden = !1
    },
    startSorting: function() {
        return this._isSorting = !0
    },
    endSorting: function() {
        return this._isSorting = !1,
        this.repositionCurrentSelector(),
        this.endHover()
    },
    findAndSelectUnderMouse: function(a, b) {
        return this._findAndSelectUnderMouseRecursive(window.FrameWindow.$.mobile.activePage, a, b)
    },
    _findAndSelectUnderMouseRecursive: function(a, b, c) {
        var d, e, f, g, h, i;
        e = window.FrameWindow.$("> .codiqa-container", a),
        h = 0;
        while (h < e.length) {
            d = e.get(h);
            if (this._containerElContains(d, [b, c])) return this._findAndSelectUnderMouseRecursive(d, b, c);
            h++
        }
        if (this._containerElContains(a, [b, c])) {
            g = window.FrameWindow.$("> .codiqa-control", a),
            i = 0;
            while (i < g.length) {
                d = g.get(i);
                if (this._containerElContains(d, [b, c])) {
                    f = this._builder.getControl(window.FrameWindow.$(d).data("cid"));
                    if (f) return this._builder.onControlSelected(f),
                    d
                }
                i++
            }
        }
    },
    setDeviceMode: function(a) {},
    getDropCoordsForMouse: function(a) {
        var b;
        return b = this.getCurrentPage()
    },
    newApp: function(a) {
        var b, c, d, e, f;
        return d = void 0,
        c = void 0,
        f = {},
        this.removeAllStylesheets(),
        e = window.FrameWindow.$("body > div[data-cid]"),
        this._currentPage = null,
        this._currentPageObj = null,
        b = window.FrameWindow.$("#_placeholder-page"),
        e = window.FrameWindow.$("body > div[data-cid]"),
        e.hide(),
        b.show(),
        window.FrameWindow.$.mobile.activePage = b,
        e.remove(),
        window.FrameWindow.$.mobile.changePage(b),
        setTimeout(function() {
            return a()
        },
        100)
    },
    _setCurrentPage: function(a) {
        var b, c;
        c = this,
        b = window.FrameWindow.$('body > div[data-cid="' + a + '"]');
        if (b.length < 1) {
            console.error("Unable to set current page with id", a, "it doesn't exist");
            return
        }
        return this._currentPage = a,
        this._currentPageObj = b
    },
    getCurrentPage: function() {
        return ! this._currentPageObj || this._currentPageObj.length < 1 ? (this._currentPageObj = window.FrameWindow.$('body > div[data-cid="' + this._currentPage + '"]'), this._currentPageObj) : this._currentPageObj
    },
    setCurrentPage: function(a, b) {
        var c, d, e;
        e = this,
        d = window.FrameWindow.$('body > div[data-cid="' + a + '"]');
        if (d.length < 1) {
            console.error("Unable to set current page with id", a, "it doesn't exist");
            return
        }
        this._currentPage = a,
        this._currentPageObj = d,
        c = window.FrameWindow.$(this._currentPageObj),
        c.unbind("pageinit"),
        c.bind("pageinit",
        function() {
            return console.log("PAGE INIT", a),
            e._currentPageObj = window.FrameWindow.$(this),
            window.FrameWindow.$(this).jqmData("alreadyCreated", !0)
        }),
        c.unbind("pagecreate"),
        c.bind("pagecreate",
        function() {
            return console.log("PAGE CREATE", a)
        }),
        c.unbind("pagebeforecreate"),
        c.bind("pagebeforecreate",
        function() {
            return console.log("PAGE BEFORE CREATE", a)
        }),
        c.unbind("pagechange"),
        c.bind("pagechange",
        function() {
            return console.log("PAGE CHANGE", a)
        }),
        c.jqmData("alreadyCreated") && c.trigger("pagecreate"),
        c.die("pageshow"),
        c.live("pageshow",
        function(b, c) {
            return console.log("PAGE SHOW", a),
            e.onPageChanged()
        }),
        c.page();
        if (!window.EMBED) return window.FrameWindow.$.mobile.changePage("#" + a, {
            transition: "none"
        })
    },
    getAppendSpot: function(a) {
        var b, c;
        return b = window.FrameWindow.$("body > div[data-cid]"),
        b.length < 1 ? window.FrameWindow.$("body") : (c = window.FrameWindow.$('body > div[data-cid="' + this._currentPage + '"]'), c.length > 0 ? a ? window.FrameWindow.$("> div[data-role=content]", c) : c: window.FrameWindow.$.mobile.pageContainer)
    },
    showPage: function(a, b) {
        var c, d;
        d = this,
        c = window.FrameWindow.$('body > div[data-cid="' + a + '"]');
        if (c.length < 1) {
            console.error("Unable to show page with control id", a, "it doesn't exist");
            return
        }
        console.log("Showing page on device", a),
        this.onAllControlsDeselected(),
        this.setCurrentPage(a),
        window.FrameWindow.$.mobile.changePage(window.FrameWindow.$(this._currentPageObj)),
        setTimeout(function() {
            return d.refreshPage()
        },
        200);
        if (b) return d = this,
        setTimeout(function() {
            return d.forceRedrawActivePage()
        },
        100)
    },
    refreshPage: function() {
        var a;
        return console.log("Refreshing device..."),
        window.FrameWindow.$.mobile.activePage ? (a = window.FrameWindow.$.mobile.activePage, a.trigger("pagecreate"), window.App.onDevicePageResize(a.width(), a.height(), a)) : setTimeout(function() {
            return window.FrameWindow.$.mobile.activePage.trigger("pagecreate")
        },
        11)
    },
    initAppTree: function(a) {
        if (a.getControlType() !== "app") return;
        return a.render(),
        window.FrameWindow.$(window.FrameDocument.body).append(a._deviceRenderedEl.children())
    },
    initControl: function(a, b) {
        var c, d, e;
        if (window.App.isLoading()) return;
        return a.getControlType() === "app" ? (a.render(), window.FrameWindow.$(window.FrameDocument.body).append(a._deviceRenderedEl.children(":first"))) : (b || a.getControlType() !== "page" && (e = window.FrameWindow.$.mobile.activePage.attr("data-cid"), c = this._builder.getControl(e), c && c.render()), a.getControlType() === "page" ? (d = window.App._document.root, d.render(), window.FrameWindow.$(window.FrameDocument.body).append(d._deviceRenderedEl.children()), this.setCurrentPage(a.getId()), console.log("WOULD REFRESH PAGE!"), this.refreshPage()) : this.refreshPage())
    },
    scrollToControl: function(a) {
        var b, c;
        b = a._deviceRenderedEl;
        if (!b) return;
        return c = b.offset(),
        window.FrameWindow.scrollTo(0, c.top - $(window.FrameWindow).height() / 2)
    },
    _changePageTheme: function(a, b, c) {
        var d, e, f, g;
        $(a).attr("data-theme", c),
        b || (b = "c");
        if ($(a).attr("class")) {
            d = new RegExp("-" + b + "$"),
            c = "-" + c,
            e = $(a).attr("class").split(" "),
            f = !1;
            for (g in e) d.test(e[g]) && (f = !0, e[g] = e[g].replace(d, c));
            return $(a).attr("class", e.join(" "))
        }
    },
    _changePageBg: function(a, b) {
        var c, d;
        return c = window.FrameWindow.$(a),
        d = b.bgImage.getValue(),
        d && d !== "" ? c.css("backgroundImage", "url('" + d + "')") : c.css("backgroundImage", ""),
        c.css("backgroundRepeat", b.bgImageRepeat.getValue())
    },
    updateControl: function(a) {
        var b, c, d;
        return d = this,
        console.log("UPDATE CONTROL"),
        a.settings.renderParent === !0 && (a = a.parentControl),
        a.render(),
        a.getControlType() === "page" ? (c = window.FrameWindow.$('[data-cid="' + a.getId() + '"]'), this._changePageTheme(c, window.FrameWindow.$(c).attr("data-theme"), a.theme.getValue()), this._changePageBg(c, a), this.refreshPage(), this.repositionCurrentSelector()) : (c = a.getDeviceExistingControl(window.FrameWindow.$), b = c.attr("class"), a.getControlType() === "gridblock" && a.getDeviceRenderedEl().attr("class", b), c.replaceWith(a.getDeviceRenderedEl()), this.refreshPage(), this.repositionCurrentSelector()),
        this.endHover()
    },
    forceRedrawActivePage: function() {
        var a;
        return a = window.FrameWindow.$.mobile.activePage.data("cid"),
        this.markPageDirty(a),
        this.redrawActivePage()
    },
    redrawActivePage: function() {
        var a, b;
        if (!window.FrameWindow.$.mobile.activePage || !this._builder || this._builder.isLoading()) return;
        a = window.FrameWindow.$.mobile.activePage.data("cid"),
        b = this._builder.getControl(a);
        if (!a || !b) return;
        if (!this._builder.isPreviewMode()) return this._dirtyPages[a] === !0 ? (console.log("REDRAWING PAGE", a, "BECAUSE DIRTY"), this.updateControl(b), delete this._dirtyPages[a]) : console.log("NOT REDRAWING PAGE", a, "BECAUSE NOT DIRTY")
    },
    redrawPlaceholderControls: function() {
        var a, b, c, d;
        c = window.App._document.lookup,
        d = [];
        for (b in c) a = c[b],
        a.placeholderName || a.getControlType() === "htmlblock" ? d.push(this.updateControl(a)) : d.push(void 0);
        return d
    },
    redrawAll: function() {
        var a;
        return a = window.App._document.root,
        a ? (a.render(window.document), window.FrameWindow.$("body").append(a._deviceRenderedEl.children()), this.refreshPage()) : console.error("Can't redraw all, document is null")
    },
    recreatePages: function() {
        return window.FrameWindow.$('[data-role="page"]').each(function() {
            try {
                return window.FrameWindow.$(this).trigger("pagecreate")
            } catch(a) {}
        })
    },
    closeControls: function() {
        var a, b, c, d;
        c = window.App._document.lookup,
        d = [];
        for (b in c) a = c[b],
        d.push(a.close && a.close());
        return d
    },
    fixPageThemes: function() {
        var a, b, c, d, e;
        d = window.FrameWindow.$('[data-role="page"][data-cid]'),
        b = 0,
        e = [];
        while (b < d.length) c = d.get(b),
        a = this._builder.getControl(window.FrameWindow.$(c).data("cid")),
        a && this._changePageTheme(c, window.FrameWindow.$(c).attr("data-theme"), a.theme.getValue()),
        e.push(b++);
        return e
    },
    addControl: function(a) {
        return this.stopScrolling(),
        this.initControl(a),
        console.log("DEVICE: added control: " + a.getId()),
        window.FrameWindow.$(".shim").remove()
    },
    addControlToContainer: function(a, b, c) {
        return this.stopScrolling(),
        b.addChildAtPoint(a, c),
        this.initControl(a, !0)
    },
    removeControl: function(a) {
        var b, c, d, e;
        return e = this,
        b = a.getDeviceExistingControl(window.FrameWindow.$),
        b.length < 1 ? null: (a.getControlType() === "page" ? (console.log("Device: removing page", a.getId()), c = window.FrameWindow.$('body > div[data-cid][data-cid!="' + a.getId() + '"]:first'), this.setCurrentPage(c.data("cid")), setTimeout(function() {
            var a;
            return b.remove(),
            a = window.FrameWindow.$.mobile.activePage,
            window.App.onDevicePageResize(a.width(), a.height(), a)
        },
        500)) : (b.remove(), d = window.FrameWindow.$.mobile.activePage, window.App.onDevicePageResize(d.width(), d.height(), d)), console.log("DEVICE: removed control: " + a.getId()), this.repositionCurrentSelector(), b)
    },
    onContainerMouseMoved: function(a, b) {
        return console.log("Mouse move over control", a.getId()),
        this._isDragDropping
    },
    startDragDrop: function(a) {
        return this._isDragDropping = !0
    },
    stopDragDrop: function() {
        return this._isDragDropping = !1
    },
    completeDragDrop: function(a) {},
    getContainerAt: function(a) {},
    onControlRendered: function(a) {
        var b, c;
        this._onControlRendered(a),
        b = 0,
        c = [];
        while (b < a.children.length) this._onControlRendered(a.children[b]),
        c.push(b++);
        return c
    },
    _onControlRendered: function(a) {
        if (a.supportsSorting()) return this._initPageSorting(a)
    },
    _createControlClickTarget: function() {
        return window.FrameWindow.$('<div class="codiqa-click-target"></div>')
    },
    _initPageSorting: function(a) {
        var b;
        return b = this,
        window.FrameWindow.$(a.getDeviceRenderedEl()).sortable({
            tolerance: "intersect",
            distance: 5,
            items: a.getSortableItemsSelector(),
            zIndex: 18,
            cursor: "move",
            connectWith: ".ui-sortable",
            placeholder: "ds-placeholder",
            forcePlaceholderSize: !1,
            forceHelperSize: !0,
            opacity: .2,
            start: function(a, c) {
                var d;
                return d = c.item.index(),
                c.item.data("contentDragStart", d),
                b.startSorting()
            },
            change: function(a, c) {
                var d;
                return d = c.item.index(),
                b.repositionCurrentSelector()
            },
            stop: function(c, d) {
                var e, f, g, h;
                return f = d.item.data("contentDragStart"),
                e = d.item.index(),
                g = $(d.item).parent().closest("[data-cid]"),
                h = b._builder.getControl($(g).data("cid")),
                b.trigger("controlMoved", d.item.data("cid"), a, h, f, e),
                b.endSorting()
            }
        })
    },
    designModeHint: function() {
        return window.FrameWindow.$("body").removeClass("preview"),
        window.FrameWindow.$("body").addClass("design")
    },
    previewModeHint: function() {
        return window.FrameWindow.$("body").removeClass("design"),
        window.FrameWindow.$("body").addClass("preview"),
        this.onAllControlsDeselected(),
        this.recreatePages(),
        window.FrameWindow.$.mobile.activePage && this.markPageDirty(window.FrameWindow.$.mobile.activePage.data("cid")),
        this.endHover(),
        this.removeEvents(),
        this.removeSorting()
    }
}),
_.extend(Device, Backbone.Events)