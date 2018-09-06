/*推荐管理*/
'use strict';
var vm_mgrRec = new Vue({
	    el:'#mgerecmd',
	 	data:function() {
	 		return {
	 			searchValue: '',    // 搜索(新闻列表)的内容
	 			cid: "",//6608e90675164229a916c8a26f00ed5f
	 			params: {
	 				cid: "null",            // (栏目cid)
	 				mid: ''
	 			},
	 			initTopIds:[],//初始化所有的topTen ids
	 			topTenIds:[],//所有的topTen ids
	 			lableList:[],//左侧lablel标签
	 			curent_labelId:'',//当前选中label ID//4266c92d07fa11e8baaa00e066be4002
	 			curent_labelName:'',//当前选中label Name
	 			noTopTen:true,//无topten
	 			topTenList:[],//左侧topTen list
	 			curent_topTenNum:'',//当前label最多添加topTen条目
	 			topTen_num:0,//当前已经添加条数
	 			res_topTenNum:0,//当前top还可以添加条目个数
	 			allCatList:[],//右侧所有的list
	 			currentpage: 1,           // 默认当前页码
	 			pagesize: 10,              // 每页显示的条数
				jumppage:null,            //跳转页码
	 			linesPerPage: ['10','20','30','50'],
	 			currentLines:'0',//当前请求行
	 			totalPages: '',
	 			toptoTalNum: 0,              // 总条数
	 			listData: [],             // 所有新闻数据列表
	 			globalIndex: 0,           // 全局index
	 			idArr: '',                // 存放id的空数组
	 			idBox: [],                // 存放数组
	 			//leftNewsList: [],
	 			isSwitch: false,            // 箭头函数是否已经触发
	 			sortArr: [],              // 排序数组
	 			checked: false,
	 			isShow: false,
	 			popIsShow: true,   // 删除弹窗是否显示
	 			deleteId: '',   // 正在删除的行id
	 			labelSet:{
	 				text: [],
	 				img :[],
	 				media:[]
	 			},//label设置
	 			topset_parms:{
	 				opt:'',
	 				cid:'',
	 				jsonStr:{}
	 			}
	 	
	 		}
	 	},
	 	methods: {
	 		/*剩余可添加topTen条数*/
	 		restItem:function(){
	 			 if(this.curent_topTenNum && this.curent_topTenNum >= this.topTen_num){
	 			 	 this.res_topTenNum = Number(this.curent_topTenNum) - Number(this.topTen_num);
	 			 }
	 		},
	 		/*获取label参数*/
	 		getParamsLabel: function(param){
	 			this.curent_labelId = $("#selectLabel").find('option:selected').val();
	 			this.curent_labelName = $("#selectLabel").find('option:selected').data('label');
	 			this.curent_topTenNum = $("#selectLabel").find('option:selected').data('num');
	 			var parm = param || '';
				this.selectTopTenByLabel(parm);
				this.selectCatListByLabel();
	 		},
	 		/**获取lable列表*/
	 		getLabelList: function(){
	 			var _this = this;
	 			api.TBlistAllLabel({
	 				cid: _this.cid,
	 				cat: 0//0： topTen   1： banner
	 			}).then(function(res){
	 				if(res.success){
	 					_this.lableList =res.data && res.data;
	 				}
	 			}).catch(function(err){
	 				console.log(err);
	 				if(err.status == 200){
	 					if(!err.data.success){
	 						console.log(err.data.msg);
	 						 $.CwsPopup.Alert("提示", "请联系后台管理员添加label列表！");
	 					}
	 				}
	 			});
	 		},
 			/******排行榜设置 start**********/
			/*上传文件*/
			upFile:function(event, index, type){
				var _this = this;
				var target = event && event.currentTarget;
			  	//成功后  如果是图片就回显图片
			  if(!target.files || !target.files[0]){
			  	return ;
			  } 
			  //此处可以限制附件显示大小
			  var file0 = target.files[0];
              if(_this.fileJudge(file0,index,type)){
          	  	$(target).siblings(".filetext").val($(target).val());
              	$("#x-loading").find('p').text('上传中,请稍后...');
     	  		$("#x-loading").fadeIn();
          		  var formData = new FormData();
             	  formData.append('C_ID', _this.cid);
             	  formData.append('C_NO', JSON.parse(getUserCookie().company).no || '');
             	  formData.append('file', file0);
             	  var pro = new Promise(function(resolve, reject){
             	  	   $.ajax({
		                    url: api.updateImgUrl()+'/upload/c',
		                    type: 'POST',
		                    cache: false,
		                    data: formData,
		                    processData: false,
		                    dataType:'json',
		                    contentType: false
		                }).done(function(result) {     
		                	if(result.path){
			                	_this.labelSet[type.toString()][index].url = result.path ;
			                	if(type != 'img'){
			                		$(target).parents('.form-group ').find('img').attr('src',fontBaseUrl+'img/media.jpg');
			                	}
			                	resolve(true);
		                	}
		                }).fail(function(err) {
		                    console.log(err);
		                    reject(false);
		                });
             	  });
             	 
			  	 pro.then(function(data){
			  	 	if(data){
			  	 		$("#x-loading").find('p').text('上传成功！');
			  	 		$("#x-loading").fadeOut();
			  	 		setTimeout(function(){
			  				$("#x-loading").find('p').text('');
			  	 		},200);
			  	 	}
			  	 }).catch(function(err){
				  	 	$("#x-loading").find('p').text('上传失败！');
				  	 	$("#x-loading").fadeOut();
		  				setTimeout(function(){
			  				$("#x-loading").find('p').text('');
			  	 		},200);
			  	 		
			  	 });
              }
             	 
			},
			/*根据传入条件判断上传附件条件*/
			fileJudge:function(file,index,type){
				console.log(file)
				var f_typ = file.type;
				var f_siz = file.size;
				var cur_fomt = this.labelSet[type.toString()][index].format;
				var cur_size = this.labelSet[type.toString()][index].size;
				console.log(cur_fomt+":::::"+cur_size);
				if(type == 'img'){
					  if(!/image\/\w+/.test(f_typ)){//是否是图片判断
				          $.CwsPopup.Alert("提示", "上传的不是图片！");
				         return false;
			          }else if( f_siz >= 200 * 1024 * 1024 ){//图片默认不超过200M(因无法根据像素比例算出图片的实际大小)
			          	  $.CwsPopup.Alert("提示", "上传图片过大！");
			          	 return false;
			          }
				}else{
					if(cur_size.indexOf('M') || cur_size.indexOf('m')){
						cur_size = cur_size.replace(/m/i,'');
						alert(cur_size)
					}
					if(/image\/\w+/.test(f_typ)){//是否是图片判断
				          $.CwsPopup.Alert("提示", "上传的不是媒体！");
				         return false;
			          }else if( f_siz >= Number(cur_size) * 1024 * 1024){//视频音频根据设定上传
			          	 $.CwsPopup.Alert("提示", "上传媒体过大！");
			          	 return false;
			          }
				}
				return true;
			},
 			/*根据labelId获取参数设置排行榜*/
			settindByLabel: function(parm){
	 			var _this = this;
	 			_this.topTenIds = [];  
	 			if(_this.curent_labelId){
	 				api.getTopListU({
		 				cid: _this.cid,
		 				top: _this.curent_labelName//筛选标签ID
		 			}).then(function(res){
		 				if(res.success){
		 					var data =  res.data;
		 					if(data[_this.curent_labelName.toString()+'i']){
		 						_this.labelSet = _this.curent_labelName && data[_this.curent_labelName.toString()+'i'] || {} ;
		 					}else{
		 						_this.labelSet = null;
	 							 $.CwsPopup.Alert("提示", "排行榜相关设置没有数据联系后台添加！");
		 					}
		 					
		 				}
		 			}).catch(function(err){
		 				console.log(err);
		 				if(err.status == 200){
		 					if(!err.data.success){
		 						_this.labelSet = null;
		 						 $.CwsPopup.Alert("提示", "没有排行榜相关设置数据联系后台添加！");
		 					}
		 				}
		 			});
					//test API
//					$.ajax({
//						type:"get",
//						url:fontBaseUrl+"test.json",
//						async:false,
//						success:function(result){
//							console.log(result);
//							var data = result.data;
//							if(result.success){
//								_this.labelSet = _this.curent_labelName && data[_this.curent_labelName.toString()+'i'] || {} ;
//								console.log(_this.labelSet)
//							}
//						},
//						error:function(){
//							 alert(77)
//						}
//					});
	 			}
	 		},
	 		/*提交所有设置*/
	 		submitAllSet:function(event){
	 			var _this = this;
	 			var top_name =_this.curent_labelName +'i';// _this.curent_labelName +'i';
	 			var target = event && event.currentTarget;
	 			$(target).attr('disabled', true);
	 			 _this.topset_parms.cid = _this.cid;// _this.cid;
	 			  _this.topset_parms.opt="edit";     //修改操作
	 			 _this.topset_parms.jsonStr[top_name] =  _this.labelSet;
	 			api.setTopListU(_this.topset_parms).then(function(data){
	 				if(data.success){
	 					 $.CwsPopup.Alert("提示", "提交成功！");
	 					$(target).attr('disabled', false);
	 				}
	 			}).catch(function(err){
	 				if(err.status == 200){
		 					if(!err.data.success){
		 						 $.CwsPopup.Alert("提示", "提交失败！");
		 					}
	 				}
	 			})
	 		},
			/******排行榜设置 end**********/
			
			/******排行榜设置 end**********/
	 		/*根据labelID获取topTen列表*/
	 		selectTopTenByLabel: function(parm){
	 			var _this = this;
	 			_this.topTenIds = [];
	 			if(_this.curent_labelId){
	 				api.TBlistByLabel({
		 				cid: _this.cid,
		 				rtid: _this.curent_labelId,//筛选标签ID
		 				cat: 0//0： topTen   1： banner
		 			}).then(function(res){
		 				if(res.success){
		 					_this.topTenList =res.data && res.data;
		 					if(_this.topTenList){
		 						_this.noTopTen = false;
		 						for(var i =0 ;i < _this.topTenList.length ; i++){
		 							if(parm == 'init'){//初始化调用
			 							_this.initTopIds.push(_this.topTenList[i].rid);
			 						}
			 							_this.topTenIds.push(_this.topTenList[i].rid);
		 						}
		 					
		 					}
		 					_this.topTen_num = _this.topTenList && _this.topTenList.length;
		 				}
		 			}).catch(function(err){
		 				console.log(err);
		 				if(err.status == 200){
		 					if(!err.data.success){
		 						 _this.noTopTen = true;
		 						 _this.topTen_num = 0;
		 						 //$.CwsPopup.Alert("提示", "topTen列表"+err.data.msg);
		 					}
		 				}
		 			});
	 			}
	 		},
	 		compareIds:function(a, b){
	 			return a-b;
	 		},
	 		/*左侧TopTen操作：删除*/
 			deleteFun: function (rtlid) { /* 删除 */
	 			var _this = this;
	 			if(rtlid){
	 				$(".x-tips").fadeIn();
	 					api.delListsByIds({
	 						id: rtlid
	 					}).then(function(res){
	 	 					if(res.success){
	 	 						_this.selectTopTenByLabel();
	 	 						_this.selectCatListByLabel();       // 获取右侧列表数据
	 	 						 $(".x-tips").fadeOut();
	 	 					}
	 	 				}).catch(function(err){
	 	 					 if(err.status == 200){
	 	 						 if(err.data.success == false){
	 	 							 console.log(err);
	 		 	 					// $.CwsPopup.Alert("提示","删除失败！");
	 	 						 }
	 	 					 }
	 	 				})
	 					
	 			}
	            
	 		},
	 		rankFun: function (id, rank) { /* 升降序公用方法 */
	 			var _this = this
	 			if(rank){
	 				api.rankListsToLabel({ /* 列表设置接口 */
		 				id: id,      // id(必填)
		 				rtid: _this.curent_labelId,//label ID
		 				flag: rank	// (必填)asc.升序，desc.降序
		 			}).then(function(res){
		 				if(res.success){
		 					_this.selectTopTenByLabel();
		 				}
		 			}).catch(function(err){
		 				console.log(err)
		 			})
	 			}
	 			
	 		},
	 		//选中右侧条目
	 		listSet: function (event,index) {
	 			var _this = this;
	 			var id = $(event.currentTarget).attr('rowId');
	 			$(".right-item").removeClass('li-group-active');
	 			$(".i-arrow-big").css('color','#00cdff');
	 			$(".i-arrow-big1").css('color','#00cdff');
	 			$(event.currentTarget).addClass('li-group-active');
	 			_this.idArr = id
	 			if(_this.allCatList === undefined || _this.allCatList.length > 0){
	 				for(var i = 0; i < _this.allCatList.length; i++) {
	 					_this.allCatList[i].checked = false
		 			}
		 			_this.allCatList[index].checked = true
	 			}
	 			
	 			_this.idBox = [];     // 将放ID的数组清空
			},
			//添加到topTen
 			addContent: function () {  /* 将选中的内容添加到左侧 */
				var _this = this;
				$(".i-arrow-big").css('color','#acabab');
	 			$(".i-arrow-big1").css('color','#acabab');
				this.topTen_num = $("#lf-item").find('li.list-group-hasitem') &&  $("#lf-item").find('li.list-group-hasitem').length || 0;
				//获取当前触发的id号
				_this.idBox.push(_this.idArr);
				// 判断数组是否有重复
				if(_this.isRepeat(_this.idBox)) {
					// 数组存在重复id;
					return false;
				}else {
					if(Number(_this.curent_topTenNum) > Number(_this.topTen_num)){
						api.addHotListsToLabel({ /* 列表设置接口 */
							cid: _this.cid,    				// cid
							rtid: _this.curent_labelId ,//label ID
							rid: _this.idArr                    // 当前页
						}).then(function(res){
							if(res.success){
								_this.selectTopTenByLabel();       // 获取左侧列表数据
								_this.selectCatListByLabel();       // 获取右侧列表数据
								//_this.res_topTenNum = 
							}
						}).catch(function(err){
							console.log(err)
						});
					}
				}
	 		},
	 		
	 		///////////////////////////////
	 				//跳转到某页
			changeCurrentPage: function(e){
				var _this = this;
	 			if($.trim($('.currentpage').val()) != ''){
	 				if(Number($('.currentpage').val())<=0){
	 						_this.jumppage=_this.currentpage;
	 						return;
	 				}else  if(Number($('.currentpage').val()) <= Number( _this.totalPages)){
	 			    	  	_this.jumppage = $('.currentpage').val();
	 			    	  	_this.currentpage=_this.jumppage;
				   			 setCurrentPage('mgrRecom', _this.currentpage);
				   			_this.loadContent();
	 			    }else{
	 			        	_this.jumppage=_this.currentpage;
	 			        	return;
	 			    }
	 			}  
	
	 		},
	 		subPage: function(sign){
	 			var _this = this;
	 			if(sign == 'son'){
		 			var cur = _this.currentpage -1 ;
		 			if(cur > 0){
		 				_this.currentpage = cur;
		 			}
	 			}else{
	 				_this.currentpage = '1';
	 			}
	 			 setCurrentPage('mgrRecom', _this.currentpage);
	 			_this.selectCatListByLabel();
	 		},
	 		addPage: function(sign){
	 			var _this = this;
	 			var chge = '';
	 			if(sign == 'son'){
		 			var cur = (_this.currentpage -1 + 2) % (_this.totalPages-1+2);
		 			//_this.currentpage 
		 			chge = (cur == 0) ? 1 : cur ;
	 			}else{
	 				//_this.currentpage 
	 				chge =  _this.totalPages;
	 			}
	 			
	 			if(_this.totalNum >= chge){
	 				_this.currentpage  =chge;
	 				 setCurrentPage('mgrRecom', _this.currentpage);
	 				_this.selectCatListByLabel();
	 			}
	 			
	 		},
	 		/////////////////////////
	 		/*获取右侧下拉list*/
	 		selectCatListByLabel: function(){
	 			var _this = this;
	 			api.listsResourcesTop({
	 				cid: _this.cid,
	 				rtid: _this.curent_labelId ,
	 				searchItems:  _this.searchValue,
	 				currentpage: _this.currentpage,
	 				pagesize: _this.pagesize
	 			}).then(function(res){
	 				if(res.success){
	 					if(res.data){
	 					_this.allCatList =res.data && res.data[0] && res.data[0];
	 					var pagenumber = res.data[1].pagenumber;    // 1 总页数 
		 					_this.totalNum = res.data[1].pagecount;      // 6 总共的数据条数
//		 					 _this.contentLines = res.data[0];           
				   	   	     _this.totalPages = res.data[1].pagenumber;//共几页
				   	   	     _this.currentLines=res.data[0].length;
	 						callBackLoadIframe();//重置iframe高度
	 					}
	 				}
	 			}).catch(function(err){
	 				console.log(err);
	 				if(err.status == 200){
	 					if(!err.data.success){
	 						 $.CwsPopup.Alert("提示", "所有列表"+err.data.msg);
	 					}
	 				}
	 			});
	 		},
	 		//--------------------------end
			searchNews: function (){  /* 搜索查询 */
				var _this = this;
				_this.selectCatListByLabel();
			},
			
			getCid: function(){
				if(getUserCookie()){
					this.cid=getUserCookie().cid ;
				}
			},
			// tool: 数组里面是否有重复数据
			isRepeat: function (arr) {
				var hash = {};
				for(var i in arr) {
					if(hash[arr[i]])
					return true;
					hash[arr[i]] = true;
				}
				return false;
			}
	 	},
	 	watch:{
 			 lableList: function(){
			 	  var _this = this;
			 	  this.$nextTick(function(){
			 	 // 	_this.getParamsLabel('init');//初始化并显示排行榜内容
			 	   
			 	  	_this.getParamsLabel('init');//初始化并显示排行榜内容
			 	  });
			 },
			 curent_labelId: function(){//获取当前选中的labelid
			 	 var _this = this;
			 	  this.$nextTick(function(){
			 	      _this.settindByLabel();
			 	  });
			 },
			 topTen_num: function(){
		 		  var _this = this;
			 	  this.$nextTick(function(){
			 	  	_this.restItem();//初始化条数
			 	  });
			 }
	 	},
	 	mounted:function(){
	 		this.getCid();
	 		this.getLabelList();//获取lablel list
	 		callBackLoadIframe();
	 	}
})


