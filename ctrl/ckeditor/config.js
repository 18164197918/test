/**
 * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function(config) {
	// Define changes to default configuration here. For example:
	// config.language = 'fr';
	// config.uiColor = '#AADC6E';
	
	//解决格式丢失的问题
	//config.pasteFromWordIgnoreFontFace = true; //默认为忽略格式
	config.pasteFromWordRemoveFontStyles = false;
	config.pasteFromWordRemoveStyles = false;
	
	var _language = $("#sfLg").val();
	if(_language == "en") {
		config.language = 'en';
	} else {
		config.language = 'zh-cn';
	}
	config.skin = 'moonocolor';
	//设置服务器地址
	var host_upload = 'http://172.19.0.26:8080';

	config.filebrowserBrowseUrl = 'ckfinder/ckfinder.html';
	config.filebrowserImageBrowseUrl = 'ckfinder/ckfinder.html?type=Images';
	config.filebrowserFlashBrowseUrl = 'ckfinder/ckfinder.html?type=Flash';
	config.filebrowserUploadUrl = 'ckfinder/core/connector/java/connector.java?command=QuickUpload&type=Files';
	//	config.filebrowserUploadUrl = host_upload + '/upload/c';
//	config.filebrowserImageUploadUrl = 'ckfinder/core/connector/java/connector.java?command=QuickUpload&type=Images';
//	config.filebrowserFlashUploadUrl = 'ckfinder/core/connector/java/connector.java?command=QuickUpload&type=Flash';
	config.image_previewText = ' '; //预览区域显示内容
		if(/android|iphone|symbianos|windows phone|ipad|ipod|blackberry/i.test(navigator.userAgent)) {
			config.toolbar = [
				['Bold', 'Italic'],
				['JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'],
				['NumberedList', 'BulletedList'],
				['UploadPic', 'Table', "-", 'Format', 'Font', 'FontSize'],
				['baiduMap']
			];
			config.extraPlugins = 'UploadPic,baiduMap';
		} else {
			config.toolbar = [
				['Source','Cut', 'Copy', 'Paste', 'PasteText', 'SpellChecker'],
				['SelectAll', 'RemoveFormat'],
				['Bold', 'Italic', 'Underline', 'Strike'],
				['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent'],
				['Link', 'Unlink'],
				['JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', 'HorizontalRule'],
				['TextColor', 'BGColor'],
				['UploadPic', "BrowserPic", 'Table', "-", 'Format', 'Font', 'FontSize'],
				['baiduMap']
			];
			config.extraPlugins = 'UploadPic,BrowserPic,baiduMap';
		}
		config.allowedContent = true
	//config.font_names = '宋体/宋体;黑体/黑体;仿宋/仿宋_GB2312;楷体/楷体_GB2312;隶书/隶书;幼圆/幼圆;微软雅黑/微软雅黑;'+ config.font_names ;
	config.font_names = '微软雅黑/微软雅黑;';
	config.uiColor = '#f9f9f9';
	config.dialog_backgroundCoverColor = 'rgb(255, 255, 255)';
	config.removeDialogTabs = 'image:advanced;image:Link';
	config.resize_enabled = false;
};
