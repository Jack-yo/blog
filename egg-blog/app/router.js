'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // //同步数据库
  // app.beforeStart(async ()=>{
  //   await app.model.sync({alter:true});
  // });

  //用户主界面
  router.post('/', controller.home.index);

  // 登录
  router.post('/user/login', controller.userLogin.login);

  // 注册
  router.post('/user/register', controller.userRegister.register);

  //获取发布文章
  router.post('/getArticles', controller.home.index);

  //发布文章
  router.post('/publicArticle',controller.uploadArticle.publishArticle);

  //草稿箱文章
  router.post('/editingArticle',controller.uploadArticle.editingArticle);

  //获取草稿箱文章
  router.post('/getEditingArticles',controller.home.draftbox);
};
