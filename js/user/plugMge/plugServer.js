new Vue({
    el: "#plugserver",
    data: {
            id: null,              //保存的id
            cid: null,           //cid
            style: null,         //样式
            color: null,          //颜色
            computerCode: '',     //第三方电脑代码
            phoneCode: '',        //第三方手机代码
            serverQQ: null,       //客服QQ
            serverPhone: null,    //客服电话
            codeImg: '',          //二维码图片
            position: '',         //悬浮位置
            qqNum: 0,            //qq添加个数
            phoneNum: 0,         //电话添加个数
    },
    methods: {
        //获取样式数据
        getStyleData: function() {
            //获取样式
            var styleChoose = $('input[name=plug-ra]')
            for (var n = 0; n < styleChoose.length; n++) {
                if (styleChoose[n].checked) {
                    this.style = (n + 1) % 3;
                }
            }
            //获取颜色
            if (this.style == 1) {
                this.color = $('.color-1').val();
            } else if (this.style == 2) {
                this.color = $('.color-2').val();
            } else {
                this.color = null;
            }
            //获取客服QQ
            var QQArr = [];
            var phoneArr = [];
            var QQ = $('.qq-number');
            
            for (var n = 0; n < QQ.length; n++) {
            	if(QQ[n].value){
	                QQArr.push(QQ[n].value);
            	}
            }
            this.serverQQ = QQArr.join(',');
            //获取客服电话
            var phone = $('.phone-number');
            for (var n = 0; n < phone.length; n++) {
            	if(phone[n].value){
	                phoneArr.push(phone[n].value);
            	}
            }
            this.serverPhone = phoneArr.join(',');
            //获取二维码图片
            this.codeImg = $('img[name=wxImg]').attr('src');
            //获取悬浮位置
            this.position = $('input[name=pst-cho]:checked').val();

        },
        //保存选择
        keepCode:function(){
        	   this.getStyleData();
        	    var _this = this;
                api.getOS({ cid: this.cid,flag: 200  }).then(function(res) {
                    _this.id = res.data.id;
                }).catch(function(err) {
                    console.log(err);
                })
                var params = {
                    id: this.id,                
                    cid: this.cid,                       
                    srv_style: this.style,              //样式
                    srv_colour: this.color,              //颜色
                    srv_pcCode: this.computerCode,      //第三方电脑代码
                    srv_mobCode: this.phoneCode,        //第三方手机代码
                    srv_QQ: this.serverQQ,              //客服QQ
                    srv_phone: this.serverPhone,        //客服电话
                    srv_qrCode: this.codeImg,           //二维码图片
                    srv_position: this.position,        //悬浮位置
                    flag: 200
                }
                api.saveOS(params).then(function(res) {
                    if (res.success) {
                		$.CwsPopup.Alert("提示","保存成功！");
                    
                    }
                }).catch(function(err) {
                    console.log(err);
                })
        },
        
//      keepCode1: function() {
//          this.getStyleData();
//          //第一步保存
//          if ($('.pre-step').css('display') == 'none') {
//              if ($('input.plug-choose1').is(':checked')) {
//                  $('.plug-sty').hide();
//                  $('.plug-inform').show();
//                  $('.pre-step').show();
//                  $('.infor').addClass('content-tab-active').siblings().removeClass('content-tab-active');
//                  $('.plug-serv-1:eq(1)').show();
//					$('.plug-serv-2:eq(1)').hide();
//                  var xx = $(".color-1").find("option:selected").text();
//                  if (xx == '红色') {
//                      $('.plug-serv-item-1-active').css({ 'background': 'red', 'border': 'none' })
//                  } else if (xx == '蓝色') {
//                      $('.plug-serv-item-1-active').css({ 'background': 'blue', 'border': 'none' })
//                  }
//
//              } else if ($('input.plug-choose2').is(':checked')) {
//                  $('.plug-sty').hide();
//                  $('.plug-inform').show();
//                  $('.pre-step').show();
//                  $('.infor').addClass('content-tab-active').siblings().removeClass('content-tab-active');
//                  $('.plug-serv-1:eq(1)').hide();
//                  $('.plug-serv-2:eq(1)').show();
//
//                  var xx = $(".color-2").find("option:selected").text();
//                  if (xx == '红色') {
//                      $('.plug-serv-item-2').css({ 'background': 'red', 'border': 'none' });
//                  } else if (xx == '蓝色') {
//                      $('.plug-serv-item-2').css({ 'background': 'blue', 'border': 'none' });
//                  } else if (xx == '颜色') {
//                      $('.plug-serv-item-2').css({ 'background': '#298ddc', 'border': 'none' });
//                  }
//              } else {
////                  alert("提交失败,请选择 一个 样式");
//
//              }
//
////              if (this.style != 0) {
//                  var params = {
//                      id: this.id,
//                      cid: this.cid,
//                      srv_style: this.style,              //样式
//                      srv_colour: this.color,              //颜色
//                      srv_pcCode: this.computerCode,      //第三方电脑代码
//                      srv_mobCode: this.phoneCode,        //第三方手机代码
//                      flag: 200
//                  }
//                  api.saveOS(params).then(function(res) {
//                      console.log(res);
//                  }).catch(function(err) {
//                      console.log(err);
//                  })
////              }
//
//          } else {  //第二步保存
//              //获取id
//              var _this = this;
//              api.getOS({ cid: this.cid }).then(function(res) {
//                  console.log(res.data);
//                  _this.id = res.data.id;
//              }).catch(function(err) {
//                  console.log(err);
//              })
//              console.log(this.id);
//              var params = {
//                  id: this.id,
//                  cid: this.cid,
//                  srv_style: this.style,              //样式
//                  srv_colour: this.color,              //颜色
//                  srv_pcCode: this.computerCode,      //第三方电脑代码
//                  srv_mobCode: this.phoneCode,        //第三方手机代码
//                  srv_QQ: this.serverQQ,              //客服QQ
//                  srv_phone: this.serverPhone,        //客服电话
//                  srv_qrCode: this.codeImg,           //二维码图片
//                  srv_position: this.position,        //悬浮位置
//                  flag: 200
//              }
//              api.saveOS(params).then(function(res) {
//                  console.log(res);
//                  if (res.success) {
//                      $('.plug-sty').show();
//                      $('.plug-inform').hide();
//                      $('.pre-step').hide();
//                      $('.sty').addClass('content-tab-active').siblings().removeClass('content-tab-active');
////                      var url = window.location.href;
////                      window.location.href = url.slice(0, url.indexOf('#') + 1) + '/user/plugSer';
//                      window.location.href=fontBaseUrl +'user/plugserver.html';
//                  }
//              }).catch(function(err) {
//                  console.log(err);
//              })
//          }
//      },
//      //换颜色
//      chooseColor: function(event) {
//          var color = null;
//          if ($(event.currentTarget)[0].value == '1') {
//              color = 'red';
//          } else if ($(event.currentTarget)[0].value == '2') {
//              color = 'blue';
//          } else if ($(event.currentTarget)[0].value == '0') {
//              color = '#298ddc';
//          }
//          if (event.currentTarget.getAttribute('class') == 'color-1') {
//              $('.plug-serv-item-1-active').css({ 'background': color, 'border': 'none' });
//          } else if (event.currentTarget.getAttribute('class') == 'color-2') {
//              $('.plug-serv-item-2').css({ 'background': color, 'border': 'none' });
//          }
//
//      },
//      showStyle: function(event) {
//      	alert(111)
//          $(event.currentTarget).next().show().parent().siblings().find('.plug-serv-item').hide();
//      },
        //切换代码输入框
        changeCode: function(event) {
            var ord = $('.plug-code-box-list').index($(event.currentTarget));
            $(event.currentTarget).addClass('plug-code-box-list-active').siblings().removeClass('plug-code-box-list-active');
            $('.plug-code-text textarea').css('display', 'none');
            $('.plug-code-text textarea:eq(' + ord + ')').css('display', 'block');

        },
        //点击添加QQ，电话
        addItem: function(event, msg) {
            //添加QQ（上限3个）
            if (msg == 1) {
				var qqNum = $('body').find('.qq-number').length;
                if (qqNum < 3) {
                    $(event.currentTarget).parent().prev().append('<div class="col-md-3 col-sm-3 ml-15 mobile_mb15"><div class=" add-plu rel"><input type="text"  class="form-control qq-number"/><i class="iconfont i-clone-del cur-p">&#xe624;</i></div></div>');
                }
                 if (qqNum >= 2) {
                 	$(event.currentTarget).parent().hide();
                 }
                
                //添加客服电话（上限3个）
            } else if (msg == 2) {
                var  phoneNum=$('body').find('.phone-number').length;
                if (this.phoneNum < 3) {
                     $(event.currentTarget).parent().prev().append('<div class="col-md-3 col-sm-3 ml-15 mobile_mb15"><div class=" add-plu  rel"><input type="text" class="form-control phone-number"/><i class="iconfont i-clone-del cur-p">&#xe624;</i></div></div>');
                }
                if (phoneNum >= 2) {
                 	$(event.currentTarget).parent().hide();
                 }
            }
        },
        //点击上一步
//      preStep: function() {
//          $('.plug-sty').show();
//          $('.plug-inform').hide();
//          $('.pre-step').hide();
//          $('.sty').addClass('content-tab-active').siblings().removeClass('content-tab-active');
//      },
        //获取用户的cid
        getCid: function() {//通过local
            var cid = '';
            if(getUserCookie()){
				cid = getUserCookie().cid ;
			}
            if (cid) {
                this.cid = cid;
            } else {
                console.log("Error:当前用户没有cid!");
            }
        },
        //获取用户以前填写的客服插件数据
        getOS: function() {
            var _this = this;
            api.getOS({ cid: this.cid, flag: 200 }).then(function(res) {
                if (res.success) {
                    _this.id = res.data.id;
                    var getData = res.data;
                    _this.computerCode = getData.srv_pcCode;     //第三方电脑代码
                    _this.phoneCode = getData.srv_mobCode;       //第三方手机代码
                    _this.position = getData.srv_position;       //悬浮位置
                    //回填样式
                    $('input[name=plug-ra]')[getData.srv_style - 1].checked = true;
                    //回填颜色
                    if (getData.srv_style == 1) {
                        $('.color-1').val(getData.srv_colour);
                    } else if (getData.srv_style == 2) {
                        $('.color-2').val(getData.srv_colour);
                    }
                    //回填QQ
                    if(getData.srv_QQ){
                    	var QQArr = getData.srv_QQ.split(',');
                    	 for(var n=0;n<QQArr.length; n++){
                    	 	if(! QQArr[n]){
                    	 		QQArr.splice(n,1);
                    	 	}
                    	 }
                    	if (QQArr.length > 1) {
                    	    for (var n = 0; n < QQArr.length - 1; n++) {
                    	        $('input[name=serverQQ]').parent().parent().parent().append('<div class="col-md-3 col-sm-3 ml-15 mobile_mb15"><div class=" add-plu  rel"><input type="text"  class="form-control qq-number"/><i class="iconfont i-clone-del cur-p">&#xe624;</i></div></div>');
                    	    }
                    	} else {
                    	    $('input[name=serverQQ]').val(QQArr[0]);
                    	}
                    	for (var i = 0; i < QQArr.length; i++) {
                    	    $('.qq-number')[i].value = QQArr[i];

                    	}
                    }
                    //回填客服电话
                    if(getData.srv_phone){
                    	var phoneArr = getData.srv_phone.split(',');
                    	if (phoneArr.length > 1) {
                    	    for (var n = 0; n < phoneArr.length - 1; n++) {
                    	        $('input[name=serverPhone]').parent().parent().parent().append('<div class="col-md-3 col-sm-3 ml-15 mobile_mb15"><div class=" add-plu  rel"><input type="text" class="form-control phone-number"/><i class="iconfont i-clone-del cur-p">&#xe624;</i></div></div>');
                    	    }
                    	} else {
                    	    $('input[name=serverPhone]').val(phoneArr[0]);
                    	}
                    	for (var i = 0; i < phoneArr.length; i++) {
                    	    $('.phone-number')[i].value = phoneArr[i];
                    	}
                    }
                    //回填二维码图片
                    $('img[name=wxImg]').attr('src', getData.srv_qrCode);
                    //回填悬浮位置
                    if (getData.srv_position == 0) {
                        $('input[name=pst-cho]')[1].checked = true;
                    } else if (getData.srv_position == 1) {
                        $('input[name=pst-cho]')[0].checked = true;
                    }
					callBackLoadIframe();//重置iframe高度
                }



            }).catch(function(err) {
                //		            		alert('你尚未填写客服插件，若有需要请完成填写');
                console.log(err);
            })
        }
    },
    mounted: function() {
        //获取用户信息
        this.getCid();
        //获取用户以前填写的客服插件数据
        this.getOS();
        //点击删除QQ或客服电话
        $(".x-tips").fadeOut();
       callBackLoadIframe();//重置iframe高度
        
        
        
        // 显示样式
//      $('.plug-serv-item').hide();
//      $(".plug-style").hover(function() {
//          $(this).next().show().parent().siblings().find('.plug-serv-item').hide();
//      }, function() {
//          $('.plug-serv-item').hide();
//      });
//      
//      $(".plug-style1").hover(function() {
//        $('.plug-serv-1').show();
//        $('.plug-serv-2').hide();
//      }, function() {
//          $('.plug-serv-item').hide();
//      });
//      $(".plug-style2").hover(function() {
//        $('.plug-serv-2').show();
//        $('.plug-serv-1').hide();
//      }, function() {
//          $('.plug-serv-item').hide();
//      });
    }
})

  //点击删除QQ或客服电话
	$('.form-group-del').on('click', '.i-clone-del', function() {
	    var len=$(this).parent().parent().parent().children().length;
	    if(len<=3){
	      $(this).parent().parent().parent().siblings().show();	
	    }
    	$(this).parent().parent().remove();
	});