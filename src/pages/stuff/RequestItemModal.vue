<template>
    <div class="modal">
        <div class="modal-content">
            <button class="close-button" @click="closeModal">
                <span class="material-symbols-outlined">close</span>
            </button>
            <h3>요청 정보</h3>
            <div class="info-item"><span class="label">요청날짜:</span> {{ request.reqDate }}</div>
            <h3>요청 비품정보</h3>
            <div class="info-item"><span class="label">품번:</span> {{ request.stuff.id }}</div>
            <div class="info-item"><span class="label">품명:</span> {{ request.stuff.name }}</div>
            <div class="info-item"><span class="label">요청수량:</span> {{ request.quantity }}</div>
            <div class="info-item"><span class="label">요청 사유:</span> {{ request.purpose }}</div>
            <div v-if="request.status === 2">
                <div class="info-item">
                    <div class="info-item"><span class="label">반려 사유:</span> {{ request.reject }}</div>
                </div>
            </div>
            <div v-if="request.status === 0">
                <button class="cancel-button" @click="cancelRequest">요청 취소</button>
            </div>
        </div>
    </div>
</template>
  
<script>
import axios from 'axios'
export default {
    name: 'RequestItemModal',
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

        cancelRequest() {
            const url = `${this.backURL}/stuff/request?id=${this.request.id}`;
            axios
                .delete(url)
                .then((response) => {
                    alert('요청이 취소되었습니다.');
                    this.closeModal();
                })
                .catch((error) => {
                    console.error('요청 취소 중 에러 발생:', error);
                    alert('요청 취소에 실패했습니다.');
                });
        },
    },
};
</script>
  
<style scoped>
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

.close-button:hover {
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

.cancel-button {
    background-color: #58d3e9;
    /* 취소 버튼 배경색 */
    color: white;
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.cancel-button:hover {
    background-color: #58b5c5;
    /* 취소 버튼 호버 배경색 */
}
</style>