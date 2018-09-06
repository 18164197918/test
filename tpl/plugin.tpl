<!--悬浮客服1样式开始-->

<ul class="susp-1-box" >
	<li class="susp-1-list">
		<i class="iconfont default-f">&#xe621;</i> 
		<p class="default-f" style="color: rgb(255, 255, 255);">在线客服</p> 
		<div class="susp-box su-c">
			<div class="susp-1-arrow"></div> 
			<div class="susp-1-phonenum">
				 <p v-for="item in srv_QQList" class="qqnum"> <a   target="_blank" :href="['tencent://message/?uin='+item+'&Site=www.baijiekj.com&Menu=yes']">{{item}}</a></p>
			</div>
		</div>
	</li> 
	<li class="susp-1-list susp-1-list-phone">
		<div class="susp-1-fir-box">
			<i class="glyphicon glyphicon-earphone default-f"></i> 
			<p class="default-f" style="color: rgb(255, 255, 255);">电话咨询</p>
		</div> 
		<div class="susp-1-first su-c">
			<div class="susp-1-arrow"></div> 
			<div class="susp-1-phonenum">
				<p v-for="item in srv_phoneList" class="qqnum">{{item}}</p>
			</div>
		</div> 
		<div class="callback">
			<div class="callback-title">
				<p>您可以拨打咨询电话<i class="fa fa-remove susp-close"></i></p>
			</div> 
			<p class="callback-f">您也可以</p> 
			<input placeholder="输入您的电话号码" class="callback-in"> 
			<button class="callback-bu">免费回拨</button>
		</div>
	</li> 
	<li class="susp-1-list">
		<i class="iconfont default-f">&#xe659;</i> 
		<p class="default-f" style="color: rgb(255, 255, 255);">微信咨询</p> 
		<div class="susp-1-first su-c">
			<div class="susp-1-arrow susp-1-arrow-wec"></div> 
			<div class="susp-1-phonenum susp-1-phonenumW">
					<img :src="srv_qrCode" onerror="imgerror(this)"/>
			</div>
		</div>
	</li> 
	<li class="susp-1-list">
		<div class="susp-1-fir-box">
			<i class="iconfont default-f">&#xe61e;</i> 
			<p class="default-f" style="color: rgb(255, 255, 255);">意见反馈</p>
		</div> 
		<div class="callback susp-feedback">
			<form  id="messageForm">
				<div class="callback-title">
					<p>意见反馈<i class="iconfont susp-close">&#xe619;</i></p>
				</div> 
				<label>
					<span class="susp-item-title">反馈内容</span> 
					<textarea v-model="msgContent" name="msgContent"></textarea> 
					<p></p>
				</label> 
					<div class="err-msg" style="margin-left: 100px;"></div>
				<label>
					<span class="susp-item-title">联系电话</span> 
					<input placeholder="请填写您的手机号码" v-model="msgPhone" name="msgPhone"> 
					<span>(我们将对您的联系方式严格保密)</span>
				</label> 
					<div class="err-msg" style="margin-left: 100px;"></div>
				<button type="button" class="callback-bu callback-feed"  id="subtMes">提交</button>
		   	</from>
		</div>
	</li> 
	<li id="toTop_plg" class="susp-1-list">
		<i class="iconfont default-f">&#xe623;</i> 
		<p class="default-f" style="color: rgb(255, 255, 255);">返回顶部</p>
	</li>
</ul> 
<div class="susp-mask" style=""></div>
