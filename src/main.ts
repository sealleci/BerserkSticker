import App from '@/App.vue';
import '@/css/style.css';
import router from '@/router';
import vuex from '@/store';
import { createApp } from 'vue';

createApp(App)
    .use(router)
    .use(vuex)
    .mount('#app')
