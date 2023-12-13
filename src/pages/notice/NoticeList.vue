<template>
  <div class="noticelist">
    <table>
      <thead>
        <tr>
          <th>번호</th>
          <th>제목</th>
          <th>작성일자</th>
          <th>작성자</th>
        </tr>
      </thead>

      <tbody>
        <NoticeItem
          :n="n"
          v-if="noticelist"
          v-for="n in noticelist.content"
          v-bind:key="n.id"
          @click="clickNoticeInfo(`${n.id}`)"
        />
      </tbody>

      <PageGroup
        v-if="noticelist"
        :path="$route.params.currentPage ? $route.params.currentPage : 1"
        :currentPage="currentPage"
        :startPage="startPage"
        :endPage="endPage"
      />
    </table>
  </div>
</template>
<script>
import NoticeItem from "@/pages/notice/NoticeItem.vue";
import PageGroup from "@/components/PageGroup.vue";
import axios from "axios";

export default {
  name: "NoticeList",
  components: { NoticeItem, PageGroup },
  data() {
    return {
      noticelist: [],
      currentPage: 1,
      startPage: 1,
      endPage: 1,
    };
  },
  methods: {
    //----페이지그룹의 페이지(ex: [1] [2] [NEXT])객체가 클릭되었을 때 할 일 START----
    axiosHandler() {
      const url = `${this.backURL}/notice/list?currentPage=${this.currentPage}`;
      axios
        .get(url)
        .then((response) => {
          this.noticelist = response.data;
          if (this.currentPage <= this.noticelist.totalPages) {
            this.startPage = parseInt((this.currentPage - 1) / 5) * 5 + 1;
            this.endPage = this.startPage + 5 - 1;
          }

          if (this.endPage > this.noticelist.totalPages) {
            this.endPage = this.noticelist.totalPages;
          }
        })
        .catch((Error) => {
          console.log(Error);
        });
    },
    //----페이지그룹의 페이지(ex: [1] [2] [NEXT])객체가 클릭되었을 때 할 일 END----

    //----리스트 중 한 항목 클릭되었을 때 할 일 START----
    clickNoticeInfo(id) {
      this.id = id;
      this.$router.push({ path: `./${id}` });
    },
    //----리스트 중 한 항목 클릭되었을 때 할 일 END----
  },
  watch: {
    //----라우터값이 변경되었을 때 할 일 START----
    $route(newRoute, oldRoute) {
      console.log("라우터값이 변경" + newRoute.path + "," + oldRoute.path);
      if (newRoute.params.currentPage) {
        this.currentPage = newRoute.params.currentPage;
      } else {
        this.currentPage = 1;
      }
      this.axiosHandler();
    },
    //----라우터값이 변경되었을 때 할 일 END----
  },
  created() {
    console.log("created myreservationlist");
    if (this.$route.params.currentPage) {
      this.currentPage = this.$route.params.currentPage;
    }
    this.axiosHandler();
  },
};
</script>
<style scoped>
table {
  border-collapse: collapse;
  width: 1000px;

  margin-left: 200px;
  margin-right: auto;
  margin-top: 100px;
}

/* 테이블 행 */
th {
  padding: 8px;
  height: 80px;
  text-align: left;
  border-bottom: 1px solid #ddd;
  text-align: center;
}

th {
  background-color: var(--dark);
  color: #ddd;
}

/* 테이블 올렸을 때 */
tbody tr:hover {
  background-color: #d3d3d3;
  opacity: 0.9;
  cursor: pointer;
}

/* 테이블 비율 */
th:nth-child(1),
td:nth-child(1) {
  width: 20%;
}

th:nth-child(2),
td:nth-child(2) {
  width: 40%;
}

th:nth-child(3),
td:nth-child(3) {
  width: 20%;
}

th:nth-child(4),
td:nth-child(4) {
  width: 20%;
}

tr:nth-child(even) {
  background-color: #fff6f6;
}
</style>
