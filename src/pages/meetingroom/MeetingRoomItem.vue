<template lang="">
    <tr>
        <td class="container">
            <img :src="`../../images/${mr.name}.jpg`" :alt="mr.name">
            <br>{{mr.name}}
            <br><br><button>예약하기</button>
        </td>
        <td>
            <div class="flex-container">
                <div class="time-container">
                    <div v-for="time in times" :key="time" class="time-slot">{{ time }}</div>
                </div>

                <!-- 행 개수(5개)만큼 반복 -->
                <div v-for="row in 5" :key="row" class="reservation-container">
                <!-- 칼럼 개수(times.length)만큼 반복 -->
                <div v-for="time in times" :key="time" class="time-slot">yes</div>
                </div>
            </div>
        </td>
    </tr>
</template>
<script>
export default {
    name: 'MeetingRoomItem',
    props:['mr', 'date'],
    data(){
        return {
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
    }
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

/*추가*/

.flex-container {
    overflow-x: auto;
}

.timebar {
  display: flex;
  flex-wrap: wrap;
  /* padding: 8px; */
  width: auto;
  height: 100px;
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
    padding-right: 10px;
    margin-right: 10px;
}

.time-slot {
  flex: 0 0 100px;
  padding: 8px;
  text-align: center;
  border-left : 1px solid lightgray;
  border-bottom : 1px solid lightgray;
}

</style>