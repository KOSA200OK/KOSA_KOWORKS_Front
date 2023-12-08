<template>
    <main>
        <h3 class="title">비품 요청</h3>
        <div class="form-container">
            <div class="form-group">
                <label for="startDatePicker">시작 날짜:</label>
                <input type="date" id="startDatePicker" v-model="startDate" />
            </div>
            <div class="form-group">
                <label for="endDatePicker">종료 날짜:</label>
                <input type="date" id="endDatePicker" v-model="endDate" />
            </div>
            <div class="form-group">
                <label for="statusSelect">요청상태:</label>
                <select id="statusSelect" v-model="status">
                    <option value="0">승인대기</option>
                    <option value="1">승인</option>
                    <option value="2">반려</option>
                    <option value="3">전체선택</option>
                </select>
            </div>
            <div class="form-group">
                <label for="categorySelect">대분류:</label>
                <select id="categorySelect" v-model="category">
                    <option value="default">선택안함</option>
                    <option value="S">문구류</option>
                    <option value="F">가구류</option>
                </select>
            </div>
            <div class="form-group">
                <label for="subcategorySelect">소분류:</label>
                <select id="subcategorySelect" v-model="subcategory">
                    <option v-if="category === 'S'" value="S0001">A4</option>
                    <option v-if="category === 'S'" value="S0002">B4</option>
                    <option v-if="category === 'S'" value="S0003">볼펜</option>
                    <option v-if="category === 'S'" value="S0004">클립</option>
                    <option v-if="category === 'F'" value="F0001">책상</option>
                    <option v-if="category === 'F'" value="F0002">의자</option>
                    <option v-if="category === 'F'" value="F0003">파티션</option>
                </select>
            </div>
            <button @click="loadData" class="load-button">목록 로드</button>
        </div>

        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>요청날짜</th>
                        <th>비품번호</th>
                        <th>비품명</th>
                        <th>현재재고</th>
                        <th>요청수량</th>
                        <th>요청사유</th>
                        <th>처리현황</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- 비품 데이터를 반복하여 출력 -->
                    <tr v-for="(reqList, index) in reqList" :key="index">
                        <td>{{ reqList.reqDate }}</td>
                        <td>{{ reqList.stuff.id }}</td>
                        <td>{{ reqList.stuff.name }}</td>
                        <td>{{ reqList.stuff.stock }}</td>
                        <td>{{ reqList.quantity }}</td>
                        <td>{{ reqList.purpose }}</td>
                        <td
                            :class="{ 'processing': reqList.status === 0, 'completed': reqList.status === 1, 'rejected': reqList.status === 2 }">
                            {{ reqList.status === 0 ? '처리대기' : reqList.status === 1 ? '승인완료' : '승인반려' }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div>

        </div>
    </main>
</template>
  
<script>
import axios from 'axios'
export default {
    name: 'StuffReq',
    data() {
        return {
            category: 'default', // 대분류 선택값
            subcategory: '', // 소분류 선택값
            memberId: null,
            status: 3,
            stuffId: 'default',
            startDate: null,
            endDate: null,
            // 비품 데이터 예시
            reqList: [
                {
                    "id": 31,
                    "stuff": {
                        "id": "S0001",
                        "name": "A4",
                        "stock": 10
                    },
                    "member": {
                        "id": "0001",
                        "department": {
                            "id": 1,
                            "name": "개발1팀"
                        },
                        "name": "서재원",
                        "password": "1",
                        "position": "사원",
                        "tel": "01077771111"
                    },
                    "reqDate": "2023-11-30",
                    "quantity": 5,
                    "status": 2,
                    "purpose": "테스트 1",
                    "reject": "반려테스트 1"
                }
            ],
        };
    },
    created() {
        const memberIdValue = localStorage.getItem('memberId');

        if (memberIdValue !== null) {
            console.log('memberId의 값:', memberIdValue);

            this.memberId = memberIdValue;
        } else {
            console.log('로컬 스토리지에 memberId에 해당하는 값이 없습니다.');
        }
    },
    methods: {
        loadData() {
            const url = `${this.backURL}/stuff/requestlist/case`;

            const params = {
                memberId: this.memberId,
                status: this.status,
                stuffId: this.stuffId,
                startDate: this.startDate,
                endDate: this.endDate
            };
            // 소분류가 선택된 경우
            if (this.category !== 'default') {
                params.stuffId = this.subcategory;
            }

            axios.get(url, {
                params: params,
                withCredentials: true
            })
                .then(response => {
                    this.reqList = response.data;
                })
                .catch(error => {
                    console.error('데이터를 불러오는 중 에러 발생:', error);
                });
        },
    },
};
</script>
  
<style scoped>
.table-container {
    max-height: 300px;
    /* max-height: 50%; */
    /* 최대 높이 설정 */
    overflow-y: auto;
    /* 세로 스크롤 허용 */
}

table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
}

th,
td {
    border: 1px solid #dddddd;
    text-align: center;
    /* 텍스트 가운데 정렬 */
    padding: 12px;
}

th {
    background-color: #f2f2f2;
    font-weight: bold;
    color: #333;
}

td {
    background-color: #ffffff;
}

/* 처리현황에 따른 스타일링 */
.processing,
.completed,
.rejected {
    font-weight: bold;
    text-align: center;
    padding: 8px;
}

.processing {
    background-color: rgba(255, 165, 0, 0.7);
    /* 투명한 주황색 */
}

.completed {
    background-color: rgba(0, 128, 0, 0.7);
}

.rejected {
    background-color: rgba(255, 0, 0, 0.7);
}

 .form-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }

    .form-group {
        margin-bottom: 15px;
    }

    label {
        font-weight: bold;
        margin-right: 8px;
    }

    input,
    select {
        padding: 8px;
        border: 1px solid #ddd;
        border-radius: 4px;
        margin-right: 8px;
    }

    .load-button {
        height: 35px;
        background-color: #58d3e9;
        border: none;
        color: white;
        padding: 5px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        cursor: pointer;
        border-radius: 5px;
    }

</style>