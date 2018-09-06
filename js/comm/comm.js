/*
 func: 指定Cookie时间
 t:second
 * */
function setCookie(key,value,t)
{ 
    var exp = new Date(); 
    exp.setTime(exp.getTime() + t*1000); 
    document.cookie = key + "="+ escape (value) + ";expires=" + exp.toGMTString() +';path=/';
} 

/*
 func: 默认设置Cookie时间30分钟
 t:second
 * */
function setCookieDefault(key,value)
{ 
    setCookie(key, value, 1800);//60*30=1800seconds=30分钟
} 


/*
 func: 默认设置Cookie时间30分钟
 key: Cookie键值
 * */
function getCookie(key) 
{ 
    var arr,reg=new RegExp("(^| )"+key+"=([^;]*)(;|$)");
   	arr = document.cookie.match(reg);
    if(arr){
        return unescape(arr[2]); 
    }else{ 
        return null; 
    }
} 


/*
 func: 根据键值删除指定Cookie
 key: Cookie键值
 * */
function delCookie(key) 
{ 
    var exp = new Date(); 
    exp.setTime(exp.getTime() - 1); 
    var cval=getCookie(key); 
    if(cval!="") 
        document.cookie= key + "="+cval+";expires="+exp.toGMTString() +';path=/';
} 

/*
1，return null 表示未登陆 
2，登录状态正常   会返回 json对象  包含用户的信息  和 token
3，方法请求间隔 超过一分钟  重置心跳时间lastTimer 和  用户数据
 * */
function isSignIn(){
	return getUserCookie();
}


/*
 func: 设置用户相关Cookie信息值
 params: 用户关键信息封装
 * */
function setUserCookie(
	uid,
	uname,
	cid,
	company,
	roleId,
	rid,
	tk,
	signType /*登录类型*/
){
	uid && setCookieDefault('uid',uid);
	uname && setCookieDefault('uname',uname);
	cid && setCookieDefault('cid',cid);
	company && setCookieDefault('company',JSON.stringify(company));
	roleId && setCookieDefault('roleId',roleId);
	rid && setCookieDefault('rid', rid);
	tk && setCookieDefault('tk',tk);
	signType && setCookieDefault('signType',signType);
	setCookieDefault('lastTimer',new Date().getTime());
}

/*
 func: 获取用户相关Cookie信息值
 return: 用户关键信息封装[result.uid/result.cid...]
 * */
function getUserCookie(){
	var lt = getCookie('lastTimer');
	if (lt == null || lt == "")
		return null;
	var now = new Date().getTime();
	var diff = now - lt; 
	if (diff > 30*60*1000){
		delUserCookie();
		//delCookie("data");
		return null;
	}else if (diff >60*1000){
		setUserCookie(
			getCookie('uid'),
			getCookie('uname'),
			getCookie('cid'),
			getCookie('company'),
			getCookie('roleId'),
			getCookie('rid'),
			getCookie('tk'),
			getCookie('signType')
		);
	}
	if(getCookie("company")){
		var companyInfo=getCookie("company").replace(/\\/g, "");
		var w=companyInfo.indexOf("{");
		var x=companyInfo.indexOf("}");
		var company= companyInfo.substring(w,x+1);
	}else{
		var company=null;
	}
	
	return {
		uid: getCookie('uid'),
		uname: getCookie('uname'),
		cid: getCookie('cid'),
		company: company,
		tk: getCookie('tk'),
		roleId: getCookie('roleId'),
		rid: getCookie('rid'),
		signType : getCookie('signType')
	};
}

/*
 func: 删除用户相关Cookie信息值
 * */
function delUserCookie(){
	if(getCookie('uid') ){
		delCookie('uid');
	}
	if(getCookie('uname')){
		delCookie('uname');
	}
	if(getCookie('cid')){
		delCookie('cid');
	}
	if(getCookie('company')){
		delCookie('company');
	}
	if(getCookie('roleId') ){
		delCookie('roleId');
	}
	if(getCookie('rid') ){
		delCookie('rid');
	}
	if(getCookie('tk') ){
		delCookie('tk');
	}
	if(getCookie('signType')){
		delCookie('signType');
	}
	if(getCookie('lastTimer')){
	 	delCookie('lastTimer');
	}
	clearIframeUrl();//清空信息
}

