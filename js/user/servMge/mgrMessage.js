var mgrMessage_vm=new Vue({
	    el:'#mgemessage',
	 	data: function(){
	 		return{
	 		   linesPerPage: ['10','20','30','50'],      //  
	 		   cid:null,
	 		   messageList:null,
	 		   currentpage:1,                         //当前页 
	 		   jumppage:null,                         //跳转页码
	 		   pagesize:20,
	 		   currentLines:'0',                      //当前请求行
 			   totalPages: ''  ,                      //跳转页
 			   noData: false
	 		}
	 	},
	 	methods:{
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
			//转换时间戳
	         getTime:function(now){
	              //将小于十的数变成两位
	              function toDou(num){
	                var num=num+"";
	                return num=num.length>1?num : 0+num;
	             }
	         	  var   year=now.getFullYear();     
	              var   month=now.getMonth()+1;     
	              var   date=now.getDate();     
	              var   hour=now.getHours(); 
	              var   minute=now.getMinutes();  
	              var   second=now.getSeconds(); 
	              return   year+"-"+month+"-"+date+"   "+toDou(hour)+":"+toDou(minute)+":"+toDou(second); 
	         },
	 		//获取留言列表
	 		getList:function(){
	 			var _this=this;
	 			if(getQueryString('page')){
	 				this.currentpage=getQueryString('page') ;
	 			}
	 			if(getCurrentPage('mgrMess')){
	 				this.currentpage=getCurrentPage('mgrMess');
	 			} 
	 			var data={
	 				cid:this.cid,
	 				currentpage:this.currentpage,
	 				pagesize:this.pagesize
	 			}
	 			api.messageList(data).then(function(res){
	 				if(res.success){
	 					if(res.data && res.data[0].length > 0){
	 						for(var n=0; n<res.data[0].length; n++){
								var insert_time=new Date(res.data[0][n].insert_time);
								res.data[0][n].insert_time=_this.getTime(insert_time);
							}
		 					_this.messageList=res.data[0];
	 						_this.currentLines=res.data[0].length;
	 	                    _this.noData=false;  
	 					}else{
	 						_this.messageList=res.data[0];
	 						_this.noData = true;
	 					}
	 					_this.totalPages=res.data[1].pagenumber;
	 					$(".x-tips").fadeOut();
	 					callBackLoadIframe();//重置iframe高度
	 				}
	 			}).catch(function(err){
	 				console.log(err);
	 			})
	 		},
	 		//回复留言
	 		operate:function(msg,id){
	 			var _this=this;
	 			if(msg==1){
 				//回复
 				     setIframeUrl('user/servMge/mesRespond.html?id='+id);
	 				window.location.href=fontBaseUrl+'user/servMge/mesRespond.html?id='+id+'&page='+_this.currentpage;
	 			}else if(msg==2){
			    //删除
			     $.CwsPopup.Confirm("确认删除","是否删除此留言？",function(){
	             	  	api.messageDel({id:id,flag:2}).then(function(res){
							if(res.success){
							   _this.getList();
							   $.CwsPopup.Alert("提示","删除成功！");
							}
						}).catch(function(err){
							console.log(err);
							$.CwsPopup.Alert("提示","删除失败！");
						})
              	},function(){
                   $.CwsPopup.OperateCwsPopup('hide');
				},'确定', '取消');
			    
//                var isDel=window.confirm('是否删除此留言?');
//                if(isDel){
//	             	  	api.messageDel({id:id,flag:2}).then(function(res){
//							if(res.success){
//							   _this.getList();
//							   $.CwsPopup.Alert("提示","删除成功！");
//							}
//						}).catch(function(err){
//							console.log(err);
//						})
//                }
	 			}
	 		},
	 		//点击改变公开状态
	 		changeStatus:function(id,msg){
	 			var _this=this;
	 			//将status重置
	 			var flag=null;
	 			if(msg==1){
	 				flag=0;
	 			}else if(msg==0){
	 				flag=1;
	 			}
	 			api.messageDel({id:id,flag:flag}).then(function(res){
							if(res.success){
							  _this.getList();
							}
						}).catch(function(err){
							console.log(err);
						})
	 			
	 			
	 		},
	 		
	 	//改变 查找的页面
	    selcValue: function(e){
 			this.pagesize = $(e.target).find("option:selected").val();
 			if(this.pagesize ){
	 				window.localStorage.setItem("pagesize",this.pagesize);
	 			}
   			this.getList();//查询内容
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
// 			 setCurrentPage('mgrMess', _this.currentpage);
// 			_this.getList();
         	 var _this = this;
 			if($.trim($('.currentpage').val()) != ''){
 				
 				if(Number($('.currentpage').val())<=0){
 						_this.jumppage=_this.currentpage;
 						return;
 				}else  if(Number($('.currentpage').val()) <= Number( _this.totalPages)){
 			    	  	_this.jumppage = $('.currentpage').val();
 			    	  	_this.currentpage=_this.jumppage;
			 			setCurrentPage('mgrMess', _this.currentpage);
			 			_this.getList();
 			    }else{
 			        	_this.jumppage=_this.currentpage;
 			        	return;
 			    }
 			}



 		},
 		//上一页
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
 			setCurrentPage('mgrMess', _this.currentpage);
   			_this.getList();
 		},
 		//下一页
 		addPage: function(sign){
 			var _this = this;
 			if(sign == 'son'){
	 			var cur = (_this.currentpage -1 + 2) % (_this.totalPages-1+2);
	 			_this.currentpage = (cur == 0) ? 1 : cur ;
 			}else{
 				_this.currentpage =  _this.totalPages;
 			}
 			setCurrentPage('mgrMess', _this.currentpage);
   			_this.getList();
 		},
	 	 getCid: function(){//通过local
				var cid = ''; 
				if(getUserCookie()){
					cid=getUserCookie().cid ;
				}
				if(cid){
					this.cid = cid;
				}else{
					console.log("Error:当前用户没有cid!");
				}
		},
	 	},
	 	mounted:function(){
	 		var _this=this;
	 		this.getCid();
	 		if(window.localStorage.getItem("pagesize")){
	 			_this.pagesize=window.localStorage.getItem("pagesize");
	 		}else{
	 			window.localStorage.setItem("pagesize",_this.pagesize);
	 		}
	 		this.getList();
	 	}
});	 	


function changeStatus(target,msg){
	var id=$(target).attr('data');
	mgrMessage_vm.changeStatus(id,msg);
}

function operate(msg,target){
	var id=$(target).attr('data');
	mgrMessage_vm.operate(msg,id);
}
