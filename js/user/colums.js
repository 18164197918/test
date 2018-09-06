;(function($){
 	
	var flag = false;
    var Categories = function(selector, conf, sign){
        var _this = this,
            config={},
            method= '',
            rMenu=$('#rMenu'),
            /*z-tree操作功能封装*/
            flush = function(){
            	_this.ztree.reAsyncChildNodes(null, "refresh");
			},
            /*操作功能扩展*/
            move_in = function(treeNode) {
                _this.ztree.setting.edit.enable = true;
			},

			move_out = function(treeNode) {
                 _this.ztree.setting.edit.enable = false;
			},

			del = function(treeNode){
				var cid ="";
				if(getUserCookie()){
					cid=getUserCookie().cid || '';
				}
				 $.CwsPopup.Confirm("确认删除","确认删除当前节点么？",function(){
				 	api.DelColumnNode({
				 	   cid: cid,
				 	   id:	treeNode.id
				 	}).then(function(res){
				   		if(res.success){
							 window.location.reload();
				   		}
				  }).catch(function(error){
                   	    if(error.data){
                   	    	if(!error.data.success){
                   	    		$.CwsPopup.Alert("提示",error.data.msg);
                   	    	}
                   	    }
                   })
				 	$.CwsPopup.OperateCwsPopup('hide');
				 });
				 _this.treeNode = treeNode;
			},
			add = function (treeNode){
				$('#md-addColumn').toggleCommModal('show');
				$("#addFirst")[0].reset();   //清空表单
                 _this.treeNode = treeNode;
			},
			edit = function(treeNode){
				/*调用查询接口回填信息*/	
				vm_mgecolumn.zTreeEditNode(treeNode);
				$('#md-modColumn').toggleCommModal('show');
				$(".upload-file img").attr('src','');  //清空栏目图片
				_this.treeNode = treeNode;
			},
//			rename = function(treeNode){
//				if(treeNode == null){
//					$.CwsPopup.Alert("提示","没有找到此节点！");
//				} else{
//                  _this.ztree.editName(treeNode);
//				}
//			},
			move_up = function (treeNode){//上移
 				var lev = treeNode.level;
				if(lev < 3){
					moveNode('up', treeNode);
				}else{
					console.log("此级别节点不能移动！");	
				}
			},
			move_down = function (treeNode){//下移
			 	var lev = treeNode.level;
				if(lev < 3){
					moveNode('down', treeNode);
				}else{
					console.log("此级别节点不能移动！");	
				}
			},
			moveNode = function(oper, treeNode){//移动节点
				var targetNode = '';
				var moveType = '';//前一个 后一个
				var isSlient = true;//不展开父节点
				var tip ='';
				if(oper == 'up'){//上移动
					 targetNode = treeNode.getPreNode();
					 moveType = 'prev';
					 tip = '上移';
				}else{//下移动
					targetNode = treeNode.getNextNode();
					moveType = 'next';
		            tip = '下移';
				}
			    if(targetNode){
					 	var params = {
					 		'mid': treeNode.id,
					 		'pid': treeNode.pid,
					 		'cid': '',
					 		'sortno': treeNode.sortno,
					 		'flag' :oper
					 	}
					 	if(getUserCookie()){
							params.cid=getUserCookie().cid ;
						}
					 	$.ajax({
					 		type:"post",
					 		url: api.baseUrl()+"/column2.do?columnMove",
					 		data: params,
					 		async:true,
					 		success: function(data){
					 			if(JSON.parse(data).success == true){
									window.location.reload();
					 			}else{
					 				$.CwsPopup.Alert("提示",JSON.parse(data).msg);
					 			}
					 		},
					 		error: function(err){
					 			console.log(err);
					 		}
					 	});
				}
			},
			bindMethods = function(treeNode){
				var _this = this;
				$("a[data-name='add'],a[data-name='edit'],a[data-name='del']").on("click",function(e){//a[data-name='rename'],
					     e.stopPropagation();
						 method = $(this).data("name");
						 if(typeof(eval(method))=='function'){
							eval(method).call(this, treeNode);
						 }else{
						 	$.CwsPopup.Alert("提示","没有此种操作！");
						 }
						 $('.diyBtn').remove() && $('#treeDemo').find('a').removeClass('curSelectedNode');
				});
                $("a[data-name='upmove']").on("click",function(e){//上移
                    e.stopPropagation();
                    if(typeof(eval("move_up"))=='function'){
                        eval("move_up").call(this, treeNode);
                    }else{
                        $.CwsPopup.Alert("提示","没有此种操作！");
                    }
                });
                 $("a[data-name='downmove']").on("click",function(e){//下移
                    e.stopPropagation();
                    if(typeof(eval("move_down"))=='function'){
                        eval("move_down").call(this, treeNode);
                    }else{
                        $.CwsPopup.Alert("提示","没有此种操作！");
                    }
                });
		    },
			onClick = function(event, treeId, treeNode) {
		    	// 阻止事件冒泡
		    	event.stopPropagation();
				var aObj = $("#" + treeNode.tId +"_a");
				if(sessionStorage.getItem('curId') == treeNode.tId) { //点击同一个元素
					// aObj.find("span").hasClass('diyBtn')  &&  $('.diyBtn').siblings('i').remove() && $('.diyBtn').remove() && aObj.removeClass('curSelectedNode');
					 $('.diyBtn').remove() && aObj.removeClass('curSelectedNode');
					sessionStorage.setItem('curId','');
				} else {
					// 存上次点击的id
					sessionStorage.setItem('curId',treeNode.tId);
					$('.diyBtn').hide();
		           // var out_rname = '<a class="rename"  data-name="rename" ><i class="fa fa-pencil"></i>更名</a>';
		            var out_add = '<a class="" style="height:auto;"  data-name="add"><i class="fa fa-plus"></i>新增</a>';
	             	var out_edit = '<a class="" style="height:auto;"  data-name="edit"><i class="fa fa-plus"></i>修改</a>';
		            var out_del = '<a class="" style="height:auto;"  data-name="del"><i class="fa fa-remove"></i>删除</a>';
		            var out_up = '<a class="" style="height:auto;"  data-name="upmove"><i class="fa fa-arrow-up"></i>上移</a>';
		            var out_down = '<a class="" style="height:auto;"  data-name="downmove"><i class="fa fa-arrow-down"></i>下移</a>';
		            var output = '';
		            if(treeNode && treeNode.cat == '25174661566300304'){//首页不显示修改项目
		            	      output =  out_add  + out_del + out_up + out_down;//out_rname + 
		            }else{
		            	      output =  out_add + out_edit + out_del + out_up + out_down;//out_rname + 
		            }
		            output = '<span class="diyBtn" id="diyBtn_' + treeNode.id + '" >' + output + '</span><i style="clear:both;"></i>';
//		            aObj.find("span").hasClass('diyBtn')  &&  $('.diyBtn').siblings('i').remove() && $('.diyBtn').remove() && aObj.removeClass('curSelectedNode');
		            aObj.append(output);
		            bindMethods(treeNode);
		          //  callBackLoadIframe();
				}
			},
			zTreeOnMouseUp = function(event, treeId, treeNode){
				if(!treeNode) {
//					$('.diyBtn').remove() && $('#treeDemo').find('a').removeClass('curSelectedNode');
				}
			},
		    addDiyDom = function(treeId, treeNode) {
				var aObj = $("#" + treeNode.tId + "_a");
				if ($("#diyBtn_"+treeNode.id).length>0) return;
				var editStr = "<span id='diyBtn_space_" +treeNode.id+ "'>("+ treeNode.catName+")</span>";
				aObj.append(editStr);
			},
			zTreeOnExpand = function(event, treeId, treeNode) {
			   // callBackLoadIframe();
			},
			zTreeOnCollapse = function(event, treeId, treeNode) {
		     //	callBackLoadIframe();
			},
			addHoverDom = function(treeId, treeNode){
				var aObj = $("#" + treeNode.tId + "_a");
				$("#"+treeId).find(".hoverActive").removeClass('hoverActive');
				$(aObj).addClass('hoverActive');
			},
            ztreeConfig = {
                data: {	
                    simpleData: {
                        enable: true,
                        pIdKey: 'pid',
                        idKey: 'id',
                        rootPId: null
                    }
                },
                async: {
                    enable: true,
                    type: 'get',
                    url: ''
                },
                view: {
                    expandSpeed: "fast",
//                  showIcon: false,
//					showLine: false,
					dblClickExpend: false,
					addDiyDom: addDiyDom,
					addHoverDom: addHoverDom // hover
//                  removeHoverDom: removeHoverDom  // hover
                },
                edit: {
                    enable: true,//false
                    drag:{
                    	isCopy: false,
						isMove: true,
					    prev: true,
						next: true,
						inner: true
                    },
					showRemoveBtn: false,
					removeTitle: "",
					showRenameBtn: false,
					renameTitle: "",
                },
                callback: {
						beforeClick: true,
						onClick: onClick,
						onExpand: zTreeOnExpand,
						onCollapse: zTreeOnCollapse,
						onMouseUp: zTreeOnMouseUp
                }
            },

            initConfig = function(conf){
            	if(sign == 'orign'){
            		config.ztree = ztreeConfig;//setting
	                if(!!conf){
	                    _this.c = conf;
	                }else{
	                    _this.c = config;
	                }
	
	                if(!!_this.c.treeUrl){
	                    _this.c.ztree.async.url = _this.c.treeUrl;
	                }
            	}else{
            		config.ztree = ztreeConfig;//setting
	                if(!!conf){
	                    _this.c = $.extend(true, config, conf);
	                }else{
	                    _this.c = config;
	                }
	
	                if(!!_this.c.treeUrl){
	                    _this.c.ztree.async.url = _this.c.treeUrl;
	                }
            	}
            },
            initzTree = function(sel){
                _this.ztree = $.fn.zTree.init($(sel), _this.c.ztree, []);
                _tree = _this.ztree;
                Categories.instance = _this;
            }

        initConfig(conf);

        initzTree(selector);
    }
    
//  Categories.prototype.addTreeNode= function(){
//  	console.log("get aaaa:")
//  	console.log(arguments[0]);
//  	var parent = arguments[0].pid;
//  	if(parent){//儿子节点
//  	 $.ajax({
//       	type:"post",
//       	url:"",
//       });
//      }else{
//      	
//      }//父节点
//  }
    window['Categories'] = Categories;
})(jQuery)