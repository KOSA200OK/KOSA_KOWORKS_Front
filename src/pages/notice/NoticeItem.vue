<template lang="">
    <div class="notice">
        <tr>
            <td>{{n.id}}</td>
            <td>{{n.title}}</td>
            <td>{{n.regdate}}</td>
            <td>{{n.member.name}}</td>
        </tr>
    </div>
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

div.notice > tr > td {
    width: 3000rem;
    /* height : 50px; */
    font-size: 20px;
    color: #333;
}

</style>