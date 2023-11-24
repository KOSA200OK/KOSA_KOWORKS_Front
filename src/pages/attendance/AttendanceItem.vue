<template>
    <div class="attendance">
        <h3 class="title">근태내역</h3>
        <br>
        <table>
            <thead>
                <tr>
                    <th>부서</th>
                    <th>이름</th>
                    <th>직급</th>
                    <th>일자</th>
                    <th>출근시간</th>
                    <th>퇴근시간</th>
                    <th>상태</th>
                </tr>
            </thead>
            <tbody/>
        </table>
    </div>
</template>
<script>
export default {
    name: 'AttendanceItem',
    props:["a"],
    data() {
        return {

        }
    }
}
</script>
<style scoped>
.title {
    text-align: center;
    font-size: 24px;
    color: #333; 
    text-transform: uppercase;
    margin-bottom: 10px; 
}
.attendance{
    font-family: 'Arial', sans-serif;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 20px;
    margin: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-left: 30px;
    width: 1300px;
}

h2 {
    text-align: center;
    margin-bottom: 20px;
    color: #333;
}

table {
    width: 100%;
    border-collapse: collapse;
}

th, td {
    padding: 10px;
    text-align: center;
    border-bottom: 1px solid #ddd;
}

thead {
    background-color: #f5f5f5;    
}

    tbody tr:nth-child(even) {
    background-color: #f9f9f9;
}

tbody tr:hover {
    background-color: #eaeaea;
}
</style>