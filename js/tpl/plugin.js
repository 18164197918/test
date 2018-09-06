var plg_vm ='';
$("#plugin").load(fontBaseUrl+'tpl/plugin.tpl', function(){
	plg_vm =new Vue({
		data:function(){
			return {
				cid:"",         //根据域名添加留言 游客也可以添加
				msgTitle:"",	//留言标题    
				msgContent:"",	//留言内容    
				msgContact:"",	//联系人   
				msgPhone:"",	//联系方式
			    srv_QQList:"",      //客服QQ数组 
			    srv_phone:"",       //客服电话  
				srv_phoneList:"",   //客服电话数组
				srv_qrCode:"",  //微信二维码
				color:"",       //插件颜色 
			}
		},
		methods:{
			validate:function(){//验证
				 var that=this;
				 $("#messageForm").validate({
					 onfocusout:function(element){
	   						$(element).valid();
					},
					focusCleanup:true,
					onkeyup: false, 
				 	rules: {
				 		msgContent:{
				 			required: true,
				 		},	
				 		msgPhone: {
				 			required: true,
							tel:true,
				 		},
				 	},
				 	messages: {
				 		msgContent:{
				 			required: "反馈内容不能为空！",
				 		},	
				 		msgPhone: {
				 			required: "请填写联系电话！",
							tel:"请填写正确的电话号码！",
				 		},
				 	},
				    invalidHandler: function(form, validator){
				    	return false;
				    },
				    errorPlacement: function(label, element){
				    	$(label).addClass("alert-danger");
				    	$(label).css("margin-top","0px");
				    	$(element).parent().next(".err-msg").append(label);
				    }
				  
				 });
			},
			
			//获取客服的相关信息
			//获取用户以前填写的客服插件数据
      			getOS: function() {
            	var _this = this;
            	//加载栏目
		    	//百捷平台不用传递cid字段
            	api.getOS({ /*cid: this.cid,*/ flag: 200 }).then(function(res) {
		                if (res.success && res.data) {
		                	//客户选择不加载客服插件
		                	if(res.data.srv_style==0){
		                		$('#plugin').hide();
		                	//用户选择样式一
		                	}else{
  									//悬浮位置
 									//右部居中
				                    if(res.data.srv_position==1){
				                    		$('#plugin').addClass('susp-right').removeClass('susp-left');
									//左部居中	
				                    }else if(res.data.srv_position==0){
				                		    $('#plugin').removeClass('susp-right').addClass('susp-left');
				                    }
									
				                    //回填QQ
				                    _this.srv_QQList=res.data.srv_QQ.split(',');   
				                    //回填客服电话
				                    _this.srv_phone=res.data.srv_phone;
				                    _this.srv_phoneList=res.data.srv_phone.split(',');
				                    
				                    //回填二维码图片
				                    _this.srv_qrCode=res.data.srv_qrCode;
				                    //获取颜色
						            if (res.data.srv_colour== 1) { //红色 'red'
						                _this.color = '#499ee1';
						            } else if (res.data.srv_colour== 2) { //蓝色'blue'
						                _this.color = 'red';
						            } else if (res.data.srv_colour== 0){  //默认的颜色 '#499ee1'
						                _this.color = 'yellow';
						            }
//									$('.susp-1-list').mouseover(function(){
//										$(this).css('background',_this.color);
//									})
//									$('.susp-1-list').mouseout(function(){
//										$(this).css('background',"#fff");
//									})
		                	}
							//用户选择样式2
//		                	}else if(res.data.srv_style==2){
		                		
//		                	}
		                	
		                   
		                }
	            }).catch(function(err) {
	                //alert('你尚未填写客服插件，若有需要请完成填写');
	                console.log(err);
	            })
       		 },
			//留言
			subtMesg: function(event){
				var el=$(event);
				var _this = this;
				var vld = $("#messageForm").validate(); //进行表单验证
				var h = vld.form();
				if(h){
					api.addMesgeFromFont({
						cid:this.cid,//根据域名添加留言 游客也可以添加
						title: _this.msgTitle,
						content: _this.msgContent,
						contact: _this.msgContact,
						phone: _this.msgPhone
					}).then(function(res){
						if(res.success){
							$.CwsPopup.Alert("提示","已提交,等待审核！");
							setTimeout(function(){
								$.CwsPopup.OperateCwsPopup('hide');//关闭提示框
								_this.msgTitle = "";
								_this.msgContent = "";
								_this.msgContact = "";
								_this.msgPhone = "";
								el.parent().fadeOut();
								$('.susp-mask').fadeOut();
							},2000)
						}else{
							$.CwsPopup.Alert("提示","提交失败！");
							setTimeout(function(){
								$.CwsPopup.OperateCwsPopup('hide');//关闭提示框
								_this.msgTitle = "";
								_this.msgContent = "";
								_this.msgContact = "";
								_this.msgPhone = "";
								el.parent().fadeOut();
								$('.susp-mask').fadeOut();
							},3000)
						}
					}).catch(function(err){
						console.log(err);
					})
				}
			},
			//获取cid
	 	 	getCid: function(){//通过local
				var cid =  '';
				if(getUserCookie()){
					cid=getUserCookie().cid;
				}
				if(cid){
				this.cid = cid;
				}else{
					console.log("Error:当前用户没有cid!");
				}
			},

		},
		mounted:function(){
			this.validate();
			this.getCid();
			this.getOS();
			
			
		}
	}).$mount('#plugin');
	
});
	//提交留言
$(document).on('click','#subtMes',function(){
		plg_vm.subtMesg(this);
});
