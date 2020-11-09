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

      <div class="menu" style="z-index:10001;" @mousedown="needCursor().transCode()">
        <i class="icon-terminal"></i>
      </div>

      <div class="menu" style="z-index:10001;" @mousedown=" execCommand('undo',false,null)">
        <i class="icon-undo"></i>
      </div>

      <div class="menu" style="z-index:10001;" @mousedown="execCommand('redo',false,null)">
        <i class="icon-redo"></i>
      </div>

      <el-button type="text" @click="upload" style="padding: 0; margin: 1px 0 1px 5%;" >
        <el-button type="primary"  style="padding:  6px; ">发布<i class="el-icon-upload el-icon--right"></i></el-button>
      </el-button>
    </div>

    <div style="border:1px solid #ccc; border-top:none; height:calc(100% - 37px); padding-top:37px;" class="text-container">
      <div contenteditable="true" style="width:100%; height:100%;" class="text" id="text-elem" @click="needCursor().saveCursor()" @keyup="needCursor().saveCursor()">
        <p>欢迎使用<b>富文本编辑器</b>，请输入内容...</p>
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
    </div>
  </div>
</template>

<script>
  import noCursor from '../assets/js/editor/noCursor.js'
  import needCursor from '../assets/js/editor/needCursor.js'
  export default {
    name: 'commentEditor',
    data: ()=>{
      return {
        comment:{
          name:'',
          token:'',
          pageId:0,
          comment:'',
          followId:0
        },
      }
    },
    mounted(){
      //为一些样式选择添加绑定事件
      noCursor.headerChoose();
      noCursor.fontSizeChoose();
      noCursor.fontNameChoose();
      noCursor.ColorChoose('font-color-list');
      noCursor.emojiChoose();
      noCursor.ColorChoose('bg-color-list');
    },
    created(){
      this.comment.followId = this.$route.query.followID;
      this.comment.token = this.$store.state.token;
      this.comment.name = this.$store.state.username;
      this.comment.pageId = this.$route.query.pageID;
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
      //将已编辑内容存在data中
      saveHTML(){
        this.comment.comment = document.getElementById('text-elem').innerHTML;
      },
      //上传已编辑内容
      upload(){
          this.saveHTML();
          this.$axios.post('/writeComment',this.comment).then( res => {
            if(res.data.code === 200){
              this.$message.success('发布评论成功');
              setTimeout(()=>{window.close();},1000);
            }else {
              this.$message.error('发布评论错误，请重试');
            }
          });
      },
    },

  }
</script>

<style>
  .toolbar{
    z-index: 1500;
    padding:3px 5%;
  }
</style>

<!--<style src="@/assets/css/editor.css"></style>-->
