<template>
  <!-- ChatRoomList.vue -->
  <div>
    <form @submit.prevent="createRoom">
      <input v-model="roomName" type="text" placeholder="채팅방 이름" />
      <button type="submit">채팅방 생성</button>
    </form>

    <table>
      <tr v-for="room in roomList" :key="room.roomId">
        <td>
          <router-link
            :to="{ name: 'chatRoom', params: { roomId: room.roomId } }"
          >
            {{ room.name }}
          </router-link>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import SockJS from "sockjs-client";
import Stomp from "stompjs";

export default {
  data() {
    return {
      roomName: "",
      roomList: [],
    };
  },
  mounted() {
    this.fetchRoomList();
  },

  methods: {
    async createRoom() {
      try {
        // API 호출 또는 WebSocket을 사용하여 서버에게 채팅방 생성 요청
        const response = await fetch("http://localhost:8880/chat/createRoom", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: this.roomName,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to create room");
        }

        // 생성된 채팅방 정보를 받아와서 목록에 추가
        const room = await response.json();
        this.roomList.push(room);

        // 생성된 채팅방으로 이동 (예: route 등을 사용)
        this.$router.push({
          name: "chatRoom",
          params: { roomId: room.roomId },
        });

        // 로그
        console.log("Chat room created:", room);
      } catch (error) {
        console.error("Error creating chat room:", error);
      }
    },
    async fetchRoomList() {
      try {
        // API 호출 또는 WebSocket을 사용하여 서버에게 채팅방 목록 요청
        const response = await fetch("http://localhost:8880/chat/list");

        if (!response.ok) {
          throw new Error("Failed to fetch room list");
        }

        // 서버에서 받아온 채팅방 목록을 저장
        this.roomList = await response.json();

        // 로그
        console.log("Fetched room list:", this.roomList);
      } catch (error) {
        console.error("Error fetching room list:", error);
      }
    },
  },
};
</script>

<style></style>
