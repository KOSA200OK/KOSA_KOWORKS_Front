<template lang="">
    <tr>
        <td @click="openModal">{{m.reqDate}}</td>
        <td @click="openModal">{{m.purpose}}</td>
        <td @click="openModal">{{m.startDate}} ~ {{m.endDate}}</td>
        <td><span v-if="m.status==1 && formatToYYMMDD(new Date())<=m.endDate">승인완료</span>
            <span class="tag" v-if="m.status==0" style="background-color: rgb(255, 217, 0);">대기</span>
            <span class="tag" v-if="m.status==2" style="background-color: rgb(252, 49, 49);">반려</span></td>
        <td>
            <button class="applycancelbutton" v-if="m.status==0" @click="applyCancel">취소</button>
        </td>
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
        },
        applyCancel(){
            const url = `${this.backURL}/carrent/cancelreserve/${this.m.id}`
            axios.delete(url)
            .then(response=>{
                console.log(response.status)
                alert("취소되었습니다.")
                window.location.reload()
            })
            .catch((Error)=>{
                console.log(Error)
            })
        }
    }
}
</script>
<style scoped>
tr:nth-child(even) {
    background-color: #f9f9f9;
}
tr:hover {
    background-color: #fcfcfc;
}
td {
    padding: 10px;
    text-align: center;
    border-bottom: px solid #ddd;
    border-top : dotted 1px #cccccc;
    font-size: 15px;
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
button{
    margin-left: 25px;
    background-color: #58d3e9;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}
button:hover{
    background-color: #58b5c5;
}
.tag{
    background-color: rgb(252, 49, 49);
    color: white;
    border-radius:15px;
    padding: 20px;
    padding-top: 5px;
    padding-bottom:5px;
    font-size: 12px;
}
</style>