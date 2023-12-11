<template>
  <div class="container" id="app" v-cloak>
    <div class="detail-header">
      <h2>{{ room.name }}</h2>
    </div>
    <div class="chat-input" ref="chatList">
      <ul class="chat-list">
        <li class="chat-item" v-for="message in messages" :key="message.id">
          <strong>{{ message.sender }} - {{ message.message }}</strong>
        </li>
      </ul>
    </div>
    <div class="chat-input">
      <input
        type="text"
        class="form-control"
        v-model="message"
        @keypress.enter="sendMessage"
        placeholder="메시지를 입력하세요"
      />
      <button class="send-button" @click="sendMessage">보내기</button>
    </div>
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
      axios.get(`${this.backURL}/chat/room/${this.roomId}`).then((response) => {
        this.room = response.data;
      });
    },
    // 메시지 송신 처리
    sendMessage() {
      this.ws.send(
        `/pub/chat/message`,
        {},
        JSON.stringify({
          type: "TALK",
          roomId: this.roomId,
          sender: this.sender,
          message: this.message,
        })
      );

      // 메시지 전송 시 채팅 내역 저장
      this.message = "";
      this.saveChatHistory();
    },
    // 메시지 수신 처리
    recvMessage(recv) {
      console.log("수신된 메시지:", recv);
      this.messages.unshift({
        type: recv.type,
        sender: recv.type === "ENTER" ? "[알림]" : recv.sender,
        message: recv.message,
      });
      // 메시지 수신 시 채팅 내역 저장
      this.saveChatHistory();
      // 화면 갱신
      // this.$forceUpdate();
    },

    loadChatHistory() {
      // 추가 시작, 현재 방에 대한 채팅 내역을 로드
      const roomChatHistoryKey = `wschat.chatHistory.${this.roomId}`;
      // 추가 끝
      const chatHistory = localStorage.getItem(roomChatHistoryKey);
      console.log(chatHistory);
      if (chatHistory) {
        this.messages = JSON.parse(chatHistory);
      }
    },

    saveChatHistory() {
      console.log("saveChatHistory message" + this.messages);
      // 추가시작, 각 방에 대한 채팅 내역을 별도로 저장
      const roomChatHistoryKey = `wschat.chatHistory.${this.roomId}`;
      localStorage.setItem(roomChatHistoryKey, JSON.stringify(this.messages));

      this.loadChatHistory();
    },

    // WebSocket 설정
    setupWebSocket() {
      this.sock = new SockJS(`${this.backURL}/ws-stomp`);
      this.ws = Stomp.over(this.sock);
      this.connectWebSocket();
    },
    // WebSocket 연결
    connectWebSocket() {
      this.ws.connect(
        {},
        (frame) => {
          // 연결 성공 시 실행되는 부분
          console.log("WebSocket 연결 성공", frame);
          this.ws.subscribe(`/sub/chat/room/${this.roomId}`, (message) => {
            const recv = JSON.parse(message.body);
            this.recvMessage(recv);
          });
          this.ws.send(
            `/pub/chat/message`,
            {},
            JSON.stringify({
              type: "ENTER",
              roomId: this.roomId,
              sender: this.sender,
            })
          );
        },
        (error) => {
          console.log("WebSocket 연결 실패", error);
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
        .get(`${this.backURL}/pub/chat/room/enter/${roomId}`)
        .then((response) => {
          console.log(response.data);
          this.room = response.data;

          const sender = prompt("대화명을 입력하세요.");
          if (sender !== "") {
            localStorage.setItem("wschat.sender", sender);
            localStorage.setItem("wschat.roomId", roomId);
            location.href = `${this.backURL}/chat/room/enter/${roomId}`;
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
.container {
  display: flex;
  flex-direction: column;
  height: 100vh; /* 화면 전체 높이로 설정 */
}

.chat-list {
  overflow-y: auto;
  flex: 1; /* 채팅 화면이 남은 공간을 모두 차지하도록 설정 */
  max-height: 300px;
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
}

.chat-item {
  list-style: none;
  padding: 10px;
  margin: 0;
  border-bottom: 1px solid #ccc;
}

.chat-input {
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #fff;
  border-top: 1px solid #ccc;
}
</style>
