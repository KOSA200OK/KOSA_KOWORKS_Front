<template>
<!-- 
        <AttendanceItem :a="a"
         
         v-for="a in attendanceList"
         :key="a.id"/> -->
         <!-- {{ pageGroup }} -->
         <h3 class="title">근태내역</h3>
         <div class="attendance">
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
                <tbody>
                    <AttendanceItem :a="a"
                        v-if="attendanceList"
                        v-for="a in attendanceList.content"
                        :key="a.id"/>
                </tbody>
             </table>

         </div>
        <br>
        <PageGroup
            v-if="attendanceList" 
            :path="/attendance/"
            :currentPage="$route.params.currentPage ? $route.params.currentPage : 1"
            :totalPage="attendanceList.totalPages"
            :cntPerPage="attendanceList.size"
            :totalCnt="attendanceList.totalElements"
        />
    <!-- </div> -->
</template>
<script>
import AttendanceItem from './AttendanceItem.vue'
import PageGroup from '@/components/PageGroup.vue'
import axios from 'axios'
export default {
    name: 'AttendanceList',
    // components: { AttendanceItem, PageGroup },
    components: { AttendanceItem, PageGroup},
    data() {
        return {
            // pageTitle: '근태내역',
            currentPage: 1,
            attendanceList: null, // 페이지 그룹 초기화
            // attendanceList:[]
        }
    },
    methods: {
        //----페이지그룹의 페이지(ex: [1] [2] [NEXT])객체가 클릭되었을 때 할 일 START----   
        axiosHandler() {
            const url = `${this.backURL}/attendance?memberId=1&currentPage=${this.currentPage}`
            axios.get(url)
            .then(response=>{
                // this.attendanceList = response.data
                this.attendanceList = response.data

            // 받아온 데이터를 오름차순으로 정렬합니다.
            this.attendanceList.sort((a, b) => {
                return a.attendanceDate.localeCompare(b.attendanceDate);
            });
            // // 받아온 데이터를 내림차순으로 정렬합니다.
            //     this.attendanceList.sort((a, b) => {
            //     return b.attendanceDate.localeCompare(a.attendanceDate);
            // });
            })
        }
        //----페이지그룹의 페이지(ex: [1] [2] [NEXT])객체가 클릭되었을 때 할 일 END----

    },
    watch: {
        // --- 라우터값이 변경되었을 때 할 일 START ---
        $route(newRoute, oldRoute) {
            console.log("라우터값이 변경" + newRoute.path + "," + oldRoute.path)
            if (newRoute.params.currentPage) {
                this.currentPage = newRoute.params.currentPage
            } else {
                this.currentPage = 1
            }
            this.axiosHandler(this.currentPage)
        }
        // --- 라우터값이 변경되었을 때 할 일 END ---
    },
    created() {
        console.log('created attendanceList')
        if (this.$route.params.currentPage) {
            this.currentPage = this.$route.params.currentPage
        }
        this.axiosHandler(this.currentPage)
    }
}
</script>
<style scoped>
.title {
    text-align: center;
    font-size: 28px;
    color: #2c3e50;
    text-transform: uppercase;
    margin-top: 100px;
    margin-bottom: 20px;
    font-weight: bold;
    text-shadow: 1px 1px 1px #ccc;
}
.attendance{
    font-family: 'Arial', sans-serif;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 20px;
    margin: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-left: 30px;
    width: 1500px;
    /* max-width: 1300px; */
    /* width: 90% */
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

td {
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