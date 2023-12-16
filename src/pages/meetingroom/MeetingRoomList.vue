<template>
    <div class="meetingroomlist">
        <VueDatePicker 
        :model-value="date" 
        :enable-time-picker="false"
        class="calender"
        @update:model-value="updateList"
        />
        <div class="date">
            <h2>회의실 예약 내역</h2><br>
            <h3>{{FormattedDate()}}</h3>
        </div>
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
                    :date="date"
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
        }
    }, 
    methods: {
        currentDate() {
            const current = new Date();
            const date = current.getFullYear()+'-'+(current.getMonth()+1)+'-'+current.getDate();
            return date;
        },

        FormattedDate() {
            // 선택한 날짜를 YYYY-MM-DD 형식으로 변경하여 저장
            if (this.date) {
                const selectedDate = new Date(this.date);
                const year = selectedDate.getFullYear();
                const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
                const day = String(selectedDate.getDate()).padStart(2, '0');
                this.date = `${year}-${month}-${day}`
                return this.date;
            }
            return '';
        },

        updateList(selectedDate) {
            this.date = selectedDate;

            const date = new Date(this.date);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            this.date = `${year}-${month}-${day}`

            const url = `${this.backURL}/meetingroom?meetingDate=${this.date}`
            axios.get(url)
                .then(response=>{
                    this.meetingroomlist = response.data;
                    console.log(this.date)
                })
                .catch((error) =>{
                    console.log(error)
                })
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
            if (newRoute.params.date) {
                this.date = newRoute.params.date
            } else {
                this.date = ''
            }
            this.updateList(this.date)
        },
        //----라우터값이 변경되었을 때 할 일 END----
    },
    created() {
        //오늘 날짜 가져오기
        const currentdate = new Date();
        // 날짜를 'yyyy-mm-dd' 형식으로 변환
        const date = currentdate.getFullYear()+'-'+(currentdate.getMonth()+1)+'-'+currentdate.getDate();
        this.date = date;
        // console.log(this.date);

        this.updateList(this.date);
    },
}
</script>
<style scoped>

div.date {
    margin-left: 200px;
    margin-right: auto;
    margin-top: 10px;
    margin-bottom: 0px;
    
    text-align: center;
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

.calender {
    width: 150px;

    margin-left: 200px;
    margin-right: auto;
    margin-top: 100px;
    margin-bottom: 0px;
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