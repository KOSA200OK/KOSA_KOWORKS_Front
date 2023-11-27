import { createRouter, createWebHistory } from "vue-router";

import Home from "@/pages/Home.vue";
import AttendanceList from "@/pages/attendance/AttendanceItem.vue";
import Address from "@/pages/address/AddressList.vue";
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
  ],
});

export default router;
