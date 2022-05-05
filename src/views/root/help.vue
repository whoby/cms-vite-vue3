<template>
    <div class="app">
        <my-header></my-header>
        <div class="help">
            <div class="title">一、环境安装：</div>
            <div>
                <p class="sub-title">1、node下载安装：</p>
                <el-alert type="success">
                    <p><a href="https://npm.taobao.org/mirrors/node/v8.11.3/" target="_blank">https://npm.taobao.org/mirrors/node/v8.11.3/</a>（里面win/mac/linux版本都有）</p>
                    <p></p>
                </el-alert>
                <p class="sub-title">2、首次运行需要安装前端依赖npm包，进入项目下，运行：</p>
                <el-alert type="success">npm install</el-alert>
            </div>
            <div class="title">二、开发流程：</div>
            <div>
                <p class="sub-title">1、日常本地启动项目：</p>
                <el-alert type="success">npm start</el-alert>
                <p>或：</p>
                <el-alert type="success">npm run dev</el-alert>
                <p class="sub-title">2、开发规范：</p>
                <el-alert type="success">
                    <p>业务页面存放位置：./src/views下</p>
                    <p>前端静态路由位置：./src/router</p>
                </el-alert>
                <p class="sub-title">3、本地打包：</p>
                <el-alert type="success">npm run build</el-alert>
            </div>
            <div class="title">三、UI组件库：</div>
            <div>
                <p class="sub-title">1、vue官网：</p>
                <el-alert type="success">
                    <p><a href="https://cn.vuejs.org/v2/guide/" target="_blank">vue官网API文档</a></p>
                </el-alert>
                <p class="sub-title">2、element ui组件官网：</p>
                <el-alert type="success">
                    <p><a href="http://element-cn.eleme.io/#/zh-CN/component/installation" target="_blank">element组件API文档</a></p>
                </el-alert>
            </div>
            <div class="title">四、常见配置修改：</div>
            <div>
                <p class="sub-title">1、本地接口代理：</p>
                <el-alert type="success">项目根目录下vue.config.js：devServer -> proxy -> target，修改成自己的接口服务</el-alert>
                <p class="sub-title">2、打包发布路径：</p>
                <el-alert type="success">项目根目录下vue.config.js：outputDir，修改成最终要放置的位置</el-alert>
                <p class="sub-title">3、主题色修改：</p>
                <el-alert type="success">
                    <p>主题色修改位置：./src/assets/style/theme.scss中</p>
                </el-alert>
            </div>
            <div class="title">五、服务部署：</div>
            <div>
                <p class="sub-title">1、新建前端静态服务：</p>
                <el-alert type="success">让测试在运维平台，新建前端服务如：xxx-static-backend</el-alert>
                <p class="sub-title">2、服务器nginx配置：</p>
                <el-alert type="success">
                    <pre>
    #xxx-static-backend
    upstream xxxApiServer {
        server 127.0.0.1:12306;
    }
    server {
        listen       80;
        server_name  xxx.domain.com;

        client_max_body_size    100m;

        location / {
            root   /mnt/data/xxx-static-backend;
            index  index.html index.htm;
            try_files $uri $uri/ /index.html;
        }

        location /api {
            proxy_pass http://xxxApiServer;   #代理接口，如果后端接口中不存 /api 前缀则需在末尾加上 /
        }
    }
                    </pre>
                </el-alert>
            </div>
        </div>
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
<style lang="scss">
.help {
    width: 92%;
    margin: 100px auto 30px auto;
    .title {
        margin-top: 30px;
        font-weight: bold;
        font-size: 18px;
    }
    .sub-title {
        font-size: 16px;
    }
    .el-alert {
        color:#52af24
    }
}
</style>
