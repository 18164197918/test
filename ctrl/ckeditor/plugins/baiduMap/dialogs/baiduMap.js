CKEDITOR.dialog.add("baiduMap", function (a) {
//  var ap=a.name;
//	var app=a;
//	console.log(app)
//	a = a.lang.UploadPic;
    
    return {
        title: '百度地图',
        minWidth: "500px",
        minHeight: "500px",
        contents: [{
            id: "tab1",
            label: "",
            title: "",
             expand: true,  
            width: "500px",  
            height: "500px",  
            padding: 0,
            elements: [{
                type: "html",
                style: "width:500px;height:500px",  
                html: "<iframe id='baiduMapIframe' width='100%' height='100%' src='" + fontBaseUrl+"/baiduMap2.html" + "'></iframe>"
            }]
        }],
        onOk: function() {  
	        //点击确定按钮后的操作  
	        var check = document.getElementById('baiduMapIframe').contentWindow.checkBox();
	        var map_url = document.getElementById('baiduMapIframe').contentWindow.initMap(true);
	        if(check){
				var edi_id = $(a.element).attr('id');
				$("#cke_"+ edi_id).find("iframe:eq(0)").contents().find("body").append('<p><br/><iframe class="" src="'+map_url+'" frameborder="0" scrolling="no" width="534" height="344"></iframe></p>');
	        }else{
    		 	a.insertHtml('<p><br/><img width="530" height="340" src="'+map_url+'"/></p>');  
	        }
	       
	    }
    }
});