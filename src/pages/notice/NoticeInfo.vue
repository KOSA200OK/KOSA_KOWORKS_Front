<template >
    <div class="noticeinfo">
        <h2>공지사항</h2>
        <div class="title">
            <b>{{n.title}}</b>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{n.regdate}}
        </div>
        <div class="body">
            {{n.content}} <br><br><br><br>
            {{n.member.name}}
        </div>
    </div>
</template>
<script>
import axios from 'axios'

export default {
    name: 'NoticeInfo',
    props:["n"],
    data(){
        return {
            n: {
                title: '',
                content: '',
                regdate: '',
                member: {
                    name: '',
                },
            }
        }
    }, 
    created() {
        //라우터에서 전달된 id파라미터
        const id = this.$route.params.id;
        console.log(id)

        const url = `${this.backURL}/notice/${id}`
        axios.get(url)
        .then(response=>{
            this.n = response.data})
        .catch((error) =>{
            console.log(error)
        })
    }
}
</script>
<style scoped>
div.noticeinfo {
    border-collapse: collapse;
    width: 1000px;

    margin-left: 200px;
    margin-right: auto;
    margin-top: 100px;

    border: 1px solid black;
}

h2 {
    margin: 50px;
}

div.title {
    margin: 50px;

    font-size: 22px;
}

div.body {
    height: 500px;
    margin: 50px;
    padding: 100px;

    border: 1px solid black;
    border-radius: 1rem;
    background-color: white;
}
</style>