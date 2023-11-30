<template lang="">
    <tr>
        <td>{{m.reqDate}}</td>
        <td>{{m.purpose}}</td>
        <td>{{m.startDate}} ~ {{m.endDate}}</td>
        <td><span v-if="m.status==1 && formatToYYMMDD(new Date())<=m.endDate && formatToYYMMDD(new Date())>=m.startDate || m.status==1 && formatToYYMMDD(new Date())<=m.startDate">승인완료</span>
            <span v-if="m.status==0">승인대기</span>
            <button class="applycancelbutton" v-if="m.status==0" @click="applyCancel">취소</button>
            <span v-if="m.status==2">반려</span></td>
    </tr>
</template>
<script>
import axios from 'axios'
export default {
    name: 'CarMyRentListItem',
    props:["m"],
    data(){
        return {
            reqDate : '',

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
        applyCancel(){
            const url = `${this.backURL}/carrent/reservecancel`
            axios.get(url)
            .then(response=>{
                this.carlist = response.data
            })
            .catch((Error)=>{
                console.log(Error)
            })
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
.applycancelbutton {
    margin-left: "20px";
}
</style>