var comRespond_vm=new Vue({
	    el:'#replycomment',
	 	data: function(){
	 		return{
	 			id:null,
	 			rid:null,
	 			pid:null,
	 			uid:null,
	 			type:0,           //评论资源类型
	 			contentImg:'img/user/person.png',   //评论的内容的图片
	 			title:null,        //评论内容标题
	 			user_nick:null,    //评论人
	 			comment:null,      //评论的内容
	 			reply:null,       //评论的回复内容
	 			replyList:[],   //回复列表
	 			status:null,      //评论状态
	 			time:null,
	 			contact:null,
	 			phone:null,
	 			reply:null,
	 			linesPerPage: ['10','20','30','50'],     //  
	 			currentpage:1,
	 		    pagesize:20,
	 		    currentLines:'0',                      //当前请求行
 			    totalPages: ''  ,                      //跳转页
	 		}
	 	},
	 	methods:{
	 		//截取url的参数值
			GetQueryString:function (name){
			     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
			     var r = window.location.search.substr(1).match(reg);
			     if(r!=null)return  unescape(r[2]); return null;
			},
			//获取留言的内容
			getcomment:function(){
				var _this=this;
				var data={
					id:this.GetQueryString('id'),
					currentpage:this.currentpage,
	 				pagesize:this.pagesize
				}
				
				api.commentGet(data).then(function(res){
					if(res.data[0]){
						
						_this.title=res.data[0].title;
						if(res.data[0].r_type=='25174661566300295'){
							_this.type=0;
						}else if(res.data[0].type=='25174661566300296'){
							_this.type=1;
						}
						_this.rid=res.data[0].id;
					}	
					if(res.data[1]){	
						_this.contentImg=res.data[1].img;
						if(res.data[2].parent.user_nick){
							_this.user_nick=res.data[2].parent.user_nick;
						}else{
							  if(res.data[1].mobile){
							  	_this.user_nick=res.data[1].mobile;
							  }else if(res.data[1].email){
						  		_this.user_nick=res.data[1].email;
							  }
						}
					}
					if(res.data[2]){	
						_this.comment=res.data[2].parent.comment;
						var update_time=new Date(res.data[2].parent.insert_time);
		   	   	  		_this.time=_this.getTime(update_time);
						_this.pid=res.data[2].parent.id;
						_this.status=res.data[2].parent.status;
			   	   	  	for(var n=0; n<res.data[2].child.length; n++){
			   	   	  		var update_time=new Date(res.data[2].child[n].insert_time);
			   	   	  		res.data[2].child[n].insert_time=_this.getTime(update_time);
			   	   	  	}
						_this.replyList=res.data[2].child;
						_this.currentLines=res.data[2].child.length;
						
						if(_this.status==0){
					  		$('input[name=isopen]')[1].checked=true;
					  	}else if(_this.status==1){
					  		$("input[name='isopen']")[0].checked=true;
					  	}
					}
				}).catch(function(err){
					console.log(err);
				})
			},
			//提交 回复评论
	 		submit:function(){
	 			var _this=this;
	 			var data={
	 				rid:this.rid,
	 				pid:this.pid,
	 				comment:this.reply,
	 				uid:this.uid,
	 			}
	 			console.log(data);
	 			api.commentReply(data).then(function(res){
	 					if(res.success){
	 						 _this.getcomment();
	 						 callBackLoadIframe();
                        	 $.CwsPopup.Alert("提示","回复评论成功！");
	 					}
	 				}).catch(function(err){
	 					console.log(err)
	 				})
	 		},
	 		//点击改变公开状态
	 		changeStatus:function(msg){
	 			//将status重置
	 			var flag=null;
	 			api.commentDel({id:this.GetQueryString('id'),flag:msg}).then(function(res){
					if(res.success){
					}
				}).catch(function(err){
					console.log(err);
				})
	 		},
	 		//删除或隐藏回复
	 		delComm:function(id,msg){
	 			var _this=this;
	 			api.commentDel({id:id,flag:msg}).then(function(res){
					if(res.success){
					  _this.getcomment();
					}
				}).catch(function(err){
					console.log(err);
				})
				
				if(msg==2){
					$.CwsPopup.Confirm("确认删除","是否删除此条评论？",function(){
               		  		api.commentDel({id:el.attr('id'),flag:msg}).then(function(res){
									if(res.success){
										_this.getcomment();
										$.CwsPopup.Alert("提示","删除成功！");
									}
								}).catch(function(err){
									console.log(err);
									$.CwsPopup.Alert("提示","删除失败！");
								})
		                    },function(){
		                       $.CwsPopup.OperateCwsPopup('hide');
							},'确定', '取消');
				}
	 		},
	 		//时间戳转换日期
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
		 	//改变 查找的页面
		    selcValue: function(e){
	 			this.pagesize = $(e.target).find("option:selected").val();
	   			if(this.pagesize ){
	 				window.localStorage.setItem("pagesize",this.pagesize);
	 			}
	   			this.getAdvList();//查询内容
	 		},
			//跳转到某页
			changeCurrentPage: function(e){
	 			var _this = this;
	 			if($.trim($(e.target).val()) != ''){
	 			    if(Number($(e.target).val()) <= Number( _this.totalPages)){
	 			    	  _this.currentpage = $(e.target).val();
	 			    }else{
	 			        	$(e.target).val('') ;
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
	   			_this.getAdvList();
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
	   			_this.getAdvList();
	 		},
	 		getUserInfo:function(){
	 			if(getUserCookie()){
	 				this.uid=getUserCookie().uid;
	 				this.contact=getUserCookie().uname;
	 			}
	 		}
	 	},
	 	watch:{
	 		replyList:function(){
	 			 var _this = this;
				 	  this.$nextTick(function(){
				 	  	var height=$("#comment").height();
				 	  	$(".person").css('height',height+18+"px");
				 	  });
	 		}
	 	},
	 	mounted:function(){
	 		var _this=this;
	 		this.getUserInfo();
	 		if(window.localStorage.getItem("pagesize")){
	 			_this.pagesize=window.localStorage.getItem("pagesize");
	 		}else{
	 			window.localStorage.setItem("pagesize",_this.pagesize);
	 		}
	 		this.getcomment();
	 	}
});	 	

window.onload=function (){
	callBackLoadIframe();
}

function submit1(){
	comRespond_vm.submit();
}

function  changeStatus(msg){
	comRespond_vm.changeStatus(msg);
}

function delComm(target,msg){
	var id=$(target).add('id');
	comRespond_vm.delComm(id,msg);
}
