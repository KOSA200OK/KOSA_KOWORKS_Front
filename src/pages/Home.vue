<template>
 	<main class="home-page">
		<div class="gridContainer">
			<div class="item attendance"> <!-- 찬석 -->
				<h3>근태 현황</h3>
				<div class="box">
					<div class="currentDay">{{ currentDay }}</div>
					<div class="currentTime">{{ currentTime }}</div>
					<br>
					<div class="timeBox">
						<div>
							<span>출근 시간</span>
							<span>{{ attendanceTime }}</span>
						</div>
						<div>
							<span>퇴근 시간</span>
							<span>{{ offTime }}</span>
						</div>
					</div>
					<div class="buttons">
						<button @click="attendanceHandler">출근</button>
						<button @click="attendance2Handler">퇴근</button>
					</div>
				</div>
			</div>
			<div>
				<div v-if="departmentId === '4'" class="item car">
					<h3>차량 신청내역</h3>
					<div class="box">

						<div>승인대기</div>
						<div>2건</div>

						<div>대여중</div>
						<div>0건</div>

						<div>미반납</div>
						<div>0건</div>

					</div>
				</div>
				<div v-else class="item car">
					<h3>차량 신청현황</h3>
					<div class="box">
						<div>
							<span>승인대기 : </span>
							<!-- <span>{{ 승인대기 }}</span> -->
						</div>
						<div>
							<span>대여중 : </span>
							<!-- <span>{{ 대여중 }}</span> -->
						</div>
						<div>
							<span>미반납 : </span>
							<!-- <span>{{ 미반납 }}</span> -->
						</div>
					</div>
				</div>
			</div>
			<div>
				<div v-if="departmentId === '4'" class="item stuff">
					<h3>비품 요청내역</h3>
					<div class="box stuffBox">
						<div class="stuff-text">미처리 비품 요청</div>
						<div class="reqSize">{{ unprocessedReqSize }} 건</div>
					</div>
				</div>
				<div v-else class="item stuff">
					<h3>비품 요청현황</h3>
					<div class="box stuffBox">
						<div class="stuff-text">처리 대기중인 비품 요청</div>
						<div class="reqSize">{{ waitproccessReqSize }} 건</div>
					</div>
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
				<h3>오늘의 일정</h3>
				<div class="box">
					<router-link class="go-schedule" to="/schedule/calendar">
						<span class="material-icons">add</span>
					</router-link>
					<hr>
					<div>
						<TodayTodoItem :t="t" v-if="todayTodo !== null && todayTodo.length > 0" v-for="t in todayTodo"
							:key="t.id" />
						<div v-else>
							<span>오늘의 일정이 없습니다</span>
						</div>
					</div>
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
import Sidebar from "@/components/Sidebar.vue";
import TodayTodoItem from "@/pages/schedule/TodayTodoItem.vue";
import axios from "axios";
export default {
	components: { Sidebar, TodayTodoItem },
	data() {
		return {
			currentDay: this.getCurrentDay(),
			currentTime: this.getCurrentTime(),
			attendanceTime: null,
			todayTodo: null,
			offTime: null,
			departmentId: 0,
			unprocessedReqSize: 0,
			waitproccessReqSize: 0,
		};
	},
	mounted() {
		setInterval(() => {
			this.currentTime = this.getCurrentTime();
		}, 1000);

    this.departmentId = localStorage.getItem("departmentId");

    // 찬석
    const memberId = localStorage.getItem("memberId");
    this.fetchAttendanceData(memberId);
    // 찬석 - 알림 호출
    this.fetchNotifications();
  },
  methods: {
    getCurrentDay() {
      const now = new Date();
      const year = now.getFullYear();
      const month = (now.getMonth() + 1).toString().padStart(2, "0");
      const day = now.getDate().toString().padStart(2, "0");
      const days = ["일", "월", "화", "수", "목", "금", "토"];
      const dayOfWeek = days[now.getDay()];
      return `${year}년 ${month}월 ${day}일 (${dayOfWeek})`;
    },

    getCurrentTime() {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const seconds = now.getSeconds().toString().padStart(2, "0");
      return `${hours}시 ${minutes}분 ${seconds}초`;
    },

    // ======================= 출근 버튼, 찬석 ================================
    attendanceHandler() {
      const id = localStorage.getItem("memberId");

      console.log("id {}", id);

      const url = `${this.backURL}/attendance`;
      const memberId = id; // memberId 값 설정 (임시로 1로 설정) -> session이나 localstorage id 가져와야함
      const currentTime = new Date(); // 현재 시간을 가져옴
      const memberData = {
        memberId: memberId,
        currentTime: currentTime,
        member: {
          id: id, // memberId 값 설정 (임시로 1로 설정) -> session이나 localstorage id 가져와야함
        },
      };

      axios
        .post(url, memberData)
        .then((response) => {
          alert("출근 완료");
          //재원 추가
          // this.attendanceTime = this.currentTime;
        })
        .catch((error) => {
          console.error("출근 요청 실패", error);
        });
    },
    // ======================= 퇴근 버튼, 찬석 ===============================
    attendance2Handler() {
      const id = localStorage.getItem("memberId");

      const url = `${this.backURL}/attendance`;
      const memberId = id; // memberId 값 설정 (임시로 1로 설정) -> session이나 localstorage id 가져와야함
      const currentTime = new Date(); // 현재 시간을 가져옴
      const memberData = {
        memberId: memberId,
        currentTime: currentTime,
        member: {
          id: id, // memberId 값 설정 (임시로 1로 설정) -> session이나 localstorage id 가져와야함
        },
      };

      axios
        .put(url, memberData)
        .then((response) => {
          alert("퇴근 완료! 조심히가세요~");
        })
        .catch((error) => {
          console.error("퇴근 요청 실패", error);
        });
    },
    // ============= 출근, 퇴근 데이터 출력 찬석 ==========================
    fetchAttendanceData(memberId) {
      // const id = localStorage.getItem('memberId');

      const url = `${this.backURL}/attendance/today?memberId=${memberId}`;

      axios
        .get(url)
        .then((response) => {
          const data = response.data;
          this.attendanceTime = data.startTime;
          this.offTime = data.endTime;
        })
        .catch((error) => {
          console.error("출근 및 퇴근 시간 조회 실패", error);
        });
    },
    // ======================= 오늘의 일정 ===============================
    TodayTodoHandler() {
      const memberId = localStorage.getItem("memberId");
      const url = `${this.backURL}/schedule/todaytodo?memberId=${memberId}`;
      axios
        .get(url, { params: this.data })
        .then((response) => {
          console.log(response.data);
          this.todayTodo = response.data;
          console.log(this.todayTodo);
        })
        .catch((Error) => {
          console.log(Error);
        });
    },
    // ============================== 알림, 찬석 ================================
        // 알림 데이터를 가져오는 메소드
    fetchNotifications() {
      const memberId = localStorage.getItem("memberId");
      const url = `${this.backURL}/subscribe/?memberId=${memberId}`;

      axios
        .get(url)
        .then((response) => {
          this.notifications = response.data;
        })
        .catch((error) => {
          console.error("알림 데이터를 불러오는 중 에러 발생:", error);
        });
    },
    //=====================비품 내역 ====================
		UnproccessedReqHandler() {
			const url = `${this.backURL}/stuff/unprocessedreq`
			axios.get(url)
				.then(response => {
					this.unprocessedReqSize = response.data
				})
				.catch((Error) => {
					console.log(Error)
				})
		},
		WaitproccesseReqHandler() {
			const memberId = localStorage.getItem('memberId');
			const url = `${this.backURL}/stuff/waitproccess?memberId=${memberId}`
			axios.get(url)
				.then(response => {
					this.waitproccessReqSize = response.data
				})
				.catch((Error) => {
					console.log(Error)
				})
		}
  },
  created() {
    this.TodayTodoHandler();
    this.UnproccessedReqHandler()
		this.WaitproccesseReqHandler()
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

.buttons {
	display: flex;
	justify-content: space-around;
}

.buttons button {
	padding: 10px 20px;
	margin: 5px;
	font-size: 14px;
	cursor: pointer;
	border: 2px solid #2196F3;
	background-color: transparent;
	color: #2196F3;
	border-radius: 25px;
	transition: background-color 0.3s ease;
}

.buttons button:hover {
	background-color: rgba(21, 101, 192, 0.1);
}

.currentDay {
	color: rgba(128, 128, 128, 0.8);
}

.currentTime {
	font-size: 20px;
	font-weight: bold;
}

.buttons button {
	width: 100px;
}

.timeBox {
	margin-top: 50px;
	margin-bottom: 70px;
}

.timeBox div {
	display: flex;
	justify-content: space-between;
}

.timeBox span {
	text-align: center;
	flex: 1;
}

.stuff .box div {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.stuffBox {
	padding-top: 120px;
	padding-bottom: 120px;
}

.stuffBox div {
	padding-bottom: 40px;
}

.reqSize {
	font-size: 25px;
}

.stuff-text {
	color: #2196F3;
}
</style>

