var mgrCon_vm=new Vue({
		data: function(){
	 		return {
	 			initUrl:  api.baseUrl()+'/column2.do?get',
	 			params: {
	 				cid: '',	//必填
	 				flag:1,
	 				//type: '25174661566300294',              //内容分类 选填
	 				mid: '',//栏目分类 选填
	 				//cat: '500102',                          //商品分类 选填
	 				currentpage: 1,                       //当前页     必填
	 				pagesize: 20,  
                    status:-1,
	 			},
	 			currentpage: 1,                       //当前页     必填
	 			jumppage:null,                       //跳转页码  
	 			pagesize: 20,  
	 			contentLines:[],//全部内容
	 			linesPerPage: ['10','20','30','50'],
	 			currentLines:'0',//当前请求行
	 			totalPages: '',
	 			noData: false
	 		}
	 	},
	 	methods:{
	 		renderEfect: function(){//内容管理下拉
				$('.select-edit').click(function(){
					if($(".select-edit").siblings().css("display") == 'block'){
						$(".select-edit").siblings().slideUp('fast');
					}else{
						$(".select-edit").siblings().slideDown('fast');
					}
				});
				$('.select-edit-list p').click(function(){
					$(this).parent().siblings().text($(this).text());
					$(this).parent().slideUp('fast');
				});
	 		},
//	 		ckAll: function(e){
//	 			$(e.target).prop("checked") && $(".th-1").find("input[type='checkbox']").prop("checked", true);
//	 			$(e.target).prop("checked") || $(".th-1").find("input[type='checkbox']").prop("checked", false);
//	 		},
//	 		ckCur: function(e){
//	 			if($(e.target).prop("checked")){
//	 				if($(".th-1").find("input[type='checkbox']").length-1 == $(".th-1").find("input:checked").length){
//	 					$(".ckall").prop("checked", true);
//	 				}
//	 			}else{
//	 				$(".ckall").prop("checked", false);
//	 			}
//	 		},
	 		//批量操作（删除，发布，还原）
	 		batchOperate:function(msg){
	 			
	 			var _this=this;
	 			var flag=null;
	 			var operate='';
	 			if(msg==1){
	 				flag=1;
	 				operate='还原';
	 			}else if(msg==2){
	 				flag=2;
	 				operate='彻底删除';
	 			}
	 			var len=$(".content-edit-box-bg  input[type='checkbox']").length;
	 			var delNum=[]; //成功删除的数据  
	 			$.CwsPopup.Confirm("提示",'是否'+operate+'这些内容',function(){
			                        for(var n=0; n<len; n++){
						 				if($(".content-edit-box-bg  input[type='checkbox']")[n].checked){
						 					delNum.push($(".content-edit-box-bg input[type='checkbox']")[n].value);
						 				}
					 				}
					 				var str=delNum.join(",");
				   					var data1={
				   						'id':str,
				   						'flag':flag
				   					}
				   					api.ContentDelete(data1).then(function(res){
					 					if(res.success){
//				                          $(".content-edit-box-bg input[type='checkbox']").prop("checked", false);
											$('.ck_all')[0].checked=false;
											_this.loadContent();
											$(".content-edit-box-bg input[type='checkbox']").prop("checked", false);
				                            $.CwsPopup.Alert("提示",operate+"成功！");
				                            setTimeout(function (){
									       	 	$.CwsPopup.OperateCwsPopup('hide');
									       	 },2000);
									     
					 					}
					 				}).catch(function(err){
					 					console.log(err);
					 					$.CwsPopup.Alert("提示",operate+"失败！");
					 				})
							},function(){
			                       $.CwsPopup.OperateCwsPopup('hide');
							},'确定', '取消');
	 		},
	 		operate: function(msg,id){
	 			var _this=this;
	 			var el = event.currentTarget;
	 			var operate=''; 
	 			if(msg==1){
	 				operate='还原';
	 			}else if(msg==2){
	 				operate='删除';
	 			}
	 			var data={
					'id':id,
					'flag':msg        
				};
				console.log(data);
	 			$.CwsPopup.Confirm("提示","是否"+operate+"这个内容",function(){
	 				    console.log("我是删除函数！");
	 		    		api.ContentDelete(data).then(function(res){
	 		    			console.log(res);
		 					if(res.success){
		 							_this.loadContent();
		 							$('.ck_all')[0].checked=false;
//		 						$('.content-edit-box-bg')[0].removeChild( $(el).parent().parent()[0]);
	 					    	$.CwsPopup.Alert("提示",operate+"成功！");
		 					}
		 				}).catch(function(err){
		 					console.log(err);
		 					$.CwsPopup.Alert("提示",operate+"失败！");
		 				});
				},function(){
                       $.CwsPopup.OperateCwsPopup('hide');
				},'确定', '取消');

	 		},
	 				//改变 查找的页面
		    selcValue: function(e){
	 			this.pagesize = $(e.target).find("option:selected").val();
	   			if(this.pagesize ){
	 				window.localStorage.setItem("pagesize",this.pagesize);
	 			}
	   			this.loadContent();//查询内容
	 		},
			//跳转到某页
			changeCurrentPage: function(e){
//	 			var _this = this;
//	 			if($.trim($('.currentpage').val()) != ''){
//	 			    if(Number($('.currentpage').val()) <= Number( _this.totalPages)){
//	 			    	  _this.currentpage = $('.currentpage').val();
//	 			    }else{
//	 			        	$('.currentpage').val(this.currentpage) ;
//	 			    }
//	 			}
//	 			setCurrentPage('rclCon', _this.currentpage);
//	 			_this.loadContent();
				var _this = this;
	 			if($.trim($('.currentpage').val()) != ''){
	 				if(Number($('.currentpage').val())<=0){
	 						_this.jumppage=_this.currentpage;
	 						return;
	 				}else  if(Number($('.currentpage').val()) <= Number( _this.totalPages)){
	 			    	  	_this.jumppage = $('.currentpage').val();
	 			    	  	_this.currentpage=_this.jumppage;
				 			setCurrentPage('rclCon', _this.currentpage);
				 			_this.loadContent();
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
	 			setCurrentPage('rclCon', _this.currentpage);
	   			_this.loadContent();
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
	 			setCurrentPage('rclCon', _this.currentpage);
	   			_this.loadContent();
	 		},
	 		beforeClick: function(treeId, treeNode){
 				var check = (treeNode && !treeNode.isParent);
				if (!check)  $.CwsPopup.Alert("提示","不能选择父节点！");
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
				this.params.mid = treeNode.id;
				$("#citySel").attr("value", v);
				$('#menuContent').slideUp();//选中后赋值并收起
				$('.ck_all')[0].checked=false;
				for(var i=0;i<$('.ck_one').length;i++){
					$('.ck_one')[i].checked=false;
				}
				this.currentpage=1;
    			setCurrentPage('rclCon', this.currentpage);
				this.loadContent();//查询内容
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
									 dblClickExpand: false,
//									 showLine: false
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
	 		loadContent: function(){
	 			var _this = this;
	 			this.params.pagesize=this.pagesize;
 			 	if(getCurrentPage('rclCon')){
 			 		this.currentpage=getCurrentPage('rclCon');
	 				this.params.currentpage=this.currentpage;
	 			}
	 			api.ListContent(this.params).then(function(res){
				   	   if(res.success){
				   	   	  if(res.data){
				   	   	  	_this.contentLines = res.data[0];
				   	   	  	if(res.data[0].length > 0){
				   	   	  			for(var n=0; n<res.data[0].length; n++){
						   	   	  		var update_time=new Date(res.data[0][n].update_time);
						   	   	  		res.data[0][n].update_time=_this.getTime(update_time);
						   	   	  	}
						   	   	    _this.currentLines=res.data[0].length;
						   	   	    _this.noData=false;
				   	   	  	}else{
									_this.noData = true;				   	   	  		
				   	   	  	}
				   	   	  }
				   	   	  _this.totalPages = res.data[1].pagenumber;//共几页
				   	   	  _this.totalPages=res.data[1].pagenumber;
				   	   	  $(".x-tips").fadeOut();
				   	   	  callBackLoadIframe();//重置iframe高度
				   	   }
				  }).catch(function(error){
                   	     console.log("处理失败！");
                 });
	 		},
	 		//时间戳转换日期
             getTime: function(now){
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
		    getCid: function(){//通过local
				var cid ='';
				if(getUserCookie()){
					cid=getUserCookie().cid ;
				}
				if(cid){
					this.params.cid = cid;
				}else{
					console.log("Error:当前用户没有cid！");
				}
			}
	 	},
	 	mounted: function(){
	 		var _this=this;
	 		this.getCid();
	 		if(window.localStorage.getItem("pagesize")){
	 			_this.pagesize=window.localStorage.getItem("pagesize");
	 		}else{
	 			window.localStorage.setItem("pagesize",_this.pagesize);
	 		}
	 		this.renderEfect();
	 		this.initSelectTree();//初始化网站栏目 
	 		this.loadContent();//初始化内容
	 	}
}).$mount("#contrecv");

    function batchOperate(msg){
    	mgrCon_vm.batchOperate(msg);
    }

    function operate(msg,target){
    	var  id=$(target).attr('data');
    		mgrCon_vm.operate(msg,id);
    }







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
