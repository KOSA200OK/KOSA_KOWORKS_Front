<template>
  <div class="login-container">
    <h2 v-if="!isLoggedIn">Login</h2>
    <form v-if="!isLoggedIn" @submit.prevent="login">
      <label for="id">사원번호: </label>
      <input v-model="id" type="text" id="id" required />

      <label for="password">비밀번호: </label>
      <input v-model="password" type="password" id="password" required />

      <button type="submit">Login</button>
    </form>
    <form v-if="isLoggedIn" @submit.prevent="logout">
      <button type="submit">Logout</button>
    </form>

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
        const response = await axios.post("http://localhost:8880/login", {
          id: this.id,
          password: this.password,
        });
        this.isLoggedIn = true;
        // 브라우저 스토리지에 로그인 상태 저장
        localStorage.setItem("isLoggedIn", "true");
        //localStorage에 memberId로 id저장
        localStorage.setItem("memberId", this.id);

        // SSE 구독 시작 ==
        this.startSSE();

        this.$router.push("/home");
        this.$data.user = response.data;
      } catch (error) {
        console.error("로그인 실패:", error);
      }
    },

    // 찬석
    async startSSE() {
      if (this.isLoggedIn) {
        // EventSource를 이용해 SSE 구독 시작
        this.eventSource = new EventSource(
          `${this.backURL}/subscribe/${this.id}`
        );

        this.eventSource.addEventListener("sse", (event) => {
          console.log(event.data);

          const data = JSON.parse(event.data);

          // 브라우저의 알림 표시
          this.showNotification(data);
        });
      }
    },
    // 찬석
    async showNotification(data) {
      // 브라우저 알림
      const notification = new Notification("제목", {
        body: data.content,
      });

      setTimeout(() => {
        notification.close();
      }, 10 * 1000);

      // 브라우저의 알림이 클릭 되었을 때
      notification.addEventListener("click", () => {
        window.open(data.url, "_blank");
      });
    },

    async findSession() {
      //----
      // 브라우저 스토리지에서 로그인 상태 확인
      const storedLoggedIn = localStorage.getItem("isLoggedIn");
      this.isLoggedIn = storedLoggedIn === "true";

      if (this.isLoggedIn) {
        console.log("로그인 상태입니다. id: ");
      } else {
        console.log("로그인하지 않은 상태입니다.");
      }
    },

    async logout() {
      try {
        // SSE 연결 해제
        if (this.eventSource) {
          this.eventSource.close();
          this.eventSource = null;
        }
        // =============

        await axios.get("http://localhost:8880/logout", {});
        this.isLoggedIn = false;

        // 브라우저 스토리지에서 로그인 상태 제거
        localStorage.removeItem("isLoggedIn");
        // localStorage에서 memberId 제거
        localStorage.removeItem("memberId");

        this.$router.push("/");
      } catch (error) {
        console.error("로그아웃 실패:", error);
      }
    },
  },
};
</script>
<style>
.login-container {
  width: 100vw;
}
</style>
