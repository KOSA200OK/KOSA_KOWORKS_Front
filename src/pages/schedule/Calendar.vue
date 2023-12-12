<template>
<main>
    <FullCalendar ref="fullCalendar" :options="calendarOptions" :events="calendarEvents">
        <template v-slot:eventContent='arg'>
            <div class="event">
                <b>{{ arg.event.title }}</b>
            </div>
        </template>
    </FullCalendar>
</main>
</template>
<script>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import axios from 'axios'

export default {
    name: 'Calendar',
    components: {
        FullCalendar // make the <FullCalendar> tag available
    },
    data() {
        return {
            calendarOptions: {
                plugins: [ dayGridPlugin, interactionPlugin ],
                initialView: 'dayGridMonth',
                dateClick: this.handleDateClick,
                events: [
                    {
                        title: '',
                        start: '',
                        end: ''
                    }
                ],
                eventColor: '#088A85',
                editable: true,
                allDay: false
            }
        }
    },
    methods: {
        scheduleHandler(){
            const memberId = localStorage.getItem('memberId')
            console.log(memberId)
            const url = `${this.backURL}/schedule/calendar?memberId=${memberId}`
            axios.get(url,{params : this.data})
            .then(response=>{
                console.log(response.data)
                if(response.data && response.data.length > 0){
                    this.calendarOptions.events = response.data.map(event => ({
                        title: event.title,
                        start: event.startTime,
                        end: event.endTime
                    }));
                }
                console.log('캘린더옵션 events',this.calendarOptions.events)
            })
            .catch((Error)=>{
                console.log(Error)
            })
        },
         handleDateClick: function(arg) {
            alert('date click! ' + arg.dateStr)
        }
    },
    created(){
        this.scheduleHandler()
    }
}
</script>
<style scoped>
.event{
    background-color: #bbebe9; 
    width:100%;
    border-radius: 3px;
    padding : 2px;
    padding-left : 8px;
    color : rgb(7, 7, 7);
}
</style>