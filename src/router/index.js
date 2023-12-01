import { createRouter, createWebHistory } from "vue-router";

import Home from "@/pages/Home.vue";
import Attendance from "@/pages/attendance/AttendanceList.vue";
import Address from "@/pages/address/AddressList.vue";
import CarList from "@/pages/car/CarList.vue";
import CarMyRentList from '@/pages/car/CarMyRentList.vue'
import NoticeList from "@/pages/notice/NoticeList.vue";
import NoticeInfo from "@/pages/notice/NoticeInfo.vue";
import ChatRoomList from "@/pages/chat/ChatRoomList.vue";
import MeetingRoomList from "@/pages/meetingroom/MeetingRoomList.vue";
import MeetingRoomResList from "@/pages/meetingroom/MeetingRoomResList.vue"
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/home", component: Home },
    // { path: '/attendancelist', component: AttendanceList },
    { path: "/address/members", component: Address },
    { path: "/chat/list", component: ChatRoomList },
    // { path: '/calendar/list', component: Attendance },
    // { path: '/carrent/carlist', component: Attendance },
    // { path: '/stuff/request', component: Attendance },
    // { path: '/stuff/requestmanage/', component: Attendance },
    { path: "/carrent/carlist/", component: CarList },
    { path: "/carrent/carlist/:currentPage", component: CarList },
    { path: '/carrent/myrentlist', component: CarMyRentList },
    { path: "/attendance", component: Attendance },
    { path: "/attendance/:currentPage", component: Attendance },
    { path: "/notice/noticelist/", component: NoticeList },
    { path: "/notice/noticelist/:currentPage", component: NoticeList },
    { path: "/notice/:id", component: NoticeInfo },
    { path: '/meetingroom', component: MeetingRoomList },
    { path: '/meetingroom/myreservation', component: MeetingRoomResList},
  ],
});

export default router;
