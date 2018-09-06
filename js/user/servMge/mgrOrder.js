//订单管理 mgrOrder.js
var vm_mgrOrder = new Vue({
	    el:'#order',
	 	data:function() {
	 		return {
	 			cid: '',
	 			uid:'',
	 			status: '',//订单状态
	 			currentpage:1,
	 			pagesize:10,
	 			orderListCount: {},//各种状态订单数量
	 			tableList:'',//订单列表
	 			//---------------
	 			totalPages:'',//总页数
	 			orderIdArr:[],//订单ids
	 			orderExport:{//导出订单参数
	 				uid:'',//必填
	 				cid:'',//必填
	 				status:'',//订单状态 选填
	 				searchItems:'',//搜索订单号 选填
	 				searchItems1:'',//搜索收货人 选填
	 				searchItems2:'',//订单状态筛选 选填
	 				beginTime:'',//开始时间   选填
	 				endTime:''//结束时间 选填
	 			},
	 			noData: false
	 		}
	 	},
	 	methods: {
	 		getUser: function () { /*获取用户信息*/
	 			var _this = this;
				if(getUserCookie()){
					_this.cid = getUserCookie().cid;
					_this.uid  = getUserCookie().uid;
				}
			},
			/* 订单数量 */
	 		getOrderNumber: function () {
	 			var _this = this;
	 			api.orderNumPor({
					cid: _this.cid,  // (企业id)必填
	 			}).then(function(res){
	 				if(res.success) {
	 					_this.orderListCount = res.data && res.data;
	 				}
		 		}).catch(function(err){
		 			console.log(err);
	 			});
	 		},
	 		/*获取切换的订单状态*/
 			getCurrentOrderStatus: function(){
				this.status = $(".column-status").find("li.active").attr("data-status");
			},
			/* 切换订单状态 */
	 		changeList: function (sign) { 
	 			var _this = this;
	 			_this.getCurrentOrderStatus();
	 			var obj = {};
	 			if(sign == 'search'){//开始检索
	 				 $.extend(obj, _this.orderExport, {
			 				cid:  _this.cid, 
							uid:  _this.uid, 
							status: _this.status,
							searchItems2: $("#clm-nr>option:selected").attr("catid"),
							beginTime: $("#d4311").val(),
							endTime:   $("#d4312").val()
		 			 });
		 			 
	 			}else{
	 				$.extend(obj, {
			 				cid: _this.cid,
			 				status: _this.status,
			 				currentpage: _this.currentpage,
		 					pagesize: _this.pagesize 
		 			});
	 			}
	            if(_this.cid){
		 			api.tableListPor(obj).then(function(res){
		 				if(res.success){
		 					if(res.data && res.data[0].length == 0){
		 						_this.noData = true;
		 					}
	 					    _this.tableList = res.data && res.data[0] && res.data[0];
						 	_this.totalPages = res.data && res.data[1] && res.data[1].pagenumber;//共几页
						 	callBackLoadIframe();//重置iframe高度
		 				}
			 		}).catch(function(err){
			 			if(err.status == 200){
			 				if(err.data){
			 					if(!err.data.success){
			 						if(sign == 'search'){
			 							$.CwsPopup.Alert("提示","没有您要查找的订单信息!");
			 						}else{
			 							$.CwsPopup.Alert("提示","加载失败!");
			 						}
			 					}
			 				}
			 			}
			 		});
		 		}
	 		},
	 		/*批量发货*/
	 		batchDelivery: function () {
	 			var _this = this;
	 			// 当前是为全部订单/待发货(就这两个页面需要有批量发货的功能)
				if((_this.status == '' && _this.orderListCount.dfh > 0) ||( _this.status == 200 &&  _this.orderListCount.dfh > 0)){
					//window.location.href = fontBaseUrl + 'user/servMge/mgeShipping.html?orderIdArr=' + _this.orderIdArr;
					windowOpenPage( 'user/servMge/mgeShipping.html?orderIdArr=' + _this.orderIdArr);
				}else if( _this.orderListCount.dfh <= 0){
					$.CwsPopup.Alert("提示","无批量发货订单!");
				}else{
					$.CwsPopup.Alert("提示","当前订单状态下没有批量发货功能!");
				}
	 		},
	 		/*导出订单*/
	 		exportOrderFun: function () {
				var _this = this;
				$.extend(_this.orderExport, {
					cid:  _this.cid, 
					uid:  _this.uid, 
					status: _this.status,
					searchItems2: $("#clm-nr").attr("catid"),
					beginTime: $("#d4311").val(),
					endTime:   $("#d4312").val()
				});
				var a = document.createElement('a');
				a.setAttribute('href', api.baseUrl()+'order.do?exp&cid='+_this.orderExport.cid+'&status='+_this.orderExport.status+'&searchItems='+_this.orderExport.searchItems+'&searchItems1='+_this.orderExport.searchItems1+'&searchItems2='+_this.orderExport.searchItems2+'&beginTime='+_this.orderExport.beginTime+'&endTime='+_this.orderExport.endTime);
				a.click();
	 		},
	 		/* 删除订单 (批量、单个)*/
	 		deleteOrderFun: function (del_id) {
	 			var del_ids='';
	 			if(arguments[0]){
	 				del_ids = del_id;
	 			}else{
 					var ck = $("tbody .ck_one:checked");
					var ids =[];
					for(var i=0; i<ck.length; i++){
						ids.push(ck[i].defaultValue);
					}
					del_ids = (ids.length>0) ?  ids.join(",") : "";
					
	 			}
				if(del_ids){
					api.deleteOrder({
						oid: del_ids,  // (企业id)必填
						status: '-900'
		 			}).then(function(res){
		 				if(res.success) {
		 					$.CwsPopup.Alert("提示",res.msg);
		 					window.location.reload();
		 				}
			 		}).catch(function(err){
			 			if(err.status == 200){
			 				if(err.data){
			 					if(!err.data.success){
		 							$.CwsPopup.Alert("提示","删除失败!");
			 					}
			 				}
			 			}
		 			});
				}else{
					$.CwsPopup.Alert("提示","请选择删除订单!");
				}
	 		},
	 		/* 发货 (单个)*/
	 		jumpDispatch: function(orderId){
			     setIframeUrl('user/servMge/mgeShipping.html?orderId=' + orderId);
	 			//window.location.href = fontBaseUrl + 'user/servMge/mgeShipping.html?orderId=' + orderId;
	 			windowOpenPage('user/servMge/mgeShipping.html?orderId=' + orderId);
	 		},
	 		/*开始检索*/
 			search: function () {
	 			this.changeList('search');
	 		},
	 		/*重置检索条件*/
	 		resetSearch: function(){
	 			var _this =this;
	 			for(var key in this.orderExport){
	 				_this.orderExport[key] = '';
	 			}
	 			/*清空订单状态*/
	 			$("#d4311").val("");
	 			$("#d4312").val("");
	 			$("#clm-nr").val(""); 
	 			$("#clm-nr").attr("catid","");
	 		},
	 		/*跳转订单详情页*/
	 		jumpDetailOrder : function(orderId){//单独跳转的页面
	 			window.top.open('user/servMge/orderDetail.html?orderId='+orderId,'_blank');
	 		},
 			/* 订单跟踪 */
	 		trackFun: function (orderId) {
	 			// 跳转到跟踪页面
	 			windowOpenPage('user/servMge/mgeTrackOrder.html?orderId=' + orderId);
	 		},
	 		/**分页统一   start****/
	 		changeCurrentPage: function(e){//跳转到某页
	 			var _this = this;
	 			if($.trim($('.currentpage').val()) != ''){
	 			    if(Number($('.currentpage').val()) <= Number( _this.totalPages)){
	 			    	  _this.currentpage = $('.currentpage').val();
	 			    }else{
	 			        	$('.currentpage').val(this.currentpage) ;
	 			    }
	 			}
	 			_this.changeList();
	 		},
	 		subPage: function(sign){
	 			var _this = this;
	 			if(sign == 'son'){
		 			var cur = _this.currentpage -1 ;
		 			if(cur > 0){
		 				_this.currentpage = cur;
		 			}
	 			}else{
	 				_this.currentpage = '1';
	 			}
	 			_this.changeList();
	 		},
	 		addPage: function(sign){
	 			var _this = this;
	 			if(sign == 'son'){
		 			var cur = (_this.currentpage -1 + 2) % (_this.totalPages-1+2);
		 			_this.currentpage = (cur == 0) ? 1 : cur ;
	 			}else{
	 				_this.currentpage =  _this.totalPages;
	 			}
	 			_this.changeList();
	 		}/**分页统一   end****/
	 
	 		
	 	},	
	 	mounted: function () {
	 		this.getUser(); // 获取用户信息
	 		this.getOrderNumber();  // 获取订单数量
	 	    this.changeList();//初始化列表
	 	}
});


