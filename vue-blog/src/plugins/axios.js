'use strict'

import Vue from 'vue'
import axios from "axios"
import store from '../store/index'


// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const config = {
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
     baseURL: "/api/" ,
     timeout: 60 * 1000 ,
     withCredentials: true ,
}

const _axios = axios.create(config)

_axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent

    // 从vuex里获取token
    const token = store.state.token;
    // 如果token存在就在请求头里添加
    token && (config.headers.token = token);
    return config;

  },
  function (error) {
    // Do something with request error
    error.data = {};
    error.data.msg = "服务器异常";
    return Promise.reject(error);
  }
)

// Add a response interceptor
_axios.interceptors.response.use(
  function (response) {
    // Do something with response data
    if(response.data.code===401){
      localStorage.removeItem("token");
    }
    return response
  },
  function (error) {
    // Do something with response error
    return Promise.reject(error)
  }
)

// Plugin.install = function (Vue, options) {
//   Vue.axios = _axios
//   window.axios = _axios
//   Object.defineProperties(Vue.prototype, {
//     axios: {
//       get () {
//         return _axios
//       },
//       post (){
//         return _axios
//       }
//     },
//     $axios: {
//       post (){
//         return _axios
//       },
//       get () {
//         return _axios
//       },
//     }
//   })
// }
//
// Vue.use(Plugin)
//
// export default Plugin

export default _axios
