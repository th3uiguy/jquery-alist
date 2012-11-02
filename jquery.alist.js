/**
* jQuery aList
*
* @fileoverview Adds basic hover and key-press actions to a list.
* @link https://github.com/th3uiguy/jquery-alist
* @author Spencer Neese
* @version 0.6
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
		filter: ":hidden",
		activeClass: "al-item-active",
		keyDownHandle: window,
		select: null
	},

	_create: function(){
		var self = this;
		var $self = $(this.element);
		var opts = this.options;
		var $container = $(opts.container);

		var $items = self.$items = $self.addClass('al-list').find('>li')
		$items.addClass('al-item');
		if(typeof opts.select === "function") $items.addClass('al-item-clickable');

		if($container.size() === 0) $container = $self;
		self.$container = $container;
		self.$current = null;
		$container.on({
			"mouseenter.alist": function(){ self._setActive($(this)); },
			"mouseleave.alist": function(){ 
				$(this).removeClass(opts.activeClass);
				self.$current = null;
			},
			"click.alist": function(ev){ if(typeof opts.select === "function") opts.select(this, ev) }
		}, 'li.al-item');

		$(opts.keyDownHandle).bind("keydown.alist", function(ev){ 
			ev.stopPropagation();
			self._onKeyDown(self, ev); 
		});
	},

	destroy: function(){
		var self = this;
		var $self = $(this.element);

		self.$container.off(".alist");
		$(self.options.keyDownHandle).unbind("keydown.alist");

		$self.removeClass('al-list').find('>li')
			.removeClass('al-item')
			.removeClass(self.options.activeClass)
			.removeClass('al-item-clickable');
		
		$.Widget.prototype.destroy.call(self);
	},

	_getCurrent: function(){
		if(this.$current !== null) return this.$current;
		else return this.$current = $([]);
	},

	_getSize: function(){
		return this._getItems().not(this.options.filter).size();
	},

	_getNext: function(){
		var $current = this._getCurrent();
		if($current.size() > 0) return this._getCurrent().nextAll().not(this.options.filter).first();
		else return this._getItems().first();
	},

	_getPrev: function(){
		var $current = this._getCurrent();
		if($current.size() > 0) return this._getCurrent().prevAll().not(this.options.filter).first();
		else return this._getItems().last();
	},

	_getItems: function(index){
		return (typeof index !== "undefined")? this.$items.not(this.options.filter).eq(index) : this.$items.not(this.options.filter);
	},

	_setActive: function($element){
		this.$items.removeClass(this.options.activeClass);
		$element.addClass(this.options.activeClass);
		return this.$current = $element;
	},

	_onKeyDown: function(self, ev){
		var keyCode = ev.which;
		switch(keyCode){
			case 38: //Up arrow
				self._setActive(self._getPrev());
				break;
			case 40: //Down arrow
				self._setActive(self._getNext());
				break;
			case 13: //Enter key
				var current = self._getCurrent().not(this.options.filter);
				if(current.size() > 0 && typeof self.options.select === "function"){
					self.options.select(current, ev);
				}
				break;
		}
	}

});
})(jQuery);
