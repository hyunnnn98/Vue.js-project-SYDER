<template>
  <div class="header">
    <div class="logo">
      <router-link to="/map"
        >SYDER<span class="header-username" v-if="isUserLogin"
          >{{ $store.state.username }}님 접속중입니다.</span
        ></router-link
      >
    </div>
    <ul class="link">
      <template v-if="isUserLogin">
        <!-- v-if="isUserLogin" -->
        <li id="linkA">
          <router-link to="/map">실시간 운행 관리</router-link>
        </li>
        <li id="linkB">
          <router-link :to="{ name: 'analysis' }">운행정보 분석</router-link>
          <ul class="AnalysisMenuUl">
            <div class="menuAnalysis">
              <li>
                <router-link :to="{ name: 'driving' }"
                  >운행 현황 조회</router-link
                >
              </li>
              <li>
                <router-link :to="{ name: 'carInfo' }"
                  >차량 정보 조회</router-link
                >
              </li>
              <li>
                <router-link :to="{ name: 'searchWayPoint' }"
                  >웨이포인트 조회</router-link
                >
              </li>
              <li>
                <router-link :to="{ name: 'errorLog' }"
                  >오류 로그 조회</router-link
                >
              </li>
            </div>
          </ul>
        </li>
        <li id="linkC">
          <router-link :to="{ name: 'setPoint' }">시스템</router-link>
          <ul class="SystemMenuUl">
            <div class="menuSystem">
              <li>
                <router-link :to="{ name: 'setPoint' }"
                  >웨이포인트 설정</router-link
                >
              </li>
              <li>
                <router-link :to="{ name: 'setRoute' }">경로 설정</router-link>
              </li>
              <li>
                <router-link to="/map">차량 관리</router-link>
              </li>
              <li>
                <router-link to="/map">충전소 관리</router-link>
              </li>
            </div>
          </ul>
        </li>
        <li id="linkD">
          <a href="javascript:;" @click="logoutUser">
            로그아웃
          </a>
        </li>
      </template>
      <template v-else>
        <li><router-link to="/login">로그인</router-link></li>
        <li><router-link to="/signup">회원가입</router-link></li>
      </template>
    </ul>
  </div>
</template>

<script>
import { loginOut } from '@/api/auth';
import axios from 'axios';

export default {
  computed: {
    isUserLogin() {
      return this.$store.getters.isLogin;
    },
  },
  methods: {
    async logoutUser() {
      await this.$store.dispatch('LOGOUT');
      this.$router.push('/login');
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Gothic+A1&display=swap');

.header {
  display: flex;
  background-color: rgba(45, 211, 147, 0.87);
  font-family: 'Gothic A1';
  height: 43px;
}

.header-username {
  padding-left: 0.4rem;
  font-size: 0.75rem;
  color: #1e1e1e;
  font-family: 'Gothic A1';
}

a {
  text-decoration: none !important;
  color: white;
}

a:hover {
  color: #1e1e1e;
  font-weight: bold;
}

a:visited {
  /* color: rgb(255, 255, 255); */
}

.logo {
  position: absolute;
  top: 4px;
  left: 1.5rem;
  font-size: 1.8rem;
  font-weight: bold;
  font-family: 'Jua' !important;
  /* line-height: 40px; */
}

.link .router-link-active {
  color: #1e1e1e;
  font-weight: bold;
}

.link {
  display: flex;
  margin: 0 auto;
  font-size: 0.85rem;
}

/* 최상단 메뉴 li */
.link > li {
  width: 200px;
  height: 43px;
  text-align: center;
}

.link > li > a {
  display: block;
  width: 100%;
  line-height: 50px;
}

#linkD {
  position: absolute;
  right: 0px;
  width: 80px;
}

/* 평상시에는 드랍메뉴가 안보이게 하기 */
.AnalysisMenuUl,
.SystemMenuUl {
  z-index: 7;
  display: none;
  height: auto;
  margin: 0px;
  width: 160px;
  position: relative;
  top: 0px;
  left: 20px;
  background-color: rgb(255, 255, 255);
  box-shadow: 0px 5px 20px rgb(161, 161, 161);
  border-radius: 3px;
}

/* 마우스 커서 올리면 드랍메뉴 보이게 하기 */
.link li:hover .AnalysisMenuUl,
.link li:hover .SystemMenuUl {
  display: block;
}

.AnalysisMenuUl > div > li > a:hover,
.SystemMenuUl > div > li > a:hover {
  color: rgb(36, 35, 35);
  border-left: 4px solid #6b6b6b;
  padding-left: 17px;
}

.AnalysisMenuUl > div > li > a,
.SystemMenuUl > div > li > a {
  display: block;
  width: 100%;
  color: rgb(49, 48, 48);
  line-height: 50px;
  text-align: left;
  padding-left: 20px;
}

@media (max-width: 800px) {
  .link > li {
    display: none;
  }
}
</style>
