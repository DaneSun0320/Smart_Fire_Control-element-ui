<template>
  <el-dialog title="个人中心" :visible.sync="this.$store.state.userInfoDialog" :before-close="handleClose">
    <el-row :gutter="20">
      <el-col :span="24">
        <el-upload
          action="http://localhost:8081/upadteavatar"
          :show-file-list="false"
          :headers="avatarHeader"
          :on-success="handleAvatarSuccess"
          :on-error="handleAvatarError"
          :before-upload="beforeAvatarUpload"
        >
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
      avatarHeader: {
        Authorization: this.$store.state.token
      },
      form: {
        nickName: this.$store.state.userNickName,
        password: '12345678901234567890',
        email: this.$store.state.email

      }
    }
  },
  methods: {
    handleAvatarSuccess (res, file) {
      if (res.status === 1) {
        this.$store.state.userAvatar = res.data
        window.localStorage.setItem('avatar', res.data)
        this.$message.success('头像上传成功！')
      } else {
        this.$message.error('头像上传失败！')
      }
    },
    handleAvatarError () {
      this.$message.error('头像上传失败！')
    },
    beforeAvatarUpload (file) {
      console.log(file)
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    handleClose: function () {
      this.$store.commit('closeUserInfoDialog')
      this.sumbit = false
    },
    onHandle: function () {
      var that = this
      var emailCheck = /^\w{3,}(\.\w+)*@[A-z0-9]+(\.[A-z]{2,5}){1,2}$/
      if (this.sumbit) {
        // 校验密码
        if (this.form.nickName === '') {
          this.$message.warning('用户名不为空！')
        }
        if (this.from.password.length < 6) {
          this.$message.warning('密码长度至少为6位！')
        } else if (emailCheck.test(this.from.password.email)) {
          this.$message.warning('邮箱格式不合法！')
        }
        var data = {
          id: that.form.nickName,
          password: this.$md5(that.form.password),
          email: that.form.email
        }
        //
        this.$axios.post('/upadteinfo', this.$qs.stringify(data))
          .then(function (response) {
            // 修改成功
            if (response.data.status === 1) {
            // 修改表单状态
              that.sumbit = false
              // 填充密码框
              that.form.password = '12345678901234567890'
              // 提示
              that.$message.success('修改成功，即将跳转至登录页')
              setTimeout(() => {
                window.localStorage.clear()
                that.$router.push('/login')
              }, 3000)
            } else {
              // 修改失败
              this.$message.warning('用户名已存在！')
            }
          })
        // 修改表单状态
        this.sumbit = false
        // 填充密码框
        this.form.password = '12345678901234567890'
      } else {
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
