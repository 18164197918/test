var addCon_vm=new Vue({
	    el:'#addcontent',
	 	data: function(){
	 		return {
	 			  'isAdd':true,                                 //true代表添加内容,false代表修改内容
	 			   'id':'', 
	 		      'column':'',    								//栏目名称
	 		      'columnNames':[],								// 选中的栏目						
	 		      'columnType':'',    							//六大类型（首页，商品，产品，新闻，单页，相册）
	 		      'catName':'',                                 //栏目类型 
	 			  'uid':"",      								//用户ID
	 			  'mid':'',        								//mid
	 			  'mnid':'',                                    //栏目菜单id 
//	 			  'columnValue':'',								//栏目的value值mid
	 			  'cid': '',	 								//必填
	 			  'status':null,                                //状态
	 			  'contentName':'',                             //单页的内容名称 
	 			  'productName':'',                             //产品的内容名称
	 			  "prodcat":"",			                            //新闻分类																											//商品分类												必填
			      'prodcatname':'',                                 //新闻分类名字 
	 			  'productVtext':'',                              //产品不同的参数内容 
	 			  'testSelect':"",                              //内容类型
	 			   'bigProductImg':'' ,                            //产品大图片
	 			   'smaProductImg':'' ,                            //产品小图片
	 			  'newsTitle':'',        						 //新闻标题
	 			   "cat1":"",			                            //新闻分类																											//商品分类												必填
			      'catname1':'',                                 //新闻分类名字 
	 			  'headline':'',								 //新闻摘要		
	 			  'author':'' ,                                 //新闻作者
	 			  'vfrom':'',									//新闻来源
	 			  'goodsTitle':'',                              //商品名称
	 			  'goodsVtext':'',                              //商品不同的参数内容 
	 			  "cat":"",			                            //商品分类																											//商品分类												必填
			      'catname':'',                                 //商品分类名字 
			     "keywords":"",				                    //关键字																								//关键字													选填
			    "tags":"",			                           //标签																									//标签属性												选填
			    "price":null,										//价格																					//价格														选填
			    "specification":"",								//规格																	//规格														选填
			    "quantity_count":null,						    //商品库存																				//商品库存												选填
			    "quantity_minimum":null,							//起订量																			//起订量													选填
			    "bigGoodsImg":"" ,                                //商品大图片
			    "smaGoodsImg":"" ,                                //商品小图片
			     "initUrl":api.GetSignTreeClass(),//初始化树接口
			     'zNodes':[{id: 1, title: "无", dropInner: false, pId: 0, name: "无",model_id: 0, _level: 1}],//树的初始状态
			     'pid':null,                           //树的父节点id
                 'news_search_res':null,               //查找新闻分类结果
                 'prod_search_res':null,               //查找产品分类结果
                 'goods_search_res':null,              //查找商品分类结果
                 'treeObj1':null,                      //新闻分类树对象
                 'treeObj2':null,                      //商品分类树对象
                 "prodtreeObj":null,                   //产品分类树对象    
                 prodClassName:null,
                 newsClassName:null,
                 goodsClassName:null,
                 check_class_name: api.baseUrl()+'/ct.do?c',//检测分类名称是否存在
                 title:null,             //新闻标题
                 title2:null,            //网页标题
                 keyword:null,           //网页关键词
                 descript:null,          //网页描述
                 pageDesc:null,         //单页描述
                 photoTitle:null,       //相册标题
                 photoDesc:null,         //相册描述
                 bigPhotoImg:null ,                            //相册大图片
 			     smaPhotoImg:null ,                            //相册小图片
 			     pageNum:1,                                    //管理页面的页码 
 			     goodsClass:"",
 			     newsClass:"",
 			     prodClass:"",
 			     mediaObj:{
 			     	mediaTitle:'',
 			     	mediaDesc:'',
 			     	mediaUrl:''
 			     	
 			     },
 			     treeProduct:'',
	 		}
	 	},
	 	
	 	methods:{
	 	    //正则验证
			validate:function(){
				var _this=this;
				 $("#addProductForm").validate({
					ignore:"",
   					onfocusout:function(element){$(element).valid();},
					onkeyup: false, 
					focusCleanup:true,
				 	rules: {
				 		prodTitle: {
				 			required: true
				 		},
				 		prodImg:{
				 			required: true
				 		},
				 		productsClass:{
				 			required: true
				 		}
				 	},
				 	messages: {
				 		prodTitle: {
				 			required: "产品名称不能为空"
				 		},
				 		prodImg:{
				 			required: "产品主图不能为空"
				 		},
				 		productsClass:{
				 			required: "产品分类不能为空！"
				 		}
				 	},
				    invalidHandler: function(form, validator){
				    	return false;
				    },
				    errorPlacement: function(label, element){
				    	$(label).addClass("alert-danger");
				    	$(element).siblings(".err-msg").append(label);
				    }
				  
				 });
				 $("#columnFrom").validate({
						ignore:"",
	   					onfocusout:function(element){$(element).valid();},
						onkeyup: false, 
						focusCleanup:true,
					 	rules: {
					 		columnName: {
					 			required: true
					 		},
					 	},
					 	messages: {
					 		columnName: {
					 			required: "请至少选择一个栏目菜单！"
					 		},
					 	},
					    invalidHandler: function(form, validator){
					    	return false;
					    },
					    errorPlacement: function(label, element){
					    	$(label).addClass("alert-danger");
					    	$(element).parent().siblings(".err-msg").append(label);
					    }
					  
					 });
				 $("#addGoodsForm").validate({
// 					onfocusout:function(element){$(element).valid();},
					onkeyup: false,
					focusCleanup:true,
				 	rules: {
				 		goodsName: {
				 			required: true
				 		},
				 		goodsClass:{
				 			required: true
				 		},
				 		price:{
				 			num:true
				 		},
				 		quantity_count:{
				 			num:true
				 		},
				 		quantity_minimum:{
				 			num:true
				 		}
				 	},
				 	messages: {
				 		goodsName: {
				 			required: "商品名称不能为空"
				 		},
				 		goodsClass:{
				 			required: "商品种类不能为空"
				 		},
				 		price:{
				 			num:'价格必须是数字'
				 		},
				 		quantity_count:{
				 			num:'商品库存必须是数字'
				 		},
				 		quantity_minimum:{
				 			num:'起订量必须是数字'
				 		}
				 	},
				    invalidHandler: function(form, validator){
				    	return false;
				    },
				    errorPlacement: function(label, element){
				    	$(label).addClass("alert-danger");
				    	$(element).siblings(".err-msg").append(label);
				    }
				 });
				 $("#addNewsForm").validate({
// 					onfocusout:function(element){$(element).valid();},
					onkeyup: false, 
					focusCleanup:true,
				 	rules: {
				 		newsTitle: {
				 			required: true
				 		},
				 		author:{
				 			required: true
				 		},
				 		newsClass:{
				 			required: true
				 		},
				 	},
				 	messages: {
				 		newsTitle: {
				 			required: "新闻标题不能为空"
				 		},
				 		author:{
				 			required: "作者不能为空"
				 		},
				 		newsClass:{
				 			required:"新闻分类不能为空"
				 		},
				 	},
				    invalidHandler: function(form, validator){
				    	return false;
				    },
				    errorPlacement: function(label, element){
				    	$(label).addClass("alert-danger");
				    	$(element).siblings(".err-msg").append(label);
				    }
				 });
				 
				 $("#newsClassForm").validate({
// 					onfocusout:function(element){$(element).valid();},
					onkeyup: false, 
					focusCleanup:true,
				 	rules: {
				 		childSelect1: {
				 			required: true
				 		},
				 		newsClassName:{
				 			required:true,
				 			remote:{
				 				async:false,
				 				url: _this.check_class_name,
							    type: "post",               //数据发送方式
							    dataType: "text",           //接受数据格式   
							    data: {                     //要传递的数据
							    	name:function () {
	                                       return  _this.newsClass;
	                                    },
	                                    cid:function(){
	                                    	 return  _this.cid;	
	                                    },
	                                    cat:1,
	                                    pid:function(){
	                                   	 return  _this.pid;	
	                                   }
							    },
							    dataFilter: function (data,type) {
									if(JSON.parse(data).success){
											return true;
									}else{
										return false;
									}
		                        }
				 			}
				 		}
				 	},
				 	messages: {
				 		childSelect1: {
				 			required: "顶级分类不能为空!"
				 		},
				 		goodsClassName:{
				 			required:"请填写分类名称！",
				 			remote:"分类名已存在！"
				 		}
				 	},
				    invalidHandler: function(form, validator){
				    	return false;
				    },
				    errorPlacement: function(label, element){
				    	$(label).addClass("alert-danger");
				    	$(element).siblings(".err-msg").append(label);
				    }
				  
				 });
				 $("#goodsClassForm").validate({
// 					onfocusout:function(element){$(element).valid();},
					onkeyup: false, 
					focusCleanup:true,
				 	rules: {
				 		childSelect2: {
				 			required: true
				 		},
				 		goodsClassName:{
				 			required:true,
				 			remote:{
				 				url: _this.check_class_name,
				 				async:false,
							    type: "post",               //数据发送方式
							    dataType: "text",           //接受数据格式   
							    data: {                     //要传递的数据
							        name:function () {
                                       return  _this.goodsClass;
                                    },
                                    cid:function(){
                                    	 return  _this.cid;	
                                    },
                                    cat:2,
                                    pid:function(){
                                   	 return  _this.pid;	
                                   }
							    },
							    dataFilter: function (data,type) {
									if(JSON.parse(data).success){
											return true;
									}else{
										return false;
									}
		                        }
				 			}
				 		}
				 	},
				 	messages: {
				 		childSelect2: {
				 			required: "顶级分类不能为空!"
				 		},
				 		goodsClassName:{
				 			required:"请填写分类名称",
				 			remote:"分类名已存在！"
				 		}
				 	},
				    invalidHandler: function(form, validator){
				    	return false;
				    },
				    errorPlacement: function(label, element){
				    	$(label).addClass("alert-danger");
				    	$(element).siblings(".err-msg").append(label);
				    }
				  
				 });
				 $("#prodClassForm").validate({
// 					onfocusout:function(element){$(element).valid();},
					onkeyup: false, 
					focusCleanup:true,
				 	rules: {
				 		childSelect3: {
				 			required: true
				 		},
				 		prodClassName:{
				 			required:true,
				 			remote:{
				 				url: _this.check_class_name,
				 				async:false,
							    type: "post",               //数据发送方式
							    dataType: "text",           //接受数据格式   
							    data: {                     //要传递的数据
							        name:function () {
                                       return  _this.prodClass;
                                    },
                                    cid:function(){
                                    	 return  _this.cid;	
                                    },
                                    cat:3,
                                    pid:function(){
                                   	 return  _this.pid;	
                                   }
							    },
							    dataFilter: function (data,type) {
									if(JSON.parse(data).success){
											return true;
									}else{
										return false;
									}
		                        }
				 			}
				 		}
				 	},
				 	messages: {
				 		childSelect3: {
				 			required: "顶级分类不能为空!"
				 		},
				 		prodClassName:{
				 			required:"请填写分类名称",
				 			remote:"分类名已存在！"
				 		}
				 	},
				    invalidHandler: function(form, validator){
				    	return false;
				    },
				    errorPlacement: function(label, element){
				    	$(label).addClass("alert-danger");
				    	$(element).siblings(".err-msg").append(label);
				    }
				  
				 });
				 
				 
				  $("#addPhotoForm").validate({
   					onfocusout:function(element){$(element).valid();},
					onkeyup: false, 
					focusCleanup:true,
				 	rules: {
				 		photoTitle: {
				 			required: true
				 		}
				 	},
				 	messages: {
				 		photoTitle: {
				 			required: "相册标题不能为空"
				 		}
				 	},
				    invalidHandler: function(form, validator){
				    	return false;
				    },
				    errorPlacement: function(label, element){
				    	$(label).addClass("alert-danger");
				    	$(element).siblings(".err-msg").append(label);
				    }
				  
				 });
				 
				  $("#addPhotoForm").validate({
   					onfocusout:function(element){$(element).valid();},
					onkeyup: false, 
					focusCleanup:true,
				 	rules: {
				 		photoTitle: {
				 			required: true
				 		}
				 	},
				 	messages: {
				 		photoTitle: {
				 			required: "相册标题不能为空"
				 		}
				 	},
				    invalidHandler: function(form, validator){
				    	return false;
				    },
				    errorPlacement: function(label, element){
				    	$(label).addClass("alert-danger");
				    	$(element).siblings(".err-msg").append(label);
				    }
				  
				 });
				 //媒体附件
				  $("#addMediaForm").validate({
   					onfocusout:function(element){$(element).valid();},
					onkeyup: false, 
					focusCleanup:true,
				 	rules: {
				 		mediaTitle: {
				 			required: true
				 		},
				 		iputManul:{
				 			required: true
				 		}
				 	},
				 	messages: {
				 		mediaTitle: {
				 			required: "媒体附件标题不为空！"
				 		},
				 		iputManul:{
				 			required: "请上传媒体附件！"
				 		}
				 	},
				    invalidHandler: function(form, validator){
				    	return false;
				    },
				    errorPlacement: function(label, element){
				    	$(label).addClass("alert-danger");
				    	$(element).siblings(".err-msg").append(label);
				    }
				  
				 });
				 
				 
			},


		//选择添加内容类型
		setChange: function() {
			//如果是添加内容
			if(this.isAdd == true) {
				//删除所有的数据
				this.clearDate();
			}
		///	this.ColumnTypeGet();
			callBackLoadIframe();
		},
		//清空表单数据
		clearDate:function(){
			//删除所有的数据
			$("#addPageForm")[0].reset(); //清空表单
			$("#addProductForm")[0].reset(); //清空表单
			$("#addGoodsForm")[0].reset(); //清空表单
			$("#addNewsForm")[0].reset(); //清空表单
			$("#addPhotoForm")[0].reset(); //清空表单
			$(".row-tagsBox").html(""); //清空关键词   
			
			  	this.contentName='',                             //单页的内容名称 
	 			this.productName='',                             //产品的内容名称
	 			this.prodcat="",			                            //新闻分类																											//商品分类												必填
			    this.prodcatname='',                                 //新闻分类名字 
	 			this.productVtext='',                              //产品不同的参数内容 
	 			this.bigProductImg='' ,                            //产品大图片
	 			this.smaProductImg='' ,                            //产品小图片
	 			this.newsTitle='',        						 //新闻标题
	 			this.cat1="",			                            //新闻分类																											//商品分类												必填
			    this.catname1='',                                 //新闻分类名字 
	 			this.headline='',								 //新闻摘要		
	 			this.author='' ,                                 //新闻作者
	 			this.vfrom='',									//新闻来源
	 			this.goodsTitle='',                              //商品名称
	 			this.goodsVtext='',                              //商品不同的参数内容 
	 			this.cat="",			                            //商品分类																											//商品分类												必填
			    this.catname='',                                 //商品分类名字 
			    this.keywords="",				                    //关键字																								//关键字													选填
			    this.tags="",			                           //标签																									//标签属性												选填
			    this.price=null,										//价格																					//价格														选填
			    this.specification="",								//规格																	//规格														选填
			    this.quantity_count=null,						    //商品库存																				//商品库存												选填
			    this.quantity_minimum=null,							//起订量																			//起订量													选填
			    this.bigGoodsImg="" ,                                //商品大图片
			    this.smaGoodsImg="" ,                                //商品小图片
			    this.title=null,             //新闻标题
             	this.title2=null,            //网页标题
                this.keyword=null,           //网页关键词
                this.descript=null,          //网页描述
                this.pageDesc=null,         //单页描述
                this.photoTitle=null,       //相册标题
            	this.photoDesc=null,         //相册描述
                this.bigPhotoImg=null ,                            //相册大图片
 			    this.smaPhotoImg=null ,                            //相册小图片
 			    this.goodsClass="",
 			    this.newsClass="",
 			    this.prodClass="",
		     	this.mediaObj.mediaTitle='',
		     	this.mediaObj.mediaDesc='',
		     	this.mediaObj.mediaUrl=''
			
		},
		//获取选中的栏目
		getColumn:function(){
			var groupCheckbox=$("input[name='columnName']");
			var columnId=[]; 
		    for(i=0;i<groupCheckbox.length;i++){
		        if(groupCheckbox[i].checked){
		            var val =groupCheckbox[i].value;
		            columnId.push(val);
		        }
		    }
		    this.columnNames=columnId.join(",");
		    window.localStorage.setItem('cn',this.columnNames)
		},
		//放弃按钮
		giveUp: function() {
			setIframeUrl('user/contMge/mgrCon.html?page=' + this.pageNum);
			windowOpenPage(fontBaseUrl + 'user/contMge/mgrCon.html?page=' + this.pageNum);
		},
		//处理添加的单页
		PageOperation: function(msg) {
			if($(".publish")[0].checked) {
				//发布
				this.status = 1;
				this.addPage(msg);
			}
			if($(".draft")[0].checked) {
				//存为草稿
				this.status = 0;
				this.addPage(msg);
			}

		},

		//新增单页
		addPage: function(msg) {
			var that = this;
			var midsArr = [];
			$('input[name="columnName"]:checked').each(function(){//遍历每一个名字为interest的复选框，其中选中的执行函数  
				midsArr.push($(this).val());
		    });
			that.mid = midsArr.join(',');
			
			if(that.mid.indexOf(',') != -1 ){
				$(".pop-up-container").remove();
				$.CwsPopup.Alert("提示", "只能选择一个栏目菜单！",function(){
					$.CwsPopup.OperateCwsPopup('hide');
					return false;
				});
				return false;
			}
			
			
			var container = $('#cke_content5 iframe')[0];
			var html = (container) ? $('#cke_content5 iframe')[0].contentWindow.document.body.innerHTML : HtmlUtil.htmlEncode($('#cke_content5 textarea').val());
			var html = (container) ? $('#cke_content5 iframe')[0].contentWindow.document.body.innerHTML : $('#cke_content5 textarea').val();
			var tagArr = [];
			var length = $('.word-edit-page .keywordBox .row-tagsBox').find('.tags_value').length;
			for(var i = 0; i < length; i++) {
				tagArr.push($('.word-edit-page .keywordBox .row-tagsBox').find('.tags_value').eq(i).text());
			}
			this.keyword = tagArr.join(',');
			
			var textStr = '';
			if(html ) {
				var div = document.createElement('div');
				div.innerHTML = html;
				textStr += div.innerText;
			}
			if(textStr && !this.vdesc){
				if(textStr.length>200){
					this.descript = textStr.substring(0,199);
				}else{
					this.descript = textStr;
				}
			}
			
			var data = {
				'id': this.id,
				'mid': this.mid,
				'uid': this.uid,
				'cid': this.cid,
				'title': this.title,
				'keywords': this.keyword,
				'metaContent': this.descript,
				'type': this.testSelect,
				'vtext': html,
				'vdesc': this.pageDesc,
				'status': this.status,
				'flag': 100
			}
			var  fld=$("#columnFrom").validate(); 
			var  f= fld.form();
			if(f){
					if(this.isAdd) {
						//添加单页
						api.AddPage(data).then(function(res) {
							if(res.success) {
								setIframeUrl('user/contMge/mgrCon.html?page=' + that.pageNum);
								//添加单个内容			 				
								if(msg==1){
									windowOpenPage(fontBaseUrl + 'user/contMge/mgrCon.html?page=' + that.pageNum);
								//继续添加
								}else if(msg==2){
//									that.clearDate();
//									window.location.reload();
								}
								//			 					 window.history.go(-1);
							}
						}).catch(function(err) {
							$.CwsPopup.Alert("提示", "添加单页失败！");
							console.log(err);
						})
					} else {
						//修改单页
						api.EditorPage(data).then(function(res) {
							if(res.success) {
								//window.location.href=fontBaseUrl+"user/contMge/mgrCon.html";
								setIframeUrl('user/contMge/mgrCon.html?page=' + that.pageNum);
								//		 						 windowOpenPage(fontBaseUrl + 'user/contMge/mgrCon.html');
								windowOpenPage(fontBaseUrl + 'user/contMge/mgrCon.html?page=' + that.pageNum);
								//								window.history.go(-1);
							}
						}).catch(function(err) {
							$.CwsPopup.Alert("提示", "修改单页失败！");
							console.log(err)
						})
					}
			}
		},
		//回填单页
		pageGet: function(data) {
			var that = this;
			this.html = data.vtext;
			this.status = data.status;
			this.contentName = data.title;
			//新增
			this.pageDesc = data.vdesc;
			this.title = data.title;
			if(data.keywords) {
				this.keyword = data.keywords.split(",");
				var keywordlen = data.keywords.split(",").length;
				$('.word-edit-page .row-tagsBox').html('');
				for(var i = 0; i < keywordlen; i++) {
					this.keyword[i]=HtmlUtil.htmlEncode(this.keyword[i]);
					$('.word-edit-page .row-tagsBox').append('<span class="tags-span rel">' + '<span class="tags_value">' + this.keyword[i] + '</span>' +
						'<i class="iconfont i-tags-close abs">&#xe624;</i>' +
						'</span>');

				}
			}

			
			var btn=true;
			var getTextTime=window.setInterval(function(){
				if(btn){
					if($('#cke_content5 iframe')[0].contentWindow.document.body){
						$('#cke_content5 iframe')[0].contentWindow.document.body.innerHTML=that.html;
						btn=false;
					}
				}
			},100)
			setTimeout(function(){
				window.clearInterval(getTextTime);
			},10000)
			
			
			
			
			//	 			CKEDITOR.on('content5', function (e) {
			//	 				$('#cke_content5 iframe')[0].contentWindow.document.body.innerHTML=that.html;
			//	 			})
			if(this.status == 1) {
				$("input[name=Fruit1]")[0].checked = true;
			} else {
				$("input[name=Fruit1]")[1].checked = true;
			}
			//	 			callBackLoadIframe();
		},

		//处理添加的相册
		PhotoOperation: function(msg) {
			if($(".publish")[4].checked) {
				//发布
				this.status = 1;
			}
			if($(".draft")[4].checked) {
				//存为草稿
				this.status = 0;
			}
			this.addPhoto(msg);

		},

		//新增相册
		addPhoto: function(msg) {
			var that = this;
			var midsArr = [];
			$('input[name="columnName"]:checked').each(function(){//遍历每一个名字为interest的复选框，其中选中的执行函数  
				midsArr.push($(this).val());
		    });
			that.mid = midsArr.join(',');
			
			var tagArr = [];
			var length = $('.word-edit-photo .keywordBox .row-tagsBox').find('.tags_value').length;
			
			for(var i = 0; i < length; i++) {
				if($('.word-edit-photo .keywordBox .row-tagsBox').find('.tags_value').eq(i).text()){
					tagArr.push($('.word-edit-photo .keywordBox .row-tagsBox').find('.tags_value').eq(i).text());
				}
			}
			this.getPhotoImg();
			this.keyword = tagArr.join(',');
			var data = {
				'id': this.id,
				'mid': this.mid,
				'uid': this.uid,
				'cid': this.cid,
				'title': this.photoTitle,
				'keywords': this.keyword,
				'img': this.bigPhotoImg,
				'photos_img': this.smaPhotoImg,
				'type': this.testSelect,
				'vdesc': this.photoDesc,
				'vtext': this.photoDesc,
				'status': this.status,
				'flag': 500
			}
			var vld = $("#addPhotoForm").validate();
			var h = vld.form();
			var  fld=$("#columnFrom").validate(); 
			var  f=fld.form();
			//验证通过
			if(h) {
				if(this.isAdd) {
					//添加相册
					api.AddPage(data).then(function(res) {
						if(res.success) {
							setIframeUrl('user/contMge/mgrCon.html?page=' + that.pageNum);
//							windowOpenPage(fontBaseUrl + 'user/contMge/mgrCon.html?page=' + that.pageNum);
							//添加单个内容			 				
							if(msg==1){
								windowOpenPage(fontBaseUrl + 'user/contMge/mgrCon.html?page=' + that.pageNum);
							//继续添加
							}else if(msg==2){
								that.clearDate();
								that.getColumn();
								window.location.reload();
							}
						}
					}).catch(function(err) {
						$.CwsPopup.Alert("提示", "添加相册失败！");
						console.log(err);
					})
				} else {
					//修改相册
					api.EditorPage(data).then(function(res) {
						if(res.success) {
							setIframeUrl('user/contMge/mgrCon.html?page=' + that.pageNum);
							windowOpenPage(fontBaseUrl + 'user/contMge/mgrCon.html?page=' + that.pageNum);
						}
					}).catch(function(err) {
						$.CwsPopup.Alert("提示", "修改相册失败！");
						console.log(err)
					})
				}
			}
		},
		//获取相册图片
		getPhotoImg: function() {
			var photoImgArr = [];
			this.bigPhotoImg = $('img[name=photoImg]').attr('src');
			for(var i = 0; i <= 20; i++) {
				if($('.upload-photo img')[i]) {
					var src = $('.upload-photo img')[i].src;
					if(src && src != "undefined" && src != "none") {
						photoImgArr.push(src);
					}
				}
			}
			this.smaPhotoImg = photoImgArr.join();
		},
		//回填相册
		photoGet: function(data) {
			var that = this;
			this.status = data.status;
			this.photoTitle = data.title;
			this.bigPhotoImg = data.img;
			$('img[name=photoImg]').attr('src', this.bigPhotoImg);
			this.smaPhotoImg = data.photos_img;
			//回填相册图片
			var str = this.smaPhotoImg;
			if(str != undefined) {
				var imgArr = str.split(',');
				var len = imgArr.length;
				if(len == 0) {
					$('img[name=photoImg]').attr('src', this.bigPhotoImg);
				} else if(len == 1) {
					$('img[name=photoImg]').attr('src', this.bigPhotoImg);
					$('img[name=photoChildImg]').attr('src', imgArr[0]);
				} else if(len > 1) {
					$('img[name=photoImg]').attr('src', this.bigPhotoImg);
					$('img[name=photoChildImg]').attr('src', imgArr[0]);
					for(var n = 1; n < len - 1; n++) {
						$('.word-edit-photo .add_img').siblings().append("<div style='border: 1px solid #ddd;' class='useupImg img-btn-small maimglst rel' title=photoChildImg" + n + "    data-toggle='modal' data-target='#show_cutimg3'><a class='' ><span class='iconfont sp-color'>&#xe602;</span><img src='' alt='' name=photoChildImg" + n + " class='uploadimg'/></a><i class='iconfont  abs  small_img'>&#xe624;</i></div>");
						$('img[name=photoChildImg' + n + ']').attr('src', imgArr[n]);
					}
				}

			}

			this.photoDesc = data.vtext;
			if(data.keywords) {
				this.keyword = data.keywords.split(",");
				var keywordlen = data.keywords.split(",").length;
				$('.word-edit-photo .row-tagsBox').html('');
				for(var i = 0; i < keywordlen; i++) {
					 this.keyword[i] = HtmlUtil.htmlEncode( this.keyword[i]);
					$('.word-edit-photo .row-tagsBox').append('<span class="tags-span rel">' + '<span class="tags_value">' + this.keyword[i] + '</span>' +
						'<i class="iconfont i-tags-close abs">&#xe624;</i>' +
						'</span>');

				}
			}
			if(this.status == 1) {
				$("input[name=Fruit1]")[0].checked = true;
			} else {
				$("input[name=Fruit1]")[1].checked = true;
			}
		},

		//处理添加的产品
		ProductOperation: function(msg) {
			if($(".publish")[1].checked) {
				//发布
				this.status = 1;
				this.addProduct(msg);
			}
			if($(".draft")[1].checked) {
				//存为草稿
				this.status = 0;
				this.addProduct(msg);
			}
		},
		//添加产品
		addProduct: function(msg) {
			var that = this;
			this.getProductImg();
			this.getProductContent();
			var midsArr = [];
			$('input[name="columnName"]:checked').each(function(){//遍历每一个名字为interest的复选框，其中选中的执行函数  
				midsArr.push($(this).val());
		    });
			that.mid = midsArr.join(',');
			
			var tagArr = [];
			var length = $('.word-edit-product .keywordBox .row-tagsBox').find('.tags_value').length;
			for(var i = 0; i < length; i++) {
				if($('.word-edit-product .keywordBox .row-tagsBox').find('.tags_value').eq(i).text()){
					tagArr.push($('.word-edit-product .keywordBox .row-tagsBox').find('.tags_value').eq(i).text());
				}
			}
			this.keyword = tagArr.join(',');
			var data = {
				'id': this.id,
				'mid': this.mid,
				'uid': this.uid,
				'cid': this.cid,
				'cat':this.prodcat,
				'title': this.productName,
				'keywords': this.keyword,
				'metaContent': this.descript,
				'type': this.testSelect,
				'img': this.bigProductImg,
				'product_img': this.smaProductImg,
				'vtext': this.productVtext,
				'status': this.status,
				'flag': 200
			}
			var vld = $("#addProductForm").validate();
			var h = vld.form();
			var  fld=$("#columnFrom").validate(); 
			var  f=fld.form();
			//验证通过
			if(h && f) {
				if(this.isAdd) {
					//添加产品
					api.AddPage(data).then(function(res) {
						if(res.success) {
							setIframeUrl('user/contMge/mgrCon.html?page=' + that.pageNum);
							//添加单个内容			 				
							if(msg==1){
								windowOpenPage(fontBaseUrl + 'user/contMge/mgrCon.html?page=' + that.pageNum);
							//继续添加
							}else if(msg==2){
//								that.clearDate();
								that.getColumn();
								window.location.reload();
							}
						}
					}).catch(function(err) {
						console.log(err);
					})
				} else {
					//修改产品
					api.EditorPage(data).then(function(res) {
						if(res.success) {
							setIframeUrl('user/contMge/mgrCon.html?page=' + this.pageNum);
							//		 						 windowOpenPage(fontBaseUrl + 'user/contMge/mgrCon.html');
							windowOpenPage(fontBaseUrl + 'user/contMge/mgrCon.html?page=' + this.pageNum);
							//								window.history.go(-1);
						}
					}).catch(function(err) {
						console.log(err)
					})
				}
			}

		},
		//回填产品页面
		productGet: function(data) {
			var that = this;
			if(data.img != undefined) {
				this.bigProductImg = data.img;
				$('img[name=resImg]').attr('src', this.bigProductImg);
			}
			this.smaProductImg = data.product_img;
			//this.html = data.vtext;
			this.productVtext=data.vtext;
			this.productName = data.title;
			//新增
			if(data.keywords) {
				this.keyword = data.keywords.split(",");
				var keywordlen = data.keywords.split(",").length;
				$('.word-edit-product .row-tagsBox').html('');
				for(var i = 0; i < keywordlen; i++) {
					this.keyword[i]=HtmlUtil.htmlEncode(this.keyword[i]);
					$('.word-edit-product .row-tagsBox').append('<span class="tags-span rel">' + '<span class="tags_value">' + this.keyword[i] + '</span>' +
						'<i class="iconfont i-tags-close abs">&#xe624;</i>' +
						'</span>');
				}
			}
			this.status = data.status;
			if(this.status == 1) {
				$("input[name=Fruit2]")[0].checked = true;
			} else {
				$("input[name=Fruit2]")[1].checked = true;
			}
			
			//回填产品分类
			if(data.cat) {
				this.prodcat = data.cat.substring(0, data.cat.length - 1);
				var catArr = this.prodcat.split(',');

				var catStr = '';
				for(var i = 0; i < catArr.length; i++) {
					var node = this.treeProduct.getNodeByParam("id", catArr[i]);

					//				treeObj.selectNode(node);
					node.checked = true;
					catStr += node.name;
					this.treeProduct.updateNode(node);
				}
				this.prodcatname = catStr;
			}
			
			
			//回填产品图片
			var str = this.smaProductImg;
			if(str != undefined) {
				var imgArr = str.split(',');
				var len = imgArr.length;
				if(len == 0) {
					$('img[name=resImg]').attr('src', this.bigProductImg);
				} else if(len == 1) {
					$('img[name=resImg]').attr('src', this.bigProductImg);
					$('img[name=resImgchild]').attr('src', imgArr[0]);
				} else if(len > 1) {
					$('img[name=resImg]').attr('src', this.bigProductImg);
					$('img[name=resImgchild]').attr('src', imgArr[0]);
					for(var n = 1; n < len - 1; n++) {
						$('.word-edit-product .add_img').siblings().append("<div style='border: 1px solid #ddd;' class='useupImg img-btn-small maimglst rel' title=resImgchild" + n + "    data-toggle='modal' data-target='#show_cutimg'><a class='' ><span class='iconfont sp-color'>&#xe602;</span><img src='' alt='' name=resImgchild" + n + " class='uploadimg'/></a><i class='iconfont  abs  small_img'>&#xe624;</i></div>");
						$('img[name=resImgchild' + n + ']').attr('src', imgArr[n]);
					}
				}

			}
		//	this.productVtext=JSON.parse(this.productVtext);
			var len4 = this.productVtext.length;
			if(len4 >=1) {
				$('.word-edit-product .goodsDes').html("");
				var len6 = $('.word-edit-product .goodsDes .goodsDescribe').length;
				//点击添加时，查找缺少的ord
				var ordarr = [];
				for(var n = 0; n < len6; n++) {
					var ord = $( '.word-edit-product  .goodsDes .goodsDescribe:eq(' + n + ')').attr('ord');
					ordarr.push(ord);
				}
				//1-4去掉已有的ord
				var allordarr = [1, 2, 3, 4];
				for(var i = 0; i < allordarr.length; i++) {
					for(var n = 0; n < ordarr.length; n++) {
						if(allordarr[i] == ordarr[n]) {
							allordarr.splice(i, 1);
						}
					}
				}
				for(var j = 0; j < len4 ; j++) {
					$('.word-edit-product .goodsDes').append('<div class="col-sm-2 goodsDescribe mobile_mb15" ord=' + allordarr[j] + '  style="cursor: pointer;"><input type="text" class="ipt-text radius0 gradient-bg" value="" name="rc.name" maxlength="6"  /><i class="iconfont  abs  small_img goods-close">&#xe624;</i></div>')
					$('.word-edit-product .goodsDes .goodsDescribe').find('input').css('border', '1px solid #ddd');
					$('.word-edit-product .goodsDes .goodsDescribe:eq(0)').find('input').css('border', '1px solid deepskyblue');
				}
				for(var n = 0; n < len4; n++) {
					$('.word-edit-product .goodsDescribe').eq(n).find('input').val(this.productVtext[n][0]);
				}
			} else {

			}
			var btn=true;
			var getTextTime=window.setInterval(function(){
				var a1=$('#cke_content11 iframe')[0].contentWindow.document.body;
				var a2=$('#cke_content12 iframe')[0].contentWindow.document.body;
				var a3=$('#cke_content13 iframe')[0].contentWindow.document.body;
				var a4=$('#cke_content14 iframe')[0].contentWindow.document.body;
				if(btn){
					if(a1 && a2 &&a3 && a4){
						for(var n = 0; n < len4; n++) {
							$('#profile4 iframe')[n].contentWindow.document.body.innerHTML = that.productVtext[n][1];
						}
						btn=false;
					}
				}
			},100)
			setTimeout(function(){
				window.clearInterval(getTextTime);
			},10000)
			
			
			
			
			
			
		},
		//获取产品内容
		getProductContent:function(){
			var goodsVtext = [];
			var len = $('.word-edit-product .desc-type  .goodsDescribe').length;
			var textStr = '';
			for(var n = 0; n < len; n++) {
				var contentArr = [];
				contentArr.push($('.word-edit-product .desc-type .goodsDescribe input')[n].value);
				var ord = $('.word-edit-product .desc-type  .goodsDescribe').eq (n).attr('ord');
				var container = $('#profile4 .cke_wysiwyg_frame')[ord - 1];
//				var html = (container) ? $('#profile4 .cke_wysiwyg_frame')[ord - 1].contentWindow.document.body.innerHTML :  HtmlUtil.htmlEncode($('#profile4 .cke_wysiwyg_frame')[ord - 1].val());
				var html = (container) ? $('#profile4 .cke_wysiwyg_frame')[ord - 1].contentWindow.document.body.innerHTML :  $('#profile4 .cke_wysiwyg_frame')[ord - 1].val();
				contentArr.push(html);
				goodsVtext.push(contentArr);
				if(html) {
					var div = document.createElement('div');
					div.innerHTML = html;
					textStr += div.innerText;
				}
			}
			if(textStr && !this.vdesc){
				if(textStr.length>200){
					this.descript = textStr.substring(0,199);
				}else{
					this.descript = textStr;
				}
			}
			this.productVtext = JSON.stringify(goodsVtext);
		},
		//获取产品图片
		getProductImg: function() {
			var productImgArr = [];
			this.bigProductImg = $('img[name=resImg]').attr('src');
			for(var i = 0; i <= 5; i++) {
				if($('.upload-product img')[i]) {
					var src = $('.upload-product img')[i].src;

					if(src) {
						productImgArr.push(src);
					}
				}
			}
			this.smaProductImg = productImgArr.join();
		},
		//处理添加的新闻
		NewsOperation: function(msg) {
			if($(".publish")[2].checked) {
				//发布
				this.status = 1;
				this.addNews(msg);
			}
			if($(".draft")[2].checked) {
				//存为草稿
				this.status = 0;
				this.addNews(msg);
			}
		},
		//添加新闻
		addNews: function(msg) {
			var that = this;
			var container = $('#cke_content6 iframe')[0];
//			var html = (container) ? $('#cke_content6 iframe')[0].contentWindow.document.body.innerHTML : HtmlUtil.htmlEncode( $('#cke_content6 textarea').val() );
			var html = (container) ? $('#cke_content6 iframe')[0].contentWindow.document.body.innerHTML :  $('#cke_content6 textarea').val() ;
			var tagArr = [];
			var length = $('.word-edit-news .keywordBox .row-tagsBox').find('.tags_value').length;
			for(var i = 0; i < length; i++) {
				if($('.word-edit-news .keywordBox .row-tagsBox').find('.tags_value').eq(i).text()){
				tagArr.push($('.word-edit-news .keywordBox .row-tagsBox').find('.tags_value').eq(i).text());
				}
			}
			this.keyword = tagArr.join(',');

			var img = $('img[name=newImg]').attr('src');

			if($('input[name=news-f]')[0].checked) {
				this.vfrom = '原创';
			} else if($('input[name=news-f]')[1].checked) {
				this.vfrom = '独家';
			} else if($('input[name=news-f]')[2].checked) {
				this.vfrom = '转载';
			}
			
			var midsArr = [];
			$('input[name="columnName"]:checked').each(function(){//遍历每一个名字为interest的复选框，其中选中的执行函数  
				midsArr.push($(this).val());
		    });
			this.mid = midsArr.join(',');
			
			var textStr = '';
			if(html ) {
				var div = document.createElement('div');
				div.innerHTML = html;
				textStr += div.innerText;
			}
			if(textStr && !this.vdesc){
				if(textStr.length>200){
					this.descript = textStr.substring(0,199);
				}else{
					this.descript = textStr;
				}
			}
			
			var data = {
				'id': this.id,
				'title': this.newsTitle,
				'keywords': this.keyword,
				'metaContent': this.descript,
				"vdesc": this.headline, //摘要            选填	
				"vfrom": this.vfrom, //来源		选填
				"author": this.author, //作者		选填
				"img": img,
				'cat': this.cat1,
				'mid': this.mid,
				'uid': this.uid,
				'cid': this.cid,
				'type': this.testSelect,
				'vtext': html,
				'status': this.status,
				'flag': 300
			}
			var vld = $("#addNewsForm").validate();
			var h = vld.form();
			var  fld=$("#columnFrom").validate(); 
			var  f=fld.form();
			//验证通过
			if(h && f) {
				if(this.isAdd) {
					//添加新闻
					api.AddPage(data).then(function(res) {
						if(res.success) {
							setIframeUrl('user/contMge/mgrCon.html?page=' + this.pageNum);
//							windowOpenPage(fontBaseUrl + 'user/contMge/mgrCon.html?page=' + this.pageNum);
							//添加单个内容			 				
							if(msg==1){
								windowOpenPage(fontBaseUrl + 'user/contMge/mgrCon.html?page=' + that.pageNum);
							//继续添加
							}else if(msg==2){
								that.getColumn();
								window.location.reload();
							}


						}
					}).catch(function(err) {
						console.log(err);
					})
				} else {
					//修改新闻
					api.EditorPage(data).then(function(res) {
						if(res.success) {
							setIframeUrl('user/contMge/mgrCon.html?page=' + this.pageNum);
							windowOpenPage(fontBaseUrl + 'user/contMge/mgrCon.html?page=' + this.pageNum);
						}
					}).catch(function(err) {
						console.log(err)
					})
				}
			}
		},
		//回填新闻页面
		newsGet: function(data) {
			var that = this;
			if(data.title != undefined) {
				this.newsTitle = data.title;
			}
			if(data.vdesc != undefined) {
				this.headline = data.vdesc;
			}
			this.vfrom = data.vfrom;
			if(data.author != undefined) {
				this.author = data.author;
			}
			if(data.img != undefined) {
				this.img = data.img;
			}
			this.html = data.vtext;
			this.status = data.status;
			if(this.status == 1) {
				$("input[name=Fruit3]")[0].checked = true;
			} else {
				$("input[name=Fruit3]")[1].checked = true;
			}
			if(this.vfrom == '原创') {
				$('input[name=news-f]')[0].checked = true;
			} else if(this.vfrom == '独家') {
				$('input[name=news-f]')[1].checked = true;
			} else if(this.vfrom == '转载') {
				$('input[name=news-f]')[2].checked = true;
			}
			if(this.img != undefined) {
				$('img[name=newImg]').attr('src', this.img);
			}
			

			
			
			//回填新闻分类
			if(data.cat) {
				this.cat1 = data.cat.substring(0, data.cat.length - 1);
				var catArr = this.cat1.split(',');
				var catStr = '';

				for(var i = 0; i < catArr.length; i++) {
					var node = this.treeObj1.getNodeByParam("id", catArr[i]);

					//				treeObj.selectNode(node);
					node.checked = true;
					catStr += node.name;
					this.treeObj1.updateNode(node);
				}
				this.catname1 = catStr;
			}
			//新增
			if(data.keywords) {
				this.keyword = data.keywords.split(",");
				var keywordlen = data.keywords.split(",").length;
				$('.word-edit-news .row-tagsBox').html('');
				for(var i = 0; i < keywordlen; i++) {
					this.keyword[i] = HtmlUtil.htmlEncode(this.keyword[i]);
					$('.word-edit-news .row-tagsBox').append('<span class="tags-span rel">' + '<span class="tags_value">' + this.keyword[i] + '</span>' +
						'<i class="iconfont i-tags-close abs">&#xe624;</i>' +
						'</span>');
				}
			}

			//setTimeout(function() {
			//	$('#cke_content6 iframe')[0].contentWindow.document.body.innerHTML = that.html;
			//}, 500);

			//	 			CKEDITOR.on('content6', function (e) {
			//	 				$('#cke_content6 iframe')[0].contentWindow.document.body.innerHTML=that.html;
			//	 			})
			//	 			callBackLoadIframe();
			
//			CKEDITOR.instances["content6"].on("instanceReady", function() {
//				$('#cke_content6 iframe')[0].contentWindow.document.body.innerHTML=that.html;
//			});
			
			var btn=true;
			var getTextTime=window.setInterval(function(){
				if(btn){
					if($('#cke_content6 iframe')[0].contentWindow.document.body){
							$('#cke_content6 iframe')[0].contentWindow.document.body.innerHTML=that.html;
						btn=false;
					}
				}
			},100)
			setTimeout(function(){
				window.clearInterval(getTextTime);
			},10000)
			
			
			

		},
		//处理添加的媒体附件
		MediaOperation: function(msg) {
			if($("#addMediaForm .publish")[0].checked) {
				//发布
				this.status = 1;
				this.MediaAdd(msg);
			}
			if($("#addMediaForm .draft")[0].checked) {
				//存为草稿
				this.status = 0;
				this.MediaAdd(msg);
			}

		},
		MediaAdd:function(msg){
			var that = this;
			var midsArr = [];
			//栏目名称
			$('input[name="columnName"]:checked').each(function(){//遍历每一个名字为interest的复选框，其中选中的执行函数  
				midsArr.push($(this).val());
		    });
			that.mid = midsArr.join(',');
			
			var tagArr = [];
			var length = $('.word-edit-media .keywordBox .row-tagsBox').find('.tags_value').length;
			//关键字
			for(var i = 0; i < length; i++) {
				if($('.word-edit-media .keywordBox .row-tagsBox').find('.tags_value').eq(i).text()){
					tagArr.push($('.word-edit-media .keywordBox .row-tagsBox').find('.tags_value').eq(i).text());
				}
			}
			//this.getPhotoImg();
		   this.bigPhotoImg =  $('#addMediaForm img[name=photoImg]').attr('src');
			this.keyword = tagArr.join(',');
			this.mediaObj.mediaUrl = $("#iputManul").val();//媒体url
			var data = {
				'cid': this.cid,
				'flag': 600,
				'id': this.id,
				'mid': this.mid,
				'keywords': this.keyword,
				//'uid': this.uid,
				'title': this.mediaObj.mediaTitle,
				'vdesc': this.mediaObj.mediaDesc,
				'img': this.bigPhotoImg,//配图
				'res_url': this.mediaObj.mediaUrl,//手动配图
				//'photos_img': this.smaPhotoImg,
				'type': this.testSelect,
				//'vtext': this.photoDesc,
				'status': this.status
				
			}
			var vld = $("#addMediaForm").validate();
			var h = vld.form();
			//验证通过
			if(h) {
				if(this.isAdd) {
					//添加媒体附件
					api.AddPage(data).then(function(res) {
						if(res.success) {
							setIframeUrl('user/contMge/mgrCon.html?page=' + this.pageNum);
//							windowOpenPage(fontBaseUrl + 'user/contMge/mgrCon.html?page=' + this.pageNum);
							//添加单个内容			 				
							if(msg==1){
								windowOpenPage(fontBaseUrl + 'user/contMge/mgrCon.html?page=' + that.pageNum);
							//继续添加
							}else if(msg==2){
								that.getColumn();
								window.location.reload();
							}
						}
					}).catch(function(err) {
						//$.CwsPopup.Alert("提示", "添加媒体附件失败！");
						console.log(err);
					})
				} else {
					//修改媒体附件
					api.EditorPage(data).then(function(res) {
						if(res.success) {
							setIframeUrl('user/contMge/mgrCon.html?page=' + this.pageNum);
							windowOpenPage(fontBaseUrl + 'user/contMge/mgrCon.html?page=' + this.pageNum);
						}
					}).catch(function(err) {
						$.CwsPopup.Alert("提示", "修改媒体附件失败！");
						console.log(err)
					})
				}
			}
		},
		mediaGet: function(data) {
       		data.img && $("#addPicture").find('img.uploadimg').attr('src',data.img)
       		data.res_url && $("#iputManul").val(data.res_url);
         	this.mediaObj.mediaTitle= data.title;
         	this.mediaObj.mediaDesc= data.vdesc;
 	     	this.mediaObj.mediaUrl= data.res_url;
 	     	
 	     	this.keyword = data.keywords;
            var arr_key =  this.keyword.indexOf(',') > -1 ?  this.keyword.split(',') :  this.keyword;
            var arr_len = typeof arr_key == 'object' ? arr_key.length : 1;
            if(arr_len > 1){
            	for(var i = 0 ;i< arr_len; i++){
            			$('#addMediaForm  .row-tagsBox').append('<span class="tags-span rel">' + '<span class="tags_value">' + arr_key[i] + '</span>' +
							'<i class="iconfont i-tags-close abs">&#xe624;</i>' +
							'</span>');
            	}
            }else{
            	$('#addMediaForm  .row-tagsBox').append('<span class="tags-span rel">' + '<span class="tags_value">' + arr_key + '</span>' +
							'<i class="iconfont i-tags-close abs">&#xe624;</i>' +
							'</span>');
            }
		},
		MediaUpload:function(){
			var fileObj = $("#mediaFiles").files;
		},
		//
		hideMenu: function(msg) {
			if(msg == 1) {
				$("#menuContent1").fadeOut("fast");
				//$("body").unbind("mousedown", onBodyDown);
			} else if(msg == 2) {
				//$("#menuContent2").fadeOut("fast");
				//$("body").unbind("mousedown", onBodyDown);
			}
		},
		//显示商品分类树
		showMenu: function(event, msg) {
			var _this = this;
			//新闻  
			if(msg == 1) {
				$("#menuContent1").css('display', 'block');
				$("#menuContent1").slideDown("fast");
//				$("body").bind("mousedown", onBodyDown);
//
//				function hideMenu() {
//									$("#menuContent1").fadeOut("fast");
//					$("body").unbind("mousedown", onBodyDown);
//				}
//				$(document).on("mouseout",".menuContent",function(){
//                	hideMenu();
//              })
//				function onBodyDown(event) {
//					if(!(event.target.id == "menuBtn" || event.target.id == "menuContent" || $(event.target).parents("#menuContent").length > 0)) {
//						hideMenu();
//					}
//				}
               document.addEventListener("click",function(event){
	   	            if(!(event.target.id == "citySel1" || event.target.id == "menuContent1" || $(event.target).parents("#menuContent1").length > 0)) {
						hideMenu();
					}
               },false)
				function hideMenu() {
					$("#menuContent1").fadeOut("fast");
				}

				setTimeout(function() {
					expandAll("treeDemo3");
				}, 100); //延迟加载
				var curStatus = "init",
					curAsyncCount = 0,
					goAsync = false;

				function expandAll() {
					if(!check()) {
						return;
					}
					var zTree = $.fn.zTree.getZTreeObj("treeDemo3");
					expandNodes(zTree.getNodes());
					if(!goAsync) {
						curStatus = "";
					}
				}

				function expandNodes(nodes) {
					if(!nodes) return;
					curStatus = "expand";
					var zTree = $.fn.zTree.getZTreeObj("treeDemo3");
					for(var i = 0, l = nodes.length; i < l; i++) {
						zTree.expandNode(nodes[i], true, false, false); //展开节点就会调用后台查询子节点  
						if(nodes[i].isParent && nodes[i].zAsync) {
							expandNodes(nodes[i].children); //递归  
						} else {
							goAsync = true;
						}
					}
				}

				function check() {
					if(curAsyncCount > 0) {
						return false;
					}
					return true;
				}
				this.initTree();
				//商品    
			} else if(msg == 2) {
				$("#menuContent2").css('display', 'block');
				$("#menuContent2").slideDown("fast");
//				$("body").bind("mousedown", onBodyDown);
//
//				function hideMenu() {
//					$("#menuContent2").fadeOut("fast");
//					$("body").unbind("mousedown", onBodyDown);
//				}
				//                  $(document).on("mouseout",".goods-kind",function(){
				//                  	hideMenu();
				//                  })

//				function onBodyDown(event) {
//					if(!(event.target.id == "menuBtn" || event.target.id == "menuContent" || $(event.target).parents("#menuContent").length > 0)) {
//						hideMenu();
//					}
//				}
               document.addEventListener("click",function(event){
               	            if(!(event.target.id == "citySel" || event.target.id == "menuContent2" || $(event.target).parents("#menuContent2").length > 0)) {
								hideMenu();
							}
               },false)
				function hideMenu() {
					$("#menuContent2").fadeOut("fast");
				}

				setTimeout(function() {
					expandAll("treeDemo4");
				}, 100); //延迟加载
				var curStatus = "init",
					curAsyncCount = 0,
					goAsync = false;

				function expandAll() {
					if(!check()) {
						return;
					}
					var zTree = $.fn.zTree.getZTreeObj("treeDemo4");
					expandNodes(zTree.getNodes());
					if(!goAsync) {
						curStatus = "";
					}
				}

				function expandNodes(nodes) {
					if(!nodes) return;
					curStatus = "expand";
					var zTree = $.fn.zTree.getZTreeObj("treeDemo4");
					for(var i = 0, l = nodes.length; i < l; i++) {
						zTree.expandNode(nodes[i], true, false, false); //展开节点就会调用后台查询子节点  
						if(nodes[i].isParent && nodes[i].zAsync) {
							expandNodes(nodes[i].children); //递归  
						} else {
							goAsync = true;
						}
					}
				}

				function check() {
					if(curAsyncCount > 0) {
						return false;
					}
					return true;
				}
				this.initTree();
			}else if(msg == 'treeProduct'){
//				alert('TEST')
				var menu_tree = $('#'+msg).parent("div");
				menu_tree.css('display', 'block');
				menu_tree.slideDown("fast");
               document.addEventListener("click",function(event){
   	            if(!(event.target.id == "citySel" || event.target.id == "menuContentPro" || $(event.target).parents("#menuContentPro").length > 0)) {
					hideMenu();
				}
               },false);
				function hideMenu() {
					menu_tree.fadeOut("fast");
				}

				setTimeout(function() {
					expandAll(msg);
				}, 100); //延迟加载
				var curStatus = "init",
					curAsyncCount = 0,
					goAsync = false;

				function expandAll() {
					if(!check()) {
						return;
					}
					var zTree = $.fn.zTree.getZTreeObj(msg);
					expandNodes(zTree.getNodes());
					if(!goAsync) {
						curStatus = "";
					}
				}

				function expandNodes(nodes) {
					if(!nodes) return;
					curStatus = "expand";
					var zTree = $.fn.zTree.getZTreeObj(msg);
					for(var i = 0, l = nodes.length; i < l; i++) {
						zTree.expandNode(nodes[i], true, false, false); //展开节点就会调用后台查询子节点  
						if(nodes[i].isParent && nodes[i].zAsync) {
							expandNodes(nodes[i].children); //递归  
						} else {
							goAsync = true;
						}
					}
				}

				function check() {
					if(curAsyncCount > 0) {
						return false;
					}
					return true;
				}
				this.initTree();
			}
		},
		//初始化商品树
		initTree: function() {
			var _this = this;
			//添加删除的按钮
			addDiyDom = function(treeId, treeNode) {
				var aObj = $("#" + treeNode.tId + "_a");
				if($("#diyBtn_" + treeNode.id).length > 0) return;
				var editStr = "<span class='iconfont remClass' rem="+treeId+"_rem"+" id=" + treeNode.id + "' value=" + treeNode.id + ">&#xe61e;</span>"+
							  "<span class='iconfont delClass' del="+treeId+"_del"+" id=" + treeNode.id + "' value=" + treeNode.id + ">&#xe601;</span>";
				aObj.append(editStr);
			},
				//初始化新闻树 
				this.treeObj1 = $.fn.zTree.init($("#treeDemo3"), {
					check: {
						enable: true,
						chkboxType: {
							"Y": "",
							"N": ""
						}
					},
					view: {
						dblClickExpand: false,
						addDiyDom: addDiyDom,
//						addHoverDom: addHoverDom,
//						removeHoverDom: removeHoverDom,
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
						url: _this.initUrl,
						otherParam: { "cid": _this.cid, 'cat': 1, 'flag': 100 },
						dataFilter: function(treeId, parentNode, childNodes) {
							if(!childNodes) return null;
							return childNodes.data;
						}
					},
					callback: {
//						beforeClick: _this.beforeClickNews,
						onCheck: _this.onCheckNews,
//						onClick: _this.onClick2News,
						beforeCheck: _this.beforeCheckNews,
						onRename:_this.onRename
					}
				});

			//初始化商品树 
			this.treeObj2 = $.fn.zTree.init($("#treeDemo4"), {
				check: {
					enable: true,
					chkboxType: {
						"Y": "",
						"N": ""
					}
				},
				view: {
					dblClickExpand: false,
					addDiyDom: addDiyDom,
//					addHoverDom: addHoverDom,
//					removeHoverDom: removeHoverDom,
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
					url: _this.initUrl,
					otherParam: { "cid": _this.cid, 'cat': 2, 'flag': 100 },
					dataFilter: function(treeId, parentNode, childNodes) {
						if(!childNodes) return null;
						return childNodes.data;
					}
				},
				callback: {
					//						beforeClick: _this.beforeClick,
					onCheck: _this.onCheck,
//					onClick: _this.onClick2,
					beforeCheck: _this.beforeCheck,
					onRename:_this.onRename,
				}
			});
				//初始化产品树
			this.treeProduct = $.fn.zTree.init($("#treeProduct"), {
				check: {
					enable: true,
					chkboxType: {
						"Y": "",
						"N": ""
					}
				},
				view: {
					dblClickExpand: false,
					addDiyDom: addDiyDom,
//					addHoverDom: addHoverDom,
//					removeHoverDom: removeHoverDom,
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
					url: _this.initUrl,
					otherParam: { "cid": _this.cid, 'cat': 3, 'flag': 100 },
					dataFilter: function(treeId, parentNode, childNodes) {
						if(!childNodes) return null;
						return childNodes.data;
					}
				},
				callback: {
					//						beforeClick: _this.beforeClick,
					onCheck: _this.onCheckProd,
//					onClick: _this.onClick2,
					beforeCheck: _this.beforeCheckProd,
					onRename:_this.onRename,
				}
			});
		},
		//在勾选之前触发事件
		beforeCheck: function(treeId, treeNode) {
			var zTree = $.fn.zTree.getZTreeObj(treeId);
			var nodes = zTree.getNodes();
			for(var i = 0, l = nodes.length; i < l; i++) {
				if(nodes[i].isParent) {
					nodes[i].chkDisabled = true;
				}

			}
		},
		//在勾选时触发事件
		onCheck: function(e, treeId, treeNode) {
			var zTree = $.fn.zTree.getZTreeObj(treeId);
			var nodes = zTree.getCheckedNodes(true);
			var v = "";
			var cat = '';
			for(var i = 0, l = nodes.length; i < l; i++) {
				if(!nodes[i].isParent) {
					v += nodes[i].name + ",";
					cat += nodes[i].id + ",";
				}
			}
			if(v.length > 0) v = v.substring(0, v.length - 1);
			if(cat.length > 0) cat = cat.substring(0, cat.length - 1);
			this.catname = v;
			this.cat = cat;
			//                   $("#citySel").focus();
		},
		onRename:function(e, treeId, treeNode, isCancel){
			  if(treeNode){
					api.GoodsClassAdd({
				 		id: treeNode.id,
				 		name: treeNode.name
				 	}).then(function(res){
				   			if(res.success){
								//window.location.reload();
								$("#citySel").trigger('click');
				   			}
					}).catch(function(error){
	                   	    if(error.data){
	                   	    	if(!error.data.success){
	                   	    		$.CwsPopup.Alert("提示",error.data.msg);
	                   	    	}
	                   	    }
	               });
				  
			  }
		},
		
		//回调函数(在点击时触发事件)
		onClick2: function(e, treeId, treeNode) {
			var zTree = $.fn.zTree.getZTreeObj("treeDemo4");
			//		   			if(treeNode.checked==true){
			//		   				treeNode.checked=false;
			//		   			}else if(treeNode.checked==false){
			//		   				treeNode.checked=true;
			//		   			}

			var nodes1 = zTree.getSelectedNodes();
			for(var i = 0, l = nodes1.length; i < l; i++) {
				zTree.checkNode(nodes1[i], true, true);
			}
			//		   			var nodes1 = zTree.getCheckedNodes(true);
			//		   			for (var i=0, l=nodes1.length; i < l; i++) {
			//						zTree.checkNode(nodes1[i], true,false,true);
			//					}
			//		   			var nodes2 = zTree.getCheckedNodes(false);
			//		   			for (var i=0, l=nodes2.length; i < l; i++) {
			//						zTree.checkNode(nodes2[i], false,false,true);
			//					}
			var nodes = zTree.getCheckedNodes(true);

			var v = "";
			var cat = '';
			for(var i = 0, l = nodes.length; i < l; i++) {
				if(!nodes[i].isParent) {
					v += nodes[i].name + ",";
					cat += nodes[i].id + ",";
				}
			}
			if(v.length > 0) v = v.substring(0, v.length - 1);
			if(cat.length > 0) cat = cat.substring(0, cat.length - 1);
			this.catname = v;
			this.cat = cat;

			//			   		var v = '';
			//		   			if(this.catname){
			//		   				v=this.catname+',';
			//		   			}
			//			   		var cat='';
			//			   		if(this.cat){
			//			   			cat=this.cat+',';
			//			   		}
			//					for (var i=0, l=nodes.length; i<l; i++) {
			//					  if(!nodes[i].isParent){
			//					 	 v += nodes[i].name + ",";
			//					 	 cat +=nodes[i].id + ",";
			//					 	
			//					  }
			//					}
			//					if (v.length > 0 ) v = v.substring(0, v.length-1);
			//					if (cat.length > 0 ) cat = cat.substring(0, cat.length-1);
			//				     this.catname=v;
			//                   this.cat=cat;
		},

		//在勾选之前触发事件
		beforeCheckNews: function(treeId, treeNode) {
			var zTree = $.fn.zTree.getZTreeObj("treeDemo3");
			var nodes = zTree.getNodes();
			for(var i = 0, l = nodes.length; i < l; i++) {
				if(nodes[i].isParent) {
					nodes[i].chkDisabled = true;
				}
			}
		},
		//在勾选时触发事件
		onCheckNews: function(e, treeId, treeNode) {
			var zTree = $.fn.zTree.getZTreeObj("treeDemo3");
			var nodes = zTree.getCheckedNodes(true);
			var v = "";
			var cat = '';
			for(var i = 0, l = nodes.length; i < l; i++) {
				if(!nodes[i].isParent) {
					v += nodes[i].name + ",";
					cat += nodes[i].id + ",";
				}
			}

			if(v.length > 0) v = v.substring(0, v.length - 1);
			if(cat.length > 0) cat = cat.substring(0, cat.length - 1);
			this.catname1 = v;
			this.cat1 = cat;
		},
		
		
		//在勾选之前触发事件
		beforeCheckProd: function(treeId, treeNode) {
			var zTree = $.fn.zTree.getZTreeObj("treeProduct");
			var nodes = zTree.getNodes();
			for(var i = 0, l = nodes.length; i < l; i++) {
				if(nodes[i].isParent) {
					nodes[i].chkDisabled = true;
				}
			}
		},
		//在勾选时触发事件
		onCheckProd: function(e, treeId, treeNode) {
			var zTree = $.fn.zTree.getZTreeObj("treeProduct");
			var nodes = zTree.getCheckedNodes(true);
			var v = "";
			var cat = '';
			for(var i = 0, l = nodes.length; i < l; i++) {
				if(!nodes[i].isParent) {
					v += nodes[i].name + ",";
					cat += nodes[i].id + ",";
				}
			}

			if(v.length > 0) v = v.substring(0, v.length - 1);
			if(cat.length > 0) cat = cat.substring(0, cat.length - 1);
			this.prodcatname = v;
			this.prodcat = cat;
		},
		
		
		
		
		
		
		
		//回调函数
		onClick2News: function(e, treeId, treeNode) {
			var zTree = $.fn.zTree.getZTreeObj("treeDemo3");
			var nodes1 = zTree.getSelectedNodes();
			for(var i = 0, l = nodes1.length; i < l; i++) {
				zTree.checkNode(nodes1[i], true, true);
			}
			var nodes = zTree.getCheckedNodes(true);
			var v = "";
			var cat = '';
			for(var i = 0, l = nodes.length; i < l; i++) {
				if(!nodes[i].isParent) {
					v += nodes[i].name + ",";
					cat += nodes[i].id + ",";
				}
			}

			if(v.length > 0) v = v.substring(0, v.length - 1);
			if(cat.length > 0) cat = cat.substring(0, cat.length - 1);
			this.catname1 = v;
			this.cat1 = cat;
		},

		//处理添加的商品
		GoodsOperation: function(msg) {
			if($(".publish")[3].checked) {
				//发布
				this.status = 1;
				this.addGoods(msg);
			}
			if($(".draft")[3].checked) {
				//存为草稿
				this.status = 0;
				this.addGoods(msg);
			}
		},
		//添加商品
		addGoods: function(msg) {
			var that = this;
			this.goodsPicGet();
			//	 			this.goodsTypeGet();
			this.goodsLabelGet();
			this.goodsContentGet();
			this.mid = $('#columnName').val();
			var tagArr2 = [];
			var length = $('.word-edit-goods #keyword .row-tagsBox').find('.tags_value').length;
			for(var i = 0; i < length; i++) {
				if($('.word-edit-goods #keyword .row-tagsBox').find('.tags_value').eq(i).text()){
					tagArr2.push($('.word-edit-goods #keyword .row-tagsBox').find('.tags_value').eq(i).text());
				}
			}
			this.keyword = tagArr2.join(',');
			if(!this.price) {
				this.price = 0;
			}
			if(!this.quantity_count) {
				this.quantity_count = 0;
			}
			if(!this.quantity_minimum) {
				this.quantity_minimum = 0;
			}
			var midsArr = [];
			$('input[name="columnName"]:checked').each(function(){//遍历每一个名字为interest的复选框，其中选中的执行函数  
				midsArr.push($(this).val());
		    });
			that.mid = midsArr.join(',');
			
			var data2 = {
				'id': this.id,
				'mid': this.mid,
				'uid': this.uid,
				'cid': this.cid,
				'type': this.testSelect,
				"title": this.goodsTitle, //商品名称												必填
				'keywords': this.keyword,
				'metaContent': this.descript,
				"cat": this.cat, //需要调整																									//商品分类												必填
				"keywords": this.keyword, //关键字													选填
				"tags": this.tags, //标签										选填
				"price": this.price, //价格														选填
				"specification": this.specification, //规格														选填
				"quantity_count": this.quantity_count, //商品库存												选填
				"quantity_minimum": this.quantity_minimum, //起订量													选填
				'img': this.bigGoodsImg,
				"goods_img": this.smaGoodsImg,
				"vtext": this.goodsVtext,
				"status": this.status,
				'flag': 400
			}
			var vld = $("#addGoodsForm").validate();
			var h = vld.form();
			var  fld=$("#columnFrom").validate(); 
			var  f=fld.form();
			//验证通过
			if(h && f) {
				if(this.isAdd) {
					//添加商品
					api.AddPage(data2).then(function(res) {
						if(res.success) {
							setIframeUrl('user/contMge/mgrCon.html?page=' + this.pageNum);
//							windowOpenPage(fontBaseUrl + 'user/contMge/mgrCon.html?page=' + this.pageNum);
							//添加单个内容			 				
							if(msg==1){
								windowOpenPage(fontBaseUrl + 'user/contMge/mgrCon.html?page=' + that.pageNum);
							//继续添加
							}else if(msg==2){
								that.getColumn();
								window.location.reload();
							}
						}
					}).catch(function(err) {
						console.log(err)
					})
				} else {
					//修改商品
					api.EditorPage(data2).then(function(res) {
						if(res.success) {
							setIframeUrl('user/contMge/mgrCon.html?page=' + this.pageNum);
							//			 				 windowOpenPage(fontBaseUrl + 'user/contMge/mgrCon.html');
							windowOpenPage(fontBaseUrl + 'user/contMge/mgrCon.html?page=' + this.pageNum);
							//							window.history.go(-1);
						}
					}).catch(function(err) {
						console.log(err)
					})
				}
			}

		},
		//回填商品的内容
		goodsGet: function(data) {
			var that = this;

			this.goodsTitle = data.title;
			this.cat = data.cat; //需要调整
			if(data.keywords != undefined) {
				this.keywords = data.keywords;
			}
			if(data.tags){
				this.tags = data.tags;
			}
			if(data.price != undefined) {
				this.price = data.price;
			}
			if(data.specification != undefined) {
				this.specification = data.specification;
			}
			if(data.quantity_count != undefined) {
				this.quantity_count = data.quantity_count;
			}
			if(data.quantity_minimum != undefined) {
				this.quantity_minimum = data.quantity_minimum;
			}
			if(data.img != undefined) {
				this.bigGoodsImg = data.img;
				$('img[name=goodsImg]').attr('src', this.bigGoodsImg);
			}

			this.smaGoodsImg = data.goods_img;
			this.goodsVtext = data.vtext;
			this.status = data.status;
			if(this.status == 1) {
				$("input[name=Fruit4]")[0].checked = true;
			} else {
				$("input[name=Fruit4]")[1].checked = true;
			}
			//新增
			if(data.keywords) {

				this.keyword = data.keywords.split(",");
				var keywordlen = data.keywords.split(",").length;
				$('.word-edit-goods #keyword .row-tagsBox').html('');
				for(var i = 0; i < keywordlen; i++) {
					this.keyword[i] = HtmlUtil.htmlEncode(this.keyword[i]);
					$('.word-edit-goods #keyword .row-tagsBox').append('<span class="tags-span rel">' + '<span class="tags_value">' + this.keyword[i] + '</span>' +
						'<i class="iconfont i-tags-close abs">&#xe624;</i>' +
						'</span>');
				}
			}

			//回填商品分类
			if(data.cat) {
				this.cat = data.cat.substring(0, data.cat.length - 1);
				var catArr = this.cat.split(',');

				var catStr = '';
				for(var i = 0; i < catArr.length; i++) {
					var node = this.treeObj2.getNodeByParam("id", catArr[i]);

					//				treeObj.selectNode(node);
					node.checked = true;
					catStr += node.name;
					this.treeObj2.updateNode(node);
				}
				this.catname = catStr;
			}
			//回填商品标签
			var len1 = this.tags.length;
			if(len1 >= 1) {
				for(var n = 1; n < len1; n++) {
					// $('.add-size').append('<div class="addd-content addd-nom"><label for="cname" class="col-sm-2 control-label"></label><div class="addd "><div  class="input-select col-sm-4"><i class="fa fa-chevron-down fa-chevron-down-input abs"></i><input class="in-value form-control " type="text"></div><div  class="input-select1 col-sm-2"><div class="click-bit-zl mg0 rel"><i class="fa fa-times-circle f-16 close"></i><input class="in-value1 form-control " type="text" ></div></div></div><div for="cname" class="form-title form-title-add col-sm-2 add_label"  >+新增标签值</div></div>');	

					var newHtml = $("#addAttr").closest('.row').prev().clone();
					newHtml.find('.row-item-box').remove().end().find('.row-tagsBox').html('')
					$("#addAttr").closest('.row').before(newHtml);

				}
				for(var n = 0; n < len1; n++) {
					$('#attrBox .inputBox')[n].value = this.tags[n][0];
					var len2 = this.tags[n].length;
					if(len2 > 0) {
						var inputStr = '<div class="col-md-3 col-sm-3 row-item row-item-box">' +
							'<div class="row row-attr">' +
							'<div class="col-md-7 col-sm-7  mr-15">' +
							'<input type="text" class="form-control control-label" placeholder="标签值" />' +
							'</div>' +
							'<div class="col-md-5 col-sm-5 ml-15">' +
							'<div class="btn-attr-box">' +
							'<button id="tagsSure" type="button" class="btn btn-default btn-add tagsSure">+</button>' +
							'</div>' +
							'</div>' +
							'</div>' +
							'</div>';
						$("#attrBox  .inputBox").eq(n).closest('.row-item').after(inputStr);
					}
					for(var i = 0; i < len2 - 1; i++) {
						//	$('.addd:eq('+n+')').append("<div  class='input-select1 col-sm-2'><div class='click-bit-zl mg0 rel'><i class='fa fa-times-circle f-16 close'></i><input class='in-value1 form-control ' type='text' ></div></div>");
						 this.tags[n][i + 1] = HtmlUtil.htmlEncode( this.tags[n][i + 1]);
						$('#attrBox  .row-tagsBox').eq(n).append('<span class="tags-span rel">' + '<span class="tags_value">' + this.tags[n][i + 1] + '</span>' +
							'<i class="iconfont i-tags-close abs">&#xe624;</i>' +
							'</span>');

					}
					//for(var i=0;i<len2-1; i++){
					//$('.addd:eq('+n+')').find('.input-select1  input')[i].value=this.tags[n][i+1];
					//}
				}
			}
			//回填商品图片
			if(this.smaGoodsImg != undefined) {
				var str = this.smaGoodsImg.substring(0, this.smaGoodsImg.length - 1);
				var imgArr = str.split(',');
				var len3 = imgArr.length;
				if(len3 == 0) {
					$('img[name=goodsImg]').attr('src', this.bigGoodsImg);
				} else if(len3 == 1) {
					$('img[name=goodsImg]').attr('src', this.bigGoodsImg);
					$('img[name=goodsChildImg]').attr('src', imgArr[0]);
				} else if(len3 > 1) {
					$('img[name=goodsImg]').attr('src', this.bigGoodsImg);
					$('img[name=goodsChildImg]').attr('src', imgArr[0]);
					for(var n = 1; n < len3; n++) {
						$('.word-edit-goods .add_img').siblings().append("<div style='border: 1px solid #ddd;' class='useupImg img-btn-small maimglst' title=goodsChildImg" + n + "    data-toggle='modal' data-target='#show_cutimg3'><a class='' ><span class='iconfont sp-color'>&#xe602;</span><img src='' alt='' name=goodsChildImg" + n + " class='uploadimg'/></a><i class='iconfont  abs  small_img'>&#xe624;</i></div>");
						$('img[name=goodsChildImg' + n + ']').attr('src', imgArr[n]);

					}
				}
			}

			//回填ckeditor
		//	this.goodsVtext=JSON.parse(this.goodsVtext);
			var len4 = this.goodsVtext.length;
			if(len4 >= 1) {
				$('.word-edit-goods  .goodsDes').html("");
				var len6 = $('.word-edit-goods .goodsDes .goodsDescribe').length;
				//点击添加时，查找缺少的ord
				var ordarr = [];
				for(var n = 0; n < len6; n++) {
					var ord = $('.word-edit-goods  .goodsDes .goodsDescribe:eq(' + n + ')').attr('ord');
					ordarr.push(ord);
				}
				//1-4去掉已有的ord
				var allordarr = [1, 2, 3, 4];
				for(var i = 0; i < allordarr.length; i++) {
					for(var n = 0; n < ordarr.length; n++) {
						if(allordarr[i] == ordarr[n]) {
							allordarr.splice(i, 1);
						}
					}
				}
				for(var j = 0; j < len4; j++) {
					$('.word-edit-goods  .goodsDes').append('<div class="col-sm-2 goodsDescribe mobile_mb15" ord=' + allordarr[j] + '  style="cursor: pointer;"><input type="text" class="ipt-text radius0 gradient-bg" value="" name="rc.name" maxlength="6"  /><i class="iconfont  abs  small_img goods-close">&#xe624;</i></div>')
					$('.word-edit-goods  .goodsDes .goodsDescribe').find('input').css('border', '1px solid #ddd');
					$('.word-edit-goods  .goodsDes .goodsDescribe:eq(0)').find('input').css('border', '1px solid deepskyblue');
				}
				for(var n = 0; n < len4; n++) {
					$('.word-edit-goods  .goodsDescribe').eq(n).find('input').val(this.goodsVtext[n][0]);
				}
			} else {

			}
			var btn=true;
			var getTextTime=window.setInterval(function(){
				if(btn){
					var a1=$('#cke_content1 iframe')[0].contentWindow.document.body;
					var a2=$('#cke_content2 iframe')[0].contentWindow.document.body;
					var a3=$('#cke_content3 iframe')[0].contentWindow.document.body;
					var a4=$('#cke_content4 iframe')[0].contentWindow.document.body;
					if(a1 && a2 &&a3 && a4){
						for(var n = 0; n < len4; n++) {
							$('#profile3 iframe')[n].contentWindow.document.body.innerHTML = that.goodsVtext[n][1];
						}
						btn=false;
					}
				}
			},100)
			setTimeout(function(){
				window.clearInterval(getTextTime);
			},10000)
			
			
			//		     		callBackLoadIframe();
		},
		//获取商品内容
		goodsContentGet: function() {
			var _this=this;
			var goodsVtext = [];
			var len = $('.word-edit-goods  .desc-type  .goodsDescribe').length;
			var textStr = '';
			for(var n = 0; n < len; n++) {
				var contentArr = [];
				contentArr.push($('.word-edit-goods  .desc-type .goodsDescribe input')[n].value);
				var ord = $('.word-edit-goods  .desc-type  .goodsDescribe').eq(n).attr('ord');
				var container = $('#profile3 .cke_wysiwyg_frame')[ord - 1];
//				var html = (container) ? $('#profile3 .cke_wysiwyg_frame')[ord - 1].contentWindow.document.body.innerHTML :  HtmlUtil.htmlEncode( $('#profile3 .cke_wysiwyg_frame')[ord - 1].val() );
				var html = (container) ? $('#profile3 .cke_wysiwyg_frame')[ord - 1].contentWindow.document.body.innerHTML :   $('#profile3 .cke_wysiwyg_frame')[ord - 1].val() ;
				contentArr.push(html);
				//	 			    textStr+= $('#profile3 .cke_wysiwyg_frame')[ord-1].contentWindow.document.body.innerText;
				goodsVtext.push(contentArr);
				if(html) {
					var div = document.createElement('div');
					div.innerHTML = html;
					textStr += div.innerText;
				}

				//				 	var container = $('.word-edit-goods iframe')[n];
				//	 			    var html= (container) ? $('.word-edit-goods iframe')[n].contentWindow.document.body.innerHTML: $('.word-edit-goods iframe')[n].val();
				//	 			    contentArr.push(html);
				// 					goodsVtext.push(contentArr);
			}
			if(textStr && !_this.vdesc){
				if(textStr.length>200){
					this.descript = textStr.substring(0,199);
				}else{
					this.descript = textStr;
				}
			}
			this.goodsVtext = JSON.stringify(goodsVtext);
		},

		//获取商品的标签
		goodsLabelGet: function() {
			var len = $('#attrBox  .inputBox').length;
			var tagsArr = [];
			for(var n = 0; n < len; n++) {
				var tagArr = [];

				tagArr.push($('#attrBox .inputBox')[n].value);
				var length = $('#attrBox .row-tagsBox:eq(' + n + ')').find('.tags_value').length;
				for(var i = 0; i < length; i++) {
					tagArr.push($('#attrBox .row-tagsBox:eq(' + n + ')').find('.tags_value').eq(i).text());
				}
				tagsArr.push(tagArr);
			}
			this.tags = JSON.stringify(tagsArr);
		},
		//获取商品图片
		goodsPicGet: function() {
			var imgArr = [];
			this.bigGoodsImg = $('img[name=goodsImg]').attr('src');
			for(var i = 0; i <= 5; i++) {
				if($('.upload-goods img')[i]) {
					var src = $('.upload-goods img')[i].src;
					if(src) {
						imgArr.push(src);
					}
				}
			}
			this.smaGoodsImg = imgArr.join(',');
		},

		//初始化ck插件
		init: function() {
			var editor5 = null;
			editor5 = CKEDITOR.replace('content5', {
				customConfig: 'config.js'
			});
			var editor1 = null;
			editor1 = CKEDITOR.replace('content1', {
				customConfig: 'config.js'
			});
			var editor2 = null;
			editor2 = CKEDITOR.replace('content2', {
				customConfig: 'config.js'
			});

			var editor3 = null;
			editor3 = CKEDITOR.replace('content3', {
				customConfig: 'config.js'
			});

			var editor4 = null;
			editor4 = CKEDITOR.replace('content4', {
				customConfig: 'config.js'
			});
			var editor6 = null;
			editor6 = CKEDITOR.replace('content6', {
				customConfig: 'config.js'
			});
			//var editor7 = null;
			//editor7 = CKEDITOR.replace('content7', {
			//	customConfig: 'config.js'
			//});
			
			
			var editor11 = null;
			editor11 = CKEDITOR.replace('content11', {
				customConfig: 'config.js'
			});
			var editor12 = null;
			editor12 = CKEDITOR.replace('content12', {
				customConfig: 'config.js'
			});

			var editor13 = null;
			editor13 = CKEDITOR.replace('content13', {
				customConfig: 'config.js'
			});

			var editor14 = null;
			editor14 = CKEDITOR.replace('content14', {
				customConfig: 'config.js'
			});
			
			CKEDITOR.instances["content14"].on("instanceReady", function() {
				$(".x-tips").fadeOut();
				$(".cke_contents").css("height", "400px");
				callBackLoadIframe();
			});
			
			
		},
		// 加载六大类 tb_code_name
		LoadCodeTypeSort: function() {
			var _this = this;
			_this.mid = getQueryString('mid');
			_this.testSelect = getQueryString('cat');
			_this.id = getQueryString('id');
			api.InitColumSort({'cid': _this.cid }).then(function(res) {
				_this.columnType = res.data;
				
			}).catch(function(err) {
				console.log(err);
			})
		},
		//根据六大类获取 栏目 列表
		ColumnListGetCat: function(cat) {
			var _this = this;
			_this.column = [];
			api.ColumnListGetCat({'cid': _this.cid,'cat': _this.testSelect, 'rid':_this.id}).then(function(res) {
				if(res.success){
					if(res.data){
						if(res.data.length > 0) {
							_this.column = res.data;
						}else{
						//	_this.column = [];
							$.CwsPopup.Alert("提示", "该类型分类没有栏目菜单可选，请先去栏目管理添加！",function(){
								$.CwsPopup.OperateCwsPopup('hide');
								setIframeUrl("user/mgecolumn.html");
								window.top.location.reload();
							});
						}
					}
					//获取栏目类型

					//获取特定栏目的内容
//					_this.ColumnContentGet({
//					"id": _this.id,
//					"type": _this.testSelect,
//					"cid":_this.cid
//					});
				}
			}).catch(function(err) {
				console.log(err);
			});
		},
		//获取特定栏目的内容
		ColumnContentGet: function(data) {
			var that = this;
			var arr = '';
//				var data2 = {
//						"id": that.id,
//						"type": that.testSelect,
//						"cid":that.cid
//					}
			//获取内容
			if(typeof that.column && that.column.length > 0){
				//添加  isAdd=true;
				that.isAdd && that.toggleEdit(that.testSelect);
				//修改 isAdd=false;
				that.isAdd || api.ColumnContentGet(data).then(function(res) {
									that.mid = res.data && res.data.mid && res.data.mid;
									arr = that.mid && that.mid.indexOf(',')> -1 ? that.mid.split(",") : that.mid;
									if(typeof arr == 'object' && typeof arr.length != 'undefined'){
										for(var j=0;j< that.column.length; j++){
											for(var i=0; i<arr.length; i++){
												if(that.column[j].id==arr[i]){
													$("input[name='columnName']")[j].checked = 'checked';
												}
											}
										}
									}else{
										$("input[value='"+arr+"']").prop('checked', true);//='checked';
									}
//		 	  		if(window.localStorage.getItem("cn")){
//						var columnNames=window.localStorage.getItem("cn");
//						window.localStorage.setItem("cn",columnNames);
//						this.columnNames=columnNames.split(',');
//						console.log(that.mid)
//						for(var i=0; i<that.mid.length; i++ ){
//							 for(var j=0; j<$("input[name='columnName']").length; j++){
//							      if($("input[name='columnName']").eq(j).val()==that.mid[i]){
//							      		$("input[name='columnName']").eq(j).attr("checked","checked");
//							      }
//							 }
//						}
//					}



									//回填首页的内容
									that.toggleEdit(that.testSelect);
									if(that.testSelect == '25174661566300304') {
										that.pageGet(res.data);
									}
									//回填单页的内容
									if(that.testSelect == '25174661566300294') {
										that.pageGet(res.data);
									}
									
									//回填产品的内容
									if(that.testSelect == '25174661566300297') {
										that.productGet(res.data);
									}
									//回填新闻的内容
									if(that.testSelect == '25174661566300295') {
										that.newsGet(res.data);
										return false;
									}
									//回填商品页的内容
									if(that.testSelect == '25174661566300296') {
										that.goodsGet(res.data);
									}
									//回填相册页的内容
									if(that.testSelect == '25174661586300305') {
										that.photoGet(res.data);
									}
									//回填媒体的内容
									if(that.testSelect == '25174661586300306') {
										that.mediaGet(res.data);
									}
							}).catch(function(err) {
								console.log(err)
							});
			}else{
					that.isAdd && $('.word-edit').hide();
			}
		},
		//显示分类（获取商品分类）
		showMenu2: function(event, msg) {
			//          	 event.stopPropagation();
			var _this = this;
			var el = event.currentTarget;
			var treeDemo = '#treeDemo' + msg;
			var searchClass = '#searchClass' + msg;
			$(treeDemo).css('display', 'block');
			$('.root_class').eq(msg - 1).css('display', 'block');
			$('.search_res').eq(msg - 1).css('display', 'none');
			//商品分类下拉文件树2===加
			$('.category').eq(msg - 1).slideDown();
			$(searchClass).focus();
			//	赋值
			$(".modal-content-item").on("click", ".treeDemo li a", function() {
				var aa = $(this).text();
				$(this).parent().parent().parent().siblings().val(aa);
			});
			//初始化新闻分类树	
			$.fn.zTree.init($("#treeDemo1"), {
				view: {
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
					url: _this.initUrl,
					otherParam: { "cid": _this.cid, 'cat':1, 'flag': 100 },
					dataFilter: function(treeId, parentNode, childNodes) {
						if(!childNodes) return null;
						return childNodes.data;
					}
				},
				callback: {
					//					beforeClick: _this.beforeClick,
					onClick: _this.onClickNews

				}
			});
			//初始化商品分类树	
			$.fn.zTree.init($("#treeDemo2"), {
				view: {
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
					url: _this.initUrl,
					otherParam: { "cid": _this.cid, 'cat': 2, 'flag': 100 },
					dataFilter: function(treeId, parentNode, childNodes) {
						if(!childNodes) return null;
						return childNodes.data;
					}
				},
				callback: {
					//					beforeClick: _this.beforeClick,
					onClick: _this.onClickGoods

				}
			});

		},
			//显示分类（获取产品分类）
		showMenuSon: function(event, msg) {
			//          	 event.stopPropagation();
			var _this = this;
			var el = event.currentTarget;
			var $_par = $(el).parents("form");
			var treeDemo = '#' + msg;
			var $searchClass = $(treeDemo).parent('.category').find(".searchClass2")//'#searchClass' + msg;
			$(treeDemo).css('display', 'block');
			//$('.root_class').eq(msg - 1).css('display', 'block');
			//$('.search_res').eq(msg - 1).css('display', 'none');
			$_par.find(".root_class").css('display', 'block');
			$_par.find('.search_res').css('display', 'none');
			//商品分类下拉文件树2===加
			//$('.category').eq(msg - 1).slideDown();
			$_par.find(".category").slideDown();
			$searchClass.focus();
			//	赋值
			$(".modal-content-item").on("click", ".treeDemo li a", function() {
				var aa = $(this).text();
				$(this).parent().parent().parent().siblings().val(aa);
			});
			//初始化产品分类树	
			$.fn.zTree.init($(treeDemo), {
				view: {
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
					url: _this.initUrl,
					otherParam: { "cid": _this.cid, 'cat':3, 'flag': 100 },
					dataFilter: function(treeId, parentNode, childNodes) {
						if(!childNodes) return null;
						return childNodes.data;
					}
				},
				callback: {
					//					beforeClick: _this.beforeClick,
					//onClick: _this.onclick()
                    onClick: _this.onClickProd
				}
			});

		},
		//回调函数
		onClickNews: function(e, treeId, treeNode) {
			var zTree = $.fn.zTree.getZTreeObj("treeDemo1"),
				nodes = zTree.getSelectedNodes(),
				v = "";
			nodes.sort(function compare(a, b) {
				return a.id - b.id;
			});
			for(var i = 0, l = nodes.length; i < l; i++) {
				v += nodes[i].name + ",";
			}
			if(v.length > 0) v = v.substring(0, v.length - 1);
			this.pid = treeNode.id;
			$("#child-select1").val(v);
			$('.category').eq(0).slideUp(); //选中后赋值并收起
			$("#child-select1").focus();
		},
		//回调函数
		onClickGoods: function(e, treeId, treeNode) {
			var zTree = $.fn.zTree.getZTreeObj("treeDemo2"),
				nodes = zTree.getSelectedNodes(),
				v = "";
			nodes.sort(function compare(a, b) {
				return a.id - b.id;
			});
			for(var i = 0, l = nodes.length; i < l; i++) {
				v += nodes[i].name + ",";
			}
			if(v.length > 0) v = v.substring(0, v.length - 1);
			$("#child-select2").val(v);
			this.pid = treeNode.id;
			$('.category').eq(1).slideUp(); //选中后赋值并收起
			$("#child-select2").focus();
		},
		//回调函数
		onClickProd: function(e, treeId, treeNode) {
			var zTree = $.fn.zTree.getZTreeObj("treeProduct2"),
				nodes = zTree.getSelectedNodes(),
				v = "";
			nodes.sort(function compare(a, b) {
				return a.id - b.id;
			});
			for(var i = 0, l = nodes.length; i < l; i++) {
				v += nodes[i].name + ",";
			}
			if(v.length > 0) v = v.substring(0, v.length - 1);
			$("#child-select3").val(v);
			this.pid = treeNode.id;
			$('.category').eq(2).slideUp(); //选中后赋值并收起
			$("#child-select3").focus();
		},
		//查询商品分类
		ClaSer: function(msg) {
			var that = this;
			var searchClass = '#searchClass' + msg;
			var className = $(searchClass).val();
			var cat = null;
			if(msg == 1) { //新闻
				cat = 1;
			} else if(msg == 2) { //商品
				cat = 2;
			}else if(msg==3){  //产品
				cat=3; 
			}
			var data = {
				cid: this.cid,
				name: className,
				cat: cat
			}
			if(className == '') {
				$('.treeDemo').css('display', 'block');
				$('.root_class').css('display', 'block');
				$('.search_res').css('display', 'none');
			}
			api.GoodsClassSearch(data).then(function(res) {
				if(res.data.length > 0) {
					$('.treeDemo').css('display', 'none');
					$('.root_class').css('display', 'none');
					$('.search_res').css('display', 'block');
					//that.search_res=res.data;
					//新闻
					if(msg == 1) {
						that.news_search_res = res.data;
						$('.news_search_res').on('click', 'li', function() {
							$('.category').slideUp();
							var ord = $('.news_search_res li').index(this);
							$("#child-select1").val(res.data[ord].name);
							that.pid = res.data[ord].id;
						})
						//商品
					} else if(msg == 2) {
						that.goods_search_res = res.data;
						$('.goods_search_res').on('click', 'li', function() {
							$('.category').slideUp();
							var ord = $('.goods_search_res li').index(this);
							$("#child-select2").val(res.data[ord].name);
							that.pid = res.data[ord].id;
						})
					}else if(msg == 3) {
						that.goods_search_res = res.data;
						$('.prod_search_res').on('click', 'li', function() {
							$('.category').slideUp();
							var ord = $('.prod_search_res li').index(this);
							$("#child-select3").val(res.data[ord].name);
							that.pid = res.data[ord].id;
						})
					}

				}

			}).catch(function(err) {
				console.log(err);
			})
		},
		//添加商品分类
		keepClass: function(msg) {
			var parentClass = $('#child-select' + msg).val();
			var fh=false;
			if(msg == 1) {
				var childClass = $('#newsClassName').val();
				var cat = 1;
				var validator = $( "#newsClassForm" ).validate();
				 fh=validator.form();
			} else if(msg == 2) {
				var childClass = $('#goodsClassName').val();
				var cat = 2;
				var validator = $( "#goodsClassForm" ).validate();
				fh=validator.form();
			}else if(msg == 3) {
				var childClass = $('#prodClassName').val();
				var cat = 3;
				var validator = $( "#prodClassForm" ).validate();
				fh=validator.form();
			}
			var idNum = getCookie('idNum');
			if(parentClass == '无') {
				var data = {
					cid: this.cid,
					name: childClass,
					pid: null,
					cat: cat,
				}
				if(fh){
					addGoodsClass(data);
				}
			} else {
				var data = {
					cid: this.cid,
					name: childClass,
					pid: this.pid,
					cat: cat,
				}
				if(fh){
					addGoodsClass(data);
				}
			}

			function addGoodsClass(data) {
				api.GoodsClassAdd(data).then(function(res) {
					$('.md-close').closest('.md-effect-1').toggleCommModal('close');
					$('.md-close').closest('.md-effect-2').toggleCommModal('close');
					$('.md-close').closest('.md-effect-3').toggleCommModal('close');
					$("#newsClassForm")[0].reset();   //清空表单
					$("#goodsClassForm")[0].reset();   //清空表单
					$("#prodClassForm")[0].reset();   //清空表单
				}).catch(function(err) {
					console.log(err);
					$.cwsPopup.Alert("提示","添加失败！");
				})
			}
		},
		//取消分类
		clearClass: function() {
//			$('#child-select1').val('');
//			$('#child-select2').val('');
//			$('#child-select2').val('');
//			$('#goodsClassName').val('');
//			$('#newsClassName').val('');
			$("#newsClassForm")[0].reset();   //清空表单
			$("#goodsClassForm")[0].reset();   //清空表单
			$("#prodClassForm")[0].reset();   //清空表单
		},
		selColumnByType:function(event){
			var _this=this;
			var id = $(event.currentTarget).val();
			//当前的内容类型
			_this.testSelect = id;
			window.localStorage.setItem("ct",_this.testSelect);
			window.localStorage.setItem("cn",null);
			_this.clearDate();
		    _this.toggleEdit(id);
			this.ColumnListGetCat(_this.testSelect);
			callBackLoadIframe();
		},
		toggleEdit:function(id){
			var that=this;
			
//			$('.word-edit').hide();
			if(id == '25174661566300294') {
//				alert(1111111);
				$('.word-edit-page').show();
//				$('.word-edit-page').css("display",'block');
				//回填单页的内容
			} else if(id == '25174661566300304') {
//				alert(1111111);
				$('.word-edit-page').show();
//				$('.word-edit-page').css("display",'block');
				//回填产品页的内容
			} else if(id  == '25174661566300297') {
				$('.word-edit-product').show();
				//回填产品页的内容
			} else if(id == '25174661566300295') {
				$('.word-edit-news').show();
				//回填新闻页的内容
			} else if(id  == '25174661566300296') {
				$('.word-edit-goods').show();
				//回填相册页的内容
			} else if(id  == '25174661586300305') {
				$('.word-edit-photo').show();

			}else if(id  == '25174661586300306') {
				$('.word-edit-media').show();

			}
			if(that.mid){
				for(var i=0; i<that.mid.length; i++ ){
					 for(var j=0; j<$("input[name='columnName']").length; j++){
					      if($("input[name='columnName']").eq(j).val()==that.mid[i]){
					      		$("input[name='columnName']").eq(j).attr("checked","checked");
					      }
					 }
				}
			}
		},
		//回填内容所属栏目和类型
//		getColumTN:function(){
//			if(window.localStorage.getItem("ct")){
//				this.testSelect=window.localStorage.getItem("ct");
//				window.localStorage.setItem("ct",this.testSelect);
//				$(".columnType option[value='"+this.testSelect+"']").attr("selected",true);
//			}
//			if(window.localStorage.getItem("cn")){
//				var columnNames=window.localStorage.getItem("cn");
//				window.localStorage.setItem("ct",columnNames);
//				this.columnNames=columnNames.split(',');
//				console.log(this.columnNames);
//			}
//		},
   
	
	},
	watch:{
		columnType: function(){
		 	  var _this = this;
		 	  this.$nextTick(function(){
	 	  	   if(getQueryString('isadd') == 'true') {
					_this.isAdd = true;
					_this.testSelect = $(".columnType>option:eq(0)").val();
				} else {
					_this.isAdd = false;
//					_this.testSelect = $(".columnType>option:selected").val();
					$(".columnType").attr("disabled", "disabled");
					$(".columnType option[value='"+_this.testSelect+"']").attr("selected",true);
				}
				if(window.localStorage.getItem("ct")){
						_this.testSelect=window.localStorage.getItem("ct");
				}
				
				//回显已经选中的内容类型
//				if(window.localStorage.getItem("ct")){
//					_this.testSelect=window.localStorage.getItem("ct");
//					window.localStorage.setItem("ct",_this.testSelect);
//					$(".columnType option[value='"+_this.testSelect+"']").attr("selected",true);
//				}
				_this.ColumnListGetCat(_this.testSelect);//根据栏目类型查找栏目
		 	  });
		 },
		 testSelect:function(){
		 	var _this=this;
		 	this.$nextTick(function(){
		 		   if(_this.testSelect){
						$(".columnType option[value='"+_this.testSelect+"']").attr("selected",true);
					}
		 	})
		 },
		 column: function(){
		 	  var _this = this;
		 	  this.$nextTick(function(){
//		 	  		if(window.localStorage.getItem("cn")){
//						var columnNames=window.localStorage.getItem("cn");
//						window.localStorage.setItem("cn",columnNames);
//						this.columnNames=columnNames.split(',');
//						for(var i=0; i<this.columnNames.length; i++ ){
//							 for(var j=0; j<$("input[name='columnName']").length; j++){
//							      if($("input[name='columnName']").eq(j).val()==this.columnNames[i]){
//							      		$("input[name='columnName']").eq(j).attr("checked","checked");
//							      }
//							 }
//						}
//					}
					
					if(window.localStorage.getItem("cn")){
						var columnNames=window.localStorage.getItem("cn");
						window.localStorage.setItem("cn",columnNames);
						_this.mid=columnNames.split(',');
					}
//					for(var i=0; i<_this.mid.length; i++ ){
//						 for(var j=0; j<$("input[name='columnName']").length; j++){
//					      if($("input[name='columnName']").eq(j).val()==_this.mid[i]){
//					      		$("input[name='columnName']").eq(j).attr("checked","checked");
//						      }
//						 }
//					}
	 	  	  		_this.ColumnContentGet({
						"id": _this.id,
						"type": _this.testSelect,
						"cid":_this.cid
					});
		 	  });
		 }
	},
	mounted: function() {
		//获取uid和cid
		if(getUserCookie()) {
			this.cid = getUserCookie().cid;
			this.uid = getUserCookie().uid;
		}
		this.validate();
		this.init();
		this.initTree();
//		this.getColumTN();
		//获取栏目列表
		//this.ColumnListGet();
		this.LoadCodeTypeSort();
		//关闭商品分类树 
		$('.md-effect-1')[0].addEventListener('click', function(event) {
			var node1 = $('.md-modal-item')[0];
			var node2 = $('.md-modal-item')[1];
			var node3 = $('.form-horizontal')[0];
			var node4 = $('.btn-box')[0];
			var node5 = $('#classlabel1')[0];
			if(event.target == node1 || event.target == node2 || event.target == node3 || event.target == node4 || event.target == node5) {
				$('.category').slideUp();
			}
		})

		//关闭新闻分类树 
		//             $('.md-effect-2')[0].addEventListener('click',function(event){
		//             	   var node1=$('.md-modal-item')[0];
		//             	    var node2=$('.md-modal-item')[1];
		//             	    var node3=$('.form-horizontal')[0];
		//             	    var  node4=$('.btn-box')[0];
		//             	    var  node5=$('#classlabel2')[0];
		//             	    if(event.target==node1 || event.target==node2 ||  event.target==node3 ||  event.target==node4 ||  event.target==node5){
		//             	    	 $('.category').slideUp();
		//             	    }
		//             })
		$(document).on('blur', ".category", function() {
			$(this).slideUp();
		})
		//选取根节点即（无）
		$('.root_class').on('click', function(event) {
			$('#child-select1').val('无');
			$('#child-select2').val('无');
			$('#child-select3').val('无');
			$('.category').slideUp();
			$("#child-select1").focus();
			$("#child-select2").focus();
			$("#child-select3").focus();
		})
		//获取管理页面的页码
		var pageNum = getQueryString("page");
		if(pageNum) {
			this.pageNum = pageNum;
		}

	}
})

