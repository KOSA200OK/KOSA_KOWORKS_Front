<template>
    <main>
        <div class="calendar">
            <FullCalendar :options="calendarOptions" >
    
            </FullCalendar>
           
            
        </div>    
    </main>
</template>
<script>
    import FullCalendar from '@fullcalendar/vue3'
    import interactionPlugin from '@fullcalendar/interaction'
    import { Calendar } from '@fullcalendar/core';
    import resourceTimelinePlugin from '@fullcalendar/resource-timeline'
    import axios from 'axios'
    
    export default {
        name: 'Calendar',
        components: {
            FullCalendar// make the <FullCalendar> tag available
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
                    // resources: [
                    //     { id: 'a', title: 'Room A'},
                    //     { id: 'b', title: 'Room B' },
                    //     // Add more resources as needed
                    // ],
                    eventResourceEditable: true,
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
                        // Add more events as needed
                    ],
                    eventContent: { html: '<i>some html</i>' },
                    // resourceAreaColumns: [
                    //     {
                    //         headercontent:'사진',
                    //         cellContent: { html: '<i><img src="../../images/회의실1.jpg" style="width:50px; height:50px;"></img></i>' }
                    //     },
                    //     {
                    //         headercontent:'이름',
                    //         cellContent: { html: '<i>회의실1</i>' }
                    //     }
                    //     // other columns...
                    // ]
                    resourceAreaColumns: [
                        {
                        field: 'fname',
                        headerContent: 'First Name'
                        },
                        {
                        field: 'lname',
                        headerContent: 'Last Name'
                        }
                    ],
                    resources: [
                        {
                        id: 'a',
                        fname: 'John',
                        lname: 'Smith'
                        },
                        {
                        id: 'b',
                        fname: 'Jerry',
                        lname: 'Garcia'
                        }
                    ]
                },
        
            }
        },
        methods: {
            
        },
        created(){
            
        }
    }
</script>
<style scoped>
    
    
</style>