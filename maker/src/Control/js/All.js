exia.use('Builder.Control', function (Control) {
    "use strict";

    Control.register('All', {
        icon : '',
        template : Handlebars.compile($('#AllControlTemplate').html()),
        properties : [
            {
                name : 'string',
                type : 'String',
                pos : 1,
                defaults : {
                    label : '文字',
                    placeholder: '请输入按钮文字'
                }
            },
            {
                name : 'loop',
                type : 'Switch',
                pos : 1,
                defaults : {
                    label : '文字',
                    placeholder: '请输入按钮文字'
                }
            },
            {
                name : 'items',
                type : 'ObjectArray',
                pos : 2,
                defaults : {
                    map : {
                        'url' : {
                            type : 'String',
                            label : '地址'
                        },
                        'text' : {
                            type : 'String',
                            label : '标签文字'
                        }
                    }
                }
            },
            {
                name : 'number',
                type : 'Number',
                pos : 3
            },
            {
                name : 'text',
                type : 'Text',
                pos : 4
            },
            {
                name : 'select',
                type : 'Select',
                defaults : {
                    datasource : [
                        {name : 'a', value: 1},
                        {name : 'b', value: 2}
                    ]
                }
            },
            {
                name : 'range',
                type : 'Range',
                defaults : {
                    max : 10,
                    min : 1
                }
            }
        ],
        defaults : {
            text : '按钮',
            loop : true
        }
    });
});
