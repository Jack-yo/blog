<template>
  <div class="home">
    <div id="leftSide">
      <div class="profilePhoto">
        <img src="../assets/images/profile.png">
      </div>
      <div class="bottomLink">
        <img src="../assets/images/CSDN.png" title="CSDN"  class="link">
        <img src="../assets/images/github.png" title="github" class="link">
        <img src="../assets/images/juejin.png" title="掘金" class="link">
        <img src="../assets/images/sf.png" title="segmentfault" class="link">
      </div>
    </div>
    <div id="nav">
      <router-link to="/editor">写文章</router-link> |
      <router-link @click="doExit" to="/">注销</router-link>
    </div>
    <div id="rightSide">
      <div id="test" class="choosing">
        <div v-for="(item,index) in articles" class="article" @click="chooseArticle(index)">
          <div class="title">
            <div style="color: #ed3859;">{{item.title}}</div>
          </div>
          <div class="info">
            <span>
              <i class="el-icon-s-custom"></i>
              &nbsp;&nbsp;
              <span>{{item.name}}</span>
            </span>

            <span style="margin-left: 1vw;">
              <i class="el-icon-paperclip" ></i>
              &nbsp;&nbsp;
              <span v-for="tag in item.tags" class="tag" >{{tag}}  </span>
            </span>
          </div>
          <div style="margin-top: 5vw;text-indent:2em;">
            <p class="intro"></p>
          </div>
          <span class="edit-time">最近修改时间：{{rTime(item.updatedAt)}}</span>
        </div>
      </div>
    </div>

    <!--<div id="tags" >-->
      <!--<div class="tagLink" v-for="item in testTags">{{item}}</div>-->
    <!--</div>-->

  </div>
</template>

<script>
export default {
  name: 'Home',
  created:function () {
    this.$axios.post('/getArticles',{
      name:'root',
      token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoicm9vdCIsImlhdCI6MTU5MDMzMjQ0MX0.W5rSk8OqmU-guUw4nV6Zgnwl2m7NW0pFJpj2jSqhaNo',
    }).then( res => {
      if(res.data.code === 200){
       this.articles = res.data.result;
        this.$nextTick(()=>{
          for(let i = 0;i < this.articles.length;i++){
            document.getElementById('test').getElementsByClassName('intro')[i].innerHTML = this.HTMLDecode(this.articles[i].description);
          }
        })

        for(let i = 0;i < this.articles.length;i++){
          this.articles[i].tags = this.articles[i].tags.split(',');
          if(this.articles[i].tags[0] == '')this.articles[i].tags[0] = '无标签';
        }

        //
      //   let  tagLinks = document.getElementById("tags").getElementsByClassName('tagLink');
      //
      //   let len = this.testTags.length
      //   for(let i = 0;i < len;i++){
      //     let topDis,rightDis;
      //     if(i > len - 2){
      //       topDis = 45;
      //       rightDis = 45;
      //     }else{
      //       topDis = (Math.random() + 0.05) * 80;
      //       rightDis = Math.random() * 80;
      //     }
      //     Object.assign(tagLinks[i].style,{
      //       position:'absolute',
      //       margin:'1vw',
      //       float:'left',
      //       right:`${rightDis}%`,
      //       fontSize:`${i * 8}px`,
      //       top:`${topDis}%`,
      //       width:'auto'
      //     });
      //   }
      //
      }else {
        this.$message.error('请求已发布文章失败，请重试');
      }
    });

  },

  data:() => {
     return {
       testTags:['aaa','bbb','ccc','ddd','eee','fff','ggg'],
       articles:[],//接收服务器传来文章的数据
     }
  },
  methods:{
    //退出登录删除Token
    doExit () {
      localStorage.removeItem('blogToken');
    },
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
    chooseArticle(index){
      this.$store.state.page = this.articles[index].page;
      this.$store.state.pageID = index;

      this.$router.push({
        name:'PublicArticle',
        params:{
          pageID:index,
          page:this.articles[index].page,
        }
      })
    }
  },
}
</script>

<style>
  /*body {*/
    /*perspective: 1000px;*/
  /*}*/
  .home {
    width: 100%;
    height:100%;
  }
  #nav{
    position: fixed;
    text-align:right;
    padding: 2% 10%;
    width: -webkit-fill-available;
    z-index: 100;
  }
  #nav a{
    color: #42b983
  }
  #display{
    position: absolute;
    right: 0%;
    width: 60%;
    transform-origin:right;
    transform:rotateY(-10deg);
    height:80%;
    border: 2px solid white;
    display:none;
    top:5vw;
    opacity: 0;
    transition: all 1s;
    overflow-x: auto;
    color: white;
    overflow-y: auto;
    padding: 2%;
  }
  #leftSide .profilePhoto{
    position: relative;
    margin:auto;
    height: 10rem;
    border-radius:50%;
    width: 10rem;
    top:10%;
    overflow:hidden;
  }
  #leftSide .bottomLink{
    position:absolute;
    margin-left:3vw;
    bottom: 1vw;
  }
  #leftSide .bottomLink .link{
    height:20px;
    width:20px;
    margin-right:1vw;
  }
  #rightSide{
    overflow-y: scroll;
    position: absolute;
    width: 85%;
    background-color: #f4e6ff;
    height: -webkit-fill-available;
    right:0;
  }
  #test ul {
    list-style: none;
    padding: 5px;
    font-size:25px ;
  }
  #test *{
    transition: all 1s;
  }
  .article {
    position: relative;
    margin-top: 2%;
    border: 3px solid #8910ff;
    padding:3% 2% ;
    box-shadow: -2px 2px 0 0 rgba(29, 52, 234, 0.3);
    color: black;
    box-sizing: border-box;
    border-radius: 1vw;
    width: 50%;
    left:10%;
    height:auto;
    -webkit-animation:articleMove 1.5s;
  }
  .article:hover{
    box-shadow: -10px 10px 20px 0 rgba(48, 20, 255, 0.3);
  }
  .article .edit-time{
    position:absolute;
    right:1vw;
    bottom: 1vw;
    font-family: 华文宋体;
    opacity: 0.5;
    font-size: small;
  }
  .article .title{
    position: absolute;
    left: 2vw;
    top:2vw;
    font-size: 1.5vw;
  }
  .article .info{
    position: absolute;
    top:5vw;
    color: rgba(51,51,51,0.7);
    left:2vw;
  }
  .article .info .tag{
    margin-right:1vw;
    border: 1px solid #000;
    padding: 2px;
    font-size: small;
    border-radius: 15%;
  }
  .article .intro{
    margin-top:2vw;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    overflow: hidden;
  }
  #test ul.block li.article {
    display: block;
    height: 100px;
    padding: 3px 5px;
    width: 90%;
    margin: 20px 10px;
  }
  #test ul.block li.article div{
    background-color: gray;
    height: 100%;
    width: 100%;
    border: 1px solid black;
    font-size: 20px;
  }
  #test ul.block li.article div:hover
  {
    box-shadow: -4px 4px 4px 0 rgba(256,256,256,0.3);
  }
  #test.choosing{
    display:block;
    margin-top:5%;
    transition: all 1s;
    position: relative;
  }
  #tags{
    display: inline-block;
    border: 1px solid black;
    position: fixed;
    top:20%;
    right: 5%;
    width: 25%;
    height: 60%;
    border-radius: 5%;
  }
  #leftSide{
    display: inline-block;
    height:100%;
    position:fixed;
    width:15%;
  }

  /*animation area*/

  @-webkit-keyframes articleMove{
    from{left:-10%;}
    to{left:10%;}
  }

</style>
