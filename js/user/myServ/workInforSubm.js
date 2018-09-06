new Vue({
	 	data:function(){
	 		return {
	 			params: {
	 				cid: '',  //必填
 					uid:'',		//必填   提交人
	 				pid:'',   //回复填写（添加为空）
	 				title:'',  //选填 
	 				vtext:'',//必填 工单内容
	 				contact:'',//必填 联系人
	 				phone:'',//必填 手机号
	 				email:'',//必填 邮箱
	 				img:''//必填 可多张图片，
	 			},
	 	
	 			pics:[]
	 		}
	 	},
	 	methods:{
			validate:function(){
				 $("#commentForm").validate({
   					onfocusout:function(element){$(element).valid();},
					onkeyup: false, 
					focusCleanup:true,
				 	rules: {
				 		title: {//工单主题
				 			maxlength:76
				 		},
				 		vtext:{//问题描述
				 			required:true,
				 			maxlength:225
				 		},
				 		contact: {//联系人
				 			required: true
				 		},
				 		phone:{//手机号
				 			required:true,
				 			tel:true,
				 		},
				 		email:{//邮箱
				 			required:true,
				 			email:true,
				 		}
				 	},
				 	messages: {
				 		title: {//工单主题
				 			maxlength:"字数上限76个字"
				 		},
				 		vtext:{
				 			required:"请填写问题描述",
				 			maxlength:"字数上限225个字"
				 		},
				 		contact: {
				 			required: "请填写联系人"
				 		},
				 		phone:{
				 			required:"请填写手机号",
				 			tel:"请填写正确的手机号"
				 		},
				 		email:{
				 			required:"请填写邮箱",
				 			email:"请填写正确的邮箱地址"
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
			subtOder:function(flag){//提交工单
				var _this = this;
				_this.pics=[];
				if(flag==1 || flag == '1'){
					_this.params.pid= '';
					for(var i=0; i<$(".maimglst").length; i++){
						if($("img[name='resImg_"+i+"']").attr('src') !=undefined &&  $("img[name='resImg_"+i+"']").attr('src') !='undefined' ){
							_this.pics.push($("img[name='resImg_"+i+"']").attr('src'));
						}
					}
				     _this.params.img = (_this.pics.length>0) ? _this.pics.join(",") : "";
				    var vld = $("#commentForm").validate();
					var h = vld.form();
				    if(_this.params.img && h){
				    	api.AddWorkOrder(_this.params).then(function(res){//添加工单
							  if(res.success){
							  	 window.location.href = fontBaseUrl + "user/myServ/workInfo.html";
							  }
						}).catch(function(err){
							console.log(err);
						});

				    }else if(!_this.params.img){
				    	$.CwsPopup.Alert("提示","请上传附件图片!");
				    }
				}
			}
	 	},
	 	mounted:function(){
	 		setIframeUrl(fontBaseUrl+'user/myServ/workInforSubm.html');
	 		this.validate();	
	 		if(getUserCookie()){
	 			this.params.cid = getUserCookie().cid || '';
	 			this.params.uid = getUserCookie().uid || '';
	 		}
 		    $(".x-tips").fadeOut();
	 		callBackLoadIframe();
	 	}
	 }).$mount("#worInforSub");

$('.btn-add-box').on('click','.small_img',function(event){
	var img = $(this).parent('.Imgcontainer').find('img');
	if(img.attr('src') != ''){
		 img.attr('src','');
	}
});