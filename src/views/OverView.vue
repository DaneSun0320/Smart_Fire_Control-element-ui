<template>
    <el-row :gutter="20">
        <el-col :span="12"></el-col>
        <el-col :span="12"><div class="grid-content bg-purple"></div></el-col>
    </el-row>

</template>

<script>
export default {
  name: 'OverView'
}
</script>

<style scoped>
    .el-row {
        margin-bottom: 20px;
    }
    .el-col {
        border-radius: 4px;
    }
</style>
