<template>
	<main class="home-page">
		<div class="container">
			<div class="item"> <!-- 찬석 -->
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

	},
	methods: {
		// ======================= 확인 버튼 ================================
		attendanceHandler() {
			const url = `${this.backURL}/attendance`;
			const memberId = 1; // memberId 값 설정 (임시로 1로 설정) -> session이나 localstorage id 가져와야함
			const currentTime = new Date(); // 현재 시간을 가져옴
			const memberData = {
				memberId: memberId,
				currentTime: currentTime,
				member: {
					id: 1 // memberId 값 설정 (임시로 1로 설정) -> session이나 localstorage id 가져와야함
				},
			};

			axios
				.post(url, memberData)
				.then((response) => {
					alert('출근 완료');
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

.container{
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-template-rows: repeat(2, minmax(400px, auto));
	row-gap: 30px;
	column-gap: 20px;
	
} 

.item{
	border-radius: 30px;
	background-color: bisque;
}

</style>
