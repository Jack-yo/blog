'use strict';

const Service = require('egg').Service;

class CommentService extends Service{
  async getComment(pageId){
    const {ctx} = this;

    try{
      const data = await ctx.model.Comment.findAll({
        where:{pageId},
      });
      return data;

    }catch (e) {
      console.log('寻找评论发生错误',e);
      return '';
    }
  };

  async writeComment(data){
    const { ctx } = this;
    console.log(data.toString());
    data.comment = ctx.helper.escape(data.comment);

    try{
      await ctx.model.Comment.create(data);
    }catch (e) {
      console.log('上传文章到数据库发生的错误' + e);
      return false;
    }
    return true;
  }
}

module.exports = CommentService;
