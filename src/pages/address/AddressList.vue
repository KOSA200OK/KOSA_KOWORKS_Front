<template>
  <div>
    <h2>주소록</h2>
    <div v-if="loading">Loading...</div>
    <div v-else>
      <div v-for="member in members" :key="member.id">
        <tr>
          <td>사원번호: {{ member.id }}</td>
          <td>이름: {{ member.name }}</td>
          <td>직급: {{ member.position }}</td>
          <td>전화번호: {{ member.tel }}</td>
        </tr>
        <hr />
      </div>
    </div>
  </div>
</template>
<script>
import { ref, onMounted } from "vue";
import axios from "axios";

export default {
  data() {
    return {
      loading: true,
      members: [],
    };
  },
  mounted() {
    this.fetchMembers();
  },
  methods: {
    async fetchMembers() {
      try {
        const response = await axios.get(
          `http://localhost:8880/address/members`
        );
        this.members = response.data;
        this.loading = false;
      } catch (error) {
        console.error("사원 정보를 불러오지 못했습니다:", error);
        this.loading = true;
      }
    },
  },
};
</script>
<style></style>
