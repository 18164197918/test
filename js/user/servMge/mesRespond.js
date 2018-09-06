var  mesRespond_vm=new Vue({
	    el:'#replymessage',
	 	data: function(){
	 		return{
	 			id:null,
	 			title:null,
	 			content:null,
	 			contact:null,
	 			phone:null,
	 			reply:null,
	 			pageNum:1, //页码
	 		}
	 	},
	 	methods:{
	 		//截取url的参数值
			GetQueryString:function (name){
			     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
			     var r = window.location.search.substr(1).match(reg);
			     if(r!=null)return  unescape(r[2]); return null;
			},
			//获取留言的内容
			getmessage:function(){
				var _this=this;
				var data={
					id:this.GetQueryString('id')
				}
				api.messageGet(data).then(function(res){
					if(res.data){
						_this.title=res.data.title;
						_this.content=res.data.content;
						_this.contact=res.data.contact;
						_this.phone=res.data.phone;
						_this.reply=res.data.reply;
					   $('.status').val(res.data.status);
						if(res.data.status==0){
					  		$('input[name=isopen]')[1].checked=true;
					  	}else if(res.data.status==1){
					  		$('input[name=isopen]')[0].checked=true;
					  	}
					}
				}).catch(function(err){
					console.log(err);
				})
			},
			//保存留言
	 		submit:function(){
	 			var data={
	 				id:this.GetQueryString('id'),
	 				reply:this.reply,
	 				status:$('input[name=isopen]:checked').val(),
	 			}
	 			api.messageReply(data).then(function(res){
	 					if(res.success){
	 						 setIframeUrl('user/servMge/mgrMessage.html?page='+this.pageNum);
                      		 window.location.href=fontBaseUrl+'user/servMge/mgrMessage.html?page='+this.pageNum;
	 					}
	 				}).catch(function(err){
	 					console.log(err)
	 				})
	 		}
	 	},
	 	mounted:function(){
	 		var pageNum=getQueryString("page");
               if(pageNum){
               		this.pageNum=pageNum;
               }
	 		this.getmessage();
	 	}
});	 	


function submit(){
	mesRespond_vm.submit();
}
