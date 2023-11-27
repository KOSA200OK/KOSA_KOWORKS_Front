<template lang="">
    <div class="car">
        <table>
            <tr>
                <th>차량번호</th>
                <th>차종</th>
            </tr>
            <tr>
                <td>{{carId}}</td>
                <td>{{carType}}</td>
                <td><button>신청</button><span>대여중</span></td>
            </tr>
        </table>
    </div>
</template>
<script>
export default {
    name: 'ProductItem',
    props:["p"],
    data(){
        return {
            // p1:{
            //     prodNo:'C0001',
            //     prodName: 'Americano'
            // }
        }
    }
}
</script>
<style scoped>
    div.product {
    width: 200px;
    display: inline-block;
}

div.product>ul {
    list-style-type: none;
    padding-left: 0px;
}

div.product>ul>li>img {
    /* width:100px;                 */
    width: 80%;
}

div.product>ul>li>span {
    display: inline-block;
    width: 80%;
    text-align: center;
}

</style>