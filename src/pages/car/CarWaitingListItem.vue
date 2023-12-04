<template lang="">
    <tr>
        <td>{{w.reqDate}}</td>
        <td>{{w.member.department.name}}</td>
        <td>{{w.member.name}}</td>
        <td>{{w.car.carNo}}</td>
        <td>{{w.startDate}} ~ {{w.endDate}}</td>
        <td><button class="approvebutton">승인</button><button class="rejectbutton" @click="openModal">반려</button></td>
    </tr>
    
</template>
<script>
import axios from 'axios'
export default {
    name: 'CarWaitingListItem',
    props:["w"],
    data(){
        return {
            
        }
    },
    methods: {
        openModal() {
            this.modalCheck = !this.modalCheck
        },
        
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
.rejectbutton{
    margin-left:10px;
}

</style>