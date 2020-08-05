<template>
  <div class="home">
    <div id="nav">
    <router-link to="/editor">写文章</router-link> |
    <router-link @click="doExit" to="/">注销</router-link>
    </div>
    <div id="test" class="choosing">
        <div v-for="(item,index) in articles" class="article" @click="chooseArticle(index)">
        <a :href="'/page?id='+item.id" class="title">{{item.title}}</a>
          <p class="intro"></p>
        <span class="edit-time">最近修改时间：{{rTime(item.updatedAt)}}</span>
        </div>
    </div>
    <div id="display"></div>
  </div>
</template>

<script>
  import Store from '../store/index.js'
export default {
  name: 'Home',
  created:function () {
    this.$axios.post('/getArticles',{
      name:'root',
      token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoicm9vdCIsImlhdCI6MTU5MDMzMjQ0MX0.W5rSk8OqmU-guUw4nV6Zgnwl2m7NW0pFJpj2jSqhaNo',
    }).then( res => {
      if(res.data.code === 200){
       this.articles = res.data.result;
       // console.log(res.data);
        this.$nextTick(()=>{
          for(let i = 0;i < this.articles.length;i++){
            document.getElementById('test').getElementsByClassName('intro')[i].innerHTML = this.HTMLDecode(this.articles[i].page);
          }
        })
      }else {
        this.$message.error('请求已发布文章失败，请重试');
      }
    });

  },

  data:() => {
     return {
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
    //为文章展示添加动画效果
    chooseArticle(id){
      let testDiv = document.getElementById('test');

      for(let i = 0;i < this.articles.length;i++){
        testDiv.getElementsByClassName('title')[i].style.fontSize = '1.2vw';
        testDiv.getElementsByClassName('title')[i].style.left = '1.5vw';
        testDiv.getElementsByClassName('title')[i].style.top = '1.5vw';
      }
      setTimeout(()=>{
        for(let j = 0;j < this.articles.length;j++){
          for(let i = 0.5;i >= 0;i-=0.1){
            testDiv.getElementsByClassName('edit-time')[j].style.opacity = i;
            testDiv.getElementsByClassName('intro')[j].style.opacity = i;
          }
        }},1000);

      setTimeout(()=>{
        testDiv.style.padding = '2%';
        testDiv.getElementsByClassName('intro')[0].parentNode.removeChild(testDiv.getElementsByClassName('intro')[0]);
        for(let i = 0;i < this.articles.length;i++){
          document.getElementsByClassName('article')[i].style.margin = '2% 25% 2% 10%';
          document.getElementsByClassName('article')[i].style.padding = '12% 2%';
        }
        testDiv.getElementsByClassName('edit-time')[0].parentNode.removeChild(testDiv.getElementsByClassName('edit-time')[0]);
        testDiv.style.margin = '10% 65% 2% 2%';
      },2000);

      setTimeout(()=> {
        testDiv.style.overflowY = 'scroll';
        testDiv.style.border= '2px solid white';
      },3000);

      setTimeout(()=>{
        testDiv.style.transform = 'translateX(10%) rotateY(10deg)';
        testDiv.style.boxShadow='-16px 16px 20px 4px rgba(256,256,256,0.2)';
      },4000);

      setTimeout(()=>{
        document.getElementById('display').style.display = 'block';
        for(let i = 0; i <= 1; i+=0.1){
          setTimeout(function () {
            document.getElementById('display').style.opacity = i + '';
          },i*100);
        }
        document.getElementById('display').innerHTML = this.HTMLDecode(this.articles[id].page);
      },5000);
    }
  },
}
</script>

<style>
  body {
    perspective: 1000px;
  }
  .home {
    width: 100%;
    height:100%;
    background: url("../assets/images/home.jpg") no-repeat;
    overflow-x: auto;
  }
  #nav{
    position: fixed;
    text-align:right;
    padding: 2% 10%;
    width: -webkit-fill-available;
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
  #test ul {
    /*text-align: center;*/
    list-style: none;
    padding: 5px;
    font-size:25px ;
  }
  #test *{
    transition: all 1s;
  }
  .article {
    position: relative;
    margin: 2% 30% 2% 10%;
    border: 1px solid black;
    padding:8% 2% ;
    box-shadow: -2px 2px 0 0 rgba(256,256,256,0.3);
    color: white;
  }
  .article:hover{
    box-shadow: -10px 10px 20px 0 rgba(256,256,256,0.3);
  }

  .article .edit-time{
    position:absolute;
    right:2vw;
    bottom: 2vw;
    font-family: 华文宋体;
    opacity: 0.5;
  }
  .article .title{
    position: absolute;
    left: 2vw;
    top:2vw;
    text-decoration: none;
    color: cornflowerblue;
    font-size: 2.5vw;
  }
  .article .intro{
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
    margin-top: 5%;
    transition: all 1s;
    position: relative;
  }

</style>
