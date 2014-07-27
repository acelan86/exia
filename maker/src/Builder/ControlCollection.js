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

    function Model(cid, type, value) {
        var me = this,
            data = {};

        _.extend(this, Backbone.Events);

        this.cid = cid, 
        this.type = type;

        Object.observe(data, function (changes) {
            var _changes = [],
                change;
            for (var i = 0, len = changes.length; i < len; i++) {
                change = changes[i];
                'update' === change.type && _changes.push({
                    name : change.name,
                    oldValue : change.oldValue,
                    value : change.object[change.name],
                    type : change.type
                });
            }
            _changes.length > 0 && me.trigger('change', _changes); 
        });

        this.get = function (key) {
            return key ? data[key] : data;
        };
        this.set = function (key, value) {
            data[key] = value;
        };
        this.toJSON = function () {
            return {
                cid : this.cid,
                type : this.type,
                value : data
            };
        };

        for (var key in value) {
            this.set(key, value[key]);
        }
    }

    function Collection(data) {
        _.extend(this, Backbone.Events);

        data = data || [];
        this.data = {};
        this.count = 0;

        for (var i = 0, len = data.length; i < len; i++) {
            this.add(data);
        }
    }
    Collection.prototype.add = function (data) {
        var cid = this.getCid(),
            me = this;

        this.data[cid] = new Model(cid, data.type, data.value);
        
        this.data[cid].on('change', (function (cid, type) {
            return function (changes) {
                me.trigger('change', cid, type, changes);
            };
        })(cid, data.type));
        this.trigger('add', this.data[cid]);
    };

    Collection.prototype.get = function (cid) {
        return cid ? this.data[cid] : this.data;
    };
    Collection.prototype.getCid = function () {
        return 'c' + (++this.count);
    };
    Collection.prototype.toJSON = function () {
        var data = [];
        for (var cid in this.data) {
            data.push(this.data[cid].toJSON());
        }
        return data;
    };
    
    return Collection;
});