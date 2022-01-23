<template>
  <!-- Table -->
  <el-dialog title="详细信息" :visible.sync="this.$store.state.userDetailDialog" :before-close="handleClose">
    <el-row :gutter="20">
      <el-col :span="24">
          <img :src="thisUserData.avatar" class="avatar">
        <div class="nickName">{{thisUserData.id}}</div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-form ref="form" label-width="80px" disabled class="form">
        <el-form-item label="邮箱" >
          <el-input v-model="thisUserData.email"></el-input>
        </el-form-item>
        <el-form-item label="权限" >
          <el-input v-model="userLevel"></el-input>
        </el-form-item>
      </el-form>
    </el-row>
  </el-dialog>
</template>

<script>
export default {
  name: 'UserDialog',
  props: ['userData'],
  data () {
    return {
      thisUserData: this.userData,
      isVisible: this.visible
    }
  },
  methods: {
    handleClose: function () {
      this.$store.state.userDetailDialog = false
    }
  },
  watch: {
    userData (newVal) {
      this.thisUserData = newVal
    }
  },
  computed: {
    userLevel: function () {
      if (parseInt(this.thisUserData.level) === 0) return '超级管理员'
      else return '管理员'
    }
  }
}
</script>

<style scoped>
  .avatar{
    background-color: #b3bbc3;
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
  .nickName{
    margin-top: 5px;
    margin-bottom: 30px;
    font-size: 20px;
    font-weight: bold;
    color: #000000;
  }
  .form{
    margin-right: 20px;
  }
</style>
