var header_vm = '';
$("#header").load(fontBaseUrl+'tpl/header.tpl', function(){
	 header_vm=new Vue({
		data: function(){
			return {
				username:'',
				login:false,
				logout: true,
				keywords:'',
				listTitle: [],//栏目数组
			}
		},
		methods:{
			//检测是否 登录
			checkIsEntry: function(){
			    //通过心跳时间判断是否登录
				if(getCookie('uid')){
	        		this.login = true;
					this.logout = false;
		 			this.username = getCookie('uname') || '';
	        	}else{
					this.login = false;
					this.logout = true;
	        	}
			},
			//登出
		    loginout: function(){
					$.CwsPopup.Confirm("登出提示","您是否确认退出登录？",function(){
						delUserCookie();
				    	this.username='';
						this.login = false;
						this.logout = true;
			    		api.LoginOut().then(function(res){
			    			if(res.success){
			    				delUserCookie();
			    				delCookie('rid');
			    			}
				    	}).catch(function(err){
				    		console.log(err);
				    	})
				    	window.location.href=fontBaseUrl+"user/sign.html";
//			    		window.location.reload();	
					});
		    },
		    //直接Enter搜索
//          EnterSearch:function(){
//          		var _this=this;
//				    $('#searchText').on('focus',function(){
//		            	document.onkeydown=function(event){
//						  var e = event || window.event || arguments.callee.caller.arguments[0];
//							    if(e && e.keyCode==13){ // enter 键
//							   		  _this.search();
//							    }
//						};
//					})   
//          },
		    //搜索
//		    search:function(){
////		    	window.location.href = fontBaseUrl+"goods/list.html?keywords="+$('#searchText').val();
//		    		window.open(fontBaseUrl+"goods/list.html?keywords="+$('#searchText').val(),'_blank');
//		    },
		    //切换到登录
			signin:function(){
				window.localStorage.setItem('isEntryPage',true);
				window.localStorage.removeItem('sadfasdf');
		  	    window.localStorage.removeItem('asdasfda');
			},
			//切换到注册
			signup:function(){
				window.localStorage.setItem('isEntryPage',false);
				window.localStorage.removeItem('sadfasdf');
		  	    window.localStorage.removeItem('asdasfda');
			},
		    //进入管理页面
		    entryManage: function(){
		    	    this.chooseNav(null,3);
		    	 	if(judgmentBrowser()){
	    	 			window.open(fontBaseUrl+'user/mleft.html', '_self');
		    	 	}else{
		    	 		setIframeUrl('user/myServ/servPersinfo.html');
		    			window.location.href= fontBaseUrl+'user/user.html';
		    	 	}
		    },
		    loadColum: function(){//加载栏目
		    	var _this = this;
		    	//加载栏目
		    	//百捷平台不用传递cid字段
		    	api.loadSiteCol().then(function(res){
		    		_this.listTitle = res.data ;
		    	}).catch(function(error){
		    		console.log(error);
		    	});
		    },
		    //跳转栏目页面
//		    callbackContent:function(){//回填查选条件
//		    	var search = window.location.search;
//		    	var ipt = search.substring(1).split("=");
//		    	if(ipt[0] == 'keywords'){
//		    		this.keywords =  decodeURI(ipt[1]);
//		    	}
//		    },
		    //检测是否是首页
		    checkIndex:function(){
	   			var data=$('#header').attr('data');
			    //获取网站的logo
			     api.ListCpInfo().then(function(res){
			    	 if(res.data.logo){
			    		 $('#logo').attr('src',res.data.logo);
			    	 }
			     	 //如果是首页
			    	 if(data==1){
			    	 	$(".logo-move").addClass("img-2");
			    	 	$('#search_btn').css('background-image',"url(img/search.png)");
			    	 	window.localStorage.setItem('asdasfda',0);
			    	 //如果是其他页面	
			    	 }else{
			    	 	$('#search_btn').css('background-image',"url(img/search_index.png)");
			    	 }
			    	 //initPageInfo(res.data.website_title, res.data.site_keywords, res.data.description);//修改标签添加keywords
			     }).catch(function(err){
			     	console.log(err);
			     })
			    
		    },
		    addTagAttribute: function(){//面包屑导航内容更新
					var _colId = '';
					var _rid = '';
                  	if(getQueryString('id') && getQueryString('id') != ''){
                  		_colId = getQueryString('id');
                  	}else if(getQueryString('mid') && getQueryString('mid') != ''){
						_colId = getQueryString('mid');
					}else if(getQueryString('sid') && getQueryString('sid') != ''){
						_colId = getQueryString('sid'); 
					}else if(getQueryString('pid') && getQueryString('pid') != ''){
						_colId = getQueryString('pid');
					}
					
					if(getQueryString('rid') && getQueryString('rid') != ''){
						_rid = getQueryString('rid');
					}
				
	    	 		api.getMenuList({
	    	 			flag:1,
	    	 			cid: '',
	    	 			id:_colId,
	    	 			rid: _rid
	    	 		}).then(function(res){
	    	 			var data = res.data.list && res.data.list && res.data.list[0] ;
				    	initPageInfo(data.title, data.keywords, data.description);//修改标签添加keywords
				     }).catch(function(err){
				     	console.log(err);
				     });
		    },
		    //选择菜单
		    chooseNav:function (ord,msg){
		    	//一级菜单
		    	if(msg==1){
		    		if(ord){
		    			window.localStorage.setItem('asdasfda',ord);
			    	}else{
			    		window.localStorage.setItem('asdasfda',0);
			    	}
		    	//二级菜单
		    	}else if(msg==2){
		    		if(ord){
			    		window.localStorage.setItem('sadfasdf',ord);
			    	}else{
			    		window.localStorage.setItem('sadfasdf',0);
			    	}
		    	}else if(msg==3){
		    		   window.localStorage.removeItem('sadfasdf');
		    		   window.localStorage.removeItem('asdasfda');
		    	}
		    	
		    },
		    
		},
//		watch:{
//			listTitle:function(){
//				var _this=this;
//				this.$nextTick(function(){
////					var ord= window.localStorage.getItem('asdasfda');
////					if(ord){
////						$('.nav-phone>li').eq(ord).children('a').addClass('a-hover');
////					}
//				})
//			}
//		},
		mounted: function(){
			this.checkIsEntry();//判断是否登录
			this.checkIndex();
			this.addTagAttribute();
			//this.callbackContent();
			this.loadColum();//加载栏目
//			this.EnterSearch();
			
//			init();
//			function init(){
//				setTimeout(function(){
//					var ord= window.localStorage.getItem('asdasfda');
//					if(ord){
//						$('.nav-phone>li').eq(ord).children('a').addClass('a-hover');
//					}
//				},100)
//			}
			isUserPage();
		}
		
		
	}).$mount('#header');
	header_vm.checkIsEntry();
	header_vm.checkIndex();
	header_vm.addTagAttribute();
	//header_vm.callbackContent();
	header_vm.loadColum();//加载栏目
	//header_vm.EnterSearch();
	
	

});

//var ord= window.localStorage.getItem('asdasfda');
//if(ord){
//	$('.nav-phone>li').children('a').removeClass('a-hover');
//	$('.nav-phone>li').eq(ord).children('a').addClass('a-hover');
//}



function getCookie(key) 
{ 
    var arr,reg=new RegExp("(^| )"+key+"=([^;]*)(;|$)");
   	arr = document.cookie.match(reg);
    if(arr){
        return unescape(arr[2]); 
    }else{ 
        return null; 
    }
} 
console.log("加载js");
//判断是用户中心页面还是其他页面
function isUserPage(){
	var user=$("#header").attr("value");
	if(user=="user"){
		$(".pc-show").remove();
	}else{
		$(".move-show").remove();
	}
}

