var mgrUser_vm=new Vue({
    el: "#manageuser",
    data: {
            roleList: null,                         //角色列表
            cid: '',                                //企业ID
            name: '',                               //被邀请人电话
            inviter: '',                            // 邀请人名字
            userPeopleList: '',                     //用户企业的所有 人员列表
            currentpage: 1,                      //当前页     必填
            jumppage: null,                      //跳转页      
            pagesize: 20,                        //页面大小 必填
            linesPerPage:['10','20','30','50'],      //
            currentLines: '0',                      //当前请求行
            totalPages: '',                      //跳转页
            isSignupUrl: api.baseUrl()+'/urCenter.do?chkName',  //检查用户是否已经为本企业的管理
            noData: false
    },
    methods: {
        //表单验证
        validate: function() {
            var that = this;
            $('#inviteForm').validate({
//              onfocusout: function(element) { $(element).valid(); },
                onkeyup: false,
                rules: {
                    username: {
                        required: true,
                        tel: true,
//                      rename:true,
                        remote: {
                            url: that.isSignupUrl,
                            type: 'post',
                            data: {
                                name: that.name,
                            },
                            dataFilter: function(data, type) {
                                if (JSON.parse(data).success) {
                                    return true;
                                } else {
                                    return false;
                                }
                            }
                        }
                    },
                    inviter: {
                        maxlength: 10,
                    },

                },
                messages: {
                    username: {
                        required: "手机号不能为空！",
                        tel: "请输入正确的手机号码！",
//                      rename:'该号码与您的号码重复!',
                        remote: "该管理员号码已经成为本企业的管理！"
                    },
                    inviter: {
                        maxlength: '汉字长度不超过10字符！',
                    }
                },
                invalidHandler: function(form, validator) {
                    $.CwsPopup.Alert("提示","验证结果不正确，请重新登录！");
                    return false;
                },
                errorPlacement: function(label, element) {
                    $(element).siblings(".err-msg").append(label);
                }
            })
        },
        //检查是否跟用户重名
//      checkName: function() {
//          if (getCookie('userName') == this.name) {
//              var label = document.createElement('label');
//              label.innerText = '该号码与您的号码重复！';
//              label.className = 'alert-danger';
//              //					$('input[name=username]')[0].appendChild(label);
//              label.id = 'username-error';
//              console.log($('input[name=username]').parent().next(".showErr").find('label').length);
//              if ($('input[name=username]').parent().next(".showErr").find('label').length == 0) {
//                  console.log('长度为0')
//                  $('input[name=username]').parent().next(".showErr").append(label);
//              } else if ($('input[name=username]').parent().next(".showErr").find('label').length == 1) {
//                  console.log('长度为1');
//                  setTimeout(function() {
//                      $('#username-error').text('该号码与您的号码重复！');
//                      $('#username-error').css('display', 'block');
//                  }, 100);
//
//              }
//              if ($('#username-error').text() == '') {
//                  console.log('内容为空')
//                  $('#username-error').text('该号码与您的号码重复！');
//                  $('#username-error').css('display', 'block');
//              }
//
//          }
//      },
//      //清掉错误信息
//      delErr: function() {
//          $('label').remove('#username-error');
//      },
        //用户企业邀请会员
        UserCompanyInv: function() {
            var that = this;
            var data = {
                cid: this.cid,
                name: this.name,
                role_id: $('#role_select_3')[0].value,
                inviter: this.inviter,
            }
            var vld = $('#inviteForm').validate();
            var h = vld.form();
//          this.checkName();
//          if ($('#username-error').text() == '') {
                if (h) {
                    api.UserCompanyInv(data).then(function(res) {
                        if (res.success) {
                            that.UserListGet();
                            that.name='';
                            that.inviter='';
                            $('.md-sure').closest('.md-modal').toggleCommModal('close');
                            $.CwsPopup.Alert('提示','邀请成功');
                        }
                    }).catch(function(err) {
                    	  $.CwsPopup.Alert("提示",err.data.msg);
                        console.log(err);
                    })
                }
//          }

        },
        //获取用户企业的会员类型
        UserRoleGet: function() {
            var _this = this;
            api.UserRoleGet().then(function(res) {
                if (res.data) {
                    _this.roleList = res.data;
                }
            }).catch(function(err) {
                console.log(err);
            })
        },
        //显示用户企业的会员类型
        showUserType: function(event) {
            $(event.currentTarget).siblings().css('display', 'block');
            $(event.currentTarget).siblings().slideDown();
             $(event.currentTarget).css({'border':'1px solid #ededed','border-bottom':'none','background':"#eee"})
        },
        //根据职位类型改变显示用户企业的会员或者会员的职位
        changeUserType: function(roleID,msg,id) {
//      	changeUserType(roleID,msg,id)
    	var _this = this;
    	this.currentpage=1;
    	setCurrentPage('mgrUser', _this.currentpage);
        if(msg==1){
        	    if(roleID=="所有"){
        	    	this.UserListGet();
        	    }else{
        	    	var showArr=[];
              		var data = {
                    cid: this.cid,
                    currentpage: this.currentpage,                       //当前页     必填
       			    pagesize: this.pagesize                           //页面大小 必填
	                }
	                api.UserListGet(data).then(function(res) {
	                    if (res.success) {
	                    	if(res.data && res.data[0] && res.data[0].length > 0){
	                    		 for (var i = 0; i < res.data[0].length; i++) {
		                            if (res.data[0][i].role_id == roleID) {
		                                showArr.push(res.data[0][i]);
		                            }
		                        }
		                        _this.userPeopleList = showArr;
		                         _this.noData=false;
	                    	}else{
	                    		_this.userPeopleList =res.data[0];
	                    		_this.noData = true;
	                    	}
	                       
	                    }
	                }).catch(function(err) {
	                    console.log(err);
	                })
        	    }
         }else if(msg==2){
                var data2 = {
                    id: id,
                    role_id: roleID
                };
                api.RoleChange(data2).then(function(res) {
                    if (res.success) {
                        _this.UserListGet();
                    }
                }).catch(function(err) {
                    console.log(err);
                })
         }else if (msg==3){
         	//直接返回  邀请页面选择角色
         	return false;
         }
//          $(event.currentTarget).parent().slideUp();
//          $(event.currentTarget).parent().prev().find('span').text($(event.currentTarget).text());
//          var id = $(event.currentTarget).attr('data');
//          var role_id = $(event.currentTarget).find('span').attr('id');
//          if ($(event.currentTarget).text() == '所有') {
//              this.UserListGet();
//              //根据类型改变显示用户企业的会员
//          } else if ($(event.currentTarget).parent().attr('id') == 'select-edit-list') {
//              var showArr = [];
//              var _this = this;
//              var data = {
//                  cid: this.cid,
//                  currentpage: this.currentpage,                       //当前页     必填
//     			    pagesize: this.pagesize                           //页面大小 必填
//              }
//              api.UserListGet(data).then(function(res) {
//                  if (res.success) {
//                      for (var i = 0; i < res.data[0].length; i++) {
//                          if (res.data[0][i].role_id == role_id) {
//                              showArr.push(res.data[0][i]);
//                          }
//                      }
//                      _this.userPeopleList = showArr;
//                  }
//              }).catch(function(err) {
//                  console.log(err);
//              })
//          }
//          //根据类型改变用户企业的会员的职位
//          if ($(event.currentTarget).parent().attr('id') == 'select-edit-list2') {
//              var _this = this;
//              var data2 = {
//                  id: id,
//                  role_id: role_id
//              };
//
//              api.RoleChange(data2).then(function(res) {
//                  if (res.success) {
//                      _this.UserListGet();
//                  }
//              }).catch(function(err) {
//                  console.log(err);
//              })
//          }
        },
        //获取用户企业的所有 人员列表
        UserListGet: function() {
            var _this = this;
            
            if(getCurrentPage('mgrUser')){
 				this.currentpage=getCurrentPage('mgrUser');
 			} 
            
            var data = {
                cid: this.cid,
                currentpage: this.currentpage,                       //当前页     必填
                pagesize: this.pagesize                           //页面大小 必填
            }
            api.UserListGet(data).then(function(res) {
                if (res.success) {
                	for(var n=0; n<res.data[0].length; n++){
		   	   	  		var insert_time=new Date(res.data[0][n].insert_time);
		   	   	  		res.data[0][n].insert_time=_this.getTime(insert_time);
		   	   	  	}
                    _this.userPeopleList = res.data[0];
                    _this.totalPages = res.data[1].pagenumber;//共几页
					_this.currentLines=res.data[0].length;
					 $(".x-tips").fadeOut();
					callBackLoadIframe();//重置iframe高度
                }
            }).catch(function(err) {
                console.log(err);
            })
        },
		//时间戳转换日期
         getTime:function(now){
         	    //将小于十的数变成两位
              function toDou(num){
                var num=num+"";
                return num=num.length>1?num : 0+num;
             }
         	  var   year=now.getFullYear();     
              var   month=now.getMonth()+1;     
              var   date=now.getDate();     
              var   hour=now.getHours(); 
              var   minute=now.getMinutes();  
              var   second=now.getSeconds(); 
              return   year+"-"+toDou(month)+"-"+toDou(date)+"   "+toDou(hour)+":"+toDou(minute)+":"+toDou(second); 
         },
        //重新邀请
        ReInvite: function(name,role_id) {
            var data = {
                cid: this.cid,
                name:name,
                role_id: role_id,
                inviter: '',
            }
            $.CwsPopup.Confirm("提示","您是否重新邀请该成员",function(){
                    api.UserCompanyInv(data).then(function(res) {
		                if (res.success) {
		                  $.CwsPopup.Alert("提示","已发送邀请！");
		                }
		            }).catch(function(err) {
		            	  $.CwsPopup.Alert("提示",err.data.msg);
		                console.log(err);
		            })
			},function(){
                   $.CwsPopup.OperateCwsPopup('hide');
			},'确定', '取消');
        },
        //取消邀请
        cancelInvite: function(id) {
            var _this = this;
            var data = {
                id: id,
                flag: 180
            };
            $.CwsPopup.Confirm("提示","您是否取消邀请",function(){
                api.CancelInvite(data).then(function(res) {
	                if (res.success) {
	                    _this.name = '';
	                    _this.inviter = '';
	                    _this.UserListGet();
	                  $.CwsPopup.Alert("提示","已取消邀请！");
	                }
	
	            }).catch(function(err) {
	            	  $.CwsPopup.Alert("提示","取消邀请失败！");
	                console.log(err);
	            })
			},function(){
                   $.CwsPopup.OperateCwsPopup('hide');
			},'确定', '取消');
        },
        //同意申请
        agreeInt: function(id) {
            var _this = this;
            var data = {
                id: id,
                flag: 0
            }
             $.CwsPopup.Confirm("提示","您是否同意该申请",function(){
                 	api.StatusChange(data).then(function(res) {
		                if (res.success) {
		                    _this.UserListGet();
		                  $.CwsPopup.Alert("提示","已同意该申请！");
		                }
		
		            }).catch(function(err) {
		            	 $.CwsPopup.Alert("提示","同意申请失败！");
		                console.log(err);
		            })
			},function(){
                   $.CwsPopup.OperateCwsPopup('hide');
			},'确定', '取消');
        },
        //不同意申请
        disagreeInt: function(id) {
            var _this = this;
            var data = {
                id:id,
                flag: 180
            };
             $.CwsPopup.Confirm("提示","您是否拒绝该申请",function(){
                 	api.CancelInvite(data).then(function(res) {
		                if (res.success) {
		                    _this.UserListGet();
		                  $.CwsPopup.Alert("提示","拒绝该申请成功！");
		                }
		            }).catch(function(err) {
		            	 $.CwsPopup.Alert("提示","拒绝该申请失败！");
		                console.log(err);
		            })
			},function(){
                   $.CwsPopup.OperateCwsPopup('hide');
			},'确定', '取消');
        },
        //离职解聘
        clearRole: function(id) {
            var _this = this;
            var data = {
                id: id,
                flag: -200
            };
            
			$.CwsPopup.Confirm("提示","您是否解聘该成员",function(){
				//获取该企业的管理员数量
				api.AdminCount({cid:_this.cid}).then(function(res){
					if(res.success){
						 if(res.data==1){
						 	//该企业只有一个管理员就不能解聘
						 	$.CwsPopup.Alert("提示","该企业最少需要一名管理员，无法将其解聘！");
						 	return ;
						 }else{
						 	//该企业有多个管理员可以解聘
						 	api.StatusChange(data).then(function(res) {
				                if (res.success) {
				                    _this.UserListGet();
				                  $.CwsPopup.Alert("提示","已解聘该成员！");
				                }
				            }).catch(function(err) {
				                console.log(err);
				                 $.CwsPopup.Alert("提示","解聘失败！");
				            })
						 }
					}
				}).catch(function(err){
					console.log(err);
				})
			},function(){
                   $.CwsPopup.OperateCwsPopup('hide');
			},'确定', '取消');
        },
        //将修改后的备注上传
        uploadRemarks: function(id,remark) {
            var _this = this;
            var data = {
                id: id,
                remark:remark,
            }
            api.RemarksChange(data).then(function(res) {
                if (res.success) {
                    _this.UserListGet();
                }
            }).catch(function(err) {
                console.log(err);
            })
        },
        //改变 查找的页面
        selcValue: function(e) {
            this.pagesize = $(e.target).find("option:selected").val();
            if(this.pagesize ){
	 				window.localStorage.setItem("pagesize",this.pagesize);
	 			}
            this.UserListGet();//查询内容
        },
        //跳转到某页
        changeCurrentPage: function(e) {
//          var _this = this;
//          if ($.trim($(e.target).val()) != '') {
//              if (Number($(e.target).val()) <= Number(_this.totalPages)) {
//                  _this.currentpage = $(e.target).val();
//              } else {
//                  $(e.target).val('');
//              }
//          }
//          setCurrentPage('mgrUser', _this.currentpage);
//          _this.UserListGet();
            var _this = this;
	 			if($.trim($('.currentpage').val()) != ''){
	 				if(Number($('.currentpage').val())<=0){
	 						_this.jumppage=_this.currentpage;
	 						return;
	 				}else  if(Number($('.currentpage').val()) <= Number( _this.totalPages)){
	 			    	  	_this.jumppage = $('.currentpage').val();
	 			    	  	_this.currentpage=_this.jumppage;
				 			setCurrentPage('mgrUser', _this.currentpage);
				 			_this.UserListGet();
	 			    }else{
	 			        	_this.jumppage=_this.currentpage;
	 			        	return;
	 			    }
	 			}
        },
        //上一页
        subPage: function(sign) {
            var _this = this;
            if (sign == 'son') {
                var cur = _this.currentpage - 1;
                if (cur > 0) {
                    _this.currentpage = cur;
                }
            } else {
                _this.currentpage = '1';
            }
            setCurrentPage('mgrUser', _this.currentpage);
            _this.UserListGet();
        },
        //下一页
        addPage: function(sign) {
            var _this = this;
            if (sign == 'son') {
                var cur = (_this.currentpage - 1 + 2) % (_this.totalPages - 1 + 2);
                _this.currentpage = (cur == 0) ? 1 : cur;
            } else {
                _this.currentpage = _this.totalPages;
            }
          	setCurrentPage('mgrUser', _this.currentpage);
            _this.UserListGet();
        },
        //获取用户信息
        getUserInfo: function() {
             	if(getUserCookie()){
					this.cid=getUserCookie().cid;
					this.uid=getUserCookie().uid;
				}
        },
    },
    mounted: function() {
    	var _this=this;
        this.validate();
        this.getUserInfo();
        if(window.localStorage.getItem("pagesize")){
	 			_this.pagesize=window.localStorage.getItem("pagesize");
	 		}else{
	 			window.localStorage.setItem("pagesize",_this.pagesize);
	 		}
        this.UserRoleGet();
        this.UserListGet();
 
    }
})
//邀请按钮
function interval(){
		//$('.md-effect-1').addClass('md-show');
	  //  $('.md-effect-1').CwsPopup.OperateCwsPopup('show'); //显示提示框
	    $('.md-effect-1').toggleCommModal('show');
}
$('.md-close').on('click', function() {
	$(this).closest('.md-modal').toggleCommModal('close');
});
//改变用户的管理员类型
function changeUserType(target,msg){
	var roleID =$(target)[0].value;
	var id=$(target).attr('data');
	mgrUser_vm.changeUserType(roleID,msg,id);
}
//邀请用户
function UserCompanyInv(){
	mgrUser_vm.UserCompanyInv();
}


