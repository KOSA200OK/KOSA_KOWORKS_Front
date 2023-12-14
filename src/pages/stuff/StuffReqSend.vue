<template lang="">
<form @submit.prevent="sendRequest" class="send-container">
            <div class="form-group">
                <h3>비품 요청</h3>
                <table>
                    <tr>
                        <td class="input-item">대분류</td>
                        <td class="input-value">
                            <select id="categoryReqSelect" v-model="categoryReq">
                                <option value="default">선택안함</option>
                                <option value="S">문구류</option>
                                <option value="F">가구류</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td class="input-item">소분류</td>
                        <td class="input-value">
                            <select id="subcategoryReqSelect" v-model="subcategoryReq">
                                <option v-if="categoryReq === 'S'" value="S0001">A4</option>
                                <option v-if="categoryReq === 'S'" value="S0002">B4</option>
                                <option v-if="categoryReq === 'S'" value="S0003">볼펜</option>
                                <option v-if="categoryReq === 'S'" value="S0004">클립</option>
                                <option v-if="categoryReq === 'F'" value="F0001">책상</option>
                                <option v-if="categoryReq === 'F'" value="F0002">의자</option>
                                <option v-if="categoryReq === 'F'" value="F0003">파티션</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td class="input-item">요청수량</td>
                        <td class="input-value">
                            <input type="number" id="quantity" v-model="quantity" :min="1" />
                        </td>
                    </tr>
                    <tr>
                        <td class="input-item">요청사유</td>
                        <td class="input-value">
                            <textarea v-model="purpose" id="purposetext" cols="100" rows="5"
                                placeholder="요청메시지를 50자 이내로 입력해 주세요" required></textarea>
                        </td>
                    </tr>
                </table>
            </div>
            <div class="form-group">
                <button type="submit" class="submit-button">요청 전송</button>
            </div>
        </form>
</template>
<script>
import axios from 'axios'
export default {
    name: 'StuffReqSend',
    props: {
        memberId: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            categoryReq: 'default', // 대분류 선택값
            subcategoryReq: '', // 소분류 선택값
            quantity: 0,
            purpose: '',
            categoryReqError: false, // 대분류 선택 필수 에러
            subcategoryReqError: false, // 소분류 선택 필수 에러
        };
    },
    methods: {
        sendRequest() {
            // 대분류 선택 여부 확인
            if (this.categoryReq === 'default') {
                this.categoryReqError = true;
                alert('대분류를 선택하세요.');
                return;
            } else {
                this.categoryReqError = false;
            }

            // 소분류 선택 여부 확인
            if (!this.subcategoryReq) {
                this.subcategoryReqError = true;
                alert('소분류를 선택하세요.');
                return;
            } else {
                this.subcategoryReqError = false;
            }

            const data = {
                stuff: {
                    id: this.subcategoryReq,
                },
                member: {
                    id: this.memberId,
                },
                quantity: this.quantity,
                purpose: this.purpose,
            };
            const jsonString = JSON.stringify(data);
            axios
                .post(`${this.backURL}/stuff/request`, jsonString,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        withCredentials: true,
                    }
                )
                .then((response) => {
                    alert('요청 성공')
                    console.log('서버 응답:', response.data);
                    console.log(data)
                })
                .catch((error) => {
                    alert('요청 실패')
                    console.error('서버 요청 실패:', error);
                    console.log(data)
                });
        },
    },

}
</script>
<style scoped>
.send-container {
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 10px;
    padding: 20px;
    background-color: #f5f5f5;
}

.form-group {
    margin-bottom: 20px;
}

.submit-button {
    background-color: #58d3e9;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.submit-button:hover {
    background-color: #58b5c5;
}
.input-item {
    padding-right: 30px;
    /* 원하는 간격으로 조절 */
}

table {
    border-collapse: separate;
    border-spacing: 0 30px;
}

table tr {
    border-bottom: 1px solid #ccc;
}
</style>