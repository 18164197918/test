$("#signbox").load(fontBaseUrl+'tpl/sign.tpl', function(){
    var login_vm=new Vue ({
	el:"#signin",
	data:function(){
		return{
			uuid:null,
			username:'',     //短信验证时用户名
			identifyingCode:'',//短信验证码
			username2:'',     //用户名
			identifyingCode3:'',//短信登录验证码
			username3:'',     //短息登录用户名
			password2:'',     //用户密码    
			item_code:'',     //获取验证码按钮
			tk:'',            //tokenId
			isCheck:false,    //是否记住密码
			isEntry:false,    //是否登录
			loginButtonStyle:{//按钮样式控制
				entry_btn:true,
				btn_disabled:false,
				btn_text:'登录',
				clickDis:true
			},
			check_user: api.baseUrl()+'/ur2.do?chkName',//用户是否存在
			check_code: api.baseUrl()+'/ur2.do?chkCode', //验证码
		}
	},
	methods:{
		disableLoginBtn:function(){              //按钮失效
			this.loginButtonStyle.entry_btn=false;
			this.loginButtonStyle.btn_disabled=true;
			this.loginButtonStyle.btn_text='登录中...';
			this.loginButtonStyle.clickDis=false;
		},
		returnNormalLoginBtn:function(){        //按钮有效
			this.loginButtonStyle.entry_btn=true;
			this.loginButtonStyle.btn_disabled=false;
			this.loginButtonStyle.btn_text='登录';
			this.loginButtonStyle.clickDis=true;
		},
		validate:function(){//验证
				 var that=this;
				 $("#entryBoxForm").validate({
// 					onfocusout:function(element){$(element).valid();},
					focusCleanup:true,
					onkeyup: false, 
				 	rules: {
				 		username2: {
				 			required: true,
//							emailAndTel:true
				 		},
				 		password2: {
				 			required: true,
				 			password:true
				 		}
				 	},
				 	messages: {
				 		username2: {
				 			required: "用户名/账号不能为空！",
//				 			emailAndTel: "请输入正确的手机号码或者邮箱！"
				 		}, 
				 		password2: {
				 			required: "密码不能为空！",
				 			password: "请输入正确的密码！"
				 		}
				 	},
				    invalidHandler: function(form, validator){
						login_vm.returnNormalLoginBtn();//验证失败  按钮恢复默认样式  恢复点击事件
				    	return false;
				    },
				    errorPlacement: function(label, element){
				    	$(label).addClass("alert-danger");
				    	$(element).parent().siblings(".err-msg").append(label);
				    }
				  
				 });
			},
		//正则验证
			validate2:function(){
				 var that=this;
				 $("#codeLoginForm").validate({
   					onfocusout:function(element){
   						$(element).valid();
					},
					onkeyup: false, 
					focusCleanup:true,
				 	rules: {
				 		//验证用户名
				 		username3: {
				 			required: true,
							tel:true,
							remote:{
				 				url: that.check_user,
				 				async:false,
							    type: "post",               //数据发送方式
							    dataType: "text",           //接受数据格式   
							    data: {                     //要传递的数据
							        name:function () {
                                       return  that.username3;
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
				 		//验证邮箱或手机验证 码
				 		identifyingCode:{
				 			required: true,
				 		},
				 	},
				 	messages: {
				 		username3: {
				 			required: "手机号不能为空！",
				 			tel: "请输入正确的手机号码！",
				 			remote: "该用户未注册！"//请求验证
				 		},
				 		identifyingCode:{
				 			required: "验证码不能为空！",
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
			
			
			
			clearErr:function(){
				$(".regContent .err-msg")[1].innerHTML="";
			},
			//获取短信验证码
			getCode:function(){
		           var that=this;
				   var data2={
				   	   'mobile':this.username3,
				   	   'flag':2
				   };
				   var data3={
				   	   'email':this.username3
				   };
				if($('.item_code')[0].innerText=='获取验证码'){
					 var validator = $( "#registerBoxForm" ).validate();
				     var fh=false;
				    	 fh=$('#codeLoginForm').validate().element( $("#username3") );
				   //发送验证码
				   if(fh){
				   var isPhone = /^1(3|4|5|7|8)\d{9}$/ig;
	               var isEmail = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/ig;
		                          //设置定时器
		                          var time=120;
		                          window.clearInterval(that.allTimer);
		                          that.allTimer=setInterval(function(){
		                          	$('.item_code')[0].innerHTML="再次发送("+time+")S";
		                          	$(".item_code").eq(0).attr("disabled", true); 
		                          	time--;
		                          	if(time<=0){
		                          		window.clearInterval(that.allTimer);
			                          	$('.item_code')[0].innerHTML="获取验证码";
			                          	$(".item_code").eq(0).attr("disabled", false);
		                          	}
		                          },1000)
		                          //向该用户发送短信验证码
		                          if(isPhone.test(that.username3)){
                                     $.ajax({
                                     	 url: api.baseUrl()+"/sendMsg.do?send",
                                     	 type:'post',
                                     	 data:data2,
                                     	 dataType:'json',
                                     	 xhrFields:{withCredentials:true},//解决跨域
                                     	 success:function(res){
                                     	 },
                                     	 error:function(err){
                                     	 	console.log(err);
                                     	 }
                                     })
 

			                       //向该用户发送邮箱验证码
		                          }else if(isEmail.test(that.username3)){
                                    $.ajax({
                                     	 url: api.baseUrl()+"/ur2.do?eSend",
                                     	 type:'post',
                                     	 data:data3,
                                     	 dataType:'json',
                                     	 xhrFields:{withCredentials:true},//解决跨域
                                     	 success:function(res){
                                     	 },
                                     	 error:function(err){
                                     	 	console.log(err);
                                     	 }
                                     })
		                          }
							

				   }
				}
			},
			//登录
			entry:function(){              //登录
			    var that=this;
				this.disableLoginBtn();//处理登录时  按钮显示禁用状态 并禁用点击事件
		        //获取uuid
		        var str=window.location.href;
		        //if(str.indexOf('=')>-1){
				//	that.uuid=str.substring(str.indexOf('=')+1,str.length);
		       // }
		        that.uuid=this.GetQueryString('uuid');
			   var vld = $("#entryBoxForm").validate(); //进行表单验证
			   var h = vld.form();
			   if(h){ //验证通过登陆
	   			api.Entry({
	   				'name':that.username2,
				   	'pwd':that.password2,
				   	'tk':that.tk,
				   	'uuid':that.uuid
	   			}).then(function(res){
                      if(res.success){
							login_vm.returnNormalLoginBtn();//登录成功后  按钮恢复默认样式  恢复点击事件
                         	//console.log(res);//测试  可删
                         	 var dta = res.data || '';
			                 var str= dta && res.data.tk;
			                 var roleId = dta && dta.roleId || '';
			                 var rid = dta && dta.company && dta.company.modelId;//购买模板id
			                 //勾选记住密码
			   	    		if($('#rememberPW')[0].checked){
			   	    	     //保存用户名和tk(时间为1天)		
			   	    			  setUserCookie(dta.id ,that.username2, dta.cid, dta.company,roleId, rid, dta.tk);  
			   	    		}else{
			   	    		 	  setUserCookie(dta.id ,that.username2, dta.cid, dta.company,roleId, rid);  
			   	    		}
			   	    		window.localStorage.removeItem('sadfasdf');
		    		  	    window.localStorage.removeItem('asdasfda');
			   	    		setIframeUrl('user/myServ/servPersinfo.html');
		   	    			if(judgmentBrowser()){
			   	    			window.open(fontBaseUrl+'user/mleft.html?uuid='+that.uuid, '_self');
			   	    		}else{
			               		window.location.href= fontBaseUrl+'user/user.html?uuid='+that.uuid;  
			   	    		}
			               	//window.location.href= fontBaseUrl+'user/user.html?uuid='+that.uuid;  
                      }else{
                      	$(".regContent .err-msg")[1].innerHTML="<span  class='red'>密码错误，可以试试<a class='blue' href='user/fgtpw.html'>找回密码</a></span>";
                      }
				}).catch(function(err){
					login_vm.returnNormalLoginBtn();//登录成功后  按钮恢复默认样式  恢复点击事件
					var isPhone = /^1(3|4|5|7|8)\d{9}$/ig;
	                var isEmail = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/ig;
	                //短信找回
	                if(isPhone.test(that.username2)){
                  		$(".regContent .err-msg")[1].innerHTML="<span  class='red'>密码错误，可以试试<a class='blue codelogin'>短信登录<a><span  class='red'>或者</span><a class='blue' href='user/fgtpw.html'>找回密码</a></span>";
					}else {
						$(".regContent .err-msg")[1].innerHTML="<span  class='red'>密码错误，可以试试<a class='blue' href='user/fgtpw.html'>找回密码</a></span>";
					}
					console.log(err);
				})
			   }
			},
			//短信验证码登录
			codeEntry:function(){
				var that=this;
				var params={
					mobile:this.username3,       //（手机号    必填）
					mCode:this.identifyingCode3, //(手机验证码    必填)
					tk:this.tk,                  //（tokenId 选填）   
					uuid:this.uuid               //(只有邀请成为管理员才有,tb_user_company_ln.id     选填)
				}
				api.CodeEntry(params).then(function(res){
					if(res.success){
							login_vm.returnNormalLoginBtn();//登录成功后  按钮恢复默认样式  恢复点击事件
                         	//console.log(res);//测试  可删
                         	 var dta = res.data || '';
			                 var str= dta && res.data.tk;
			                 var roleId = dta && dta.roleId || '';
			                 var rid = dta && dta.company && dta.company.modelId;//购买模板id
			                 //勾选记住密码
			   	    		if($('#rememberPW')[0].checked){
			   	    	     //保存用户名和tk(时间为1天)		
			   	    			  setUserCookie(dta.id ,that.username3, dta.cid, dta.company,roleId, rid, dta.tk);  
			   	    		}else{
			   	    		 	  setUserCookie(dta.id ,that.username3, dta.cid, dta.company,roleId, rid);  
			   	    		}
			   	    		setIframeUrl('user/myServ/servPersinfo.html');
			   	    		if(judgmentBrowser()){
			   	    			window.open(fontBaseUrl+'user/mleft.html?uuid='+that.uuid, '_self');
			   	    		}else{
			               		window.location.href= fontBaseUrl+'user/user.html?uuid='+that.uuid;  
			   	    		}
//						 	window.location.href= fontBaseUrl+'user/user.html';  
					}
				}).catch(function(err){
					console.log(err);
				})
			},
            //直接Enter登录
            EnterSignin:function(){
            	var _this=this;
            	document.onkeydown=function(event){
				  var e = event || window.event || arguments.callee.caller.arguments[0];
				   if(e && e.keyCode==13){ // enter 键
				   	var str=window.localStorage.getItem('isEntryPage');
				   	 if(str=="true"){
				   	 	if ($('#searchText')[0] == document.activeElement) {
			    			window.open(fontBaseUrl+"goods/list.html?keywords="+$('#searchText').val(),'_blank');
						} else {
						    if($('#entryBoxForm').css('display')=='block'){
						         _this.entry();
						    }else if($('#codeLoginForm').css('display')=='block'){
						    	  _this.codeEntry();
						    }
						}
				   	 	
					      
				   	 }
				  }
				};
            },
			init:function(){//初始化 页面
					  //获取用户名和token
					var that=this;
                      var  userName='';
                      var tk= '';
                      if(getUserCookie()){
                      		userName = getUserCookie().uname || null;
                      		tk = getUserCookie().tk || null;
                      		if(userName){
                      			setIframeUrl('user/myServ/servPersinfo.html');
                      			if(judgmentBrowser()){
    			   	    			window.open(fontBaseUrl+'user/mleft.html?uuid='+that.uuid, '_self');
    			   	    		}else{
    			               		window.location.href= fontBaseUrl+'user/user.html?uuid='+that.uuid;  
    			   	    		}
                      		}
                      }
                 
				      if(!userName){
				      	    this.username2='';
				      }else{
					       this.username2=userName;
				      }
				      
				
				      if(!tk){
			      			 tk=null;
				      	     this.password2='';
				      	     $('#rememberPW')[0].checked=false;
				      }else{
			      	  		this.tk=tk; 
				      	    var rdm = Math.floor(Math.random()*1000000000);
					        this.password2=rdm.toString();
					        $('#rememberPW')[0].checked=true;
				      }

			},
			changeData:function(){//修改默认的用户名和密码
				  //如果存在token
				  var that=this;
				 	$('#password2').one('keydown',function(){
				 		if(that.password2!='' && that.password2!= undefined){
					 		that.password2="";
				    		delCookie('tk');
				 		}
				 	})
				 	$('#username2').one('keydown',function(){
						 if(this.username2!=''){	
					 		that.password2='';
					 		delCookie('tk');
						 }
				 	})
				 	$(document).one('keydown',function(){
				 		if(this.password2==''){	
					 		that.password2='';
				    		delCookie('tk');
						 }
				 	})
			},
			//检测当前的显示的是登录还是注册
			checkSign:function(){
				 var isEntryPage=window.localStorage.getItem('isEntryPage');//是否显示登录页面
				 if(! isEntryPage){
				 			window.localStorage.setItem('isEntryPage',true);
			 				$('#signin').css('display','block');
					 		$('#signup').css('display','none');
					 		
				 }else{
					 	if(isEntryPage=='true'){
					 		$('#signin').css('display','block');
					 		$('#signup').css('display','none');
					 	}else if(isEntryPage=='false'){
					 		$('#signin').css('display','none');
					 		$('#signup').css('display','block');
					 		
					 	}
				 }
			},
			//切换到登录
			signin:function(){
				window.localStorage.setItem('isEntryPage',true);
				$('#signin').css('display','block');
			 	$('#signup').css('display','none');
			 	$('#codelogin').css('display','none');
			 	$("#registerBoxForm")[0].reset();   //清空表单
			},
			//切换到注册
			signup:function(){
				window.localStorage.setItem('isEntryPage',false);
				$('#signin').css('display','none');
			 	$('#signup').css('display','block');
			 	$('#codelogin').css('display','none');
			 	$("#entryBoxForm")[0].reset();    //清空表单
		 		$("#codeLoginForm")[0].reset();   //清空表单
			},
		    //截取url的参数值
			GetQueryString:function (name){
			     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
			     var r = window.location.search.substr(1).match(reg);
			     if(r!=null)return  unescape(r[2]); return null;
			},
	},
	mounted:function(){
	          //正则验证
	          this.validate();
	          this.validate2();
	          this.init();//初始化回填用户信息(读取cookies)
		      this.changeData();//修改
	          this.EnterSignin();
	          this.checkSign();
	          //修改输入框类型，去掉谷歌浏览器保存密码
               window.setTimeout(function(){
               	$('#password2').attr('type','password');
               },100)
	}
})
   
function entry(){
	login_vm.entry();
}
$(document).on('click','.tablelogin1',function(){
	$('#entryBoxForm').css('display','none');
	$('#codeLoginForm').css('display','block');
})
$(document).on('click','.tablelogin2',function(){
	$('#entryBoxForm').css('display','block');
	$('#codeLoginForm').css('display','none');
})

$(document).on('click','.codelogin',function(){
	$('#entryBoxForm').css('display','none');
	$('#codeLoginForm').css('display','block');
})

var signup_vm=new Vue({
		el:'#signup',
	  	data:function(){
	  		return{
	  			uuid:null,
	  			codeNum:null,
	  			user:'',
	  			allTimer:null,
	  			autoTimer:null,
	  			username:'',
	  			password:'',
	  			identifyingCode:'',
	  			invitationCode:'',                           //邀请码
	  			imgCode:'',
	  			item_code:'',
	  			btn:false,
	  			check_user: api.baseUrl()+'/ur2.do?chkName',//用户是否存在
				imgUrl: api.baseUrl()+'/randcode',      //获取图片
			 	check_code: api.baseUrl()+'/ur2.do?chkCode', //图形验证码或验证码
	  		}
	  	},
		methods:{
			//正则验证
			validate:function(){
				 var that=this;
				 $("#registerBoxForm").validate({
   					onfocusout:function(element){$(element).valid();},
					onkeyup: false, 
					focusCleanup:true,
				 	rules: {
				 		//验证用户名
				 		username: {
				 			required: true,
							emailAndTel:true,
//							minlength:2,
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
				 				async:false,
							    type: "post",                    //数据发送方式
							    xhrFields:{withCredentials:true},//解决跨域
							    dataType: "text",                //接受数据格式   
							    data: {                          //要传递的数据
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
//                                 	  return  that.identifyingCode;
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
							    data:{                           //要传递的数据
							        randCode:function (){
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
				 		//验证密码
				 		password: {
				 			required: true,
				 			password:true
				 		},
				 		agreement: {
				 			required:true
				 		}
				 	},
				 	messages: {
				 		username: {
				 			required: "用户名/账号不能为空！",
//				 			minlength:'长度最少为2',
				 			emailAndTel: "请输入正确的手机号码或者邮箱！",
				 			remote: "该用户已注册！"//请求验证
				 		}, 
				 		password: {
				 			required: "密码不能为空！",
				 			password: "请输入正确的密码！"
				 		}, 
				 		imgCode: {
				 			required: "图形验证码不能为空！",
				 			remote: "图形验证码错误"//请求验证
				 		},
				 		identifyingCode:{
				 			required: "验证码不能为空！",
				 			remote: "验证码错误"//请求验证
				 		},
				 		agreement:{
				 			required:'请接受我们的协议'
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
			},
			closePopupVc:function(){
				//关闭图片验证码
				this.imgCode=null;
				$('.phonecode_box').css('display','none');
				$('.phonecode').css('display','none');
			},
			getCode:function(){
				if($('.item_code')[1].innerText=='获取验证码'){
					var validator = $( "#registerBoxForm" ).validate();
				     var fh=$('#registerBoxForm').validate().element( $("#username") );
				   //显示图形验证码
				   if(fh){
				   	  this.imgCode=null;
					  $("#validateCodeImg").attr('src',this.imgUrl);
	         		  $('.phonecode_box').css("display","block");
		   			  $('.phonecode').css('display','block');
				   }
				}
			},
			//提交图形验证码
			submintCode:function(){
					this.checkImgCode();	
			},
			//图形验证码长度为4或6可点确定
			len4:function(event){
						if(this.imgCode.length==4){
						$('.submitBtn_vc').css({'background': '#108cee','color':' #fff'});
						}
			},
			//图形验证码验证
			checkImgCode:function(){
				   //图形验证码 验证
		           var that=this;
				   var data2={
				   	   'mobile':this.username,
				   	   'flag':1,
				   };
				   var data3={
				   	   'email':this.username
				   };
				   var isPhone = /^1(3|4|5|7|8)\d{9}$/ig;
	               var isEmail = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/ig;
//	                             var validator = $( "#registerBoxForm" ).validate();
				   				 $("#imgCode").removeData("previousValue").valid();
//				   				 var ic=validator.element( "#imgCode");
				   				 var ic=$("#registerBoxForm").validate().element($("#imgCode"));
                                //发送图形验证码进行验证
 						        if(ic){
								//图形验证码通过后验证手机或邮箱验证
		          	            $('#identifyingCode').focus();
						        $('.phonecode_box').css('display','none');
		          	            $('.phonecode').css('display','none');
		                         that.imgCode='';
		                          //设置定时器
		                          var time=120;
		                          
		                          window.clearInterval(that.allTimer);
		                          that.allTimer=setInterval(function(){
		                          	$('.item_code')[1].innerHTML="再次发送("+time+")S";
		                          	$(".item_code").eq(1).attr("disabled", true); 
		                          	time--;
		                          	if(time<=0){
		                          		window.clearInterval(that.allTimer);
			                          	$('.item_code')[1].innerHTML="获取验证码";
			                          	$(".item_code").eq(1).attr("disabled", false);
		                          	}
		                          },1000)
		                          //向该用户发送短信验证码
		                          if(isPhone.test(that.username)){
                                     $.ajax({
                                     	 url: api.baseUrl()+"/sendMsg.do?send",
                                     	 type:'post',
                                     	 data:data2,
                                     	 dataType:'json',
                                     	 xhrFields:{withCredentials:true},//解决跨域
                                     	 success:function(res){
                                     	 },
                                     	 error:function(err){
                                     	 	console.log(err);
                                     	 }
                                     })
 

			                       //向该用户发送邮箱验证码
		                          }else if(isEmail.test(that.username)){
                                    $.ajax({
                                     	 url: api.baseUrl()+"/ur2.do?eSend",
                                     	 type:'post',
                                     	 data:data3,
                                     	 dataType:'json',
                                     	 xhrFields:{withCredentials:true},//解决跨域
                                     	 success:function(res){
                                     	 },
                                     	 error:function(err){
                                     	 	console.log(err);
                                     	 }
                                     })
		                          }
						}

			},
			//刷新图片
			changeCode:function(){
				var num=Math.random()*100;
				this.imgCode=null;
		  	 	var url1=this.imgUrl+"?"+num;//图片地址
			   	$("#validateCodeImg").attr('src',url1);
			   
			},
			//注册
			register:function(){
		        $("#username").removeData("previousValue").valid();
		        $("#identifyingCode").removeData("previousValue").valid();
				var vld = $("#registerBoxForm").validate();
				var h = vld.form();
				var that=this;
				//var str=window.location.href;
				//if(str.indexOf('=')>-1){
				//	that.uuid=str.substring(str.indexOf('=')+1,str.length);
					that.uuid=this.GetQueryString('uuid');
		        //}
			    var data1={
			   	  'name':this.username,
			   	  'pwd':this.password,
			   	  "code":this.identifyingCode,  //s手机或者邮箱验证码
			   	  'fm':this.invitationCode,      //推荐码
			   	  'uuid':this.uuid
			    }
				if(h){
	               	    //用户注册
						api.Register(data1).then(function(data){
						    if(data.success){
								success_register();
							}
						}).catch(function(err){
							console.log(err);
						})
				} 
				function success_register(){
	                that.user=that.username;
		 			$('.register_success').css('display','block');
		 			$('.regContent').css('display','none');
		 			var allTimer=5;
		 			 window.clearInterval(that.autoTimer);
		 			that.autoTimer=setInterval(function(){
		 				$('#auto_entry_time')[0].innerHTML=allTimer;
		 				allTimer--;
		 				if(allTimer<=0){
		 					window.clearInterval(that.autoTimer);
		 					window.clearInterval(that.allTimer);
                            window.localStorage.setItem('isEntryPage',true);
//							$('#signin').css('display','block');
//						 	$('#signup').css('display','none');
//						 	$('.register_success').css('display','none');
//		 					$('.regContent').css('display','block');
		 					window.location.reload();
//    						 window.location.href = fontBaseUrl+ "user/siteCreate.html";  //跳转至个人信息页
		 				}
		 			},1000)
		 			that.username='';
		 			that.identifyingCode='';
		 			that.password='';
		 			that.invitationCode='';
				}
			},
			//注册跳登录
			clearRegisterInterval:function(){
				window.clearInterval(this.autoTimer);
				window.clearInterval(this.allTimer);
                window.localStorage.setItem('isEntryPage',true);
                window.location.reload();
//				$('#signin').css('display','block');
//			 	$('#signup').css('display','none'); 
//			 	$('.register_success').css('display','none');
//		 	    $('.regContent').css('display','block');
			},
			//生成遮罩层
		    init:function(){
				var wWidth=document.documentElement.clientWidth||document.body.clientWidth; 
				var wHeight=document.documentElement.clientHeight||document.body.clientHeight; 
				$('.phonecode_box').css({width:wWidth,height:wHeight});
				window.onresize=function (){
					var wWidth=document.documentElement.clientWidth||document.body.clientWidth; 
				    var wHeight=document.documentElement.clientHeight||document.body.clientHeight; 
					$('.phonecode_box').css({width:wWidth,height:wHeight});
				}
		    },
		    //验证密码等级
		    checkPassword:function(){
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
		    //是否同意用户协议
		    isAgreement:function(){
							if($('#agreement')[0].checked){
								$('.pagree').hide();
							}else{
								$('.pagree').show();
							}
		    },
		    //截取url的参数值
			GetQueryString:function (name){
			     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
			     var r = window.location.search.substr(1).match(reg);
			     if(r!=null)return  unescape(r[2]); return null;
			},
			//直接Enter注册或提交图形验证码
            EnterSignup:function(){
            	var _this=this;
            	document.onkeyup=function(event){
				  var e = event || window.event || arguments.callee.caller.arguments[0];
				   if(e && e.keyCode==13){ // enter 键
				   	var str=window.localStorage.getItem('isEntryPage');
				   	 if(str=="false"){
				   	 	if ($('#searchText')[0] == document.activeElement) {
					    			window.open(fontBaseUrl+"goods/list.html?keywords="+$('#searchText').val(),'_blank');
						} else {
					   	 	if($('.phonecode').css('display')=='none'){
							     _this.register();
					   	 	}else if($('.phonecode').css('display')=='block'){
					   	 		_this.submintCode();
					   	 	}
					   	} 	
				   	 }
				  }
				};
            },
		
		},
		mounted:function(){
                this.init();
                this.validate();
                this.EnterSignup();
                setTimeout(function(){
                $('#password').attr('type',"password");
                },100)
               
		}
	})    
})
 