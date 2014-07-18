exia.define('Builder.PropertiesPanel', function (require, exports, module) {
    "use strict";
    var _ = window._,
        Backbone = window.Backbone;

    function PropertiesPanel(dom) {
        _.extend(this, Backbone.Events);

        this.dom = $(dom);
    }
    PropertiesPanel.prototype.render = function (properties, model) {
        var html = [],  
            values = model.get('value'),
            value;
        properties.sort(function (a, b) {
            return a.pos - b.pos;
        });

        $.each(properties, function (i, property) {
            value = values[property.name];
            html.push(
                [
                    '<dl>',
                        '<dt>', property.name, '</dt>',
                        '<dd>', JSON.stringify(value), '</dd>',
                    '</dl>'
                ].join('')
            );
        });
        this.dom.html(html.join(''));
    };
    return PropertiesPanel;
});