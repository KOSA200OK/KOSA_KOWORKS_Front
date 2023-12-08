<template>
  <container>
    <MbscEventcalendar
      className="md-timeline-height"
      :clickToCreate="true"
      :dragToCreate="true"
      :dragToMove="true"
      :dragToResize="true"
      :eventDelete="true"
      :view="myView"
      :data="myEvents"
      :resources="myResources"
    />
          <!-- :data="myEvents"
      :resources="myResources" -->
  </container>
</template>
<script setup>
import '@mobiscroll/vue/dist/css/mobiscroll.min.css'
import { ref, onMounted } from 'vue'
import { MbscEventcalendar, setOptions, getJson } from '@mobiscroll/vue'

setOptions({
  theme: 'windows',
  themeVariant: 'light'
})

const myEvents = ref([
  // {
  //   start: '2023-12-04T04:00',
  //   end: '2023-12-04T22:00',
  //   title: 'Event1',
  //   resource: 1
  // },
  // {
  //   start: '2023-12-04T05:00',
  //   end: '2023-12-04T18:00',
  //   title: 'Event2',
  //   resource: 1
  // },
  // {
  //   start: '2023-12-04T08:00',
  //   end: '2023-12-04T23:59',
  //   title: 'Event3',
  //   resource: 1
  // },
  // {
  //   start: '2023-12-05T05:00',
  //   end: '2023-12-05T20:00',
  //   title: 'Event4',
  //   resource: 2
  // },
  // {
  //   start: '2023-12-05T08:00',
  //   end: '2023-12-05T22:00',
  //   title: 'Event5',
  //   resource: 2
  // },
  // {
  //   start: '2023-12-06T02:00',
  //   end: '2023-12-06T16:00',
  //   title: 'Event6',
  //   resource: 4
  // },
  // {
  //   start: '2023-12-06T04:00',
  //   end: '2023-12-06T20:00',
  //   title: 'Event7',
  //   resource: 4
  // },
  // {
  //   start: '2023-12-06T06:00',
  //   end: '2023-12-06T17:00',
  //   title: 'Event8',
  //   resource: 4
  // },
  // {
  //   start: '2023-12-06T09:00',
  //   end: '2023-12-06T23:00',
  //   title: 'Event9',
  //   resource: 4
  // }
])

const myResources = ref([
  {
    id: 1,
    name: 'Flatiron Room',
    color: '#fdf500'
  },
  {
    id: 2,
    name: 'The Capital City',
    color: '#ff0101'
  },
  {
    id: 3,
    name: 'Heroes Square',
    color: '#01adff'
  },
  {
    id: 4,
    name: 'Thunderdome',
    color: '#239a21'
  },
  {
    id: 5,
    name: 'King’s Landing',
    color: '#ff4600'
  },
  {
    id: 6,
    name: 'Gathering Field',
    color: '#8f1ed6'
  }
])

const myView = {
  timeline: {
    rowHeight: 'equal',
    type: 'day',
    startDay: 1,
    endDay: 5,
    startTime: '08:00',
    endTime: '20:00',
    timeCellStep: 30,
    timeLabelStep: 30,
    weekNumbers: false,
    currentTimeIndicator: true
  }
}

onMounted(() => {
  // getJson(
  //   'https://trial.mobiscroll.com/daily-weekly-events/',
  //   (events) => {
  //     myEvents.value = events
  //   },
  //   'jsonp'
  // )
})
</script>
<style>
container {
  margin: 1000px;
}

.md-timeline-height .mbsc-timeline-resource,
.md-timeline-height .mbsc-timeline-row {
  min-height: 0.5em;
}

.mbsc-calendar .mbsc-font .mbsc-flex-col 
.mbsc-windows .mbsc-ltr .mbsc-calendar-height-sm 
.mbsc-calendar-width-md .md-timeline-height 
.mbsc-eventcalendar .mbsc-eventcalendar-timeline {
  margin: 500px;
  padding: 1000px;
}

.mbsc-timeline-resource .mbsc-timeline-row 
.mbsc-flex-1-0 .mbsc-windows .mbsc-ltr {
  height: 3px;
}

.mbsc-timeline-resource-title {
  color: blue;
}

.md-timeline-height .mbsc-timeline-resource, 
.md-timeline-height .mbsc-timeline-row { 
  min-height: 120px; 
}

.mbsc-calendar .mbsc-font .mbsc-flex-col 
.mbsc-windows .mbsc-ltr .mbsc-calendar-height-sm 
.mbsc-calendar-width-md .md-timeline-height 
.mbsc-eventcalendar .mbsc-eventcalendar-timeline {
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}

.mbsc-flex-1-0 {
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    flex: 10px;
}

.mbsc-schedule-event-background 
.mbsc-timeline-event-background 
.mbsc-windows {
  height: 10%;
}

</style>
