$("#footer").load('tpl/footer.tpl', function(){
	new Vue({
		data: function(){
			return {
				Disnum:'',//区号
				fontnum:'',//尾号
				logo: 'img/footer/logo-footer.png',//专用尾部logo
				footerListInfo: {}//脚部信息（网站设置获取）
			}
		},
		methods:{
		   listFooterInfo:function(){
			   var _this = this;
			   api.ListCpInfo().then(function(res){
	    			if(res.success){
	    				_this.footerListInfo = res.data && res.data;
	    				_this.logo =  res.data && res.data && res.data.logo;
	    				_this.Disnum = res.data && res.data.contact.substring(0,3);
	    				_this.fontnum = res.data && res.data.contact.substring(3);
	    			}
		    	}).catch(function(err){
		    		console.log(err);
		    	});
		   }
		},
		watch:{
		},
		mounted: function(){
			this.listFooterInfo();
		}
	}).$mount('#footer');
});
	

