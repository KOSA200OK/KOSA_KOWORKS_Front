<template>
  <!-- RoomDetail.vue -->
  <div class="container" id="app" v-cloak>
    <div>
      <h2>{{ room.name }}</h2>
    </div>
    <div class="input-group">
      <div class="input-group-prepend">
        <label class="input-group-text">내용</label>
      </div>
      <input
        type="text"
        class="form-control"
        v-model="message"
        @keypress.enter="sendMessage"
      />
      <div class="input-group-append">
        <button class="btn btn-primary" type="button" @click="sendMessage">
          보내기
        </button>
      </div>
    </div>
    <ul class="list-group">
      <li class="list-group-item" v-for="message in messages">
        {{ message.sender }} - {{ message.message }}
      </li>
    </ul>
    <div></div>
  </div>
</template>

<script>
import axios from "axios";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

export default {
  data() {
    return {
      roomId: "",
      room: {},
      sender: "",
      message: "",
      messages: [],
      ws: null, // WebSocket 객체를 데이터에 추가
      sock: null, // SockJS 객체를 데이터에 추가
      reconnectAttempts: 0, // 재시도 횟수를 데이터에 추가
    };
  },

  created() {
    //어차피 DB에 id들어가있는걸 그대로 local에 저장해놓은거라, 아니면 파라미터로 넘겨도 됨
    this.roomId = localStorage.getItem("wschat.roomId");
    this.sender = localStorage.getItem("wschat.sender");
    this.findRoom();
    this.loadChatHistory(); // 페이지 초기화 시 채팅 내역 불러오기
    this.setupWebSocket(); // WebSocket 설정 메소드 호출
  },

  methods: {
    // 시작하자마자 방 찾기
    findRoom() {
      axios
        .get(
          `http://localhost:8880/pub/chat/room/${this.roomId}`,
          {},
          {
            "Access-Control-Allow-Origin": `http://localhost:5173`,
            "Access-Control-Allow-Credentials": "true",
          }
        )
        .then((response) => {
          this.room = response.data;
        });
    },

    // 메시지 송신 처리
    sendMessage() {
      // /pub: pub 설정 uri, /chat/message: @MessageMapping uri
      this.ws.send(
        // `http://localhost:8880/chat/message`,
        `http://localhost:8880/pub/chat/message`,
        {},
        JSON.stringify({
          type: "TALK",
          roomId: this.roomId,
          sender: this.sender,
          message: this.message,
        })
      );
      this.message = "";
      // 메시지 전송 시 채팅 내역 저장
      this.saveChatHistory();
    },

    // 메시지 수신 처리
    recvMessage(recv) {
      alert(1);
      this.messages.unshift({
        type: recv.type,
        sender: recv.type === "ENTER" ? "[알림]" : recv.sender,
        message: recv.message,
      });
      // 메시지 수신 시 채팅 내역 저장
      this.saveChatHistory();
    },

    loadChatHistory() {
      const chatHistory = localStorage.getItem("wschat.chatHistory");
      console.log(chatHistory);
      if (chatHistory) {
        this.messages = JSON.parse(chatHistory);
      }
    },

    saveChatHistory() {
      console.log(this.messages);
      localStorage.setItem("wschat.chatHistory", JSON.stringify(this.messages));
      this.loadChatHistory();
    },

    // WebSocket 설정
    setupWebSocket() {
      this.sock = new SockJS("http://localhost:8880/ws-stomp");
      this.ws = Stomp.over(this.sock);
      this.connectWebSocket();
    },

    // WebSocket 연결
    connectWebSocket() {
      this.ws.connect(
        {},
        (frame) => {
          // 연결 성공 시 실행되는 부분
          this.ws.subscribe(
            `http://localhost:8880/sub/chat/room/${this.roomId}`,
            (message) => {
              alert(1);
              const recv = JSON.parse(message.body);
              this.recvMessage(recv);
            }
          );
          this.ws.send(
            // `http://localhost:8880/chat/message`,
            `http://localhost:8880/pub/chat/message`,
            {},
            JSON.stringify({
              type: "ENTER",
              roomId: this.roomId,
              sender: this.sender,
            })
          );
        },
        (error) => {
          if (this.reconnectAttempts++ <= 5) {
            setTimeout(() => {
              console.log("다시 연결되었습니다");
              this.setupWebSocket(); // WebSocket 재설정
            }, 10 * 1000);
          }
        }
      );
    },

    enterRoom(roomId) {
      axios
        .get(`http://localhost:8880/pub/chat/room/enter/${roomId}`)
        .then((response) => {
          console.log(response.data);
          this.room = response.data;

          const sender = prompt("대화명을 입력하세요.");
          if (sender !== "") {
            localStorage.setItem("wschat.sender", sender);
            localStorage.setItem("wschat.roomId", roomId);
            location.href = `http://localhost:8880/chat/room/enter/${roomId}`;
          }
        })
        .catch((error) => {
          console.error("채팅방 입장 중 오류 발생:", error);
        });
    },
  },
};
</script>

<style>
[v-cloak] {
  display: none;
}
</style>
