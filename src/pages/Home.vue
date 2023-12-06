<template>
	<main class="home-page">
		<div class="container">
			<div class="item attendance"> <!-- 찬석 -->
				<h3>근태</h3>
				<h3>{{ getCurrentTime() }}</h3>
				<h3 v-bind="attendanceTime">출근 시간: {{ attendanceTime }}</h3>
				<h3>퇴근시간</h3>
				<button @click="attendanceHandler"> 출근 </button>
				<button @click="attendance2Handler">퇴근</button>
			</div>
			<div class="item">B</div>
			<div class="item">C</div>
			<div class="item">D</div>
		</div>

		<!-- <div>
			<button @click="attendanceHandler"> 출근 </button>
			<button @click="attendance2Handler">퇴근</button>
		</div> -->
	</main>
</template>
<script>
import Sidebar from "../components/Sidebar.vue";
import axios from 'axios'
export default {
	components: { Sidebar },
	data() {
		return {
			currentTime: this.getCurrentTime(),
			attendanceTime: null, 
		};
	},
	methods: {
		getCurrentTime() {
			const now = new Date();
			const year = now.getFullYear();
			const month = (now.getMonth() + 1).toString().padStart(2, '0');
			const day = now.getDate().toString().padStart(2, '0');
			const days = ['일', '월', '화', '수', '목', '금', '토'];
			const dayOfWeek = days[now.getDay()];
			const hours = now.getHours().toString().padStart(2, '0');
			const minutes = now.getMinutes().toString().padStart(2, '0');
			const seconds = now.getSeconds().toString().padStart(2, '0');
			return `${year}년 ${month}월 ${day}일 (${dayOfWeek}) ${hours}시 ${minutes}분 ${seconds}초`;
		},

		mounted() {
			// 1초마다 현재 시간을 업데이트
			setInterval(this.getCurrentTime(), 1000);
		},

		// ======================= 출근 버튼 ================================
		attendanceHandler() {
			const url = `${this.backURL}/attendance`;
			const memberId = '0001'; // memberId 값 설정 (임시로 1로 설정) -> session이나 localstorage id 가져와야함
			const currentTime = new Date(); // 현재 시간을 가져옴
			const memberData = {
				memberId: memberId,
				currentTime: currentTime,
				member: {
					id: '1' // memberId 값 설정 (임시로 1로 설정) -> session이나 localstorage id 가져와야함
				},
			};

			axios
				.post(url, memberData)
				.then((response) => {
					alert('출근 완료');
					//재원 추가
					this.attendanceTime = this.currentTime;
				})
				.catch((error) => {
					console.error('출근 요청 실패', error);
				});
		},
		// ======================= 퇴근 버튼 ===============================
		attendance2Handler() {
			const url = `${this.backURL}/attendance`;
			const memberId = 1; // memberId 값 설정 (임시로 1로 설정) -> session이나 localstorage id 가져와야함
			const currentTime = new Date(); // 현재 시간을 가져옴
			const memberData = {
				memberId: memberId,
				currentTime: currentTime,
				member: {
					id: 1	// memberId 값 설정 (임시로 1로 설정) -> session이나 localstorage id 가져와야함
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
.container {
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-template-rows: repeat(2, minmax(400px, auto));
	row-gap: 30px;
	column-gap: 20px;

}

.item {
	border-radius: 30px;
	background-color: ghostwhite;
}

.attendance {
	text-align: center;
	padding: 20px;
	/* 원하는 패딩 값으로 조절하세요 */
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
	/* 그림자 효과 추가 */
}

/* 스타일 추가: 버튼 */
.item button {
	display: inline-block;
	padding: 10px 20px;
	margin-top: 15px;
	border: none;
	border-radius: 5px;
	background-color: #3498db;
	/* 버튼 배경색 */
	color: #fff;
	/* 버튼 텍스트 색상 */
	font-size: 14px;
	cursor: pointer;
	transition: background-color 0.3s ease;
}

.item button:hover {
	background-color: #2980b9;
	/* 호버 상태일 때의 배경색 */
}
</style>
