var vm_mgecolumn = new Vue ({
	    el:'#mgecolumn',
		data:function(){
			return {
				initUrl: api.ListColumnTreeInfo(),//初始化树接口
				signUrl: api.GetSignTreeClass(),//标签管理url树节点地址
				signCat:'',//查询标签参数
				sign_pid:'',//新添加标签父ID
				noSignList:[{
					id:'',
					name:'无',
					pid:''
				}],//空树的节点
				columnSorts:[],//栏目类型
				modelLinks:[],//模板页面链接地址
				categroies:'',//zTree构造函数
				rid:'',//购买模板id
				pageImg:'/img/33.jpg',//选择模板页面图片
				sign: 'son',//初始化默认增加子节点
	            saveTreeData:{//新增树节点信息
	            	    cid: "",								//tb_company.id	        必填
					    pid: "",								//父类栏目id		        选填
					    cat: "",				                //tb_code_name.id	必填
				        name: "",						        //栏目名				必填
				        en:"",                                  //栏目英文名               选填
				        link:"",                                //模板页面链接              必填
					    img: "",								//图片				选填
					    status: '20',							//状态  10.禁用；20启用 必填
					    title:'',                               //页面标题            
					    keywords:'',                            //页面关键字
					    description:'',							//页面描述			
					    img:'',                                 //栏目图片
//					    sortno: "10"							//排序				选填
	            }
			}
		},
		methods: {
			validate: function(){
				$("#addFirst").validate({
				 	rules: {
				 		colnamePar: "required"
				 	},
				 	messages: {
				 		colnamePar: "栏目名称不能为空！"
				 	},
				 	invalidHandler: function(form, validator){
				    	return false;
				    },
				    errorPlacement: function(label, element){
			    		$(label).addClass("alert-danger");
			    		$(element).parent().siblings(".v-error").append(label);
				    }
				});
			  $("#addSecd").validate({
				 	rules: {
				 		colnameSon: "required"
				 	},
				 	messages: {
				 		colnameSon:  "栏目名称不能为空！"
				 	},
				 	invalidHandler: function(form, validator){
				    	return false;
				    },
				    errorPlacement: function(label, element){
			    		$(label).addClass("alert-danger");
			    		$(element).parent().siblings(".v-error").append(label);
				    }
				});
			},
			radioCheck: function(statu){
				statu == 20? this.saveTreeData.status ='20':this.saveTreeData.status = '10';
			},
			selectVal: function(ele){//选择栏目类行
				var val = $('#'+ele).find("option:selected").val();
				var  $error = $('#'+ele).parents(".group").find(".v-error");
				if(val){
						this.saveTreeData.cat = val;
						this.setCatForSignParam(val);//获取可添加分类标签
						$("#signList").val('');
						$("#menuContent1").hasClass('dis-n') || $("#menuContent1").addClass('dis-n');
						if(val == '25174661566300294'){//单页不用填写seo
							$('#'+ele).parents(".md-modal").find(".seoContent").addClass("dis-n");
						}else{
							$('#'+ele).parents(".md-modal").find(".seoContent").removeClass("dis-n");
						}
						this.toggleModelLink(val);//根据栏目类型选择模板页面
						$error.hide();
						return true;
				}else{
						$error.find("label").text("请选择栏目类型！");
						$error.show();
						return false;
				}
			},
			setCatForSignParam: function(n){
				var  _this = this;
				switch(n)
				{
				case '25174661566300304'://首页
				 _this.signCat = '';
				  $(".signContent").hide();
				  break;
				case '25174661566300294'://单页
				 // 执行代码块 2
				  _this.signCat = 9;
				 $(".signContent").hide();
				  break;
				case '25174661566300295'://新闻
				 // 执行代码块 2
				  	 _this.signCat = 7;
				  $(".signContent").show();
				  break;
			    case '25174661566300296'://商品
				 // 执行代码块 2
				  _this.signCat = 1;
				  $(".signContent").show();
				  break;
				case '25174661586300305'://相册
				 // 执行代码块 2
				 _this.signCat = '';
				   $(".signContent").hide();
				  break;
				  case '25174661566300297'://产品
				 // 执行代码块 2
				  _this.signCat = 8;
				  $(".signContent").show();
				  break;
				 default:
				   break;
				 // n 与 case 1 和 case 2 不同时执行的代码
				}
			},
			selectValModelLink: function(ele){//选择模板链接
				var link_val = $("#"+ele).find("option:selected").val();
				var img_url = $("#"+ele).find("option:selected").attr("img");
				var  $error = $("#"+ele).parents(".group").find(".v-error");
				if(link_val){
					//切换模板页面
						this.saveTreeData.link = link_val;//添加栏目模板链接
						this.pageImg = img_url;//选择模板链接预览图
						$error.hide();
						return true;
				}else{
						$error.find("label").text("请选择模板页面！");
						$error.show();
						return false;
				}
			},
			toggleModelLink: function(col_type){//初始化模板链接数据
				   var _this =this;
				 	   api.ListModelPageLink({
				 	   		cid: _this.saveTreeData.cid,
				 	   		m_type: col_type
				 	   })
					   .then(function(res){
					   		if(res.success){
					   			_this.modelLinks = res.data;//链接页面
					   		}
					   })
		               .catch(function(error){
		               	    console.log(error);
		               })
	             
			},
			params: function(initUrl){//自定义配置zTree参数
				var _this = this;	
		 	  	return {
		            ztree:{
		                data: {
		                	keep: {
								leaf: true,
								parent: true
							},
		                    simpleData: {
		                        enable: true,
		                        idKey: "id",
		                        pIdKey: "pid",
		                        rootPId: null
		                    }
		                },
		                async: {
							enable: true,
							type: "get",
							dataType: "text",
							url:initUrl,
							otherParam: {"cid": _this.saveTreeData.cid},
							dataFilter: function (treeId, parentNode, childNodes) {
					            if (!childNodes) return null;
					            return childNodes.data;
					        }
		               },
		               callback: {
		               		onRename: _this.zTreeOnRename,//更改树节点名称
//		              		onDrop: _this.zTreeOnDrop//拖動節點
							onAsyncSuccess: _this.zTreeOnAsyncSuccess
		               }
		            }
	          	}
			 },
			 zTreeOnAsyncSuccess: function(){
			// 	callBackLoadIframe();//重置iframe高度
			 },
			 initColumSort: function(){//初始化栏目类型管理
		 	   var _this = this;
		 	   if(_this.saveTreeData.cid){
			 	   api.InitColumSort(_this.saveTreeData)
				   .then(function(res){
				   		if(res.success){
				   		  _this.columnSorts = res.data;
			   		      _this.opreTree('expend');
				   		}else{
				   			console.log("栏目信息获取失败！")
				   		}
				   })
	               .catch(function(error){
	               	    console.log(error);
	               })
              }
			 },
			 initTree: function(){//初始化树结构
			 	var _this = this;
			 	if(this.saveTreeData.cid){
					Categories("#treeDemo", this.params(_this.initUrl));
				}
			 },
			 zTreeAddNode: function(){//新增节点
			   var vld =''; 
			   var h = false;  //栏目名称验证
			   var sel = false;//栏目类型验证
               var _this = this;
               var rootOrNot =_this.sign;
               this.saveTreeData.keywords = '';
               this.saveTreeData.img=$('#columnImg').attr('src');
               if(rootOrNot == 'son'){
               	 _this.saveTreeData.pid = _this.categroies.treeNode.id;
               }else{
               	   _this.saveTreeData.pid = '' ;
               }
               //整理页面关键词分类
               _this.setKeywords('keywordBox_add');
	              vld = $("#addFirst").validate();
	           	  h = vld.form();
	           	  sel = _this.selectVal('selColumn');
			 	//验证通过提交请求
			 	if(h && sel){
					 api.AddColumnNode(_this.saveTreeData)
					   .then(function(res){
					   			//清空添加模态框的数据！！！避免下次会提交默认的值
					   		window.top.location.reload();
					   })
	                   .catch(function(error){
	                   	    console.log(error);
	                   })
	                   $('#md-addColumn').toggleCommModal('close');
	            }
			 },
			 zTreeEditNode:function(treeNode){
			 	var _this = this;
			 	 _this.saveTreeData.keywords = '';
			 	api.SearchColumnNode({
			 		id: treeNode.id
			 	}).then(function(res){
			 		res.data && $.extend(_this.saveTreeData, res.data);
			 		_this.setCatForSignParam(_this.saveTreeData.cat);
			 		$("#signList_edit").val('企业新闻,公司新闻');//回显标签分类 回显+ID
		 			$("#signList_edit").attr('title','企业新闻,公司新闻');//回显标签分类 回显+ID
			 		$("#signListIds_edit").val('8b5b3078663e4a38beadc7fa3efdf8d6,e3e584a041b141b1b17f99a0b25741d5');//回显标签nodeId 
			 		if(res.data.cat == '25174661566300294'){//单页内容不显示seo区域
			 			$("#md-modColumn").find(".seoContent").addClass('dis-n');
			 			$("#md-modColumn").find('form').css({'height': '240px'});
			 		}else{
			 			$("#md-modColumn").find(".seoContent").removeClass('dis-n');
			 			$("#md-modColumn").find('form').css({'height': '436px'});
			 		}
			 		//回显关键字
			 		if(res.data){
			 			_this.reShowKeywords("keywordBox_mod");
			 		}
				}).catch(function(error){
	               	console.log(error);
	            });
			 },
			 reShowKeywords: function(id){//组件：回显关键字
			 	var  _this = this;
			 	var keywords=null;
			 	if( _this.saveTreeData.keywords){
			 		 keywords = _this.saveTreeData.keywords.split(",");
			 		 var keywordlen=keywords.length;
			 		  $('#'+id).find('.row-tagsBox').html('');
			 		 for(var i=0;i<keywordlen; i++){
			 			 keywords[i] = HtmlUtil.htmlEncode(keywords[i]);
			 			 $('#'+id).find('.row-tagsBox').append('<span class="tags-span rel">' +'<span class="tags_value">' +keywords[i]+'</span>'
			 					 + 	'<i class="iconfont i-tags-close abs">&#xe624;</i>'
			 					 +	'</span>');
			 		 }
			 	}
			 	_this.saveTreeData.keywords = '';
			 },
			 setKeywords: function(keywordBoxId){
			 		var tagArr=[]; 
			 	 	var length=$('#'+keywordBoxId).find('.tags_value').length;
	   				for(var i=0; i<length; i++){
	   					tagArr.push($('#'+keywordBoxId).find('.tags_value').eq(i).text());
	   				}
	   				if(tagArr.length > 0){
	   					this.saveTreeData.keywords = tagArr.join(',');
	   				}else{
	   					this.saveTreeData.keywords =null;
	   				}
			 },
			 saveUpdateEditNode: function(keywordBox){
			 	var _this = this;
			 	_this.saveTreeData.keywords = '';
   			   	_this.setKeywords(keywordBox);
   			    _this.saveTreeData.img=$("#columnImg1").attr('src');
   			    console.log(_this.saveTreeData.img);
	            api.UpdateColumnNameNode(_this.saveTreeData).then(function(res){
			   			if(res.success){
							window.top.location.reload();
						    _this.clearValue();
			   			}
				}).catch(function(error){
                   	    if(error.data){
                   	    	if(!error.data.success){
                   	    		$.CwsPopup.Alert("提示",error.data.msg);
                   	    	}
                   	    }
               });
               
			 },
			 clearValue:function(ele){//修改后清除历史记录
			 	var _this = this;
			 	$.extend(this.saveTreeData, {
	            	    cid: "",								
					    pid: "",								
					    cat: "",				               
				        name: "",	
				        en:"",
				        link:"",                                
					    img: "",								
					    status: '20',							
					    title:'',                                       
					    keywords:'',                           
					    description:''												
	            });
	            $("#md-modColumn").toggleCommModal('close');
			 },
			 zTreeDelNode: function(){//删除节点
	 	    	 var _this = this;
	 	         var crtId = _this.categroies.treeNode.id;
			 	   //验证通过提交请求(是否是子节点  如果是子节点才能提交删除)
				 api.DelColumnNode(crtId)
				  .then(function(res){
				   		if(res.success){
							 window.location.reload();
//               			$("#confirmModal").modal('hide');
				   		}
				  }).catch(function(error){
                   	    if(error.data){
                   	    	if(!error.data.success){
                   	    		$.CwsPopup.Alert("提示",error.data.msg);
                   	    	}
                   	    }
                   })
	 			 Categories("#treeDemo", this.params(_this.initUrl));
			 },
			 zTreeOnRename: function(event, treeId, treeNode, isCancel){//修改节点名称
			 	api.UpdateColumnNameNode({
			 		id: treeNode.id,
			 		name: treeNode.name
			 	}).then(function(res){
			   			if(res.success){
							window.location.reload();
			   			}
				}).catch(function(error){
                   	    if(error.data){
                   	    	if(!error.data.success){
                   	    		$.CwsPopup.Alert("提示",error.data.msg);
                   	    	}
                   	    }
               });
			 },
			 getCid: function(){//通过local
				var cid ='';
				if(getUserCookie()){
					cid=getUserCookie().cid ;
					this.rid = getUserCookie().rid && getUserCookie().rid.replace(/\"/g, "") || '';
				}
				if(cid){
					this.saveTreeData.cid = cid;
				}else{
					console.log("Error:当前用户没有cid,所以获取不到栏目信息！");
				}
			},
			opreTree: function(value){//操作树
				var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
				if(value == 'expend'){//展开
					treeObj.expandAll(true);
					$(".ztree-container").find(".editing-active").removeClass("editing-active");
					$(".ztree-container").find(".all-open").addClass("editing-active");
				}else{//折叠
					treeObj.expandAll(false);
					$(".ztree-container").find(".editing-active").removeClass("editing-active");
					$(".ztree-container").find(".all-close").addClass("editing-active");
				}
			//	callBackLoadIframe();//重置iframe高度
			},
			flush: function(){
				window.location.reload();
			},
			/*标签管理start*/
			setClasifyTree: function(TreeId){//自定义配置标签分类zTree参数
				var _this = this;	
				var treeid = TreeId;
				var checkBox = {};
				var click_fun = null;
				var choose_fun = null;
				var retrn_fun = null;
				if(treeid == 'treeClasifyParent'){//选择父级
					click_fun = _this.onClickChooseVal;
				}else if(treeid == 'signClasify' || treeid == 'signClasify_edit'){//选择标签
				 	choose_fun =_this.OnCheckChooseVal;
				 	checkBox = {
						enable: true,
						chkStyle: "checkbox",
						chkboxType: { "Y": "s", "N": "ps" }
					}
				 	//zTreeOnAsyncSuccess
				 	if(treeid == 'signClasify_edit'){
				 		retrn_fun = _this.asyncSuc_fun;
				 	}
				 }
				 return {
		            ztree:{
		                data: {
		                	keep: {
								leaf: true,
								parent: true
							},
		                    simpleData: {
		                        enable: true,
		                        idKey: "id",
		                        pIdKey: "pid",
		                        rootPId: null
		                    }
		                },
		                check: checkBox,
		                async: {
							enable: true,
							type: "get",
							dataType: "text",
							url:_this.signUrl,
							otherParam: {"cid": _this.saveTreeData.cid ,'cat':_this.signCat},
							dataFilter: function (treeId, parentNode, childNodes) {
					            if (!childNodes){ 
					            	return null;
					            }else{
					            	if(childNodes.data && childNodes.data.length == 0){
					            		return _this.noSignList;
					            	}else{
					            		if(childNodes && childNodes.data){
					            				childNodes.data.push(_this.noSignList[0]);
					            				return childNodes.data	;
					            		}else{
					            			return null;
					            		}
					            		
					            	}
					            	
					            }
					        }
		               },
		                view: {
//		                    expandSpeed: "fast",
		                    addDiyDom:_this.addDiyDom,
//		                    showIcon: false,
//							showLine: false,
							dblClickExpend: false
		                },
		               callback: {
		               		onClick: click_fun,
		               		onCheck: choose_fun,//多项选择分类
		               		onAsyncSuccess: retrn_fun
		               }
		            }
	          }
			},
	        onClickChooseVal: function(e, treeId, treeNode){
	          	 if(treeId == 'treeClasifyParent' && treeNode.level < 2){//选择父级(最多不能添加超过三级)
          	 			$("#child-select1").val(treeNode.name);
          	 			this.sign_pid = treeNode.id;
	          	 	 	$("#category").addClass('dis-n'); 	
	          	 }
	        },
	        OnCheckChooseVal:function(e, treeId, treeNode){
	        	var treeObj = $.fn.zTree.getZTreeObj(treeId);
				var nodes = treeObj.getCheckedNodes(true);
				var sign_list ='';
				var nodes_name = [];
				var nodes_ids = [];
				for(var i =0;i<nodes.length; i++){
				    nodes_name.push(nodes[i].name);
				    nodes_ids.push(nodes[i].id);
				}
				if(treeId == 'signClasify'){//选择父级
				     sign_list = '#signList';
				     $('#signListIds').val(nodes_ids.join(","));
          	 		//$("#menuContent1").addClass('dis-n');	
          	    }else if(treeId == 'signClasify_edit'){
          	    	sign_list = '#signList_edit';
          	    	$('#signListIds_edit').val(nodes_ids.join(","));
          	    }
					$(sign_list).attr('title', nodes_name.join(","));
      	 		    $(sign_list).val(nodes_name.join(","));
	        },
	        asyncSuc_fun:function(e, treeId, treeNode,msg){//返回树节点后回显节点值
	        	//回选node值
	        	    var treeObj = $.fn.zTree.getZTreeObj(treeId);
					var  params = $("#signListIds_edit").val().split(',');
					for(var i=0; i<params.length; i++){
						var nodes = treeObj.getNodesByParam("id", params[i]);
						  for(var k=0; k<nodes.length; k++){
						  	 treeObj.checkNode(nodes[k], true, true);
						  }
					}
	        },
	        saveNewSign: function(){//添加新标签
	        	//cat   cid   name pid
	        	var _this =this;
	        	api.GoodsClassAdd({
	        		cid:  _this.saveTreeData.cid,
			 		cat:  _this.signCat,
			 		name: $("#newsClassName").val(),
			 		pid:  _this.sign_pid
			 	}).then(function(res){
			   			if(res.success){
			   				$("#md-addSign").toggleCommModal('close', false);
			   				$("#child-select1").val('');//上级分类
			   				$('#newsClassName').val('');//分类名称
							window.location.reload();
			   			}
				}).catch(function(error){
                   	    if(error.data){
                   	    	if(!error.data.success){
                   	    		$.CwsPopup.Alert("提示",error.data.msg);
                   	    	}
                   	    }
               });
	        },
			openTree: function(TreeId){
				var _this = this;
			    Categories("#"+TreeId, this.setClasifyTree(TreeId),'orign');
			}
		},
		watch: {
				 modelLinks: function(){
				 	  var _this = this;
				 	  this.$nextTick(function(){
							//if(document.getElementById("selLink").options.length >1){//初始化模板链接
				   				document.getElementById("selLink").options[1].selected =true; 
				   				_this.selectValModelLink('selLink');
				   			//}
				 	  });
				 }
		},
		mounted:function(){
			 this.getCid();
		     this.validate();//添加栏目管理节点验证
			 this.initTree();//初始化树
			 this.initColumSort();//初始化栏目类型
             this.categroies = Categories.instance;//获取树
		}
	});
	

// 自定义弹窗(添加一级栏目)
$('#column_levelOne').on('click', function() {
	vm_mgecolumn.sign = 'parent';
	$('#md-addColumn').find('.md-title').text('添加一级栏目');
	$("#addFirst")[0].reset();   //清空表单
	$(".upload-file img").attr('src','');  //清空栏目图片
	$('#md-addColumn').toggleCommModal('show');
});

//展示标签分类
//父类
$(document).on('click', '#child-select1',function(){
	 vm_mgecolumn.openTree("treeClasifyParent");
	 var  catgry = $(this).parents('.md-modal').find('#category');
	
	 if(catgry.hasClass('dis-n')){
	 		catgry.removeClass('dis-n');
	 		// catgry.focus();
	 }else{
	 	 catgry.addClass('dis-n');
	 }
});
//标签list
$(document).on('click', '#signList,#signList_edit',function(){
	var dom_id = $(this).attr('id');  
	var tree_id  = '';
	if(dom_id == 'signList'){//新增
		tree_id = 'signClasify';
	}else{//修改
		tree_id = 'signClasify_edit';
//		alert(11)
//		if($(this).val() != ''){
//			console.log('回显选择树结果')
//		}
	}
	vm_mgecolumn.openTree(tree_id);
	var  signsList = $(this).parents('.md-modal').find('.menuContent');
	if(signsList.hasClass('dis-n')){
	 	signsList.removeClass('dis-n');
	}else{
	 	signsList.addClass('dis-n');
	}
});

//$(document).on('blur', '#signList', function(){
//	if($(this).attr('id')!='menuContent1'){
//		var  signList = $(this).parents('.md-modal').find('#menuContent1');
//		signList.hasClass('dis-n') || signList.addClass('dis-n');
//	}
//	
//});

function saveNewSg(){//添加新标签
	vm_mgecolumn.saveNewSign();
}

//失去焦点隐藏树结构
//$(document).on('blur',"#category,#menuContent1",function(){
//	//$(this).addClass('dis-n');
//	console.log($(this))
//	
//});
$("select,#showAddSign").on('click',function(){
	if(!$(this).hasClass(".menuContent ")){
		
	$("#menuContent1").hasClass('dis-n') || $("#menuContent1").addClass('dis-n');
	}
});
