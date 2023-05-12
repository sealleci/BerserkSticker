import App from '@/App.vue'
import '@/css/style.css'
import { createPinia } from 'pinia'
import { createApp } from 'vue'

const pinia = createPinia()

createApp(App)
    .use(pinia)
    .mount('#app')
