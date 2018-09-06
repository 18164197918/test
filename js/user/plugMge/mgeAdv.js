var mgeAdv_vm = new Vue({
    data: function () {
        return {
            cid: null,
            advList: null,
            currentpage: 1,                      //当前页     必填
            jumppage:null,                       //跳转页码 
            pagesize: 20,                        //页面大小 必填
            linesPerPage: ['10','20','30','50'],       //  
            currentLines: '0',                      //当前请求行
            totalPages: '',                      //跳转页
            noData:false
        }
    },
    methods: {
    
        //获取广告列表数据
        getAdvList: function () {
            var _this = this;
            if(getQueryString('page')){
	 				this.currentpage=getQueryString('page') ;
	 			}
	 			if(getCurrentPage('mgeAdv')){
	 				this.currentpage=getCurrentPage('mgeAdv');
	 			} 
            var params = {
                cid: this.cid,                           //6608e90675164229a916c8a26f00ed5f
                flag: -100,
                currentpage: this.currentpage,                   //当前页     必填
                pagesize: this.pagesize,                        //页面大小 必填
            }
            api.getPlugList(params).then(function (res) {
                if (res.success) {
                	if(res.data && res.data[0].length > 0){
        		     	 for (var n = 0; n < res.data[0].length; n++) {
	                        var begin_time = new Date(res.data[0][n].begin_time);
	                        var end_time = new Date(res.data[0][n].end_time);
	                        res.data[0][n].begin_time = _this.getTime(begin_time);
	                        res.data[0][n].end_time = _this.getTime(end_time);
	                    }
	                    _this.advList = res.data[0];
                   		_this.currentLines = res.data[0].length;
                   		_this.noData=false;
                	}else{
                		 _this.advList = res.data[0];
                		_this.noData = true;
                	}
              
                    _this.totalPages = res.data[1].pagenumber;
                    _this.$nextTick(function() {
                        $('#selectAll').click(_this.ckAll);
                        $('.selectOne').click(_this.ckCur);
                        $('.modAdv').each(function(index) {
                            $(this).click(function() {
                                _this.operate(1, _this.advList[index].id)
                            })
                        });
                        $('.delAdv').each(function(index) {
                            // $(this).preventDefault();
                            $(this).click(function() {
                                _this.operate(2, _this.advList[index].id)
                            })
                        });
                    });
                      $(".x-tips").fadeOut();
                    callBackLoadIframe();//重置iframe高度
                }
            }).catch(function (err) {
                console.log(err);
            })
        },
        //全选
        ckAll: function (e) {
            $(e.target).prop("checked") && $(".selectOne").find("input[type='checkbox']").prop("checked", true);
            $(e.target).prop("checked") || $(".selectOne").find("input[type='checkbox']").prop("checked", false);
        },
        ckCur: function (e) {
            if ($(e.target).prop("checked")) {
                if ($(".selectOne").find("input[type='checkbox']").length - 1 == $(".selectOne").find("input:checked").length) {
                    $("#selectAll").prop("checked", true);
                }
            } else {
                $("#selectAll").prop("checked", false);
            }
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
            return year + "-" + month + "-" + date + "   " + toDou(hour) + ":" + toDou(minute) + ":" + toDou(second);
        },
        //对广告删除或修改
        operate: function (msg, id) {
            var _this = this;
            //修改
            if (msg == 1) {
                window.location.href = fontBaseUrl + 'user/plugMge/addAdv.html?id=' + id;
            } else if (msg == 2) {
                //删除
                $.CwsPopup.Confirm("确认删除", "是否删除此广告？", function () {
                    api.delPlug({ id: id }).then(function (res) {
                        if (res.success) {
                            _this.getAdvList();
                            $.CwsPopup.Alert("提示", "删除成功！");
                        }
                    }).catch(function (err) {
                        console.log(err);
                        $.CwsPopup.Alert("提示", "删除失败！");
                    })
                }, function () {
                    $.CwsPopup.OperateCwsPopup('hide');
                }, '确定', '取消');
            }
        },
        //改变 查找的页面
        selcValue: function (e) {
            this.pagesize = $(e.target).find("option:selected").val();
            if(this.pagesize ){
	 				window.localStorage.setItem("pagesize",this.pagesize);
	 			}
            this.getAdvList();//查询内容
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
//          setCurrentPage('mgrAdv', _this.currentpage);
//          _this.getAdvList();
          
			var _this = this;
 			if($.trim($('.currentpage').val()) != ''){
 				
 				if(Number($('.currentpage').val())<=0){
 						_this.jumppage=_this.currentpage;
 						return;
 				}else  if(Number($('.currentpage').val()) <= Number( _this.totalPages)){
 			    	  	_this.jumppage = $('.currentpage').val();
 			    	  	_this.currentpage=_this.jumppage;
			          setCurrentPage('mgrAdv', _this.currentpage);
			          _this.getAdvList();
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
            setCurrentPage('mgrAdv', _this.currentpage);
            _this.getAdvList();
        },
        //下一页
        addPage: function (sign) {
            var _this = this;
            if (sign == 'son') {
                var cur = (_this.currentpage - 1 + 2) % (_this.totalPages - 1 + 2);
                _this.currentpage = (cur == 0) ? 1 : cur;
            } else {
                _this.currentpage = _this.totalPages;
            }
            setCurrentPage('mgrAdv', _this.currentpage);
            _this.getAdvList();
        },
        //获取用户信息
        getUserInfo: function () {
            //          var userInfo=getCookie('data'); 
            if (getUserCookie()) {
                this.cid = getUserCookie().cid;
            }
        },
    },
    mounted: function () {
    	var _this=this;
        $('#pageNum').click(this.selcValue);
        $('#currentPage').blur(this.changeCurrentPage);
        this.getUserInfo();
        if(window.localStorage.getItem("pagesize")){
	 			_this.pagesize=window.localStorage.getItem("pagesize");
	 		}else{
	 			window.localStorage.setItem("pagesize",_this.pagesize);
	 		}
        this.getAdvList();
    }
}).$mount('#mgeAdv')




function addHref(){
	  setIframeUrl('user/plugMge/addAdv.html');
	windowOpenPage(fontBaseUrl + 'user/plugMge/addAdv.html');
}
