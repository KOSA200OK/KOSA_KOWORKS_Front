<template lang="">
    <tr>
        <td @click="openModal">{{m.reqDate}}</td>
        <td @click="openModal">{{m.purpose}}</td>
        <td @click="openModal">{{m.startDate}} ~ {{m.endDate}}</td>
        <td><span class="tag" v-if="m.status==2 && currentDate<=m.endDate" style="background-color: rgb(25, 189, 74);">승인</span>
            <span class="tag" v-if="m.status==0" style="background-color: rgb(255, 217, 0);">대기</span>
            <span class="tag" v-if="m.status==1" style="background-color: rgb(252, 49, 49);">반려</span>
            <span class="tag" v-if="m.status==2 && currentDate>m.endDate" style="background-color: rgb(252, 49, 49);">미반납</span></td>
        <td>
            <button class="applycancelbutton" v-if="m.status==0" @click="applyCancel">취소</button>
        </td>
    </tr>
    <div class="modal-wrap" v-show="modalCheck" >
        <div class="modal-container">
            <button class="cancel" @click="openModal"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                </svg></button>
            <div class="applydetail">
                <label>차량번호</label><span style="font-size: 15px;">{{m.carNo}}</span><br><br>
                <label>차종</label><span style="font-size: 15px; margin-left:30px;">{{m.carType}}</span><br><br><br>
                <label>대여기간</label><span style="font-size: 15px;">{{m.startDate}} ~ {{m.endDate}}</span><br><br><br>
                <label>대여목적</label><span>{{m.purpose}}</span><br><br><br>
                <label>반려사유</label><span v-if="m.status==2">{{m.reject}}</span>
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
            currentDate : new Date(),
            reqDate : '',
            modalCheck : false
        }
    },
    methods: {
        openModal() {
            this.modalCheck = !this.modalCheck
        },
        formatYYYYmmdd(date){
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');

            return `${year}-${month}-${day}`
        },
        applyCancel(){
            const url = `${this.backURL}/carrent/cancelreserve/${this.m.id}`

            if(confirm("취소하시겠습니까?")){
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
    },
    created(){
        this.currentDate = this.formatYYYYmmdd(this.currentDate)
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
.cancel{
    float: right;
    color: #58d3e9;
}
.applycancelbutton{
    margin-left: 25px;
    background-color: #58d3e9;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}
.applycancelbutton:hover{
    background-color: #58b5c5;
}
.cancel:hover{
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