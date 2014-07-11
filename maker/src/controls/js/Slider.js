(function (name) {
    var control = {
        template : Handlebars.compile($('#' + name + 'ControlTemplate').html()),
        properties : [],
        value : {
            items : [
                {url : "#test1", src : "http://wenwen.soso.com/p/20110208/20110208213951-1550799761.jpg", title : "图片标题1"},
                {url : "#test1", src : "http://img.kumi.cn/photo/a8/bc/42/a8bc42b8ddb7f14e.jpg", title : "图片标题2"},
                {url : "#test3", src : "http://h.hiphotos.baidu.com/image/w%3D310/sign=c21d5587123853438ccf8120a312b01f/e61190ef76c6a7ef392c0ecdfffaaf51f2de66d7.jpg", title : "图片标题3"}
            ],
            loop : 1
        }
    };
    window[name + 'Control'] = control;
})('Slider');