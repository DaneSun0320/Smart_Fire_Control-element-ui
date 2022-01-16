<template>
  <el-row :gutter="40">
    <el-col :span="24">
      <el-card shadow="hover" style="min-height: 400px" >
        <el-row type="flex"  justify="space-between">
          <div class="card-title">用户管理</div>
        </el-row>
        <div class="table">
          <el-table
            :data="tableData.filter(data => !search || data.user.toLowerCase().includes(search.toLowerCase()))"
            stripe
            style="width: 100%">
            <el-table-column
              label="用户名"
              prop="user">
            </el-table-column>
            <el-table-column
              label="权限"
              prop="level">
            </el-table-column>
            <el-table-column
              label="最近登录时间"
              prop="time">
            </el-table-column>
            <el-table-column
              align="right">
              <template slot="header" slot-scope="{}">
                <el-input
                  v-model="search"
                  size="mini"
                  placeholder="输入关键字搜索"
                  clearable/>
              </template>
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)">查看</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'User',
  data () {
    return {
      tableData: [
        {
          user: 'A',
          level: 'SuperRoot',
          time: '2022-01-14 00:30:34'
        },
        {
          user: 'B',
          level: 'Root',
          time: '2022-01-14 00:30:34'
        },
        {
          user: 'C',
          level: 'Admin',
          time: '2022-01-14 00:30:34'
        },
        {
          user: 'D',
          level: 'Admin',
          time: '2022-01-14 00:30:34'
        },
        {
          user: 'E',
          level: 'Admin',
          time: '2022-01-14 00:30:34'
        },
        {
          user: 'F',
          level: 'Admin',
          time: '2022-01-14 00:30:34'
        },
        {
          user: 'G',
          level: 'Admin',
          time: '2022-01-14 00:30:34'
        },
        {
          user: 'H',
          level: 'Admin',
          time: '2022-01-14 00:30:34'
        }
      ],
      search: ''
    }
  },
  methods: {
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row) {
      console.log(index, row)
    },
    getChange (e) {
      console.log(e)
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
  .table{
    margin: 10px;
  }
</style>
