// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

// 导入路由配置
import router from './router'

// 导入element-ui
import ElementUI from 'element-ui'
// 导入element-ui的样式文件
import 'element-ui/lib/theme-chalk/index.css'

// 引入自己的样式
import './assets/css/inde.css'

// 导入axios
import axios from 'axios'

// 如何做到能够在任意组件中使用axios
// 方式：价格axios添加到Vue原型中，就可以通过任意实例直接用this来直接获取到axios
// 注意：对于不是Vue插件，但是还想再任意组件中使用的模块，可以添加到Vue原型中
Vue.prototype.$http = axios

// 配置基准路径
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1'

/*
    请求拦截器
    说明：因为只要是axios发送的请求，都会执行请求拦截器中的代码，所以，可以在请求拦截器中，一次性添加请求头
*/

axios.interceptors.request.use(config => {
  console.log(config)
  // 统一添加Authorization 请求头
  config.headers.Authorization = localStorage.getItem('token')
  // 一定要返回config
  return config
})

// 安装插件
Vue.use(ElementUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  // 关联
  router,
  components: {
    App
  },
  template: '<App/>'
})
