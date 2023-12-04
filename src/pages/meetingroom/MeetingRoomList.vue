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
                    v-if="meetingroomlist"
                    v-for="mr in meetingroomlist" 
                    v-bind:key="mr.id"
                    @click="clickMeetingRoomReservation()"
                />
                <!-- <tr v-for="(room, index) in meetingroomreslist.content" :key="room.id">
                <td>{{ room.name }}</td>
                <td v-for="time in times" :key="`${mr.id}_${time}`">
                     <MeetingRoomItem 
                    :mr="mr"
                    v-if="meetingroomlist"
                    v-for="mr in meetingroomlist" 
                    v-bind:key="mr.id"
                    @click="clickMeetingRoomReservation()"
                    />
                </td> -->
            </tbody>
        </table>
    </div>
</template>
<script>
import MeetingRoomItem from '@/pages/meetingroom/MeetingRoomItem.vue'
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
            return date;
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

        const url = `${this.backURL}/meetingroom?meetingDate='${tempdate}'`
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
/* .scrollable-table {
  width: 50%;
  overflow-x: scroll;
}

.scrollable-table th {
  min-width: 100px; 
  white-space: nowrap; 
} */

div.date {
    margin-left: 200px;
    margin-right: auto;
    margin-top: 100px;
    margin-bottom: 0px;
}

table {
  border-collapse: collapse;
  width: 1000px;

  margin-left: 200px;
  margin-right: auto;
  margin-top: 50px;
}

/* 테이블 행 */
th{
  padding: 8px;
  height: 80px;
  text-align: left;
  border-bottom: 1px solid #ddd;
  text-align: center;
}

th {
  background-color: var(--dark);
  color: #ddd;
}

/* 테이블 올렸을 때 */
tbody tr:hover {
  background-color: #d3d3d3;
  opacity: 0.9;
  cursor: pointer;
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