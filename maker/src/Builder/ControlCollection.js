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

     /**
     * {
     *     type : 'Control',
     *     value : {
     *     
     *     }
     * }
     */
    var ControlModel = Backbone.Model.extend({
        type : 'Control',
        value : {},
        initialize : function () {
            this.on('change:value', function () {
                console.log(arguments);
            });
        }
    });

    var ControlCollection = Backbone.Collection.extend({
        model : ControlModel
    });

    ControlCollection.ControlModel = ControlModel;

    return ControlCollection;
});