(function ($) {
    $.ajaxUpload = function (url, fo, callback) {
        var xhr = new XMLHttpRequest(),
            freader = new FileReader(),
            onLoadHandler = function(event) {
                var code = event.target.responseText;
                if (code.indexOf('<code>') !== -1) {
                    var match = code.match('<code>(.*)</code>');
                    code = (match && match[1] ? match[1] : '');
                }
                if (code) {
                    $.responseParser($.json.parse(code), function (data, all) {
                        callback(data, all);
                    });
                }
            };

        xhr.open('post', url, true);
        xhr.onload = onLoadHandler;

        var fd = new FormData();
        fd.append('filename', fo);
        xhr.send(fd);

        // var boundary = '----OxYZABCddd'; //test boundary
        // xhr.setRequestHeader("Content-Type", "multipart/form-data; boundary=" + boundary);

        // freader.onload = function (e) {

        //     var fileData = e.target.result;
        //     alert(fileData);
        //     var body = '',
        //         CRLF = '\r\n';     
        //     body += '--' + boundary + CRLF;
        //     body += 'Content-Disposition: form-data; name="filename"; filename="' + fo.name + '"'+CRLF;     
        //     body += "Content-Type: " + fo.type + CRLF + CRLF;     
        //     body += fileData + CRLF + '--';     
        //     body += "--" + boundary + "--" + CRLF;  
        //     xhr.send(body);
        // }
        // freader.readAsBinaryString(fo);
    };
})(jQuery);
