import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login'
import Register from '../views/Register'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta:{
      requiresAuth: true,
    },
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  // 路由中设置的needLogin字段就在to当中
  if (localStorage.blogToken) {
    if (to.path === '/') {
      // 登录状态下 访问login.vue页面 会跳到home.vue
      next({ path: '/home' })
    } else {
      next()
    }
  } else {
    // 如果没有session ,访问任何页面。都会进入到 登录页
    if (to.path === '/' || to.path === '/register') { // 如果是登录页面的话，直接next() -->解决注销后的循环执行bug
      next()
    } else { // 否则 跳转到登录页面
      next({ path: '/' })
    }
  }
})

export default router
