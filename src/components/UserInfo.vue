<template>
  <el-dialog title="个人中心" :visible.sync="this.$store.state.userInfoDialog" :before-close="handleClose">
    <el-row :gutter="20">
      <el-col :span="24">
        <el-upload
          class=""
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false">
          <img :src="this.$store.state.userAvatar" class="avatar">
        </el-upload>
        <div class="nickName">{{this.$store.state.userNickName}}</div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-form ref="form" :model="form" label-width="80px" :disabled="!sumbit" class="form">
        <el-form-item label="昵称" >
          <el-input v-model="form.nickName"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" >
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="密码" >
          <el-input v-model="form.password" show-password></el-input>
        </el-form-item>
      </el-form>
      <el-button style="margin-top: 20px;" type="primary" @click="onHandle">{{buttonText}}</el-button>
    </el-row>
  </el-dialog>
</template>

<script>
export default {
  name: 'UserInfo',
  data () {
    return {
      sumbit: false,
      form: {
        nickName: this.$store.state.userNickName,
        password: '12345678901234567890',
        email: this.$store.state.email

      }
    }
  },
  methods: {
    handleClose: function () {
      this.$store.commit('closeUserInfoDialog')
    },
    onHandle: function () {
      if (this.sumbit) {
        // 提交表单
        console.log('提交表单')
        // 修改表单状态
        this.sumbit = false
        // 填充密码框
        this.form.password = '12345678901234567890'
      } else {
        // 修改表单

        // 修改表单状态
        this.sumbit = true
        // 将密码框置空
        this.form.password = ''
      }
    }
  },
  computed: {
    buttonText: function () {
      return this.sumbit ? '提交' : '修改'
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

<style>
  .el-dialog{
    border-radius: 25px;
  }
</style>
