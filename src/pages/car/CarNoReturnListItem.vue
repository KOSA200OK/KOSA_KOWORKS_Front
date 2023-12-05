<template lang="">
    <tr>
        <td>{{n.reqDate}}</td>
        <td>{{n.member.department.name}}</td>
        <td>{{n.member.name}}</td>
        <td>{{n.car.carNo}}</td>
        <td>{{n.startDate}} ~ {{n.endDate}}</td>
    </tr>
    
</template>
<script>
import axios from 'axios'
export default {
    name: 'CarNoReturnListItem',
    props:["n"],
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