function  uploadRemarks(target){
       $(target).css('border', 'none');
       $(target).addClass("focu");
       $(target).attr('readonly', 'readonly');
	   var id=$(target).attr('data');
	   var remark=$(target).val();
	   mgrUser_vm.uploadRemarks(id,remark);
}

function  changeRemarks(target){
	       $(target).siblings().css('border', '1px solid #ccc');
            $(target).siblings()[0].readOnly = false;
            $(target).prev('input').removeClass("focu");
}

//修改备注
//changeRemarks: function(event) {
//  $(event.currentTarget).siblings().children().css('border', '1px solid #ccc');
//  $(event.currentTarget).siblings().children()[0].readOnly = false;
//  $(event.currentTarget).prev().find('input').removeClass("focu");
//},
       
function ReInvite(target){
	var  name=$(target).attr('name');
	var  role_id=$(target).attr('role_id');
	mgrUser_vm.ReInvite(name,role_id);
}

function  clearRole(target){
	var id=$(target).attr('id');
	 mgrUser_vm.clearRole(id);
	
}

function cancelInvite(target){
	var id=$(target).attr('id');
	mgrUser_vm.cancelInvite(id);
}

function agreeInt(target){
	var id=$(target).attr('id');
	mgrUser_vm.agreeInt(id);
}
function disagreeInt(target){
	var id=$(target).attr('id');
	mgrUser_vm.disagreeInt(id);
}