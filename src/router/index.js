import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import Login from '../views/Login/Login'
import axios from 'axios'
import { Message } from 'element-ui'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Main,
    children: [{
      path: '/',
      name: 'OverView',
      component: () => import('../views/OverView/OverView')
    },
    {
      path: '/control',
      name: 'Control',
      component: () => import('../views/Control/Control')
    },
    {
      path: '/logs',
      name: 'Logs',
      component: () => import('../views/Logs/Logs')
    },
    {
      path: '/setting',
      name: 'Setting',
      component: () => import('../views/Setting/Setting')
    },
    {
      path: '/user',
      name: 'User',
      component: () => import('../views/User/User')
    }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

axios.defaults.timeout = 3000
axios.defaults.baseURL = 'http://127.0.0.1:8081' // 本地端口和地址
axios.defaults.headers.Authorization = window.localStorage.getItem('token')
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

/**
 * 设置路由守卫，拦截未登录请求
 */
router.beforeEach((to, from, next) => {
  console.log('form:' + from.path + '/to:' + to.path)
  // 如果访问的是登录界面则直接放行
  if (to.path === '/login') return next()
  // 访问非登录界面
  else {
    sessionStorage.setItem('referrer', to.path)
    // 获取用户页面token信息
    const token = window.localStorage.getItem('token')
    // 如果token数据为null则跳转到指定路径
    if (!token) {
      // 储存来源路由
      Message.error('请先登录！')
      return next('/login')
    } else {
      // 若token不为空，校验token
      axios.get('/verify', {
        headers: {
          Authorization: token
        }
      })
        .then(function (response) {
          // 判断服务器返回状态码
          var status = response.data.status
          if (status) {
            // 校验通过放行
            return next()
          } else {
            // 校验未通过，保存来源路径
            Message.error('登录过期，请重新登录！')
            // 跳转至登录页面
            return next('/login')
          }
        })
    }
  }
})

export default router
