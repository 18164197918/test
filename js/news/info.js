/*新闻详情*/
new Vue({
		data:function(){
			return {
				id:"",//某条新闻ID
				type: "",//某条新闻的类型
				newsTitle: "",//某条新闻标题
				newsImg:"",//某条新闻插图
				newsAuthor: "",//某条新闻作者
				newsImg: "",//新闻图片
				newsContent:"",//新闻详情
				news_params:{
					title:'',//新闻标题
					comment_count:'',//评论
					update_time:'',//发布时间
					author:'',//作者
					vfrom:'',//来源
					view_times:''//浏览次数
				}
			}
		},
		methods: {
			subUrl: function(){//通过访问url跳转后（解析url查询）
					this.id = getQueryString('rid') ? getQueryString('rid') :"";
					this.type =  getQueryString('type') ? getQueryString('type') :"";
			},
			loadNewsContent: function(){
				var _this = this;
				if(_this.id && _this.type){
						api.ColumnContentGet({//根据id获取新闻详情
								id:_this.id,
								type: _this.type
						}).then(function(res){
							if(res.success){
								if(res.data){
									var data = res.data;
									if(data){
										_this.newsTitle =  data.title;
										_this.newsAuthor = data.author;
										_this.newsImg = data.img;
										
										$.extend(_this.news_params,{
											title: data.title,//新闻标题
											comment_count: data.comment_count,
											update_time: data['update_time'],//发布时间
											author: data.author,//作者
											vfrom: data.vfrom,//来源
											view_times: data['view_times']//浏览次数
										});
										document.getElementById("decText").innerHTML=data.vtext;
										initPageInfo(data.title, data.keywords, data.vdesc);//修改标签添加keywords
									}
									
								}
							}
			   			}).catch(function(error){
		   					console.log(error);
			   			})
	   			}else{
	   				$.CwsPopup.Alert("提示","未找到栏目相关内容加载！");
	   			}
			}
		},
		mounted: function(){
			this.subUrl();//加载地址
			this.loadNewsContent();//加载新闻
		}
	}).$mount("#latestDetail");
