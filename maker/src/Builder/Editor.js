exia.define('Builder.Editor', function (require, exports, module) {
    "use strict";

    var editors = {};

    return {
        register : function (name, Editor) {
            editors[name] = new Editor({
                el : "#PropertiesPanel"
            });
        },
        get : function (name) {
            return name ? editors[name] : editors;
        }
    };
});