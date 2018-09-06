var weBasinfo_vm=new Vue({
	    el:'#sitebox',
		data:function(){
			return {
				params:{
					cid:'',      //tb_user.cid 必填
					uid: "",	//tb_user.id 必填
				    name: "",					                //企业名称       必填
				    logo: "",									//网站logo   选填
				    icon: "",									//网站ICON   选填
				    website_title: "",							//网站标题       选填 
				    record: "",									//网站备案号	  选填 
				    site_keywords: "",				    		//站点关键词	  选填
				    description: ""	,			    			//站点描述	  选填	
				    address: "",							    //企业地址	  选填 
				    postal_code: "",						    //邮政编码 	  选填
				    fax: "",								    //企业传真	  选填 
				    contactname: "",							//联系人 	  必填
				    contact: "",								//电话号码	  必填 
				    phone: "",									//手机号 	  必填
				    email: "",									//电子邮箱	  必填
				    area_id:"",         						//区域ID
				},
				provinceList:null,    //省份列表
				provinceId:null,      //省Id 
				cityList:null,        //市列表
				cityId:null,          //市Id 
				countyList:null,      //县列表
//				area_id:null,         //区域id 
			}
		},
		methods:{
			validate:function(){
			    $("#commentForm").validate({
				  	onfocusout:function(element){$(element).valid();},
					onkeyup: false, 
					focusCleanup:true,
				 	rules: {
				 		cpname: "required",
				 		websiteTitle:"required",
				 		site_description:{
				 		 	maxlength:76
				 		}
				 	},
				 	messages: {
				 		cpname:  "企业名称不能为空！", 
				 		websiteTitle: "网站标题不能为空！",
				 		site_description:{
				 		 	maxlength:"字数上限76个字"
				 		}
				 		
				 	},
				 	invalidHandler: function(form, validator){
				    	$.CwsPopup.Alert('提示','验证结果不正确，请重新输入！');
				    	return false;
				    },
				    errorPlacement: function(label, element){
			    		$(label).addClass("alert-danger");
			    		$(element).siblings(".err-msg").append(label);
				    }
				});
			},
			validate2:function(){
				  $("#commentForm2").validate({
				  	onfocusout:function(element){$(element).valid();},
					onkeyup: false, 
					focusCleanup:true,
				 	rules: {
				 		address:"required",
				 		mail:{
				 			mail:true
				 		},
				 		fax:{
				 			fax:true
				 		},
				 		contactname: "required",
				 		contact:{
				 			phone:true,
				 		},
				 		phone:{
				 			tel:true,
				 			required:true
				 		},
				 		email:{
				 			email:true,
				 		}
				 	},
				 	messages: {
				 		address:"企业详细地址不能为空！",
				 		mail:{
				 			mail:'请输入正确的邮政编码！',
				 		},
				 		fax:{
				 			fax:'请输入正确的传真号码！'
				 		},
				 		contactname:  "联系人不能为空！", 
				 		contact:{
				 			phone:'请输入正确的电话号码！',
				 		},
				 		phone:{
				 			tel:'请输入正确 的手机号码！',
				 			required:'手机号码不能为空！',
				 		},
				 		email:{
				 			email:'请输入正确的邮箱号码！',
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
//			renderPluginPic: function(){
//				new Up_picture();
//			},
			//上一步
			prevSaveParams: function(){
				    $('#commentForm').css('display','block');
 					$('#commentForm2').css('display','none');
			},
			//下一步
			//验证通过将 值保存到 storeParams中 ,sitBox_two保存成功后清空 storeParams
			nextSaveParams: function(){
			   	this.submitData();
			},
			//下一步时提交数据
			submitData: function(){
				var _this = this;
				var vld = $("#commentForm").validate();
				var h = vld.form();
				//验证通过才可以下一步 跳转并把合法数据传递
//				if(h){
				this.params.logo=$('img[name=logoImg]').attr('src');
				this.params.icon=$('img[name=iconImg]').attr('src');
				var tagArr=[];    
 				var length=$('.keywordBox .row-tagsBox').find('.tags_value').length;
 				for(var i=0; i<length; i++){
 					tagArr.push($('.keywordBox .row-tagsBox').find('.tags_value').eq(i).text());
 				}
 			    this.params.site_keywords=tagArr.join(',');//站点关键词
				//验证通过才可以下一步 跳转并把合法数据传递
				if(h){
					//验证通过提交请求
					 api.AddCpInfo(_this.params)
					   .then(function(res){
					   	    if(res.success){
			                    $('#commentForm').css('display','none');
			 					$('#commentForm2').css('display','block');
			 					callBackLoadIframe();
						    }    
					   }).catch(function(error){
					   	    console.log(error);
	                   });
                 }
			},
			//最终保存数据
			saveData: function(){
				var _this = this;
				//验证通过添加上一box数据 提交请求
				var vld = $("#commentForm2").validate();
				var h = vld.form();
				_this.params.cid=getUserCookie().cid;
				this.params.area_id=$(".countyList").val();
				if(h){
				 api.AddCpInfo(this.params)
				   .then(function(res){
				   	   if(res.success){
					   		if(!window.localStorage){
				            	$.CwsPopup.Alert("提示","浏览器不支持localstorage！"); 
					       }else{
					       	 $.CwsPopup.Alert("提示","保存成功！",function(){
//	                             $('#commentForm').css('display','block');
//	 							 $('#commentForm2').css('display','none');
//							     callBackLoadIframe();
							     $.CwsPopup.OperateCwsPopup('hide');
    							 window.location.reload();
					       	 });
					       	 setTimeout(function (){
					       	 	$.CwsPopup.OperateCwsPopup('hide');
    							 window.location.reload();
					       	 },3000);
					   	    }
				   	   }
				   })
                   .catch(function(error){
                   	   $.CwsPopup.Alert("提示","保存失败！"); 
                   	   console.log(error);
                   })
                }
			},
			//获取省的列表
			ProvinceGet: function(){
				var _this=this;
				api.ProvinceList().then(function(res){
					if(res.success){
						_this.provinceList=res.data;
						setTimeout(function(){
						    		var Length=res.data.length;
						    		for(var n=0;n<Length;n++){
						    			$('.provinceList option')[n].value=_this.provinceList[n] &&_this.provinceList[n].id;
						    		}
						    		$('.provinceList').val(_this.provinceList[0].id);
						    		_this.chooseProvince();
					    },10)
					}
				}).catch(function(err){
					console.log(err);
				})
			},
			//选择省份
			chooseProvince: function(){
				var _this=this;
				this.provinceId=$('.provinceList').val();
				this.CityList();
			},
		    //获取市的列表
			CityList: function(){
				var _this=this;
				var data={
					pid:this.provinceId
				}
				api.CityList(data).then(function(res){
					if(res.success){
						_this.cityList=res.data;
						setTimeout(function(){
					    		var Length=res.data.length;
					    		if(Length>0){
						    		for(var n=0;n<Length;n++){
						    			$('.cityList option')[n].value=_this.cityList[n].id;
						    		}
							        $('.cityList').val(_this.cityList[0].id);
							         _this.chooseCity();
					    		}
					    },30)
					}
				}).catch(function(err){
					console.log(err);
				})
			},
			//选择市列表
			chooseCity: function(){
					this.cityId=$('.cityList').val();
					this.CountyList();
			},
			//获取县的列表
			CountyList: function(){
				var _this=this;
				var data={
					pid:this.cityId
				}
				api.CityList(data).then(function(res){
					_this.countyList=res.data;
					setTimeout(function(){
								var Length=res.data.length;
					    		for(var n=0;n<Length;n++){
					    			if($('.countyList option')[n])
					    			$('.countyList option')[n].value=_this.countyList[n] && _this.countyList[n].id;
					    		}
						        $('.countyList').val(_this.countyList[0].id);
						       
					},40)
				}).catch(function(err){
					console.log(err);
				})
			},
			//获取用户信息
			getUserInfo: function(){
					var cid = '';
					var uid='';
					if(getUserCookie()){
						cid=getUserCookie().cid ;
						uid=getUserCookie().uid ;
					}
					this.params.cid = cid ;
					this.params.uid = uid ;
			},
			//回显页面
			renderPage: function(){
				var _this=this;
				var parmT={};
				if(_this.params.cid){
				    api.ListCpInfo({cid: _this.params.cid})
					   .then(function(res){
					   		for(var i in res.data){
							    if(_this.params.hasOwnProperty(i) || (i == 'companyname')){
							    	if(i == 'companyname'){
							    		_this.params['name'] = res.data['companyname']
							    	}else{
										_this.params[i] = res.data[i];
									}
								}else{
										parmT[i] =  res.data[i];
								}
							}
					   		if(res.data){//回显关键字
					   			if(res.data.site_keywords){
									_this.params.site_keywords =  res.data.site_keywords;
									var keywords = _this.params.site_keywords.split(",");
					 				var keywordlen=keywords.length;
						 			for(var i=0;i<keywordlen; i++){
						 				keywords[i] = HtmlUtil.htmlEncode(keywords[i]);
						     		    $('.keywordBox .row-tagsBox').append('<span class="tags-span rel">' +'<span class="tags_value">' +keywords[i]+'</span>'
												+ 	'<i class="iconfont i-tags-close abs">&#xe624;</i>'
												+	'</span>');
						     		}
					   			}
					   		}
					   		//回显图片
					   		if(res.data.logo){
					   			$('img[name=logoImg]').attr('src',res.data.logo);
					   		}
					   		if(res.data.icon){
					   			$('img[name=iconImg]').attr('src',res.data.icon);
					   		}
					   		if(res.data.area_id){
						   		_this.params.area_id=res.data.area_id;
						   		var  provinceId=_this.params.area_id.substring(0,2);
			                    var  cityId=_this.params.area_id.substring(0,4);
			                    var  countyId=_this.params.area_id;
						        $('.provinceList')[0].value=provinceId;
						        _this.provinceId=provinceId;
						        //将对应的市列表修改
								_this.CityList();
								setTimeout(function(){
									$('.cityList')[0].value=cityId;
									_this.cityId=cityId;
							       //将对应的县列表修改
									_this.chooseCity();
									setTimeout(function(){
								       $('.countyList')[0].value=countyId;
									},100)
								},100)
					   		}
					   }).catch(function(error){
					   	    console.log(error);
	                   });
			   }
			},
		},
		mounted:function(){
			var _this=this;
			this.getUserInfo();
			this.ProvinceGet();
			this.validate();
			this.validate2();
			setTimeout(function(){
				_this.renderPage();
			},120);
			 $(".x-tips").fadeOut();
			callBackLoadIframe();
		}
	})

function prevSaveParams(){
	weBasinfo_vm.prevSaveParams();
}
function saveData(){
	weBasinfo_vm.saveData();
}

function nextSaveParams(){
	weBasinfo_vm.nextSaveParams();
}
function chooseProvince(){
	weBasinfo_vm.chooseProvince();
}
function  chooseCity(){
	weBasinfo_vm.chooseCity();
}
//上传logo
 $('#logoImg').on('click',function(){
				  $('#uploadLogoImage').click();
 })
 //上传icon
 $('#iconImg').on('click',function(){
				  $('#uploadIconImage').click();
 })