 $(".x-leftnav").on("click",".submenu li",function(){
	var ord=$(this).parent().find("li").index(this);
	$(this).parent().find('.submenu-item').removeClass("active");
	$(this).parent().find('.submenu-item').eq(ord).addClass("active");
})

//文档代码展示
$('.x-code-show-botton').click(function(){
	$(this).toggleClass('x-code-slide').prev().slideToggle();
	$('.x-code-show-botton').find('span').html('显示代码');
	$('.x-code-show-botton.x-code-slide').find('span').html('隐藏代码');
	
})

//图片加载失败           <img src="'+pic+'" width="320" height="157" onerror="imgerror(this)"/>
function imgerror(img){
	img.src="img/load.jpg";
	img.onerror=null;   //控制不要一直跳动
}
//回显三级栏目
$(function(){
	if($(".submenu .threeSubmenu .secondNav .active").length>0){
		$(".submenu .threeSubmenu .secondNav .active").parent().parent().parent().addClass("active");
	}
})
function addActive(that){
	$(that).parent().find('li').removeClass("active");
	$(that).addClass('active');
}
//点击二级栏目显示三级栏目
function showNav(that){
	$(that).next(".secondNav").slideToggle();
	$(that).find('.ib').toggle();
	$(that).find('.it').toggle();
	$(".submenu li ").removeClass("active");
	$(that).parent().parent().addClass("active");
}
//初始化地图
function initMap(longitude,latitude,adress,level,isZoom,name){   //经度，纬度，公司地址，放大级别,是否允许鼠标滚轮缩放,公司名称
		var map = new BMap.Map("x-map");// 创建地图实例  
		var point = new BMap.Point(longitude, latitude);// 创建点坐标  
		map.centerAndZoom(point, level);       // 初始化地图，设置中心点坐标和地图级别  
		var lng=null;  //当前的经度
		var lat=null; //当前的纬度
	    var geolocation = new BMap.Geolocation();
		geolocation.getCurrentPosition(function(r){
			if(this.getStatus() == BMAP_STATUS_SUCCESS){
				var mk = new BMap.Marker(r.point);  //标记当前位置
				map.addOverlay(mk);
				lng=r.point.lng;
				lat=r.point.lat;
			}
			else {
				console.log('failed'+this.getStatus());  //获取当前信息错误
			}        
		},{enableHighAccuracy: true})
		
		        //自定义控件   （到这儿去）
		function ZoomControl(){    
		    // 设置默认停靠位置和偏移量  
		    this.defaultAnchor = BMAP_ANCHOR_TOP_RIGHT;    
		    this.defaultOffset = new BMap.Size(10, 50);    
		}    
		// 通过JavaScript的prototype属性继承于BMap.Control   
		ZoomControl.prototype = new BMap.Control();
	   // 自定义控件必须实现initialize方法，并且将控件的DOM元素返回   
		// 在本方法中创建个div元素作为控件的容器，并将其添加到地图容器中   
		ZoomControl.prototype.initialize = function(map){    
		    // 创建一个DOM元素   
		    var div = document.createElement("div");    
		    // 添加文字说明    
		    div.appendChild(document.createTextNode("到这儿去"));    
		    // 设置样式    
		    div.style.cursor = "pointer";    
		    div.style.color="white";
		    div.style.border = "1px solid gray";    
		    div.style.backgroundColor = "#3b81ff";  
		    div.style["border-radius"]="5px";
		    // 绑定事件，点击一次放大两级    
		    div.onclick = function(e){  
			 var url="http://api.map.baidu.com/direction?origin=latlng:"+lat+","+lng+"|name:当前位置&destination=latlng:"+latitude+","+longitude+"|name:"+name+"&mode=driving&region=武汉&output=html&src=yourCompanyName|yourAppName";
             console.log(url);
          	 window.open(url,"_blank");
		    
		    }
		    // 添加DOM元素到地图中   
		    map.getContainer().appendChild(div);    
		    // 将DOM元素返回  
		    return div;    
		 }
	    // 创建控件实例    
		var myZoomCtrl = new ZoomControl();    
		// 添加到地图当中    
		map.addControl(myZoomCtrl);
		
		
		
		var marker = new BMap.Marker(point);        	 // 创建标注    
		map.addOverlay(marker);                    		 // 将标注添加到地图中
		map.enableScrollWheelZoom(isZoom);    			 //开启鼠标滚轮缩放
		map.addControl(new BMap.NavigationControl());    //平移缩放控件
//	map.addControl(new BMap.ScaleControl());       		 //比例尺
		map.addControl(new BMap.MapTypeControl());    	 //地图类型
		map.setCurrentCity("武汉");                       // 仅当设置城市信息时，MapTypeControl的切换功能才能可用 
		var opts = {    
		    width : 250,     // 信息窗口宽度    
		    height: 100,     // 信息窗口高度    
		}    
		var infoWindow = new BMap.InfoWindow("公司地址:"+adress, opts);  // 创建信息窗口对象    
		map.openInfoWindow(infoWindow, map.getCenter());      // 打开信息窗口
		}

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
		if(that.options.xlist == 'grid'){
			var _seeW   = that.wrap.width();
			var _itemW  = that.item.outerWidth();//当前宽度
			var _origW  = that.options.item; //原始宽度
			var col     = Math.floor(_seeW / _origW) ;
			var minLft  = that.options.minleft;
			var grid_class = ".x"+ that.options.xlist + "format";
			if(that.options.format == 2){
				var dnum      = col + 1;
				var item_left = (_seeW - col * _origW)/dnum;
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
	      var data    = $this.data('bs.xlist')
	      var options = $.extend({}, Xlist.DEFAULTS, $this.data(), typeof option == 'object' && option)
	      if (!data) $this.data('bs.xlist', (data = new Xlist(this, options)))
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
/* ================================x-list end===================================== */
	//点击图片 相册预览
	$(function() {
		
		$(document).on('click','.x-btn-click', function() {
			$('.x-box-bg').show();
		});
		var index = 0,
		len = $('.x-photo>ul>li').length,
		arr = ['图片1描述','图片2描述','图片3描述','图片4描述','图片5描述'];
		// 向右点击
		$(document).on('click', '.next',function() {
			index++;
			if(index > (len-1)) index = (len-1);
			elementChange('.x-photo>ul>li','.x-curPage','.x-totalPage','.x-photo-desc');
		});
		
		// 向左点击
		$(document).on('click', '.prev',function() {
			index--;
			if(index < 0) index = 0;
			elementChange('.x-photo>ul>li','.x-curPage','.x-totalPage','.x-photo-desc');
		});
		
		function elementChange(imgBox,curNum,totalNum,curDesc){
			$(imgBox).eq(index).show().siblings().hide();
			$(curNum).text(index+1);
			$(totalNum).text(len);
			$(curDesc).text(arr[index]);
		}
		
		// close关闭相册
		$(document).on('click','.x-photo-close', function() {
			$(this).closest('.x-box-bg').fadeOut();
		});
		
		// 鼠标移入图片,箭头显示
		$('body').on('mouseover', function() {
			$('.x-arrow>a').show();
		}).on('mouseout', function() {
			$('.x-arrow>a').hide();
		});
				
	
	});
	
	
//	4.28 瀑布流 start
		// $(window).resize(function(){
		// 	$('#brand-waterfall').waterfall();
		// });
		// $(function(){
		// 	$('#brand-waterfall').waterfall();
		// });
		// 瀑布流插件
		// pannysp 2013.4.9
		;(function ($) {
		    $.fn.waterfall = function(options) {
		        var df = {
		            item: '.item',
		            margin: 0,
		            addfooter: true
		        };
		        options = $.extend(df, options);//参数
		        return this.each(function() {
		            var $box = $(this), pos = [],
		            _box_width = $box.width(),//大盒子宽度
		            $items = $box.find(options.item),
		            //_owidth = $items.eq(0).outerWidth() + options.margin,//item宽度
		           // _oheight = $items.eq(0).outerHeight() + options.margin,//item高度
		          	_owidth = Math.floor($items.eq(0).outerWidth()),//item宽度
		           	_oheight = Math.floor($items.eq(0).outerHeight()),//item高度
		            _num = Math.floor(_box_width/_owidth);//列数
		            
					//	列表间距
		            options.margin = Math.floor((_box_width - (_num*_owidth))/(_num-1));
		            _owidth =Math.floor(_owidth + options.margin) ;////item宽度+间距
		            
		            (function() {
		                var i = 0;
		                for (; i < _num; i++) {
		                	
		                    pos.push([i*_owidth,0]);
		                } 
		            })();
		            $items.each(function() {
		                var _this = $(this),
		                _temp = 0,
		                
		                _height =Math.floor( _this.outerHeight() + options.margin);
		                _this.hover(function() {
		                    _this.addClass('hover');
		                    
		                },function() {
		                    _this.removeClass('hover');
		                });
		                for (var j = 0; j < _num; j++) {
		                    if(pos[j][1] < pos[_temp][1]){
		                    	
		                        //暂存top值最小那列的index
		                        _temp = j;
		                    }
		                }
		                this.style.cssText = 'left:'+pos[_temp][0]+'px; top:'+pos[_temp][1]+'px;';
		                
		                //插入后，更新下该列的top值
		                pos[_temp][1] = pos[_temp][1] + _height;
		            });
		            // 计算top值最大的赋给外围div
		            (function() {
		                var i = 0, tops = [];
		                for (; i < _num; i++) {
		                    tops.push(pos[i][1]);
		                }
		                tops.sort(function(a,b) {
		                    return a-b;
		                });
		                $box.height(tops[_num-1]);
		                //增加尾部填充div
		                if(options.addfooter){
		                    addfooter(tops[_num-1]);
		                }
		            })();
		            //增加尾部填充div
		            function addfooter(max) {
		                var addfooter = document.createElement('div');
		                addfooter.className = 'item additem';
		                for (var i = 0; i < _num; i++) {
		                    if(max != pos[i][1]){
		                        var clone = addfooter.cloneNode(),
		                        _height = max - pos[i][1] - options.margin;
		                        clone.style.cssText = 'left:'+pos[i][0]+'px; top:'+pos[i][1]+'px; height:'+_height+'px;';
		                        $box[0].appendChild(clone);
		                    }
		                }
		            }
	
		        });
		    }
		})(jQuery);
//	4.28 瀑布流 end

//省略号分页 start
(function($){
	var ms = {
		init:function(obj,args){
			return (function(){
				ms.fillHtml(obj,args);
				ms.bindEvent(obj,args);
			})();
		},
		//填充html
		fillHtml:function(obj,args){
			return (function(){
				obj.empty();
				//上一页
				if(args.current > 1){
					obj.append('<a href="javascript:;" class="prevPage"><上一页</a>');
				}else{
					obj.remove('.prevPage');
					obj.append('<span class="disabled"><上一页</span>');
				}
				//中间页码
				if(args.current != 1 && args.current >= 4 && args.pageCount != 4){
					obj.append('<a href="javascript:;" class="tcdNumber">'+1+'</a>');
				}
				if(args.current-2 > 2 && args.current <= args.pageCount && args.pageCount > 5){
					obj.append('<span>...</span>');
				}
				var start = args.current -2,end = args.current+2;
				if((start > 1 && args.current < 4)||args.current == 1){
					end++;
				}
				if(args.current > args.pageCount-4 && args.current >= args.pageCount){
					start--;
				}
				for (;start <= end; start++) {
					if(start <= args.pageCount && start >= 1){
						if(start != args.current){
							obj.append('<a href="javascript:;" class="tcdNumber">'+ start +'</a>');
						}else{
							obj.append('<span class="current">'+ start +'</span>');
						}
					}
				}
				if(args.current + 2 < args.pageCount - 1 && args.current >= 1 && args.pageCount > 5){
					obj.append('<span>...</span>');
				}
				if(args.current != args.pageCount && args.current < args.pageCount -2  && args.pageCount != 4){
					obj.append('<a href="javascript:;" class="tcdNumber">'+args.pageCount+'</a>');
				}
				//下一页
				if(args.current < args.pageCount){
					obj.append('<a href="javascript:;" class="nextPage">下一页></a>');
				}else{
					obj.remove('.nextPage');
					obj.append('<span class="disabled">下一页></span>');
				}
				obj.append('<span class="pagecount">共'+args.pageCount+'页</span>');
				//跳转页码
				if(args.turndown == 'true'){
					obj.append('<span class="countYe">到第<input type="text" maxlength='+args.pageCount.toString().length+'>页<a href="javascript:;" class="turndown">确定</a><span>');
				}
			})();
		},
		//绑定事件
		bindEvent:function(obj,args){
			return (function(){
				obj.on("click","a.tcdNumber",function(){
					var current = parseInt($(this).text());
					ms.fillHtml(obj,{"current":current,"pageCount":args.pageCount,"turndown":args.turndown});
					if(typeof(args.backFn)=="function"){
						args.backFn(current);
					}
				});
				//上一页
				obj.on("click","a.prevPage",function(){
					var current = parseInt(obj.children("span.current").text());
					ms.fillHtml(obj,{"current":current-1,"pageCount":args.pageCount,"turndown":args.turndown});
					if(typeof(args.backFn)=="function"){
						args.backFn(current-1);
					}
				});
				//下一页
				obj.on("click","a.nextPage",function(){
					var current = parseInt(obj.children("span.current").text());
					ms.fillHtml(obj,{"current":current+1,"pageCount":args.pageCount,"turndown":args.turndown});
					if(typeof(args.backFn)=="function"){
						args.backFn(current+1);
					}
				});
				//跳转
				obj.on("click","a.turndown",function(){
					var page = $("span.countYe input").val();
					if(page>args.pageCount){
						alert("您的输入有误，请重新输入！");
					}
					ms.fillHtml(obj,{"current":page,"pageCount":args.pageCount,"turndown":args.turndown});
					/*if(typeof(args.backFn)=="function"){
						args.backFn(current+1);
					}*/
				});
			})();
		}
	}
	$.fn.createPage = function(options){
		var args = $.extend({
			pageCount : 10,
			current : 1,
			turndown:true,
			backFn : function(){}
		},options);
		ms.init(this,args);
	}
})(jQuery);
//省略号分页 end

/*浮动广告关闭*/
$(document).on('click', ".wrap-adv .adv-close", function() {
	$(this).parents('div.wrap-adv').remove();
});
/*****************************广告部分-end****************/

//手机分享
$(document).on('touchstart','.x-share a',function(){
	$('.x-wfooter-share').addClass('x-wfooter-share-show');
	$('body').css('overflow', 'hidden');
});
$(document).on('touchstart','.share-mask',function(){
	$('.x-wfooter-share').removeClass('x-wfooter-share-show');
	$('body').css('overflow', 'initial');
})
$(document).on('click touchstart','.share-mask',function(){
	$('.x-wfooter-share').removeClass('x-wfooter-share-show');
	$('body').css('overflow', 'initial');
})
//手机分享