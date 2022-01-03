<template>
  <el-container style="height:100%">
    <el-header>
      <el-row type="flex">
        <el-col :span="3" justify="start"><div style="font-weight: 900;color: #ffffff">物联网管理系统</div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple-light"></div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
      </el-row>
    </el-header>
    <el-container>
      <Aside></Aside>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>
<style lang="scss" scoped>
  .el-header{
    background-color: #2c6df8;
    color: #2c6df8;
    text-align: center;
    line-height: 60px;
  }
  </style>
<script>
// @ is an alias to /src
import Aside from '@/components/Aside.vue'

export default {
  name: 'Main',
  components: {
    Aside
  }
}
</script>
