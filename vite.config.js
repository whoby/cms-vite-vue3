/**
 * 官网：https://vitejs.dev/config/
 */ 
 
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import ElementPlus from 'unplugin-element-plus/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import eslintPlugin from 'vite-plugin-eslint'

// mock服务
const MOCK = 'http://rap2api.taobao.org/app/mock/14718'

// 设置路径别名
const resolve = (dir) => require('path').join(__dirname, dir)

export default defineConfig({
  base: './',
  outDir: 'dist',
  // 配置运行环境变量
  define: {
    'process.env': {
        BASE_URL: '/'
    }
  },
  resolve: {
      extensions: ['.vue', '.js', '.json'],
      alias: {
          '@': resolve('src'),
          assets: resolve('src/assets'),
          components: resolve('src/components'),
          libs: resolve('src/libs'),
          store: resolve('src/store'),
          views: resolve('src/views')
      }
  },
  // 自定义主题
  css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/assets/style/theme.scss" as *;`
        }
      }
  },
  plugins: [
    vue(),
      ElementPlus({useSource: true}),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    eslintPlugin({
      include: ['src/**/*.vue', 'src/**/*.js'], // 检查的文件
    })
  ],
  // 反向代理
  server: {
    port: 8080,
    open: false,
    https: false,
    proxy: {
      '/api': {
        target: '' || MOCK, // ''中可代理任意服务，包括本地服务
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  }
})