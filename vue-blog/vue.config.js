
// vue.config.js

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/production-sub-path/' : '/', // 部署应用包时的基本URL(这里可以看一下官方说明)
  outputDir: 'dist', // 打包时生成的生产环境构建稳健的目录
  assetsDir: 'static', // 放置生成的静态资源的目录
  filenameHashing: true,
  lintOnSave: true, // eslint-loader会将lint错误输出为编译警告
  productionSourceMap: false, // 将其设置为false，以加速生产环境的构建
  configureWebpack: {
    plugins: []
  },
  // chainWebpack: config => {
  //   // 链式配置
  // },
  // css: {
  //   // css预设器配置项
  //   loaderOptions: {
  //     css: {
  //
  //     },
  //     postcss: {
  //
  //     }
  //   }
  // },
  devServer: {
    // open: true,
    host: '127.0.0.1',
    port: 8080,
    https: false,
    hotOnly: false,
    // proxy: null,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:7001',
        ws: true,
        changOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    },
    // before: app => {}
  },
  // 第三方插件配置
  pluginOptions: {}
}
