<template>
  <div class="header">
    <div class="logo"><router-link to="/">SYDER</router-link></div>
    <ul class="link">
      <li id="linkA">
        <router-link to="/realtime">실시간 운행 관리</router-link>
      </li>
      <li id="linkB">
        <router-link to="/driving">운행정보 분석</router-link>
        <ul class="systemExpansion">
          <div class="menuTitle"><p>운행정보 분석</p><img src="../imgs/report.png" alt="report"></div>
          <div class="munuSub">
            <li>
              <router-link to="/driving">운행 현황 조회</router-link>
            </li>
            <li>
              <router-link to="/carInfo">차량 정보 조회</router-link>
            </li>
            <li>
              <router-link to="/searchWayPoint">웨이포인트 조회</router-link>
            </li>
            <li>
              <router-link to="/errorLog">오류 로그 조회</router-link>
            </li>
          </div>
          <div class="munuSub">
            <li>
              <router-link to="/">웨이포인트 변경</router-link>
            </li>
            <li>
              <router-link to="/">경로 지정</router-link>
            </li>
            <li>
              <router-link to="/">차량 관리</router-link>
            </li>
            <li>
              <router-link to="/">충전소 관리</router-link>
            </li>
            <li>
              <!-- <router-link to="/">오류 로그 조회</router-link> -->
            </li>
          </div>
        </ul>
      </li>
      <li id="linkC">
        <router-link to="/info">시스템 관리</router-link>
        <ul class="systemExpansion">
          <div class="menuTitle"><p>시스템 관리</p><img src="../imgs/repair.png" alt="repair"></div>
          <div class="munuSub">
            <li>
              <router-link to="/driving">운행 현황 조회</router-link>
            </li>
            <li>
              <router-link to="/carInfo">차량 정보 조회</router-link>
            </li>
            <li>
              <router-link to="/searchWayPoint">웨이포인트 조회</router-link>
            </li>
            <li>
              <router-link to="/errorLog">오류 로그 조회</router-link>
            </li>
          </div>
          <div class="munuSub">
            <li>
              <router-link to="/">웨이포인트 변경</router-link>
            </li>
            <li>
              <router-link to="/">경로 지정</router-link>
            </li>
            <li>
              <router-link to="/">차량 관리</router-link>
            </li>
            <li>
              <router-link to="/">충전소 관리</router-link>
            </li>
            <li>
              <!-- <router-link to="/">오류 로그 조회</router-link> -->
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
  display: flex;
  background-color: rgba(3, 181, 235, 0.76);
  color: white;
  min-width: 900px;
}

.header:hover {
  box-sizing: content-box;
  background-color: rgba(3, 181, 235, 0.986);
}

.logo {
  line-height: 30px;
}

.header .router-link-exact-active {
  color: #fffb04;
}

.link {
  display: flex;
  margin-left: auto;
  font-size: 0.85rem;
}

.link > li {
  width: 280px;
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
  background-color: #ffffff;
  border-bottom: 2px solid rgba(3, 181, 235, 0.918);
}

.link li:hover .systemExpansion {
  display: flex; /* 마우스 커서 올리면 드랍메뉴 보이게 하기 */
}

.systemExpansion > .munuSub {
  position: relative;
  left: 50px;
  margin-top: 30px;
  padding-left: 20px;
  border-left: 1px solid rgb(133, 133, 133);
}

.systemExpansion > div > li,
.systemExpansion > p {
  display: block;
  text-align: left;
  width: 280px;
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

.menuTitle {
  color: black;
  font-family: "배달의민족 주아";
  font-size: 2rem;
  margin-top: 3.2rem;
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