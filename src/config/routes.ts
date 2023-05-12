import Stage from '@/views/Stage.vue'
import type { RouteRecordRaw } from 'vue-router'

const routes: Readonly<RouteRecordRaw[]> = [
    {
        path: '/',
        redirect: { name: 'Stage' }
    },
    {
        path: '/stage',
        name: 'Stage',
        component: Stage
    },
    {
        path: '/:catchAll(.*)',
        redirect: { name: 'Stage' }
    }
]

export default routes
