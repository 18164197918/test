var recharge_vm=new Vue({
	data: function(){
			return{
				available_balance:null, //账户余额
                cid:null,				//(tb_company.id  企业id   必填)   
				type:100,				//（交易类型100：充值，200：提现）  
				platform:null,			//（充值平台1：微信，2：支付宝）
				pay_amount:null,		//（充值金额）
				params:null,
			}
		},
		methods:{
			validate:function(){//验证
				 var that=this;
				 $("#rechargeForm").validate({
   					onfocusout:function(element){$(element).valid();},
					focusCleanup:true,
					onkeyup: false, 
				 	rules: {
				 		otherMoney: {
				 			isFloatNum: true,
				 		},
				 	},
				 	messages: {
				 		otherMoney: {
				 			isFloatNum: "请输入正确的金额数",
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
			},
			//获取用户信息
			getUserInfo: function(){
				if(getUserCookie()){
					this.uid=getUserCookie().uid ;
					this.cid=getUserCookie().cid ;
				}
				if(!this.cid){
					console.log('没有获取cid!');
				}
				if(!this.uid){
					console.log('没有获取uid!');
				}
			},
			//验证
	
			//充值
			recharge:function(){
				var _this=this;
			 	var vld = $("#rechargeForm").validate(); //进行表单验证
			   	var h = vld.form();
				
				//获取充值金额
				if($('#otherMoney').val() &&  $('.otherR .active').val()){
					this.pay_amount=$('#otherMoney').val();
				}else{
					this.pay_amount=$('.pay_amount .RechOn').text();
				}
				if(this.pay_amount){
					if(this.pay_amount<0.01){
						$.CwsPopup.Alert("提示","充值金额不得少于0.01元！");
						return;
					}
				}else{
					$.CwsPopup.Alert("提示","请选择充值金额！");
					return;
				}
//				setCookie('pay_amount',this.pay_amount);
				//获取充值平台
				this.platform=$('.platform .RechOn').attr('data');
						//充值
						var params={
							uid:this.uid,                //用户ID
							cid:this.cid,     			//(tb_company.id  企业id   必填)   
							type:this.type,			    //（交易类型100：充值，200：提现）  
							pay_type:this.platform,		//（充值平台10：微信，20：支付宝）
							pay_amount:this.pay_amount,	//（充值金额）
						}
					if(h){
						$.ajax({
							url:api.payApi()+"userTxn.do?payMoney",
							data:params,
							async:false,
							type:"post",
							dataType:'json',
							success:function(res){
									console.log(res);
									if(res.success && res.data){
										//跳转到微信支付页面
										if(_this.platform==10){
											var url='user/trade/odersuc.html?amount='+res.data.amount+'&user_id='+res.data.user_id+'&urlSign='+res.data.urlSign+'&oid='+res.data.oid+'&body=2&payType='+_this.platform;
//									   		console.log(url);
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
										}else if(_this.platform==20){
											var mOrpc=null;
											var isMobile=judgmentBrowser(); 
											if(isMobile){
												mOrpc='mobile';
											}else{
												mOrpc='pc';
											}
											_this.params={
										    	out_trade_no:res.data.oid,	//（订单号，必填），
										    	total_fee:_this.pay_amount,	//（金额，必填），
										    	body:2,						//（商品描述，选填），
										    	user_id:res.data.user_id,	//（tb_user.id，必填）
										    	urlSign:res.data.urlSign,	//支付宝签证
										    	mOrpc:mOrpc,            	 //手机还是支付宝
										    }
										   		_this.getAlipay();
										}
								
									}
							},
							error:function(err){
								console.log(err);
							}
						});	
					}	
						
			},
			//跳转到支付宝
		    getAlipay:function (){
	 			var _this=this;
	            $.ajax({
						url:api.payApi()+"/alipay.do?aliToPay",
						data:_this.params,
						async:false,
						type:"post",
						dataType:'json',
						success:function(res){
							if(res.success){
								$("#alipay").html("");
								$("#alipay").append(res.data);
							}
						},
						error:function(err){
							console.log(err);
						}
				});	
			},
			//获取个人余额
	        getPersonInfo:function(){
	        	var _this=this;
	        	var params={
	        		uid:this.uid,
	        		cid:this.cid
	        	}
	        	api.personInfoGet(params).then(function(res){
	        		if(res.success && res.data){
	        			_this.available_balance=Number(res.data.available_balance).toFixed(2);
	        		}
	        	}).catch(function(err){
	        		console.log(err);
	        	})
	        },
		},
		mounted: function(){
				this.validate();
			    this.getUserInfo();
			    this.getPersonInfo();
			    $(".x-tips").fadeOut();
	    		callBackLoadIframe();//重置iframe高度
	    		 
//	    		if(getCookie('pay_amount')){  //显示默认充值金额
//	    			$('#otherMoney').val(getCookie('pay_amount'));
//	    			$('#otherMoney').addClass("active");
//	    			$('.pay_amount li').removeClass("RechOn");
//	    		}
	    }
}).$mount("#recharge");


function recharge(e){
	e.stopPropagation();
	e.preventDefault();
	recharge_vm.recharge();
}
/*其他金额的非法验证*/
//var iput_val="";
//$("#otherMoney").on('blur',function(event){
// var ev=event|| window.event;
// var x = ev.which || ev.keyCode;  
//	var otherM_val = $("#otherMoney").val();
//	console.log(otherM_val);
//	var isNum=/^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/ig;
//	   setTimeout(function(){
//	  		if(!isNum.test(otherM_val)){
//	  			console.log("输入非数字");
//	  			$("#otherMoney").val(null);
//	  			$.CwsPopup.Alert("提示","请输入正确金额");
//	  		}else{
//	  			
//	  		}
//	  	}, 400);
//	
//});
