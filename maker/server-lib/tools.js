var fs = require('fs'),
    config = require('./config.js'),
    Handlebars = require('handlebars'),
    path = require('path'),
    root = path.resolve(__dirname, '..');

exports.renderWithFile = function (file, callback, context) {
    context = context || {};

    fs.readFile(file, 'utf-8', function (err, data) {
        if (!err && data) {
            var template = Handlebars.compile(data);
            callback(null, template(context));
        } else {
            callback(err, '');
        }
    });
};

var buildTemplate = root + '/views/page.tpl';
/** 通过传入的json数据生成页面 **/
exports.build = function (data, callback, options) {
    (function (controls) {
        var len = controls.length,
            buffer = [];

        controls.forEach(function (control) {
            exports.renderWithFile(
                path.join(config.controlTemplateRoot, control.type + '.tpl'),
                function (err, str) {
                    len--;
                    buffer.push(str);
                    if (len === 0) {
                        console.log(buffer);
                        exports.renderWithFile(
                            buildTemplate,
                            function (err, str) {
                                callback(str);
                            },
                            {
                                body : buffer.join('')
                            }
                        );
                    }
                },
                control.value
            );
        });
    })(data.controls);
};