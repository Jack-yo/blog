'use strict';

const Controller = require('egg').Controller;

class commentController extends Controller{

  async getComment(){
    const { ctx } = this;
    let data = ctx.request.body;

    const isExistName = await ctx.service.user.isExistName(data.name);
    const isValidToken = await ctx.service.user.isValidToken(data.token);

    if(isExistName && isValidToken){
      const result = await ctx.service.comment.getComment(data.pageId);
      ctx.body = result ? {code:200,result:result}:{code:500,msg:'无评论数据'};
    }else{
      ctx.body = {code:400,msg:'用户信息有误'};
    }
  }

  async writeComment (){
    const { ctx } = this;
    let data = ctx.request.body;
    console.log(data.name);
    const isExistName = await ctx.service.user.isExistName(data.name);
    const isValidToken = await ctx.service.user.isValidToken(data.token);

    if(isExistName && isValidToken){
      const result = await ctx.service.comment.writeComment(data);
      ctx.body = result?{code:200,msg:'上传文章成功'}:{code:500,msg:'服务器繁忙，请重试'};
    }else{
      ctx.body = {code:400,msg:'上传文章失败，请重试'};
    }
  }
}

module.exports = commentController;
