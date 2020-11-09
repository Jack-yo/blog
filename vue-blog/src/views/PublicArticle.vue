<template>
  <div id="publicArticle">
    <div id="backHome" @click="backHome"><i class="el-icon-back"></i></div>
    <div id="displayBackground">
      <div id="article"></div>
    </div>
    <div id="displayComment" @mouseover="commentScrollState('pause')" @mouseout="commentScrollState('start')">
      <div class="comment" v-for="(item,index) in comments" >
        <span style="position: relative;left:1vw;top:1vw;color: rgba(256,256,256,0.8)"><i class="el-icon-s-custom"></i>{{item.name}}</span>
        <el-button class="feedback" @click="writeComment(item.id)">回复</el-button>
        <div class="content"></div>
        <span @click="expandComment(index,item.id)" class="expandComment"><<< 展开此评论</span>
      </div>
      <el-button type="primary" id="writeComment" @click="writeComment(0)" round>写评论</el-button>
    </div>
    <div v-if="showComment.status" id="oneComment">
      <div class="mainCommentDisplay">
        <div style="position: relative;left:1vw;top:1vw;color: rgba(256,256,256,0.8);font-size: large;"><i class="el-icon-s-custom"></i>  {{comments[showComment.index].name}}</div>
        <div style="position: relative;left:1vw;top:1.25vw;color: rgba(256,256,256,0.4);font-size:small;">发布于：{{rTime(comments[showComment.index].updatedAt)}}</div>
        <div class="mainComment"></div>
      </div>

      <div class="followCommentDisplay" v-for="item in mapFollowComment[showComment.itemID + '']">
        <div class="branch">L</div>
        <div class="followCombine">
          <div style="position: relative;left:1vw;top:1vw;color: rgba(256,256,256,0.8);"><i class="el-icon-s-custom"></i>  {{item.name}}</div>
          <div style="position: relative;left:1vw;top:1.25vw;color: rgba(256,256,256,0.4);font-size:xx-small;">发布于：{{rTime(item.updatedAt)}}</div>
          <div class="followComment"></div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import CommentEditor from './CommentEditor'

  export default {
    name: 'PublicArticle',
    data(){
      return{
        comments:[],
        pageID:0,
        showComment:{
          index:0,
          status:false,
          itemID:0
        },
        mapFollowComment:{}
      };
    },
    created(){
      let page;
      if(this.$route.query.page)
        page = this.$store.state.page = this.$route.params.page;
      else
        page = this.$store.state.page;

      if(this.$route.query.pageID)
          this.pageID = this.$store.state.pageID = this.$route.params.pageID;
      else
          this.pageID = this.$store.state.pageID;

      this.getComment();

      if(page){
        setTimeout(()=>{
          let article = document.getElementById('article');
          article.innerHTML = this.HTMLDecode(page);
          },10);
      }
    },
    methods:{
      //转换时间戳为xxxx-xx-xx xx:xx:xx格式
      rTime(date) {
        let json_date = new Date(date).toJSON();
        return new Date(new Date(json_date) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
      },
      //转换由xss防御过滤后的html改变的符号
      HTMLDecode(text) {
        let temp = document.createElement("div");
        temp.innerHTML = text;
        let output = temp.innerText || temp.textContent;
        temp = null;
        return output;
      },
      backHome(){
        this.$router.push({
          name:'Home',
          path:'/home'
        })
      },
      getComment(){
        this.$axios.post('/getComment',{
          name:'root',
          token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoicm9vdCIsImlhdCI6MTU5MDMzMjQ0MX0.W5rSk8OqmU-guUw4nV6Zgnwl2m7NW0pFJpj2jSqhaNo',
          pageId:this.pageID
        }).then( res => {
          if(res.data.code === 200){
            let results = res.data.result;
            for(let result of results){
              if(result.followId == 0){
                this.mapFollowComment[result.id + ''] = [];
                this.comments.push(result);
              }else{
                this.mapFollowComment[result.followId + ''].push(result);
              }
            }
            console.log(this.mapFollowComment);

            setTimeout(()=>{
              let commentNode = document.getElementsByClassName('comment');
              for (let i = 0;i < commentNode.length;i++){
                let content = commentNode[i].getElementsByClassName('content')[0];
                content.innerHTML = this.HTMLDecode(this.comments[i].comment);
              }},10);
            this.commentScroll();
          }else{
            this.$message.error('获取评论错误，请重试');
          }
        });
      },
      commentScroll(){
          const height = this.comments.length * 185;
          const display = 500;
          const runkeyframes =` @keyframes rowup {
        0% {
          -webkit-transform: translate3d(0, ${display}px, 0);
          transform: translate3d(0, ${display}px, 0);
        }
        100% {
          -webkit-transform: translate3d(0, -${height}px, 0);
          transform: translate3d(0, -${height}px, 0);
        }
      }`
        // 创建style标签
        const style = document.createElement('style');
        // 设置style属性
        style.type = 'text/css';
        // 将 keyframes样式写入style内
        style.innerHTML = runkeyframes;
        // 将style样式存放到head标签
        document.getElementsByTagName('head')[0].appendChild(style);
      },

      writeComment(followId){
        let commentEditor = this.$router.resolve({ path:'/commentEditor',query:{ pageID:this.pageID, followID:followId}});
        window.open (commentEditor.href,'newwindow','height=300,width=800,top=0,left=0,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no')
      },

      commentScrollState(state){
        let comments = document.getElementsByClassName('comment');

        if(state === 'pause' || this.showComment.status){
            for (let comment of comments){
            comment.style.webkitAnimationPlayState = 'paused';
            comment.style.animationPlayState = 'paused';
          }
        }else {
              for (let comment of comments){
                comment.style.animationPlayState = 'running';
                comment.style.webkitAnimationPlayState = 'running';
              }
        }
      },

      expandComment(index,itemID){
        let comments = document.getElementsByClassName('comment');
        let expand = comments[index].getElementsByClassName('expandComment')[0];

        if(!this.showComment.status){
          this.showComment.itemID = itemID;
          this.showComment.index = index;
          this.showComment.status = true;
          expand.style.color = '#f6ff25';
          expand.innerHTML = '>>> 收回此评论';

          setTimeout(this.displayOneComment,10);
          }
        else if(index == this.showComment.index){
          this.showComment.status = false;
          expand.innerHTML = '<<< 展开此评论';
          expand.style.color = '#c0eaff';
        }
        else{
          let lastIndex = this.showComment.index;
          let lastNode = comments[lastIndex].getElementsByClassName('expandComment')[0];
          lastNode.style.color = '#c0eaff';
          lastNode.innerHTML = '<<< 展开此评论';
          this.showComment.index = index;
          this.showComment.itemID = itemID;
          setTimeout(this.displayOneComment,10);
          expand.innerHTML = '>>> 收回此评论';
          expand.style.color = '#f6ff25';
        }
      },

      displayOneComment(){
          let oneComment = document.getElementById('oneComment');

          let mainComment = oneComment.getElementsByClassName('mainComment')[0];
          mainComment.innerHTML = this.HTMLDecode(this.comments[this.showComment.index].comment);

          let followComments = oneComment.getElementsByClassName('followComment');

          for(let i = 0;i < followComments.length;i++){
            followComments[i].innerHTML = this.HTMLDecode(this.mapFollowComment[this.showComment.itemID + ''][i].comment);
          }
      },

      test(){
        console.log('testok');
      }
    },
    components:{
      CommentEditor
    }
  }
</script>

<style scoped>
    #backHome{
      margin: 1vw 0 0 1vw;
      font-size: xx-large;
      color: white;
    }
    #publicArticle{
      position: relative;
      height: 100%;
      overflow-y: scroll;
      width:100%;
    }
    #displayBackground{
      display:inline-block;
      position: absolute;
      border-radius: 1%;
      left: 5%;
      width:60%;
      border: 1px solid white;
      padding: 3% 5%;
      background-color: rgba(255,255,255,0.7);
      margin: 3% auto;
      -webkit-animation: 5s expandArticle;
      animation: 5s expandArticle;
    }
    #displayComment{
      transition: all 1s;
      display: inline-block;
      position: fixed;
      top:30%;
      width:18%;
      height: 60%;
      overflow-y: hidden;
      right:5%;
    }
    #article{
      position: relative;
      height: 100%;
      font-size: large;
      width: 100%;
      color: #fff;
    }
    #writeComment{
      position: fixed;
      bottom: 2%;
      right:11%;
    }
   .comment{
     position: relative;
     box-sizing: border-box;
     -webkit-animation: 20s rowup linear infinite normal;
     animation: 20s rowup linear infinite normal;
     border-radius: 5px;
     animation-play-state: running;
     -webkit-animation-play-state: running;
     color: #caff32;
     border: 1px solid white;
     margin-bottom:1vw ;
     background-color: rgba(255,255,255,0.3);
   }

   .comment .feedback{
     position: absolute;
     right:1vw;
     top:10px;
     opacity: 0.5;
     height: 1.5vw;
     width: 3vw;
     padding: 5px;
   }

    .comment .content{
      position: relative;
      margin: 2vw 1vw;
      overflow: hidden;
    }

    .comment .expandComment{
      position: relative;
      left: 30%;
      bottom: 1vw;
      color: white;
    }

    .comment .expandComment:hover {
      color: #1e88e5;
    }

    #oneComment{
      position:fixed;
      height:50%;
      overflow-y:scroll;
      width:30%;
      background-color:black;
      right:25%;
      top:30%;
      z-index:10001;
      overflow-x: hidden;
      border:1px solid white;
      animation: 2s zoomOneComment;
      -webkit-animation: 2s zoomOneComment;
    }

    .mainComment{
      position: relative;
      box-sizing: border-box;
      padding: 0.5vw;
      color: white;
      margin:2vw;
    }

    .branch{
      display: inline-block;
      font-size: xx-large;
      padding-left: 1vw;
      color: green;
    }

    .followCommentDisplay{
      margin-bottom: 5%;
    }

    .followCombine{
      display: inline-block;
      border: 3px solid white;
      border-radius: 20px;
      margin-left: 1vw;
      width:80%;
    }

    .followComment{
      padding-top: 2px;
      color:white;
      margin:1vw;
    }

  /*animation*/
  @keyframes zoomOneComment {
    from{height:0;width: 0}
    to{height:50%;width:30%}
  }

  @keyframes expandArticle {
    from{width:0}
  }

</style>

<style scoped>
  b{
    color: #b3ff35;
  }
</style>
