<template>
    <li class="notify_content">
      <span>[{{ notification.createdAt }}]</span> &nbsp;
      <span>{{ notification.content }}</span>
    </li>
  </template>
  
  <script>
  export default {
    props: {
      notification: {
        type: Object,
        required: true
      }
    }
  };
  </script>
  
  <style scoped>
  /* Add any styles specific to NotificationItem if needed */
  </style>