var vm_mgecustom = new Vue({
	 	data:function(){
	 		return {
	 			initUrl: api.baseUrl()+'/column2.do?get',
	 			params: {
	 				uid:'',      //代理商用户id 必填
	 				status:'',  //搜索条件  选填(-1:失效，0:正常) 
	 				searchItems:'', //搜索条件
	 				currentpage: 1,                       //当前页     必填
	 				pagesize: 20                          //页面大小 必填
	 			},
	 			currentpage: 1,                       //当前页     必填
	 			pagesize: 20 ,                          //页面大小 必填
	 			contentLines:[],//全部内容
	 			linesPerPage: ['10','20','30','50'],
	 			currentLines:'0',//当前请求行
	 			totalPages: '',
	 			modelsType:[],//模板套餐类型
	 			modifyCompayName:'',//显示公司名
	 			id:'',//客户id
	 			pwd:'',//修改密码
	 			searchInfo:'',//查询用户信息
	 			customParams:{
	 				id:'',//代理商id 必填
	 				cid:'',//代理商的企业id 
	 				userName:'',//用户名 必填
	 				pwd: '',//密码  必填
	 				companyName: '',//公司名称 必填
	 				domain:'',//二级域名  必填
	 				tc_id:'',//网站模板类型id   必填    select
	 				industry:'', //行业 选填
	 				websit_title:'',//网站名称 选填
	 				model_id:'',//模板id   必填    select
	 				year:''//开通年限  必填    select
	 			},
	 			noData:false
	 		}
	 	},
	 	methods:{
	 		validate:function(){
	 			var _this = this;
				 $("#addCustomForm").validate({
				 	 ignore: "",//不验证的元素
   					onfocusout:function(element){$(element).valid();},
					onkeyup: false, 
					focusCleanup:true,
				 	rules: {
				 		userName:{//用户名
				 			required:true,
				 			remote:{
			 				    async:false,
				 				url: api.testNewUserName(),//检测用户名是否重复接口
							    type: "post",               //数据发送方式
							    dataType: "text",           //接受数据格式   
							    data: {                     
							        name:function () {
                                       return  _this.customParams.userName;
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
				 		},
				 		pwd: {//密码
				 			required: true
				 		},
				 		companyName:{//公司名称
				 			required:true
				 		},
				 		domain:{//二级域名
				 			required:true
				 		},
				 		modeltype:{//模板类型
				 			required:true
				 		},
				 		modelId:{//模板ID
				 			required:true
				 		},
				 		year:{//开通年限
				 			required:true
				 		}
				 	},
				 	messages: {
				 		userName:{
				 			required:"请填写用户名",
				 			remote: "该用户名已存在！"//请求验证
				 		},
				 		pwd: {
				 			required: "请填写密码"
				 		},
				 		companyName:{
				 			required:"请填写公司名称"
				 		},
				 		domain:{
				 			required:"请填二级域名"
				 		},
				 		modeltype:{//模板类型
				 			required:"请填模板类型"
				 		},
				 		modelId:{//模板ID
				 			required:"请填模板ID"
				 		},
				 		year:{
				 			required:"请填开通年限"
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
	 		renderEfect: function(){//状态管理下拉特效
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
	 			this.params.pagesize = this.pagesize;
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
	 		//刷新
	 		reload:function(){
	 			location.reload();
	 		},
	 		//跳转到某页
			changeCurrentPage: function(e){
	 			var _this = this;
	 			if($.trim($('.currentpage').val()) != ''){
	 			    if(Number($('.currentpage').val()) <= Number( _this.totalPages)){
	 			    	 _this.currentpage = $('.currentpage').val();
	 			    }else{
	 			        $('.currentpage').val(this.currentpage) ;
	 			    }
	 			}
	 			_this.loadContent();
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
	 			_this.loadContent();
	 		},
			/*获取用户相关参数*****/
			getCookieInfo: function(){//通过local
				var cid =  '';
				if(getUserCookie()){
					cid = getUserCookie().cid || ''; 
					this.params.uid = getUserCookie().uid || ''; 
					this.customParams.id=getUserCookie().uid || ''; 
				}
				if(cid){
					this.customParams.cid = cid;
				}else{
					console.log("Error:当前用户没有cid!");
				}
			},
			/*切换状态*/
			batchOpear:function(msg){
 				this.params.status = msg;
 				this.loadContent();//筛选客户信息列表
 			},
 			/*搜索*/
 			searchList: function(){
 				this.loadContent();
 			},
			/*模板套餐类型********/
			modelTypeList: function(){
				 var _this =this;
				 api.modelTypeList().then(function(res){
				 	if(res.success){
				 		_this.modelsType = res.data && res.data;
				 	}
				 }).catch(function(err){
				 	console.log(err);
				 });
			},
			/*检索模板ID*********/
			modelIdSearch: function(val,select){
				var _this = this;
				api.searchModelId({
					serachItem: val
				}).then(function(res){
					if(res.success){
						if(res.data){
							for (var i = 0; i < res.data.length; i++) {  
								 res.data[i].number = HtmlUtil.htmlEncode( res.data[i].number);
	               				select.append("<option value='"+res.data[i].id+"'>"+ res.data[i].number + "</option>");  
	           				}  
                			$('.selectpicker').selectpicker('refresh');  
						}
					}
				}).catch(function(err){
					if(err.status == 200){
						if(err.data.success == false){
							  $('.selectpicker').selectpicker('val', '请输入选择');  
							  select.html("<option value=''>请输入选择</option>"); 
							  $('.selectpicker').selectpicker('refresh');  
						}
					}
				
				});
			},
			/*添加客户信息********/
			addCustomInfo:function(ele){
				var _this = this ;
				//var target = event.currentTarget;
				$.extend(_this.customParams, {
					tc_id: $("#customParams_type>option:selected").val(),
					model_id: $('#slpk').selectpicker('val'),
					year: $("#customParams_year>option:selected").val()
				});//类型
    			var vld = $("#addCustomForm").validate();
				var h = vld.form();
				console.log(ele)
				if(h){
			       $(ele).attr('disabled', true);
					api.addCustomInfo(_this.customParams).then(function(res){
						if(res.success){
							 window.top.location.reload();
						}
					}).catch(function(err){
						if(err.status == 200){
							if(err.data){
								var msgTip = err.data.msg || '添加客户失败,请联系后台开发人员！'
								$.CwsPopup.Alert("提示",msgTip);
							}
						}
					});
				}
			},
			/*修改密码******/
			modifyPsword: function(){
				var _this = this ;
				if( _this.params.uid &&  _this.pwd){
					api.modifyInfoComm({
						id: _this.id,
						pwd: _this.pwd
					}).then(function(res){
						if(res.success){
							$.CwsPopup.Alert("提示",res.msg);
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
				}else if(_this.pwd == ''){
					$.CwsPopup.Alert("提示","修改密码不能为空！");
				}else{
					$.CwsPopup.Alert("提示","信息不齐全修改密码失败！");
				}
				
			},
			/*查询单条用户信息*/
			searchCustom:function(id){
				var _this = this;
				api.searchCustomInfo({
					id: _this.id
				}).then(function(res){
					if(res.success){
			   	   	  if(res.data){
			   	   	  	_this.searchInfo = res.data;
	   	   	   		  }
					}
				}).catch(function(error){
					console.log("处理失败！");
				});
			},
			//获取客户信息
	 		loadContent: function(){
	 			var _this = this;
	 			api.customInfoList(_this.params).then(function(res){
			   	   if(res.success){
			   	   	  if(res.data){
			   	   	  	if(res.data[0] && res.data[0].length > 0){
				   	   	   	 _this.contentLines = res.data && res.data[0];  
				   	   	     _this.currentLines = res.data[0].length;//当前条数
				   	   	     _this.noData = false;
			   	   	  	}else{
			   	   	  		_this.contentLines = res.data && res.data[0];
			   	   	  		_this.noData = true;
			   	   	  	}
			   	   	    _this.totalPages = res.data[1].pagenumber;//共几页
			   	   	    $(".x-tips").fadeOut();
			   	   	    callBackLoadIframe();//重置iframe高度
	   	   	   		  }
					}
			   }).catch(function(error){
               	     console.log("处理失败！");
               })
 			},
	 	},
	 	mounted:function(){
	 		var _this=this;
	 		this.validate();	
	 		this.getCookieInfo();//获取用户信息
	 		if(window.localStorage.getItem("pagesize")){
	 			_this.pagesize=window.localStorage.getItem("pagesize");
	 		}else{
	 			window.localStorage.setItem("pagesize",_this.pagesize);
	 		}
	 		this.modelTypeList();//模板套餐类型list
	 		this.renderEfect();//状态下拉效果渲染
	 		this.loadContent();//初始化内容
	 	}
	 }).$mount("#mgecustom");
	 
	 
/*添加客户*/
function addCustomInfo(ele){
	vm_mgecustom.addCustomInfo(ele);
}

/*边输入边检索模板ID内容*/
$(".modelIdSearch").on('propertychange input','input.form-control',function(){//focus
  	 	var select = $("#slpk"); 
  		select.html('');
		vm_mgecustom.modelIdSearch($(this).val(),select);
});

/*修改密码*/
$(document).on('click','.modifyPsw',function() {
	$('.md-modifyPsw').toggleCommModal('show');
	vm_mgecustom.modifyCompayName = $(this).attr("compyName");
	vm_mgecustom.id = $(this).attr("uid");
});
/*查看用户信息*/
$(document).on('click','.searchCustom',function() {
	vm_mgecustom.id = $(this).attr("uid");
	vm_mgecustom.searchCustom();
	$('.md-searchCustom').toggleCommModal('show');
});
/*确认修改密码*/
function confirmSubmit(){
	vm_mgecustom.modifyPsword();
}
/*模板ID选择失去焦点验证*/
$(document).on('blur','.bs-searchbox input',function(){
	$("#addCustomForm").validate().element($("#slpk"))
});

