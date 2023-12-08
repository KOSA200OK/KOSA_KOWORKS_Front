<template lang="">
    <div class="carlist">
        <router-link class="myrentlistbutton" to="/carrent/myrentlist">차량 예약 내역</router-link><br>
        <div class="dateselect">
            <label>대여기간 : </label><input type="date" 
                name="startDate" 
                v-model="data.startDate"
                :min="minStartDate" 
               
                required>
         ~ <input type="date" 
                  name="endDate" 
                  v-model="data.endDate" 
                  :min="minEndDate" 
                 
                  required>
            <button class="dateselectbutton" @click="dateSelectHandler">확인</button>
        </div>
        <table v-if="carlist">
            <thead>
                <tr>
                    <th>차대번호</th>
                    <th>차량번호</th>
                    <th>차종</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <CarListItem
                            :d="data" 
                            :c="c"
                            v-if="carlist"
                            v-for="c in carlist.content"
                            :key="c.id"/>
            </tbody>
        </table>
        <PageGroup
            v-if="carlist" 
            :path="'/carrent/carlist/'"
            :currentPage="$route.params.currentPage ? $route.params.currentPage : 1"
           
            :totalPage="carlist.totalPages"
           
            :startPage="startPage"
            :endPage="endPage"

        />
       
    </div>
    
    
</template>
<script>
import CarListItem from '@/pages/car/CarListItem.vue'
import PageGroup from '@/components/PageGroup.vue'
import axios from 'axios'
export default {
    name: 'CarList',
    components: { CarListItem, PageGroup},
    data() {
        return {
            currentPage: 1,
            carlist: null,
            modalCheck : false,
            minStartDate: this.getCurrentDate(),
            minEndDate: this.getCurrentDate(),
            data : {
                startDate: this.getCurrentDate(),
                endDate: this.getCurrentDate()
            },
            startPage: 0,
            endPage : 0

        }
    },
    methods: {

        getCurrentDate() {
            const today = new Date()
            const year = today.getFullYear()
            const month = String(today.getMonth() + 1).padStart(2, '0')
            const day = String(today.getDate()).padStart(2, '0')
            return `${year}-${month}-${day}`
        },
        inputHandler() {
            // startDate 값이 변경될 때 minEndDate를 업데이트
            this.minEndDate = this.startDate
            console.log(this.minEndDate)
            this.formData.startDate = this.startDate
            this.formData.endDate = this.endDate
        },
        dateSelectHandler(){
            // this.data.startDate = this.startDate
            // this.data.endDate = this.endDate

            if(this.data.endDate<this.data.startDate){
                alert("올바른 날짜 기입이 아닙니다. 대여기간을 다시 확인하세요.")
                return false
            }

            const url = `${this.backURL}/carrent/carlist/${this.currentPage}`
            axios.get(url,{params : this.data})
            .then(response=>{
                this.carlist = response.data
                // alert("dateSelectHandler this.carlist.totalPages:"  +this.carlist.totalPages)
                if(this.currentPage <=  this.carlist.totalPages){
                    this.startPage = parseInt((this.currentPage - 1 ) / 5) * 5+1
                    this.endPage = this.startPage + 5 - 1

                    if(this.endPage>this.carlist.totalPages){
                        this.endPage =this.carlist.totalPages
                    }
                }

                // alert("dateSelectHandler dstartPage:"  +this.startPage + ", endPage:" + this.endPage)
            })
            .catch((Error)=>{
                console.log(Error)
            })
        }
    },
    watch: {
        //----라우터값이 변경되었을 때 할 일 START----
        $route(newRoute, oldRoute) {
            console.log("라우터값이 변경" + newRoute.path + "," + oldRoute.path)
            if (newRoute.params.currentPage) {
                console.log( "newRoute.params.currentPage타입", typeof(newRoute.params.currentPage))
                this.currentPage =  parseInt(newRoute.params.currentPage)
            } else {
                this.currentPage = 1
            }
            this.dateSelectHandler()
        }
        //----라우터값이 변경되었을 때 할 일 END----     
    },
    created() {
        console.log('created carlist data='+ this.data.startDate)
        if (this.$route.params.currentPage) {
            this.currentPage = this.$route.params.currentPage
        }
        this.dateSelectHandler()
    }
}
</script>
<style scoped>
.carlist{
    /* position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%); */
    margin-left : 300px;
}
.carlist>table{
    width : 1000px;
    margin-top : 100px;
    border-top:solid 3px #363840;
    border-bottom:solid 3px #363840;
}
th{
    padding : 25px;
}

th{
    font-size: 15px;
    border-bottom: solid 3px #363840;
}
.myrentlistbutton{
    width : 200px;
    padding : 10px;
    margin-left : 400px;
    border : solid 3px black;
}
.dateselect{
    margin-top : 100px;
    margin-left : 350px;
}
.dateselectbutton{
    margin-left: 20px;
}
</style>