(function ($) {
    var iframeId = 'postIframeId';
    
    function getContent(url, postName, postValue, target) {
        return ['<html><head></head><body>',
                    '<script type="text/javascript">',
                        'window.onload = function(){',
                            'var form = document.getElementById("__PostIframeForm__");',
                            'form.submit();',
                        '};',      
                    '</script>',
                    '<form id="__PostIframeForm__" method="POST" action="' + url + '" target="' + target + '">',
                        '<textarea name="' + postName + '">' + postValue + '</textarea>',
                '</form></body></html>'].join('');
    };

    /**
     * iframe内容字符串的转义
     */
    function escapeIframeContent(source) {
        return source.replace(/\\/g, "\\\\").replace(/\"/g, "\\\"");
    }

    /**
     * getIframe
     */
    function getIframe(){
        var iframe = document.getElementById(iframeId);
        if(!iframe){
            var iframe = document.createElement('iframe'),
            size = 1,
            pos = '-1000px';

            iframe.id = iframeId;
            iframe.width = size;
            iframe.height = size;
            iframe.src = "about:blank";
            iframe.style.position = "absolute";
            iframe.style.top = pos;
            iframe.style.left = pos;
            document.body.appendChild(iframe);
        }
        return iframe;
    }
    $.extend({
        iframepost : function (url, options) {
            var params = options.params || '',
                target = options.target || '',
                callbackName = options.callbackName,
                postName = options.postName || '__PostIframeName__',
                iframe = getIframe();

            iframeDoc = iframe.contentWindow.document;
            iframeDoc.open('text/html');
            iframeDoc.write(
                getContent(
                    escapeIframeContent(url),
                    postName,
                    params + (callbackName ? "&__callbackName__=" + callbackName : ''),
                    target
                )
            );
            iframeDoc.close();
        }
    });
})(jQuery);