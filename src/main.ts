import App from '@/App.vue'
import '@/less/style.less'
import { createPinia } from 'pinia'
import { createApp } from 'vue'

const pinia = createPinia()

createApp(App)
    .use(pinia)
    .mount('#app')
