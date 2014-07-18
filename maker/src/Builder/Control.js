exia.define('Builder.Control', function (require, exports, module) {
    "use strict";

    var controls = {};

    function Control(type, options) {
        options = options || {};
        this.type = type;
        this.icon = options.icon || 'defaults.png';
        this.template = options.template || function () { return ''; };
        this.properties = options.properties || [];
        this.defaults = options.defaults || {};
    }

    Control.register = function (type, options) {
        controls[type] = new Control(type, options);
    };

    Control.get = function (name) {
        return controls[name];
    };

    return Control;
});