'use strict';

const Controller = require('egg').Controller;

class UserLoginController extends Controller {
  //使用token登录
  async loginByToken(){
    const { ctx } = this;
    const token = ctx.request.body.token;
    const isValidUser = await ctx.service.user.isValidToken(token);

    if (isValidUser) {
      ctx.body = { code: 200, msg: '登录成功' };
    } else {
      ctx.body = { code: 401, msg: 'token不存在' };
    }
  }

  // 登录
  async login() {
    const { ctx, app } = this;
    const data = ctx.request.body;
    // 判断该用户是否存在并且密码是否正确
    const isValidUser = await ctx.service.user.validUser(data.name, data.password);
    if (isValidUser) {
      const token = app.jwt.sign({ name: data.name }, app.config.jwt.secret);
      ctx.body = { code: 200, msg: '登录成功', token };
    } else {
      ctx.body = { code: 400, msg: '登录失败,账号或密码错误' };
    }
  }

  // 加密
  async getMd5Data() {
    const { ctx } = this;
    ctx.body = await ctx.service.user.getMd5Data(ctx.params.data);
  }
}

module.exports = UserLoginController;
