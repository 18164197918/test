<div class="row">
	<div class="menu-child">
		<!--二级菜单导航  start-->
		<!--<div class="menu-nav clearfix pcT">-->
				<!--头像   start-->
				<!--<div class="portrait"><img src="img/header.png" alt="" /></div>-->
				<!--头像   end-->
				<!--<span>用户中心</span>-->
		<!--</div>-->
		
		<div class="menu-nav clearfix pcT">
				<!--头像   start-->
				<p class="tc fz16 mg5 txt-ln1">用户中心</p>
				<div class="portrait"><img  :src="userImg" alt="" onerror="imgerror(this)"/></div>
				<!--头像   end-->
				<div class="infoD fl">
					<p class="fz14 txt-ln1" :title='username'>用户账号：<span>{{username}}</span></p>
					<p class="fz14 txt-ln1" :title='money'>余额：<span>{{money}}</span>元</p>
				</div>
				<div class="fr mt15 phoL">
					<span class="iconfont fz20">&#xe660;</span>
				</div>
		</div>
		<!--<div class="phT" style="padding-top: 56px;">
			<div class="person_img">
				<img src="../" />
			</div>
		</div>-->
		<!--二级菜单导航  end-->
		<ul>
			<li class="one-lev" v-if="power.indexOf('010000')!=-1"><!--网站设置-->
				<a data="网站设置" class="pcMe">
					<i class="iconfont">&#xe64e;</i>
					<span>网站设置</span>
					<i class="iconfont pull-right iconPc">&#xe679;</i>
				</a>
				<ul>
					<li class="leftbtn" v-if="power.indexOf('010100')!=-1"><!--基本信息-->
						<a data="基本信息" onclick="jumpMethod('user/webSet/webBasinfo.html')">
							<i class="iconfont">&#xe60a;</i>
							<span class="iconfont iconWap">&#xe79f;</span>
							基本信息
							<span class="iconfont pull-right iconWap">&#xe61a;</span>
						</a>
					</li>
					<li class="leftbtn" v-if="power.indexOf('010200')!=-1"><!--用户管理-->
						<a data="用户管理" onclick="jumpMethod('user/webSet/mgrUser.html')">
							<i class="iconfont">&#xe60a;</i>
							<span class="iconfont iconWap">&#xe79f;</span>
							用户管理
							<span class="iconfont pull-right iconWap">&#xe61a;</span>
						</a>
					</li>
				</ul>
			</li>
			<li class="one-lev oneI leftbtn" v-if="power.indexOf('020000')!=-1" class="noneSencond"><!--栏目管理-->
				<a data="栏目管理"  onclick="jumpMethod('user/mgecolumn.html')">
					<i class="iconfont">&#xe653;</i>
					<span class="iconfont iconWap">&#xe79f;</span>
					<span>栏目管理</span>
					<span class="iconfont pull-right iconWap">&#xe61a;</span>
				</a>
			</li>
			<li  class="one-lev" v-if="power.indexOf('030000')!=-1"><!--内容管理-->
				<a data="内容管理" class="pcMe">
					<i class="iconfont">&#xe818;</i>
					<span>内容管理</span>
					<i class="iconfont pull-right iconPc">&#xe679;</i>
				</a>
				<ul>
					<li class="leftbtn"  v-if="power.indexOf('030100')!=-1"><!--内容列表-->
						<a href='javascript:void(0)' data="内容列表" onclick="jumpMethod('user/contMge/mgrCon.html')">
							<i class="iconfont">&#xe60a;</i>
							<span class="iconfont iconWap">&#xe79f;</span>
							内容管理
							<span class="iconfont pull-right iconWap">&#xe61a;</span>
						</a>
					</li>
					<li class="leftbtn" v-if="power.indexOf('030200')!=-1"><!--内容回收站-->
						<a data="内容回收站" onclick="jumpMethod('user/contMge/rclCon.html')">
							<i class="iconfont">&#xe60a;</i>
							<span class="iconfont iconWap">&#xe79f;</span>
							内容回收站
							<span class="iconfont pull-right iconWap">&#xe61a;</span>
						</a>
					</li>
					<li class="leftbtn" v-if="power.indexOf('030300')!=-1"><!--排行管理-->
						<a data="排行管理" onclick="jumpMethod('user/contMge/mgrRecom.html')">
							<i class="iconfont">&#xe60a;</i>
							<span class="iconfont iconWap">&#xe79f;</span>
							排行管理
							<span class="iconfont pull-right iconWap">&#xe61a;</span>
						</a>
					</li>
					<li class="leftbtn" v-if="power.indexOf('030400')!=-1"><!--banner管理-->
						<a data="Banner管理" onclick="jumpMethod('user/contMge/mgrBanner.html')">
							<i class="iconfont">&#xe60a;</i>
							<span class="iconfont iconWap">&#xe79f;</span>
							Banner管理
							<span class="iconfont pull-right iconWap">&#xe61a;</span>
						</a>
					</li>
				</ul>
			</li>
			<li  class="one-lev" v-if="power.indexOf('040000')!=-1"><!--业务管理-->
				<a data="业务管理" class="pcMe">
					<i class="iconfont">&#xe668;</i>
					<span>业务管理</span>
					<i class="iconfont pull-right iconPc">&#xe679;</i>
				</a>
				<ul>
					<li class="leftbtn" v-if="power.indexOf('040100')!=-1"><!--留言管理-->
						<a data="留言管理"  onclick="jumpMethod('user/servMge/mgrMessage.html')">
							<i class="iconfont">&#xe60a;</i>
							<span class="iconfont iconWap">&#xe79f;</span>
							留言管理
							<span class="iconfont pull-right iconWap">&#xe61a;</span>
						</a>
					</li>
					<li class="leftbtn" v-if="power.indexOf('040200')!=-1"><!--评论管理-->
						<a data="评论管理" onclick="jumpMethod('user/servMge/mgrComment.html')">
							<i class="iconfont">&#xe60a;</i>
							<span class="iconfont iconWap">&#xe79f;</span>
							评论管理
							<span class="iconfont pull-right iconWap">&#xe61a;</span>
						</a>
					</li>
					<li class="leftbtn" v-if="power.indexOf('040300')!=-1  && modelPower"><!--订单管理-->
						<a data="订单管理" onclick="jumpMethod('user/servMge/mgrOrder.html')">
							<i class="iconfont">&#xe60a;</i>
							<span class="iconfont iconWap">&#xe79f;</span>
							订单管理
							<span class="iconfont pull-right iconWap">&#xe61a;</span>
						</a>
					</li>
					<li class="leftbtn" v-if="power.indexOf('040400')!=-1 && modelPower"><!--会员管理-->
						<a data="会员管理" onclick="jumpMethod('user/servMge/mgeMeber.html')">
							<i class="iconfont">&#xe60a;</i>
							<span class="iconfont iconWap">&#xe79f;</span>
							会员管理
							<span class="iconfont pull-right iconWap">&#xe61a;</span>
						</a>
					</li>
				</ul>
			</li>
			<li  class="one-lev" v-if="power.indexOf('050000')!=-1"><!--插件管理-->
				<a data="插件管理" class="pcMe">
					<i class="iconfont">&#xe6aa;</i>
					<span>插件管理</span>
					<i class="iconfont pull-right iconPc">&#xe679;</i>
				</a>
				<ul>
					<li class="leftbtn" v-if="power.indexOf('050100')!=-1"><!--广告管理-->
						<a data="广告管理" onclick="jumpMethod('user/plugMge/mgeAdv.html')">
							<i class="iconfont">&#xe60a;</i>
							<span class="iconfont iconWap">&#xe79f;</span>
							广告管理
							<span class="iconfont pull-right iconWap">&#xe61a;</span>
						</a>
					</li>
					<li class="leftbtn" v-if="power.indexOf('050200')!=-1"><!--友情链接-->
						<a data="友情链接" onclick="jumpMethod('user/plugMge/mgeFsLink.html')">
							<i class="iconfont">&#xe60a;</i>
							<span class="iconfont iconWap">&#xe79f;</span>
							友情链接
							<span class="iconfont pull-right iconWap">&#xe61a;</span>
						</a>
					</li>
					<li class="leftbtn" v-if="power.indexOf('050300')!=-1"><!--图片水印-->
						<a data="图片水印" onclick="jumpMethod('user/plugMge/wtrMkPic.html')">
							<i class="iconfont">&#xe60a;</i>
							<span class="iconfont iconWap">&#xe79f;</span>
							图片水印
							<span class="iconfont pull-right iconWap">&#xe61a;</span>
						</a>
					</li>
					<li class="leftbtn" v-if="power.indexOf('050400')!=-1"><!--在线客服-->
						<a data="在线客服" onclick="jumpMethod('user/plugMge/plugServer.html')">
							<i class="iconfont">&#xe60a;</i>
							<span class="iconfont iconWap">&#xe79f;</span>
							在线客服
							<span class="iconfont pull-right iconWap">&#xe61a;</span>
						</a>
					</li>
				</ul>
			</li>
			<li  class="one-lev"  v-if="power.indexOf('060000')!=-1">
				<a data="云站业务" class="pcMe">
					<i class="iconfont">&#xe6aa;</i>
					<span>云站业务</span>
					<i class="iconfont pull-right iconPc">&#xe679;</i>
				</a>
				<ul>
					<li class="leftbtn" v-if="power.indexOf('060100')!=-1">
						<a data="待开通云站" onclick="jumpMethod('user/webBusiness/webPend.html')">
							<i class="iconfont">&#xe60a;</i>
							<span class="iconfont iconWap">&#xe79f;</span>
							待开通云站
							<span class="iconfont pull-right iconWap">&#xe61a;</span>
						</a>
					</li>
					<li class="leftbtn" v-if="power.indexOf('060200')!=-1">
						<a data="云站列表" onclick="jumpMethod('user/webBusiness/webList.html')">
							<i class="iconfont">&#xe60a;</i>
							<span class="iconfont iconWap">&#xe79f;</span>
							云站列表
							<span class="iconfont pull-right iconWap">&#xe61a;</span>
						</a>
					</li>
				</ul>
			</li>
			<li  class="one-lev" ><!--我的服务 v-if="power.indexOf('070000')!=-1"-->
				<a data="我的服务" class="pcMe">
					<i class="iconfont">&#xe64a;</i>
					<span>我的服务</span>
					<i class="iconfont pull-right iconPc">&#xe679;</i>
				</a>
				<ul>
					<li class="leftbtn" ><!--v-if="power.indexOf('070100')!=-1"-->
						<a data="个人信息" onclick="jumpMethod('user/myServ/servPersinfo.html')">
							<i class="iconfont">&#xe60a;</i>
							<span class="iconfont iconWap">&#xe79f;</span>
							个人信息
							<span class="iconfont pull-right iconWap">&#xe61a;</span>
						</a>
					</li>
					<li class="leftbtn"><!-- v-if="power.indexOf('070200')!=-1"-->
						<a data="交易记录" onclick="jumpMethod('user/myServ/traRecord.html')">
							<i class="iconfont">&#xe60a;</i>
							<span class="iconfont iconWap">&#xe79f;</span>
							交易记录
							<span class="iconfont pull-right iconWap">&#xe61a;</span>
						</a>
					</li>
					<li class="leftbtn"><!-- v-if="power.indexOf('070300')!=-1"-->
						<a data="账户充值" onclick="jumpMethod('user/myServ/servRecharge.html')">
							<i class="iconfont">&#xe60a;</i>
							<span class="iconfont iconWap">&#xe79f;</span>
							账户充值
							<span class="iconfont pull-right iconWap">&#xe61a;</span>
						</a>
					</li>
					<li class="leftbtn" ><!--v-if="power.indexOf('070400')!=-1"-->
						<a data="工单信息" onclick="jumpMethod('user/myServ/workInfo.html')">
							<i class="iconfont">&#xe60a;</i>
							<span class="iconfont iconWap">&#xe79f;</span>
							工单信息
							<span class="iconfont pull-right iconWap">&#xe61a;</span>
						</a>
					</li>
				</ul>
			</li>
			<li  class="one-lev" v-if="power.indexOf('080000')!=-1">
				<a data="我的客户" class="pcMe">
					<i class="iconfont">&#xe6aa;</i>
					<span>我的客户</span>
					<i class="iconfont pull-right iconPc">&#xe679;</i>
				</a>
				<ul>
					<li class="leftbtn" v-if="power.indexOf('080100')!=-1">
						<a data="客户管理" onclick="jumpMethod('user/mgecustom.html')">
							<i class="iconfont">&#xe60a;</i>
							<span class="iconfont iconWap">&#xe79f;</span>
							客户管理
							<span class="iconfont pull-right iconWap">&#xe61a;</span>
						</a>
					</li>
				</ul>
			</li>
		
			<li  v-if="preview" class="one-lev previewSites"  @click="jumpPreview()"><!--预览网站-->
				<a data="预览网站" target="_blank">
					<i class="iconfont icon-search">&#xe653;</i>
					<span class="iconfont iconWap">&#xe79f;</span>
					<span>预览网站</span>
					<span class="iconfont pull-right iconWap">&#xe61a;</span>
				</a>
			</li>
			
			<li class="one-lev " v-if="power.indexOf('020000')!=-1" ><!--栏目管理-->
				<a data="源码编辑"  onclick="jumpMethod('user/mgeCode.html')">
					<i class="iconfont">&#xe653;</i>
					<span class="iconfont iconWap">&#xe79f;</span>
					<span>源码编辑</span>
					<span class="iconfont pull-right iconWap">&#xe61a;</span>
				</a>
			</li>
			
			<li   class="one-lev clearStorge" @click="delStroge()"><!--清除缓存@click="delStroge()"-->
				<a data="清除缓存" target="_blank">
					<i class="iconfont icon-search">&#xe653;</i>
					<span class="iconfont iconWap">&#xe79f;</span>
					<span>清除缓存</span>
					<span class="iconfont pull-right iconWap">&#xe61a;</span>
				</a>
			</li>
		</ul>
	</div>
</div>
