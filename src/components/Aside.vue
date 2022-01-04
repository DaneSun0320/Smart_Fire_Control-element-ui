<template>
    <el-aside>
        <el-menu
                default-active="2"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
        >
            <el-menu-item :index="item.path" v-for="item in menu" :key="item.path">
                <i :class="item.icon"></i>
                <span slot="title">{{item.label}}</span>
            </el-menu-item>
        </el-menu>
    </el-aside>
</template>

<style>
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 150px;
        height:90vh;
        min-height: 200px;
    }
</style>

<script>
export default {
  data () {
    return {
      isCollapse: true,
      menu: [
        {
          path: '/',
          name: 'overview',
          label: '数据总览',
          icon: 'el-icon-monitor',
          url: ''

        },
        {
          path: '/control',
          name: 'control',
          label: '设备控制',
          icon: 'el-icon-set-up',
          url: ''

        },
        {
          path: '/logs',
          name: 'logs',
          label: '系统日志',
          icon: 'el-icon-document',
          url: ''

        },
        {
          path: '/setting',
          name: 'setting',
          label: '系统设置',
          icon: 'el-icon-setting',
          url: ''

        },
        {
          path: '/user',
          name: 'user',
          label: '用户管理',
          icon: 'el-icon-user',
          url: ''

        }
      ]
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>
