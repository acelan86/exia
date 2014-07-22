exia.define('Builder.Login', function (require, exports, module) {
    "use strict";
    var _ = window._,
        Backbone = window.Backbone;

    var DEFAULT_AVATAR = 'http://tp4.sinaimg.cn/2832020747/180/0/1';

    function Login(dom) {
        var me = this;

        _.extend(this, Backbone.Events);
        this.dom = $(dom);
        this.avatar = 
            $('<img class="avatar" src="' + DEFAULT_AVATAR + '" />')
                .appendTo(this.dom);
        this.info =
            $('<span class="info">正在检查登陆...</span>')
                .appendTo(this.dom);

        this.dialog = $('<div class="login-dialog">')
            .html([
                '<form action="#" class="form-left-label" method="post">',
                    '<div class="form-row">',
                        '<label>username</label>',
                        '<div class="form-control">',
                            '<input class="ui-input username" type="text"/>',
                        '</div>',
                    '</div>',
                    '<div class="form-row">',
                        '<label>password</label>',
                        '<div class="form-control">',
                            '<input class="ui-input password" type="password"/>',
                        '</div>',
                    '</div>',
                    '<div class="form-row pin-block" style="display:none;">',
                        '<label>pincode</label>',
                        '<div class="form-control">',
                            '<input class="ui-input pin-input" type="text" style="float:left;width:50px" placehodler="验证码"/><span class="pin-pic" style="margin-left:5px;"></span>',
                        '</div>',
                    '</div>',
                '</form>'
            ].join(''))
            .appendTo($('body'))
            .dialog({
                title : '登录',
                autoOpen : false,
                modal : true,
                resizable : false,
                buttons : [ 
                    {
                        'text' : '重置',
                        'click' : function () {
                            me.form[0].reset();
                        }
                    },
                    { 
                        'text' : '登录',
                        'click' : function () {
                            me.form.submit();
                        },
                        'class': 'ui-state-em'
                    }
                ]
            });

        this.dom.delegate('.login-btn', 'click', function (e) {
            me.open();
        });
        this.dom.delegate('.logout-btn', 'click', function (e) {
            me.logout();
        });

        this.form = $('form', this.dialog)
            .submit(function (e) {
                e.preventDefault();
                me.doLogin();
            });

        $('.pin-pic', this.dialog)
            .click(function () {
                me.pinCode(1);
            });


        this.init();
    }

    Login.prototype.init = function () {
        this.checkSSO(function () {
            this.autoLogin();
        });
    };

    Login.prototype.checkSSO = function (cb) {
        var me = this;
        if ('undefined' === typeof sinaSSOController) {
            $.getScript('http://i.sso.sina.com.cn/js/ssologin.js', function () {
                (function() {
                    this.entry = 'adbox'; // 本产品的标识 
                    this.setDomain = false;
                    this.customLoginCallBack = function(status) { // 登录回调代码 
                        //console.debug(status);
                        if (status && status.result) {
                            me.login(status.userinfo);
                            me.dialog.dialog('close');
                        } else {
                            me.noLogin();
                            if (status.errno == "4049") {
                                $.alert(status.reason);
                                me._pinCode(1);
                            } else {
                                if (status.errno == "2070") {
                                    me._pinCode(1);
                                }
                                $.alert(status.reason || "登录失败，请重试");
                            }
                        }
                    };
                    this.customLogoutCallBack = function(status) {
                        if (status && status.result) {
                            me.noLogin();
                        }
                    };
                }).call(sinaSSOController);

                cb.call(me);
            });
        } else {
            cb.call(me);
        }
    };
    Login.prototype.pinCode = function (needPin) {
        var pinBlock = $('.pin-block', this.dialog),
            pinPic = $('.pin-pic', this.dialog),
            pinInput = $('.pin-input', this.dialog);

        this.needPin = needPin;
        if (needPin) {
            pinPic.html('<img src="' + sinaSSOController.getPinCodeUrl() + '" alt="点击换一个">');
            pinInput.val();
            pinBlock.show();
        } else {
            sinaSSOController.loginExtraQuery['door'] = '';
            pinBlock.hide();
        }
    };
    Login.prototype.noLogin = function () {
        this.avatar.attr('src', DEFAULT_AVATAR);
        this.msg('<a href="#" class="login-btn">登录</a>');
    };
    Login.prototype.login = function (status) {
        this.avatar.attr('src', 'http://tp4.sinaimg.cn/' + status.uid + '/180/0/1');
        this.msg('你好，' + status.nick + ' <a href="javascript:;" class="logout-btn">退出</a>');
    };
    Login.prototype.msg = function (msg) {
        this.info.html(msg);
    };
    Login.prototype.logout = function () {
        this.msg('正在退出...');
        sinaSSOController.logout();
    };
    Login.prototype.autoLogin = function () {
        var me = this;
        this.msg('正在检查登录状态...');
        sinaSSOController.autoLogin(function(status) {
            if (status == null) {
                me.noLogin();
            } else {
                me.login(status);
            }
        });
    };

    Login.prototype.open = function () {
            //this._reset();
        this.dialog.dialog('open');
    };
    Login.prototype.reset = function () {
        $('.username', this.dialog).val('');
        $('.password', this.dialog).val('');
        $('.pin-input', this.dialog).val('');
        this.pinCode(0);
    };
    Login.prototype.doLogin = function () {
        var nv = $('.username', this.dialog).val(),
            pv = $('.password', this.dialog).val(),
            pinv = $('.pin-input', this.dialog).val();

        this.msg('正在登录...');

        if (!nv) {
            $.alert('请填写用户名');
            this.noLogin();
            return;
        }
        if (!pv) {
            $.alert('请填写密码');
            this.noLogin();
            return;
        }
        if (this.needPin) {
            if (!pinv) {
                $.alert('请填写验证码');
                this.noLogin();
                return;
            } else {
                sinaSSOController.loginExtraQuery['door'] = pinv;
            }
        }
        sinaSSOController.login(nv, pv);
    };

    return Login;
});