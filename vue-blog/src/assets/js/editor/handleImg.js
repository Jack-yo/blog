
let editor ;//编辑器节点对象
let nowImg;//获得焦点的图片
let boxes = new Array();//获得焦点图片的四个角
let overlay;//获得焦点图片的边框


function handleClick(e) {
  //获取编辑器节点对象
  editor = document.getElementById('text-elem');
  //判断鼠标点击的对象是否为img
  if (
    e.target &&
    e.target.tagName &&
    e.target.tagName.toUpperCase() === 'IMG'
  ) {
    //获得点击的img节点对象
    nowImg = e.target;

    //判断是否有其他图片获得焦点，如果有，删除其显示的边框和四个角
    if(boxes.length != 0){
      for(let i = 0; i < 4;i++){
        overlay.removeChild(boxes[i]);
      }
      editor.removeChild(overlay)
      overlay = null;
      boxes = [];
    }

    // 添加蒙层（包含图片的div）
    overlay = document.createElement('div');
    overlay.setAttribute('contenteditable',false)
    overlay.addEventListener('mousedown',clickImg)

    //添加蒙层（包含图片的div）进编辑器对象
    editor.appendChild(overlay);

    // 定位蒙层和大小
    repositionOverlay();
  }
  //点击的不是图片，判断当前是否有获得焦点的图片，没有就什么都不做
  else if(!overlay || boxes.length == 0);

  //如果点击的对象不是照片以及其边框和四个角,将原来获得焦点的图片的边框和四个角取消显示
  else if( e.target != overlay && !overlay.contains(e.target) ){
    for(let i = 0; i < 4;i++){
      overlay.removeChild(boxes[i]);
    }
    editor.removeChild(overlay);
    overlay = null;
    boxes = [];
  }
}

function repositionOverlay() {
  let imgRect = nowImg.getBoundingClientRect();//获取图片相对浏览器窗口的位置
  let editorRect = editor.getBoundingClientRect();//获取编辑器相对浏览器窗口的位置
  // 设置蒙层宽高和位置
  Object.assign(overlay.style, {
    position: 'absolute',
    top: `${imgRect.top - editorRect.top + editor.scrollTop}px`,
    left: `${imgRect.left - editorRect.left - 1 + editor.scrollLeft}px`,
    width: `${imgRect.width}px`,
    height: `${imgRect.height}px`,
    boxSizing: 'border-box',
    border: '1px dashed red',
  });
  // 添加四个顶点拖拽框
  createBox();
}

//创建四个角
function createBox(){
  boxes = [];
  addBox('nwse-resize'); // top left
  addBox('nesw-resize'); // top right
  addBox('nwse-resize'); // bottom right
  addBox('nesw-resize'); // bottom left
  positionBoxes(); // 设置四个拖拽框位置
}

//创建四个角的样式和获得焦点是的鼠标指针样式
function addBox(cursor) {
  const box = document.createElement('div');
  Object.assign(box.style, {
    position: 'absolute',
    height: '12px',
    width: '12px',
    backgroundColor: 'white',
    border: '1px solid #777',
    boxSizing: 'border-box',
    opacity: '0.80',
  });
  box.setAttribute('contenteditable',false);
  box.style.cursor = cursor;
  box.addEventListener('mousedown', handleMousedown);  // 顺便添加事件
  overlay.appendChild(box);
  boxes.push(box);
}

//四个角分别设定其在边框的位置
function positionBoxes() {
  let handleXOffset = `-6px`;
  let handleYOffset = `-6px`;
  [{ left: handleXOffset, top: handleYOffset },
    { right: handleXOffset, top: handleYOffset },
    { right: handleXOffset, bottom: handleYOffset },
    { left: handleXOffset, bottom: handleYOffset }].forEach((pos, idx) => {
    Object.assign(boxes[idx].style, pos);
  });
}

/* --------------------------- 以下一部分是图片大小改变的方法 ----------------------------------*/

let dragBox;   //图片某个获得焦点的角
let conner = 4;//四个角
let dragStartX;//角相对于浏览器左边的位置
let preDragWidth;//获得图片的宽度

