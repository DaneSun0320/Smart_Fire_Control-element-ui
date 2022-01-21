<template>
    <header>
        <div class="l-content">
            <h3 style="color: #ffffff">智慧消防系统</h3>
        </div>
        <div class="r-content">
            <el-dropdown trigger="click" size="mini" @command="handleCommand">
                <span class="el-dropdown-link">
                    <img :src="this.$store.state.userAvatar" class="user-avatar"/>
                </span>
                <el-dropdown-menu slot="dropdown" >
                    <el-dropdown-item  command="userInfo">个人中心</el-dropdown-item>
                    <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </header>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      userAvatar: require('../assets/avatar.png')
    }
  },
  methods: {
    // 弹窗处理函数
    handleCommand (command) {
      if (command === 'userInfo') {
        this.$store.commit('showUserInfoDialog')
      } else {
        window.localStorage.clear()
        window.sessionStorage.clear()
        this.$store.state.token = null
        this.$router.push('/login')
      }
    }
  }
}

</script>

<style lang="scss" scoped>
header{
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: space-between;
}
.l-content{
    display: flex;
    align-items: center;
}
.r-content{
    .user-avatar{
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
}
</style>
