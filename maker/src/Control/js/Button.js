exia.use('Builder.Control', function (Control) {
    "use strict";

    Control.register('Button', {
        icon : '',
        template : Handlebars.compile($('#ButtonControlTemplate').html()),
        properties : [
            {
                name : 'text',
                type : 'String',
                pos : 1,
                defaults : {
                    label : '文字',
                    placeholder: '请输入按钮文字'
                }
            }
        ],
        defaults : {
            text : '按钮'
        }
    });
});

