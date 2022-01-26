import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Viser from 'viser-vue'
import axios from 'axios'
import md5 from 'js-md5'
import qs from 'qs'

import {
  Button,
  Container,
  Header,
  Aside,
  Main,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Row,
  Col,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Card,
  Divider,
  Backtop,
  Icon,
  Pagination,
  Table,
  TableColumn,
  Switch,
  InputNumber,
  Input,
  Dialog,
  Upload,
  Form,
  FormItem,
  Empty,
  Slider,
  MessageBox,
  Message,
  Notification
} from 'element-ui'

// 引入MD5
Vue.prototype.$md5 = md5
// 引入axios
Vue.prototype.$axios = axios
// 引入Notification
Vue.prototype.Notification = Notification
// 引入Message
Vue.prototype.$message = Message
// 引入MessageBox
Vue.prototype.$messageBox = MessageBox
// 引入qs
Vue.prototype.$qs = qs

Vue.config.productionTip = false
Vue.use(Viser)
Vue.use(Button)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Row)
Vue.use(Col)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Card)
Vue.use(Divider)
Vue.use(Backtop)
Vue.use(Icon)
Vue.use(Pagination)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Switch)
Vue.use(InputNumber)
Vue.use(Input)
Vue.use(Dialog)
Vue.use(Upload)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Empty)
Vue.use(Slider)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

/**
 * axios全局配置
 */

axios.defaults.timeout = 3000
axios.defaults.baseURL = 'http://127.0.0.1:8081' // 本地端口和地址
axios.defaults.headers.Authorization = window.localStorage.getItem('token')
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.retry = 4
axios.defaults.retryDelay = 1000

/**
 * axios拦截器配置
 */

axios.interceptors.response.use(
  response => {
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
    // 否则的话抛出错误
    if (response.status === 200) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(response)
    }
  },
  // 服务器状态码不是2开头的的情况
  // 这里可以跟你们的后台开发人员协商好统一的错误状态码
  // 然后根据返回的状态码进行一些操作，例如登录过期提示，错误提示等等
  // 下面列举几个常见的操作，其他需求可自行扩展
  error => {
    if (error && error.stack.indexOf('timeout') > -1) { Message.error('请求超时，请检查服务程序状态！') }
    if (error.response.status === 401) {
      console.log('拦截器捕获401')
      Message.error('登录过期，请重新登录！')
      window.localStorage.clear()
      // 跳转至登录页面
      router.push('/login')
    } else if (error.response.status === 404) {
      Message.error('数据接口错误！')
    } else if (error.response.status === 500) {
      Message.error('服务程序未启动！')
    }
  }
)
