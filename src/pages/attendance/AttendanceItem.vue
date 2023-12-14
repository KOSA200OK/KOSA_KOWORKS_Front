<template>
    <!-- <div class="attendance"> -->
    <!-- <table> -->
    <!-- <tbody> -->
    <tr>
        <!-- <td>
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
    <td>{{ a.member.position }}</td> -->
        <td>{{ a.attendanceDate }}</td>
        <td>{{ a.startTime }}</td>
        <td>{{ a.endTime }}</td>
        <td :class="statusType(a.status)">
            {{
                a.status === 1 ? "퇴근"
                : a.status === 2 ? "지각"
                : a.status === 3 ? "결근"
                : a.status === 4 ? "병가"
                : a.status === 5 ? "휴가"
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
    methods: {
        statusType(status) {
            switch (status) {
                case 1:
                    return "completed";
                case 2:
                    return "late";
                case 3:
                    return "absent";
                default :
                    return "";
            }
        }
    }
};
</script>
<style scoped>
td {
    padding: 10px;
    text-align: center;
    border-bottom: px solid #ddd;
    
}

.completed {
  /* Styles for '퇴근' */
  background-color: #cceeff;
  color: #0040ff;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.late {
  /* Styles for '지각' */
  background-color: #fff3cd;
  color: #856404;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.absent {
  /* Styles for '결근' */
  background-color: #ffd6cc; 
  color: #ff0000;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1); /* Shadow */
}

</style>
