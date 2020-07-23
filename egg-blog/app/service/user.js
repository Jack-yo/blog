'use strict';

const Service = require('egg').Service;
const crypto = require('crypto');

class UserService extends Service {
  // 查询user表，验证密码和花名
  async validUser(name, password) {
    const { ctx } = this;
    const criteria = { password };
    const regEmail = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;

    if (regEmail.test(name)) {
      criteria.email = name;
    } else {
      criteria.name = name;
    }

    console.log('判断结果', criteria);

    const data = await ctx.model.User.findAll({
      where: criteria,
    });

    for (const item of data) {
      if ((item.name === name || item.email === name) && item.password === password) return true;
      console.log('item', item);
    }
    return false;
  }

  // 创建用户信息
  async create(name, password, email, token) {
    const { ctx } = this;

    try {
      await ctx.model.User.create({ name, password, email, token });
    } catch (e) {
      console.log('创建用户发生错误：' + e);
      return false;
    }
    return true;
  }

  // 判断是否存在同名邮箱
  async isExistEmail(email) {
    return await this.isExist({ email });
  }

  // 专门对数据进行md5加密的方法，输入明文返回密文
  getMd5Data(data) {
    return crypto.createHash('md5').update(data).digest('hex');
  }

  // 判断是否有相同名字的用户
  async isExistName(name) {
    return await this.isExist({ name });
  }

  //判断Token是否存在
  async isValidToken(token) {
    return await this.isExist({ token });
  }

  //查询是否存在函数
  async isExist(key) {
    const { ctx } = this;
    const { name, email, token } = key;
    console.log('key:' + key);
    const criteria = {};

    if (name) {
      criteria.name = name;
    }

    if (email) {
      criteria.email = email;
    }

    if (token) {
      criteria.token = token;
    }

    try {
      const data = await ctx.model.User.findAll({
        where: criteria,
      });

      for (const item of data) {
        if (email && item.email === email);
        else if (name && item.name === name);
        else if (token && item.token === token);
        else continue;
        return true;
      }
      return false;

    } catch (e) {
      console.log(`查找${key}发生错误：` + e);
      return true;
    }
  }
}


module.exports = UserService;