/*
 func： 截取参数
 desc:  getQueryString(name,'module') iframe内容获取父元素location
        getQueryString(name) iframe 优先获取当前 location
 * */
function getQueryString(name,sign) {  
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");  
    var location =  '';
    if(sign == 'module'){//'module'
    	location = window.top.location;
    }else{
    	location =  window.location || window.top.location;
    }
    var r = location.search.substring(1).match(reg);  
//  if (r != null) return unescape(r[2]);  
    if (r != null) return decodeURIComponent(r[2]);  
    return null;  
}  

/*
 func： 截取参数(showmodel中展示模板截取参数)
 * */
//function getQueryStringModule(name) {  
//  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");  
//  var location =  window.top.location;
//  var r = location.search.substr(1).match(reg);  
//  if (r != null) return unescape(r[2]);  
//  return null;  
//}  

	//转换时间戳
 function getTime(now){
      //将小于十的数变成两位
      function toDou(num){
        var num=num+"";
        return num=num.length>1?num : 0+num;
     }
 	  var   year=now.getFullYear();     
      var   month=now.getMonth()+1;     
      var   date=now.getDate();     
      var   hour=now.getHours(); 
      var   minute=now.getMinutes();  
      var   second=now.getSeconds(); 
      return   year+"-"+month+"-"+date+"  "+toDou(hour)+":"+toDou(minute)+":"+toDou(second); 
 }
 	//转换时间戳
	 function getDataTime(now,str){
	      //将小于十的数变成两位
	      function toDou(num){
	        var num=num+"";
	        return num=num.length>1?num : 0+num;
	     }
	 	  var   year=now.getFullYear();     
	      var   month=now.getMonth()+1;     
	      var   date=now.getDate();   
	      if(arguments[1]){
	      	return year+str+toDou(month)+str+toDou(date); 
	      }else{
	      	return   year+"."+toDou(month)+"."+toDou(date); 
	      }
	 }
	  function getTwoTime(now){
	    	    //将小于十的数变成两位
	        function toDou(num){
	           var num=num+"";
	           return num=num.length>1?num : 0+num;
	        }
	        function getEnMonth(n){
	        	//console.log(n);
	         	switch(n)
				{
				case '01':
				  return 'January';
				  break;
				case '02':
				  return 'February';
				  break;
				case '03':
				  return 'March';
				  break;
				case '04':
				  return 'April';
				  break;  
				case '05':
				  return 'May';
				  break;
				case '06':
				  return 'June';
				  break;
				case '07':
				  return 'July';
				  break;
				case '08':
				  return 'August';
				  break;
				case '09':
				  return 'September';
				  break;
				case '10':
				  return 'October ';
				  break;
				case '11':
				  return 'November ';
				  break;
				case '12':
				  return 'December ';
				  break;  
				default:
				  return '无效的月份';
				}
	        }
	    	  var   year=now.getFullYear();     
	         var   month=now.getMonth()+1;     
	         var   date=now.getDate();     
	         var   hour=now.getHours(); 
	         var   minute=now.getMinutes();  
	         var   second=now.getSeconds(); 
	        // return   year+"-"+toDou(month)+"-"+toDou(date); 
	         return  {
              	 data:toDou(date),
				 year:toDou(year),
				 yearandmonth:year+"/"+toDou(month),
				 month:toDou(month),
				 enmonth:getEnMonth(toDou(month)),    //英文月份
				 date:toDou(date),
				 hour:toDou(hour),
				 minute:toDou(minute),
				 second:toDou(second),
	         }
	    }
	 
	 
function getuname(uname){
	return getUserLabel(uname,null,null,null);
}

