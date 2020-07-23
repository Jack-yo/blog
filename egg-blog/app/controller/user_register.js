'use strict';

const Controller = require('egg').Controller;

class UserRegisterController extends Controller {
  // 注册
  async register() {

        const { ctx, app } = this;
        const data = ctx.request.body;

        const isExistName = await ctx.service.user.isExistName(data.name);
        const isExistEmail = await ctx.service.user.isExistEmail(data.email);

        if (!isExistName && !isExistEmail) {
              const token = app.jwt.sign({ name: data.name }, app.config.jwt.secret);
              const isCreate = await ctx.service.user.create(data.name, data.password, data.email, token);

              if (isCreate) {
                ctx.body = { code: 200, msg: '注册成功', token };
              } else {
                ctx.body = { code: 500, msg: '创建用户失败，请重试' };
              }

        } else {
              if (isExistName && isExistEmail) ctx.body = { code: 400, msg: '用户名和邮箱地址都已存在' };
              else if (isExistEmail) ctx.body = { code: 400, msg: '邮箱地址已存在' };
              else if (isExistName) ctx.body = { code: 400, msg: '用户名已存在' };
        }
  }
}

module.exports = UserRegisterController;
