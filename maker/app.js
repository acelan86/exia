var express = require('express'),
    fs = require('fs'),
    consolidate = require('consolidate'),
    combo = require('node-combo').combo,
    config = {
        port: 80,
        staticRoot : __dirname + '/src'
    };

var app = express();

app.configure(function(){
    app.use(express.methodOverride());
    app.use(express.bodyParser());
    app.use(app.router);
    app.engine("html", consolidate.handlebars); //选择handlebar作为模板引擎
    app.set("view engine", "html");
    app.set("views", __dirname + "/views");
    app.use(express.static(config.staticRoot)); //创建静态服务器
});

app.get('/combo', combo(config.staticRoot), express.static(config.staticRoot));

app.get('/', function(req, res){
    var context,
        controls = [
            {text : '按钮', name : 'Button'},
            {text : '导航', name : 'Navigator'},
            {text : '焦点图', name : 'Slider'}
        ],
        templates = [],
        externalJS = [],
        externalCSS = [];

    controls.forEach(function (control) {
        templates.push({
            name : control.name,
            content : fs.readFileSync(__dirname + '/src/controls/tpl/' + control.name + '.tpl')
        });
        externalJS.push('controls/js/' + control.name + '.js');
        externalCSS.push('controls/css/' + control.name + '.css');
    });
    context = {
        controls : controls,
        templates : templates,
        externalFiles : {
            js : externalJS.join(','),
            css : externalCSS.join(',')
        }
    };

    res.setHeader("Content-Type", "text/html");
    res.render('index', context);
});

var server = app.listen(config.port, function() {
    console.log('Listening on port %d', server.address().port);
});