<template>
    <div>
        <ul @click="notificationClick(n)">
            <li>
                <div class="icon-cancel">
                    <span class="material-symbols-outlined">
                        highlight_text_cursor
                    </span>
                    <span class="notify_date">
                        {{ n.createdAt }}
                    </span>
                    <span class="material-symbols-outlined"
                            v-on:click="cancel">
                        cancel
                    </span>
                </div>
            </li>
            <li class="notify_content">
                {{ n.content }}
            </li>
        </ul>
    </div>
</template>
<script>
import axios from 'axios';
import { toHandlers } from 'vue';

export default {
    name: 'NotificationItem',
    props:["n"],
    data() {
        return {

        };
    },
    methods: {
        cancel(event) {
            // 부모 컴포넌트에서 발생하는 이벤트 중지
            event.stopPropagation();
            
            const idValue = this.n.id
            const url = `${this.backURL}/subscribe/${idValue}`
            axios.delete(url)
                .then(response=> {

                    console.log('DELETE 요청 성공', response.data);

                     // 알림 목록에서 삭제된 알림의 인덱스 찾기
                const index = this.$parent.notificationList.content.findIndex(item => item.id === this.n.id);

                if (index !== -1) {
                    // notificationList.content 배열에서 삭제된 알림 제거
                    this.$parent.notificationList.content.splice(index, 1);
                    if (this.$parent.notificationList.content.length === 0) {
                        window.location.reload();
                    }
                }

                // window.location.reload();


                })
                .catch(error => {
                    console.log('DELETE 요청 실패', response.data);
                })
        },
        notificationClick(n) {
            console.log("타입 : ", n.type);
            switch (n.tyep) {
                case "CAR" :
                    this.$router.push("/arrent/myrentlist");
                    break;
                case "MEETING" :
                    this.$router.push("/meetingroom/myreservation")
                    break;
                case "STUFF" :
                    this.$router.push("/stuff/request");
                    break;
                default:
                    break;
            }

            const idValue = this.n.id;
            const url = `${this.backURL}/subscribe/${idValue}`;
            axios.delete(url)
                .then(response => {
                console.log('DELETE 요청 성공', response.data);

                const index = this.$parent.notificationList.content.findIndex(item => item.id === this.n.id);

                if (index !== -1) {
                    this.$parent.notificationList.content.splice(index, 1);
                    if (this.$parent.notificationList.content.length === 0) {
                    window.location.reload();
                    }
                }
                })
                .catch(error => {
                console.log('DELETE 요청 실패', error.response.data);
                });
        }
    },    
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@200&display=swap');

    ul {
        margin-left: 30px;
        list-style: none;
        padding: 0; 
        margin-bottom: 8px;
        padding: 4px;
        width: 300px;
        height: 80px;
        background-color:  #ffffff;
        /* border: 1px solid black; */
        border-radius: 4px;
        /* font-family: Noto Serif KR', serif; */
    }
    li {
        margin-top: 5px;
        text-align: center;
        /* font-family: 'Noto Serif KR', serif; */
        font-size: 13px;
        color: black;
    }
    .notify_date {
        font-family: 'Noto Serif KR', serif;
        text-align: left;
        /* order: 1; 오른쪽에 위치 */
        margin-right: 160px;
        font-size: 13px;
    }
    /* 아이콘 */ 
    .material-symbols-outlined {
        font-size: 19px;
        /* margin-top: px; */
        padding: 2px;
    font-variation-settings:
    'FILL' 0,
    'wght' 300,
    'GRAD' 0,
    'opsz' 10,
    }
    .icon-cancel {
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
    }

</style>