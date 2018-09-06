//批量发货 mgeShipping.js
var vm_mgeShipping = new Vue({
	    el:'#shipOrder',
	 	data:function() {
	 		return {
	 			cid: '',
	 			uid:'',
	 			status: '200',//待发货
	 			currentpage:1,
	 			pagesize:10,
	 			orderListCount: {},//各种状态订单数量
	 			tableList:[],//发货列表
	 			//---------------
	 			totalPages:'',//总页数
	 			dispatchParams:{//确认发货订单参数
	 				oid:[], //订单号码数组  必填
	 				delivery_type:[],//配送方式数组   必填
	 				logistics_no:[]//物流单号数组  选填
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
			/* 遍历待发货列表 */
	 		disPatchGoodsList: function () { 
	 			var _this = this;
	 			var order_sigle = getQueryString("orderId") || '';//跳转发货页面参数
	 			if(order_sigle){
		 				api.shippingList({
							oid: new Array(order_sigle)// 订单id
			 			}).then(function(res){
			 				var arr = res.data
			 				if(res.success){
			 					if(res.data[0]&& res.data[0].length == 0){
			 							_this.noData = true;
			 					}
			 					res.data && res.data[0] && _this.tableList.push(res.data[0]) ;//= res.data && res.data[0] && res.data[0];
			 				}
				 		}).catch(function(err){
				 			console.log(err);
			 			})
	 			}else{
	 				 if(_this.cid){
				 			api.tableListPor({
					 				cid: _this.cid,
					 				status: '',// _this.status
					 				currentpage: _this.currentpage,
				 					pagesize: _this.pagesize 
				 			}).then(function(res){
				 				if(res.success){
			 					    _this.tableList = res.data && res.data[0] && res.data[0];
								 	_this.totalPages = res.data && res.data[1] && res.data[1].pagenumber;//共几页
				 				}
					 		}).catch(function(err){
					 			if(err.status == 200){
					 				if(err.data){
					 					if(!err.data.success){
					 						$.CwsPopup.Alert("提示","加载失败!");
					 					}
					 				}
					 			}
					 		});
					 		
			 		}
	 				 
	 			}
	           
	 		},
	 		/*确认批量发货*/
	 		pileDispatch: function () {
	 			var flag = true;
	 			var _this = this;
	 			var li_dom = $("i.i-active").parent();
 				var ck = $("i.i-active").parent().find("input[name='checkone']");
				var ck = $("tbody .ck_one:checked");
				if(ck.length > 0){
					 for(var i=0; i< ck.length; i++){
					 	 	_this.dispatchParams.oid.push($(ck[i]).val());//订单号数组
					 	 	
					 	 	if($(ck[i]).parents('tr').find(".column .clm-txt>option:selected")){
					 	 		 _this.dispatchParams.delivery_type.push($(ck[i]).parents('tr').find(".column .clm-txt>option:selected").attr('catid'));//配送方式数组
					 	 	}else{
					 	 		 flag =false;
					 	         $.CwsPopup.Alert("提示","发货订单配送方式不能为空!");
				 	             return ;
					 	 	}
					 	 	
					 	 	if($(ck[i]).parents('tr').find(".logisticsNum").val()){
					 	 		_this.dispatchParams.logistics_no.push($(ck[i]).parents('tr').find(".logisticsNum").val());//物流单号数组
					 	 	}else{
					 	 		 flag =false;
					 	         $.CwsPopup.Alert("提示","物流单号不能为空!");
				 	             return ;
					 	 	}
					 }
					 if(flag){
							api.shippingOrder(_this.dispatchParams).then(function(res){
				 				if(res.success) {
				 					$.CwsPopup.Alert("提示",res.msg);
				 					 setIframeUrl('user/servMge/mgrOrder.html');
				 					window.location.href = fontBaseUrl + 'user/servMge/mgrOrder.html';
				 				}
					 		}).catch(function(err){
					 			if(err.status == 200){
					 				if(err.data){
					 					if(!err.data.success){
				 							$.CwsPopup.Alert("提示","发货确认失败!");
					 					}
					 				}
					 			}
				 			});
						}
				}else{
					$.CwsPopup.Alert("提示","请选择订单批量发货!");
				}
				
				
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
	 	    this.disPatchGoodsList();//初始化列表
	 	}
});

/*批量发货*/
function pileDispatch(){
	vm_mgeShipping.pileDispatch();
}
