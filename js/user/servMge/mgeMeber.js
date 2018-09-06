var mgeMeber_vm=new Vue ({
	el:"#order",
	data:function(){
		return{
			cid:null,
			uid:'',
			meberList:null,
			currentpage: 1,                      //当前页     必填
			jumppage:null,                       //跳转页码  
 			pagesize: 20,                        //页面大小 必填
 			linesPerPage: ['10','20','30','50'],   //  
 			currentLines:'0',                      //当前请求行
 			totalPages: null  ,                      //总页数
 			editInfo:{},
 			judgeModifyOrNot:'',
 			noData: false,
 			searchItem:null,
		}
	},
	methods:{
		//获取会员列表数据
		getMeberList:function(){
			var _this=this;
			if(getCurrentPage('mgrMeber')){
	 				this.currentpage=getCurrentPage('mgrMeber');
	 			} 
			var params={
				cid:this.cid,                           
				uid: this.uid,
				currentpage: this.currentpage,                   //当前页     必填
	 			pagesize: this.pagesize,                        //页面大小 必填
				}
			api.meberList(params).then(function(res){
				if(res.success){
					if(res.data && res.data[0] && res.data[0].length > 0){
						for(var n=0; n<res.data[0].length; n++){
							var insert_time=new Date(res.data[0][n].insert_time);
							res.data[0][n].insert_time=_this.getTime(insert_time);
						}
						_this.meberList=res.data[0];
						_this.currentLines=res.data[0].length;
					}else{
						_this.meberList=res.data[0];
						_this.noData = true;
					}
					_this.totalPages=res.data[1].pagenumber;
					callBackLoadIframe();//重置iframe高度
				}
			}).catch(function(err){
				console.log(err);
			})
		},
		getSearchList:function(){
						var _this=this;
						if(getCurrentPage('mgrMeber')){
			 				this.currentpage=getCurrentPage('mgrMeber');
			 			} 
						//	searchItem：用户账号，手机号|邮箱，searchItem1：昵称
						var params={
						searchItem:this.searchItem,  		//用户账号，手机号|邮箱
						cid:this.cid,                           			//6608e90675164229a916c8a26f00ed5f
						currentpage: this.currentpage,                 	  //当前页     必填
			 			pagesize: this.pagesize,                       	 //页面大小 必填
						}
						api.meberList(params).then(function(res){
							if(res.success){
								if(res.data && res.data[0].length>0){
									for(var n=0; n<res.data[0].length; n++){
										var insert_time=new Date(res.data[0][n].insert_time);
										res.data[0][n].insert_time=_this.getTime(insert_time);
									}
									_this.noData=false;
								}else{
									_this.meberList=res.data[0];
									_this.noData = true;
								}
								_this.meberList=res.data[0];
								_this.currentLines=res.data[0].length;
								_this.totalPages=res.data[1].pagenumber;
							}
						}).catch(function(err){
							console.log(err);
						})
		},
		search:function(){
			this.searchItem=$('input[name=user_name]').val();
			setCurrentPage('mgrMeber',1);  
			this.getSearchList();
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
              return   year+"-"+toDou(month)+"-"+toDou(date)+"   "+toDou(hour)+":"+toDou(minute)+":"+toDou(second); 
         },
         //对会员删除
         operate:function(event){
         	var _this=this;
	          //删除
	          var del_id = $(event.currentTarget).attr('data') || '';
	          if(del_id){
	          	 $.CwsPopup.Confirm("确认删除","是否删除此会员？",function(){
	         	  	api.meberDel({id:del_id,flag:2}).then(function(res){
						if(res.success){
						    $.CwsPopup.Alert("提示","删除成功！",function(){
						    	window.location.reload();
						    });
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
		//改变 查找的页面
	    selcValue: function(e){
 			this.pagesize = $(e.target).find("option:selected").val();
 			if(this.pagesize ){
	 				window.localStorage.setItem("pagesize",this.pagesize);
	 			}
 			if(this.searchItem){
 				this.getSearchList();
 			}else{
 				this.getMeberList();//查询内容
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
// 			setCurrentPage('mgrMeber', _this.currentpage);
//			if(this.searchItem){
// 				this.getSearchList();
// 			}else{
// 				this.getMeberList();//查询内容
// 			}
            var _this = this;
 			if($.trim($('.currentpage').val()) != ''){
 				if(Number($('.currentpage').val())<=0){
 						_this.jumppage=_this.currentpage;
 						return;
 				}else  if(Number($('.currentpage').val()) <= Number( _this.totalPages)){
 			    	  	_this.jumppage = $('.currentpage').val();
 			    	  	_this.currentpage=_this.jumppage;
			 			setCurrentPage('mgrMeber', _this.currentpage);
						if(this.searchItem){
			 				this.getSearchList();
			 			}else{
			 				this.getMeberList();//查询内容
			 			}
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
 			setCurrentPage('mgrMeber', _this.currentpage);
// 			_this.getMeberList();
			if(this.searchItem){
 				this.getSearchList();
 				
 			}else{
 				this.getMeberList();//查询内容
 			}
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
 			setCurrentPage('mgrMeber', _this.currentpage);
// 			_this.getMeberList();
			if(this.searchItem){
 				this.getSearchList();
 			}else{
 				this.getMeberList();//查询内容
 			}
 		},
 		//获取用户信息
		getUserInfo: function(){
            if(getUserCookie()){
				this.cid=getUserCookie().cid ;
				this.uid =getUserCookie().uid ;
			}
		},
		detailModify : function(ele){//查看修改详情
			var _this =this;
			api.meberSearchOne({uid: $(ele.currentTarget).attr("data")}).then(function(res){
				if(res.success){
					if(res.data){
						_this.editInfo = res.data;
					}
				}
			}).catch(function(err){
				console.log(err);
			});
		},
		saveModify: function(){
			var _this =this;
			api.modifyInfoComm({
				id:  _this.editInfo.id,
				nick: _this.editInfo.nick,
				name: _this.editInfo.name,
				mobile: _this.editInfo.mobile,
				email: _this.editInfo.email
			}).then(function(res){
				if(res.success){
					$.CwsPopup.Alert("提示",res.msg,function(){
						window.top.location.reload();
					});
				}
			}).catch(function(err){
				if(err.status == 200){
					if(!err.success){
						if(err.data){
							$.CwsPopup.Alert("提示",err.data.msg);
						}
					}
				}
			});
		},
		judgeLegal: function(ele){
			var _this = this ;
			var _btn = $(ele) || '';
			var Input =_btn.parents('tr').find('input') || '';
			var input_val = Input.val() || '';
			var input_name = Input.attr('name');
			var input_cnName = Input.parents('tr').find('div').text();
			var judgeProm = new Promise(function(resolve, reject){
					if(input_name && input_name != 'nick'){
						api.meberValidate({
							name: input_val	
						}).then(function(res){
							if(res.success){
								resolve(true);
							}
						}).catch(function(err){
							if(err.status == '200'){
								if(err.data){
									if(!err.data.success){
										$.CwsPopup.Alert("提示",input_cnName+ '已存在！');
										reject(false);
									}
								}
							}
						})
					}else if(input_name  == 'nick'){
						resolve(true);
					}else{
						$.CwsPopup.Alert("提示",input_cnName+"不能为空！");
						reject(false);
					}
			});
			if(_this.uid){
				judgeProm.then(function(resolve){
				    _this.saveModify();    //验证成功提交修改
				}).catch(function(reject){
					console.log(reject);
				})
			}else{
				$.CwsPopup.Alert("提示","信息不齐全修改信息失败！");
			}
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
		this.getMeberList();
	}
})

function search(){
		mgeMeber_vm.search();
}

//修改按钮
$(document).on('click','.modifyBtn',function(){
	if($(this).text()=='修改'){
		$(this).parents('tr').find("input").removeAttr('disabled').focus();
		$(this).text('完成');
	}else{
		mgeMeber_vm.judgeLegal($(this));
	}
});