//window.onload=function (){
//	callBackLoadIframe();
//}

$(document).on('click', '.add_img', function() {
	var aa = $(this).siblings().children().length;
	var title = $(this).attr('data');
	if(title == 'resImgchild') {
		if(aa < 5) {
			$(this).siblings().append("<div style='border: 1px solid #ddd;' class='useupImg img-btn-small maimglst rel' title=" + title + aa + "  data-toggle='modal' data-target='#show_cutimg'><a class='' ><span class='iconfont sp-color'>&#xe602;</span><img src='' alt='' name=" + title + aa + " class='uploadimg'/></a><i class='iconfont  abs  small_img'>&#xe624;</i></div>");
		} else {
			$(this).hide();
		}
	} else if(title == 'goodsChildImg') {
		if(aa < 5) {
			$(this).siblings().append("<div style='border: 1px solid #ddd;' class='useupImg img-btn-small maimglst rel' title=" + title + aa + "    data-toggle='modal' data-target='#show_cutimg3'><a  class='' ><span class='iconfont sp-color'>&#xe602;</span><img src='' alt='' name=" + title + aa + " class='uploadimg'/></a><i class='iconfont  abs  small_img'>&#xe624;</i></div>");
		} else {
			$(this).hide();
		}
	} else if(title == 'photoChildImg') {
		if(aa < 20) {
			$(this).siblings().append("<div style='border: 1px solid #ddd;' class='useupImg img-btn-small maimglst rel' title=" + title + aa + "    data-toggle='modal' data-target='#show_cutimg3'><a  class='' ><span class='iconfont sp-color'>&#xe602;</span><img src='' alt='' name=" + title + aa + " class='uploadimg'/></a><i class='iconfont  abs  small_img'>&#xe624;</i></div>");
			if(aa >= 10) {
				callBackLoadIframe();
			}
		} else {
			$(this).hide();
		}
	}
});

