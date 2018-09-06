//loadCont = function(target){
//	if(target.indexOf("#") > -1){
    new Vue({
			data: function(){
				return {
					id: '',//
					pid:'',//
					type: '',//
					content:[],//
					navigateOne:"",
					navigateTwo:"",
				}
			},
			methods:{
				subUrl: function(){
//					var _this = this;
//					var url = window.location.href;
//					var search = window.location.search || "";
//					if(search){
//						var trans = search.substring(1) || "";
//						var arry = trans.split("&") || [];
//						for(var i=0; i<arry.length ; i++){
//							var cur = (arry[i].indexOf("=")>-1) ? arry[i].split("=") : "";
//							(cur[0] == 'id') && (_this.id = cur[1]);
//							(cur[0] == 'pid') && (_this.pid = cur[1]);
//						}
//					}
            	this.id=getQueryString('id');
 				this.pid=getQueryString('pid');

				},
				loadContent: function(){
					var _this = this;
					if(_this.id){
							api.loadPageCont({
									mid:_this.id
									//type: _this.type
							}).then(function(res){
								if(res.success){
									var data = res.data[0];
									_this.content = res.data[0] && res.data[0].vtext;
									$("#page").html(_this.content);
									//initPageInfo(data.title, data.keywords, data.vdesc);//修改标签添加keywords
								}
				   			}).catch(function(error){
				   					console.log(error);
				   			})
		   			}
				},
				
				
				
			},
			mounted: function(){
				this.subUrl();
				this.loadContent();
			}
		}).$mount("#page");

    new Vue({
			data: function(){
				return {
					id:null,
					navigateOne:"",
					navigateTwo:"",
				}
			},
			methods:{
				//获取当前的页面导航名称
				getNavigate:function(){
				    	this.id=getQueryString('id');
					    var _this=this; 
						api.ColumnBroListGet({//加载栏目相关所有内容(接口未调试)
								id:this.id
						}).then(function(res){
							if( res.success){
								var len=res.data.length;
								if(len>0){
									for(var i=0;i<len;i++){
								        if(_this.id==res.data[i].id){
								        	_this.navigateOne=res.data[i].pname;
								        	_this.navigateTwo=res.data[i].name;
								        }
									}
								}
							}
						}).catch(function(error){
			   					console.log(error);
			   			})	
				}	
			},
			mounted: function(){
				this.getNavigate();
			}
		}).$mount("#navigate");