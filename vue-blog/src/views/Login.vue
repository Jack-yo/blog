<template>
  <div class="login" clearfix>
    <div class="login-wrap">
      <el-row type="flex" justify="center">
        <el-form ref="loginForm" :model="user"  status-icon label-width="80px"><!--:rules="rules"-->
          <h3>登录</h3>
          <hr>
          <el-form-item prop="username" label="账号">
            <el-input v-model="user.username" placeholder="请输入用户名或邮箱地址" prefix-icon></el-input>
          </el-form-item>
          <el-form-item id="password" prop="password" label="密码">
            <el-input v-model="user.password" show-password placeholder="请输入密码"></el-input>
          </el-form-item>
          <router-link to="/">找回密码</router-link>
          <router-link to="/register">注册账号</router-link>
          <el-form-item>
            <el-button type="primary" icon="el-icon-upload" @click="doLogin()">登 录</el-button>
          </el-form-item>
        </el-form>
      </el-row>
    </div>
  </div>
</template>

<script>

export default {
  name: 'login',
  data () {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  created () {},
  methods: {
    doLogin () {
      if (!this.user.username) {
        this.$message.error('请输入账号！')
      } else if (!this.user.password) {
        this.$message.error('请输入密码！')
      } else {
        // 校验账号和密码是否正确
        this.$axios
          .post('/user/login/', {
            name: this.user.username,
            password: this.$crypto.createHash("md5").update(this.user.password).digest('hex')
          })
          .then(res => {
            // console.log("输出response.data.status", res.data.status);
            if (res.data.code === 200) {
              localStorage.setItem("blogToken",res.data.token);
              this.$store.state.token = res.data.token;
              console.log(localStorage.blogToken);
              this.$router.push({ path: '/home' });
            } else {
              alert('您输入的账号或密码错误！')
            }
          })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .login {
    width: 100%;
    height: 100%;
    background: url("../assets/images/bg.jpg") no-repeat;
    background-size: cover;
    overflow: hidden;
  }
  .login-wrap {
    /*background: url("../assets/images/login_bg.png") no-repeat;*/
    background-size: cover;
    width: 400px;
    height: 320px;
    margin: 215px auto;
    overflow: hidden;
    line-height: 40px;
    border-radius: 30px;
    background-color: white;
    opacity: 0.9;
  }
  #password {
    margin-bottom: 5px;
  }
  h3 {
    color: rgba(29, 52, 234, 0.72);
    font-size: 24px;
  }
  hr {
    background-color: #444;
    margin: 20px auto;
  }
  a {
    text-decoration: none;
    color: #aaa;
    font-size: 15px;
    margin: 0 15px;
  }
  a:hover {
    color: coral;
  }
  .el-button {
    width: 80%;
    margin-left: -80px;
  }
</style>
