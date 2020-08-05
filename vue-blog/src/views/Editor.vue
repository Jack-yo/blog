<template>
  <div id="divDemo">
    <div class="toolbar" id="toolbar">
      <div class="menu" style="z-index:10001;" @mouseover="changeDisplay('header','block')" @mouseout="changeDisplay('header','none')">
        <i class="icon-header"></i>
        <div class="droplist" id="header" style="margin-top:30px; width:100px; display:none;" @mouseout="changeDisplay('header','none')" @mousedown="changeDisplay('header','none')">
          <p class="dp-title">设置标题</p>
          <ul class="list" id="header_list">
            <li class="item">
              <h1>H1</h1>
            </li>
            <li class="item">
              <h2>H2</h2>
            </li>
            <li class="item">
              <h3>H3</h3>
            </li>
            <li class="item">
              <h4>H4</h4></li>
            <li class="item">
              <h5>H5</h5>
            </li>
          </ul>
        </div>
      </div>

      <div class="menu" style="z-index:10001;" @mousedown=" execCommand('bold',false,null);">
        <i class="icon-bold"></i>
      </div>

      <div class="menu" style="z-index:10001;" @mouseover="changeDisplay('font-size','block')" @mouseout="changeDisplay('font-size','none')">
        <i class="icon-text-heigh"></i>
        <div class="droplist" id="font-size" style="margin-top:30px; width:160px; display:none;" @mouseout="changeDisplay('font-size','none')" @mousedown="changeDisplay('font-size','none')">
          <p class="dp-title">字号</p>
          <ul class="list" id="font-size-list">
            <li class="item">
              <span style="font-size: x-small;">x-small</span>
            </li>
            <li class="item">
              <span style="font-size: small;">small</span>
            </li>
            <li class="item">
              <span>normal</span>
            </li>
            <li class="item">
              <span style="font-size: large;">large</span>
            </li>
            <li class="item">
              <span style="font-size: x-large;">x-large</span>
            </li>
            <li class="item">
              <span style="font-size: xx-large;">xx-large</span>
            </li>
          </ul>
        </div>
      </div>

      <div class="menu" style="z-index:10001;" @mouseover="changeDisplay('font','block')" @mouseout="changeDisplay('font','none')">
        <i class="icon-font"></i>
        <div class="droplist" id="font" style="margin-top:30px; width:100px; display:none;" @mouseout="changeDisplay('font','none')" @mousedown="changeDisplay('font','none')">
          <p class="dp-title">字体</p>
          <ul class="list" id="font-list">
            <li class="item">
              <span style="font-family: 宋体;">宋体</span>
            </li>
            <li class="item">
              <span style="font-family: 楷体;">楷体</span>
            </li>
            <li class="item">
              <span style="font-family: 黑体;">黑体</span>
            </li>
            <li class="item">
              <span style="font-family: 微软雅黑;">微软雅黑</span>
            </li>
            <li class="item">
              <span style="font-family: Arial;">Arial</span>
            </li>
            <li class="item">
              <span style="font-family: Tahoma;">Tahoma</span>
            </li>
            <li class="item">
              <span style="font-family: Verdana;">Verdana</span>
            </li>
            <li class="item">
              <span style="font-family: Helvetica;">Helvetica</span>
            </li>
            <li class="item">
              <span style="font-family: Times;">Times</span>
            </li>
            <li class="item">
              <span style="font-family: Georgia;">Georgia</span>
            </li>
          </ul>
        </div>
      </div>

      <div class="menu" style="z-index:10001;" @mousedown=" execCommand('italic',false,null)">
        <i class="icon-italic"></i>
      </div>

      <div class="menu" style="z-index:10001;" @mousedown=" execCommand('underline',false,null)">
        <i class="icon-underline"></i>
      </div>

      <div class="menu" style="z-index:10001;" @mousedown=" execCommand('strikeThrough',false,null)">
        <i class="icon-strikethrough"></i>
      </div>

      <div class="menu" style="z-index:10001;" @mouseover="changeDisplay('font-color','block')" @mouseout="changeDisplay('font-color','none')">
        <i class="icon-pencil2"></i>
        <div class="droplist" id="font-color" style="margin-top:30px; width:120px; display:none;" @mouseout="changeDisplay('font-color','none')" @mousedown="changeDisplay('font-color','none')">
          <p class="dp-title">文字颜色</p>
          <ul class="block" id="font-color-list">
            <li class="item">
              <div style="background-color:#000000;" contenteditable="false"></div>
            </li>
            <li class="item">
              <div style="background-color:#eeece0;" contenteditable="false"></div>
            </li>
            <li class="item">
              <div style="background-color:#1c487f;" contenteditable="false"></div>
            </li>
            <li class="item">
              <div style="background-color:#4d80bf;" contenteditable="false"></div>
            </li>
            <li class="item">
              <div style="background-color:#c24f4a;" contenteditable="false"></div>
            </li>
            <li class="item">
              <div style="background-color:#8baa4a;" contenteditable="false"></div>
            </li>
            <li class="item">
              <div style="background-color:#7b5ba1;" contenteditable="false"></div>
            </li>
            <li class="item">
              <div style="background-color:#46acc8;" contenteditable="false"></div>
            </li>
            <li class="item">
              <div style="background-color:#f9963b;" contenteditable="false"></div>
            </li>
            <li class="item">
              <div style="background-color:#ffffff; " contenteditable="false"></div>
            </li>
          </ul>
        </div>
      </div>

      <div class="menu" style="z-index:10001;" @mouseover="changeDisplay('bgcolor','block')" @mouseout="changeDisplay('bgcolor','none')">
        <i class="icon-paint-brush"></i>
        <div class="droplist" id="bgcolor" style="margin-top:30px; width:120px; display:none;" @mouseout="changeDisplay('bgcolor','none')" @mousedown="changeDisplay('bgcolor','none')">
          <p class="dp-title">背景色</p>
          <ul class="block" id="bg-color-list">
            <li class="item">
              <div style="background-color:#000000;" contenteditable="false"></div>
            </li>
            <li class="item">
              <div style="background-color:#eeece0;" contenteditable="false"></div>
            </li>
            <li class="item">
              <div style="background-color:#1c487f;" contenteditable="false"></div>
            </li>
            <li class="item">
              <div style="background-color:#4d80bf;" contenteditable="false"></div>
            </li>
            <li class="item">
              <div style="background-color:#c24f4a;" contenteditable="false"></div>
            </li>
            <li class="item">
              <div style="background-color:#8baa4a;" contenteditable="false"></div>
            </li>
            <li class="item">
              <div style="background-color:#7b5ba1;" contenteditable="false"></div>
            </li>
            <li class="item">
              <div style="background-color:#46acc8;" contenteditable="false"></div>
            </li>
            <li class="item">
              <div style="background-color:#f9963b;" contenteditable="false"></div>
            </li>
            <li class="item">
              <div style="background-color:#ffffff;" contenteditable="false"></div>
            </li>
          </ul>
        </div>
      </div>

      <div class="menu" style="z-index:10001; margin:0 50px;">
        |
      </div>

      <div class="menu" style="z-index:10001;" @mousedown="changeDisplay('link','block')">
        <i class="icon-link"></i>
      </div>

      <div class="menu" style="z-index:10001;" @mouseover="changeDisplay('sequence','block')" @mouseout="changeDisplay('sequence','none')">
        <i class="icon-list2"></i>
        <div class="droplist" id="sequence" style="margin-top:30px; width:120px; display:none;" @mouseout="changeDisplay('sequence','none')" @mousedown="changeDisplay('sequence','none')">
          <p class="dp-title">设置列表</p>
          <ul class="list">
            <li class="item">
              <span @mousedown=" execCommand('insertOrderedList',false,null)"><i class="icon-list-numbered"></i> 有序列表</span>
            </li>
            <li class="item">
              <span @mousedown="execCommand('insertUnorderedList',false,null)"><i class="icon-list2" ></i> 无序列表</span>
            </li>
          </ul>
        </div>
      </div>

      <div class="menu" style="z-index:10001;" @mouseover="changeDisplay('align','block')" @mouseout="changeDisplay('align','none')">
        <i class="icon-paragraph-left"></i>
        <div class="droplist" id="align" style="margin-top:30px; width:100px; display:none;" @mouseout="changeDisplay('align','none')" @mousedown="changeDisplay('align','none')">
          <p class="dp-title">对齐方式</p>
          <ul class="list">
            <li class="item" @mousedown=" execCommand('justifyLeft',false,null)">
              <span><i class="icon-paragraph-left"></i> 靠左</span>
            </li>
            <li class="item" @mousedown=" execCommand('justifyCenter',false,null)">
              <span><i class="icon-paragraph-center"></i> 居中</span>
            </li>
            <li class="item" @mousedown=" execCommand('justifyRight',false,null)">
              <span><i class="icon-paragraph-right"></i> 靠右</span>
            </li>
          </ul>
        </div>
      </div>

      <div class="menu" style="z-index:10001;" @mousedown="noCursor().insertQuote()">
        <i class="icon-quotes-left"></i>
      </div>

      <div class="menu" style="z-index:10001;" @mouseover="changeDisplay('emoji','block')" @mouseout="changeDisplay('emoji','none')">
        <i class="icon-happy"></i>
      </div>

      <div class="menu" id="img" style="z-index:10001;" @mousedown="changeDisplay('image','block')">
        <i class="icon-image"></i>
      </div>

      <div class="menu" style="z-index:10001;" @mousedown="changeDisplay('table','block')">
        <i class="icon-table2"></i>
      </div>

      <div class="menu" style="z-index:10001;" @mousedown="needCursor().transCode()">
        <i class="icon-terminal"></i>
      </div>

      <div class="menu" style="z-index:10001; margin:0 50px;">
        |
      </div>

      <div class="menu" style="z-index:10001;" @mousedown=" execCommand('undo',false,null)">
        <i class="icon-undo"></i>
      </div>

      <div class="menu" style="z-index:10001;" @mousedown="execCommand('redo',false,null)">
        <i class="icon-redo"></i>
      </div>

      <div class="menu" style="z-index:10001;" @mousedown="saveHTML()">
        <i class="el-icon-collection"></i>
      </div>

      <el-button type="text" @click="open" style="padding: 0; margin: 1px 0 1px 12%;" >
        <el-button type="primary"  style="padding:  6px; ">发布<i class="el-icon-upload el-icon--right"></i></el-button>
      </el-button>

      <el-button type="danger" style="padding: 6px; margin:2px 0 2px 3%;"  icon="el-icon-close" circle @click="centerDialogVisible = true"></el-button>

      <el-dialog
        title="提示"
        :visible.sync="centerDialogVisible"
        width="30%"
        center>
        <span style="display: block;text-align: center">是否将文章存入草稿箱</span>
        <span slot="footer" class="dialog-footer">
    <el-button @click="exit()">不存入</el-button>
    <el-button type="primary" @click="uploadEditing()">确 定</el-button>
        </span>
      </el-dialog>

    </div>

    <div style="border:1px solid #ccc; border-top:none; height:calc(100% - 37px); padding-top:37px;" class="text-container">
      <div contenteditable="true" style="width:100%; height:100%;" class="text" id="text-elem" @click="needCursor().saveCursor()" @keyup="needCursor().saveCursor()">
        <p>欢迎使用<b>富文本编辑器</b>，请输入内容...</p>
      </div>

      <div class="panel-container" id="link" style="width:300px; left: 20%;" >
        <i class="icon-close panel-close" @mousedown="changeDisplay('link','none')"></i>
        <ul class="panel-tab-title">
          <li class="item active">链接</li>
        </ul>
        <div class="panel-tab-content">
          <div>
            <input id="input-link" type="text" class="block" value="http://" placeholder="http://..." @keyup="needCursor().inputLink()">
            <div class="button-container">
              <button id="btn-ok" class="right" @mousedown="needCursor().insertLink()">删除已绑定的超链接</button>
              <button id="btn-de" class="gray right" style="display:none" @mousedown="cleanLink()">删除链接</button>
            </div>
          </div>
        </div>
      </div>

      <div class="panel-container" id="emoji" style="width:200px; left:43%" @mouseover="changeDisplay('emoji','block')" @mouseout="changeDisplay('emoji','none')">
        <ul class="panel-tab-title">
          <li class="item active">emoji</li>
        </ul>

        <div class="emoticon-container" id="emoji_list" style="display:block;">
          <span class="item">😀</span>
          <span class="item">😃</span>
          <span class="item">😄</span>
          <span class="item">😁</span>
          <span class="item">😆</span>
          <span class="item">😅</span>
          <span class="item">😂</span>
          <span class="item">😊</span>
          <span class="item">😇</span>
          <span class="item">🙂</span>
          <span class="item">🙃</span>
          <span class="item">😉</span>
          <span class="item">😓</span>
          <span class="item">😪</span>
          <span class="item">😴</span>
          <span class="item">🙄</span>
          <span class="item">🤔</span>
          <span class="item">😬</span>
          <span class="item">🤐</span>
          <span class="item">😘</span>
        </div>
      </div>

      <div class="panel-container" id="image" style="width:300px; left:35%">
        <i class="icon-close panel-close" @mousedown="changeDisplay('image','none')"></i>
        <ul class="panel-tab-title">
          <li class="item active">上传图片</li>
          <li class="item">网络图片</li>
        </ul>
        <div class="panel-tab-content">
          <div class="up-img-container">
            <div id="up-trigger" class="up-btn">
              <i class="icon-upload2" @mousedown="needCursor().insertImage()"></i>
            </div>
            <div style="display:none;">
              <input id="up-file" type="file" multiple="multiple" accept="image/jpg,image/jpeg,image/png,image/gif,image/bmp" @change="needCursor().uploadImage($event)">
            </div>
          </div>
          <div style="display:none;">
            <input id="link-url" type="text" class="block" placeholder="图片链接">
            <div class="button-container">
              <button id="link-btn" class="right">插入</button>
            </div>
          </div>
        </div>
      </div>

      <div class="panel-container" id="table" style="width:250px; left:38%">
        <i class="icon-close panel-close" @mousedown="changeDisplay('table','none')"></i>
        <ul class="panel-tab-title">
          <li class="item active">插入表格</li>
        </ul>
        <div class="panel-tab-content">
          <div>
            <p style="text-align:left; padding:5px 0;">
              创建
              <input id="row" type="text" value="5" style="width:40px;text-align:center;">
              行
              <input id="col" type="text" value="5" style="width:40px;text-align:center;">
              列的表格
            </p>
            <div class="button-container">
              <button id="btn" class="right" @click="needCursor().insertTable()">插入</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import noCursor from '../assets/js/editor/noCursor.js'
  import  handleClick  from '../assets/js/editor/handleImg.js'
  import needCursor from '../assets/js/editor/needCursor.js'
  export default {
    name: 'editor',
    data: ()=>{
      return {
        article:{
          username:'',
          token:'',
          title:'',
          savedHTML:'',
        },
        centerDialogVisible:false,//是否存入草稿箱的对话框显示状态
      }
    },
    mounted:()=>{
      document.getElementById('toolbar').onmousedown = function(e){
        //现代浏览器阻止默认事件
        if ( e && e.preventDefault )
          e.preventDefault();
        //IE阻止默认事件
        else
          window.event.returnValue = false;

        return false;
      };

      //为一些样式选择添加绑定事件
      noCursor.headerChoose();
      noCursor.fontSizeChoose();
      noCursor.fontNameChoose();
      noCursor.ColorChoose('font-color-list');
      noCursor.emojiChoose();
      noCursor.ColorChoose('bg-color-list');

      //开启文本框输入监听，检查是否点击照片
      let editor = document.getElementById('text-elem');
      editor.addEventListener('click', handleClick.handleClick);
    },
    methods: {
      //改变样式选择的下拉列表显示状态
      changeDisplay(ID,state) {
          document.getElementById(ID).style.display = state;
      },
      //获取需要光标的方法
      needCursor(){
        return needCursor;
      },
      //执行document.execCommand
      execCommand (commandId, showUI, value) {
        return  document.execCommand(commandId,showUI,value);
      },
      //获取不需要光标的方法
      noCursor(){
        return noCursor
      },
      //填写文章标题
      open() {
        this.$prompt('请输入文章标题', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({value}) => {
          this.article.title = value;
          this.upload();
        })
      },
      //将已编辑内容存在data中
      saveHTML(){
        this.article.savedHTML = document.getElementById('text-elem').innerHTML;
        this.$store.state.savedHTML = this.article.savedHTML;
      },
      //上传已编辑内容
      upload(){
        this.saveHTML();
        this.$axios.post('/publicArticle',{
           name:'root',//this.article.username
          token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoicm9vdCIsImlhdCI6MTU5MDMzMjQ0MX0.W5rSk8OqmU-guUw4nV6Zgnwl2m7NW0pFJpj2jSqhaNo',// this.article.token
          title:this.article.title,
          pubarticle:this.article.savedHTML
        }).then( res => {
           if(res.data.code === 200){
             this.$message.success('发布成功');
             this.$router.push({path:'/home'});
           }else {
             this.$message.error('发布失败，请重试');
           }
        });
        console.log(this.article.savedHTML);
      },
      //提示用户是否丢弃
      exit() {
        this.$message.warning('文章已丢弃');
        this.centerDialogVisible = false;
        this.$router.push({path:'/home'});
      },
      //上传文章到草稿箱
      uploadEditing(){
        this.saveHTML();
        this.$axios.post('/editingArticle',{
          name:'root',//this.article.username
          token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoicm9vdCIsImlhdCI6MTU5MDMzMjQ0MX0.W5rSk8OqmU-guUw4nV6Zgnwl2m7NW0pFJpj2jSqhaNo',// this.article.token
          title:this.article.title,
          editingarticle:this.article.savedHTML
        }).then( res => {
          this.centerDialogVisible = false;
          if(res.data.code === 200){
            this.$message.success('保存草稿箱成功');
            this.$router.push({path:'/home'});
          }else {
            this.$message.error('保存失败，请重试');
          }
        });
        console.log(this.article.savedHTML);
      }
    },
  }
</script>

<style src="@/assets/css/editor.css"></style>

