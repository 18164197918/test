$("#remarkTpl").load(fontBaseUrl+'tpl/remark.tpl', function(){
	 new Vue({
			data: function(){
				return {
					loginStatus:false,//登录状态
					rid: '',//当前资源ID 必填
					pid:'',//回复评论ID 选填
					uid:'',//用户登录了传递uid不登录游客身份 选填
					uname: '',//登录用户名
					comment:'',//评论内容   必填
					listCommt:[],//评论列表
					Fcomment: '',//一级评论内容
//					editRolyName:''//点击回复内容
		 			params: {
		 				currentpage: 1,                       //当前页     必填
		 				pagesize: 25                           //页面大小 必填
		 			},
		 			contentLines:[],//全部内容
		 			linesPerPage: ['10','20','30','50'],
		 			currentLines:'0',//当前请求行
		 			totalPages: ''
	 			}
			},
			methods:{
				/*分页_start*/
			   selcValue: function(e){
	 				this.params.pagesize = $(e.target).find("option:selected").val();
	 				this.renderComment();//查询内容
	 		    },
				changeCurrentPage: function(e){
		 			var _this = this;
		 			if($.trim($(e.target).val()) != ''){
		 			    if(Number($(e.target).val()) <= Number( _this.totalPages)){
		 			    	  _this.params.currentpage = $(e.target).val();
		 			    }else{
		 			        	$(e.target).val('') ;
		 			    }
		 			}
		 			_this.renderComment();
		 		},
				subPage: function(sign){
		 			var _this = this;
		 			if(sign == 'son'){
		 			var cur = _this.params.currentpage -1 ;
		 			if(cur > 0){
		 				_this.params.currentpage = cur;
		 			}
		 			}else{
		 				_this.params.currentpage = '1';
		 			}
		 			_this.renderComment();
		 		},
		 		addPage: function(sign){
		 			var _this = this;
		 			if(sign == 'son'){
			 			var cur = (_this.params.currentpage -1 + 2) % (_this.totalPages-1+2);
			 			_this.params.currentpage = (cur == 0) ? 1 : cur ;
		 			}else{
		 				_this.params.currentpage =  _this.totalPages;
		 			}
		 			_this.renderComment();
		 		},/*分页——end*/
				renderComment: function(){//加载评论列表
					var _this =this;
					api.commentGet({
						//cid: /*根据域名获取cid*/
						rid: _this.rid,
						currentpage: _this.params.currentpage,
						pagesize: _this.params.pagesize
					}).then(function(res){
						if(res.success){
							_this.listCommt = res.data && res.data[0] ;
							_this.totalPages = res.data && res.data[1].pagenumber;//共几页
				   	   	    if(res.data[1].pagecount< _this.params.pagesize){
				   	   	    	 _this.currentLines = res.data[1].pagecount;//一共多少条
				   	   	    }else{
				   	   	    	 _this.currentLines = _this.params.pagesize;//一共多少条
				   	   	    }
						}
						
					}).catch(function(err){
						console.log(err);
					});
					
				},
				rmkSub:function(comtLev,ele){//点击提交一级评论
					var _this = this;
					if(comtLev == 'first'){
						_this.pid = '';
						_this.comment = _this.Fcomment;
					}else if(comtLev == 'second'){
						if($(ele.target).parents('.date-dz').attr("pid")){
							_this.pid = $(ele.target).parents('.date-dz').attr("pid");//回复子评论
						}else{
							_this.pid = $(ele.target).parents('.date-dz').attr("id");//回复一级评论	
						}
						_this.comment = $(ele.target).parent().find("textarea").val();
					}
					if($.trim(_this.comment) != '' &&  _this.loginStatus){//登录状态和有评论的时候
						api.commentReply({
							rid: _this.rid,
							pid: _this.pid,//回复id
							uid: _this.uid,
							comment: _this.comment
						}).then(function(res){
							if(res.success){
								if(comtLev == 'second'){
									$(ele.target).parent('.rply').addClass('hidden');
								}else if(comtLev == 'first'){
									_this.Fcomment = '';
								}
								_this.renderComment();
							}
						}).catch(function(err){
							console.log(err);
						});
					}else if( _this.loginStatus == false){
						$.CwsPopup.Alert("提示","注意：请先登录！");
					}else if($.trim(_this.comment) == ''){
						$.CwsPopup.Alert("提示","注意：评论内容为空！");
					}
				},
				addTextArea: function(ele){
					var _this = this;
					//获取回复人的名字
					var fhPar = $(ele.target).parents('.date-dz');
			        var fhName = $(fhPar).siblings('.pl-text').find('.comment-size-name').html();
			        //回复@
			      //  var fhN = '回复@'+fhName;//onkeyup="keyUP(this)"

					if($(ele.target).is('.hf-con-block')){
						$(fhPar).find('div.rply').removeClass('hidden');
					 	$(ele.target).removeClass('hf-con-block');
				 	    $(fhPar).find('.hf-input').val('').focus().val();//fhN
					}else{
					    $(ele.target).addClass('hf-con-block');
					    $(fhPar).find('div.rply').hasClass('hidden') || (fhPar).find('div.rply').addClass('hidden');
					}

				},

			    //截取url的参数值
				GetQueryString:function (name){
				     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
				     var r = window.location.search.substr(1).match(reg);
				     if(r!=null)return  unescape(r[2]); return null;
				},

			    delReply: function(ele){
			    	var  _this = this;
			   	 	api.commentDel({
						id: $(ele.target).parents('.date-dz').attr('id'),
						flag: 2//删除操作
					}).then(function(res){
						if(res.success){
							_this.renderComment();
						}
					}).catch(function(err){
						console.log(err);
					});
			    }

			},
			mounted: function(){
				if(getCookie('uid')){
					this.loginStatus = true;
				}
				if(this.GetQueryString('id')){
					this.rid =this.GetQueryString('id');
				}
				if(getUserCookie()){
					this.uid = getUserCookie().uid || '';
					this.uname = getUserCookie().uname || '游客';
				}else{
					this.uname = '游客';
				}
				this.renderComment();//获取评论列表
			}
	}).$mount("#remarkTpl");
});
	
