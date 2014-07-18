exia.use('Builder.Editor', function (Editor) {
    "use strict";

    Editor.register('Number', Backbone.View.extend({
        template : Handlebars.compile($('#NumberEditorTemplate').html()),
        events : {
            'click .editor-number' : 'click'
        },
        render : function (context) {
            this.$el.html(this.template(context));
        },
        click : function () {
            alert('click');
        }
    }));
});