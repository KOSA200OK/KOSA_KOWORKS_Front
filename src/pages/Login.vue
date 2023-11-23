<template>
  <div>
    <h2>로그인</h2>
    <form @submit.prevent="login">
      <label for="username">사원번호:</label>
      <input type="text" id="memberId" v-model="memberId" required />

      <label for="password">비밀번호:</label>
      <input type="password" id="password" v-model="password" required />

      <button type="submit">로그인</button>
    </form>
  </div>
</template>
<script>
import axios from "axios";
import { ref } from "vue";

export default {
  setup() {
    const memberId = ref("");
    const password = ref("");
    const login = async () => {
      try {
        const data = { memberId: memberId.value, password: password.value };
        const res = await axios.post(`http://localhost:8880/login`, data);
        console.log(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    return {
      login,
    };
  },
};
</script>
<style></style>
