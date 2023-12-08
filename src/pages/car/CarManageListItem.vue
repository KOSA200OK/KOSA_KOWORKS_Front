<template lang="">
    <tr>
        <td>{{c.id}}</td>
        <td>{{c.carNo}}</td>
        <td>{{c.carType}}</td>
        <!-- <td><span v-if="c.status==2">미반납</span><span v-if="c.status==1">대기중</span></td> -->
    </tr>
</template>
<script>
import axios from 'axios'
export default {
    name: 'CarManageListItem',
    props:["c"],
    data(){
        return {
            
        }
    },
    methods: {
        
    }
}
</script>
<style scoped>
td{
    padding : 15px;
    font-size: 13px;
    border-top : solid 1px #ebe9e9;
    border-color : #dfdfdf;
    text-align: center;
}

</style>