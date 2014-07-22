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
    <body>
        <!-- 顶部导航 -->
        <div class="nav">
            <div id="LoginBox" class="login-box"></div>
            <span class="toolbar-button-group">
                <button id="FullscreenButton" data-tip="全屏">
                    <i class="icon icon-fullscreen"></i><span class="des-text">全屏</span>
                </button><button id="GroupBtn" data-tip="组合(ctrl+g)">
                    <i class="icon icon-group"></i>
                    <span class="des-text">组合</span>
                </button><button id="UngroupBtn" data-tip="取消组合(ctrl+shift+g)">
                    <i class="icon icon-ungroup"></i>
                    <span class="des-text">取消组合</span>
                </button><button id="ConfigBtn" data-tip="设置">
                    <i class="icon icon-cog"></i>
                    <span class="des-text">设置</span>
                </button><button id="DelBtn" data-tip="删除(backspace)">
                    <i class="icon icon-trash"></i>
                    <span class="des-text">移除</span>
                </button><button id="TagBtn" data-tip="显示/隐藏标签(ctrl+i)">
                    <i class="icon icon-tag"></i>
                    <span class="des-text">显示/隐藏标签</span>
                </button><button class="btn" id="HideToolbarButton">
                    <i class="icon icon-tag"></i>
                    <span class="des-text">隐藏工具栏</span>
                </button><button class="btn" id="RotateButton">
                    <i class="icon icon-tag"></i>
                    <span class="des-text">调整宽度</span>
                </button>
            </span>
        </div>
        <!-- 组件面板 -->
        <div id="ControlsPanel" class="toolbar"></div>
        <!-- 属性面板 -->
        <div id="PropertiesPanel" class="properties-panel"></div>
        
        <!-- 编辑区 -->
        <div class="viewport">
            <div class="frame-wrapper">
                <div class="context-layer" id="ContextLayer"></div>
                <iframe id="Frame" class="frame" src="about:blank"></iframe>
                <textarea id="DocumentSource" class="document-source"></textarea><!-- 源文件 -->
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