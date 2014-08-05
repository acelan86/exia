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
                    //itemHeader: 'Picture',
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
                {href : "#test1", pic : "http://i2.sinaimg.cn/qc/photo_auto/photo/25/06/43012506/43012506_580_580small.jpg", title : "图片标题1"},
                {href : "#test1", pic : "http://i1.sinaimg.cn/qc/photo_auto/photo/65/12/43016512/43016512_580_580small.jpg", title : "图片标题2"},
                {href : "#test3", pic : "http://i0.sinaimg.cn/qc/2014/0805/U6652P33DT20140805113305.jpg", title : "图片标题3"}
            ],
            loop : true
        }
    });
});