<template lang="">
    <tr>
        <td>{{m.reqDate}}</td>
        <td>{{m.purpose}}</td>
        <td>{{m.startDate}} ~ {{m.endDate}}</td>
        <td><span>대여중</span><span>승인완료</span><span>승인대기중</span><span>승인반려</span><span>종료</span></td>
    </tr>
</template>
<script>
import axios from 'axios'
export default {
    name: 'CarMyRentListItem',
    props:["m"],
    data(){
        return {

        }
    },
    methods: {
        openModal() {
            this.modalCheck = !this.modalCheck
        },
        formatToYYMMDD(date) {
            const year = String(date.getFullYear()).slice(2)
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}/${month}/${day}`;
        },
        getCurrentDate() {
            const today = new Date()
            const year = today.getFullYear()
            const month = String(today.getMonth() + 1).padStart(2, '0')
            const day = String(today.getDate()).padStart(2, '0')
            return `${year}-${month}-${day}`
        }
    }
}
</script>
<style scoped>
td{
    padding : 25px;
    font-size: 15px;
    border-top : dotted 2px;
    border-color : #dfdfdf;
    text-align: center;
}
</style>