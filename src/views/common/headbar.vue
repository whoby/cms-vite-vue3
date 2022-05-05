<template>
    <header class="clear">
        <h1 class="fl">通用后台管理系统</h1>
        <nav class="fl">
            <router-link :to="item.path" v-for="(item, i) in menuList" :key="i">{{ item.title }}</router-link>
        </nav>
        <div class="info fr" v-if="isLogin">
            欢迎您<strong>{{ userName }}</strong> | <a href="javascript:;" @click="onLogout">退出</a><a title="开发说明" href="/help"><i class="el-icon-question" v-if="true"></i></a>
        </div>
    </header>
</template>
<script>
export default {
    name: 'headbar',
    mounted() {
        this.loadMenu()
    },
    data() {
        return {
            isLogin: !!this.$store.state.userName,
            menuList: []
        }
    },
    computed: {
        userName() {
            return this.$store.state.userName
        }
    },
    methods: {
        loadMenu() {
            if (this.isLogin) {
                // 是否需要权限控制
                let isNeedAuth = false

                // 过滤出真正的业务菜单
                if (!isNeedAuth) {
                    this.$router.options.routes.forEach((item) => {
                        if (item.path === '/index') {
                            this.menuList.push(item)
                        } else if (item.path.indexOf('/page') >= 0) {
                            this.menuList.push(...item.children)
                        }
                    })
                    this.$store.commit('setMenuList', this.menuList)
                } else {
                    // ajax获取权限数据
                    // this.$ajax.post('/loadMenu', {}, res => {
                    //     this.$store.commit('setMenuList', res)
                    // })
                }
            } else {
                this.$router.push('/login')
            }
        },
        onLogout() {
            let params = {
                cmd: 'logout'
            }
            this.$ajax.post('/doLogin', params, () => {
                this.$store.commit('setUserName', '')
                this.$router.push('/login')
            })
        }
    }
}
</script>
<style lang="scss">
header {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    height: 60px;
    color: #fff;
    z-index: 999;
    h1 {
        margin: 15px 0 10px 25px !important;
        font-size: 22px;
        letter-spacing: 1.5px;
        font-weight: normal;
    }
    nav {
        margin: 22px 0 0 80px;
        a {
            margin: 0 15px;
        }
    }
    .info {
        margin: 20px 20px 0 0;
        strong {
            padding: 0 10px;
        }
        a {
            margin-left: 8px;
        }
        .el-icon-question {
            margin-left: 10px;
            color: #e9c849;
        }
    }
}
</style>