$(".addd-nom").on('click', '.form-title-add', function() {
	var len = $(this).siblings().find('.input-select1').length;
	if(len < 4) {
		$(this).siblings('.addd').append("<div  class='input-select1 col-sm-2'><div class='click-bit-zl mg0 rel'><i class='fa fa-times-circle f-16 close'></i><input class='in-value1 form-control ' type='text' ></div></div>");
	} else {
		$(this).hide();
	}

});
//	    增加整行
$('.form-title-add2').click(function() {

	$('#goods_label').append('<div class="addd-content addd-nom"><label for="cname" class="col-sm-2 control-label"></label><div class="addd "><div  class="input-select col-sm-4"><i class="fa fa-chevron-down fa-chevron-down-input abs"></i><input class="in-value form-control " type="text"></div><div  class="input-select1 col-sm-2"><div class="click-bit-zl mg0 rel"><i class="fa fa-times-circle f-16 close"></i><input class="in-value1 form-control " type="text" ></div></div></div><div for="cname" class="form-title form-title-add col-sm-2 l"  >+新增标签值</div></div>');

});

//点击删除商品CKeditor
$('.word-edit-goods .goodsDes').on('click', '.goods-close', function(e) {
	//如果提供了事件对象，则这是一个非IE浏览器 
	if(e && e.stopPropagation) {
		//因此它支持W3C的stopPropagation()方法 
		e.stopPropagation();
	} else {
		//否则，我们需要使用IE的方式来取消事件冒泡 
		window.event.cancelBubble = true;
	}
	var index = $('.word-edit-goods .goodsDes .goods-close').index(this);
	var len = $('.word-edit-goods .goodsDes .goods-close').length;
	var ord = $(this).parent().attr('ord');
	if(index == len - 1) {
		$(this).parent().remove();
		$('.word-edit-goods .tabcon').addClass('dis-n');
		$('.word-edit-goods .tabcon:eq(0)').removeClass('dis-n');
	} else {
		$(this).parent().remove();
		$('.word-edit-goods .tabcon').addClass('dis-n');
		$('.word-edit-goods .tabcon:eq(' + (ord) + ')').removeClass('dis-n');
	}
	$("#profile3 .cke_wysiwyg_frame").eq(ord - 1).contents().find("p").html("<br/>");
})