function getUserLabel(nick,name,mobile,email){
	var ulabel = "";
	if(nick != null && nick.length > 0){
		ulabel = nick;
	}else if(name != null && name.length > 0){
		ulabel = name;
	}else if(mobile != null && mobile.length > 0){
		ulabel = mobile;
	}else{
		ulabel = email;
	}
	if (ulabel.length>6)
		ulabel = ulabel.substring(0, 2)+"***"+ulabel.substring(ulabel.length-2, ulabel.length);
	return ulabel;
}

/*用于刷新页面前对分页的记录*/
function setCurrentPage(name,curentPage){
	curentPage && localStorage.setItem(name,curentPage)
}

/*用于获取当前页面的操作*/
function getCurrentPage(name){
	var page =localStorage.getItem(name) || '';
	return page || '1';
}

/*
 * false: pc设备
 * true: 移动设备
 *desc:  判断设备
 * */
function judgmentBrowser(){
    var UserClient = navigator.userAgent.toLowerCase();
    var IsIPad = UserClient.match(/ipad/i) == "ipad";
    var IsIphoneOs = UserClient.match(/iphone os/i) == "iphone os";
    var IsMidp = UserClient.match(/midp/i) == "midp";
    var IsUc7 = UserClient.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    var IsUc = UserClient.match(/ucweb/i) == "ucweb";
    var IsAndroid = UserClient.match(/android/i) == "android";
    var IsCE = UserClient.match(/windows ce/i) == "windows ce";
    var IsWM = UserClient.match(/windows mobile/i) == "windows mobile";
    if(IsIphoneOs || IsMidp || IsUc7 || IsUc || IsAndroid || IsCE || IsWM){
    	return true;
    }else{//pad pc
    	return false;
    }
}

/*leftNav跳转切换右侧内容*/
function jumpMethod(a_link){
	setCurrentPage('mgrCon', 1);
	setCurrentPage('mgrUser', 1);
	setCurrentPage('rclCon', 1);
	setCurrentPage('mgrMess', 1);
	setCurrentPage('mgrComm', 1);
	setCurrentPage('mgrMeber', 1);
	setCurrentPage('mgeAdv', 1);
	setCurrentPage('mgrFsl', 1);
	setCurrentPage('webPend', 1);
	setCurrentPage('webList', 1);
	setCurrentPage('traRecord', 1);
	if(judgmentBrowser() && window.top == window.self){//mobile
 		a_link && window.open(a_link, '_self');
	}else{//pc
		a_link && $('#RtFrameContent').attr('src',a_link);
		localStorage.setItem("iframeUrl", a_link);
	}
	return;
}

/*调整iframe高度问题*/
var t =null;
try{
	var iframe = document.getElementById("RtFrameContent") || window.parent.document.getElementById("RtFrameContent");
}catch(e){
}

function callBackLoadIframe(dom){//重置iframe高度
	if(!judgmentBrowser() && window.self != window.top){
		iframe.height=0;
		var min_height = 625;
		/*if(arguments.length>0){
			min_height = dom.height();//弹窗撑开高度问题
		}*/
		t = setTimeout(function(){
		 	try{
				var bHeight = iframe.contentWindow.document.body.scrollHeight;
				var dHeight = iframe.contentWindow.document.documentElement.scrollHeight;
				var height = Math.max(bHeight, dHeight);
				if(height < min_height){
					iframe.height = min_height;
				}else{
					iframe.height = height;
				}
				clearTimeout(t);
			}catch (ex){
			}
		},200);
	}
}

//function reinitIframeC(){
// 	try{
//	var bHeight = iframe.contentWindow.document.body.scrollHeight;
//	var dHeight = iframe.contentWindow.document.documentElement.scrollHeight;
//	var height = Math.max(bHeight, dHeight);
////	iframe.style.height = height < 625 ? 625+'px' : height+'px';
//	iframe.height = height < 625 ? 625 : height;
//	clearTimeout(t);
//	}catch (ex){
//	}
//}


