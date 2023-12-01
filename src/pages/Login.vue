<template>
  <div>
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

        // SSE 구독 시작 ==


        this.$router.push("/");
        this.$data.user = response.data;
      } catch (error) {
        console.error("로그인 실패:", error);
      }
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
        await axios.get("http://localhost:8880/logout", {});
        this.isLoggedIn = false;

        // 브라우저 스토리지에서 로그인 상태 제거
        localStorage.removeItem("isLoggedIn");

        this.$router.push("/");
      } catch (error) {
        console.error("로그아웃 실패:", error);
      }
    },
  },
};
</script>
