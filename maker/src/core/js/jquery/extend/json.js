(function ($) {
    $.json = {};
    $.extend($.json, {
        parse : $.parseJSON,
        stringify : (function () {    
            var escapeMap = {
                "\b": '\\b',
                "\t": '\\t',
                "\n": '\\n',
                "\f": '\\f',
                "\r": '\\r',
                '"' : '\\"',
                "\\": '\\\\'
            };
             
            function encodeString(source) {
                if (/["\\\x00-\x1f]/.test(source)) {
                    source = source.replace(
                        /["\\\x00-\x1f]/g, 
                        function (match) {
                            var c = escapeMap[match];
                            if (c) {
                                return c;
                            }
                            c = match.charCodeAt();
                            return "\\u00"
                                    + Math.floor(c / 16).toString(16) 
                                    + (c % 16).toString(16);
                        });
                }
                return '"' + source + '"';
            }
             
            function encodeArray(source) {
                var result = ["["], 
                    l = source.length,
                    preComma, i, item;
                     
                for (i = 0; i < l; i++) {
                    item = source[i];
                     
                    switch (typeof item) {
                    case "undefined":
                    case "function":
                    case "unknown":
                        break;
                    default:
                        if(preComma) {
                            result.push(',');
                        }
                        result.push($.json.stringify(item));
                        preComma = 1;
                    }
                }
                result.push("]");
                return result.join("");
            }
             
            function pad(source) {
                return source < 10 ? '0' + source : source;
            }
             
            function encodeDate(source){
                return '"' + source.getFullYear() + "-" 
                        + pad(source.getMonth() + 1) + "-" 
                        + pad(source.getDate()) + "T" 
                        + pad(source.getHours()) + ":" 
                        + pad(source.getMinutes()) + ":" 
                        + pad(source.getSeconds()) + '"';
            }
             
            return ('undefined' !== typeof JSON && JSON.stringify) || function (value) {
                switch (typeof value) {
                    case 'undefined':
                        return 'undefined';
                         
                    case 'number':
                        return isFinite(value) ? String(value) : "null";
                         
                    case 'string':
                        return encodeString(value);
                         
                    case 'boolean':
                        return String(value);
                         
                    default:
                        if (value === null) {
                            return 'null';
                        } else if ($.isArray(value)) {
                            return encodeArray(value);
                        } else {
                            var result = ['{'],
                                encode = $.json.stringify,
                                preComma,
                                item;
                                 
                            for (var key in value) {
                                if (Object.prototype.hasOwnProperty.call(value, key)) {
                                    item = value[key];
                                    switch (typeof item) {
                                    case 'undefined':
                                    case 'unknown':
                                    case 'function':
                                        break;
                                    default:
                                        if (preComma) {
                                            result.push(',');
                                        }
                                        preComma = 1;
                                        result.push(encode(key) + ':' + encode(item));
                                    }
                                }
                            }
                            result.push('}');
                            return result.join('');
                        }
                    }
                };
            }
        )()
    });
})(jQuery);