//鼠标按压，选中角需要改变图片大小时触发的事件
function handleMousedown(e) {
  dragBox = e.target;
  dragStartX = e.clientX;
  preDragWidth = getWH(nowImg,'width');
  setCursor(dragBox.style.cursor);
  if ( e && e.stopPropagation )
  //因此它支持W3C的stopPropagation()方法
    e.stopPropagation();
  else
  //否则，我们需要使用IE的方式来取消事件冒泡
    window.event.cancelBubble = true;
  document.addEventListener('mousemove', handleDrag);
  document.addEventListener('mouseup', handleMouseup);
}

//计算需要图片变化大小程度
function handleDrag(e) {
  // 计算水平拖动距离
  const deltaX = e.clientX - dragStartX;

  //对应触发变化的角
  if(conner != 4) dragBox = boxes[conner];

  // 修改图片大小
  if (dragBox === boxes[0] || dragBox === boxes[3]) { // 左边的两个框
    conner = dragBox === boxes[0] ? 0 : 3;
    nowImg.width = Math.round(preDragWidth - deltaX) ;
  } else { // 右边的两个框
    nowImg.width = Math.round(preDragWidth + deltaX) ;
    conner = dragBox === boxes[1] ? 1 : 2;
  }
  for(let i = 0; i < 4;i++){
    overlay.removeChild(boxes[i]);
  }

  // 同时修改蒙层大小
  repositionOverlay();
}

//鼠标放松，鼠标移动改变图片大小事件，鼠标抬起事件监听移除
function handleMouseup() {
  setCursor('');
  // 拖拽结束移除事件监听
  document.removeEventListener('mousemove', handleDrag);
  document.removeEventListener('mouseup', handleMouseup);
  //触发角取消
  conner = 4;
}


function setCursor(value) {
  // 设置鼠标样式
  [document.body, nowImg].forEach(el => {
    el.style.cursor = value;
  });
}

//获取蒙层的样式里边框，内边距大小
function getStyle(el,name) {
  if(window.getComputedStyle) {
    return window.getComputedStyle(el, null)[name];
  }else{
    return el.currentStyle[name];
  }
}

//返回图片的真实宽度或高度
function getWH(el, name) {
  let val = name === "width" ? el.offsetWidth : el.offsetHeight,
    which = name === "width" ? ['Left', 'Right'] : ['Top', 'Bottom'];

  // display is none
  if(val === 0) {
    return 0;
  }

  for(let i = 0, a = which[i]; i < 2;i++) {
    val -= parseFloat( getStyle(el, "border" + a + "Width") ) || 0;
    val -= parseFloat( getStyle(el, "padding" + a) ) || 0;
  }

  return val ;
}

/* ------------------------------------以下是控制图片移动的方法----------------------------------------- */

let imgBox;//获得焦点的图片蒙层
let startY;//图片相对浏览器顶部的垂直距离
let startX;//图片相对浏览器左边的水平距离
let imgRect;//图片的相对浏览器的位置
let overlayRect;//图片蒙层相对浏览器的位置

//点击图片后绑定鼠标移动和抬起监听
function clickImg(e) {
  imgBox =  e.target;
  startY = e.clientY;
  startX = e.clientX;
  overlayRect = imgBox.getBoundingClientRect();
  imgRect = nowImg.getBoundingClientRect();

  document.addEventListener('mousemove',moveImg);
  document.addEventListener('mouseup',upImg)
}

//计算图片移动距离
function moveImg(e) {

  const deltaY = e.clientY - startY
  const deltaX = e.clientX - startX

  Object.assign(nowImg.style,{

    position: 'absolute',
    left: `${imgRect.left + deltaX}px`,
    top: `${imgRect.top + deltaY}px`
  })

  Object.assign(imgBox.style,{
    left: `${overlayRect.left + deltaX}px`,
    top: `${overlayRect.top + deltaY}px`
  })
}

//鼠标抬起，解除鼠标移动和抬起监听事件
function upImg() {
  document.removeEventListener('mouseup',upImg)
  document.removeEventListener('mousemove',moveImg)
}

export default {
  handleClick,
}
