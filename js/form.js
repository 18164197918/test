$(function() {

// 选择属性、添加标签
	// select下拉
	var selectBox = $('.selectBox'),
	inputBox = $('.inputBox'),
	addTagsBox = $('#addTagsBox'), // 添加标签盒子
	addAttr = $('#addAttr'),// 添加属性
	attrBox = $('.attrBox'); // 最外层盒子
	keywordBox= $('.keywordBox'); // 最外层盒子
	// select的change事件
	attrBox.on('change', '.selectBox', function() {
		$(this).each(function() {
			var curVal = $(this).val();
			$(this).next().val(curVal);
			inputBox.focus()
		});
			var hasBox = $(this).closest('.row-line').find('.row-item-box').length;
		if(hasBox>0){
			// console.log('进入if')
			return false;
		}else{
			var inputStr = '<div class="col-md-3 col-sm-3 row-item row-item-box">'
				 +		'<div class="row row-attr">'
				 +			'<div class="col-md-7 col-sm-7  mr-15">'
				 +				'<input type="text" class="form-control control-label" placeholder="标签值" />'
				 +			'</div>'
				 +			'<div class="col-md-5 col-sm-5 ml-15">'
				 +				'<div class="btn-attr-box">'
				 +		  			'<button id="tagsSure" type="button" class="btn btn-default btn-add tagsSure">+</button>'
				 +		  		'</div>'
				 +	  		'</div>'
				 +		'</div>'
			  	 +	'</div>';
			$(this).closest('.row-item').after(inputStr);
		} 
	});
	
//	inputBox.bind("input propertychange",function(){  
//	    var value=$(this).val();  
////	    if(value){  
//	    	alert(value)
////	    }else{  
////	    }  
//	});  
	
	// 获取input的val值
	attrBox.on('keyup', '.inputBox', function() {
		$(this).each(function() {
			var inputVal = $(this).val();
			if(inputVal) {
				var hasBox = $(this).closest('.row-line').find('.row-item-box').length;
				if(hasBox>0){
					// console.log('进入if')
					return false;
				} else {
					// console.log('进入else')
					var inputStr = '<div class="col-md-3 col-sm-3 row-item row-item-box">'
						 +		'<div class="row row-attr">'
						 +			'<div class="col-md-7 col-sm-7  col-xs-7">'
						 +				'<input type="text" class="form-control control-label" placeholder="标签值" />'
						 +			'</div>'
						 +			'<div class="col-md-5 col-sm-5 col-xs-5 ml-15">'
						 +				'<div class="btn-attr-box">'
						 +		  			'<button id="tagsSure" type="button" class="btn btn-default btn-add tagsSure">+</button>'
						 +		  		'</div>'
						 +	  		'</div>'
						 +		'</div>'
					  	 +	'</div>';
					$(this).closest('.row-item').after(inputStr);
					
				}
				
			} else {
				// console.log('进入else')
				 $(this).closest('.row-item').next().remove();
			}
		});
	});
	
	// 点击标签确认按钮
	attrBox.on('click', '.tagsSure', function() {
		$(this).each(function(){
			var tagsVal = $(this).closest('.row-item').find('.form-control').val();
			tagsVal=HtmlUtil.htmlEncode(tagsVal);
			if(tagsVal){
				var len=$(this).closest('.row-item').next().find('.tags-span').length;
				if(len<20){
					var tagsBox ='<span class="tags-span rel">' +'<span class="tags_value">'+tagsVal+'</span>'
								+ 	'<i class="iconfont i-tags-close abs">&#xe624;</i>'
								+	'</span>';
					$(this).closest('.row-item').next().append(tagsBox); 
					$(this).closest('.row-item').find('.form-control').val('');
					if($(this).parents("div").hasClass('md-modal')){//存在弹窗的标签组
							//callBackLoadIframe($(this).parents("div.md-modal"));
					}else{
							callBackLoadIframe();
					}
				}else{
					$.CwsPopup.Alert("提示","最多添加20个关键词！");
					return false;
				}
			}
		});
	});
	
	// 点击标签删除按钮
	keywordBox.on('click', '.i-tags-close', function() {
		$(this).closest('.tags-span').remove();
	});
	
		// 点击标签删除按钮
	keywordBox.on('click', '.a-del-con', function() {
		var len=$('.a-del-con').length;
		if(len==1){
			$.CwsPopup.Alert('提示','请勿删除此标签');
			return;
		}
		$(this).parent().remove();
	});
	
	// 添加属性
	addAttr.on('click', function(){
		var newHtml = $(this).closest('.row').prev().clone();
		newHtml.find('.row-item-box').remove().end().find('.row-tagsBox').html('');
		newHtml.find('.row-item-box').remove().end().find('.inputBox').val('');
		$(this).closest('.row').before(newHtml);
		callBackLoadIframe();
	});

	
	
// 在线客服样式JS	
	setTimeout(function(){
		changeColor('.select-color-big','.suspension-big');
		changeColor('.select-color-small','.suspension-small');
	},100)
	function changeColor(selector, source) {  // 改变颜色
		$(selector).on('change', function() {
			var curColor = $(this).val();
			if(curColor == 1) {
				if($(source).hasClass('yellow')) {
					$(source).removeClass('yellow') && $(source).addClass('red');
				} else {
					$(source).addClass('red');
				}
				
			}else if(curColor ==2){
				if($(source).hasClass('red')) {
					$(source).removeClass('red') && $(source).addClass('yellow');
				} else {
					$(source).addClass('yellow');
				}
			} else{
				$(source).removeClass('red') && $(source).removeClass('yellow')
			}
		});
		
		var curColor = $(selector).val();
		console.log(curColor);
		if(curColor == 1) {
			if($(source).hasClass('yellow')) {
				$(source).removeClass('yellow') && $(source).addClass('red');
			} else {
				$(source).addClass('red');
			}
			
		}else if(curColor ==2){
			if($(source).hasClass('red')) {
				$(source).removeClass('red') && $(source).addClass('yellow');
			} else {
				$(source).addClass('yellow');
			}
		} else{
			$(source).removeClass('red') && $(source).removeClass('yellow')
		}
	}
	
	
	
	isShow('.show-big','.suspension-big');      // 大
	isShow('.show-small','.suspension-small');  // 小
	
	function isShow(location, delLoc) {
		$(location).on('mouseover', function() {
			$(delLoc).show();
		}).on('mouseout', function() {
			$(delLoc).hide();
		});
	}
	
	// 在线客服tab切换
	$('#myTabs a').click(function (e) {
	  e.preventDefault()
	  $(this).tab('show')
	});
});