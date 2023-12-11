<template lang="">
    <div class="waitinglist">
        <table>
            <thead>
                <tr>
                    <th>신청날짜</th>
                    <th>소속부서</th>
                    <th>예약자</th>
                    <th>차량번호</th>
                    <th>대여기간</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <CarWaitingListItem :w="w"
                            v-if="waitinglist"
                            v-for="w in waitinglist.content"
                            :key="w.id"/>
            </tbody>
        </table>
        <div class="pagegroup">
            <PageGroup
                v-if="waitinglist" 
                :path="'/carrent/manage/'"
                :currentPage="$route.params.currentPage ? $route.params.currentPage : 1"
                :totalPage="waitinglist.totalPages"
                :startPage="startPage"
                :endPage="endPage"
            />
        </div>
    </div>
</template>
<script>
import CarWaitingListItem from '@/pages/car/CarWaitingListItem.vue'
import PageGroup from '@/components/PageGroup.vue'
import axios from 'axios'
export default {
    name: 'WaitingList',
    components: { CarWaitingListItem, PageGroup},
    props:["menu"],
    data() {
        return {
            currentPage: 1,
            waitinglist: null,
            modalCheck : false,
            startPage : 1,
            endPage : 1
        }
    },
    methods: {
        //----페이지그룹의 페이지(ex: [1] [2] [NEXT])객체가 클릭되었을 때 할 일 START----   
        axiosHandler() {
            const url = `${this.backURL}/carrent/waitinglist/${this.currentPage}`
            axios.get(url)
            .then(response=>{
                this.waitinglist = response.data
                console.log(this.waitinglist)
                if(this.currentPage <=  this.waitinglist.totalPages){
                    this.startPage = parseInt((this.currentPage - 1 ) / 5) * 5+1
                    this.endPage = this.startPage + 5 - 1

                    if(this.endPage>this.waitinglist.totalPages){
                        this.endPage =this.waitinglist.totalPages
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
        console.log('created carwaitinglist')
        if (this.$route.params.currentPage) {
            this.currentPage = this.$route.params.currentPage
        }
        this.axiosHandler()
    }
}
</script>
<style scoped>
/* .waitinglist{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
} */
.pagegroup{
    width : 1400px;
    margin-bottom:100px;
}
.waitinglist>table{
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