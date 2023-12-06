<template>
    <div class="meetingroomlist">
        <div class="date"><h2>{{currentDate()}}</h2></div>
        <table class="scrollable-table">
            <thead>
                <tr>
                <th>회의실</th>
                <th>시간</th>
                </tr>
            </thead>

            <tbody>
                <MeetingRoomItem 
                    :mr="mr"
                    :date="currentDate()"
                    v-if="meetingroomlist"
                    v-for="mr in meetingroomlist" 
                    v-bind:key="mr.id"
                    @click="clickMeetingRoomReservation()"
                />
            </tbody>
        </table>
    </div>
</template>
<script>
import MeetingRoomItem from '@/pages/meetingroom/MeetingRoomItem.vue'
// import MeetingRoomTimeline from '@/pages/meetingroom/MeetingRoomTimeline.vue'
import axios from 'axios'

export default {
    name: "MeetingRoomList",
    components: {MeetingRoomItem},
    data() {
        return {
            meetingroomlist : [],
            date: '',
            times: this.generateTimeSlots(),
        }
    }, 
    methods: {
        currentDate() {
            const current = new Date();
            const date = current.getFullYear()+'-'+(current.getMonth()+1)+'-'+current.getDate();
            return '2023-12-07'; //date;
        },

        generateTimeSlots() {
            // 30분 간격으로 시간 생성
            const times = [];
            const startTime = 8 * 60; // 8:00 시작 (8시 * 60분)
            const endTime = 20 * 60; // 20:00 종료 (20시 * 60분)

            for (let i = startTime; i <= endTime; i += 30) {
                const hours = Math.floor(i / 60);
                const minutes = i % 60;
                times.push(`${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`);
            }

            return times;
        },

        //예약 있는지 여부 확인하는 로직
        isReserved(mr, time) {
            // mr.reservation 배열을 순회하면서 해당 시간에 예약이 있는지 확인
            return (
                mr.reservation &&
                mr.reservation.some(
                (reservation) =>
                    reservation.meetingDate === this.currentDate() &&
                    reservation.startTime <= time &&
                    reservation.endTime >= time
                )
            );
        },

        //----예약하기 클릭했을 때 할 일 START----
        clickMeetingRoomReservation() {
            //모달창으로 띄우기
            // this.$router.push({path: `./${id}`})
        },
        //----예약하기 클릭했을 때 할 일 END----

    },
    watch: {
        //----라우터값이 변경되었을 때 할 일 START----
        $route(newRoute, oldRoute) {
            console.log("라우터값이 변경" + newRoute.path + "," + oldRoute.path)
            if (newRoute.params.currentPage) {
                this.currentPage = newRoute.params.currentPage
            } else {
                this.currentPage = 1
            }
            this.axiosHandler(this.currentPage)
        }
        //----라우터값이 변경되었을 때 할 일 END----
    },
    created() {
        //오늘 날짜 가져오기
        const currentDate = new Date();
        // 날짜를 'yyyy-mm-dd' 형식으로 변환
        const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;
        console.log(formattedDate)
        //------> 바꾸기>> 클릭한 날짜값을 가져와야함

        const tempdate = '2023-11-30';
        console.log(tempdate)

        const url = `${this.backURL}/meetingroom?meetingDate=${tempdate}`
        axios.get(url)
        .then(response=>{
            this.meetingroomlist = response.data;
        })
        .catch((error) =>{
            console.log(error)
        })
    },
}
</script>
<style scoped>

div.date {
    margin-left: 200px;
    margin-right: auto;
    margin-top: 100px;
    margin-bottom: 0px;
}

.scrollable-table {
    width: 80%;
    margin-left: 200px;
    margin-right: 200px;
    margin-top: 50px;
    margin-bottom: 200px;

    border-collapse: collapse;
    table-layout: fixed;
}

.scrollable-table th,
.scrollable-table td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
}

.time-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px; /* 원하는 간격으로 조절하세요. */
    overflow-x: auto; /* 가로 스크롤을 허용합니다. */
}

.time {
    /* 추가된 스타일 */
    min-width: 60px; /* 최소 너비를 지정하세요. */
    text-align: center;
    /* 추가된 스타일 (선택 사항) */
    border: 1px solid #ddd;
    padding: 5px;
}

.time-container > div {
    padding:10px;
}

/* 테이블 행 */
th{
  padding: 8px;
  width: 500px;
  height: 80px;
  text-align: left;
  border-bottom: 1px solid #ddd;
  text-align: center;
}

th {
  background-color: var(--dark);
  color: #ddd;
}


/* 테이블 비율 */
th:nth-child(1),
td:nth-child(1) {
  width: 30%;
}

th:nth-child(2),
td:nth-child(2) {
  width: 70%;
}

tr:nth-child(even) {
  background-color: #fff6f6;
}

</style>