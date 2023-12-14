<template>
  <div class="login-container">
    <!-- <h2 v-if="!isLoggedIn">Login</h2> -->
    <form class="login-form" v-if="!isLoggedIn" @submit.prevent="login">
      <!-- <label for="id">사원번호: </label> -->
      <img class="login-img" :src="`../images/logo.png`" alt="logo" />
      <input
        class="member-input"
        v-model="id"
        type="text"
        id="id"
        required
        placeholder="사원번호"
      />

      <!-- <label for="password">비밀번호: </label> -->
      <input
        class="password-input"
        v-model="password"
        type="password"
        id="password"
        required
        placeholder="비밀번호"
      />
      <button class="login-button" type="submit">로그인</button>
    </form>
    <!-- 찬석 -->
    <div
      class="notify_bar"
      v-if="notifyMessage"
      @click="handleNotificationClick"
    >
      {{ notifyMessage }}
    </div>

    <router-view v-if="isLoggedIn"></router-view>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      id: "",
      password: "",
      isLoggedIn: false,
      // 찬석
      notifyMessage: "",
      notificationTimer: null,
    };
  },
  // component 생성되자마자 호출, 새로고침 할 때마다 호출
  created() {
    // 페이지가 로드될 때 세션 정보를 확인
    this.findSession();
  },
  methods: {
    async login() {
      try {
        // response에 LoginRequestDTO값을 받아옴
        const response = await axios.post(`${this.backURL}/login`, {
          id: this.id,
          password: this.password,
        });
        //로그인하면 상태를 true로 변경
        this.isLoggedIn = true;

        // localStorage에 로그인 상태 저장
        localStorage.setItem("isLoggedIn", "true");

        // localStorage에 memberId로 id저장
        localStorage.setItem("memberId", response.data.memberId);

        // localStorage에 departmentId로 departmentId저장
        localStorage.setItem("departmentId", response.data.departmentId);

        // localStorage에 name으로 사원이름 저장
        localStorage.setItem("name", response.data.name);

        // SSE 구독 시작 ==
        this.startSSE();

        this.$router.push("/home");
        this.$data.user = response.data;
        location.reload();
      } catch (error) {
        console.error("로그인 실패:", error);
      }
    },

    // 찬석
    async startSSE() {
      if (this.isLoggedIn) {
        const id = localStorage.getItem("memberId");

        // String id = localStorage.getItem
        // EventSource를 이용해 SSE 구독 시작
        // this.eventSource = new EventSource(`${this.backURL}/subscribe/${this.id}`);
        this.eventSource = new EventSource(`${this.backURL}/subscribe/${id}`);

        this.eventSource.addEventListener("sse", (event) => {
          console.log(event.data);
          console.log(event);

          const data = JSON.parse(event.data);

          // 브라우저의 알림 표시
          this.showNotification(data);
          // this.showNotification(event.data);
        });
      }
    },

    // 찬석
    async showNotification(data) {
      // 브라우저 알림
      const notification = new Notification("제목", {
        body: data.content,
      });

      this.notifyMessage = data.content;

      // 브라우저의 알림이 클릭 되었을 때
      notification.addEventListener("click", () => {
        window.open(data.url, "_blank");
      });
      // 타이머를 설정하여 10초 후에 알림을 숨김
      this.notificationTimer = setTimeout(() => {
        this.notifyMessage = "";
      }, 10 * 1000);
    },

    async findSession() {
      //----
      // 브라우저 스토리지에서 로그인 상태 확인
      const storedLoggedIn = localStorage.getItem("isLoggedIn");
      this.isLoggedIn = storedLoggedIn === "true";

      if (this.isLoggedIn) {
        console.log("로그인 상태입니다. id: ");

        // 찬석
        // 이전 SSE 구독을 중지
        this.stopSSE();

        // memberId 값이 존재할 때만 SSE 구독 시작
        if (this.isLoggedIn) {
          console.log("이전 로그인 정보로 SSE 구독 시작합니다.");
          this.startSSE(this.isLoggedIn);
        }
      } else {
        console.log("로그인하지 않은 상태입니다.");
      } // if-else
    },

    async logout() {
      try {
        // SSE 연결 해제 -> 찬석
        if (this.eventSource) {
          this.eventSource.close();
          this.eventSource = null;
        }
        // =============

        await axios.get(`${this.backURL}/logout`, {});
        this.isLoggedIn = false;

        // localStorage에서 로그인 상태 제거
        localStorage.removeItem("isLoggedIn");

        // localStorage에서 memberId 제거
        localStorage.removeItem("memberId");

        // localStorage에서 departmentId 제거
        localStorage.removeItem("departmentId");

        localStorage.removeItem("name");
        this.$router.push("/home");
        //화면 새로고침
        location.reload();
      } catch (error) {
        console.error("로그아웃 실패:", error);
      }
    },
    // ========================== 구독 중지 ============================ > 찬석
    async stopSSE() {
      // 이전 SSE 구독을 중지하고 eventSource 초기화
      if (this.eventSource) {
        this.eventSource.close();
        this.eventSource = null;
        console.log("이전 SSE 구독을 중지합니다.");
      }
    },
  },
};
</script>
<style scoped>
.login-container {
  background-color: white;
  width: 100vw;
}

.notify_bar {
  margin-top: 880px;
  margin-left: 1460px;
  width: 400px;
  height: 100px;
  padding: 10px;
  /* 알림 내용과의 간격 조정을 위한 패딩 */
  background-color: #009ea8;
  /* 배경색 지정 */
  border: 2px solid whitesmoke;
  /* 테두리 설정 */
  border-radius: 5px;
  /* 둥근 테두리를 위한 속성 */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  /* 그림자 효과 */
  text-align: center;
  /* 텍스트 가운데 정렬 */
  font-family: Arial, sans-serif;
  color: white;
  /* 텍스트 색상 */
  position: absolute;
}
/*  */
.login-form {
  max-width: 400px;
  width: 100%;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
  text-align: center;
  margin: 0 auto;
}

.member-input {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}
.password-input {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.login-button {
  width: 100%;
  padding: 12px;
  background-color: #2196f3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 18px;
  margin-top: 20px; /* 버튼 위쪽 여백 추가 */
}

.login-img {
  width: 100px;
  height: auto;
}
</style>

<!-- test -->
