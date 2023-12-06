import { createRouter, createWebHistory } from "vue-router";

import Home from "@/pages/Home.vue";
import Attendance from "@/pages/attendance/AttendanceList.vue";
import Address from "@/pages/address/AddressList.vue";
import CarList from "@/pages/car/CarList.vue";
import CarMyRentList from "@/pages/car/CarMyRentList.vue";
import CarManageList from "@/pages/car/CarManageList.vue";
import CarWaitingList from "@/pages/car/CarWaitingList.vue";
import CarRentList from "@/pages/car/CarRentList.vue";
import CarNoReturnList from "@/pages/car/CarNoReturnList.vue";
import NoticeList from "@/pages/notice/NoticeList.vue";
import NoticeInfo from "@/pages/notice/NoticeInfo.vue";
import RoomList from "@/pages/chat/RoomList.vue";
import RoomDetail from "@/pages/chat/RoomDetail.vue";
import MeetingRoomList from "@/pages/meetingroom/MeetingRoomList.vue";
import MeetingRoomResList from "@/pages/meetingroom/MeetingRoomResList.vue";
import MeetingRoomTimeline from "@/pages/meetingroom/MeetingRoomTimeline.vue";
import RoomList from "@/pages/chat/RoomList.vue";
import RoomDetail from "@/pages/chat/RoomDetail.vue";

import StuffReq from "@/pages/stuff/StuffReq.vue";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/home", component: Home },
    // { path: '/attendancelist', component: AttendanceList },
    { path: "/address/members", component: Address },
    { path: "/chat/list", component: ChatRoomList },
    { path: "/chat/roomlist", component: RoomList },
    { path: "/chat/room/enter/:roomid", component: RoomDetail },
    // { path: '/calendar/list', component: Attendance },
    // { path: '/carrent/carlist', component: Attendance },
    // { path: '/stuff/request', component: Attendance },
    // { path: '/stuff/requestmanage/', component: Attendance },
    { path: "/carrent/carlist/", component: CarList },
    { path: "/carrent/carlist/:currentPage", component: CarList },
    { path: "/carrent/myrentlist", component: CarMyRentList },
    { path: "/carrent/myrentlist/:currentPage", component: CarMyRentList },
    { path: "/carrent/managelist", component: CarManageList },
    { path: "/carrent/managelist/:currentPage", component: CarManageList },
    { path: "/carrent/waitinglist", component: CarWaitingList },
    { path: "/carrent/waitinglist/:currentPage", component: CarWaitingList },
    { path: "/carrent/rentlist", component: CarRentList },
    { path: "/carrent/rentlist/:currentPage", component: CarRentList },
    { path: "/carrent/noreturnlist", component: CarNoReturnList },
    { path: "/carrent/noreturnlist/:currentPage", component: CarNoReturnList },
    { path: "/attendance", component: Attendance },
    { path: "/attendance/:currentPage", component: Attendance },
    { path: "/notice/noticelist/", component: NoticeList },
    { path: "/notice/noticelist/:currentPage", component: NoticeList },
    { path: "/notice/:id", component: NoticeInfo },
    { path: "/meetingroom", component: MeetingRoomList },
    { path: "/meetingroom/myreservation", component: MeetingRoomResList },
    { path: "/meetingroom/timeline", component: MeetingRoomTimeline },
    { path: "/stuff/request", component: StuffReq },
  ],
});

export default router;
