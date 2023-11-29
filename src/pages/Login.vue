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
  created() {
    // 페이지가 로드될 때 세션 정보를 확인
    this.checkSession();
  },
  methods: {
    async login() {
      try {
        const response = await axios.post("http://localhost:8880/login", {
          id: this.id,
          password: this.password,
        });
        this.isLoggedIn = true;
        this.$router.push("/");
        this.$data.user = response.data;
      } catch (error) {
        console.error("Login failed:", error);
      }
    },

    async checkSession() {
      try {
        const response = await axios.get("http://localhost:8880/checkSession");
        this.isLoggedIn = response.data;
      } catch (error) {
        console.error("Error checking session:", error);
      }
    },
  },
};
</script>
