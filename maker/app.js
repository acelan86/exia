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
app.get('/', function(req, res){
    var context,
        controls = [
            'Button', 'Navigator', 'Slider', 'Text'
        ],
        editors,
        templates = [],
        editorTemplates = [],
        externalJS = [],
        editorExternalJS = [],
        //externalCSS = [],
        editorExternalCSS = [];

    controls.forEach(function (control) {
        templates.push({
            name : control,
            content : fs.readFileSync(path.join(config.controlTemplateRoot, control + '.tpl'), 'utf-8')
        });
        externalJS.push('/static/Builder/Control/js/' + control + '.js');
        //externalCSS.push('/static/controls/css/' + control + '.css');
    });

    var editorPath = __dirname + '/src/Builder/Editor',
        files = fs.readdirSync(editorPath + '/js');

    files.forEach(function (file) {
        file = file.replace('.js', '');
        editorTemplates.push({
            name : file,
            content : fs.readFileSync(editorPath + '/tpl/' + file + '.tpl', 'utf-8')
        });
        editorExternalJS.push('/static/Builder/Editor/js/' + file + '.js');
        //editorExternalCSS.push('/static/editors/css/' + file + '.css');
    });

    context = {
        id : req.params.id,
        templates : templates,
        externalFiles : {
            js : externalJS.join('~')
            //css : externalCSS.join('~')
        },
        editorTemplates : editorTemplates,
        editorExternalFiles : {
            js : editorExternalJS.join('~')
            //css : editorExternalCSS.join('~')
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
 * 空白编辑页面
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
app.get('/site/blank', function (req, res) {
    
    tools.build('', function (str) {
        res.setHeader("Content-Type", "text/html");
        res.send(str);
    });
});


/**
 * 初始化接口
 */
app.get('/site/:id', function (req, res) {
    var data = {
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
                        {url : "#test1", text : "my首页"},
                        {url : "#test1", text : "my要闻"},
                        {url : "#test3", text : "my国内"},
                        {url : "#test2", text : "my国际"},
                        {url : "#test3", text : "my军事"}
                    ]
                }
            },
            {
                type : 'Slider',
                value : {
                    items : [
                        {url : "#test1", src : "http://wenwen.soso.com/p/20110208/20110208213951-1550799761.jpg", title : "my图片标题1"},
                        {url : "#test1", src : "http://img.kumi.cn/photo/a8/bc/42/a8bc42b8ddb7f14e.jpg", title : "my图片标题2"},
                        {url : "#test3", src : "http://h.hiphotos.baidu.com/image/w%3D310/sign=c21d5587123853438ccf8120a312b01f/e61190ef76c6a7ef392c0ecdfffaaf51f2de66d7.jpg", title : "my图片标题3"}
                    ],
                    loop : 1
                }
            }
        ]
    };

    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(data));
});

var server = app.listen(config.port, function() {
    console.log('Listening on port %d', server.address().port);
});