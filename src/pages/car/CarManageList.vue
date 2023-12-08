<template lang="">
    <div class="carmanagelist">
        <div class="optionbuttons">
            <div class="option-text">
                <router-link class="allrentlist" to="/carrent/allrentlist">신청 내역</router-link>
            </div>
        </div>
        <div class="optionbuttons">
            <div class="option-text">
                <router-link class="waiting" to="/carrent/waitinglist">승인대기</router-link><br><br>
                <span>0</span>
            </div>
        </div>
        <div class="optionbuttons">
            <div class="option-text">
                <router-link class="renting" to="/carrent/rentlist">대여중</router-link><br><br>
                <span>0</span>
            </div>
        </div>
        <div class="optionbuttons">
            <div class="option-text">
                <router-link class="noreturn" to="/carrent/noreturnlist">미반납</router-link><br><br>
                <span>0</span>
            </div>
        </div>
        <CarsMap v-if="carlist"
                :c="carlist"/>
        <table>
            <thead>
                <tr>
                    <th>차대번호</th>
                    <th>차량번호</th>
                    <th>차종</th>
                </tr>
            </thead>
            <tbody>
                <CarManageListItem v-if="carlist"
                                    :c="c"
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
            carlist: null
        }
    },
    methods: {
        //----페이지그룹의 페이지(ex: [1] [2] [NEXT])객체가 클릭되었을 때 할 일 START----   
        axiosHandler() {
            const url = `${this.backURL}/carrent/managelist`
            axios.get(url)
            .then(response=>{
                this.carlist = response.data
                console.log(this.carlist)
            })
            .catch((Error)=>{
                console.log(Error)
            })
        },
        //----페이지그룹의 페이지(ex: [1] [2] [NEXT])객체가 클릭되었을 때 할 일 END----

    },
    created() {
        console.log('created carmanagelist')
        this.axiosHandler()
    }
    
}
</script>
<style scoped>
.carmanagelist{
    margin-left : 200px;
    /* position: absolute; */
    /* top: 50%; */
    /* left: 50%; */
    /* transform: translate(-50%, -50%); */
    /* width: 90%; */
    /* margin-left:45px; */
    /* height: 100vh; */
    /* overflow: scroll; */
}
a{
    text-decoration: none;
    font-size: 20px;
    font-weight: 1000;
    color : rgb(20, 20, 20);
}
.carmanagelist>table{
    width : 1200px;
    margin-bottom: 200px;
    border: solid 1px #ebe9e9;
    border-radius: 20px;
    box-shadow: 0 19px 38px #f3f3f3
}
.optionbuttons{
    margin-left : 20%;
    margin-top : 30px;
}
.optionbuttons{
    width : 200px;
    height : 200px;
    text-align: center;
    float : left;

    margin : 50px;
    border : solid 10px transparent;/*#1fd3d37a ;*/
    cursor : pointer;
    border-radius : 50%;
    background-image: linear-gradient(#fff, #fff), linear-gradient(90deg, rgba(56,209,209,1) 0%, rgba(205,252,252,1) 35%, rgba(153,223,237,1) 100%);
    background-origin: border-box;
    background-clip: content-box, border-box;
    box-shadow: 0 5px 30px #ddf4f7;
}
.option-text{
    padding-top : 50px;
}
.option-text>span{
    text-decoration: none;
    font-size: 30px;
    font-weight: 1000;
    color : rgb(31, 31, 31);
}
th{
    padding : 20px;
    font-size: 13px;
    background-color : #f5f8f8;
    
}
</style>