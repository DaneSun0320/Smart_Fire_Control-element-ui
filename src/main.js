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
  Message,
  Notification
} from 'element-ui'

axios.defaults.timeout = 3000
axios.defaults.baseURL = 'http://127.0.0.1:8081' // 本地端口和地址
axios.defaults.headers.Authorization = window.localStorage.getItem('token')
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

// 引入MD5
Vue.prototype.$md5 = md5
// 引入axios
Vue.prototype.$axios = axios
// 引入Notification
Vue.prototype.Notification = Notification
// 引入Message
Vue.prototype.$message = Message
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
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
