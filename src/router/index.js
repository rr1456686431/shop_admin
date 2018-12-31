/*
  配置路由
*/

import Vue from 'vue'
import VueRouter from 'vue-router'

// 导入组件：
import Login from '@/components/login/Login'
import Home from '@/components/home/Home'

// 安装插件
Vue.use(VueRouter)

// 创建路由实例，并导出
const router = new VueRouter({
  routes: [
    { path: '/login', component: Login, name: 'login' },
    {
      path: '/home',
      component: Home,
      name: 'home'
    }
  ]
})

router.beforeEach((to, from, next) => {
  /*
    登录访问控制的思路：
    1 判断访问的是不是登录页面
    2 如果是，直接 next() 放行
    3 如果不是，就判断有没有登录
    4 如果没有登录，就跳转到登录页面，让用户登录
    5 如果登录了，就直接 next() 放行
  */
  if (to.path === '/login') {
    next()
    return
  }

  const token = localStorage.getItem('token')
  if (token) {
    // 登录
    next()
  } else {
    // 没有登录
    next('/login')
  }
})

// 导航守卫
// 全局导航守卫：任何一个路由的切换，都会经过全局导航守卫
/* router.beforeEach((to, from, next) => {
  // to 到哪去，也就是要导航到的路由
  // from 从哪来，也就是从哪个路由切换到了当前路由
  // next() 方法是放行的信号，必须调用这个方法，那么，组件的内容才会展示在页面中
  console.log('切换路由了，导航守卫执行了', localStorage.getItem('token'))
  // console.log('to:', to)
  // console.log('from:', from)

  next()
  // 其他使用方式：
  // next('/login') 参数 /login 就表示要跳转到的路由path，也就相当于：跳转路由
  // next('/login')
}) */

export default router
