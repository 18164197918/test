/*订单详情*/
/*目前配送方式是静态的数据库没有信息 只有tag*/
//{ 'name': '中通快递', 'tag': 1 },
//{ 'name': '申通快递', 'tag': 2 },
//{ 'name': '圆通快递', 'tag': 3 },
//{ 'name': '顺丰快递', 'tag': 4 }
var vm_detailOrder = new Vue({
	    el:'#detailOrder',
	 	data:function() {
	 		return {
	 			status:'',//订单状态
	 			orderId:'',//订单号序列(多个)
	 			orderInfo:{},//订单信息
	 			usrAccount:'',//用户账号
	 			resInfo:[],//商品信息
	 			invoiceParams:{//修改发票信息
	 				id:'',//订单号
	 				invoice_content:'',//发票内容
	 				invoice_title:'',//发票抬头
	 				invoice_type:''//发票类型
	 			},
	 			receverParams:{//修改收货人信息
	 				id:'',
	 				name:'',//收货人姓名
	 				tel:'',//手机号码
	 				postcode:'',//邮政编码
	 				addr:''//收货地址
	 			},
	 			goodsParams:{//修改商品信息
	 				oid:'',//订单id
	 				cart_id:'',//购物车Id
	 				count:''//数量
	 			},
	 			params:{//取消订单信息
 					id:'',//订单id
		 			uid: '',
					cancel_reason: '',  // 取消原因
	 			},
	 			editCost:'',//商品费用信息
	 			remark:''//订单备注
	 		}
	 	},
	 	methods: {
	 		getUrlParams: function(){
	 			this.orderId = getQueryString('orderId');
	 		},
	 		orderTrack: function(orderId){
 				setIframeUrl('user/servMge/mgeTrackOrder.html?orderId='+ orderId)
				window.open('user/user.html', '_self');
	 		},
	 		/*获取订单相关信息*/
	 		getOrderDetailData: function(){
	 			var _this =this;
	 			var orderIdArry = _this.orderId ?_this.orderId.split(","):[];
	 			if(orderIdArry){
					api.shippingList({
						oid: orderIdArry // 订单id
		 			}).then(function(res){
		 				if(res.success) {
		 					_this.orderInfo = res.data && res.data[0] && res.data[0].od;
	 						_this.remark = _this.orderInfo && _this.orderInfo.remark;
		 					_this.usrAccount = res.data && res.data[0] && res.data[0].username;
		 					_this.resInfo = res.data && res.data[0]  && res.data[0].resList;
		 					
		 					_this.editCost = _this.orderInfo && _this.orderInfo.amount;//修改商品总价
		 					_this.remark =  _this.orderInfo && _this.orderInfo.remark;//修改商品备注
		 					_this.orderInfo && $.extend(_this.receverParams, {
								name:_this.orderInfo.name,//收货人姓名
								tel:_this.orderInfo.tel,//手机号码
								postcode:_this.orderInfo.postcode,//邮政编码
								addr:_this.orderInfo.addr//收货地址
							});
							_this.orderInfo && $.extend(_this.invoiceParams, {
								invoice_content: _this.orderInfo.invoice_content,//发票内容
								invoice_title: _this.orderInfo.invoice_title,//发票抬头
								invoice_type: $("#clm-nr").find("option[catid='"+ _this.orderInfo.invoice_type+"']").attr("selected","selected")//发票类型
							});
						}
			 		}).catch(function(err){
			 			console.log(err);
		 			});
		 		}
		 			
		 	},
	 		/* 删除订单 */
	 		deleteOrderFun: function () {
	 			var _this = this;
	 			// 获取浏览器上的orderId
	 			if(_this.orderInfo.id){
					api.deleteOrder({
						oid: _this.orderInfo.id, // (企业id)必填
						status: '-900'
		 			}).then(function(res){
		 				if(res.success) {
							$.CwsPopup.Alert("提示","删除成功!");
							 setIframeUrl('user/servMge/mgrOrder.html');
							window.open(fontBaseUrl+"/user/servMge/mgrOrder.html");
		 				}
			 		}).catch(function(err){
			 			console.log(err);
		 			});
	 			}else{
					$.CwsPopup.Alert("提示","订单号为空不能修改!");
				}
	 		},
	 		selctInvoiceType: function(val_cartid){
 				if(val_cartid == '10'){
 					 this.invoiceParams.invoice_title = "个人";
 					 $(".invoceTitle").attr('disabled', 'disabled');
 				}else if(val_cartid == '20'){
 					 this.invoiceParams.invoice_title = "";
 					  $(".invoceTitle").removeAttr('disabled');
 				}
	 		},
	 		/*修改发票信息*/
	 		changeInvoice:function(){
	 			var _this=this;
				$.extend(_this.invoiceParams, {
					id: _this.orderInfo.id,
					invoice_type: $("#clm-nr>option:selected").attr("catid"),
					invoice_title: $(".invoceTitle").val()
				});
				if(_this.orderInfo.id){
					if(_this.judgeObjectNull(_this.invoiceParams)){
					    api.editOrder(_this.invoiceParams).then(function(res){
			 				if(res.success) {
			 					window.location.reload();
			 				}
				 		}).catch(function(err){
				 			console.log(err);
			 			});
					}else{
				    	$.CwsPopup.Alert("提示","请填写完整信息!");
			 		}
				}else{
				    	$.CwsPopup.Alert("提示","订单号为空不能修改!");
				}
	 			
	 		},
	 		judgeObjectNull: function(obj){//判断是否为空
	 			for(var key in obj){
				    if(!obj[key]) return false; 
				}
	 			return true;
	 		},
	 		/* 修改收货人信息*/
		  	changeReceiverInfo: function () {
		  		var _this=this;
				$.extend(_this.receverParams, {
					id: _this.orderInfo.id,
				});
				if(_this.orderInfo.id){
					if(_this.judgeObjectNull(_this.receverParams)){
					    api.editOrder(_this.receverParams).then(function(res){
			 				if(res.success) {
			 					window.location.reload();
			 				}
				 		}).catch(function(err){
				 			console.log(err);
			 			});
					}else{
					    $.CwsPopup.Alert("提示","请填写完整信息!");
			 		}
				}else{
					 $.CwsPopup.Alert("提示","订单号为空不能修改!");
				}
		  	},
		  	/*修改商品信息*/
		  	changeGoodsInfo: function () {
		  		var _this = this;
				var obj_goods ={};
	 			$.extend(obj_goods,_this.goodsParams, {
	 				oid: _this.orderInfo.id,
	 			});
	 			delete obj_goods.title;
	 			if(_this.orderInfo.id){
	 				api.editGoods(obj_goods).then(function(res){
		 				if(res.success) {
		 					window.location.reload();
		 				}
			 		}).catch(function(err){
			 			console.log(err);
		 			});
	 			}else{
					 $.CwsPopup.Alert("提示","订单号为空不能修改!");
				}
		  	},
		  	/* 修改费用信息 start*/
		  	changeFeeInfo: function(){
		  		var _this = this;
		  		if(_this.orderInfo.id){
					    api.editOrder({
					    	id: _this.orderInfo.id,
					    	amount: _this.editCost
					    }).then(function(res){
			 				if(res.success) {
			 					window.location.reload();
			 				}
				 		}).catch(function(err){
				 			console.log(err);
			 			});
				}else{
					$.CwsPopup.Alert("提示","订单号为空不能修改!");
				}
				
		  	},
		  	/* 修改费用信息 end*/
		  	/*修改订单备注*/
		  	changeOrderRemark: function(){
		  		var _this =this;
  				if(_this.orderInfo.id){
			  		api.editOrder({
						id: _this.orderInfo.id,  // (企业id)必填
						remark: _this.remark
		 			}).then(function(res){
		 				if(res.success) {
		 					window.location.reload();
		 				}
			 		}).catch(function(err){
			 			console.log(err);
		 			});
 				}else{
					$.CwsPopup.Alert("提示","订单号为空不能修改!");
				}
		  	},
		  	/*取消订单*/
		  	cancelOrderFun:function(){
		  		var _this = this;
	 			$.extend(_this.params, {
	 				id: _this.orderInfo.id,
	 				uid: getUserCookie() && getUserCookie().uid
	 			});
	 			if(_this.params.id && _this.params.uid){
	 				api.cancelOrder(_this.params).then(function(res){
		 				if(res.success) {
							setIframeUrl('user/servMge/mgrOrder.html');
							window.open('user/user.html', '_self');

		 				}
			 		}).catch(function(err){
			 			console.log(err);
		 			});
	 			}else{
	 				$.CwsPopup.Alert("提示","取消订单号为空不可取消!");
	 			}
	 			
		  	}
	 	},
	 	mounted: function () {
	 		//获取用户的信息
	 		this.getUrlParams();
	 		// 获取数据
	 		this.getOrderDetailData();
	 	}
});
/*筛选发票抬头*/
function selctInvoiceType(ele){
	var ele_val =$(ele).find("option:selected").attr('catid');
	if(ele_val != 0){
	vm_detailOrder.selctInvoiceType(ele_val);
	}
}
/*删除订单*/
function delOrder(){
	vm_detailOrder.deleteOrderFun();
}

