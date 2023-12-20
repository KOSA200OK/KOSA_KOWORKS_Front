<template>
<main>
    <div class="calendar">
        <FullCalendar ref="fullCalendar" :options="calendarOptions" :events="calendarOptions.events" eventClick="scheduleDetailHandler">

        <template v-slot:eventContent='arg'>
            <div class="event" @click="scheduleDetailHandler(arg)">
                <b>{{formatTime(arg.event.start)}} {{ arg.event.title }}
                </b>
            </div>
        </template>

        </FullCalendar>
        <ScheduleInfo v-if="detailModalCheck" 
                    :c="c"
                    :detailModalCheck="detailModalCheck" 
                    @closeModal="closeModal" />
        <!--***************************일정 추가********************************-->
        <div class="modal-wrap" v-show="addModalCheck" >
            <div class="modal-container">
                <!-- <div class="modal-header">
                    <p>일정추가</p>
                </div> -->
                <button class="cancel" @click="closeAddModal"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
</svg></button>
                <div class="formdiv">
                <form class="add-schedule">
                    <label>제목 </label><input type="text" 
                                            v-model="FormData.scheduleTitle"
                                            class="title"
                                            maxlength="15"
                                            placeholder="15자 이내로 입력하세요"
                                            required><br><br>
                    <label>기간</label><input type="date"
                                        name="startDate"
                                        v-model="startDate"
                                        required> <input type="time"
                                        name="starttime"
                                        v-model="FormData.startTime"
                                        required><br><br>
                    <label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>~ <input type="date"
                           name="endDate"
                           v-model="endDate"
                           :min ="startDate"
                           required>
                           <input type="time"
                                  name="endtime"
                                   v-model="FormData.endTime"
                                   :min ="FormData.startTime"
                                   required><br><br>
                    <label>메모 </label><textarea class="content" 
                                            v-model="FormData.content"
                                            maxlength="60"
                                            placeholder="60자 이내로 입력하세요"></textarea>
                    <div class="modal-btn">
                        <button type="submit" class="ok" @click="scheduleAddHandler">등록</button>
                    </div>
                </form>
                </div>
            </div>
        </div>
    </div>    
</main>
</template>
<script>
import 'bootstrap-icons/font/bootstrap-icons.css'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import ScheduleInfo from '@/pages/schedule/ScheduleInfo.vue'
import { Calendar } from '@fullcalendar/core';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import 'bootstrap/dist/css/bootstrap.css'
import axios from 'axios'

export default {
    name: 'Calendar',
    components: {
        FullCalendar, ScheduleInfo // make the <FullCalendar> tag available
    },
    data() {
        return {
            c : null,
            calendarOptions: {
                plugins: [ bootstrap5Plugin, dayGridPlugin, interactionPlugin ],
                initialView: 'dayGridMonth',
                dateClick: this.handleDateClick,
                events: [
                    {
                        title: '',
                        start: '',
                        end: '',
                        extendedProps: {
                            eventId: '',
                            memo: ''
                        },
                    }
                ],
                themeSystem: 'bootstrap5',
                customButtons:{
                    addbutton: {
                        text: '일정추가',
                        click: this.openModal
                    }
                },
                headerToolbar: {
                    start : 'prev next',
                    center : 'title',
                    end : 'addbutton',
                    prev : 'arrow-left-square-fill',
                    next : 'arrow-right-square-fill'
                },
            },
            addModalCheck : false,
            detailModalCheck : false,
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
            this.addModalCheck = !this.addModalCheck
        },
        closeAddModal(){
            this.addModalCheck = !this.addModalCheck
            this.FormData.startTime = null
            this.FormData.endTime = null
            this.FormData.scheduleTitle = null
            this.FormData.content = null
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
                        end: event.endTime,
                        extendedProps: {
                            eventId : event.id,
                            memo: event.content
                        }
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
        scheduleAddHandler(){
            
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
            this.FormData.member.id = localStorage.getItem('memberId')

            const url = `${this.backURL}/schedule/add`
            const data = this.FormData
            console.log(data)

            axios.post(url,data)
                .then((Response)=>{
                    alert('성공')
                    this.addModalCheck = !this.addModalCheck
                    window.location.reload()
                })
                .catch((Error)=>{
                    console.log(Error)
                })
        },
        scheduleDetailHandler(arg){
            // console.log(arg.event.extendedProps);
            // alert(arg.event.extendedProps.memo)
            this.c = arg.event
            this.detailModalCheck = !this.detailModalCheck
        },
        closeModal(value){
            this.detailModalCheck = value
        }
    },
    created(){
        const memberId = localStorage.getItem('memberId')
        this.scheduleHandler(memberId)
    }
}
</script>
<style scoped>
/* .modal-header{
    background-color: #4199fd;
    border-radius: 10px 10px 0px 0px;
}
.modal-header > p{
    padding-top: 20px;
    padding-left: 20px;
    color: white;
    font-weight: 500;
    letter-spacing: 1px;
    font-size: 20px;
} */
.event{
    cursor: pointer;
    background-color: #e8ecff;
    width:100%;
    border-radius: 3px;
    padding : 2px;
    padding-left : 8px;
    color : #073f88;
    overflow: hidden;
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
  border-radius: 20px;
  padding: 50px;
  padding-top : 30px;
  box-sizing: border-box;
  box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);
}
.formdiv{
    margin-top : 30px;
}
.modal-btn{
    margin-top : 50px;
    text-align: center;
}
.ok{
    background-color: #2196f3;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}
.ok:hover {
    background-color: #2189df;
}
.cancel:hover {
    color : #58b5c5;
}
.ok{
    margin-right : 20px;
}
.cancel{
    color : #58d3e9;
    float: right;
}

label{
    /* color : #02449b; */
    font-weight: 700;
    font-size: 15px;
    padding-right : 40px;
    vertical-align: top;
}
.add-schedule>input{
    border : 1px solid #d8d8d8;
    height : 35px;
    font-size : 13px;
}
.title{
    width: 300px;
}
.content{
    border : 1px solid #d8d8d8;
    border-radius: 5px;
    font-size : 15px;
    width: 300px;
    height: 100px;
    resize: none;
    font-size : 13px;
    padding: 10px;
}

input{
    border : 1px solid #d8d8d8;
    border-radius: 5px;
    padding: 10px;
}

</style>