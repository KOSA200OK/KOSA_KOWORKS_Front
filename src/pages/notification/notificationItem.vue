<template>
    <div>
        <ul>
            <li>
                {{ n.createdAt }}
            </li>
            <li>
                {{ n.content }}
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name: 'notificationItem',
    props:["n"],
    data() {
        return {

        };
    }
}
</script>
<style scoped>
    ul {
        margin-left: 30px;
        list-style: none;
        padding: 0; 
        margin-bottom: 8px;
        padding: 4px;
        width: 300px;
        height: 60px;
        background-color:  #f9f9f9;
        /* border: 1px solid black; */
        border-radius: 4px;
    }
    li {
        text-align: center;
        font-size: 13px;
        color: black;
    }
</style>