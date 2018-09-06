$(function(){
//	新闻列表二级菜单
	$(document).on('click','.newsStyleI',function(ev) {
		$(this).addClass('on').parent().siblings().find('.newsStyleI').removeClass('on');
	})


//	第二种 头部菜单  手机版右侧滑出菜单 start
$('.nav-right-scroll .navbar-header button').click(function(){
	$('.nav-mask').show();
	$('.body-offcanvas>nav').addClass('in');
});
$('.nav-mask').click(function(){
	$(this).hide();
	$('.body-offcanvas>nav').removeClass('in');
});
//	第二种  手机版右侧滑出菜单 end
//手机导航动画
//	$('.navMask_left').click(function(){
//		$('.phoNav').css('display','none');
//		$('body').css({"overflow":"initial","position":"initial"});
//	});
//	
//	$('.navbar-toggle').click(function(){
//		$('.phoNav').show();
//		$('.navp').addClass('animated slideInRight');
//	})

//	首页导航 start
	$(document).on('mouseover','.dropdown',function(){  
		$(this).find('.dropdown-toggle span').addClass('rtt180 rtime');
	}).on('mouseout','.dropdown',function(){  
		$(this).find('.dropdown-toggle span').removeClass('rtt180 rtime');
	});
//	首页导航 end
//	我的服务-账户充值 开始
	$(document).on('click','.Rech li',function(ev) {
		$(this).addClass('RechOn').siblings().removeClass('RechOn');
	})
	$(document).on('click','.otherR input',function(ev) {
		$(this).parent().prev().children().removeClass('RechOn');
	})
//	我的服务-账户充值 结束
	$(document).on('click','.siteweb-s .prevbtn',function(ev) {
		$('.siteweb-f').show().siblings().hide();
	})
	$(document).on('click','.siteweb-t .prevbtn',function(ev) {
		$('.siteweb-s').show().siblings().hide();
	})
	//	用户中心导航
	//############################################页面悬浮客服1样式js开始   		
	//  	返回顶部
		$(document).on("click","#toTop_plg",function(){
			$("html,body").animate({scrollTop:"0px"})
		});
		
	//		鼠标上去左侧滑出
		$(".susp-1-list").hover(function(){
		    $(this).find('.susp-1-first').addClass('l-sd-sld');
		},function(){
		    $(this).find('.susp-1-first').removeClass('l-sd-sld');
		});
	
	//遮罩层
//		$('.susp-mask').height( $('body').height());
		$('.susp-mask').height( window.screen.height);
		$('.susp-mask').width( window.screen.width);

	//电话咨询弹出
		$('.susp-1-fir-box').click(function(){
				$(this).parent().find('.callback').fadeIn();
				$('.susp-mask').fadeIn();
			});
		//关闭遮罩
		$('.susp-close').click(function(){
			var toTop=$(window).scrollTop();
			$(this).parent().parent().parent().fadeOut();
			$('.susp-mask').fadeOut();
		});
		$('.susp-mask').click(function(){
			var toTop=$(window).scrollTop();
			$(this).siblings().find('.callback').fadeOut();
			$(this).fadeOut();
		});
	//############################################页面悬浮客服1样式js结束  	
	//鼠标上去边框
		$('.border-b').click(function(){
			$(this).addClass('rechar-active').siblings().removeClass('rechar-active');
			$('.change_rechar').removeClass('rechar-active');
		});
	//############################################页面悬浮客服1样式结束 	

	// 底部二维码触摸事件
	$(".move>i").on('tap', function() {
		var src = "img/footer",
		curHtml = '<img class="codeImg" src="'+ src + '/code.jpg" alt="" />';
    	$('.layer').show().html(curHtml);
  	}); 
  	$('.layer').on('tap', '.codeImg', function() {
  		$('.layer').hide('fast');
  	});
  	
  	 /*公共的  table checkBox*/
	 $("table").on("click",".ck_all",function(){
	  	$(this).prop("checked") && $("input.ck_all").parents("table").find("input.ck_one").prop("checked", true);
	  	$(this).prop("checked") || $("input.ck_all").parents("table").find("input.ck_one").prop("checked", false);
	 });
	 
	$("table").on("click",".ck_one",function(){
		if($(this).prop("checked")){
			var ck_len = $(this).parents("table").find("tbody .ck_one").length;
			var ck_yes = $(this).parents("table").find("tbody .ck_one:checked").length;
			ck_len == ck_yes ? $(this).parents("table").find("input.ck_all").prop("checked", true) : '' ;
		}
	 	$(this).prop("checked") || $(this).parents("table").find("input.ck_all").prop("checked", false);
	});
	
	 /*公共的  leftNav触发效果*/
	$('#leftnav').on('click', 'li', function(e){
		e.preventDefault();
		e.stopPropagation();
		var iframe = document.getElementById("RtFrameContent") || window.parent.document.getElementById("RtFrameContent");
		localStorage.setItem("iframeUrl", iframe.src);
		 if($(this).hasClass('one-lev')){
		 	 if($(this).find("ul").hasClass('navshow')){//关闭
	 	 		$(this).find('i.pull-right').html('<span>&#xe679;</span>'); 
	 	 		$(this).find('ul.navshow').find("li.active").removeClass('active');
	 	 		$(this).find('ul.navshow').removeClass('navshow');
		 	 }else{//打开
		 	 	$(this).find('i.pull-right').html('<span>&#xe60b;</span>').end().siblings().find('i.pull-right').html('<span>&#xe679;</span>');
				$(this).addClass('hover').siblings().removeClass('hover');
				$(this).find('ul').addClass('navshow').end().siblings().find('ul').removeClass('navshow');
		 	 }
		 }else{
		 	$(this).find('i.pull-right').html('<span>&#xe60b;</span>').end().siblings().find('i.pull-right').html('<span>&#xe679;</span>');
			$(this).addClass('hover').siblings().removeClass('hover');
			$(this).find('ul').addClass('navshow').end().siblings().find('ul').removeClass('navshow');
		 	$(".menu-child").find("li").removeClass("active");
			$(this).addClass("active");
		 }
	});
	
	
	$('.Back').on('click',function() {
		if(judgmentBrowser()){
			window.open('user/mleft.html', '_self');
		}
	});
});

