
<!--<div class="commentAll">-->
<p class="commentTitle">我要评论</p>


<!--评论区域 begin-->
<div class="reviewArea clearfix">
    <textarea class="content comment-input form-control" placeholder="请输入您的评论建议"  v-model="Fcomment" ></textarea>
    <a  class="plBtn radius4" @click.prevent="rmkSub('first',$event)">评论</a>
</div>
<!--评论区域 end-->


<!--回复区域 begin-->
<div class="commarea comment-show mt20" v-if="listCommt">
    <div class="comment-show-con clearfix wid100"  v-for ="listComt in listCommt" >
    	<!--<input type="hide"  v-model="11"/>-->
        <div class="comment-show-con-img fl"><img :src="listComt.parent.head_img || 'http://182.61.39.194/upload/0e/43/0e43a5423bb44b55b6b95c6c3f9ab398.png'" alt="" ></div>
        <div class="comment-show-con-list fl clearfix">
            <div class="pl-text clearfix wid100">
                <a href="#" class="comment-size-name" :uid="listComt.parent.uid">{{listComt.parent.user_nick }}</a>
                <!--<span class="my-pl-con wid100">&nbsp;{{listComt.parent.comment}}</span>-->
            </div>
            <div class="pl-text clearfix wid100">
                <!--<a href="#" class="comment-size-name" :uid="listComt.parent.uid">{{ uname }}</a>-->
                <span class="my-pl-con wid100">&nbsp;{{listComt.parent.comment}}</span>
            </div>
            <div class="date-dz fl wid100" :id="listComt.parent.id">
                <span class="date-dz-left fl comment-time dis-b">{{ new Date(listComt.parent.insert_time).toLocaleString() }}</span>
                <div class="date-dz-right pull-right comment-pl-block dis-b">
                    <a class="removeBlock dis-b fl" @click.prevent="delReply">删除</a>
                    <a class="date-dz-pl pl-hf hf-con-block fl" @click.prevent="addTextArea">回复</a>
                    <!--<span class="fl date-dz-line">|</span>-->
                    <!--<a  class="date-dz-z fl"><i class="date-dz-z-click-red"></i>赞 (<i class="z-num">666</i>)</a>-->
                </div>
                
                <!--回复框-->
                <div class="rply hf-con fl hidden"> 
                	<textarea class="content comment-input hf-input" placeholder="" > </textarea><!--onkeyup="keyUP(this)"-->
                	<a  class="hf-pl radius4"  @click.prevent="rmkSub('second',$event)">评论</a>
                </div>
            </div>
            <!--回复评论-->
            <div class="hf-list-con fl wid100" v-if="listComt.child" >
            	<!--一条回复评论-->
            	<div class="all-pl-con"   v-for ="listComtChild in listComt.child">
            		<div class="pl-text hfpl-text clearfix wid100">
            			<!--<a href="#" class="comment-size-name">{{ uname }}: </a>
            			<span class="my-pl-con wid100">回复<a href="#" class="atName">@{{ uname }} </a> : {{ listComtChild.comment }}</span>-->
            			<a  class="comment-size-name">{{ listComtChild.user_nick }}: </a>
        				<span class="my-pl-con wid100">{{ listComtChild.comment }}</span>
            		</div>
        			<div class="date-dz" :id="listComtChild.id" :pid="listComt.parent.id"> 
        				<span class="date-dz-left fl comment-time dis-b">{{ new Date(listComtChild.insert_time).toLocaleString() }}</span>
        				<div class="date-dz-right pull-right comment-pl-block dis-b"> 
        					<a  class="removeBlock dis-b fl" @click.prevent="delReply">删除</a> 
        					<a  class="date-dz-pl pl-hf hf-con-block fl" @click.prevent="addTextArea">回复</a> 
        					<!--<span class="fl date-dz-line">|</span>--> 
        					<!--<a class="date-dz-z fl"><i class="date-dz-z-click-red"></i>赞 (<i class="z-num">666</i>)</a>--> 
        				</div> 
        				
        				<!--回复框-->
	                <div class="rply hf-con fl hidden"> 
	                	<textarea class="content comment-input hf-input" placeholder="" > </textarea>
	                	<a  class="hf-pl radius4"  @click.prevent="rmkSub('second',$event)">评论</a>
	                </div>
        			</div>
            	</div>
            	
            </div>
        </div>
    </div>
</div>
<!--回复区域 end-->

<!--翻页-->
<div style="float: left;margin-top: 11px;margin-left: 16px;" v-if='totalPages>1'>
    		    		本页当前 {{ currentLines }} 条
</div>
<div class="flip" style="margin-top:0px; margin-bottom: 20px;" v-if='totalPages>1'>
	
	<div class="filp-x">
			每页显示行
	    	<select class="" @change="selcValue" >
	    		<option v-for="lines in linesPerPage">
	    			{{ lines }}
	    		</option>
	    	</select>
	</div> 
	<div class="page-number">
		<ul>
			<li class="" @click="subPage('grad')"><i class="fa fa-step-backward"></i></li>
			<li class="" @click="subPage('son')"><i class="fa fa-caret-left"></i></li>
			<li class="li-3">
				<p>{{ params.currentpage }}/{{ totalPages }}</p>
				<input type="text" class="" :value="params.currentpage" @blur="changeCurrentPage"/>
				<p>go</p>
			</li>
			<li class="" @click="addPage('son')"><i class="fa fa-caret-right"></i></li>
			<li class="" @click="addPage('grad')"><i class="fa fa-step-forward"></i></li>
		</ul>
	</div>
</div>



<!--</div>-->
