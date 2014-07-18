(function (name) {
    window.controls = window.controls || {};
    window.controls[name] = {
        icon : '',
        template : Handlebars.compile($('#' + name + 'ControlTemplate').html()),
        properties : [],
        defaults : {
            text : '按钮'
        }
    };
})('Button');

