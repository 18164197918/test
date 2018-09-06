<!--<div class="sb-up line">
	<div class="title">
		<h2 class="rel us">{{ pname }}</h2>
	</div>
	<div class="menu" v-if="secdList">
		<input type="hidden"  :data="id" id="secdNav"/>
		<ul>
			<li  v-for="secdtitle in secdList"><a @click.prevent="active" :id="secdtitle.id"  :class="secdtitle.active" class="dis-b tc"  href="javascript:void(0)">{{ secdtitle.name }}</a> 
		</ul>
	</div>
</div>
<a>
<div class="line mt10">
	<img src="img/news/adv.jpg" alt="模板" />
</div>
</a>-->
<div class="menu-child">
	<!--二级菜单导航  start-->
	<div class="menu-nav txt-ln1">
		{{ pname }}
	</div>
	<!--二级菜单导航  end-->
	<ul v-if="secdList" class="nav-column">
		<li v-for="(secdtitle,index) in secdList" class="one-lev" ><!--二级栏目-->
			<!--@click.prevent="active"-->
			<a  :id="secdtitle.id" :href="secdtitle.link +'?id=' + secdtitle.id " :class="secdtitle.id == getQueryString('id') ? 'hover': ''" target="_self">
				<i class="iconfont">&#xe9ce;</i>
				<span>{{ secdtitle.name }}</span>
			</a>
		</li>
	</ul>
</div>