$('.word-edit-product .goodsDes').on('click', '.goods-close', function(e) {
	//如果提供了事件对象，则这是一个非IE浏览器 
	if(e && e.stopPropagation) {
		//因此它支持W3C的stopPropagation()方法 
		e.stopPropagation();
	} else {
		//否则，我们需要使用IE的方式来取消事件冒泡 
		window.event.cancelBubble = true;
	}
	var index = $('.word-edit-product .goodsDes .goods-close').index(this);
	var len = $('.word-edit-product .goodsDes .goods-close').length;
	var ord = $(this).parent().attr('ord');
	if(index == len - 1) {
		$(this).parent().remove();
		$('.word-edit-product .tabcon').addClass('dis-n');
		$('.word-edit-product .tabcon:eq(0)').removeClass('dis-n');
	} else {
		$(this).parent().remove();
		$('.word-edit-product .tabcon').addClass('dis-n');
		$('.word-edit-product .tabcon:eq(' + (ord) + ')').removeClass('dis-n');
	}
	$("#profile4 .cke_wysiwyg_frame").eq(ord - 1).contents().find("p").html("<br/>");
})







//点击添加ckeditor
$(document).on('click', '.word-edit-goods .a-add', function(e) {
	var len = $('.word-edit-goods .goodsDes .goodsDescribe').length; //1
	if(len < 4) {
		//点击添加时，查找缺少的ord
		var ordarr = [];
		for(var n = 0; n < len; n++) {
			var ord = $('.word-edit-goods .goodsDes .goodsDescribe:eq(' + n + ')').attr('ord');
			ordarr.push(ord);
		}
		//1-4去掉已有的ord
		var allordarr = [1, 2, 3, 4];
		for(var i = 0; i < allordarr.length; i++) {
			for(var n = 0; n < ordarr.length; n++) {
				if(allordarr[i] == ordarr[n]) {
					allordarr.splice(i, 1);
				}
			}
		}
		$('.word-edit-goods .goodsDes').append('<div class="col-sm-2 goodsDescribe mobile_mb15" ord=' + allordarr[0] + '  style="cursor: pointer;"><input type="text" class="ipt-text radius0 gradient-bg" value="" name="rc.name" maxlength="6"  /><i class="iconfont  abs  small_img  goods-close">&#xe624;</i></div>')
		$('.word-edit-goods .goodsDes .goodsDescribe').find('input').css('border', '1px solid #ddd');
		$('.word-edit-goods .goodsDes .goodsDescribe:eq(' + len + ')').find('input').css('border', '1px solid deepskyblue');
		//显示新添加的ckedtor
		var ord = $('.word-edit-goods .goodsDes .goodsDescribe:eq(' + len + ')').attr('ord'); //  2
		$('.word-edit-goods .tabcon').addClass('dis-n');
		$('.word-edit-goods .tabcon:eq(' + (ord - 1) + ')').removeClass('dis-n');
	}
})

