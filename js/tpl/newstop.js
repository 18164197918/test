$("#newstop").load(fontBaseUrl+'tpl/newstop.tpl', function(){
	new Vue({
		data: function(){
			return {
				cid:null,//当前企业
				id:"",//当前新闻ID
				mid: "",//栏目类型id 
//				bk:10,//板块(热门10、精品、推荐)
				topList:[],//topTen列表
				label:"news_top_002",
				number:'',//最多显示条目
			    topParams:{},//获取topTen信息的参数
			    topTenParams:[],//topten参数
			    newsTopTen_one:[],
			    one_name:''
			}
		},
		methods:{
			subUrl: function(){//通过访问url跳转后（解析url查询）
					var _this = this;
					var url = window.location.href;
					var search = window.location.search || "";
					if(search){
						var trans = search.substring(1) || "";
						var arry = trans.split("&") || [];
						for(var i=0; i<arry.length ; i++){
							var cur = (arry[i].indexOf("=")>-1) ? arry[i].split("=") : "";
							(cur[0] == 'id') && (_this.id = cur[1]);
							//(cur[0] == 'pid') && (_this.mid = cur[1]);
							_this.mid = getQueryString("pid") || getQueryString("id");
							//(cur[0] == 'pname') && (_this.pname = cur[1]);
						}
					}
			},
		    /*获取页面静态设置参数*/
		    getTopTenParams: function(className){
		    	 this.topParams = getTopTenValue(className,this.label);//公共方法comm.js
		    	 this.number = this.topParams && this.topParams.number;
		    },
		    loadContent: function(){
		      var _this = this;
		      var params={
		      	  cid:null,
		      	  label:this.label,
		      }
		      api.showTopFrontInfo(params).then(function(res){
		    	  if(res.success){
		    		  _this.topList = res.data && res.data;
		    	  }
		      }).catch(function(error){
		    	  console.log(error);
		      })
		    }
		},
		watch:{
			  topParams:function(){
			 	  var _this = this;
			 	  this.$nextTick(function(){
			 	  	_this.loadContent();//加载数据
			 	  });
			 }
		},
		mounted: function(){
//			if(getUserCookie()){
//				this.cid=getUserCookie().cid && '';
//			}
			this.subUrl();
//			this.loadTopTenNews();
            this.getTopTenParams('x-top-sign');   
		}
	}).$mount('#newstop');
});


$("#newstop2").load(fontBaseUrl+'tpl/newstop.tpl', function(){
	
	new Vue({
		data: function(){
			return {
				cid: '',//当前企业
				id:"",//当前新闻ID
				mid: "",//栏目类型id 
//				bk:30,//板块(热门10、精品、推荐)
				topList:[],//topTen列表
				label:"news_top_003",
				number:'',//最多显示条目
			    topParams:{},//获取topTen信息的参数
			    topTenParams:[],//topten参数
			    newsTopTen_one:[],
			    one_name:''
			}
		},
		methods:{
			subUrl: function(){//通过访问url跳转后（解析url查询）
					var _this = this;
					var url = window.location.href;
					var search = window.location.search || "";
					if(search){
						var trans = search.substring(1) || "";
						var arry = trans.split("&") || [];
						for(var i=0; i<arry.length ; i++){
							var cur = (arry[i].indexOf("=")>-1) ? arry[i].split("=") : "";
							(cur[0] == 'id') && (_this.id = cur[1]);
							//(cur[0] == 'pid') && (_this.mid = cur[1]);
							_this.mid = getQueryString("pid") || getQueryString("id");
							//(cur[0] == 'pname') && (_this.pname = cur[1]);
						}
					}
			},
//			loadTopTenNews: function(){
//				var _this = this;
//				if(_this.bk){
//					api.hotList({//加载top十的内容
//						cid: _this.cid,
//						mid: _this.mid,
//						bk: _this.bk
//					}).then(function(res){
//						if(res.success){
//							_this.topList = res.data && res.data;
//							console.log(res);
//						}
//		   			}).catch(function(error){
//		   					console.log(error);
//		   			})
////			        api.hotList({//加载top十的内容
////							cid: _this.cid,
////							bk: _this.bk
////					}).then(function(res){
////						if(res.success){
////							_this.topList = res.data && res.data;
////						}
////		   			}).catch(function(error){
////		   					console.log(error);
////		   			})
//		   		}
//			}
		    /*获取页面静态设置参数*/
		    getTopTenParams: function(className){
		    	 this.topParams = getTopTenValue(className,this.label);//公共方法comm.js
		    	 this.number = this.topParams && this.topParams.number;
		    },
		    loadContent: function(){
		      var _this = this;
		      var params={
		      	  cid:null,
		      	  label:this.label,
		      }
		      api.showTopFrontInfo(params).then(function(res){
		    	  if(res.success){
		    		  _this.topList = res.data && res.data;
		    	  }
		      }).catch(function(error){
		    	  console.log(error);
		      })
		    }
		},
		watch:{
			  topParams:function(){
			 	  var _this = this;
			 	  this.$nextTick(function(){
			 	  	_this.loadContent();//加载数据
			 	  });
			 }
		},
		mounted: function(){
//			if(getUserCookie()){
//				this.cid=getUserCookie().cid && '';
//			}
			this.subUrl();
//			this.loadTopTenNews();
 			this.getTopTenParams('x-top-sign');
		}
	}).$mount('#newstop2');
});
