(function ($) {
    var COPY_FLASH_URL = 'http://adbox.sina.com.cn/assets/images/fClipboard.swf',
        BASE_CLASS = 'ui-copybutton',
        FLASH_CLASS = BASE_CLASS + '-flash',
        REAL_BTN_CLASS = BASE_CLASS + '-btn',
        uid = 0;

    $.widget('ui.copybutton', {
        _create : function () {
            this.flashid = 'uiCopybutton' + (uid++);
            this.element.addClass(REAL_BTN_CLASS).button();

            this.flash = $('<div class="' + FLASH_CLASS + '" >' + $.createSwfHTML({
                url : COPY_FLASH_URL,
                width : this.options.width || 40,
                height : this.options.height || 20,
                wmode : 'transparent',
                allowscriptaccess : 'always',
                id : this.flashid
            }) + '</div>');
            this.copy = $('<div/>').addClass(BASE_CLASS)
                .appendTo(this.element.parent())
                .append(this.element)
                .append(this.flash);

            this.timer = setInterval($.proxy($.ui.copybutton.initHandler, this), 500);

            $.ui.copybutton['copyScript' + this.flashid] = $.proxy($.ui.copybutton.copyScript, this);
            $.ui.copybutton['mouseEventHandler' + this.flashid] = $.proxy($.ui.copybutton.mouseEventHandler, this);
        },
        _destroy : function () {
            delete $.ui.copybutton['copyScript' + this.flashid];
        }
    });
    $.ui.copybutton.initHandler = function () {
        var swf = $.swf.getMovie(this.flashid);
        if(swf && swf.flashInit && swf.flashInit()){
            swf.setHandCursor(true);
            swf.setContentFuncName('jQuery.ui.copybutton.copyScript' + this.flashid);
            swf.setMEFuncName('jQuery.ui.copybutton.mouseEventHandler' + this.flashid);
            clearInterval(this.timer);
        }
    };
    $.ui.copybutton.copyScript = function () {
        console.debug(content);
        var content = this.options.content ? this.options.content.val() : '';
        this._trigger('copy', null, {
            content : content
        });
        return content; 
    };
    $.ui.copybutton.mouseEventHandler = function (eventType) {
        console.debug(eventType);
        var btn = this.element;
        switch(eventType){
            case 'mouse_over':
                btn.addClass("ui-state-hover");
                break;
            case 'mouse_out':
                btn.removeClass("ui-state-hover");
                btn.removeClass("ui-state-active");
                break;
            case 'mouse_down':
                btn.addClass("ui-state-active");
                break;
            case 'mouse_up':
                btn.removeClass("ui-state-active");
                break;
            default:
                break;
        }
    };

})(jQuery);