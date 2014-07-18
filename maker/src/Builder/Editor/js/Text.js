exia.use('Builder.Editor', function (Editor) {
    "use strict";

    Editor.register('Text', Backbone.View.extend({
        template : Handlebars.compile($('#TextEditorTemplate').html()),
        events : {
            'click .editor-text' : 'click'
        },
        render : function (context) {
            this.$el.html(this.template(context));
        },
        click : function () {
            alert('text click');
        }
    }));
});