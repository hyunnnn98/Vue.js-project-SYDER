<template>
  <div class="header">
    <div class="logo">SYDER</div>
    <ul class="link">
      <li id="linkA">
        <router-link to="/realtime">실시간 운행 관리</router-link>
      </li>
      <li id="linkB">
        <router-link to="/system">운행정보 분석</router-link>
        <ul class="systemExpansion">
          <div>
            <li>
              <router-link to="/">운행 현황 조회</router-link>
            </li>
            <li>
              <router-link to="/">차량 정보 조회</router-link>
            </li>
            <li>
              <router-link to="/">웨이포인트 별 조회</router-link>
            </li>
            <li>
              <router-link to="/">접속자 조회</router-link>
            </li>
            <li>
              <router-link to="/">오류 로그 조회</router-link>
            </li>
          </div>
          <div>
            <li>
              <router-link to="/">운행 현황 조회</router-link>
            </li>
            <li>
              <router-link to="/">차량 정보 조회</router-link>
            </li>
            <li>
              <router-link to="/">웨이포인트 별 조회</router-link>
            </li>
            <li>
              <router-link to="/">접속자 조회</router-link>
            </li>
            <li>
              <router-link to="/">오류 로그 조회</router-link>
            </li>
          </div>
        </ul>
      </li>
      <li id="linkC">
        <router-link to="/info">시스템 관리</router-link>
        <ul class="systemExpansion">
          <div>
            <li>
              <router-link to="/">운행 현황 조회</router-link>
            </li>
            <li>
              <router-link to="/">차량 정보 조회</router-link>
            </li>
            <li>
              <router-link to="/">웨이포인트 별 조회</router-link>
            </li>
            <li>
              <router-link to="/">접속자 조회</router-link>
            </li>
            <li>
              <router-link to="/">오류 로그 조회</router-link>
            </li>
          </div>
          <div>
            <li>
              <router-link to="/">운행 현황 조회</router-link>
            </li>
            <li>
              <router-link to="/">차량 정보 조회</router-link>
            </li>
            <li>
              <router-link to="/">웨이포인트 별 조회</router-link>
            </li>
            <li>
              <router-link to="/">접속자 조회</router-link>
            </li>
            <li>
              <router-link to="/">오류 로그 조회</router-link>
            </li>
          </div>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.header {
  /* position: relative; */
  display: flex;
  background-color: #2b8ddd;
  color: white;
  min-width: 900px;
  /* font-family: "나눔스퀘어"; */
}

.header:hover {
  box-sizing: content-box;
  background-color: rgb(81, 110, 240);
}

.header:hover .logo {
  color: #1e1e1e;
}

.logo {
  line-height: 30px;
}

.header .router-link-exact-active {
  color: #fbff15;
}

.link {
  display: flex;
  margin-left: auto;
  font-size: 0.9rem;
}

.link > li {
  width: 200px;
  height: 100%;
  height: 30px;
  line-height: 30px;
  text-align: center;
}

.logo {
  font-weight: 900;
  padding-left: 2rem;
  padding-right: 2rem;
}

/* 평상시에는 드랍메뉴가 안보이게 하기 */
.systemExpansion {
  z-index: 1;
  display: none;
  height: auto;
  margin: 0px;
  border: 0px;
  width: 100%;
  position: absolute;
  top: 30px;
  right: 0px;
  z-index: 8;
  background-color: #fffffff1;
}

.link li:hover .systemExpansion {
  display: flex; /* 마우스 커서 올리면 드랍메뉴 보이게 하기 */
  
}

.systemExpansion > div > li {
  display: block;
  text-align: left;
  width: 200px;
  height: 40px;
  padding-top: 0.3rem;
}

.systemExpansion > div > li > a:hover {
  border-bottom: 1px solid #1e1e1e;
  padding-bottom: 4px;
}

.systemExpansion > div > li > a {
  color: #1e1e1e;
}

.systemExpansion > div:nth-of-type(1) {
  margin-left: auto;
}

.systemExpansion > div {
  position: relative;
  left: 50px;
}

.header a {
  color: white;
  font-weight: 900;
  /* border-bottom: 2px solid #ffffff;
  padding-bottom: 4px; */
}

a.router-link-exact-active {
  border-bottom: 2px solid #e4e000;
  padding-bottom: 4px;
}
</style>