var fgtpw_vm=new Vue({
    	el:'#fgtpw',
		data:function(){
			return{
				username:'',
				password:'',
				password2:'',
				imgCode:'',
				identifyingCode:'',
				allTimer:'',
				check_user:  api.baseUrl()+'/ur2.do?chkName',//用户是否存在
				imgUrl: api.baseUrl()+'/randcode',      //获取图片
			 	check_code:  api.baseUrl()+'/ur2.do?chkCode', //验证图形验证码或验证码
			}
		},
		methods:{	
			   //表单验证
			    validate: function(){
				 var that=this;
				 $("#forgetPWForm1").validate({
   					onfocusout:function(element){$(element).valid();},
					onkeyup: false, 
					focusCleanup:true,
				 	rules: {
				 		//验证用户名
				 		username:{
				 			required: true,
							emailAndTel:true,
				 			remote:{
				 				url: that.check_user,
				 				async:false,
							    type: "post",               //数据发送方式
							    dataType: "text",           //接受数据格式   
							    data: {                     //要传递的数据
							        name:function () {
                                       return  that.username;
                                    }
							    },
							    dataFilter: function (data,type) {
									if(JSON.parse(data).success){
											return false;
									}else{
										return true;
									}
		                        }
				 			}
				 		},
				 		//验证图片验证码
				 		imgCode: {
				 			required: true,
				 			remote:{
				 				url: that.check_code,
				 				async:false,
							    type: "post",                     //数据发送方式
							    xhrFields:{withCredentials:true}, //解决跨域
							    dataType: "text",                 //接受数据格式   
							    data: {                           //要传递的数据
							        randCode:function () {
                                       return  that.imgCode;
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
				 		//验证邮箱或手机验证 码
				 		identifyingCode:{
				 			required: true,
				 			remote:{
				 				url: that.check_code,
							    type: "post",                    //数据发送方式
							    async:false,                     //同步
							    xhrFields:{withCredentials:true},//解决跨域
							    dataType: "text",                //接受数据格式   
							    data: {                          //要传递的数据
//							        mCode:function () {
//                                     return  that.identifyingCode;
//                                 },
//                                 eCode:function(){
//                                 	   return  that.identifyingCode;
//                                 }
									mCode:function () {
							        	 var isPhone = /^1(3|4|5|7|8)\d{9}$/ig;
							        	if(isPhone.test(that.username)){
                                   			return  that.identifyingCode;
							        	}else{
							        		return null;
							        	}
                                   },
                                   eCode:function(){
                                   	  var isEmail = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/ig;
                                   	  if(isEmail.test(that.username)){
                                   			return  that.identifyingCode;
							        	}else{
							        		return null;
							        	}
                                   },
                                   loginName:function(){
                                   	   return   that.username;
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
				 		username: {
				 			required: "手机/邮箱不能为空！",
				 			emailAndTel: "请输入正确的手机号码或者邮箱！",
				 			remote: "该用户不存在！"//请求验证
				 		}, 
				 		imgCode: {
				 			required: "图形验证码不能为空！",
				 			remote: "图形验证码错误"//请求验证
				 		},
				 		identifyingCode:{
				 			required: "验证码不能为空！",
				 			remote: "验证码错误"//请求验证
				 		}
				 	},
				    invalidHandler: function(form, validator){
				    	return false;
				    },
				    errorPlacement: function(label, element){
				    	$(label).addClass("alert-danger");
				    	$(element).parent().siblings(".err-msg").append(label);
				    }
				  
				 });
				 
				 
				$("#forgetPWForm2").validate({
 					onfocusout:function(element){$(element).valid();},
 					onkeyup: false, 
					focusCleanup:true,
				 	rules: {
				 		password:{
				 			required: true,
							password:true
				 		},
				 		password2:{
				 			required: true,
							password:true,
							equalTo:"#password"
				 		}
				 	},
				 	messages: {
				 		password:{
				 			required: "密码不能为空！",
				 			password: "请输入6-16位 字符！"
				 			
				 		}, 
				 		password2: {
				 			required: "密码不能为空！",
				 			password: "请输入6-16位 字符！",
				 			equalTo:"两次密码不一致"
				 		}
				 	},
				    invalidHandler: function(form, validator){
				    	return false;
				    },
				    errorPlacement: function(label, element){
				    	
				    	$(element).parent().siblings(".err-msg").append(label);
				    }
				  
				 }); 
				 
				 
			},
			//清掉表单的定时器 
			clearInterval:function(){
				  window.clearInterval(this.allTimer);
			},
			//获取验证码
			getCode:function(){
				      var validator = $( "#forgetPWForm1" ).validate();
			       	  $("#imgCode").removeData("previousValue").valid();
				      var   un=validator.element( "#username" );
				      var   ic=validator.element( "#imgCode" );
				     if( un && ic){
				     	    //设置定时器
		                          var time=120;
		                          var that=this;
		                          var isPhone=/^1(3|4|5|7|8)\d{9}$/ig;
				 				  var isEmail=/^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/ig;
				 				  var data2={
								   	   'mobile':this.username,
								   	   'flag':3
								   };
								   var data3={
								   	   'email':this.username
								   };
		                          window.clearInterval(that.allTimer);
		                          that.allTimer=setInterval(function(){
		                          	$('.item_code')[0].innerHTML="再次发送("+time+")S";
		                          	$(".item_code").attr("disabled", true); 
		                          	time--;
		                          	if(time<=0){
		                          		window.clearInterval(that.allTimer);
		                          		$('.item_code')[0].innerHTML="获取验证码";
		                          		$(".item_code").attr("disabled", false);
		                          	}
		                          },1000)
		                          //向该用户发送短信验证码
		                          if(isPhone.test(that.username)){
                                    $.ajax({
                                     	 url:api.baseUrl()+"/sendMsg.do?send",
                                     	 type:'post',
                                     	 data:data2,
                                     	 dataType:'json',
                                     	 xhrFields:{withCredentials:true},//解决跨域
                                     	 success:function(res){
                                     	 	console.log(res);
                                     	 },
                                     	 error:function(err){
                                     	 	console.log(err);
                                     	 }
                                     })


			                       //向该用户发送邮箱验证码
		                          }else if(isEmail.test(that.username)){
                                    $.ajax({
                                     	 url:api.baseUrl()+"/ur2.do?eSend",
                                     	 type:'post',
                                     	 data:data3,
                                     	 dataType:'json',
                                     	 xhrFields:{withCredentials:true},//解决跨域
                                     	 success:function(res){
                                     	 	console.log(res);
                                     	 },
                                     	 error:function(err){
                                     	 	console.log(err);
                                     	 }
                                     })
		                          
				                    }
		                }          
			},
			//点击刷新图片
//			changeCode:function(){
//			   var url1=this.imgUrl;//图片地址
//			   $("#codeImg").attr('src',url1);
//			},
			//第一个的下一步重置密码
			nextStep1:function(){
				$("#identifyingCode").blur();
				var vld = $("#forgetPWForm1").validate();
					h = vld.form();
					if(h){
					   $('#forgetPWForm1').css('display','none');
					   $('#forgetPWForm2').css('display','block');
					   $('#forgetPWForm3').css('display','none');
					   $('.step1 li:eq(0)').css('background',"#c5dcff");
					   $('.step1 li span:eq(0)').css('background',"#c5dcff");
					   $('.step2 li:eq(0)').css('color',"#c5dcff");
					   $('.step1 li:eq(1)').css('background',"#2f82ff");
					   $('.step1 li span:eq(1)').css('background',"#2f82ff");
					   $('.step2 li:eq(1)').css('color',"#2f82ff");
					}
			},
			//第二个的下一步登录
			nextStep2:function(){
				var that=this;
				var vld = $("#forgetPWForm1").validate();
				var h = vld.form();
				var fp = $("#forgetPWForm2").validate();
				var f= fp.form();
				var data={
					name:that.username,
					pwd:that.password
				}
				if(h && f){
				                 //修改密码
								   api.ChangePassword(data)
                                   .then(function(data){
									  	   if(data.success){
								  		   $('#forgetPWForm1').css('display','none');
										   $('#forgetPWForm2').css('display','none');
										   $('#forgetPWForm3').css('display','block');
										   $('.step1 li:eq(0)').css('background',"#c5dcff");
										   $('.step1 li span:eq(0)').css('background',"#c5dcff");
										   $('.step2 li:eq(0)').css('color',"#c5dcff");
										   $('.step1 li:eq(1)').css('background',"#c5dcff");
										   $('.step1 li span:eq(1)').css('background',"#c5dcff");
										   $('.step2 li:eq(1)').css('color',"#c5dcff");
										   $('.step1 li:eq(2)').css('background',"#2f82ff");
										   $('.step1 li span:eq(2)').css('background',"#2f82ff");
										   $('.step2 li:eq(2)').css('color',"#2f82ff");
								  	       }
									}).catch(function(err){
										console.log(err)
									})
				}
				
			},
			//验证 密码等级
			checkPWleave:function(){
				          var lv = 0;
						  if(this.password.match(/[a-z]/g)){lv++;}
						  if(this.password.match(/[0-9]/g)){lv++;}
						  if(this.password.match(/(.[^a-z0-9])/g)){lv++;}
						  if(this.password.length < 3){lv=0;}
						  if(lv > 3){lv=3;}
					   if(lv==1){
							$('.leavePiece li:eq(0)').css("background","red");
							$('.leavePiece li:eq(1)').css("background","white");
							$('.leavePiece li:eq(2)').css("background","white");
						}else if(lv==2){
							$('.leavePiece li:eq(0)').css("background","yellow");
							$('.leavePiece li:eq(1)').css("background","yellow");
							$('.leavePiece li:eq(2)').css("background","white");
						}else if(lv==3){
							$('.leavePiece li').css("background","green")
						}
			},
			init:function(){
				//初始化图片    
				var url=this.imgUrl;
			     $("#codeImg").attr('src',url);
			},
			//切换到登录
//			signin:function(){
//				window.location.href='user/sign.html';
//				window.localStorage.setItem('isEntry',true);
//				$('#signin').css('display','block');
//			 	$('#signup').css('display','none');
//			},
		},
		mounted:function(){
			this.validate();
			this.init();
			
			setTimeout(function(){
                $('#password').attr('type',"password");
                $('#password2').attr('type',"password");
                },100)                              
			
			
		}
	})
//刷新图片
function changeCode(){
	var num=Math.random()*100;
	var imgUrl= api.baseUrl()+'randcode?'+num;      //获取图片
    $("#codeImg").attr('src',imgUrl);
}
//获取验证码
function getCode(){
	fgtpw_vm.getCode();
}
//第一个下一步
function nextStep1(){
	fgtpw_vm.nextStep1();
}
//第二个下一步
function nextStep2(){
	fgtpw_vm.nextStep2();
}
//切换到登录
function signin(){
	window.localStorage.setItem('isEntry',true);
	window.location.href=fontBaseUrl+'user/sign.html';
}

function checkPWleave(){
	fgtpw_vm.checkPWleave();
}
