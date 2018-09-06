	//列表页数据加载（content）
 var goodList_vm=new Vue({
			data:{
//				type:'25174661566300296',//网站模板页面栏目类型id
				col_id:'36449d9f2d254430b54a7ae6ec827bab',
	 			linesPerPage1:[
	              {page: '10', selected: 'selected'},
	              {page: '20', selected: ''},
	              {page: '30', selected: ''},
	              {page: '50', selected: ''}
	 			],
	 			currentLines:'0',//当前请求行
	 			totalPages: '',//总页数
	 			tagsKind:[],//查询标签分类
	 			mdType: [],//模板类型
	 			kindSty:[],//风格样式
	 			colorSty: [],//颜色分类
	 			professon:[],//行业
	 			mdList:[],//模板列表
	 			upPageUrl:'',  //上一页翻页url
	 			downPageUrl:'',  //下一页翻页url
	 			firstPageUrl:'',  //第一页翻页url
	 			lastPageUrl:'',  //最后一页翻页url
	 			param:{//页面判别参数
	 				type:'',//基本类型
	 				trade:'',//行业类型
	 				fg:'',//风格样式
	 				ys:'',//颜色
	 				currentpage:'',//当前页面
	 				pagesize:''//页面内容数量
	 			},
	 			act_type:'',//当前激活基本类型
	 			act_trade:'',//当前激活行业类型
	 			act_fg:'',//当前激活风格样式
	 			act_ys:'',//当前激活颜色
	 			param_trans:{},//传递参数
	 			jumpPage:'',//跳转页数
 				keywords:'',	 //搜索关键词
	 	},
	 	methods:{
	 		toggle: function(){
	 			$(".more").toggleClass('more-active');
	 		},
	 		//获取用户信息
			getUserInfo: function(){
				var cid = '';
				if(getUserCookie()){
					cid=getUserCookie().cid ;
				}
				if(cid){
				 	this.cid = cid;
				}
				if(getQueryString('id')){
					this.col_id = getQueryString('id');
				}
			},
			//重置本地存储信息
//			chageLocalStorge:function(){
//				if(getQueryString('tpEntry')){//点击类型开始
//					if(getQueryString('type') || getQueryString('type') == ''){
//						localStorage.setItem('type',getQueryString('type'));
//						localStorage.setItem('type_cat',getQueryString('cat'));
//					}else if(getQueryString('trade') || getQueryString('trade') =='' ){
//						localStorage.setItem('trade',getQueryString('trade'));
//						localStorage.setItem('trade_cat',getQueryString('cat'));
//					}else if(getQueryString('fg') || getQueryString('fg') == ''){
//						localStorage.setItem('fg',getQueryString('fg'));
//						localStorage.setItem('fg_cat',getQueryString('cat'));
//					}else if(getQueryString('ys') || getQueryString('ys') == '' ){
//						localStorage.setItem('ys',getQueryString('ys'));
//						localStorage.setItem('ys_cat',getQueryString('cat'));
//					}
//				}else{
//					localStorage.setItem('type','');
//					localStorage.setItem('type_cat','');
//					localStorage.setItem('trade','');
//					localStorage.setItem('trade_cat','');
//					localStorage.setItem('fg','');
//					localStorage.setItem('fg_cat','');
//					localStorage.setItem('ys','');
//					localStorage.setItem('ys_cat','');
//				}
//			},
			//获取参数
			getParamsFromUrl:function(){
//				 $.extend(this.param, {    //页面相关参数
//					type:localStorage.getItem('type'),//基本类型
//	 				trade:localStorage.getItem('trade'),//行业类型
//	 				fg:localStorage.getItem('fg'),//风格样式
//	 				ys:localStorage.getItem('ys'),//颜色
//	 				currentpage:getQueryString('crtpage')|| 1,//localStorage.getItem('currentpage'),//当前页面
//	 				pagesize:getQueryString('psize')|| this.linesPerPage1[0].page,//页面内容数量
//				 });

				 $.extend(this.param, {    //页面相关参数
					type:getQueryString('type') && getQueryString('type').split(",")[1] || null,//基本类型
	 				trade:getQueryString('trade') && getQueryString('trade').split(",")[1] || null,//行业类型
	 				fg: getQueryString('fg') && getQueryString('fg').split(",")[1] || null,//风格样式
	 				ys: getQueryString('ys') && getQueryString('ys').split(",")[1] || null,//颜色
	 				currentpage:getQueryString('crtpage')|| 1,//localStorage.getItem('currentpage'),//当前页面
	 				pagesize:getQueryString('psize')|| this.linesPerPage1[0].page,//页面内容数量
				 });
				 
				 
				 console.log("当前页面参数集合*************")
				 console.log(this.param)
				 //重置每页条数(/*链接式分页 */)
				 for(var i =0;i< this.linesPerPage1.length; i++){
					 if(this.linesPerPage1[i].page == this.param.pagesize){
						 this.linesPerPage1[i].selected = 'selected';
					 }else{
						 this.linesPerPage1[i].selected = '';
					 }
				 }
//				 $.extend(this.param_trans, {//后台需要参数形式
//						type: localStorage.getItem('type') && localStorage.getItem('type') || '',//基本类型
//		 				trade:localStorage.getItem('trade') && localStorage.getItem('trade').replace(/[|]+/g,'`') || '',//行业类型
//		 				fg:localStorage.getItem('fg') && localStorage.getItem('fg') || '',//风格样式
//		 				ys:localStorage.getItem('ys') && localStorage.getItem('ys').split(",")[1]+"," +"#"+localStorage.getItem('ys').split(",")[1] || '',//颜色
//		 				currentpage:getQueryString('crtpage') || 1,//localStorage.getItem('currentpage'),//当前页面
//		 				pagesize:getQueryString('psize') || this.linesPerPage1[0].page//页面内容数量
//				 });
				
				
//				 $.extend(this.param_trans, {//后台需要参数形式
//						type:getQueryString('type') && (getQueryString('type').split(",")[1] != null || getQueryString('type').split(",")[1] != 'null') && getQueryString('type') || '',//基本类型
//		 				trade:getQueryString('trade') && getQueryString('type').split(",")[1] && getQueryString('type').split(",")[0]+','+ getQueryString('trade').split(",")[1].replace(/[|]+/g,'`') || '',//行业类型
//		 				fg:getQueryString('fg') && getQueryString('fg').split(",")[1]  && getQueryString('fg') || '',//风格样式
//		 				ys:getQueryString('ys') && getQueryString('ys').split(",")[0]+",#"+getQueryString('ys').split(",")[1] || '',//颜色
//		 				currentpage:getQueryString('crtpage') || 1,//localStorage.getItem('currentpage'),//当前页面
//		 				pagesize:getQueryString('psize') || this.linesPerPage1[0].page//页面内容数量
//				 });
//				 

					 if(getQueryString('type')){
	//				 	console.log(type(getQueryString('type').split(",")[1])
					 	if(getQueryString('type').split(",")[1] != null && getQueryString('type').split(",")[1] != 'null'){
					 		this.param_trans.type = getQueryString('type');
					 	}else{
					 		this.param_trans.type = '';
					 	}
					 }
					 if(getQueryString('trade')){
					 	if(getQueryString('trade').split(",")[1] != null &&  getQueryString('trade').split(",")[1] != 'null'){
					 		this.param_trans.trade = getQueryString('trade').split(",")[0]+','+ getQueryString('trade').split(",")[1].replace(/[|]+/g,'`');
					 	}else{
					 		this.param_trans.trade = '';
					 	}
					 }
					 if(getQueryString('fg')){
					 	if(getQueryString('fg').split(",")[1] != null && getQueryString('fg').split(",")[1] != 'null'){
					 		this.param_trans.fg = getQueryString('fg');
					 	}else{
					 		this.param_trans.fg = '';
					 	}
					 }
					 if(getQueryString('ys')){
					 	if(getQueryString('ys').split(",")[1] != null && getQueryString('ys').split(",")[1] != 'null'){
					 		this.param_trans.ys = getQueryString('ys').split(",")[0]+",#"+getQueryString('ys').split(",")[1];
					 	}else{
					 		this.param_trans.ys = '';
					 	}
					 }
				 	 $.extend(this.param_trans, {//后台需要参数形式
		 				currentpage:getQueryString('crtpage') || 1,//localStorage.getItem('currentpage'),//当前页面
		 				pagesize:getQueryString('psize') || this.linesPerPage1[0].page//页面内容数量
				 	});
				if(getQueryString('kw')){
					this.search();//通过查询跳转
				}else{
					 this.loadModList();
				}
				
				
				
			},
			stringToArray:function(arr,str,cat){//工具方法
	 			var str_arr = str.split(',');
	 			for(var i=0; i< str_arr.length; i++){
	 				var name_val = str_arr[i];
	 				if(cat ==  '3040000'){//颜色处理'#'
	 					name_val = name_val.replace(/[#]+/g,'');
	 				}
	 				var obj = {
	 					cat: cat,
	 					name: name_val
	 				}
	 				arr.push(obj)
	 			}
	 		},
			//获取标签分类
			loadModType:function(){//加载模板类型分类
	 			var _this = this;
	 			api.ListModType().then(function(res){
 					var dta =  res.data;
	 				var len = dta && dta.length;
	 				if( len > 0){
	 					_this.tagsKind = dta;
	 					for(var i=0; i<len; i++){
	 						switch (dta[i].label){
	 							case '基本类型'://模板类型
	 								_this.stringToArray(_this.mdType,dta[i].tagName, dta[i].cat);
	 								_this.type_cat = dta[i].cat;
	 							break;
	 							case '风格样式'://风格样式
	 								_this.stringToArray(_this.kindSty,dta[i].tagName, dta[i].cat);
	 								_this.fg_cat = dta[i].cat;
	 							break;
	 							case '行业分类'://行业
	 								_this.stringToArray(_this.professon,dta[i].tagName, dta[i].cat);
	 								_this.trade_cat= dta[i].cat;
	 							break;
	 							case '色彩分类'://模板颜色分类
	 								_this.stringToArray(_this.colorSty,dta[i].tagName, dta[i].cat);
	 								_this.ys_cat= dta[i].cat;
	 							break;
	 							default:
	 							break;
	 						}
	 					}
	 				}
	 			}).catch(function(err){
	 				console.log(err);
	 			});
	 		},
	 		loadModList: function(){//加载模板列表
	 			var _this = this;
	 			//当前页   页面大小
				api.ListModList(_this.param_trans).then(function(res){
					var data = res.data;
					var len = res.data.length;
					if(len > 0){
						var len=res.data[0].length;
						for(var i=0; i<len; i++){
							var arr=res.data[0][i].cat;
							var str=arr.join(' ');
							res.data[0][i].cat=str.replace(/[|]/g,' ');
						}
						_this.mdList = res.data[0];
			   	   	    _this.totalPages = data[1].pagenumber;//共几页
			   	   	    _this.totalMods = data[1].pagecount;//每页几个
			   	   	    if(data[1].pagecount< _this.param.pagesize){
			   	   	    	 _this.currentLines = data[1].pagecount;//一共多少条
			   	   	    }else{
			   	   	    	 _this.currentLines = _this.param.pagesize;//一共多少条
			   	   	    }
					}
				}).catch(function(err){
					console.log(err);
				})
	 		},
	 		//跳转页面函数
	 		srch_jump:function(){
//	 			window.open(fontBaseUrl+"goods/list.html?id="+this.col_id+"&crtpage="+1+"&psize="+jumpPagesize+"&tpEntry=true",'_self');
               //无法做成静态
//             _this.jumpPage=$("#jumpPg").val();
//	 			var jumpPage =Number(_this.jumpPage);
//             if( jumpPage > 0 && jumpPage <= this.totalPages){
               	//this.param.currentpage
               	this.keywords = $("#searchText").val() || '';
            	window.open(encodeURI(fontBaseUrl+"goods/list.html?id="+this.col_id+"&kw="+	this.keywords+"&type=3010000,"+this.param.type+"&fg=3020000,"+this.param.fg+"&trade=3030000,"+this.param.trade+"&ys=3040000,"+this.param.ys+"&crtpage=1"+"&psize="+this.param.pagesize+"&tpEntry=true"),'_self');
//          	   	encodeURI(fontBaseUrl+"goods/list.html?id="+col_id+"&type="+this.param.type+"&fg="+this.param.fg+"&trade="+this.param.trade+"&ys="+this.param.ys+"&crtpage=1"+"&psize="+this.param.pagesize+"&tpEntry=true")
//	 			}
	 		},
	 		search: function() {
				var _this = this;
				//获得所属分类的pkId 
				$("#searchText").val(getQueryString('kw')); 
				this.keywords = getQueryString('kw') || '';
				//this.param_trans
//				if(this.keywords){
					var data = {
						'pagesize': this.param_trans.pagesize,
						'currentpage': '1',
						'number': this.keywords,
						'fg':this.param_trans.fg || '',
						'trade': this.param_trans.trade || '',
						'type':this.param_trans.type || '',
						'ys':this.param_trans.ys || ''
					};
					_this.mdList =[];
					api.ListModList(data).then(function(res) {
						var data = res.data;
						var len = data[0].length;
						if(len > 0){
								_this.mdList = data[0];
					   	   	    _this.totalPages = data[1].pagenumber;//共几页
					   	   	    _this.totalMods = data[1].pagecount;//模板总数
					   	   	    _this.searchNum=data[1].pagecount;//模板总数
					   	   	    if(data[1].pagecount< _this.param.pagesize){
					   	   	    	 _this.currentLines = data[1].pagecount;//一共多少条
					   	   	    }else{
					   	   	    	 _this.currentLines = _this.param.pagesize;//一共多少条
					   	   	    }
						}else{
							console.log("没有数据");
						}
					}).catch(function(err) {
						console.log(err);
					});
//
//				}else{
////					_this.loadModList();
//				}
			},
			//直接Enter搜索
            EnterSignup:function(){
            	var _this=this;
            	document.onkeyup=function(event){
			 	 	var e = event || window.event || arguments.callee.caller.arguments[0];
				   	if(e && e.keyCode==13){ // enter 键
						   	 		_this.search();
					}
			   }
            },
			/*链接式分页 start*/
			selcValue: function(e){//切换每页显示多少行
				var jumpPagesize = Number( $(e.target).find("option:selected").val());
	 			window.open(fontBaseUrl+"goods/list.html?id="+this.col_id+"&crtpage="+1+"&psize="+jumpPagesize+"&tpEntry=true",'_self');
	 		},
	 		changeCurrentPage: function(e){//点击go进行页面切换
	 			var _this = this;
               //无法做成静态
               _this.jumpPage=$("#jumpPg").val();
	 			var jumpPage =Number(_this.jumpPage);
               if( jumpPage > 0 && jumpPage <= this.totalPages){
               	//this.param.currentpage
            	   	window.open(fontBaseUrl+"goods/list.html?id="+this.col_id+"&crtpage="+jumpPage+"&psize="+this.param.pagesize+"&tpEntry=true",'_self');
	 			}
	 		},
			togglePage:function(){//切换分页链接
				 //分页链接
				 var cur_page = this.param.currentpage;
				 var cur_pasize =this.param.pagesize;
				 if(cur_page -1 > 0){
					 var uppage = cur_page-1;
					 this.upPageUrl = fontBaseUrl+"goods/list.html?id="+this.col_id+"&crtpage="+uppage+"&psize="+cur_pasize+"&tpEntry=true";
				 }else{
					 this.upPageUrl = 'javascript:void(0)';
				 }
				 if(Number(cur_page -1+2) <= this.totalPages ){
					 var dowpage = cur_page-1+2 ;
					 this.downPageUrl = fontBaseUrl+"goods/list.html?id="+this.col_id+"&crtpage="+dowpage+"&psize="+cur_pasize+"&tpEntry=true";
				 }else{
					 this.downPageUrl = 'javascript:void(0)';
				 }
				 
				 if(cur_page != 1){
					 this.firstPageUrl = fontBaseUrl+"goods/list.html?id="+this.col_id+"&crtpage="+1+"&psize="+cur_pasize+"&tpEntry=true";
				 }else{
					 this.firstPageUrl = 'javascript:void(0)';
				 }
				 if(this.totalPages != 1 && this.totalPages != 0 && cur_page != this.totalPages){
					 this.lastPageUrl = fontBaseUrl+"goods/list.html?id="+this.col_id+"&crtpage="+this.totalPages+"&psize="+cur_pasize+"&tpEntry=true";
				 }else{
					 this.lastPageUrl = 'javascript:void(0)'; 
				 }
			}
	 		/*链接式分页 end*/
	 	},
		watch: {
			totalPages: function(){
			 	  var _this = this;
			 	  this.$nextTick(function(){
			 		  this.togglePage();//切换分页链接
			 	  });
			 },
	 		professon: function(){
			 	  var _this = this;
			 	  this.$nextTick(function(){
			 		  	var dom=$(".chooseTrade ul li");
			 		  	if(getQueryString('trade')){
			 		  		for(var i=0;i<dom.length;i++){
			 		  			if(dom[i].innerText==getQueryString('trade')){
			 		  				if(dom[i].offsetTop>20){
			 		  					$(".chooseTrade").addClass("more");
			 		  					$(".moreIcon").eq(1).show();
			 		  					$(".moreIcon").eq(0).hide();
			 		  				}else{
			 		  					$(".chooseTrade").removeClass("more");
			 		  					$(".moreIcon").eq(0).show();
			 		  					$(".moreIcon").eq(1).hide();
			 		  				}
			 		  			}
			 		  		}
			 		  	}
			 	  });
			 },
		},
	 	mounted:function(){
	 		this.getUserInfo();  	//获取用户信息
	 		//this.chageLocalStorge();//重置本地存储信息
	 		this.getParamsFromUrl();//获取本地相关参数参数
	 		this.loadModType();	    //列表模板类型
	 		//this.EnterSignup();
	 		//this.search();		    //查询功能&&列表模板
	 	}
	}).$mount("#prdcontent");
//高级搜索
function searchTem(){
	goodList_vm.srch_jump();
}

$(document).on('keyup','#searchText',function(e){
	var ev = e || window.event;
	ev.stopPropagation();
	ev.preventDefault();
	if(ev.keyCode == '13'){
		goodList_vm.srch_jump();
	}
	
});

//点击GO跳转页面
function changeCurrentPage(){
	goodList_vm.changeCurrentPage();
}
//function getStatus(){
//	alert(222)
//	goodList_vm.getActStatus();
//}
//截取url的参数值
	/* getUrlVars:function (name){ 
			if(arguments.length==0){
				var vars = [], hash; 
				var hashes = window.location.href.slice(window.location.href.indexOf('?')+1).split('&'); 
				for(var i = 0; i < hashes.length; i++) { 
					hash = hashes[i].split('='); 
					vars.push(hash[0]); 
					vars[hash[0]] = hash[1]; 
				} 
				return vars; 
			}else if(arguments.length==1){
				return getUrlVars()[name]; 
			}
		},*/
		/*search: function() {
			var _this = this;
			//获得所属分类的pkId 
			var params = this.getUrlVars(); 
			if(params[0] == "keywords"){
				//获得此中分类的id 
				var parentId = params[params[0]]; 
				//获得分类的名称 
				 this.productName = decodeURI(parentId); 
				var data = {
					'pagesize': this.params.pagesize,
					'currentpage':this.params.currentpage,
					'searchItems': this.productName
				};
				
				api.searchItems(data).then(function(res) {
					var data = res.data;
					var len = res.data.length;
					if(len > 0){
							_this.mdList = data[0];
				   	   	    _this.totalPages = data[1].pagenumber;//共几页
				   	   	    _this.totalMods = data[1].pagecount;//模板总数
				   	   	    _this.searchNum=data[1].pagecount;//模板总数
				   	   	    if(data[1].pagecount< _this.params.pagesize){
				   	   	    	 _this.currentLines = data[1].pagecount;//一共多少条
				   	   	    }else{
				   	   	    	 _this.currentLines = _this.params.pagesize;//一共多少条
				   	   	    }
					}else{
						console.log("没有数据");
					}
				}).catch(function(err) {
					console.log(err);
				});

			}else{
//				_this.loadModList();
			}
		},*/