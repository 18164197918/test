//新闻加载
 var newsList_vm=new Vue({
			el:'#latest',
			data: function(){
				return {
					id: '',//栏目ID
					newsCat:null,//新闻分类
					cid:null, //企业ID 
					//type: '',//栏目类型ID
					content:[],//栏目相关内容,
					news:{
						id:'',//列表ID
						author: '',//新闻作者
						img: '',//列表显示图
						title:'',//新闻列表题目
						vdesc:'',//新闻列表简述
						vtext:'',//新闻详情
						vfrom:''//原创、转载
					},
					newsList:[],//新闻列表
					linesPerPage: ['10','20','30','50'],
					currentLines:'0',//当前请求行
					totalPages: '',
					params: {
						jumppage:null,                          //跳转页码
	 					currentpage: '1',                        //当前页     必填
		 				pagesize: '10'                           //页面大小 必填
	 				},
	 				newsClassList:null, //新闻分类列表
	 				hotNewsList:null,   //热门
	 				fineNewsList:null,   //精品
	 				recommendNewsList:null,   //推荐
	 				
	 				label:"news_top_001",
	 				number:'',//最多显示条目
				    topParams:{},//获取topTen信息的参数
				    topTenParams:[],//topten参数
				    newsTopTen_one:[],
				    one_mid:'',
				    one_link:'',
				    one_name:'',
				    page:1,
				    
				    pageUrl:null,  //跳转翻页url
	 				upPageUrl:null,  //上一页翻页url
	 				downPageUrl:null,  //下一页翻页url
	 				firstPageUrl:null,  //第一页翻页url
	 				lastPageUrl:null,  //最后一页翻页url
				}
			},
			methods:{
				subUrl: function(){//通过访问url跳转后（解析url查询）
					if(getQueryString('id')){
						this.id = getQueryString('id');
					}
				},
				/*分页start*/
				selcValue: function(e){
		 			this.params.pagesize = $(e.target).find("option:selected").val();
		 			this.loadContant();//查询内容
		 		},
		 		changeCurrentPage: function(e){
                    var _this = this;
		 			if($.trim($('.currentpage').val()) != ''){
		 				
		 				if(Number($('.currentpage').val())<=0){
		 						_this.params.jumppage=_this.params.currentpage;
		 						return;
		 				}else  if(Number($('.currentpage').val()) <= Number( _this.totalPages)){
		 			    	  	_this.params.jumppage = $('.currentpage').val();
		 			    	  	_this.params.currentpage=_this.params.jumppage;
		 				window.location.href=fontBaseUrl+"news/list.html?id"+_this.id+"&page="+this.params.currentpage+"&cat="+_this.newsCat;
		 			    }else{
		 			        	_this.params.jumppage=_this.params.currentpage;
		 			        	return;
		 			    }
		 			}
		 		},
			    //截取url的参数值
				GetQueryString:function (name){
				     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
				     var r = window.location.search.substr(1).match(reg);
				     if(r!=null)return  unescape(r[2]); return null;
				},
				//获取新闻分类列表
				GetNewsClass:function (){
					var _this=this;
					if(getQueryString('cat')){
	 					this.newsCat=getQueryString('cat');
	 				}
					var _this=this;
					var params={
						cid:null,
						cat:1,
					}
					var cat=this.GetQueryString('cat');
					
					api.GetClass(params).then(function(res){
						if(res.success){
							_this.newsClassList=res.data;
							if(_this.newsCat){
									for(var i=0; i<res.data.length;i++){
										 if(cat==res.data[i].id){
											$('.newsStyleI').removeClass('on');	
											$('.newsStyleI').eq(i).addClass('on');
											_this.newsCat=res.data[i].id;
										 }
									}
							}else{
								$('.newsStyleI').removeClass('on');	
								$('.newsStyleI').eq(0).addClass('on');
								_this.newsCat=res.data[0].id;
								
							}
							_this.loadContant();
						}
					}).catch(function(err){
						console.log(err);
					})
				},
				//获取翻页URL
				getPageUrl:function(){
					var _this=this;
		 			//上一页
                    var page=Number(_this.params.currentpage)-1;
		 			if(page <1){
		 				this.upPageUrl='javascript:void(0)';
		 			}else{
		 				this.upPageUrl=fontBaseUrl+"news/list.html?id"+this.id+"&cat="+this.newsCat+"&page="+page+"#myTab";
		 			}
		 			//第一页
		 			if(_this.params.currentpage==1){
		 				this.firstPageUrl='javascript:void(0)';
		 			}else{
		 				this.firstPageUrl=fontBaseUrl+"news/list.html?id"+this.id+"&cat="+this.newsCat+"&page="+1+"#myTab";
		 			}
		 			
		 			//下一页
		 			var page2 =Number(_this.params.currentpage)+1;
		 			if(page2 >this.totalPages){
		 				this.downPageUrl='javascript:void(0)';
		 			}else{
		 				this.downPageUrl=fontBaseUrl+"news/list.html?id"+this.id+"&cat="+this.newsCat+"&page="+page2+"#myTab";
		 			}
		 			//最后一页
		 			if(this.totalPages == 1 || this.totalPages == 0){
		 				this.lastPageUrl= 'javascript:void(0)';
		 			}else{
		 				this.lastPageUrl=fontBaseUrl+"news/list.html?id"+this.id+"&cat="+this.newsCat+"&page="+this.totalPages+"#myTab";
		 			}
	 			},
				
				
				//点击选择新闻的分类
				chooseNewsClass:function(){
		 			//window.location.href=fontBaseUrl+"news/list.html?id="+this.id+"&page="+1+"&cat="+this.newsCat+"#myTab";
				},	
				loadContant:function (){
						var _this=this;
			 			if(getQueryString('page')){
		 					this.params.currentpage=getQueryString('page');
		 				}else{
		 					this.params.currentpage=1;
		 				}
			 			if(getQueryString('cat')){
		 					this.newsCat=getQueryString('cat');
		 				}
						var params={
							cid:null,
							id:this.newsCat,
							currentpage:this.params.currentpage,                        //当前页     必填
			 				pagesize:this.params.pagesize                           //页面大小 必填
						}
						api.GetClassResList(params).then(function(res){
							_this.newsList=res.data[0];
							_this.totalPages = res.data[1].pagenumber;//共几页
							_this.getPageUrl();
							
					   	   	_this.currentLines=res.data[0].length;
	//				   	   	callBackLoadIframe();//重置iframe高度
//							_this.newsClassList=res.data;
						}).catch(function(err){
							console.log(err);
						})
				},
				

				/*获取页面静态设置参数*/
			    getTopTenParams: function(className){
			    	 this.topParams = getTopTenValue(className,this.label);//公共方法comm.js
			    	 this.number = this.topParams && this.topParams.number;
			    },
			    //加载内容
			    loadContent: function(){
			      var _this = this;
			      var params={
			      	  cid:null,
			      	  label:this.label,
			      }
			      api.showTopFrontInfo(params).then(function(res){
			    	  if(res.success){
			    		  _this.hotNewsList = res.data && res.data;
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
				 },
//				 newsClassList:function(){
//				     var  _this = this;
//				     this.$nextTick(function(){
//				     	var cat=this.GetQueryString('cat');
//							if(cat){
//									for(var i=0; i< _this.newsClassList.length;i++){
//										 if(cat==_this.newsClassList[i].id){
//										 	console.log($('.newsStyleI')[0]);
//											$('.newsStyleI').removeClass('on');	
//											$('.newsStyleI').eq(i).addClass('on');
//											console.log($('.newsStyleI').eq(i).text());
//											$(".columnName").text($('.newsStyleI').eq(i).text());
//											_this.newsCat=_this.newsClassList[i].id;
////											_this.loadContant();
//										 }
//									}
//							}else{
//							 	$(".columnName").text($('.newsStyleI').eq(0).text());
//								$('.newsStyleI').removeClass('on');	
//								$('.newsStyleI').eq(0).addClass('on');
//								_this.newsCat=_this.newsClassList[0].id;
////								_this.loadContant();
//							}
//				     })
//				 }
			  },
			mounted: function(){
				this.subUrl();//截取查询参数
//				this.loadContent();//加载数据
				//获取新闻分类列表
				this.GetNewsClass();
//				this.GetNewsTop();
      			//获取top数据
                this.getTopTenParams('x-top-sign');
			}
		})


function chooseNewsClass(target){
	var id=$(target).attr('data');
	newsList_vm.newsCat=id;
	newsList_vm.chooseNewsClass();
}


////网页刷新或者重新加载后滚动条的位置不变
//window.onbeforeunload = function () {  
//	alert(1111);
//  var scrollPos;  
//  if (typeof window.pageYOffset != 'undefined') {  
//      scrollPos = window.pageYOffset;  
//  }  
//  else if (typeof document.compatMode != 'undefined' && document.compatMode != 'BackCompat') {  
//      scrollPos = document.documentElement.scrollTop;  
//  }  
//  else if (typeof document.body != 'undefined') {  
//      scrollPos = document.body.scrollTop;  
//  }  
//  document.cookie = "scrollTop=" + scrollPos; //存储滚动条位置到cookies中  
//}  
// //网页刷新或者重新加载后滚动条的位置不变
//window.onload = function () {  
//  if (document.cookie.match(/scrollTop=([^;]+)(;|$)/) != null) {  
//      var arr = document.cookie.match(/scrollTop=([^;]+)(;|$)/); //cookies中不为空，则读取滚动条位置  
//      document.documentElement.scrollTop = parseInt(arr[1]);  
//      document.body.scrollTop = parseInt(arr[1]);  
//  }  
//}  