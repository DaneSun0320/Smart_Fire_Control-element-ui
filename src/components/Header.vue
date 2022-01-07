<template>
    <header>
        <div class="l-content">
            <h3 style="color: #ffffff">智慧消防系统</h3>
        </div>
        <div class="r-content">
            <el-dropdown trigger="click" size="mini">
                <span class="el-dropdown-link">
                    <img :src="userAvatar" class="user-avatar"/>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>个人中心</el-dropdown-item>
                    <el-dropdown-item>退出登录</el-dropdown-item>
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
      userAvatar: require('../assets/avatar.jpg')
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
