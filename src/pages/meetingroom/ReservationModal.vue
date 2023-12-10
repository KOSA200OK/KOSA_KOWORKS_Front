<template>
  <div v-if="show" class="modal-overlay">
    <!-- 모달 컨텐츠 -->
    <!-- Modal content -->
    <div class="modal-content">
        <!-- Modal header -->
        <div class="modalheader">
            <h2 class="title">
                회의실 예약하기
            </h2>
            <button @click="closeModal" class="close">
                <svg class="closebutton" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
            </button>
        </div>
        <br><br><br><br>
        <!-- Modal body -->

        <!--희의실 정보-->
        <div class="meetingroominfo">
            <div class="title"><h3>회의실 정보</h3></div><br><br>
            
            <div class="img">
              <img :src="`../../images/${mr.name}.jpg`" :alt="mr.name">
            </div>

            <div class="detail">
              <div class="roomname"><b>{{mr.name}}</b></div>
              <br>
              <div class="location"><b>위치: </b>{{mr.location}}</div>
              <br>
              <div class="maxnum"><b>최대 수용 인원: </b>{{mr.maxNum}}인</div>
              <br>
              <div>
                  <b>구비 품목:</b><br>
                  모니터 {{mr.monitor}}대,<br>
                  빔프로젝트 {{mr.projector}}대,<br>
                  콘센트 {{mr.socket}}개,<br>
                  마커 {{mr.marker}}개,<br>
                  {{mr.id}}
              </div>
            </div>
        </div>

        <!--희의실 예약 정보 입력-->
        <form class="modalform" @submit.prevent="saveReservationHandler">
            <div class="grid gap-4 mb-4 grid-cols-2">
                <div class="meetingroom">
                    <label class="labelroom">자원 이름*</label><br>
                    <select 
                    id="category" 
                    v-model="mr.name"
                    class="meetingroom"
                    @change="updateMeetingId"
                    required>
                        <option selected="">자원을 선택해주세요</option>
                        <!-- <option v-for="mrinfo in mrlist" :key="mrinfo.id" :value="mrinfo.name">
                          {{ meeting.name }}
                        </option> -->
                        <option id=1 value="회의실1">회의실1</option>
                        <option id=2 value="회의실2">회의실2</option>
                        <option id=3 value="회의실3">회의실3</option>
                        <option id=4 value="회의실4">회의실4</option>
                    </select>
                </div>
                <div class="resdate">
                    <label for="date" class="labeldate">날짜*</label><br>
                    <VueDatePicker 
                    v-model="meetingDate"
                    name="meetingDate"
                    :enable-time-picker="false"
                    :format="formatDate"
                    :input-props="{ placeholder: 'Pick the date' }"
                    @update:model-value="updateMeetingDate"
                    required
                    />
                </div>
                <div class="restime">
                    <div class="col1">
                        <label class="labelstart">시작 시간*</label><br>              
                        <VueDatePicker
                        v-model="startTime"
                        name="startTime"
                        time-picker disable-time-range-validation
                        minutes-increment="30"
                        minutes-grid-increment="30"
                        :min-time="{ hours: 8, minutes: 0 }"
                        :max-time="{ hours: 20, minutes: 0 }"
                        :format="format"
                        @update:model-value="updateStartTime"
                        required
                        />
                    </div>
                    <div class="col2">
                        <label class="labelend">종료 시간*</label><br>                  
                        <VueDatePicker 
                        v-model="endTime"
                        name="endTime"
                        minutes-increment="30"
                        minutes-grid-increment="30"
                        time-picker disable-time-range-validation
                        :min-time="`${startTime}`"
                        :max-time="{ hours: 20, minutes: 0 }"
                        :format="format"
                        @update:model-value="updateEndTime"
                        required
                        />
                    </div>
                </div>
                <div class="purpose">
                    <label class="labelpurpose">사용 목적*</label><br>
                    <textarea
                    v-model="formData.purpose"
                    id="purpose" 
                    name="purpose" rows="4" 
                    placeholder="사용 목적을 입력해주세요"
                    required></textarea>                    
                </div>
            </div>
            <div class="button">
                <button type="submit" class="savebtn"><b>저장</b></button>
                &nbsp;
                <button class="cancelbtn" @click="closeModal"><b>취소</b></button>
            </div>
        </form>
    </div>
  </div>
</template>
<script>
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import {reactive} from 'vue';
import axios from 'axios'

