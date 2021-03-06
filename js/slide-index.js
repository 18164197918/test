var pageTimer = {} ; //定义计算器全局变量
//赋值模拟
!
function(e) {
    e.fn.slideCarsousel = function(t) {
        t = e.extend({},
        e.fn.slideCarsousel.defaultSetting, t);
        var i = e(this),
        n = i.children("ul.item-list"),
        r = n.children(),
        s = {
            slideCarousel: i,
            count: r.length,
            ul: n,
            liList: r,
            currentIndex: 0,
            indicatorList: i.children(".indicator-list").children("a"),
            itemPrev: i.children(".controls").children(".item-prev"),
            itemNext: i.children(".controls").children(".item-next"),
            itemClassArr: [],
            init: function() {
                for (var e = 0,
                t = s.count; e < t; e++) s.itemClassArr.push("item" + e);
                s.slideAutoChange()
            },
            slideAutoChange: function() {
            	var time=Math.random()*100;
                t.isAutoChange && (pageTimer[time]  = window.setInterval(function() {
                    s.toNext();
                },
                t.direction))
            },
            toNext: function() {
            	/*移除第二张(第三张)banner图的animate*/
            	r.find('.three .fix-box-ban-three').removeClass('animate').end().find('.fix-box-ban').removeClass('animate'); 
                s.itemClassArr.unshift(s.itemClassArr[s.count - 1]),
                s.itemClassArr.pop(),
                s.currentIndex++,
                s.currentIndex = s.currentIndex >= s.count ? 0 : s.currentIndex;
                
                if(s.currentIndex == 1) { /* 首页第一张banner图片 */
					$('.com-banner').css({
						'background-color': '#ff774d'   /*红色*/
					});
					r.find('.three .fix-box-ban-three').addClass('animate'); /*为第二张banner图添加animate*/
				} else if(s.currentIndex == 0){
					$('.com-banner').css({
						'background-color': '#48d1f9'
					});					
				}else {
					$('.com-banner').css({
						'background-color': '#59bbe8' /*第三张banner图*/
					});
					r.find('.fix-box-ban').addClass('animate'); /*为第三张banner图添加animate*/
				}
                s.resetItemClass()
            },
            toPrev: function() {
                s.itemClassArr.push(s.itemClassArr[0]),
                s.itemClassArr.shift(),
                s.currentIndex--,
                s.currentIndex = s.currentIndex < 0 ? s.count - 1 : s.currentIndex;
                if(s.currentIndex == 1) { /* 首页第一张banner图片 */
					$('.com-banner').css({
						'background-color': '#ff774d'
					});
					r.find('.three .fix-box-ban-three').addClass('animate');
				} else if(s.currentIndex == 0){
					$('.com-banner').css({
						'background-color': '#48d1f9' /*蓝色*/
					});					
				}else {
					$('.com-banner').css({
						'background-color': '#59bbe8' /*灰蓝色*/
					});
					r.find('.fix-box-ban').addClass('animate');
				}
                s.resetItemClass()
            },
            processIndicatorEvent: function(t) {
                var i = t - s.currentIndex;
                if (0 != i) {
                    if (s.currentIndex = t, i > 0) {
                        n = s.itemClassArr.splice(s.itemClassArr.length - i);
                        return s.itemClassArr = e.merge(n, s.itemClassArr),
                        void s.resetItemClass()
                    }
                    if (i < 0) {
                        var n = s.itemClassArr.splice(0, -i);
                        return s.itemClassArr = e.merge(s.itemClassArr, n),
                        void s.resetItemClass()
                    }
                }
            },
            resetItemClass: function() {
                e.each(s.liList,
                function(t, i) {
                    e(i).removeClass().addClass(s.itemClassArr[t])
                }),
                s.indicatorList.removeClass("selected").eq(s.currentIndex).addClass("selected"),
                s.processCallbackFunc(s.currentIndex)
            },
            processCallbackFunc: function(e) {
                null != t.callbackFunc && void 0 != t.callbackFunc && t.callbackFunc(e)
            }
        };
        switch (s.init(), s.itemNext.click(function() {
            s.toNext()
        }), s.itemPrev.click(function() {
            s.toPrev()
        }), t.indicatorEvent) {
    	
        case "click":
            s.indicatorList.click(function() {
                s.processIndicatorEvent(e(this).attr("data-slide-index"))
            });
            break;
        case "mouseover":
        	r.mouseover(function() {
        		$('.news-btn>.item-prev,.news-btn>.item-next').show();
        	});
            s.indicatorList.mouseover(function() {
            	s.processIndicatorEvent(e(this).attr("data-slide-index"));
            	$('.news-btn>.item-prev,.news-btn>.item-next').hide();
            	if(s.currentIndex == 1) { /* 首页第一张banner图片 */
					$('.com-banner').css({
						'background-color': '#ff774d'
					});
					r.find('.three .fix-box-ban-three').addClass('animate');
				} else if(s.currentIndex == 0){
					$('.com-banner').css({
						'background-color': '#48d1f9'
					});					
				}else {
					$('.com-banner').css({
						'background-color': '#59bbe8'
					});
					r.find('.fix-box-ban').addClass('animate');
				}
            })
        }
        switch (t.slideType) {
        case "2d":
            break;
        case "3d":
            s.ul.on("click", ".item1 img",
            function() {
                s.toPrev()
            }),
            s.ul.on("click", ".item3 img",
            function() {
                s.toNext()
            })
        }
        s.slideCarousel.mouseover(function() {
        	//全部清除方法
			for(var each in pageTimer){  
			    clearInterval(pageTimer[each]);
			}
            clearInterval(t.slideInterval);
        }).mouseleave(function() {
            s.slideAutoChange(); 
        })
    },
    e.fn.slideCarsousel.defaultSetting = {
        slideInterval: "slideInterval",
        isAutoChange: !0,
        direction: 5e3,
        callbackFunc: null,
        indicatorEvent: "click",
        slideType: "2d"
    }
} (jQuery);