//点击添加ckeditor
$(document).on('click', '.word-edit-product .a-add', function(e) {
	var len = $('.word-edit-product .goodsDes .goodsDescribe').length; //1\
	if(len < 4) {
		//点击添加时，查找缺少的ord
		var ordarr = [];
		for(var n = 0; n < len; n++) {
			var ord = $( '.word-edit-product .goodsDes .goodsDescribe:eq(' + n + ')').attr('ord');
			ordarr.push(ord);
		}
		//1-4去掉已有的ord
		var allordarr = [1, 2, 3, 4];
		for(var i = 0; i < allordarr.length; i++) {
			for(var n = 0; n < ordarr.length; n++) {
				if(allordarr[i] == ordarr[n]) {
					allordarr.splice(i, 1);
				}
			}
		}
		$('.word-edit-product .goodsDes').append('<div class="col-sm-2 goodsDescribe mobile_mb15" ord=' + allordarr[0] + '  style="cursor: pointer;"><input type="text" class="ipt-text radius0 gradient-bg" value="" name="rc.name" maxlength="6"  /><i class="iconfont  abs  small_img  goods-close">&#xe624;</i></div>')
		$('.word-edit-product .goodsDes .goodsDescribe').find('input').css('border', '1px solid #ddd');
		$('.word-edit-product .goodsDes .goodsDescribe:eq(' + len + ')').find('input').css('border', '1px solid deepskyblue');
		//显示新添加的ckedtor
		var ord = $('.word-edit-product .goodsDes .goodsDescribe:eq(' + len + ')').attr('ord'); //  2
		$('.word-edit-product .tabcon').addClass('dis-n');
		$('.word-edit-product .tabcon:eq(' + (ord - 1) + ')').removeClass('dis-n');
	}
})






