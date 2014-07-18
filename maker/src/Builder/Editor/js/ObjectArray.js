exia.use('Builder.Editor', function (Editor) {
    "use strict";

    Editor.register('ObjectArray', Backbone.View.extend({
        template : Handlebars.compile($('#ObjectArrayEditorTemplate').html()),
        events : {
            'click .editor-objectarray' : 'click'
        },
        render : function (context) {
            this.$el.html(this.template(context));
        },
        click : function () {
            alert('objectarray click');
        }
    }));
});