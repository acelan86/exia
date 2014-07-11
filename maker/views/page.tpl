<!doctype html>
<html lang="zh-cn">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title> Exia Demo </title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="format-detection" content="telephone=no,email=no">
        <link rel="stylesheet" href="/static/page/GMU/reset.css">
        <link rel="stylesheet" href="/static/page/GMU/gmu.css">
        <script src="/static/page/GMU/zepto.js"></script>
        <script src="/static/page/GMU/gmu.js"></script>
        <style>
            .ui-gotop,
            .ui-nav,
            .ui-slider{
                display:block;
            }
            .ui-scroller{
                float:left;
            }
            .glost{
                border:2px dotted #ccc;
                border-radius:4px;
                height:30px;
                margin:3px;
                display:none;
            }
        </style>
    </head>
    <body>
        <div id="WidgetGhost" class="glost widget"></div>
        {{{body}}}
        <script>
            var browser = $.browser;
            var tagInfo = [
                {tagName: "nav",widgetName: "navigator"},
                {tagName: "gotop",widgetName: "gotop"},
                {tagName: "slider",widgetName: "slider"},
                {
                    tagName: "button",
                    widgetName: "button"
                },
                {
                    tagName: "buttongroup",
                    initializer: function () {
                        $('.button').button();
                    }
                }
            ];
            function getDomElementsNs(localName, xmlns) {
                xmlns = xmlns || "exia";
                var ua = navigator.userAgent.toLowerCase();
                var fullName = xmlns + ":" + localName;
                if (browser.ie) {
                    try {
                        var docNamespaces = document.namespaces;
                        if (docNamespaces && docNamespaces[xmlns]) {
                            return document.getElementsByTagName(localName).length == 0 ? document.getElementsByTagName(fullName) : document.getElementsByTagName(localName)
                        }
                    } catch (e) {
                    }
                    return document.getElementsByTagName(fullName)
                } else {
                    if (browser.moz) {
                        return document.getElementsByTagNameNS(document.body.namespaceURI, fullName)
                    } else {
                        return document.getElementsByTagName(fullName)
                    }
                }
            }
            function getDomAttribute(oCustomDom, tagName, xmlns) {
                var prefix = (xmlns || 'exia') + '-';
                var attrArr = oCustomDom.attributes;
                var oAttr = {};
                for (var i = attrArr.length - 1; i >= 0; i--) {
                    var oAttrib = attrArr[i];
                    if (oAttrib.specified) {
                        oAttr[$.camelCase(attrArr[i].name.replace(prefix, ''))] = attrArr[i].value
                    }
                }
                oAttr.dom = oCustomDom;
                oAttr.tagName = tagName;
                return oAttr;
            }
            function initCustomTag() {
                var widgetList = [];
                for (var i = 0, len = tagInfo.length; i < len; i++) {
                    var oTag = tagInfo[i];
                    var tagName = oTag.tagName;
                    var widget = oTag.initializer || oTag.widgetName;
                    var cDomList = getDomElementsNs(tagName);
                    for (var j = 0, wlen = cDomList.length; j < wlen; j++) {
                        widgetList.push({
                            tag: tagName,
                            widget: widget,
                            params: getDomAttribute(cDomList[j], tagName)
                        });
                    }
                }
                var len = widgetList.length;
                if (len > 0) {
                    for (var i = 0, len = widgetList.length; i < len; i++) {
                        var oWidget = widgetList[i];
                        (function(ow) {
                            setTimeout(function() {
                                'function' === typeof ow.widget ?
                                    ow.widget(ow.params) :
                                    $(ow.params.dom)[ow.widget](ow.params);
                            }, i * 50)
                        })(oWidget);
                    }
                }
            }
        </script>
        <script>
            (function() {
                try {
                    if (document.namespaces && !document.namespaces.item.exia) {
                        document.namespaces.add("exia");
                    }
                } catch (e) {}
            }());
            $(function() {
                initCustomTag();
            });
        </script>
        <script>
            var FrameAPI = {
                initWidget : function (id) {
                    var dom = document.getElementById(id),
                        tagName = dom.tagName.toLowerCase().replace('exia:', ''),
                        params = getDomAttribute(dom, tagName),
                        oTag,
                        widget;
                    for (var i = 0, len = tagInfo.length; i < len; i++) {
                        if (tagInfo[i].tagName.toLowerCase() === tagName) {
                            oTag = tagInfo[i];
                        }
                    }

                    if (oTag && (widget = oTag.initializer || oTag.widgetName)) {
                        'function' === typeof widget ?
                            widget(params) :
                            $(dom)[widget](params);
                    }
                }
            };
        </script>
    </body>
</html>