$(function() {
	//初始化时隐藏ckeditor
	for(var n = 1; n < 5; n++) {
		$('.word-edit-goods .tabcon').addClass('dis-n');
		$(' .word-edit-goods .tabcon:eq(0)').removeClass('dis-n');
		$('.word-edit-product .tabcon').addClass('dis-n');
		$(' .word-edit-product .tabcon:eq(0)').removeClass('dis-n');
	}
})
//点击切换到对应的ckeditor
$('.word-edit-goods .goodsDes').on('click', '.goodsDescribe', function() {
	var ord = $(this).attr('ord');
	$('.word-edit-goods .goodsDes .goodsDescribe').find('input').css('border', '1px solid #ddd');
	$(this).find('input').css('border', '1px solid deepskyblue');
	$('.word-edit-goods .tabcon').addClass('dis-n');
	$('.word-edit-goods .tabcon:eq(' + (ord - 1) + ')').removeClass('dis-n');
})

//点击切换到对应的ckeditor
$('.word-edit-product .goodsDes').on('click', '.goodsDescribe', function() {
	var ord = $(this).attr('ord');
	$('.word-edit-product .goodsDes .goodsDescribe').find('input').css('border', '1px solid #ddd');
	$(this).find('input').css('border', '1px solid deepskyblue');
	$('.word-edit-product .tabcon').addClass('dis-n');
	$('.word-edit-product .tabcon:eq(' + (ord - 1) + ')').removeClass('dis-n');
})






