'use strict';

const Service = require('egg').Service;

class PubArticlesService extends Service{
  async getPubArticles(name){
    const {ctx} = this;

    try{
      const data = await ctx.model.Publicarticles.findAll({
        where:{name},
      });
      return data;

    }catch (e) {
      console.log('寻找文章发生错误',e);
      return '';
    }
  };

  async uploadArticle(data){
    const { ctx } = this;
    console.log(data.toString());
    data.page = ctx.helper.escape(data.page);
    data.like = 0;
    try{
      await ctx.model.Publicarticles.create(data);
    }catch (e) {
      console.log('上传文章到数据库发生的错误' + e);
      return false;
    }
    return true;
  }
}

module.exports = PubArticlesService;
