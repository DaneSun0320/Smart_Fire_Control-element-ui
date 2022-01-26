<template>
  <div>
    <el-row :gutter="40">
      <el-col :span="12">
        <el-card shadow="hover" class="card-data">
          <el-row type="flex"  justify="space-between">
            <div class="card-title">报警自动控制</div>
          </el-row>
          <el-row type="flex" justify="space-between" class="setting-item ">
            <div class="setting-title">
              电力系统
            </div>
            <div class="setting-switch">
              <el-switch
                v-model="electric"
                active-text="自动"
                inactive-text="手动"
                @change="setting"
              >
              </el-switch>
            </div>
          </el-row>
          <el-row type="flex" justify="space-between" class="setting-item ">
            <div class="setting-title">
              蜂鸣器
            </div>
            <div class="setting-switch">
              <el-switch
                v-model="alert"
                active-text="自动"
                inactive-text="手动"
                @change="setting"
              >
              </el-switch>
            </div>
          </el-row>
          <el-row type="flex" justify="space-between" class="setting-item ">
            <div class="setting-title">
              消防喷雾
            </div>
            <div class="setting-switch">
              <el-switch
                v-model="spary"
                active-text="自动"
                inactive-text="手动"
                @change="setting"
              >
              </el-switch>
            </div>
          </el-row>
        </el-card>
      </el-col>

      <el-col :span="12">
        <el-card shadow="hover" class="card-data">
          <el-row type="flex"  justify="space-between">
            <div class="card-title">灵敏度</div>
          </el-row >
          <el-row>
            <el-slider
              v-model="sensitivity"
              :step="50"
              :marks="{0: '低',50: '中',100: '高'}"
              show-stops
              :show-tooltip="false"
              @change = "setting"
            >
            </el-slider>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>

</template>

<script>
export default {
  name: 'Setting',
  data () {
    return {
      electric: true,
      alert: true,
      spary: true,
      sensitivity: 50
    }
  },
  methods: {
    getSetting: function () {
      var that = this
      this.$axios.get('/getsetting', {
        headers: {
          Authorization: that.$store.state.token
        }
      })
        .then(function (response) {
          // 判断服务器返回状态码
          var status = response.data.status
          if (status) {
            console.log(response.data)
            that.alert = response.data.data.alert
            that.spary = response.data.data.spary
            that.electric = response.data.data.electric
            that.sensitivity = response.data.data.level === 0 ? 0 : response.data.data.level === 1 ? 50 : 100
          } else {
            that.$message.error('与设备连接出现错误，请检查设备连接！')
            clearTimeout(that.timer)
          }
        })
    },
    timer: function () {
      return setTimeout(() => {
        this.getSetting()
      }, 3000)
    },
    setting: function () {
      var that = this
      var level = this.sensitivity === 0 ? 0 : this.sensitivity === 50 ? 1 : 2
      var data = {
        electric: this.electric,
        alert: this.alert,
        spary: this.spary,
        level: level
      }
      this.$axios.post('/setting', this.$qs.stringify(data), {
        headers: {
          Authorization: that.$store.state.token
        }
      })
        .then(function (response) {
          if (response.data.status === 1) {
            that.Notification({
              title: '提示',
              message: '设置成功',
              showClose: false,
              type: 'success',
              position: 'top-right',
              duration: 1000
            })
            return null
          }
        })
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      this.getSetting()
    })
  },
  destroyed () {
    // 页面销毁时清除数据请求定时器
    clearTimeout(this.timer)
  }
}
</script>

<style scoped>
  .el-card {
    border-radius: 18px;
  }
  .card-title{
    display: flex;
    text-align: start;
    margin-left: 10px;
    margin-bottom: 15px;
    align-items: center;
  }
  .card-data{
    margin-bottom: 30px;
    min-height: 200px;
  }
  .setting-item{
    display: flex;
    padding: 10px;
    border-radius: 10px;
  }
  .setting-item:hover{
    background-color: #f1f7f7;
  }
  .setting-title{
    margin: auto;
    margin-left: 10px;
    color: #6b8196;

    text-align: start;
    justify-content: center;
  }
  .setting-switch{
    margin-right: 10px;
  }

</style>
