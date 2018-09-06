var tsRecord_vm = new Vue({
    data: function () {
        return {
            uid: null,       						// (tb_user.id   必填)    
            type: null,     							//（交易类型-1支出,1支入   选填）    
            beginTime: null, 						//（开始时间   选填）    
            endTime: null,  						    //（结束时间   选填）     
            linesPerPage: ['10','20','30','50'],       // 选择一行换多少页 
            currentpage: 1,  						//(当前页   必填)
            jumppage:null,                          //跳转页码
            pagesize: 20,    						//(页面大小   必填)
            currentLines: '0',                       //当前请求行
            totalPages: '',                       //跳转页
            tradeList: [],                           //交易记录数据
            noData: false
        }
    },
    methods: {
        //获取交易记录列表
        getTradeList: function (event) {
            var _this = this;
            this.type = null;
            if (event) {
                var el = $(event.target).val();
                el === '收入' && (this.type = 1);
                el === '支出' && (this.type = -1);
            }
            if(getCurrentPage('traRecord')){
			 				this.currentpage=getCurrentPage('traRecord');
			 			} 
            // console.log(this.type)
            // console.log($('#d4311').val())
            // console.log($('#d4312').val())
            var params = {
                cid: this.cid,                           //公司ID 
                uid: this.uid,       					// (tb_user.id   必填)    
                type: this.type,     				    //（交易类型-1支出,1支入   选填）    
                beginTime: $('#d4311').val(), 				//（开始时间   选填）    
                endTime: $('#d4312').val(),  					//（结束时间   选填）     
                currentpage: this.currentpage,  			//(当前页   必填)
                pagesize: this.pagesize,    				//(页面大小   必填)
            };
            api.transaction(params).then(function (res) {
                if (res.success && res.data[1]) {
                	if(res.data && res.data[0].length > 0){
	                    for (var n = 0; n < res.data[0].length; n++) {
	                        var create_time = new Date(res.data[0][n].create_time);
	                        res.data[0][n].create_time = _this.getTime(create_time);
	                    }
	                    _this.currentLines = res.data[0].length;
	                    _this.tradeList = res.data[0];
	                    _this.noData=false;
                   }else{
                   	 _this.tradeList = res.data[0];
                   	 _this.noData = true;
                   }	
                    _this.totalPages = res.data[1].pagenumber;
                    $(".x-tips").fadeOut();
                    callBackLoadIframe();//重置iframe高度
                }
            }).catch(function (err) {
                console.log(err);
            })
        },
        //查询交易记录
        search: function () {
        		this.currentpage=1;
 						setCurrentPage('traRecord', this.currentpage);
            this.getTradeList();
        },
        //转换时间戳
        getTime: function (now) {
            //将小于十的数变成两位
            function toDou(num) {
                var num = num + "";
                return num = num.length > 1 ? num : 0 + num;
            }
            var year = now.getFullYear();
            var month = now.getMonth() + 1;
            var date = now.getDate();
            var hour = now.getHours();
            var minute = now.getMinutes();
            var second = now.getSeconds();
            return year + "-" + toDou(month) + "-" + toDou(date) + "   " + toDou(hour) + ":" + toDou(minute) + ":" + toDou(second);
        },
        //获取用户信息
        getUserInfo: function () {
            if (getUserCookie()) {
                this.uid = getUserCookie().uid;
                this.cid = getUserCookie().cid;
            }
            if (!this.cid) {
                console.log('没有获取cid!');
            }
            if (!this.uid) {
                console.log('没有获取uid!');
            }
        },
        //改变 查找的页面
        selcValue: function (e) {
            this.pagesize = $(e.target).find("option:selected").val();
            if(window.localStorage.getItem("pagesize")){
	 			_this.pagesize=window.localStorage.getItem("pagesize");
	 		}else{
	 			window.localStorage.setItem("pagesize",_this.pagesize);
	 		}
            this.getTradeList();//查询内容
        },
        //跳转到某页
        changeCurrentPage: function (e) {
//          var _this = this;
//          if ($.trim($('.currentpage').val()) != '') {
//              if (Number($('.currentpage').val()) <= Number(_this.totalPages)) {
//                  _this.currentpage = $('.currentpage').val();
//              } else {
//                  $('.currentpage').val(this.currentpage);
//              }
//          }
//          setCurrentPage('traRecord', _this.currentpage);
//          _this.getTradeList();
				var _this = this;
	 			if($.trim($('.currentpage').val()) != ''){
	 				
	 				if(Number($('.currentpage').val())<=0){
	 						_this.jumppage=_this.currentpage;
	 						return;
	 				}else  if(Number($('.currentpage').val()) <= Number( _this.totalPages)){
	 			    	  	_this.jumppage = $('.currentpage').val();
	 			    	  	_this.currentpage=_this.jumppage;
				            setCurrentPage('traRecord', _this.currentpage);
				            _this.getTradeList();
	 			    }else{
	 			        	_this.jumppage=_this.currentpage;
	 			        	return;
	 			    }
	 			}
        },
        //上一页
        subPage: function (sign) {
            var _this = this;
            if (sign == 'son') {
                var cur = _this.currentpage - 1;
                if (cur > 0) {
                    _this.currentpage = cur;
                }
            } else {
                _this.currentpage = '1';
            }
            setCurrentPage('traRecord', _this.currentpage);
            _this.getTradeList();
        },
        //下一页
        addPage: function (sign) {
            var _this = this;
            if (sign == 'son') {
                var cur = (_this.currentpage - 1 + 2) % (_this.totalPages - 1 + 2);
                _this.currentpage = (cur == 0) ? 1 : cur;
                // console.log(cur);
                // console.log(_this.currentpage);
            } else {
                _this.currentpage = _this.totalPages;
            }
            setCurrentPage('traRecord', _this.currentpage);
            _this.getTradeList();
        },
    },
    mounted: function () {
        var _this = this;
        $('#funding').change(_this.getTradeList);
        $('#pageNum').click(_this.selcValue);
        $('#currentPage').blur(_this.changeCurrentPage);
        if(window.localStorage.getItem("pagesize")){
	 			_this.pagesize=window.localStorage.getItem("pagesize");
	 		}else{
	 			window.localStorage.setItem("pagesize",_this.pagesize);
	 		}
        this.getUserInfo();
        this.getTradeList();
    }
}).$mount("#tsRecord");

