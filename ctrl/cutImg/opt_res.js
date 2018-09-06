var path = "";
$().ready(function() { 
	path = $("base").attr("href");
	
	
	// setResProp("0", "code");
	
	/*上传图片弹出层*/
	$(".uploadbg").bind("click",function(event){
		event.stopPropagation();
		$(".show").show();
	});
	
	/*添加文本编辑框*/
	$(".add").on("click",function(event){
		// cknum++;
		event.stopPropagation();
		var a=$(".ipt-group .click-bit:hidden").eq(0).attr("name");
		$(".ipt-group .click-bit:hidden").eq(0).fadeIn();
		$(".tabcons .tabcon").eq(a).fadeIn(0).siblings().fadeOut(0);
		if ($(".click-bit:visible").length>3){
			$(this).hide();
		}else{
			$(this).show();
		}			
	});
	
	/*点击关闭文本框*/
	$(".ipt-group").on("click",".close",function(event){
		event.stopPropagation();
		if ($(".click-bit:visible").length>1) {
			var a=$(".ipt-group .close").index(this);
			//$(".ipt-group .ipt-text").eq(a).val("");
			$(".cke_wysiwyg_frame").eq(a).contents().find("p").text("");
			$(this).parent().hide();
			$(".tabcons .tabcon").eq(a).hide();
			var b=$(".ipt-group .click-bit:visible").first().attr("name");
			$(".tabcons .tabcon").eq(b).fadeIn().siblings().fadeOut();		
		};
		$(".add").show();
	});
	
	/*切换当前点击的文本框*/
	$(".ipt-group").on("click",".click-bit",function(){
		var a=$(".ipt-group .click-bit").index(this);
		$(".tabcons .tabcon").eq(a).fadeIn(0).siblings().fadeOut(0);
		
	});
	/* 删除已上传图片 */	
	$(".upload-product").on("click",".img-close",function(event){
		event.stopPropagation();
		var a=$(".upload-product .img-close").index(this);
		$(".upload-product .resImgInfo").eq(a).remove();
		if($(".resChildImg .uploadimg").length<=3){
			$(".resChildImg .productimg").eq(0).show();
		}
	});
	/* 删除已上传图片 	*/
	/*$(".img-close").bind("click",function(event){
		alert(1);
		event.stopPropagation();
		var a=$(".upload-product .img-close").index(this);
		$(".upload-product .resImgInfo").eq(a).remove();
		if($(".resChildImg .uploadimg").length<=3){
			$(".resChildImg .productimg").eq(0).show();
		}
	})*/
	
	/** 单位 修改回显 */
	var span = $(".sel[name='rl.length'] span");
	var lengthSel = $("#lengthSel").val();
	var lis = $(".sel[name='rl.length'] li");
	for(var i = 0; i < lis.length; i++){
		if(lis.eq(i).attr("value") == lengthSel){
			span.html(lis.eq(i).attr("value"));
		}
	}
	/** 商品属性 修改回显 */
	span = $(".sel[name='rl.title2'] span");
	var title2Sel = $("#lengthSel").val();
	lis = $(".sel[name='rl.length'] li");
	for(var i = 0; i < lis.length; i++){
		if(lis.eq(i).attr("value") == title2Sel){
			span.html(lis.eq(i).attr("value"));
		}
	}
	
	
});

