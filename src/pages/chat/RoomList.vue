<template>
  <!-- v-cloak 디렉티브를 사용하여 앱이 로딩될 때까지 템플릿을 감춤 -->
  <main>
    <div class="roomlist-container" id="app" v-cloak>
      <div class="roomlist-header">
        <h3>채팅방 목록</h3>
      </div>
      <!-- 채팅방 검색 -->
      <div class="search-form">
        <span>&#128269;</span>
        <input
          class="roomsearch-input"
          id="roomSearch"
          type="text"
          v-model="search"
          placeholder="채팅방을 검색하세요"
        />
      </div>
      <!-- 채팅방 만들기 -->
      <div class="chatroom-form">
        <input
          class="roomname-input"
          id="roomName"
          type="text"
          v-model="room_name"
          placeholder="만들고싶은 채팅방제목을 입력하세요"
          @keyup.enter="createRoom"
        />
        <button class="roomlist-button" @click="createRoom">채팅방 개설</button>
      </div>
      <ul class="chatroom-list">
        <li
          class="chatroom-item"
          v-for="item in filteredChatrooms"
          :key="item.roomId"
          @click="enterRoom(item.roomId)"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
  </main>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      room_name: "",
      chatrooms: [],
      search: "",
      memberId: "",
    };
  },
  // 페이지가 로드될 때 findAllRoom 메소드를 호출
  created() {
    this.findAllRoom();
    // 로컬 스토리지에서 직원 번호를 불러오기
    this.memberId = localStorage.getItem("memberId") || "";
  },
  //채팅방 검색 기능
  computed: {
    // 검색어에 따라 필터된 채팅방 목록을 반환합니다.
    filteredChatrooms() {
      return this.chatrooms.filter((room) => {
        // 검색어가 방 이름에 포함된 경우만 반환합니다.
        return room.name.includes(this.search);
      });
    },
  },
  //채팅방 검색 기능
  methods: {
    // 모든 방 조회
    async findAllRoom() {
      try {
        // 응답을 받아와서 chatrooms에 대입
        const response = await axios.get(`${this.backURL}/chat/rooms`);
        // 중복 방지: 기존 목록에 새로운 목록을 덧붙임
        this.chatrooms.push(...response.data);
      } catch (error) {
        console.error("채팅방 조회에 실패했습니다", error);
      }
    },
    // 방 생성
    async createRoom() {
      if ("" === this.room_name) {
        alert("방 제목을 입력하세요.");
        return;
      }
      try {
        const params = new URLSearchParams();
        params.append("name", this.room_name);

        const response = await axios.post(`${this.backURL}/chat/room`, params);

        alert(response.data.name + "방 개설이 성공했습니다.");
        //방 이름 초기화
        this.room_name = "";

        // 중복 방지: 새로 생성된 방을 목록에 추가
        this.chatrooms.push(response.data);
      } catch (error) {
        alert("채팅방 개설에 실패했습니다.");
      }
    },

    enterRoom(roomId) {
      // 직원 번호를 입력 받지 않고 로컬 스토리지에서 불러오기
      const sender = this.memberId;
      if (sender !== "") {
        localStorage.setItem("wschat.sender", sender);
        localStorage.setItem("wschat.roomId", roomId);
        this.$router.push(`/chat/room/enter/${roomId}`);
      }
    },
  },
};
</script>

<style scoped>
[v-cloak] {
  display: none;
}
.roomlist-container {
  max-width: 100%;
  margin: 50px auto;
  background-color: #1565c0;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.roomlist-header {
  text-align: center;
  margin-bottom: 20px;
}

.chatroom-form {
  display: flex;
  flex-direction: column; /* 세로 방향으로 정렬되도록 변경 */
  margin-bottom: 20px;
}
.search-form {
  display: flex;
  margin-bottom: 20px;
  align-items: center; /* 세로 중앙 정렬을 위해 추가 */
}
.chatroom-form input {
  margin-bottom: 10px; /* 입력창 간 간격을 조절 */
}

.roomsearch-input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.roomname-input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.roomlist-button {
  padding: 10px;
  background-color: #2196f3;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
  overflow-y: auto; /* 세로 스크롤 추가 */
  max-height: 400px; /* 스크롤이 나타날 최대 높이 지정 (필요에 따라 조절) */
}

.chatroom-item {
  padding: 15px;
  background-color: #fff;
  border-radius: 0; /* 직사각형 모양으로 변경 */
  margin-bottom: 0; /* 간격 제거 */
  cursor: pointer;
  transition: background-color 0.3s;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
/* 선택한 채팅방 제외 나머지 채팅방에 하단 선 추가 */
.chatroom-item:not(:last-child) {
  border-bottom: 1px solid #ddd;
}

.chatroom-item:hover {
  background-color: #f0f0f0;
}
.chatroom-item:hover {
  background-color: #0e1c2a;
}
</style>
