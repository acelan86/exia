exia.define('Builder.ControlModel', function (require, exports, module) {
    "use strict";

    var _ = window._,
        Backbone = window.Backbone;

    /**
     * {
     *     type : 'Control',
     *     value : {
     *     
     *     }
     * }
     */
    var ControlModel = Backbone.Model.extend({
        type : 'Control',
        value : {},
        initialize : function () {
            this.on('change:value', function () {
                console.log(arguments);
            });
        }
    });

    return ControlModel;
});