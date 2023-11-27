<template>
<!-- 
        <AttendanceItem :a="a"
         
         v-for="a in attendanceList"
         :key="a.id"/> -->
        <AttendanceItem :a="a"
            v-if="pageGroup"
            v-for="a in attendanceList.list"
            :key="a.id"/>
        <PageGroup
            v-if="pageGroup" :pg="pageGroup" 
            :path="/attendanceList/"
            :currentPage="$route.params.currentPage?$route.params.currentPage: 1"
            :start="pageGroup.startPage" 
            :end="pageGroup.endPage"
            :total="pageGroup.totalPage"
        />
    <!-- </div> -->
</template>
<script>
import AttendanceItem from './AttendanceItem.vue'
import PageGroup from './PageGroup.vue'
import axios from 'axios'
export default {
    name: 'AttendanceList',
    // components: { AttendanceItem, PageGroup },
    components: { AttendanceItem, PageGroup},
    data() {
        return {
            // pageTitle: '근태내역',
            pageGroup: null, // 페이지 그룹 초기화
            attendanceList:[]
        }
    },
    methods: {
        //----페이지그룹의 페이지(ex: [1] [2] [NEXT])객체가 클릭되었을 때 할 일 START----   
        axiosHandler() {
            const url = `${this.backURL}/attendance`
            axios.get(url)
            .then(response=>{
                // this.attendanceList = response.data
                this.pageGroup = response.data
            })
        }
        //----페이지그룹의 페이지(ex: [1] [2] [NEXT])객체가 클릭되었을 때 할 일 END----

    },
    watch: {
        // --- 라우터값이 변경되었을 때 할 일 START ---

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
<style scoped></style>