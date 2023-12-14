<template>
	<main class="home-page">
		<div class="gridContainer">
			<div class="item attendance"> <!-- 찬석 -->
				<h3>근태 현황</h3>
				<div class="box">
					<div class="currentDay">{{ currentDay }}</div>
					<h3>{{ currentTime }}</h3>
					<br>
					<h3>출근 시간: {{ attendanceTime }}</h3>
					<h3>퇴근 시간: {{ offTime }}</h3>
					<button @click="attendanceHandler">출근</button>
					<button @click="attendance2Handler">퇴근</button>
				</div>
			</div>
			<div class="item stuff">
				<h3>비품 신청현황</h3>
				<div class="box">

				</div>
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
				<h3>일정</h3>
				<div class="box">

				</div>
			</div>
			<div class="item notification">
				<h3>알림</h3>
				<div class="box">

				</div>
			</div>
		</div>
	</main>
</template>
<script>
import Sidebar from "../components/Sidebar.vue";
import axios from 'axios'
export default {
	components: { Sidebar },
	data() {
		return {
			currentDay: this.getCurrentDay(),
			currentTime: this.getCurrentTime(),
			attendanceTime: null,
			offTime: null,

		};
	},
	mounted() {
		setInterval(() => {
			this.currentTime = this.getCurrentTime();
		}, 1000);
	},
	methods: {
		getCurrentDay() {
			const now = new Date();
			const year = now.getFullYear();
			const month = (now.getMonth() + 1).toString().padStart(2, '0');
			const day = now.getDate().toString().padStart(2, '0');
			const days = ['일', '월', '화', '수', '목', '금', '토'];
			const dayOfWeek = days[now.getDay()];
			return `${year}년 ${month}월 ${day}일 (${dayOfWeek})`;
		},

		getCurrentTime() {
			const now = new Date();
			const hours = now.getHours().toString().padStart(2, '0');
			const minutes = now.getMinutes().toString().padStart(2, '0');
			const seconds = now.getSeconds().toString().padStart(2, '0');
			return `${hours}시 ${minutes}분 ${seconds}초`;
		},


		// ======================= 출근 버튼 ================================
		attendanceHandler() {
			const id = localStorage.getItem('memberId');

			console.log('id {}', id);

			const url = `${this.backURL}/attendance`;
			const memberId = id; // memberId 값 설정 (임시로 1로 설정) -> session이나 localstorage id 가져와야함
			const currentTime = new Date(); // 현재 시간을 가져옴
			const memberData = {
				memberId: memberId,
				currentTime: currentTime,
				member: {
					id: id // memberId 값 설정 (임시로 1로 설정) -> session이나 localstorage id 가져와야함
				},
			};

			axios
				.post(url, memberData)
				.then((response) => {
					alert('출근 완료');
					//재원 추가
					// this.attendanceTime = this.currentTime;
				})
				.catch((error) => {
					console.error('출근 요청 실패', error);
				});
		},
		// ======================= 퇴근 버튼 ===============================
		attendance2Handler() {
			const id = localStorage.getItem('memberId');

			const url = `${this.backURL}/attendance`;
			const memberId = id; // memberId 값 설정 (임시로 1로 설정) -> session이나 localstorage id 가져와야함
			const currentTime = new Date(); // 현재 시간을 가져옴
			const memberData = {
				memberId: memberId,
				currentTime: currentTime,
				member: {
					id: id	// memberId 값 설정 (임시로 1로 설정) -> session이나 localstorage id 가져와야함
				},
			};

			axios
				.put(url, memberData)
				.then((response) => {
					alert('퇴근 완료! 조심히가세요~');
				})
				.catch((error) => {
					console.error('퇴근 요청 실패', error);
				});
		}
	},
};
</script>
<style>
.gridContainer {
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr;
	grid-template-rows: repeat(2, 400px);
	/* grid-template-rows: repeat(2, minmax(400px, auto)); */
	/* grid-template-rows: 250px 550px; */
	row-gap: 40px;
	column-gap: 20px;

}

.attendance{
	grid-column-start: 1;
}

.notification{
	grid-row-start: 2;
	grid-column-end: span 2;
}

.notice{
	grid-column: 3 / 5;
	grid-row-start: 2;
}

.calendar{
	grid-column-start: 4;
}

.box {
  height: 350px;
  border: 1px solid #ccc;
  border-radius: 15px;
  box-shadow: 10px 10px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
}
</style>
