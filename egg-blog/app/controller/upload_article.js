'use strict';

const Controller = require('egg').Controller;

class uploadArticleController extends Controller{

  async editingArticle(){
    const { ctx } = this;
    let data = ctx.request.body;

    const isExistName = await ctx.service.user.isExistName(data.name);
    const isValidToken = await ctx.service.user.isValidToken(data.token);

    if(isExistName && isValidToken){
      const result = await ctx.service.editingarticles.uploadArticle(data.name,data.token,data.title,data.editingarticle);
      ctx.body = result?{code:200,msg:'上传草稿文章成功'}:{code:500,msg:'服务器繁忙，请重试'};
    }else{
      ctx.body = {code:400,msg:'上传草稿文章失败，请重试'};
    }
  }

  async publishArticle (){
    const { ctx } = this;
    let data = ctx.request.body;

    const isExistName = await ctx.service.user.isExistName(data.name);
    const isValidToken = await ctx.service.user.isValidToken(data.token);

    if(isExistName && isValidToken){
      const result = await ctx.service.publicarticles.uploadArticle(data.name,data.token,data.title,data.pubarticle);
      ctx.body = result?{code:200,msg:'上传文章成功'}:{code:500,msg:'服务器繁忙，请重试'};
    }else{
      ctx.body = {code:400,msg:'上传文章失败，请重试'};
    }
  }
}

module.exports = uploadArticleController;
