new Vue({
    data: function () {
        return {
            params: {
                id: '',	  	//必填
                currentpage: 1, //当前页     必填
                pagesize: 20    //页面大小 必填
            },
            orderContent: {
                ordrNum: '',//工单编号
                contact: '',//联系人
                status: '',//工单状态
                insert_time: '',//工单提交时间
                title: '',//工单标题
                type: '',//工单类型
                vtext: ''//工单描述
            },
            process: {
                one: true,
                two: true,
                three: false
            },
            contentLines: [],//全部内容
            linesPerPage:['10','20','30','50'],
            currentLines: '0',//当前请求行
            totalPages: ''
        }
    },
    methods: {
        //分页选择条/页
        selcValue: function (e) {
            this.params.pagesize = $(e.target).find("option:selected").val();
            if(this.pagesize ){
	 				window.localStorage.setItem("pagesize",this.pagesize);
	 			}
            this.loadContent();//查询内容
        },
        //改变每页/条
        changeCurrentPage: function (e) {
            var _this = this;
            if ($.trim($(e.target).val()) != '') {
                if (Number($(e.target).val()) <= Number(_this.totalPages)) {
                    _this.params.currentpage = $(e.target).val();
                } else {
                    $(e.target).val('');
                }
            }
            _this.loadContent();
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
            _this.loadContent();
        },
        setOrderStatu: function (ele) {//改变工单状态
            if (this.orderContent.status != -100) {//已经撤销置灰色并不能点击
                var _this = this;
                var sta = $(ele.target).data('status');
                if (_this.params.id && sta) {
                    api.ChangeOrderStatu({
                        id: _this.params.id,
                        status: sta
                    }).then(function (res) {
                        if (res.success) {
                            $.CwsPopup.Alert("提示", res.msg, function () {
//                              window.top.location.reload();
								_this.loadContent();
								$.CwsPopup.OperateCwsPopup('hide');//关闭提示框
                            });
                        }
                    }).catch(function (err) {
                        console.log(err);
                    })
                }
            } else {
                $(ele.target).css({
                    backgroundColor: '#f3f3f3'
                });
            }
        },
        loadContent: function () {//加载工单详情信息
            var _this = this;
            _this.params.id = getQueryString('id');
            if (_this.params.id) {
                api.SearchOrderInfo(_this.params).then(function (res) {
                    if (res.success) {
                        _this.orderContent = res.data[0];
                        if (_this.orderContent.status == 200) {//已完成状态
                            _this.process.three = true;
                        } else if (_this.orderContent.status == -100) {//撤销状态
                            $(".oder-detail-btn").css({
                                backgroundColor: '#f3f3f3'
                            });
                        }
                      $(".x-tips").fadeOut();
                      callBackLoadIframe();//重置iframe高度
                    }
                }).catch(function (err) {
                    console.log(err);
                })
            }
        }
    },
    mounted: function () {
    	var _this=this;
    	if(window.localStorage.getItem("pagesize")){
	 			_this.pagesize=window.localStorage.getItem("pagesize");
	 		}else{
	 			window.localStorage.setItem("pagesize",_this.pagesize);
	 		}
        this.loadContent();
    }
}).$mount("#worInfoDetail");
