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
              v-model="Sensitivity"
              :step="50"
              :marks="{0: '低',50: '中',100: '高'}"
              show-stops
              :show-tooltip="false"
              @change = "setSensitive"
            >
            </el-slider>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="hover" class="card-data">
          <el-row type="flex"  justify="space-between">
            <div class="card-title">刷新时间</div>
          </el-row>
          <el-row type="flex" justify="space-between" class="setting-item ">
            <div class="setting-title">
              传感器数据刷新间隔
            </div>
            <div class="setting-switch">
              <el-input-number v-model="refesh" :precision="0" :min="2" :step="1" :max="120"></el-input-number>
            </div>
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
      refesh: 2,
      Sensitivity: 50
    }
  },
  methods: {
    getSetting: function () {
      var that = this
      this.$axios.get('/getSetting', {
        headers: {
          Authorization: that.$store.state.token
        }
      })
        .then(function (response) {
          // 判断服务器返回状态码
          var status = response.data.status
          if (status) {
            that.alert = JSON.parse(response.data.data).alert
            that.spary = JSON.parse(response.data.data).spary
            that.electric = JSON.parse(response.data.data).electric
          }
        })
    },
    getlevel: function () {
      var that = this
      this.$axios.get('/getlevel', {
        headers: {
          Authorization: that.$store.state.token
        }
      })
        .then(function (response) {
          // 判断服务器返回状态码
          var status = response.data.status
          if (status) {
            that.level = JSON.parse(response.data.data).level === 0 ? 0 : JSON.parse(response.data.data).level === 1 ? 50 : 100
          }
        })
    },
    timer: function () {
      return setTimeout(() => {
        this.getSetting()
        this.getlevel()
      }, 3000)
    },
    setting: function () {
      var that = this
      var data = {
        electric: this.electric,
        alert: this.alert,
        spary: this.spary
      }
      this.$axios.post('/setting', this.$qs.stringify(data), {
        headers: {
          Authorization: that.$store.state.token
        }
      })
        .then(function (response) {
          if (response.data.status === 1) {
            that.$message.success('设置成功！')
            return null
          }
        })
    },
    setSensitive: function () {
      var that = this
      var level = this.level
      level = level === 0 ? 0 : level === 50 ? 1 : 2
      this.$axios.post('/setlevel', this.$qs.stringify({ level: level }), {
        headers: {
          Authorization: that.$store.state.token
        }
      })
        .then(function (response) {
          if (response.data.status === 1) {
            that.$message.success('灵敏度:' + level === 0 ? '低' : level === 1 ? '中' : '高')
            return null
          }
        })
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      this.getTableData()
      this.getDeviceStatus()
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
