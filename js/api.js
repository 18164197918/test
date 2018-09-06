;(function($){
	var instance  = axios.create();
	// axios 配置
	instance.defaults.timeout = 10000;
	instance.defaults.withCredentials = true;
	instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

	instance.defaults.baseURL = 'http://www.baijiekj.com/cs/';
//	instance.defaults.baseURL = 'http://cs1.baijiekj.com/cs/';

//	instance.defaults.baseURL = 'http://172.16.12.95:8080/cs/';    //何宗笑接口
	/*LHY*/
//	instance.defaults.baseURL = 'http://172.16.12.87:8080/cs/';            //廖合音接口
	//POST传参序列化
	instance.interceptors.request.use(function(config) {
	    if(config.method  === 'post'){
//	      config.data = qs.stringify(config.data);
	    }else if(config.method  === 'options'){ 
	    	return;
	    }
	    return config;
	},function (error){
	    // _.toast("错误的传参", 'fail');
	    return  Promise.reject(error);
	});
	
	//返回状态判断
	instance.interceptors.response.use(function (res){
		if(res.status == '200'){
			if(!res.data.success){
		        return Promise.reject(res);
		    }
		}else{//299 超时
			if(res.status == '299'){
				var location = window.top.location.toString();
				if(location.indexOf("/user/sign.html") == -1 && location.indexOf("/user/") > -1){//除了登录页面的用户中心
					delUserCookie();
    				delCookie('rid');
					window.top.open(fontBaseUrl+'user/sign.html','_self');
				} 
				console.log('状态码299超时！');
				return Promise.reject(res);
			}
		}
	    return res;
	},function(error) {
	    console.log(error);
	    return Promise.reject(error);
	});
	
	var api = function(){}
	fetch = function (url, params){
	    return new Promise(function(resolve, reject){
	        instance.post(url, params)
	            .then(function (response) {
	                resolve(response.data);
	            }) .catch(function (error){
	                reject(error);
	            })
	    })
	}
		
/*	api.prototype.ListModType = function(params){
		return fetch('/company2.do?info', params);
	}*/

///----------------------
  	/*
     * 返回请求数据服务器address
     * */
    api.prototype.baseUrl = function(){
    	return instance.defaults.baseURL;
    },
    /*
     * 返回请求皮肤地址PC
     * */
    api.prototype.skinPcBaseUrl = function(){
      	//return 'http://cs1.baijiekj.com/css/skin.css';
  		return 'http://www.baijiekj.com/css/skin.css';
    },
      /*
     * 返回请求皮肤地址Mb
     * */
    api.prototype.skinMbBaseUrl = function(){
    	//return 'http://172.16.11.252:8866/mb/css/skin.css';
    	return 'http://www.baijiekj.com/mb/css/skin.css';
    },
    /*
     * 返回请求数据服务器图片路径
     * */
    api.prototype.baseUpload = function(){
    	var curUrl = instance.defaults.baseURL;
    	if(curUrl.indexOf("cs")>0){
    		return curUrl.replace(/cs/, "");
    	}else{
    		return curUrl;
    	}
    },
  	/*
     * 请求图片的地址
     * */
    api.prototype.updateImgUrl = function(){
    	 return  "http://www.baijiekj.com";
//  	 return "http://cs1.baijiekj.com";
//		return "http://172.19.0.26:8080";	
    },    
    
/**
	 *测试302  后期删除
	 * ***/
	api.prototype.redirect = function(){
		 return fetch('/cart.do?test');
	},
//用户中心获取用户权限
	/**
	 * params(role_id)
	 *根据角色id获取用户权限 
	 * */
	api.prototype.GetCustomFunction = function(params){
		 return fetch('/rp.do?get',params);
	},
		/**
	 * params(tb_company.id)
	 *根据模板id获取模板类型 （ 根据模板类型 决定用户权限） 
	 * */
	api.prototype.ModelType= function(params){
		 return fetch('tem.do?type',params);
	},
//购物车
	/**
	 *商品加入购物车 
	 ***/
	api.prototype.ProductAddCart = function(params){
		 return fetch('/cart.do?add',params);
	},
	/*
	 *显示购物车商品
	 * */
	api.prototype.ListProds = function(params){
		return fetch('/cart.do?list', params);
	},
	/*
	 *修改商品数量
	 * */
	api.prototype.modifyCount = function(params){
		return fetch('/cart.do?upNum', params);
	},
	/**
	 * 移除商品
	 * ***/
	api.prototype.delPro = function(params){
		return fetch('/cart.do?delCart', params);
	},
//订单
    /*
     *提交购物车结算
     * */
    api.prototype.SbmtAccount = function(params){
		return fetch('/cart.do?cartSubmit', params);
    },
    /*
     *获取地址的列表
     * */
    api.prototype.AddressList = function(params){
		return fetch('/userAddr.do?list', params);
    },
     /*
     *删除地址
     * */
    api.prototype.DelAddress = function(params){
		return fetch('/userAddr.do?del', params);
    },
     /*
     *添加或修改地址
     * */
    api.prototype.SaveOrUpAddress = function(params){
		return fetch('/userAddr.do?saveOrUpdate', params);
    },
    /*
     *获取省的信息
     * */
    api.prototype.ProvinceList = function(params){
		return fetch('/area.do?pr', params);
    },
    /*
     *获取市县的信息
     * */
    api.prototype.CityList = function(params){
		return fetch('/area.do?geta', params);
    },    /*
    /*
     *通过area_id获取省市县的信息
     * */
    api.prototype.AreaId = function(params){
		return fetch('/area.do?findId', params);
    }, 
    
    /*
     *通过县的area_id获取省市县的信息（包括中文）
     * */
    api.prototype.GetAreaInfo = function(params){
		return fetch('/area.do?areaInfo', params);
    },
    /*
     *获取发票列表
     * */
    api.prototype.InvoiceList = function(params){
		return fetch('/urInvoice.do?list', params);
    },    
    /*
     *添加或修改用户发票
     * */
    api.prototype.SaveOrUpdateInv = function(params){
		return fetch('/urInvoice.do?saveOrUpdate', params);
    },     
    /*
     *删除用户发票
     * */
    api.prototype.delInvoice = function(params){
		return fetch('/urInvoice.do?del', params);
    },  
    /*
     *提交订单
     * */
    api.prototype.SubmitOrder = function(params){
		return fetch('/cart.do?odSubmit', params);
    },     
//首页  列表页

	/**
	 * 模板类型遍历
	 * **/
	api.prototype.ListModType = function(params) {
		// return fetch('/ct.do?mc')
    	return fetch('/tem2.do?tags',params)
	},
	/**
	 * 遍历模板
	 * ***/
	api.prototype.ListModList = function(params) {
		 return fetch('/tem2.do?l', params)
		//return fetch('/tem2/l.do', params)
	},
	/**
	 * 根据模板id获取模板套餐类型
	 * ***/
	api.prototype.GetModelType = function(params) {
		 return fetch('/tem2.do?tc', params)
		//return fetch('/tem2/l.do', params)
	},
	
	/**
	 *最新模板遍历
	 * ***/
	api.prototype.ListNewModels = function(){
		return fetch('/tem.do?newTem')
	},
//top显示
    /**
	 * params:根据栏目类型遍历拥有topten内容的栏目\bk
	 * result: mid
	 * ***/
    api.prototype.ListTopTenMid = function(params){
		return fetch('/rtop.do?mids',params)
	},
/**
 * params:根据栏目类型遍历所有栏目topten内容(bk cid cat)
 * result: content
 * api: hotList
 * ***/
//网站设置
    /**
     * 添加企业基本信息（第一页）
     */
//  api.prototype.AddCpInfoOne = function(params) {
//      return fetch('/company2.do?save', params)
//  },
    
    /**
     * 添加企业基本信息（第二页）
     */
    api.prototype.AddCpInfo = function(params) {
        return fetch('/company2.do?set', params)
    },
    /***
     * 显示企业基本信息
     * ***/
    api.prototype.ListCpInfo = function(params){
    	return fetch('/company2.do?info', params)
    },
    api.prototype.ListCpInfoUrl = function(params){
    	return instance.defaults.baseURL+'/company2.do?info';
    },
//我的服务 （个人资料）    
     /***
     * 123步购买模板
     * ***/   
    api.prototype.buyModel= function(params) {
		return fetch('/tem.do?btmp', params)
	},
     /***
     * 根据订单编号获取订单状态 
     * ***/   
    api.prototype.getOrderStatus= function(params) {
		return fetch('/order.do?getStatus', params)
	},	
    /***
     * 根据企业名进行模糊查询
     * ***/
    api.prototype.SearchCpInfo = function(params){
    	return fetch('/company2.do?search', params)
    },
    /***
     * 申请加入企业
     * ***/
    api.prototype.JoinCp = function(params){
    	return fetch('/urCenter.do?aMgr', params)
    },  
//我的服务（工单信息）
	 /***
     * func:工单列表
     * params[企业id（*）、开始时间、结束时间、当前页（*）、页面大小（*）]
     * ***/
    api.prototype.ListWorkOrder = function(params){
    	return fetch('/wo.do?list', params)
    },
    /***
     * func:添加工单/回复工单
     * params[企业id（*）、pid、title、vtext（*）、contact（*）、phone（*）、email(*)、img(*)]
     * ***/
    api.prototype.AddWorkOrder = function(params){
    	return fetch('/wo.do?set', params)
    },  
    /***
     * func:查看工单  
     * params[id（*）]
     * ***/
    api.prototype.SearchOrderInfo = function(params){
    	return fetch('/wo.do?get', params)
    },  
      /***
     * func:改变工单状态  
     * params[id（*）、status(*)]
     * ***/
    api.prototype.ChangeOrderStatu= function(params){
    	return fetch('/wo.do?ustatus', params)
    },  
     /***
     * func:删除工单
     * params[id(*多个用,隔开)]
     * ***/
    api.prototype.DelWorkOrders = function(params){
    	return fetch('/wo.do?del', params)
    },  
     /***
     * func:查看工单
     * params[企业id（*）、pid、title、vtext（*）、contact（*）、phone（*）、email(*)、img(*)]
     * ***/
//  api.prototype.SearchWorkOrder = function(params){
//  	return fetch('/urCenter.do?aMgr', params)
//  },  
//栏目管理
     /**
     * 初始化树接口([column_mod.vue]<initUrl>)
     */
     /**
     * 初始化栏目类型(内容管理)
     */
    api.prototype.InitColumSort = function(){
    	return fetch('/column2.do?type')
    },
      /**
     * 加载栏目信息
     */
    api.prototype.ListColumnInfo = function(params){
    	return fetch('/column2.do?get', params)
    },
    /**
     * 加载栏目信息树节点
     */
     api.prototype.ListColumnTreeInfo = function(){
    	return instance.defaults.baseURL+'/column2.do?get';
    },
     /**
     * 添加栏目
     */
    api.prototype.AddColumnNode = function(params){
    	return fetch('/column2.do?set', params)
    },
	/**
     * 删除栏目
     */
    api.prototype.DelColumnNode = function(params){
    	return fetch('/column2.do?del',params)
    },
    /*
     *更改栏目名称
     * */
    api.prototype.UpdateColumnNameNode = function(params){
    	return fetch('/column2.do?update', params)
    },
    /*
     *查询栏目
     * */
    api.prototype.SearchColumnNode = function(params){
    	return fetch('/column2.do?one', params)
    },
    /*
     *
     * */
    api.prototype.IsHavePage = function(params){
    	return fetch('/column2.do?isHavePage', params)
    },
    /*
     *根据选择栏目类型切换模板页面
     * */
    api.prototype.ListModelPageLink = function(params){
		return fetch('/resOther.do?pages', params)
    },
    /*
     *pc移动栏目 (接口信息在colums.js文件中的ajax)
     * */
     /*
     *func:Mobile移动栏目
     * */
    api.prototype.MoveColumn = function(params){
    	return fetch('/column2.do?columnMove', params)
    },
    /*
     *func:Mobile根据当前id获取后代节点
     * */
    api.prototype.OffspringColumn = function(params){
    	return fetch('/column2.do?mlayer', params)
    },
//内容管理
    /**
     * 遍历内容
     */
    api.prototype.ListContent = function(params){
    	return fetch('/res2.do?list', params)
    },
//注册
    /**
     * 向该用户发送短信验证码
     */
//  api.prototype.SendPhoneCode = function(params){
//  	  return fetch('/sms.do?sdcd', params)
//  },
    api.prototype.SendPhoneCode = function(params){
    	  return fetch('sendMsg.do?send', params)
    },
    /**
     * 向该用户发送邮箱验证码
     */
    api.prototype.SendEmailCode = function(params){
    	  return fetch('/ur2.do?eSend', params)
    },
    /**
     * 用户注册
     */

    api.prototype.Register = function(params){
    	  return fetch('/ur2.do?reg', params)
    },

    /**
     * 登录
     */
    api.prototype.Entry = function(params){
    	  return fetch('/ur2.do?login', params)
    },
    /**
     * 短信登录
     */
    api.prototype.CodeEntry = function(params){
    	  return fetch('/ur2.do?smsLogin', params)
    },
    /**
     * 被邀请人同意邀请
     */
    api.prototype.yORn = function(params){
    	  return fetch('/urCenter.do?yORn', params)
    },
    /**
     * 登出
     */
    api.prototype.LoginOut = function(params){
    	  return fetch('/ur2.do?logOut', params)
    },
//忘记密码页
    /**
     * 修改密码
     */
    api.prototype.ChangePassword = function(params){
    	  return fetch('/ur2.do?uPwd', params)
    },
//内容管理
    /**
     * 删除内容，进入回收站，还原
     */
    api.prototype.ContentDelete = function(params){
    	  return fetch('/res2.do?del', params)
    },
    /**
     * 内容排序(置顶)
     */
    api.prototype.ContentRank = function(params){
    	  return fetch('/res2.do?rank', params)  
    },    
//内容添加
	/**
     * 获取可添加栏目的列表
     */
    api.prototype.ColumnListGet = function(params){
    	 return fetch('/column2.do?child', params)
    },
    /**
     * 根据栏目类型获取栏目信息-廖
     */
    api.prototype.ColumnListGetCat = function(params){
    	 return fetch('/column3/get.do?', params)
    },
    /**
     * 获取当前栏目的兄弟节点(无兄弟节点返回当前节点栏目信息)
     */
    api.prototype.ColumnBroListGet = function(params){
    	 return fetch('/column2.do?brother', params)
    },
     /**
     * 获取当前栏目的兄弟节点(手机端接口)
     *	params: 栏目ID
     */
    api.prototype.ColumnMBroListGet = function(params){
    	 return fetch('/column2.do?mbrother ', params)
    },
    /**
     * 获取指定栏目
     */
    api.prototype.ColumnGet = function(params){
    	 return fetch('/column2.do?one', params)
    },
    /**
     * 获取指定栏目内容
     */
    api.prototype.ColumnContentGet = function(params){
    	 return fetch('/res2.do?get', params)
    },
    
    /**
     * 新增页面
     */
    api.prototype.AddPage = function(params){
    	 return fetch('/res2.do?set', params)
    },
    /**
     * 编辑页面
     */
    api.prototype.EditorPage = function(params){
    	 return fetch('/res2.do?update', params)
    },
    /**
     * 获取分类
     */
    api.prototype.GetClass = function(params){
    	 return fetch('/ct.do?sc', params)
    },
    /*获取分类树节点*/
    api.prototype.GetSignTreeClass = function(params){
    	 return instance.defaults.baseURL+'/ct.do?sc';
    },
    /**
     * 根据分类获取列表
     */
    api.prototype.GetClassResList = function(params){
    	 return fetch('/ct.do?resList', params)
    },
     /**
     * 模糊查询商品分类
     */
    api.prototype.GoodsClassSearch = function(params){
    	 return fetch('/ct.do?s', params)
    },
     /**
     * 添加商品分类
     */
    api.prototype.GoodsClassAdd = function(params){
    	 return fetch('/ct.do?ac', params)
    },
    /**
     *  检查分类名称是否重复
     */
    api.prototype.GoodsClassRepeat = function(params){
    	 return fetch('/ct.do?c', params)
    },
    /**
     * 编辑商品
     */
    api.prototype.EditorGoods = function(params){
    	 return fetch('/res.do?eg', params)
    }, 
//业务管理    
	 /**
     * 添加留言
     */  
    api.prototype.addMesgeFromFont = function(params){
    	 return fetch('/lw.do?set', params)
    },
     /**
     * 获取留言列表
     */  
    api.prototype.messageList = function(params){
    	 return fetch('/lw.do?list', params)
    },   
 	/**
     * 获取留言详情
     */  
    api.prototype.messageGet = function(params){
    	 return fetch('/lw.do?get', params)
    },
    /**
     * 回复留言
     */  
    api.prototype.messageReply = function(params){
    	 return fetch('/lw.do?rep', params)
    }, 
    /**
     * 删除留言
     */  
    api.prototype.messageDel = function(params){
    	 return fetch('/lw.do?del', params)
    }, 
     /**
     * 获取评论列表
     */  
    api.prototype.commentList = function(params){
    	 return fetch('/cmt.do?list', params)
    },       
     /**
     * 添加或回复评论
     */  
    api.prototype.commentReply = function(params){
    	 return fetch('/cmt.do?set', params)
    },      
     /**
     * 显示具体的某一条评论(包括对这条评价的回复列表)
     */  
    api.prototype.commentGet = function(params){
    	 return fetch('/cmt.do?get', params)
    },   
     /**
     * 删除评论（可批量操作）
     */  
    api.prototype.commentDel = function(params){
    	 return fetch('/cmt.do?del', params)
    },    
     /**
     * 获取会员列表
     */  
    api.prototype.meberList = function(params){
    	 return fetch('/urmge.do?list', params)
    },     
    /**
     *会员管理验证(待修改信息是否重复)
     * params(name:(手机号|邮箱|用户名  )
     * */
     api.prototype.meberValidate = function(params){
    	 return fetch('/ur2.do?chkName', params)
    }, 
     /**
     * 会员详情
     */  
    api.prototype.meberInfo = function(params){
    	 return fetch('/urmge.do?info', params)
    },    
     /**
     * 编辑会员信息
     */  
    api.prototype.meberEdit = function(params){
    	 return fetch('/urmge.do?update', params)
    },
     /**
     * 查看会员详情
     */  
    api.prototype.meberSearchOne = function(params){
    	 return fetch('/urmge.do?userInfo ', params)
    },   
     /**
     * 删除会员
     */  
    api.prototype.meberDel = function(params){
    	 return fetch('/urmge.do?del', params)
    },     
     /**
     * 会员登录日志
     */  
    api.prototype.meberLogs = function(params){
    	 return fetch('/urmge.do?userLogs', params)
    },
     /**
     * 根据子类区域信息获取父类信息
     */  
    api.prototype.getParentArea = function(params){
    	 return fetch('/area.do?getParent', params)
    },    
    api.prototype.getCityName= function(params){
    	 return fetch('/area.do?getName', params)
    },  
//用户管理
/**
     * 检测新添加的用户名是否重复接口
     */  
    api.prototype.testNewUserName = function(){
    	 return  instance.defaults.baseURL+'/ur2.do?chkName';
    },
    /**
     * 获取用户企业的人员类型
     */  
    api.prototype.UserRoleGet = function(params){
    	 return fetch('/role.do?list', params)
    },
	/**
     * 用户企业邀请人员
     */  
    api.prototype.UserCompanyInv = function(params){
    	 return fetch('/urCenter.do?iMgr', params)
    },
    /**
     * 用户企业取消邀请人员
     */  
    api.prototype.CancelInvite = function(params){
    	 return fetch('/urCenter.do?uStatus', params)
    },
	/**
     * 获取该企业下所有的人员列表
     */  
    api.prototype.UserListGet = function(params){
    	 return fetch('/urCenter.do?mlist', params)
    },
    /**
     * 修改该企业下人员的备注
     */  
    api.prototype.RemarksChange = function(params){
    	 return fetch('/urCenter.do?uMemo', params)
    },

    /**
     * 修改该企业下人员的状态
     */  
    api.prototype.StatusChange = function(params){
    	 return fetch('/urCenter.do?uStatus', params)
    },
    /**
     * 修改该企业下人员的角色（职位）(更新管理员角色)
     */  
    api.prototype.RoleChange = function(params){
    	 return fetch('/urCenter.do?uRole', params)
    },
//插件管理
	/**
     * 获取广告或友情链接列表
     */  
    api.prototype.getPlugList = function(params){
    	 return fetch('/plugin.do?list', params)
    },
    /**
     * 添加更改广告或友情链接
     */  
   api.prototype.saveOrUpdate = function(params){
    	 return fetch('/plugin.do?saveOrUpdate', params)
    },
    /*
     * 回填广告或友情链接
     */  
    api.prototype.getPlugInfo = function(params){
    	 return fetch('/plugin.do?info', params)
    },
     /*
     * 删除广告或友情链接
     */  
    api.prototype.delPlug = function(params){
    	 return fetch('/plugin.do?del', params)
    },
	/**
     * 客服插件保存
     */  
    api.prototype.saveOS = function(params){
    	 return fetch('/plugin.do?set', params)
    },
    /**
     * 客服插件页面 的回填
     */  
    api.prototype.getOS = function(params){
    	 return fetch('/plugin.do?get', params)
    },
    /**
	 * 页面搜索
	 */
	api.prototype.searchItems = function(params) {
		return fetch('/tem.do?search', params)
	},
//我的服务-个人资料	
	/**
	 * 获取个人信息（用户头像和余额）
	 */
	api.prototype.personInfoGet= function(params) {
		return fetch('/urmge.do?get', params)
	},
	/**
	 * 获取网站开通和域名信息
	 */
	api.prototype.companyCat = function(params) {
		return fetch('/company2.do?cat', params)
	},
	/**
	 * 初始化企业开通信息
	 */
	api.prototype.companyInfoSet = function(params) {
		return fetch('/domain.do?set', params)
	},
	/**
	 * 获取网站开通和域名信息
	 */
	api.prototype.webInfoSet = function(params) {
		return fetch('/domain.do?get', params)
	},
	/**
	 * 绑定新域名
	 */
	api.prototype.newUrlSet = function(params) {
		return fetch('/domain.do?add', params)
	},	
	/**
	 * 删除绑定的域名
	 */
	api.prototype.urlDel= function(params) {
		return fetch('/domain.do?del', params)
	},
	
	/**
	 * 刷新绑定的域名
	 */
	api.prototype.urlRefresh= function(params) {
		return fetch('/domain.do?refresh', params)
	},	
	/**
	 * 解绑企业信息	
	 */
	api.prototype.UnbindCompyInfo = function(params){
		return fetch('/company2.do?untie', params);
	},
	/**
	 *判断该企业管理员的数量
	 */
	api.prototype.AdminCount = function(params){
		return fetch('/urCenter.do?adminCount', params);
	},
	/*
	 *func:用户取消申请加入企业
	 * result:(0:初始状态可以创建或者申请加入/1:申请中可以取消申请/2:申请成功可以解绑)
	 * */
	api.prototype.JoinCompyOrNot = function(params){
		return fetch('/urCenter.do?gas', params);
	},
	/*
	 *func:用户取消申请加入企业
	 *result:(0:初始状态可以创建或者申请加入/1:申请中可以取消申请/2:申请成功可以解绑)  
	 * */
	api.prototype.CancelJoinCompy = function(params){
		return fetch('/urCenter.do?cancelApply ', params);
	},
//我的服务-账号充值
	/**
	 * 充值
	 */
	api.prototype.recharge= function(params) {
		return fetch('/userTxn.do?payMoney', params)
	},
//我的服务-交易记录
	/**
	 * 交易记录
	 */
	api.prototype.transaction= function(params) {
		return fetch('/userTxn.do?tr', params)
	},

//系统设置-远程服务器FTP
	/**
	 * 修改或设置远程服务器FTP
	 */
	api.prototype.FTPset= function(params) {
		return fetch('/csite.do?set', params)
	},
    /**
	 * 获取远程服务器FTP
	 */
	api.prototype.FTPget= function(params) {
		return fetch('/csite.do?get', params)
	},
// 用户中心(推荐管理)
	/*列表所有数据接口*/
	api.prototype.allList = function(params){
    	return fetch('/rtop.do?resList', params);
    },
    /*点击回显接口(接口废弃)*/
   /* api.prototype.hotList = function(params){
    	return fetch('/rtop.do?list', params);
    },*/
    /* 设置内容推荐 */
   	api.prototype.listSet = function(params){
    	return fetch('/rtop.do?set', params);
    },
    /* 推荐内容排序 */
// 	api.prototype.listRank = function(params){
//  	return fetch('rtop.do?rank', params);
//  },
   	/* 删除左侧数量列表 */
//	api.prototype.deleteSingle = function(params){
//  	return fetch('rtop.do?del', params);
//  }
// 单页
   /*帮助中心*/
  /*	api.prototype.getSinglePage = function(params){
    	return fetch('res2.do?get', params);
   }*/
//平台网站页面内容加载（平台）    
     /**
	 * id: 栏目id
	 * type: 栏目类型id
	 * func: 根据栏目加载页面内容
	 */
    api.prototype.loadPageCont = function(params){
    	return fetch('/column2.do?mres', params);
    },
    /**
	 * cid: 企业id
	 * func: 根据企业id加载网站栏目[平台页面不传递  cid]
	 */
    api.prototype.loadSiteCol = function(params){
    	return fetch('/column2.do?layer', params);
    }
    /**
	 * pid: 栏目父类id
	 * func: 根据父id加载其下子类栏目列表
	 */
    api.prototype.loadColByPid = function(params){
    	return fetch('/column2.do?childnode', params);
    },
     /**
      *cid: 
	 * id:  栏目id
	 * func: 根据父id加载其内容(当前栏目内容或者其下第一个子栏目内容)
	 */
    api.prototype.loadCurOrFirstSonContent = function(params){
    	return fetch('/column2.do?mr', params);
    },
    //column2.do?mr  
    // 业务管理(订单管理)
	/*订单列表接口*/
	api.prototype.tableListPor = function(params){
    	return fetch('/order.do?list', params);
    },
    /*订单数量(订单管理)*/
   	api.prototype.orderNumPor = function(params){
    	return fetch('/order.do?odCount', params);
    },
	/*订单发货接口(发货列表)订单详情*/
	api.prototype.shippingList = function(params){
    	return fetch('/order.do?get', params);
    },
    /*订单发货接口(订单发货)*/
	api.prototype.shippingOrder = function(params){
    	return fetch('/order.do?csm', params);
    },
    /* 删除订单 */
	api.prototype.deleteOrder = function(params){
    	return fetch('/order.do?upSta', params);
    },
    /* 导出订单 */
	api.prototype.exportOrder = function(params){
    	return fetch('/order.do?exp', params);
   },
   /*修改订单信息*/
	api.prototype.editOrder = function(params){
    	return fetch('/odOther.do?update', params);
   },
    /*修改商品信息*/
	api.prototype.editGoods = function(params){
    	return fetch('/odOther.do?gc', params);
   },
   /*取消单个订单*/
   api.prototype.cancelOrder = function(params){
    	return fetch('/order.do?cancel ', params);
   },
    
//云站业务(云站内部超级管理)
 /*
  *params:flag( 状态：0待开通，1待处理    必填)currentpage(必填)；pagesize（必填）
  * */
	api.prototype.ListAllFtp = function(params){
		return fetch('/csite.do?list', params);
	},
 /*
  *params:uid，cid
  * */
	api.prototype.Admin = function(params){
		return fetch('/per.do?admin', params);
	},	
/*
  *params:flag( 状态：0待开通，1待处理    必填)currentpage(必填)；pagesize（必填）
  * */
	api.prototype.getDetailFtpInfo = function(params){
		return fetch('/csite.do?info', params);
	},
/*
  *func:更新提交FTP信息
  * */
	api.prototype.UpdateFtpInfo = function(params){
		return fetch('/csite.do?set', params);
	},
/*
 *fun: 
 **/
	api.prototype.judgeHaveOrNot = function(params){
		return fetch('/csite.do?chkDomain', params);
	},
/*
  * params: ftpId cid(目标企业)
  * fun: 复制模板
  * */
	api.prototype.CopyTemplate = function(params){
		return fetch('/copyTem.do?copy', params);
	},	
/*
  * params: ftpId cid(目标企业)
  * fun: 更新ftp状态(改变Nginx状态)
  * */
	api.prototype.ChangeFtpStatus = function(params){
		return fetch('/csite.do?us', params);
	},	
//我的客户(客户管理)	
  /*
  * params: ()
  * fun: 模板套餐类型
  * */
	api.prototype.modelTypeList = function(params){
		return fetch('/ct.do?tc',params);
	},	
	/*
  * params: ()
  * fun: 模板套餐类型
  * */
	api.prototype.searchModelId = function(params){
		return fetch('/tem.do?findNo',params);
	},	
	/*
  * params: ()
  * fun: 计算模板套餐金额
  * */
	api.prototype.modelCount = function(params){
		return fetch('/tem.do?count',params);
	},
/*
  * params: object(添加客户)
  * fun: 添加客户信息
  * */
	api.prototype.addCustomInfo = function(params){
		return fetch('/agency.do?add', params);
	},	
	/*
  * params: id
  * fun: 查询客户信息
  * */
	api.prototype.searchCustomInfo = function(params){
		return fetch('/agency.do?get', params);
	},	
	/*
  * params: object(添加客户)
  * fun: 代理商增加客户列表
  * */
	api.prototype.customInfoList = function(params){
		return fetch('/agency.do?list', params);
	},	
	/*
	 * params: psw id
	 * fun: 修改客户密码、修改会员信息(业务管理-会员管理)
	 * */
	api.prototype.modifyInfoComm = function(params){
		return fetch('/urmge.do?update', params);
	},	
//网站模板切换
/*
 *params: 
 *fun:根据给定当前模板id切换模板
 * **/
    api.prototype.toggleMod = function(params){
		return fetch('/tem.do?neighbor', params);
	},
//预览模板
/* params: cid
 * func: 判断企业是否已经拥有模板 
 * **/
    api.prototype.CompanyHaveTemOrNot = function(params){
		return fetch('/tem.do?isHavaTem', params);
	},
/* params: cid，rid
 * func: 判断模板模板是否添加测试数据 
 * **/
    api.prototype.IsCopyData = function(params){
		return fetch('/tem.do?isCopyData', params);
	}, 
	
// banner管理
	/* banner列表 */
	api.prototype.bannerList= function(params){
    	return fetch('/banner.do?list', params);
    },
    /* banner编辑 */
    api.prototype.bannerEdit= function(params){
    	return fetch('/banner.do?list', params);
    },
    /* 添加banner */
    api.prototype.addBanner= function(params){
    	return fetch('/banner.do?add', params);
    },
    /* 添加或编辑banner */
    api.prototype.addOReditBanner= function(params){
    	return fetch('/banner.do?addORedit', params);
    },
    /* 删除banner */
    api.prototype.delBanner= function(params){
    	return fetch('/banner.do?del', params);
    },
    /* 移动banner */
    api.prototype.moveBanner= function(params){
    	return fetch('/banner.do?move', params);
    },
//支付宝支付
	/* 支付宝支付 */
    api.prototype.alipay= function(params){
    	return fetch('/alipay.do?aliToPay', params);
    },
	/* 清除上一个支付宝订单*/
    api.prototype.clearOrder= function(params){
    	return fetch('/alipay.do?tradeClose', params);
    },
//topTen Banner订制接口

	/* 
	 *  params: {cid*:''[用户中心必传] ,cat*:''[0:topTen ; 1: banner]}
	 *  func: 标签列表
	 * */
    api.prototype.TBlistAllLabel= function(params){
    	return fetch('/rtop2.do?labelLst', params);
    },
	/* 
	 *  params: {cid*:''[用户中心必传] ,rtid*:''[标签ID],cat*:''[0:topTen ; 1: banner]}
	 *  func: 资源top(资源推荐管理左侧)|banner列表
	 * */
    api.prototype.TBlistByLabel= function(params){
    	return fetch('/rtop2.do?list', params);
    },
    /* 
	 *  params: {cid*:''[用户中心必传] ,rtid*:''[标签ID],rid*:''[如果是批量添加,id之间用逗号隔开]}
	 *  func: 设置推荐内容
	 * */
    api.prototype.addHotListsToLabel= function(params){
    	return fetch('/rtop2.do?set', params);
    },
    /* 
	 *  params: {id*:''[] ,rtid*:''[],flag*:''[asc.升序，desc.降序 ]}
	 *  func: topTen|banner排序
	 * */
    api.prototype.rankListsToLabel= function(params){
    	return fetch('/rtop2.do?rank', params);
    },
     /* 
	 *  params: {id*:''[ 如果是批量删除，中间用逗号隔开] }
	 *  func: 删除推荐内容|banner
	 * */
    api.prototype.delListsByIds= function(params){
    	return fetch('/rtop2.do?del', params);
    },
       /* 
	 *  params: {cid*:''[用户中心必传] ,rtid*:''[标签ID],currentpage*:''[当前页 ],pagesize*:''[页面大小]}
	 *  func: topTen中资源列表
	 * */
    api.prototype.listsResourcesTop= function(params){
    	return fetch('/rtop2.do?resLst', params);
    },
      /* 
	 *  params: {
		*   "id": "id值,编辑有，新增无",
		*  "rtid": "tb_res_top.id，编辑有，新增无",
		*  "img": "banner图片",
		*    "url": "banner超链接",
		*    "text1": "文字1",
		*    "text2": "文字2",
		*    "text3": "文字3",
		*    "text4": "文字4",
		*    "text5": "文字5",
		*	}
	 *   func: 新增|编辑banner
	 * */
    api.prototype.addOrEditTopOrBannerInfo= function(params){
    	return fetch('/rtop2.do?addORedit', params);
    },
    /**
     * params: {cid*:''[用户中心必传] ,label*:''[标签标号]}
     * func: 前端展示的topTen|banner信息
     **/
    api.prototype.showTopFrontInfo= function(params){
    	return fetch('/rtop2.do?topLst', params);
    },
 	/* 
	 *  params: { id(tb_res_top_ln.id    必填)，img（tb_res_top_ln.img，必填）}
	 *  func: 排行管理添加图片 
	 * */
    api.prototype.TopImg = function(params){
    	return fetch('/rtop2.do?topImg', params);
    },

    /* 
	 *  params: {  cid(tb_company.id),cat(分类,0:top;100:banner)}
	 *  func: 获取所有的排行信息 
	 * */
    api.prototype.allTopTen = function(params){
    	return fetch('/rtop2.do?all', params);
    },
    /*
     * params: 
     * func: 清除新创建网站空间缓存
     * */
    api.prototype.delCache = function(params){
    	return fetch('/sys.do?clear', params);
    },
    /* 
	 *  params: {  cid(tb_company.id),cat(分类,0:top;100:banner)}
	 *  func: 获取所有的排行信息 
	 * */
    api.prototype.history = function(params){
    	return fetch('/res2.do?history', params);
    },
    
    /**
     * 支付临时接口
     * ***/
    api.prototype.payApi = function(){
    	return "http://www.baijiekj.com/cs/";
//  	return "http://cs1.baijiekj.com/cs/";
//    	return "http://172.19.0.26:8080/cs/"
    },
    /**
     * 删除商品新闻分类
     * ***/
    api.prototype.delClass = function(params){
    	return fetch('/ct.do?del', params);
    },  
    /*模板测试接口汇合gzx*/
    api.prototype.BannerList = function(params){
    	return fetch('/r/lst.do', params);
    }
    
//----------------------------------------------------------------//
    
    /**
     * res列表
     */
    ,api.prototype.getResList = function(params){
    	return fetch('/r.do?lst', params);
    }
    ,api.prototype.getAdvResList = function(){
    	return instance.defaults.baseURL+'r.do?lst';
    }
    /**
     * 栏目/菜单
     * params[cid flag:1 (查找SEO信息否则为查找所有栏目) id(对应查找栏目的seo信息否则为网站设置seo信息) rid(详情页查寻seo信息条件)]
     */
    ,api.prototype.getMenuList = function(params){
    	return fetch('/m.do?lst', params);
    } 
    /**
     * 公司信息
     */
    ,api.prototype.getCompList = function(params){
    	return fetch('/c.do?lst', params);
    } 
    /**
     * 获取topTen
     */
    ,api.prototype.getTopListU = function(params){
    	return fetch('/rtop2.do?getTop', params);
    } 
    /**
     * 设置topTen
     */
    ,api.prototype.setTopListU = function(params){
    	return fetch('/rtop2.do?setTop', params);
    }
    /**
     * 获取源码
     */
    ,api.prototype.editeCode = function(params){
    	return fetch('http://cs1.baijiekj.com:3000/node/edit', params);
    }
    /**
     * 修改源码
     */
    ,api.prototype.saveCode = function(params){
    	return fetch('http://cs1.baijiekj.com:3000/node/edited', params);
    }
    /**
     * 还原源码
     */
    ,api.prototype.restoreCode = function(params){
    	return fetch('http://cs1.baijiekj.com:3000/node/unedit', params);
    }
    window['api'] =new api();
})(jQuery);

  