$('.goodsImg').on('click', '.small_img', function(event) {
	event.stopPropagation();
	var len = $(this).parent().parent().children().length;
	if(len <= 5) {
		$(this).parent().parent().siblings().show();
	}
	$(this).parent().remove();
})
$('.productImg').on('click', '.small_img', function(event) {
	event.stopPropagation();
	var len = $(this).parent().parent().children().length;
	if(len <= 5) {
		$(this).parent().parent().siblings().show();
	}
	$(this).parent().remove();
})
$('.photoImg').on('click', '.small_img', function(event) {
	event.stopPropagation();
	var len = $(this).parent().parent().children().length;
	if(len <= 20) {
		$(this).parent().parent().siblings().show();
	}
	$(this).parent().remove();
})
//编辑分类
//$(document).on("click", ".remClass", function(event) {
//  event.stopPropagation();
//	var catId = $(this).attr("value");
//	var params = {
//		catId: catId,
//	}
//	
//})
//删除分类
$(document).on("click", "[del='treeDemo3_del'],[del='treeDemo4_del'],[del='treeProduct_del']", function(event) {
	event.stopPropagation();
	var treeId = $(this).parents('ul.ztree').attr('id');
	var catId = $(this).attr("value");
	var params = {
		id: catId,
	}
	$.CwsPopup.Confirm("删除确认","您确定删除此分类吗？如果只是不选择此分类，请去掉勾选即可。",function(){
           api.delClass({id:catId}).then(function(res) {
				if(res.success) {
					if(treeId == 'treeDemo3'){
						$("#menuContent1").hide();
					}else if(treeId == 'treeDemo4'){
						$("#menuContent2").hide();
					}else if(treeId == 'treeProduct'){
						$("#menuContentPro").hide();
					}
					$.CwsPopup.Alert("提示", "删除分类成功！");
				}
			}).catch(function(err) {
				console.log(err);
				$.CwsPopup.Alert("提示", "删除分类失败！");
				setTimeout(function(){
						$.CwsPopup.OperateCwsPopup('hide');
				},3000);
			})
           $.CwsPopup.OperateCwsPopup('hide');
	},function(){
           $.CwsPopup.OperateCwsPopup('hide');
	},'确定', '取消');
	
});
//编辑分类
$(document).on("click", "[rem='treeDemo3_rem'],[rem='treeDemo4_rem'],[rem='treeProduct_rem']", function(){
	var treeId = $(this).parents('ul.ztree').attr('id');
	var zTreeObj = $.fn.zTree.getZTreeObj(treeId);
	var nodes = zTreeObj.getSelectedNodes();
	//zTreeObj.setEditable(true);
	zTreeObj.editName(nodes[0]);// cancelE
});

   /*产品主图填写内容*/
$("#prodImg").on('load', function() {
	$("input[name=prodImg]").val($("#prodImg").attr("src"));
	$("#prodImg").off('load');
});



function MediaUpload(){
	var data = $("#mediaUpForm").submit();
}