function resAddsubmit(){
	$("#optres").attr("disabled", true);
	
	var i = 0;
$('.resChildImg .resImgInfo').each(function() {
	$(this).find('input').eq(0).attr("name", "ra#"+(i+1)+".label");
	$(this).find('input').eq(0).attr("value", "prdpic"+(i+1));	
	$(this).find('input').eq(1).attr("name", "ra#"+(i+1)+".value");
	i++;
});
	

	var code = "";
	var sel_li = $(".sel[name='code3'] li");
	var sel_span = $(".sel[name='code3'] span").html();
	if(!isNull(sel_span) && sel_span === "请选择三级分类"){
		sel_span = $(".sel[name='code2'] span").html();
		if(!isNull(sel_span) && sel_span === "请选择二级分类"){
			sel_span = $(".sel[name='code'] span").html();
			if(!isNull(sel_span) && sel_span === "请选择一级分类"){
				layer.msg('请选择分类', {time:3000,icon: 5,skin:"layui-modal"});
				return;
			}else{
				sel_li = $(".sel[name='code'] li");
				for(var i = 0; i < sel_li.length; i++){
					if(sel_li.eq(i).html() == sel_span){
						code = sel_li.eq(i).attr("value");
						$("input[name='rpl.code']").val(code);
						break;
					}
				}
			}
		}else{
			sel_li = $(".sel[name='code2'] li");
			for(var i = 0; i < sel_li.length; i++){
				if(sel_li.eq(i).html() == sel_span){
					code = sel_li.eq(i).attr("value");
					$("input[name='rpl.code']").val(code);
					break;
				}
			}
		}
	}else{
		for(var i = 0; i < sel_li.length; i++){
			if(sel_li.eq(i).html() == sel_span){
				code = sel_li.eq(i).attr("value");
				$("input[name='rpl.code']").val(code);
				break;
			}
		}
	}
	

	if(isNull(code)){
		layer.msg('请选择分类', {time:3000,icon: 5,skin:"layui-modal"});
		$("#optres").removeAttr("disabled");
		return;
	}
	

	var length = "";
	sel_li = $(".sel[name='rl.length'] li");
	sel_span = $(".sel[name='rl.length'] span");
	for(var i = 0; i < sel_li.length; i++){
		if(sel_li.eq(i).html() == sel_span.html()){
			length = sel_li.eq(i).attr("value");
		}
	}
	if(isNull(length)){
		layer.msg('请选择单位', {time:3000,icon: 5,skin:"layui-modal"});
		$("#optres").removeAttr("disabled");
		return;
	}
	
	var img = $("input[name='r.img']").val();
	if(isNull(img)){
		layer.msg('请上传主图', {time:30000,icon: 5,skin:"layui-modal"});
		$("#optres").removeAttr("disabled");
		return;
	}
	
	var cardtext1= isNull(editor1)?"":editor1.getData("");
	var cardtext2= isNull(editor2)?"":editor2.getData("");
	var cardtext3= isNull(editor3)?"":editor3.getData("");
	var cardtext4= isNull(editor4)?"":editor4.getData("");
	$("#content1").val(cardtext1);
	$("#content2").val(cardtext2);
	$("#content3").val(cardtext3);
	$("#content4").val(cardtext4);
	
	if(isNull(cardtext1) && isNull(cardtext2) && isNull(cardtext3) && isNull(cardtext4)){
		layer.msg('请描述一下产品详情', {time:3000,icon: 5,skin:"layui-modal"});
		$("#optres").removeAttr("disabled");
		return;
	}
	
	var formdata = $("#addResForm").serialize();
	formdata += "&rl.length="+length;
console.log(formdata);
	
	if (this.ajaxRequest_ != undefined && this.ajaxRequest_.readyState < 4) {
		layer.alert("请稍候",{yes:function(app){ layer.close(app); }});
		return false;
	}
	this.ajaxRequest_ = $.ajax({
		url:path+"/user/saveres.do",
		type:"POST",
		async: false,
		data:formdata,
		dataType:"json",
		success:function(data){
			console.log(data);
			if(!isNull(data.obj)){
				layer.open({
					title:"提示",
					skin:"layui-modal",
					content:"恭喜您，存储成功！",
					btn:["确定"],
					yes:function(){
						parent.location.reload(); 
					}
				});
			}else{
				layer.msg('抱歉，存储失败,请重试', {time:3000,icon: 5,skin:"layui-modal"});
			}
		},
		error:function(data){
			if(data.responseText == "tosignin"){
				window.location.href = path+"/loginui.do";
			}else{
				layer.open({
					content: "操作失败，请重试",
					btn: ["确定"]
				});
			}
		}
	});
}

$(document).ready(function() {
	$("#optres").click(function(){
		$("#addResForm").submit();
	});
});


