<template>
  <!-- RoomList.vue -->
  <!-- v-cloak 디렉티브를 사용하여 앱이 로딩될 때까지 템플릿을 감춤 -->
  <div class="container" id="app" v-cloak>
    <div class="row">
      <div class="col-md-12">
        <h3>채팅방 리스트</h3>
      </div>
    </div>
    <div class="input-group">
      <div class="input-group-prepend">
        <label class="input-group-text">방제목</label>
      </div>
      <input
        type="text"
        class="form-control"
        v-model="room_name"
        @keyup.enter="createRoom"
      />
      <div class="input-group-append">
        <button class="btn btn-primary" type="button" @click="createRoom">
          채팅방 개설
        </button>
      </div>
    </div>
    <ul class="list-group">
      <li
        class="list-group-item list-group-item-action"
        v-for="item in chatrooms"
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
      // room_name, chatrooms 초기화
      room_name: "",
      chatrooms: [],
    };
  },
  // 페이지가 로드될 때 findAllRoom 메소드를 호출
  created() {
    this.findAllRoom();
  },
  methods: {
    // 모든 방 조회
    async findAllRoom() {
      try {
        // 응답을 받아와서 chatrooms에 대입
        const response = await axios.get("http://localhost:8880/chat/rooms");
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

        const response = await axios.post(
          `http://localhost:8880/chat/room`,
          params
        );

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
        //---추가 시작
        this.$router.push(`/chat/room/enter/${roomId}`);
        //--추가 끝
        location.href = `http://localhost:5173/chat/room/enter/${roomId}`;
      }
    },
  },
};
</script>

<style scoped>
[v-cloak] {
  display: none;
}
</style>
