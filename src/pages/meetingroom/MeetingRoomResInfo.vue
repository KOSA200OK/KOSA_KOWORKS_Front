<template>
    <div v-if="show" class="modal-overlay">
        <!-- 모달 컨텐츠 -->
        <!-- Modal content -->
        <div class="modal-content">
            <!-- Modal header -->
            <div class="modalheader">
                <h2 class="title">
                    회의실 예약 상세
                </h2>
                <button @click="closeModal" class="close">
                    <svg class="closebutton" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                </button>
            </div>
            <br><br>
            <!-- Modal body -->
            <!--회의 정보-->
            <div class="meetingroominfo">
                <div class="title"><h3>{{mrr.meetingroom.name}}</h3></div><br><br>
                
                <div>
                <img class="img" :src="`../../images/${mrr.meetingroom.name}.jpg`" :alt="mrr.meetingroom.name">
                </div>

                <div class="detail">
                    <div class="location"><b>위치: </b>{{mrr.meetingroom.location}}</div>
                    <br>
                    <div class="maxnum"><b>최대 수용 인원: </b>{{mrr.meetingroom.maxNum}}인</div>
                </div>
            </div>
            <hr><br>
            <!--예약 정보-->
            <div class="reservationinfo">
                <div class="member">
                    <b>예약자: </b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {{mrr.member.name}}
                </div>
                <br>
                <div class="date">
                    <b>회의 날짜: </b> &nbsp;&nbsp;&nbsp;&nbsp; {{mrr.meetingDate}}
                </div>
                <br>
                <div class="time">
                    <b>시간: </b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {{mrr.startTime}} - {{mrr.endTime}}
                </div>
                <br>
                <div class="participants">
                    <b>회의 참여자: </b> &nbsp;&nbsp;&nbsp;&nbsp; 
                    <p v-for="mp in mrr.participants">
                      <span>{{mp.member.name}}</span>
                    </p>
                </div>
                <br>
                <div class="purpose">
                    <b>사용목적: </b>&nbsp;&nbsp;&nbsp;&nbsp;{{mrr.purpose}}
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {reactive} from 'vue';

export default {
  props: {
    show: Boolean,
    mrr: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {

    }
  },
  setup() {
    const state = reactive({
        // date: null,
        // startTime: {hours: 8, minutes: 0},
    })
  },
  methods: {
    openModal() {

    },
    closeModal() {
      this.$emit("close");
    },
  }
}
</script>
<style scoped>
/* 모달을 화면 중앙에 위치시키기 위한 스타일 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 모달 컨텐츠 부분 */
.modal-content {
  width: 700px;
  background: #fff;
  padding: 20px;
  border-radius: 8px;

  align-content: center;
  align-items: center;
  justify-content: center;
  text-align: left;
}

button.close {
  float: right;
  align-content: center;
  align-items: center;
  justify-content: center;
  align-items: center;
  vertical-align: middle;

  padding-top: 15px;
}

.closebutton {
  float: right;
  width: 30px;
  height: 30px;
}

.meetingroominfo {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 2개의 열로 설정 */
  gap: 1rem; /* 간격 조절 */
  margin-bottom: 1rem; /* 아래쪽 여백 추가 */

  padding: 10px;
}

.img {
  grid-column: 1;
  width: 200px;
  height: 200px;
  flex: left;
}

.detail {
  grid-column: 2;
}

span {
  white-space: nowrap;
}

hr{
  border: 0.1rem solid #ddd;
}

</style>