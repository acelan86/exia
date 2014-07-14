<!doctype html>
<html>
    <head>
        <meta charset="utf-8">
        <title> exia </title>
        <link type="text/css" rel="stylesheet" href="/combo~{{{coreCSS}}}">
        <!-- controls css开始 -->
        <link type="text/css" rel="stylesheet" href="/combo~{{{externalFiles.css}}}">
        <!-- controls css结束 -->
        <!-- editors css开始 -->
        <link type="text/css" rel="stylesheet" href="/combo~{{{editorExternalFiles.css}}}"> 
        <!-- editors css结束 -->
        <link type="text/css" rel="stylesheet" href="/static/core/css/maker.css">
    </head>
    <body>
        <!-- 顶部导航 -->
        <div class="nav">
            <button class="btn" id="HideToolbarButton" style="float:right;">hide toolbar</button>
            <button class="btn" id="RotateButton" style="float:right;">rotate</button>
        </div>
        <!-- 组件面板 -->
        <div class="toolbar">
            <!-- <div><input type="text" id="WidgetSearchInput"/></div> -->
            <ul>
                {{#each controls}}
                    <li class="control-icon" data-tn="{{name}}">{{text}}</li>
                {{/each}}
            </ul>
        </div>
        <!-- 编辑区 -->
        <div class="viewport">
            <div class="center-helper">
                <div class="frame-wrapper">
                    <div class="context-layer" id="ContextLayer"></div>
                    <div id="FrameDDMaskLayer" class="frame-dd-mask-layer"></div>
                    <!-- 拖拽遮罩层，用于防止鼠标时间进入iframe后失去事件导致的拖拽不流畅，防止需要在iframe和外部都写一边拖拽结束代码，同时该层可以用于定位 -->
                    <iframe id="DocumentFrame" class="document-frame" src="/site/blank"></iframe>
                    <textarea id="DocumentSource" class="document-source"></textarea><!-- 源文件 -->
                </div>
            </div>
        </div>

        <!-- controls 模板开始 -->
        {{#each templates}}
            <script type="text/x-handlebars-template" id="{{name}}ControlTemplate">
                {{{content}}}
            </script>
        {{/each}}
        <!-- controls 模板结束 -->

        <!-- editor 模板开始 -->
        {{#each editorTemplates}}
            <script type="text/x-handlebars-template" id="{{name}}EditorTemplate">
                {{{content}}}
            </script>
        {{/each}}
        <!-- editor 模板结束 -->

        <script src="/combo~{{{coreJS}}}"></script>
        <!-- controls js开始 -->
        <script src="/combo~{{{externalFiles.js}}}"></script>
        <!-- controls js结束 -->
        <!-- editors js开始 -->
        <script src="/combo~{{{editorExternalFiles.js}}}"></script>
        <!-- editors js结束 -->
        <script src="/static/maker.js"></script>
        <script>
            //根据是否有站点id获取站点数据进行初始化
            (function () {

            })()
        </script>
    </body>
</html>