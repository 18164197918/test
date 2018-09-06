var vm_webList = new Vue({
	data: function(){
		return {
			params: {
 				cid: '',	  //必填
 				mid: '',                                  //栏目分类 选填
 				currentpage: 1,                       //当前页     必填
 				pagesize: 20                         //页面大小 必填
 			},
 			currentpage: 1,                       //当前页     必填
 			jumppage:null,                          //跳转页码
 			pagesize: 20 ,                          //页面大小 必填
 			contentLines:[],//全部内容
 			linesPerPage: ['10','20','30','50'],
 			currentLines:'0',//当前请求行
 			totalPages: '',
 			ftpList:[],//获取ftp列表
			getFtpInfo:{},//获取详情
			bindIP:[],//绑定域名
			search_keyWords:'',//查询关键字
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
// 			         $('.currentpage').val(this.currentpage) ;
// 			    }
// 			}
// 			setCurrentPage('webList', _this.currentpage);
// 			_this.loadContent();
 			
			var _this = this;
 			if($.trim($('.currentpage').val()) != ''){
 				if(Number($('.currentpage').val())<=0){
 						_this.jumppage=_this.currentpage;
 						return;
 				}else  if(Number($('.currentpage').val()) <= Number( _this.totalPages)){
 			    	  	_this.jumppage = $('.currentpage').val();
 			    	  	_this.currentpage=_this.jumppage;
			        	 setCurrentPage('webList', _this.currentpage);
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
 			setCurrentPage('webList', _this.currentpage);
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
 			setCurrentPage('webList', _this.currentpage);
 			_this.loadContent();
 		},
 		pointSearch: function(){//点击查询
 			var _this = this;
 			_this.currentpage=1;
 			setCurrentPage('webList', _this.currentpage);
   			api.ListAllFtp({
					flag: 1,//待处理
					currentpage: _this.currentpage,
					pagesize: _this.pagesize,
					searchItem:_this.search_keyWords
   			}).then(function(res){
   				if(res.success){
   						_this.ftpList = res.data[0] && res.data[0];
   				}
   			}).catch(function(err){
   				console.log(err);
   			});
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
   						_this.bindIP= res.data && res.data.userDomains && res.data.userDomains[0].domain_addr;
   					}
   				}).catch(function(err){
   					console.log(err);
   				});
   			}
   		},
		loadContent:function(){
			var _this =this ;
			if(getCurrentPage('webList')){
	 				this.currentpage=getCurrentPage('webList');
	 			} 
			if(_this.pagesize && _this.currentpage){
				api.ListAllFtp({
					flag: 1,//待处理
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
		}
	},
	mounted: function(){
		var _this = this;
		if(window.localStorage.getItem("pagesize")){
	 			_this.pagesize=window.localStorage.getItem("pagesize");
	 		}else{
	 			window.localStorage.setItem("pagesize",_this.pagesize);
	 		}
		this.loadContent();//初始化列表
	}
}).$mount("#webList");

//详情模态框
$(document).on("click",".searchFTP",function(){
	$("#myModal").toggleCommModal('show');
	if($(this).attr("data-id")){
		vm_webList.getFtpDetail($(this).attr("data-id"));//获取ftp详情
	}else{
		 $.CwsPopup.Alert("提示","获取当前id失败！");
	}
});