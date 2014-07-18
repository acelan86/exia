var root = require('path').resolve(__dirname, '..');

exports.port = 1234;
exports.staticRoot = root + '/src';
exports.controlTemplateRoot = root + '/src/Builder/Control/tpl';
exports.coreCSS = [
    '/static/core/css/jquery-ui-1.10.4.css'
];
exports.coreJS = [
    '/static/core/js/jquery-2.1.1.js',
    '/static/core/js/handlebars-1.3.0.js',
    '/static/core/js/jquery-ui-1.10.4.js',
    '/static/core/js/underscroe-1.6.0.js',
    '/static/core/js/backbone-1.1.2.js'
];