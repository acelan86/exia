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
                {href : "#test1", pic : "http://img1.imgtn.bdimg.com/it/u=2298694357,2635003216&fm=21&gp=0.jpg", title : "图片标题1"},
                {href : "#test1", pic : "http://img2.imgtn.bdimg.com/it/u=3514949207,3190366777&fm=23&gp=0.jpg", title : "图片标题2"},
                {href : "#test3", pic : "http://img1.imgtn.bdimg.com/it/u=3362243801,1122342630&fm=21&gp=0.jpg", title : "图片标题3"}
            ],
            loop : true
        }
    });
});