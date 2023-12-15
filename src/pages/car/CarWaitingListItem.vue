<template lang="">
    <tr>
        <td @click="openApproveModal">{{w.reqDate}}</td>
        <td @click="openApproveModal">{{w.member.department.name}}</td>
        <td @click="openApproveModal">{{w.member.name}}</td>
        <td @click="openApproveModal">{{w.car.carNo}}</td>
        <td @click="openApproveModal">{{w.startDate}} ~ {{w.endDate}}</td>
        <td><button class="approvebutton" @click="approve">승인</button>
            <button class="rejectbutton" @click="openRejectModal">반려</button></td>
    </tr>
    <div class="modal-wrap" v-show="rejectModalCheck" >
        <div class="modal-container">
            <div class="rejectdetail">
                <h3>반려사유</h3>
                <form class="rejectmessage" @submit.prevent="rejectHandler">
                    <input type="text" 
                            name="reject" 
                            v-model="reject" 
                            @input="inputHandler" 
                            placeholder="반려사유를 입력하세요."
                            required>
                    <div class="modal-btn">
                        <button type="submit" class="ok">완료</button>
                        <button class="cancel" @click="openRejectModal">취소</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <div class="modal-wrap" v-show="approveModalCheck" >
        <div class="modal-container">
            <div class="approvedetail">
                <label>신청자 : {{w.member.name}}</label><br><br>
                <label>부서명 : {{w.member.department.name}}</label><br><br>
                <label>차량번호 : {{w.car.carNo}}</label><br><br>
                <label>차종 : {{w.car.carType}}</label><br><br><br>
                <label>대여기간 : {{w.startDate}} ~ {{w.endDate}}</label><br><br><br>
                <label>대여목적 : {{w.purpose}}</label>
                <div class="modal-btn">
                    <button type="submit" class="ok" @click="approve">승인</button>
                    <button class="cancel" @click="openApproveModal">취소</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    name: 'CarWaitingListItem',
    props:["w"],
    data(){
        return {
            rejectModalCheck:false,
            approveModalCheck:false,
            reject: '',
            formData: {
                id: this.w.id,
                reject: ''
            }
        }
    },
    methods: {
        openRejectModal() {
            this.rejectModalCheck = !this.rejectModalCheck
        },
        openApproveModal() {
            this.approveModalCheck = !this.approveModalCheck
        },
        approve(){
            const url = `${this.backURL}/carrent/approve?id=${this.w.id}`
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
        },
        rejectHandler(){
            this.formData.reject = this.reject
            const url = `${this.backURL}/carrent/reject`
            // const data = this.formData
            axios.put(url,{
                id : this.w.id,
                reject: this.formData.reject
            })
                .then((Response)=>{
                    if(Response.status==200){
                    alert('반려되었습니다.')
                    window.location.reload()
                }
                })
                .catch((Error)=>{
                    console.log(Error)
                })
            // this.formData.reject = this.reject
            // const url = `${this.backURL}/carrent/reject`
            // const data = this.formData
            // axios.post(url,data)
            //     .then((Response)=>{
            //         if(Response.status==200){
            //         alert('반려되었습니다.')
            //         window.location.reload()
            //     }
            //     })
            //     .catch((Error)=>{
            //         console.log(Error)
            //     })
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
    cursor: pointer;
}
.rejectbutton{
    margin-left:10px;
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