<template>
    <main>
        <div class="calendar">
            <!-- <FullCalendar 
            :options="calendarOptions"
            @dateClick="handleDateClick">
                <MeetingRoomItem 
                    :mr="mr"
                    :date="date"
                    v-if="meetinglist"
                    v-for="mr in meetinglist"
                    v-bind:key="mr.id"
                    @click="clickMeetingRoomReservation()"
                />
                {{calendarOptions.resources.name}}
                <img :src="`../../images/${calendarOptions.resources.name}.jpg`" :alt="mr.name">
                <button>예약하기</button>
            </FullCalendar> -->

            <FullCalendar 
                :options="calendarOptions"
                @dateClick="handleDateClick"
            ></FullCalendar>

            <div v-if="meetinglist">
                <MeetingRoomItem
                v-for="mr in meetinglist"
                :key="mr.id"
                :mr="mr"
                :date="date"
                @click="clickMeetingRoomReservation(mr)"
                ></MeetingRoomItem>
            </div>
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
                meetingroomlist: [],
                date: '',
                calendarOptions: {
                    plugins: [ interactionPlugin, resourceTimelinePlugin],
                    initialView: 'resourceTimelineDay',
                    headerToolbar: {
                        left: 'today prev,next',
                        center: 'title',
                        right: 'resourceTimelineDay',
                    },
                    resourceAreaHeaderContent: 'Rooms',
                    scrollTime: '08:00',
                    resources: [
                        { 
                            id: 0, 
                            name: '',
                            maxNum: 0,
                            monitor: 0,
                            socket: 0,
                            projector: 0,
                            marker: 0,
                            location: ''
                        },
                        // { id: 'b', title: 'Room B' },
                    ],
                    events: [
                        {
                            id: 0,
                            startTime: '',
                            endTime: '',
                            meetingDate: '',
                            purpose: '',
                            member: null,
                            meetingroom: null,
                            participants: null,
                        },
                        // {
                        //     resourceId: 'b',
                        //     title: 'Event 2',
                        //     start: '2023-12-18T14:00:00',
                        //     end: '2023-12-18T16:00:00'
                        // },
                    ]
                },
        
            }
        },
        methods: {
            handleDateClick(arg) {
                alert(arg.date);
            },
            updateList() {
                this.date = '2023-12-18'

                const url = `${this.backURL}/meetingroom?meetingDate=${this.date}`
                axios.get(url)
                    .then(response=>{
                        this.calendarOptions.resources = [];
                        this.calendarOptions.events = [];
                        // Iterate through the response data and add to calendarOptions.resources
                        response.data.forEach(item => {
                            console.log(item);
                            // Assuming item has properties like id, title, etc. Adjust accordingly.
                            const resource = {
                                id: item.id, 
                                name: item.name,
                                maxNum: item.maxNum,
                                monitor: item.monitor,
                                socket: item.socket,
                                projector: item.projector,
                                marker: item.marker,
                                location: item.location
                            };

                            const combinedstart = `${item.reservation.meetingDate}T${item.reservation.startTime}:00`;
                            const combinedend = `${item.reservation.meetingDate}T${item.reservation.endTime}:00`;
                            const startTime = new Date(combinedstart);
                            const endTime = new Date(combinedend);
                            const event = {
                                id: item.reservation.id,
                                startTime: combinedstart,
                                endTime: combinedend,
                                meetingDate: item.reservation.meetingDate,
                                purpose: item.reservation.purpose,
                                member: item.reservation.member,
                                meetingroom: item.reservation.meetingroom,
                                participants: item.reservation.participants,
                            }
                            // Push the resource to calendarOptions.resources
                            this.calendarOptions.resources.push(resource);
                            this.calendarOptions.events.push(event);
                        });
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
            this.updateList();
        }
    }
</script>
<style scoped>
    
    
</style>