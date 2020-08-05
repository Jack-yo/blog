
let editor ;
let nowImg;
let boxes = new Array();
let overlay;


function handleClick(e) {
  editor = document.getElementById('text-elem');
  if (
    e.target &&
    e.target.tagName &&
    e.target.tagName.toUpperCase() === 'IMG'
  ) {
    nowImg = e.target;
    console.log(boxes)

    if(boxes.length != 0){
      for(let i = 0; i < 4;i++){
        overlay.removeChild(boxes[i]);
      }
      editor.removeChild(overlay)
      overlay = null;
      boxes = [];
    }

    // 添加蒙层
    overlay = document.createElement('div');
    overlay.setAttribute('contenteditable',false)
    overlay.addEventListener('mousedown',clickImg)

    // console.log(overlay)
    editor.appendChild(overlay);


    // 定位蒙层和大小
    repositionOverlay();
  }
  else if(!overlay || boxes.length == 0);

  else if( e.target != overlay && !overlay.contains(e.target) ){
    for(let i = 0; i < 4;i++){
      overlay.removeChild(boxes[i]);
    }
    editor.removeChild(overlay);
    overlay = null;
    boxes = []
  }
}

function repositionOverlay() {
  let imgRect = nowImg.getBoundingClientRect();
  let editorRect = editor.getBoundingClientRect();
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

function createBox(){
  boxes = [];
  addBox('nwse-resize'); // top left
  addBox('nesw-resize'); // top right
  addBox('nwse-resize'); // bottom right
  addBox('nesw-resize'); // bottom left
  positionBoxes(); // 设置四个拖拽框位置
}

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

let dragBox;
let conner = 4;
let dragStartX;
let preDragWidth;

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

function getStyle(el,name) {
  if(window.getComputedStyle) {
    return window.getComputedStyle(el, null)[name];
  }else{
    return el.currentStyle[name];
  }
}

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

let imgBox;
let startY;
let startX;
let imgRect;
let overlayRect;

function clickImg(e) {
  imgBox =  e.target;
  startY = e.clientY;
  startX = e.clientX;
  overlayRect = imgBox.getBoundingClientRect();
  imgRect = nowImg.getBoundingClientRect();

  document.addEventListener('mousemove',moveImg);
  document.addEventListener('mouseup',upImg)
}

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

function upImg() {
  document.removeEventListener('mouseup',upImg)
  document.removeEventListener('mousemove',moveImg)
}

export default {
  handleClick,
}
