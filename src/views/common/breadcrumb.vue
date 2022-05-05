<template>
    <el-breadcrumb separator="/" class="breadcrumb">
        <el-breadcrumb-item v-for="(item, i) in $store.state.breadNames" :key="i">{{ item }}</el-breadcrumb-item>
    </el-breadcrumb>
</template>
<script>
export default {
    name: 'breadcrumb'
}
</script>
<style lang="scss">
.breadcrumb {
    padding: 12px 15px;
    margin-bottom: 20px;
    list-style: none;
    background-color: #f5f5f5;
    border-radius: 4px;
    color: rgba(0, 0, 0, 0.45);
    font-size: 14px;
}
</style>
