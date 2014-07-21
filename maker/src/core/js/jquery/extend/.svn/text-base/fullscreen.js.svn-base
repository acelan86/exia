jQuery.extend({
    isFullscreen : function () {
        return document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen;
    },
    cancelFullscreen : function () {
        var cancelFullscreenAPI = document.exitFullscreen || document.mozCancelFullScreen || document.webkitCancelFullScreen;
        if (cancelFullscreenAPI) {
            cancelFullscreenAPI.call(document);
            return true;
        } else {
            return false;
        }
    },
    fullscreen : function () {
        var docElm = document.documentElement,
            fullscreenAPI = docElm.requestFullscreen || docElm.mozRequestFullScreen || docElm.webkitRequestFullScreen;
        if (fullscreenAPI) {
            fullscreenAPI.call(docElm, Element && Element.ALLOW_KEYBOARD_INPUT);
            return true;
        }
        return false;
    },
    toggleFullscreen : function () {
        return this.isFullscreen() ? this.cancelFullscreen() : this.fullscreen();
    }
});

jQuery.extend({
    upperCaseFirst : function (s) {
        return s.charAt(0).toUpperCase() + s.substring(1);
    }
});

jQuery.extend({
    move : function (array, pos, to) {
        array.splice(to, 0, array.splice(pos, 1)[0]);
        return array;
    }
});