/*切换iframe 隐藏页面*/
function windowOpenPage(url){
	var iframeTop = '';
	if(window.self != window.top){
		iframeTop = window.parent.document.getElementById("RtFrameContent");
		iframeTop.src = url && url;
	}else{
		window.open(url, '_self');
	}

}

/*存储跳转的iframeUrl*/
function setIframeUrl(url){
	localStorage.setItem("iframeUrl", url);
}
function getIframeUrl(){
	var url =	localStorage.getItem("iframeUrl") ||'';
	return url || '';
}

function clearIframeUrl(){
	localStorage.setItem("iframeUrl", "");
}

/*user.html刷新后重置iframe_src*/
function toggleIframeUrl(){
	var iframe_url =getIframeUrl() || '';
	if(iframe_url){
		iframe.src = iframe_url;
	}else{
		setIframeUrl(iframe.src);
	}
}
/*fun:针对静态页面中的 className['x-top-sign'or 'x-banner-sign']
 *    获取所有x-top-sign或x-banner-sign参数数组信息
 * */
function getTopTenParams(className){
	var topTenParams = {};
	xTop = document.getElementsByClassName(className);
	var top_len = xTop &&　xTop.length || 0;
	if(top_len > 0){
		for(var i=0;i <top_len; i++){
			var res =xTop[i].getAttribute('data-filter') && xTop[i].getAttribute('data-filter').split("&&");
			var param = {};
			if(className == 'x-top-sign'){
				param ={
					id: res[0],
					desc:res[1],
					sqlwhere: res[2] ,
					number: res[3] 
				}
			}else{
				param ={
						id: res[0],
						desc:res[1],
						sqlwhere: res[2] ,
				}
			}
			var index = res[0].toString();
			topTenParams[index] = param;
		}
	}
	return topTenParams;
}
/*fun:针对静态页面中的 className['x-top-sign'or 'x-banner-sign']
 *    获取desc对应的参数值
 * */
function getTopTenValue(className,topid){
	var params = getTopTenParams(className);
	if(params){
		if(params.hasOwnProperty(topid)){
			return params[topid];
		}
	}else{
		return null;
	}
}
/*
 * 注意在api.js后调用
 * 动态获取页面title、keywords、desc、icon
 * desc:存在动态数据并且原页面存在标签则改变标签值
 *      存在动态数据但是原页面不存在标签生成标签填充值
 *      不存在动态数据 使用原页面静态标签与值
 * */
