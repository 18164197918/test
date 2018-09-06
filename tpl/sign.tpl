<div class="entry_box "  id="signin"  v-cloak >
		<div class="change_login">
 	 		<ul>
 	 			<li class="active wid50 .lh44 cur-p" @click='signin()'>
					<a  >登录</a>
 	 			</li>
	 	 		<li class="wid50 .lh44 cur-p" @click='signup()'>
	 	 			<a  >注册</a>
	 	 		</li>
 	 	   </ul>
 	 	</div>
 	 	<!--密码登录-->
 	 	<form  id="entryBoxForm">
 	 		<input type="text" style="display: none;"/>
 	 		<input type="password"  style="display: none;"/>
	 	 	<div class="regContent form-group">
	 	 		     <div class="regLine">
		 	 			<div class="item1">
		 	 				<input class="form-control" type="text"  id="username2" name="username2"  placeholder="手机/邮箱/用户名" v-model="username2"/>
		 	 			</div>
		 	 			<div class="err-msg">
		 	 			</div>
		 	 		</div>
		 	 		
		 	 		<div class="regLine">
		 	 			<div class="item1">
	 	 		          <input class="form-control"  type="text"   autocomplete="new-password"  id="password2" @focus="clearErr()"  name="password2" placeholder="密码" v-model="password2"/>
		 	 			</div>
		 	 			<div class="err-msg">
		 	 			</div>
		 	 		</div>
		 	 		<!--<div class="" v-bind:class="loginButtonStyle"  @click="entry() && login_vm.loginButtonStyle.clickDis()"  id="entry">{{loginButtonStyle.btn_text}}</div>-->
		 	 		 <button  type="button" class="btn btn-primary wid100" v-bind:class="loginButtonStyle"  @click="entry() && login_vm.loginButtonStyle.clickDis()"  id="entry">{{loginButtonStyle.btn_text}}</button>
		 	 		
		 	 		<div class="setPassword overflow">
		 	 			<div class="rememberPW wid50">
		 	 				<input type="checkbox"  name="rememberPW" id="rememberPW" checked="checked"/>
		 	 				<label for="rememberPW" style="font-weight: 100;">记住密码</label>
		 	 			</div>
		 	 			<div class="forgetPW wid50">
		 	 			<a href="user/fgtpw.html" id="forgetPW"  >忘记密码</a>  <!--@click.prevent="jump('forgetPW')"-->
		 	 			</div>
		 	 		</div>
	 	 	</div>
 	 	 	<div class="tablelogin1" style="cursor:pointer;position:absolute; right:7px;top:10px;z-index:10;width:0;height：0;border-bottom: 50px solid #fff;border-right: 50px solid transparent;"></div>
 	 		 <i class="iconfont" style="cursor:pointer;color:#9d9d9d;position:absolute; right: 7px;top:0px; font-size: 50px;width:50px;">&#xe65e;</i>
 	 	</form>
 	 	<!--短信验证码登录-->
 	 	<form action="" id="codeLoginForm" style="display: none;">
	 	 	<div class="regContent form-group">
	 	 		    <div class="regLine">
		 	 			<div class="item1">
		 	 				<input class="form-control " type="text" name="username3" id="username3" placeholder="手机号码/邮箱"  v-model='username3'/>
		 	 			</div>
		 	 			<div class="err-msg"></div>
		 	 		</div>
		 	 		<div class="regLine" id="validateCodeBox2">
		 	 			<div class="item1">
		 	 				<input type="text" class="form-control wid50" name="identifyingCode3" id="identifyingCode3" placeholder="验证码" v-model='identifyingCode3'/>
		 	 				<button type="button" class="item_code btn btn-default wid40"  @click="getCode" v-model="item_code">获取验证码</button>
		 	 			</div>
		 	 			<div class="err-msg"></div>
		 	 		</div>
	 	 		  <button  type="button" class="btn btn-primary wid100"  v-bind:class="loginButtonStyle"  @click="loginButtonStyle.clickDis && codeEntry()"  id="entry2">{{loginButtonStyle.btn_text}}</button>
	 	 	</div>
	 	 	 <div class="tablelogin2" style="cursor:pointer;position:absolute; right: 7px;top:10px;z-index:10;width:0;height：0;border-bottom: 50px solid #fff;border-right: 50px solid transparent;"></div>
 	 		 <i class="iconfont" style="cursor:pointer;color:#9d9d9d;position:absolute; right: 7px;top:0px; font-size: 50px;width:50px;">&#xe680;</i>
 	 	</form>
 	   	
