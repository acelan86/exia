/*!
 * jQuery UI Dialog @VERSION
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/dialog/
 */
(function( factory ) {
    if ( typeof define === "function" && define.amd ) {

        // AMD. Register as an anonymous module.
        define([
            "jquery",
            "./core",
            "./widget",
            "./button"
        ], factory );
    } else {

        // Browser globals
        factory( jQuery );
    }
}(function( $ ) {

    return $.widget( "ui.flipswitch", {

        options: {
            onText: "On",
            offText: "Off",
            theme: null,
            enhanced: false,
            wrapperClass: null,
            corners: true,
            mini: false
        },

        _create: function() {

                if ( !this.options.enhanced ) {
                    this._enhance();
                } else {
                    $.extend( this, {
                        flipswitch: this.element.parent(),
                        on: this.element.find( ".ui-flipswitch-on" ).eq( 0 ),
                        off: this.element.find( ".ui-flipswitch-off" ).eq(0),
                        type: this.element.get( 0 ).tagName
                    });
                }
                this.element.attr( "tabindex", "-1" );

                //this._hoverable(this.on);
                this._focusable(this.on);


                if ( this.element.is( ":disabled" ) ) {
                    this._setOptions({
                        "disabled": true
                    });
                }

                this.flipswitch
                    .keydown($.proxy(this._keydown, this))
                    .click($.proxy(this._toggle, this));
        },

        widget: function() {
            return this.flipswitch;
        },

        _left: function(e) {
            this.flipswitch.removeClass( "ui-flipswitch-active" );
            if ( this.type === "SELECT" ) {
                this.element.get( 0 ).selectedIndex = 0;
            } else {
                this.element.prop( "checked", false );
            }
            this._trigger("change", e, {
                value : false
            });
        },

        _right: function(e) {
            this.flipswitch.addClass( "ui-flipswitch-active" );
            if ( this.type === "SELECT" ) {
                this.element.get( 0 ).selectedIndex = 1;
            } else {
                this.element.prop( "checked", true );
            }
            this._trigger( "change", e, {
                value : true
            });
        },

        _enhance: function() {
            var flipswitch = $( "<div></div>"),
                options = this.options,
                element = this.element,
                theme = options.theme ? options.theme : "inherit",

                // The "on" button is an anchor so it's focusable
                on = $( "<button>"),
                off = $( "<span></span>" ),
                type = element.get( 0 ).tagName,
                onText = ( type === "INPUT" ) ?
                    options.onText : element.find( "option" ).eq( 1 ).text(),
                offText = ( type === "INPUT" ) ?
                    options.offText : element.find( "option" ).eq( 0 ).text();

                on
                    .addClass( "ui-flipswitch-on ui-btn ui-state-default" )
                    .text( onText );
                off
                    .addClass( "ui-flipswitch-off" )
                    .text( offText );

                flipswitch
                    .addClass( "ui-flipswitch " +
                        "ui-bar-" + theme + " " +
                        ( options.wrapperClass ? options.wrapperClass : "" ) + " " +
                        ( ( element.is( ":checked" ) ||
                            element
                                .find( "option" )
                                .eq( 1 )
                                .is( ":selected" ) ) ? "ui-flipswitch-active" : "" ) +
                        ( element.is(":disabled") ? " ui-state-disabled": "") +
                        ( options.corners ? " ui-corner-all": "" ) +
                        ( options.mini ? " ui-mini": "" ) )
                    .append( on, off );

                element
                    .addClass("ui-flipswitch-input")
                    .after(flipswitch)
                    .appendTo(flipswitch);

            $.extend(this, {
                flipswitch: flipswitch,
                on: on,
                off: off,
                type: type
            });
        },

        _toggle: function(e) {
            var direction = this.flipswitch.hasClass( "ui-flipswitch-active" ) ? "_left" : "_right";
            this[ direction ](e);
            this.on.focus();
        },

        _keydown: function(e) {
            switch (e.which) {
                case $.ui.keyCode.LEFT : this._left(); break;
                case $.ui.keyCode.RIGHT : this._right(); break;
                case $.ui.keyCode.SPACE : this._toggle(); break;
                default : break;
            }
            e.preventDefault();
            e.stopPropagation();
        },

        _setOptions: function( options ) {
            if ( options.theme !== undefined ) {
                var currentTheme = options.theme ? options.theme : "inherit",
                    newTheme = options.theme ? options.theme : "inherit";

                this.widget()
                    .removeClass( "ui-bar-" + currentTheme )
                    .addClass( "ui-bar-" + newTheme );
            }
            if ( options.onText !== undefined ) {
                this.on.text( options.onText );
            }
            if ( options.offText !== undefined ) {
                this.off.text( options.offText );
            }
            if ( options.disabled !== undefined ) {
                this.widget().toggleClass( "ui-state-disabled", options.disabled );
            }
            if ( options.mini !== undefined ) {
                this.widget().toggleClass( "ui-mini", options.mini );
            }
            if ( options.corners !== undefined ) {
                this.widget().toggleClass( "ui-corner-all", options.corners );
            }

            this._super( options );
        },

        _destroy: function() {
            if ( this.options.enhanced ) {
                return;
            }
            if ( this._originalTabIndex != null ) {
                this.element.attr( "tabindex", this._originalTabIndex );
            } else {
                this.element.removeAttr( "tabindex" );
            }
            this.on.remove();
            this.off.remove();
            this.element.unwrap();
            this.flipswitch.remove();
            this.removeClass( "ui-flipswitch-input" );
        }
    });
}));