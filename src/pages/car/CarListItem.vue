<template lang="">
    <tr>
        <td>{{c.id}}</td>
        <td>{{c.carNo}}</td>
        <td>{{c.carType}}</td>
        <td><button v-if="c.status==0" @click="openModal">신청</button></td>
    </tr>
    <div class="modal-wrap" v-show="modalCheck" >
        <div class="modal-container">
            <form class="apply" @submit.prevent="reserveHandler">
                <label>신청자 : </label><br><br>
                <label>부서명 : </label><br><br>
                <label>차량번호 : {{c.carNo}}</label><br><br>
                <label>차종 : {{c.carType}}</label><br><br><br>
                <label>대여기간 : </label><input type="date" 
                                    name="startDate" 
                                    v-model="startDate"
                                    :min="minStartDate" 
                                    @input="inputHandler" 
                                    required>
                                     ~ <input type="date" 
                                                name="endDate" 
                                                v-model="endDate" 
                                                :min="minEndDate" 
                                                @input="inputHandler" 
                                                required><br><br><br>
                <label>대여목적 : </label><input type="text" 
                                        name="purpose" 
                                        v-model="purpose" 
                                        @input="inputHandler" 
                                        placeholder="대여목적을 입력하세요."
                                        required>
                <div class="modal-btn">
                    <button type="submit" class="ok">신청</button>
                    <button class="cancel" @click="openModal">취소</button>
                </div>
            </form>
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
            startDate: "",
            endDate: "",
            purpose: "",
            modalCheck : false,
            minStartDate: this.getCurrentDate(),
            minEndDate: this.getCurrentDate(),
            formData: {
                member: {
                    id: "0002"
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

            if(this.formData.endDate<this.formData.startDate){
                alert("올바른 날짜 기입이 아닙니다. 대여기간을 다시 확인하세요.")
                return false
            }

            const url = `${this.backURL}/carrent/reserve`
            const data = this.formData
            console.log(data)

            axios.post(url,data)
                .then((Response)=>{
                    alert('성공')
                    this.modalCheck = !this.modalCheck
                    return false
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
  box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)
}
.modal-btn{
    position: relative;
    left: 50%;
    margin-top : 50px;
}
.ok{
    margin-right : 20px;
}
.cancel{
    margin-left : 20px;
}
</style>