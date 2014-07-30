exia.use('Builder.Control', function (Control) {
    "use strict";

    Control.register('List', {
        icon : '',
        template : Handlebars.compile($('#ListControlTemplate').html()),
        properties : [
            {
                name : 'items',
                type : 'ObjectArray',
                pos : 2,
                defaults : {
                    label : '列表',
                    //itemHeader: 'Picture',
                    map : {
                        'text' : {
                            type : 'String',
                            label : 'text'
                        }
                    }
                }
            }
        ],
        defaults : {
            items : [
                {text : "标题1"},
                {text : "标题2"},
                {text : "标题3"},
                {text : "标题4"}
            ],
            loop : true
        }
    });
});