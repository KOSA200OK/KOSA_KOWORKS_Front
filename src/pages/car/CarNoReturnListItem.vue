<template lang="">
    <tr @click="openModal">
        <td>{{n.reqDate}}</td>
        <td>{{n.member.department.name}}</td>
        <td>{{n.member.name}}</td>
        <td>{{n.car.carNo}}</td>
        <td>{{n.startDate}} ~ {{n.endDate}}</td>
    </tr>
    <div class="modal-wrap" v-show="modalCheck" >
        <div class="modal-container">
            <div class="noreturndetail">
                <span>예약자 : {{n.member.name}}</span><br><br>
                <span>소속부서 : {{n.member.department.name}}</span><br><br>
                <span>신청날짜 : {{n.reqDate}}</span><br><br><br>
                <span>차량번호 : {{n.car.carNo}}</span><br><br><br>
                <span>차종 : {{n.car.carType}}</span><br><br><br>
                <span>대여기간 : {{n.startDate}} ~ {{n.endDate}}</span><br><br><br>
                <span>대여목적 : {{n.purpose}}</span><br><br><br>
                <div class="modal-btn">
                    <button class="cancel" @click="openModal">취소</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    name: 'CarNoReturnListItem',
    props:["n"],
    data(){
        return {
            modalCheck : false
        }
    },
    methods: {
        openModal() {
            this.modalCheck = !this.modalCheck
            const today = new Date()
            console.log(today)
        }
    }
}
</script>
<style scoped>
tr{
    cursor : pointer;
}
td{
    padding : 25px;
    font-size: 15px;
    border-top : dotted 2px;
    border-color : #dfdfdf;
    text-align: center;
}
.purpose {
    cursor : pointer;
}
.applycancelbutton {
    margin-left: "20px";
}
.modal-wrap {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
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
  box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)
}
.modal-btn{
    position: relative;
    left: 50%;
    margin-top : 50px;
}
</style>