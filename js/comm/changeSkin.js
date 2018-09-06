(function(){
	
//	alert('w')
	
    var changeSkin = document.getElementById("changeCss");
	changeSkin.href = getQueryString("p") +'/css/skin.css';
	
	function getQueryString(name) {  
	    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");  
	    var r =top.location.search.substr(1).match(reg);  
	    if (r != null) return unescape(r[2]);  
	    return null;  
	}  
})();
