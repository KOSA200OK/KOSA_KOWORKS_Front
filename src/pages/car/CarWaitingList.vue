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
        <PageGroup
            v-if="waitinglist" 
            :path="'/carrent/waitinglist/'"
            :currentPage="$route.params.currentPage ? $route.params.currentPage : 1"
            :totalPage="waitinglist.totalPages"
            :cntPerPage="waitinglist.size"
            :totalCnt="waitinglist.totalElements"
        />
    </div>
</template>
<script>
import CarWaitingListItem from '@/pages/car/CarWaitingListItem.vue'
import PageGroup from '@/components/PageGroup.vue'
import axios from 'axios'
export default {
    name: 'WaitingList',
    components: { CarWaitingListItem, PageGroup},
    data() {
        return {
            currentPage: 1,
            waitinglist: null,
            modalCheck : false
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
            this.axiosHandler(this.currentPage)
        }
        //----라우터값이 변경되었을 때 할 일 END----     
    },
    created() {
        console.log('created carwaitinglist')
        if (this.$route.params.currentPage) {
            this.currentPage = this.$route.params.currentPage
        }
        this.axiosHandler(this.currentPage)
    }
}
</script>
<style scoped>
.waitinglist{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.waitinglist>table{
    width : 1000px;
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

</style>