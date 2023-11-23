<template>
  <div>
    <h2>로그인</h2>
    <form @submit.prevent="login">
      <label for="username">사용자명:</label>
      <input type="text" id="username" v-model="username" required />

      <label for="password">비밀번호:</label>
      <input type="password" id="password" v-model="password" required />

      <button type="submit" @click="login">로그인</button>
    </form>
  </div>
</template>
<script>
export default {
  setup() {
    const login = async () => {
      try {
        const res = await axios.post(`http://localhost:8880/login`);
      } catch (error) {
        console.log(err);
      }
    };
    return {
      login,
    };
  },
};
</script>
<style></style>
