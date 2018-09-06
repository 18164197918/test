<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>首页</title>
	<link rel="stylesheet" href="ctrl/bootstrap/css/bootstrap.min.css" />
	<link rel="stylesheet" href="ctrl/animate.min.css" /><!--前台页面样式-->
	<link rel="stylesheet" href="css/base.css" /><!--全局基础样式-->
	<link rel="stylesheet" href="css/index.css" /><!--前台页面样式-->
	<link rel="stylesheet" href="css/top.css" /><!--top 样式-->
	<link rel="stylesheet" href="css/footer.css" /><!--footer 样式-->
</head>
<body>
	<!--header start-->
	@@include('header.tpl')
	<!--header end-->
	<!--banner部分 start-->
	<div class="bjBanner">
		<div id="myCarousel" class="carousel slide">
			<!-- 轮播（Carousel）指标 -->
			<!--<ol class="carousel-indicators">
				<li data-target="#myCarousel" data-slide-to="0" class="active"></li>
				<li data-target="#myCarousel" data-slide-to="1"></li>
				<li data-target="#myCarousel" data-slide-to="2"></li>
			</ol>   -->
			<!-- 轮播（Carousel）项目 -->
			<div class="carousel-inner">
				<div class="item active">
					<div class="item-box clearfix">
						<div class="fl wid50 clearfix">
							<div class="bg-box clearfix fl rel">
								<img src="img/banner1-part1.png" alt="Second slide" class="bn1Pt1">
								<img src="img/banner1-part2.png" alt="Second slide" class="bn1Pt2">
							</div>
							<div class="bn1Pt3 fl">
								<!--<div class="icon-text-1 icon-text fadeOutRight animated" data-in="fadeInRight" data-out="fadeOutRight">
									<img src="img/computer3.png"><b>APP</b>
								</div>
								<div class="icon-text-2 icon-text fadeOutRight animated" data-in="fadeInRight" data-out="fadeOutRight">
									<img src="img/computer4.png"><b>APP</b>
								</div>
								<div class="icon-text-3 icon-text fadeOutRight animated" data-in="fadeInRight" data-out="fadeOutRight">
									<img src="img/computer5.png"><b>APP</b>
								</div>
								<div class="icon-text-4 icon-text fadeOutRight animated" data-in="fadeInRight" data-out="fadeOutRight">
									<img src="img/computer3.png"><b>APP</b>
								</div>-->
								<div class="icon-text-1 mt15">
									<img src="img/computer3.png"><b>APP</b>
								</div>
								<div class="icon-text-2 mt15">
									<img src="img/computer4.png"><b>APP</b>
								</div>
								<div class="icon-text-3 mt15">
									<img src="img/computer5.png"><b>微信</b>
								</div>
								<div class="icon-text-4 mt15">
									<img src="img/computer3.png"><b>小程序</b>
								</div>
							</div>
						</div>
						<div class="fr wid50">
							<div class="text-1 fadeInDown animated" data-in="fadeInDown" data-out="fadeOutUp">
								<p>O2O互联网+时代，您需要一个有</p><p>思想的网站</p>
							</div>
							<div class="text-2 fadeInUp animated" data-in="fadeInDown" data-out="fadeOutUp">
		                        <p>网站展示+ 交易、管理、订单 + 企业运营管理</p>
		                        <p><strong id="userNumber" data-username="1458718">1,458,722</strong>家企业正在使用建站ABC</p>
		                    </div>
		                    <div class="btn btn-1 fadeInDown animated" data-in="fadeInUp" data-out="fadeOutDown">
		                    	<a href="#">免费注册</a>
		                    </div>
		                    <div class="btn btn-2 fadeInDown animated" data-in="fadeInUp" data-out="fadeOutDown">
		                    	<a href="#">管理登录</a>
		                    </div>
	                    </div>
					</div>
					
				</div>
				<div class="item">
					<div class="item-box clearfix">
						<div class="fl wid50 clearfix">
							<div class="bg-box clearfix fl rel">
								<img src="img/banner1-part1.png" alt="Second slide" class="bn1Pt1">
								<img src="img/banner1-part2.png" alt="Second slide" class="bn1Pt2">
							</div>
							<div class="bn1Pt3 fl">
								<!--<div class="icon-text-1 icon-text fadeOutRight animated" data-in="fadeInRight" data-out="fadeOutRight">
									<img src="img/computer3.png"><b>APP</b>
								</div>
								<div class="icon-text-2 icon-text fadeOutRight animated" data-in="fadeInRight" data-out="fadeOutRight">
									<img src="img/computer4.png"><b>APP</b>
								</div>
								<div class="icon-text-3 icon-text fadeOutRight animated" data-in="fadeInRight" data-out="fadeOutRight">
									<img src="img/computer5.png"><b>APP</b>
								</div>
								<div class="icon-text-4 icon-text fadeOutRight animated" data-in="fadeInRight" data-out="fadeOutRight">
									<img src="img/computer3.png"><b>APP</b>
								</div>-->
								<div class="icon-text-1 mt15">
									<img src="img/computer3.png"><b>APP</b>
								</div>
								<div class="icon-text-2 mt15">
									<img src="img/computer4.png"><b>APP</b>
								</div>
								<div class="icon-text-3 mt15">
									<img src="img/computer5.png"><b>微信</b>
								</div>
								<div class="icon-text-4 mt15">
									<img src="img/computer3.png"><b>小程序</b>
								</div>
							</div>
						</div>
						<div class="fr wid50">
							<div class="text-1 fadeInDown animated" data-in="fadeInDown" data-out="fadeOutUp">
								<p>O2O互联网+时代，您需要一个有</p><p>思想的网站</p>
							</div>
							<div class="text-2 fadeInUp animated" data-in="fadeInDown" data-out="fadeOutUp">
		                        <p>网站展示+ 交易、管理、订单 + 企业运营管理</p>
		                        <p><strong id="userNumber" data-username="1458718">1,458,722</strong>家企业正在使用建站ABC</p>
		                    </div>
		                    <div class="btn btn-1 fadeInDown animated" data-in="fadeInUp" data-out="fadeOutDown">
		                    	<a href="#">免费注册</a>
		                    </div>
		                    <div class="btn btn-2 fadeInDown animated" data-in="fadeInUp" data-out="fadeOutDown">
		                    	<a href="#">管理登录</a>
		                    </div>
	                    </div>
						
						<!--<div class="carousel-caption">标题 2</div>-->
					</div>
				</div>
			</div>
			<!--轮播（Carousel）导航--> 
			<!--<a class="carousel-control left" href="#myCarousel" 
			   data-slide="prev">&lsaquo;</a>
			<a class="carousel-control right" href="#myCarousel" 
			   data-slide="next">&rsaquo;</a>-->
		</div>
	</div>
	<!--banner部分 end-->
	
	<!--内容部分 start-->
	<div class="bjContainer">
		<!--套餐部分 start-->
		<div class="pkBox">
			<div class="container">
				<div class="row">
				  	<div class="col-md-3 pl0">
				  		<a href="#">
						  	<div class="pkList pb15">
						  		<div class="pkList-img">
						  			<img src="img/pk3.jpg" class="wid100"/>
						  		</div>
						  		<div class="mg20"><span class="pkTitle">品牌官网</span></div>
						  		<p class="tc pkDet">企业的网络官方形象展示</p>
								<p class="tc pkDet">个性化定制视觉设计</p>
								<p class="tc pkPrice mt15">17元/月</p>
						  	</div>
					  	</a>
				 	 </div>
				  	<div class="col-md-3">
				  		<a href="#">
						  	<div class="pkList pb15">
						  		<div class="pkList-img">
						  			<img src="img/pk3.jpg" class="wid100"/>
						  		</div>
						  		<div class="mg20"><span class="pkTitle">品牌官网</span></div>
						  		<p class="tc pkDet">企业的网络官方形象展示</p>
								<p class="tc pkDet">个性化定制视觉设计</p>
								<p class="tc pkPrice mt15">17元/月</p>
						  	</div>
					  	</a>
				  	</div>
				 	 <div class="col-md-3">
				 	 	<a href="#">
						  	<div class="pkList pb15">
						  		<div class="pkList-img">
						  			<img src="img/pk3.jpg" class="wid100"/>
						  		</div>
						  		<div class="mg20"><span class="pkTitle">品牌官网</span></div>
						  		<p class="tc pkDet">企业的网络官方形象展示</p>
								<p class="tc pkDet">个性化定制视觉设计</p>
								<p class="tc pkPrice mt15">17元/月</p>
						  	</div>
					  	</a>
				  	</div>
				 	 <div class="col-md-3 pr0">
				 	 	<a href="#">
						  	<div class="pkList pb15">
						  		<div class="pkList-img">
						  			<img src="img/pk3.jpg" class="wid100"/>
						  		</div>
						  		<div class="mg20"><span class="pkTitle">品牌官网</span></div>
						  		<p class="tc pkDet">企业的网络官方形象展示</p>
								<p class="tc pkDet">个性化定制视觉设计</p>
								<p class="tc pkPrice mt15">17元/月</p>
						  	</div>
					  	</a>
				 	 </div>
				</div>
			</div>
		</div>
		<!--套餐部分 end-->
		
		<div class="Circular">
			
		</div>
		
	
	</div>
	<!--内容部分 end-->
	<!--footer start-->
	@@include('footer.tpl')
	<!--footer end-->
	




	<script src="ctrl/jquery-1.12.4.min.js" ></script>
	<script src="ctrl/bootstrap/js/bootstrap.min.js" ></script>
	<script src="js/common.js" ></script><!--全局基础效果-->
</body>
</html>