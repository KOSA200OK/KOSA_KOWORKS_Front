<template>
    <main>
    <h3 class="title"><b>회의실 예약 내역</b><br>
        <div class="date">
            <button class="prevday" @click="prevDay">PREV &lt;&lt; &nbsp;&nbsp;&nbsp;</button>
            <h3 style="display: inline-block;">{{FormattedDate()}}</h3>
            <button class="nextday" @click="nextDay">&nbsp;&nbsp;&nbsp; &gt;&gt; NEXT </button>
        </div>
    </h3>
    <div class="meetingroomlist">
        <VueDatePicker 
        :model-value="date" 
        :enable-time-picker="false"
        class="calender"
        @update:model-value="updateList"
        />
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
    </main>
</template>
<script>
import MeetingRoomItem from '@/pages/meetingroom/MeetingRoomItem.vue'
// import MeetingRoomTimeline from '@/pages/meetingroom/MeetingRoomTimeline.vue'
import axios from 'axios'

export default {
    name: "MeetingRoomList",
    components: { MeetingRoomItem },
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

        //날짜 구하기
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
        prevDay() {
            const currentDate = new Date(this.date);
            // 하루를 빼기
            currentDate.setDate(currentDate.getDate() - 1);
            // 변환된 날짜를 updateList 메서드에 전달
            this.updateList(currentDate);
        },
        nextDay() {
            const currentDate = new Date(this.date);
            // 하루를 더하기
            currentDate.setDate(currentDate.getDate() + 1);
            // 변환된 날짜를 updateList 메서드에 전달
            this.updateList(currentDate);
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

/* 페이지 제목 */
.title {
    text-align: center;
    font-size: 28px;
    color: #2c3e50;
    text-transform: uppercase;
    margin-top: 100px;
    margin-bottom: 30px;
    font-weight: bold;
    text-shadow: 1px 1px 1px #ccc;
}

/* 본문 */
.meetingroomlist {
    width: 90%;
    font-family: "Arial", sans-serif;
    padding: 20px;
    margin: 20px;
    margin-left: 6%;
}

div.date {
    margin-top: 20px;
    
    text-align: center;
}

.prevday, .nextday {
    text-align: center;
    font-size: 18px;
    color: #2c3e50;
    text-shadow: 1px 1px 1px #ccc;
}

.scrollable-table {
    border-collapse: collapse;
    width: 100%;

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

    margin-left: 10px;
    margin-right: auto;
    margin-bottom: 20px;
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
  background-color: var(--dark-alt);
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
  background-color: #f1f9ff;
}

</style>