import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import crypto from 'crypto'
import 'element-ui/lib/theme-chalk/index.css'
import axios from './plugins/axios'

Vue.use(ElementUI)

// 全局配置
Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.prototype.$crypto = crypto;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
