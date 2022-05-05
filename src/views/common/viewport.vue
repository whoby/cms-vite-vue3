<template>
    <div class="app">
        <my-header></my-header>
        <div class="content">
            <my-aside></my-aside>
            <div class="main">
                <my-breadcrumb></my-breadcrumb>
                <div class="main-content">
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import headbar from './headbar.vue'
import aside from './sidebar.vue'
import breadcrumb from './breadcrumb.vue'
export default {
    name: 'viewport',
    components: {
        'my-header': headbar,
        'my-aside': aside,
        'my-breadcrumb': breadcrumb
    }
}
</script>
<style>
body {
    background-color: #fff!important;
}

.app {
    background-color: #fff;
}

.content {
    display: table;
    margin-top: 60px;
    padding: 0;
    width: 100%;
}

.main {
    padding: 20px;
    background-color: #fff;
    width: 88%;
    margin-left: 12%;
}

.main-content {
    padding: 0 20px 20px;
}
</style>
