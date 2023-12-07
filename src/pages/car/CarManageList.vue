<template lang="">
    <div class="carmanagelist">
        <router-link class="allrentlist" to="/carrent/allrentlist">신청 내역</router-link>
        <div class="optionbuttons">
            <router-link class="waiting" to="/carrent/waitinglist">승인대기</router-link>
            <router-link class="renting" to="/carrent/rentlist">대여중</router-link>
            <router-link class="noreturn" to="/carrent/noreturnlist">미반납</router-link>
        </div>
        <CarsMap :c="carlist"/>
        <table>
            <thead>
                <tr>
                    <th>차대번호</th>
                    <th>차량번호</th>
                    <th>차종</th>
                </tr>
            </thead>
            <tbody>
                <CarManageListItem :c="c"
                            v-if="carlist"
                            v-for="c in carlist"
                            :key="c.id"/>
            </tbody>
        </table>
    </div>
</template>
<script>
import CarManageListItem from '@/pages/car/CarManageListItem.vue'
import CarsMap from '@/pages/car/CarsMap.vue'
import PageGroup from '@/components/PageGroup.vue'
import axios from 'axios'
export default {
    name: 'CarManageList',
    components: { CarManageListItem, PageGroup, CarsMap},
    data() {
        return {
            currentPage: 1,
            carlist: null,
            startPage : 1,
            endPage : 1
        }
    },
    methods: {
        //----페이지그룹의 페이지(ex: [1] [2] [NEXT])객체가 클릭되었을 때 할 일 START----   
        axiosHandler() {
            const url = `${this.backURL}/carrent/managelist`
            axios.get(url)
            .then(response=>{
                this.carlist = response.data
            })
            .catch((Error)=>{
                console.log(Error)
            })
        },
        //----페이지그룹의 페이지(ex: [1] [2] [NEXT])객체가 클릭되었을 때 할 일 END----

    },
    created() {
        console.log('created carmanagelist')
        this.axiosHandler(this.currentPage)
    }
}
</script>
<style scoped>
.carmanagelist{
    margin-left : 300px;
    /* position: absolute; */
    /* top: 50%; */
    /* left: 50%; */
    /* transform: translate(-50%, -50%); */
    /* width: 90%; */
    /* margin-left:45px; */
    /* height: 100vh; */
    /* overflow: scroll; */
}
.carmanagelist>table{
    width : 1000px;
    border-top:solid 3px #363840;
    border-bottom:solid 3px #363840;
}
.optionbuttons{
    margin-left : 20%;
    margin-top : 30px;
}
.waiting, .renting, .noreturn, .allrentlist{
    text-align: center;
    float : left;
    padding : 20px;
    margin : 50px;
    border : solid 3px #363840;
    cursor : pointer;
}
th{
    padding : 25px;
}

th{
    font-size: 15px;
    border-bottom: solid 3px #363840;
}

</style>