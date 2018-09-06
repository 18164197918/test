var workInfo_vm = new Vue({
    data: {
            params: {
                cid: '',	  	//必填
                uid:'',         //用户ID
                beginTime: '',	//选填 开始时间
                endTime: '',	//选填  结束时间
                currentpage: 1, //当前页     必填
                pagesize: 20,    //页面大小 必填
                },
            jumppage:null,     //跳转页码     
            contentLines: [],//全部内容
            linesPerPage: ['10','20','30','50'],
            currentLines: '0',//当前请求行
            totalPages: '',
            noData: false
        },
        methods: {
            listOrders: function () {
                this.params.beginTime = $("#d4311").val();//开始时间
                this.params.endTime = $("#d4312").val();//结束时间
                this.currentpage=1;
				setCurrentPage('workInfo', this.currentpage);
                this.loadContent();
            },
            searchOrder: function (ele) {
                var cur_id = $(ele.target).attr('id');
                if (cur_id) {
                	setIframeUrl("user/myServ/workInfoDetail.html?id=" + cur_id);
                	windowOpenPage(fontBaseUrl + "user/myServ/workInfoDetail.html?id=" + cur_id);
//                  window.location.href = fontBaseUrl + "user/myServ/workInfoDetail.html?id=" + cur_id;
                }
            },
            delOrder: function (ele) {
                var cur_id = $(ele.target).attr('id');
                var ck = $("input[name='contentChk']:checked");
                var ids = [];
                for (var i = 0; i < ck.length; i++) {
                    ids.push(ck[i].defaultValue);
                }
                ids = (ids.length > 0) ? ids.join(",") : cur_id;
                if (ids) {
    	            $.CwsPopup.Confirm("提示","您是否删除该条工单信息",function(){
	                    api.DelWorkOrders({
	                        id: ids
	                    }).then(function (res) {
	                        if (res.success) {
	                        	$.CwsPopup.Alert("提示","删除成功！");
	                            window.location.reload();
	                        }
	                    }).catch(function (err) {
	                        console.log(err);
	                          $.CwsPopup.Alert("提示","删除失败！");
	                    });
					},function(){
		                   $.CwsPopup.OperateCwsPopup('hide');
					},'确定', '取消');
                	
                }
            },
            //分页选择条/页
            selcValue: function (e) {
                this.params.pagesize = $(e.target).find("option:selected").val();
                if(this.params.pagesize ){
	 				window.localStorage.setItem("pagesize",this.params.pagesize);
	 			}
                this.loadContent();//查询内容
            },
            //改变每页/条
            changeCurrentPage: function (e) {
//              var _this = this;
//              if ($.trim($(e.target).val()) != '') {
//                  if (Number($(e.target).val()) <= Number(_this.totalPages)) {
//                      _this.params.currentpage = $(e.target).val();
//                  } else {
//                      $(e.target).val('');
//                  }
//              }
//               setCurrentPage('workInfo', _this.params.currentpage);
//              _this.loadContent();

	 			var _this = this;
	 			if($.trim($('.currentpage').val()) != ''){
	 				
	 				if(Number($('.currentpage').val())<=0){
	 						_this.jumppage=_this.params.currentpage ;
	 						return;
	 				}else  if(Number($('.currentpage').val()) <= Number( _this.totalPages)){
	 			    	  	_this.jumppage = $('.currentpage').val();
	 			    	  	_this.params.currentpage =_this.jumppage;
			                 setCurrentPage('workInfo', _this.params.currentpage);
			                _this.loadContent();
	 			    }else{
	 			        	_this.jumppage=_this.params.currentpage ;
	 			        	return;
	 			    }
	 			}

            },
            //上一页
            subPage: function (sign) {
                var _this = this;
                if (sign == 'son') {
                    var cur = _this.params.currentpage - 1;
                    if (cur > 0) {
                        _this.params.currentpage = cur;
                    }
                } else {
                    _this.params.currentpage = '1';
                }
                setCurrentPage('workInfo', _this.params.currentpage);
                _this.loadContent();
            },
            //下一页
            addPage: function (sign) {
                var _this = this;
                if (sign == 'son') {
                    var cur = (_this.params.currentpage - 1 + 2) % (_this.totalPages - 1 + 2);
                    _this.params.currentpage = (cur == 0) ? 1 : cur;
                } else {
                    _this.params.currentpage = _this.totalPages;
                }
                 setCurrentPage('workInfo', _this.params.currentpage);
                _this.loadContent();
            },
            loadContent: function () {
                var _this = this;
                if(getCurrentPage('workInfo')){
	 				this.params.currentpage=getCurrentPage('workInfo');
	 			} 
                api.ListWorkOrder(this.params)
                    .then(function (res) {
                        if (res.success) {
                            if (res.data) {
                            	_this.contentLines = res.data[0];
                            	if(res.data[0].length > 0){
		                                _this.currentLines = res.data[0].length;
		                                _this.$nextTick(function() {
		                                    $('.searchOrder').each(function() {
		                                        $(this).click(_this.searchOrder)
		                                    })
		                                    $('.delOrder').each(function () {
		                                        $(this).click(_this.delOrder)
		                                    })
		                                })
		                            _this.noData=false;    
                            	}else{
                            		_this.noData = true;
                            	}
                                _this.totalPages = res.data[1].pagenumber;//共几页
                                $(".x-tips").fadeOut();
                                callBackLoadIframe();//重置iframe高度
                            }
                        }
                    }).catch(function (error) {
                        console.log("处理失败！");
                    })
            },
             getUserInfo: function(){//通过local
				var cid =  '';
				if(getUserCookie()){
					cid=getUserCookie().cid || '';
					uid=getUserCookie().uid || '';
				}
				if(cid){
					this.params.cid = cid;
				}else{
					console.log("Error:当前用户没有cid!");
				}
				if(uid){
					this.params.uid = uid;
				}else{
					console.log("Error:当前用户没有uid!");
				}
			},
        },
        
        mounted: function() {
            var _this = this;
            this.getUserInfo();
            if(window.localStorage.getItem("pagesize")){
	 			_this.params.pagesize=window.localStorage.getItem("pagesize");
	 		}else{
	 			window.localStorage.setItem("pagesize",_this.params.pagesize);
	 		}
            $('#pageNum').click(_this.selcValue);
            $('#currentPage').blur(_this.changeCurrentPage);
            this.loadContent();

        }
   
}).$mount('#workInfo')