var mgeFsLink_vm = new Vue({
    data: function () {
        return {
            fskList: null,
            currentpage: 1,                       //当前页     必填
            jumppage:null,                       //跳转页码 
            pagesize:20,
            contentLines: [],//全部内容
            linesPerPage: ['10','20','30','50'],
            currentLines: '0',//当前请求行
            totalPages: '',
            noData: false
        }
    },
    methods: {
        //获取友情链接列表数据
        getFslinkList: function () {
            var _this = this;
            if(getQueryString('page')){
 				this.currentpage=getQueryString('page') ;
 			}
 			if(getCurrentPage('mgrFsl')){
 				this.currentpage=getCurrentPage('mgrFsl');
 			} 
            var params = {
                cid: this.cid,
                flag: 100,
                currentpage: this.currentpage,                      //当前页     必填
                pagesize: this.pagesize,                        //页面大小 必填
            }
            api.getPlugList(params).then(function (res) {
                if (res.data[0]) {
                	if(res.data[0].length > 0){
            		  	_this.fskList = res.data[0];
            		    _this.currentLines = res.data[0].length;
            		    _this.noData=false;
                	}else{
                		_this.fskList = res.data[0];
                		_this.noData = true;
                	}
                    _this.totalPages = res.data[1].pagenumber;
                    _this.$nextTick(function() {
                       _this.$emit('bindEvent', _this);
                    })
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
        //对广告删除或修改
        operate: function (data,msg) {
            var _this = this;
            //修改
            var aid = data;
            if (msg == 1) {
               // window.location.href = fontBaseUrl + "user/plugMge/addFsLink.html?id=" + $(event.currentTarget).attr('data');
                windowOpenPage(fontBaseUrl + "user/plugMge/addFsLink.html?id=" + $(event.currentTarget).attr('data'));
            } else if (msg == 2) {
                //删除
                $.CwsPopup.Confirm("确认删除", "是否删除此友情链接？", function () {
                    api.delPlug({ id: aid }).then(function (res) {
                        if (res.success) {
                        	$('.ck_all')[0].checked=false;
                            _this.getFslinkList();
                            $.CwsPopup.Alert("提示", "删除成功！");
                        }
                    }).catch(function (err) {
                        $.CwsPopup.Alert("提示", "删除失败！");
                        console.log(err);
                    })
                }, function () {
                    $.CwsPopup.OperateCwsPopup('hide');
                }, '确定', '取消');
            }
        },
        batchOpear:function(msg){
	 			var _this=this;
	 			var len=$(".content-edit-box-bg  input[type='checkbox']").length;
	 			if(len>0){
		 			var delNum=[]; //成功删除的数据
		 				for(var n=0; n<len; n++){
			 				if($(".content-edit-box-bg  input[type='checkbox']")[n].checked){
			 					delNum.push($(".content-edit-box-bg input[type='checkbox']")[n].value);
			 					$(".content-edit-box-bg  input[type='checkbox']")[n].checked=false;
			 				}
		 				}
		 				var str=delNum.join(",");
	   					if(str){
	   						$.CwsPopup.Confirm("确认删除","是否批量删除友情链接？",function(){
               		  		api.delPlug({id:str}).then(function(res){
               		  			console.log(res);
									if(res.success){
										$('.ck_all')[0].checked=false;
										_this.getFslinkList();
										$.CwsPopup.Alert("提示","删除成功！");
									}
								}).catch(function(err){
									console.log(err);
									$.CwsPopup.Alert("提示","删除失败！");
								})
		                    },function(){
		                       $.CwsPopup.OperateCwsPopup('hide');
							},'确定', '取消');
		 				}
	 			}
	 		},
        //改变 查找的页面
        selcValue: function (e) {
            this.pagesize = $(e.target).find("option:selected").val();
            if(this.pagesize ){
	 				window.localStorage.setItem("pagesize",this.pagesize);
	 			}
            this.getFslinkList();//查询内容
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
//          setCurrentPage('mgrFsl', _this.currentpage);
//          _this.getFslinkList();
			var _this = this;
 			if($.trim($('.currentpage').val()) != ''){
 				
 				if(Number($('.currentpage').val())<=0){
 						_this.jumppage=_this.currentpage;
 						return;
 				}else  if(Number($('.currentpage').val()) <= Number( _this.totalPages)){
 			    	  	_this.jumppage = $('.currentpage').val();
 			    	  	_this.currentpage=_this.jumppage;
            			setCurrentPage('mgrFsl', _this.currentpage);
            			_this.getFslinkList();
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
              setCurrentPage('mgrFsl', _this.currentpage);
            _this.getFslinkList();
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
              setCurrentPage('mgrFsl', _this.currentpage);
            _this.getFslinkList();
        },
        //获取用户信息
        getUserInfo: function () {
            var cid = '';
            if (getUserCookie()) {
                cid = getUserCookie().cid;
            }
            if (cid) {
                this.cid = cid;
            } else {
                console.log("cookies没有获取userInfo信息！")
            }
        },
    },
    mounted: function () {
    	var _this=this;
        this.getUserInfo();
        if(window.localStorage.getItem("pagesize")){
	 			_this.pagesize=window.localStorage.getItem("pagesize");
	 		}else{
	 			window.localStorage.setItem("pagesize",_this.pagesize);
	 		}
        this.getFslinkList();

    }
}).$mount('#mgeFsLink')
//mgeFsLink_vm.$once('bindEvent', function(v) {
//  $('#selectAll').click(v.ckAll);
//  $('.selectOne').click(v.ckCur);
//  $('.modLink').click(function (e) {
//      v.operate(1);
//  });
//  $('.delLink').click(function (e) {
//      v.operate(2);
//  });
//  $('#pageNum').click(v.selcValue);
//  $('#currentPage').blur(v.changeCurrentPage);
//});
function addLinkHref(){
	  setIframeUrl('user/plugMge/addFsLink.html');
	windowOpenPage(fontBaseUrl + 'user/plugMge/addFsLink.html');
}

function batchOpear(){
	mgeFsLink_vm.batchOpear();
}
function operate(target,msg){
	var data=$(target).attr('data');
	mgeFsLink_vm.operate(data,msg);
}
