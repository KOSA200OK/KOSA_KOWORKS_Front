<template lang="">
    <main>
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
        <div class="carlist">
            <table v-if="carlist" class="carlist-table">
                <thead>
                    <tr>
                        <th>차대번호</th>
                        <th>차량번호</th>
                        <th>차종</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody class="hover-effect">
                    <CarListItem
                                :d="data" 
                                :c="c"
                                v-if="carlist"
                                v-for="c in carlist.content"
                                :key="c.id"/>
                </tbody>
            </table>
        
        </div>
            <PageGroup
                v-if="carlist" 
                :path="'/carrent/carlist/'"
                :currentPage="$route.params.currentPage ? $route.params.currentPage : 1"
            
                :totalPage="carlist.totalPages"
            
                :startPage="startPage"
                :endPage="endPage"

            />
    </main>
    
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
                console.log(this.carlist)
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
    /* font-family: "Arial", sans-serif; */
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 20px;
    margin: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-left: 6%;
    width: 1450px;
}
.carlist-table {
    width: 100%;
    border-collapse: collapse;
}
thead {
    background-color: #f5f5f5;
}

.carlist-table th {
    text-align: center;
  /* padding: 25px;
  font-size: 15px;
  background-color: #f5f5f5; */
}
/* .carlist-table tbody tr:nth-child(even) {
    background-color: #f9f9f9;
} */
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
tbody::v-deep tr:nth-child(even) {
    background-color: #f9f9f9;
}
</style>