export default {
  props: {
    show: Boolean,
    mr: {
      type: Object,
      required: true,
    }
  },
  components: { VueDatePicker },
  data() {
    return {
        id: '',
        startTime: '', // 시작 시간
        endTime: '',   // 종료 시간
        meetingDate: '', //회의 날짜
        purpose: '', //회의 목적
        format: 'HH:mm', // 시간 형식
        formatDate: 'yyyy-MM-dd', //날짜 형식

        formData: {
          startTime: '', // 시작 시간
          endTime: '',   // 종료 시간
          meetingDate: '', //회의 날짜
          purpose: '', //회의 목적
          meetingroom: {
            id: 0
          },
          member: {
            id: '3'
          },
          participants: [
            {
              member: {
                id: '1'
              }
            },
            {
              member: {
                id: '0002'
              }
            }
          ],
        },
        selectedMeeting: 0, // 선택된 회의실 id
        originalMeeting: 0, // 모달 열 때의 초기 id
    }
  },
  setup() {
    const state = reactive({
        date: null,
        startTime: {hours: 8, minutes: 0},
    })
  },
  methods: {
    openModal() {
      // 모달 열 때 초기 값 저장
      // this.originalMeeting = this.selectedMeeting;
      // this.originalMeeting = {...this.mr};
      // this.originalMeeting = this.mr.id;
    },
    closeModal() {
      this.$emit("close");
    },
    created() {
      this.starttime = "{ hours: 8, minutes: 0 }";
    },
    updateMeetingId() {
      console.log(this.id);
      this.formData.meetingroom.id = this.id;
    },
    updateStartTime() {
      const hours = this.startTime.hours < 10 ? '0' + this.startTime.hours : this.startTime.hours;
      const minutes = this.startTime.minutes < 10 ? '0' + this.startTime.minutes : this.startTime.minutes;
      // "HH:mm" 형식의 문자열로 변환
      this.startTime = `${hours}:${minutes}`;
      console.log(this.startTime);
      
      this.formData.startTime = this.startTime;
    },
    updateEndTime() {
      const endhours = this.endTime.hours < 10 ? '0' + this.endTime.hours : this.endTime.hours;
      const endminutes = this.endTime.minutes < 10 ? '0' + this.endTime.minutes : this.endTime.minutes;
      this.endTime = `${endhours}:${endminutes}`;
      console.log(this.endTime);

      this.formData.endTime = this.endTime;
    },
    updateMeetingDate() {
      const date = this.meetingDate;
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const formattedDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
      this.meetingDate = formattedDate
      console.log(this.meetingDate)

      this.formData.meetingDate = this.meetingDate;
    },
    saveReservationHandler(e) {
      const url = `${this.backURL}/meetingroom`
      const data = this.formData

      console.log(this.formData)
      axios
        .post(url, data)
        .then(response => {
          location.href = "/meetingroom"
          alert("예약되었습니다!")
        })
        .catch(error => {
          alert(error.message)
        })
    }
  },
  watch: {

  },
};
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

.title {
    float: left;
    padding: 10px;
}

.meetingroominfo {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 2개의 열로 설정 */
  gap: 1rem; /* 간격 조절 */
  margin-bottom: 1rem; /* 아래쪽 여백 추가 */

  padding: 10px;
}

.img {
  vertical-align: middle;
}

img {
  grid-column: 1;
}

.detail {
  grid-column: 2;
}

img {
  width: 200px;
  height: 200px;
  flex: left;
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


/* 모달 내 폼 부분 */
.modalform {

}

select {
    width: 100%;
    border-radius: var(--dp-border-radius);
    border: 1px solid lightgray;
    padding: 10px;
    color: #333;
}

.meetingroom .resdate{
    grid-column: span 2;
}

label {
    margin-bottom: 10px;
}

div.meetingroom, div.resdate,
div.resdate, div.col1, div.col2,
div.purpose {
    padding: 5px;
    margin: 5px;
}

.col1 {
  grid-column: 1; /* 첫 번째 열에 배치 */
}

.col2 {
  white-space : nowrap;
  grid-column: 2; /* 두 번째 열에 배치 */
}

textarea {
    width: 100%;
    border-radius: var(--dp-border-radius);
    border: 1px solid lightgray;
    padding: 10px;
}

textarea:active {
  border: 1px solid blue;
}

div.button {
    text-align: center;
}

button.savebtn {
  display: inline-block;

  border-radius: 4px;
  background: var(--dark);
  color: #ddd;
  border: none;

  text-align: center;
  font-size: 14px;

  padding: 5px;
  width: 100px;
  height: 35px;
  vertical-align: middle;
  align-items: center;
}

button.cancelbtn {
  display: inline-block;

  border-radius: 4px;
  color: var(--dark);
  border: 2px solid var(--dark);

  text-align: center;
  font-size: 14px;

  padding: 5px;
  width: 100px;
  height: 35px;
  vertical-align: middle;
  align-items: center;
}
</style>