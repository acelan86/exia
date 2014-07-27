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
    </head>
    <body>
        {{{body}}}
        <script>
            // $('[data-type]').each(i, control) {
            //     // var $control = $(control),
            //     //     type = $control.data('type').toLowerCase();
            //     // console.log(type);
            //     // //$control[type]();
            // });
            //console.log($('[data-type]'));
            var controls = $('[data-type]');
            for (var i = 0, len = controls.length; i < len; i++) {
                var control = $(controls[i]);
                var type = control.data('type').toLowerCase();
                //console.log(type);
                control[type]();
            }
        </script>
    </body>
</html>