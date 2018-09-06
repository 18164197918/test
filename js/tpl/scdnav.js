//var promis = new Promise(function(resolve, reject){
$("#scdnav").load(fontBaseUrl+'tpl/scdnav.tpl', function(){
	var scdnav_vm=new Vue({
		data: function(){
			return {
				id: "",//当前栏目id
			//	pid:'',//当前栏目ID的父ID,
				pname:'',//当前栏目ID的父Name
				parentTitle: "",//父类名称
				sname:'',//当前子类名称
				secdList:[],//其下子菜单栏目显示
				crubms:{}  //二级状态栏crubms
			}
		},
		methods:{
			active: function(ele){//激活二级菜单
				var _this = this;
				var path = window.location.pathname;
				var id =$(ele.currentTarget).attr("id");
				if(id && path){
					window.location.href =  path+"?id="+id;
				}
			},
			activeCrubms: function(flag){//如果存在二级导航 (修改crumbs的状态栏信息)
				var _this =this;
				if(flag){
					_this.crubms.pname && $(".crubms-box").find(".partitle").text(_this.crubms.pname);
					_this.crubms.sname && $(".crubms-box").find(".childtitle").text(_this.crubms.sname);
					_this.crubms.sname || $(".crubms-box").find(".childtitle").text(_this.crubms.pname);
					_this.crubms.sname || $(".crubms-box").find(".secdtitle").hide();
				}else{
					_this.crubms.pname && $(".crubms-box").find(".childtitle").text(_this.crubms.pname);
					_this.crubms.sname || $(".crubms-box").find(".secdtitle").hide();
					$(".intro").css({'height':'auto','overflow':'hidden'});
				}
			},
			subUrl: function(){//通过访问url跳转后（解析url查询）
					var _this = this;
					var url = window.location.href;
					var search = window.location.search || "";
					if(search){
						var trans = search.substring(1) || "";
						var arry = trans.split("&") || [];
						for(var i=0; i<arry.length ; i++){
							var cur = (arry[i].indexOf("=")>-1) ? arry[i].split("=") : "";
							(cur[0] == 'id') && (_this.id = cur[1]);
							//(cur[0] == 'pid') && (_this.pid = cur[1]);
							//(cur[0] == 'pname') && (_this.pname = cur[1]);
						}
					}
			},
			loadSecdNav: function(){//根据父类id遍历其下子类
				var _this = this;
				if(_this.id){
						api.ColumnBroListGet({//加载栏目相关所有内容(接口未调试)
								id:_this.id
								//type: _this.type
						}).then(function(res){
							if(res.success){
								//_this.activeCrubms(false);
							    if(res.data){
							    	if(res.data.length >0){
							    		_this.pname = res.data[0] && res.data[0].pname; 
					    				console.log("erji导航！！！！");
										console.log(_this.secdList)
										for(var i = 0 ;i < res.data.length; i++){
											var obj = res.data[i];
											if(obj.id == _this.id){
												obj.active = 'hover';
												_this.sname = obj.name;
											}
											_this.secdList.push.call(_this.secdList, obj);
										}
									//	resolve({'pname': _this.pname, 'sname': _this.sname});
										_this.crubms ={'pname': _this.pname, 'sname': _this.sname};
										_this.activeCrubms(true);
										console.log("erji导航！！！！");
									console.log(_this.secdList)
									}else{
										_this.pname = res.data.pid || res.data.name;
										//resolve({'pname': _this.pname});
										_this.crubms ={'pname': _this.pname};
										_this.activeCrubms(false);
									}
								}
							}
			   			}).catch(function(error){
			   					console.log(error);
			   					if(error.data){
			   						if(!error.data.success){
											_this.secdList ="";
											_this.pname = "";
											_this.crubms ={'pname':_this.pname};
											_this.activeCrubms(false);
			   						}
			   					}
			   			})
		   			}
				}
//				chooseNav:function (msg){
//			    	if(msg){
//			    		window.localStorage.setItem('sadfasdf',msg);
//			    	}else{
//			    		window.localStorage.setItem('sadfasdf',0);
//			    	}
//			    }
			},
//			watch:{
//				secdList:function(){
//					var _this=this;
//					  this.$nextTick(function(){
//					  		var ord= window.localStorage.getItem('sadfasdf');
//							$('.nav-column>li').eq(ord).children('a').addClass('hover');
//					  })
//				}
//			},
			mounted: function(){
				this.subUrl();//截取查询参数
				this.loadSecdNav();//根据父类id遍历其下子类栏目
			}
		}).$mount('#scdnav');
		//scdnav_vm.subUrl();
		//scdnav_vm.loadSecdNav();//根据父类id遍历其下子类栏目
	
	});
//
//var ord= window.localStorage.getItem('sadfasdf');
//if(ord){
//	$('.nav-column>li').children('a').removeClass('hover');
//	$('.nav-column>li').eq(ord).children('a').addClass('hover');
//}

	
	
//})
//return window['p'] = promis;
//})(jQuery);

//$(function(){
//	setTimeout(function(){
//		init();
//	},100)
//})
//function init(){
//	var ord= window.localStorage.getItem('sadfasdf');
//	$('.nav-column>li').eq(ord).children('a').addClass('hover');
//}