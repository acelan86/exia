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
            cid = model.cid,
            eid,
            value,
            cache = {},
            prop;

        properties.sort(function (a, b) {
            return a.pos - b.pos;
        });

        $.each(properties, function (i, property) {
            value = values[property.name];
            eid = [cid, property.name, 'editor'].join('_');
            cache[eid] = {
                type : property.type + 'Editor',
                context : _.extend({}, property.defaults, {
                    value : value
                })
            };
            html.push('<div id="' + eid + '"></div>');
        });

        this.dom.html(html.join(''));

        for (var eid in cache) {
            prop = cache[eid];
            try {
                $('#' + eid, this.dom)[prop.type](prop.context);
            } catch (e) {}
        }
    };

    PropertiesPanel.prototype.clear = function () {
        this.dom.html('');
    };
    
    return PropertiesPanel;
});