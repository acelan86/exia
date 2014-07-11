var express = require('express'),
    fs = require('fs'),
    consolidate = require('consolidate'),
    staticServer = require('express-combo');
    config = {
        port: 1234,
        staticRoot : __dirname + '/src'
    };

var app = express();

app.configure(function(){
    //app.use(express.methodOverride());
    //app.use(express.bodyParser());
    //app.use(app.router);
    app.engine("html", consolidate.handlebars); //选择handlebar作为模板引擎
    app.set("view engine", "html");
    app.set("views", __dirname + "/views");

    //app.use(express.static(config.staticRoot)); //创建静态服务器
});

app.get('/', staticServer.folder('', __dirname + '/src/'));
//combo
app.get('/static', 
    staticServer.combine({
        comboBase: '/combo~',
        comboSep: '~'
    })
);



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
        externalJS.push('controls/js/' + control.name + '.js');
        externalCSS.push('controls/css/' + control.name + '.css');
    });

    var editorPath = __dirname + '/src/editors',
        files = fs.readdirSync(editorPath + '/js');

    files.forEach(function (file) {
        file = file.replace('.js', '');
        editorTemplates.push({
            name : file,
            content : fs.readFileSync(editorPath + '/tpl/' + file + '.tpl')
        });
        editorExternalJS.push('editors/js/' + file + '.js');
        editorExternalCSS.push('editors/css/' + file + '.css');
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
        }
    };

    res.setHeader("Content-Type", "text/html");
    res.render('index', context);
});

var server = app.listen(config.port, function() {
    console.log('Listening on port %d', server.address().port);
});