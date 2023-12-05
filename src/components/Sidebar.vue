<template>
  <!--is_expanded가 참이라면 문자열 'is-expanded'`이 포함되고, 그렇지 않으면 포함되지 않게 함-->
  <aside :class="`${is_expanded && 'is-expanded'}`">
    <div class="logo">
      <img src="../../public/images/logo.png" alt="vue" />
    </div>

    <div class="menu-toggle-wrap">
      <button class="menu-toggle" @click="ToggleMenu">
        <span class="material-icons">keyboard_double_arrow_right</span>
      </button>
    </div>

    <div class="menu">
      <button class="button">
        <span class="material-icons">notifications</span>
        <span class="text">Bell</span>
      </button>
    </div>

    <h3>Menu</h3>
    <div class="menu">
      <router-link class="button" to="/home">
        <span class="material-icons">home</span>
        <span class="text">메인</span>
      </router-link>
      <router-link class="button" to="/attendance">
        <span class="material-icons">check_circle</span>
        <span class="text">근태관리</span>
      </router-link>
      <router-link class="button" to="/notice/noticelist">
        <span class="material-icons">campaign</span>
        <span class="text">공지사항</span>
      </router-link>
      <router-link class="button" to="/address/members">
        <span class="material-icons">group</span>
        <span class="text">주소록</span>
      </router-link>
      <router-link class="button" to="/chat/list">
        <span class="material-icons">chat</span>
        <span class="text">채팅</span>
      </router-link>
      <router-link class="button" to="/calendar/list">
        <span class="material-icons">calendar_month</span>
        <span class="text">일정</span>
      </router-link>
      <router-link class="button" to="/meetingroom">
        <span class="material-icons">meeting_room</span>
        <span class="text">회의실 예약</span>
      </router-link>
      <router-link class="button" to="/carrent/carlist">
        <span class="material-icons">no_crash</span>
        <span class="text">차량 예약</span><br>
      </router-link>
      <router-link class="button" to="/carrent/carmanagelist">
        <span class="material-icons">car_rental</span>
        <span class="text">차량 관리</span>
      </router-link>
      <router-link class="button" to="/stuff/request">
        <span class="material-icons">add_box</span>
        <span class="text">비품 요청</span>
      </router-link>
      <router-link class="button" to="/stuff/requestmanage/">
        <span class="material-icons">shelves</span>
        <span class="text">비품 요청 관리</span>
      </router-link>
    </div>

    <div class="flex"></div>

    <div class="menu">
      <span class="material-icons">account_circle</span>
      <span></span>
    </div>
  </aside>
</template>
<script setup>
import { ref } from "vue";

const is_expanded = ref(localStorage.getItem("is_expanded") === "true");

const ToggleMenu = () => {
  is_expanded.value = !is_expanded.value;

  localStorage.setItem("is_expanded", is_expanded.value);
};
</script>
<style lang="scss" scoped>
aside {
  display: flex;
  flex-direction: column;
  width: calc(2rem + 32px); //최소 넓이 = 2rem + 아이콘 크기 32px
  min-height: 100vh; // 부모와 상관없이 화면 채움
  overflow: hidden;
  padding: 1rem;

  background-color: var(--dark); //var()는 사용자 지정 속성
  color: var(--light);

  transition: 0.2s ease-out; //토글 속도

  .flex {
    flex: 1 1 0;
  }

  .logo {
    margin-bottom: 1rem;

    img {
      width: 2rem;
    }
  }

  .menu-toggle-wrap {
    display: flex;
    // flex 컨테이너 안의 아이템들을 오른쪽으로 정렬
    justify-content: flex-end;
    margin-bottom: 1rem;

    position: relative;
    top: 0;
    // ease-out은 빠르게 시작되어서 완만하게 끝나는 속도 곡선
    transition: 0.2s ease-out;

    .menu-toggle {
      transition: 0.2s ease-out;

      .material-icons {
        font-size: 2rem;
        color: var(--light);
        transition: 0.2s ease-out;
      }

      &:hover {
        .material-icons {
          color: var(--primary);
          transform: translateX(0.5rem);
        }
      }
    }
  }

  h3,
  .button .text {
    // opacity: 0;
    transition: 0.3s ease-out;
  }

  h3 {
    color: var(--grey);
    font-size: 0.875rem;
    margin-bottom: 0.5rem;
    margin-top: 0.5rem;
    text-transform: uppercase;
  }

  .menu {
    margin: 0 -1rem;

    .button {
      display: flex;
      align-items: center;
      text-decoration: none;

      padding: 0.5rem 1rem;
      transition: 0.2s ease-out;

      .material-icons {
        font-size: 2rem;
        color: var(--light);
        margin-right: 1rem;
        transition: 0.2s ease-out;
      }

      .text {
        color: var(--light);
        transition: 0.2s ease-out;
      }

      &:hover,
      &.router-link-exact-active {
        background-color: var(--dark-alt);

        .material-icons,
        .text {
          color: var(--primary);
        }
      }

      &.router-link-exact-active {
        border-right: 5px solid var(--primary);
      }
    }
  }

  // &.is-expanded 부모 선택자에 is-expanded 클래스가 추가된 경우에 스타일이 적용되도록 함
  &.is-expanded {
    width: var(--sidebar-width);

    .menu-toggle-wrap {
      top: -3rem;
      .menu-toggle {
        transform: rotate(-180deg);
      }

      h3,
      .button .text {
        opacity: 1;
      }
      .button {
        .material-icons {
          margin-right: 1rem;
        }
      }
    }
  }

  @media (max-width: 768px) {
    position: fixed;
    z-index: 99; // 요소의 수직 위치 지정 - 제일 높음
  }
}
</style>
