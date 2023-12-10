<template>
  <div>
    <h2>주소록</h2>
    <!-- 검색창과 검색내용이 양방향으로 binding시키기 위해 v-model사용 -->
    <input v-model="search" type="text" placeholder="이름 또는 직급을 입력" />
    <!-- 화면에 사원정보가 조회되기 전까지는 화면에 Loading... 보여줌 -->
    <div v-if="loading">Loading...</div>
    <div v-else>
      <!-- 고정된 헤더 부분 -->
      <div class="table-header">
        <div class="header-cell">사원 번호</div>
        <div class="header-cell">이름</div>
        <div class="header-cell">직급</div>
        <div class="header-cell">전화번호</div>
      </div>
      <!-- key를 member.id로 정해서 <tr></tr>안의 내용을 반복 -->
      <div v-for="member in filteredMembers" :key="member.id">
        <div class="table-row">
          <div class="table-cell">{{ member.id }}</div>
          <div class="table-cell">{{ member.name }}</div>
          <div class="table-cell">{{ member.position }}</div>
          <div class="table-cell">{{ member.tel }}</div>
        </div>
        <hr />
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  // loading, members, search 초기화
  data() {
    return {
      loading: true,
      members: [],
      search: "",
    };
  },
  //computed를 안 쓰면 값 변화에 따른 화면 갱신이 자동으로 안 됨
  computed: {
    filteredMembers() {
      return this.members.filter((member) => {
        // 검색어가 없거나, 검색어가 이름과 직급에 포함되어 있는 경우에만 반환
        return (
          !this.search ||
          member.name.includes(this.search) ||
          member.position.includes(this.search)
        );
      });
    },
  },
  // mounted훅은 컴포넌트가 화면에 마운트(삽입)된 후에 실행되는 함수, 여기서는 findAll()을 실행
  mounted() {
    this.findAll();
  },
  methods: {
    async findAll() {
      try {
        const response = await axios.get(`${this.backURL}/address/members`);
        // response.data에는 id, name, position, tel정보가 있음, 그 정보를 members배열에 넣음
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
.table-header {
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  margin-bottom: 10px;
}

.header-cell {
  flex: 1;
  padding: 5px;
  border-bottom: 1px solid #ccc;
}

.table-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.table-cell {
  flex: 1;
  padding: 5px;
}
</style>
