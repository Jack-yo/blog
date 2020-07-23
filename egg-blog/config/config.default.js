/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1589471479736_9521';

  // add your middleware config here
  config.middleware = [];

  // disable csrf for post
  config.security = {
    csrf: {
      enable: false,
    },
  };

  // use secret for encryption
  config.jwt = {
    secret: '123456',
  };

  // the config of sequelize
  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    database: 'blog',
    username: 'root',
    password: '19841029Qq',
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
