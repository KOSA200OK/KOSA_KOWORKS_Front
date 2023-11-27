import { createRouter, createWebHistory } from "vue-router";

import Home from "@/pages/Home.vue";
import AttendanceList from "@/pages/attendance/AttendanceItem.vue";
import Address from "@/pages/address/AddressList.vue";
import CarList from '@/pages/car/CarList.vue';
import NoticeList from '@/pages/notice/NoticeList.vue';
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/home", component: Home },
    // { path: '/attendancelist', component: AttendanceList },
    { path: "/address/members", component: Address },
    // { path: '/chat/list', component: Attendance },
    // { path: '/calendar/list', component: Attendance },
    // { path: '/meetingroom', component: Attendance },
    // { path: '/carrent/carlist', component: Attendance },
    // { path: '/stuff/request', component: Attendance },
    // { path: '/stuff/requestmanage/', component: Attendance },
    { path: '/carrent/carlist/', component: CarList },
    { path: '/carrent/carlist/:currentPage', component: CarList },
    { path: '/notice/noticelist/', component: NoticeList },
    { path: '/notice/noticelist/:currentPage', component: NoticeList },
  ],
});

export default router;
