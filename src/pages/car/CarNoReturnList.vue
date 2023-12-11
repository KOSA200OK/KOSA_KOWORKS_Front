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
        <div class="pagegroup">
        <PageGroup
            v-if="noreturnlist" 
            :path="'/carrent/manage/'"
            :currentPage="$route.params.currentPage ? $route.params.currentPage : 1"
            :totalPage="noreturnlist.totalPages"
            :startPage="startPage"
            :endPage="endPage"
        />
        </div>
    </div>
</template>
<script>
import CarNoReturnListItem from '@/pages/car/CarNoReturnListItem.vue'
import PageGroup from '@/components/PageGroup.vue'
import axios from 'axios'
export default {
    name: 'CarNoReturnList',
    components: { CarNoReturnListItem, PageGroup},
    props:["menu"],
    data() {
        return {
            currentPage: 1,
            noreturnlist: null,
            modalCheck : false,
            startPage : 1,
            endPage : 1
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
                if(this.currentPage <=  this.noreturnlist.totalPages){
                    this.startPage = parseInt((this.currentPage - 1 ) / 5) * 5+1
                    this.endPage = this.startPage + 5 - 1

                    if(this.endPage>this.noreturnlist.totalPages){
                        this.endPage =this.noreturnlist.totalPages
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
        console.log('created noreturnlist')
        if (this.$route.params.currentPage) {
            this.currentPage = this.$route.params.currentPage
        }
        this.axiosHandler()
    }
}
</script>
<style scoped>
/* .noreturnlist{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
} */
.pagegroup{
    width : 1400px;
    margin-bottom:100px;
}
.noreturnlist>table{
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