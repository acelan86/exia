var root = require('path').resolve(__dirname, '..');

exports.port = 1234;
exports.staticRoot = root + '/src';
exports.controlTemplateRoot = root + '/src/Builder/Control/tpl';
exports.coreCSS = [
    '/static/core/css/jquery-ui-1.10.4.css'
];
exports.coreJS = [
    '/static/core/js/jquery/jquery-1.11.1.js',
    '/static/core/js/handlebars-1.3.0.js',
    '/static/core/js/underscroe-1.6.0.js',
    '/static/core/js/backbone-1.1.2.js',
    '/static/core/js/jquery/jquery.ui.core.js',
    '/static/core/js/jquery/jquery.ui.widget.js',
    '/static/core/js/jquery/jquery.ui.mouse.js',
    '/static/core/js/jquery/jquery.ui.draggable.js',
    '/static/core/js/jquery/jquery.ui.droppable.js',
    '/static/core/js/jquery/jquery.ui.button.js',
    '/static/core/js/jquery/jquery.ui.spinner.js'
];