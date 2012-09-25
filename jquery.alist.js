/**
* jQuery aList
*
* @fileoverview Adds basic hover and key-press actions to a list.
* @link https://github.com/th3uiguy/jquery-alist
* @author Spencer Neese
* @version 0.5
* @requires jQuery UI 1.7+ and jQuery 1.3.2+
* @license jQuery aList Plug-in
*
* Copyright 2012, Spencer Neese
* Dual licensed under the MIT or GPL Version 2 licenses.
* <https://raw.github.com/th3uiguy/jquery-alist/master/GPL-LICENSE.txt>
* <https://raw.github.com/th3uiguy/jquery-alist/master/MIT-LICENSE.txt>
*/

;(function($) {
$.widget( "ui.alist", {

	options: {
		container: null,
		select: null
	},

	_create: function(){
		var self = this;
		var $self = $(this.element);
		var opts = this.options;
		var $container = $(opts.container);

		var $items = this.$items = $self.addClass('al-list').find('>li')
		$items.addClass('al-item');
		if(typeof opts.select === "function") $items.addClass('al-item-clickable');

		if($container.size() === 0) $container = $self;
		this.$container = $container;
		$container.on({
			"mouseenter.alist": function(){ self._setActive($(this)); },
			"mouseleave.alist": function(){ 
				$(this).removeClass('al-item-active'); 
				self.$current = null;
			},
			"click.alist": function(ev){ if(typeof opts.select === "function") opts.select(this, ev) }
		}, 'li.al-item');

		$(window).bind("keydown.alist", function(ev){ self._onKeyDown(self, ev); });
	},

	destroy: function(){
		var self = this;
		var $self = $(this.element);

		self.$container.off(".alist");
		$(window).unbind("keydown.alist");

		$self.removeClass('al-list').find('>li')
			.removeClass('al-item')
			.removeClass('al-item-active')
			.removeClass('al-item-clickable');
		
		$.Widget.prototype.destroy.call( this );
	},

	_getCurrent: function(){
		return this.$current;
	},

	_getCurrentIndex: function(){
		var current = this._getCurrent();
		if(typeof current === "undefined" || current === null) return -1;
		else return current.index();
	},

	_getSize: function(){
		return this._getItems().size();
	},

	_getItems: function(index){
		return (typeof index !== "undefined")? this.$items.eq(index) : this.$items;
	},

	_setActive: function($element){
		this.$items.removeClass('al-item-active');
		$element.addClass('al-item-active');
		return this.$current = $element;
	},

	_onKeyDown: function(self, ev){
		var keyCode = ev.which;
		switch(keyCode){
			case 38: //Up arrow
				var index = self._getCurrentIndex();
				if(index > 0){
					self._setActive(self._getItems(index - 1));
				}
				break;
			case 40: //Down arrow
				var newIndex = self._getCurrentIndex() + 1;
				if(newIndex < self._getSize()){
					self._setActive(self._getItems(newIndex));
				}
				break;
			case 13: //Enter key
				var current = self._getCurrent();
				if(typeof current !== "undefined" && current !== null && typeof self.options.select === "function"){
					self.options.select(current, ev);
				}
				break;
		}
	}

});
})(jQuery);
