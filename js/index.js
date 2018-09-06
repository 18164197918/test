//首页轮播图
new Vue({
	data: function(){
		return {
			mid:'',
   			cid:null,
   			number:'',//显示文字个数
   			label:'idx_bnr_001',
   			bannerParams:{},
   			bannerList_one:[],
		}
	},
	methods:{
		  getCid: function(){
		  	 if(getQueryString('id')){
		  	 	this.mid = getQueryString('id'); 
		  	 }
		      if(getQueryString('cmpid', 'module')){
		        this.cid = getQueryString('cmpid', 'module');
		      }
		    },
		    /*获取页面静态设置参数*/
		    getTopTenParams: function(className){
		    	 this.bannerParams = getTopTenValue(className,this.label);//公共方法comm.js
		    	 this.number = 	this.bannerParams && this.bannerParams.number;
		    },
			//获取首页的轮播图
			getBanList:function() { // banner列表
				var _this = this;
			      //this.cid = '6608e90675164229a916c8a26f00ed5f';//仅供测试使用
			      //this.label = this.bannerParams && this.bannerParams.id;
			      api.showTopFrontInfo({
			    	  cid: _this.cid,
			    	  label: _this.label
			      }).then(function(res){
			    	  if(res.success){
			    	  	var islinkurl=/[a-zA-z]+(:\/\/)[^\s]*/ig;
			    	  	for(var i=0; i<res.data.length;i++){
			    	  		if(res.data[i].url){
			    	  			//完整的网址不做处理
			    	  			if(islinkurl.test(res.data[i].url)){
			    	  			//加上http://	
			    	  			} else{
			    	  				res.data[i].url="http://"+res.data[i].url;
			    	  			}
			    	  		}else{
			    	  			res.data[i].url="javascript:void(0)";
			    	  		}
			    	  	}
			    		  _this.bannerList_one = res.data && res.data;
			    		  
			    	  }
			      }).catch(function(error){
			    	  console.log(error);
			      })
			},
		
	},
	 watch:{
		  bannerParams:function(){
		 	  var _this = this;
		 	  this.$nextTick(function(){
		 	  	_this.getBanList();//加载数据
		 	  });
		 },
		 bannerList_one:function(){
		 	  var _this = this;
		 	  this.$nextTick(function(){
		 			$('#slide-index').slideCarsousel({slideType:'3d',indicatorEvent:'mouseover'});
		 	  });
		 }
	  },
	mounted: function(){
		this.getCid();
		this.getTopTenParams('x-banner-sign');
	}
}).$mount("#indexBanner");	


/*首页topTen   
  海量模板任你选 idx_top_001
  我们的服务套餐 idx_top_002
  最近动态 idx_top_003
 * */
var topTen_vm=new Vue({
	
	data:function (){
		return {
			cid:'',
			id:"8cf149bc249046e09bab3bb4b8e2f729",//当前栏目id(行业动态)[需要用户中心动态选择在前端显示的栏目]
			label1:"idx_top_001",//必填
			label2:"idx_top_002",//必填
			label3:"idx_top_003",//必填
		//	label4:"idx_top_004",//必填
			//新闻
			number1:0,//第一个 topTen最多显示条目
			number2:0,//第二个 topTen最多显示条目
			number3:0,//第三个 topTen最多显示条目
		//	number4:0,//第四个 topTen最多显示条目
		    topParams1:{},//获取第一个 topTen信息的参数
		    topParams2:{},//获取第二个topTen信息的参数
		    topParams3:{},//获取第三个opTen信息的参数
		  //  topParams4:{},//获取第四个opTen信息的参数
		  	mdList:[],//海量模板
		  	topList:[],//最新动态
		   // newsTopTen_one:[],
		    prodList:[]//套餐服务
			//ptTopTen_one:[],
			//prodTopTen_one:[],
			//photoList:null,
			//photoArr:[],
			//相册
	    ///  type:'25174661586300305',//相册类型
	     // ptTop_name: '',
	     // ptTop_link: '',
	    //  ptTop_mid: '',
	      //产品
		}
	},
	methods:{
	    getCid: function(){
	      if(getQueryString('cmpid', 'module')){
	        this.cid = getQueryString('cmpid', 'module');
	      }
	    },
	    /*获取页面静态设置参数*/
	    getTopTenParams: function(className){
	    	 this.topParams1 = getTopTenValue(className,this.label1);//公共方法comm.js
	    	 this.topParams2 = getTopTenValue(className,this.label2);
	    	 this.topParams3 = getTopTenValue(className,this.label3);
	    	// this.topParams4 = getTopTenValue(className,this.label4);
	    	 this.number1 = this.topParams1 && this.topParams1.number;
	    	 this.number2 = this.topParams2 && this.topParams2.number;
	    	 this.number3 = this.topParams3 && this.topParams3.number;
	    	 //this.number4 = this.topParams3 && this.topParams4.number;
	    },
	    loadContent: function(){
	      var _this = this;
	      var  params={
	      	   cid:this.cid,
	      	   cat:0,  //分类,0:top;100:banner
	      };
	      api.allTopTen(params).then(function(res){
	    	  if(res.success){
                  for(var i=0;i<res.data.length;i++){
                  	 if(res.data[i].label=="idx_top_001"){
                  	 	_this.mdList=res.data[i].rtls;
                  	 
                  	 }
                  	 if(res.data[i].label=="idx_top_002"){
                  	 	 _this.prodList=res.data[i].rtls;
                  	 }
                  	 if(res.data[i].label=="idx_top_003"){
                  	 	 _this.topList=res.data[i].rtls;
                  	 }
//                	 if(res.data[i].label=="idx_top_004"){
//                	 	 _this.prodTopTen_one=res.data[i].rtls;
//                	 }
                  }
	    	  }
	      }).catch(function(error){
	    	  console.log(error);
	      })
	    }
	},
    watch:{
	    topParams3:function(){
		 	  var _this = this;
		 	  this.$nextTick(function(){
		 	  	_this.loadContent();//加载数据
		 	  });
	    },
	    topList: function(){
		 	  var _this = this;
		 	  this.$nextTick(function(){
		 			$('#slide3d').slideCarsousel({slideType:'3d',indicatorEvent:'mouseover'});
		 	  });
	    }
    },
	  mounted: function(){
	    this.getCid();
	    this.getTopTenParams('x-top-sign');
	  }
	
	
}).$mount("#allTopTen");
	//热门动态(公司新闻)
