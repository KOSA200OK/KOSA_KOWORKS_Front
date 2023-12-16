<!-- <template>
    <main>
        <div class="calendar">
            <FullCalendar :options="calendarOptions">
    
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
    
    
    </style> -->