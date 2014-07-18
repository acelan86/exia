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
        Backbone = window.Backbone;

    var Document = Backbone.Collection.extend({
        initialize : function () {
            console.log('Document initialize');
            var me = this;
        },
        add : function (model) {

        }
    });

    return Document;
});