<template>
  <div id="app" class="wraper">
    <router-view>
    </router-view>
    <el-backtop target=".wraper" :bottom="20" :right="20">
    </el-backtop>
  </div>
</template>
<script>

</script>
<style lang="scss">
  .wraper {
    height: 100vh;
    overflow-x: hidden;
  }
  body{
    margin: 0;
  }
  #app {
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    font-size:16px;
    font-weight: bold;
    font-style:normal;
    -webkit-font-smoothing: antialiased;
    /*-webkit-text-stroke-width: 0.2px;*/
    -moz-osx-font-smoothing: grayscale;
    /*font-family: Avenir, Helvetica, Arial, sans-serif*/;
    text-align: center;
    background-color: #f1f7f7;
  }
</style>
