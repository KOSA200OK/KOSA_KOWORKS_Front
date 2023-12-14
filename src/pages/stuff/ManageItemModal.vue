<template>
  <div class="modal">
    <div class="modal-content">
      <button class="close-button" @click="closeModal">
        <span class="material-symbols-outlined">close</span>
      </button>
      <h3>요청 정보</h3>
      <div class="info-item"><span class="label">요청날짜:</span> {{ request.reqDate }}</div>
      <div class="info-item"><span class="label">사원명:</span> {{ request.member.name }}</div>
      <div class="info-item"><span class="label">부서명:</span> {{ request.member.department.name }}</div>
      <h3>요청 비품정보</h3>
      <div class="info-item"><span class="label">품번:</span> {{ request.stuff.id }}</div>
      <div class="info-item"><span class="label">품명:</span> {{ request.stuff.name }}</div>
      <div class="info-item"><span class="label">요청수량:</span> {{ request.quantity }}</div>
      <div class="info-item"><span class="label">요청 사유:</span> {{ request.purpose }}</div>
      <div v-if="request.status === 0">
        <div class="info-item">
          <label for="rejectReason">반려 사유:</label>
          <textarea id="rejectReason" v-model="reject" rows="4" cols="50" placeholder="반려 사유를 입력하세요" required></textarea>
        </div>
        <div class="button-group">
          <button class="approve-button" @click="approveRequest">승인</button>
          <button class="reject-button" @click="rejectRequest">반려</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'ManageItemModal',
  props: {
    request: Object,
  },
  data() {
    return {
      reject: '',
    }
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    approveRequest() {
      if (this.request.quantity > this.request.stuff.stock) {
        alert('승인 가능한 수량이 없습니다.');
        return;
      }

      const params = {
        id: this.request.id,
        stuff: {
          id: this.request.stuff.id,
        },
        quantity: this.request.quantity,
        status: 1,
      };
      axios
        .put(`${this.backURL}/stuff/approve`, params,
          {
            withCredentials: true,
          }
        )
        .then((response) => {
          location.href = "/stuff/stuffmanage"
          alert('승인 성공')
        })
        .catch((error) => {
          alert('승인 실패', error.message)
          console.log(params)
        });
      this.closeModal();
    },

    rejectRequest() {
      const params = {
        id: this.request.id,
        reject: this.reject,
        status: 2,
      };
      axios
        .put(`${this.backURL}/stuff/reject`, params,
          {
            withCredentials: true,
          }
        )
        .then((response) => {
          alert('반려 성공')
        })
        .catch((error) => {
          alert('반려 실패', error.message)
          console.log(params)
        });
      this.closeModal();
    },
  },
};
</script>

<style scoped>
/* 모달 스타일링 */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  width: 400px;
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  text-align: left;
}

.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.approve-button,
.reject-button {
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.approve-button {
  background-color: #58CB64;
  /* 승인 버튼 배경색 */
}

.reject-button {
  background-color: #FE813C;
  /* 반려 버튼 배경색 */
}

.close-button:hover,
.approve-button:hover,
.reject-button:hover {
  background-color: #ddd;
}

.close-button {
  float: right;
  width: 30px;
  height: 30px;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 20px;
}

.info-item {
  margin-bottom: 10px;
}

.label {
  font-weight: bold;
  margin-right: 5px;
}
</style>