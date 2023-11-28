<template lang="">
    <tr>
        <td>{{c.id}}</td>
        <td>{{c.carNo}}</td>
        <td>{{c.carType}}</td>
        <td><button v-if="c.status==0" @click="openModal">신청</button><span v-if="c.status==1">대여중</span></td>
    </tr>
    <div class="modal-wrap" v-show="modalCheck" >
        <div class="modal-container">
            <form class="apply">
                <label>신청자 : </label>
                <label>부서명 : </label>
                <label>차량번호 : {{c.carNo}}</label>
                <label>차종 : {{c.carType}}</label>
                <label>시작날짜 : <input type="date" id="startDate" v-model="startDate" :min="minStartDate" @input="inputHandler"/> ~ <input type="date" id="endDate" v-model="endDate" :min="minEndDate" @input="inputHandler"/></label>
                <label>대여목적 : <input type="text" id="purpose" v-model="purpose" @input="inputHandler"/></label>
            </form>
            <div class="modal-btn">
                <button @click="openModal">닫기</button>
                <button type=submit @click.prevent="reserveHandler">확인</button>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    name: 'CarListItem',
    props:["c"],
    data(){
        return {
            modalCheck : false,
            minStartDate: this.getCurrentDate(),
            minEndDate: this.getCurrentDate(),
            formData: {
                member: {
                    id: 1
                },
                car: {
                    id: this.c.id
                },
                startDate: '',
                endDate: '',
                purpose: ''
            }
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
        },
        inputHandler() {
            // startDate 값이 변경될 때 minEndDate를 업데이트합니다.
            this.minEndDate = this.startDate
            console.log(this.minEndDate)
            this.formData.startDate = this.startDate
            this.formData.endDate = this.endDate
            this.formData.purpose = this.purpose
        },
        reserveHandler(){
            this.formData.startDate = this.formatToYYMMDD(new Date(this.startDate));
            this.formData.endDate = this.formatToYYMMDD(new Date(this.endDate));
            const url = `${this.backURL}/carrent/reserve`
            const data = this.formData
            console.log(data)

            axios.post(url,data)
                .then((Response)=>{
                    alert('성공')
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
}
</style>