/*修改发票信息*/
function changeInvoice(){
	vm_detailOrder.changeInvoice();
}

/*修改收货人信息*/
function changeReciver(){
	vm_detailOrder.changeReceiverInfo();
}


function showPopupModifyGoods(popId,popTarget) { //打开修改商品信息弹窗
	if(popId) {
		$(popId).hasClass("dis-n") && $(popId).removeClass("dis-n");
		$.extend(vm_detailOrder.goodsParams,{
			title: $(popTarget).attr("title"),//商品名称
			cart_id: $(popTarget).attr("cartid"),//购物车Id
			count: $(popTarget).attr("count")//数量
		});
	} else {
		console.log("请添加操作弹窗ID！");
	}
}


/*修改商品信息*/
function changeGoods(){
	vm_detailOrder.changeGoodsInfo();
}

/*修改商品费用信息*/
function changeFee(){
	vm_detailOrder.changeFeeInfo();
}

/*修改订单备注信息*/
function changeOrderRemark(){
	vm_detailOrder.changeOrderRemark();
}

/*取消订单*/
function cancelOrderFun(){
	vm_detailOrder.cancelOrderFun();
}

/*======弹窗====================*/
function showPopup() { //打开弹窗
	var popId = arguments[0];
	if(popId) {
		$(popId).hasClass("md-show") || $(popId).addClass("md-show");
	} else {
		console.log("请添加操作弹窗ID！");
	}
}