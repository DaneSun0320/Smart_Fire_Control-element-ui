import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userDetailDialog: false,
    userInfoDialog: false, // 用户个人中心控制
    userNickName: '',
    userAvatar: require('@/assets/avatar.png'), // 用户头像
    email: 'example@xxx.com',
    level: parseInt(window.localStorage.getItem('level')),
    token: window.localStorage.getItem('token')
  },
  getters: {
    getUserInfoDialog (state) {
      return state.userInfoDialog
    }
  },
  mutations: {
    showUserInfoDialog (state) {
      state.userInfoDialog = true
      console.debug('全局弹窗的状态：' + state.userInfoDialog)
    },
    closeUserInfoDialog (state) {
      state.userInfoDialog = false
      console.debug('全局弹窗的状态：' + state.userInfoDialog)
    }
  }
})
