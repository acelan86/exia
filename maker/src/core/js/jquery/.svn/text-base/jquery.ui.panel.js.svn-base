(function ($) {
    var BASE_CLASS = 'ui-widget ui-panel',
        HEADER_CLASS = BASE_CLASS + '-header ui-widget-header',
        BODY_CLASS = BASE_CLASS + '-body',
        MIN_CLASS = BASE_CLASS + '-min',
        MINISIZE_CLASS = BASE_CLASS + '-minisize',
        CLOSE_CLASS = BASE_CLASS + '-close',
        CONTENT_CLASS = BASE_CLASS + '-content',
        BASE_INDEX = 2048,
        uid = 0;

    $.widget('ui.Panel', {
        _create : function () {
            var me = this,
                options = this.options,
                children = this.element.children();

            this.header = $('<h3>')
                .addClass(HEADER_CLASS)
                .html(options.title)
                .appendTo(this.element)
                .click(function () {
                    me.toTop();
                });
            this.body = $('<div/>')
                .addClass(BODY_CLASS)
                .append(children)
                .appendTo(this.element);

            if (options.miniButton) {
                this.min = $('<button class="ui-button ui-state-default">-</button>').addClass(MIN_CLASS).appendTo(this.header).click(function () {
                    me.element.toggleClass(MINISIZE_CLASS);
                });
            }
            if (options.closeButton) {
                this.close = $('<button class="ui-button">x</button>').addClass(CLOSE_CLASS).appendTo(this.header).click(function () {
                    me.hide();
                });
            }

            this.element
                .css({
                    'width' : options.width,
                    'zIndex' : BASE_INDEX + (uid++)
                })
                .addClass(BASE_CLASS)
                .draggable({
                    containment : options.containment,
                    handle : this.header
                });

            if (options.height) {
                this.body.height(options.height - this.header.height());
            } else {
                this.maxHeight();
                $(window).resize(function () {
                    me.maxHeight();
                });
            }

            options.hide && this.hide();

        },
        _destroy : function () {
            this.close && this.close.unbind().remove();
            this.header.unbind().remove();
            this.min && this.min.unbind().remove();
        },
        maxHeight : function () {
            !this.options.height && this.body.css('max-height', this.options.containment.height() - 40);
        },
        show : function () {
            this.element.css({
                display:''
            });
        },
        hide : function () {
            this.element.hide();
        },
        toTop : function () {
            this.element.css('zIndex', BASE_INDEX + (uid++));
        }
    });
})(jQuery);