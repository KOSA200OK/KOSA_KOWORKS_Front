<template lang="">
    <div class="rentlist">
        <table>
            <thead>
                <tr>
                    <th>신청날짜</th>
                    <th>소속부서</th>
                    <th>예약자</th>
                    <th>차량번호</th>
                    <th>대여기간</th>
                </tr>
            </thead>
            <tbody>
                <CarRentListItem :r="r"
                            v-if="rentlist"
                            v-for="r in rentlist.content"
                            :key="r.id"/>
            </tbody>
        </table>
        <div class="pagegroup">
        <PageGroup
            v-if="rentlist" 
            :path="'/carrent/manage/'"
            :currentPage="$route.params.currentPage ? $route.params.currentPage : 1"
            :startPage="startPage"
            :endPage="endPage"
            :totalPage="rentlist.totalPages"
        />
        </div>
    </div>
</template>
<script>
import CarRentListItem from '@/pages/car/CarRentListItem.vue'
import PageGroup from '@/components/PageGroup.vue'
import axios from 'axios'
export default {
    name: 'CarRentList',
    components: { CarRentListItem, PageGroup},
    props:["menu"],
    data() {
        return {
            currentPage: 1,
            rentlist: null,
            modalCheck : false,
            startPage : 1,
            endPage : 1
        }
    },
    methods: {
        //----페이지그룹의 페이지(ex: [1] [2] [NEXT])객체가 클릭되었을 때 할 일 START----   
        axiosHandler() {
            const url = `${this.backURL}/carrent/rentlist/${this.currentPage}`
            axios.get(url)
            .then(response=>{
                this.rentlist = response.data
                console.log(this.rentlist)
                if(this.currentPage <=  this.rentlist.totalPages){
                    this.startPage = parseInt((this.currentPage - 1 ) / 5) * 5+1
                    this.endPage = this.startPage + 5 - 1

                    if(this.endPage>this.rentlist.totalPages){
                        this.endPage =this.rentlist.totalPages
                    }
                }
            })
            .catch((Error)=>{
                console.log(Error)
            })
        },
        //----페이지그룹의 페이지(ex: [1] [2] [NEXT])객체가 클릭되었을 때 할 일 END----
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
            this.axiosHandler()
        },
        //----라우터값이 변경되었을 때 할 일 END----     
        menu() {
            console.log(menu감시)
            this.currentPage = 1
            this.axiosHandler()
        }
    },
    created() {
        console.log('created rentlist')
        if (this.$route.params.currentPage) {
            this.currentPage = this.$route.params.currentPage
        }
        this.axiosHandler()
    }
}
</script>
<style scoped>
/* .rentlist{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
} */
.pagegroup{
    width : 1400px;
    margin-bottom:100px;
}
.rentlist>table{
    width : 1400px;
    margin-bottom: 100px;
    border: solid 1px #ebe9e9;
    border-radius: 20px;
    box-shadow: 0 19px 38px #f3f3f3;
}
th{
    padding : 20px;
    font-size: 13px;
    background-color : #f5f8f8;
}

</style>