function initPageInfo(_thisTit, _thisKey, _thisVtext){
	var hd =document.getElementsByTagName('head')[0];
	var title = document.getElementsByTagName('title')[0];//dom_title
	var meta =  document.getElementsByTagName('meta');//dom_keywords
	if(_thisTit){
		if(title){
			title.innerHTML = _thisTit; 
		}else{
			var tit = document.createElement('title') ;
			var tit_tex =  document.createTextNode(_thisTit); 
			tit.appendChild(tit_tex);
			hd.appendChild(tit);
		}
	} 
	if(_thisKey){
		if(meta.keywords){
			var meta_keyword = meta.keywords;
			meta_keyword.setAttribute('content',_thisKey); 
		}else{
			var key = document.createElement('meta') ;
			key.name = 'keywords';
			key.content = _thisKey;
			hd.appendChild(key);
		}
	}
	if(_thisVtext){
		if(meta.description){
			var meta_desc = meta.description;
			meta_desc.setAttribute('content',_thisVtext);
		}else{
			var desc = document.createElement('meta') ;
			desc.name = 'description';
			desc.content = _thisVtext;
			hd.appendChild(desc);
		}
	}
	addAdvertise(_thisTit, _thisKey);
}
//不用插件直接上传图片
//	var C_NO=null;
	var image = '';
	 function selectImage(file,msg){    //file指触发元素，msg指回填的img标签的id名
		if(!file.files || !file.files[0]){
			console.log(msg);
				return;
		 }
		var Max_Size=1000;         	//限制图片最大1M
		if(file.files && file.files[0]){
				var fileData = file.files[0];
                var size = fileData.size;   //注意，这里读到的是字节数
                var isAllow = false;
                if(!size) isAllow = false;
                var maxSize = Max_Size;
                maxSize = maxSize * 1024;   //转化为字节
                isAllow = size <= maxSize;
                if(isAllow){
           			console.log("大小通过");
	            }else{
	                $.CwsPopup.Alert("提示","请保持图片的大小不超过"+Max_Size+"k!");
	                return;
	            }
		}
		if(msg=='bannerImg'){
			msg=$(file).attr('data');
		}
		 var reader = new FileReader();
		 reader.onload = function(evt){
			 image = evt.target.result;
			 console.log("开始上传图片！")
			 uploadImage(msg);
		 }
		 reader.readAsDataURL(file.files[0]);
		 
		 
	}
	function uploadImage(msg){
		console.log(msg);
		$.ajax({
			type:'POST',
			 url: api.updateImgUrl()+'/upload/c',  
			 data: {
				 pic: image,
				 C_ID: getUserCookie().cid || '',
				 C_NO: getUserCookie().company && JSON.parse(getUserCookie().company).no || ''
				 },
			 async: false,
			 dataType: 'json',
			 success: function(data){
				if(data.path){
					var extStart=data.path.lastIndexOf(".");
					var ext=data.path.substring(extStart,data.path.length).toUpperCase();
					 //上传icon
					 if(msg=="iconImg"){
					 	 if(ext != ".ICO"){
					 	 	$.CwsPopup.Alert("提示","请选择ico格式的文件！");
					 	 }else{
				 	 		$("#"+msg).attr('src',data.path);
					 	 }
					 //上传企业主体头像
					 }else if(msg=="companyImg"){
						var uid='';
                  	    var cid='';
                        if(getUserCookie()){
							uid=getUserCookie().uid ;
							cid=getUserCookie().cid ;
						}
						var params={
                     		cid:cid,
                     		uid:uid,
                     		logo:data.path
                     	}
                     	api.AddCpInfo(params).then(function(res){
					   	    if(res.success){
					   	    		$("#"+msg).attr('src',data.path);
						    }    
					    }).catch(function(error){
					    	$.CwsPopup.Alert("提示","上传失败！");
					   	    console.log(error);
	                    })
					//上传logo    
					}else{
					 	$("#"+msg).attr('src',data.path);
					 }
				}else{
						$.CwsPopup.Alert("提示","上传失败！");
				}
			
			},
			 error: function(err){
				$.CwsPopup.Alert("提示","上传失败！");
			}
		});
	
	}
	
