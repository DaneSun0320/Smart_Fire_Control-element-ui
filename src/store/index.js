import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfoDialog: false, // 用户个人中心控制
    userNickName: '管理员',
    userAvatar: require('@/assets/avatar.png'), // 用户头像
    email: 'example@xxx.com'
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
