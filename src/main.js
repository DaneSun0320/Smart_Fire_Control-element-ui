import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import echarts from 'echarts'
import {
  Button,
  Table,
  TableColumn,
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
  DropdownItem
} from 'element-ui'
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false
Vue.use(Button)
Vue.use(Table)
Vue.use(TableColumn)
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
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
