<template>
  <el-container style="height:100%">
    <UserInfo></UserInfo>
    <el-header>
      <Header></Header>
    </el-header>
    <el-container>
      <Aside></Aside>
      <el-main>
        <router-view>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<style lang="scss" scoped>
  .el-header{
    width: 100%;
    background-color: #2c6df8;
    color: #2c6df8;
    text-align: center;
  }
  .el-main{
    padding: 50px;
  }
  </style>
<script>
import Aside from '@/components/Aside.vue'
import Header from '@/components/Header.vue'
import UserInfo from '@/components/UserInfo'
export default {
  name: 'Main',
  components: { Header, Aside, UserInfo }
}
</script>
