/**
 * jQuery插件：颜色拾取器
 * 
 * @author  Karson
 * @name    jquery.colorpicker.js
 * @since   2011-5-18 17:30:50
 * @edit by Xinying
 * @Any problems about the change just mail to 773875068@qq.com. Thanks.
 */

(function ($) {
	
//	alert(999)
	
    var ColorHex = new Array('00', '33', '66', '99', 'CC', 'FF');
    var SpColorHex = new Array('FF0000', '00FF00', '0000FF', 'FFFF00', '00FFFF', 'FF00FF');
    $.fn.colorpicker = function (options) {
        var opts = jQuery.extend({}, jQuery.fn.colorpicker.defaults, options);
        initColor();
        return this.each(function () {
            var obj = $(this);
            obj.bind(opts.event, function () {
                //定位
                var ttop = $(this).offset().top;     //控件的定位点高
                var thei = $(this).height();         //控件本身的高
                var tleft = $(this).offset().left;    //控件的定位点宽
                $("#colorpanel").css({
                    top: ttop + thei + 5,
                    left: tleft
                }).show();
                var target = opts.target ? $(opts.target) : obj;
                if (target.data("color") == null) {
                    target.data("color", target.css("color"));
                }
                $("#_creset").bind("click", function () {
                    target.css("color", target.data("color"));
                    $("#colorpanel").hide();
                    opts.reset(obj);
                    
                    $('#btnSpan').removeClass('palette-box-ac animated bounceInLeft');///zzzzzzzzzz
                });

                $("#CT tr td").unbind("click").mouseover(function () {
                	
                    var color = $(this).css("background-color");
                    
//                  	alert(999)
                    
                    $("#DisColor").css("background", color);
                    $("#HexColor").val($(this).attr("rel"));
                }).click(function () {
                	
                    var aaa = $(this).css("background-color");//获取选中的额颜色值
                    
                    // 截断后的颜色值
                    var afterColor = "'" + aaa.split(" ",3) + "'";
                    
                    // 正常颜色值
                    var curColor = afterColor.replace(/,,/gi, ",");
                    
                    // 最终颜色
                    var endColor = curColor.replace(/'/g,"")
                    
					// 颜色值转换
					switchFun(endColor)

                    var color = opts.ishex ? $(this).attr("rel") : aaa;
                    if (opts.fillcolor) target.val(color);
                    target.css("color", aaa);
                    $("#colorpanel").hide();
                    $("#_creset").unbind("click");
                    opts.success(obj, color);
                    
                    $('#btnSpan').removeClass('palette-box-ac animated bounceInLeft');///zzzzzzzzzz
                });

            });
        });
        
        // 利用JS进行rgb与16位色值之间的转换
        function switchFun(rgb){
            var regexp = /[0-9]{0,3}/g;  
		    var re = rgb.match(regexp);//利用正则表达式去掉多余的部分，将rgb中的数字提取
		    var hexColor = "#"; var hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];  
		    for (var i = 0; i < re.length; i++) {
		        var r = null, c = re[i], l = c; 
		        var hexAr = [];
		        while (c > 16){  
		              r = c % 16;  
		              c = (c / 16) >> 0; 
		              hexAr.push(hex[r]);  
		         } hexAr.push(hex[c]);
		         if(l < 16&&l != ""){        
		             hexAr.push(0)
		         }
		       hexColor += hexAr.reverse().join(''); 
		       
		       
		    }  
		    var fC = window.localStorage.getItem('fC');//字体颜色
		    
		    if(fC == 'true'){
		   	 	sessionStorage.setItem('foreColor',hexColor);
		   	 	sessionStorage.setItem('bgColor','');
		   	 	sessionStorage.setItem('foreColor2','');
		   	 	
		   	 	
		    }else if(fC == 'false'){
		    	sessionStorage.setItem('foreColor','');
		   	 	sessionStorage.setItem('bgColor',hexColor);
		   	 	sessionStorage.setItem('foreColor2','');
		    }else if(fC == 'mid'){
		    	sessionStorage.setItem('foreColor','');
		   	 	sessionStorage.setItem('bgColor','');
		   	 	sessionStorage.setItem('foreColor2',hexColor);
		    }
		    
        }
        
        function initColor() {
		  	$("body").append('<div class="colorpanelBox" style=""><div id="colorpanel" style="display: none;margin:10px;"></div></div>');
            var colorTable = '';
            var colorValue = '';
            for (i = 0; i < 2; i++) {
                for (j = 0; j < 6; j++) {
                    colorTable = colorTable + '<tr height=12>'
                    colorTable = colorTable + '<td width=11 rel="#000000" style="background-color:#000000">'
                    colorValue = i == 0 ? ColorHex[j] + ColorHex[j] + ColorHex[j] : SpColorHex[j];
                    colorTable = colorTable + '<td width=11 rel="#' + colorValue + '" style="background-color:#' + colorValue + '">'
                    colorTable = colorTable + '<td width=11 rel="#000000" style="background-color:#000000">'
                    for (k = 0; k < 3; k++) {
                        for (l = 0; l < 6; l++) {
                            colorValue = ColorHex[k + i * 3] + ColorHex[l] + ColorHex[j];
                            colorTable = colorTable + '<td width=11 rel="#' + colorValue + '" style="background-color:#' + colorValue + '">'
                        }
                    }
                }
            }
            colorTable = '<table width=253 border="0" cellspacing="0" cellpadding="0" style="border:1px solid #000;">'
            + '<tr height=30><td colspan=21 bgcolor=#cccccc>'
            + '<table cellpadding="0" cellspacing="1" border="0" style="border-collapse: collapse">'
            + '<tr><td width="3"><td><input type="text" id="DisColor" size="6" disabled style="border:solid 1px #000000;background-color:#ffff00"></td>'
            + '<td width="3"><td><input type="text" id="HexColor" size="7" style="border:inset 1px;font-family:Arial;" value="#000000"><a href="javascript:void(0);" id="_cclose">关闭</a> | <a href="javascript:void(0);" id="_creset">清除</a></td></tr></table></td></table>'
            + '<table id="CT" border="1" cellspacing="0" cellpadding="0" style="border-collapse: collapse;" bordercolor="000000"  style="cursor:pointer;">'
            + colorTable + '</table>';
            $("#colorpanel").html(colorTable);
            
            
            $("#colorpanel").on('click', '#_cclose', function () {
                $("#colorpanel").hide();
                $("#changColor").hide();
                return false;
            }).css({
                "font-size": "12px",
                "padding-left": "0px"
            });
            
            
            
            
            //#region 判断使用的jquery版本，如果是1.8版本之后的使用on方法，如果是之前的使用live方法
            /*var jqversion = $().jquery;
            if (jqversion.match(".") == ",") {
                var jqversionArray = jqversion.split('.');
                if (jqversionArray != null && jqversionArray.length > 1) {
                    //#region 如果是1.8版本之后的使用on方法，如果是之前的使用live方法
                    if (parseInt(jqversionArray[0] > 1)) {
                        $("#colorpanel").on('click', '#_cclose', function () {
                            $("#colorpanel").hide();
                            return false;
                        }).css({
                            "font-size": "12px",
                            "padding-left": "20px"
                        });
                    }
                    else {
                        if (parseInt(jqversionArray[1]) >= 8) {
                            $("#colorpanel").on('click', '#_cclose', function () {
                                $("#colorpanel").hide();
                                return false;
                            }).css({
                                "font-size": "12px",
                                "padding-left": "20px"
                            });
                        }
                        else {
                            $("#_cclose").live('click', function () {
                                $("#colorpanel").hide();
                                return false;
                            }).css({
                                "font-size": "12px",
                                "padding-left": "20px"
                            });
                        }
                    }
                    //#endregion
                }
                else {
                    $("#_cclose").live('click', function () {
                        $("#colorpanel").hide();
                        return false;
                    }).css({
                        "font-size": "12px",
                        "padding-left": "20px"
                    });
                }
            }*/
            //#endregion
        }
    };
    jQuery.fn.colorpicker.defaults = {
        ishex: true, //是否使用16进制颜色值
        fillcolor: false,  //是否将颜色值填充至对象的val中
        target: null, //目标对象
        event: 'click', //颜色框显示的事件
        success: function () { }, //回调函数
        reset: function () { }
    };
})(jQuery);