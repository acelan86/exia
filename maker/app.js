var express = require('express'),
    fs = require('fs'),
    path = require('path'),
    consolidate = require('consolidate'),
    staticServer = require('express-combo');
    config = require('./server-lib/config.js'),
    tools = require('./server-lib/tools.js'),
    Promise = require('node-promise').Promise,

    //数据库操作
    MongoClient = require('mongodb').MongoClient,
    ObjectID = require('mongodb').ObjectID;


var app = express();

app.configure(function(){
    app.use(express.methodOverride());
    app.use(express.cookieParser());
    app.use(express.bodyParser());
    app.use(express.logger());
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

app.get('/', function(req, res){
    console.log(req.cookie);
    var context,
        controls = [
            'Button', 'Navigator', 'Slider', 'Text', 'All', 'Media', 'List'
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
        externalJS.push('/static/Control/js/' + control + '.js');
        //externalCSS.push('/static/controls/css/' + control + '.css');
    });

    var editorPath = __dirname + '/src/Editor',
        files = fs.readdirSync(editorPath + '/js'),
        filePath,
        fileStat;

    files.forEach(function (file) {
        if (file.indexOf('.js') !== -1) {
            editorExternalJS.push('/static/Editor/js/' + file);
            editorExternalCSS.push('/static/Editor/css/' + file.replace('.js', '') + '.css');
        }
    });

    context = {
        id : req.params.id,
        templates : templates,
        externalFiles : {
            js : externalJS.join('~')
            //css : externalCSS.join('~')
        },
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
app.post('/pages/create', function (req, res) {
    var data = JSON.parse(req.body.data);
    console.log('xxx', data);
    tools.build(data, function (str) {
        MongoClient.connect("mongodb://127.0.0.1:27017/exia", function(err, db) {
            if(err) {
                return console.log(err);
            }
            db.collection('pages', function (err, pages) {
                pages.insert({
                    sid : data.sid,
                    name : '我的页面' + (new Date().getTime().toString(36)),
                    html : str,
                    json : JSON.stringify(data.controls)
                }, function (err) {
                    if (err) {
                        console.log(err);
                    }
                    res.setHeader("Content-Type", "text/html");
                    res.send(str);
                });
                
            });
        });
    });
});

app.get('/pages/:id', function (req, res) {
    var pid = req.params.id;
    console.log(pid);
    MongoClient.connect("mongodb://127.0.0.1:27017/exia", function(err, db) {
        if(err) {
            return console.log(err);
        }
        db.collection('pages', function (err, pages) {
            pages.findOne({
                _id : ObjectID(pid),
            }, function (err, page) {
                res.setHeader("Content-Type", "text/html");
                res.send(page.html);
            });   
        });
    });
});

/**
 * 新页面
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
app.post('/sites/create', function (req, res) {
    var SUP = req.cookies.SUP.split('&'),
        user = {},
        item;

    for (var i = 0, len = SUP.length; i < len; i++) {
        item = SUP[i].split('=');
        user[item[0]] = item[1];
    }

    console.log(user);

    MongoClient.connect("mongodb://127.0.0.1:27017/exia", function(err, db) {
        if(err) {
            return console.log(err);
        }
        db.collection('sites', function (err, sites) {
            sites.insert({uid : user.uid, name : '我的站点' + (new Date().getTime().toString(36))}, function (err, result) {
                var sid = result[0]._id;
                res.setHeader("Content-Type", "application/json");
                res.send(JSON.stringify({sid : sid, sname : result[0].name, uid : user.uid, pages : []}));
            });
        });
    });
});


/**
 * 初始化接口
 */
app.get('/sites/:id', function (req, res) {
    console.log(req.params.id);
    var SUP = req.cookies.SUP.split('&'),
        user = {},
        item;

    for (var i = 0, len = SUP.length; i < len; i++) {
        item = SUP[i].split('=');
        user[item[0]] = item[1];
    }

    MongoClient.connect("mongodb://127.0.0.1:27017/exia", function(err, db) {
        if(err) {
            return console.log(err);
        }
        db.collection('sites', function (err, sites) {
            sites.find({_id : new ObjectID(req.params.id)}).toArray(function (err, site) {
                site = site[0];
                db.collection('pages', function (err, pages) {
                    var data = [];
                    pages.find({sid : req.params.id}).toArray(function (err, result) {
                        console.log(result);
                        result.forEach(function (page, i){
                            data.push({id : page._id, name : page.name, sid: page.sid, controls : JSON.parse(page.json)});
                        });
                        res.setHeader("Content-Type", "application/json");
                        res.send(JSON.stringify({
                            uid : user.uid,
                            sid : site._id,
                            sname : site.name,
                            pages: data
                        }));
                    });
                });
            });
        });
    });
});

var server = app.listen(config.port, function() {
    console.log('Listening on port %d', server.address().port);
});