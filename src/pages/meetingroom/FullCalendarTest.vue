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
                date: '',
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
            updateList(selectedDate) {
                this.date = selectedDate;

                const date = new Date(this.date);
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const day = String(date.getDate()).padStart(2, '0');
                this.date = `${year}-${month}-${day}`

                const url = `${this.backURL}/meetingroom?meetingDate=${this.date}`
                axios.get(url)
                    .then(response=>{
                        
                        this.meetingroomlist = response.data;
                        console.log(this.date)
                    })
                    .catch((error) =>{
                        console.log(error)
                    })
            },
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

        }
    }
</script>
<style scoped>
    
    
</style>