</div>
			
	        <div class="login_box" id="signup" style="display: none;" v-cloak>
		 	 	<div class="change_login">
		 	 		<ul>
			 	 		<li class=" wid50 .lh44 cur-p" @click='clearRegisterInterval()'>
				 	 		<a  >登录</a>
				 	 		
			 	 		</li>
			 	 		<li class="active  wid50 .lh44 cur-p" @click='signup()'>
				 	 		<a  >注册</a>
				 	 	</li>
		 	 	   </ul>
		 	 	</div>
		 	 	<!--注册盒子-->
		 	 	<form action="" id="registerBoxForm">
		 	 		    <input type="text"   style="display: none;"/>
			 	 		<input type="password"  style="display: none;"/>
		 	 	<div class="regContent">
		 	 		    <div class="regLine">
			 	 			<div class="item1">
			 	 				<input type="text"  class="form-control"  name="username" id="username" placeholder="手机号码/邮箱"  v-model='username'/>
			 	 			</div>
			 	 			<div class="err-msg">
			 	 				
			 	 			</div>
			 	 		</div>
			 	 		<div class="regLine " id="validateCodeBox2">
			 	 			<div class="item1 overflow">
			 	 				<input type="text"  class="form-control wid50 fl"  name="identifyingCode" id="identifyingCode" placeholder="验证码" v-model='identifyingCode'/>
			 	 				<button type="button" class="item_code btn btn-default fr wid40"   @click="getCode">获取验证码</button>
			 	 			</div>
			 	 			<div class="err-msg"></div>
			 	 		</div>
			 	 		<div class="regLine">
			 	 			<div class="item1 overflow">
			 	 		        <input type="text" class="form-control wid50 fl" name="password" id="password"  autocomplete="new-password" placeholder="密码" @keyup='checkPassword'  v-model='password'/>
				 	 			<div class="passwordLevel fr wid40 ">
                                     	<ul class="leavePiece mb0">
                                     		<li class="fl"></li>
                                     		<li class="fl"></li>
                                     		<li class="fl"></li>
                                     	</ul>
                                     	<ul class="levelCode">
                                     		<li class="fl">危险</li>
                                     		<li class="fl">一般</li>
                                     		<li class="fl">安全</li>
                                     	</ul>
				 	 			</div>
			 	 			</div>
			 	 			<div class="err-msg"></div>
			 	 		</div>
			 	 		<div class="regLine">
			 	 			<div class="item1">
			 	 			<input type="text" class="form-control" name="invitationCode" id="invitationCode" placeholder="推荐码" v-model="invitationCode"/>
			 	 			</div>
			 	 			<div class="err-msg"></div>
			 	 		</div>
			 	 		<div class="agreement overflow">
			 	 			<div class="agreeip fl" >
			 	 			<input type="checkbox" name="agreement" id="agreement" value="" checked="checked"  @click="isAgreement"/>
			 	 			</div>
			 	 			<label class="agreementText fl" style="font-weight: 100;">
			 	 			阅读并接受<a class="a-agreen" href="user/agreement.html">《用户协议》</a> 
			 	 			</label>
			 	 			<div class="err-msg fr" id="agreeInfo" >
			 	 			</div>
			 	 		</div>
		 	 		  	<button type="button" class="btn btn-primary wid100"  @click="register" id="sign">免费注册</button>
		 	 		  	
		 	 		  	<!--验证码弹出框-->
		 	 		  	<div class="phonecode">
							 <div class="headerline">
							 	请先完成下方的验证
							 	<div class="closePopUpVc" @click="closePopupVc">
							 		<span id="closePopUpVc" class="iconfont">&#xe619;</span>
							 	</div>
							 </div>
							 <div class="validateContant overflow" >
							 	<div class="overflow ">
								 	<input type="text"  class="form-control  fl" name="imgCode" id="imgCode" value="" v-model='imgCode' @keyup="len4($event)" maxlength='4'/>
								 	<img  class=" fl" id="validateCodeImg" name="" onerror="imgerror(this)"/>				<!--:src="imgCode"-->
								 	<div class="refreshVC fr"  @click="changeCode">
								 	    <img src="img/user/refreshVC.png" />
								 	</div>
							 	</div>
							 	<div class="err-msg">
							 	</div>
							 	<button type="button" class="btn btn-primary wid100"  class="submitBtn_vc"  @click="submintCode">
							 		确定
							 	</button>
							
							 </div>
						</div>
		 	 	</div>
		 	 	</form>
		 	 	
		 	 	<!--注册成功页面-->
		 	 	<div class="register_success">
							 	 <div class="success_code">
							 	 	<img src="img/user/success.png" />
							 	 </div>
							 	 <div class="user_info">
							 	 	恭喜<span >{{user}}</span>注册成功
							 	 </div>
							 	 <div class="entry_a"  @click='clearRegisterInterval'>
							 	   <a >立即登录</a>
							 	 </div>
							 	 <div class="auto_entry">
							 	 	<span  id="auto_entry_time"></span>秒后自动跳转登录页面
							 	 </div>
				</div>
		 	 	
		 	   	<div class="phonecode_box"></div> 
			</div>
			
