'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async draftbox(){
    const { ctx } = this;
    const data = ctx.request.body;

    const isExistName = await ctx.service.user.isExistName(data.name);
    const isValidToken = await ctx.service.user.isValidToken(data.token);

    if(isExistName && isValidToken){
      let result = await ctx.service.editingarticles.getEditingArticles(data.name);
      ctx.body = {code:200,result: result};
    }
  }

  async index() {
    const { ctx } = this;
    const data = ctx.request.body;

    const isExistName = await ctx.service.user.isExistName(data.name);
    const isValidToken = await ctx.service.user.isValidToken(data.token);

     if(isExistName && isValidToken){
          let result = await ctx.service.publicarticles.getPubArticles(data.name);
          ctx.body = {code:200,result:result}
     }
  }
}

module.exports = HomeController;
