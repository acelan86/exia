/**
 * 为所有$.widget增加获取他们的实例的方法
 */
$.fn.extend({
    getInstance : function () {
        var widgetName = this.data('widgetName');
        return widgetName ? this.data($.camelCase(widgetName)) : null;
    }
});