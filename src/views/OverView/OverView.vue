<template>
    <div>
        <div class="card-welcome">Hello,</div>
        <div class="card-welcome-user">{{this.$store.state.userNickName}}</div>
    <el-row :gutter="40">
        <el-col :span="18">
            <el-card shadow="hover" style="height: 400px" >
                <el-row type="flex"  justify="space-between">
                    <div class="card-title">数据图表</div>
                </el-row>
                <el-row type="flex" class="graph">
                  <lineCharts  :charData="lineData" :id="'c1'"></lineCharts>
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
                        <div style="margin-top: 20px;font-size: 20px;">25℃</div>
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
                        <div style="margin-top: 20px;font-size: 20px;">正常</div>
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
                    <div style="margin-top: 20px;font-size: 20px;">正常</div>
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
                        <el-button class="card-button" size="small" icon="el-icon-download" round>导出</el-button>
                    </el-row>
                  <el-row type="flex">
                    <el-table
                      :data="tableData"
                      stripe
                      style="width: 80%" class="table">
                      <el-table-column
                        prop="date"
                        label="日期"
                        width="180">
                      </el-table-column>
                      <el-table-column
                        prop="time"
                        label="时间"
                        width="180">
                      </el-table-column>
                      <el-table-column
                        prop="user"
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
                    layout="prev, pager, next"
                    :total="50"
                  style="margin-top: 10px;">
                  </el-pagination>
                </el-card>
            </el-col>
        </el-row>

    </div>
</template>

<script>
import lineCharts from '@/components/lineCharts.vue'
export default {
  name: 'OverView',
  components: { lineCharts },
  data () {
    return {
      temp: require('../../assets/temp.png'),
      smoke: require('../../assets/smoke.png'),
      fire: require('../../assets/fire.png'),
      tableData: [{
        date: '2022-02-02',
        time: '19:30:20',
        user: '管理员',
        event: '登录系统'
      }, {
        date: '2022-02-03',
        time: '8:30:20',
        user: '管理员',
        event: '关闭报警'
      }, {
        date: '2022-02-03',
        time: '10:30:20',
        user: '管理员',
        event: '新增普通账号test'
      }, {
        date: '2022-02-03',
        time: '11:30:30',
        user: 'test',
        event: '登录系统'
      }, {
        date: '2022-02-03',
        time: '13:30:00',
        user: 'test',
        event: '注销登录'
      }],

      lineData: [{
        time: 164208606600,
        value: 25.5
      }, {
        time: 164208607600,
        value: 24.5
      }, {
        time: 164208608600,
        value: 26.5
      }, {
        time: 164208609600,
        value: 30.0
      }, {
        time: 164208610600,
        value: 25.0
      }, {
        time: 164208611600,
        value: 27.0
      }, {
        time: 164208612600,
        value: 28.0
      }, {
        time: 164208613600,
        value: 30.0
      },
      {
        time: 164208614600,
        value: 30.0
      },
      {
        time: 164208615600,
        value: 30.0
      },
      {
        time: 164208616600,
        value: 30.0
      },
      {
        time: 164208617600,
        value: 30.0
      },
      {
        time: 164208618600,
        value: 30.0
      },
      {
        time: 164208619600,
        value: 30.0
      },
      {
        time: 164208620600,
        value: 30.0
      }
      ]
    }
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
