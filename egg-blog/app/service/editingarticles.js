'use strict';

const Service = require('egg').Service;

class EditingArticlesService extends Service{
  async getEditingArticles(name){
    const {ctx} = this;

    try{
      const data = await ctx.model.Editingarticles.findAll({
        where:{name},
      });
      return data;

    }catch (e) {
      console.log('寻找文章发生错误',e);
      return '';
    }
  };

  async uploadArticle(name,token,title,article){
    const { ctx } = this;
    const page = ctx.helper.escape(article);

    try{
      await ctx.model.Editingarticles.create({name,token,title,page});
    }catch (e) {
      console.log('上传草稿文章到数据库发生的错误' + e);
      return false;
    }
    return true;
  }
}

module.exports =  EditingArticlesService;