//	new Vue({
//		data: function(){
//			return {
//				id:"8cf149bc249046e09bab3bb4b8e2f729",//当前栏目id(行业动态)[需要用户中心动态选择在前端显示的栏目]
//				mid: '8cf149bc249046e09bab3bb4b8e2f729',//新闻类型(cat)
//				bk: 10,//板块(热门10、精品、推荐)
//				topList:[],//topTen列表//img  latestDetail.html,
//				totalMods: 0,
//			}
//		},
//		methods:{
//			subUrl: function(){//通过访问url跳转后（解析url查询）
//				var _this = this;
//				var url = window.location.href;
//				var search = window.location.search || "";
//				if(search){
//					var trans = search.substring(1) || "";
//					var arry = trans.split("&") || [];
//					for(var i=0; i<arry.length ; i++){
//						var cur = (arry[i].indexOf("=")>-1) ? arry[i].split("=") : "";
//						(cur[0] == 'id') && (_this.id = cur[1]);
//					//	(cur[0] == 'pid') && (_this.pid = cur[1]);
//					}
//				}
//			},
//			loadContent: function(){
//				var _this = this;
//				if(_this.bk){
//				    api.hotList({//加载top十的内容
//	//					cid: _this.cid,{当前是百捷集团没有cid}
//						mid: _this.mid,
//						bk: _this.bk
//					}).then(function(res){
//						if(res.success){
//							_this.topList = res.data && res.data;
//							_this.totalMods=res.data.length;
//						}
//		   			}).catch(function(error){
//		   					console.log(error);
//		   			})
//	   			}else{
////	   				alert("未找到栏目相关内容加载！")
//					$.CwsPopup.Alert("提示","未找到栏目相关内容加载！");
//	   			}
//			}
//		},
//		watch: {
//			 topList: function(){
//			 	  var _this = this;
//			 	  this.$nextTick(function(){
//			 	  	    $('#slide3d').slideCarsousel({slideType:'3d',indicatorEvent:'mouseover'});//行业动态滑动效果
//			 	  });
//			 }
//		},
//		mounted: function(){
//			this.loadContent();//加载数据
//		}
//	}).$mount("#hotNews");
	
	//加载主体内容区域
//	new Vue({
//		data: function(){
//			return {
//				mdList:[]//模板列表
//			//	model_link:''
//			}
//		},
//		methods:{
//			listModel: function(){//列出模板
//				var _this = this;
//				api.ListModList({currentpage: 1 ,pagesize: 6}).then(function(res){
//					var data = res.data;
//					var len = data && data.length;
//					if(len > 0){
//						var len=res.data[0].length;
//						for(var i=0; i<len; i++){
//							var arr=res.data[0][i].cat;
//							var str=arr.join(',');
//							res.data[0][i].cat=str;
//						}
//						_this.mdList = res.data[0];
//					}else{
//						console.log("没有数据");
//					}
//				}).catch(function(err){
//					console.log(err);
//				})
//			}
//		},
//		mounted: function(){
//			this.listModel();
//		}
//	}).$mount("#siteModel")



