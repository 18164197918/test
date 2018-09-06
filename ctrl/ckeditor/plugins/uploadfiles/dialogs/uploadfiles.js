(function () {

    // function selectFile(oFileInput){
    //     var oUploadFiles = document.getElementById("uploadFiles");
    //     oUploadFiles.appendChild(oFileInput);
    //     oFileInput.focus();
    //     oFileInput.click();//不能这样做，可能是为了安全着想吧！
    //     var fileValue = oFileInput.value;
    //     if(fileValue == ""){
    //         oUploadFiles.removeChild(oFileInput);
    //         return false;
    //     }
    //     else
    //      return true;
        
    // }

    function HelloWorldDialog(editor) {

        return {
            title: '上传文件',
            minWidth: 300,
            minHeight: 80,
          
                // {
                //     type: 'button',
                //     id:'uploadfilesID',
                //     label:'uploadfiles',
                //     onClick: function () {
                //         alert('Custom Button');
                //     }
                // }
            /*{
                type: 'button',
                id: 'someButtonID',
                label: 'Button',
                onClick: function () {
                    alert('Custom Button');
                }
            },*/
               
            onLoad: function () {

                console.log("654654");
            },
            onShow: function () {
                alert('onShow');
            },
            //onHide: function () {
            //    alert('onHide');
            //},

            onClick: function () {
                    alert('Custom Button');
            },

            onOk: function () {
                //alert('onOk');
                this.commitContent(editor);
            },
            onCancel: function () {
                alert('onCancel');
            },
            resizable: CKEDITOR.DIALOG_RESIZE_HEIGHT
        };
    }

    CKEDITOR.dialog.add('uploadfiles', function (editor) {
        return HelloWorldDialog(editor);
    });
})();