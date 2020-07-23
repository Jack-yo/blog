<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <div class="exit">
      <el-button type="danger" @click="doExit()">退出登录</el-button>
    </div>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },

  methods:{
    doExit () {
      localStorage.removeItem('blogToken');
      this.$router.push('/login');
    }
  }
}
</script>

<style>
  .exit {
    position: absolute;
    right: 20px;
    top:20px
  }
</style>
