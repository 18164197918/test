String.prototype.replaceAll = function (FindText, RepText) {  
    var regExp = new RegExp(FindText,'g');  
    return this.replace(regExp, RepText);  
}; 

new Vue({
	data: function() {
		return {
			path:'',
			testHtml: '',
			cid:'',
		}
	},
	methods: {
		getCid: function(){//通过local
				var cid =  '';
				if(getUserCookie()){
					cid=getUserCookie().cid || '';
				}
				if(cid){
					this.cid = cid;
				}else{
					console.log("Error:当前用户没有cid!");
				}
		},
		getUrlPara: function(){
		  	if(getQueryString('path') && getQueryString('path') != ''){
		  		this.path = getQueryString('path');  
		  		this.getHtml();
		  	}
		},
		getHtml: function(){
			var _this = this;
			api.editeCode({
					cid: _this.cid,
					filepath:_this.path,
					})
				.then(function(res){
					   var testEditor;
					testEditor = editormd("my-editormd", {
		                    width            : "100%",
		                    height           : 550,
		                    watch            : false,
		                    toolbar          : false,
		                    codeFold         : true,
		                    searchReplace    : true,
		                    value            : getCodeValue(),
		                    theme            : (localStorage.theme) ? localStorage.theme : "default",
		                    mode             : (localStorage.mode) ? localStorage.mode : "text/html",
//		                    syncScrolling    : "single",
				          	path: "../ctrl/editormd/lib/",//注意2：你的路径
				          	saveHTMLToTextarea : true//注意3：这个配置，方便post提交表单
		            });
		            function getCodeValue() {
		            	return $("#my-editormd-markdown-doc").val();
		            }
                $("#my-editormd-markdown-doc").text(res.data);
				 $(".x-tips").fadeOut();	
			   }).catch(function(err){
			   		console.log(error);
			   })
		},setHtml: function() {
			var _this = this;
            _this.testHtml=$("#my-editormd-html-code").val();
				api.saveCode({
					cid: _this.cid,
					filepath:_this.path,
					content:_this.testHtml
				})
				.then(function(res){
			   	    console.log("保存成功！");
			   	    window.location.href=fontBaseUrl+'user/mgeCode.html';
			    }).catch(function(err){
			   		console.log(error);
			    })



		}
	},
	mounted: function(){
		this.getCid();
		this.getUrlPara();
	}
}).$mount("#htmlContent")