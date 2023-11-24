import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import AttendanceList from '@/pages/attendance/AttendanceItem.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: Home
        },
        {
            path: '/about',
            component: () => import('../pages/About.vue')
        },
        {path: '/AttendanceList', component: AttendanceList},
        
    ]
})

export default router