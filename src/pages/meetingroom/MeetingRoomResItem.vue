<template lang="">
    <tr>
        <td>{{mrr.id}}</td>
        <td>{{mrr.meetingroom.name}}</td>
        <td>{{mrr.meetingDate}}&nbsp;{{mrr.startTime}} - {{mrr.endTime}}</td>

        <!--시간 비교해서 다른 버튼 띄우기-->
        <td v-if="currentDateTime() > originalEndTime()">
            <button>상세보기</button>
        </td>
        <td v-else>
            <button>수정</button>&nbsp; <button>취소</button>
        </td>
    </tr>
</template>
<script>
export default {
    name: 'MeetingRoomResItem',
    props:["mrr"],
    data(){
        return {
            
        }
    },
    methods: {
        currentDateTime() {
            const current = new Date();
            const date = current.getFullYear()+'-'+(current.getMonth()+1)+'-'+current.getDate();
            const time = current.getHours() + ":" + current.getMinutes() + ":" + current.getSeconds();
            const dateTime = date +' '+ time; 
            const datestring = dateTime;
            return new Date(datestring)
        },
        originalEndTime() {
            const dateTimeString = `${this.mrr.meetingDate} ${this.mrr.endTime}:00`;
            return new Date(dateTimeString);
        },
    },

}
</script>
<style scoped>

td {
  width: 150rem;
  height: 80px;
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
  text-align: center;
}

</style>