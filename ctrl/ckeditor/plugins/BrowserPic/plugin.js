(function () {
	 CKEDITOR.plugins.add('BrowserPic',{    
		 init: function(editor){
	        var pluginName = 'BrowserPic';
	        CKEDITOR.dialog.add(pluginName, this.path + 'dialogs/UploadPic.js');
	        editor.addCommand(pluginName, new CKEDITOR.dialogCommand(pluginName));
	        editor.ui.addButton('BrowserPic',{
                label: '图片管理',
                command: pluginName,
				icon: CKEDITOR.plugins.getPath('BrowserPic') + 'uploadpic.png',
				click:function(e){
						var apid=e.name;
						if($("#subdiv1")[0]){
				  		    $("#subdiv1")[0].remove()
			  		     }
						var furl="/";
						var mm="upload/";
						var userc=$("#userLogin").val();
						var patt=$("#path").val();
						var iWidth=800; //弹出窗口的宽度;
						var iHeight=500; //弹出窗口的高度;
						var iTop = (window.screen.availHeight-30-iHeight)/2; //获得窗口的垂直位置;
						var iLeft = (window.screen.availWidth-10-iWidth)/2; //获得窗口的水平位置;
						var newTab=window.open('about:blank', "newwindow2", "height="+iHeight+", width="+iWidth+", top="+iTop+", left="+iLeft+",toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no");
						if(!patt){
							patt="";
						}
						if(userc&&userc!=""){
							newTab.location.href = patt+"/imgmanage.do?uid="+userc+"&CKEditorFuncNum="+apid;
						}else{
							newTab.close();
						}
				}
            });
	    }
	}); 
 
 
 })();

function coundt(s,c){
	s.indexOf(c)>=0
}