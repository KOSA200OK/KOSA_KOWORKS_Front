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
        <PageGroup
            v-if="rentlist" 
            :path="'/carrent/rentlist/'"
            :currentPage="$route.params.currentPage ? $route.params.currentPage : 1"
            :totalPage="rentlist.totalPages"
            :cntPerPage="rentlist.size"
            :totalCnt="rentlist.totalElements"
        />
    </div>
</template>
<script>
import CarRentListItem from '@/pages/car/CarRentListItem.vue'
import PageGroup from '@/components/PageGroup.vue'
import axios from 'axios'
export default {
    name: 'CarRentList',
    components: { CarRentListItem, PageGroup},
    data() {
        return {
            currentPage: 1,
            rentlist: null,
            modalCheck : false
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
        console.log('created rentlist')
        if (this.$route.params.currentPage) {
            this.currentPage = this.$route.params.currentPage
        }
        this.axiosHandler(this.currentPage)
    }
}
</script>
<style scoped>
.rentlist{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.rentlist>table{
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