<template lang="">
    <div class="myrentlist">
        <table>
            <thead>
                <tr>
                    <th>신청날짜</th>
                    <th>대여목적</th>
                    <th>대여기간</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <CarMyRentListItem :m="m"
                            v-if="myrentlist"
                            v-for="m in myrentlist.content"
                            :key="m.id"/>
            </tbody>
        </table>
        <PageGroup
            v-if="myrentlist" 
            :path="'/carrent/myrentlist/'"
            :currentPage="$route.params.currentPage ? $route.params.currentPage : 1"
            :totalPage="myrentlist.totalPages"
            :cntPerPage="myrentlist.size"
            :totalCnt="myrentlist.totalElements"
        />
    </div>
</template>
<script>
import CarMyRentListItem from '@/pages/car/CarMyRentListItem.vue'
import PageGroup from '@/components/PageGroup.vue'
import axios from 'axios'
export default {
    name: 'CarMyRentList',
    components: { CarMyRentListItem, PageGroup},
    data() {
        return {
            currentPage: 1,
            myrentlist: null,
            modalCheck : false
        }
    },
    methods: {
        //----페이지그룹의 페이지(ex: [1] [2] [NEXT])객체가 클릭되었을 때 할 일 START----   
        axiosHandler() {
            const memberId = "0002"
            const url = `${this.backURL}/carrent/myrentlist?memberId=${memberId}&currentPage=${this.currentPage}`
            axios.get(url)
            .then(response=>{
                this.myrentlist = response.data
                // this.myrentlist.content.reqDate = this.formatToYYYYMMDD(this.myrentlist.content.reqDate)
                // this.myrentlist.content.startDate = this.formatToYYYYMMDD(this.myrentlist.content.startDate)
                // this.myrentlist.content.endDate = this.formatToYYYYMMDD(this.myrentlist.content.endDate)
                // console.log(this.myrentlist.content.reqDate)
            })
            .catch((Error)=>{
                console.log(Error)
            })
        },
        //----페이지그룹의 페이지(ex: [1] [2] [NEXT])객체가 클릭되었을 때 할 일 END----
        formatToYYYYMMDD(date) {
            const year = date.getFullYear()
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
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
        console.log('created myrentlist')
        if (this.$route.params.currentPage) {
            this.currentPage = this.$route.params.currentPage
        }
        this.axiosHandler(this.currentPage)
    }
}
</script>
<style scoped>
.myrentlist{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.myrentlist>table{
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