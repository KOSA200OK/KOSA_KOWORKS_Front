<template>
<main>
    <FullCalendar ref="fullCalendar" :options="calendarOptions" :events="calendarOptions.events">
        <template v-slot:eventContent='arg'>
            <div class="event">
                <b>{{formatTime(arg.event.start)}} {{ arg.event.title }}</b>
            </div>
        </template>
    </FullCalendar>
    <div class="modal-wrap" v-show="modalCheck" >
        <div class="modal-container">
            <form class="add-schedule" @submit.prevent="reserveHandler">
                <label>제목 : </label><input type="text" 
                                        v-model="FormData.scheduleTitle"><br><br>
                <label>기간 : <input type="date"
                                     name="startDate"
                                     v-model="startDate"
                                     required> ~ <input type="date"
                                                                   name="endDate"
                                                                   v-model="endDate"
                                                                   :min ="startDate"
                                                                   required></label><br><br>
                <label>시간 : <input type="time"
                                     name="starttime"
                                     v-model="FormData.startTime"
                                     required> ~ <input type="time"
                                                                   name="endtime"
                                                                   v-model="FormData.endTime"
                                                                   :min ="FormData.startTime"
                                                                   required></label><br><br><br>
                <label>메모 : </label><input type="text" 
                                        name="content" 
                                        v-model="FormData.content">
                <div class="modal-btn">
                    <button type="submit" class="ok" @click="scheduleAddHandler(memberId)">등록</button>
                    <button class="cancel" @click="openModal">취소</button>
                </div>
            </form>
        </div>
    </div>
</main>
</template>
<script>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import axios from 'axios'

export default {
    name: 'Calendar',
    components: {
        FullCalendar // make the <FullCalendar> tag available
    },
    data() {
        return {
            calendarOptions: {
                plugins: [ dayGridPlugin, interactionPlugin ],
                initialView: 'dayGridMonth',
                dateClick: this.handleDateClick,
                events: [
                    {
                        title: '',
                        start: '',
                        end: ''
                    }
                ],
            },
            modalCheck : false,
            startDate : null,
            endDate : null,
            FormData: {
                startTime : null,
                endTime : null,
                scheduleTitle : '',
                content : '',
                member : {
                    id : ''
                }
            }
        }
    },
    methods: {
        openModal(){
            this.modalCheck = !this.modalCheck
        },
        scheduleHandler(memberId){
            console.log(memberId)
            const url = `${this.backURL}/schedule/calendar?memberId=${memberId}`
            axios.get(url,{params : this.data})
            .then(response=>{
                console.log(response.data)
                if(response.data && response.data.length > 0){
                    this.calendarOptions.events = response.data.map(event => ({
                        title: event.scheduleTitle,
                        start: event.startTime,
                        end: event.endTime
                    }));
                }
                console.log('캘린더옵션 events',this.calendarOptions.events)
            })
            .catch((Error)=>{
                console.log(Error)
            })
        },
        handleDateClick: function(arg) {
            this.startDate = arg.dateStr
            this.endDate = arg.dateStr
            this.openModal()
        },
        formatTime(time) {
            if (time instanceof Date) {
                const hours = time.getHours().toString().padStart(2, '0');
                const minutes = time.getMinutes().toString().padStart(2, '0');
                return `${hours}:${minutes}`;
            } else {
                // 문자열인 경우에 대한 처리 추가
                return time;
            }
        },
        scheduleAddHandler(memberId){
            
            if(this.endDate<this.startDate){
                alert("올바른 날짜 기입이 아닙니다. 기간을 다시 확인하세요.")
                return false
            }

            if(this.FormData.endTime<this.FormData.startTime){
                alert("올바른 시간 기입이 아닙니다. 시간을 다시 확인하세요.")
                return false
            }

            this.FormData.startTime = `${this.startDate} ${this.FormData.startTime}:00`
            this.FormData.endTime = `${this.endDate} ${this.FormData.endTime}:00`
            this.Formdata.member.id = memberId

            const url = `${this.backURL}/schedule/add`
            const data = this.Formdata
            console.log(data)

            axios.post(url,data)
                .then((Response)=>{
                    alert('성공')
                    this.modalCheck = !this.modalCheck
                    return false
                })
                .catch((Error)=>{
                    console.log(Error)
                })
        }
    },
    created(){
        const memberId = localStorage.getItem('memberId')
        this.scheduleHandler(memberId)
    }
}
</script>
<style scoped>
.event{
    background-color: #bbebe9; 
    width:100%;
    border : none;
    border-radius: 3px;
    padding : 2px;
    padding-left : 8px;
    color : rgb(7, 7, 7);
}
.modal-wrap {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}
/* modal or popup */
.modal-container {
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 550px;
  background: #fff;
  border-radius: 10px;
  padding: 20px;
  box-sizing: border-box;
  box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);
}
.modal-btn{
    position: relative;
    left: 50%;
    margin-top : 50px;
}
.ok{
    margin-right : 20px;
}
.cancel{
    margin-left : 20px;
}
</style>