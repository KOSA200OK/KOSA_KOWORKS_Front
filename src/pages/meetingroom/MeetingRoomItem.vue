<template lang="">
    <tr>
        <td>
            <img :src="`../../images/${mr.name}.jpg`" :alt="mr.name">
            <div class="roomname">{{mr.name}}</div>
            <button class="resbutton" @click="openModal">
                <span><b>예약하기</b></span>
            </button>
            <Modal 
            :show="showModal"
            :mr = "mr"
            @close="closeModal"/>
        </td>
        
        <td>
            <div class="flex-container">
                <div class="time-container">
                    <div v-for="time in times" :key="time" class="time-slot">{{ time }}</div>
                </div>

                <!-- 행 개수(5개)만큼 반복 -->
                <div v-for="row in 1" :key="row" class="reservation-container">
                    <!-- 칼럼 개수(times.length)만큼 반복 -->
                    <div
                        v-for="time in times"
                        :key="time"
                        :class="{
                            'reserved-time': isTimeReserved(time),
                        }"
                        class="time-slot"
                        @click = "detailInfoHandler"
                    ></div>

                <!-- <div v-for="box in reservationBoxes" :key="box.time" class="time-slot">
                    <div v-if="box.reserved" class="reservation-box"></div>
                </div> -->
                </div>
            </div>
        </td>
    </tr>
</template>
<script>
import Modal from "@/pages/meetingroom/ReservationModal.vue";
export default {
    name: 'MeetingRoomItem',
    props:['mr', 'date'],
    components: {
        Modal,
    },
    data(){
        return {
            times: this.generateTimeSlots(),
            showModal: false,
            starttime: '', // 시작 시간
            endtime: '',   // 종료 시간
            reservations: [], // 추가된 부분: 초기에 표시될 예약 박스들
        }
    },
    watch: {
        date: function (newDate) {
            // date가 변경될 때마다 호출되는 함수
            this.updateTimeBasedOnDate(newDate);
        },
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
        // 추가된 메서드: 초기에 예약 박스들을 가공하는 메서드
        processReservationBoxes() {
            this.reservationBoxes = this.times.map((time) => ({
                time,
                reserved: this.isTimeReserved(time),
            }));
        },
        isTimeReserved(currentTime) {
            return this.reservations.some(reservation =>
                    this.isTimeInRange(currentTime, reservation.startTime, reservation.endTime)
                );        
        },
        // 해당 시간에 예약이 있는지 확인하는 메서드
        // isTimeReserved(time) {
        //     return (
        //         this.mr.reservation &&
        //         this.mr.reservation.some(
        //         (reservation) =>
        //             reservation.meetingDate === this.currentDate() &&
        //             this.isTimeInRange(time, reservation.startTime, reservation.endTime)
        //         )
        //     );
        // },
        isTimeInRange(currentTime, startTime, endTime) {
            const currentTimeValue = this.getTimeValue(currentTime);
            const startTimeValue = this.getTimeValue(startTime);
            const endTimeValue = this.getTimeValue(endTime);
            return currentTimeValue >= startTimeValue && currentTimeValue < endTimeValue;
        },
        getTimeValue(time) {
            if (!time) {
                return 0; // 혹은 다른 기본값 설정
            }
            const [hours, minutes] = time.split(':').map(Number);
            return hours * 60 + minutes;
        },
        updateTimeBasedOnDate(newDate) {
            // const matchingReservation = this.mr.reservation.find(reservation => reservation.meetingDate === newDate);
            // newDate와 일치하는 mr.reservation 여러개를 찾아 담아준다
            const matchingReservations = this.mr.reservation.filter(reservation => reservation.meetingDate === newDate);
            console.log(matchingReservations);

            this.reservations = []; //배열 초기화

            for (const reservation of matchingReservations) {
                console.log(reservation.startTime, reservation.endTime);

                // 회의의 시작 시간과 종료 시간을 배열에 추가
                this.reservations.push({
                    startTime: reservation.startTime,
                    endTime: reservation.endTime,
                });
            }

            // matchingReservation이 존재하면 해당 정보로 starttime과 endtime을 설정합니다.
            // if (matchingReservation) {
            //     console.log(this.reservations)
            //     this.starttime = matchingReservation.startTime;
            //     console.log(this.starttime)
            //     this.endtime = matchingReservation.endTime;
            //     console.log(this.endtime)

            //     const randomColor = this.getRandomColor();
            //     return {
            //         'reserved-time': true,
            //         [randomColor]: true,
            //     };
            // } else {
            //     // 일치하는 예약 정보가 없을 경우 기본값으로 설정하거나 다른 로직을 수행할 수 있습니다.
            //     this.starttime = '';
            //     this.endtime = '';
            // }
        },
        getRandomColor() {
            const colors = ['red', 'blue', 'green', 'yellow', 'purple']; // 원하는 색상들을 배열로 정의
            const randomColor = colors[Math.floor(Math.random() * colors.length)]; // 배열에서 랜덤으로 색상 선택
            return randomColor;
        },
        openModal() {
            this.showModal = true;
        },
        closeModal() {
            this.showModal = false;
        },
    },
    mounted() {
        // 초기 데이터를 가공하여 예약 박스들을 설정
        this.processReservationBoxes();
        this.updateTimeBasedOnDate(this.date);
    },
}
</script>
<style scoped>

img {
  width: 200px;
  height: 200px;
}

td {
  width: 150rem;
  height: 80px;
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
  text-align: center;
}

.roomname {
    margin-top: 5px;
}

.resbutton {
  display: inline-block;

  border-radius: 4px;
  background: #1565c0;
  color: #ddd;
  border: none;

  text-align: center;
  font-size: 14px;

  padding: 5px;
  width: 100px;
  height: 35px;
  vertical-align: middle;
  align-items: center;

  transition: all 0.5s;
  cursor: pointer;
  margin: 5px;
  margin-top: 10px;
}

.resbutton span {
  cursor: pointer;
  display: inline-block;
  position: relative;
  transition: 0.5s;
  vertical-align: middle;
  align-items: center;
}

.resbutton span:after {
  content: '\00bb';
  position: absolute;
  opacity: 0;
  top: 0;
  right: -20px;
  transition: 0.5s;
}

.resbutton:hover span {
  padding-right: 15px;
}

.resbutton:hover span:after {
  opacity: 1;
  right: 0;
}

/* container css*/
.flex-container {
    overflow-x: auto;
}

.timebar {
  display: flex;
  flex-wrap: wrap;
  /* padding: 8px; */
  width: auto;
  height: auto;
  /* text-align: left; */
  text-align: center;
}

.time-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid lightgray;
    padding-right: 10px;
    margin-right: 10px;
}

.reservation-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 30px;

    padding-right: 10px;
    margin-right: 10px;
}

.time-slot {
  flex: 0 0 100px;
  padding: 8px;
  height: 100%;
  text-align: center;
  border-left : 1px solid lightgray;
  border-bottom : 1px solid lightgray;
}

/* 네모 박스 스타일 지정 */
.reservation-box {
  /* position: absolute; */
  width: 100%;
  height: 10px;
  background-color: lightblue;
  border: 1px solid #ccc;
}

.reserved-time {
  background-color: #1565c0; /* 예약된 시간대의 배경색을 여기에 설정합니다. */
}

/* 랜덤 색상 정해주기 */
.red {
  background-color: red;
}

.blue {
  background-color: blue;
}

.green {
  background-color: green;
}

.yellow {
  background-color: yellow;
}

.purple {
  background-color: purple;
}
</style>