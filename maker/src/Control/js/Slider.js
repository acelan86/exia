exia.use('Builder.Control', function (Control) {
    "use strict";

    Control.register('Slider', {
        icon : '',
        template : Handlebars.compile($('#SliderControlTemplate').html()),
        properties : [
            {
                name : 'content',
                type : 'ObjectArray',
                pos : 2,
                defaults : {
                    label : '图片列表',
                    itemHeader: 'Picture',
                    map : {
                        'href' : {
                            type : 'String',
                            label : 'link'
                        },
                        'pic' : {
                            type : 'String',
                            label : 'src'
                        }
                    }
                }
            },
            {
                name : 'loop',
                type : 'Switch',
                pos : 1, 
                defaults : {
                    placeholder : '是否循环',
                    label : '循环'
                }
            }
        ],
        defaults : {
            content : [
                {href : "#test1", pic : "http://wenwen.soso.com/p/20110208/20110208213951-1550799761.jpg", title : "图片标题1"},
                {href : "#test1", pic : "http://img.kumi.cn/photo/a8/bc/42/a8bc42b8ddb7f14e.jpg", title : "图片标题2"},
                {href : "#test3", pic : "http://h.hiphotos.baidu.com/image/w%3D310/sign=c21d5587123853438ccf8120a312b01f/e61190ef76c6a7ef392c0ecdfffaaf51f2de66d7.jpg", title : "图片标题3"}
            ],
            loop : true
        }
    });
});