$().ready(function(){
	$("#prdName1").bind('click',function(){ 
	 	$("#prdName1a").click();
	});
	$("#prdName2").bind('click',function(){ 
	 	$("#prdName2a").click();
	});
	$("#prdName3").bind('click',function(){ 
	 	$("#prdName3a").click();
	});
	$("#prdName4").bind('click',function(){ 
	 	$("#prdName4a").click();
	});	
})


function btnsaveck() {
	var a = document.getElementById("saveck1").style.display;
	var b = document.getElementById("saveck2").style.display;
	var c = document.getElementById("saveck3").style.display;
	var d = document.getElementById("saveck4").style.display;
	var s;
	if (a == "none") {
		s = 1;
		if (b != "none" && c != "none" && d != "none") {
			document.getElementById('savecks').style.display = "none";
		}
	} else if (b == "none") {
		s = 2;
		if (a != "none" && c != "none" && d != "none") {
			document.getElementById('savecks').style.display = "none";
		}
	} else if (c == "none") {
		s = 3;
		if (b != "none" && a != "none" && d != "none") {
			document.getElementById('savecks').style.display = "none";
		}
	} else if (d == "none") {
		s = 4;
		if (b != "none" && a != "none" && c != "none") {
			document.getElementById('savecks').style.display = "none";
		}
	}
	document.getElementById('saveck' + s + '').style.display = "";
	$('#saveck1,#saveck2,#saveck3,#saveck4').removeClass("active");
	$('#profile1,#profile2,#profile3,#profile4').removeClass("in active");
	$('#profile' + s + '').addClass("in active");
	$('#saveck' + s + '').addClass("active");
	// document.getElementById('delck1a').style.display="";
	$("#saveck1").parent().children("li").children(".dlt-ck").css("display", "block");
}
function delck(t) {
	layer.open({
			content : "是否确认删除",
			yes : function(index) {
				document.getElementById('saveck' + t + '').style.display = "none";
				document.getElementById('savecks').style.display = "";
				var a = document.getElementById("saveck1").style.display;
				var b = document.getElementById("saveck2").style.display;
				var c = document.getElementById("saveck3").style.display;
				var d = document.getElementById("saveck4").style.display;
				if (d != "none") {
					s = 4;
				} else if (c != "none") {
					s = 3;
				} else if (b != "none") {
					s = 2;
				} else if (a != "none") {
					s = 1;
				}
				$('#profile1,#profile2,#profile3,#profile4').removeClass(
						"in active");
				if (t == 1) {
					editor1.setData("");
				}
				if (t == 2) {
					editor2.setData("");
				}
				if (t == 3) {
					editor3.setData("");
				}
				if (t == 4) {
					editor4.setData("");
				}
				$('#profile' + s + '').addClass("in active");
				$('#saveck' + s + '').addClass("active");
				var li_block = 0;
				for ( var i = 0; i < $("#saveck1").parent().children("li").length; i++) {
					// console.log($($("#saveck1").parent().children("li")[i]).css("display"));
					if ($($("#saveck1").parent().children("li")[i]).css(
							"display") == "block") {
						li_block += 1;
					}
				}
				if (li_block == 1) {
					for ( var i = 0; i < $("#saveck1").parent().children(
							"li").length; i++) {
						// console.log($($("#saveck1").parent().children("li")[i]).css("display"));
						if ($($("#saveck1").parent().children("li")[i])
								.css("display") == "block") {
							$($("#saveck1").parent().children("li")[i])
									.children(".dlt-ck").css("display",
											"none");
						}
					}
				}
				layer.close(index);
			}

		})

}
