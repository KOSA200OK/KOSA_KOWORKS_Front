<template>
  <!-- v-cloak 디렉티브를 사용하여 앱이 로딩될 때까지 템플릿을 감춤 -->
  <div class="messenger-container" id="app" v-cloak>
    <div class="header">
      <h3>채팅방 목록</h3>
    </div>
    <!-- 채팅방 검색 -->
    <div class="search-form">
      <label for="roomSearch" class="sr-only">채팅방 검색 </label>
      <input
        id="roomSearch"
        type="text"
        v-model="search"
        placeholder="채팅방을 검색하세요"
      />
    </div>
    <!-- 채팅방 검색 -->
    <div class="chatroom-form">
      <label for="roomName" class="sr-only">방제목 </label>
      <input
        id="roomName"
        type="text"
        v-model="room_name"
        placeholder="만들고싶은 채팅방제목을 입력하세요"
        @keyup.enter="createRoom"
      />
      <button @click="createRoom">채팅방 개설</button>
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
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      // room_name, chatrooms, search 초기화
      room_name: "",
      chatrooms: [],
      search: "",
    };
  },

  // 페이지가 로드될 때 findAllRoom 메소드를 호출
  created() {
    this.findAllRoom();
  },

  //채팅방 검색 기능
  computed: {
    // 검색어에 따라 필터된 채팅방 목록을 반환합니다.
    filteredChatrooms() {
      return this.chatrooms.filter((room) => {
        // 방 이름 또는 검색어가 포함된 경우만 반환합니다.
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
        this.chatrooms = response.data;
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

        // 업데이트된 채팅방 목록을 다시 가져옴
        this.findAllRoom();
      } catch (error) {
        alert("채팅방 개설에 실패했습니다.");
      }
    },

    enterRoom(roomId) {
      const sender = prompt("대화명을 입력해 주세요.");
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
.messenger-container {
  max-width: 400px;
  margin: 50px auto;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.header {
  text-align: center;
  margin-bottom: 20px;
}

.chatroom-form {
  display: flex;
  margin-bottom: 20px;
}

input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  padding: 10px;
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.chatroom-item {
  padding: 10px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.chatroom-item:hover {
  background-color: #f0f0f0;
}
</style>
