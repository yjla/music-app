import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './utils/rem.js'
import './assets/iconfont/iconfont.js'

createApp(App).use(store).use(router).mount('#app')
