var rn1 = 0;
var rn2 = 0;
var rn3 = 0;
var rn4 = 0;
var logo=null;
var topId=null;
var C_NO=null;
var Max_Width = 400; 		//400px     //限制截取的图片的最大宽度
var Max_Height = 300; 		//300px  	//限制截取的图片的最大高度

function stopPropagation(e) {
	e = e || window.event;
	if(e.stopPropagation) { //W3C阻止冒泡方法
		e.stopPropagation();
	} else {
		e.cancelBubble = true; //IE阻止冒泡方法
	}
}
$(function(){
	$(".cancle").click(function() {
		$(".show").css('display','none');
	})
    var  type='';
	$(document).on("click",".maimglst",function() {
		//显示p
		$('body').find('.cutimg-tips').show();
		
		if($(this).attr('data')){
			topId=$(this).attr('data');
		}
		var imgtype = $(this).attr("title");
		$(".img-type").text(imgtype);
        type=imgtype;
		var aratio = $(this).parent().attr("aratio");
		if(aratio && aratio != "") {
			$(".img-type").attr("aratio", aratio);
		} else {
			$(".img-type").removeAttr("aratio");
		}
	});

	$("#poster-inputs").bind("click", function() {
		$(".img-type").text("qjdfm");
		var aratio = "4";
	});
	'use strict';
	var console = window.console || { log: function() {} },
		$alert = $('.docs-alert'),
		$message = $alert.find('.message'),
		showMessage = function(message, type) {
			$message.text(message);
			if(type) {
				$message.addClass(type);
			}
			$alert.fadeIn();
			setTimeout(function() {
				$alert.fadeOut();
			}, 3000);
		};
	// Demo
	// -------------------------------------------------------------------------
	(function() {
		var $image = $('.img-container > img'),
			$dataX = $('#dataX'),
			$dataY = $('#dataY'),
			$dataHeight = $('#dataHeight'),
			$dataWidth = $('#dataWidth'),
			$dataRotate = $('#dataRotate'),
			options = {
				minContainerWidth: $(".modal-dialog .modal-body>div").css("width"),
				minContainerHeight: $(".modal-dialog .modal-body>div").css("height"),
				preview: '.img-preview',
				crop: function(data) {
					$dataX.val(Math.round(data.x));
					$dataY.val(Math.round(data.y));
					$dataHeight.val(Math.round(data.height));
					$dataWidth.val(Math.round(data.width));
					$dataRotate.val(Math.round(data.rotate));
				}
			};
		$image.on({
			'build.cropper': function(e) {
//				console.log(e.type);
			},
			'built.cropper': function(e) {
				//console.log(e.type);
			},
			'dragstart.cropper': function(e) {
				//console.log(e.type, e.dragType);
			},
			'dragmove.cropper': function(e) {
				//console.log(e.type, e.dragType);
			},
			'dragend.cropper': function(e) {
				//console.log(e.type, e.dragType);
			},
			'zoomin.cropper': function(e) {
				//console.log(e.type);
			},
			'zoomout.cropper': function(e) {
				//console.log(e.type);
			}
		}).cropper(options);
		// Methods
		$(".show").on('click', '[data-method]', function() {
           api.ListCpInfo({cid:getUserCookie().cid}).then(function(res){
        	   C_NO=res.data.no;
           }).catch(function(err){
        	   console.log(err);
           })
			
			var data = $(this).data(),
				$target,
				result;
			if(data.method) {
				data = $.extend({}, data); // Clone a new one
				if(typeof data.target !== 'undefined') {
					$target = $(data.target);
					if(typeof data.option === 'undefined') {
						try {
							data.option = JSON.parse($target.val());
						} catch(e) {
							console.log(e.message);
						}
					}
				}
				if((typeof $(".cropper-canvas img").attr("src")) === 'undefined') {
					return false;
				}
				result = $image.cropper(data.method, data.option);
				var ohtml = $(result).outerHtml();
				if(ohtml && ohtml.indexOf("canvas") >= 0) {
					var layJuH = layer.load(2, { shade: [0.2, '#000'], skin: 'loadbg' });
				} else {
					layer.closeAll('loading');
					return false;
				}
				//上传top管理图片
		        var reg=/^(min_Img)[^\s]+/ig;
		        var isTop=reg.test(type);  //校验是否是排行榜的图片
		        if(isTop){
		            //测试图片的高宽
//					var isAllow=false;
//					isAllow = result.width <= Max_Width && result.height <= Max_Height;
//	                if(isAllow){
//	       				console.log("宽度高度尺寸通过");
//		            }else{
//		                $.CwsPopup.Alert("提示",'宽高未通过，要求截取图片的最大宽度:'+ Max_Width +'px, 截取图片的最大高度:'+ Max_Height+"px");
//		                return;
//		            }
				}
                
                
				
				lrz(result.toDataURL())
					.then(function(rst) {
						//0代表加载的风格，支持0-2
						// window.open(rst.base64)
						var das = "";
//						var type = $(".img-type").text().replace(/\s/g, "");
						var userId = $("#userId").val();
						var compressfmt = $("#compressfmt").val();
						$.ajax({
							//											url: '/upload/c',
							url: api.updateImgUrl()+'/upload/c',
							type: 'post',
							data: {
								"pic": rst.base64,
								"name": type,
								'uid': userId,
								'C_NO':C_NO,
								'C_ID':getUserCookie().cid || '',
								'compressfmt': "100:144,xxs,xs,s,m,l,xl,xxl"
							},
							dataType: "json",
							success: function(data) {
								$("img[name="+data.name+"]").attr("src",data.url);
								$('.show').modal('hide');
								$(".cropper-container.cropper-bg").remove();
								$(".img-container img").removeClass("cropper-hidden");
								layer.closeAll('loading');
                          	    var uid='';
                          	    var cid='';
	                            if(getUserCookie()){
									uid=getUserCookie().uid ;
									cid=getUserCookie().cid ;
								}
	                            
	                            if(data.name=='personImg'){
	                             	var img=$('#personImg').attr('src');
	                             	//将图片上传至服务器的个人资料
	                             	api.meberEdit({id:uid,img:img}).then(function(res){
										if(res.success){
											//保存成功
										}
									}).catch(function(err){
										alert('保存失败！');
										console.log(err);
									})
	                             }else if(data.name=='companyImg'){
	                             	var params={
	                             		cid:cid,
	                             		uid:uid,
	                             		logo:$('#companyImg').attr('src')
	                             	}
	                             	api.AddCpInfo(params).then(function(res){
								   	    if(res.success){
									    }    
								    }).catch(function(error){
								   	    console.log(error);
				                    })
	                             }
	                             
	                             //上传top管理图片
	                             var reg=/^(min_Img)[^\s]+/ig;
	                             
	                             var isTop=reg.test(data.name);  //校验是否是排行榜的图片
	                             if(isTop){
	                             	var params={
	                             		id:topId,
	                             		img:data.url,
	                             	}
	                             	api.TopImg(params).then(function (res){
	//                           		console.log(res);
	                             	}).catch(function(err){
	                             		console.log(err);
	                             	})
	                             }
							},
							error: function() {
								//error
								alert('图片保存失败');
								layer.closeAll('loading');
							}
						})
					})
					.catch(function(err) {
						layer.closeAll('loading');
						// console.log(err)
						// 处理失败会执行
					})
					.always(function() {
						// console.log(1)
						// 不管是成功失败，都会执行
					});
				if($.isPlainObject(result) && $target) {
					try {
						$target.val(JSON.stringify(result));
					} catch(e) {
						console.log(e.message);
					}
				}
			}
		}).on('keydown', function(e) {
			var imgRatio = $(".img-type").attr("aratio");
			if(imgRatio) {
				switch(e.which) {
					case 37:
						e.preventDefault();
						$image.cropper('move', -1, 0).cropper('aspectRatio', "1/1");
						break;
					case 38:
						e.preventDefault();
						$image.cropper('move', 0, -1).cropper('aspectRatio', "1/1");
						break;
					case 39:
						e.preventDefault();
						$image.cropper('move', 1, 0).cropper('aspectRatio', "1/1");
						break;
					case 40:
						e.preventDefault();
						$image.cropper('move', 0, 1).cropper('aspectRatio', "1/1");
						break;
				}
			} else {
				switch(e.which) {
					case 37:
						e.preventDefault();
						$image.cropper('move', -1, 0);
						break;
					case 38:
						e.preventDefault();
						$image.cropper('move', 0, -1);
						break;
					case 39:
						e.preventDefault();
						$image.cropper('move', 1, 0);
						break;
					case 40:
						e.preventDefault();
						$image.cropper('move', 0, 1);
						break;
				}
			}

		});
		// Import image
		var $inputImage = $('#inputImage'),
			URL = window.URL || window.webkitURL,
			blobURL;
		if(URL) {
		$inputImage.on("change",function(e){
			//图片方向角 added by lzk
				var Orientation = null;
				var files = this.files,
					file;
				if(files && files.length) {
					file = files[0];
					if(/^image\/\w+$/.test(file.type)) {
						//获取照片方向角属性，用户旋转控制
						EXIF.getData(file, function() {
							EXIF.getAllTags(this);
							Orientation = EXIF.getTag(this, 'Orientation');
						});

						var oReader = new FileReader();
						oReader.onload = function(e) {
							var image = new Image();
							image.src = e.target.result;
							image.onload = function() {
								var expectWidth = this.naturalWidth;
								var expectHeight = this.naturalHeight;

								if(this.naturalWidth > this.naturalHeight && this.naturalWidth > 800) {
									expectWidth = 800;
									expectHeight = expectWidth * this.naturalHeight / this.naturalWidth;
								} else if(this.naturalHeight > this.naturalWidth && this.naturalHeight > 1200) {
									expectHeight = 1200;
									expectWidth = expectHeight * this.naturalWidth / this.naturalHeight;
								}
								//隐藏p
								$('body').find('.cutimg-tips').hide();
								
								var canvas = document.createElement("canvas");
								var ctx = canvas.getContext("2d");
								canvas.width = expectWidth;
								canvas.height = expectHeight;
								ctx.drawImage(this, 0, 0, expectWidth, expectHeight);
								var base64 = null;
								var mpImg = new MegaPixImage(image);
								mpImg.render(canvas, {
									maxWidth: 800,
									maxHeight: 1200,
									quality:0.8,
									orientation: Orientation
								});
								base64 = canvas.toDataURL("image/jpeg", 0.8);
								if(navigator.userAgent.match(/iphone/i)) {
									console.log('iphone');
								} else if(navigator.userAgent.match(/Android/i)) { // 修复android
								} else {}
								var boburl = dataURLtoBlob(base64);
								blobURL = URL.createObjectURL(boburl);
								console.log(blobURL);

								var imgtio = $(".img-type").attr("aratio");
								console.log(imgtio);
								if(imgtio && imgtio != "") {
									if(imgtio == 1) {
										$image.cropper("setAspectRatio", 1 / 1);
									} else {
										$image.cropper("setAspectRatio", imgtio);
									}
								} else {
									$image.cropper("setAspectRatio", NaN);
								}
								$image.one('built.cropper', function() {
									URL.revokeObjectURL(blobURL); // Revoke when load complete
								}).cropper('reset', true).cropper('replace', blobURL);

								$inputImage.val('');
							}
						}
						oReader.readAsDataURL(file);
					} else {}
				}
			//上传top管理图片
//	        var reg=/^(min_Img)[^\s]+/ig;
//	        var isTop=reg.test(type);  //校验是否是排行榜的图片
//	        if(isTop){
//		        testWidthHeight(this);      //测试图片的高宽
//			}
			
		})
		
		} else {
			$inputImage.parent().remove();
		}
		$('.docs-options :checkbox').on('change', function() {
			var $this = $(this);
			options[$this.val()] = $this.prop('checked');
			$image.cropper('destroy').cropper(options);
		});
		//$('[data-toggle="tooltip"]').tooltip();
	}());
});


