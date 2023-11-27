import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import AttendanceList from '@/pages/attendance/AttendanceItem.vue'
import CarList from '@/pages/car/CarList.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: Home },
        // { path: '/attendancelist', component: AttendanceList },
        // { path: '/address', component: Attendance },
        // { path: '/chat/list', component: Attendance },
        // { path: '/calendar/list', component: Attendance },
        // { path: '/meetingroom', component: Attendance },
        // { path: '/carrent/carlist', component: Attendance },
        // { path: '/stuff/request', component: Attendance },
        // { path: '/stuff/requestmanage/', component: Attendance },
        { path: '/carrent/carlist/', component: CarList },
        { path: '/carrent/carlist/:currentPage', component: CarList },
    ]
})

export default router