import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Viser from 'viser-vue'
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
  Notification
} from 'element-ui'
Vue.prototype.Notification = Notification
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
