var vm_webPend = new Vue({
	data: function(){
		return {
			params: {
			    cid: '',	          //必填
 				mid: '',              //栏目分类 选填
 				currentpage: 1,       //当前页     必填
 				pagesize: 20          //页面大小 必填
 			},
 			currentpage: 1,           //当前页     必填
 			jumppage:null,            //跳转页码
 			pagesize:20 ,            //页面大小 必填
 			contentLines:[],//全部内容
 			linesPerPage: ['10','20','30','50'],
 			currentLines:'0',         //当前请求行
 			totalPages: '',
 			openId:'',
 			ftpList:[],//获取ftp列表
 			getFtpInfo:{},//获取详情
 			bindIP:[],//绑定域名
 			copy_statu: false,
 			testReslt:'',
 			noData: false
		}
	},
	methods: {
		selcValue: function(e){
 			this.pagesize = $(e.target).find("option:selected").val();
 			if(this.pagesize ){
	 				window.localStorage.setItem("pagesize",this.pagesize);
	 			}
 			this.loadContent();//查询内容
 		},
 		//全选
 		ckAll: function(e){
 			$(e.target).prop("checked") && $(".th-1").find("input[type='checkbox']").prop("checked", true);
 			$(e.target).prop("checked") || $(".th-1").find("input[type='checkbox']").prop("checked", false);
 		},
 		ckCur: function(e){
 			if($(e.target).prop("checked")){
 				if($(".th-1").find("input[type='checkbox']").length-1 == $(".th-1").find("input:checked").length){
 					$(".ckall").prop("checked", true);
 				}
 			}else{
 				$(".ckall").prop("checked", false);
 			}
 		},
 		//跳转到某页
		changeCurrentPage: function(e){
// 			var _this = this;
// 			if($.trim($('.currentpage').val()) != ''){
// 			    if(Number($('.currentpage').val()) <= Number( _this.totalPages)){
// 			    	  _this.currentpage = $('.currentpage').val();
// 			    }else{
// 			        	$('.currentpage').val(this.currentpage) ;
// 			    }
// 			}
// 			 setCurrentPage('webPend', _this.currentpage);
// 			_this.loadContent();
			var _this = this;
 			if($.trim($('.currentpage').val()) != ''){
 				
 				if(Number($('.currentpage').val())<=0){
 						_this.jumppage=_this.currentpage;
 						return;
 				}else  if(Number($('.currentpage').val()) <= Number( _this.totalPages)){
 			    	  	_this.jumppage = $('.currentpage').val();
 			    	  	_this.currentpage=_this.jumppage;
			   			 setCurrentPage('webPend', _this.currentpage);
			   			_this.loadContent();
 			    }else{
 			        	_this.jumppage=_this.currentpage;
 			        	return;
 			    }
 			}  

 		},
 		subPage: function(sign){
 			var _this = this;
 			if(sign == 'son'){
	 			var cur = _this.currentpage -1 ;
	 			if(cur > 0){
	 				_this.currentpage = cur;
	 			}
 			}else{
 				_this.currentpage = '1';
 			}
 			 setCurrentPage('webPend', _this.currentpage);
 			_this.loadContent();
 		},
 		addPage: function(sign){
 			var _this = this;
 			if(sign == 'son'){
	 			var cur = (_this.currentpage -1 + 2) % (_this.totalPages-1+2);
	 			_this.currentpage = (cur == 0) ? 1 : cur ;
 			}else{
 				_this.currentpage =  _this.totalPages;
 			}
 			 setCurrentPage('webPend', _this.currentpage);
 			_this.loadContent();
 		},
   		getFtpDetail: function(cur_id){//获取ftp详情
   			var _this = this;
   			if(cur_id){
   				api.getDetailFtpInfo({
   					id: cur_id
   				}).then(function(res){
   					if(res.success){
   						///_this.ftpList = res.data;
   						_this.getFtpInfo = res.data && res.data.site;
   						_this.getFtpInfo.port_num='8010';
   						 _this.bindIP= res.data && res.data.userDomains && res.data.userDomains[0].domain_addr;
   					}
   				}).catch(function(err){
   					console.log(err);
   				});
   			}
   		},
   		judge: function(resolve,reject,dman){
   			var _this =this;
   			api.judgeHaveOrNot({
   				domain: dman
   			}).then(function(res){
   				if(res.success){
   					if(res.data == 1){//重复
   						_this.testReslt =false;
   						reject(_this.testReslt);
   					}
   				}else{
   					if(res.data == -1){//可以填写
   						_this.testReslt =true;
   						resolve(_this.testReslt);
   					}
   				}
   			}).catch(function(err){
   				if(err.status == 200){
   				    if(err.data){//可以填写
   				    	if(err.data.data == -1){
   							_this.testReslt =true;
							resolve(_this.testReslt);
   						}
   					}
			    }
   			});
   		},
   		submitFtp: function(ele){//提交申请的FTP
   			var _this = this;
   			var id = $(ele.currentTarget).attr("id");
   			var promie = new Promise(function(resolve, reject){
				_this.judge( resolve, reject,_this.getFtpInfo.domain);
   			})
	   		promie.then(function(result_one){
	   			if(id){
	   					api.UpdateFtpInfo({
			   				flag: 0,
			   				id: id,
			   				ip: _this.getFtpInfo.ip,
			   				intranet_ip: _this.getFtpInfo['intranet_ip'],
		   					domain:  _this.getFtpInfo.domain,
			   				port_num:  _this.getFtpInfo.port_num,
			   				account:  _this.getFtpInfo.account,
			   				password:  _this.getFtpInfo.password
			   			}).then(function(res){
			   				if(res.success){
			   				 setCurrentPage('webPend', _this.currentpage);
								window.top.location.reload();
			   				}
			   			}).catch(function(err){
			   				
			   			});
	   			}
	   			
	   		}).catch(function(result_two){
	   			$.CwsPopup.Alert("提示","域名已存在，请重新输入！");
	   			
	   		});
   		},
		loadContent:function(){//初始化列表信息
			var _this =this ;
			if(getQueryString('page')){
 				this.currentpage=getQueryString('page') ;
 			}
 			if(getCurrentPage('webPend')){
 				this.currentpage=getCurrentPage('webPend');
 			} 
			if(_this.pagesize && _this.currentpage){
				api.ListAllFtp({
					flag: 0,//待开通
					currentpage: _this.currentpage,
					pagesize: _this.pagesize
				}).then(function(res){
					if(res.success){
						if(res.data && res.data[0].length == 0){
							_this.noData = true;
						}
						if(res.data && res.data[0].length>0){
							_this.noData=false;
						}
						_this.ftpList = res.data[0] && res.data[0];
				   	   	 _this.totalPages = res.data[1].pagenumber;//共几页
			   	   	    _this.currentLines=res.data[0].length;
	   	   	    	    $(".x-tips").fadeOut();
			   	   	    callBackLoadIframe();//重置iframe高度
					}
				}).catch(function(err){
					console.log(err);
				});
			}
		},
		copyTemp:function(ftpid, cid){//复制模板
			var _this = this;
			if(_this['copy_statu']){
				 $.CwsPopup.Alert("提示","已经成功操作，不可重复操作！");
			}else{
				api.CopyTemplate({
					ftpId : ftpid,
					cid: cid
				}).then(function(res){
					if(res.success){
							_this['copy_statu'] = true;
							 setCurrentPage('webPend', _this.currentpage);
							 $.CwsPopup.Alert("提示","开始复制模板！",function(){
							 	 window.top.location.reload();
							 });
					}else{
						 $.CwsPopup.Alert("提示","复制模板失败！");
					}
				}).catch(function(err){
					console.log(err);
					if(err.status == '200'){
						if(err.data){
							if(!err.data.success){
								 console.log("catch err...");
								 $.CwsPopup.Alert("提示","复制模板失败！");
							}
						}
					}
				});
			}
		},
		restartNginx:function(ftpid){//改变状态（重启Nginx）
			var _this = this;
			if(ftpid){
				api.ChangeFtpStatus({//重启Nginx
					id : ftpid,
					status: '400'
				}).then(function(res){
					if(res.success){
						 setCurrentPage('webPend', _this.currentpage);
						 $.CwsPopup.Alert("提示","重启Nginx成功！",function(){
						 	 window.top.location.reload();
						 });
					}
				}).catch(function(err){
					console.log(err);
					if(err.status == '200'){
						if(err.data){
							if(!err.data.success){
								 console.log("catch err...");
								 $.CwsPopup.Alert("提示","重启Nginx失败！");
							}
						}
					}
				});
			}
		}
	},
	mounted: function(){
		var _this = this;
		this.currentpage = getCurrentPage('webPend'); 
		if(window.localStorage.getItem("pagesize")){
	 			_this.pagesize=window.localStorage.getItem("pagesize");
	 		}else{
	 			window.localStorage.setItem("pagesize",_this.pagesize);
	 		}
		this.loadContent();//初始化列表
	}
}).$mount("#webPend");

//
//function showModal(target){
//	$(target).toggleCommModal('show');
//}
//详情模态框
$(document).on("click",".searchFTP",function(){
	$("#myModal").toggleCommModal('show');
	if($(this).attr("data-id")){
		vm_webPend.getFtpDetail($(this).attr("data-id"));//获取ftp详情
	}else{
		 $.CwsPopup.Alert("提示","获取当前id失败！");
	}
});
//操作模态框
$(document).on("click",".openFTP",function(){
	$("#myModalOpe").toggleCommModal('show');
	vm_webPend.openId = $(this).attr("data-id") || "";
	if(vm_webPend.openId){
		vm_webPend.getFtpDetail(vm_webPend.openId);//获取ftp详情
	}else{
		 $.CwsPopup.Alert("提示","获取当前id失败！");
	}
});
