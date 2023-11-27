import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Attendance from '@/pages/attendance/AttendanceList.vue'

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
        {path: '/attendance', component: Attendance},
        
    ]
})

export default router