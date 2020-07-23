'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);

  // 登录
  router.post('/user/login', controller.userLogin.login);

  // 注册
  router.post('/user/register', controller.userRegister.register);
};
