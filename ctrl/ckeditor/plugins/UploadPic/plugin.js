(function () {
	
	var  files=null;
	var  objURL=null;
	var  aid=null;
	var  userc=null;
	var  name=null;
	var  textareaId=null;
 CKEDITOR.plugins.add('UploadPic',
{    init: function(editor)
    {
        var pluginName = 'UploadPic';
        CKEDITOR.dialog.add(pluginName, this.path + 'dialogs/UploadPic.js');
        editor.addCommand(pluginName, new CKEDITOR.dialogCommand(pluginName));
        editor.ui.addButton('UploadPic',
            {
                label: '图片上传',
                command: pluginName,
				icon: CKEDITOR.plugins.getPath('UploadPic') + 'uploadpic.png',
				click:function(e){
			
					    userc=$("#userLogin").val();
				     	apid=e.name;
				     	aid="#cke_"+apid;
				     	textareaId=apid;
						if($("#subdiv1")[0]){
				  		    $("#subdiv1")[0].remove()
			  		     }
						
						var mydiv = document.createElement("div");
					 	mydiv.setAttribute("id","subdiv1");
						mydiv.style.cssText='display:block;position:fixed;z-index:1000;left:500px;top:500px;background: #FFF;border: 1px solid #0000FF;' ;
			  		     var subFom = document.createElement("form"); 
			  		      	  subFom.setAttribute("method","POST");
			  		      	  subFom.setAttribute("enctype","MULTIPART/FORM-DATA");
			  		      	  subFom.setAttribute("dataType","json");
			  		      
			  		      	  
			  		      var subIut = document.createElement("input"); 
			 				  subIut.setAttribute("type","file");
			  		      	  subIut.setAttribute("name","uploadimg");
			  		      	  subIut.setAttribute("id","uploadimg");
			  		      	  
			  		      var subIut1 = document.createElement("input"); 
			 				  subIut1.setAttribute("type","submit");
			  		      	  subIut1.setAttribute("id","mysumit");
			  		      	  subIut1.setAttribute("value","上传");
//			  		      	  subIut1.setAttribute("onclick","CKEDITOR.dialog.getCurrent().hide()")
			  		      	  



			  		      var subIifr = document.createElement("iframe"); 
			  		      	  subIifr.setAttribute("name","myiframe")
			  		      	  subIifr.setAttribute("id","myiframe")
			  		      	  

			  		       	 	subFom.appendChild(subIut); 
			 					subFom.appendChild(subIut1);
			 				
			 				mydiv.appendChild(subFom)
			 				mydiv.appendChild(subIifr)
                    	 mydiv.setAttribute("style","display:none")	
			  		 	document.body.appendChild(mydiv)
			  		 	
			  		 	$("#uploadimg").trigger("click");
			  		 	

			  		 	

							

			  		 	
			  		 	
				}
            });
    }
}); 
 
 
 
 
 
 
 
 $("body").on("change","#uploadimg", function () { 
	  files = this.files[0];
        function getObjectURL(file) {
	          var url = null;
	            if (window.createObjcectURL != undefined) {
	                url = window.createOjcectURL(file);
	            } else if (window.URL != undefined) {
	                url = window.URL.createObjectURL(file);
	            } else if (window.webkitURL != undefined) {
	                url = window.webkitURL.createObjectURL(file);
	            }
	            return url;
	        
        }
         objURL = getObjectURL(this.files[0]);//这里的objURL就是input file的真实路径
     
//      $('#imgContainer').html("<img src='" + objURL + "' alt='Alternate Text' width='640px' height='350px' id='target' />");
//      cutImg();//自定义的裁剪图片函数
        var  pnum=null;
    	if(textareaId){
//  		if(hasDig(textareaId)){
    			 pnum=parseInt(textareaId.replace(/[^0-9]/ig,""))
//  		}
    	}  
                                     lrz(files)
									.then(function(rst) {
									    name=$("#uploadimg").val();
										 $.ajax({
										url: api.updateImgUrl()+'/upload/c',
										type: 'post',
										data: {
											'uid':userc,
											"pic": rst.base64
										},
										dataType: "json",
										success: function(data) {
											console.log(data);
 											 if(pnum==1){
												 CKEDITOR.instances.content1.insertHtml("<img src='"+data.path+"'>");  
											}else if(pnum==2){
												 CKEDITOR.instances.content2.insertHtml("<img src='"+data.path+"'>"); 
											}else if(pnum==3){
												 CKEDITOR.instances.content3.insertHtml("<img src='"+data.path+"'>"); 
											}else if(pnum==4){
												 CKEDITOR.instances.content4.insertHtml("<img src='"+data.path+"'>"); 
											}else if(pnum==5){
												 CKEDITOR.instances.content5.insertHtml("<img src='"+data.path+"'>"); 
											}else if(pnum==6){
												 CKEDITOR.instances.content6.insertHtml("<img src='"+data.path+"'>"); 
											}else if(pnum==7){
												 CKEDITOR.instances.content7.insertHtml("<img src='"+data.path+"'>"); 
											}else if(pnum==8){
												 CKEDITOR.instances.content8.insertHtml("<img src='"+data.path+"'>"); 
											}else if(pnum==11){
												 CKEDITOR.instances.content11.insertHtml("<img src='"+data.path+"'>"); 
											}else if(pnum==12){
												 CKEDITOR.instances.content12.insertHtml("<img src='"+data.path+"'>"); 
											}else if(pnum==13){
												 CKEDITOR.instances.content13.insertHtml("<img src='"+data.path+"'>"); 
											}else if(pnum==14){
												 CKEDITOR.instances.content14.insertHtml("<img src='"+data.path+"'>"); 
											}else{
											 CKEDITOR.instances.content.insertHtml("<img src='"+data.path+"'>"); 
											 }
//                       				    $(aid+' iframe').contents().find("body").append("<img src="+data.path+"></img>");
										 },
										error:function(res){
											console.log(res)
										}
										})
                                    })





 });
 
 
 
 
 

 })();