(function(){
    //Section 1 : 按下自定义按钮时执行的代码
    var a= {
            exec:function(editor){
                alert("44444");

            }
        },
    //Section 2 : 创建自定义按钮、绑定方法
        b='uploadfiles';
    CKEDITOR.plugins.add(b,{
        init:function(editor){
            CKEDITOR.dialog.add(b, this.path + 'dialogs/uploadfiles.js');
            //editor.addCommand(b, new CKEDITOR.dialogCommand(b));

            editor.ui.addButton('uploadfiles',{
                label:'Upload files',
                icon: this.path + 'logo_ckeditor.png',
                command:b,
                click:function(){
                    var obj=document.createElement("input");
                    obj.setAttribute("id",b+"Ipt");
                    obj.setAttribute("style","display:none;");
                    obj.setAttribute("type","file");
                    document.body.appendChild(obj);
                    var iptt=document.getElementById("uploadfilesIpt");
                    iptt.click();
                }
            });

        }
    });





    $("#uploadfilesIpt").live("change",function(){
      
    	var ppp=$(".tab-content .tab-pane.in.active").find("textarea").attr("id")
    	if(ppp){
    		if(hasDig(ppp)){
    			var pnum=parseInt(ppp.replace(/[^0-9]/ig,""))
    		}
    	}
    	
    	
    	var filename = $("#file").val();
        var file = this.files[0]; 
//这里我们判断下类型如果不是图片就返回 去掉就可以上传任意文件   
        if(!/image\/\w+/.test(file.type)){   
            return false; 
        } 
        var reader = new FileReader(); 
        reader.readAsDataURL(file); 
        reader.onload = function(e){ 
            var fil=this.result;
            $.ajax({
              type: "POST",
              url: "/upload/c",
              enctype: 'multipart/form-data',
              data: {
                pic: fil
              },
              success: function (result) {
            	  var pp=JSON.parse(result).path
            	  if(ppp){
						 if(pnum==1){
							 CKEDITOR.instances.content1.insertHtml("<img src='"+pp+"'>");  
						 }else if(pnum==2){
							 CKEDITOR.instances.content2.insertHtml("<img src='"+pp+"'>"); 
						 }else if(pnum==3){
							 CKEDITOR.instances.content3.insertHtml("<img src='"+pp+"'>"); 
						 }else if(pnum==4){
							 CKEDITOR.instances.content4.insertHtml("<img src='"+pp+"'>"); 
						 }
					 }else{
						 CKEDITOR.instances.content.insertHtml("<img src='"+pp+"'>"); 
					 }
                
              }
            });
        }        
    });
})();