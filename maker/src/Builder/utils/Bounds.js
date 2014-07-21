exia.define('utils.Bounds', function (require, exports, module) {
    /**
     * 节点区域计算辅助工具类
     * @type {Object}
     */
    return {
        /**
         * 获取某个节点的关键区域点，上t，右r，下b，左l，中心点x, y坐标, 宽w，高h
         * @param  {[type]} el [description]
         * @return {[type]}    [description]
         */
        getElementBounds : function (el) {
            var el = $(el),
                offset = el.offset(),
                width = el.outerWidth(),
                height = el.outerHeight();
            return {
                t : offset.top,
                r : offset.left + width,
                b : offset.top + height,
                l : offset.left,
                x: offset.left + width / 2,
                y: offset.top + height / 2,                 
                w : width,
                h : height
            };
        },

        // isAfter: function(point, el) {
        //     var bounds = this.getElementBounds(el);
        //     return Math.max(bounds.y, bounds.b - 20) < point.y && point.y < o.b && bounds.l < point.x && point.x < bounds.r;
        // },

        // isBefore: function(point, el) {
        //     var bounds = this.getElementBounds(el);
        //     return Math.max(bounds.y, bounds.b - 20) >= point.y && bounds.l < point.x && point.x < bounds.r;
        // },

        isContain: function(el, point) {
            var bounds = this.getElementBounds(el);
            return $(el).is(":visible") ? !(point.x < bounds.l || point.x > bounds.r || point.y < bounds.t || point.y > bounds.b) : false;
        }
    };
});