function triger(mainTitle,mainTitle2){
	if(!$(".menu-child>ul").find("li").hasClass("hover")){
		$("[data='"+mainTitle+"']").parent().trigger("click");
		$("[data='"+mainTitle2+"']").parent().trigger("click");
	}
}

/*手机版切换效果结束*/
//  图片为空时隐藏
$('img').each(function(){
	if($(this).attr('src')=='')
	{
	   $(this).css('display','none');
	}
});

//去掉IE浏览器图片不显示
function myadd(obj,e,fn){
	if(obj.attachEvent){
		obj.attachEvent("on"+e, fn);
	}else{
		obj.addEventListener(e,fn,false);
	}
	 $('img').show();
}
myadd(window,'load',function(){
   $('img').show();
})

 
//图片加载失败           <img src="'+pic+'" width="320" height="157" onerror="imgerror(this)"/>
function imgerror(img){
	img.src= "/img/load.jpg";
	img.onerror=null;   //控制不要一直跳动
}

//获取网站的icon图标
function getIcon(){
	var params={
		cid:null,
	}
	$.ajax({
		url: api.ListCpInfoUrl(),
		type:'post',
		data:params,
		dataType:"json",
		xhrFields:{withCredentials:true},//解决跨域
		success:function(res){
			var hd =document.getElementsByTagName('head')[0];
			var iconEle =document.getElementById("icon");
			if(res.data.icon){
				if(iconEle){
					iconEle.setAttribute('href',res.data.icon);
				}else{
					var icon = document.createElement('link') ;
					icon.rel = "icon";
					icon.id="icon";
					icon.href = res.data.icon;
					icon["mce_href"] = res.data.icon;
					icon.type="image/x-icon";
					hd.appendChild(icon);
				}
			}
			
		},
		error:function(err){
			console.log(err);
		}
	})
}

getIcon();
