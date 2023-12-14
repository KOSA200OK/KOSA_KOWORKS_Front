<template>
  <tr>
    <td>{{ member.id }}</td>
    <td>{{ member.name }}</td>
    <td>{{ member.departmentName }}</td>
    <td>{{ member.position }}</td>
    <td>{{ member.tel }}</td>
  </tr>
</template>

<script>
export default {
  name: "AddressItem",
  props: ["member"],
  data() {
    return {};
  },
};
</script>

<style scoped>
td {
  padding: 10px;
  text-align: center;
  border-bottom: 1px solid #ddd;
}
</style>
