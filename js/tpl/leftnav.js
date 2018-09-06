$("#leftnav").load(fontBaseUrl+"tpl/leftnav.tpl", function(response,status){
  var leftnav_vm=new Vue({
	    el: "#leftnav",
	    data: {
	    	cid:'',
				uid:'',
				username:'',
				money:0,
				rid:'',//角色id
				power: '',//根据权限获取功能
				modelPower:true,  //默认全部权限为true
				preview: false,//预览网站(开通ftp后)
 				userImg:"img/header.png",
	    },
	    methods: {
		      jumpPreview: function(){//预览网站
		      	if(this.previewLink){
		      		window.top.open(this.previewLink, '_blank');
		      	}else{
		      		$.CwsPopup.Alert("提示","请联系管理员开通FTP！");
		      	}
		      },
		      delStroge:function(){//清除缓存
		    	  var _this = this;
		    	  api.delCache({cid: _this.cid}).then(function(res){
						if(res.success){
							$.CwsPopup.Alert("提示","缓存清除成功！");
						}
				}).catch(function(err){
					if(err.status == 200){
						if(err.data.success == false){
							var tip = err.data.msg || '缓存清除失败！';
							$.CwsPopup.Alert("提示",tip);
						}
					}
				});
		      },
		     ftpEstablished:function(){//ftp开通与否
    			var _this = this;
    			api.FTPget({cid: _this.cid}).then(function(res){
							if(res.success){
								if(res.data){
									if(res.data.status==400){
											if(res.data.domain){
												_this.preview =true;
												_this.previewLink=res.data && 'http://'+res.data.domain;
											}
									}if(res.data.status==250){
										$.CwsPopup.Alert("提示","您购买的网站正在复制中，请稍等！");
									}
								}
							}
					}).catch(function(err){
							console.log(err);
					});
			},
			getPowerInfo: function(){//获取权限
				 var _this =this;
				 api.GetCustomFunction({
				 	  rid: _this.rid
				 }).then(function(res){
				 			if(res.success){
								if(res.data){
									_this.power = res.data.pid || '';
//											if(res.data.domain){
//												_this.preview =true;
//												_this.previewLink=res.data && 'http://'+res.data.domain;
//											}
								}
							}
				 }).catch(function(err){
				 	
				 });
				 
			},
			//获取模板权限
			getModelPower:function(){
				 var _this=this;
				 var params={
				 	  cid:this.cid,
				 }
				 api.ModelType(params).then(function(res){
				 	console.log(res.data.id);
				 	if(res.success && res.data.id!=undefined && res.data.id){
				 			 //基础版和企业版
				 		   if(res.data.id=='92e20913211711e8b75b00e066be4061'  || res.data.id=="92f39522211711e8b75b00e066be4061"  ){
				 		   	  _this.modelPower=false;
				 		   //电商版和综合版	  
				 		   }else{
				 		   	  _this.modelPower=true;
				 		   }
				 	}
				 }).catch(function(err){
				 	if(err.status == 200){
				 		  if(err.data.success == false){//超级管理员不进行判断
							  _this.modelPower=true;
							 	console.log(err);
				 		  }
				 	}
				 })
			},
			//获取用户信息
			getUserInfo: function(){
				var _this =this;
				if(getUserCookie()){
					this.cid=getUserCookie().cid ;
					this.uid=getUserCookie().uid ;
					this.rid=getUserCookie().roleId;
	        this.username = getUserCookie().uname;
		        	//获取个人图像余额
		        	api.personInfoGet({
		        		uid:this.uid,
		        		cid:this.cid
		        	}).then(function(res){
		        		if(res.success && res.data){
		        			if(res.data.img){
		        					_this.userImg=res.data.img;
		        			}
		        			if(res.data.available_balance){
		        					var num=new Number(res.data.available_balance);
		        					_this.money=res.data.available_balance && num.toFixed(2);
		        			}
		        		}
		        	}).catch(function(err){
		        		console.log(err);
		        	});
				}
			},
			},
			watch: {
				 rid: function(){
				 	  var _this = this;
				 	  this.$nextTick(function(){
				 	  	_this.getPowerInfo();//获取用户权限信息
				 	  });
				 }
			},
		    mounted: function(){
		    	this.getUserInfo();
		    	this.ftpEstablished();
		    	this.getModelPower();
	//	    	setInterval(function (){
	//	    		this.ftpEstablished();
	//	    	},1000)
		    }
	  })
});

$(function(){
	 /*公共的  leftNav触发效果*/
	$(document).on('click', '#leftnav li', function(e){
		e.preventDefault();
		e.stopPropagation();
		 if($(this).hasClass('one-lev') && !$(this).hasClass('previewSites')){
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
	
	
})

	
	
	











