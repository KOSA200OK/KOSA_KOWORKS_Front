<template lang="">
    <tr>
        <td>{{w.reqDate}}</td>
        <td>{{w.member.department.name}}</td>
        <td>{{w.member.name}}</td>
        <td>{{w.car.carNo}}</td>
        <td>{{w.startDate}} ~ {{w.endDate}}</td>
        <td><button class="approvebutton" @click="approve">승인</button><button class="rejectbutton" @click="openModal">반려</button></td>
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
        approve(){
            const url = `${this.backURL}/carrent/approve?id=${this.w.id}&status=2`
            axios.get(url)
            .then(response=>{
                if(response.status==200){
                    alert('승인되었습니다.')
                    window.location.reload()
                }
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
.rejectbutton{
    margin-left:10px;
}

</style>