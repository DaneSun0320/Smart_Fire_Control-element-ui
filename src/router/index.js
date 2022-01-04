import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
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
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
