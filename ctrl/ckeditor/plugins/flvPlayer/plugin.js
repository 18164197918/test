CKEDITOR.plugins.add('flvPlayer',  
{  
    init: function(editor)      
    {          
        //plugin code goes here   
        var pluginName = 'flvPlayer';   
        editor.ui.addButton('flvPlayer',  
        {                 
            label: '插入Flv视频',  
            command: pluginName  
        });  
    }  
