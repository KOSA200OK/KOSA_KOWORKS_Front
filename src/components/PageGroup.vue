<template lang="">
    <div class="pagegroup">
        <ul class="pagination">
            <li class="page-item">
                <router-link 
                    v-if= "start > 1"
                    class="page-link" 
                    :to="path + (start - 1)">
                    PREV
                </router-link>
            </li>

            <template  v-for="i in (end-start+1)">
                <li v-if="(i+start-1) == currentPage"
                    class="page-item active" 
                    aria-current="page">
                    <span class="page-link">{{i+start-1}}</span>
                </li>
                <li v-else
                    class="page-item">
                    <router-link 
                        class="page-link"            
                        :to="path+(i+start-1)">
                        {{i+start-1}}
                    </router-link>
                </li>
            </template>
            <li class="page-item"> 
                <router-link 
                    v-if= "totalPage > end"
                    class="page-link"  
                    :to="path+(end + 1)">
                    NEXT
                </router-link>
            </li>
        </ul>    
    </div>
</template>
<script>
export default {
    name: 'PageGroup',
    props: ["path", "currentPage", "totalPage", "cntPerPage", "totalCnt"],
    data() {
        return {
            start : "",
            end :""
        }
    },
    methods: {
    },
    created(){
        console.log(this.currentPage)
        if(this.currentPage <= this.totalPage){
            this.start = (this.currentPage - 1 ) / 5 * 5+1
            this.end = this.start + 5 - 1

            if(this.end>this.totalPage){
                this.end = this.totalPage
            }
        }
        console.log(this.start)
        console.log(this.end)
    }
}
</script>
<style scoped>
    .pagegroup{
        margin-top:50px;
        margin-bottom:50px;
    }
    ul.pagination{
        list-style-type: none;
        padding:0;
        margin:0;
        text-align: center;
    }
    li.page-item{
        display: inline-block;
        padding-right: 30px;
    }
</style>