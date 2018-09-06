var mgeCom_vm=new Vue({
	    el:'#mgecomment',
	 	data: function(){
	 		return{
	 		   initUrl: api.baseUrl()+'/column2.do?gets', //资源评价中的栏目筛选
	 		   linesPerPage: ['10','20','30','50'],     //  
	 		   cid:null,
	 		   mid:null,
	 		   commentList:null,
	 		   currentpage:1,
	 		   jumppage:null,                         //跳转页码  
	 		   pagesize:20,
	 		   currentLines:'0',                      //当前请求行
 			   totalPages: ''  ,                      //总页码
 			   params: {
	 				cid: '',	  //必填
	 				mid: '',                                  //栏目分类 选填
	 				currentpage: 1,                       //当前页     必填
	 				pagesize: 20                          //页面大小 必填
	 			},
	 			noData:false
	 		}
	 	},
	 	methods:{
		 	
	 		//获取评论列表
	 		getList:function(){
	 			var _this=this;
	 			if(getQueryString('page')){
	 				this.currentpage=getQueryString('page') ;
	 			}
	 			if(getCurrentPage('mgrComm')){
	 				this.currentpage=getCurrentPage('mgrComm');
	 			} 
	 			var data={
	 				cid:this.cid,
	 				mid:this.mid,
	 				currentpage:this.currentpage,
	 				pagesize:this.pagesize
	 			}
	 			api.commentList(data).then(function(res){
	 				if(res.success){
	 					if(res.data && res.data[0].length >0 ){
	 						for(var n=0; n<res.data[0].length; n++){
								var insert_time=new Date(res.data[0][n].insert_time);
								res.data[0][n].insert_time=_this.getTime(insert_time);
							}
		 					_this.commentList=res.data[0];
	 						_this.currentLines=res.data[0].length;
	 						_this.noData=false;
	 					}else{
	 						_this.commentList=res.data[0];
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
	 			api.commentDel({id:id,flag:flag}).then(function(res){
							if(res.success){
							 _this.getList();
							}
						}).catch(function(err){
							console.log(err);
						})
	 		},
	 		batchOpear:function(msg){
	 			var _this=this;
	 			var len=$(".content-edit-box-bg  input[type='checkbox']").length;
	 			if(len>0){
		 			var delNum=[]; //成功删除的数据
		 				for(var n=0; n<len; n++){
			 				if($(".content-edit-box-bg  input[type='checkbox']")[n].checked){
			 					delNum.push($(".content-edit-box-bg input[type='checkbox']")[n].value);
			 					$(".content-edit-box-bg  input[type='checkbox']")[n].checked=false;
			 				}
		 				}
		 				var str=delNum.join(",");
	   					if(str){
	   						$.CwsPopup.Confirm("确认删除","是否批量删除评论？",function(){
               		  		api.commentDel({id:str,flag:2}).then(function(res){
									if(res.success){
										$('.ck_all')[0].checked=false;
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
		 				}
	 			}
	 		},
	 		//回复或删除评论
	 		operate:function(msg,id){
	 			var _this=this;
	 			if(msg==1){
 				//回复
 				    setIframeUrl('user/servMge/comRespond.html?id='+id);
	 				window.location.href=fontBaseUrl+'user/servMge/comRespond.html?id='+id+'&page='+_this.currentpage;
	 			}else if(msg==2){
 				   //删除
                   $.CwsPopup.Confirm("确认删除","是否删除此评论？",function(){
               		  	api.commentDel({id:id,flag:2}).then(function(res){
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
                   
	 			}
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
// 			setCurrentPage('mgrComm', _this.currentpage);
// 			_this.getList();
            var _this = this;
 			if($.trim($('.currentpage').val()) != ''){
 				
 				if(Number($('.currentpage').val())<=0){
 						_this.jumppage=_this.currentpage;
 						return;
 				}else  if(Number($('.currentpage').val()) <= Number( _this.totalPages)){
 			    	  	_this.jumppage = $('.currentpage').val();
 			    	  	_this.currentpage=_this.jumppage;
			   			setCurrentPage('mgrComm', _this.currentpage);
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
 			setCurrentPage('mgrComm', _this.currentpage);
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
 			setCurrentPage('mgrComm', _this.currentpage);
   			_this.getList();
 		},
	 	 getCid: function(){//通过local
	 	 	var cid ='';
	 	 	  	if(getUserCookie()){
					 cid =  getUserCookie().cid;
	 	 	 	}
				if(cid){
					this.cid = cid;
				}else{
					console.log("Error:当前用户没有cid!");
				}
		},
			beforeClick: function(treeId, treeNode){
 				var check = (treeNode && !treeNode.isParent);
				if (!check) $.CwsPopup.Alert("提示","不能选中父节点！");
				return check;
	 		},
	 		onClick: function(e, treeId, treeNode){
	 			var zTree = $.fn.zTree.getZTreeObj("selctTree"),
				nodes = zTree.getSelectedNodes(),
				v = "";
				nodes.sort(function compare(a,b){
				return a.id-b.id;
				});
				for (var i=0, l=nodes.length; i<l; i++) {
					v += nodes[i].name + ",";
				}
				if (v.length > 0 ) v = v.substring(0, v.length-1);
				console.log(treeNode);
				this.mid = treeNode.id;
				$("#citySel").attr("value", v);
				$('#menuContent').slideUp();//选中后赋值并收起
				this.currentpage=1;
    			setCurrentPage('mgrComm', this.currentpage);
				this.getList();//查询内容
	 		},
	 		addDiyDom :function(treeId, treeNode) {
				var aObj = $("#" + treeNode.tId + "_a");
				if ($("#diyBtn_"+treeNode.id).length>0) return;
				var editStr = "<span id='diyBtn_space_" +treeNode.id+ "'>("+ treeNode.catName+")</span>";
				aObj.append(editStr);
			},
	 		initSelectTree: function(){//初始化树栏目管理下拉
	 			 var _this = this;
	   			$.fn.zTree.init($("#selctTree"), {
	 				view: {
	 					 addDiyDom:_this.addDiyDom,
						 dblClickExpand: false
					},
					data: {
						 simpleData: {
	                        enable: true,
	                        pIdKey: 'pid',
	                        idKey: 'id',
	                        rootPId: null
	                    }
					},
					async: {
						enable: true,
						type: "get",
						dataType: "text",
						url:_this.initUrl,
						otherParam: {"cid": _this.params.cid},
						dataFilter: function (treeId, parentNode, childNodes) {
				            if (!childNodes) return null;
				            return childNodes.data;
				        }
	                },
					callback: {
						beforeClick: _this.beforeClick,
						onClick: _this.onClick
			 
					}
 				});
	 		
	 		},
		
	 	},
	 	mounted:function(){
	 		var _this=this;
	 		this.getCid();
	 		this.getList();
	 		if(window.localStorage.getItem("pagesize")){
	 			_this.pagesize=window.localStorage.getItem("pagesize");
	 		}else{
	 			window.localStorage.setItem("pagesize",_this.pagesize);
	 		}
	 		this.initSelectTree();
	 	}
});	 	


function showMenu(){
var cityObj = $("#citySel");
var cityOffset = $("#citySel").offset();
$("#menuContent").slideDown("fast");
$("body").bind("mousedown", onBodyDown);
}
function hideMenu() {
$("#menuContent").fadeOut("fast");
$("body").unbind("mousedown", onBodyDown);
}
function onBodyDown(event) {
	if (!(event.target.id == "menuBtn" || event.target.id == "menuContent" || $(event.target).parents("#menuContent").length>0)) {
	hideMenu();
	}
}	


function batchOpear(msg){
	mgeCom_vm.batchOpear(msg);
}

function changeStatus(target,msg){
	mgeCom_vm.changeStatus(id,msg);
}

function operate(msg,target){
	var id=$(target).attr('data');
	mgeCom_vm.operate(msg,id);
}
