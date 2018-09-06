//图片加载失败           <img src="'+pic+'" width="320" height="157" onerror="imgerror(this)"/>
function imgerror(img){
	img.src="/img/load.jpg";
	img.onerror=null;   //控制不要一直跳动
}
//获取网站的icon图标
function getIcon(){
	var params={
		cid:null,
	}
	$.ajax({
		url: api.ListCpInfoUrl(),
		type:'post',
		data:params,
		dataType:"json",
		xhrFields:{withCredentials:true},//解决跨域
		success:function(res){
			var hd =document.getElementsByTagName('head')[0];
			var iconEle =document.getElementById("icon");
			if(res.data.icon){
				if(iconEle){
					iconEle.setAttribute('href',res.data.icon);
				}else{
					var icon = document.createElement('link') ;
					icon.rel = "icon";
					icon.id="icon";
					icon.href = res.data.icon;
					icon["mce_href"] = res.data.icon;
					icon.type="image/x-icon";
					hd.appendChild(icon);
				}
			}
			
		},
		error:function(err){
			console.log(err);
		}
	})
}
getIcon();