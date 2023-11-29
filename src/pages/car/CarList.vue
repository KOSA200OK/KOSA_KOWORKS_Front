<template lang="">
    <div class="carlist">
        <table>
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
            modalCheck : false
        }
    },
    methods: {
        //----페이지그룹의 페이지(ex: [1] [2] [NEXT])객체가 클릭되었을 때 할 일 START----   
        axiosHandler() {
            const url = `${this.backURL}/carrent/carlist?currentPage=${this.currentPage}`
            axios.get(url)
            .then(response=>{
                this.carlist = response.data
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
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.carlist>table{
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