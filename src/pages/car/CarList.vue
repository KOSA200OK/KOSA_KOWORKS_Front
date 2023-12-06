<template lang="">
    <div class="carlist">
        <router-link class="myrentlistbutton" to="/carrent/myrentlist">차량 예약 내역</router-link><br>
        <div class="dateselect">
            <input type="date" 
                name="startDate" 
                v-model="startDate"
                :min="minStartDate" 
                @input="inputHandler" 
                required>
         ~ <input type="date" 
                  name="endDate" 
                  v-model="endDate" 
                  :min="minEndDate" 
                  @input="inputHandler" 
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
                <CarListItem :c="c"
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
            :cntPerPage="carlist.size"
            :totalCnt="carlist.totalElements"
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
            startDate: '',
            endDate: '',
            minStartDate: this.getCurrentDate(),
            minEndDate: this.getCurrentDate(),
            data : {
                startDate: '',
                endDate: ''
            }
        }
    },
    methods: {
        //----페이지그룹의 페이지(ex: [1] [2] [NEXT])객체가 클릭되었을 때 할 일 START----   
        axiosHandler() {
            const url = `${this.backURL}/carrent/carlist/${this.currentPage}`
            axios.get(url,this.data)
            .then(response=>{
                this.carlist = response.data
            })
            .catch((Error)=>{
                console.log(Error)
            })
        },
        //----페이지그룹의 페이지(ex: [1] [2] [NEXT])객체가 클릭되었을 때 할 일 END----
        getCurrentDate() {
            const today = new Date()
            const year = today.getFullYear()
            const month = String(today.getMonth() + 1).padStart(2, '0')
            const day = String(today.getDate()).padStart(2, '0')
            return `${year}-${month}-${day}`
        },
        inputHandler() {
            // startDate 값이 변경될 때 minEndDate를 업데이트합니다.
            this.minEndDate = this.startDate
            console.log(this.minEndDate)
            this.formData.startDate = this.startDate
            this.formData.endDate = this.endDate
            this.formData.purpose = this.purpose
        },
        dateSelectHandler(){
            localStorage.setItem('startDate', this.startDate)
            localStorage.setItem('endDate', this.endDate)
            
            this.data.startDate = this.startDate
            this.data.endDate = this.endDate

            if(this.data.endDate<this.data.startDate){
                alert("올바른 날짜 기입이 아닙니다. 대여기간을 다시 확인하세요.")
                return false
            }

            const url = `${this.backURL}/carrent/carlist/${this.currentPage}`
            axios.get(url,{params : this.data})
            .then(response=>{
                this.carlist = response.data
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
                this.currentPage = newRoute.params.currentPage
            } else {
                this.currentPage = 1
            }
            this.axiosHandler(this.currentPage)
        }
        //----라우터값이 변경되었을 때 할 일 END----     
    },
    created() {
        console.log('created carlist')
        if (this.$route.params.currentPage) {
            this.currentPage = this.$route.params.currentPage
        }
        this.axiosHandler(this.currentPage)
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