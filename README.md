jQuery aList
====================
By: Spencer Neese [https://github.com/th3uiguy/](https://github.com/th3uiguy/)   
Version: 0.6   
Requires: jQuery UI 1.7+ and jQuery 1.3.2+   
Demo: [http://jsfiddle.net/th3uiguy/ggm5u/](http://jsfiddle.net/th3uiguy/ggm5u/)   
Git: [https://github.com/th3uiguy/jquery-alist.git](https://github.com/th3uiguy/jquery-alist.git)   


Description
---------------------
Adds basic hover and key-press actions to a list.




Example
---------------------
```js
$('ul.aList').alist({
	select: function(element, event){
		alert("You selected " + $(element).html());
	}
});
```



Options
---------------------
#### container ####
*type: jQuery Object or Selector*   
*default: uses self as the container*

#### select ####
*type: function*   
*default: null*




<br /><br />
Copyright (c) 2012, Spencer Neese [https://github.com/th3uiguy/](https://github.com/th3uiguy/)   
Dual licensed under the 
[MIT](https://raw.github.com/th3uiguy/jquery-alist/master/MIT-LICENSE.txt) or 
[GPL](https://raw.github.com/th3uiguy/jquery-alist/master/GPL-LICENSE.txt) Version 2 licenses. 