/*筛选select*/
function selectListByLabel(){
	vm_mgrRec.getParamsLabel();
}

/*输入关键词搜索监听事件*/
$(document).on("input propertychange","#searchrightinfo",function(){
	vm_mgrRec.searchNews();
});

/*切换页面提示清除缓存*/
function judge(global_cid) {
	var initIds = vm_mgrRec.initTopIds || [];
	var oprIds = vm_mgrRec.topTenIds || [];
	var flag = false;
	var change = false;
	if(initIds.length == oprIds.length){
		  if(initIds.length != 0 && oprIds.length != 0){
			   for(var i =0 ; i< initIds.length ;i++ ){
				   for(var j =0 ; j< oprIds.length ; j++){
					   if(initIds[i] == oprIds[j]){
						   flag = true;
						   break;
					   }
				   }
				   if(!flag){
					   change = true;
					   break;
				   }
			   }
		  }
	}else{
		 change = true;
	}
	 if(change){
			if(global_cid){
				 $.CwsPopup.Confirm("清除缓存","内容已改变,确认清除缓存。",function(){
				  	  	$.ajax({
				  	  		url:api.baseUrl()+"sys.do?clear",
				  	  		type:"post",
				  	  		data:{"cid": global_cid},
				  	  		dataType: "json",
				  	  		success:function(data){
				  	  			if(data.success){
			  	  					 $.CwsPopup.Alert("提示", "清除成功！");
				  	  			}else{
			  	  					 $.CwsPopup.Alert("提示", "清除失败！");
				  	  			}
				  	  		},
				  	  		error:function(err){
				  	  			 $.CwsPopup.Alert("提示", "清除失败！");
				  	  		}
				  	  	});
				},function(){
			        $.CwsPopup.OperateCwsPopup('hide');
				},'确认', '取消');
			}
	  }else{
		  return ;
	  }
}

	
/*清除缓存调用*/
document.addEventListener('visibilitychange', function (e) {
	e.stopPropagation();
	e.preventDefault(); 
	 var arr,reg=new RegExp("(^| )"+'cid'+"=([^;]*)(;|$)"),global_cid;
	   	arr = document.cookie.match(reg);
	    if(arr){
	        global_cid =  unescape(arr[2]); 
	    }else{ 
	       global_cid =  null; 
	    }
	judge(global_cid);
});


/*上传图片*/
// $(document).on('click',".submit-btn",function(){
// 	    var form_id  = $(this).data('form');
//	    var form_tpy = $(this).data('type');
//	    var form_idx = $(this).data('index');
//	    var $ipt_text = $(this).siblings('.filetext');
////		   	    console.log(form_id)
////		   		$('#'+form_id).attr('action', 'http://172.19.0.30:8080/upload/c');
////		   	  $('#'+form_id).submit();
////		   	  
//	   	var formData = new FormData(document.getElementById(form_id));
//	    $.ajax({
//	      url: 'http://172.19.0.30:8080/upload/c',
//	      type: 'post',
//	      data: formData,
//	      processData: false,
//	      contentType: false,
//	      xhrFields: {
//	        withCredentials: true
//	      },
//	      crossDomain: true,
//	      success: function (result) {
//	        // ...
//	        if(result.success){
//	        	alert(111)
//	        	var data = result.data;
//	        	data && data.path &&  $ipt_text.val(data.path);
//	            vm_mgrRec.setFileUrl($ipt_text,form_tpy,form_idx);//上传成功后将url重新提交
//	        }
//	     
//	      },
//	      error: function (obj) {
//	         alert('服务器请求失败');
//		      }
//		    })
// });