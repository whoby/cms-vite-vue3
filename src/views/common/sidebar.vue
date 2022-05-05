<template>
    <aside>
        <el-menu :router="true" :default-active="$route.fullPath" :default-openeds="defaultOpeneds">
            <div v-for="(item1, i) in sideMenu" :key="i">
                <el-menu-item :index="item1.path" v-if="!(item1.children && item1.children.length) && !item1.hide" :class="item1.path === $util.routePath($route) ? 'is-active' : ''">{{
                    item1.title
                }}</el-menu-item>
                <el-sub-menu :index="item1.path" v-if="item1.children && item1.children.length">
                    <template v-slot:title>{{ item1.title }}</template>
                    <template v-for="(item2, j) in item1.children">
                        <el-menu-item :key="j" :index="item2.path" v-if="!item2.hide" :class="item2.path === $util.routePath($route) ? 'is-active' : ''">{{ item2.title }}</el-menu-item>
                    </template>
                </el-sub-menu>
            </div>
        </el-menu>
    </aside>
</template>
<script>
export default {
    name: 'sidebar',
    data() {
        return {
            defaultOpeneds: []
        }
    },
    computed: {
        sideMenu() {
            let menuList = this.$store.state.menuList
            let curPath = this.$util.routePath(this.$route)
            let sideMenu = []
            let breadNames = []

            // 获取左侧菜单
            menuList.some((item) => {
                if (curPath.indexOf(item.path) === 0) {
                    breadNames.push(item.title)
                    sideMenu = item.children
                    return true
                }
            })

            // 获取面包屑
            sideMenu.some((item1) => {
                if (curPath === item1.path) {
                    breadNames.push(item1.title)
                    return true
                }

                let child = item1.children || []
                child.some((item2) => {
                    if (curPath === item2.path) {
                        breadNames.push(item1.title, item2.title)
                        return true
                    }
                })
            })

            // 保存面包屑
            this.$store.commit('setBreadNames', breadNames)

            return sideMenu
        }
    }
}
</script>
<style lang="scss">
aside {
    position: fixed;
    display: block;
    top: 60px;
    bottom: 0px;
    left: 0px;
    width: 12%;
    overflow-x: hidden;
    color: #333;
    z-index: 999;
    border-right: 1px solid #ddd;
    .el-menu {
        border-right: 0 none;
        background-color: transparent;
        .el-submenu,
        .el-menu-item {
            border-bottom: 1px solid #dcdfea;
            &:hover {
                background-color: #e4e7e8;
            }
        }
        .el-submenu {
            li:last-child {
                border-bottom: 0;
            }
        }
    }
}
</style>
