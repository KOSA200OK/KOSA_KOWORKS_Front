<template>
    <main>
        <div class="calendar">
            <FullCalendar 
            :options="calendarOptions">
    
            </FullCalendar>
           
            
        </div>    
    </main>
</template>
<script>
    import FullCalendar from '@fullcalendar/vue3'
    import interactionPlugin from '@fullcalendar/interaction'
    import { Calendar } from '@fullcalendar/core';
    import resourceTimelinePlugin from '@fullcalendar/resource-timeline'
    import MeetingRoomItem from '@/pages/meetingroom/MeetingRoomItem.vue'
    import axios from 'axios'
    
    export default {
        name: 'Calendar',
        components: {
            FullCalendar, MeetingRoomItem
        },
        data() {
            return {
                calendarOptions: {
                    plugins: [ interactionPlugin, resourceTimelinePlugin],
                    initialView: 'resourceTimelineDay',
                    headerToolbar: {
                        left: 'today prev,next',
                        center: 'title',
                        right: 'resourceTimelineDay,resourceTimelineTenDay,resourceTimelineMonth,resourceTimelineYear',
                    },
                    resourceAreaHeaderContent: 'Rooms',
                    scrollTime: '08:00',
                    resources: [
                        { id: 'a', title: 'Room A' },
                        { id: 'b', title: 'Room B' },
                    ],
                    events: [
                        {
                            resourceId: 'a',
                            title: 'Event 1',
                            start: '2023-12-18T10:00:00',
                            end: '2023-12-18T12:00:00'
                        },
                        {
                            resourceId: 'b',
                            title: 'Event 2',
                            start: '2023-12-18T14:00:00',
                            end: '2023-12-18T16:00:00'
                        },
                    ]
                },
        
            }
        },
        methods: {
            
        },
        watch: {
            //----라우터값이 변경되었을 때 할 일 START----
            $route(newRoute, oldRoute) {
                console.log("라우터값이 변경" + newRoute.path + "," + oldRoute.path)
                if (newRoute.params.date) {
                    this.date = newRoute.params.date
                } else {
                    this.date = ''
                }
                this.updateList(this.date)
            },
            //----라우터값이 변경되었을 때 할 일 END----
        },
        created(){
            //오늘 날짜 가져오기
            const currentdate = new Date();
            // 날짜를 'yyyy-mm-dd' 형식으로 변환
            const date = currentdate.getFullYear()+'-'+(currentdate.getMonth()+1)+'-'+currentdate.getDate();
            this.date = date;
            // console.log(this.date);

            this.updateList(this.date);
        }
    }
</script>
<style scoped>
    
    
</style>