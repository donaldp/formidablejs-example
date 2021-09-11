import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { progress } from './api/api'
import './assets/tailwind.css'

progress()

createApp(App).use(store).use(router).mount('#app')
