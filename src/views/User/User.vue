<template>
  <el-row :gutter="40" >
    <el-col :span="24">
      <el-card shadow="hover" style="min-height: 400px" >
        <el-row type="flex"  justify="space-between">
          <div class="card-title">用户管理</div>
        </el-row>
        <div class="table" v-if="level === 0">
          <el-table
            :data="tableData.filter(data => !search || data.id.toLowerCase().includes(search.toLowerCase())).slice((currentPage-1)*pageSize,currentPage*pageSize)"
            stripe
            style="width: 100%">
            <el-table-column
              label="用户名"
              prop="id">
            </el-table-column>
            <el-table-column
              label="权限"
              :formatter="parseLevel"
              prop="level">
            </el-table-column>
            <el-table-column
              label="最近登录时间"
              prop="loginTime"
              :formatter="formatDate"
            >
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
        </div>
        <div v-else>
          <el-empty :image-size="400" :image="require('../../assets/unauthorize.png')" description="无权限"></el-empty>
        </div>

      </el-card>
    </el-col>
    </el-row>
</template>

<script>
import moment from 'moment'

export default {
  name: 'User',
  data () {
    return {
      level: this.$store.state.level,
      tableData: [],
      search: '',
      currentPage: 1,
      pageSize: 10,
      total: 0
    }
  },
  methods: {
    getTableData: function () {
      var that = this
      this.$axios.get('/userlist', {
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
    formatDate (row, column) {
      var date = row[column.property]

      if (date === undefined) { return '' };

      return moment(date).format('YYYY-MM-DD HH:mm:ss')
    },
    parseLevel: function (row, column) {
      var level = row[column.property]

      if (level === undefined) { return '' };

      return level === 0 ? '超级管理员' : '管理员'
    },
    handleSizeChange (newSize) {
      // pagesize改变触发
      this.pageSize = newSize
    },
    handleCurrentChange (newPage) {
      // 页码改变触发
      this.currentPage = newPage
    },
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row) {
      console.log(index, row)
    },
    getChange (e) {
      console.log(e)
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      this.level = parseInt(this.$store.state.level)
      this.getTableData()
    })
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
