<template>
    <div class="attendance_list">
        <h1>{{ pageTitle }}</h1>
        <AttendanceItem :a="a" v-for="a in PageGroup.list" :key="a.id" class="attendance_item" />
        <PageGroup />
    </div>
</template>
<script>
import AttendanceItem from './AttendanceItem.vue'
import PageGroup from './PageGroup.vue'
import axios from 'axios'
export default {
    name: 'AttendanceList',
    components: { AttendanceItem, PageGroup },
    data() {
        return {
            pageTitle: '근태내역',

        }
    },
    methods: {

    },
    watch: {
        // --- 라우터값이 변경되었을 때 할 일 START ---

        // --- 라우터값이 변경되었을 때 할 일 END ---
    },
    created() {

    }
}
</script>
<style scoped></style>