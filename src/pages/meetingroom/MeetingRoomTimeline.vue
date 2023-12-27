<template>
  <div class="calendar-container">
  <MbscEventcalendar
    :clickToCreate="true"
    :dragToCreate="false"
    :dragToMove="false"
    :dragToResize="false"
    :eventDelete="false"
    :view="myView"
    :data="myEvents"
    :resources="myResources"
    :extendDefaultEvent="myDefaultEvent"
    className="md-timeline-template"
  >
    <template #scheduleEvent="data">
      <div
        class="md-timeline-template-event"
        :style="{ borderColor: data.color, background: data.color }"
      >
        <div class="md-timeline-template-event-cont">
          <!-- <span
            :class="'mbsc-icon mbsc-font-icon mbsc-icon-' + data.original.taskType"
            :style="{ background: data.color }"
          ></span>
          <span class="md-timeline-template-time" :style="{ color: data.color }">{{
            data.start
          }}</span>
          <span class="md-timeline-template-title">{{ data.original.title }}</span> -->
          <MeetingRoomItem
            v-for="reservation in data.original.reservations"
            :key="reservation.id"
            :mr="reservation.meetingRoom"
            :date="reservation.meetingDate"
          />
        </div>
      </div>
    </template>
  </MbscEventcalendar>
  </div>
</template>
<script setup>
// import '@mobiscroll/vue/dist/css/mobiscroll.min.css'
import { ref } from 'vue'
// import { MbscEventcalendar, setOptions, localeKo } from '@mobiscroll/vue'
import MeetingRoomItem from '@/pages/meetingroom/MeetingRoomItem.vue'

setOptions({
  locale: localeKo,
  theme: 'windows',
  themeVariant: 'light'
})

const myEvents = ref([
  {
    start: '2023-12-05T10:30',
    end: '2023-12-05T13:00',
    title: 'Tire change',
    color: '#7a5886',
    taskType: 'material-repeat',
    resource: 1
  },
  generateEvents(),
  // {
  //   start: '2023-12-05T10:30',
  //   end: '2023-12-05T13:00',
  //   title: 'Tire change',
  //   color: '#7a5886',
  //   taskType: 'material-repeat',
  //   resource: 1
  // },
  // {
  //   start: '2023-12-05T07:00',
  //   end: '2023-12-05T10:00',
  //   title: 'Brake maintenance',
  //   color: '#9da721',
  //   taskType: 'cogs',
  //   resource: 2
  // },
  // {
  //   start: '2023-12-04T13:30',
  //   end: '2023-12-04T16:30',
  //   title: 'Fluid maintenance',
  //   color: '#cd6957',
  //   taskType: 'cogs',
  //   resource: 1
  // },
  // {
  //   start: '2023-12-04T11:00',
  //   end: '2023-12-04T14:00',
  //   title: 'Oil change',
  //   color: '#637e57',
  //   taskType: 'material-repeat',
  //   resource: 3
  // },
  // {
  //   start: '2023-12-04T08:00',
  //   end: '2023-12-04T12:00',
  //   title: 'Engine inspection',
  //   color: '#6c5d45',
  //   taskType: 'material-search',
  //   resource: 3
  // },
  // {
  //   start: '2023-12-04T14:00',
  //   end: '2023-12-04T19:00',
  //   title: 'Car painting',
  //   color: '#50789d',
  //   taskType: 'material-format-paint',
  //   resource: 2
  // }
]);

function generateEvents() {
  const events = [];
  for (let i = 0; i < 5; i++) {
    events.push({
      start: `2023-12-05T${10 + i}:00`,
      end: `2023-12-05T${11 + i}:30`,
      title: `Event ${i + 2}`,
      color: '#abcdef',
      taskType: 'custom-task',
      resource: 2
    });
  }
  return events;
};

const myResources = ref([
  {
    id: 1,
    name: 'Ryan',
    color: '#239a21'
  },
  {
    id: 2,
    name: 'Kate',
    color: '#01adff'
  },
  {
    id: 3,
    name: 'John',
    color: '#ff0101'
  },
    {
    id: 4,
    name: 'Amy',
    color: '#01adff'
  },
    {
    id: 5,
    name: 'Johnny',
    color: '#239a21'
  }
])

function myDefaultEvent() {
  return {
    taskType: 'cogs'
  }
}

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

</script>
<style>

.md-timeline-template .mbsc-schedule-event.mbsc-ltr {
    height: auto !important;
}

.md-timeline-template-event {
    border: 1px solid transparent;
    margin: 2px 0;
}

.md-timeline-template-event-cont {
    background: rgba(255, 255, 255, .8);
    font-size: 15px;
    height: 32px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}

.md-timeline-template-event-cont .mbsc-icon {
    padding: 5px;
    box-sizing: content-box;
}

.mbsc-timeline-event-start .md-timeline-template-event,
.mbsc-timeline-event-start .md-timeline-template-event-cont,
.mbsc-timeline-event-start .md-timeline-template-event-cont .mbsc-icon {
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
}

.mbsc-timeline-event-end .md-timeline-template-event,
.mbsc-timeline-event-end .md-timeline-template-event-cont,
.mbsc-timeline-event-end .md-timeline-template-event-cont .mbsc-icon {
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
}

.md-timeline-template-event-cont .mbsc-icon:before {
    color: #fff;
    font-size: 18px;
}

.md-timeline-template-time {
    margin: 0 10px;
}

.md-timeline-template-title {
    color: #666;
}

.md-timeline-template .mbsc-timeline-column,
.md-timeline-template .mbsc-timeline-header-column {
    min-width: 100px;
}

.md-timeline-template .mbsc-timeline-resource,
.md-timeline-template .mbsc-timeline-row {
    min-height: 200px;
}

.calendar-container {
  /* width: 60%; */
  width: 1500px;
  align-content: center;
  margin-left: 150px;
  margin-top: 100px;
  margin-bottom: 100px;
  overflow-x: auto;
}
</style>