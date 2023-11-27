<template lang="">
    <tr>
        <td>{{c.carId}}</td>
        <td>{{c.carNo}}</td>
        <td>{{c.carType}}</td>
        <td><button>신청</button><span>대여중</span></td>
    </tr>
</template>
<script>
export default {
    name: 'CarListItem',
    props:["c"],
    data(){
        return {

        }
    }
}
</script>
<style scoped>
td{
    padding : 25px;
    font-size: 15px;
    border-top : dotted 2px;
    border-color : #dfdfdf;
    text-align: center;
}

</style>