<!-- RoomDetail.vue -->
<template>
  <main>
    <div class="roomdetail-container" id="app" v-cloak>
      <div class="roomdetail-header">
        <h2>{{ room.name }}</h2>
      </div>
      <div class="chat-input">
        <input
          type="text"
          class="form-control"
          v-model="message"
          @keypress.enter="sendMessage"
          placeholder="메시지를 입력하세요"
        />

        <button class="send-button" @click="sendMessage">
          <span class="material-symbols-outlined"> forward_to_inbox </span>
        </button>
      </div>
      <ul class="chat-list">
        <li
          class="chat-item"
          v-for="message in messages"
          :key="message.id"
          :class="{ 'my-message': message.sender === sender }"
        >
          <strong v-if="message.sender === sender">
            <span>{{ message.timestamp }}</span> {{ message.message }}
          </strong>
          <strong v-else>
            {{ message.sender }}-{{ message.message }}
            <span>{{ message.timestamp }}</span>
          </strong>
        </li>
      </ul>
    </div>
  </main>
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
      const currentTime = new Date().toLocaleTimeString();
      this.ws.send(
        `/pub/chat/message`,
        // 메시지를 보낼 때 {}여기에 담아서 보냄
        {},
        JSON.stringify({
          type: "TALK",
          roomId: this.roomId,
          sender: this.sender,
          message: this.message,
          timestamp: currentTime,
        })
      );
      // 메시지 전송 시 채팅 내역 저장
      this.message = "";
      this.saveChatHistory();
    },

    // 메시지 수신 처리
    recvMessage(recv) {
      console.log("수신된 메시지:", recv);
      const currentTime = new Date().toLocaleTimeString();
      this.messages.unshift({
        type: recv.type,
        sender: recv.type === "ENTER" ? "[알림]" : recv.sender,
        message: recv.message,
        timestamp: currentTime,
      });
      // 메시지 수신 시 채팅 내역 저장
      this.saveChatHistory();
    },

    loadChatHistory() {
      // 현재 방에 대한 채팅 내역을 로드
      const roomChatHistoryKey = `wschat.chatHistory.${this.roomId}`;

      const chatHistory = localStorage.getItem(roomChatHistoryKey);
      console.log(chatHistory);
      if (chatHistory) {
        this.messages = JSON.parse(chatHistory);
      }
    },

    saveChatHistory() {
      console.log("saveChatHistory message" + this.messages);
      // 각 방에 대한 채팅 내역을 별도로 저장
      const roomChatHistoryKey = `wschat.chatHistory.${this.roomId}`;
      localStorage.setItem(roomChatHistoryKey, JSON.stringify(this.messages));

      this.loadChatHistory();
    },

    // WebSocket 설정
    // back의 registerStompEndpoints에서 endpoint를 /ws-stomp로 설정해서 /ws-stomp를 사용
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
  },
};
</script>

<style scoped>
[v-cloak] {
  display: none;
}
.roomdetail-container {
  max-width: 100%;
  margin: 20px auto;
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.roomdetail-header {
  text-align: center;
  margin-bottom: 20px;
  color: #495057;
}

.chat-input {
  display: flex !important;
  flex-direction: row !important;
  margin-bottom: 20px;
}

input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ced4da;
  border-radius: 5px;
  margin-right: 10px;
}

.send-button {
  padding: 10px 15px;
  background-color: #2196f3;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.chat-item strong {
  color: black;
  display: block;
}

/* 채팅 아이템의 text-align 스타일을 오른쪽으로 정렬하도록 변경 */
.chat-item[style*="text-align: right"] strong {
  text-align: right;
}

/* 채팅 아이템의 text-align 스타일을 왼쪽으로 정렬하도록 변경 */
.chat-item[style*="text-align: left"] strong {
  order: 1;
}

.chat-list {
  list-style: none;
  padding: 0;
  margin: 0;
  overflow-y: auto; /* 세로 스크롤 추가 */
  max-height: 300px; /* 스크롤이 나타날 최대 높이 지정 (필요에 따라 조절) */
}
.chat-list::-webkit-scrollbar {
  width: 8px;
}

.chat-list::-webkit-scrollbar-thumb {
  background-color: #2196f3;
  border-radius: 4px;
}

.chat-list::-webkit-scrollbar-track {
  background-color: #f0f0f0;
}
/* 채팅 오른쪽 왼쪽 */
.my-message strong {
  order: 2;
  text-align: right; /* 내 메시지일 경우 오른쪽 정렬 */
  margin-right: 10px;
}

.chat-item[style*="text-align: right"] strong {
  order: 1;
  text-align: right; /* 다른 사람의 메시지일 경우 왼쪽 정렬 */
}
/*  */
.chat-item {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  background-color: #caf0f8;
}

.chat-item .sender {
  font-weight: bold;
  margin-bottom: 5px;
}

.timestamp {
  font-size: 0.8em;
  color: #888;
  margin-left: 5px;
  align-self: flex-end; /* 시간을 오른쪽으로 정렬 */
}
/*  */
/* 스크롤바 스타일을 조정합니다. */

span {
  font-size: 0.8em;
  color: #888; /* 수정: 시간의 색깔을 회색으로 변경 */
  margin-left: 5px; /* 수정: 시간과 메시지 사이의 여백 추가 */
}

.material-symbols-outlined {
  color: #f0f0f0;
  font-size: 1.5em;
  margin-right: 5px;
  margin-top: 5px;
}
</style>
