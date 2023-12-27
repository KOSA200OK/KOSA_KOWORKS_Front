<template>
  <li class="notify_content">
    <span>[{{ notification.createdAt }}]</span> &nbsp;
    <span>{{ notification.content }}</span>
    <span class="material-symbols-outlined deleteBt" v-on:click="cancel($event)">
      close_small
    </span>
  </li>
</template>
  
<script>
import axios from 'axios';
export default {
  props: {
    notification: {
      type: Object,
      required: true
    }
  },

  methods: {
    cancel(event) {
                  // 부모 컴포넌트에서 발생하는 이벤트 중지
                  event.stopPropagation();

      const idValue = this.notification.id
      const url = `${this.backURL}/subscribe/${idValue}`
      axios.delete(url)
        .then(response => {

          console.log('DELETE 요청 성공', response.data);

          // 알림 목록에서 삭제된 알림의 인덱스 찾기
          const index = this.$parent.notifications.findIndex(item => item.id === this.notification.id);

          if (index !== -1) {
            // notificationList.content 배열에서 삭제된 알림 제거
            this.$parent.notifications.splice(index, 1);
            if (this.$parent.notifications.length === 0) {
              window.location.reload();
            }
          }

        })
        .catch(error => {
          console.log('DELETE 요청 실패');
        })
    },
  },
};
</script>
  
<style scoped>
li {
  border-bottom: 1px solid #ddd;
}

.deleteBt {
  cursor: pointer;
}
</style>