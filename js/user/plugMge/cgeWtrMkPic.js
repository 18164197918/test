var wtrMkPic_vm=new Vue({
    data: {
        'cid': null,
        'link_type': 1,  //水印类型
        'img': null,       //水印图片
        'diaphaneity': null, //水印透明度
        'v_text': null, // 水印文字
        'img_width': '',//水印图片的宽
        'img_height': '',//水印图片的高
        'img_size': null, //水印尺寸
        'shift': null,    //图片偏移
        'rotate': null,   //图片旋转
        'srv_position': null, //水印位置
        'status': null,    //水印状态
    },
    methods: {
        //正则验证
        validate: function () {
            $("#wtrMkPicForm").validate({
                onfocusout: function (element) { $(element).valid(); },
                onkeyup: false,
                focusCleanup: true,
                rules: {
                    diaphaneity: {
                        floatNum: true
                    },
                    img_width: {
                        addNum: true
                    },
                    img_height: {
                        addNum: true
                    },
                    shift: {
                        rNum: true
                    },
                    rotate: {
                        rNum: true
                    },
                },
                messages: {
                    diaphaneity: {
                        floatNum: "透明度为0~1的一位小数"
                    },
                    img_width: {
                        addNum: "图片宽度为正整数"
                    },
                    img_height: {
                        addNum: "图片高度为正整数"
                    },
                    shift: {
                        rNum: "图片偏移为整数"
                    },
                    rotate: {
                        rNum: "图片旋转为整数"
                    }
                },
                invalidHandler: function (form, validator) {
                    $.CwsPopup.Alert("提示", "验证结果不正确，请重新登录！");
                    return false;
                },
                errorPlacement: function (label, element) {
                    $(label).addClass("alert-danger");
                    $(element).siblings(".err-msg").append(label);
                }

            });

        },
        //获取用户以前填写的图片水印数据
        getInfo: function () {
            var _this = this;
            api.getOS({ cid: this.cid, flag: -200 }).then(function (res) {
                if (res.data) {
                    _this.id = res.data.id;
                    _this.img = res.data.img;
                    $('#waterPic').attr('src', _this.img);
                    _this.link_type = res.data.link_type;
                    if(!  _this.link_type){
                    	_this.link_type =1;
                    }
                    _this.diaphaneity = res.data.diaphaneity;
                    _this.v_text = res.data.vtext;
                    _this.shift = res.data.shift;
                    _this.rotate = res.data.rotate;
                    _this.srv_position = res.data.srv_position;//广告位置
                    _this.status = res.data.status;//状态 
                    var img_size = res.data.img_size.split(',');
                    _this.img_width =img_size[0];
                    _this.img_height =img_size[1];
                    if( _this.img_width=='null'){
                    	_this.img_width=null;
                    }
                    if( _this.img_height=='null'){
                    	_this.img_height=null;
                    }
                    $('.adfd').val(res.data.srv_position);
                    if (res.data.status == 0) {
                        $('input[name=pst-cho]')[1].checked = true;
                    } else if (res.data.status == 1) {
                        $('input[name=pst-cho]')[0].checked = true;
                    }

                }
            }).catch(function (err) {
                //alert('你尚未填写客服插件，若有需要请完成填写');
                console.log(err);
            })
        },
        //修改图片水印
        setWtrmkPic: function () {
            var params = {
                'id': this.GetQueryString('id'),
                'cid': this.cid,
                'link_type': $('.link_type').val(),
                'img': $('#waterPic').attr('src'),
                'diaphaneity': this.diaphaneity,
                'vtext': this.v_text,
                'img_size': this.img_width + ',' + this.img_height,
                'shift': this.shift,
                'rotate': this.rotate,
                'srv_position': $('.adfd').val(),
                'status': $('input[name=pst-cho]:checked').val(),
                'flag': -200
            }
            var vld = $("#wtrMkPicForm").validate();
            var h = vld.form();
            var isWtrMk=false;
            if(this.v_text || this.link_type){
            	isWtrMk=true;
            }
            //必须有图片或者文字水印才能保存
            if(isWtrMk){
		            //验证通过才可以下一步 跳转并把合法数据传递
		            if (h) {
		                api.saveOS(params).then(function (res) {
		                    if (res.success) {
		                        console.log('修改成功！');
		                           setIframeUrl('user/plugMge/wtrMkPic.html');
//		                        window.location.href =fontBaseUrl + 'user/plugMge/wtrMkPic.html';
		                        windowOpenPage(fontBaseUrl + 'user/plugMge/wtrMkPic.html');
		                    }
		                }).catch(function (err) {
		                    //alert('你尚未填写客服插件，若有需要请完成填写');
		                    console.log(err);
		                })
		            }
            }
        },
        //截取url的参数值
        GetQueryString: function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]); return null;
        },
        getUserInfo: function () {
            if (getUserCookie()) {
                this.cid = getUserCookie().cid;
            }
        }
    },
    mounted: function () {
        this.validate();
        this.getUserInfo();
        this.getInfo();
        $(".x-tips").fadeOut();
    }
}).$mount("#cgeWtrMkPic");


//选择友情链接的类型
function chooseType(target){
            if ($(target).val() == 1){
            	wtrMkPic_vm.link_type=1;
                $('.link_img').hide();
                callBackLoadIframe();
            } else if ($(target).val() == 0) {
        		wtrMkPic_vm.link_type=0;
                $('.link_img').show();
                callBackLoadIframe();
            }
            callBackLoadIframe();
}
