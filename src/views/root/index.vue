<template>
    <div class="app">
        <my-header></my-header>
        <div class="index"></div>
    </div>
</template>
<script>
import headbar from '../common/headbar.vue'
export default {
    name: 'index',
    components: {
        'my-header': headbar
    }
}
</script>
<style>
.index {
    width: 1100px;
    margin: 100px auto 30px auto;
    height: 510px;
    background: url(../../assets/img/index.jpg) no-repeat;
}
</style>
