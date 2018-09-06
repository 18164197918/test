var mgrCon_vm = new Vue({
	data: function() {
		return {
			params: {
				cid: '', //必填
				flag: 1,
				mid: '', //栏目分类 选填
				domain: '', //预览域名
				currentpage: 1, //当前页     必填
				pagesize: 20,
				status: -1,
			},
			currentpage: 1, //当前页     必填
			jumppage: null, //跳转页码  
			pagesize: 20,
			contentLines: [], //全部内容
			linesPerPage: ['10', '20', '30', '50'],
			currentLines: '0', //当前请求行
			totalPages: '',
			noData: false,
			path: '', //文件名字

		}
	},
	methods: {
		renderEfect: function() { //内容管理下拉
			$('.select-edit').click(function() {
				if($(".select-edit").siblings().css("display") == 'block') {
					$(".select-edit").siblings().slideUp('fast');
				} else {
					$(".select-edit").siblings().slideDown('fast');
				}
			});
			$('.select-edit-list p').click(function() {
				$(this).parent().siblings().text($(this).text());
				$(this).parent().slideUp('fast');
			});
		},
		operate: function(msg,name,path) {
			var _this = this;
			var filepath = path +'/'+ name;
			//修改源码
			if(msg == 1) {
				window.location.href = fontBaseUrl + "user/editorCode.html?path=" + filepath;
				//还原代码
			} else if(msg == 2) {
				api.restoreCode({
						cid: _this.params.cid,
						filepath: filepath,
					})
					.then(function(res) {}).catch(function(err) {
						console.log(error);
					})
			}
			//初始化
			else if(msg == 3) {
				api.restoreCode({
						cid: _this.params.cid,
						filepath: filepath,
						init: true,
					})
					.then(function(res) {}).catch(function(err) {
						console.log(error);
					})
			}
		},
		loadContent: function() {
			var _this = this;
			api.ListCpInfo({
					cid: _this.params.cid
				})
				.then(function(res) {
					if(res.data) {
						_this.params.domain = res.data.domain;
						//			   			axios({
						//						  method:'get',
						//						  url:'http://'+_this.params.domain+'/modlst.json',
						//						  responseType:'stream',
						//						  withCredentials:true,
						//						})
						//					  	.then(function(res) {
						//						  	if(res.data){
						//						  		if(res.data.editable.length > 0){
						//						  			_this.contentLines=res.data.editable;
						//						  		}
						//						  	}else{
						//						  		_this.noData=true;
						//						  	}
						//						});

						$.ajax({
							url: 'http://' + _this.params.domain + '/modlst.json',
							dataType: 'json',
							type: "get",
							withCredentials: true,
							//data: '',
							success: function(res) {
								console.log(res);
								if(res) {
									if(res.editable.length > 0) {
										_this.contentLines = res.editable;
									}
								} else {
									_this.noData = true;
								}
							},
							error: function() {
								_this.noData = true;
							}
						});

					} else {
						_this.noData = true;
					}
				}).catch(function(err) {
					console.log(error);
				})
		},
		getCid: function() { //通过local
			var cid = '';
			if(getUserCookie()) {
				cid = getUserCookie().cid;
			}
			if(cid) {
				this.params.cid = cid;
			} else {
				console.log("Error:当前用户没有cid！");
			}
			var domain = '';
			if(getUserCookie()) {
				domain = getUserCookie().domain;
			}
			if(domain) {
				this.params.cid = domain;
			} else {
				console.log("Error:当前用户没有domian！");
			}
		}
	},
	mounted: function() {
		var _this = this;
		this.getCid();
		this.loadContent();
	}
}).$mount("#mgeCode");

function operate(msg, target) {
	var name = $(target).attr('data');
	var path = $(target).attr('data-path');
	mgrCon_vm.operate(msg, name, path);
}