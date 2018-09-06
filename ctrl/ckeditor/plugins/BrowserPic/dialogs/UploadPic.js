CKEDITOR.dialog.add("UploadPic", function (a) {
    var ap=a.name;
	var app=a;
	console.log(app)
	a = a.lang.UploadPic;
    
    return {
        title: '上传图片',
        minWidth: 390,
        minHeight: 150,
        contents: [{
            id: "tab1",
            label: "",
            title: "",
            expand: !0,
            padding: 0,
            elements: [{
                type: "html",
                html: "<form action='/upload/c?CKEditorFuncNum="+ap+"' method='post' enctype='multipart/form-data' target='myiframe' style='margin-top:10px;'>" +
                		"<input name='uploadimg'  style='background: #fbfbfb;url(http://static.zcool.com.cn/images/txtBg.png) repeat-x left top;height: 36px;line-height: 36px;border: 1px solid #abadb3;font-size: 14px;padding: 0 5px;width:360px;' id='uploadimg'  type='file' /><br>" +
                		"<input name='submit' onclick= CKEDITOR.dialog.getCurrent().hide();  id='sumit' value='上传' type='submit'style='background: #fbfbfb;url(http://static.zcool.com.cn/images/txtBg.png) repeat-x left top;height: 36px; line-height: 36px; text-align:center; margin-top:10px; border: 1px solid #abadb3;font-size: 14px;padding: 0 5px;width:70px;' />" +
                		"</form>" +
                		"<iframe name='myiframe' id='myiframe' width='100' height='100'frameborder='0' scrolling='yes' marginheight='0' marginwidth='0' ></iframe>"
            }]
        }],
        buttons: [CKEDITOR.dialog.cancelButton]
    }
});