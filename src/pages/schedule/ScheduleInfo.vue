<template>
    <div class="modal-wrap">
        <div class="modal-container">
            <div class="schedule-detail" v-if="modifyCheck==false">
                <span>제목 : {{c.title}}</span><br><br>
                <span>기간 : {{formatYYYYmmdd(c.start)}} ~ {{formatYYYYmmdd(c.end)}}</span><br><br>
                <span>시간 : {{formatHHmmss(c.start)}} ~ {{formatHHmmss(c.end)}}</span><br><br>
                <span v-if="c.extendedProps.memo">메모 : {{c.extendedProps.memo}}</span><br><br><br>
            </div>
            <div class="modal-btn" v-if="modifyCheck==false">
                <button type="submit" class="ok" @click="modifyModal">수정</button>
                <button class="delete" @click="deleteHandler">삭제</button>
                <button class="cancel" @click="$emit('closeModal')">취소</button>
            </div>
            <div class="modify-detail" v-if="modifyCheck==true">
                <label>제목 : </label><input type="text" 
                                            name="scheduleTitle"
                                        v-model="schedule.scheduleTitle"><br><br>
                <label>기간 : <input type="date"
                                     name="startDate"
                                     v-model="startDate"
                                     required> ~ <input type="date"
                                                        name="endDate"
                                                        v-model="endDate"
                                                        :min ="startDate"
                                                        required></label><br><br>
                <label>시간 : <input type="time"
                                     name="start"
                                     v-model="sTime"
                                     required> ~ <input type="time"
                                                        name="endtime"
                                                        v-model="eTime"
                                                        :min ="sTime"
                                                        required></label><br><br><br>
                <label>메모 : </label><input type="text" 
                                             name="content" 
                                             v-model="schedule.content">
            </div>
            <div class="modal-btn" v-if="modifyCheck">
                <button type="submit" class="ok" @click="modifyHandler">완료</button>
                <button class="cancel" @click="modifyModal">취소</button>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'

export default {
    name: 'ScheduleInfo',
    components: {
        
    },
    props: ["detailModalCheck", "c" ],
    data() {
        return {
            modifyCheck: false,
            startDate: null,
            endDate: null,
            sTime: null,
            eTime: null,
            schedule: {
                id : '',
                startTime : null,
                endTime : null,
                scheduleTitle :  '' ,
                content : '',
                member : {
                    id : ''
                }
            }
        }
    },
    methods: {
        modifyModal(){
            this.schedule.scheduleTitle = this.c.title 
            this.schedule.content = this.c.extendedProps.memo
            this.startDate = this.formatYYYYmmdd(this.c.start)
            this.endDate = this.formatYYYYmmdd(this.c.end)
            this.sTime = this.formatHHmmss(this.c.start)
            this.eTime = this.formatHHmmss(this.c.end)
            console.log(this.schedule.scheduleTitle)
            console.log(this.schedule.content)
            this.modifyCheck = !this.modifyCheck
        },
        closeModal(){
            // window.location.reload()
            this.detailModalCheck = !this.detailModalCheck
            this.$emit("closeModal",this.detailModalCheck)
        },
        formatYYYYmmdd(date){
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');

            return `${year}-${month}-${day}`
        },
        formatHHmmss(date){
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');

            return `${hours}:${minutes}`
        },
        modifyHandler(){
            console.log(this.c.extendedProps.eventId)
            this.schedule.id = this.c.extendedProps.eventId
            console.log(this.schedule.id)
            if(this.endDate<this.startDate){
                alert("올바른 날짜 기입이 아닙니다. 기간을 다시 확인하세요.")
                return false
            }

            if(this.eTime<this.sTime){
                alert("올바른 시간 기입이 아닙니다. 시간을 다시 확인하세요.")
                return false
            }
            
            this.schedule.startTime = `${this.startDate} ${this.sTime}:00`
            this.schedule.endTime = `${this.endDate} ${this.eTime}:00`

            const url = `${this.backURL}/schedule/modify`
            const data = this.schedule
            console.log(data)

            axios.put(url,data,{ withCredentials: true })
                .then((Response)=>{
                    alert('성공')
                    this.modifyCheck = !this.modifyCheck
                    window.location.reload()
                })
                .catch((Error)=>{
                    console.log(Error)
                })
        },
        deleteHandler(){
            const id = this.c.extendedProps.eventId
            const url = `${this.backURL}/schedule/delete/${id}`

            alert('삭제하시겠습니까?')

            axios.delete(url)
                .then((Response)=>{
                    alert('성공')
                    window.location.reload()
                })
                .catch((Error)=>{
                    console.log(Error)
                })
        }
    },
    created(){
        const memberId = localStorage.getItem('memberId')
        this.schedule.member.id = memberId
        // console.log(this.schedule)
    }
}
</script>
<style scoped>
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