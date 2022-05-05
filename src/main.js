import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Global from './libs/global'
import 'assets/style/style.scss'

createApp(App).use(store).use(router).use(Global).mount('#app')
