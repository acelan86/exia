(function (name) {
    var control = {
        template : Handlebars.compile($('#' + name + 'ControlTemplate').html()),
        properties : [],
        value : {
            text : '按钮'
        }
    };
    window[name + 'Control'] = control;
})('Button');