//切换订单状态
function toggleOrder(status, target){
/*0:全部; 100:待付款; 200:待发货; 500:已发货; 300:已完成; -900:已删除; -100:已关闭 */
	$(target).parent().find(".active").removeClass("active");
	$(target).addClass('active')
	vm_mgrOrder.changeList();//获取当前状态下订单列表
}

//批量发货
function pileDispatch(){
	vm_mgrOrder.batchDelivery();//批量发货(全部状态或者待发货状态调用此功能)
}

//导出订单
function exportOrderFun(){
	vm_mgrOrder.exportOrderFun();
}

//删除订单
function deleteOrderFun(ele){
	var del_id = '';
    del_id = arguments[0] && $(ele).attr('ordId');
	vm_mgrOrder.deleteOrderFun(del_id); 
}

//开始检索
function satrtSearch(){
	vm_mgrOrder.search();
}

//重置检索信息
function resetSearch(){
	vm_mgrOrder.resetSearch();
}

//跳转详情页
function jumpDetail(target){
	vm_mgrOrder.jumpDetailOrder($(target).attr("ordId"));
}

//订单跟踪
function trackFunOrder(target){
	vm_mgrOrder.trackFun($(target).attr("ordId"));
}

//发货跳转
function jumpDispatch(target){
	alert($(target).attr("ordId"));
	vm_mgrOrder.jumpDispatch($(target).attr("ordId"));
}
