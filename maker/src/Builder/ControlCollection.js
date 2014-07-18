/**
 * 文档数据支持类
 * @param  {[type]} require [description]
 * @param  {[type]} exports [description]
 * @param  {[type]} module  [description]
 * @return {[type]}         [description]
 */
exia.define('Builder.ControlCollection', function (require, exports, module) {
    "use strict";
    var _ = window._,
        Backbone = window.Backbone,
        ControlModel = require('Builder.ControlModel');

    var ControlCollection = Backbone.Collection.extend({
        model : ControlModel
    });

    return ControlCollection;
});