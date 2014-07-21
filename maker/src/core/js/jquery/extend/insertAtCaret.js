(function($) {
	$.fn.insertAtCaret = function (str) {
		return this.each(function () {
			if (document.selection) {
				//IE support
				this.focus();
				document.selection.createRange().text = str;
				this.focus();
			} else if (this.selectionStart || this.selectionStart == '0') {
				//MOZILLA/NETSCAPE support
				var startPos = this.selectionStart,
					endPos = this.selectionEnd,
					scrollTop = this.scrollTop;
				this.value = this.value.substring(0, startPos) + str + this.value.substring(endPos, this.value.length);
				this.focus();
				this.selectionStart = startPos + str.length;
				this.selectionEnd = startPos + str.length;
				this.scrollTop = scrollTop;
			} else {
				this.value += str;
				this.focus();
			}
		});
	};
})(jQuery);