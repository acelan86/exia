(function (name) {
    window.controls = window.controls || {};
    window.controls[name] = {
        icon : '',
        template : Handlebars.compile($('#' + name + 'ControlTemplate').html()),
        properties : [
            {name : 'text', type : 'TextInput', pos : 1}
        ],
        defaults : {
            text : '按钮'
        }
    };
})('Button');

