var root = require('path').resolve(__dirname, '..');

exports.port = 1234;
exports.staticRoot = root + '/src';
exports.controlTemplateRoot = root + '/src/Control/tpl';
exports.coreCSS = [
    '/static/core/css/jquery.ui.core.css',
    '/static/core/css/jquery.ui.button.css',
    '/static/core/css/jquery.ui.flipswitch.css',
    '/static/core/css/jquery.ui.spinner.css',
    '/static/core/css/jquery.ui.menu.css',
    '/static/core/css/jquery.ui.selectmenu.css',
    '/static/core/css/jquery.ui.slider.css',
    '/static/core/css/jquery.ui.theme.css'
];
exports.coreJS = [
    '/static/core/js/Object.observe.js',
    '/static/core/js/jquery/jquery-1.11.1.js',
    '/static/core/js/handlebars-1.3.0.js',
    '/static/core/js/underscore-1.6.0.js',
    '/static/core/js/backbone-1.1.2.js',
    '/static/core/js/jquery/extend/fullscreen.js',
    '/static/core/js/jquery/jquery.ui.core.js',
    '/static/core/js/jquery/jquery.ui.widget.js',
    '/static/core/js/jquery/jquery.ui.mouse.js',
    '/static/core/js/jquery/jquery.ui.position.js',
    '/static/core/js/jquery/jquery.ui.draggable.js',
    '/static/core/js/jquery/jquery.ui.droppable.js',
    '/static/core/js/jquery/jquery.ui.button.js',
    '/static/core/js/jquery/jquery.ui.flipswitch.js',
    '/static/core/js/jquery/jquery.ui.spinner.js',
    '/static/core/js/jquery/jquery.ui.menu.js',
    '/static/core/js/jquery/jquery.ui.selectmenu.js',
    '/static/core/js/jquery/jquery.ui.slider.js',
    '/static/core/js/jquery/jquery.ui.dialog.js',
    '/static/core/js/jquery/extend/jquery.ui.alert.js'
];