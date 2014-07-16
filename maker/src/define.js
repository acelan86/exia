(function (window, undefined) {
    "use strict";

    if (window.exia) {
        return;
    }
    var core = window.exia = {
        version: "1.0.0"
    };

    /**
     * 创建判断某种特定类型的函数
     */
    function is(type) {
        return function(o) {
            return {}.toString.call(o) === "[object " + type + "]";
        };
    }
    var isArray = Array.isArray || is("Array"),
        isFunction = is("Function");


    var cache = core.modules = {};

    function _exec(module) {
        //如果有exprots，认为已经初始化模块，直接返回exports
        if (module.exports !== null) {
            return module.exports;
        }

        function require(id) {
            if (!cache[id]) {
                throw new Error(id + " not found.");
            }
            return _exec(cache[id]);
        }

        var factory = module.factory;
        var exports = isFunction(factory) ? factory(require, module.exports = {}, module) : factory;
        
        if (undefined === exports) {
            exports = module.exports;
        }

        //增加exports, 删除factory, 表明已经初始化过该模块
        module.exports = exports;
        delete module.factory;

        return exports;
    }

    /**
     * 定义模块的方法
     */
    core.define = function (id, factory) {
        if (1 === arguments.length) {
            throw "module must has a id and factory.";
        }
        if (/^\-([\w\.\/\-]*)$/.test(id)) {
            id = RegExp.$1;
        }
        if (cache[id]) {
            throw "module " + id + " has been defined.";
        }
        var module = {
            id: id,
            factory: factory,
            exports: null
        };
        cache[id] = module;
        RegExp.$1 === id && _exec(cache[id]);
    };
    core.use = function(modules, callback) {
        if (!isArray(modules)) {
            modules = [modules];
        }
        var _modules = [];
        for (var i = 0; i < modules.length; i++) {
            _modules[i] = _exec(cache[modules[i]]);
        }
        callback && callback.apply(core, _modules);
    };

})(window);