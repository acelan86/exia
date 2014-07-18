exia.define('Builder.Control', function (require, exports, module) {
    "use strict";

    var controls = {};

    return {
        register : function (type, obj) {
            controls[type] = obj;
        },

        get : function (name) {
            return name ? controls[name] : controls;
        }
    };
});