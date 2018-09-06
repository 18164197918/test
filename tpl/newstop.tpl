<!--topTen 的热门新闻-->
<div class="newsTopTile" v-if="topList.length>0">
	<!--<span v-if="bk==10">热门新闻</span>
	<span v-if="bk==20">精品新闻</span>
	<span v-if="bk==30">推荐新闻</span>-->
	<span v-if="label=='NEWS_TOP_001'">热门新闻</span>
	<span v-if="label=='NEWS_TOP_002'">精品新闻</span>
	<span v-if="label=='NEWS_TOP_003'">推荐新闻</span>
</div>

<div class="newsTopWord" v-if="topList.length>0">
	<div class="clearfix"> 
		<div class="col-md-5 col-sm-5 col-xs-5">
			<a :href="[fontBaseUrl+'news/info.html'+'?pid='+mid+'&id='+topList[0]['id']+'&type='+topList[0].type]"></a><img :src="topList[0].img" class="wid100" onerror="imgerror(this)"/></a>
		</div>
		<div class="col-md-7 col-sm-7 col-xs-7 pl0">
			<p class="txt-ln3">
				<a :href="[fontBaseUrl+'news/info.html'+'?pid='+mid+'&id='+topList[0]['id']+'&type='+topList[0].type]">{{topList[0].title}}</a>
			</p>
		</div>
	</div>
</div>
<ul class="pl15 pr15 newsTopL1" v-if="topList.length>0">
	<li class="txt-ln1" v-for="(ctnt,index) in topList" v-if="index > 0">
		<a :href="[fontBaseUrl+'news/info.html'+'?pid='+mid+'&id='+ctnt['id']+'&type='+ctnt.type]">
			<span class="iconfont">&#xe764;</span>{{ ctnt.title }}
		</a>
	</li>
	<!--<li class="txt-ln1"><span class="iconfont">&#xe764;</span>新闻新闻新闻新闻新闻新闻新闻新闻新闻新闻新闻新闻新</li>-->
</ul>
