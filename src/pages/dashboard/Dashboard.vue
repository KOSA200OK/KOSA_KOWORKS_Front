<template>
	<main class="home-page">
		<div class="gridContainer">
			<div class="item attendance"> <!-- 찬석 -->
				<h3>근태 현황</h3>
				<div class="box">
					<AttendanceInfo />
				</div>
			</div>

			<div>
				<CarStatus />
			</div>

			<div>
				<StuffStatus />
			</div>

			<div class="item notice">
				<h3>최근 공지사항</h3>
				<div class="box">
					<button class="add-button" @click="addNotice">
						<span class="material-icons">add</span>
					</button>
					<hr>
				</div>
			</div>
			<div class="item calendar">
				<h3>오늘의 일정</h3>
				<div class="box">
					<router-link class="go-schedule" to="/schedule/calendar">
						<span class="material-icons">add</span>
					</router-link>
					<hr>
					<div class="todoBox">
						<TodayTodoItem :t="t" v-if="todayTodo !== null && todayTodo.length > 0" v-for="t in todayTodo"
							:key="t.id" />
						<div v-else class="no" > 
							<span>오늘의 일정이 없습니다</span>
						</div>
					</div>
				</div>
			</div>
			<div class="item notification">
				<h3>알림</h3>
				<div class="box">
					<div class="notificationBox">
						<NotificationItem v-if="notifications !== null && notifications.length > 0"
							v-for="n in notifications" :key="n.id" :notification="n" @click="notificationClick(n)" />
						<div v-else class="noNotification">
							<span>알림이 없습니다</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</main>
</template>
<script>
import Sidebar from "@/components/Sidebar.vue";
import TodayTodoItem from "@/pages/schedule/TodayTodoItem.vue";
import NotificationItem from "@/pages/dashboard/NotificationItemDash.vue";
import AttendanceInfo from "@/pages/dashboard/AttendanceInfo.vue";
import CarStatus from "@/pages/dashboard/CarStatus.vue";
import StuffStatus from "@/pages/dashboard/StuffStatus.vue";
import axios from "axios";
export default {
	components: { Sidebar, TodayTodoItem, NotificationItem, AttendanceInfo, CarStatus, StuffStatus },
	data() {
		return {
			todayTodo: null,
			notifications: [],
		};
	},
	mounted() {
		this.fetchNotifications();
		this.TodayTodoHandler();
	},
	methods: {

		// ======================= 오늘의 일정 원희===============================
		TodayTodoHandler() {
			const memberId = localStorage.getItem("memberId");
			const url = `${this.backURL}/schedule/todaytodo?memberId=${memberId}`;
			axios
				.get(url, { params: this.data })
				.then((response) => {
					this.todayTodo = response.data;
				})
				.catch((Error) => {
					console.log(Error);
				});
		},
		// ============================== 알림, 찬석 ================================
		// 알림 데이터를 가져오는 메소드
		fetchNotifications() {
			const memberId = localStorage.getItem("memberId");
			const url = `${this.backURL}/subscribe/recent/?memberId=${memberId}`;

			axios
				.get(url)
				.then((response) => {
					this.notifications = response.data;
				})
				.catch((error) => {
					console.error("알림 데이터를 불러오는 중 에러 발생:", error);
				});
		},

		notificationClick(n) {
			console.log("타입 : ", n.type);
			switch (n.type) {
				case 'CAR':
					this.$router.push('/carrent/myrentlist');
					break;
				case 'MEETING':
					this.$router.push('/meetingroom/myreservation');
					break;
				default:
					break;
			}
		}
	},
	created() {
		this.TodayTodoHandler();
		this.fetchNotifications();
	},
};
</script>
<style scoped>
.gridContainer {
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr;
	grid-template-rows: repeat(2, 400px);
	row-gap: 40px;
	column-gap: 20px;

}

.attendance {
	grid-column-start: 1;
}

.notification {
	grid-row-start: 2;
	grid-column-end: span 2;
}

.notice {
	grid-column: 3 / 5;
	grid-row-start: 2;
}

.calendar {
	grid-column-start: 4;
}

hr {
	margin: 5px;
}

.box {
	height: 350px;
	border: 1px solid #ccc;
	border-radius: 15px;
	box-shadow: 10px 10px 4px rgba(0, 0, 0, 0.1);
	padding: 20px;
}

.item h3 {
	font-size: 16px;
	font-weight: bold;
	color: #1565c0;
	margin-left: 10px;
	margin-bottom: 10px;
}

.todoBox {
	height: 280px;
	overflow-y: scroll;
}

.notificationBox {
	height: 290px;
}

.noNotification {
	display: flex;
	justify-content: center;
	color: #2196F3;
	padding: 133px;
}
</style>

