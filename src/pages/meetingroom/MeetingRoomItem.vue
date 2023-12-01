<template lang="">
    <tr>
        <td>
            <img :src="`@/images/${mr.meetingroom.name}.jpg`" :alt="mr.meetingroom.name">
            <br>{{mr.meetingroom.name}}
            <br><br><button>예약하기</button>
        </td>
        <td>{{mr.meetingDate}}&nbsp;{{mr.startTime}} - {{mr.endTime}}</td> 
    </tr>
</template>
<script>
export default {
    name: 'MeetingRoomItem',
    props:["mr"],
    data(){
        return {
            
        }
    },
    methods: {
        currentDate() {
            const current = new Date();
            const date = current.getFullYear()+'-'+(current.getMonth()+1)+'-'+current.getDate();
            return date;
        },
    }
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