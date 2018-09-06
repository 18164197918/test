//basePath 项目绝对路径前缀引入[一定放入至少一个meta标签后](针对通过平台访问模板路径[有项目名和线上无项目名情况]，当模板被拷贝到空间后就访问不到此文件)
var bp=document.getElementById("bpid");
var parent = '';
var cur_path ='';
var model_basePath='';

if(getQueryString('p')){//在showmodel内部
	parent = top.document.getElementById('bpid') || '/'; 
	//cur_path = getQueryString('p') && getQueryString('p').slice(1)+'/';
	cur_path =  '/models/'+getQueryString('p')+'/';
	model_basePath = parent && parent.href + cur_path ;
}else{
	var curent_location =  window.top.location.href ||  '/';
	if(/(\S*)models\/\S*_\d*\//.test(curent_location)){///(\S*)models\/\d*\//.test(curent_location)
		model_basePath =  curent_location.match(/(\S*)models\/\S*_\d*\//)[0];//curent_location.substring(0,idx + 7);//model_basePath =
	}else if(/(\S*)models\/\S*\d*\//.test(curent_location)){
		model_basePath =  curent_location.match(/(\S*)models\/[a-zA-Z]*\d*\//)[0];
	}
}

bp.href= model_basePath;
bp.target="_blank";
window['fontBaseUrl']=bp.href;

function getQueryString(name) {  
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");  
    var location = window.top.location || window.location;
    var r = location.search.substr(1).match(reg);  
    if (r != null) return unescape(r[2]);  
    return null;  
}  
