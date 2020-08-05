let lastEditRange;

export default {

  saveCursor(){
    let selection = getSelection()
    lastEditRange = selection.getRangeAt(0)
    // console.log(lastEditRange)
  },

  //获取输入框光标
  focusText() {
    document.getElementById('text-elem').focus();
    let selection = getSelection()

    if(lastEditRange){
      selection.removeAllRanges()
      selection.addRange(lastEditRange)

    }
  },

  //填入超链接
    inputLink() {
        let link = document.getElementById('input-link').value;
      console.log(link)
      if(link != 'https://' && link != 'http://' && link != ''){
          document.getElementById('btn-de').style.display = 'block';
          document.getElementById('btn-ok').innerText = '插入';
        }else{
          document.getElementById('btn-ok').innerText = '删除已绑定的超链接';
          document.getElementById('btn-de').style.display = 'none';
        }
    },

    //插入超链接
    insertLink() {
      let link = document.getElementById('input-link').value;

      this.focusText();

      if(link !== 'http://' && link != 'https://' && link != ''){
        document.execCommand('createLink',false,link);
      }else{
        document.execCommand('unlink',false,null);
      }
    },

    //插入图片
    insertImage() {
      document.getElementById('up-file').click();
      document.getElementById('image').style.display = 'none';
      document.execCommand('enableObjectResizing');
    },

    //上传图片
    uploadImage(e) {

      this.focusText();

      let reader = new FileReader();
      reader.onload = (function (file) {
        return function () {
          // console.log(this.result);
          document.execCommand('insertImage',false,this.result)
        };
      })(e.target.files[0]);
      reader.readAsDataURL(e.target.files[0]);
    },

    //插入表格
    insertTable() {
      document.getElementById('table').style.display = 'none';

      let rows = document.getElementById('row').value;
      let cols = document.getElementById('col').value;
      let tempValue = '<table border="0" width="100%" cellpadding="0" cellspacing="0"><tbody>';

      if(rows > 0 && cols > 0){
        tempValue += '<tr>';
        for (let j = 0; j < cols;j++){
          tempValue  += '<th>&nbsp;</th>'
        }
        tempValue += '</tr>';

        for(let i = 1; i < rows; i++){
          tempValue += '<tr>';
          for(let j = 0 ; j < cols; j++){
            tempValue += '<td>&nbsp;</td>';
          }
          tempValue += '</tr>';
        }

        tempValue += '</tbody></table>';
        this.focusText();
        document.execCommand('insertHTML',false,tempValue);
      }else{
        if(rows <= 0) alert('行数不能低于一');
        if(cols <= 0) alert('列数不能低于一');
      }
    },

    //插入代码标签
    transCode() {
      let selection = getSelection()
      lastEditRange = selection.getRangeAt(0)

      let nodeName = '';
      let node = lastEditRange.commonAncestorContainer;

      while(nodeName !== 'P' && nodeName !== 'PRE' && node != null){
        nodeName = node.nodeName;
        node = node.parentNode;
        console.log(nodeName)
      }

      if(nodeName === 'PRE'){
        document.execCommand('formatBlock',false,'p')
      }else{
        document.execCommand('formatBlock',false,'pre')
      }
    }
}
