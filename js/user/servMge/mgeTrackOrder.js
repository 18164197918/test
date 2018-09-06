/*订单跟踪*/
/*跟踪路径接口未添加！*/
new Vue({
	    el:'#track',
	 	data:function() {
	 		return {
	 			oidTrackArr: [],  // 订单号集合
	 			deliveryType: '',  // 运输方式
	 			name: '',          // 承运人
	 			logistics: ''      // 货运单号
	 		}
	 	},
	 	methods: {
	 		getUrlParams: function(){
	 			var orderString = getQueryString("orderId") || '';
	 			this.oidTrackArr = orderString && orderString.split(",");
	 		},
	 		getData: function () {
	 			var _this = this;
				if(this.oidTrackArr){
						api.shippingList({
							oid: _this.oidTrackArr // 订单id
			 			}).then(function(res){
			 				if(res.success){
		 						_this.deliveryType =   res.data && res.data[0] && res.data[0].od.delivery_type;
				 				_this.name =  res.data && res.data[0] && res.data[0].od.name;
				 				_this.logistics = res.data && res.data[0] && res.data[0].od.logistics_no; 
			 				}
				 		}).catch(function(err){
				 			console.log(err);
			 			})
				}else{
					 setIframeUrl('user/servMge/mgrOrder.html');
					  console.log("订单号为空 ,无法跟踪！");
					  window.location.href =fontBaseUrl + 'user/servMge/mgrOrder.html';
				}
	 		}
	 	},
	 	mounted: function () {
	 		this.getUrlParams();//url截取参数
	 		this.getData();// 获取数据(跟踪)
	 	}
});
