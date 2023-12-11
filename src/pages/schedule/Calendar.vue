<template>
<main>
    <FullCalendar ref="fullCalendar" :options="calendarOptions">
        <template v-slot:eventContent='arg'>
            <b>{{ arg.event.title }}</b>
        </template>
    </FullCalendar>
</main>
</template>
<script>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'

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
                events: null
            }
        }
    },
    methods: {
        getCurrentMonth() {
            // FullCalendar의 date 객체를 사용하여 현재 월을 얻기
            const currentMonth = this.$refs.fullCalendar.getApi().getDate().format('YYYY-MM');

            // 콘솔에 출력 또는 원하는 로직 수행
            console.log('Current Month:', currentMonth);
        },
        scheduleHandler(){
            const memberId = localStorage.getItem('memberId')
            console.log(memberId)
            const url = `${this.backURL}/schedule/calendar?memberId=${memberId}&month=12`
            axios.get(url,{params : this.data})
            .then(response=>{
                console.log(response.data)
                if(response.data){
                    for(const data of response.data){
                        this.calendarOptions.events[i].title = data.title
                        this.calendarOptions.events[i].start = data.startTime
                        this.calendarOptions.events[i].end = data.endTime
                    }
                }
            })
            .catch((Error)=>{
                console.log(Error)
            })
        },
         handleDateClick: function(arg) {
            alert('date click! ' + arg.dateStr)
        }
    },
    mounted(){
        this.scheduleHandler()
        let calendarApi = this.$refs.fullCalendar.getApi()
        console.log(calendarApi)
    }
}
</script>
