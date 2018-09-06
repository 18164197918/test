var mgrBanner_vm = new Vue({
					data: function(){
						return {
//							initUrl: api.baseUrl()+'/banner.do?menu',
                         	labelList:[],     //获取label列表
							cid:null,           //0ccf4c87073e41d1ada3e7643e096d56
							lid:null,           //label的ID
							bannerList: [],
							relBannerLen:'',
//							descArr: []    // 描述空数组
                            text1:'',
                            text2:'',
                            text3:'',
                            text4:'',
                            text5:'',
                        	noData: false,
                        	textNum:0,
						}
					},
					methods:{
						getCid: function(){ // 通过local
							var cid =  '';
							if(getUserCookie()){
								cid=getUserCookie().cid || '';
							}
							if(cid){
								//
								this.cid = cid;
							}else{
								console.log("Error:当前用户没有cid!");
							}
						},
						getLabelList:function(){
							var _this=this;
							var  params={
								  cid:this.cid,
								  cat:100,
							}
							api.TBlistAllLabel(params).then(function(res){
								if(res.success ){
									_this.labelList=res.data;
									//初始化banner图
									_this.lid=res.data[0].id;
									_this.textNum=res.data[0].num;
									_this.getBanList();
								}
							}).catch(function(err){
								$.CwsPopup.Alert("提示","请添加可管理的banner");
								console.log(err);
							})
						},
						getBanList: function() { // banner列表
							var _this = this;
				 			api.TBlistByLabel({
								cid: _this.cid, // 用户id
								rtid:_this.lid,
								cat:100
				 			}).then(function(res){
				 				if(res.success) {
				 					_this.bannerList=res.data;
			 						if(res.data && res.data.length>0){
			 							_this.relBannerLen=res.data.length;
					 					setTimeout(function(){
						 					for(var n=0; n<res.data.length; n++){
						 						$('.ban-txt').eq(n).html('');
						 							var len=res.data[n].num;
						 							var arr=res.data[n];
						 						  for(var i=0; i<len; i++){
						 						  		if(_this.bannerList[n]["text"+(i+1)]){
								 						  	$('.ban-txt').eq(n).append('<div class="ban-txt-item"><input type="text" class="form-control input-ban" placeholder="编辑当前模板banner显示文字"><span class="wz-close iconfont">&#xe601;</span></div>');
								 						    $('.ban-txt').eq(n).find('input').eq(i).val(arr["text"+(i+1)]);
						 						  		}
						 						  	
						 						  }
						 					}
					 					},200);
				 					}
				 					callBackLoadIframe();//重置iframe高度
				 				}
					 		}).catch(function(err){
				 						_this.relBannerLen=0;
				 						_this.bannerList=[];
					 			console.log(err);
				 			});
						},
						addBanner: function() { // 添加banner
							var _this = this;
							var len= $("tbody tr").length;
							if(len>5){
								$.CwsPopup.Alert("提示","最多添加五张图片！");
								return false;
							}else{
								_this.bannerList.push({
									img:'',
									text1: '',//
									text2: '',//
									text3: '',//
									text4:'' ,//
									text5:'' ,//
									url:"",
								})
								if(len>2){
									callBackLoadIframe();//重置iframe高度
								}
							}
						},
					
						delBanner: function(id,ord) {
							var _this = this;
							if(id){
								api.delListsByIds({
									id: id // bannerId
					 			}).then(function(res){
					 				if(res.success) {
					 					_this.getBanList();
										// 删除成功
										$.CwsPopup.Alert("提示","删除成功！");
					 				}
						 		}).catch(function(err){
						 			console.log(err);
					 			});
							}else{
								$('tbody tr[ord='+ord+']').remove();
							}
		
						},
						//移动banner
						moveBanner:function(msg,id){
							var _this=this;
							if(msg==0){
								flag='asc';
							}else if(msg==1){
								flag='desc';
							}
							if(id){
								api.rankListsToLabel({
									id: id, // bannerId
         							rtid:this.lid, //labelID 									
									flag:flag,
					 			}).then(function(res){
					 				if(res.success) {
					 					_this.getBanList();
					 				}
						 		}).catch(function(err){
						 			console.log(err);
					 			});
							}else{
								$.CwsPopup.Alert("提示","请先保存再进行移动！");
							}
						},
						//添加或编辑banner
						addOReditBanner:function (){
							var _this=this;
							//初始获取数据的长度
							var dataLen=this.relBannerLen;
							//页面上现有的长度
							var relLen=$('tbody tr').length-1;
							var   paramsArr=[];
							
							for(var n=0;n<dataLen;n++ ){
								var bannerTextArr=[];
								if($('tbody tr').eq(n).find('.uploadimg').attr('src')){
								}else{
									$.CwsPopup.Alert("提示","请上传第"+(n+1)+"张banner图片，否则页面上无显示！");
									return false;
								}
								for(i=0;i<5;i++){
									if($('tbody tr').eq(n).find('.ban-txt input').eq(i)){
										var value=$('tbody tr').eq(n).find('.ban-txt input').eq(i).val();
										bannerTextArr.push(value);
									}else{
										bannerTextArr.push('');
									}
								}
								//修改
								var params={
									id: $('tbody tr').eq(n).attr('id'),//（tb_res_banner.id  ，修改时传，  选填）
									rtid:this.lid,
									img: $('tbody tr').eq(n).find('.uploadimg').attr('src'),//
									url: $('tbody tr').eq(n).find('.bannerUrl').val(),//
									text1: bannerTextArr[0],//
									text2: bannerTextArr[1],//
									text3: bannerTextArr[2],//
									text4: bannerTextArr[3] ,//
									text5: bannerTextArr[4] ,//
								}
								paramsArr.push(params);
							}
							for(var m=dataLen;m<relLen;m++ ){
								var bannerTextArr=[];
								if($('tbody tr').eq(m).find('.uploadimg').attr('src')){
								}else{
									$.CwsPopup.Alert("提示","请上传第"+(m+1)+"张banner图片，否则页面上无显示！");
									return false;
								}
								for(i=0;i<5;i++){
									
									if($('tbody tr').eq(m).find('.ban-txt input').eq(i)){
										var value=$('tbody tr').eq(m).find('.ban-txt input').eq(i).val();
										bannerTextArr.push(value);
									}else{
										bannerTextArr.push('');
									}
								}
								//新增
								var params={
									rtid:this.lid,
									img: $('tbody tr').eq(m).find('.uploadimg').attr('src'),//
									url: $('tbody tr').eq(m).find('.bannerUrl').val(),//
									text1: bannerTextArr[0],//
									text2: bannerTextArr[1],//
									text3: bannerTextArr[2],//
									text4: bannerTextArr[3] ,//
									text5: bannerTextArr[4] ,//
								}
								paramsArr.push(params);
							}
							
							api.addOrEditTopOrBannerInfo({json:paramsArr}).then(function(res){
				 				if(res.success) {
                                   window.location.reload();
				 				}
					 		}).catch(function(err){
					 			console.log(err);
				 			});
						},
					},
					mounted: function(){
						this.getCid();       // 获取用户信息(localStroge)
						this.getLabelList();
						  $(".x-tips").fadeOut();
						
					}
				}).$mount("#mgrBanner");
		
		//选择label
		function getBanList(target){
			var data=$(target).val();
			var num=$("#labelBanner option:selected").attr('num');
			mgrBanner_vm.lid=data;
			mgrBanner_vm.textNum=num;
			mgrBanner_vm.getBanList();
		}
		
		// 添加banner
		function addBanner(){
			mgrBanner_vm.addBanner();
		}
		
		// 删除banner
		function delBanner(target){
			var data = $(target).attr('data');
			var ord=$(target).attr('ord');
			mgrBanner_vm.delBanner(data,ord);
		}
		
		//移动banner图片的位置
		function moveBanner(msg,target){
			var id=$(target).attr('data');
			mgrBanner_vm.moveBanner(msg,id);
		}
		
		//添加banner的文字
		function addBanText(target,event){
			event.stopPropagation();
			var len=$(target).siblings().find('.ban-txt-item').length;
			var num=mgrBanner_vm.textNum;
			if(num==0){
				$.CwsPopup.Alert("提示","由于模板原因,此banner不能添加描述文字！");
				return false;
			}
			if(len<num){
				$(target).siblings().append('<div class="ban-txt-item"><input type="text" class="form-control input-ban" placeholder="编辑当前模板banner显示文字"><span class="wz-close iconfont">&#xe601;</span></div>'); 	
			}else{
				$.CwsPopup.Alert("提示","此banner最多添加"+num+"行描述文字！");
			}
			callBackLoadIframe();//重置iframe高度
		}
		
		//添加或者编辑Banner	
		function addOReditBanner(){
				mgrBanner_vm.addOReditBanner();
		}
		
		//展示树菜单	
		function showMenu(){
		var cityObj = $("#citySel");
		var cityOffset = $("#citySel").offset();
		$("#menuContent").slideDown("fast");
		$("body").bind("mousedown", onBodyDown);
		}
		
		//隐藏树菜单
		function hideMenu() {
		$("#menuContent").fadeOut("fast");
		$("body").unbind("mousedown", onBodyDown);
		}
		
		function onBodyDown(event) {
			if (!(event.target.id == "menuBtn" || event.target.id == "menuContent" || $(event.target).parents("#menuContent").length>0)) {
			hideMenu();
			}
		}	
		
		$(function(){
			//点击关闭banner文本
			$('tbody').on('click','.wz-close',function(){
				$(this).parent().remove();
			})
		})
			
			
			
			
			
			
			
			
			
			
			
			
			
