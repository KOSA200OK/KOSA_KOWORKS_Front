<template lang="">
    <div class="allrentlist">
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
                <CarAllRentListItem :r="r"
                            v-if="allrentlist"
                            v-for="r in allrentlist.content"
                            :key="r.id"/>
            </tbody>
        </table>
        <PageGroup
            v-if="allrentlist" 
            :path="'/carrent/allrentlist/'"
            :currentPage="$route.params.currentPage ? $route.params.currentPage : 1"
            :startPage="startPage"
            :endPage="endPage"
        />
    </div>
</template>
<script>
import CarAllRentListItem from '@/pages/car/CarAllRentListItem.vue'
import PageGroup from '@/components/PageGroup.vue'
import axios from 'axios'
export default {
    name: 'CarAllRentList',
    components: { CarAllRentListItem, PageGroup},
    data() {
        return {
            currentPage: 1,
            allrentlist: null,
            modalCheck : false,
            startPage : 1,
            endPage : 1
        }
    },
    methods: {
        //----페이지그룹의 페이지(ex: [1] [2] [NEXT])객체가 클릭되었을 때 할 일 START----   
        axiosHandler() {
            const url = `${this.backURL}/carrent/allrentlist/${this.currentPage}`
            axios.get(url)
            .then(response=>{
                this.allrentlist = response.data
                console.log(this.allrentlist)
                if(this.currentPage <=  this.allrentlist.totalPages){
                    this.startPage = parseInt((this.currentPage - 1 ) / 5) * 5+1
                    this.endPage = this.startPage + 5 - 1

                    if(this.endPage>this.allrentlist.totalPages){
                        this.endPage =this.allrentlist.totalPages
                    }
                }
                console.log(startPage+' '+endPage)
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
        }
        //----라우터값이 변경되었을 때 할 일 END----     
    },
    created() {
        console.log('created allrentlist')
        if (this.$route.params.currentPage) {
            this.currentPage = this.$route.params.currentPage
        }
        this.axiosHandler()
    }
}
</script>
<style scoped>
.allrentlist{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.allrentlist>table{
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