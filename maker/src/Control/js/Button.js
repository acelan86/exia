exia.use('Builder.Control', function (Control) {
    "use strict";

    Control.register('Button', {
        icon : '',
        template : Handlebars.compile($('#ButtonControlTemplate').html()),
        properties : [
            {
                name : 'label',
                type : 'String',
                pos : 1,
                defaults : {
                    label : '文字',
                    placeholder: '请输入按钮文字'
                }
            }
        ],
        defaults : {
            label : '按钮'
        }
    });
});

