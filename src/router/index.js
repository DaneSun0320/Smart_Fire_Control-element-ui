import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import Login from '../views/Login/Login'
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
/**
 * 设置路由守卫，拦截未登录请求
 */
router.beforeEach((to, from, next) => {
// 如果访问的是登录界面则直接放行
  if (to.path === '/login') return next()
  else return next('/login')
  /*
  // 获取用户页面token信息
  const token = window.sessionStorage.getItem('token')
  // 如果token数据为null则跳转到指定路径
  if (!token) return next("/login")
  next() */
})
export default router