//防止xss攻击的代码
	var HtmlUtil = {
		    /*1.用浏览器内部转换器实现html转码*/
		    htmlEncode:function (html,btn){
		        //1.首先动态创建一个容器标签元素，如DIV
		        var temp = document.createElement ("div");
		        //2.然后将要转换的字符串设置为这个元素的innerText(ie支持)或者textContent(火狐，google支持)
		        (temp.textContent != undefined ) ? (temp.textContent = html) : (temp.innerText = html);
		        //3.最后返回这个元素的innerHTML，即得到经过HTML编码转换的字符串了
		        var output = temp.innerHTML;
		        
		        var s="";
		        if(html.length == 0) return "";
		         s= html.replace(/&/g,"&amp;");
		         s = s.replace(/</g,"&lt;");
		         s = s.replace(/>/g,"&gt;");
		         s = s.replace(/ /g,"&nbsp;");
		         s = s.replace(/\n\r/g,"<br/>");
		         s = s.replace(/	/g,"&nbsp;");//&#09;
		         s = s.replace(/\'/g,"&#39;");
		         s = s.replace(/\"/g,"&quot;");
		        var output2=s;
		        temp = null;
		        if(btn){//返回转码后的有空格的代码
		        	return output2;
		        }else{//返回转码后的没有空格的代码
		        	return output;
		        }
		    },
		    /*2.用浏览器内部转换器实现html解码*/
		    htmlDecode:function (text){
		        //1.首先动态创建一个容器标签元素，如DIV
		        var temp = document.createElement("div");
		        //2.然后将要转换的字符串设置为这个元素的innerHTML(ie，火狐，google都支持)
		        temp.innerHTML = text;
		        //3.最后返回这个元素的innerText(ie支持)或者textContent(火狐，google支持)，即得到经过HTML解码的字符串了。
		        var output = temp.innerText || temp.textContent;
		        temp = null;
		        return output;
		    },
		    /*3.用正则表达式实现html转码*/
		    htmlEncodeByRegExp:function (str,btn){  
		         var s = "";
		         if(str.length == 0) return "";
		         s = str.replace(/&/g,"&amp;");
		         s = s.replace(/</g,"&lt;");
		         s = s.replace(/>/g,"&gt;");
		         s = s.replace(/ /g,"&nbsp;");
		         s = s.replace(/	/g,"&nbsp;");//&#09;
		         s = s.replace(/\'/g,"&#39;");
		         s = s.replace(/\"/g,"&quot;");
		         return s;  
		   },
		   /*4.用正则表达式实现html解码*/
		   htmlDecodeByRegExp:function (str){  
		         var s = "";
		         if(str.length == 0) return "";
		         s = str.replace(/&amp;/g,"&");
		         s = s.replace(/&lt;/g,"<");
		         s = s.replace(/&gt;/g,">");
		         s = s.replace(/&nbsp;/g," ");
		         s = s.replace(/&#39;/g,"\'");
		         s = s.replace(/&quot;/g,"\"");
		         return s;  
		   }
	};	
	
	
	  function imgerror(img){
		img.src= "/img/load.jpg";
		img.onerror=null;   //控制不要一直跳动
	}
	
	
		//设为首页
	function SetHome(obj,url){
	    try{
	        obj.style.behavior='url(#default#homepage)';
	        obj.setHomePage(url);
	    }catch(e){
	        if(window.netscape){
	            try{
	                netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
	            }catch(e){
	                alert("抱歉，此操作被浏览器拒绝！\n\n请在浏览器地址栏输入“about:config”并回车然后将[signed.applets.codebase_principal_support]设置为'true'");
	            }
	        }else{
	            alert("抱歉，您所使用的浏览器无法完成此操作。\n\n您需要手动将【"+url+"】设置为首页。");
	        }
	    }
	}
	//收藏本站
	function AddFavorite(title, url) {
	           try {
	        window.external.addFavorite(url, title);
	    }
	    catch (e) {
	        try {
	            window.sidebar.addPanel(title, url, "");
	        }
	        catch (e) {
	            alert("抱歉，您所使用的浏览器无法完成此操作。\n\n加入收藏失败，请使用Ctrl+D进行添加");
	        }
	    }
	}		
	
	
	
	

/*****************************广告部分-start****************/
/*添加广告*/
function addAdvertise(_thisTit, _thisKey){
	var params = {
	//	cid: getQueryString('cmpid','module'), 
	//	title: _thisTit || 'test'
	//	keywords: _thisKey || '',
	//	url: window.location.href
	//ids:[]
	}
   $.ajax({
	 	type:"post",
	 	url: api.getAdvResList(),
		contentType: "application/json",
		dataType: "json",
	 	data:JSON.stringify({title: '333'}),
	 	async:false,
	 	success: function(result){
	 		if(result.success){
	 			var labels = result.data && result.data && result.data.data;
				var adv_locs =  document.getElementsByClassName('wrap-adv');
				if(adv_locs.length > 0){
					for(var i =0 ; i< adv_locs.length; i++){
						var label_id = adv_locs[i].dataset.adv;//.split("&&")[0];
		                   if(labels.hasOwnProperty(label_id.toString())){
		                   	    if($("[data-adv='"+label_id.toString()+"']").find("div").hasClass('adv-content')){
		                   	    	$("[data-adv='"+label_id.toString()+"']").find(".adv-content").html(labels[label_id.toString()].code);
								}else{
									$("[data-adv='"+label_id.toString()+"']").html(labels[label_id.toString()].code);
								}
	
							   $("[data-adv='"+label_id.toString()+"']").show();
		                   }else{
		                   	   $("[data-adv='"+label_id.toString()+"']").hide();
		                   }
					}
				}
	 		}
	 	},
	 	error: function(err){
	 		if(err.status == '200'){
	 			err.data && console.log(err.data.msg);
	 		}else if(err.status == '404'){
	 			err.responseText && console.log(err.responseText);
	 		}
	 	}
	 });

    /*test api(前端测试使用 当接口关闭的时候测试调用)*/
//    $.ajax({
//	 	type:"get",
//	 	url: "/data/adv.json",
//		contentType: "application/json",
//		dataType: "json",
//	 	async:false,
//	 	success: function(result){
//	 		if(result.success){
//	 			var labels = result.data && result.data ;
//				var adv_locs =  document.getElementsByClassName('wrap-adv');
//				if(adv_locs.length > 0){
//					for(var i =0 ; i< adv_locs.length; i++){
//						var label_id = adv_locs[i].dataset.adv;//.split("&&")[0];
//		                   if(labels.hasOwnProperty(label_id.toString())){
//		                   	    if($("[data-adv='"+label_id.toString()+"']").find("div").hasClass('adv-content')){
//		                   	    	$("[data-adv='"+label_id.toString()+"']").find(".adv-content").html(labels[label_id.toString()].code);
//								}else{
//									$("[data-adv='"+label_id.toString()+"']").html(labels[label_id.toString()].code);
//								}
//	
//							   $("[data-adv='"+label_id.toString()+"']").show();
//		                   }else{
//		                   	   $("[data-adv='"+label_id.toString()+"']").hide();
//		                   }
//					}
//				}
//	 		}
//	 	},
//	 	error: function(err){
//	 		if(err.status == '200'){
//	 			err.data && console.log(err.data.msg);
//	 		}else if(err.status == '404'){
//	 			err.responseText && console.log(err.responseText);
//	 		}
//	 	}
//	 });
}

/*动态设置浮动广告位 暂时屏蔽*/
// $("[data-adv='"+label_id.toString()+"']").hasClass('adv-float') && setFloatAdv(label_id.toString());
//function setFloatAdv(label_id){
//	var $dom_flt = $("[data-adv='"+label_id+"']");
//	if($dom_flt.length == 1){
//		var filter_pars = $("[data-adv='"+label_id+"']").data('filter').split('&&'); 
//		var filter_pos = filter_pars[0];
//		var pos_val = filter_pos.split(':')[1];
//		if(pos_val.length == '3'){
//			var pos_one = pos_val.split('')[0] , pos_two = pos_val.split('')[1] , pos_thr = pos_val.split('')[2];
//			var pos_set = pos_val.substring(1);
//			if(pos_one == 0 || pos_one == '0' ){
//				switch (pos_set.toString()){
//					case '10' :
//					case '12' :
//					case '20' :
//					case '23' :
//						$dom_flt.css({"right":"0","top":"38%"});
//						break;
//					case '30':
//					case '43':
//					case '40':
//					case '14':
//						$dom_flt.css({"left":"0","top":"38%"});
//						break;
//					case '10':
//				}
//			}else{
//				alert('浮动广告pos值首位是0!');
//			}
//		}else{
//			alert('浮动广告pos值为三位!');
//		}
//	}else{
//		alert('同页面广告id重复,请重新调整!');
//	}
//}

/*******页面的a链接进行处理*************/
//$(function(){
//	if(window.top.)
//	if (iframe.attachEvent){   
//			    iframe.attachEvent("onload", function(){  
//			    //document.getElementById("loading").style.display="none";  
//			    });   
//			} else {   
//			    iframe.onload = function(){  
//			    //document.getElementById("loading").style.display="none";  
//			    };   
//			} 
//});
