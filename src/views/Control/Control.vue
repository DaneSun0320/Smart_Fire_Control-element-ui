<template>
  <div>
    <el-row :gutter="40" >
      <el-col :span="24">
        <el-card shadow="hover" class="card-data">
          <el-row :gutter="40" type="flex" >
            <el-col :span="6">
              <img :src="electric" style="height: 70px;width: 70px;"/>
            </el-col>
            <el-col :span="14" style="display:flex;text-align: center;justify-content: center;">
              <span style="font-size: 25px;margin: auto;">电力系统</span>
            </el-col>
            <el-col :span="4" style="display:flex;text-align: center;justify-content: center;">
              <el-switch
                v-model="electricControlSwitch"
                active-color="#13ce66"
                inactive-color="#ff4949"
                style="margin:auto;"
                @change="electricControl"
              >
              </el-switch>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="40">
      <el-col :span="12">
        <el-card shadow="hover" class="card-data" >
          <el-row :gutter="20" type="flex" >
            <el-col :span="6">
              <img :src="alert" style="height: 70px;width: 70px;"/>
            </el-col>
            <el-col :span="14" style="display:flex;text-align: center;justify-content: center;">
              <div style="font-size: 20px;margin: auto;">蜂鸣器</div>
            </el-col>
          <el-col :span="4" style="display:flex;align-items: center;">
            <el-switch
              v-model="alertSwitch"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="alertControl"
            >
            </el-switch>
          </el-col>
        </el-row>
      </el-card>
    </el-col>
    <el-col :span="12">
      <el-card shadow="hover" class="card-data" >
        <el-row :gutter="20" type="flex">
          <el-col :span="6">
            <img :src="fire" style="height: 70px;width: 70px;"/>
          </el-col>
          <el-col :span="14" style="display:flex;text-align: center;justify-content: center;">
            <div style="font-size: 20px;margin: auto;">消防喷雾</div>
          </el-col>
          <el-col :span="4" style="display:flex;align-items: center;">
            <el-switch
              v-model="fireControlSwitch"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="fireControl"
            >
            </el-switch>
          </el-col>
        </el-row>
      </el-card>
    </el-col>
  </el-row>
  <el-row :gutter="40">
    <el-col :span="24">
      <el-card shadow="hover" style="min-height: 200px;" >
        <el-row type="flex"  justify="space-between">
          <div class="card-title">控制记录</div>
          <el-button class="card-button" size="small" icon="el-icon-download" @click="exportData" round>导出</el-button>
        </el-row>
        <el-row type="flex">
          <el-table
            :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
            :default-sort = "{prop: 'createTime', order: 'descending'}"
            stripe
            style="width: 80%" class="table">
            <el-table-column
              prop="createTime"
              :formatter="formatDate"
              label="时间"
              width="180">
            </el-table-column>
            <el-table-column
              prop="device"
              label="设备">
            </el-table-column>
            <el-table-column
              prop="event"
              label="动作">
            </el-table-column>
            <el-table-column
              prop="operator"
              label="操作用户"
              width="180">
            </el-table-column>
          </el-table>
        </el-row>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[1, 2, 5, 50]"
          :page-size="pageSize"
          layout="prev, pager, next"
          :total="parseInt(total)"
          style="margin-top: 10px;">
        </el-pagination>
      </el-card>
    </el-col>
  </el-row>
  </div>
</template>
<script>

import moment from 'moment'

