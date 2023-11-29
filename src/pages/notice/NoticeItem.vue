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
  width: 150rem;
  height: 80px;
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
  text-align: center;
}

</style>