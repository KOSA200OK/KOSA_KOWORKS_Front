<template lang="">
    <div class="noreturnlist">
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
                <CarNoReturnListItem :n="n"
                            v-if="noreturnlist"
                            v-for="n in noreturnlist.content"
                            :key="n.id"/>
            </tbody>
        </table>
        <PageGroup
            v-if="rentlist" 
            :path="'/carrent/noreturnlist/'"
            :currentPage="$route.params.currentPage ? $route.params.currentPage : 1"
            :totalPage="noreturnlist.totalPages"
            :cntPerPage="noreturnlist.size"
            :totalCnt="noreturnlist.totalElements"
        />
    </div>
</template>
<script>
import CarNoReturnListItem from '@/pages/car/CarNoReturnListItem.vue'
import PageGroup from '@/components/PageGroup.vue'
import axios from 'axios'
export default {
    name: 'CarNoReturnList',
    components: { CarNoReturnListItem, PageGroup},
    data() {
        return {
            currentPage: 1,
            noreturnlist: null,
            modalCheck : false
        }
    },
    methods: {
        //----페이지그룹의 페이지(ex: [1] [2] [NEXT])객체가 클릭되었을 때 할 일 START----   
        axiosHandler() {
            const url = `${this.backURL}/carrent/noreturnlist/${this.currentPage}`
            axios.get(url)
            .then(response=>{
                this.noreturnlist = response.data
                console.log(this.noreturnlist)
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
        console.log('created noreturnlist')
        if (this.$route.params.currentPage) {
            this.currentPage = this.$route.params.currentPage
        }
        this.axiosHandler(this.currentPage)
    }
}
</script>
<style scoped>
.noreturnlist{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.noreturnlist>table{
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