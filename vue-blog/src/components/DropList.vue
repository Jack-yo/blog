<template>
  <div class="droplist" :id="id" style="margin-top:30px; width:100px; display:none;" @mousedown="close()" ><!--@mouseout="close()"-->
    <p class="dp-title">设置标题</p>
    <ul class="list" :id="list_id">
        <li class="item" v-for="item in list" >
            <slot></slot>
        </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'DropList',
    props:{
      id:String,
      list:Array,
      list_id:String
    },
    data:()=>{
      return{

      }
    },
    methods:{
      changeDisplay (ID, state) {
        document.getElementById(ID).style.display = state;
      },
      close(){
         this.changeDisplay(this.id,'none');
      },
    }

  }
</script>

<style scoped>
   .droplist {
    position: absolute;
    left: 0;
    top: 0;
    background-color: #fff;
    border: 1px solid #f1f1f1;
    border-right-color: #ccc;
    border-bottom-color: #ccc;
  }
   .droplist .dp-title {
    text-align: center;
    color: #999;
    line-height: 2;
    border-bottom: 1px solid #f1f1f1;
    font-size: 13px;
  }
   .droplist ul.list {
    list-style: none;
    line-height: 1;
    padding: 0;
  }
   .droplist ul.list li.item {
    color: #333;
    line-height: 1.8;
    /*padding: 5px 0;*/
  }
   .droplist ul.list li.item:hover {
    background-color: #f1f1f1;
  }
</style>
