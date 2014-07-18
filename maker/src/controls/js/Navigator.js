(function (name) {
    window.controls = window.controls || {};
    
    window.controls[name] = {
        icon : '',
        template : Handlebars.compile($('#' + name + 'ControlTemplate').html()),
        properties : [],
        defaults : {
            items : [
                {url : "#test1", text : "首页"},
                {url : "#test1", text : "要闻"},
                {url : "#test3", text : "国内"},
                {url : "#test2", text : "国际"},
                {url : "#test3", text : "军事"},
                {url : "#test4", text : "社会"},
                {url : "#test5", text : "娱乐"}
            ]
        }
    };
})('Navigator');