<template>
    <main>
        <h3 class="title">비품 요청</h3>
        <label for="startDatePicker">시작 날짜 : </label>
        <input type="date" id="startDatePicker" v-model="startDate" />
        <label for="endDatePicker">종료 날짜 : </label>
        <input type="date" id="endDatePicker" v-model="endDate" />
        <!-- Status 선택 -->
        <label for="statusSelect">요청상태 : </label>
        <select id="statusSelect" v-model="status">
            <option value="0">승인대기</option>
            <option value="1">승인</option>
            <option value="2">반려</option>
            <option value="3">전체선택</option>
        </select>

        <!-- StuffId 선택 -->
        <label for="stuffIdSelect">비품분류 : </label>
        <select id="stuffIdSelect" v-model="stuffId">
            <option value="default">선택안함</option>
            <option value="S0001">A4</option>
            <option value="stuff2">Stuff 2</option>
        </select>
        <button @click="loadData">목록 로드</button>
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
                    <tr v-for="(reqList, index) in items" :key="index">
                        <td>{{ reqList.reqDate }}</td>
                        <td>{{ reqList.stuff.id }}</td>
                        <td>{{ reqList.stuff.name }}</td>
                        <td>{{ reqList.stuff.stock }}</td>
                        <td>{{ reqList.quantity }}</td>
                        <td>{{ reqList.purpose }}</td>
                        <td
                            :class="{ 'processing': reqList.processStatus === '처리중', 'completed': item.processStatus === '처리완료' }">
                            {{ reqList.processStatus }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </main>
</template>
  
<script>
export default {
    name: 'StuffReq',
    data() {
        return {
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
    methods: {
        loadData() {
            const url = `${this.backURL}/requestlist/case`;
            axios.get(url)
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

/* 처리현황에 따른 스타일링 */
.processing,
.completed {
    font-weight: bold;
    color: #fff;
    text-align: center;
    padding: 8px;
}

.processing {
    background-color: rgba(255, 165, 0, 0.7);
    /* 투명한 주황색 */
}

.completed {
    background-color: rgba(0, 128, 0, 0.7);
    /* 투명한 초록색 */
}
</style>