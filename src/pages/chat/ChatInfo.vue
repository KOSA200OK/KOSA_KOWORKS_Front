<template>
  <div>
    <input
      v-model="content"
      type="text"
      placeholder="전송할 메시지를 입력하세요."
      class="content"
    />
    <button @click="sendMsg" type="button" class="sendBtn">전송</button>
    <button @click="quit" type="button" class="quit">방 나가기</button>
    <div>
      <span>메시지</span>
      <div class="msgArea">
        <div v-for="(msg, index) in messages" :key="index">{{ msg }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      content: "",
      messages: [],
      socket: null,
    };
  },
  mounted() {
    this.initWebSocket();
    this.enterRoom(); // 방 입장을 여기서 호출
  },
  methods: {
    initWebSocket() {
      this.socket = new WebSocket("ws://localhost:8080/ws/chat");

      this.socket.onopen = () => {
        console.log("서버에 연결됨!");
      };

      this.socket.onclose = () => {
        console.log("연결이 종료됨");
      };

      this.socket.onerror = (error) => {
        console.error(error);
      };

      this.socket.onmessage = (event) => {
        console.log(event.data);
        this.messages.push(event.data);
      };
    },
    enterRoom() {
      const enterMsg = {
        type: "ENTER",
        roomId: this.$route.params.roomId,
        sender: "chee",
        msg: "",
      };
      this.socket.send(JSON.stringify(enterMsg));
    },
    sendMsg() {
      const talkMsg = {
        type: "TALK",
        roomId: this.$route.params.roomId,
        sender: "chee",
        msg: this.content,
      };
      this.socket.send(JSON.stringify(talkMsg));
      this.content = "";
    },
    quit() {
      const quitMsg = {
        type: "QUIT",
        roomId: this.$route.params.roomId,
        sender: "chee",
        msg: "",
      };
      this.socket.send(JSON.stringify(quitMsg));
      this.socket.close();
      this.$router.push("/chat/chatList");
    },
  },
};
</script>

<style></style>
