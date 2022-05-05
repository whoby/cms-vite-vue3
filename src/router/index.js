import { createRouter, createWebHistory } from 'vue-router'
import viewport from 'views/common/viewport.vue'
import main from 'views/common/main.vue'
import notFound from 'views/error/notFound.vue'

/* beautify preserve:start */

/* 基础模块 */
let login = () => import(/* webpackChunkName: "login" */ 'views/root/login.vue')
let index = () => import(/* webpackChunkName: "index" */ 'views/root/index.vue')
let help = () => import(/* webpackChunkName: "help" */ 'views/root/help.vue')

/* 用户管理 */
let userInfo = () => import(/* webpackChunkName: "userInfo" */ 'views/user/info/list.vue')
let userCode = () => import(/* webpackChunkName: "userCode" */ 'views/user/info/list.vue')

/* beautify preserve:end */

// const routesModules = import.meta.globEager('../views/**/*.js')
// const modules = []
// Object.keys(routesModules).forEach(key => {
//   modules.push(...routesModules[key].default)
// })
// console.log('modules: ', modules);

const routes = [
    {
        path: '/',
        redirect: '/index'
    },
    {
        title: '登录',
        path: '/login',
        component: login
    },
    {
        title: '帮助',
        path: '/help',
        component: help
    },
    {
        title: '首页',
        path: '/index',
        component: index
    },
    {
        path: '/page',
        component: viewport,
        children: [
            {
                title: '用户管理',
                path: '/page/user',
                redirect: '/page/user/info',
                component: main,
                children: [
                    {
                        title: '信息列表',
                        path: '/page/user/info',
                        component: userInfo
                    },
                    {
                        title: '推荐列表',
                        path: '/page/user/code',
                        redirect: '/page/user/code/list',
                        component: main,
                        children: [
                            {
                                title: '子列表',
                                path: '/page/user/code/list',
                                component: userCode
                            }
                        ]
                    }
                ]
            }
        ]
    },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: notFound }
]

export default createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})
