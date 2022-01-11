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
                @change="electricChange"
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
            <el-col :span="14" >
              <div style="font-size: 20px;">蜂鸣器</div>
              <div style="font-size: 14px;color: #6b8196;margin-top: 20px;font-weight: normal">启动时间：{{alertTime}}</div>
            </el-col>
          <el-col :span="4" style="display:flex;align-items: center;">
            <el-switch
              v-model="alertSwitch"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
          </el-col>
        </el-row>
      </el-card>
    </el-col>
    <el-col :span="12">
      <el-card shadow="hover" class="card-data" >
        <el-row :gutter="20" type="flex">
          <el-col :span="6">
            <img :src="fireControl" style="height: 70px;width: 70px;"/>
          </el-col>
          <el-col :span="14" >
            <div style="font-size: 20px;">消防喷雾</div>
            <div style="font-size: 14px;color: #6b8196;margin-top: 20px;font-weight: normal">启动时间：{{fireTime}}</div>
          </el-col>
          <el-col :span="4" style="display:flex;align-items: center;">
            <el-switch
              v-model="fireControlSwitch"
              active-color="#13ce66"
              inactive-color="#ff4949">
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
              prop="device"
              label="设备">
            </el-table-column>
            <el-table-column
              prop="action"
              label="动作">
            </el-table-column>
            <el-table-column
              prop="user"
              label="操作用户"
              width="180">
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

export default {
  name: 'Control',
  data () {
    return {
      alert: require('../../assets/alert.png'),
      electric: require('../../assets/electric.png'),
      fireControl: require('../../assets/fireControl.png'),
      alertSwitch: false,
      fireControlSwitch: false,
      electricControlSwitch: true,
      alertTime: '未启动',
      fireTime: '未启动',
      tableData: [{
        date: '2022-02-03',
        time: '19:30:20',
        device: '蜂鸣器;消防喷雾',
        action: '开启',
        user: '报警系统'
      },
      {
        date: '2022-02-03',
        time: '19:35:20',
        device: '蜂鸣器',
        action: '关闭',
        user: '管理员'
      },
      {
        date: '2022-02-03',
        time: '19:35:25',
        device: '消防喷雾',
        action: '关闭',
        user: '管理员'
      },
      {
        date: '2022-02-05',
        time: '00:30:20',
        device: '蜂鸣器;消防喷雾',
        action: '开启',
        user: '报警系统'
      },
      {
        date: '2022-02-05',
        time: '02:50:42',
        device: '蜂鸣器;消防喷雾',
        action: '关闭',
        user: '报警系统'
      }]

    }
  },
  methods: {
    electricChange: function (event) {
      console.debug(event)
      if (event) {
        this.Notification({
          title: '提示',
          message: '电力系统已恢复',
          showClose: false,
          type: 'success',
          position: 'top-left'
        })
      } else {
        this.Notification({
          title: '警告',
          message: '电力系统已关闭',
          showClose: false,
          type: 'warning',
          position: 'top-left'
        })
      }
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
  .card-data{
    height: 120px;
    margin-bottom: 20px;
  }
  .card-title{
    display: flex;
    text-align: start;
    margin-left: 10px;
    align-items: center;
  }
</style>
