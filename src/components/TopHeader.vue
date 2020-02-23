<template>
  <div class="header">
    <div class="logo">SYDER</div>
    <ul class="link">
      <li>
        <router-link to="/realtime">실시간 운행 관리</router-link>
      </li>
      <li>
        <router-link to="/system">운행정보 분석</router-link>
        <ul class="systemExpansion">
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
        </ul>
      </li>
      <li>
        <router-link to="/info">시스템 관리</router-link>
        <ul class="infoExpansion">
          <li>
            <router-link to="/">??</router-link>
          </li>
          <li>
            <router-link to="/">??</router-link>
          </li>
          <li>
            <router-link to="/">??</router-link>
          </li>
          <li>
            <router-link to="/">??</router-link>
          </li>
          <li>
            <router-link to="/">??</router-link>
          </li>
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
  color: white;
  background-color: #2b8ddd;
  display: flex;
  padding: 8px;
  min-width: 900px;
  position: relative;
}

.header .router-link-exact-active {
  color: #03080c;
}

.link {
  list-style: none;
  display: flex;
  margin-left: auto;
  font-size: 0.9rem;
}

.link > li {
  width: 200px;
  text-align: center;
}

.logo {
  font-weight: 900;
  padding-left: 2rem;
  padding-right: 2rem;
}

/* 평상시에는 드랍메뉴가 안보이게 하기 */
.systemExpansion,
.infoExpansion {
  z-index: 1;
  display: none;
  height: auto;
  padding: 10px 20px 0px 48px;
  margin: 0px;
  border: 0px;
  width: 200px;
}

.infoExpansion {
  padding: 10px 20px 0px 58px;
}

.systemExpansion > li,
.infoExpansion > li {
  display: block;
  text-align: left;
  width: 200px;
  padding: 5px;
}

.link li:hover .systemExpansion,
.link li:hover .infoExpansion {
  display: block; /* 마우스 커서 올리면 드랍메뉴 보이게 하기 */
}

a:hover {
  color: #0b62d3;
  border-bottom: 1px solid #ffffff;
  padding-bottom: 2px;
}

a.router-link-exact-active {
  border-bottom: 1.5px solid #2c2c2c;
  padding-bottom: 2px;
}

.header a {
  color: white;
  font-weight: 900;
}
</style>