<template>
	<main class="home-page">
		<div class="gridContainer">
			<div class="item attendance"> <!-- 찬석 -->
				<h3>근태 현황</h3>
				<br>
				<h3>{{ currentTime }}</h3>
				<br>
				<h3 v-bind="attendanceTime">출근 시간: {{ attendanceTime }}</h3>
				<h3 v-bind="offTime">퇴근 시간: {{ offTime }}</h3>
				<button @click="attendanceHandler">출근</button> 
				<button @click="attendance2Handler">퇴근</button>
			</div>
			<div class="item notice">
				<h3>최근 공지사항</h3>
				<button class="add-button" @click="addNotice">
					<span class="material-icons">add</span>
				</button>
				<hr>
			</div>
			<div class="item calendar">C</div>
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
	grid-template-columns: 3fr 5fr;
	/* grid-template-rows: repeat(2, minmax(400px, auto)); */
	grid-template-rows: 250px 550px;
	row-gap: 30px;
	column-gap: 20px;

}

.item {
	border-radius: 30px;
	background-color: ghostwhite;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
	/* 그림자 효과 추가 */
}

.attendance {
	text-align: center;
	padding: 20px;

}

.notice{
	position: relative;
}

.calendar{
	grid-column-start: 2;
	grid-row : 1 / 3;
}

.notice span{
	color: black;
}

.notice h3{
	text-align: center;
	padding: 20px;
}

.item button {
  display: inline-block;
  padding: 10px 20px;
  margin-top: 15px;
  border: 2px solid #3498db; 
  border-radius: 5px;
  background-color: transparent; 
  color: #3498db; 
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.item button:hover {
  background-color: #3498db; 
  color: #fff; 
}

.item .add-button {
	display: inline-block;
	position: absolute;
	top: 0;
	right: 0; 
	padding: 10px;
	border: none;
	border-radius: 50%;
	background-color: transparent;
	color: #fff;
	font-size: 18px;
	cursor: pointer;
	transition: background-color 0.3s ease;
}

.item .add-button:hover {
	background-color: #2980b9;
}

.item button + button {
  margin-left: 10px;
}
</style>
