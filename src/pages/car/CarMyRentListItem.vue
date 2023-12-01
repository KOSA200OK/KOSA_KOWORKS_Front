<template lang="">
    <tr>
        <td>{{m.reqDate}}</td>
        <td class = "purpose" @click="openModal">{{m.purpose}}</td>
        <td>{{m.startDate}} ~ {{m.endDate}}</td>
        <td><span v-if="m.status==1 && formatToYYMMDD(new Date())<=m.endDate && formatToYYMMDD(new Date())>=m.startDate || m.status==1 && formatToYYMMDD(new Date())<=m.startDate">승인완료</span>
            <span v-if="m.status==0">승인대기</span>
            <button class="applycancelbutton" v-if="m.status==0" @click="applyCancel">취소</button>
            <span v-if="m.status==2">반려</span></td>
    </tr>
    <div class="modal-wrap" v-show="modalCheck" >
        <div class="modal-container">
            <div class="applydetail">
                <span>차량번호 : {{m.carNo}}</span><br><br>
                <span>차종 : {{m.carType}}</span><br><br>
                <span>대여기간 : {{m.startDate}} ~ {{m.endDate}}</span><br><br><br>
                <span>대여목적 : {{m.purpose}}</span><br><br><br>
                <span v-if="m.status==2">반려사유 : {{m.reject}}</span>
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
    name: 'CarMyRentListItem',
    props:["m"],
    data(){
        return {
            reqDate : '',
            modalCheck : false
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