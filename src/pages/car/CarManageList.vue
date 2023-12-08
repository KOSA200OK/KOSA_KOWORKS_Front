<template>
<div>
    <table>
        <thead>
            <tr>
            <th>차대번호</th>
            <th>차량번호</th>
            <th>차종</th>
            </tr>
        </thead>
        <tbody>
            <CarManageListItem 
                            :c="c"
                            v-if="carlist"
                            v-for="c in carlist.content"
                            :key="c.id"/>
        </tbody>
    </table>
    <div class="pagegroup">
        <PageGroup
                v-if="carlist" 
                :path="'/carrent/manage/'"
                :currentPage="$route.params.currentPage ? $route.params.currentPage : 1"
                :totalPage="carlist.totalPages"
                :startPage="startPage"
                :endPage="endPage"

        />
    </div>
</div>
</template>
<script>
import CarManageListItem from '@/pages/car/CarManageListItem.vue'
import PageGroup from '@/components/PageGroup.vue'
import axios from 'axios'
export default {
    name: 'CarManageList',
    components: { CarManageListItem, PageGroup},
    props:["rentlist, noreturnlist", "menu"],
    data() {
        return {
            currentPage : 1,
            carlist : null
        }
    },
    methods: {
        carListHandler(){
            const url = `${this.backURL}/carrent/managelist/${this.currentPage}`
            axios.get(url)
            .then(response=>{
                console.log(response.data)
                this.carlist = response.data
                console.log(this.carlist)

                if(this.currentPage <=  this.carlist.totalPages){
                    this.startPage = parseInt((this.currentPage - 1 ) / 5) * 5+1
                    this.endPage = this.startPage + 5 - 1

                    if(this.endPage>this.carlist.totalPages){
                        this.endPage =this.carlist.totalPages
                    }
                }
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
            this.carListHandler()
        },
        //----라우터값이 변경되었을 때 할 일 END----  
        menu() {
            console.log('menu감시')
            this.currentPage = 1
            this.carListHandler()
        }
    },   
    created() {
        console.log('created carmanagelist')
        this.carListHandler()
    }
}
</script>
<style scoped>
.pagegroup{
    width : 1400px;
    margin-bottom:100px;
}
table{
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