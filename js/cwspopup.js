(function($){
	$.CwsPopup = {
		
		win:true,
		/*
		 * $.CwsPopup.Prompt(message,btn);
	 	 * $.CwsPopup.Prompt("成功提交！",true);  //message:提示的信息、btn:是否两秒后自动关闭 
		 * */  
		Prompt: function(message,btn){ //模板   btn:false代表两秒后关闭，btn :true代表不关闭， 默认为false
            var _this =this;
            this.init();
            var win = window;
            if(!this.win){
                win = window.top;
            }
            var _default = {
                message: '请添加提示信息',
                btn:false,
            }
            _default = $.extend(_default, { message: arguments[0] || _default.message, btn: arguments[1] || _default.btn});
            
            var pop_html = 
                 '<div class="x-tips"><div class="x-tips-box">'+
                 '<p>'+_default.message+'</p>'+
            	 '</div></div>'+
            $(win.document.getElementsByTagName("body")[0]).find(".pop-up-container").remove();
            $(win.document.getElementsByTagName("body")[0]).append(pop_html);
            if(_default.btn){
            }else{
            	setTimeout(function(){ 
            		$(".x-tips").remove();
            	},2000)
            }
        },
        /*
		 * $.CwsPopup.Alert("title","message");
	 	 * $.CwsPopup.Alert("提示","未找到栏目相关内容加载！");
		 * 
		 * */
		Alert: function(title, message, callback){
			var _this =this;
			this.init();
			var win = window;
			if(!this.win){
				win = window.top;
			}
			if(typeof callback == 'function' ){
				win['callback'] = callback;
			}
			var _default = {
				title: '提示',
				message: '请添加提示信息'
			}
			_default = $.extend(_default, {title: arguments[0] || _default.title, message: arguments[1] || _default.message});
			var pop_html =  '<div class="pop-up-container md-modal md-effect-2  md-show"><div class="md-content">'+
							'<h3>'+_default.title+'<i class="iconfont pull-right md-close">&#xe619;</i></h3>'+
							'<div><p>'+_default.message+'</p>'+
							'<div class="tc btn-box">'+
							'<input class="btn btn-default btn-alert-callback" type="submit" value="确认"></div></div>'+
							'</div></div>'+
							'<div class="mask-layer z-index-top"></div>';
			$(win.document.getElementsByTagName("body")[0]).on("click",".btn-alert-callback",function(){
				if(typeof callback == 'function' ){
							win.callback();
//							_this.OperateCwsPopup('hide');
				}else{
					_this.OperateCwsPopup('hide');
				}
			});		
			$(win.document.getElementsByTagName("body")[0]).find(".pop-up-container").remove();
			$(win.document.getElementsByTagName("body")[0]).append(pop_html);
		},
		/*
		 * $.CwsPopup.Operate("title","message");
	 	 * $.CwsPopup.Operate("提示","未找到栏目相关内容加载！");
		 * 
		 * */
		Operate: function(title, message, callback){
			var _this =this;
			this.init();
			var win = window;
			if(!this.win){
				win = window.top;
			}
			if(typeof callback == 'function' ){
				win['callback'] = callback;
			}
			var _default = {
				title: '提示',
				message: '请添加提示信息'
			}
			_default = $.extend(_default, {title: arguments[0] || _default.title, message: arguments[1] || _default.message});
			var pop_html =  '<div class="pop-up-container md-modal md-effect-2  md-show"><div class="md-content">'+
							'<h3>'+_default.title+'</h3>'+
							'<div><p>'+_default.message+'</p>'+
							'<div class="tc btn-box">'+
							'<input class="btn btn-default btn-alert-callback" type="submit" value="确认"></div></div>'+
							'</div></div>'+
							'<div class="mask-layer z-index-top"></div>';
			$(win.document.getElementsByTagName("body")[0]).on("click",".btn-alert-callback",function(){
				if(typeof callback == 'function' ){
							win.callback();
//							_this.OperateCwsPopup('hide');
				}else{
					_this.OperateCwsPopup('hide');
				}
			});		
			$(win.document.getElementsByTagName("body")[0]).find(".pop-up-container").remove();
			$(win.document.getElementsByTagName("body")[0]).append(pop_html);
		},
		/*$.CwsPopup.Confirm("title","message",yes);
		 *$.CwsPopup.Confirm("title","message",yes, no);
		 * 
		 * */
		Confirm: function(title, message, yes, no, sureConent, denyConent){
			var _this =this;
			this.init();
			var win = window;
			if(!this.win){
				win = window.top;
			}
			if(typeof yes == 'function'){
				win['yes'] = yes;
			}
			if(typeof no == 'function'){
				win['no'] = no;
			}
			var _default = {
				title: '信息确认',
				message: '请添加提示信息',
				sureConent:'确认',
				denyConent:'取消'
			}
			if(typeof arguments[3] =='function' ){
			 	_default = $.extend(_default, {title: arguments[0] || _default.title, message: arguments[1] || _default.message, sureConent: arguments[4] || _default.sureConent,denyConent: arguments[5] || _default.denyConent });
			}else{ 
				_default = $.extend(_default, {title: arguments[0] || _default.title, message: arguments[1] || _default.message, sureConent: arguments[3] || _default.sureConent,denyConent: arguments[4] || _default.denyConent });
			}
			var pop_html =  '<div class="pop-up-container md-modal md-effect-2 md-show"><div class="md-content">'+
							'<h3>'+_default.title+'<i class="iconfont pull-right md-close">&#xe619;</i></h3>'+
							'<div><p>'+_default.message+'</p>'+
							'<div class="tc btn-box">'+
							'<input id="sure-point" class="btn btn-default btn-alert-callback btn-cwspopSure" type="submit" value="'+_default.sureConent+'" >'+
							'<input id="notsure-point" class="btn btn-default md-close" type="submit" value="'+_default.denyConent+'"></div></div>'+
							'</div></div>'+
							'<div class="mask-layer z-index-top"></div>';
			$(win.document).on("click",function(event){
				 if ($(event.target).hasClass('btn-cwspopSure')) {
		            if(typeof yes == 'function'){
						win.yes();
					}else{
						alert("请填写回调函数");
					}
		        }
			});
//			$(win.document).on("click","#sure-point",function(){
//				if(typeof yes == 'function'){
//						win.yes();
//					}else{
//						alert("请填写回调函数");
//					}
//			});
			$(win.document).on("click","#notsure-point",function(){
				if(typeof no == 'function'){
					win.no();
				} else{
					_this.OperateCwsPopup('hide');
				}
			});	
			$(win.document.getElementsByTagName("body")[0]).find(".pop-up-container").remove();
			$(win.document.getElementsByTagName("body")[0]).append(pop_html);
		},
		/*
		 *$.CwsPopup.OperateCwsPopup('hide');//关闭提示框
		 *$.CwsPopup.OperateCwsPopup('show'); //显示提示框
		 * */
		OperateCwsPopup: function(status){//
			this.init();
			var win = window;
			if(!this.win){
				win = window.top;
			}
		    if(status == 'hide'){
		    	//$(win.document.getElementsByTagName("body")[0]).append(pop_html);
				$(win.document.getElementsByTagName("body")[0]).find("div").hasClass("pop-up-container") &&
				$(win.document.getElementsByTagName("body")[0]).find("div.pop-up-container").siblings('.mask-layer').remove() && 
				$(win.document.getElementsByTagName("body")[0]).find(".pop-up-container").remove();
				$(".x-tips").remove();
				
			}else{
			    console.log("参数填写错误！");	
			}
		},
		init: function(){
			if(window.top != window.self){
				this.win = false;
			}
		}
	}
	
	$("body").on('click','.md-close',function(){
		$("body").find("div").hasClass("pop-up-container") && 	$(".pop-up-container").siblings('.mask-layer').remove() &&  $("body .pop-up-container").remove();
	});
	
	
	/*sign :show /close*/
	/*top: true/false 是否关闭下面的弹窗
	 *$(target).toggleCommModal('close')
	 *$(target).toggleCommModal('show')
	 * $(target).toggleCommModal('')
	 * */
	$.fn.toggleCommModal = function(sign, closeBtm){
		  	var _this = $(this);
		  	var ifr_h = 0;
		  	var md_h = 0;
		  	var top = (closeBtm == false || closeBtm =='') ? false : true;
			if(sign){
//				if(!top){//不关闭false
//					  $(this).addClass('md-show');
//					  $(this).next("div").hasClass('mask-layer') || $(this).after("<div class='mask-layer'></div>");
//					   $(this).next("div.mask-layer").css({'zIndex': '2000'});
//					   $(this).css({'zIndex':'3000'});
//				}else{//关闭
//					if($(this).parents('body').find("div").hasClass('md-show')){
//		        		 $(this).parents('body').find("div.md-show").removeClass('md-show');
//		        	}
//				}
				if(sign == 'show'){
					$(this).addClass('md-show');
			  		$(this).next("div").hasClass('mask-layer') || $(this).after("<div class='mask-layer'></div>");
					if(!top){//2级自定义弹窗存在
						 	$(this).next("div.mask-layer").css({'zIndex': '2000'});
						    $(this).css({'zIndex':'3000'});
					}
				}else if(sign == 'close'){
					if(!top){//2级自定义弹窗存在
						$(this).removeClass('md-show');
						$(this).next("div").hasClass('mask-layer') && $(this).next("div.mask-layer").remove();
//						 	$(this).next("div.mask-layer").css({'zIndex': '2000'});
//						    $(this).css({'zIndex':'3000'});
					}else{
						$(this).parents('body').find("div.md-show").removeClass('md-show');
						$(this).next("div").hasClass('mask-layer') && $("body .mask-layer").remove();
					}
				}
			}
			if(window.top !=window.self){//调整iframe的高度问题
		   		ifr_h = window.top.document.getElementById('RtFrameContent').height || '';
		   		md_h = _this.outerHeight(true);
			   	if(sign == 'show'){
			   		window.top.document.getElementById('RtFrameContent').height = '';
			   		window.top.document.getElementById('RtFrameContent').height = ifr_h < md_h + 150 ? md_h + 150 : ifr_h;
			   		ifr_h != window.top.document.getElementById('RtFrameContent').height ? _this.attr('sign', 'change') : '';
			   		window.parent.toggleBackDrop('show',top);
			   	}else if(sign == 'close'){
			   		if(_this.attr('sign') && _this.attr('sign') == 'change'){
			   			callBackLoadIframe(_this);//重置iframe高度
			   			_this.removeAttr('sign');			
			   		}
			   			window.parent.toggleBackDrop('close',top);
			   	}
		   	 
	   	    }
			
 	}
 	
})(jQuery);
/*cutImg弹出框调整*/
$(document).on('shown.bs.modal',".useupImgbox",function(){
	$(this).toggleCommModal('show');
});

$(document).on('hidden.bs.modal',".useupImgbox",function(){
	$(this).toggleCommModal('close');
})
