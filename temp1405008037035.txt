(function (name) {
    var editor = Backbone.View.extend({
        //template : Handlebars.compile($('#' + name + 'EditorTemplate').html()),
        events : {
            
        }
    });
    window[name + 'Editor'] = editor;
})('Number');