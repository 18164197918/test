/***
 * 自定义验证规则
 * ***/
//-----------------------------------------------------------------


//添加手机号码验证
//规则：1开头3、4、5、7、8的11位手机号码
jQuery.validator.addMethod("tel", function(value, element){
	var reg = /^1(3|4|5|7|8)\d{9}$/ig;
	if(value.length==0){
	 	return true;
	 }else{
		return reg.test(value);
	 }
},"请填写正确的手机号码！")


//添加邮箱验证
//规则：字母数字-_.@字母数字.2到3位字母
jQuery.validator.addMethod("email", function(value, element){
	var reg = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/ig;
	if(value.length==0){
	 	return true;
	 }else{
		return  reg.test(value);
	 }
},"请填写正确的邮箱！")


//添加手机或者邮箱验证
jQuery.validator.addMethod("emailAndTel", function(value, element){
	var reg_tel = /^1(3|4|5|7|8)\d{9}$/ig;
	var reg_email = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/ig;
	if(value.length==0){
	 	return true;
	 }else{
		return reg_tel.test(value)||reg_email.test(value);
	 }
},"请填写正确的手机号码或者邮箱账号！")

//添加平台密码验证
//规则：区分大小写的4-16个字符
jQuery.validator.addMethod("password", function(value, element){
	var isPassword=/^\S{6,16}$/ig;
	if(value.length==0){
	 	return true;
	 }else{
		return isPassword.test(value);
	 }
},"请填写6-16位字符！")



//添加备案号 验证
//规则：省的简称ICP备*******号
jQuery.validator.addMethod("icp", function(value, element){
	var isIcp=/^[\u4e00-\u9fa5]{1}ICP\d{1,}/ig;
	if(value.length==0){
	 	return true;
	 }else{
		return isIcp.test(value);
	 }
},"请填写正确的备案号！")

//添加邮政编码验证
//规则：
jQuery.validator.addMethod("mail", function(value, element){
	var isMail=/^\d{6}$/ig;
	if(value.length==0){
	 	return true;
	 }else{
		return isMail.test(value);
	 }
},"请填写正确的邮政编码！")

//添加传真验证
//规则：
jQuery.validator.addMethod("fax", function(value, element){
	var isFax=/^\d{3}-\d{8}|\d{4}-\{7,8}$/ig;
	if(value.length==0){
	 	return true;
	 }else{
		return isFax.test(value);
	 }
},"请填写正确的传真号码！")


//添加电话验证
//规则：
jQuery.validator.addMethod("phone", function(value, element){
	var isPhone=/^[0-9-()（）]{7,18}$/ig;
	if(value.length==0){
	 	return true;
	 }else{
	 	
		return isPhone.test(value);
	 }
},"请填写正确的电话号码！")


//添加数字验证
//规则：
jQuery.validator.addMethod("num", function(value, element){
	var isNum=/^[0-9]\d*\.\d*|0\.\d*[0-9]\d|\d*[0-9]\d*$/ig;
	if(value.length==0){
	 	return true;
	 }else{
		return isNum.test(value);
	 }
},"请填写正确的数据！")

//添加零到一之间的一位小数验证
//规则：
jQuery.validator.addMethod("floatNum", function(value, element){
	var isNum=/^0|1|0.0|1.0|0+([.][0-9])$/ig;
	if(value.length==0){
	 	return true;
	 }else{
		return isNum.test(value);
	 }
},"请填写正确的数据！")

//添加正整数数验证
//规则：
jQuery.validator.addMethod("addNum", function(value, element){
	var isaddNum=/^[1-9]\d*$/ig;
	if(value.length==0){
	 	return true;
	 }else{
		return isaddNum.test(value);
	 }
},"请填写正确的数据！")


//添加负整数数验证
//规则：
jQuery.validator.addMethod("rNum", function(value, element){
	var isNum=/^-?[1-9]\d*$/ig;
	if(value.length==0){
	 	return true;
	 }else{
		return isNum.test(value);
	 }
},"请填写正确的数据！")


//添加非www验证
//规则：
jQuery.validator.addMethod("nowww", function(value, element){
	var isNum=/^www$/ig;
	var res=isNum.test(value);
	if(value.length==0){
	 	return true;
	 }else{
		if( res ){
			return false;
		}else{
			return true;
		}
	 }
	
	
},"请填写正确的数据！")

//添加非汉字验证
//规则：
jQuery.validator.addMethod("CNlitter", function(value, element){
	var isCn= /[\u4e00-\u9fa5]+/;
	var res=isCn.test(value);
	if(value.length==0){
	 	return true;
	}else{
		if( res ){
			return false;
		}else{
			return true;
		}
	 }
},"请填写正确的数据！")


//添加网站链接验证
//规则：
jQuery.validator.addMethod("linkurl", function(value, element){
	var islinkurl=/(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/ig;
	if(value.length==0){
	 	return true;
	 }else{
		return islinkurl.test(value);
	 }
},"请填写正确的数据！")

//简单的网址验证
jQuery.validator.addMethod("url", function(value, element){
	var islinkurl=/[a-zA-z]+(:\/\/)[^\s]*/ig;
	if(value.length==0){
	 	return true;
	 }else{
		return islinkurl.test(value);
	 }
},"请填写正确的数据！")

//非空验证
jQuery.validator.addMethod("nonull", function(value, element){
	var islinkurl=/[^\s]+/ig;
	if(value.length==0){
	 	return true;
	 }else{
		return islinkurl.test(value);
	 }
},"请填写正确的数据！")

//正浮点数验证
jQuery.validator.addMethod("isFloatNum", function(value, element){
	var isFloatNum=/^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/ig;
	if(value.length==0){
	 	return true;
	 }else{
		return isFloatNum.test(value);
	 }
},"请填写正确的数据！")