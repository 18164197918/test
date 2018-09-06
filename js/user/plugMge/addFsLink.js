var addFsLink_vm=new Vue({
    data: function () {
        return {
			id: null,           //链接的ID 
            cid: '',			//公司ID
            title: null,	    //链接名称
            img: null,			//链接图片
            res_url: null, 		//链接地址
            link_type: 1,		//链接类型
            vtext: null,		//友情链接备注说明
            status: null		//状态 
        }
    },
    methods: {
        //正则验证
        validate: function () {
            $("#addFsLinkForm").validate({
                onfocusout: function (element) { $(element).valid(); },
                onkeyup: false,
                focusCleanup: true,
                rules: {
                    title: {
                        required: true
                    },
                    res_url: {
                        url: true,
                        required: true
                    },

                },
                messages: {
                    title: {
                        required: "链接名称不能为空"
                    },
                    res_url: {
                        url: "请填写正确的完整链接地址",
                        required: "链接地址不能为空"
                    },

                },
                invalidHandler: function (form, validator) {
                    return false;
                },
                errorPlacement: function (label, element) {
                    $(label).addClass("alert-danger");
                    $(element).siblings(".err-msg").append(label);
                }

            });

        },
        //获取填写的链接数据
        getFskData: function () {
            var _this = this;
            var params = {
                id: this.id,
            }
            api.getPlugInfo(params).then(function (res) {
                if (res && res.data) {
                    _this.title = res.data.title;//广告名称
                    _this.res_url = res.data.res_url;//广告链接
                   // $('.link_type').val(res.data.link_type);
                    _this.link_type=res.data.link_type;
                    if (res.data.link_type == 1) {
                        $('.link_img').hide();
                    } else if (res.data.link_type == 0) {
                        $('.link_img').show();
                    }
                    $('img[name=rImg]').attr('src', res.data.img);

                    _this.vtext = res.data.vtext;
                    if (res.data.status == 0) {
                        $('input[name=pst-cho]')[1].checked = true;
                    } else if (res.data.status == 1) {
                        $('input[name=pst-cho]')[0].checked = true;
                    }
                }
            }).catch(function (err) {
                console.log(err);
            })

        },
        //保存友情链接插件
        saveFsk: function () {
        	//上传文字类型的友情链接
            if (this.link_type== 1) {
                $('img[name=rImg]').attr('src', null);
            //上传图片类型的友情链接
            }else if (this.link_type == 0){
            	if($('img[name=rImg]').attr('src')){
            		
            	}else{
            		$.CwsPopup.Alert("提示","请上传友情链接的图片！");
            		return false;
            	}
            }
            var params = {
                id: this.id,
                cid: this.cid,
                title: this.title,
                img: $('img[name=rImg]').attr('src'),
                res_url: this.res_url,
                link_type: this.link_type,
                vtext: this.vtext,
                status: $('input[name=pst-cho]:checked').val(),
                flag: 100
            }
            
            
            var vld = $("#addFsLinkForm").validate();
            var h = vld.form();
            //验证通过才可以下一步 跳转并把合法数据传递
            if (h) {
                api.saveOrUpdate(params).then(function (res) {
                    if (res.success) {
                        //保存成功
                        setIframeUrl('user/plugMge/mgeFsLink.html');
                      //  window.location.href = fontBaseUrl + 'user/plugMge/mgeFsLink.html';
                        windowOpenPage(fontBaseUrl + 'user/plugMge/mgeFsLink.html');
                    }
                }).catch(function (err) {
                    console.log(err);
                })
            }
        },
        //截取url的参数值
        GetQueryString: function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]); return null;
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
            this.id = this.GetQueryString('id');
        },
    },
    mounted: function () {
        this.validate();
        //获取用户信息
        this.getUserInfo();
        //获取已有链接信息
        this.getFskData();
        $(".x-tips").fadeOut();
        callBackLoadIframe();
    }
}).$mount("#addFsLink");


//选择友情链接的类型
function chooseType(target){
	       console.log(addFsLink_vm.link_type);
            if ($(target).val() == 1){
            	addFsLink_vm.link_type=1;
                $('.link_img').hide();
            } else if ($(target).val() == 0) {
        		addFsLink_vm.link_type=0;
                $('.link_img').show();
            }
            callBackLoadIframe();
}


