new Vue({
	data: function(){
			return{
				id:null,            //广告的ID 
				cid:null           ,//公司ID
				title:null         ,//广告名称
				img:null           ,//广告图片
				res_url:null       ,//广告链接
				begin_time:null    ,//广告投放时间
				end_time:null      ,//广告结束时间 
				img_size:null      ,//图片尺寸
				srv_position:null  ,//广告位置
				status:null        ,//状态 
				img_width:null,//图片的宽
				img_height:null,//图片的高
			}
		},
		methods:{
			//正则验证
			validate:function(){
				 $("#addAdvForm").validate({
   					onfocusout:function(element){$(element).valid();},
					onkeyup: false, 
					focusCleanup:true,
				 	rules: {
				 		advName:{
				 			required:true
				 		},
				 		advUrl: {
				 			linkurl:true,
				 			required: true
				 		},
				 		img_width:{
				 			addNum: true,
				 			required:true
				 		},
				 		img_height:{
				 			addNum:true,
				 			required:true
				 		},
				 		
				 	},
				 	messages: {
				 		advName:{
				 			required:"广告名字不能为空"
				 		},
				 		advUrl: {
				 			linkurl: "请输入正确的网址",
				 			required: "请填写广告链接"
				 		},
				 		img_width:{
				 			addNum: "图片宽度为正整数",
				 			required:"请填写广告图片的宽度"
				 		},
				 		img_height:{
				 			addNum:"图片高度为正整数",
				 			required:"请填写广告图片的高度"
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

			},
			
			//获取填写的广告数据
			getAdvData: function(){
				var _this=this;
				var params={
					id:this.id,
				}
				  api.getPlugInfo(params).then(function(res){
				  	if(res && res.data){
					_this.title=res.data.title         ;//广告名称
//					_this.img=res.data.img           ;//广告图片
					_this.res_url=res.data.res_url       ;//广告链接
					_this.img_size=res.data.img_size      ;//图片尺寸
					_this.srv_position=res.data.srv_position  ;//广告位置
					_this.status=res.data.status        ;//状态 
					_this.img_width=res.data.img_width     ;//图片的宽
					_this.img_height=res.data.img_height    ;//图片的高
					$('img[name=rImg]').attr('src',res.data.img);
					$('img[name=rImg]').attr("onerror","imgerror(this)");
					var begin_time=_this.getTime(new Date(res.data.begin_time));
					var end_time=_this.getTime(new Date(res.data.end_time));
					$('#d4311').val(begin_time);
				  	$('#d4312').val(end_time);
				  	var img_size=res.data.img_size.split(',');
				  	_this.img_width=img_size[0];
				  	_this.img_height=img_size[1];
				  	$('.adfd').val(res.data.srv_position);
				  	if(res.data.status==0){
				  		$('input[name=pst-cho]')[1].checked=true;
				  	}else if(res.data.status==1){
				  		$('input[name=pst-cho]')[0].checked=true;
				  	}
				  	}
				  }).catch(function(err){
				  	console.log(err);
				  })
				
			},
			//转换时间戳
             getTime: function(now){
             	  var   year=now.getFullYear();     
	              var   month=now.getMonth()+1;     
	              var   date=now.getDate();     
	              var   hour=now.getHours();     
	              var   minute=now.getMinutes();     
	              var   second=now.getSeconds();     
	              return   year+"-"+month+"-"+date+"   "+hour+":"+minute+":"+second; 
             },
			//保存广告插件
			saveAdv: function(){
				if($('img[name=rImg]').attr('src')){
					
				}else{
					$.CwsPopup.Alert("提示","请上传广告图片");
				}
				var params={
					id:this.id,
					cid:this.cid,
					title:this.title,
					img:$('img[name=rImg]').attr('src'),
					res_url:this.res_url,
					begin_time:$('#d4311').val(),
					end_time:$('#d4312').val(),
					img_size:this.img_width+','+this.img_height,
					srv_position:$('.adfd').val(),
					status:$('input[name=pst-cho]:checked').val(),
					flag:-100
				}
				var vld = $("#addAdvForm").validate();
				var h = vld.form();
				//验证通过才可以下一步 跳转并把合法数据传递
				if(h){
					api.saveOrUpdate(params).then(function(res){
						if(res.success){
							//保存成功
							setIframeUrl('user/plugMge/mgeAdv.html');
				 		//	window.location.href=  fontBaseUrl+'user/plugMge/mgeAdv.html';
				 			 windowOpenPage(fontBaseUrl + 'user/plugMge/mgeAdv.html');
						}
					}).catch(function(err){
						console.log(err);
					})
				}
				
			},
		    //截取url的参数值
			GetQueryString:function (name){
			     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
			     var r = window.location.search.substr(1).match(reg);
			     if(r!=null)return  unescape(r[2]); return null;
			},
			//获取用户信息
			getUserInfo: function(){
				if(getUserCookie()){
					this.cid=getUserCookie().cid ;
				}
				if(!this.cid){
					console.log('没有获取cid!');
				}
				this.id=this.GetQueryString('id');
				var url=window.location.href;
			},
		},
		mounted: function(){
			this.validate();
			//获取用户信息
			this.getUserInfo();
			//获取已有广告信息
			this.getAdvData();
			  $(".x-tips").fadeOut();
			callBackLoadIframe();
		}
	
}).$mount("#addadv");



$('#datetimepicker2').datetimepicker({
                    locale: 'ru',
                    language: 'zh-CN',
                    format : 'yyyy-mm-dd hh:ii:ss',
                    yearStart:2017,
                    autoclose : true  
                });
$('#datetimepicker3').datetimepicker({
    locale: 'ru',
    language: 'zh-CN',
    format : 'yyyy-mm-dd hh:ii:ss', 
    yearStart:2017,
    autoclose : true  
});
