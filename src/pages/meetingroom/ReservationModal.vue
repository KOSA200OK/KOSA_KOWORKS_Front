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
        <form class="modalform">
            <div class="grid gap-4 mb-4 grid-cols-2">
                <div class="meetingroom">
                    <label for="name" class="labelroom">자원 이름</label><br>
                    <select id="category" class="meetingroom">
                        <option selected="">자원을 선택해주세요</option>
                        <option value="회의실1">회의실1</option>
                        <option value="회의실2">회의실2</option>
                        <option value="회의실3">회의실3</option>
                        <option value="회의실4">회의실4</option>
                    </select>
                </div>
                <div class="resdate">
                    <label for="date" class="labeldate">날짜</label><br>
                    <VueDatePicker 
                    v-model="date" 
                    :enable-time-picker="false"
                    :input-props="{ placeholder: 'Pick the date' }"
                    />
                </div>
                <div class="restime">
                    <div class="col1">
                        <label for="starttime" class="labelstart">시작 시간</label><br>              
                        <VueDatePicker 
                        v-model="starttime" 
                        time-picker disable-time-range-validation
                        minutes-increment="30"
                        minutes-grid-increment="30"
                        :min-time="{ hours: 8, minutes: 0 }"
                        :max-time="{ hours: 20, minutes: 0 }"
                        :format="format"
                        :input-props="{ placeholder: 'Select Start Time' }"
                        />
                    </div>
                    <div class="col2">
                        <label for="endtime" class="labelend">종료 시간</label><br>                  
                        <VueDatePicker 
                        v-model="endtime"
                        minutes-increment="30"
                        minutes-grid-increment="30"
                        time-picker disable-time-range-validation
                        :min-time="`${starttime}`"
                        :max-time="{ hours: 20, minutes: 0 }"
                        :format="format"
                        :input-props="{ placeholder: 'Select End Time' }"
                        />
                    </div>
                </div>
                <div class="purpose">
                    <label for="description" class="labelpurpose">사용 목적</label><br>
                    <textarea id="purpose" rows="4" class="" placeholder="사용 목적을 입력해주세요"></textarea>                    
                </div>
            </div>
        </form>
        <div class="button">
            <button type="submit" class="savebtn"><b>저장</b></button>
            &nbsp;
            <button class="cancelbtn" @click="closeModal"><b>취소</b></button>
        </div>
    </div>
  </div>
</template>
<script>
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import {reactive} from 'vue';

export default {
  props: {
    show: Boolean,
  },
  components: { VueDatePicker },
  data() {
    return {
        date: '', //회의 날짜
        starttime: '', // 시작 시간
        endtime: '',   // 종료 시간
        format: 'HH:mm', // 시간 형식
    }
  },
  setup() {
    const state = reactive({
        date: null,
        startTime: {hours: 8, minutes: 0},
    })
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
    created() {
      this.starttime = "{ hours: 8, minutes: 0 }";
    }
  },
  watch: {
    // starttime(newStartTime) {
    //   // 시작 시간이 변경될 때마다 종료 시간을 업데이트
    //   this.calculateEndTime(newStartTime);
    // },
  }
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
  width: 500px;
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