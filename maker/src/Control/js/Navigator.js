exia.use('Builder.Control', function (Control) {
    "use strict";

    Control.register('Navigator', {
        icon : '',
        template : Handlebars.compile($('#NavigatorControlTemplate').html()),
        properties : [
            {
                name : 'content',
                type : 'ObjectArray',
                pos : 1,
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
            }
        ],
        defaults : {
            content : [
                {url : "#test1", text : "首页"},
                {url : "#test1", text : "要闻"},
                {url : "#test3", text : "国内"},
                {url : "#test2", text : "国际"},
                {url : "#test3", text : "军事"},
                {url : "#test4", text : "社会"},
                {url : "#test5", text : "娱乐"}
            ]
        }
    });
});