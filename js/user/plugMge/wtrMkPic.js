new Vue({
    data: function () {
        return {
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
        }
    },
    methods: {
        //获取用户以前填写的客服插件数据
        getInfo: function () {
            var _this = this;
            api.getOS({ cid: this.cid, flag: -200 }).then(function (res) {
                if (res.data) {
                    _this.id = res.data.id;
                    _this.img = res.data.img;
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
//                  _this.isPic();
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
                    $(".x-tips").fadeOut();
                    callBackLoadIframe();//重置iframe高度
                }
            }).catch(function (err) {
            	 $(".x-tips").fadeOut();
                //alert('你尚未填写客服插件，若有需要请完成填写');
                console.log(err);
//              _this.isPic();
            })
        },
        //修改图片水印
        setWaterPic: function () {
        	  setIframeUrl('user/plugMge/cgeWtrMkPic.html?id=' + this.id);
           // window.location.href = fontBaseUrl + 'user/plugMge/cgeWtrMkPic.html?id=' + this.id;
        	 windowOpenPage(fontBaseUrl + 'user/plugMge/cgeWtrMkPic.html?id=' + this.id);
        },
        //获取信息
        getUserInfo: function () {
            if (getUserCookie()) {
                this.cid = getUserCookie().cid;
            }
        },
        //判断是否显示图片
//      isPic: function () {
//          console.log(this.img);
//          if (this.img) {
//              $('#isWaterImg').css('display', 'block');
//              $('img[name=rImg]').attr('src', this.img);
//          } else {
//              $('#isWaterImg').css('display', 'none');
//              setTimeout(function () {
//                  $.CwsPopup.Alert("提示", "检测到您没有上传水印图片，请点击修改按钮完成！");
//              }, 100)
//          }
//      }
    },
    mounted: function () {
        this.getUserInfo();
        this.getInfo();

    }
}).$mount('#wtrMkPic')
