<template lang="">
    <tr @click="trClickHandler(request.id)">
        <td>{{ request.reqDate }}</td>
        <td>{{ request.member.name }}</td>
        <td>{{ request.member.department.name }}</td>
        <td>{{ request.stuff.id }}</td>
        <td>{{ request.stuff.name }}</td>
        <td>{{ request.stuff.stock }}</td>
        <td>{{ request.quantity }}</td>
        <td
            :class="{ 'processing': request.status === 0, 'completed': request.status === 1, 'rejected': request.status === 2 }">
            {{ request.status === 0 ? '대기' : request.status === 1 ? '승인' : '반려' }}
        </td>
    </tr>
    <ManageItemModal 
    v-if="isModalVisible" 
    :request="selectedRowData" 
    @close="closeModal" />
</template>
<script>
import ManageItemModal from '@/pages/stuff/ManageItemModal.vue';
export default {
    name: 'RequestManageItem',
    components: { ManageItemModal },
    props: {
        request: Object,
    },
    data() {
        return {
            isModalVisible: false,
            selectedRowData: null,
        }
    },
    methods: {
        trClickHandler(reqId) {
            this.selectedRowData = this.request;
            this.isModalVisible = true;
        },
        closeModal() {
            this.isModalVisible = false;
        },
    },
}
</script>
<style scoped>
td {
    /* border: 1px solid #dddddd; */
    border: none;
    text-align: center;
    padding: 12px;
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
    background-color: #E9BC00;
}

.completed {
    background-color: #58CB64;
}

.rejected {
    background-color: #FE813C;
}
</style>