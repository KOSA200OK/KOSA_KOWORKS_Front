<template>
  <!-- <div class="attendance"> -->
  <!-- <table> -->
  <!-- <tbody> -->
  <tr>
    <td>
      {{
        a.member.departmentId === 1
          ? "IT개발부"
          : a.member.departmentId === 2
          ? "개발1팀"
          : a.member.departmentId === 3
          ? "개발2팀"
          : a.member.departmentId === 4
          ? "개발3팀"
          : a.member.departmentId === 5
          ? "개발4팀"
          : ""
      }}
    </td>
    <td>{{ a.member.name }}</td>
    <td>{{ a.member.position }}</td>
    <td>{{ a.attendanceDate }}</td>
    <td>{{ a.startTime }}</td>
    <td>{{ a.endTime }}</td>
    <td>
      {{
        a.status === 1
          ? "퇴근"
          : a.status === 2
          ? "지각"
          : a.status === 3
          ? "결근"
          : a.status === 4
          ? "병가"
          : a.status === 5
          ? "휴가"
          : ""
      }}
    </td>
  </tr>
  <!-- </tbody> -->
  <!-- </table> -->
  <!-- </div> -->
</template>
<script>
export default {
  name: "AttendanceItem",
  props: ["a"],
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
