<!--toolbar start-->
<div class="topbar navbar toolbar-add">
	<div class="container">
		<div class="Topbar row">
			<div class="navbar-collapse toolbar-index">
				<ul class="nav navbar-nav">
	       			<li><a class="hover-no sik-age" href="sitemap.html">网站地图</a></li>
			        <li><span class="hover-no">400-027-8800</span></li>
	        	</ul>
	        	<ul id="userBox" class="nav navbar-nav navbar-right">
	       			<li @click="chooseNav(null,1)">
	       				<a class="hover-no" href="index.html" target="_self">首页</a>
	       				 
	       			</li>
			        <li @click="chooseNav(5,1)"><a class="hover-no" href="page/list.html?id=b83630aa31b64d479ef12eafdcc670b7" target="_self">关于我们</a></li>
			        <!--<li><a class="hover-no" href="javascript:;">APP</a></li>-->
			        <!--<li><a class="hover-no" href="#">中文版</a></li>-->
	

			        <li  v-if="login" @click.prevent="entryManage" class="txt-ln1 userName" :title="username"><a>{{username}}</a></li>
			        <li  v-if="login" @click="loginout">
			        	<!--<a class="glyphicon glyphicon-off glyphicon-off-zl exit"></a>-->
			        	<a class="glyphicon-off-zl exit">退出</a>
			        </li>

			        <li  v-if="logout"  @click="signin"><a class="a-sign a-login" href="user/sign.html"  target="_self">登录</a></li>
			        <li  v-if="logout"  @click="signup"><a class="a-sign a-register" href="user/sign.html"  target="_self">注册</a></li>
			        <!--用户中心(列表)菜单  start-->
			        <!--<div class="user-menu move-show">
			        	<button type="button" class="navbar-toggle offcanvas-toggle" data-toggle="offcanvas" data-target="#js-bootstrap-offcanvas-2" aria-expanded="false">
					        <span class="sr-only"></span>
					        <span class="icon-bar"></span>
					        <span class="icon-bar"></span>
					        <span class="icon-bar"></span>
				      	</button>
			        </div>-->
			        <!--用户中心(列表)菜单  end-->
	        	</ul>
			</div>
		</div>
	</div>
</div>
<!--toolbar end-->


<div class="x-header-v2">
    <div class="container">
        <div class="row">

<!--导航 start-->
    <nav class="menubar navbar navbar-default  nav-right-scroll" role="navigation">
        <div class="container-fluid">
            <div class="navbar-header ">
                <button type="button" class="navbar-toggle offcanvas-toggle js-offcanvas-has-events" data-toggle="offcanvas" data-target="#bootstrap_offcanvas" aria-expanded="false">
                    <span class="sr-only">切换导航</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                
                <!--navbar-brand navbar-brand-add logo-move img-2-->
                <a class="navbar-brand " href="#">
                    <i class="img-1 logo-move">
                        <img  alt="网站logo"  id="logo" onerror="imgerror(this)"/>
                    </i>
                </a>
            </div>
            <div class="body-offcanvas ">
                <nav class=" navShadow navbar navbar-default navbar-offcanvas navbar-offcanvas-right navbar-offcanvas-fade offcanvas-transform js-offcanas-done" role="navigation" id="bootstrap_offcanvas">
                    <div class="navMask  ">
                        <ul class="nav  navbar-nav nav-phone">
					 	 <!--一级栏目-->
					        <!--<li class="active" ><a href="#">首页<span class="sr-only">(current)</span></a></li>-->
					        <li  v-for="(obj,index) in listTitle" v-if="index < 6" :class="[obj.childmenu ? 'dropdown':'' ]"  :value="index" >
					        	<!--@click="chooseNav(index,1)" -->
						         <a v-if="obj.childmenu"  :class="obj.parentmenu.id == getQueryString('pid') ? 'a-hover': ''" target="_self"  data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{{ obj.parentmenu.name }} <span class="caret iconfont">&#xe679;</span></a>
						         <!-- :class="[index==5 ? 'us':'' ]"-->
						         <a v-else :href="[obj.parentmenu.link+'?id='+obj.parentmenu.id]"  :class="obj.parentmenu.id == getQueryString('id') ? 'a-hover': ''" target="_self">{{ obj.parentmenu.name }}</a>
						         <ul v-if="obj.childmenu" class="seLevel-Box animate slideInDown">
						         	<!--二级栏目-->
						            <li v-for="(sedObj, index) in obj.childmenu" :value="index" >
						            	<!--@click="chooseNav(index,2)"-->
						            	<a :href="[sedObj.parentmenu.link+'?pid='+obj.parentmenu.id +'&id='+sedObj.parentmenu.id]" target="_self" :class="sedObj.parentmenu.id == getQueryString('id') ? 'a-hover': ''">{{ sedObj.parentmenu.name }}</a>
							        	<div id="one"></div>  
						            	<ul v-if="sedObj.childmenu" class="dropdown-menu">
								         	<!--三级栏目-->
								            <li v-for="(thirdObj, index) in sedObj.childmenu" class="txt-ln1" >
								            	<a :href="[thirdObj.parentmenu.link+'?id='+thirdObj.parentmenu.id]" target="_self" :class="thirdObj.parentmenu.id == getQueryString('id') ? 'a-hover': ''">{{ thirdObj.parentmenu.name }}</a>
								            </li>
							            </ul>
						            </li>
						         </ul>
					        </li>
					        <li class="phoneB">
					        	<a v-if="login" @click="loginout">退出登录</a>
					        </li>
					    </ul>
					    
					    
                    </div>
                </nav>
            </div>
        </div>
    </nav>
    
    
    </div>
    </div>
    </div>
 
 <!--遮罩-->
<div class="nav-mask"></div>
<!--遮罩-->
<!--导航 end-->