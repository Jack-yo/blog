//该文件定义的是不需要获取实时光标位置方法
export default {

  // 为每一种类型标题选择绑定点击事件
    headerChoose() {
        this.bindClick('header_list','formatBlock');
  },

  // 为每一种字体大小选择绑定点击事件
    fontSizeChoose(){
        let font_size_list = document.getElementById('font-size-list').getElementsByTagName('li');
      for(let i = 0;i < font_size_list.length;i++){
        font_size_list[i].onmousedown = function () {
          document.execCommand('fontSize',false,i + 1);
        }
      }
  },

  // 为插入引用绑定点击事件
    insertQuote() {
        let Range = document.getSelection().getRangeAt(0);
        console.log(Range.commonAncestorContainer.nodeName);
        console.log(Range);
        let formatName = (Range.commonAncestorContainer.nodeName === 'BLOCKQUOTE' || Range.commonAncestorContainer.parentNode.nodeName === 'BLOCKQUOTE') ? 'P':'BLOCKQUOTE';
        console.log(formatName);
        document.execCommand('formatBlock', false, formatName)
  },

  // 为字体类型选择绑定点击事件
    fontNameChoose(){
         this.bindClick('font','fontName');
  },

  //为字体颜色选择绑定点击事件
    ColorChoose(id){
        let color_list = document.getElementById(id).getElementsByTagName('li');
        for(let i = 0;i < color_list.length;i++){
          color_list[i].onmousedown =  function  () {
            if(id == 'font-color-list')
                document.execCommand('foreColor',false,color_list[i].firstElementChild.style.backgroundColor);
            else
              document.execCommand('backColor',false,color_list[i].firstElementChild.style.backgroundColor);
              }
            }

  },

  //清除已绑定的超链接
    cleanLink() {
          document.getElementById('input-link').value = 'http://';
          document.getElementById('btn-de').style.display = 'none';
          document.getElementById('btn-ok').innerText = '删除已绑定的超链接';
  },

  //为emoji选择绑定点击事件
    emojiChoose(){
          let emoji_list = document.getElementById('emoji_list').getElementsByTagName('span');
          for(let i = 0;i < emoji_list.length;i++){
            emoji_list[i].onmousedown = function () {
              document.execCommand('insertText',false,emoji_list[i].innerHTML);
              document.getElementById('emoji').style.display = 'none';
            }
          }
  },

  //绑定点击事件函数
    bindClick(Id,commandId) {
          let list = document.getElementById(Id).getElementsByTagName('li');
          for(let i = 0;i < list.length;i++){
            list[i].onmousedown = function () {
              document.execCommand(commandId,false,list[i].firstElementChild.innerHTML);
              console.log(list[i].firstElementChild.innerHTML);
            }
          }
     }
}


