exia.define('Builder.PropertiesPanel', function (require, exports, module) {
    "use strict";
    var _ = window._,
        Backbone = window.Backbone,
        Editor = require('Builder.Editor');

    function PropertiesPanel(dom) {
        _.extend(this, Backbone.Events);

        this.dom = $(dom);

        this.dom.mousedown(function (e) {
            e.stopPropagation();
        });
    }


    PropertiesPanel.prototype.render = function (properties, model) {
        var html = [],  
            values = model.get('value'),
            value,
            editor,
            context,
            me = this;
        properties.sort(function (a, b) {
            return a.pos - b.pos;
        });

        $.each(properties, function (i, property) {
            value = values[property.name];
            context = _.extend({}, property.defaults, {
                value : value
            });
            editor = Editor.get(property.type);
            if (editor) {
                editor.render(context);
            }
        });
    };

    PropertiesPanel.prototype.clear = function () {
        this.dom.html('');
    };
    
    return PropertiesPanel;
});