export default {
  name: 'Control',
  data () {
    return {
      alert: require('../../assets/alert.png'),
      electric: require('../../assets/electric.png'),
      fire: require('../../assets/fireControl.png'),
      alertSwitch: false,
      fireControlSwitch: false,
      electricControlSwitch: true,
      alertTime: '--',
      fireTime: '--',
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      total: 0
    }
  },
  methods: {
    exportData: function () {
      require.ensure([], () => {
        // eslint-disable-next-line camelcase
        const { export_json_to_excel } = require('../../vendor/Export2Excel.js')
        const tHeader = ['时间', '控制设备', '用户', '事件']
        // 上面设置Excel的表格第一行的标题
        const filterVal = ['createTime', 'device', 'operator', 'event']
        // 上面的index、nickName、name是tableData里对象的属性
        const list = this.tableData // 把data里的tableData存到list
        const data = this.formatJson(filterVal, list)
        export_json_to_excel(tHeader, data, '智慧消防系统-控制日志')
      })
    },
    formatJson (filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
    getDeviceStatus: function () {
      var that = this
      this.$axios.get('/device', {
        headers: {
          Authorization: that.$store.state.token
        }
      })
        .then(function (response) {
          // 判断服务器返回状态码
          var status = response.data.status
          if (status) {
            that.alertSwitch = JSON.parse(response.data.data).alert
            that.fireControlSwitch = JSON.parse(response.data.data).spary
            that.electricControlSwitch = JSON.parse(response.data.data).electric
          }
        })
    },
    getTableData: function () {
      var that = this
      this.$axios.get('/controllog', {
        headers: {
          Authorization: that.$store.state.token
        }
      })
        .then(function (response) {
          // 判断服务器返回状态码
          var status = response.data.status
          if (status) {
            that.total = response.data.data.length
            that.tableData = response.data.data
          }
        })
    },
    electricControl: function (event) {
      var that = this
      this.$axios.get(event ? '/electricon' : '/electricoff', {
        headers: {
          Authorization: that.$store.state.token
        }
      })
        .then(function (response) {
          if (response.data.status === 1) {
            that.electricChange(event)
            setTimeout(function () {
              that.getTableData()
            }, 500)
          } else {
            that.electricControlSwitch = !that.electricControlSwitch
            that.$message.error('无法与设备通信，请检查设备状态及网络线路！')
          }
        })
    },
    alertControl: function (event) {
      var that = this
      this.$axios.get(event ? '/alerton' : '/alertoff', {
        headers: {
          Authorization: that.$store.state.token
        }
      })
        .then(function (response) {
          if (response.data.status === 1) {
            that.alertChange(event)
            setTimeout(function () {
              that.getTableData()
            }, 500)
          } else {
            that.alertSwitch = !that.alertSwitch
            that.$message.error('无法与设备通信，请检查设备状态及网络线路！')
          }
        })
    },
    fireControl: function (event) {
      var that = this
      this.$axios.get(event ? '/sparyon' : 'sparyoff', {
        headers: {
          Authorization: that.$store.state.token
        }
      })
        .then(function (response) {
          if (response.data.status === 1) {
            that.fireChange(event)
            setTimeout(function () {
              that.getTableData()
            }, 500)
          } else {
            that.fireControlSwitch = !that.fireControlSwitch
            that.$message.error('无法与设备通信，请检查设备状态及网络线路！')
          }
        })
    },
    electricChange: function (event) {
      console.debug(event)
      if (event) {
        this.Notification({
          title: '提示',
          message: '电力系统已恢复',
          showClose: false,
          type: 'success',
          position: 'top-left',
          duration: 1000
        })
      } else {
        this.Notification({
          title: '警告',
          message: '电力系统已关闭',
          showClose: false,
          type: 'warning',
          position: 'top-left',
          duration: 1000
        })
      }
    },
    alertChange: function (event) {
      if (event) {
        this.alertTime = new Date().toLocaleString()
        this.Notification({
          title: '提示',
          message: '蜂鸣器已开启',
          showClose: false,
          type: 'success',
          position: 'top-left',
          duration: 1000
        })
      } else {
        this.alertTime = '未启动'
        this.Notification({
          title: '警告',
          message: '蜂鸣器已关闭',
          showClose: false,
          type: 'warning',
          position: 'top-left',
          duration: 1000
        })
      }
    },
    fireChange: function (event) {
      this.fireTime = new Date().toLocaleString()
      if (event) {
        this.Notification({
          title: '提示',
          message: '喷雾器已开启',
          showClose: false,
          type: 'success',
          position: 'top-left',
          duration: 1000
        })
      } else {
        this.fireTime = '未启动'
        this.Notification({
          title: '警告',
          message: '喷雾器已关闭',
          showClose: false,
          type: 'warning',
          position: 'top-left',
          duration: 1000
        })
      }
    },
    formatDate (row, column) {
      var date = row[column.property]

      if (date === undefined) { return '' };

      return moment(date).format('YYYY-MM-DD HH:mm:ss')
    },
    timer: function () {
      return setInterval(() => {
        this.getTableData()
        this.getDeviceStatus()
      }, 60000)
    },
    handleSizeChange (newSize) {
      // pagesize改变触发
      this.pageSize = newSize
    },
    handleCurrentChange (newPage) {
      // 页码改变触发
      this.currentPage = newPage
    }
  },
  mounted: function () {
    var that = this
    this.$nextTick(function () {
      that.getTableData()
      that.timer()
    })
  },
  destroyed () {
    // 页面销毁时清除数据请求定时器
    clearTimeout(this.timer)
    console.log('清除定时器')
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
    align-items: center;
  }
  .card-data{
    height: 120px;
    margin-bottom: 20px;
  }
</style>
