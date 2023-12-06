<template lang="">
    <tr @click = "openModal">
        <td>{{r.reqDate}}</td>
        <td>{{r.member.department.name}}</td>
        <td>{{r.member.name}}</td>
        <td>{{r.car.carNo}}</td>
        <td>{{r.startDate}} ~ {{r.endDate}}</td>
    </tr>
    <div class="modal-wrap" v-show="modalCheck" >
        <div class="modal-container">
            <div class="rentdetail">
                <label>신청자 : {{r.member.name}}</label><br><br>
                <label>부서명 : {{r.member.department.name}}</label><br><br>
                <label>차량번호 : {{r.car.carNo}}</label><br><br>
                <label>차종 : {{r.car.carType}}</label><br><br><br>
                <label>대여기간 : {{r.startDate}} ~ {{r.endDate}}</label><br><br><br>
                <label>대여목적 : {{r.purpose}}</label>
            </div>
                <div class="modal-btn">
                    <button class="cancel" @click="openModal">취소</button>
                </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    name: 'CarAllRentListItem',
    props:["r"],
    data(){
        return {
            reqDate : '',
            modalCheck : false
        }
    },
    methods: {
        openModal() {
            this.modalCheck = !this.modalCheck
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
    cursor : pointer;
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