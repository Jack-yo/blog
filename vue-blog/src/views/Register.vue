<template>
  <div class="login clearfix">
    <div class="login-wrap">
      <el-row type="flex" justify="center">
        <el-form ref="loginForm" :model="user" status-icon label-width="80px">
          <h3>注册</h3>
          <hr>
          <el-form-item prop="username" label="用户名">
            <el-input v-model="user.username" placeholder="4至15位,字母，数字,‘_’"></el-input>
          </el-form-item>
          <el-form-item prop="email" label="邮箱">
            <el-input v-model="user.email" placeholder="请输入邮箱,格式xxx@xxx.xx"></el-input>
          </el-form-item>
          <el-form-item prop="password" label="设置密码">
            <el-input v-model="user.password" show-password placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item prop="password" label="确认密码">
            <el-input v-model="user.passwordConfirm" show-password placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon @click="doRegister()">注册账号</el-button>
            <router-link to="/" class="return-login">返回登录</router-link>
          </el-form-item>
        </el-form>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'register',
  data () {
    return {
      user: {
        username: '',
        email: '',
        password: '',
        passwordConfirm: ''
      }
    }
  },

  methods: {
    doRegister () {
      if (!this.user.username) {
        this.$message.error('请输入用户名！')
      } else if (!this.user.email) {
        this.$message.error('请输入邮箱！')
      } else if (this.user.email != null) {
        var regPassword = /(?!.*\s)(?!^[\u4e00-\u9fa5]+$)(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{8,16}$/;
        var regEmail = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        var regName = /^[\u4e00-\u9fa5a-zA-Z0-9_]{4,10}$/;
        if (!regName.test(this.user.username)) {
          this.$message.error('用户名非法,请重新输入')
        } else if (!regEmail.test(this.user.email)){
           this.$message.error('请输入有效的邮箱！');
        }else if (!this.user.password) {
          this.$message.error('请输入密码！')
        }else if (!regPassword.test(this.user.password)){
          this.$message.error('8-16个字符,不包含空格,必须包含数字,字母或字符至少两种')
        }else if (this.user.password !== this.user.passwordConfirm) {
          this.$message.error('两次输入密码不匹配！')
        } else {
          // this.$router.push({ path: "/" }); //无需向后台提交数据，方便前台调试
          this.$axios
            .post('/user/register/', {
              name: this.user.username,
              email: this.user.email,
              password: this.$crypto.createHash("md5").update(this.user.password).digest('hex')
            })
            .then(res => {
              // console.log("输出response.data", res.data);
              // console.log("输出response.data.status", res.data.status);
              if (res.data.code === 200) {
                localStorage.setItem("blogToken",res.token);
                this.$store.state.token = res.token;
                this.$message.success('注册成功');
                this.$router.push({ path: '/home' });
              } else {
                alert(res.data.msg)
              }
            })
        }
      }
    },
  }
}
</script>


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
    height: 390px;
    margin: 215px auto;
    overflow: hidden;
    padding-top: 10px;
    line-height: 20px;
    border-radius: 30px;
    background-color: white;
    opacity:0.9;
  }

  .return-login{
    margin-left:5px;
  }

  h3 {
    color: #0babeab8;
    font-size: 24px;
  }
  hr {
    background-color: #444;
    margin: 20px auto;
  }

  .el-button {
    width: 80%;
    margin-left: -30px;
  }
</style>
