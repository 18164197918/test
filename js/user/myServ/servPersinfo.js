var personInfo_vm= new Vue({
    el: "#personinfo",
    data:  {
    	    id:'',            				  //域名ID  
    		join_status: '0',				  //result:(0:初始状态可以创建或者申请加入/1:申请中可以取消申请/2:申请成功可以解绑)
            isCompany: false,                 //是否绑定企业
            cid: '',                          //企业ID
            tc_id:null,                       //套餐ID
            uid:null,                         //用户ID   
            choose_cid: null,                 //申请加入的企业ID
            username: null,                   //用户名
            companyImg:'img/user/company.png',//公司的头像 
            personImg:'img/user/person.png',  //用户的头像
            money: 0,                         //余额
            ser_company: '',                  //查找的公司名称
            ser_company_list: '',             //查找到公司的列表
            company_name: '',     			  //公司名称
            begin_time: '',                   //开通时间
            end_time: '',                     //到期时间
            space: 0,                         //空间 大小
            available_size:0,                 //可用空间大小 
            space_pct: 0,                    //空间大小 占用百分比
            space_pct1: 0,                   //空间大小 占用百分比
            space_pct2: 0,                   //空间大小 占用百分比
            space_color: '',                  //空间占用div的颜色
            space_flow: 0,                    //空间流量
            available_flow:0,                 //可用空间流量 
            space_flow_pct: 0,                //空间流量占用百分比
            space_flow_pct1: 0,               //空间流量占用百分比
            space_flow_pct2: 0,               //空间流量占用百分比
            space_flow_color: '',             //空间流量占用div的颜色
            system_src: '',  				  //系统域名
            rel_system_src: null,             //真实的系统域名
            choose_src: '',         		  //绑定域名
            choose_src_arr:[],                //绑定域名数组
       	 	rel_choose_src: null,             //真实的绑定域名
       	 	rel_choose_src_arr:[],                //绑定域名数组
            status: null,                     //解析状态
            pers_leave: 0,                 //账号等级
            pers_type: null,                  //账号认证
            history_list: null,               //历史记录列表
            historyLen: null,                 //历史记录长度
            domain_addr:null,                 //域名地址
            new_domain_addr:null,             //绑定的新域名地址
            catList:[],                      //企业分类列表
            /*#########创建网站开始#############################################*/
   			commpany: '',
   			mdList: [],//模板列表
   			historyList:[], //浏览记录列表
   			params:{
				cid:'',      //tb_user.cid 必填
				uid: "",	//tb_user.id 必填
			    name: "",					                //企业名称       必填
			    logo: "",									//网站logo   选填
			    icon: "",									//网站ICON   选填
			    cat:"",                                     //网站所属行业
			    sys_domain:"",                              //二级域名
			    self_domain:"",								//绑定域名
			    legal_person:"",                        	    //网站的所属人    
			    site_keywords: "",				    		//站点关键词	  选填
			    description: ""	,			    			//站点描述	  选填	
			},
		    rid:"",                                     //资源ID
		    choose_img:"", 								//选取资源的的图片	
		    choose_number:"",                           //选取模板的编号
		    choose_type:"",                             //选取模板的类型
		    choose_typeId:null,                         //选取的套餐ID
   			pay_type:'',                                //支付方式
   			pay_amount:0.00,                            //支付金额
   			oid:'',										//订单号	
   			isCopyData:null,                            //是否添加测试数据
   			mdType:[],                                //网站类型分类
   			professon:[],                             //网站行业分类
   			type_cat:[],
   			trade_cat:[],
   			
   			noData:true,                             //默认有数据
   			/*#########创建网站结束#############################################*/
   			currentpage: 1,                       //当前页     必填
 			pagesize:6 ,                          //页面大小 必填
			contentLines:[],//全部内容
 			linesPerPage: ['10','20','30','50'],
 			currentLines:'0',//当前请求行
 			totalPages: '',
 			type:null,
 			trade:null,
 			searchItem:null,
 			params2:null,
 			
 			currentpage2: 1,                       //浏览记录当前页               必填
 			pagesize2:3 ,                          //浏览记录页面显示条数   必填
 			totalPages2:0,                         //浏览记录数据总条数  
    },
    methods: {
    /*################################创建网站开始######################################################*/
    	validate:function(){
					var _this=this;
				    $("#webInfoForm").validate({
					  	onfocusout:function(element){$(element).valid();},
						onkeyup: false, 
						focusCleanup:true,
					 	rules: {
					 		 sys_domain:{
					 		 	       remote:{
							 				url: api.baseUrl()+"domain.do?chk",
										    type: "post",               //数据发送方式
										    dataType: "text",           //接受数据格式   
										    data: {                     //要传递的数据
										        sys_domain:function () {
			                                       return  _this.params.sys_domain;
			                                    }
										    },
										    dataFilter: function (data,type) {
												if(JSON.parse(data).success){
														return true;
												}else{
													return false;
												}
					                        }
							 			},
							 			required:true,
							 			CNlitter: true,
							 			minlength:4,
							 			nowww:true
					 		 },
					 		 self_domain:{
					 		 	CNlitter: true,
					 		 },
					 		 companyname:{
					 		 	required:true
					 		 },
					 		 site_description:{
					 		 	maxlength:76,
					 		 }
					 	},
					 	messages: {
					 		 sys_domain:{
					 		 	remote:'您设置的二级域名已存在，请重新设置',
					 		 	required:"请设置您的二级域名",
					 		 	CNlitter: "填写内容不能是中文",
					 		 	minlength:"最小长度为4",
					 		 	nowww:"填写内容不能是www"
					 		 },
					 		  self_domain:{
					 		 	CNlitter: "填写内容不能有中文" ,
					 		 },
					 		 companyname:{
					 		 	required:'网站名称不能为空！'
					 		 },
					 		 site_description:{
					 		 	maxlength:"字数上限76个字"
					 		 }
					 	},
					 	invalidHandler: function(form, validator){
					    	return false;
					    },
					    errorPlacement: function(label, element){
				    		$(label).addClass("alert-danger");
				    		$(element).siblings('.form-error').append(label);
					    }
					});
				},
	
		 		//第一步填写网站资料及保存
		 		firstStep:function(){
		 			var _this=this;
		 			var h=null;
//		 			var test_data=$("input[name=testdata]:checked")[0].value;
				    var test_data=null;
				    if($('#inlineRadioOptions')[0].checked){
				    	test_data=1;
				    }else{
				    	test_data=0;
				    }
//		 			if(_this.cid){
//		 				 h= $("#webInfoForm").validate().element($("#companyname"));
//		 			}else{
			 			var vld = $("#webInfoForm").validate(); //进行表单验证
			   			 h = vld.form();
//		 			}
		 			//获取站点关键词
//		            var keywordArr = [];
//		            for (var n = 0; n < $('.keyword').length; n++) {
//		            	if($('.keyword')[n].value){
//			                keywordArr.push($('.keyword')[n].value);
//		            	}
//		            }
		            var tagArr=[];
	 				var length=$(' .keywordBox .row-tagsBox').find('.tags_value').length;
	 				for(var i=0; i<length; i++){
	 					tagArr.push($('.keywordBox .row-tagsBox').find('.tags_value').eq(i).text());
	 				}
//	 			    this.keyword=tagArr.join(',');
		            var value=$(".attrBox input").val();
		            if(value){
		            	if(tagArr.length==0){
		            		$.CwsPopup.Alert("提示","网站关键词需要点击添加按钮才能添加成功！");
		            		return;
		            	}
		            }
		            
		            this.params.site_keywords = tagArr.join(',');
		 			//获取网站所属
		 			this.params.cat=$('#companyCat')[0].value;
		 			if(h){  
		 				   var params={
				   				cid:this.params.cid,      //tb_user.cid 必填
								uid:this.params.uid,	//tb_user.id 必填
							    name: this.params.name,					        //企业名称       必填
							    sys_domain:this.params.sys_domain,                              //二级域名
							    self_domain:"www."+this.params.self_domain,								//绑定域名
//							    legal_person:this.params.legal_person,                        	    //网站的所属人    
								cat:this.params.cat,
							    site_keywords:this.params.site_keywords,				    		//站点关键词	  选填
							    description: this.params.description,			    			//站点描述	  选填	
							    test_data:test_data,
				   			}
					        //将企业信息添加至用户账号
				 			api.AddCpInfo(params).then(function(res){
						   	    if(res.success){
						   	    	var data={
						   	    		uid:getUserCookie().uid,
										uname:getUserCookie().uname,
										cid:res.data,
										company:getUserCookie().company,
										tk:getUserCookie().tk,
										signType:getUserCookie().signType
						   	    	}
						   	        setUserCookie(data.uid ,data.uname, data.cid, data.company, data.tk,data.signType);	   
							       _this.getUserInfo(); 
							       if($('#inlineRadioOptions')[0].checked){
							       		_this.isCopyData=1;
							       }else{
							       		_this.isCopyData=0;
							       }
									$('.siteweb-s').show().siblings().hide();
						   	    }
						   }).catch(function(error){
							   console.log(error);
							   $('.siteweb-f').show().siblings().hide();
						   	    	//$.CwsPopup.Alert("提示","请正确完成资料的填写!");
		                   })  
		 				   
		 			}
		 		},
		 		//第二步选模板
		 		secondStep:function(){
		 			var _this=this;
		 			if(!this.rid){
		 				$.CwsPopup.Alert("提示","请选择模板!");
		 				return ;
		 			}else{
		 			}
	 				$('.siteweb-t').show().siblings().hide();
	 		//		this.getPayAmount();
	 				this.getModelType();
		 		},
		 		//第三步支付
//		 		thirdStep:function(){
//		 			
//		 		},
		 		//点击预览模板
		 		jumpModel: function(modId, modPath, modCid){//跳转模板(模板id、模板路径)
		 		 	//modPath(模板路径动态添加)			
					if(modId && modPath){
	 		 		   window.open('models/showmodel.html?id='+modId+'&p='+modPath+'&cmpid='+modCid, '_blank');
	 		 		}else{
	 		 			$.CwsPopup.Alert("提示","模板尚未添加,敬请期待！");
	 		 		}
		 		},
		 		//点击选择模板
		 		chooseModel:function(event,id,number,pcimg){
		 			this.rid=id;
		 			this.choose_number=number;
		 			this.choose_img=pcimg;
		 			window.localStorage.setItem('chooseMID',id);
		 			this.isChooseMid();
		 		},
		 		//支付
		 		payMoney:function(){
		 			var _this=this;
		 			//将开通年限放入企业信息
		 			var  params2={
		 					cid:this.params.cid,      //tb_user.cid 必填
							uid:this.params.uid,	//tb_user.id 必填
							year:$('#open_time').val(),
		 			}
		 			//将企业信息添加至用户账号
		 			api.AddCpInfo(params2).then(function(res){
				   	    if(res.success){
//                        console.log("添加年限成功");
				   	    }
				    }).catch(function(error){
				   	 console.log("error");
                    }) 
		 			this.pay_type=$('input[name=pay_type]:checked').val();
		 			var params={
		 				uid:this.params.uid,     //uid
		 				cid:this.params.cid,     //uid
		 				rid:this.rid,            //资源ID
		 				pay_type:this.pay_type,  //充值方式
		 				year:$('#open_time').val(),
		 				tc_id:this.tc_id,
		 			}
					$.ajax({
						url:api.baseUrl()+"tem.do?btmp",
						data:params,
						async:false,
						type:"post",
						dataType:'json',
						success:function(res){
							if(res.success && res.data){
								_this.oid=res.data.oid;
								//跳转到微信支付页面
								if(_this.pay_type==10){
									var url=fontBaseUrl + 'user/trade/odersuc.html?amount='+res.data.amount+'&user_id='+_this.params.uid+'&urlSign='+res.data.urlSign+'&oid='+res.data.oid+'&body=1';
									//打开新页面时被浏览器拦截
	//								window.open(fontBaseUrl + 'user/trade/odersuc.html?amount='+res.data.amount+'&user_id='+_this.params.uid+'&urlSign='+res.data.urlSign+'&oid='+res.data.oid,"_blank");
								    //用a标签替代打开新页面
								     var a = document.createElement('a');  
						              a.setAttribute('href', url);  
						              a.setAttribute('target', '_blank');  
						              a.setAttribute('id', 'weixin');  
						              // 防止反复添加  
						              if(!document.getElementById('weixin')){                       
						                  document.body.appendChild(a);  
						              }  
						              a.click();  
					            //支付宝支付      
								}else if(_this.pay_type==20){
									var mOrpc=null;
									var isMobile=judgmentBrowser(); 
									if(isMobile){
										mOrpc='mobile';
									}else{
										mOrpc='pc';
									}
							   		_this.params2={
								    	out_trade_no:res.data.oid,	//（订单号，必填），
								    	total_fee:(res.data.amount/100).toFixed(2),//（金额，必填），
								    	body:1,						//（商品描述，选填），
								    	user_id:_this.params.uid,	//（tb_user.id，必填）
								    	urlSign:res.data.urlSign,	//支付宝签证
								    	mOrpc:mOrpc,         		//手机或者PC
								    }
							   		_this.getAlipay();
								}  
					              
					              
								$.CwsPopup.Confirm("支付确认","请确认支付状态",function(){
				                       _this.pay_suc();
				                       $.CwsPopup.OperateCwsPopup('hide');
								},function(){
				                       _this.remove_pay();
				                       $.CwsPopup.OperateCwsPopup('hide');
				                       $('#weixin').remove();
								},'支付成功', '取消支付');
							}
						},
						error:function(err){
							console.log(err);
						}
					})
		 		},
		 		//跳转到支付宝
			    getAlipay:function (){
		 			var _this=this;
		            $.ajax({
							url:api.payApi()+"/alipay.do?aliToPay",
							data:_this.params2,
							async:false,
							type:"post",
							dataType:'json',
							xhrFields:{withCredentials:true},//解决跨域
							success:function(res){
								if(res.success){
									$("#alipay").html('');
									$("#alipay").append(res.data);
								}
							},
							error:function(err){
								console.log(err);
							}
					});	
				},
		 		//改变上方步骤的显示
		 		toggleStep: function(){
		 			var _this =this;
		 		//	_this.step == 3 &&  _this.step = '提交';
		 			var togTips = $(".processTip .proPart");
		 			var togConts = $(".processCont .proPartC");
		 			$(".processTip").find(".act").removeClass("act");
		 			$(".processCont").find(".actCont").removeClass("actCont");
		 			///_this.step = '3'//返回的成功的步骤 
		 			$(togTips[_this.step.toString()]).addClass("act");
		 			$(togConts[_this.step.toString()]).addClass("actCont");
		 			if(_this.step == 2){
		 				  _this.nextStep = '提交';
		 			}else{
		 				_this.nextStep = '下一步';
		 			}
		 		},
		 		submitAll: function(){//提交最终结果
		 			_this.payMoney();
		 		},
		 		//加载模板
				loadModels: function(msg,data){//加载模板
            		var _this = this;
					var params={
						    type: this.type,
						    trade:this.trade,
						    number:this.searchItem,
							currentpage: this.currentpage,
							pagesize:this.pagesize,
						}
					api.ListModList(params).then(function(res){
						if(res.success && res.data){
							var len=res.data[0].length;
							for(var i=0; i<len; i++){
								var arr=res.data[0][i].cat;
								var str=arr.join(',');
								res.data[0][i].cat=str;
							}
							_this.mdList = res.data[0];
							if(res.data[0].length==0){
								_this.noData=true;   //无数据
							}else{
								_this.noData=false;  //有数据
							}
//							_this.contentLines = res.data[0];           
				   	   	    _this.totalPages = res.data[1].pagenumber;//共几页
				   	   	    _this.currentLines=res.data[0].length;
							
							//如果有rid则让选择模板为rid的模板
							for(var n=0; n<res.data[0].length; n++){
								if(res.data[0][n].id==_this.rid){
									_this.choose_img=res.data[0][n].img;
									_this.choose_number=res.data[0][n].number;
									_this.choose_type=res.data[0][n].type;
									_this.choose_typeId=res.data[0][n].tc_id;
								}
							}
							
						}
					}).catch(function(err){
						console.log(err);
					});
				},
				//获取浏览记录列表
				getHistoryList:function(){
					var _this = this;
					var btn=judgmentBrowser();
					if(btn){   //false: pc设备;true: 移动设备
						this.pagesize2=2;
					}else{
						this.pagesize2=3;
					}
					var params={
						    uid:this.uid,
							currentpage: this.currentpage2,
							pagesize:this.pagesize2,
						}
					api.history(params).then(function(res){
						if(res.success && res.data){
							var len=res.data[0].length;
							_this.historyList=res.data[0];
							_this.totalPages2 = res.data[1].pagenumber;//共几页
						}
					}).catch(function(err){
						console.log(err);
					});
				},
			    //直接Enter搜索网站关键词
	            EnterSearch:function(){
	            		var _this=this;
					    $('#searchItem').on('focus',function(){
			            	document.onkeydown=function(event){
							  var e = event || window.event || arguments.callee.caller.arguments[0];
								    if(e && e.keyCode==13){ // enter 键
								   		  loadModels(3,this);
								    }
							};
						})   
	            },
				
				//点击支付成功，判断不同的支付状态
				pay_suc:function(){
					var _this=this;
						//获取当前的支付状态
						var  params={
					    		id:this.oid
					    	}
			    	    api.getOrderStatus(params).then(function(res){
					    	if(res.data.status==-100){
					    		//主动取消(已关闭）
					             $.CwsPopup.OperateCwsPopup('hide');
					    		
					    	}else if(res.data.status==-200){
					    		//支付超时取消
					    		$.CwsPopup.Alert("提示","您的订单已经超时，请重新支付！",function(){
					    		
					    			$.CwsPopup.Confirm("支付确认","请确认支付状态",function(){
					                       _this.pay_suc();
					                       $.CwsPopup.OperateCwsPopup('hide');
									},function(){
										   _this.remove_pay();
										    $('#weixin').remove();
					                       $.CwsPopup.OperateCwsPopup('hide');
									},'支付成功', '取消支付');
					    		});
					    	}else if(res.data.status==-900){
					    		//已删除
					    	}else if(res.data.status==0){
					    		//默认初始状态
					    	}else if(res.data.status==100){
//					    		//支付中(待付款)
//								_this.pay_success();
					    		$.CwsPopup.Alert("提示","您的订单正在支付中！",function(){
									$.CwsPopup.Confirm("支付确认","请确认支付状态",function(){
					                       _this.pay_suc();
					                       $.CwsPopup.OperateCwsPopup('hide');
									},function(){
					                       _this.remove_pay();
					                       $.CwsPopup.OperateCwsPopup('hide');
					                       $('#weixin').remove();
									},'支付成功', '取消支付');
					    		});
					    		
					    	}else if(res.data.status==200){
					    		//付款成功(待发货)
					    		_this.pay_success();
					    		$.CwsPopup.OperateCwsPopup('hide');
					    	}else if(res.data.status==300){
					    		//已完成
					    		_this.pay_success();
					    		$.CwsPopup.OperateCwsPopup('hide');
					    	}else if(res.data.status==400){
					    		//待评价
					    	}else if(res.data.status==500){
					    		//已发货
					    	}
					    }).catch(function(err){
					    	console.log(err);
					    })
					    
				},
				//点击取消支付，判断不同的支付状态
				remove_pay:function(){
					var _this=this;
						//获取当前的支付状态
						var  params={
					    		id:this.oid
					    	}
			    	    api.getOrderStatus(params).then(function(res){
					    	 if(res.data.status==200){
					    		//付款成功(待发货)
					    		$.CwsPopup.Alert("提示","您的订单已支付完成无法取消！");
					    	}else if(res.data.status==300){
					    		//已完成
					    		$.CwsPopup.Alert("提示","您的订单已支付完成无法取消！");
					    	}else if(res.data.status==400){
					    		//待评价
					    		$.CwsPopup.Alert("提示","您的订单已支付完成无法取消！");
					    	}else if(res.data.status==500){
					    		//已发货
					    		$.CwsPopup.Alert("提示","您的订单已支付完成无法取消！");
					    	}else{
					    		$.CwsPopup.OperateCwsPopup('hide');
					    	}
					    }).catch(function(err){
					    	console.log(err);
					    })
					    
				},
				//支付成功函数
				pay_success:function(){
					        var params={
				 				cid:this.cid,
				 				rid:this.rid
				 			}
					        //将模板信息注入
					        if(this.isCopyData==1){
					 			api.IsCopyData(params).then(function(res){
			                      if(res.success){
			                      	
			                      }
					 			}).catch(function(err){
					 				console.log(err);
					 			})
					        }
					        //获取用户的权限
					        api.meberSearchOne({uid:this.uid}).then(function(res){
					        	if(res.success){
					        		setCookieDefault("roleId",res.data.role_id);
					        		//刷新页面
					        		window.top.location.reload();
                    				//假如是iframe则刷新父级
					        	}
					        }).then(function(err){
					        	console.log(err);
					        })
					        
					        //将自定义弹窗关闭
				 			$(".md-close").closest('.md-modal').toggleCommModal('close');
				},
				//回显页面上的数据
				rePage:function(){
					var _this=this;
					//回显
					if(this.params.cid){
						//获取网站的基本资料
				       api.ListCpInfo({cid: this.params.cid}).then(function(res){
//                          _this.params.legal_person=res.data.legal_person;
                            _this.params.name=res.data.companyname;
                            _this.params.description=res.data.description;
//                          _this.params.site_keywords=res.data.site_keywords;
                            _this.website_title=res.data.website_title;
                            //回填网站所属行业分类
                            $('#companyCat')[0].value=res.data.cat; 
                            //回填关键词
                            if(res.data.site_keywords){
				 				this.keyword=res.data.site_keywords.split(",");
				 				var keywordlen=res.data.site_keywords.split(",").length;
					 			for(var i=0;i<keywordlen; i++){
					 				this.keyword[i] = HtmlUtil.htmlEncode(this.keyword[i]);
					     		    $('.row-tagsBox').append('<span class="tags-span rel">' +'<span class="tags_value">' +this.keyword[i]+'</span>'
											+ 	'<i class="iconfont i-tags-close abs">&#xe624;</i>'
											+	'</span>');
					     		}
				 			}
                            
						   }).catch(function(error){
						   	    console.log(error);
		                   })
						//获取网站开通的域名信息
			        	api.webInfoSet({cid:this.params.cid}).then(function(res){
			        		if(res.success && res.data[1]){
			        			    for(var n=0; n<res.data[1].length; n++){
					                	//检查是系统域名还是绑定域名
					                	if(res.data[1][n].type==0){
					                		//系统域名
					                		_this.params.sys_domain=res.data[1][n].domain_addr;
					                	}else if(res.data[1][n].type==1){
					                		//绑定域名
					                		_this.params.self_domain=res.data[1][n].domain_addr && res.data[1][n].domain_addr.substring(4);
					                	
					                	}
					                }
			        		}
			        	}).catch(function(err){
			        		console.log(err);
			        	})	
				    }
					
				},
				//判断是否已经选择模板
				isChooseMid:function(){
					var _this=this;
					var modelId=null;
					if(getUserCookie().company){
						 modelId=JSON.parse(getUserCookie().company).modelId;
					}
					var rid=window.localStorage.getItem('chooseMID');
					if(modelId){
						this.rid=modelId;
					}
					if(rid){
						this.rid=rid;
					}
					if(this.rid){
							api.ListModList({
								currentpage: 1 ,
								pagesize:100000
							}).then(function(res){
								if(res.success){
									var len=res.data[0].length;
									for(var i=0; i<len; i++){
										var arr=res.data[0][i].cat;
										var str=arr.join(',');
										res.data[0][i].cat=str;
									}
									_this.mdList = res.data[0];
									//如果有rid则让选择模板为rid的模板
									for(var n=0; n<res.data[0].length; n++){
										if(res.data[0][n].id==_this.rid){
											_this.choose_img=res.data[0][n].img;
											_this.choose_number=res.data[0][n].number;
											_this.choose_type=res.data[0][n].type;
											_this.choose_typeId=res.data[0][n].tc_id;
											_this.pay_amount=res.data[0][n].price;
										}
									}
									
								}
							}).catch(function(err){
								console.log(err);
							});
					}
				},
				//获取套餐的金额
				getPayAmount:function(){
					var _this=this;
					var params={
						tc_id:this.tc_id,
						year:$('#open_time').val(),
					}
					api.modelCount(params).then(function(res){
						if(res.success && res.data){
							_this.pay_amount=res.data;
						}
					}).catch(function(err){
						console.log(err);
					})
				},
				
				//获取模板的套餐类型
				getModelType:function(){
					console.log(this.choose_typeId);
					var _this=this;
					var params={
						rid:this.rid,
					}
					api.GetModelType(params).then(function(res){
						if(res.success && res.data){
							_this.choose_type=res.data.name;
							_this.tc_id=res.data.tc_id;
							console.log()
							_this.getPayAmount();
						}
					}).catch(function(err){
						console.log(err);
					})
				},
				
    	/*################################创建网站结束######################################################*/
    	
    	//解除绑定信息
    	cancelBind: function(){
			var cid = '';	
			var uid = '';
			if(getUserCookie()){
				cid = getUserCookie().cid;
				uid = getUserCookie().uid;
			}else{
				$.CwsPopup.Alert("提示","无企业信息解绑！");
			}
			
			if(cid && uid){
				api.UnbindCompyInfo({
					cid: cid,
					uid: uid
				}).then(function(res){
					if(res.success){
						delCookie('cid');
					 	window.location.reload();
					}
				}).catch(function(err){
   					if(err.status == 200){
						err.data &&   $.CwsPopup.Alert("提示",err.data.msg); 
					}
				});
			}
    	},
        //搜索企业名称
        search_company: function (event) {
            var _this = this;
            var data = {
                name: this.ser_company,
            }
            api.SearchCpInfo(data).then(function(res) {
                if (res.success) {
                    _this.ser_company_list = res.data;
                    if(! _this.ser_company){
                    	  _this.ser_company_list =[];
                    }
                    
                }
            }).catch(function(err) {
                console.log(err);
            })
        },
        //取消申请加入企业
        apply_out: function() {
            $('#myModal').modal('hide');
        },
        //申请加入企业
        apply_in: function() {
            var data = { 
                uid: this.uid,
                cid: this.choose_cid,
                remark: '我希望成为贵公司的一员',
            }
            api.JoinCp(data).then(function(res) {
                if (res.success) {
                    $('#myModal').modal('hide');
//                  	$.CwsPopup.Alert("提示","您申请已成功发送,请等待该企业同意!");
//                      window.location.reload();
                }
            }).catch(function(err) {
                console.log(err);
            })
        },
        //选择要绑定的企业
        choose_company: function(id,name) {
            this.ser_company=name;
            this.choose_cid = id;
        },
        //获取个人图像余额
        getPersonInfo:function(){
        	var _this=this;
        	var params={
        		uid:this.uid,
        		cid:this.cid
        	}
        	var params2={
        		id:this.uid,
				currentpage:1,
				pagesize:100
        	}
        	//判断邮箱还是手机认证
        	api.meberInfo(params2).then(function(res){
        		if(res.success && res.data){
	        			if(res.data.user.email){
	        				this.pers_type=1;   //邮箱认证
	        			}else if (res.data.user.mobile){
	        				this.pers_type=0;   //手机认证
	        			}
	        			$('.pers_type i').removeClass('active');
                		$('.pers_type i:eq(' + this.pers_type + ')').addClass('active');
        		}
        	}).catch(function(err){
        		console.log(err);
        	})
        	//获取个人图像余额
        	api.personInfoGet(params).then(function(res){
        		if(res.success && res.data){
        			if(res.data.img){
        				_this.personImg=res.data.img;
        			}
        			if(res.data.available_balance){
        				var num=new Number(res.data.available_balance);
        				_this.money=res.data.available_balance && num.toFixed(2);
        			}
        		}
        	}).catch(function(err){
        		console.log(err);
        	})
        },
        //获取企业的logo
        getCompanyLogo:function(){
        	var _this=this;
        	if(this.cid){
	        	api.ListCpInfo({cid: this.cid}).then(function(res){
	        		if(res.data.logo && res.success){
	        			if(res.data.logo){
	        				_this.companyImg=res.data.logo;
	        			}
	        		 }
			    }).catch(function(error){
			   	    console.log(error);
	            })
        	}
        },
      	//获取网站开通的域名信息
        getWebInfo:function(){
			var _this=this;
			_this.choose_src_arr=[];
			var params={
				cid:this.cid
			}
        	//获取网站开通的域名信息
        	api.webInfoSet(params).then(function(res){
        		if(res.success && res.data[0]){
//      			   _this.cid = res.data[1].cid;    //tb_company.id
        			   var dredge_time=new Date(res.data[0].dredge_time);
   	   	  			   res.data[0].dredge_time=_this.getTime(dredge_time);
        			   var expire_time=new Date(res.data[0].expire_time);
   	   	  			   res.data[0].expire_time=_this.getTime(expire_time);
        			   _this.begin_time = res.data[0].dredge_time;//开通时间
        			   _this.end_time = res.data[0].expire_time;//到期时间
        			   _this.space = res.data[0].space_size;//空间大小
        			   _this.available_size = res.data[0].available_size;//可用空间大小
        			   _this.space_flow = res.data[0].space_flow;//空间流量
        			   _this.available_flow = res.data[0].available_flow;//可用空间流量
        			    //获取空间大小（包括已用空间和总空间）
		                //计算占用百分比
		                var allSpace = _this.space;  //总空间
		                var useSpace = _this.space-_this.available_size;   //已用空间
		                
		                if (parseInt(useSpace / allSpace * 100) < 10) {
		                    _this.space_pct2 = parseInt(useSpace / allSpace * 100) + '%';
		                    _this.space_pct1 = '';
		                } else {
		                    _this.space_pct1 = parseInt(useSpace / allSpace * 100) + '%';
		                    _this.space_pct2 = '';
		                }
		                _this.space_pct = parseInt(useSpace / allSpace * 100) + '%';
		                //改变空间大小进度条的颜色
		                
		                if (parseInt(useSpace / allSpace * 100) < 30) {
							$('.space_size').removeClass('progress-bar-info');
							$('.space_size').removeClass(' progress-bar-warning');
							$('.space_size').removeClass(' progress-bar-danger');
		                    $('.space_size').addClass('progress-bar-success');
		                  
		                    
		                } else if (parseInt(useSpace / allSpace * 100) < 50) {
							$('.space_size').removeClass('progress-bar-warning');
							$('.space_size').removeClass('progress-bar-danger');
		                    $('.space_size').removeClass('progress-bar-success');
		                	$('.space_size').addClass('progress-bar-info');
		                } else if (parseInt(useSpace / allSpace * 100) < 80) {
							$('.space_size').removeClass(' progress-bar-danger');
		                    $('.space_size').removeClass('progress-bar-success');
		                	$('.space_size').removeClass('progress-bar-info');
		                	$('.space_size').addClass(' progress-bar-warning');
		                } else {
		                    $('.space_size').removeClass('progress-bar-success');
		                	$('.space_size').removeClass('progress-bar-info');
		                	$('.space_size').removeClass(' progress-bar-warning');
		                	$('.space_size').addClass(' progress-bar-danger');
		                }
	                    //获取空间流量（包括已用空间流量和总空间流量）
		                //计算占用百分比
		                var allSpaceFlow = _this.space_flow;   //总空间流量
		                var useSpaceFlow = _this.space_flow-_this.available_flow;   //已使用的空间流量
		                
		                if (parseInt(useSpaceFlow / allSpaceFlow * 100) < 10) {
		                    _this.space_flow_pct2 = parseInt(useSpaceFlow / allSpaceFlow * 100) + '%';
		                    _this.space_flow_pct1 = '';
		                } else {
		                    _this.space_flow_pct1 = parseInt(useSpaceFlow / allSpaceFlow * 100) + '%';
		                    _this.space_flow_pct2 = '';
		                }
		                _this.space_flow_pct = parseInt(useSpaceFlow / allSpaceFlow * 100) + '%';
		                //改变空间流量进度条的颜色
		                if (parseInt(useSpaceFlow / allSpaceFlow * 100) < 30) {
							$('.space_size2').removeClass('progress-bar-info');
							 $('.space_size2').removeClass(' progress-bar-warning');
							 $('.space_size2').removeClass(' progress-bar-danger');
		                    $('.space_size2').addClass('progress-bar-success');

		                } else if (parseInt(useSpaceFlow / allSpaceFlow * 100) < 50) {
		                    $('.space_size2').removeClass('progress-bar-warning');
							 $('.space_size2').removeClass('progress-bar-danger');
		                    $('.space_size2').removeClass('progress-bar-success');
		                	$('.space_size2').addClass('progress-bar-info');
		                } else if (parseInt(useSpaceFlow / allSpaceFlow * 100) < 80) {
		                    $('.space_size2').removeClass(' progress-bar-danger');
		                    $('.space_size2').removeClass('progress-bar-success');
		                	$('.space_size2').removeClass('progress-bar-info');
		                	$('.space_size2').addClass(' progress-bar-warning');
		                } else {
		                    $('.space_size2').removeClass('progress-bar-success');
		                	$('.space_size2').removeClass('progress-bar-info');
		                	$('.space_size2').removeClass(' progress-bar-warning');
		                	$('.space_size2').addClass(' progress-bar-danger');
		                }
        		}
        		if(!res.data[0]){
        			  _this.space_pct1 = '0%';
        			  _this.space_pct2 = '';
        			  _this.space_flow_pct1 = '0%';
        			  _this.space_flow_pct2 = '';
        			  _this.space_pct='0%';
        			  _this.space_flow_pct='0%';
        		}
        		if(res.success && res.data[1]){
		                for(var n=0;n<res.data[1].length; n++){
		                	//检查是系统域名还是绑定域名
		                	if(res.data[1][n].type==0){
		                		//系统域名
		                		_this.system_src=res.data[1][n].domain_addr;
		                	}else if(res.data[1][n].type==1){
		                		var   object={
		                			    domain_addr:res.data[1][n].domain_addr,
		                			    id:res.data[1][n].id,
		                			    status:res.data[1][n].status,
		                		      };
		                		//绑定域名
		                		_this.choose_src_arr.push(object);
		                	}
		                }
//      			   _this.status = res.data[1].status;//状态 0：正常； -1：删除
        		}	   
        	}).catch(function(err){
        		console.log(err);
        	})        	
        },
        //转换时间戳
         getTime:function(now){
              //将小于十的数变成两位
              function toDou(num){
                var num=num+"";
                return num=num.length>1?num : 0+num;
             }
         	  var   year=now.getFullYear();     
              var   month=toDou(now.getMonth()+1);     
              var   date=toDou(now.getDate());     
              return   year+"-"+month+"-"+date; 
         },
        //支付成功之后调用此函数
        successSetWeb:function(){
        	setIframeUrl('user/siteCreate.html');
        	window.location.href = fontBaseUrl +"user/siteCreate.html";
        	//初始化企业的开通信息
//      	api.companyInfoSet({cid:this.cid}).then(function(res){//支付成功后调用的会掉
//      		console.log(res);
//      	}).catch(function(err){
//      		console.log(err);
//      	})
        },
        //绑定新域名
        newUrlSet:function(){
        	var _this=this;
        	var params={
        		cid:this.cid,
        		domain_addr:this.new_domain_addr
        	}
        	if(this.new_domain_addr){
        		api.newUrlSet(params).then(function(res){
        			if(res.success){
        				_this.getWebInfo();
        				callBackLoadIframe();
        			   $.CwsPopup.Alert("提示","绑定新域名成功！");
        			}
        		}).catch(function(err){
        			console.log(err);
        			   $.CwsPopup.Alert("提示","绑定新域名失败！");
        		})
        	}
        },
        //删除绑定的域名
        delUrl:function(id){
        	var params={
        		id:id,
        	}
        	var _this=this;
        	api.urlDel(params).then(function(res){
        		if(res.success){
//      			_this.urlRefresh();
        			_this.getWebInfo();
        			$.CwsPopup.Alert("提示","删除绑定域名成功");
        		}
        	}).catch(function(err){
        		   console.log(err);
        		   $.CwsPopup.Alert("提示","删除绑定域名失败!");
        	})
        },
        //刷新绑定的域名
        urlRefresh:function(){
        	var params={
        		cid:this.cid,
        	}
        	var _this=this;
        	api.urlRefresh(params).then(function(res){
        		if(res.success){
        		
        		}
        	}).catch(function(err){
        		   console.log(err);
        	})
        },
        //获取用户信息
        getUserInfo: function() {
            if (getUserCookie()) {
				this.cid=getUserCookie().cid ;
				this.uid=getUserCookie().uid ;
				this.commpany=getUserCookie().company;
				this.params.cid = getUserCookie().cid ;
				this.params.uid = getUserCookie().uid ;
                //判断是否已绑定id
                //获取用户名
                this.username = getUserCookie().uname;
                //获取等级
                var num = parseInt(this.pers_leave);
                 $('.Grade')[0].innerHTML="";
                for (var i = 0; i < num; i++) {
                	//	<span class="iconfont">&#xe644;</span>  实心五角心
					//	<span class="iconfont">&#xe666;</span>  空心五角心
               		 $('.Grade').append('<span class="iconfont">&#xe644;</span>');	
                }
                for(var i = 0; i <5-num; i++){
                	 $('.Grade').append('<span class="iconfont">&#xe666;</span>');	
                }

                //获取认证类型
//              this.pers_type = 1;   //0:手机1：邮箱
//              //现阶段先不涉及用户名不是手机或邮箱的情况，所以先用用户名来判断
//              if (this.username.indexOf('@') > -1) {
//                  this.pers_type = 1;
//              } else {
//                  this.pers_type = 0;
//              }
//              $('.pers_type i').removeClass('active');
//              $('.pers_type i:eq(' + this.pers_type + ')').addClass('active');
                //获取历史记录列表
            } else {
                console.log("cookies没有获取userInfo信息！")
            }
            //获取用户绑定企业状态
        	this.joinCmpOrNot();
        },
        //点击改变查看历史记录
        choose_his: function(event) {
            var ord = $(event.currentTarget).text();
            $('.brower_history_num li').removeClass('active');
            $(event.currentTarget).addClass('active');
            //向上的选项卡
            var height = -235 * (ord - 1);
            $('.brower_web ul').css('margin-top', height);
        },
        //初始化
        init: function() {
//          this.rel_system_src = 'http://' + this.system_src; //真实的系统域名
//          this.rel_choose_src = 'http://' + this.choose_src; //真实的绑定域名
        },
        //判断显示的模块
        joinCmpOrNot: function(){//result:(0:初始状态可以创建或者申请加入/1:申请中可以取消申请/2:申请成功可以解绑)
          var _this = this;
          var cid=_this.cid;
		   if(_this.uid){
			    api.JoinCompyOrNot({
	        		uid: _this.uid
	        	}).then(function(res){
	        		if(res.success){
	        			if(res.data){
	        				//申请成为企业管理员的状态  0：初始状态，1：申请中，2：申请成功
							   if(cid){
							   	  	api.CompanyHaveTemOrNot({
										cid: cid
									}).then(function(res){
										if(res.data==-1){
											//已拥有模板
											_this['join_status']=2;
										}else if(res.data==1){
											//已拥有cid，但是没有模板
											_this['join_status']=3;
										}
									}).catch(function(err){
										console.log(err);
									})
							   }else{
							   	//没有cid，未填写企业信息
							   	_this['join_status']=0;
							   	$('.sitewebMask').fadeIn();//显示遮罩层
		  						$('.siteweb-f').fadeIn();
		  						$('html,body').addClass('ovfHiden'); //使网页不可滚动
							   }
							if(res.data['apply_status']==1){
								_this['join_status'] = 0;
							}
	        				_this['company_name']= res.data['companyName'];
	        				setUserCookie(getUserCookie().uid, getUserCookie().uname,res.data['cid'],getUserCookie().company,getUserCookie().tk);
	        			}
	        		}
	        	}).catch(function(err){
	        		console.log(err);
	        	});
        	}
       },
       cancelApply: function(){//取消申请加入网站
		  var _this = this;	
		  if(_this.uid){
			    api.CancelJoinCompy({
	        		uid: _this.uid
	        	}).then(function(res){
	        		if(res.success){
	        			$.CwsPopup.Alert("提示",res.msg);
	        			window.location.reload();
	        		}
	        	}).catch(function(err){
	        		console.log(err);
	        	});
        	}
       },
       showCreateSite:function(){
       		//获取用户信息
        	this.getUserInfo();
          	$('.sitewebMask').fadeIn();//点击显示遮罩层
    		$('.siteweb-f').fadeIn();
    		$('html,body').addClass('ovfHiden'); //使网页不可滚动
       },
       isAgreeInv:function(){
       	var _this=this;
    	   var uuid=getQueryString('uuid','module');
    	   if(uuid=='null'){
    	   	uuid=null;
    	   }
    	   if(uuid){
    		   $.CwsPopup.Confirm("邀请确认","是否同意该企业的邀请?",function(){
    			   var params={
        				   uid:_this.uid,//（tb_user.id，被邀请人的信息id，必填），
        				   invite_id:uuid ,//（tb_user_company_ln.id，必填），
        				   flag:1 ,//（0：拒绝，1：同意   ，必填）  
        		   }
        		   api.yORn(params).then(function(res){
        		   	  	$.CwsPopup.Alert("提示","您已同意该企业的邀请！",function(){
        		   	  		window.top.location.href=fontBaseUrl+"user/user.html";
        		   	  		$.CwsPopup.OperateCwsPopup('hide');
        		   	  	})
        		   	
        		   }).catch(function(err){
        			   console.log(err);
        			   $.CwsPopup.OperateCwsPopup('hide');
        		   })
			},function(){
					var params={
	    				   uid:_this.uid,//（tb_user.id，被邀请人的信息id，必填），
	    				   invite_id:uuid ,//（tb_user_company_ln.id，必填），
	    				   flag:0 ,//（0：拒绝，1：同意   ，必填）  
	    		   }
	    		   api.yORn(params).then(function(res){
	    		   		$.CwsPopup.Alert("提示","您已拒绝该企业的邀请！",function(){
        		   	  		window.top.location.href=fontBaseUrl+"user/user.html";
        		   	  		$.CwsPopup.OperateCwsPopup('hide');
        		   	  	})
	    		   }).catch(function(err){
	    			   console.log(err);
	    			   $.CwsPopup.OperateCwsPopup('hide');
	    		   })
			},'同意', '拒绝');
    	   }
       },
		//获取网站所属的行业
		getCompanyCat:function(){
			var _this=this;
			api.companyCat().then(function(res){
				_this.catList=res.data;
			}).catch(function(err){
				console.log(err);
			})
		},
		stringToArray:function(arr,str,cat){//工具方法
	 			var str_arr = str.split(',');
	 			for(var i=0; i< str_arr.length; i++){
	 				var name_val = str_arr[i];
	 				if(cat ==  '3040000'){//颜色处理'#'
	 					name_val = name_val.replace(/[#]+/g,'');
	 				}
	 				var obj = {
	 					cat: cat,
	 					name: name_val
	 				}
	 				arr.push(obj)
	 			}
 		},
		loadModType:function(){//加载模板类型分类
	 			var _this = this;
	 			api.ListModType().then(function(res){
 					var dta =  res.data;
	 				var len = dta && dta.length;
	 				if( len > 0){
	 					for(var i=0; i<len; i++){
//	 						switch (dta[i].cat){
//	 							case '60fe489d09a311e8b23cbcee7b2a2195'://模板类型
////	 							_this.mdType.push(dta[i].name);
//	 							_this.mdType.push({"name":dta[i].name,"id":dta[i].id});
//	 							break;
//	 							case '6101f0bf09a311e8b23cbcee7b2a2195'://行业
////	 							_this.professon.push(dta[i].name);
//	 							_this.professon.push({"name":dta[i].name,"id":dta[i].id});
//	 							break;
//	 							default:
//	 							break;
//	 						}

							switch (dta[i].label){
	 							case '基本类型'://模板类型
	 								_this.stringToArray(_this.mdType,dta[i].tagName, dta[i].cat);
	 								_this.type_cat = dta[i].cat;
	 								console.log(_this.mdType);
	 								console.log(_this.type_cat);
	 							break;
	 							case '行业分类'://行业
	 								_this.stringToArray(_this.professon,dta[i].tagName, dta[i].cat);
	 								_this.trade_cat= dta[i].cat;
	 							break;
	 							default:
	 							break;
	 						}







	 					}
	 				}else{
	 					console.log("没有数据");
	 				}
	 			}).catch(function(err){
	 				console.log(err);
	 			})
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
	 			_this.loadModels(4);
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
	 			_this.loadModels(4);
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
	 			_this.loadModels(4);
	 		},
	 		//历史记录上一条
 		    prevHistory:function(){
 		    	var _this=this;
 		    	var cur = _this.currentpage2 -1 ;
		 			if(cur > 0){
		 				_this.currentpage2 = cur;
		 			}
		 			_this.getHistoryList();
 		    },
 		    //历史记录下一条
 		    nextHistory:function(){
 		    	var _this=this;
 		    	var cur = (_this.currentpage2 -1 + 2) % (_this.totalPages2-1+2);
		 			_this.currentpage2 = (cur == 0) ? 1 : cur ;
		 			_this.getHistoryList();
 		    },
    },
	watch: {
		 join_status: function(){
		 	  var _this = this;
		 	  this.$nextTick(function(){
		 	  	console.log(_this.cid);
		 	  	_this.getWebInfo();
		 	  });
		 },
		 mdList: function(){
		 	  var _this = this;
		 	  this.$nextTick(function(){
		 		  $(".x-tips").fadeOut();
		 	  		callBackLoadIframe();
		 	  });
		 },
		 
	},
    mounted: function() {
    	this.validate();  //校验正则
        //获取用户信息
        this.getUserInfo();
        //获取个人资料
        this.getPersonInfo();
        //获取网站开通信息
//      this.getWebInfo();
        //获取企业logo
        this.getCompanyLogo();
        //初始化
        this.init();
        this.EnterSearch();
        this.isAgreeInv();
        
        this.getCompanyCat();
        
        this.loadModType();
        //判断是否选择模板
        this.isChooseMid();
        if(this.cid){ 
        	$('#sys_domain').attr('disabled',true);
			 $('#sys_domain').attr('readonly','readonly');
			 $('#sys_domain').css({"background":"#f2f2f2","cursor":"not-allowed"});
		}
       /*####创建网站开始##################################################################*/ 
		 	
		 		this.loadModels();//加载模板
		 		this.getHistoryList();//获取浏览记录
		 		this.rePage();
		 		//设置模态框信息
		        $('#payStatus').modal({
//		            backdrop:'static',
		            keyboard: false,
		            show: false,
		        });
       /*####创建网站结束##################################################################*/  
       setTimeout(function() {
           $('.brower_history_num li:eq(0)').addClass('active');
       }, 500)

    }
})



function  choose_company(target){
	var id=$(target).attr('id');
	var name=$(target).attr('name');
	personInfo_vm.choose_company(id,name);
}


function firstStep(){
	personInfo_vm.firstStep();
}
		 
function secondStep(){
	personInfo_vm.secondStep();
}

function getPayAmount(){
	personInfo_vm.getPayAmount();
}

function payMoney(){
	personInfo_vm.payMoney();
}

function prevHistory(){
	personInfo_vm.prevHistory();
}
function nextHistory(){
	personInfo_vm.nextHistory();
}

function  addKeyword(target){
	  var Num = $('.keyword_box').find('.keyword').length;
        if (Num < 3) {
            $(target).parent().prev().append('<div class="col-md-3 col-sm-3 col-xs-3 ml-15 rel"><input type="text" class="form-control keyword" style="width: 100%;"><i class="iconfont i-clone-del cur-p">&#xe624;</i></div>');
        }
         if (Num >= 2) {
         	$(target).parent().hide();
         }
}

 $('body').on("click",".i-clone-del",function(){
		var Num =$(this).parent().parent().children().length;
		if(Num<=3){
	      $(this).parent().parent().siblings().show();	
	    }
    	$(this).parent().remove();
	})
 
function loadModels(msg,target){
	var data=null;
	data =$(target)[0].value;
	if(data=="all"){
		data=null;
	}else{
		if(msg==3){
				data=$('#searchItem').val();
		}else{
			data=data.replace(/[|]/g,'`');	
		}
	}
	if(msg==1){
		personInfo_vm.type=data;
	}else if(msg==2){
		personInfo_vm.trade=data;
	}else if(msg==3){
		personInfo_vm.searchItem=data;
	}
    personInfo_vm.loadModels();
}

 $("#personinfo").on('click','#companyImg',function(){
			  $('#uploadLogoImage').click();
 })
