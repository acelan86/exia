<!doctype html>
<html>
    <head>
        <meta charset="utf-8">
        <title> exia </title>
        <link type="text/css" rel="stylesheet" href="/combo~{{{coreCSS}}}">
        <!-- editors css开始 -->
        <link type="text/css" rel="stylesheet" href="/combo~{{{editorExternalFiles.css}}}"> 
        <!-- editors css结束 -->
        <link type="text/css" rel="stylesheet" href="/static/css/base.css">
        <link type="text/css" rel="stylesheet" href="/static/css/editor.css">
        <link type="text/css" rel="stylesheet" href="/static/css/maker.css">
    </head>
    <body class="design">
        <!-- 顶部导航 -->
        <div class="nav">
            <div id="LoginBox" class="login-box"></div>
            <span class="toolbar-button-group">
                <button id="FullscreenButton" data-tip="全屏">
                    <i class="icon icon-fullscreen"></i><span class="des-text">全屏</span>
                </button><button id="ConfigBtn" data-tip="设置">
                    <i class="icon icon-cog"></i>
                    <span class="des-text">设置</span>
                </button><button class="btn" id="RotateButton">
                    <i class="icon icon-tag"></i>
                    <span class="des-text">调整宽度</span>
                </button>
            </span>
            <span class="toolbar-button-group">
                <button id="DelBtn" data-tip="删除(backspace)">
                    <i class="icon icon-trash"></i>
                    <span class="des-text">移除</span>
                </button><button id="TagBtn" data-tip="显示/隐藏标签(ctrl+i)">
                    <i class="icon icon-tag"></i>
                    <span class="des-text">显示/隐藏标签</span>
                </button>
            </span>
            <span class="toolbar-button-group">
                <button class="btn" id="PreviewButton">
                    <i class="icon icon-tag"></i>
                    <span class="des-text">预览/设计</span>
                </button><button class="btn" id="SaveButton">
                    <i class="icon icon-tag"></i>
                    <span class="des-text">保存</span>
                </button>
            </span>
        </div>
        <!-- 组件面板 -->
        <div class="left-panel">
            <h3 class="ui-widget-header">页面列表</h3>
            <ul class="page-panel ui-widget-content">
                {{#each pages}}
                    <li data-page-id="{{pid}}">{{pid}}</li>
                {{/each}}
            </ul>
            <h3 class="ui-widget-header">控件列表</h3>
            <ul id="ControlsPanel" class="control-panel ui-widget-content"></ul>
        </div>
        <!-- 属性面板 -->
        <div id="PropertiesPanel" class="properties-panel"></div>
        
        <!-- 编辑区 -->
        <div class="viewport">
            <div class="frame-wrapper">
                <div class="context-layer" id="ContextLayer"></div>
                <iframe id="Frame" src="about:blank" class="frame design-frame"></iframe>
                <iframe id="Preview" src="about:blank" class="frame preview-frame"></iframe>
                <textarea id="DocumentSource" class="document-source"></textarea><!-- 源文件 -->
            </div>
        </div>
        <img id="PreviewQrcode" class="preview-qrcode" src="/static/page/qrcode.png" />

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

        <script src="/static/define.js"></script>
        <script src="/static/Builder/utils/Bounds.js"></script>
        <script src="/static/Builder/Frame.js"></script>
        <script src="/static/Builder/DDController.js"></script>
        <script src="/static/Builder/Control.js"></script>
        <script src="/static/Builder/PropertiesPanel.js"></script>
        <script src="/static/Builder/ControlCollection.js"></script>
        <script src="/static/Builder/Login.js"></script>
        <script src="/static/Builder/Editor.js"></script>
        <!-- controls js开始 -->
        <script src="/combo~{{{externalFiles.js}}}"></script>
        <!-- controls js结束 -->
        <!-- editors js开始 -->
        <script src="/combo~{{{editorExternalFiles.js}}}"></script>
        <!-- editors js结束 -->
        <script src="/static/Builder/Builder.js"></script>
        <script>
            exia.use('Builder', function (Builder) {
                new Builder('#Frame', '', '#ControlsPanel', '#PropertiesPanel', '#LoginBox');
            });
        </script>
    </body>
</html>