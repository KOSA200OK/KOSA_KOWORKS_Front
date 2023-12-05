<template lang="">
    <tr>
        <td>{{w.reqDate}}</td>
        <td>{{w.member.department.name}}</td>
        <td>{{w.member.name}}</td>
        <td>{{w.car.carNo}}</td>
        <td>{{w.startDate}} ~ {{w.endDate}}</td>
        <td><button class="approvebutton" @click="approve">승인</button><button class="rejectbutton" @click="openModal">반려</button></td>
    </tr>
    <div class="modal-wrap" v-show="modalCheck" >
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
                        <button class="cancel" @click="openModal">취소</button>
                    </div>
                </form>
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
            modalCheck:false,
            reject: '',
            formData: {
                id: this.w.id,
                reject: ''
            }
        }
    },
    methods: {
        openModal() {
            this.modalCheck = !this.modalCheck
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
            const data = this.formData
            axios.post(url,data)
                .then((Response)=>{
                    if(Response.status==200){
                    alert('반려되었습니다.')
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