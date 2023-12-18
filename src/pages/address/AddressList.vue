<template>
  <main>
    <h3 class="title">주소록</h3>
    <div class="search-container">
      <input
        v-model="search"
        type="text"
        placeholder="이름, 직급 또는 부서명을 입력하세요"
        class="search-input"
      />
      <button @click="findAll" class="search-button">조회</button>
    </div>
    <div v-if="loading">잠시만 기다려주세요...</div>
    <div v-else>
      <table>
        <thead>
          <tr>
            <th>사원 번호</th>
            <th>이름</th>
            <th>부서명</th>
            <th>직급</th>
            <th>사내번호</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="member in filteredMembers" :key="member.id">
            <td>{{ member.id }}</td>
            <td>{{ member.name }}</td>
            <td>{{ member.departmentName }}</td>
            <td>{{ member.position }}</td>
            <td>{{ member.tel }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </main>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      loading: true,
      members: [],
      search: "",
    };
  },
  computed: {
    filteredMembers() {
      return this.members.filter((member) => {
        return (
          !this.search ||
          member.name.includes(this.search) ||
          member.position.includes(this.search) ||
          member.departmentName.includes(this.search)
        );
      });
    },
  },
  mounted() {
    this.findAll();
  },
  methods: {
    async findAll() {
      try {
        const response = await axios.get(`${this.backURL}/address/members`);
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

<style scoped>
.title {
  text-align: center;
  font-size: 28px;
  color: #2c3e50;
  text-transform: uppercase;
  margin-top: 100px;
  margin-bottom: 20px;
  font-weight: bold;
  text-shadow: 1px 1px 1px #ccc;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th,
td {
  padding: 10px;
  text-align: center;
  border-bottom: 1px solid #ddd;
}

thead {
  background-color: #f5f5f5;
}

tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}

tbody tr:hover {
  background-color: #eaeaea;
}

.search-container {
  text-align: center;
  margin-bottom: 20px;
}

.search-input {
  padding: 10px;
  margin-right: 10px;
  width: 300px; /* 변경된 부분: 검색 필드의 길이를 조정합니다. */
}

.search-button {
  padding: 10px;
  cursor: pointer;
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 3px;
}
</style>
