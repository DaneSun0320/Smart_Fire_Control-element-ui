<template>
    <div>
        <div class="card-welcome">Hello,</div>
        <div class="card-welcome-user">{{this.$store.state.userNickName}}</div>
    <el-row :gutter="40">
        <el-col :span="18">
            <el-card shadow="hover" style="height: 400px" >
                <el-row type="flex"  justify="space-between">
                    <div class="card-title">实时数据图表</div>
                </el-row>
                <el-row type="flex" class="graph">
                  <img v-if="lineData.length === []" style="width: 350px;height: 350px;margin: auto;" :src="require('/src/assets/nodata.png')">
                  <lineCharts v-else :charData="lineData" :id="'c1'"></lineCharts>
                </el-row>
            </el-card>
        </el-col>
        <el-col :span="6">
            <el-card shadow="hover" class="card-data" >
                <el-row :gutter="20" type="flex">
                    <el-col :span="8">
                            <img :src="temp" style="height: 70px;width: 70px;"/>
                    </el-col>
                    <el-col :span="16" >
                        <div style="font-size: 14px;color: #6b8196;">实时温度</div>
                        <div style="margin-top: 20px;font-size: 20px;">{{temptureData == null ? '未获取到数据' : temptureData + '℃'}}</div>
                    </el-col>
                </el-row>
            </el-card>
            <el-card shadow="hover" class="card-data" >
                <el-row :gutter="20" type="flex">
                    <el-col :span="8">
                        <img :src="smoke" style="height: 70px;width: 70px;"/>
                    </el-col>
                    <el-col :span="16" >
                        <div style="font-size: 14px;color: #6b8196;">烟雾监控</div>
                        <div style="margin-top: 20px;font-size: 20px;">{{smokeData == null ? '未获取到数据' : smokeDataShow}}</div>
                    </el-col>
                </el-row>
            </el-card>
          <el-card shadow="hover" class="card-data" >
            <el-row :gutter="20" type="flex">
                <el-col :span="8">
                    <img :src="fire" style="height: 70px;width: 70px;"/>
                </el-col>
                <el-col :span="16" >
                    <div style="font-size: 14px;color: #6b8196;">火焰监控</div>
                    <div style="margin-top: 20px;font-size: 20px;">{{fireData == null ? '未获取到数据' : fireDataShow}}</div>
                </el-col>
            </el-row>
        </el-card>
        </el-col>
    </el-row>
        <el-row :gutter="40">
            <el-col :span="24">
                <el-card shadow="hover" style="min-height: 200px;" >
                    <el-row type="flex"  justify="space-between">
                        <div class="card-title">运行日志</div>
                        <el-button class="card-button" size="small" icon="el-icon-download" @click="exportData" round>导出</el-button>
                    </el-row>
                  <el-row type="flex">
                    <el-table
                      :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
                      :default-sort = "{prop: 'createTime'}"
                      stripe
                      style="width: 80%" class="table">
                      <el-table-column
                        prop="createTime"
                        :formatter="formatDate"
                        label="时间"
                        width="360">
                      </el-table-column>
                      <el-table-column
                        prop="operator"
                        label="用户"
                        width="180">
                      </el-table-column>
                      <el-table-column
                        prop="event"
                        label="事件">
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
import lineCharts from '@/components/lineCharts.vue'
import moment from 'moment'

export default {
  name: 'OverView',
  components: { lineCharts },
  data () {
    return {
      temp: require('../../assets/temp.png'),
      smoke: require('../../assets/smoke.png'),
      fire: require('../../assets/fire.png'),
      currentPage: 1,
      pageSize: 10,
      total: 0,
      tableData: [],
      temptureData: null,
      fireData: null,
      smokeData: null,
      lineData: []
    }
  },
  methods: {
    getData: function () {
      var that = this
      this.$axios.get('/runtimelog', {
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
      this.$axios.get('/device', {
        headers: {
          Authorization: that.$store.state.token
        }
      })
        .then(function (response) {
          // 判断服务器返回状态码
          var status = response.data.status
          if (status === 1 && JSON.parse(response.data.data) !== null) {
            that.temptureData = JSON.parse(response.data.data).tempture
            that.fireData = JSON.parse(response.data.data).fire
            that.smokeData = JSON.parse(response.data.data).smoke
            that.updateChartData()
          }
        })
    },
    exportData: function () {
      require.ensure([], () => {
        // eslint-disable-next-line camelcase
        const { export_json_to_excel } = require('../../vendor/Export2Excel.js')
        const tHeader = ['时间', '用户', '事件']
        // 上面设置Excel的表格第一行的标题
        const filterVal = ['createTime', 'operator', 'event']
        // 上面的index、nickName、name是tableData里对象的属性
        const list = this.tableData // 把data里的tableData存到list
        const data = this.formatJson(filterVal, list)
        export_json_to_excel(tHeader, data, '智慧消防系统-系统日志')
      })
    },
    formatJson (filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
    updateChartData: function () {
      var that = this
      if (this.lineData.length > 60) {
        this.$store.state.chartData = this.$store.state.chartData.splice(1, 1)
      }
      this.$store.state.chartData.push({
        time: Date.parse(new Date()),
        value: that.temptureData === -3 ? null : that.temptureData
      })
    },
    formatDate (row, column) {
      var date = row[column.property]

      if (date === undefined) { return '' };

      return moment(date).format('YYYY-MM-DD HH:mm:ss')
    },
    timer: function () {
      return setTimeout(() => {
        this.getData()
      }, 2000)
    },
    drawLineTimer: function () {
      return setTimeout(() => {
        this.updateChartData()
        this.lineData = this.$store.state.chartData
      }, 10000)
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
  watch: {
    tableData () {
      this.timer()
    },
    lineData () {
      this.drawLineTimer()
    }
  },
  computed: {
    fireDataShow: function () {
      return this.fireData < 850 ? '异常' : '正常'
    },
    smokeDataShow: function () {
      return this.smokeData > 200 ? '异常' : '正常'
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      this.getData()
      this.updateChartData()
      this.lineData = this.$store.state.chartData
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
        align-items: center;
    }
    .card-button{
        display: flex;
        text-align: end;
        margin-right: 10px;
        align-items: center;
        font-weight: bold;
    }
    .card-welcome{
        font-size: 16px;
        font-weight: normal;
        text-align: start;
        color: #6b8196;
    }
    .card-welcome-user{
        padding-top: 15px;
        padding-bottom: 30px;
        font-size: 25px;
        text-align: start;
    }
    .card-data{
        height: 120px;
        margin-bottom: 20px;
    }
.graph{
  display: flex;
}
canvas{
  height: 120%;
}
  .table{
    margin-top: 25px;
    margin-left: 30px;
    margin-right: 30px;
  }
</style>
