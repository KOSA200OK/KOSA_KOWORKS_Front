<template lang="">
<main>
        <div class="manageheader">
            <ul>
                <li><span class="managehome" @click="menuHandler(0)">차량 관리</span></li>
                <li><router-link class="headermenu" to="/carrent/allrentlist">신청 내역</router-link></li>
                <li><router-link class="headermenu" to="/carrent/allrentlist">승인대기</router-link></li>
                <li><router-link class="headermenu" to="/carrent/allrentlist">대여중</router-link></li>
                <li><router-link class="headermenu" to="/carrent/allrentlist">미반납</router-link></li>
            </ul>
        </div>
        <h3>차량 관리</h3>
    <div class="carmanage" style="text-align: center;">
        <div class="managesection">
            <div class="optionbuttons">
                <div class="optionbutton" @click="menuHandler(1)">
                    <div class="option-text">
                        <router-link class="waiting" to="/carrent/manage/">승인대기</router-link><br><br>
                        <span :bind="waitingcnt">{{waitingcnt}}</span>
                    </div>
                </div>
                <div class="optionbutton" @click="menuHandler(2)">
                    <div class="option-text">
                        <router-link class="renting" to="/carrent/manage/">대여중</router-link><br><br>
                        <span :bind="rentcnt">{{rentcnt}}</span>
                    </div>
                </div>
                <div class="optionbutton" @click="menuHandler(3)">
                    <div class="option-text">
                        <router-link class="noreturn" to="/carrent/manage/">미반납</router-link><br><br>
                        <span :bind="noreturncnt">{{noreturncnt}}</span>
                    </div>
                </div>
            </div>
            <CarsMap v-if="carlist!==null && menu==0"
                    :c="carlist"
                    :menu="menu"/>
            <CarManageList v-if="menu==0"
                            :rentlist="rentlist"
                            :noreturnlist="noreturnlist"/>
            <CarWaitingList v-if="menu==1"/>
            <CarRentList v-if="menu==2"/>
            <CarNoReturnList v-if="menu==3"/>
        </div>
    </div>
</main>
</template>
<script>
import CarManageList from '@/pages/car/CarManageList.vue'
import CarWaitingList from '@/pages/car/CarWaitingList.vue'
import CarRentList from '@/pages/car/CarRentList.vue'
import CarNoReturnList from '@/pages/car/CarNoReturnList.vue'
import CarsMap from '@/pages/car/CarsMap.vue'
import PageGroup from '@/components/PageGroup.vue'
import axios from 'axios'
export default {
    name: 'CarManage',
    components: { CarManageList, CarWaitingList, CarRentList, CarNoReturnList, PageGroup, CarsMap},
    data() {
        return {
            carlist: null,
            rentlist: null,
            waitinglist : null,
            noreturnlist : null,
            rentcnt : 0,
            waitingcnt : 0,
            noreturncnt : 0,
            menu : 0
        }
    },
    methods: {
        //----페이지그룹의 페이지(ex: [1] [2] [NEXT])객체가 클릭되었을 때 할 일 START----   
        axiosHandler() {
            console.log('axios호출시작')
            const url = `${this.backURL}/carrent/manage`
            axios.get(url)
            .then(response=>{
                this.carlist = response.data.carlist
                this.waitinglist = response.data.waitinglist
                this.rentlist = response.data.rentlist
                this.noreturnlist = response.data.noreturnlist
                console.log(this.carlist)
                console.log(this.waitinglist)
                console.log(this.rentlist)
                console.log(this.noreturnlist)
                if(this.waitinglist!=null){
                    console.log('cnt값 구하기 시작')
                    this.waitingcnt = this.waitinglist.length
                }
                if(this.rentlist!=null){
                    this.rentcnt = this.rentlist.length
                }
                if(this.noreturnlist!=null){
                    this.noreturncnt = this.noreturnlist.length
                }
                console.log(this.waitingcnt)
                console.log(this.noreturncnt)
                console.log('axios호출완료')
            })
            .catch((Error)=>{
                console.log(Error)
            })
        },
        //----페이지그룹의 페이지(ex: [1] [2] [NEXT])객체가 클릭되었을 때 할 일 END----
        menuHandler(menu){
            this.menu = menu
            this.$router.push({ path: '/carrent/manage' });
        }
    },
    created() {
        console.log('created carmanage')
        this.axiosHandler()
    }
}
</script>
<style scoped>
.manageheader{
    margin-left: 6%;
}
h3{
    text-align: center;
    font-size: 28px;
    color: #2c3e50;
    text-transform: uppercase;
    margin-top: 50px;
    margin-bottom: 20px;
    font-weight: bold;
    text-shadow: 1px 1px 1px #ccc;
}
.managehome{
    cursor:pointer;
    text-decoration: none;
    font-size: 25px;
    font-weight: 1000;
    color : rgb(57, 97, 97);
}
ul {
  list-style: none;
  display: flex; 
  padding: 0;       
  float : right;
  margin-right : 100px;
  margin-top : 50px;
}

li {
  margin-right: 10px; /* 각 항목 사이 간격 설정 */
}
/* .managesection{
    margin-left : 200px;

} */
a{
    text-decoration: none;
    font-size: 25px;
    font-weight: 1000;
    color : rgb(57, 97, 97);
}
.managesection>table{
    width : 95%;
    margin-bottom: 200px;
    border: solid 1px #ebe9e9;
    border-radius: 20px;
    box-shadow: 0 19px 38px #f3f3f3;
}
.optionbuttons{
    text-align: center;
    margin-left : 16%;
    margin-top : 30px;
}
.optionbutton{
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
    color : rgb(35, 153, 153);
}
th{
    padding : 20px;
    font-size: 13px;
    background-color : #f5f8f8;
}
</style>