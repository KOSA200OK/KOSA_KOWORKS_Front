<template lang="">
    <tr>
        <td>{{mrr.id}}</td>
        <td>{{mrr.meetingroom.name}}</td>
        <td>{{mrr.meetingDate}}&nbsp;{{mrr.startTime}} - {{mrr.endTime}}</td>

        <!--시간 비교해서 다른 버튼 띄우기-->
        <td v-if="currentDateTime() > originalEndTime()">
            <button class="resinfo" @click="openModal">상세보기</button>
            <InfoModal
            :show="showModal" 
            :mrr="mrr" 
            @close="closeModal"/>
        </td>
        <td v-else>
            <button class="update" @click="openUpdateModal">수정</button>&nbsp; 
            <UpdateModal
            :show="showUpdateModal" 
            :mrr="mrr" 
            @close="closeModal"/>
            <button class="cancel" @click="openCancelModal">취소</button>
            <CancelModal
            :show="showCancelModal" 
            :mrr="mrr" 
            @close="closeModal"/>
        </td>
    </tr>
</template>
<script>
import InfoModal from "@/pages/meetingroom/MeetingRoomResInfo.vue";
import UpdateModal from "@/pages/meetingroom/MeetingRoomResModify.vue";
import CancelModal from "@/pages/meetingroom/MeetingRoomResDelete.vue";

export default {
    name: 'MeetingRoomResItem',
    props:["mrr"],
    components: {
        InfoModal, UpdateModal, CancelModal
    },
    data(){
        return {
            showModal: false,
            showUpdateModal: false,
            showCancelModal: false,
        }
    },
    methods: {
        currentDateTime() {
            const current = new Date();
            const date = current.getFullYear()+'-'+(current.getMonth()+1)+'-'+current.getDate();
            const time = current.getHours() + ":" + current.getMinutes() + ":" + current.getSeconds();
            const dateTime = date +' '+ time; 
            const datestring = dateTime;
            return new Date(datestring)
        },
        originalEndTime() {
            const dateTimeString = `${this.mrr.meetingDate} ${this.mrr.endTime}:00`;
            return new Date(dateTimeString);
        },
        openModal() {
            this.showModal = true;
        },
        openUpdateModal() {
            this.showUpdateModal = true;
        },
        openCancelModal() {
            this.showCancelModal = true;
        },
        closeModal() {
            this.showModal = false;
            this.showUpdateModal = false;
            this.showCancelModal = false;
        }
    },

}
</script>
<style scoped>

td {
  width: 150rem;
  height: 80px;
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
  text-align: center;
}

</style>