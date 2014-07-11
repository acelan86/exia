var express = require('express'),
    fs = require('fs'),
    path = require('path'),
    consolidate = require('consolidate'),
    staticServer = require('express-combo');
    config = require('./server-lib/config.js'),
    tools = require('./server-lib/tools.js');

var app = express();

app.configure(function(){
    //app.use(express.methodOverride());
    app.use(express.bodyParser());
    app.use(app.router);
    app.engine("tpl", consolidate.handlebars); //选择handlebar作为模板引擎
    app.set("view engine", "tpl");
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


//
app.get('/:id', function(req, res){
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
            content : fs.readFileSync(path.join(config.controlTemplateRoot, control.name + '.tpl'), 'utf-8')
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
            content : fs.readFileSync(editorPath + '/tpl/' + file + '.tpl', 'utf-8')
        });
        editorExternalJS.push('/static/editors/js/' + file + '.js');
        editorExternalCSS.push('/static/editors/css/' + file + '.css');
    });

    context = {
        id : req.params.id,
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


/**
 * 生成页面
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
app.post('/create', function (req, res) {
    tools.build(req.body, function (str) {
        res.setHeader("Content-Type", "text/html");
        res.send(str);
    });
});
/**
 * 初始化接口
 */
app.get('/init/:id', function (req, res) {
    var json = {
        layout : [],
        controls : [
            {
                type : 'Button',
                value : {
                    text : '自定义按钮'
                }
            },
            {
                type : 'Navigator',
                value : {
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
            }
        ]
    };

    tools.build(json, function (str) {
        res.setHeader("Content-Type", "text/html");
        res.send(str);
    });
});

var server = app.listen(config.port, function() {
    console.log('Listening on port %d', server.address().port);
});