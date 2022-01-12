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
                v-model="value1"
                active-text="自动"
                inactive-text="手动">
              </el-switch>
            </div>
          </el-row>
          <el-row type="flex" justify="space-between" class="setting-item ">
            <div class="setting-title">
              蜂鸣器
            </div>
            <div class="setting-switch">
              <el-switch
                v-model="value1"
                active-text="自动"
                inactive-text="手动">
              </el-switch>
            </div>
          </el-row>
          <el-row type="flex" justify="space-between" class="setting-item ">
            <div class="setting-title">
              消防喷雾
            </div>
            <div class="setting-switch">
              <el-switch
                v-model="value1"
                active-text="自动"
                inactive-text="手动">
              </el-switch>
            </div>
          </el-row>
        </el-card>
      </el-col>

      <el-col :span="12">
        <el-card shadow="hover" class="card-data">
          <el-row type="flex"  justify="space-between">
            <div class="card-title">优先控制</div>
          </el-row>
          <el-row type="flex" justify="space-between" class="setting-item ">
            <div class="setting-title">
              电力系统
            </div>
            <div class="setting-switch">
              <el-switch
                v-model="value1"
                active-text="系统优先"
                inactive-text="手动优先">
              </el-switch>
            </div>
          </el-row>
          <el-row type="flex" justify="space-between" class="setting-item ">
            <div class="setting-title">
              蜂鸣器
            </div>
            <div class="setting-switch">
              <el-switch
                v-model="value1"
                active-text="系统优先"
                inactive-text="手动优先">
              </el-switch>
            </div>
          </el-row>
          <el-row type="flex" justify="space-between" class="setting-item ">
            <div class="setting-title">
              消防喷雾
            </div>
            <div class="setting-switch">
              <el-switch
                v-model="value1"
                active-text="系统优先"
                inactive-text="手动优先">
              </el-switch>
            </div>
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
              <el-input-number v-model="num" :precision="1" :step="0.1" :max="60"></el-input-number>
            </div>
          </el-row>
          <el-row type="flex" justify="space-between" class="setting-item ">
            <div class="setting-title">
              自动控制监测间隔
            </div>
            <div class="setting-switch">
              <el-input-number v-model="num" :precision="1" :step="0.1" :max="60"></el-input-number>
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
      num: 1
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
