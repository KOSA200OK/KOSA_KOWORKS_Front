<template lang="">
    <tr>
        <td>{{ request.reqDate }}</td>
        <td>{{ request.stuff.id }}</td>
        <td>{{ request.stuff.name }}</td>
        <td>{{ request.quantity }}</td>
        <!-- <td>{{ reqList.purpose }}</td> -->
        <td>{{ truncateString(request.purpose, 10) }}</td>
        <td
            :class="{ 'processing': request.status === 0, 'completed': request.status === 1, 'rejected': request.status === 2 }">
             {{ request.status === 0 ? '대기' : request.status === 1 ? '승인' : '반려' }}
         </td>

        <td>{{ truncateString(request.reject, 10) }}</td>
    </tr>
</template>
<script>
export default {
    name: 'RequestItem',
    props: {
        request: Object,
    },
    data() {
        return {

        }
    },
    methods: {
        truncateString(str, maxLength) {
            if (str && str.length > maxLength) {
                return str.substring(0, maxLength) + '...';
            } else {
                return str;
            }
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