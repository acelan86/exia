exia.use('Builder.Editor', function (Editor) {
    "use strict";

    Editor.register('String', Backbone.View.extend({
        template : Handlebars.compile($('#StringEditorTemplate').html()),
        events : {
            'click .editor-string' : 'click'
        },
        render : function (context) {
            this.$el.html(this.template(context));
        },
        click : function () {
            alert('string click');
        }
    }));
});