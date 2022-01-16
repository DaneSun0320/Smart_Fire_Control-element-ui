<template>
  <div class="page-module login-container backgroundCover flex width_100 height_100">
    <div class="login-panel" @keyup.enter="onSubmit">
      <div class="head-text align_center">
        <img src="./images/login_logo.png">
      </div>
      <el-form class="login-form" size="medium" :model="form" :rules="rules" ref="form">
        <el-form-item prop="username">
          <el-input placeholder="请输入账户名：" autofocus v-model="form.username"/>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="请输入账户密码：" v-model="form.password"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="width_100" icon="el-icon-check" @click="submit" :loading="submitLoad"/>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  name: 'Login',
  data () {
    return {
      form: {
        username: null,
        password: null
      },
      rules: {
        username: [{ required: true, message: '请输入账户名！', trigger: 'blur' }],
        password: [{ required: true, message: '请输入账户密码！', trigger: 'blur' }]
      },
      submitLoad: false
    }
  },
  methods: {
    submit: function () {
      this.submitLoad = true
      setTimeout(() => {
        this.submitLoad = false
      }, 1000)
    }
  }
}
</script>

<style lang="scss" type="text/scss" rel="stylesheet/scss">
  .login-container {
    min-height: 100vh;
    display: flex;
    background-image: url(./images/login_body.jpg);
    width: 100%;
    z-index: 1;
  }
  .login-container:after{
    content: "";
    width:100%;
    height:100%;
    position: absolute;
    left:0;
    top:0;
    background: inherit;
    filter: blur(12px);
    z-index: 2;
  }
  .login-panel {
    z-index: 999;
    margin: auto;
    align-items: center;
    justify-content: center;
    padding: 25px 15px;
    width: 400px;
    border-radius: 18px;
    background-color: #fff;
  }
  .head-text {
    margin-bottom: 25px;
  }
</style>
