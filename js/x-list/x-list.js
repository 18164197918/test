/* ========================================================================
 * XStyle: Xlist.js v1.0
 * ========================================================================
 * Copyright 2018.1.24 gzx Inc.
 * ======================================================================== */
+function($){
	
	var Xlist = function(element, options){
		this.xlist ='grid'
		this.wrap = $(element) //gridStyle
		this.item = $(element).find(".x-list-item")
		this.options = options
	}
	
	Xlist.DEFAULTS = {
		xlist: 'grid',//{'grid', 'column', 'list'}
	    format: '1' ,  //format{ 1:center, 2: between , 3: enlarge}
	    item: '300',//item width
	    minleft: '5'//marginLeft
	}
	
	//toggle format only for gridStyle
	Xlist.prototype.toggle = function(){
		var that = this;
		console.log("KKKKKKK");
		console.log(that)
		if(that.options.xlist == 'grid'){
			var _seeW   = that.wrap.width();
			var _itemW  = that.item.outerWidth();//当前宽度
			var _origW  = that.options.item; //原始宽度
			var col     = Math.floor(_seeW / _origW) ;
			console.log(_seeW+";;;;_seeW");
			console.log(_origW+";;;;_origW");
			var minLft  = that.options.minleft;
			var grid_class = ".x"+ that.options.xlist + "format";
			if(that.options.format == 2){
				var dnum      = col + 1;
				console.log(dnum+";;;;dnum");
				var item_left = (_seeW - col * _origW)/dnum;
				console.log(item_left+";;;;item_left");
				item_left     = ( item_left == 0 ) ? _origW/col : item_left;
				that.wrap.css({'paddingLeft': 0});
				that.item.css({'width': _origW+ 'px'});
				that.item.css({'marginLeft': item_left});
			}else if(that.options.format == 3){
				var enlge_w  =  (_seeW - col * _origW - (col-1) * minLft)/col;
				var new_w    =  _origW + enlge_w;
				that.wrap.css({'paddingLeft': 0});
				that.item.each(function(index,item){
					 var col_idx  = index % col;
					 $(this).css({'marginLeft': 0});
					 $(this).css({'width': new_w+ 'px'});
					 if(col_idx != 0){
					 	$(this).css({'marginLeft': minLft + 'px'});
					 }
				});
			}else{//1
				var side_dis =  (_seeW - col * _origW - (col-1)* minLft)/2;
				if(side_dis <= 0){
					col = col > 1 ? col-- : col;
					side_dis =  (_seeW - col * _origW - (col-1)* minLft)/2;
				}
				that.item.css({'width': _origW + 'px'});
				that.wrap.css({'paddingLeft': side_dis+'px'});
				that.item.each(function(index,item){
					 var col_idx = index % col;
					 $(this).css({'marginLeft': 0});
					 if(col_idx != 0){
					 	$(this).css({'marginLeft': minLft + 'px'});
					 }
				});
			}
		}
	}
	
	function Plugin(option, _relatedTarget) {
	    return this.each(function () {
	      var $this   = $(this)
	      var options = $.extend({}, Xlist.DEFAULTS, $this.data(), typeof option == 'object' && option)
	      var data  = new Xlist(this, options);
	      if (typeof option == 'string') data[option]()
	      else if (options.format) data.toggle()
	    })
	}

	var old = $.fn.xlist
	
	$.fn.xlist             = Plugin
	$.fn.xlist.Constructor = Xlist
	
	$.fn.xlist.noConflict = function () {
	    $.fn.xlist = old
	    return this
	}
	
	//XList DATA-API
	$(window).resize(function(){
		 $('.x-grid-format').each(function(index, item){
		 	  var opts = $(item).data();
		 	  var data = $(item).data('bs.xlist')
			  var wrap_obj = new Xlist($(this), data.options);
 	  		  if(data.options.format)	wrap_obj.toggle();
		 });
	});
}(jQuery);
