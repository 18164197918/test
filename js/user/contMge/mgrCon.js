
var mgrCon_vm=new Vue({
	 	data:function(){
	 		return {
	 			initUrl: api.baseUrl()+'/column2.do?get',
	 			params: {
	 				cid: '',	  //必填
	 				flag:1,
//	 				status:1,
//	 				uid:'',      //必填
	 				//type: '25174661566300294',              //内容分类 选填
	 				mid: '',                                  //栏目分类 选填
	 				//cat: '500102',                          //商品分类 选填
	 				currentpage: 1,                       //当前页     必填
	 				pagesize: 20                          //页面大小 必填
	 			},
	 			ztreeObj:'',
	 			currentpage: 1,                         //当前页     必填
	 			jumppage:null,                          //跳转页码
	 			pagesize: 20 ,                          //页面大小 必填
 				contentLines:[],//全部内容
	 			linesPerPage: ['10','20','30','50'],
	 			currentLines:'0',//当前请求行
	 			totalPages: '',
	 			noData: false,
	 			addConClear:true,  //添加内容时是否清除已选的栏目和类型值
	 		}
	 	},
	 	methods:{
	 		//进入内容添加页
	 		addcontent:function(){
	 			if( this.ztreeObj.getNodes().length == 0){
	 				 $.CwsPopup.Alert("提示","暂无栏目添加内容！");
	 			}else{
	 				if(this.addConClear){
	 					window.localStorage.setItem('ct','');
	 					window.localStorage.setItem('cn','');
	 				}
		 			setIframeUrl('user/contMge/addCon.html?isadd=true&mid='+this.params.mid);
					window.location.href=fontBaseUrl+'user/contMge/addCon.html?isadd=true&mid='+this.params.mid+'&page='+this.currentpage;
	 			}
	 		},
	 		renderEfect: function(){//内容管理下拉
				$('.select-edit').click(function(){
					if($(".select-edit").siblings().css("display") == 'block'){
						$(".select-edit").siblings().slideUp('fast');
					}else{
						$(".select-edit").siblings().slideDown();
					}
				});
				$('.select-edit-list p').click(function(){
					$(this).parent().slideUp('fast');
				});
	 		},
	 		selcValue: function(e){
	 			this.pagesize = $(e.target).find("option:selected").val();
	 			if(this.pagesize ){
	 				window.localStorage.setItem("pagesize",this.pagesize);
	 			}
	 			this.loadContent();//查询内容
	 		},
	 		//全选
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
	 		batchOpear:function(msg){
	 			var _this=this;
	 			var flag=null;
	 			var operate='';
	 			if(msg==1){
	 				flag=-1;
	 				operate='删除';
	 			}else if(msg==2){
	 				flag=1;
	 				operate='发布';
	 			}
	 			var len=$(".content-edit-box-bg  input[type='checkbox']").length;
	 			if(len>0){
		 			var delNum=[]; //成功删除的数据
		 		//	var isBatchDel=window.confirm('是否'+operate+'这些内容');
//		 			if(isBatchDel){
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
	   					if(data1.id){
	   						$.CwsPopup.Confirm("确认信息",'是否'+operate+'这些内容',function(){
			   					api.ContentDelete(data1).then(function(res){
				 					if(res.success){
			                          _this.loadContent();  
			                          $('.ck_all')[0].checked=false;
			                          $(".content-edit-box-bg input[type='checkbox']").prop("checked", false);
									  $.CwsPopup.Alert("提示",operate+"成功！");
				 					}
				 				}).catch(function(err){
				 					console.log(err);
				 					$.CwsPopup.Alert("提示",operate+"失败！");
				 				})
			 				},function(){
	                       $.CwsPopup.OperateCwsPopup('hide');
						},'确定', '取消');
		 				}else{
		 					$.CwsPopup.Alert("提示","请选中待操作项！");
		 				}
//		 			}

	 			}
	 		},
	 		operate: function(msg,id,mid,cat){
	 			var _this=this;
				//获取点击对象      
				var data={
					'id':id,
					'flag':-1
				}
				//修改内容
				if(msg==2){
					window.localStorage.setItem('ct','');
 					window.localStorage.setItem('cn','');
					setIframeUrl('user/contMge/addCon.html?isadd=false&mid='+mid+'&cat='+cat+'&id='+id);
				    window.location.href=fontBaseUrl+'user/contMge/addCon.html?isadd=false&mid='+mid+'&cat='+cat+'&id='+id+'&page='+_this.currentpage;
				}
	 			//删除操作
	 			if(msg==3){
	 				$.CwsPopup.Confirm("确认删除","是否删除这个内容？",function(){
						api.ContentDelete(data).then(function(res){
		 					if(res.success){
		 						_this.loadContent();
		 						$('.ck_all')[0].checked=false;
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
	 		//置顶内容
//	 		setTop:function(data){
//	 			var that=this;
//	 			var data1={
//					'id':data
//				}
//	 			//置顶操作
//	 			api.ContentRank(data1).then(function(res){
//	 				if(res.success){
//	 				    that.loadContent();//查询内容
//	 					$.CwsPopup.Alert("提示","置顶成功！");
//	 				}
//	 			}).catch(function(err){
//		 		    console.log(err)
//	 			})
//	 			
//	 		},
	 		//跳转到某页
			changeCurrentPage: function(e){
	 			var _this = this;
	 			if($.trim($('.currentpage').val()) != ''){
	 				
	 				if(Number($('.currentpage').val())<=0){
	 						_this.jumppage=_this.currentpage;
	 						return;
	 				}else  if(Number($('.currentpage').val()) <= Number( _this.totalPages)){
	 			    	  	_this.jumppage = $('.currentpage').val();
	 			    	  	_this.currentpage=_this.jumppage;
				 			setCurrentPage('mgrCon', _this.currentpage);
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
	 			 setCurrentPage('mgrCon', _this.currentpage);
	 			 _this.loadContent();
//				 windowOpenPage(fontBaseUrl + 'user/contMge/mgrCon.html?page='+this.currentpage);
	 		},
	 		addPage: function(sign){
	 			var _this = this;
	 			if(sign == 'son'){
		 			var cur = (_this.currentpage -1 + 2) % (_this.totalPages-1+2);
		 			_this.currentpage = (cur == 0) ? 1 : cur ;
	 			}else{
	 				_this.currentpage =  _this.totalPages;
	 			}
	 			setCurrentPage('mgrCon', _this.currentpage);
//	 			windowOpenPage(fontBaseUrl + 'user/contMge/mgrCon.html?page='+this.currentpage);
	 			_this.loadContent();
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
				this.params.mid = treeNode.id;
				this.addConClear=false;
				window.localStorage.setItem("cn",this.params.mid );
				window.localStorage.setItem("ct",treeNode.cat );
				$("#citySel").attr("value", v);
				$('#menuContent').slideUp();//选中后赋值并收起
				$('.ck_all')[0].checked=false;
				for(var i=0;i<$('.ck_one').length;i++){
					$('.ck_one')[i].checked=false;
				}
//				windowOpenPage(fontBaseUrl + 'user/contMge/mgrCon.html?page='+this.currentpage);
				this.currentpage=1;
    			setCurrentPage('mgrCon', this.currentpage);
				this.loadContent();//查询内容
	 		},
	 		addDiyDom :function(treeId, treeNode) {
				var aObj = $("#" + treeNode.tId + "_a");
				if ($("#diyBtn_"+treeNode.id).length>0) return;
				var editStr = "<span class='columnType' id='diyBtn_space_" +treeNode.id+ "'>("+ treeNode.catName+")</span>";
				aObj.append(editStr);
			},
	 		initSelectTree: function(){//初始化树栏目管理下拉
	 			 var _this = this;
	   			  _this.ztreeObj = $.fn.zTree.init($("#selctTree"), {
	 				view: {
	 					 addDiyDom:_this.addDiyDom,
						 dblClickExpand: false,
//						 showLine: false
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
	 		//获取内容列表
	 		loadContent: function(){
	 			var _this = this;
	 			this.params.pagesize=this.pagesize;
	 			
	 			if(getQueryString('page')){
	 				this.currentpage=getQueryString('page') ;
	 				this.params.currentpage=getQueryString('page');
	 				
	 			}
	 			if(getCurrentPage('mgrCon')){
	 				this.currentpage=getCurrentPage('mgrCon');
	 				this.params.currentpage=getCurrentPage('mgrCon');
	 			} 
	 			api.ListContent(this.params)
				   .then(function(res){
				   	   if(res.success){
				   	   	  if(res.data && res.success){
				   	   	  	if(res.data[0].length > 0){
				   	   	  		for(var n=0; n<res.data[0].length; n++){
					   	   	  		var update_time=new Date(res.data[0][n].update_time);
					   	   	  		res.data[0][n].update_time=_this.getTime(update_time);
					   	   	  	}
					   	   	    _this.contentLines = res.data[0];           
					   	   	    _this.currentLines=res.data[0].length;
					   	   	    _this.noData=false;
				   	   	  	}else{
			   	   	  		    _this.contentLines = res.data[0];  
				   	   	  		_this.noData = true;
				   	   	  	}
		   	   	  	 	    _this.totalPages = res.data[1].pagenumber;//共几页
		   	   	  	 	    $(".x-tips").fadeOut();
				   	   	    callBackLoadIframe();//重置iframe高度
				   	   	  }
				   	   }
				   })
                   .catch(function(error){
                   	     console.log("处理失败！");
                   })
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
	              return   year+"-"+toDou(month)+"-"+toDou(date)+"   "+toDou(hour)+":"+toDou(minute)+":"+toDou(second); 
             },
	 		 getCid: function(){//通过local
				var cid =  '';
				if(getUserCookie()){
					cid=getUserCookie().cid || '';
				}
				if(cid){
					this.params.cid = cid;
				}else{
					console.log("Error:当前用户没有cid!");
				}
			},
			getUid: function(){
				if(getUserCookie()){
					 this.params.uid=getUserCookie().uid || '';
				}
			}
	 	},
	 	mounted:function(){
	 		var _this=this;
	 		this.getCid();//获取用户信息(localStroge)
	 		this.getUid();//获取用户的uid
	 		this.renderEfect();
	 		this.initSelectTree();//初始化网站栏目 
	 		if(window.localStorage.getItem("pagesize")){
	 			_this.pagesize=window.localStorage.getItem("pagesize");
	 		}else{
	 			window.localStorage.setItem("pagesize",_this.pagesize);
	 		}
	 		
	 		this.loadContent();//初始化内容
	 	}
	 }).$mount("#mgecontent");
	 
	 
	function showMenu() {
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
	 
	 
    //刷新
	function reload(){
		location.reload();
	}
	//添加内容
    function addcontent(){
    	mgrCon_vm.addcontent();
    }
	//批量操作
    function batchOpear(msg){
    	mgrCon_vm.batchOpear(msg);
    }
    function setTop(target){
    	var data=$(target).attr('data');
    	mgrCon_vm.setTop(data);
    }
    function operate(msg,target){
//  	console.log(msg,id);
    	var  id=$(target).attr('data');
    	var mid=$(target).attr('data2');
    	var cat=$(target).attr('data3');
    		mgrCon_vm.operate(msg,id,mid,cat);
    }
