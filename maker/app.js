var express = require('express'),
    fs = require('fs'),
    consolidate = require('consolidate'),
    staticServer = require('express-combo');
    config = {
        port: 1234,
        staticRoot : __dirname + '/src',
        coreCSS : [
            '/static/core/css/jquery-ui-1.10.4.css'
        ],
        coreJS : [
            '/static/core/js/jquery-2.1.1.js',
            '/static/core/js/handlebars-1.3.0.js',
            '/static/core/js/jquery-ui-1.10.4.js',
            '/static/core/js/underscroe-1.6.0.js',
            '/static/core/js/backbone-1.1.2.js'
        ]
    };

var app = express();

app.configure(function(){
    //app.use(express.methodOverride());
    //app.use(express.bodyParser());
    //app.use(app.router);
    app.engine("html", consolidate.handlebars); //选择handlebar作为模板引擎
    app.set("view engine", "html");
    app.set("views", __dirname + "/views");

    //静态文件服务
    //设置static的服务转移到src目录下
    app.use(staticServer.folder('static', __dirname + '/src/'));
    //设置page的服务转移到page目录下
    app.use(staticServer.folder('page', __dirname + '/src/page'));
    //设置combo服务，combo服务的每一个url也是符合static或者，page的
    app.use(staticServer.combine({
        comboBase: '/combo~',
        comboSep: '~'
    }));
});



app.get('/', function(req, res){
    var context,
        controls = [
            {text : '按钮', name : 'Button'},
            {text : '导航', name : 'Navigator'},
            {text : '焦点图', name : 'Slider'}
        ],
        editors,
        templates = [],
        editorTemplates = [],
        externalJS = [],
        editorExternalJS = [],
        externalCSS = [],
        editorExternalCSS = [];

    controls.forEach(function (control) {
        templates.push({
            name : control.name,
            content : fs.readFileSync(__dirname + '/src/controls/tpl/' + control.name + '.tpl')
        });
        externalJS.push('/static/controls/js/' + control.name + '.js');
        externalCSS.push('/static/controls/css/' + control.name + '.css');
    });

    var editorPath = __dirname + '/src/editors',
        files = fs.readdirSync(editorPath + '/js');

    files.forEach(function (file) {
        file = file.replace('.js', '');
        editorTemplates.push({
            name : file,
            content : fs.readFileSync(editorPath + '/tpl/' + file + '.tpl')
        });
        editorExternalJS.push('/static/editors/js/' + file + '.js');
        editorExternalCSS.push('/static/editors/css/' + file + '.css');
    });

    context = {
        controls : controls,
        templates : templates,
        externalFiles : {
            js : externalJS.join('~'),
            css : externalCSS.join('~')
        },
        editorTemplates : editorTemplates,
        editorExternalFiles : {
            js : editorExternalJS.join('~'),
            css : editorExternalCSS.join('~')
        },
        coreJS : config.coreJS.join('~'),
        coreCSS : config.coreCSS.join('~')
    };

    res.setHeader("Content-Type", "text/html");
    res.render('index', context);
});

var server = app.listen(config.port, function() {
    console.log('Listening on port %d', server.address().port);
});