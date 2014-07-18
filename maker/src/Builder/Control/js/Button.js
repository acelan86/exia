exia.use('Builder.Control', function (Control) {
    "use strict";

    Control.register('Button', {
        icon : '',
        template : Handlebars.compile($('#ButtonControlTemplate').html()),
        properties : [
            {name : 'text', type : 'TextInput', pos : 1}
        ],
        defaults : {
            text : '按钮'
        }
    });
});

