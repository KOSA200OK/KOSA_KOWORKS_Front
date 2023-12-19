<template lang="">
    <tr>
        <td>{{n.id}}</td>
        <td>{{n.title}}</td>
        <td>{{n.regdate}}</td>
        <td>{{n.member.name}}</td>
    </tr>
</template>
<script>
export default {
    name: 'NoticeItem',
    props:["n"],
    data(){
        return {
            
        }
    }
}
</script>
<style scoped>

td {
    height: 80px;
    padding: 10px;
    text-align: center;
    border-bottom: px solid #ddd;
}

</style>