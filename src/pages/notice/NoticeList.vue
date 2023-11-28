<template>
    <div class="noticelist">
        <table>
            <thead>
                <tr>
                <th>번호</th>
                <th>제목</th>
                <th>작성일자</th>
                <th>작성자</th>
                </tr>
            </thead>

            <tbody>
                <NoticeItem 
                    :n="n"
                    v-if="noticelist"
                    v-for="n in noticelist.content" 
                    v-bind:key="n.id"/>
            </tbody>
            
            <PageGroup 
            v-if="noticelist" 
            :path="'/notice/noticelist/'"
            :currentPage="$route.params.currentPage?$route.params.currentPage:1"
            :totalPage="noticelist.totalPages"
            :cntPerPage="noticelist.size"
            :totalCnt="noticelist.totalElements" />
        </table>
    </div>
</template>
<script>
import NoticeItem from '@/pages/notice/NoticeItem.vue'
import PageGroup from '@/components/PageGroup.vue'
import axios from 'axios'

export default {
    name: "NoticeList",
    components: { NoticeItem, PageGroup },
    data() {
        return {
            noticelist : [],
            currentPage: 1
        }
    }, 
    methods: {
        //----페이지그룹의 페이지(ex: [1] [2] [NEXT])객체가 클릭되었을 때 할 일 START----   
        axiosHandler() {
            const url = `${this.backURL}/notice/list?currentPage=${this.currentPage}`
            axios.get(url)
            .then(response=>{
                this.noticelist = response.data})
            .catch((Error) =>{
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
        console.log('created noticelist')
        // console.log(noticelist)
        if (this.$route.params.currentPage) {
            this.currentPage = this.$route.params.currentPage
        }
        this.axiosHandler(this.currentPage)
    },
}
</script>
<style scoped>
table {
    width: 800px;
    height: 30rem;
    margin-left: 200px;
    margin-right: auto;
    margin-top: 100px;
    clear:both;

    /* border-top: 1px solid #0dffbf; */
    border-collapse: collapse;
    color: white;
}

thead {
    width: 800px;
}

thead > tr > th {
    width: 100px;
    height : 80px;
    font-size: 20px;
    color: #333;
}

tbody {
    width: 800px;
    height : 80px;
    font-size: 20px;
    color: #333;
}

/* tbody > tr > td {
    width: 500px;
    height : 80px;
    font-size: 20px;
    color: #333;
} */

/* top-left border-radius
table tr:first-child th:first-child {
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
}

top-right border-radius
table tr:first-child th:last-child {
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
} */
</style>